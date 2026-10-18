# PROTOTYP PODSTRONY PREZENTACJI ELABS

Status: zatwierdzony kierunek do implementacji

## Cel

Jednym linkiem otworzyć pełną prezentację ELABS dla kierowniczki lub zarządu. Użytkownik ma w ciągu kilku sekund zrozumieć, czego dotyczy film, uruchomić go i opcjonalnie przejść do wybranego rozdziału.

## Układ desktop

```text
+------------------------------------------------------------------+
| ELABS / labsolutions.pl                    Wróć do strony głównej |
+------------------------------------------------------------------+
| PREZENTACJA SYSTEMU · 18 MINUT                                   |
| Od telefonu klienta do gotowego wyniku                           |
| Krótki opis procesu i zakresu filmu                              |
|                                                                  |
| +--------------------------------------------------------------+ |
| |                                                              | |
| |                  ODTWARZACZ WIDEO 16:9                       | |
| |                                                              | |
| +--------------------------------------------------------------+ |
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
- Odtwarzacz zajmuje pełną szerokość kontenera i zachowuje 16:9.
- Rozdziały układają się pionowo jako cele dotykowe minimum 44 px.
- Brak poziomego przewijania przy 390 px.

## Stany

- Domyślny: widoczny poster, przycisk play i pełne natywne sterowanie.
- Odtwarzanie: użytkownik steruje głośnością, pełnym ekranem i osią czasu.
- Rozdział: klik ustawia czas filmu i uruchamia odtwarzanie.
- Błąd: natywny komunikat przeglądarki oraz bezpośredni link do pliku MP4.
- Ograniczony ruch: brak automatycznych animacji i autoplay.

## Copy

- Bez obietnic certyfikacji i bez stwierdzenia, że film zastępuje audyt zgodności.
- Standardy są przedstawiane jako mechanizmy wspierające pracę zgodną z wymaganiami, zgodnie ze scenariuszem filmu.
- Jedna akcja końcowa: kontakt w sprawie pilota lub prezentacji na żywo.
