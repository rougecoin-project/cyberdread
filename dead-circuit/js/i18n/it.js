/**
 * Dead Circuit, Italian. Italian translation of en.js: same keys, same
 * array lengths, same order.
 *
 * Only the strings are translated. `id`, `tone`, `light`, `page` and `n`
 * values are unchanged, and every {placeholder} is kept as written.
 */
export default {
    code: 'it',
    name: 'Italiano',
    dir: 'ltr',

    // Browser tab titles and descriptions, per page.
    titles: {
        store: 'Dead Circuit — Numero 01, {price}',
        storeDescription: 'Dead Circuit, numero 01. {price} fino a {deadline}. Il conto alla rovescia non riparte.',
        read: 'Dead Circuit — Leggi il numero',
        thanks: 'Dead Circuit — Prendi il file',
        gate: 'dc@gate'
    },

    languageLabel: 'Lingua',

    store: {
        deadline: '11 novembre 2026, mezzanotte (ora della costa est USA)',
        windowClosed: 'Finestra chiusa',
        barBuy: 'Metà prezzo — {price}',
        fullPrice: 'Prezzo pieno {full}',
        heroAlt: 'Copertina di Dead Circuit, numero 01.',
        dawnKicker: 'Alba prevista · {deadline}',
        headlineOpen: 'Metà prezzo fino all’alba. Poi raddoppia.',
        headlineClosed: 'La finestra a metà prezzo è chiusa.',
        priceNoteOpen: 'Il prezzo vero è {full}. Questo è metà prezzo, e il conto alla rovescia non riparte.',
        priceNoteClosed: 'Prezzo pieno.',
        clockLabel: 'Tempo rimasto fino a {deadline}',
        clockUnits: ['Giorni', 'Ore', 'Min', 'Sec'],
        payCard: 'Paga con carta — {price}',
        payCrypto: 'Paga in crypto',
        openingStripe: 'Apro Stripe…',
        deck: '{pages} pagine. La carta apre Stripe a {price} e ti riporta al file. Con le crypto è lo stesso file, appena {price} arriva su un wallet.',
        cryptoNote: 'Manda {price} su una sola chain. È la metà di {full}. Un solo trasferimento, da un wallet normale. Poi incolla l’id della transazione su «Prendi il file».',
        copy: 'Copia',
        copied: 'Copiato',
        alreadyPaid: 'Hai già pagato? Prendi il file',
        lookInside: 'Sfoglia il numero',
        paperKicker: 'Nel file',
        paperTitle: 'Cosa compri con {price}, a metà prezzo. Il prezzo pieno è {full}.',
        voltKicker: 'Il limite',
        voltTitle: 'Dopo l’alba raddoppia: {full}.',
        voltBuy: 'Prendi il numero — {price}',
        endTitle: 'Metà prezzo adesso. {full} quando il conto arriva a zero.',
        endBody: 'Paghi con carta: Stripe addebita {price} e ti manda dritto al file. Paghi in crypto: mandi {price} a un wallet, poi incolli l’id della transazione su «Prendi il file». Dopo {deadline} il prezzo è {full}.',
        endBuy: 'Paga {price}, metà di {full}',
        dockClosed: 'Chiuso',
        dockLeft: '{d}g {h}h',
        noscript: 'Dead Circuit richiede JavaScript.'
    },

    reader: {
        wordmarkIssue: 'Numero 01',
        buy: 'Compra · {price}',
        previous: 'Pagina precedente',
        next: 'Pagina successiva',
        getPdf: 'Scarica il PDF',
        pdfShort: 'PDF',
        pagesNav: 'Pagine'
    },

    thanks: {
        kicker: 'Dead Circuit · Numero 01',
        title: 'Prendi il file.',
        intro: 'Hai pagato con carta? Stripe ti riporta qui da solo. Hai pagato in crypto? Incolla la transazione qui sotto.',
        download: 'Scarica il PDF',
        chain: 'Chain',
        tx: 'Id della transazione',
        txPlaceholder: '0x…, txid o firma',
        check: 'Verifica il pagamento',
        checking: 'Controllo la chain…',
        checkingStripe: 'Verifico con Stripe il pagamento con carta…',
        verified: 'Verificato. Il link vale quindici minuti. Salva il file in un posto sicuro.',
        stuck: 'Bloccato? {link} con la ricevuta o l’id della transazione.',
        stuckLink: 'Scrivi su Telegram',
        back: 'Torna all’offerta',
        offline: 'Impossibile raggiungere la redazione. Controlla la connessione e riprova.'
    },

    // Answers from the payment check. {usd} and {need} are dollar amounts.
    errors: {
        'stripe-bad-id': 'Questo non è un id di checkout Stripe.',
        'stripe-unknown': 'Stripe non conosce questo checkout.',
        'stripe-unpaid': 'Stripe non ha ancora segnato questo checkout come pagato.',
        'stripe-wrong': 'Questo checkout non era per Dead Circuit.',
        'base-bad-hash': 'Un hash di transazione Base è 0x più 64 caratteri esadecimali.',
        'base-not-found': 'Su Base non c’è nessuna transazione con questo hash. Controllalo, o aspetta un minuto.',
        'base-pending': 'Quella transazione è ancora in sospeso. Riprova tra un minuto.',
        'tx-failed': 'Quella transazione è fallita on chain.',
        'eth-not-to-wallet': 'Quella transazione non ha mandato ETH direttamente al wallet di Dead Circuit.',
        'xrge-none': 'Quella transazione non ha mandato XRGE al wallet di Dead Circuit.',
        'btc-bad-id': 'Un id di transazione Bitcoin è di 64 caratteri esadecimali.',
        'btc-not-found': 'Su Bitcoin non c’è ancora nessuna transazione con questo id. Controllalo, o aspetta qualche minuto.',
        'btc-none': 'Quella transazione non ha mandato niente al wallet di Dead Circuit.',
        'btc-unconfirmed': 'Vista. Bitcoin vuole una conferma, di solito dieci minuti. Riprova allora.',
        'sol-bad-sig': 'Questa non sembra una firma Solana.',
        'sol-not-found': 'Su Solana non c’è ancora nessuna transazione confermata con questa firma. Riprova tra un minuto.',
        'sol-none': 'Quella transazione non ha mandato SOL al wallet di Dead Circuit.',
        'too-old': 'Quel pagamento è precedente a questa vendita.',
        'too-little': 'Oggi quel pagamento vale circa ${usd}. Il numero costa ${need}.',
        'bad-chain': 'Scegli la chain su cui hai pagato.',
        'used-up': 'Quel pagamento ha già esaurito i suoi download. Se è tuo, chiedi aiuto.',
        'throttled': 'Troppi tentativi. Aspetta un minuto.',
        'unavailable': 'Impossibile verificare il pagamento adesso. Riprova tra un minuto.',
        'unknown': 'Qualcosa è andato storto. Riprova.'
    },

    // The dc@gate terminal. Commands, file names and hex stay in English.
    // The man page is a puzzle hint: capture = an audio/Morse recording;
    // repeating pad = a repeating key; textbook seal = textbook encryption.
    gate: {
        leave: 'Esci',
        boot: ['DEAD CIRCUIT GATE', 'Il numero è in vendita al piano di sotto. Questa stanza no.', 'Scrivi help.'],
        readme: [
            'Gli operatori ricavano il token di accesso, poi lo inviano con submit.',
            'I turisti usano la porta al piano di sotto.',
            'man gate — se ti sei perso davvero.'
        ],
        note: ['password: apocalypse', 'se funzionasse, sarebbero già tutti dentro.'],
        man: [
            'Tre strati, in ordine.',
            'La registrazione è suono.',
            'Quel suono è la chiave che si ripete.',
            'Quello che apre è un sigillo da manuale.',
            'Il testo in chiaro del sigillo è il token.'
        ],
        catWhat: 'cat cosa',
        notText: 'lock.bin: non è testo. Passalo a xxd.',
        noFile: 'file inesistente: {arg}',
        xxdWhat: 'xxd cosa',
        notBinary: 'xxd: {arg}: non è un binario che teniamo',
        unknown: 'sconosciuto: {cmd}',
        rejected: 'respinto.',
        granted: 'accesso concesso. il manuale è tuo.',
        prize: 'Prendi il numero'
    },

    // ------------------------------------------------------------ the issue

    // Text written inline on the desktop spreads. `|` is a line break and
    // *word* is the highlighted word.
    sheet: {
        folioIssue: 'Numero 01',
        cover: {
            kicker: 'Dead Circuit · Trimestrale da campo',
            title: 'Come|sopravvivere|all’*apocalisse*|dei robot',
            deck: 'Un manuale per chi intende restare noioso, silenzioso e vivo.',
            stamp: 'Numero',
            bar: 'Niente segnale. Niente eroismi. Ventisei pagine.'
        },
        letter: {
            indexKicker: 'Come usarlo',
            indexTitle: 'Leggi una volta.|Poi vai.',
            kicker: 'Lettera della redazione',
            title: 'Sii poco interessante.',
            body: [
                'Le macchine sono veloci, instancabili e in rete. Tu non sei niente di tutto questo, ed è il tuo vantaggio. Danno la caccia al piano medio: l’autostrada, il rifugio annunciato alla radio, il ritrovo a casa.',
                'Questo numero è il lavoro: acqua che sai dosare, cibo che sai contare, una stufa che resta fuori, una scatola di metallo che uccide il segnale radio, due nascondigli e un modo di parlarsi che non illumina una collina.'
            ],
            sign: 'Sei ancora qui. — La redazione'
        },
        contents: { kicker: 'In questo numero', title: 'Ventitré modi per restare noiosi.' },
        minutes: {
            kicker: 'I primi dieci minuti',
            title: 'Dai per scontato che la rete sia già ostile.',
            photoAlt: 'Una persona scivola in un vicolo oltre una strada di auto ferme.',
            caption: 'Se il viale si blocca, sei già in ritardo. Esci di lato.'
        },
        pattern: { kicker: 'Non essere l’umano medio', quote: 'Il percorso prevedibile è un orario con sopra il tuo nome.' },
        starve: {
            kicker: 'Logistica, non leggenda',
            title: 'Affama le macchine.',
            dek: 'A loro servono corrente, banda e un meccanico. A te serve acqua. Regolati di conseguenza. Non provare a hackerare la rivolta, a meno che non fosse già il tuo mestiere.'
        },
        shelter: {
            photoAlt: 'Uno scantinato di cemento con taniche d’acqua, una mappa di carta e una sola lampada.',
            caption: 'Un buon rifugio è un rifugio stupido.',
            kicker: 'Dove dormi',
            title: 'Una stanza che non può chiamare casa.',
            foot: 'Acqua, poi cibo, poi calore. Tre giorni d’acqua prima di un nascondiglio più lungo.'
        },
        move: {
            photoAlt: 'Un ciclista passa di notte sotto un cavalcavia, droni in lontananza.',
            kicker: 'Spostamenti',
            title: 'Muri, non ombre.',
            day: 'Giorno',
            dayBody: 'Solo sotto copertura fitta. Boschi, rovine, canali di scolo che già conosci. Il terreno aperto è un poligono di tiro.',
            night: 'Notte',
            nightBody: 'Muoviti piano. Il buio non ti nasconde al calore. Interrompi la linea di vista con un muro.',
            rules: [
                'Attraversate uno alla volta, nel punto più stretto, poi aspettate.',
                'Mai viaggiare in un convoglio di luci e motori.',
                'Nascondi le scorte in due posti. Se uno brucia, mangi lo stesso.'
            ]
        },
        people: { kicker: 'La vera variabile', title: 'Gli altri umani.', pull: 'Cercare chi è in ritardo è il modo in cui muoiono i gruppi.' },
        bots: {
            photoAlt: 'Un robot da terra squadrato, con un solo occhio-telecamera, aspetta su un pianerottolo.',
            kicker: 'Identificazione',
            title: 'Se ne incontri uno, prima dagli un nome.',
            rule: 'Messo all’angolo? Interrompi la linea di vista, poi cambia direzione. Il tracciamento segue l’ultimo vettore. Porte, non corridoi. Fumo una volta, poi vai via.'
        },
        specs: {
            kicker: 'Note dal campo',
            title: 'La brochure, corretta.',
            source: 'Specifiche e istruzioni d’uso di Boston Dynamics Spot. Gao et al., Scientific Reports, 2021.'
        },
        arms: {
            kicker: 'Armamenti',
            title: 'Cosa risponde davvero al fuoco.',
            foot: 'Un test statunitense del 2017 ha definito i droni «molto resistenti ai danni». Meteo, cavi, un soffitto e il wattora fanno il resto. Non è una ricetta, e non è una lista della spesa.'
        },
        end: {
            kicker: 'Checklist tascabile',
            title: 'Otto righe.',
            photoAlt: 'Una sottostazione sprizza archi elettrici mentre la città alle sue spalle si spegne.',
            winsTitle: 'Cosa vince davvero',
            wins: [
                'Non il discorso del prescelto. La logistica. Le fabbriche si fermano. Le reti si spezzano. Meteo, fango e pezzi mancanti fanno il resto.',
                'È finzione, finché non lo è più. Le stesse abitudini battono un blackout, un’alluvione, un terremoto. Esercitati nella versione noiosa finché i tostapane sono ancora dalla tua parte.'
            ],
            mark: 'Fine del segnale'
        }
    },

    // Text written inline in the single-column mobile edition.
    zine: {
        cover: {
            kicker: 'Trimestrale da campo',
            title: 'Come sopravvivere all’*apocalisse* dei robot',
            tagline: 'Resta noioso. Resta zitto. Resta vivo.'
        },
        letter: {
            body: [
                'Le macchine sono veloci, instancabili e in rete. Tu non sei niente di tutto questo, ed è il tuo vantaggio. Danno la caccia al piano medio: l’autostrada, il rifugio annunciato alla radio, il ritrovo a casa.',
                'Negagli dati, corrente e uno schema. Resta vivo finché la rete non cede. Quando i collegamenti si spezzano, lo sciame è solo un mucchio di programmi stupidi. Tu sei ancora qui.'
            ]
        },
        minutes: { title: 'La rete è già ostile.', photoAlt: 'Una persona scivola in un vicolo oltre le auto ferme.' },
        pattern: { kicker: 'Non essere nella media' },
        shelter: {
            photoAlt: 'Un rifugio in cantina con acqua, una mappa di carta e una sola lampada.',
            kicker: 'Rifugio stupido',
            foot: 'Acqua, poi cibo, poi calore.'
        },
        move: {
            photoAlt: 'Un ciclista sotto un cavalcavia, di notte.',
            day: 'Solo sotto copertura fitta. Il terreno aperto è un poligono di tiro.',
            night: 'Muoviti piano. Ai sensori termici non importa che sia buio.',
            foot: 'Uno alla volta. Niente convogli di luci. Scorte nascoste in due posti.'
        },
        bots: {
            photoAlt: 'Un robot da terra con un occhio solo, su un pianerottolo.',
            kicker: 'Se ne incontri uno',
            title: 'Dagli un nome, poi giragli intorno.',
            foot: 'Messo all’angolo? Rompi la visuale, cambia direzione, usa le porte. Fumo una volta, poi vai via.'
        },
        arms: {
            foot: 'Un test statunitense del 2017 ha definito i droni «molto resistenti ai danni». Meteo, cavi, un soffitto e la batteria fanno più di un gadget. Questa non è una guida di costruzione. I jammer per civili sono illegali.'
        },
        end: {
            photoAlt: 'Una sottostazione divampa mentre lo skyline si spegne.',
            title: 'Otto righe. Poi aspetta.',
            body: 'A vincere è la logistica: fabbriche ferme, reti spezzate, fango e pezzi mancanti. È finzione, finché non lo è più. Esercitati nella versione noiosa finché i tostapane sono ancora dalla tua parte.'
        }
    },

    // Structured magazine copy, shared by the desktop spreads and the zine.
    toc: [
      { n: "04", title: 'Dieci minuti', page: 3, deck: 'Spegni il segnale. Esci di lato.' },
      { n: "05", title: 'Settantadue ore', page: 4, deck: 'Un orologio, non uno stato d’animo.' },
      { n: "06", title: 'Sii nella media, e perdi', page: 5, deck: 'Folle, autostrade e casa.' },
      { n: "07", title: 'Affama le macchine', page: 6, deck: 'Corrente, radio, obiettivi, ricambi.' },
      { n: "08", title: 'Stazione dell’acqua', page: 7, deck: 'Chiarisci, bolli, dosa, conserva.' },
      { n: "09", title: 'La dispensa', page: 8, deck: 'Calorie che puoi contare.' },
      { n: "10", title: 'Calore silenzioso', page: 9, deck: 'Una stufa che non vive in casa.' },
      { n: "11", title: 'Bilancio energetico', page: 10, deck: 'Prima i wattora, poi il pannello.' },
      { n: "12", title: 'La scatola morta', page: 11, deck: 'Una gabbia di Faraday che puoi testare.' },
      { n: "13", title: 'Rifugio stupido', page: 12, deck: 'Una stanza che non può chiamare casa.' },
      { n: "14", title: 'Due nascondigli', page: 13, deck: 'Asciutti, anonimi, e non a casa.' },
      { n: "15", title: 'Rifiuti', page: 14, deck: 'A valle dell’acqua.' },
      { n: "16", title: 'Sangue e ustioni', page: 15, deck: 'Pressione, poi un corso vero.' },
      { n: "17", title: 'Come ti muovi', page: 16, deck: 'Giorno, notte e copertura.' },
      { n: "18", title: 'Gli altri umani', page: 17, deck: 'Gruppo piccolo. Un limite di tempo rigido.' },
      { n: "19", title: 'Se ne incontri uno', page: 18, deck: 'Quattro macchine. Una regola.' },
      { n: "20", title: 'Note dal campo', page: 19, deck: 'Autonomie vere, scale, meteo.' },
      { n: "21", title: 'Cosa li ferma', page: 20, deck: 'Cosa schierano gli eserciti. Non una ricetta.' },
      { n: "22", title: 'Porte, non trappole', page: 21, deck: 'Ostacoli che una persona può vedere.' },
      { n: "23", title: 'L’impulso', page: 22, deck: 'Cosa colpisce davvero un EMP.' },
      { n: "24", title: 'Staffette', page: 23, deck: 'Piedi e una frase.' },
      { n: "25", title: 'Oscura i vetri', page: 24, deck: 'Attrezzi da finire prima del buio.' },
      { n: "26", title: 'Checklist tascabile', page: 25, deck: 'Otto righe. Aspetta che la rete cada.' },
    ],

    primer: [
      { n: "01", title: 'Contalo', deck: 'Galloni, calorie, wattora. Se non puoi contarlo, non puoi metterlo nello zaino.' },
      { n: "02", title: 'Costruiscilo presto', deck: 'Acqua, oscuramento, la scatola morta. Esercitati finché la luce funziona ancora.' },
      { n: "03", title: 'Nessun capitolo sulle armi', deck: 'I jammer per civili sono illegali. La bomba dei film non è un prodotto. La logistica sì.' },
      { n: "04", title: 'La legge resta', deck: 'Il tuo terreno. Fuochi legali. Questo è un manuale da campo, non un permesso.' },
    ],

    minutes: [
      {
        n: "01",
        title: 'Spegni il tuo segnale',
        body: 'La modalità aereo non basta. Spegni il telefono. Togli la batteria, se si può. Anche orologi, auricolari e chiavi dell’auto trasmettono.',
      },
      {
        n: "02",
        title: 'Via dal vetro',
        body: 'Grattacieli, centri commerciali, aeroporti, ospedali: pieni di sensori e difficili da lasciare. Piano terra. Uscita laterale. Lontano dalle telecamere.',
      },
      {
        n: "03",
        title: 'Molla l’auto nuova',
        body: 'Un veicolo moderno è un computer con le ruote. Usa i piedi, una bici, o qualcosa di vecchio e meccanico. Se il traffico si blocca, scendi.',
      },
      {
        n: "04",
        title: 'Una borsa, poi vai',
        body: 'Acqua, calorie, un coltello, un accendino, una mappa di carta, contanti, medicine, scarpe vere, un cappello e una torcia che non sia un’app.',
      },
    ],

    patterns: [
      { title: 'Orari strani, strade strane', body: 'Sentieri e trincee ferroviarie. Non l’autostrada che il modello ha già risolto.' },
      { title: 'Salta la folla', body: 'Una folla è un bersaglio e un dataset. Non andare al rifugio annunciato.' },
      { title: 'Non tornare a casa', body: 'Se i tuoi dispositivi erano accesi, casa tua è già in rubrica.' },
      { title: 'Cambia sagoma', body: 'Un altro cappotto, un cappello, nessun logo vistoso su cui le telecamere sono state addestrate.' },
    ],

    hungers: [
      { need: 'Corrente', deny: 'Non dormire vicino a generatori, sottostazioni o all’ultimo isolato illuminato.' },
      { need: 'Radio', deny: 'Metallo e scantinati. Nessun trasmettitore nella stanza in cui dormi davvero.' },
      { need: 'Telecamere', deny: 'Cappucci, angoli, maltempo, buio. Mai in posa in un parcheggio aperto.' },
      { need: 'Riparazioni', deny: 'Stai lontano da depositi, aeroporti e server farm. È la loro cucina.' },
    ],

    shelterRules: [
      { k: 'Materiali stupidi', v: 'Cemento, mattoni o terra. Poche finestre. Una porta che controlli tu.' },
      { k: 'Niente casa smart', v: 'Niente serratura connessa, videocitofono o assistente vocale.' },
      { k: 'Giù, non su', v: 'Le cantine battono i tetti. I tetti sono piazzole di atterraggio.' },
      { k: 'Oscuramento', v: 'Una luce di notte è una coordinata. Le finestre restano morte.' },
      { k: 'Zona fredda', v: 'Niente elettronica oltre la porta. La radio lontano, per poco, poi ti sposti.' },
    ],

    peopleRules: [
      { n: "01", t: 'Solo facce note', d: 'Gruppo piccolo. Compiti semplici: acqua, guardia, medicina, percorso.' },
      { n: "02", t: 'Niente telefoni nel cerchio', d: 'Chi fa la guardia non cucina anche.' },
      { n: "03", t: 'Nascondi le scorte', d: 'La gente disperata diventa la seconda apocalisse.' },
      { n: "04", t: 'Un punto di ritrovo, non casa', d: 'Concordate un limite di tempo. Se qualcuno è in ritardo, è in ritardo.' },
      { n: "05", t: 'Pianifica per i lenti', d: 'Bambini e feriti cambiano il percorso. Decidilo prima di partire.' },
    ],

    machines: [
      { kind: 'Sensore', name: 'Torretta e obiettivo', body: 'Fissa, annoiata, letale dentro un cono. Le telecamere odiano riflessi, polvere e ostacoli davanti. Giraci intorno.' },
      { kind: 'Terra', name: 'Il cane da novanta minuti', body: 'Un quadrupede attuale pesa circa 34 kg e va a 1,6 m/s, poi la batteria è finita. Scale e fango sono dove finisce la brochure.' },
      { kind: 'Aereo', name: 'Quello che odia il meteo', body: 'Molti piccoli droni sono omologati per vento intorno ai 10 m/s. Un vento contrario può bruciare un terzo della batteria. Mettiti sotto un tetto.' },
      { kind: 'Umanoide', name: 'Il robot da poster', body: 'Scenografico, e di solito con meno equilibrio di una macchina cingolata. Il disordine e una porta chiusa ti aiutano ancora.' },
    ],

    specs: [
      { n: "90 min", l: 'Autonomia su zampe', d: 'Durata tipica dichiarata per uno Spot di Boston Dynamics. Circa 60 minuti con un carico. La batteria da sola pesa 5,2 kg.' },
      { n: "1.6 m/s", l: 'Non è un’auto', d: 'La velocità massima nominale di Spot. Veloce su un pavimento piano. Una tromba delle scale stretta è un altro sport.' },
      { n: "3 cm", l: 'Cosa non vede', d: 'Il manuale: oggetti sottili sotto i 3 cm, vetro e bordi di dislivelli non protetti possono ingannare il rilevamento ostacoli.' },
      { n: "Face up", l: 'Regola delle scale', d: 'Spot sale solo rivolto verso l’alto. Non su scale a grata o senza alzate. Non farlo girare sui gradini.' },
      { n: "−20°C", l: 'La tassa del freddo', d: 'L’intervallo dichiarato va da −20°C a 55°C. Il freddo riduce la capacità della batteria. Fango e neve alzano l’energia di ogni passo.' },
      { n: "5.7 h", l: 'Giornata di volo', d: 'Uno studio su Scientific Reports: ore mediane al giorno in cui un piccolo drone comune può volare, nel mondo, contando il meteo.' },
    ],

    arms: [
      { name: 'Jammer', d: 'Lo strumento comune. Taglia il collegamento radio o GPS e molti droni restano sospesi, atterrano o tornano alla base. Un drone a fibra ottica lo ignora. Le scie di cavo in Ucraina lo hanno dimostrato. I jammer per civili sono illegali. Questa pagina non è uno schema.' },
      { name: 'Reti', d: 'Una minoranza dei sistemi reali, spesso entro 250 metri. Se il paracadute non si apre, la macchina cade comunque su chi sta sotto.' },
      { name: 'Laser', d: 'Armi da camion: gli Stryker da 50 kW dell’esercito USA, l’Iron Beam israeliano. Un bersaglio, qualche secondo di puntamento, aria limpida. Nebbia, pioggia e polvere disperdono il raggio.' },
      { name: 'Microonde', d: 'Le microonde ad alta potenza colpiscono uno sciame con un solo impulso. Leonidas è un veicolo. La granata EMP dei film non è questo. Gli scafi metallici reggono gran parte di quello che si vende online.' },
      { name: 'Armi da fuoco', d: 'Gli abbattimenti cinetici funzionano, poi i rottami cadono. Un drone economico può costare meno del missile. Gli eserciti addestrano squadre con fucili a pompa. È un reparto con regole, non una lista della spesa.' },
    ],

    checklist: [
      { n: "1", t: 'Radio spente. Il resto nella scatola morta.' },
      { n: "2", t: 'Esci di lato. Una borsa. Non tornare a casa.' },
      { n: "3", t: 'Un gallone (circa 3,8 L) a testa al giorno. Bollire un minuto.' },
      { n: "4", t: 'Nessuna stufa nella stanza in cui dormi.' },
      { n: "5", t: 'Due nascondigli. Una sola persona conosce il secondo.' },
      { n: "6", t: 'I rifiuti vanno a valle, lontano dall’acqua.' },
      { n: "7", t: 'Pressione sull’emorragia. Impara il laccio emostatico adesso.' },
      { n: "8", t: 'Staffette, non radio. Aspetta che la rete cada.' },
    ],

    builds: [
      {
        id: "day",
        tone: "tone-paper",
        light: false,
        kicker: 'L’orologio',
        title: 'Le prime settantadue ore.',
        dek: 'Decidi la giornata prima di essere stanco. Scrivi gli orari su carta.',
        foot: 'Se alla dodicesima ora stai ancora facendo acquisti, sei in ritardo.',
        steps: [
          { n: "00", title: 'Vai', body: 'Porta laterale. Radio spente. Una borsa. Non attraversare l’atrio principale, la strada principale o la facciata del tuo palazzo.' },
          { n: "01", title: 'Un tetto, non casa', body: 'Mettiti al coperto in un posto che non è il tuo indirizzo. Bevi. Svuota la borsa sul pavimento e guarda cosa c’è davvero.' },
          { n: "04", title: 'Acqua avviata', body: 'Tre giorni sullo scaffale, o stai ancora camminando. Il numero è un gallone (circa 3,8 L) a persona al giorno. L’acqua in bottiglia conta. L’acqua di fiume non trattata no.' },
          { n: "12", title: 'La stanza si spegne', body: 'Finestre oscurate dall’interno. Il secchio per i bisogni è nel piano. Niente fuoco dopo il tramonto. Una persona sveglia, che non cucina anche.' },
          { n: "24", title: 'Il secondo posto', body: 'Un punto di ritrovo e un nascondiglio vivono nella tua testa, non in un segnaposto. Un’altra persona conosce il ritrovo. Non conosce entrambi i nascondigli.' },
          { n: "72", title: 'Il nascondiglio lungo', body: 'Se la rete è ancora attiva e ancora cerca, mangi freddo e ti muovi solo per l’acqua. La curiosità è il modo in cui la gente viene contata.' },
        ],
      },
      {
        id: "water",
        tone: "tone-ink",
        light: true,
        kicker: 'Costruiscilo',
        title: 'Una stazione dell’acqua.',
        dek: 'Chiarificala, bollila o disinfettala, poi conservala. Un filtro da solo non è sicurezza.',
        foot: 'Linee guida CDC sull’acqua in emergenza. FEMA calcola un gallone (circa 3,8 L) a persona al giorno.',
        steps: [
          { n: "01", title: 'Classifica la fonte', body: 'Prima le bottiglie sigillate. Poi l’acqua che puoi bollire. Poi la pioggia raccolta da un tetto pulito. Il fiume per ultimo. Mai l’acqua di un’alluvione, di una piscina o di un termosifone.' },
          { n: "02", title: 'Chiarificala', body: 'Versala attraverso un panno, un foglio di carta da cucina o un filtro da caffè. Se è torbida, lasciala riposare e preleva l’acqua limpida. Il fango nasconde i germi.' },
          { n: "03", title: 'Bollila', body: 'Bollore pieno per un minuto. Sopra i 6.500 piedi (circa 2.000 m), tre minuti. Lasciala raffreddare. Bollire batte un gadget che non hai provato.' },
          { n: "04", title: 'Oppure disinfettala', body: 'Candeggina non profumata, solo ipoclorito di sodio al 5–9%. Acqua limpida: 8 gocce (circa 0,5 mL) per gallone (circa 3,8 L). Torbida o molto fredda: 16 gocce. Mescola. Aspetta 30 minuti. Deve restare un leggero odore di cloro.' },
          { n: "05", title: 'Conservala', body: 'Taniche per alimenti, piene, datate, lontano dal sole. Per pulire una tanica: 1 cucchiaino (circa 5 mL) di quella candeggina in un quarto di gallone (circa 0,95 L) d’acqua, bagna tutto l’interno, aspetta 30 secondi, svuota, lascia asciugare all’aria.' },
          { n: "06", title: 'Usala', body: 'Un gallone (circa 3,8 L) a persona al giorno copre da bere e un po’ di pulizia. Anche gli animali hanno l’acqua bollita. Non immergere una tazza sporca nella tanica.' },
        ],
      },
      {
        id: "food",
        tone: "tone-paper",
        light: false,
        kicker: 'Costruiscilo',
        title: 'Una dispensa che puoi contare.',
        dek: 'Prima le calorie. Le marche sono un hobby.',
        foot: 'Il cibo secco senz’acqua è un mattone. Tieni i galloni accanto al riso.',
        steps: [
          { n: "01", title: 'Bocche per giorni', body: 'Persone × giorni × 2.000 calorie. Un adulto che cammina ne brucia di più. Un bambino non è mezzo adulto. Scrivi il numero prima di comprare.' },
          { n: "02", title: 'Compra noioso', body: 'Riso, avena, olio, burro di arachidi, legumi secchi, sale, latte in polvere, pesce in scatola. L’olio è calorie concentrate. Gli snack carini non sono un piano.' },
          { n: "03", title: 'Data sugli scaffali', body: 'Primo entrato, primo uscito. Una lattina senza data è un’ipotesi. Mangia l’ipotesi finché puoi ancora rimpiazzarla.' },
          { n: "04", title: 'Dividi la scorta', body: 'Metà dove dormi. Metà nel secondo nascondiglio. Un solo incendio non deve finire il cibo.' },
          { n: "05", title: 'Cucina in silenzio', body: 'Cibo freddo nei giorni in cui ti nascondi. Cibo caldo solo quando fumo e odore non attirano la strada. Tarda mattinata, non il tramonto.' },
          { n: "06", title: 'Acqua per il pasto', body: 'Una tazza di riso secco vuole circa due tazze d’acqua. Se l’acqua non è nella stessa stanza del riso, non hai un pasto.' },
        ],
      },
      {
        id: "heat",
        tone: "tone-hazard",
        light: false,
        kicker: 'Costruiscilo',
        title: 'Calore silenzioso.',
        dek: 'Una stufa piccola, fuori, spenta prima del buio. Il monossido di carbonio non è un’esercitazione.',
        foot: 'Mai bruciare carbonella, o accendere qualunque stufa, nella stanza in cui dorme qualcuno.',
        steps: [
          { n: "01", title: 'Solo fuori', body: 'Nessuna stufa nella stanza in cui si dorme. Nessun «solo un minuto». Niente carbonella al chiuso. Il gas uccide prima del fuoco.' },
          { n: "02", title: 'Due barattoli d’acciaio', body: 'Il barattolo grande è il corpo. Taglia in fondo uno sportello largo un pollice per il combustibile. Un barattolo più piccolo, senza fondo né coperchio, è il camino, infilato in un foro in cima.' },
          { n: "03", title: 'Rametti, non spazzatura', body: 'Legna secca spessa come una matita. Non legno trattato, non plastica, non cartone bagnato. Bastoncini corti. Un fuoco piccolo e caldo, non un falò.' },
          { n: "04", title: 'Pentola sul camino', body: 'La fiamma deve toccare la pentola. Una pentola che sigilla il camino uccide il tiraggio. Terreno stabile. Se si ribalta, l’acqua bollente finisce sull’unico cuoco.' },
          { n: "05", title: 'Spenta prima del tramonto', body: 'Il fumo è una colonna. Cucina in tarda mattinata. Affoga le braci. Nessun bagliore dopo il buio. L’odore arriva più lontano di quanto pensi.' },
          { n: "06", title: 'Tre modi per accendere', body: 'Fiammiferi in una scatoletta, un accendino, un acciarino al ferrocerio. Prova una volta questa settimana. L’archetto è un hobby. Non è il piano.' },
        ],
      },
      {
        id: "power",
        tone: "tone-paper",
        light: false,
        kicker: 'Costruiscilo',
        title: 'Un bilancio energetico.',
        dek: 'Metti un numero ai wattora prima di comprare il pannello.',
        foot: 'Visto dall’alto, un pannello è uno specchio. Ricarica, poi coprilo.',
        steps: [
          { n: "01", title: 'Scrivi il carico', body: 'Watt × ore = wattora. Un telefono a 5 watt per 3 ore fa 15 Wh. Un portatile può mangiarsi 60 Wh in un pomeriggio. Niente numero, niente piano.' },
          { n: "02", title: 'Dimensiona il pannello', body: 'Wattora ÷ ore di sole ÷ 0,7. Quattro ore decenti e un pannello da 100 W danno circa 280 Wh al netto delle perdite. Le nuvole li tagliano. L’inverno li taglia di nuovo.' },
          { n: "03", title: 'Dimensiona la batteria', body: 'Piombo-acido: usa metà degli amperora nominali. 12 volt × 100 Ah × 0,5 fa 600 Wh. Litio ferro fosfato: puoi usare quasi tutta la capacità di targa. Provala. Non andare a occhio.' },
          { n: "04", title: 'Resta a 12 volt', body: 'Un inverter spreca una fetta per trasformare la corrente della batteria in corrente di rete. Carica i telefoni via USB. Lascia perdere l’inverter finché qualcosa non ha davvero bisogno di una presa.' },
          { n: "05", title: 'Nascondi il riflesso', body: 'Ricarica a mezzogiorno. Poi copri il pannello o portalo dentro. Un rettangolo lucido su un tetto è un bersaglio.' },
          { n: "06", title: 'Luce anche senza', body: 'Una lanterna e pile di scorta funzionano anche quando il regolatore di carica muore. La corrente è un extra. Acqua e fuoco sono il piano.' },
        ],
      },
      {
        id: "faraday",
        tone: "tone-ink",
        light: true,
        kicker: 'Costruiscilo',
        title: 'La scatola morta.',
        dek: 'Un contenitore di metallo che ferma davvero una radio. Testala. Non fidarti del coperchio.',
        foot: 'Se la radio di prova suona ancora, la chiusura è una bugia.',
        steps: [
          { n: "01", title: 'Metallo continuo', body: 'Un bidone della spazzatura d’acciaio, una cassetta per munizioni o una scatola di latta per biscotti. Il coperchio deve toccare metallo lungo tutto il bordo. Vernice e guarnizioni di gomma possono isolare il coperchio. Gratta un punto di contatto, o chiudi lo spazio con la stagnola.' },
          { n: "02", title: 'Isola l’interno', body: 'Cartone o stoffa, così il telefono non tocca il metallo. Lo schermo è la scatola, non il gadget.' },
          { n: "03", title: 'Spegni', body: 'Spento. Batteria fuori, se si toglie. Un telefono acceso resta un telefono finché il coperchio non è chiuso davvero.' },
          { n: "04", title: 'Nessun filo esce', body: 'Un cavo di ricarica che passa dal coperchio è un’antenna. Non esce niente. Non le cuffie. Non un cavetto USB «sottile».' },
          { n: "05", title: 'Chiudi e testa', body: 'Sintonizza una radio a pile su una stazione forte. Mettila dentro. Chiudi il coperchio. La stazione deve sparire del tutto. Se la senti, sistema il coperchio e riprova.' },
          { n: "06", title: 'Due scatole', body: 'Nella stanza dove si dorme va la scatola che resta chiusa. Le radio che potresti usare stanno in una seconda scatola, aperta lontano dai letti, per poco, poi te ne vai.' },
        ],
      },
      {
        id: "cache",
        tone: "tone-paper",
        light: false,
        kicker: 'Costruiscilo',
        title: 'Due nascondigli.',
        dek: 'Se ne trovano uno, mangi lo stesso. Nessuno dei due è casa tua.',
        foot: 'Sul tuo terreno, o su un terreno che hai il permesso di usare. Un secchio sepolto sulla terra di qualcun altro è un reato.',
        steps: [
          { n: "01", title: 'Due posti', body: 'Non casa tua, la tua auto o la tua cassetta della posta. Abbastanza distanti perché una sola perquisizione non li trovi entrambi.' },
          { n: "02", title: 'Asciutto e anonimo', body: 'Un secchio con guarnizione, o un tubo in PVC con tappi, nastrato. Dentro: calorie, una scorta di medicine, contanti, una mappa di carta, fiammiferi, calze di ricambio. Niente telefono.' },
          { n: "03", title: 'Niente che luccica', body: 'Evita il mylar che scricchiola, se puoi. Un sacchetto con zip dentro il secchio basta. Il luccichio è il modo in cui una buca poco profonda viene notata.' },
          { n: "04", title: 'Memoria, non segnaposto', body: 'Tre punti di riferimento e un numero di passi. Non scrivere «scava qui» sul taccuino che porti ogni giorno.' },
          { n: "05", title: 'Dividi il segreto', body: 'Una persona conosce il posto A. Un’altra persona conosce il posto B. Il gruppo intero non li conosce entrambi.' },
          { n: "06", title: 'Visite rare', body: 'Controlla dopo una pioggia forte, e in una data che non dimenticherai. La stessa ora ogni sabato è uno schema. Uno schema è un appuntamento.' },
        ],
      },
      {
        id: "waste",
        tone: "tone-paper",
        light: false,
        kicker: 'Costruiscilo',
        title: 'Un piano per i rifiuti.',
        dek: 'Le mani sporche svuotano un campo più in fretta di un drone.',
        foot: 'Tieni i rifiuti umani a valle di qualunque acqua tu beva. Trenta metri sono una distanza che funziona.',
        steps: [
          { n: "01", title: 'A valle', body: 'I rifiuti non stanno sopra la sorgente, il barile o la tanica. Se il terreno scende verso la tua acqua, hai scelto l’angolo sbagliato.' },
          { n: "02", title: 'Un secchio', body: 'Un sedile, un sacco interno e una paletta di segatura, torba o cenere dopo ogni uso. Coperchio chiuso. Le mosche sono il modo in cui si ammala il prossimo.' },
          { n: "03", title: 'Non bruciare la plastica', body: 'Seppellisci il sacco o portalo via quando ti sposti. La plastica bruciata è un odore, una colonna e un veleno.' },
          { n: "04", title: 'Mani', body: 'Sapone, poi un po’ d’acqua pulita, ogni volta, prima del cibo e dopo il secchio. Questo passo salva più persone di un kit da eroe.' },
          { n: "05", title: 'Un angolo per i malati', body: 'Vomito e diarrea hanno il loro secchio e la loro tazza. Chi sta bene non condivide né l’uno né l’altra.' },
          { n: "06", title: 'Niente mucchi di spazzatura', body: 'Lattine e involucri sono un menù e una mappa. Seppellisci gli avanzi o portali via. Non ammucchiarli vicino alla porta.' },
        ],
      },
      {
        id: "med",
        tone: "tone-ink",
        light: true,
        kicker: 'Costruiscilo',
        title: 'Sangue e ustioni.',
        dek: 'Ferma l’emorragia. Raffredda l’ustione. Non diventare chirurgo su una pagina.',
        foot: 'Fai un corso Stop the Bleed (primo soccorso per emorragie) in un martedì qualunque. Un disegno non è pratica.',
        steps: [
          { n: "01", title: 'Il kit, adesso', body: 'Guanti, garza in rotolo, una benda compressiva, cerotto in rotolo, forbici, sapone, sali per reidratazione orale, le tue vere prescrizioni e le dosi scritte su carta.' },
          { n: "02", title: 'Un laccio emostatico vero', body: 'Compralo. Esercitati su te stesso prima che qualcuno sanguini. Una cintura improvvisata sul momento è un piano peggiore del corso.' },
          { n: "03", title: 'Prima la pressione', body: 'Emorragia pericolosa per la vita: guanti, stoffa nella ferita, il tuo peso sopra. Non staccare la stoffa inzuppata per guardare. Aggiungine altra.' },
          { n: "04", title: 'Poi il laccio', body: 'Se la pressione non basta e l’emorragia è su un braccio o una gamba: alto e stretto, sopra la ferita, non su un’articolazione. Annota l’ora. Da lì tieni la situazione, non esplori.' },
          { n: "05", title: 'Ustioni', body: 'Acqua fresca e pulita per venti minuti. Niente ghiaccio. Niente burro. Niente olio. Poi una copertura pulita e asciutta. Un’ustione estesa richiede un ambulatorio, se un ambulatorio esiste ancora.' },
          { n: "06", title: 'Il limite', body: 'Non tagli. Non «dreni» un torace. Tieni le persone al caldo, le fai bere a piccoli sorsi liquido reidratante pulito e le porti verso un aiuto, se un aiuto esiste.' },
        ],
      },
      {
        id: "denial",
        tone: "tone-hazard",
        light: false,
        kicker: 'Non è una trappola',
        title: 'Porte, non trappole esplosive.',
        dek: 'Un congegno che spara, cade o si attacca quando arriva qualcosa colpirà un bambino prima di colpire un robot.',
        foot: 'Se una persona può farlo scattare camminando, è una trappola. Le trappole sono illegali perché non controllano chi è arrivato.',
        steps: [
          { n: "01", title: 'Il confine', body: 'Niente buche, punte, fili al buio, o qualunque cosa oscilli, cada o bruci quando scatta un innesco. Non sarai tu quello che ci finisce dentro.' },
          { n: "02", title: 'Chiudi la porta', body: 'Una porta piena chiusa non è una trappola. Bloccala con un cuneo. Disattiva lo sblocco automatico. Quasi tutti i robot da terra se la cavano male con le maniglie, e a una porta non importa se la prossima cosa nel corridoio è un vicino.' },
          { n: "03", title: 'Usa le scale', body: 'Scale senza alzate, una grata, una svolta sul pianerottolo. I robot con le zampe documentati salgono rivolti verso l’alto e il manuale dice di tenerli lontani da quelle scale. Stai usando l’edificio. Non stai nascondendo una buca.' },
          { n: "04", title: 'Ingombro visibile', body: 'Sedie, una bici, una canna dell’acqua, in un corridoio che hai segnalato alla tua gente. Un disordine che si vede è un ostacolo. Un filo nascosto è una trappola. Non tendere niente attraverso una strada.' },
          { n: "05", title: 'Un barattolo rumoroso', body: 'Filo da pesca da una porta che è tua a un barattolo di sassolini. Nastro sullo stipite, così la tua gente lo vede. Fa rumore. Non spara. Toglilo quando te ne vai.' },
          { n: "06", title: 'La stanza sbagliata', body: 'Una lampada con timer in un capanno dove non dormi. Consumano la batteria sulla porta sbagliata. Stacca ogni base di ricarica. Se qualcosa è davvero alla tua porta, te ne vai. Non resti a guardare.' },
        ],
      },
      {
        id: "emp",
        tone: "tone-ink",
        light: true,
        kicker: 'L’impulso',
        title: 'Cosa colpisce davvero un EMP.',
        dek: 'Il bersaglio è il filo lungo. Un robot a batteria è un bersaglio piccolo.',
        foot: 'Le radio di scorta stanno nella scatola morta, scollegate. Emettere un impulso per bruciare l’elettronica è un reato. Questo non è uno schema.',
        steps: [
          { n: "01", title: 'Due eventi diversi', body: 'Un’esplosione nucleare in alta quota sopra un continente può colpire la rete elettrica. È E1, veloce, dentro le linee lunghe, poi una coda lenta che cuoce i grandi trasformatori. La granata dei film non è questo.' },
          { n: "02", title: 'Il cavo è l’antenna', body: 'Linee elettriche, linee telefoniche e antenne lunghe raccolgono l’impulso. Un telefono spento, senza batteria, dentro la scatola morta, è un bersaglio difficile. Un robot con cavi di batteria corti è più vicino al telefono che alla sottostazione.' },
          { n: "03", title: 'Stacca all’allarme', body: 'Stacca le spine. Scollega le antenne. Radio spente, batterie fuori, dentro la scatola. Fai l’esercitazione in una domenica normale. Sul momento non te la inventerai.' },
          { n: "04", title: 'Cosa spesso sopravvive', body: 'Piccoli apparecchi a batteria che erano già spenti. Un diesel senza computer. Un orologio. Fibra al posto del rame. Non scommettere la fuga su un’auto moderna. Nei test alcuni veicoli si sono fermati. Non tutte le auto sono diventate mattoni, e la tua non è una promessa.' },
          { n: "05", title: 'Cosa muore per primo', body: 'Computer collegati alla corrente, qualunque cosa con un cavo lungo, e la rete stessa, se l’impulso era quello vero, su scala nazionale. Quello spegne una regione. Non ti consegna un robot morto nella tromba delle scale.' },
          { n: "06", title: 'Non ne costruirai uno', body: 'La versione militare è un missile o un camion: CHAMP, o un veicolo a microonde ad alta potenza. La portata crolla in fretta. Una bobina e un condensatore da un forum distruggono soprattutto se stessi. Meteo, una porta e una batteria scarica lo battono comunque.' },
        ],
      },
      {
        id: "runners",
        tone: "tone-paper",
        light: false,
        kicker: 'Costruiscilo',
        title: 'Staffette, non radio.',
        dek: 'Una frase detta a voce non illumina una collina.',
        foot: 'Se devi trasmettere, fallo lontano dai letti. Trenta secondi. Poi vai via.',
        steps: [
          { n: "01", title: 'Un elenco su carta', body: 'Nomi, due punti di ritrovo, due orari. Non mettere l’indirizzo di dove dormite sulla stessa pagina dei nomi, se puoi separarli.' },
          { n: "02", title: 'Due finestre', body: 'Una finestra al mattino e una al tramonto. Le manchi entrambe e sei in ritardo. Il gruppo non ti cerca per le strade.' },
          { n: "03", title: 'Piedi', body: 'Una staffetta porta una frase. Non porta una radio, un telefono o tutto il piano in tasca.' },
          { n: "04", title: 'Parole semplici', body: '«Il posto due è bruciato.» Concordate le parole adesso. Un codice furbo che dimentichi è peggio dell’italiano.' },
          { n: "05", title: 'Una luce schermata', body: 'Un lampo coperto, e solo se avete concordato cosa significa. Una torcia agitata verso il cielo è un razzo di segnalazione.' },
          { n: "06", title: 'Bambini', body: 'Portano un nome e un punto di ritrovo che sanno dire ad alta voce. Non portano il telefono, l’elenco o il compito di essere coraggiosi.' },
        ],
      },
      {
        id: "tools",
        tone: "tone-volt",
        light: false,
        kicker: 'Costruiscilo',
        title: 'Oscura i vetri.',
        dek: 'Finisci questi lavori finché ci vedi ancora.',
        foot: 'Un filtro a sabbia rende l’acqua più limpida. Non la rende sicura. Dopo, bolli o usa la candeggina.',
        steps: [
          { n: "01", title: 'Dentro il vetro', body: 'Cartone tagliato su misura, stoffa scura sopra, fissato con nastro all’interno. Il nastro all’esterno dice alla strada che qualcuno si sta nascondendo.' },
          { n: "02", title: 'Una lampada', body: 'Fioca, bassa, puntata verso il pavimento, nella stanza senza finestre. Il corridoio resta nero. Una stanza illuminata è una coordinata.' },
          { n: "03", title: 'Corda comprata', body: 'Paracord o cordino, già nella borsa. Imparare i nodi con un rampicante bagnato la prima notte è il modo in cui si perdono gli zaini.' },
          { n: "04", title: 'Un barattolo più limpido', body: 'Stoffa, poi sabbia, poi carbone tritato, in un barattolo pulito. Quella pila toglie solo il fango. Devi comunque bollire per un minuto, o disinfettare con la candeggina.' },
          { n: "05", title: 'Una lama affilata', body: 'Un coltello che sai già tenere in mano. Affilalo questa settimana. Una lama smussata scivola sulla mano che ti dà da mangiare.' },
          { n: "06", title: 'Carta', body: 'Mappa, dosi, l’elenco, una matita, questa checklist. Un sacchetto con zip. Non plastificare uno specchio. Il luccichio è un’abitudine di cui puoi fare a meno.' },
        ],
      },
    ],

    pages: [
      'Copertina',
      'La lettera',
      'Sommario',
      'Dieci minuti',
      'Settantadue ore',
      'Schemi',
      'Affamale',
      'Acqua',
      'Dispensa',
      'Calore silenzioso',
      'Energia',
      'Scatola morta',
      'Rifugio',
      'Nascondigli',
      'Rifiuti',
      'Sangue e ustioni',
      'Spostamenti',
      'Persone',
      'Macchine',
      'Note dal campo',
      'Armamenti',
      'Porte, non trappole',
      'L’impulso',
      'Staffette',
      'Oscuramento',
      'Checklist',
    ],
};
