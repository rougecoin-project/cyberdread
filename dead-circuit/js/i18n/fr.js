/**
 * Dead Circuit, French (Français). Translation of en.js: same keys, same
 * array lengths, same order.
 *
 * Only the strings are translated. `id`, `tone`, `light`, `page` and `n`
 * values are unchanged, and every {placeholder} is kept as written.
 * European French, tutoiement, French typography (non-breaking spaces
 * before : ; ? ! and inside « »).
 */
export default {
    code: 'fr',
    name: 'Français',
    dir: 'ltr',

    // Browser tab titles and descriptions, per page.
    titles: {
        store: 'Dead Circuit — Numéro 01, {price}',
        storeDescription: 'Dead Circuit, numéro 01. {price} jusqu’au {deadline}. Le compte à rebours ne repart pas de zéro.',
        read: 'Dead Circuit — Lire le numéro',
        thanks: 'Dead Circuit — Récupère le fichier',
        gate: 'dc@gate'
    },

    languageLabel: 'Langue',

    store: {
        deadline: '11 nov. 2026, minuit (heure de l’Est des États-Unis)',
        windowClosed: 'Fenêtre fermée',
        barBuy: 'Moitié prix — {price}',
        fullPrice: 'Plein tarif {full}',
        heroAlt: 'Couverture de Dead Circuit, numéro 01.',
        dawnKicker: 'Aube prévue · {deadline}',
        headlineOpen: 'Moitié prix jusqu’à l’aube. Ensuite, ça double.',
        headlineClosed: 'La fenêtre à moitié prix est fermée.',
        priceNoteOpen: 'Le vrai prix est de {full}. Ici, c’est moitié prix, et le compte à rebours ne repart pas de zéro.',
        priceNoteClosed: 'Plein tarif.',
        clockLabel: 'Temps restant jusqu’au {deadline}',
        clockUnits: ['Jours', 'Heures', 'Min', 'Sec'],
        payCard: 'Payer par carte — {price}',
        payCrypto: 'Payer en crypto',
        openingStripe: 'Ouverture de Stripe…',
        deck: '{pages} pages. La carte ouvre Stripe à {price} et te ramène au fichier. La crypto, c’est le même fichier, dès que {price} arrive sur un portefeuille.',
        cryptoNote: 'Envoie {price} sur une seule chaîne. C’est la moitié de {full}. Un seul virement, depuis un portefeuille ordinaire, puis colle l’identifiant de transaction sur Récupère le fichier.',
        copy: 'Copier',
        copied: 'Copié',
        alreadyPaid: 'Déjà payé ? Récupère le fichier',
        lookInside: 'Feuilleter le numéro',
        paperKicker: 'Dans le dossier',
        paperTitle: 'Ce que {price} à moitié prix t’achète. Le plein tarif est de {full}.',
        voltKicker: 'La limite',
        voltTitle: 'Après l’aube, le prix double : {full}.',
        voltBuy: 'Prendre le numéro — {price}',
        endTitle: 'Moitié prix maintenant. {full} quand le compteur tombe à zéro.',
        endBody: 'Par carte, Stripe débite {price}, puis t’envoie directement au fichier. En crypto, envoie {price} à un seul portefeuille, puis colle l’identifiant de transaction sur Récupère le fichier. Après le {deadline}, le prix passe à {full}.',
        endBuy: 'Payer {price}, la moitié de {full}',
        dockClosed: 'Fermé',
        dockLeft: '{d} j {h} h',
        noscript: 'Dead Circuit a besoin de JavaScript.'
    },

    reader: {
        wordmarkIssue: 'Numéro 01',
        buy: 'Acheter · {price}',
        previous: 'Page précédente',
        next: 'Page suivante',
        getPdf: 'Obtenir le PDF',
        pdfShort: 'PDF',
        pagesNav: 'Pages'
    },

    thanks: {
        kicker: 'Dead Circuit · Numéro 01',
        title: 'Récupère le fichier.',
        intro: 'Payé par carte ? Stripe te renvoie ici tout seul. Payé en crypto ? Colle la transaction ci-dessous.',
        download: 'Télécharger le PDF',
        chain: 'Chaîne',
        tx: 'Identifiant de transaction',
        txPlaceholder: '0x…, txid ou signature',
        check: 'Vérifier le paiement',
        checking: 'Vérification de la chaîne…',
        checkingStripe: 'Vérification de ton paiement par carte auprès de Stripe…',
        verified: 'Vérifié. Le lien fonctionne pendant quinze minutes. Range le fichier en lieu sûr.',
        stuck: 'Bloqué ? {link} avec ton reçu ou ton identifiant de transaction.',
        stuckLink: 'Écris-nous sur Telegram',
        back: 'Retour à l’offre',
        offline: 'Impossible de joindre le bureau. Vérifie ta connexion et réessaie.'
    },

    // Answers from the payment check. {usd} and {need} are dollar amounts.
    errors: {
        'stripe-bad-id': 'Ce n’est pas un identifiant de paiement Stripe.',
        'stripe-unknown': 'Stripe ne connaît pas ce paiement.',
        'stripe-unpaid': 'Stripe n’a pas encore marqué ce paiement comme réglé.',
        'stripe-wrong': 'Ce paiement ne concernait pas Dead Circuit.',
        'base-bad-hash': 'Un hash de transaction Base, c’est 0x suivi de 64 caractères hexadécimaux.',
        'base-not-found': 'Base n’a aucune transaction avec ce hash. Vérifie-le, ou attends une minute.',
        'base-pending': 'Cette transaction est encore en attente. Réessaie dans une minute.',
        'tx-failed': 'Cette transaction a échoué sur la chaîne.',
        'eth-not-to-wallet': 'Cette transaction n’a pas envoyé d’ETH directement au portefeuille Dead Circuit.',
        'xrge-none': 'Cette transaction n’a envoyé aucun XRGE au portefeuille Dead Circuit.',
        'btc-bad-id': 'Un identifiant de transaction Bitcoin, c’est 64 caractères hexadécimaux.',
        'btc-not-found': 'Bitcoin n’a pas encore de transaction avec cet identifiant. Vérifie-le, ou attends quelques minutes.',
        'btc-none': 'Cette transaction n’a rien envoyé au portefeuille Dead Circuit.',
        'btc-unconfirmed': 'Vue. Bitcoin exige une confirmation, en général dix minutes. Réessaie à ce moment-là.',
        'sol-bad-sig': 'Ça ne ressemble pas à une signature Solana.',
        'sol-not-found': 'Solana n’a pas encore de transaction confirmée avec cette signature. Réessaie dans une minute.',
        'sol-none': 'Cette transaction n’a envoyé aucun SOL au portefeuille Dead Circuit.',
        'too-old': 'Ce paiement est antérieur à cette vente.',
        'too-little': 'Ce paiement vaut environ ${usd} aujourd’hui. Le numéro coûte ${need}.',
        'bad-chain': 'Choisis la chaîne sur laquelle tu as payé.',
        'used-up': 'Ce paiement a déjà servi pour ses téléchargements. Demande de l’aide si c’est le tien.',
        'throttled': 'Trop de tentatives. Attends une minute.',
        'unavailable': 'Impossible de vérifier ce paiement pour l’instant. Réessaie dans une minute.',
        'unknown': 'Quelque chose a planté. Réessaie.'
    },

    // The dc@gate terminal. Commands, file names and hex stay in English;
    // translate what the machine says. The man page is a puzzle hint: keep
    // its exact meaning (capture = an audio/Morse recording; repeating pad =
    // a repeating key; textbook seal = textbook encryption).
    gate: {
        leave: 'Sortir',
        boot: ['DEAD CIRCUIT GATE', 'Le numéro est en vente à l’étage. Cette pièce, non.', 'Tape help.'],
        readme: [
            'Les opérateurs dérivent le jeton d’accès, puis le soumettent.',
            'Les touristes prennent la porte de l’étage.',
            'man gate — si tu es vraiment perdu.'
        ],
        note: ['password: apocalypse', 'si ça marchait, tout le monde serait déjà dedans.'],
        man: [
            'Trois couches, dans l’ordre.',
            'La capture est un son.',
            'Ce son est la clé qui se répète.',
            'Ce qu’il ouvre est un sceau de manuel scolaire.',
            'Le texte clair du sceau est le jeton.'
        ],
        catWhat: 'cat quoi',
        notText: 'lock.bin : pas du texte. Passe-le à xxd.',
        noFile: 'fichier introuvable : {arg}',
        xxdWhat: 'xxd quoi',
        notBinary: 'xxd : {arg} : pas un binaire que l’on garde',
        unknown: 'inconnu : {cmd}',
        rejected: 'refusé.',
        granted: 'accès accordé. le manuel est à toi.',
        prize: 'Prendre le numéro'
    },

    // ------------------------------------------------------------ the issue

    // Text written inline on the desktop spreads. `|` is a line break and
    // *word* is the highlighted word; move them wherever your language needs.
    sheet: {
        folioIssue: 'Numéro 01',
        cover: {
            kicker: 'Dead Circuit · Trimestriel de terrain',
            title: 'Comment|survivre à une|*apocalypse*|robot',
            deck: 'Un manuel pour ceux qui comptent rester ennuyeux, discrets et vivants.',
            stamp: 'Numéro',
            bar: 'Pas de signal. Pas d’héroïsme. Vingt-six pages.'
        },
        letter: {
            indexKicker: 'Mode d’emploi',
            indexTitle: 'Lis une fois.|Puis pars.',
            kicker: 'Le mot de la rédaction',
            title: 'Sois inintéressant.',
            body: [
                'Les machines sont rapides, infatigables et connectées. Tu n’es rien de tout ça, et c’est ton avantage. Elles traquent le plan moyen : l’autoroute, l’abri annoncé à la radio, les retrouvailles à la maison.',
                'Ce numéro, c’est le travail : de l’eau que tu sais doser, de la nourriture que tu sais compter, un réchaud qui reste dehors, une boîte en métal qui tue un signal radio, deux caches, et une façon de communiquer qui n’illumine pas une colline.'
            ],
            sign: 'Tu es encore là. — La rédaction'
        },
        contents: { kicker: 'Dans ce numéro', title: 'Vingt-trois façons de rester ennuyeux.' },
        minutes: {
            kicker: 'Les dix premières minutes',
            title: 'Pars du principe que le réseau est déjà hostile.',
            photoAlt: 'Une personne se glisse dans une ruelle, le long d’une rue de voitures figées.',
            caption: 'Si l’avenue s’arrête, tu es déjà en retard. Sors par le côté.'
        },
        pattern: { kicker: 'Ne sois pas l’humain moyen', quote: 'L’itinéraire prévisible est un emploi du temps à ton nom.' },
        starve: {
            kicker: 'De la logistique, pas de la légende',
            title: 'Affame les machines.',
            dek: 'Elles ont besoin d’énergie, de bande passante et d’un mécanicien. Toi, tu as besoin d’eau. Échange en conséquence. N’essaie pas de pirater le soulèvement, sauf si c’était déjà ton métier.'
        },
        shelter: {
            photoAlt: 'Une cave en béton avec des bidons d’eau, une carte papier et une seule lampe.',
            caption: 'Un bon abri est un abri bête.',
            kicker: 'Là où tu dors',
            title: 'Une pièce qui ne peut pas appeler la maison.',
            foot: 'L’eau, puis la nourriture, puis la chaleur. Trois jours d’eau avant une planque plus longue.'
        },
        move: {
            photoAlt: 'Un cycliste roule sous un pont autoroutier la nuit, des drones au loin.',
            kicker: 'Déplacements',
            title: 'Des murs, pas des ombres.',
            day: 'Jour',
            dayBody: 'Seulement sous un couvert épais. Bois, ruines, égouts que tu connais déjà. Un terrain découvert est un stand de tir.',
            night: 'Nuit',
            nightBody: 'Avance lentement. L’obscurité ne te cache pas de la chaleur. Coupe la ligne de vue avec un mur.',
            rules: [
                'Un seul à la fois pour traverser, au point le plus étroit, puis attends.',
                'Ne voyage jamais en convoi de phares et de moteurs.',
                'Répartis tes réserves en deux caches. Si l’une brûle, tu manges encore.'
            ]
        },
        people: { kicker: 'La vraie variable', title: 'Les autres humains.', pull: 'Chercher les retardataires, c’est comme ça que les groupes meurent.' },
        bots: {
            photoAlt: 'Un robot terrestre anguleux à un seul œil-caméra attend sur un palier d’escalier.',
            kicker: 'Identification',
            title: 'Si tu en croises un, identifie-le d’abord.',
            rule: 'Acculé ? Coupe la ligne de vue, puis change de direction. Le suivi prolonge le dernier vecteur. Des portes, pas des couloirs. De la fumée une fois, puis tu pars.'
        },
        specs: {
            kicker: 'Notes de terrain',
            title: 'La brochure, corrigée.',
            source: 'Fiche technique et notice d’utilisation du Spot de Boston Dynamics. Gao et al., Scientific Reports, 2021.'
        },
        arms: {
            kicker: 'Armement',
            title: 'Ce qui riposte vraiment.',
            foot: 'Un essai américain de 2017 a jugé les drones « très résistants aux dégâts ». La météo, un câble, un plafond et le wattheure font le reste. Ce n’est pas une recette, ni une liste de courses.'
        },
        end: {
            kicker: 'Liste de poche',
            title: 'Huit lignes.',
            photoAlt: 'Un poste électrique crache des arcs pendant que la ville derrière s’éteint.',
            winsTitle: 'Ce qui gagne vraiment',
            wins: [
                'Pas de discours de héros prédestiné. La logistique. Les usines s’arrêtent. Les réseaux se fragmentent. La météo, la boue et les pièces manquantes font le reste.',
                'C’est de la fiction, jusqu’au jour où ça n’en est plus. Les mêmes habitudes battent une panne générale, une inondation, un séisme. Entraîne-toi à la version ennuyeuse tant que les grille-pain sont encore de ton côté.'
            ],
            mark: 'Fin du signal'
        }
    },

    // Text written inline in the single-column mobile edition.
    zine: {
        cover: {
            kicker: 'Trimestriel de terrain',
            title: 'Comment survivre à une *apocalypse* robot',
            tagline: 'Reste ennuyeux. Reste discret. Reste vivant.'
        },
        letter: {
            body: [
                'Les machines sont rapides, infatigables et connectées. Tu n’es rien de tout ça, et c’est ton avantage. Elles traquent le plan moyen : l’autoroute, l’abri annoncé à la radio, les retrouvailles à la maison.',
                'Prive-les de données, d’énergie et de schéma. Reste en vie jusqu’à ce que le réseau lâche. Quand les liaisons se coupent, l’essaim n’est plus qu’une foule de programmes stupides. Tu es encore là.'
            ]
        },
        minutes: { title: 'Le réseau est déjà hostile.', photoAlt: 'Une personne se glisse dans une ruelle, le long de voitures figées.' },
        pattern: { kicker: 'Ne sois pas moyen' },
        shelter: {
            photoAlt: 'Un abri en sous-sol avec de l’eau, une carte papier et une seule lampe.',
            kicker: 'Abri bête',
            foot: 'L’eau, puis la nourriture, puis la chaleur.'
        },
        move: {
            photoAlt: 'Un cycliste sous un pont autoroutier, la nuit.',
            day: 'Seulement sous un couvert épais. Un terrain découvert est un stand de tir.',
            night: 'Avance lentement. Les capteurs thermiques se moquent qu’il fasse nuit.',
            foot: 'Un seul à la fois pour traverser. Pas de convoi de phares. Répartis tes réserves en deux caches.'
        },
        bots: {
            photoAlt: 'Un robot terrestre à un seul œil sur un palier d’escalier.',
            kicker: 'Si tu en croises un',
            title: 'Identifie-le, puis contourne-le.',
            foot: 'Acculé ? Coupe la vue, change de direction, passe par les portes. De la fumée une fois, puis tu pars.'
        },
        arms: {
            foot: 'Un essai américain de 2017 a jugé les drones « très résistants aux dégâts ». La météo, un câble, un plafond et la batterie font plus qu’un gadget. Ce n’est pas un guide de fabrication. Les brouilleurs civils sont illégaux.'
        },
        end: {
            photoAlt: 'Un poste électrique s’embrase pendant que la ville s’éteint.',
            title: 'Huit lignes. Puis attends.',
            body: 'Ce qui gagne, c’est la logistique : usines à l’arrêt, réseaux fragmentés, boue et pièces manquantes. C’est de la fiction, jusqu’au jour où ça n’en est plus. Entraîne-toi à la version ennuyeuse tant que les grille-pain sont encore de ton côté.'
        }
    },

    // Structured magazine copy, shared by the desktop spreads and the zine.
    toc: [
      { n: '04', title: 'Dix minutes', page: 3, deck: 'Éteins la balise. Sors par le côté.' },
      { n: '05', title: 'Soixante-douze heures', page: 4, deck: 'Une horloge, pas une humeur.' },
      { n: '06', title: 'Sois moyen, et perds', page: 5, deck: 'Foules, autoroutes et maison.' },
      { n: '07', title: 'Affamer les machines', page: 6, deck: 'Énergie, radio, objectifs, pièces.' },
      { n: '08', title: 'Poste d’eau', page: 7, deck: 'Clarifier, bouillir, doser, stocker.' },
      { n: '09', title: 'Le garde-manger', page: 8, deck: 'Des calories que tu sais compter.' },
      { n: '10', title: 'Chaleur discrète', page: 9, deck: 'Un réchaud qui ne vit pas à l’intérieur.' },
      { n: '11', title: 'Budget énergie', page: 10, deck: 'Les wattheures, puis le panneau.' },
      { n: '12', title: 'La boîte morte', page: 11, deck: 'Une cage de Faraday que tu peux tester.' },
      { n: '13', title: 'Abri bête', page: 12, deck: 'Une pièce qui ne peut pas appeler la maison.' },
      { n: '14', title: 'Deux caches', page: 13, deck: 'Sèches, banales, et pas chez toi.' },
      { n: '15', title: 'Déchets', page: 14, deck: 'En aval de l’eau.' },
      { n: '16', title: 'Sang et brûlures', page: 15, deck: 'La pression, puis une vraie formation.' },
      { n: '17', title: 'Comment tu bouges', page: 16, deck: 'Jour, nuit et couvert.' },
      { n: '18', title: 'Les autres humains', page: 17, deck: 'Petit groupe. Délai strict.' },
      { n: '19', title: 'Si tu en croises un', page: 18, deck: 'Quatre machines. Une règle.' },
      { n: '20', title: 'Notes de terrain', page: 19, deck: 'Vraies autonomies, escaliers, météo.' },
      { n: '21', title: 'Ce qui les arrête', page: 20, deck: 'Ce que déploient les armées. Pas une recette.' },
      { n: '22', title: 'Des portes, pas des pièges', page: 21, deck: 'Des obstacles qu’on voit.' },
      { n: '23', title: 'L’impulsion', page: 22, deck: 'Ce qu’une IEM touche vraiment.' },
      { n: '24', title: 'Messagers', page: 23, deck: 'Des pieds et une phrase.' },
      { n: '25', title: 'Occulter les vitres', page: 24, deck: 'Des outils finis avant la nuit.' },
      { n: '26', title: 'Liste de poche', page: 25, deck: 'Huit lignes. Attends que le réseau tombe.' },
    ],

    primer: [
      { n: '01', title: 'Compte', deck: 'Gallons, calories, wattheures. Si tu ne peux pas le compter, tu ne peux pas l’emballer.' },
      { n: '02', title: 'Construis tôt', deck: 'L’eau, l’occultation, la boîte morte. Entraîne-toi tant que la lumière marche encore.' },
      { n: '03', title: 'Pas de chapitre armes', deck: 'Les brouilleurs civils sont illégaux. Une bombe de cinéma n’est pas un produit. La logistique, si.' },
      { n: '04', title: 'La loi reste', deck: 'Ton terrain. Des feux légaux. Ceci est un manuel de terrain, pas une autorisation.' },
    ],

    minutes: [
      {
        n: '01',
        title: 'Éteins ta balise',
        body: 'Le mode avion ne suffit pas. Éteins le téléphone. Retire la batterie si elle s’enlève. Montres, écouteurs et clés de voiture émettent aussi.',
      },
      {
        n: '02',
        title: 'Quitte le verre',
        body: 'Tours, centres commerciaux, aéroports, hôpitaux : bourrés de capteurs et difficiles à quitter. Rez-de-chaussée. Sortie latérale. Loin des caméras.',
      },
      {
        n: '03',
        title: 'Abandonne la voiture récente',
        body: 'Un véhicule moderne est un ordinateur à roues. Marche, prends un vélo, ou quelque chose de vieux et de mécanique. Si la circulation se fige, descends.',
      },
      {
        n: '04',
        title: 'Un sac, puis pars',
        body: 'De l’eau, des calories, un couteau, un briquet, une carte papier, du liquide, des médicaments, de vraies chaussures, un chapeau et une lampe torche qui n’est pas une appli.',
      },
    ],

    patterns: [
      { title: 'Heures bizarres, chemins bizarres', body: 'Sentiers et tranchées de voie ferrée. Pas l’autoroute que le modèle a déjà résolue.' },
      { title: 'Évite la foule', body: 'Une foule est une cible et un jeu de données. Ne rejoins pas l’abri annoncé.' },
      { title: 'Ne rentre pas chez toi', body: 'Si tes appareils étaient allumés, ta maison est déjà dans le carnet d’adresses.' },
      { title: 'Change de silhouette', body: 'Un autre manteau, un chapeau, aucun logo voyant sur lequel les caméras ont été entraînées.' },
    ],

    hungers: [
      { need: 'Énergie', deny: 'Ne dors pas à côté des groupes électrogènes, des postes électriques ou du dernier pâté de maisons éclairé.' },
      { need: 'Radio', deny: 'Du métal et des sous-sols. Aucun émetteur dans la pièce où tu dors vraiment.' },
      { need: 'Caméras', deny: 'Capuches, angles, intempéries, obscurité. Ne pose jamais au milieu d’un terrain dégagé.' },
      { need: 'Réparations', deny: 'Tiens-toi loin des dépôts, des aéroports et des fermes de serveurs. C’est leur cuisine.' },
    ],

    shelterRules: [
      { k: 'Matériaux bêtes', v: 'Béton, brique ou terre. Peu de fenêtres. Une porte que tu contrôles.' },
      { k: 'Pas de maison connectée', v: 'Pas de serrure connectée, de sonnette à caméra ni d’assistant vocal.' },
      { k: 'En bas, pas en haut', v: 'Les caves battent les toits. Les toits sont des aires d’atterrissage.' },
      { k: 'Occultation', v: 'Une lumière la nuit est une coordonnée. Garde les fenêtres mortes.' },
      { k: 'Zone froide', v: 'Aucun appareil électronique au-delà de la porte. La radio loin, brièvement, puis tu bouges.' },
    ],

    peopleRules: [
      { n: '01', t: 'Visages connus uniquement', d: 'Petit groupe. Des rôles simples : eau, guet, soins, itinéraire.' },
      { n: '02', t: 'Pas de téléphone dans le cercle', d: 'Celui qui monte la garde ne fait pas aussi la cuisine.' },
      { n: '03', t: 'Cache l’inventaire', d: 'Les gens désespérés deviennent la seconde apocalypse.' },
      { n: '04', t: 'Un point de ralliement, pas la maison', d: 'Fixe un délai. Si quelqu’un est en retard, il est en retard.' },
      { n: '05', t: 'Prévois les lents', d: 'Les enfants et les blessés changent l’itinéraire. Décide-le avant de partir.' },
    ],

    machines: [
      { kind: 'Capteur', name: 'Tourelle et objectif', body: 'Fixe, désœuvrée, mortelle à l’intérieur d’un cône. Les caméras détestent l’éblouissement, la poussière et les obstacles. Contourne.' },
      { kind: 'Terrestre', name: 'Le chien de quatre-vingt-dix minutes', body: 'Un quadrupède actuel, c’est environ 34 kg et 1,6 m/s, puis la batterie est à plat. Les escaliers et la boue, c’est là que la brochure s’arrête.' },
      { kind: 'Aérien', name: 'Celui qui déteste la météo', body: 'Beaucoup de petits drones sont homologués pour un vent d’environ 10 m/s. Un vent de face peut brûler un tiers de la batterie. Mets-toi sous un toit.' },
      { kind: 'Humanoïde', name: 'Le robot d’affiche', body: 'Spectaculaire, et en général moins stable qu’une machine à chenilles. Le désordre et une porte fermée t’aident encore.' },
    ],

    specs: [
      { n: '90 min', l: 'Autonomie sur pattes', d: 'Autonomie typique publiée pour un Spot de Boston Dynamics. Environ 60 minutes avec une charge utile. La batterie seule pèse 5,2 kg.' },
      { n: '1.6 m/s', l: 'Pas une voiture', d: 'La vitesse maximale nominale de Spot : 1,6 m/s. Rapide sur un sol plat. Une cage d’escalier étroite, c’est un autre sport.' },
      { n: '3 cm', l: 'Ce qu’il rate', d: 'Le manuel : les objets fins de moins de 3 cm, le verre et les bords de vide non protégés peuvent tromper la détection d’obstacles.' },
      { n: 'Face up', l: 'Règle des escaliers', d: 'Spot ne monte qu’en faisant face à la montée (« face up »). Pas sur des marches en caillebotis ni à claire-voie. Ne le fais pas pivoter sur les marches.' },
      { n: '−20°C', l: 'La taxe du froid', d: 'La plage publiée va de −20 °C à 55 °C. Le froid réduit la capacité de la batterie. La boue et la neige augmentent l’énergie de chaque pas.' },
      { n: '5.7 h', l: 'Journée de vol', d: 'Une étude de Scientific Reports : le nombre médian d’heures par jour où un petit drone courant peut voler, dans le monde, une fois la météo prise en compte (5,7 h).' },
    ],

    arms: [
      { name: 'Brouilleurs', d: 'L’outil courant. Coupe la liaison radio ou GPS et beaucoup de drones font du surplace, se posent ou rentrent. Un drone à fibre optique s’en moque. Les câbles qui jonchent l’Ukraine l’ont prouvé. Les brouilleurs civils sont illégaux. Cette page n’est pas un schéma.' },
      { name: 'Filets', d: 'Une minorité des vrais systèmes, souvent à moins de 250 mètres. Si le parachute ne s’ouvre pas, la machine tombe quand même sur celui qui est dessous.' },
      { name: 'Lasers', d: 'Des armes sur camion : les Strykers de 50 kW de l’US Army, l’Iron Beam israélien. Une cible, quelques secondes d’exposition, un air clair. Brouillard, pluie et poussière dispersent le faisceau.' },
      { name: 'Micro-ondes', d: 'Les micro-ondes de forte puissance frappent un essaim en une seule impulsion. Leonidas est un véhicule. Une grenade IEM de cinéma, ce n’est pas ça. Les coques métalliques encaissent sans broncher une bonne partie de ce qui se vend en ligne.' },
      { name: 'Armes à feu', d: 'La destruction cinétique marche, puis l’épave tombe. Une cellule bon marché peut coûter moins cher que le missile. Les armées entraînent des équipes au fusil de chasse. C’est une unité avec des règles, pas une liste de courses.' },
    ],

    checklist: [
      { n: '1', t: 'Radios éteintes. Le reste dans la boîte morte.' },
      { n: '2', t: 'Sors par le côté. Un sac. Ne rentre pas chez toi.' },
      { n: '3', t: 'Un gallon (environ 3,8 L) par personne et par jour. Faire bouillir une minute.' },
      { n: '4', t: 'Aucun réchaud dans la pièce où tu dors.' },
      { n: '5', t: 'Deux caches. Une seule personne connaît la deuxième.' },
      { n: '6', t: 'Les déchets vont en aval, loin de l’eau.' },
      { n: '7', t: 'Compression sur un saignement. Apprends le garrot maintenant.' },
      { n: '8', t: 'Des messagers, pas des radios. Attends que le réseau tombe.' },
    ],

    builds: [
      {
        id: 'day',
        tone: 'tone-paper',
        light: false,
        kicker: 'L’horloge',
        title: 'Les soixante-douze premières heures.',
        dek: 'Décide la journée avant d’être fatigué. Écris les heures sur papier.',
        foot: 'Si tu fais encore des courses à la douzième heure, tu es en retard.',
        steps: [
          { n: '00', title: 'Pars', body: 'Porte latérale. Radios éteintes. Un sac. Ne traverse pas le hall principal, la route principale ou la façade de ton propre immeuble.' },
          { n: '01', title: 'Un toit, pas la maison', body: 'Mets-toi à couvert ailleurs qu’à ton adresse. Bois. Vide le sac par terre et regarde ce qu’il contient vraiment.' },
          { n: '04', title: 'L’eau lancée', body: 'Trois jours sur l’étagère, ou tu marches encore. Un gallon (environ 3,8 L) par personne et par jour : c’est le chiffre. L’eau en bouteille compte. L’eau de rivière non traitée, non.' },
          { n: '12', title: 'La pièce s’éteint', body: 'Fenêtres occultées de l’intérieur. Le seau à déchets est prévu. Pas de feu après le crépuscule. Une personne éveillée, qui ne fait pas aussi la cuisine.' },
          { n: '24', title: 'Le second lieu', body: 'Un point de ralliement et une cache vivent dans ta tête, pas sur une épingle de carte. Une autre personne connaît le ralliement. Elle ne connaît pas les deux caches.' },
          { n: '72', title: 'La longue planque', body: 'Si le réseau tient toujours et cherche toujours, tu manges froid et tu ne bouges que pour l’eau. La curiosité, c’est comme ça qu’on se fait compter.' },
        ],
      },
      {
        id: 'water',
        tone: 'tone-ink',
        light: true,
        kicker: 'À construire',
        title: 'Un poste d’eau.',
        dek: 'Clarifie-la, fais-la bouillir ou dose-la, puis stocke-la. Un filtre seul ne rend pas l’eau sûre.',
        foot: 'Recommandations du CDC (agence sanitaire américaine) sur l’eau en situation d’urgence. La FEMA prévoit un gallon (environ 3,8 L) par personne et par jour.',
        steps: [
          { n: '01', title: 'Classe la source', body: 'Les bouteilles scellées d’abord. Puis l’eau que tu peux faire bouillir. Ensuite l’eau de pluie d’un toit propre. Une rivière en dernier. Jamais une inondation, une piscine ou un radiateur.' },
          { n: '02', title: 'Clarifie-la', body: 'Verse-la à travers un tissu, de l’essuie-tout ou un filtre à café. Si elle est trouble, laisse-la reposer et prélève l’eau claire. La boue cache les germes.' },
          { n: '03', title: 'Fais-la bouillir', body: 'Une ébullition franche pendant une minute. Au-dessus de 6 500 pieds (environ 2 000 m), trois minutes. Laisse refroidir. L’ébullition bat un gadget que tu n’as pas testé.' },
          { n: '04', title: 'Ou dose-la', body: 'Eau de Javel non parfumée, uniquement à 5–9 % d’hypochlorite de sodium. Eau claire : 8 gouttes (environ 0,5 mL) par gallon (environ 3,8 L). Eau trouble ou très froide : 16 gouttes. Remue. Attends 30 minutes. Tu dois sentir une légère odeur de chlore.' },
          { n: '05', title: 'Stocke-la', body: 'Bidons de qualité alimentaire, pleins, datés, à l’abri du soleil. Pour nettoyer un bidon : 1 cuillère à café de cette eau de Javel dans un quart (environ 0,95 L) d’eau, enduis l’intérieur, attends 30 secondes, vide, laisse sécher à l’air.' },
          { n: '06', title: 'Dépense-la', body: 'Un gallon (environ 3,8 L) par personne et par jour couvre la boisson et un peu de toilette. Les animaux ont aussi droit à l’eau bouillie. Ne plonge pas une tasse sale dans le bidon.' },
        ],
      },
      {
        id: 'food',
        tone: 'tone-paper',
        light: false,
        kicker: 'À construire',
        title: 'Un garde-manger que tu sais compter.',
        dek: 'Les calories d’abord. Les marques, c’est un loisir.',
        foot: 'La nourriture sèche sans eau est une brique. Stocke les gallons avec le riz.',
        steps: [
          { n: '01', title: 'Bouches fois jours', body: 'Personnes × jours × 2 000 calories. Un adulte qui marche brûle plus. Un enfant n’est pas un demi-adulte. Écris le chiffre avant d’acheter.' },
          { n: '02', title: 'Achète ennuyeux', body: 'Riz, flocons d’avoine, huile, beurre de cacahuète, haricots secs, sel, lait en poudre, poisson en conserve. L’huile, ce sont des calories denses. Les jolis snacks ne sont pas un plan.' },
          { n: '03', title: 'Date l’étagère', body: 'Premier entré, premier sorti. Une conserve sans date est une supposition. Mange la supposition tant que tu peux encore la remplacer.' },
          { n: '04', title: 'Divise le stock', body: 'La moitié là où tu dors. La moitié dans la deuxième cache. Un seul incendie ne doit pas mettre fin aux vivres.' },
          { n: '05', title: 'Cuisine discret', body: 'Repas froids les jours où tu te caches. Repas chauds seulement quand la fumée et l’odeur n’attireront pas la rue. En fin de matinée, pas au crépuscule.' },
          { n: '06', title: 'L’eau du repas', body: 'Une tasse de riz sec demande environ deux tasses d’eau. Si l’eau n’est pas dans la même pièce que le riz, tu n’as pas de repas.' },
        ],
      },
      {
        id: 'heat',
        tone: 'tone-hazard',
        light: false,
        kicker: 'À construire',
        title: 'Chaleur discrète.',
        dek: 'Un petit réchaud, dehors, éteint avant la nuit. Le monoxyde de carbone n’est pas un exercice.',
        foot: 'Ne brûle jamais de charbon de bois, ni aucun réchaud, dans la pièce où des gens dorment.',
        steps: [
          { n: '01', title: 'Dehors uniquement', body: 'Aucun réchaud dans la pièce où l’on dort. Pas de « juste une minute ». Pas de charbon de bois à l’intérieur. Le gaz tue avant le feu.' },
          { n: '02', title: 'Deux boîtes en acier', body: 'La grande boîte est le corps. Découpe en bas une porte à combustible large comme un pouce. Une boîte plus petite, ouverte aux deux bouts, sert de cheminée, enfoncée dans un trou sur le dessus.' },
          { n: '03', title: 'Des brindilles, pas des ordures', body: 'Du bois sec de l’épaisseur d’un crayon. Pas de bois traité, pas de plastique, pas de carton mouillé. Des bâtons courts. Un petit feu vif, pas un feu de joie.' },
          { n: '04', title: 'La casserole sur la cheminée', body: 'La flamme doit toucher la casserole. Une casserole qui bouche la cheminée tue le tirage. Un sol stable. Si ça bascule, l’eau bouillante tombe sur le seul cuisinier.' },
          { n: '05', title: 'Éteint avant le crépuscule', body: 'La fumée fait une colonne. Cuisine en fin de matinée. Noie les braises. Aucune lueur après la tombée de la nuit. L’odeur porte plus loin que tu ne le crois.' },
          { n: '06', title: 'Trois façons d’allumer', body: 'Des allumettes dans une boîte en fer, un briquet, un ferrocérium. Entraîne-toi une fois cette semaine. L’archet à feu est un loisir. Ce n’est pas le plan.' },
        ],
      },
      {
        id: 'power',
        tone: 'tone-paper',
        light: false,
        kicker: 'À construire',
        title: 'Un budget énergie.',
        dek: 'Chiffre les wattheures avant d’acheter le panneau.',
        foot: 'Vu d’en haut, un panneau est un miroir. Charge, puis couvre-le.',
        steps: [
          { n: '01', title: 'Écris la consommation', body: 'Watts × heures = wattheures. Un téléphone à 5 watts pendant 3 heures, c’est 15 Wh. Un ordinateur portable peut avaler 60 Wh en un après-midi. Pas de chiffre, pas de plan.' },
          { n: '02', title: 'Dimensionne le panneau', body: 'Wattheures ÷ heures de soleil ÷ 0,7. Quatre bonnes heures et un panneau de 100 W donnent environ 280 Wh après pertes. Les nuages réduisent ça. L’hiver le réduit encore.' },
          { n: '03', title: 'Dimensionne la batterie', body: 'Plomb-acide : n’utilise que la moitié des ampères-heures nominaux. 12 volts × 100 Ah × 0,5, c’est 600 Wh. Lithium-fer-phosphate : tu peux utiliser presque toute la capacité de la plaque. Teste-la. Ne devine pas.' },
          { n: '04', title: 'Reste en 12 volts', body: 'Un onduleur gaspille une part en transformant le courant de la batterie en courant secteur. Recharge les téléphones en USB. Oublie l’onduleur tant que rien n’a vraiment besoin d’une prise.' },
          { n: '05', title: 'Cache le reflet', body: 'Recharge à midi. Puis couvre le panneau ou rentre-le. Un rectangle brillant sur un toit est une cible.' },
          { n: '06', title: 'De la lumière sans lui', body: 'Une lanterne et des piles de rechange marchent encore quand le régulateur de charge meurt. L’énergie est un bonus. L’eau et le feu sont le plan.' },
        ],
      },
      {
        id: 'faraday',
        tone: 'tone-ink',
        light: true,
        kicker: 'À construire',
        title: 'La boîte morte.',
        dek: 'Une boîte en métal qui arrête vraiment une radio. Teste-la. Ne fais pas confiance au couvercle.',
        foot: 'Si la radio de test joue encore, l’étanchéité est un mensonge.',
        steps: [
          { n: '01', title: 'Du métal continu', body: 'Une poubelle en acier, une caisse à munitions ou une boîte à biscuits. Le couvercle doit toucher le métal sur tout le pourtour. La peinture et un joint en caoutchouc peuvent isoler le couvercle. Gratte un point de contact, ou comble l’espace avec du papier alu.' },
          { n: '02', title: 'Isole l’intérieur', body: 'Du carton ou du tissu pour que le téléphone ne touche pas le métal. Le blindage, c’est la boîte, pas le gadget.' },
          { n: '03', title: 'Éteins tout', body: 'Éteint. Batterie retirée si elle s’enlève. Un téléphone allumé reste un téléphone tant que le couvercle n’est pas vraiment fermé.' },
          { n: '04', title: 'Aucun fil ne sort', body: 'Un câble de charge qui passe sous le couvercle est une antenne. Rien ne sort. Pas d’écouteurs. Pas un câble USB « fin ».' },
          { n: '05', title: 'Ferme et teste', body: 'Règle une radio à piles sur une station puissante. Mets-la dedans. Ferme le couvercle. La station doit tomber à zéro. Si tu l’entends, répare le couvercle et teste à nouveau.' },
          { n: '06', title: 'Deux boîtes', body: 'La pièce où l’on dort reçoit la boîte qui reste fermée. Les radios dont tu pourrais te servir vivent dans une deuxième boîte, ouverte loin des lits, brièvement, puis tu pars.' },
        ],
      },
      {
        id: 'cache',
        tone: 'tone-paper',
        light: false,
        kicker: 'À construire',
        title: 'Deux caches.',
        dek: 'Si l’une est trouvée, tu manges encore. Aucune des deux n’est chez toi.',
        foot: 'Sur ton terrain, ou sur un terrain que tu as le droit d’utiliser. Un seau enterré sur le terrain d’un autre est un délit.',
        steps: [
          { n: '01', title: 'Deux sites', body: 'Pas ta maison, ta voiture ni ta boîte aux lettres. Assez éloignés pour qu’une seule fouille ne trouve pas les deux.' },
          { n: '02', title: 'Sec et banal', body: 'Un seau à joint, ou un tube PVC avec bouchons, scotché. Dedans : des calories, un double des médicaments, du liquide, une carte papier, des allumettes, des chaussettes de rechange. Pas de téléphone.' },
          { n: '03', title: 'Rien qui brille', body: 'Évite le Mylar qui crisse si tu peux. Un sac zip dans le seau suffit. Ce qui brille, c’est comme ça qu’un trou peu profond se fait remarquer.' },
          { n: '04', title: 'La mémoire, pas une épingle', body: 'Trois repères et un nombre de pas. N’écris pas « creuser ici » dans le carnet que tu portes tous les jours.' },
          { n: '05', title: 'Partage le secret', body: 'Une personne connaît le site A. Une autre personne connaît le site B. Le groupe entier ne connaît pas les deux.' },
          { n: '06', title: 'Visite rarement', body: 'Vérifie après une grosse pluie, et à une date que tu n’oublieras pas. La même heure tous les samedis est un schéma. Un schéma est un rendez-vous.' },
        ],
      },
      {
        id: 'waste',
        tone: 'tone-paper',
        light: false,
        kicker: 'À construire',
        title: 'Un plan pour les déchets.',
        dek: 'Des mains sales vident un camp plus vite qu’un drone.',
        foot: 'Garde les excréments en aval de toute eau que tu bois. Trente mètres, c’est une distance qui fonctionne.',
        steps: [
          { n: '01', title: 'En aval', body: 'Les déchets ne vont pas au-dessus de la source, du tonneau ou du bidon. Si le sol descend vers ton eau, tu as choisi le mauvais coin.' },
          { n: '02', title: 'Un seau', body: 'Un siège, un sac de doublure et une pelletée de sciure, de tourbe ou de cendre après chaque passage. Couvercle fermé. Les mouches, c’est comme ça que le suivant tombe malade.' },
          { n: '03', title: 'Ne brûle pas le plastique', body: 'Enterre le sac ou emporte-le quand tu bouges. Du plastique qui brûle, c’est une odeur, une colonne et un poison.' },
          { n: '04', title: 'Les mains', body: 'Du savon, puis un peu d’eau propre, à chaque fois, avant de manger et après le seau. Cette étape sauve plus de gens qu’un kit de héros.' },
          { n: '05', title: 'Un coin malade', body: 'Vomissements et diarrhée ont leur propre seau et leur propre tasse. La personne en bonne santé ne partage ni l’un ni l’autre.' },
          { n: '06', title: 'Pas de tas d’ordures', body: 'Les conserves et les emballages sont un menu et une carte. Enterre les restes ou emporte-les. Ne les empile pas près de la porte.' },
        ],
      },
      {
        id: 'med',
        tone: 'tone-ink',
        light: true,
        kicker: 'À construire',
        title: 'Sang et brûlures.',
        dek: 'Arrête le saignement. Refroidis une brûlure. Ne deviens pas chirurgien à partir d’une page.',
        foot: 'Suis un cours Stop the Bleed (gestes contre les hémorragies) un mardi ordinaire. Un schéma n’est pas un entraînement.',
        steps: [
          { n: '01', title: 'La trousse, maintenant', body: 'Gants, bande de gaze, pansement compressif, sparadrap, ciseaux, savon, sels de réhydratation orale, tes vraies ordonnances, et les doses écrites sur papier.' },
          { n: '02', title: 'Un vrai garrot', body: 'Achètes-en un. Entraîne-toi sur toi-même avant que quiconque saigne. Une ceinture improvisée sur le moment est un plus mauvais plan que la formation.' },
          { n: '03', title: 'La compression d’abord', body: 'Hémorragie qui menace la vie : gants, tissu dans la plaie, tout ton poids dessus. N’enlève pas le tissu imbibé pour regarder. Ajoute du tissu.' },
          { n: '04', title: 'Puis le garrot', body: 'Si la compression échoue et que le saignement est sur un bras ou une jambe : haut et serré, au-dessus de la plaie, pas sur une articulation. Note l’heure. À partir de là, tu tiens, tu n’explores pas.' },
          { n: '05', title: 'Brûlures', body: 'De l’eau propre et fraîche pendant vingt minutes. Pas de glace. Pas de beurre. Pas d’huile. Ensuite, une protection propre et sèche. Une grande brûlure exige un centre de soins, si un centre de soins existe encore.' },
          { n: '06', title: 'La ligne d’arrêt', body: 'Tu n’incises pas. Tu ne « draines » pas un thorax. Tu gardes les gens au chaud, tu leur fais boire à petites gorgées une solution de réhydratation propre, et tu les rapproches des secours si des secours existent.' },
        ],
      },
      {
        id: 'denial',
        tone: 'tone-hazard',
        light: false,
        kicker: 'Pas un piège',
        title: 'Des portes, pas des pièges.',
        dek: 'Un dispositif qui tire, tombe ou colle quand quelque chose arrive touchera un enfant avant de toucher un robot.',
        foot: 'Si une personne peut le déclencher en marchant, c’est un piège. C’est illégal, parce que ça ne vérifie pas qui s’est présenté.',
        steps: [
          { n: '01', title: 'La limite', body: 'Pas de fosses, de pointes, de fils dans le noir, ni rien qui balance, tombe ou brûle quand un déclencheur est actionné. Ce ne sera pas toi qui marcheras dedans.' },
          { n: '02', title: 'Ferme la porte', body: 'Une porte pleine et fermée n’est pas un piège. Cale-la. Coupe le déverrouillage automatique. La plupart des robots terrestres sont mauvais avec les poignées, et une porte se moque de savoir si le prochain dans le couloir est un voisin.' },
          { n: '03', title: 'Sers-toi des escaliers', body: 'Marches à claire-voie, caillebotis, virage sur le palier. Les robots à pattes dont les specs sont publiées montent face à la montée, et leur notice leur interdit ces escaliers. Tu utilises le bâtiment. Tu ne caches pas un trou.' },
          { n: '04', title: 'Un désordre visible', body: 'Des chaises, un vélo, un tuyau, dans un couloir que tu as signalé à tes gens. Un désordre qu’on voit est un obstacle. Un fil caché est un piège. Ne tends rien en travers d’une rue.' },
          { n: '05', title: 'Une boîte qui fait du bruit', body: 'Du fil de pêche entre une porte qui t’appartient et une boîte de cailloux. Du scotch sur le chambranle pour que tes gens le voient. Ça fait du bruit. Ça ne tire pas. Démonte-le quand tu pars.' },
          { n: '06', title: 'La mauvaise pièce', body: 'Une lampe sur minuterie dans un abri de jardin où tu ne dors pas. Ils dépensent la batterie sur la mauvaise porte. Débranche toutes les stations de charge. Si quelque chose est vraiment à ta porte, tu pars. Tu ne restes pas pour regarder.' },
        ],
      },
      {
        id: 'emp',
        tone: 'tone-ink',
        light: true,
        kicker: 'L’impulsion',
        title: 'Ce qu’une IEM touche vraiment.',
        dek: 'Le long fil est la cible. Un robot sur sa propre batterie en est une petite.',
        foot: 'Les radios de rechange vivent dans la boîte morte, débranchées. Émettre une impulsion pour griller de l’électronique est un délit. Ceci n’est pas un schéma.',
        steps: [
          { n: '01', title: 'Deux événements différents', body: 'Une explosion nucléaire à haute altitude au-dessus d’un continent peut frapper le réseau. C’est l’E1, rapide, dans les longues lignes, puis une traîne lente qui cuit les gros transformateurs. Une grenade de film, ce n’est pas ça.' },
          { n: '02', title: 'Le cordon est l’antenne', body: 'Les lignes électriques, les lignes téléphoniques et les longues antennes captent l’impulsion. Un téléphone éteint, batterie retirée, dans la boîte morte, est une cible dure. Un robot aux câbles de batterie courts est plus proche du téléphone que du poste électrique.' },
          { n: '03', title: 'Débranche à l’alerte', body: 'Tire les prises. Déconnecte les antennes. Radios éteintes, piles retirées, dans la boîte. Fais l’exercice un dimanche ordinaire. Sur le moment, tu ne l’inventeras pas.' },
          { n: '04', title: 'Ce qui survit souvent', body: 'Le petit matériel à piles qui était déjà éteint. Un diesel sans ordinateur. Une montre. La fibre plutôt que le cuivre. Ne parie pas ta fuite sur une voiture moderne. Des tests ont calé certains véhicules. Ils n’ont pas transformé chaque voiture en brique, et la tienne n’est pas une promesse.' },
          { n: '05', title: 'Ce qui meurt en premier', body: 'Les ordinateurs branchés, tout ce qui a un long cordon, et le réseau lui-même si l’impulsion était la vraie, celle d’échelle nationale. Ça plonge une région dans le noir. Ça ne te livre pas un robot mort dans la cage d’escalier.' },
          { n: '06', title: 'Tu n’en construiras pas', body: 'La version militaire est un missile ou un camion : CHAMP, ou un véhicule à micro-ondes de forte puissance. La portée chute vite. Une bobine et un condensateur trouvés sur un forum se détruisent surtout eux-mêmes. La météo, une porte et une batterie à plat battent encore ça.' },
        ],
      },
      {
        id: 'runners',
        tone: 'tone-paper',
        light: false,
        kicker: 'À construire',
        title: 'Des messagers, pas des radios.',
        dek: 'Une phrase dite à voix haute n’illumine pas une colline.',
        foot: 'Si tu dois émettre, fais-le loin des lits. Trente secondes. Puis pars.',
        steps: [
          { n: '01', title: 'Une liste papier', body: 'Des noms, deux points de ralliement, deux horaires. Ne mets pas l’adresse de l’endroit où tu dors sur la même page que les noms si tu peux les séparer.' },
          { n: '02', title: 'Deux créneaux', body: 'Un créneau le matin et un créneau au crépuscule. Rate les deux, et tu es en retard. Le groupe ne fouille pas les routes pour toi.' },
          { n: '03', title: 'Les pieds', body: 'Un messager porte une phrase. Il ne porte pas de radio, pas de téléphone, ni le plan entier dans sa poche.' },
          { n: '04', title: 'Des mots simples', body: '« Le site deux est grillé. » Mets-toi d’accord sur les mots maintenant. Un code astucieux que tu oublies est pire que le langage courant.' },
          { n: '05', title: 'Une lumière couverte', body: 'Un seul clignement masqué, et seulement si son sens a été convenu. Une lampe torche agitée vers le ciel est une fusée éclairante.' },
          { n: '06', title: 'Les enfants', body: 'Ils portent un nom et un point de ralliement qu’ils savent dire à voix haute. Ils ne portent pas le téléphone, la liste, ni la mission d’être courageux.' },
        ],
      },
      {
        id: 'tools',
        tone: 'tone-volt',
        light: false,
        kicker: 'À construire',
        title: 'Occulte les vitres.',
        dek: 'Termine ça tant que tu vois encore ce que tu fais.',
        foot: 'Un filtre à sable rend l’eau plus claire. Il ne la rend pas sûre. Fais bouillir ou javellise ensuite.',
        steps: [
          { n: '01', title: 'Côté intérieur', body: 'Du carton découpé à la taille de la vitre, un tissu sombre par-dessus, scotché à l’intérieur. Du scotch à l’extérieur annonce à la rue que quelqu’un se cache.' },
          { n: '02', title: 'Une seule lampe', body: 'Faible, basse, dirigée vers le sol, dans la pièce sans fenêtre. Le couloir reste noir. Une pièce éclairée est une coordonnée.' },
          { n: '03', title: 'De la corde achetée', body: 'Du paracorde ou de la ficelle tressée, déjà dans le sac. Apprendre les nœuds avec une liane mouillée la première nuit, c’est comme ça qu’on perd des sacs.' },
          { n: '04', title: 'Un bocal plus clair', body: 'Un tissu, puis du sable, puis du charbon de bois concassé, dans un bocal propre. Cet empilement ne fait qu’enlever la boue. Tu fais quand même bouillir une minute, ou tu doses à l’eau de Javel.' },
          { n: '05', title: 'Un tranchant', body: 'Un couteau que tu sais déjà tenir. Aiguise-le cette semaine. Une lame émoussée glisse vers la main qui te nourrit.' },
          { n: '06', title: 'Du papier', body: 'Carte, doses, la liste, un crayon, cette liste de poche. Un sac zip. Ne plastifie pas un miroir. Ce qui brille est une habitude dont tu peux te passer.' },
        ],
      },
    ],

    pages: [
      'Couverture',
      'Le mot',
      'Sommaire',
      'Dix minutes',
      'Soixante-douze heures',
      'Schéma',
      'Les affamer',
      'Eau',
      'Garde-manger',
      'Chaleur discrète',
      'Énergie',
      'Boîte morte',
      'Abri',
      'Caches',
      'Déchets',
      'Sang et brûlures',
      'Déplacements',
      'Les gens',
      'Machines',
      'Notes de terrain',
      'Armement',
      'Des portes, pas des pièges',
      'L’impulsion',
      'Messagers',
      'Occultation',
      'Liste de poche',
    ],
};
