# PROTOTYP PODSTRONY PREZENTACJI ELABS

Status: zatwierdzony kierunek, aktualizacja 2026-10-18: dominujący odtwarzacz i autoplay

## Cel

Jednym linkiem otworzyć pełną prezentację ELABS dla kierowniczki lub zarządu. Użytkownik ma w ciągu kilku sekund zrozumieć, czego dotyczy film, uruchomić go i opcjonalnie przejść do wybranego rozdziału.

## Układ desktop

```text
+------------------------------------------------------------------+
| ELABS / labsolutions.pl                    Wróć do strony głównej |
+------------------------------------------------------------------+
| PREZENTACJA SYSTEMU · 18 MINUT                                   |
| Od telefonu klienta do gotowego wyniku                           |
|                                                                  |
| +----------------------------------------------------------------+|
| |                                                              | |
| |          DOMINUJĄCY ODTWARZACZ 16:9, AUTOPLAY MUTED          | |
| |              [Włącz dźwięk i zacznij od początku]            | |
| |                                                              | |
| +----------------------------------------------------------------+|
| Film pokazuje stan procesu...                                    |
+------------------------------------------------------------------+
| ROZDZIAŁY                                                        |
| [00:00 Problem] [02:48 Rozwiązanie] [04:05 Standardy] [08:20...] |
+------------------------------------------------------------------+
| Co zobaczysz: obieg próbki / odpowiedzialność / klient i wynik   |
+------------------------------------------------------------------+
| Chcesz omówić wdrożenie?                      [Umów rozmowę]      |
+------------------------------------------------------------------+
```

## Układ mobile

- Logo i powrót układają się w jednym prostym pasku.
- Nagłówek ma maksymalnie trzy krótkie wiersze.
- Odtwarzacz zajmuje niemal całą szerokość ekranu i zachowuje 16:9.
- Przycisk włączenia dźwięku pozostaje duży, czytelny i nie zasłania treści filmu.
- Rozdziały układają się pionowo jako cele dotykowe minimum 44 px.
- Brak poziomego przewijania przy 390 px.

## Stany

- Domyślny: film uruchamia się automatycznie bez dźwięku, zgodnie z ograniczeniami przeglądarek.
- Dźwięk: widoczny przycisk włącza dźwięk, cofa film do początku i ukrywa się po udanej akcji.
- Fallback: jeśli przeglądarka zablokuje autoplay, ten sam przycisk ręcznie uruchamia film.
- Odtwarzanie: użytkownik nadal steruje pauzą, głośnością, pełnym ekranem i osią czasu.
- Rozdział: klik ustawia czas filmu i uruchamia odtwarzanie.
- Błąd: natywny komunikat przeglądarki oraz bezpośredni link do pliku MP4.
- Ograniczony ruch: brak dekoracyjnych animacji; film pozostaje wyciszony do świadomego kliknięcia.
- Link zwykły: nie uruchamia pomiaru oglądania.
- Link indywidualny: pokazuje krótką informację o pomiarze i zapisuje otwarcie, realny czas odtwarzania, ostatni oraz najdalszy moment, dźwięk i zakończenie.
- Raport prywatny: cztery główne metryki oraz tabela wizyt; dostęp tylko przez osobny losowy token administratora. Formularz nazwa odbiorcy → utwórz i skopiuj link pozwala samodzielnie przygotować osobne adresy dla 10 lub większej liczby osób.

## Copy

- Bez obietnic certyfikacji i bez stwierdzenia, że film zastępuje audyt zgodności.
- Standardy są przedstawiane jako mechanizmy wspierające pracę zgodną z wymaganiami, zgodnie ze scenariuszem filmu.
- Jedna akcja końcowa: kontakt w sprawie pilota lub prezentacji na żywo.
