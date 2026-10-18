# PROTOTYP PODSTRONY PREZENTACJI ELABS

Status: zatwierdzony kierunek, aktualizacja 2026-10-18: dominujący odtwarzacz z ręcznym Play

## Cel

Jednym linkiem otworzyć pełną prezentację ELABS dla kierowniczki lub zarządu. Użytkownik ma w ciągu kilku sekund zrozumieć, czego dotyczy film, uruchomić go i opcjonalnie przejść do wybranego rozdziału.

## Układ desktop

```text
+------------------------------------------------------------------+
| [LOGO LABSOLUTIONS]                                               |
+------------------------------------------------------------------+
| PREZENTACJA SYSTEMU · 18 MINUT                                   |
| Od telefonu klienta do gotowego wyniku                           |
|                                                                  |
| +----------------------------------------------------------------+|
| |                                                              | |
| |          DOMINUJĄCY ODTWARZACZ 16:9, PEŁNE OKNO              | |
| |                    [ DUŻY SZARY PLAY ]                       | |
| |                                                              | |
| +----------------------------------------------------------------+|
| [▶] 00:00 [============ POSTĘP =============] 18:30 [Dźwięk] [Pełny ekran] |
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

- Właściwy znak logo jest jedynym elementem górnego paska i po kliknięciu wraca na stronę główną.
- Nagłówek ma maksymalnie trzy krótkie wiersze.
- Cały odtwarzacz razem ze stałym paskiem sterowania mieści się w pierwszym ekranie.
- Przycisk włączenia dźwięku pozostaje duży, czytelny i nie zasłania treści filmu.
- Rozdziały układają się pionowo jako cele dotykowe minimum 44 px.
- Brak poziomego przewijania przy 390 px.

## Stany

- Domyślny: film pozostaje zatrzymany na miniaturze; duży szary przycisk Play jest jednoznacznie widoczny pośrodku.
- Start: kliknięcie Play uruchamia film od początku z dźwiękiem i ukrywa nakładkę.
- Odtwarzanie: własny pasek z pauzą, czasem, osią postępu, dźwiękiem i pełnym ekranem pozostaje stale widoczny także w pełnym ekranie. Bez JavaScript dostępne jest sterowanie natywne.
- Rozdział: klik ustawia czas filmu i uruchamia odtwarzanie.
- Błąd: natywny komunikat przeglądarki oraz bezpośredni link do pliku MP4.
- Ograniczony ruch: brak dekoracyjnych animacji; film pozostaje wyciszony do świadomego kliknięcia.
- Link zwykły: nie uruchamia pomiaru oglądania.
- Link indywidualny: zapisuje otwarcie, realny czas odtwarzania, ostatni oraz najdalszy moment, dźwięk i zakończenie; strona prezentacji nie dokłada osobnego komunikatu pod odtwarzaczem.
- Raport prywatny: cztery główne metryki oraz tabela wizyt; dostęp tylko przez osobny losowy token administratora. Formularz nazwa odbiorcy → utwórz i skopiuj link pozwala samodzielnie przygotować osobne adresy dla 10 lub większej liczby osób.

## Copy

- Bez obietnic certyfikacji i bez stwierdzenia, że film zastępuje audyt zgodności.
- Standardy są przedstawiane jako mechanizmy wspierające pracę zgodną z wymaganiami, zgodnie ze scenariuszem filmu.
- Jedna akcja końcowa: kontakt w sprawie pilota lub prezentacji na żywo.
