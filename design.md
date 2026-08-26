# DESIGN SYSTEM — ELABS LANDING

> Status: APPROVED
> Ostatnia aktualizacja: 2026-08-26
> Właściciel kierunku: Adrian / CTO
> Prototyp/referencje: `docs/PROTOTYP_LANDING_ELABS_2026-08-26.md`

## 1. Cel i odbiorca

- Produkt / ekran: sprzedażowy landing ELABS z kalkulatorem kosztu ręcznego generowania dokumentów i wyników.
- Główny użytkownik: właściciel, kierownik lub osoba operacyjna małego/średniego laboratorium.
- Zadanie użytkownika: policzyć czas i koszt generowania wyników, zobaczyć aktualny cyfrowy przepływ krok po kroku i umówić demo jednego procesu.
- Pożądane odczucie: wiarygodnie, konkretnie, spokojnie i operacyjnie — bez „startupowego dymu”.
- Zasada nadrzędna: najpierw własne liczby i realny proces, potem oferta.

## 2. Referencje i prototyp

| Źródło | Co wykorzystujemy | Czego nie kopiujemy |
|---|---|---|
| `APLIKACJA WEB/design.md` + produkcyjne screenshoty ELABS z 25.08.2026 po commicie `00d7983` | markę niebieski/cyjan, język operacyjny, kolejność procesu i realny dowód aktualnego produktu | gęstości ekranów roboczych aplikacji i danych klientów |
| BRAIN: Mirek Burneiko, `PROMPT 2 Strona Sprzedażowa.txt` + `3 Warsztat OFERTA.MD/2.md` | strukturę B2B: hero/CTA, problem, rozwiązanie, proces, dowód, kalkulator ROI, CTA | sztucznej presji, placeholderów, przypadkowych pakietów i obietnic |
| Dotychczasowy landing Labsolutions | perspektywę Adriana jako praktyka z laboratorium i statyczny, łatwy do wdrożenia format | ciemny „tech” styl, fałszywy formularz, countdown, niepotwierdzone certyfikaty/liczby |

Prototyp: `docs/PROTOTYP_LANDING_ELABS_2026-08-26.md`.

## 3. Zasady wizualne

- Jasna strona B2B z ciemnym, spokojnym hero i dużą ilością oddechu.
- Nagłówki są krótkie, bez kapitalików i bez krzykliwego języka.
- Realne, aktualne ekrany produktu są ważniejszym dowodem niż dekoracyjne mockupy; pokazujemy je w kolejności przejścia próbki.
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
- Galeria produktu: pulpit jako szeroki ekran otwierający oraz pięć kolejnych ekranów w dwóch kolumnach; jedna kolumna na mobile.
- Karty: 3 kolumny desktop, 2 tablet, 1 mobile.
- Breakpoint menu: 820 px.
- Wszystkie cele dotykowe minimum 44 × 44 px; brak poziomego scrolla przy 390 px.

## 6. Komponenty i stany

| Komponent | Warianty | Stany | Reguły użycia |
|---|---|---|---|
| Button | primary / secondary / ghost-on-dark | default / hover / focus / disabled | jeden primary w obrębie bloku |
| Field | text / email / number / range | default / focus / invalid | zawsze etykieta i komunikat błędu |
| Metric card | cost / annual / time / FTE / team load | default / updated | liczby aktualizowane w `aria-live` |
| Proof frame | desktop browser / process gallery | default | tylko realne, aktualne screenshoty ELABS bez danych klientów |
| Process step | 1–5 | default | zachowuje kanoniczną kolejność próbki |
| FAQ item | accordion | closed / open | natywny `details/summary` |
| Mobile nav | button + panel | closed / open | `aria-expanded`, zamknięcie po wyborze linku |

## 7. Inwentarz ekranu

| Sekcja | Cel | Główne komponenty | Status |
|---|---|---|---|
| Nawigacja + hero | obietnica i szybkie CTA | nav, badge, h1, CTA, proof frame | IMPLEMENTED |
| Problem | nazwanie kosztów procesu | 3 karty | IMPLEMENTED |
| Kalkulator | policzenie własnej skali | suwaki: pracownicy + wyniki/miesiąc; jawne 10 min/wynik, 55 zł/h i 168 h/FTE; koszt, czas, FTE i obciążenie zespołu | IMPLEMENTED |
| Mechanizm | pokazanie jednej drogi próbki | 5 kroków procesu | IMPLEMENTED |
| Produkt | dowód realnego działania | aktualny pulpit + sekwencja: rejestr, pracownia, kierownik, panel klienta | IMPLEMENTED |
| Pilot | obniżenie ryzyka | 3 etapy pilota | IMPLEMENTED |
| FAQ | odpowiedzi na obiekcje | wyłącznie `details`; bez osobnej sekcji twórcy i zdjęcia | IMPLEMENTED |
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
- Kalkulator pokazuje estymację kosztu pracy przeznaczonej na generowanie wyników. Nie nazywa całej kwoty gwarantowaną oszczędnością ELABS.
- Dwa suwaki to: liczba pracowników zaangażowanych w wyniki i łączna liczba wyników miesięcznie.
- Formuła kosztu: `wyniki × minuty na wynik ÷ 60 × koszt godziny`; liczba pracowników nie mnoży kosztu drugi raz, tylko pozwala policzyć udział czasu zespołu: `godziny dokumentacji ÷ (pracownicy × 168 h)`.
- Domyślne założenia (`10 min/wynik`, `55 zł/h`, `168 h/miesiąc na osobę`) wynikają z roboczych ustaleń z wywiadów Adriana i pozostają jawne oraz edytowalne; nie przedstawiamy ich jako niezależnego benchmarku branżowego.
- Produkcyjny screenshot może zostać skopiowany do repo jako statyczny dowód; używamy ostatniego zweryfikowanego zestawu po aktualizacji UI 25.08.2026 i nie ujawniamy danych klientów.

## 10. Weryfikacja

- [x] Walidacja DOM / testy logiki nowego kalkulatora
- [x] Główny flow E2E: hero → kalkulator → aktualne ekrany → CTA kontaktowe
- [x] Mobile 390 px
- [x] Tablet 768 px
- [x] Desktop 1440 px
- [x] Kalkulator: wartości domyślne + zmiana wszystkich założeń
- [x] Menu, FAQ, walidacja formularza i link `mailto:`
- [x] Porównanie z prototypem
- [x] Produkcyjny URL + HTTP 200 i poprawne ładowanie pięciu aktualnych screenshotów

Dowód wersji 2 z 2026-08-26: Playwright `5/5`, brak overflow przy 390/768/1440, screenshoty w `_SCRATCH/ELABS_LANDING_V2_2026-08-26/`; commit `f316132`, GitHub Pages run `32942826406` = success. Produkcja HTTP 200; wartości domyślne `18 333 zł`, `333,3 godz.`, `66,1%`; po zmianie `5 osób / 1000 wyników / 12 min / 60 zł / 160 h` = `12 000 zł` i `25%`. Pięć ekranów produktu załadowanych, sekcja twórcy nieobecna, mobile bez overflow, błędy JS = 0.
