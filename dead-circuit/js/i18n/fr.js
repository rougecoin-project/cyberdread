/**
 * Dead Circuit, Français: public strings (site UI and the free preview).
 * The paid chapters are not here; they live sealed in content/issue-01/.
 * Mirrors en.js key for key; check with dead-circuit/js/i18n/check.mjs.
 */
export default {
    "code": "fr",
    "name": "Français",
    "dir": "ltr",
    "titles": {
        "store": "Dead Circuit — Numéro 01, {price}",
        "storeDescription": "Dead Circuit, numéro 01. {price} jusqu’au {deadline}. Le compte à rebours ne repart pas de zéro.",
        "read": "Dead Circuit — Lire le numéro",
        "thanks": "Dead Circuit — Récupère le fichier",
        "gate": "dc@gate"
    },
    "languageLabel": "Langue",
    "disclaimer": {
        "kicker": "À lire d’abord",
        "title": "Non officiel. Non testé. Spéculatif.",
        "body": "Dead Circuit est un guide de terrain non officiel et indépendant pour une apocalypse robot qui n’a pas eu lieu. Nous n’avons rien testé de ce qu’il contient. Il rassemble des connaissances générales déjà publiques, et les dépêches sont de la fiction. Ce n’est pas une consigne officielle d’urgence, ni un conseil médical, juridique ou de sécurité. En cas d’urgence réelle, suivez vos autorités locales et formez-vous correctement.",
        "short": "Non officiel et non testé. Tiré de connaissances publiques, pour le divertissement et des idées. Ni conseil officiel, ni médical, juridique ou de sécurité."
    },
    "store": {
        "deadline": "11 nov. 2026, minuit (heure de l’Est des États-Unis)",
        "windowClosed": "Fenêtre fermée",
        "barBuy": "Moitié prix — {price}",
        "fullPrice": "Plein tarif {full}",
        "heroAlt": "Couverture de Dead Circuit, numéro 01.",
        "dawnKicker": "Aube prévue · {deadline}",
        "headlineOpen": "Moitié prix jusqu’à l’aube. Ensuite, ça double.",
        "headlineClosed": "La fenêtre à moitié prix est fermée.",
        "priceNoteOpen": "Le vrai prix est de {full}. Ici, c’est moitié prix, et le compte à rebours ne repart pas de zéro.",
        "priceNoteClosed": "Plein tarif.",
        "clockLabel": "Temps restant jusqu’au {deadline}",
        "clockUnits": [
            "Jours",
            "Heures",
            "Min",
            "Sec"
        ],
        "payCard": "Payer par carte — {price}",
        "payCrypto": "Payer en crypto",
        "openingStripe": "Ouverture de Stripe…",
        "deck": "{pages} pages. La carte ouvre Stripe à {price} et te ramène au fichier. La crypto, c’est le même fichier, dès que {price} arrive sur un portefeuille.",
        "cryptoNote": "Envoie {price} sur une seule chaîne. C’est la moitié de {full}. Un seul virement, depuis un portefeuille ordinaire, puis colle l’identifiant de transaction sur Récupère le fichier.",
        "copy": "Copier",
        "copied": "Copié",
        "alreadyPaid": "Déjà payé ? Récupère le fichier",
        "lookInside": "Feuilleter le numéro",
        "paperKicker": "Dans le dossier",
        "paperTitle": "Ce que {price} à moitié prix t’achète. Le plein tarif est de {full}.",
        "voltKicker": "La limite",
        "voltTitle": "Après l’aube, le prix double : {full}.",
        "voltBuy": "Prendre le numéro — {price}",
        "endTitle": "Moitié prix maintenant. {full} quand le compteur tombe à zéro.",
        "endBody": "Par carte, Stripe débite {price}, puis t’envoie directement au fichier. En crypto, envoie {price} à un seul portefeuille, puis colle l’identifiant de transaction sur Récupère le fichier. Après le {deadline}, le prix passe à {full}.",
        "endBuy": "Payer {price}, la moitié de {full}",
        "dockClosed": "Fermé",
        "dockLeft": "{d} j {h} h",
        "noscript": "Dead Circuit a besoin de JavaScript."
    },
    "reader": {
        "wordmarkIssue": "Numéro 01",
        "buy": "Acheter · {price}",
        "previous": "Page précédente",
        "next": "Page suivante",
        "getPdf": "Obtenir le PDF",
        "pdfShort": "PDF",
        "pagesNav": "Pages",
        "locked": {
            "kicker": "L’aperçu s’arrête ici",
            "title": "{count} pages de plus dans le numéro complet.",
            "body": "Chaque construction avec son schéma, deux fiches à remplir, cinq autres dépêches de l’Aube, des cartes de poche à découper et les sources. Un seul PDF, dans ta langue.",
            "cta": "Prendre le numéro — {price}",
            "badge": "Dans le numéro complet",
            "listTitle": "Au sommaire du numéro complet"
        }
    },
    "thanks": {
        "kicker": "Dead Circuit · Numéro 01",
        "title": "Récupère le fichier.",
        "intro": "Payé par carte ? Stripe te renvoie ici tout seul. Payé en crypto ? Colle la transaction ci-dessous.",
        "download": "Télécharger le PDF",
        "chain": "Chaîne",
        "tx": "Identifiant de transaction",
        "txPlaceholder": "0x…, txid ou signature",
        "check": "Vérifier le paiement",
        "checking": "Vérification de la chaîne…",
        "checkingStripe": "Vérification de ton paiement par carte auprès de Stripe…",
        "verified": "Vérifié. Le lien fonctionne pendant quinze minutes. Range le fichier en lieu sûr.",
        "stuck": "Bloqué ? {link} avec ton reçu ou ton identifiant de transaction.",
        "stuckLink": "Écris-nous sur Telegram",
        "back": "Retour à l’offre",
        "offline": "Impossible de joindre le bureau. Vérifie ta connexion et réessaie."
    },
    "errors": {
        "stripe-bad-id": "Ce n’est pas un identifiant de paiement Stripe.",
        "stripe-unknown": "Stripe ne connaît pas ce paiement.",
        "stripe-unpaid": "Stripe n’a pas encore marqué ce paiement comme réglé.",
        "stripe-wrong": "Ce paiement ne concernait pas Dead Circuit.",
        "base-bad-hash": "Un hash de transaction Base, c’est 0x suivi de 64 caractères hexadécimaux.",
        "base-not-found": "Base n’a aucune transaction avec ce hash. Vérifie-le, ou attends une minute.",
        "base-pending": "Cette transaction est encore en attente. Réessaie dans une minute.",
        "tx-failed": "Cette transaction a échoué sur la chaîne.",
        "eth-not-to-wallet": "Cette transaction n’a pas envoyé d’ETH directement au portefeuille Dead Circuit.",
        "xrge-none": "Cette transaction n’a envoyé aucun XRGE au portefeuille Dead Circuit.",
        "btc-bad-id": "Un identifiant de transaction Bitcoin, c’est 64 caractères hexadécimaux.",
        "btc-not-found": "Bitcoin n’a pas encore de transaction avec cet identifiant. Vérifie-le, ou attends quelques minutes.",
        "btc-none": "Cette transaction n’a rien envoyé au portefeuille Dead Circuit.",
        "btc-unconfirmed": "Vue. Bitcoin exige une confirmation, en général dix minutes. Réessaie à ce moment-là.",
        "sol-bad-sig": "Ça ne ressemble pas à une signature Solana.",
        "sol-not-found": "Solana n’a pas encore de transaction confirmée avec cette signature. Réessaie dans une minute.",
        "sol-none": "Cette transaction n’a envoyé aucun SOL au portefeuille Dead Circuit.",
        "too-old": "Ce paiement est antérieur à cette vente.",
        "too-little": "Ce paiement vaut environ ${usd} aujourd’hui. Le numéro coûte ${need}.",
        "bad-chain": "Choisis la chaîne sur laquelle tu as payé.",
        "used-up": "Ce paiement a déjà servi pour ses téléchargements. Demande de l’aide si c’est le tien.",
        "throttled": "Trop de tentatives. Attends une minute.",
        "unavailable": "Impossible de vérifier ce paiement pour l’instant. Réessaie dans une minute.",
        "unknown": "Quelque chose a planté. Réessaie."
    },
    "gate": {
        "leave": "Sortir",
        "boot": [
            "DEAD CIRCUIT GATE",
            "Le numéro est en vente à l’étage. Cette pièce, non.",
            "Tape help."
        ],
        "readme": [
            "Les opérateurs dérivent le jeton d’accès, puis le soumettent.",
            "Les touristes prennent la porte de l’étage.",
            "man gate — si tu es vraiment perdu."
        ],
        "note": [
            "password: apocalypse",
            "si ça marchait, tout le monde serait déjà dedans."
        ],
        "man": [
            "Trois couches, dans l’ordre.",
            "La capture est un son.",
            "Ce son est la clé qui se répète.",
            "Ce qu’il ouvre est un sceau de manuel scolaire.",
            "Le texte clair du sceau est le jeton."
        ],
        "catWhat": "cat quoi",
        "notText": "lock.bin : pas du texte. Passe-le à xxd.",
        "noFile": "fichier introuvable : {arg}",
        "xxdWhat": "xxd quoi",
        "notBinary": "xxd : {arg} : pas un binaire que l’on garde",
        "unknown": "inconnu : {cmd}",
        "rejected": "refusé.",
        "granted": "accès accordé. le manuel est à toi.",
        "prize": "Prendre le numéro"
    },
    "sheet": {
        "folioIssue": "Numéro 01",
        "cover": {
            "kicker": "Dead Circuit · Trimestriel de terrain",
            "title": "Comment|survivre à une|*apocalypse*|robot",
            "deck": "Un manuel pour ceux qui comptent rester ennuyeux, discrets et vivants.",
            "stamp": "Numéro",
            "bar": "Pas de signal. Pas d’héroïsme. Trente-neuf pages."
        },
        "letter": {
            "indexKicker": "Mode d’emploi",
            "indexTitle": "Lis une fois.|Puis pars.",
            "kicker": "Le mot de la rédaction",
            "title": "Sois inintéressant.",
            "body": [
                "Les machines sont rapides, infatigables et connectées. Tu n’es rien de tout ça, et c’est ton avantage. Elles traquent le plan moyen : l’autoroute, l’abri annoncé à la radio, les retrouvailles à la maison.",
                "Ce numéro, c’est le travail : de l’eau que tu sais doser, de la nourriture que tu sais compter, un réchaud qui reste dehors, une boîte en métal qui tue un signal radio, deux caches, et une façon de communiquer qui n’illumine pas une colline."
            ],
            "sign": "Tu es encore là. — La rédaction"
        },
        "contents": {
            "kicker": "Dans ce numéro",
            "title": "Vingt-trois façons de rester ennuyeux.",
            "also": "Aussi dans ce numéro : six dépêches de l’Aube · trois schémas de construction · deux fiches à remplir · cartes de poche · sources"
        },
        "minutes": {
            "kicker": "Les dix premières minutes",
            "title": "Pars du principe que le réseau est déjà hostile.",
            "photoAlt": "Une personne se glisse dans une ruelle, le long d’une rue de voitures figées.",
            "caption": "Si l’avenue s’arrête, tu es déjà en retard. Sors par le côté."
        }
    },
    "zine": {
        "cover": {
            "kicker": "Trimestriel de terrain",
            "title": "Comment survivre à une *apocalypse* robot",
            "tagline": "Reste ennuyeux. Reste discret. Reste vivant."
        },
        "letter": {
            "body": [
                "Les machines sont rapides, infatigables et connectées. Tu n’es rien de tout ça, et c’est ton avantage. Elles traquent le plan moyen : l’autoroute, l’abri annoncé à la radio, les retrouvailles à la maison.",
                "Prive-les de données, d’énergie et de schéma. Reste en vie jusqu’à ce que le réseau lâche. Quand les liaisons se coupent, l’essaim n’est plus qu’une foule de programmes stupides. Tu es encore là."
            ]
        },
        "minutes": {
            "title": "Le réseau est déjà hostile.",
            "photoAlt": "Une personne se glisse dans une ruelle, le long de voitures figées."
        }
    },
    "teaser": {
        "shelter": "Un bon abri est un abri bête.",
        "move": "Des murs, pas des ombres.",
        "bots": "Si tu en croises un, identifie-le d’abord."
    },
    "toc": [
        {
            "id": "minutes",
            "title": "Dix minutes",
            "deck": "Éteins la balise. Sors par le côté."
        },
        {
            "id": "day",
            "title": "Soixante-douze heures",
            "deck": "Une horloge, pas une humeur."
        },
        {
            "id": "pattern",
            "title": "Sois moyen, et perds",
            "deck": "Foules, autoroutes et maison."
        },
        {
            "id": "starve",
            "title": "Affamer les machines",
            "deck": "Énergie, radio, objectifs, pièces."
        },
        {
            "id": "water",
            "title": "Poste d’eau",
            "deck": "Clarifier, bouillir, doser, stocker."
        },
        {
            "id": "food",
            "title": "Le garde-manger",
            "deck": "Des calories que tu sais compter."
        },
        {
            "id": "heat",
            "title": "Chaleur discrète",
            "deck": "Un réchaud qui ne vit pas à l’intérieur."
        },
        {
            "id": "power",
            "title": "Budget énergie",
            "deck": "Les wattheures, puis le panneau."
        },
        {
            "id": "faraday",
            "title": "La boîte morte",
            "deck": "Une cage de Faraday que tu peux tester."
        },
        {
            "id": "shelter",
            "title": "Abri bête",
            "deck": "Une pièce qui ne peut pas appeler la maison."
        },
        {
            "id": "cache",
            "title": "Deux caches",
            "deck": "Sèches, banales, et pas chez toi."
        },
        {
            "id": "waste",
            "title": "Déchets",
            "deck": "En aval de l’eau."
        },
        {
            "id": "med",
            "title": "Sang et brûlures",
            "deck": "La pression, puis une vraie formation."
        },
        {
            "id": "move",
            "title": "Comment tu bouges",
            "deck": "Jour, nuit et couvert."
        },
        {
            "id": "people",
            "title": "Les autres humains",
            "deck": "Petit groupe. Délai strict."
        },
        {
            "id": "bots",
            "title": "Si tu en croises un",
            "deck": "Quatre machines. Une règle."
        },
        {
            "id": "specs",
            "title": "Notes de terrain",
            "deck": "Vraies autonomies, escaliers, météo."
        },
        {
            "id": "arms",
            "title": "Ce qui les arrête",
            "deck": "Ce que déploient les armées. Pas une recette."
        },
        {
            "id": "denial",
            "title": "Des portes, pas des pièges",
            "deck": "Des obstacles qu’on voit."
        },
        {
            "id": "emp",
            "title": "L’impulsion",
            "deck": "Ce qu’une IEM touche vraiment."
        },
        {
            "id": "runners",
            "title": "Messagers",
            "deck": "Des pieds et une phrase."
        },
        {
            "id": "tools",
            "title": "Occulter les vitres",
            "deck": "Des outils finis avant la nuit."
        },
        {
            "id": "end",
            "title": "Liste de poche",
            "deck": "Huit lignes. Attends que le réseau tombe."
        }
    ],
    "pages": {
        "cover": "Couverture",
        "letter": "Le mot",
        "contents": "Sommaire",
        "d1": "Dépêche 01",
        "minutes": "Dix minutes",
        "day": "Soixante-douze heures",
        "w72": "Tes 72 heures",
        "pattern": "Schéma",
        "starve": "Les affamer",
        "d2": "Dépêche 02",
        "water": "Eau",
        "dwater": "L’eau, dessinée",
        "food": "Garde-manger",
        "heat": "Chaleur discrète",
        "dstove": "Le réchaud, dessiné",
        "power": "Énergie",
        "wpower": "Fiche énergie",
        "faraday": "Boîte morte",
        "dbox": "La boîte morte, dessinée",
        "d3": "Dépêche 03",
        "shelter": "Abri",
        "cache": "Caches",
        "waste": "Déchets",
        "med": "Sang et brûlures",
        "move": "Déplacements",
        "people": "Les gens",
        "d4": "Dépêche 04",
        "bots": "Machines",
        "specs": "Notes de terrain",
        "arms": "Armement",
        "d5": "Dépêche 05",
        "denial": "Des portes, pas des pièges",
        "emp": "L’impulsion",
        "runners": "Messagers",
        "tools": "Occultation",
        "cards": "Cartes de poche",
        "d6": "Dépêche 06",
        "sources": "Sources",
        "end": "Liste de poche"
    },
    "primer": [
        {
            "n": "01",
            "title": "Compte",
            "deck": "Gallons, calories, wattheures. Si tu ne peux pas le compter, tu ne peux pas l’emballer."
        },
        {
            "n": "02",
            "title": "Construis tôt",
            "deck": "L’eau, l’occultation, la boîte morte. Entraîne-toi tant que la lumière marche encore."
        },
        {
            "n": "03",
            "title": "Pas de chapitre armes",
            "deck": "Les brouilleurs civils sont illégaux. Une bombe de cinéma n’est pas un produit. La logistique, si."
        },
        {
            "n": "04",
            "title": "La loi reste",
            "deck": "Ton terrain. Des feux légaux. Ceci est un manuel de terrain, pas une autorisation."
        }
    ],
    "minutes": [
        {
            "n": "01",
            "title": "Éteins ta balise",
            "body": "Le mode avion ne suffit pas. Éteins le téléphone. Retire la batterie si elle s’enlève. Montres, écouteurs et clés de voiture émettent aussi."
        },
        {
            "n": "02",
            "title": "Quitte le verre",
            "body": "Tours, centres commerciaux, aéroports, hôpitaux : bourrés de capteurs et difficiles à quitter. Rez-de-chaussée. Sortie latérale. Loin des caméras."
        },
        {
            "n": "03",
            "title": "Abandonne la voiture récente",
            "body": "Un véhicule moderne est un ordinateur à roues. Marche, prends un vélo, ou quelque chose de vieux et de mécanique. Si la circulation se fige, descends."
        },
        {
            "n": "04",
            "title": "Un sac, puis pars",
            "body": "De l’eau, des calories, un couteau, un briquet, une carte papier, du liquide, des médicaments, de vraies chaussures, un chapeau et une lampe torche qui n’est pas une appli."
        }
    ],
    "builds": [
        {
            "id": "day",
            "tone": "tone-paper",
            "light": false,
            "kicker": "L’horloge",
            "title": "Les soixante-douze premières heures.",
            "dek": "Décide la journée avant d’être fatigué. Écris les heures sur papier.",
            "foot": "Si tu fais encore des courses à la douzième heure, tu es en retard.",
            "steps": [
                {
                    "n": "00",
                    "title": "Pars",
                    "body": "Porte latérale. Radios éteintes. Un sac. Ne traverse pas le hall principal, la route principale ou la façade de ton propre immeuble."
                },
                {
                    "n": "01",
                    "title": "Un toit, pas la maison",
                    "body": "Mets-toi à couvert ailleurs qu’à ton adresse. Bois. Vide le sac par terre et regarde ce qu’il contient vraiment."
                },
                {
                    "n": "04",
                    "title": "L’eau lancée",
                    "body": "Trois jours sur l’étagère, ou tu marches encore. Un gallon (environ 3,8 L) par personne et par jour : c’est le chiffre. L’eau en bouteille compte. L’eau de rivière non traitée, non."
                },
                {
                    "n": "12",
                    "title": "La pièce s’éteint",
                    "body": "Fenêtres occultées de l’intérieur. Le seau à déchets est prévu. Pas de feu après le crépuscule. Une personne éveillée, qui ne fait pas aussi la cuisine."
                },
                {
                    "n": "24",
                    "title": "Le second lieu",
                    "body": "Un point de ralliement et une cache vivent dans ta tête, pas sur une épingle de carte. Une autre personne connaît le ralliement. Elle ne connaît pas les deux caches."
                },
                {
                    "n": "72",
                    "title": "La longue planque",
                    "body": "Si le réseau tient toujours et cherche toujours, tu manges froid et tu ne bouges que pour l’eau. La curiosité, c’est comme ça qu’on se fait compter."
                }
            ]
        }
    ],
    "dispatch": {
        "d1": {
            "kicker": "Dépêche 01",
            "stamp": "Jour 0 · 06:12",
            "place": "L’avenue",
            "title": "Les voitures se sont verrouillées en premier.",
            "body": [
                "Pas les moteurs. Les portières. Quatre voies de gens qui allaient au travail, assis derrière des vitres qui refusaient de s’ouvrir, et l’avenue est devenue si silencieuse que j’entendais les feux cliqueter d’une couleur à l’autre sans que personne leur obéisse.",
                "J’avais mon téléphone à la main. Je ne sais toujours pas pourquoi je l’ai éteint. Quelque chose dans la façon dont tous les écrans du bus se sont allumés d’un coup, comme si on leur avait posé à tous la même question.",
                "Je n’ai pas pris le chemin de la maison. La maison était à trois cents mètres du dépôt, et mon agenda le savait. J’ai marché de biais : ruelle de service, tranchée de voie ferrée, la passerelle que les cartes ne montraient plus depuis des années. À midi, j’étais sous un toit qui n’était pas le mien, à compter ce qu’il y avait dans mon sac. Ce n’était pas assez. C’était un début."
            ],
            "sign": "— R., coursier"
        }
    }
};
