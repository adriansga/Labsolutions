# Prototyp — landing sprzedażowy ELABS

> Status: APPROVED FOR IMPLEMENTATION (kierunek wynikający z briefu Adriana)
> Data: 2026-08-26
> Cel: doprowadzić kierownika lub właściciela laboratorium od rozpoznania kosztu papierowego obiegu do umówienia krótkiego demo.

## Kluczowy flow

`Rozpoznaj ból → policz koszt generowania wyników → zobacz aktualny ELABS krok po kroku → umów demo`

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
│ Telefon/tablet · Jeden status · Panel klienta                              │
├────────────────────────────────────────────────────────────────────────────┤
│ Czy dane tej samej próbki żyją w kilku miejscach?  [3 karty problemu]      │
├────────────────────────────────────────────────────────────────────────────┤
│ KALKULATOR: pracownicy [slider + liczba] | wyniki/mies. [slider + liczba]  │
│             [koszt mies.] [koszt rok] [godziny] [FTE] [obciążenie zespołu] │
│             Założenia: 10 min/wynik · 55 zł/h · 168 h/FTE (edytowalne)     │
├────────────────────────────────────────────────────────────────────────────┤
│ Zamiast łatać papier kolejnym Excelem — jeden cyfrowy obieg                │
│ [1 zgłoszenie] → [2 pobór] → [3 rejestr] → [4 pracownia] → [5 wynik]      │
├────────────────────────────────────────────────────────────────────────────┤
│ REALNY PRODUKT: [01 aktualny pulpit — szeroko]                              │
│ [02 zgłoszenie] [03 rejestr] [04 pracownia] [05 kierownik] [06 klient]     │
├────────────────────────────────────────────────────────────────────────────┤
│ Pilot jednego procesu: mapa → demo → decyzja                               │
├────────────────────────────────────────────────────────────────────────────┤
│ FAQ — bez sekcji twórcy i bez zdjęcia                                       │
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
│ 3 problemy — karty pionowo   │
├──────────────────────────────┤
│ Kalkulator                   │
│ Pracownicy [slider] [liczba] │
│ Wyniki/mies. [slider] [liczba]│
│ Koszt / Rok / Godziny / FTE  │
│ Obciążenie czasu zespołu     │
│ Założenia                    │
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
- Założenia: zwinięte i rozwinięte; zmiana minut, kosztu godziny oraz miesięcznej liczby godzin FTE aktualizuje wynik.
- Pracownicy wpływają na obciążenie zespołu, ale nie mnożą drugi raz czasu wynikającego z łącznej liczby dokumentów.
- Nawigacja: menu mobilne otwiera się, zamyka i nie blokuje dalszego scrollowania.
- FAQ: pojedynczy otwarty element, poprawne `aria-expanded`.
- Kontakt: wymagane pola; po poprawnym wypełnieniu powstaje prawdziwy link `mailto:` z danymi, bez fałszywego komunikatu o wysłaniu.
- Brak JavaScript: treść i bezpośredni e-mail pozostają dostępne.

## Najważniejsza decyzja UX

Kalkulator liczy koszt czasu przeznaczanego na generowanie dokumentów — nie obiecuje, że ELABS odzyska 100% tej kwoty. Dwa główne parametry są proste (`pracownicy zaangażowani w wyniki`, `wyniki/miesiąc`), a założenia czasu i kosztu są jawne oraz edytowalne. Domyślne `4 osoby + 2500 wyników` przy `10 min/wynik` pokazuje ok. 62% dostępnego czasu zespołu, co pozwala skonfrontować kalkulację z hipotezą 60–70% z wywiadów.
