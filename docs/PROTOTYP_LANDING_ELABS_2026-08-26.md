# Prototyp — landing sprzedażowy ELABS

> Status: APPROVED FOR IMPLEMENTATION (kierunek wynikający z briefu Adriana)
> Data: 2026-08-26
> Cel: doprowadzić kierownika lub właściciela laboratorium od rozpoznania kosztu papierowego obiegu do umówienia krótkiego demo.

## Kluczowy flow

`Obietnica → policz koszt i zobacz stan przed/po → rozpoznaj źródła kosztu → zobacz aktualny ELABS krok po kroku → umów demo`

Reguła finalnego copy: krótkie zdania, konkret operacyjny, bez półpauzy `—`, sloganów i niepotwierdzonych obietnic.

## Desktop 1440 px

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ ELABS       Jak działa  Kalkulator  System  Pilot          [Umów demo]    │
├────────────────────────────────────────────────────────────────────────────┤
│ [ZBUDOWANE OD ŚRODKA LABORATORIUM]                                        │
│ Od próbki do gotowego wyniku bez przepisywania.                            │
│ [Policz koszt generowania wyników] [Zobacz obieg ekran po ekranie]         │
├────────────────────────────────────────────────────────────────────────────┤
│ KALKULATOR: pracownicy [slider + liczba] | wyniki/mies. [slider + liczba]  │
│ ┌──────── PRZED ELABS ────────┐  ┌──── PO WDROŻENIU ELABS ─────────────┐ │
│ │ 26,5k/mies. · 318k/rok       │  │ 4,2k/mies. · 50k/rok              │ │
│ │ 530 h · 30 min / wynik       │  │ 83 h · 5 min / wynik              │ │
│ └──────────────────────────────┘  └──────────────────────────────────────┘ │
│ ODZYSKANY CZAS: 268k zł / rok (główna liczba) · 22,3k zł / mies. · 446,7 h│
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
│ Pilot jednego obiegu: mapa → demo → decyzja                                │
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
│ Kalkulator                   │
│ Pracownicy [slider] [liczba] │
│ Wyniki/mies. [slider] [liczba]│
│ Założenia                    │
│ ┌ PRZED ELABS ─────────────┐ │
│ │ koszt mies. + roczny      │ │
│ │ godziny / minuty          │ │
│ ├ PO WDROŻENIU ELABS ─────┤ │
│ │ koszt mies. + roczny      │ │
│ │ godziny / minuty          │ │
│ └──────────────────────────┘ │
│ Wartość czasu ROK / mies. / czas│
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
- Koszt z czasu zespołu i koszt z wolumenu są dwiema niezależnymi estymacjami tego samego procesu; kolumna „Przed ELABS” pokazuje ich średnią arytmetyczną, nigdy sumę.
- Przy `5 osób / 1000 wyników` wartości bazowe to: `28 000 zł` z czasu zespołu, `25 000 zł` z wolumenu, więc „Przed” pokazuje `26 500 zł/mies.` i `318 000 zł/rok`. „Po ELABS” pokazuje `4 167 zł/mies.` i `50 000 zł/rok`.
- Porównanie przed/po aktualizuje równolegle koszt miesięczny, koszt roczny, godziny i minuty na wynik. Podsumowanie pokazuje jako liczbę główną `268 000 zł/rok`, a niżej `22 333 zł/mies.`, `446,7 godz.` oraz `84,3%` redukcji ręcznej pracy.
- Nawigacja: menu mobilne otwiera się, zamyka i nie blokuje dalszego scrollowania.
- FAQ: pojedynczy otwarty element, poprawne `aria-expanded`.
- Kontakt: wymagane pola; po poprawnym wypełnieniu powstaje prawdziwy link `mailto:` z danymi, bez fałszywego komunikatu o wysłaniu.
- Brak JavaScript: treść i bezpośredni e-mail pozostają dostępne.

## Najważniejsza decyzja UX

Hero nie zawiera już ekranu produktu: po dwóch przyciskach bezpośrednio zaczyna się kalkulator. Liczy ten sam obecny koszt dwiema drogami (`czas zespołu` i `wolumen × 30 min`), a w kolumnie „Przed ELABS” pokazuje jedną średnią arytmetyczną. Obie kolumny podają koszt miesięczny i roczny oraz porównywalne godziny i minuty. Różnica jest pokazana najpierw jako roczna, a potem miesięczna wartość odzyskanego czasu do walidacji w pilocie, nie gwarantowana oszczędność gotówkowa.
