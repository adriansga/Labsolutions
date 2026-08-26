# DESIGN SYSTEM — ELABS LANDING

> Status: APPROVED
> Ostatnia aktualizacja: 2026-08-26
> Właściciel kierunku: Adrian / CTO
> Prototyp/referencje: `docs/PROTOTYP_LANDING_ELABS_2026-08-26.md`

## 1. Cel i odbiorca

- Produkt / ekran: sprzedażowy landing ELABS z kalkulatorem kosztu ręcznego obiegu.
- Główny użytkownik: właściciel, kierownik lub osoba operacyjna małego/średniego laboratorium.
- Zadanie użytkownika: rozpoznać koszt przepisywania, zrozumieć cyfrowy przepływ i umówić demo jednego procesu.
- Pożądane odczucie: wiarygodnie, konkretnie, spokojnie i operacyjnie — bez „startupowego dymu”.
- Zasada nadrzędna: najpierw własne liczby i realny proces, potem oferta.

## 2. Referencje i prototyp

| Źródło | Co wykorzystujemy | Czego nie kopiujemy |
|---|---|---|
| `APLIKACJA WEB/design.md` + produkcyjne screenshoty ELABS | markę niebieski/cyjan, język operacyjny, kolejność procesu i realny dowód produktu | gęstości ekranów roboczych aplikacji |
| BRAIN: Mirek Burneiko, `PROMPT 2 Strona Sprzedażowa.txt` + `3 Warsztat OFERTA.MD/2.md` | strukturę B2B: hero/CTA, problem, rozwiązanie, proces, dowód, kalkulator ROI, CTA | sztucznej presji, placeholderów, przypadkowych pakietów i obietnic |
| Dotychczasowy landing Labsolutions | perspektywę Adriana jako praktyka z laboratorium i statyczny, łatwy do wdrożenia format | ciemny „tech” styl, fałszywy formularz, countdown, niepotwierdzone certyfikaty/liczby |

Prototyp: `docs/PROTOTYP_LANDING_ELABS_2026-08-26.md`.

## 3. Zasady wizualne

- Jasna strona B2B z ciemnym, spokojnym hero i dużą ilością oddechu.
- Nagłówki są krótkie, bez kapitalików i bez krzykliwego języka.
- Realne ekrany produktu są ważniejszym dowodem niż dekoracyjne mockupy.
- Jedna akcja główna: „Umów krótkie demo”; kalkulator jest głównym mostem do tej akcji.
- Bez emoji, stockowych logotypów i fikcyjnych testimoniali.

## 4. Tokeny

### Kolory

| Token | Wartość | Użycie |
|---|---|---|
| `--navy-950` | `#061322` | hero i końcowe CTA |
| `--navy-900` | `#0b1f33` | ciemne powierzchnie |
| `--ink` | `#102235` | tekst główny |
| `--muted` | `#5c6f82` | tekst pomocniczy |
| `--surface` | `#ffffff` | karty |
| `--canvas` | `#f5f8fb` | tło strony |
| `--line` | `#dce5ee` | obramowania |
| `--brand` | `#1d6fdc` | CTA, focus, aktywne elementy |
| `--brand-dark` | `#1558ae` | hover CTA |
| `--cyan` | `#22b8cf` | laboratoryjny akcent i wykres |
| `--success` | `#138a63` | pozytywne stany |
| `--warning` | `#d97706` | koszt/uwaga |

Kontrast tekstu i CTA minimum WCAG AA.

### Typografia

- Font: `Inter`, fallback `Arial, sans-serif`.
- Display: 56–68 px desktop, 39–46 px mobile, `font-weight: 750`, `line-height: 1.02`.
- H2: `clamp(2rem, 4vw, 3.5rem)`, `line-height: 1.08`.
- Tekst bazowy: 17 px / 1.65; pomocniczy minimum 14 px.
- Liczby kalkulatora: tabularne, 700–800.

### Spacing, radius, cień, motion

- Skala spacingu: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 96 px.
- Radius: `--radius-sm: 10px`, `--radius: 18px`, `--radius-lg: 28px`.
- Cienie: tylko `--shadow-sm` i `--shadow-lg` z chłodnym granatem.
- Motion: 160–240 ms; brak konieczności animacji do zrozumienia treści; `prefers-reduced-motion` wyłącza ruch.

## 5. Layout i responsywność

- Kontener: maks. 1180 px, padding 20 px mobile / 32 px desktop.
- Hero: 2 kolumny od 900 px, jedna kolumna poniżej.
- Sekcje: 72 px mobile / 104 px desktop.
- Kalkulator: panel danych + panel wyników od 860 px, jedna kolumna poniżej.
- Karty: 3 kolumny desktop, 2 tablet, 1 mobile.
- Breakpoint menu: 820 px.
- Wszystkie cele dotykowe minimum 44 × 44 px; brak poziomego scrolla przy 390 px.

## 6. Komponenty i stany

| Komponent | Warianty | Stany | Reguły użycia |
|---|---|---|---|
| Button | primary / secondary / ghost-on-dark | default / hover / focus / disabled | jeden primary w obrębie bloku |
| Field | text / email / number / range | default / focus / invalid | zawsze etykieta i komunikat błędu |
| Metric card | cost / time / annual | default / updated | liczby aktualizowane w `aria-live` |
| Proof frame | desktop / mobile overlay | default | tylko realne screenshoty ELABS |
| Process step | 1–5 | default | zachowuje kanoniczną kolejność próbki |
| FAQ item | accordion | closed / open | natywny `details/summary` |
| Mobile nav | button + panel | closed / open | `aria-expanded`, zamknięcie po wyborze linku |

## 7. Inwentarz ekranu

| Sekcja | Cel | Główne komponenty | Status |
|---|---|---|---|
| Nawigacja + hero | obietnica i szybkie CTA | nav, badge, h1, CTA, proof frame | IMPLEMENTED |
| Problem | nazwanie kosztów procesu | 3 karty | IMPLEMENTED |
| Kalkulator | policzenie własnej skali | 2 główne parametry, założenia, 3 wyniki | IMPLEMENTED |
| Mechanizm | pokazanie jednej drogi próbki | 5 kroków procesu | IMPLEMENTED |
| Produkt | dowód realnego działania | screenshot + moduły | IMPLEMENTED |
| Pilot | obniżenie ryzyka | 3 etapy pilota | IMPLEMENTED |
| Wiarygodność + FAQ | odpowiedzi na obiekcje | founder card, details | IMPLEMENTED |
| Kontakt | rozpoczęcie rozmowy | formularz mailto + e-mail bezpośredni | IMPLEMENTED |

## 8. Dostępność

- Skip-link, semantyczne landmarki i logiczny porządek nagłówków.
- Widoczny focus `:focus-visible`.
- Suwaki mają powiązane pola liczbowe i opisy jednostek.
- Wynik kalkulatora ma `aria-live="polite"`.
- Informacja nie opiera się tylko na kolorze.
- Screenshoty mają opis alternatywny; dekoracyjne SVG są ukryte dla czytników.
- Formularz nie udaje wysłania danych — tworzy prawdziwą wiadomość e-mail.

## 9. Zakazy i wyjątki

- Bez niepotwierdzonych oszczędności, certyfikatów, integracji, cen, liczby miejsc i sztucznych deadline'ów.
- Bez obietnicy „zero błędów” i „100% odzyskanej kwoty”.
- Bez logotypów klientów i opinii, dopóki nie ma zgody i źródła.
- Kalkulator pokazuje estymację kosztu pracy. Formuła i założenia muszą być jawne i edytowalne.
- Domyślne założenia (`3 min/przepisanie`, `45 zł/h`) służą wyłącznie jako punkt startowy, nie jako dane branżowe.
- Produkcyjny screenshot może zostać skopiowany do repo jako statyczny dowód; nie wolno ujawniać danych klientów.

## 10. Weryfikacja

- [ ] Walidacja HTML / testy logiki kalkulatora
- [ ] Główny flow E2E: hero → kalkulator → CTA kontaktowe
- [ ] Mobile 390 px
- [ ] Tablet 768 px
- [ ] Desktop 1440 px
- [ ] Kalkulator: min/default/max + edycja założeń
- [ ] Menu, FAQ, formularz i focus klawiatury
- [ ] Porównanie z prototypem
- [ ] Produkcyjny URL + HTTP 200
