# Taca.pl — MVP specification

## Cel projektu

Taca.pl to prosta platforma do:

- znajdowania parafii
- dokonywania jednorazowych wpłat
- dokonywania wpłat cyklicznych
- podglądu historii wpłat przez magic link

MVP ma być:

- minimalne
- czytelne
- łatwe do rozbudowy
- bez nadmiarowej architektury

Priorytet: działający produkt, nie perfekcyjna platforma.

Najważniejsza zasada:
Kod musi być skrajnie prosty, czytelny i zrozumiały dla człowieka.
Jeśli architektura robi się skomplikowana — należy ją uprościć.

---

## Stack technologiczny

Frontend + API:
- Next.js

UI:
- Tailwind CSS
- shadcn/ui

Backend danych:
- PocketBase

Hosting (docelowo):
- frontend: Vercel
- PocketBase: VPS / Railway / Fly.io

---

## Struktura katalogów

/app
/lib
/payments
/db
/config

Minimalizm jest ważniejszy niż skalowalność.
Nie dodajemy folderów bez realnej potrzeby.

---

### /pages

Widoki użytkownika:

- strona główna (wyszukiwarka parafii)
- strona parafii
- strona płatności
- panel wpłat (magic link)

To są tylko widoki. Zero ciężkiej logiki.

Każdy komponent jest osobnym plikiem w /components
Komponenty powtarzalne, proste, modularne
pages jedynie łączy komponenty – żadnej logiki w nim nie ma

wygląd strony ma być wzorowany na pomagam.pl

---

### /lib

Logika aplikacji:

- parishService → operacje na parafiach
- donationService → zapisywanie i odczyt wpłat
- emailService → wysyłanie maili
- authMagicLink → logika magic link

Każdy serwis:
- małe funkcje
- jasne nazwy
- brak ukrytych efektów ubocznych
- brak nadmiernej abstrakcji

---

### /payments

Integracja z operatorem płatności.

Zawiera:

- tworzenie płatności
- obsługę cyklicznych subskrypcji
- odbieranie webhooków
- aktualizację statusów wpłat

Ta warstwa jest odizolowana od reszty systemu.

---

### /db

Schemat danych PocketBase

Kolekcje:

parishes
- id
- name
- tag
- description
- location
- bank_account

donations
- id
- parish_id
- email
- amount
- type (one-time / recurring)
- status (pending / paid / failed)
- subscription_id
- created_at

magic_links
- id
- email
- token
- expires_at

---

### /config

Stałe systemowe:

- branding
- kolory
- limity
- ustawienia globalne

Zero magicznych wartości w kodzie.
Wszystko musi być nazwane.

---

## Logika wpłat

Operator płatności wykonuje obciążenia.

Taca.pl:

- zapisuje wpłatę
- aktualizuje status przez webhook
- pokazuje historię użytkownikowi

donationService = księgowość systemu
payments = komunikacja z operatorem

---

## Magic link

Użytkownik:

1. wpisuje email
2. dostaje link ważny ~30 minut
3. klika → panel wpłat

Brak kont
Brak haseł
Brak rejestracji

Panel pozwala:
- zobaczyć historię wpłat
- anulować subskrypcję

---

## Zasady projektowe (krytyczne)

Kod musi być:

- prosty
- czytelny
- przewidywalny
- nazwany
- bez skrótów
- bez „sprytnych” trików
- bez bałaganu
- bez nadmiarowej architektury

Priorytet:

czytelność > spryt > skalowalność

Jeśli kod robi się trudny do zrozumienia:
należy go uprościć.

---

## Zakres MVP

✔ wyszukiwarka parafii  
✔ strona parafii  
✔ wpłata jednorazowa  
✔ wpłata cykliczna  
✔ webhook płatności  
✔ historia wpłat przez magic link  

Bez:

❌ kont użytkowników  
❌ panelu parafii  
❌ zbiórek  
❌ ról  
❌ zaawansowanej administracji

To MVP, nie platforma na 5 lat.
