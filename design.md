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
- Hero: jedna kolumna z komunikatem i dwoma CTA; bez ekranu produktu. Kalkulator jest następnym blokiem i zaczyna się wizualnie bezpośrednio pod przyciskami.
- Sekcje: 72 px mobile / 104 px desktop.
- Kalkulator jest pierwszą sekcją po hero. Panel danych jest nad wynikiem, żeby pełne porównanie „Przed ELABS / Po wdrożeniu ELABS” miało na desktopie dwie równe kolumny; na mobile kolumny układają się pionowo.
- Galeria produktu: pulpit jako szeroki ekran otwierający oraz pięć kolejnych ekranów w dwóch kolumnach; jedna kolumna na mobile.
- Karty: 3 kolumny desktop, 2 tablet, 1 mobile.
- Breakpoint menu: 820 px.
- Wszystkie cele dotykowe minimum 44 × 44 px; brak poziomego scrolla przy 390 px.

## 6. Komponenty i stany

| Komponent | Warianty | Stany | Reguły użycia |
|---|---|---|---|
| Button | primary / secondary / ghost-on-dark | default / hover / focus / disabled | jeden primary w obrębie bloku |
| Field | text / email / number / range | default / focus / invalid | zawsze etykieta i komunikat błędu |
| Comparison card | Przed ELABS / Po wdrożeniu ELABS | default / updated | te same wymiary i metryki: jedna średnia kwota miesięczna, kwota roczna bezpośrednio pod nią, godziny i minuty na wynik; liczby aktualizowane w `aria-live` |
| Savings summary | rok / miesiąc / odzyskane godziny / redukcja ręcznej pracy | default / updated | roczny potencjał jest liczbą główną, miesięczny pomocniczą; pokazuje jedną średnią wartość, nie gwarantowaną oszczędność gotówkową |
| Proof frame | desktop browser / process gallery | default | tylko realne, aktualne screenshoty ELABS bez danych klientów |
| Process step | 1–5 | default | zachowuje kanoniczną kolejność próbki |
| FAQ item | accordion | closed / open | natywny `details/summary` |
| Mobile nav | button + panel | closed / open | `aria-expanded`, zamknięcie po wyborze linku |

## 7. Inwentarz ekranu

| Sekcja | Cel | Główne komponenty | Status |
|---|---|---|---|
| Nawigacja + hero | obietnica i szybkie CTA prowadzące bezpośrednio do kalkulatora | nav, badge, h1, dwa CTA; bez ekranu produktu | IMPLEMENTED V6 |
| Kalkulator bezpośrednio pod CTA | natychmiastowe policzenie skali i pokazanie stanu przed/po | suwaki: pracownicy + wyniki/miesiąc; dwie dynamiczne kolumny z kwotami miesiąc/rok; roczny potencjał jako liczba główna | IMPLEMENTED V6 |
| Problem | nazwanie źródeł policzonego kosztu | 3 karty | IMPLEMENTED |
| Mechanizm | pokazanie jednej drogi próbki | 5 kroków procesu | IMPLEMENTED |
| Produkt | dowód realnego działania | aktualny pulpit + sekwencja: rejestr, pracownia, kierownik, panel klienta | IMPLEMENTED |
| Pilot | obniżenie ryzyka | 3 etapy pilota | IMPLEMENTED |
| Wiarygodność + FAQ | odpowiedzi na obiekcje | przywrócona karta Adriana + `details` | IMPLEMENTED V3 |
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
- Kalkulator pokazuje estymację obecnego kosztu pracy i potencjału uwolnienia czasu. Nie nazywa całej różnicy gwarantowaną oszczędnością ELABS.
- Dwa suwaki to: liczba pracowników zaangażowanych w wyniki i łączna liczba wyników miesięcznie.
- Estymacja z czasu zespołu: `pracownicy × 8 h × 20 dni × 70% × 50 zł/h`.
- Estymacja z wolumenu: `wyniki × 30 min ÷ 60 × 50 zł/h`.
- To dwa sposoby oszacowania tego samego kosztu. W interfejsie pokazujemy jedną średnią arytmetyczną `(estymacja zespołu + estymacja wolumenu) ÷ 2`; nigdy nie przedstawiamy ich sumy jako kosztu.
- Scenariusz ELABS: `wyniki × 5 min ÷ 60 × 50 zł/h`; potencjał uwolnienia pokazujemy jako różnicę względem obu obecnych estymacji.
- Kolumna „Przed ELABS” pokazuje średni koszt miesięczny, koszt roczny bezpośrednio pod nim, średnią liczbę godzin i bieżące minuty na wynik. Kolumna „Po wdrożeniu ELABS” pokazuje analogicznie koszt miesięczny, roczny, godziny i minuty scenariusza ELABS.
- Pod kolumnami pokazujemy jedną średnią potencjalną wartość odzyskanego czasu miesięcznie i rocznie, średnie odzyskane godziny oraz procentową redukcję ręcznej pracy. Słowo „potencjalna” i zastrzeżenie pilota pozostają widoczne.
- Domyślne założenia (`70% czasu`, `8 h/dzień`, `20 dni/miesiąc`, `30 min/wynik`, `5 min/wynik w scenariuszu ELABS`, `50 zł brutto/h`) wynikają z roboczych ustaleń z wywiadów Adriana i pozostają jawne oraz edytowalne; nie przedstawiamy ich jako niezależnego benchmarku branżowego.
- Przy domyślnych `5 osób + 1000 wyników` estymacje to `28 000 zł` i `25 000 zł`, czyli średnio `26 500 zł/mies.` oraz `318 000 zł/rok`. Scenariusz ELABS to `4 167 zł/mies.`, `50 000 zł/rok` i `83,3 h`, a czas na wynik spada z 30 do 5 min, czyli 6× — nie 10–20×.
- Produkcyjny screenshot może zostać skopiowany do repo jako statyczny dowód; używamy ostatniego zweryfikowanego zestawu po aktualizacji UI 25.08.2026 i nie ujawniamy danych klientów.

## 10. Weryfikacja

- [x] Walidacja DOM / testy dwóch modeli i scenariusza ELABS
- [x] Główny flow E2E V4: hero → kalkulator przed/po → problem → aktualne ekrany → wiarygodność → CTA
- [x] Mobile 390 px
- [x] Tablet 768 px
- [x] Desktop 1440 px
- [x] Kalkulator: wartości domyślne + zmiana wszystkich założeń
- [x] Menu, FAQ, walidacja formularza i link `mailto:`
- [x] Porównanie z prototypem
- [x] Produkcyjny URL + HTTP 200, sekcja Adriana i kluczowa interakcja

Dowód V3 z 2026-08-26: Playwright `5/5`, brak overflow przy 390/768/1440, screenshoty w `_SCRATCH/ELABS_LANDING_V3_2026-08-26/`; commit `82f8abb`, GitHub Pages run `32951454882` = success. Produkcja HTTP 200; domyślne `25 000–28 000 zł`, zespół `28 000 zł`, wolumen `25 000 zł`, ELABS `4 167 zł`, potencjalnie uwolniona wartość `20 833–23 833 zł`, `6× mniej czasu`. Po zmianie wszystkich założeń: `19 200–23 760 zł`, ELABS `3 200 zł`. Karta Adriana i zdjęcie obecne, mobile bez overflow, błędy JS = 0.

Dowód V4 z 2026-08-26: kalkulator jest bezpośrednim następnikiem hero i pokazuje dynamiczne kolumny „Przed ELABS / Po wdrożeniu ELABS”. Playwright `5/5`, brak overflow przy 390/768/1440, screenshoty w `_SCRATCH/ELABS_LANDING_V4_2026-08-26/`; commit `bb5204e`, GitHub Pages run `32958181554` = success. Produkcja HTTP 200; wartości domyślne: przed `25 000–28 000 zł / 500–560 h / 30 min`, po `4 167 zł / 83,3 h / 5 min`, potencjał `20 833–23 833 zł/mies.` i `250 000–286 000 zł/rok`, redukcja `83,3–85,1%`. Po zmianie wszystkich założeń: `16 000–20 560 zł/mies.` i `192 000–246 720 zł/rok`. Karta Adriana i 5 ekranów produktu obecne, mobile bez overflow, błędy JS = 0.

Dowód V5 z 2026-08-26: widełki zastąpiono jedną średnią arytmetyczną, a obie kolumny pokazują koszt miesięczny i roczny. Playwright `5/5`, brak overflow przy 390/768/1440, screenshoty w `_SCRATCH/ELABS_LANDING_V5_2026-08-26/`; commit `003f108`, GitHub Pages run `32961347990` = success. Produkcja HTTP 200; wartości domyślne: przed `26 500 zł/mies. / 318 000 zł/rok`, po `4 167 zł/mies. / 50 000 zł/rok`, potencjał `22 333 zł/mies. / 268 000 zł/rok`, `446,7 h` i `84,3%`. Po zmianie wszystkich założeń: przed `21 480 zł/mies. / 257 760 zł/rok`, po `3 200 zł/mies. / 38 400 zł/rok`, potencjał `18 280 zł/mies. / 219 360 zł/rok`. Karta Adriana i 5 ekranów produktu obecne, mobile bez overflow, błędy JS = 0.

Dowód V6 z 2026-08-26: usunięto ekran produktu z hero, a kalkulator zaczyna się bezpośrednio po dwóch CTA; zmierzony odstęp CTA→nagłówek kalkulatora na mobile wynosi `64 px`. Roczny potencjał `268 000 zł` jest liczbą główną, miesięczny `22 333 zł` pomocniczą. Playwright `5/5`, brak overflow przy 390/768/1440, screenshoty w `_SCRATCH/ELABS_LANDING_V6_2026-08-26/`; commit `7279f9c`, GitHub Pages run `32962833496` = success. Produkcja HTTP 200, hero product visual = 0, późniejsza galeria = 5 ekranów, karta Adriana obecna, obrazy kompletne, błędy JS = 0.
