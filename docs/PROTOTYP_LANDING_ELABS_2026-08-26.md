# Prototyp — landing sprzedażowy ELABS

> Status: APPROVED FOR IMPLEMENTATION (kierunek wynikający z briefu Adriana)
> Data: 2026-08-26
> Cel: doprowadzić kierownika lub właściciela laboratorium od rozpoznania kosztu papierowego obiegu do umówienia krótkiego demo.

## Kluczowy flow

`Rozpoznaj ból → policz własny koszt → zobacz mechanizm ELABS → obejrzyj realny produkt → umów demo`

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
│ KALKULATOR:  próbki/mies. [slider + liczba] | przepisań [slider + liczba]  │
│             [wynik miesięczny] [wynik roczny] [godziny]                    │
│             Założenia kalkulacji (rozwijane, edytowalne)                   │
├────────────────────────────────────────────────────────────────────────────┤
│ Zamiast łatać papier kolejnym Excelem — jeden cyfrowy obieg                │
│ [1 zgłoszenie] → [2 pobór] → [3 rejestr] → [4 pracownia] → [5 wynik]      │
├────────────────────────────────────────────────────────────────────────────┤
│ Realny produkt, nie makieta       [duży screenshot pulpitu]                │
│ moduły + korzyści                 [podpis: ekran produkcyjny]               │
├────────────────────────────────────────────────────────────────────────────┤
│ Pilot jednego procesu: mapa → demo → decyzja                               │
├────────────────────────────────────────────────────────────────────────────┤
│ O Adrianie / wiarygodność operacyjna │ FAQ                                 │
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
│ Próbki [slider] [liczba]     │
│ Przepisania [slider] [liczba]│
│ Miesiąc / Rok / Godziny      │
│ Założenia                    │
├──────────────────────────────┤
│ Proces — 5 kroków pionowo    │
├──────────────────────────────┤
│ Realny screenshot            │
│ Funkcje / pilot / FAQ        │
├──────────────────────────────┤
│ Formularz CTA                │
└──────────────────────────────┘
```

## Stany do sprawdzenia

- Kalkulator: minimum, wartości domyślne, maksimum i ręczne wpisanie wartości.
- Założenia: zwinięte i rozwinięte; zmiana minut oraz kosztu godziny aktualizuje wynik.
- Nawigacja: menu mobilne otwiera się, zamyka i nie blokuje dalszego scrollowania.
- FAQ: pojedynczy otwarty element, poprawne `aria-expanded`.
- Kontakt: wymagane pola; po poprawnym wypełnieniu powstaje prawdziwy link `mailto:` z danymi, bez fałszywego komunikatu o wysłaniu.
- Brak JavaScript: treść i bezpośredni e-mail pozostają dostępne.

## Najważniejsza decyzja UX

Kalkulator liczy koszt pracy przeznaczonej na ręczne przepisywanie — nie obiecuje, że ELABS odzyska 100% tej kwoty. Dwa główne parametry są proste (`próbki/miesiąc`, `liczba ręcznych przepisań`), a założenia finansowe są jawne i edytowalne.
