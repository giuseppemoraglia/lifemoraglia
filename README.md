# Life OS

Dashboard personale local-first, senza backend. Aprire GitHub Pages per il check-in quotidiano.

Daily, Home, North Star, Areas, Goals, Projects, Next Actions, Weekly e Monthly Review, Journal, finanze, promemoria e utenze.

## Dati

I dati sono salvati in localStorage del browser per origine. Persistono dopo chiusura e riapertura nel medesimo browser/profilo. Non sono sincronizzati tra dispositivi né salvati in GitHub. Evitare navigazione privata e cancellazione dati del sito. Esportare periodicamente un backup da Dati e decisioni. Per passare dall'app locale al sito online esportare e importare il JSON, senza caricarlo nel repository.

## Pubblicazione

Settings → Pages → Deploy from a branch → main → / (root). Nessuna build necessaria. I file pubblici contengono solo codice e modelli neutri. Calendar e Gmail opzionali richiedono Client ID OAuth e origine HTTPS autorizzata; nessun Client Secret.

## Avvio locale

`python3 -m http.server 5173 --bind 127.0.0.1`

## Verifica

Nella versione locale originaria: 24 test superati su persistenza, migrazione, conflitti, aggregazioni, utenze e integrazione Google. Verificare il salvataggio anche dopo il primo deploy.
