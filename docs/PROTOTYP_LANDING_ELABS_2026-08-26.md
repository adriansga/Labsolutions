# Prototyp — landing sprzedażowy ELABS

> Status: APPROVED FOR IMPLEMENTATION (kierunek wynikający z briefu Adriana)
> Data: 2026-08-26
> Cel: doprowadzić kierownika lub właściciela laboratorium od rozpoznania kosztu papierowego obiegu do umówienia krótkiego demo.

## Kluczowy flow

`Obietnica → policz koszt i zobacz stan przed/po → rozpoznaj źródła kosztu → zobacz aktualny ELABS krok po kroku → umów demo`

## Desktop 1440 px

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ ELABS       Jak działa  Kalkulator  System  Pilot          [Umów demo]    │
├────────────────────────────────────────────────────────────────────────────┤
│ [ZBUDOWANE OD ŚRODKA LABORATORIUM]                                        │
│ Mniej przepisywania. Mniej szukania.        ┌───────────────────────────┐ │
│ Jedna droga próbki — od zgłoszenia           │ realny ekran ELABS        │ │
│ do wyniku.                                   │ + mini karta statusu      │ │
│ [Policz koszt papieru] [Zobacz system]       └───────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────┤
│ KALKULATOR: pracownicy [slider + liczba] | wyniki/mies. [slider + liczba]  │
│ ┌──────── PRZED ELABS ────────┐  ┌──── PO WDROŻENIU ELABS ─────────────┐ │
│ │ 25–28k zł · 500–560 h · 30m │  │ 4,2k zł · 83 h · 5 min / wynik      │ │
│ └──────────────────────────────┘  └──────────────────────────────────────┘ │
│ POTENCJAŁ: 20,8–23,8k zł / mies. · 250–286k zł / rok · 417–477 h          │
│ Założenia: 70% · 8h · 20 dni · 30 min/wynik · ELABS 5 min · 50 zł/h       │
├────────────────────────────────────────────────────────────────────────────┤
│ Telefon/tablet · Jeden status · Panel klienta                              │
│ Czy dane tej samej próbki żyją w kilku miejscach?  [3 karty problemu]      │
├────────────────────────────────────────────────────────────────────────────┤
│ Zamiast łatać papier kolejnym Excelem — jeden cyfrowy obieg                │
│ [1 zgłoszenie] → [2 pobór] → [3 rejestr] → [4 pracownia] → [5 wynik]      │
├────────────────────────────────────────────────────────────────────────────┤
│ REALNY PRODUKT: [01 aktualny pulpit — szeroko]                              │
│ [02 zgłoszenie] [03 rejestr] [04 pracownia] [05 kierownik] [06 klient]     │
├────────────────────────────────────────────────────────────────────────────┤
│ Pilot jednego procesu: mapa → demo → decyzja                               │
├────────────────────────────────────────────────────────────────────────────┤
│ Karta Adriana / wiarygodność operacyjna │ FAQ                             │
├────────────────────────────────────────────────────────────────────────────┤
│ CTA: Pokaż mi swój obieg — odpowiadamy gotową mapą rozmowy                 │
│ [formularz: imię, firma, e-mail, próbki] [Przygotuj wiadomość]             │
└────────────────────────────────────────────────────────────────────────────┘
```

## Mobile 390 px

```text
┌──────────────────────────────┐
│ ELABS              [Menu]    │
│ Mniej przepisywania.         │
│ Mniej szukania.              │
│ Jedna droga próbki.          │
│ [Policz koszt]               │
│ [Zobacz system]              │
│ [screen produktu]            │
├──────────────────────────────┤
│ Kalkulator                   │
│ Pracownicy [slider] [liczba] │
│ Wyniki/mies. [slider] [liczba]│
│ Założenia                    │
│ ┌ PRZED ELABS ─────────────┐ │
│ │ koszt / godziny / minuty │ │
│ ├ PO WDROŻENIU ELABS ─────┤ │
│ │ koszt / godziny / minuty │ │
│ └──────────────────────────┘ │
│ Potencjał mies. / rok / czas │
├──────────────────────────────┤
│ 3 problemy — karty pionowo   │
├──────────────────────────────┤
│ Proces — 5 kroków pionowo    │
├──────────────────────────────┤
│ 6 realnych ekranów kolejno   │
│ Pilot / FAQ                  │
├──────────────────────────────┤
│ Formularz CTA                │
└──────────────────────────────┘
```

## Stany do sprawdzenia

- Kalkulator: minimum, wartości domyślne, maksimum i ręczne wpisanie liczby pracowników oraz wyników.
- Założenia: zwinięte i rozwinięte; zmiana udziału czasu, godzin/dnia, dni/miesiąc, minut na wynik, minut ELABS i stawki aktualizuje wynik.
- Koszt z czasu zespołu i koszt z wolumenu są dwiema niezależnymi estymacjami tego samego procesu; kolumna „Przed ELABS” pokazuje ich zakres, nigdy sumę.
- Przy `5 osób / 1000 wyników` wartości bazowe to: `28 000 zł` z czasu zespołu, `25 000 zł` z wolumenu, obecny zakres `25 000–28 000 zł`, ELABS `4 167 zł` i `6× mniej czasu` na wynik.
- Porównanie przed/po aktualizuje równolegle koszt, godziny i minuty na wynik. Podsumowanie pokazuje `20 833–23 833 zł/mies.`, `250 000–286 000 zł/rok`, `416,7–476,7 godz.` oraz procent redukcji ręcznej pracy.
- Nawigacja: menu mobilne otwiera się, zamyka i nie blokuje dalszego scrollowania.
- FAQ: pojedynczy otwarty element, poprawne `aria-expanded`.
- Kontakt: wymagane pola; po poprawnym wypełnieniu powstaje prawdziwy link `mailto:` z danymi, bez fałszywego komunikatu o wysłaniu.
- Brak JavaScript: treść i bezpośredni e-mail pozostają dostępne.

## Najważniejsza decyzja UX

Kalkulator znajduje się bezpośrednio pod hero. Nie zmusza dwóch przesłanek do jednego sztucznego mnożenia: liczy ten sam obecny koszt dwiema drogami (`czas zespołu` i `wolumen × 30 min`), a ich zakres pokazuje w kolumnie „Przed ELABS”. Obok podaje porównywalne metryki dla „Po wdrożeniu ELABS”. Różnica jest pokazana jako miesięczny i roczny potencjał odzyskanego czasu do walidacji w pilocie, nie gwarantowana oszczędność gotówkowa.
