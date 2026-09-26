/**
 * Dead Circuit, Italiano: public strings (site UI and the free preview).
 * The paid chapters are not here; they live sealed in content/issue-01/.
 * Mirrors en.js key for key; check with dead-circuit/js/i18n/check.mjs.
 */
export default {
    "code": "it",
    "name": "Italiano",
    "dir": "ltr",
    "titles": {
        "store": "Dead Circuit — Numero 01, {price}",
        "storeDescription": "Dead Circuit, numero 01. {price} fino a {deadline}. Il conto alla rovescia non riparte.",
        "read": "Dead Circuit — Leggi il numero",
        "thanks": "Dead Circuit — Prendi il file",
        "gate": "dc@gate"
    },
    "languageLabel": "Lingua",
    "disclaimer": {
        "kicker": "Leggi prima questo",
        "title": "Non ufficiale. Non testato. Speculativo.",
        "body": "Dead Circuit è una guida sul campo non ufficiale e indipendente per un’apocalisse robotica che non è mai avvenuta. Non abbiamo testato nulla di ciò che contiene. Raccoglie conoscenze generali già pubbliche, e i dispacci sono finzione. Non è una guida ufficiale per le emergenze né un consiglio medico, legale o di sicurezza. In una vera emergenza, segui le autorità locali e fatti formare come si deve.",
        "short": "Non ufficiale e non testato. Tratto da conoscenze pubbliche, per intrattenimento e spunti. Non è un consiglio ufficiale, medico, legale o di sicurezza."
    },
    "store": {
        "deadline": "11 novembre 2026, mezzanotte (ora della costa est USA)",
        "windowClosed": "Finestra chiusa",
        "barBuy": "Metà prezzo — {price}",
        "fullPrice": "Prezzo pieno {full}",
        "heroAlt": "Copertina di Dead Circuit, numero 01.",
        "dawnKicker": "Alba prevista · {deadline}",
        "headlineOpen": "Metà prezzo fino all’alba. Poi raddoppia.",
        "headlineClosed": "La finestra a metà prezzo è chiusa.",
        "priceNoteOpen": "Il prezzo vero è {full}. Questo è metà prezzo, e il conto alla rovescia non riparte.",
        "priceNoteClosed": "Prezzo pieno.",
        "clockLabel": "Tempo rimasto fino a {deadline}",
        "clockUnits": [
            "Giorni",
            "Ore",
            "Min",
            "Sec"
        ],
        "payCard": "Paga con carta — {price}",
        "payCrypto": "Paga in crypto",
        "openingStripe": "Apro Stripe…",
        "deck": "{pages} pagine. La carta apre Stripe a {price} e ti riporta al file. Con le crypto è lo stesso file, appena {price} arriva su un wallet.",
        "cryptoNote": "Manda {price} su una sola chain. È la metà di {full}. Un solo trasferimento, da un wallet normale. Poi incolla l’id della transazione su «Prendi il file».",
        "copy": "Copia",
        "copied": "Copiato",
        "alreadyPaid": "Hai già pagato? Prendi il file",
        "lookInside": "Sfoglia il numero",
        "paperKicker": "Nel file",
        "paperTitle": "Cosa compri con {price}, a metà prezzo. Il prezzo pieno è {full}.",
        "voltKicker": "Il limite",
        "voltTitle": "Dopo l’alba raddoppia: {full}.",
        "voltBuy": "Prendi il numero — {price}",
        "endTitle": "Metà prezzo adesso. {full} quando il conto arriva a zero.",
        "endBody": "Paghi con carta: Stripe addebita {price} e ti manda dritto al file. Paghi in crypto: mandi {price} a un wallet, poi incolli l’id della transazione su «Prendi il file». Dopo {deadline} il prezzo è {full}.",
        "endBuy": "Paga {price}, metà di {full}",
        "dockClosed": "Chiuso",
        "dockLeft": "{d}g {h}h",
        "noscript": "Dead Circuit richiede JavaScript."
    },
    "reader": {
        "wordmarkIssue": "Numero 01",
        "buy": "Compra · {price}",
        "previous": "Pagina precedente",
        "next": "Pagina successiva",
        "getPdf": "Scarica il PDF",
        "pdfShort": "PDF",
        "pagesNav": "Pagine",
        "locked": {
            "kicker": "L’anteprima finisce qui",
            "title": "Altre {count} pagine nel numero completo.",
            "body": "Ogni costruzione con il suo schema, due schede da compilare, altri cinque dispacci dall’Alba, tesserini tascabili da ritagliare e le fonti. Un solo PDF, nella tua lingua.",
            "cta": "Prendi il numero — {price}",
            "badge": "Nel numero completo",
            "listTitle": "Dentro il numero completo"
        }
    },
    "thanks": {
        "kicker": "Dead Circuit · Numero 01",
        "title": "Prendi il file.",
        "intro": "Hai pagato con carta? Stripe ti riporta qui da solo. Hai pagato in crypto? Incolla la transazione qui sotto.",
        "download": "Scarica il PDF",
        "chain": "Chain",
        "tx": "Id della transazione",
        "txPlaceholder": "0x…, txid o firma",
        "check": "Verifica il pagamento",
        "checking": "Controllo la chain…",
        "checkingStripe": "Verifico con Stripe il pagamento con carta…",
        "verified": "Verificato. Il link vale quindici minuti. Salva il file in un posto sicuro.",
        "stuck": "Bloccato? {link} con la ricevuta o l’id della transazione.",
        "stuckLink": "Scrivi su Telegram",
        "back": "Torna all’offerta",
        "offline": "Impossibile raggiungere la redazione. Controlla la connessione e riprova."
    },
    "errors": {
        "stripe-bad-id": "Questo non è un id di checkout Stripe.",
        "stripe-unknown": "Stripe non conosce questo checkout.",
        "stripe-unpaid": "Stripe non ha ancora segnato questo checkout come pagato.",
        "stripe-wrong": "Questo checkout non era per Dead Circuit.",
        "base-bad-hash": "Un hash di transazione Base è 0x più 64 caratteri esadecimali.",
        "base-not-found": "Su Base non c’è nessuna transazione con questo hash. Controllalo, o aspetta un minuto.",
        "base-pending": "Quella transazione è ancora in sospeso. Riprova tra un minuto.",
        "tx-failed": "Quella transazione è fallita on chain.",
        "eth-not-to-wallet": "Quella transazione non ha mandato ETH direttamente al wallet di Dead Circuit.",
        "xrge-none": "Quella transazione non ha mandato XRGE al wallet di Dead Circuit.",
        "btc-bad-id": "Un id di transazione Bitcoin è di 64 caratteri esadecimali.",
        "btc-not-found": "Su Bitcoin non c’è ancora nessuna transazione con questo id. Controllalo, o aspetta qualche minuto.",
        "btc-none": "Quella transazione non ha mandato niente al wallet di Dead Circuit.",
        "btc-unconfirmed": "Vista. Bitcoin vuole una conferma, di solito dieci minuti. Riprova allora.",
        "sol-bad-sig": "Questa non sembra una firma Solana.",
        "sol-not-found": "Su Solana non c’è ancora nessuna transazione confermata con questa firma. Riprova tra un minuto.",
        "sol-none": "Quella transazione non ha mandato SOL al wallet di Dead Circuit.",
        "too-old": "Quel pagamento è precedente a questa vendita.",
        "too-little": "Oggi quel pagamento vale circa ${usd}. Il numero costa ${need}.",
        "bad-chain": "Scegli la chain su cui hai pagato.",
        "used-up": "Quel pagamento ha già esaurito i suoi download. Se è tuo, chiedi aiuto.",
        "throttled": "Troppi tentativi. Aspetta un minuto.",
        "unavailable": "Impossibile verificare il pagamento adesso. Riprova tra un minuto.",
        "unknown": "Qualcosa è andato storto. Riprova."
    },
    "gate": {
        "leave": "Esci",
        "boot": [
            "DEAD CIRCUIT GATE",
            "Il numero è in vendita al piano di sotto. Questa stanza no.",
            "Scrivi help."
        ],
        "readme": [
            "Gli operatori ricavano il token di accesso, poi lo inviano con submit.",
            "I turisti usano la porta al piano di sotto.",
            "man gate — se ti sei perso davvero."
        ],
        "note": [
            "password: apocalypse",
            "se funzionasse, sarebbero già tutti dentro."
        ],
        "man": [
            "Tre strati, in ordine.",
            "La registrazione è suono.",
            "Quel suono è la chiave che si ripete.",
            "Quello che apre è un sigillo da manuale.",
            "Il testo in chiaro del sigillo è il token."
        ],
        "catWhat": "cat cosa",
        "notText": "lock.bin: non è testo. Passalo a xxd.",
        "noFile": "file inesistente: {arg}",
        "xxdWhat": "xxd cosa",
        "notBinary": "xxd: {arg}: non è un binario che teniamo",
        "unknown": "sconosciuto: {cmd}",
        "rejected": "respinto.",
        "granted": "accesso concesso. il manuale è tuo.",
        "prize": "Prendi il numero"
    },
    "sheet": {
        "folioIssue": "Numero 01",
        "cover": {
            "kicker": "Dead Circuit · Trimestrale da campo",
            "title": "Come|sopravvivere|all’*apocalisse*|dei robot",
            "deck": "Un manuale per chi intende restare noioso, silenzioso e vivo.",
            "stamp": "Numero",
            "bar": "Niente segnale. Niente eroismi. Trentanove pagine."
        },
        "letter": {
            "indexKicker": "Come usarlo",
            "indexTitle": "Leggi una volta.|Poi vai.",
            "kicker": "Lettera della redazione",
            "title": "Sii poco interessante.",
            "body": [
                "Le macchine sono veloci, instancabili e in rete. Tu non sei niente di tutto questo, ed è il tuo vantaggio. Danno la caccia al piano medio: l’autostrada, il rifugio annunciato alla radio, il ritrovo a casa.",
                "Questo numero è il lavoro: acqua che sai dosare, cibo che sai contare, una stufa che resta fuori, una scatola di metallo che uccide il segnale radio, due nascondigli e un modo di parlarsi che non illumina una collina."
            ],
            "sign": "Sei ancora qui. — La redazione"
        },
        "contents": {
            "kicker": "In questo numero",
            "title": "Ventitré modi per restare noiosi.",
            "also": "Dentro anche: sei dispacci dall’Alba · tre schemi di costruzione · due schede da compilare · tesserini tascabili · fonti"
        },
        "minutes": {
            "kicker": "I primi dieci minuti",
            "title": "Dai per scontato che la rete sia già ostile.",
            "photoAlt": "Una persona scivola in un vicolo oltre una strada di auto ferme.",
            "caption": "Se il viale si blocca, sei già in ritardo. Esci di lato."
        }
    },
    "zine": {
        "cover": {
            "kicker": "Trimestrale da campo",
            "title": "Come sopravvivere all’*apocalisse* dei robot",
            "tagline": "Resta noioso. Resta zitto. Resta vivo."
        },
        "letter": {
            "body": [
                "Le macchine sono veloci, instancabili e in rete. Tu non sei niente di tutto questo, ed è il tuo vantaggio. Danno la caccia al piano medio: l’autostrada, il rifugio annunciato alla radio, il ritrovo a casa.",
                "Negagli dati, corrente e uno schema. Resta vivo finché la rete non cede. Quando i collegamenti si spezzano, lo sciame è solo un mucchio di programmi stupidi. Tu sei ancora qui."
            ]
        },
        "minutes": {
            "title": "La rete è già ostile.",
            "photoAlt": "Una persona scivola in un vicolo oltre le auto ferme."
        }
    },
    "teaser": {
        "shelter": "Un buon rifugio è un rifugio stupido.",
        "move": "Muri, non ombre.",
        "bots": "Se ne incontri uno, prima dagli un nome."
    },
    "toc": [
        {
            "id": "minutes",
            "title": "Dieci minuti",
            "deck": "Spegni il segnale. Esci di lato."
        },
        {
            "id": "day",
            "title": "Settantadue ore",
            "deck": "Un orologio, non uno stato d’animo."
        },
        {
            "id": "pattern",
            "title": "Sii nella media, e perdi",
            "deck": "Folle, autostrade e casa."
        },
        {
            "id": "starve",
            "title": "Affama le macchine",
            "deck": "Corrente, radio, obiettivi, ricambi."
        },
        {
            "id": "water",
            "title": "Stazione dell’acqua",
            "deck": "Chiarisci, bolli, dosa, conserva."
        },
        {
            "id": "food",
            "title": "La dispensa",
            "deck": "Calorie che puoi contare."
        },
        {
            "id": "heat",
            "title": "Calore silenzioso",
            "deck": "Una stufa che non vive in casa."
        },
        {
            "id": "power",
            "title": "Bilancio energetico",
            "deck": "Prima i wattora, poi il pannello."
        },
        {
            "id": "faraday",
            "title": "La scatola morta",
            "deck": "Una gabbia di Faraday che puoi testare."
        },
        {
            "id": "shelter",
            "title": "Rifugio stupido",
            "deck": "Una stanza che non può chiamare casa."
        },
        {
            "id": "cache",
            "title": "Due nascondigli",
            "deck": "Asciutti, anonimi, e non a casa."
        },
        {
            "id": "waste",
            "title": "Rifiuti",
            "deck": "A valle dell’acqua."
        },
        {
            "id": "med",
            "title": "Sangue e ustioni",
            "deck": "Pressione, poi un corso vero."
        },
        {
            "id": "move",
            "title": "Come ti muovi",
            "deck": "Giorno, notte e copertura."
        },
        {
            "id": "people",
            "title": "Gli altri umani",
            "deck": "Gruppo piccolo. Un limite di tempo rigido."
        },
        {
            "id": "bots",
            "title": "Se ne incontri uno",
            "deck": "Quattro macchine. Una regola."
        },
        {
            "id": "specs",
            "title": "Note dal campo",
            "deck": "Autonomie vere, scale, meteo."
        },
        {
            "id": "arms",
            "title": "Cosa li ferma",
            "deck": "Cosa schierano gli eserciti. Non una ricetta."
        },
        {
            "id": "denial",
            "title": "Porte, non trappole",
            "deck": "Ostacoli che una persona può vedere."
        },
        {
            "id": "emp",
            "title": "L’impulso",
            "deck": "Cosa colpisce davvero un EMP."
        },
        {
            "id": "runners",
            "title": "Staffette",
            "deck": "Piedi e una frase."
        },
        {
            "id": "tools",
            "title": "Oscura i vetri",
            "deck": "Attrezzi da finire prima del buio."
        },
        {
            "id": "end",
            "title": "Checklist tascabile",
            "deck": "Otto righe. Aspetta che la rete cada."
        }
    ],
    "pages": {
        "cover": "Copertina",
        "letter": "La lettera",
        "contents": "Sommario",
        "d1": "Dispaccio 01",
        "minutes": "Dieci minuti",
        "day": "Settantadue ore",
        "w72": "Le tue 72 ore",
        "pattern": "Schemi",
        "starve": "Affamale",
        "d2": "Dispaccio 02",
        "water": "Acqua",
        "dwater": "Acqua, disegnata",
        "food": "Dispensa",
        "heat": "Calore silenzioso",
        "dstove": "Stufa, disegnata",
        "power": "Energia",
        "wpower": "Scheda energia",
        "faraday": "Scatola morta",
        "dbox": "Scatola morta, disegnata",
        "d3": "Dispaccio 03",
        "shelter": "Rifugio",
        "cache": "Nascondigli",
        "waste": "Rifiuti",
        "med": "Sangue e ustioni",
        "move": "Spostamenti",
        "people": "Persone",
        "d4": "Dispaccio 04",
        "bots": "Macchine",
        "specs": "Note dal campo",
        "arms": "Armamenti",
        "d5": "Dispaccio 05",
        "denial": "Porte, non trappole",
        "emp": "L’impulso",
        "runners": "Staffette",
        "tools": "Oscuramento",
        "cards": "Tesserini tascabili",
        "d6": "Dispaccio 06",
        "sources": "Fonti",
        "end": "Checklist"
    },
    "primer": [
        {
            "n": "01",
            "title": "Contalo",
            "deck": "Galloni, calorie, wattora. Se non puoi contarlo, non puoi metterlo nello zaino."
        },
        {
            "n": "02",
            "title": "Costruiscilo presto",
            "deck": "Acqua, oscuramento, la scatola morta. Esercitati finché la luce funziona ancora."
        },
        {
            "n": "03",
            "title": "Nessun capitolo sulle armi",
            "deck": "I jammer per civili sono illegali. La bomba dei film non è un prodotto. La logistica sì."
        },
        {
            "n": "04",
            "title": "La legge resta",
            "deck": "Il tuo terreno. Fuochi legali. Questo è un manuale da campo, non un permesso."
        }
    ],
    "minutes": [
        {
            "n": "01",
            "title": "Spegni il tuo segnale",
            "body": "La modalità aereo non basta. Spegni il telefono. Togli la batteria, se si può. Anche orologi, auricolari e chiavi dell’auto trasmettono."
        },
        {
            "n": "02",
            "title": "Via dal vetro",
            "body": "Grattacieli, centri commerciali, aeroporti, ospedali: pieni di sensori e difficili da lasciare. Piano terra. Uscita laterale. Lontano dalle telecamere."
        },
        {
            "n": "03",
            "title": "Molla l’auto nuova",
            "body": "Un veicolo moderno è un computer con le ruote. Usa i piedi, una bici, o qualcosa di vecchio e meccanico. Se il traffico si blocca, scendi."
        },
        {
            "n": "04",
            "title": "Una borsa, poi vai",
            "body": "Acqua, calorie, un coltello, un accendino, una mappa di carta, contanti, medicine, scarpe vere, un cappello e una torcia che non sia un’app."
        }
    ],
    "builds": [
        {
            "id": "day",
            "tone": "tone-paper",
            "light": false,
            "kicker": "L’orologio",
            "title": "Le prime settantadue ore.",
            "dek": "Decidi la giornata prima di essere stanco. Scrivi gli orari su carta.",
            "foot": "Se alla dodicesima ora stai ancora facendo acquisti, sei in ritardo.",
            "steps": [
                {
                    "n": "00",
                    "title": "Vai",
                    "body": "Porta laterale. Radio spente. Una borsa. Non attraversare l’atrio principale, la strada principale o la facciata del tuo palazzo."
                },
                {
                    "n": "01",
                    "title": "Un tetto, non casa",
                    "body": "Mettiti al coperto in un posto che non è il tuo indirizzo. Bevi. Svuota la borsa sul pavimento e guarda cosa c’è davvero."
                },
                {
                    "n": "04",
                    "title": "Acqua avviata",
                    "body": "Tre giorni sullo scaffale, o stai ancora camminando. Il numero è un gallone (circa 3,8 L) a persona al giorno. L’acqua in bottiglia conta. L’acqua di fiume non trattata no."
                },
                {
                    "n": "12",
                    "title": "La stanza si spegne",
                    "body": "Finestre oscurate dall’interno. Il secchio per i bisogni è nel piano. Niente fuoco dopo il tramonto. Una persona sveglia, che non cucina anche."
                },
                {
                    "n": "24",
                    "title": "Il secondo posto",
                    "body": "Un punto di ritrovo e un nascondiglio vivono nella tua testa, non in un segnaposto. Un’altra persona conosce il ritrovo. Non conosce entrambi i nascondigli."
                },
                {
                    "n": "72",
                    "title": "Il nascondiglio lungo",
                    "body": "Se la rete è ancora attiva e ancora cerca, mangi freddo e ti muovi solo per l’acqua. La curiosità è il modo in cui la gente viene contata."
                }
            ]
        }
    ],
    "dispatch": {
        "d1": {
            "kicker": "Dispaccio 01",
            "stamp": "Giorno 0 · 06:12",
            "place": "Il viale",
            "title": "Le auto si chiusero per prime.",
            "body": [
                "Non i motori. Le portiere. Quattro corsie di pendolari rimasero dietro vetri che non si aprivano, e il viale si fece così silenzioso che sentivo scattare i semafori, colori a cui nessuno obbediva più.",
                "Avevo il telefono in mano. Ancora non so perché lo spensi. Qualcosa nel modo in cui tutti gli schermi dell’autobus si accesero insieme, come se a tutti avessero fatto la stessa domanda.",
                "Non andai a casa. Casa era a trecento metri dal deposito, e il mio calendario lo sapeva. Mi mossi di lato: il vicolo di servizio, la trincea della ferrovia, la passerella che le mappe hanno smesso di mostrare anni fa. A mezzogiorno ero sotto un tetto che non era mio, e contavo quello che avevo nella borsa. Non bastava. Era un inizio."
            ],
            "sign": "— R., corriere"
        }
    }
};
