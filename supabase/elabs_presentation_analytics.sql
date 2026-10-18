create extension if not exists pgcrypto with schema extensions;

create table if not exists public.elabs_presentation_recipients (
  id bigint generated always as identity primary key,
  label text not null,
  token_hash text not null unique check (length(token_hash) = 64),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.elabs_presentation_sessions (
  id bigint generated always as identity primary key,
  recipient_id bigint not null references public.elabs_presentation_recipients(id) on delete cascade,
  session_id uuid not null,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  last_position_seconds numeric(10,2) not null default 0,
  furthest_seconds numeric(10,2) not null default 0,
  watched_seconds numeric(10,2) not null default 0,
  duration_seconds numeric(10,2) not null default 0,
  sound_on boolean not null default false,
  completed boolean not null default false,
  play_count integer not null default 0,
  pause_count integer not null default 0,
  unique (recipient_id, session_id)
);

create table if not exists public.elabs_presentation_events (
  id bigint generated always as identity primary key,
  session_row_id bigint not null references public.elabs_presentation_sessions(id) on delete cascade,
  event_name text not null,
  position_seconds numeric(10,2) not null default 0,
  watched_seconds numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.elabs_presentation_admin (
  id boolean primary key default true check (id),
  token_hash text not null check (length(token_hash) = 64),
  updated_at timestamptz not null default now()
);

create index if not exists elabs_presentation_sessions_recipient_last_seen_idx
  on public.elabs_presentation_sessions (recipient_id, last_seen_at desc);
create index if not exists elabs_presentation_events_session_created_idx
  on public.elabs_presentation_events (session_row_id, created_at desc);

alter table public.elabs_presentation_recipients enable row level security;
alter table public.elabs_presentation_sessions enable row level security;
alter table public.elabs_presentation_events enable row level security;
alter table public.elabs_presentation_admin enable row level security;

revoke all on public.elabs_presentation_recipients from public, anon, authenticated;
revoke all on public.elabs_presentation_sessions from public, anon, authenticated;
revoke all on public.elabs_presentation_events from public, anon, authenticated;
revoke all on public.elabs_presentation_admin from public, anon, authenticated;

create or replace function public.elabs_presentation_track(
  p_token text,
  p_session_id uuid,
  p_event text,
  p_position_seconds numeric default 0,
  p_duration_seconds numeric default 0,
  p_watched_seconds numeric default 0
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_recipient_id bigint;
  v_session_row_id bigint;
  v_position numeric(10,2);
  v_duration numeric(10,2);
  v_watched numeric(10,2);
begin
  delete from public.elabs_presentation_sessions
  where last_seen_at < now() - interval '90 days';

  if p_token is null or length(p_token) < 32 or p_event not in ('view', 'play', 'pause', 'heartbeat', 'sound_on', 'seek', 'complete', 'pagehide') then
    return jsonb_build_object('ok', false);
  end if;

  select id into v_recipient_id
  from public.elabs_presentation_recipients
  where token_hash = encode(extensions.digest(p_token, 'sha256'), 'hex')
    and active = true;

  if v_recipient_id is null then
    return jsonb_build_object('ok', false);
  end if;

  v_duration := greatest(0, least(coalesce(p_duration_seconds, 0), 86400));
  v_position := greatest(0, least(coalesce(p_position_seconds, 0), case when v_duration > 0 then v_duration else 86400 end));
  v_watched := greatest(0, least(coalesce(p_watched_seconds, 0), 86400));

  insert into public.elabs_presentation_sessions (
    recipient_id, session_id, last_position_seconds, furthest_seconds,
    watched_seconds, duration_seconds, sound_on, completed, play_count, pause_count
  ) values (
    v_recipient_id, p_session_id, v_position, v_position,
    v_watched, v_duration, p_event = 'sound_on', p_event = 'complete',
    case when p_event = 'play' then 1 else 0 end,
    case when p_event = 'pause' then 1 else 0 end
  )
  on conflict (recipient_id, session_id) do update set
    last_seen_at = now(),
    last_position_seconds = excluded.last_position_seconds,
    furthest_seconds = greatest(public.elabs_presentation_sessions.furthest_seconds, excluded.furthest_seconds),
    watched_seconds = greatest(public.elabs_presentation_sessions.watched_seconds, excluded.watched_seconds),
    duration_seconds = greatest(public.elabs_presentation_sessions.duration_seconds, excluded.duration_seconds),
    sound_on = public.elabs_presentation_sessions.sound_on or excluded.sound_on,
    completed = public.elabs_presentation_sessions.completed or excluded.completed,
    play_count = public.elabs_presentation_sessions.play_count + excluded.play_count,
    pause_count = public.elabs_presentation_sessions.pause_count + excluded.pause_count
  returning id into v_session_row_id;

  if p_event <> 'heartbeat' then
    insert into public.elabs_presentation_events (session_row_id, event_name, position_seconds, watched_seconds)
    values (v_session_row_id, p_event, v_position, v_watched);
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.elabs_presentation_create_recipient(
  p_admin_token text,
  p_label text,
  p_token_hash text
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_label text;
  v_id bigint;
begin
  if not exists (
    select 1 from public.elabs_presentation_admin
    where token_hash = encode(extensions.digest(coalesce(p_admin_token, ''), 'sha256'), 'hex')
  ) then
    raise exception 'Brak dostepu' using errcode = '42501';
  end if;

  v_label := trim(coalesce(p_label, ''));
  if length(v_label) < 2 or length(v_label) > 80 or p_token_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'Nieprawidlowe dane odbiorcy' using errcode = '22023';
  end if;

  insert into public.elabs_presentation_recipients (label, token_hash)
  values (v_label, p_token_hash)
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id, 'label', v_label);
end;
$$;

create or replace function public.elabs_presentation_report(p_admin_token text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_result jsonb;
begin
  if not exists (
    select 1 from public.elabs_presentation_admin
    where token_hash = encode(extensions.digest(coalesce(p_admin_token, ''), 'sha256'), 'hex')
  ) then
    raise exception 'Brak dostepu' using errcode = '42501';
  end if;

  delete from public.elabs_presentation_sessions
  where last_seen_at < now() - interval '90 days';

  select jsonb_build_object(
    'generated_at', now(),
    'recipients', coalesce(jsonb_agg(
      jsonb_build_object(
        'label', r.label,
        'visits', coalesce(stats.visits, 0),
        'first_opened_at', stats.first_opened_at,
        'last_seen_at', stats.last_seen_at,
        'watched_seconds', coalesce(stats.watched_seconds, 0),
        'furthest_seconds', coalesce(stats.furthest_seconds, 0),
        'duration_seconds', coalesce(stats.duration_seconds, 0),
        'sound_on', coalesce(stats.sound_on, false),
        'completed', coalesce(stats.completed, false),
        'sessions', coalesce(stats.sessions, '[]'::jsonb)
      ) order by r.created_at desc
    ), '[]'::jsonb)
  ) into v_result
  from public.elabs_presentation_recipients r
  left join lateral (
    select
      count(*)::integer as visits,
      min(s.started_at) as first_opened_at,
      max(s.last_seen_at) as last_seen_at,
      sum(s.watched_seconds) as watched_seconds,
      max(s.furthest_seconds) as furthest_seconds,
      max(s.duration_seconds) as duration_seconds,
      bool_or(s.sound_on) as sound_on,
      bool_or(s.completed) as completed,
      jsonb_agg(jsonb_build_object(
        'started_at', s.started_at,
        'last_seen_at', s.last_seen_at,
        'last_position_seconds', s.last_position_seconds,
        'furthest_seconds', s.furthest_seconds,
        'watched_seconds', s.watched_seconds,
        'duration_seconds', s.duration_seconds,
        'sound_on', s.sound_on,
        'completed', s.completed,
        'play_count', s.play_count,
        'pause_count', s.pause_count
      ) order by s.started_at desc) as sessions
    from public.elabs_presentation_sessions s
    where s.recipient_id = r.id
  ) stats on true
  where r.active = true;

  return v_result;
end;
$$;

revoke all on function public.elabs_presentation_track(text, uuid, text, numeric, numeric, numeric) from public;
revoke all on function public.elabs_presentation_create_recipient(text, text, text) from public;
revoke all on function public.elabs_presentation_report(text) from public;
grant execute on function public.elabs_presentation_track(text, uuid, text, numeric, numeric, numeric) to anon;
grant execute on function public.elabs_presentation_create_recipient(text, text, text) to anon;
grant execute on function public.elabs_presentation_report(text) to anon;
