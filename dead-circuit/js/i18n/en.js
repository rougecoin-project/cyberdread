/**
 * Dead Circuit, English: public strings (site UI and the free preview).
 * The paid chapters are not here; they live sealed in content/issue-01/.
 * Mirrors en.js key for key; check with dead-circuit/js/i18n/check.mjs.
 */
export default {
    "code": "en",
    "name": "English",
    "dir": "ltr",
    "titles": {
        "store": "Dead Circuit — Issue 01, {price}",
        "storeDescription": "Dead Circuit, issue 01. {price} until {deadline}. The clock does not reset.",
        "read": "Dead Circuit — Read the issue",
        "thanks": "Dead Circuit — Take the file",
        "gate": "dc@gate"
    },
    "languageLabel": "Language",
    "store": {
        "deadline": "11 Nov 2026, midnight Eastern",
        "windowClosed": "Window closed",
        "barBuy": "Half off — {price}",
        "fullPrice": "Full price {full}",
        "heroAlt": "Cover of Dead Circuit, issue 01.",
        "dawnKicker": "Predicted dawn · {deadline}",
        "headlineOpen": "Half off until the dawn. Then it doubles.",
        "headlineClosed": "The half-off window is closed.",
        "priceNoteOpen": "The real price is {full}. This is half off, and the clock does not reset.",
        "priceNoteClosed": "Full price.",
        "clockLabel": "Time left until {deadline}",
        "clockUnits": [
            "Days",
            "Hours",
            "Min",
            "Sec"
        ],
        "payCard": "Pay by card — {price}",
        "payCrypto": "Pay with crypto",
        "openingStripe": "Opening Stripe…",
        "deck": "{pages} pages. Card opens Stripe at {price} and brings you back to the file. Crypto is the same file once {price} hits one wallet.",
        "cryptoNote": "Send {price} on one chain. That is half of {full}. Send it in one transfer from a regular wallet, then paste the transaction id on Take the file.",
        "copy": "Copy",
        "copied": "Copied",
        "alreadyPaid": "Already paid? Take the file",
        "lookInside": "Look inside the issue",
        "paperKicker": "In the file",
        "paperTitle": "What half-off {price} buys. Full price is {full}.",
        "voltKicker": "The limit",
        "voltTitle": "After the dawn this doubles to {full}.",
        "voltBuy": "Get the issue — {price}",
        "endTitle": "Half off now. {full} when the clock hits zero.",
        "endBody": "Pay by card and Stripe charges {price}, then sends you straight to the file. Pay with crypto by sending {price} to one wallet, then paste the transaction id on Take the file. After {deadline} the price is {full}.",
        "endBuy": "Pay {price}, half of {full}",
        "dockClosed": "Closed",
        "dockLeft": "{d}d {h}h",
        "noscript": "Dead Circuit needs JavaScript."
    },
    "reader": {
        "wordmarkIssue": "Issue 01",
        "buy": "Buy · {price}",
        "previous": "Previous page",
        "next": "Next page",
        "getPdf": "Get the PDF",
        "pdfShort": "PDF",
        "pagesNav": "Pages",
        "locked": {
            "kicker": "The preview ends here",
            "title": "{count} more pages in the full issue.",
            "body": "Every build with its diagram, two worksheets, five more dispatches from the Dawn, cut-out pocket cards and the sources. One PDF, in your language.",
            "cta": "Get the issue — {price}",
            "badge": "In the full issue",
            "listTitle": "Inside the full issue"
        }
    },
    "thanks": {
        "kicker": "Dead Circuit · Issue 01",
        "title": "Take the file.",
        "intro": "Paid by card? Stripe sends you back here on its own. Paid with crypto? Paste the transaction below.",
        "download": "Download the PDF",
        "chain": "Chain",
        "tx": "Transaction id",
        "txPlaceholder": "0x…, txid or signature",
        "check": "Check payment",
        "checking": "Checking the chain…",
        "checkingStripe": "Checking your card payment with Stripe…",
        "verified": "Verified. The link works for fifteen minutes. Save the file somewhere safe.",
        "stuck": "Stuck? {link} with your receipt or transaction id.",
        "stuckLink": "Ask on Telegram",
        "back": "Back to the offer",
        "offline": "Could not reach the desk. Check your connection and try again."
    },
    "errors": {
        "stripe-bad-id": "That is not a Stripe checkout id.",
        "stripe-unknown": "Stripe does not know that checkout.",
        "stripe-unpaid": "Stripe has not marked that checkout paid yet.",
        "stripe-wrong": "That checkout was not for Dead Circuit.",
        "base-bad-hash": "A Base transaction hash is 0x plus 64 hex characters.",
        "base-not-found": "Base has no transaction with that hash. Check it, or wait a minute.",
        "base-pending": "That transaction is still pending. Try again in a minute.",
        "tx-failed": "That transaction failed on chain.",
        "eth-not-to-wallet": "That transaction did not send ETH straight to the Dead Circuit wallet.",
        "xrge-none": "That transaction sent no XRGE to the Dead Circuit wallet.",
        "btc-bad-id": "A Bitcoin transaction id is 64 hex characters.",
        "btc-not-found": "Bitcoin has no transaction with that id yet. Check it, or wait a few minutes.",
        "btc-none": "That transaction sent nothing to the Dead Circuit wallet.",
        "btc-unconfirmed": "Seen it. Bitcoin needs one confirmation, usually ten minutes. Try again then.",
        "sol-bad-sig": "That does not look like a Solana signature.",
        "sol-not-found": "Solana has no confirmed transaction with that signature yet. Try again in a minute.",
        "sol-none": "That transaction sent no SOL to the Dead Circuit wallet.",
        "too-old": "That payment is older than this sale.",
        "too-little": "That payment is worth about ${usd} today. The issue is ${need}.",
        "bad-chain": "Pick the chain you paid on.",
        "used-up": "That payment has already been used for its downloads. Ask for help if this is yours.",
        "throttled": "Too many tries. Wait a minute.",
        "unavailable": "Could not check that payment right now. Try again in a minute.",
        "unknown": "Something went wrong. Try again."
    },
    "gate": {
        "leave": "Leave",
        "boot": [
            "DEAD CIRCUIT GATE",
            "The issue is for sale on the floor. This room is not.",
            "Type help."
        ],
        "readme": [
            "Operators derive the clearance token, then submit it.",
            "Tourists use the door on the floor.",
            "man gate — if you are actually lost."
        ],
        "note": [
            "password: apocalypse",
            "if that worked, everyone would already be inside."
        ],
        "man": [
            "Three layers, in order.",
            "The capture is sound.",
            "That sound is the repeating pad.",
            "What it opens is a textbook seal.",
            "The seal’s plaintext is the token."
        ],
        "catWhat": "cat what",
        "notText": "lock.bin: not text. xxd it.",
        "noFile": "no such file: {arg}",
        "xxdWhat": "xxd what",
        "notBinary": "xxd: {arg}: not a binary we keep",
        "unknown": "unknown: {cmd}",
        "rejected": "rejected.",
        "granted": "clearance granted. the manual is yours.",
        "prize": "Take the issue"
    },
    "sheet": {
        "folioIssue": "Issue 01",
        "cover": {
            "kicker": "Dead Circuit · Field quarterly",
            "title": "How to|survive a|robot|*apocalypse*",
            "deck": "A manual for people who intend to stay boring, quiet, and alive.",
            "stamp": "Issue",
            "bar": "No signal. No heroics. Thirty-nine pages."
        },
        "letter": {
            "indexKicker": "How to use it",
            "indexTitle": "Read once.|Then go.",
            "kicker": "Editor’s letter",
            "title": "Be uninteresting.",
            "body": [
                "Machines are fast, tireless, and networked. You are none of those, and that is the advantage. They hunt the average plan: the highway, the shelter on the radio, the reunion at home.",
                "This issue is the work: water you can dose, food you can count, a stove that stays outside, a metal box that kills a radio signal, two caches, and a way to talk that does not light a hill."
            ],
            "sign": "You are still here. — The desk"
        },
        "contents": {
            "kicker": "In this issue",
            "title": "Twenty-three ways to stay boring.",
            "also": "Also inside: six dispatches from the Dawn · three build diagrams · two worksheets · pocket cards · sources"
        },
        "minutes": {
            "kicker": "The first ten minutes",
            "title": "Assume the network is already hostile.",
            "photoAlt": "A person slips into an alley past a street of frozen cars.",
            "caption": "If the avenue stops, you are already late. Leave sideways."
        }
    },
    "zine": {
        "cover": {
            "kicker": "Field quarterly",
            "title": "How to survive a robot *apocalypse*",
            "tagline": "Stay boring. Stay quiet. Stay alive."
        },
        "letter": {
            "body": [
                "Machines are fast, tireless, and networked. You are none of those, and that is the advantage. They hunt the average plan: the highway, the shelter on the radio, the reunion at home.",
                "Deny them data, power, and a pattern. Stay alive until the grid fails. When the links partition, the swarm is just many stupid programs. You are still here."
            ]
        },
        "minutes": {
            "title": "The network is already hostile.",
            "photoAlt": "A person slips into an alley past frozen cars."
        }
    },
    "teaser": {
        "shelter": "Good shelter is dumb shelter.",
        "move": "Walls, not shadows.",
        "bots": "If you meet one, name it first."
    },
    "toc": [
        {
            "id": "minutes",
            "title": "Ten minutes",
            "deck": "Kill the beacon. Leave sideways."
        },
        {
            "id": "day",
            "title": "Seventy-two hours",
            "deck": "A clock, not a mood."
        },
        {
            "id": "pattern",
            "title": "Be average, and lose",
            "deck": "Crowds, highways, and home."
        },
        {
            "id": "starve",
            "title": "Starve the machines",
            "deck": "Power, radio, lenses, parts."
        },
        {
            "id": "water",
            "title": "Water station",
            "deck": "Clear, boil, dose, store."
        },
        {
            "id": "food",
            "title": "The pantry",
            "deck": "Calories you can count."
        },
        {
            "id": "heat",
            "title": "Quiet heat",
            "deck": "A stove that does not live indoors."
        },
        {
            "id": "power",
            "title": "Power budget",
            "deck": "Watt-hours, then a panel."
        },
        {
            "id": "faraday",
            "title": "The dead box",
            "deck": "A Faraday can you can test."
        },
        {
            "id": "shelter",
            "title": "Dumb shelter",
            "deck": "A room that cannot ping home."
        },
        {
            "id": "cache",
            "title": "Two caches",
            "deck": "Dry, dull, and not at home."
        },
        {
            "id": "waste",
            "title": "Waste",
            "deck": "Downhill of the water."
        },
        {
            "id": "med",
            "title": "Blood and burns",
            "deck": "Pressure, then a real class."
        },
        {
            "id": "move",
            "title": "How you move",
            "deck": "Day, night, and cover."
        },
        {
            "id": "people",
            "title": "Other humans",
            "deck": "Small group. A hard time limit."
        },
        {
            "id": "bots",
            "title": "If you meet one",
            "deck": "Four machines. One rule."
        },
        {
            "id": "specs",
            "title": "Field notes",
            "deck": "Real runtimes, stairs, weather."
        },
        {
            "id": "arms",
            "title": "What stops them",
            "deck": "What armies field. Not a recipe."
        },
        {
            "id": "denial",
            "title": "Doors, not traps",
            "deck": "Obstacles a person can see."
        },
        {
            "id": "emp",
            "title": "The pulse",
            "deck": "What an EMP actually hits."
        },
        {
            "id": "runners",
            "title": "Runners",
            "deck": "Feet and a sentence."
        },
        {
            "id": "tools",
            "title": "Black the glass",
            "deck": "Tools you finish before dark."
        },
        {
            "id": "end",
            "title": "Pocket checklist",
            "deck": "Eight lines. Wait out the grid."
        }
    ],
    "pages": {
        "cover": "Cover",
        "letter": "The letter",
        "contents": "Contents",
        "d1": "Dispatch 01",
        "minutes": "Ten minutes",
        "day": "Seventy-two hours",
        "w72": "Your 72 hours",
        "pattern": "Pattern",
        "starve": "Starve them",
        "d2": "Dispatch 02",
        "water": "Water",
        "dwater": "Water, drawn",
        "food": "Pantry",
        "heat": "Quiet heat",
        "dstove": "Stove, drawn",
        "power": "Power",
        "wpower": "Power sheet",
        "faraday": "Dead box",
        "dbox": "Dead box, drawn",
        "d3": "Dispatch 03",
        "shelter": "Shelter",
        "cache": "Caches",
        "waste": "Waste",
        "med": "Blood and burns",
        "move": "Movement",
        "people": "People",
        "d4": "Dispatch 04",
        "bots": "Machines",
        "specs": "Field notes",
        "arms": "Ordnance",
        "d5": "Dispatch 05",
        "denial": "Doors, not traps",
        "emp": "The pulse",
        "runners": "Runners",
        "tools": "Blackout",
        "cards": "Pocket cards",
        "d6": "Dispatch 06",
        "sources": "Sources",
        "end": "Checklist"
    },
    "primer": [
        {
            "n": "01",
            "title": "Count it",
            "deck": "Gallons, calories, watt-hours. If you cannot count it, you cannot pack it."
        },
        {
            "n": "02",
            "title": "Build it early",
            "deck": "Water, blackout, the dead box. Practice while the lights still work."
        },
        {
            "n": "03",
            "title": "No weapon chapter",
            "deck": "Civilian jammers are illegal. A movie bomb is not a product. Logistics is."
        },
        {
            "n": "04",
            "title": "The law stays",
            "deck": "Your land. Legal fires. This is a field manual, not a permission slip."
        }
    ],
    "minutes": [
        {
            "n": "01",
            "title": "Kill your beacon",
            "body": "Airplane mode is not enough. Power the phone off. Pull the battery if it has one. Watches, earbuds, and car keys broadcast too."
        },
        {
            "n": "02",
            "title": "Get off the glass",
            "body": "Towers, malls, airports, hospitals: dense with sensors and hard to leave. Ground floor. Side exit. Away from cameras."
        },
        {
            "n": "03",
            "title": "Ditch the new car",
            "body": "A modern vehicle is a computer with wheels. Use feet, a bicycle, or something old and mechanical. If traffic freezes, get out."
        },
        {
            "n": "04",
            "title": "One bag, then go",
            "body": "Water, calories, a knife, a lighter, a paper map, cash, medicine, real shoes, a hat, and a flashlight that is not an app."
        }
    ],
    "builds": [
        {
            "id": "day",
            "tone": "tone-paper",
            "light": false,
            "kicker": "The clock",
            "title": "The first seventy-two hours.",
            "dek": "Decide the day before you are tired. Write the times on paper.",
            "foot": "If you are still shopping at hour twelve, you are late.",
            "steps": [
                {
                    "n": "00",
                    "title": "Leave",
                    "body": "Side door. Radios off. One bag. Do not cross the main hall, the main road, or the front of your own building."
                },
                {
                    "n": "01",
                    "title": "A roof, not home",
                    "body": "Get under cover that is not your address. Drink. Empty the bag on the floor and see what is actually in it."
                },
                {
                    "n": "04",
                    "title": "Water started",
                    "body": "Three days on the shelf, or you are still walking. One gallon per person per day is the number. Bottled counts. Untreated river water does not."
                },
                {
                    "n": "12",
                    "title": "The room goes dark",
                    "body": "Windows blacked from the inside. Waste bucket in the plan. No fire after dusk. One person awake, not also cooking."
                },
                {
                    "n": "24",
                    "title": "The second place",
                    "body": "A rally point and a cache live in your head, not in a pin. One other person knows the rally. They do not know both caches."
                },
                {
                    "n": "72",
                    "title": "The long hide",
                    "body": "If the grid is still up and still looking, you eat cold and you move only for water. Curiosity is how people get counted."
                }
            ]
        }
    ],
    "dispatch": {
        "d1": {
            "kicker": "Dispatch 01",
            "stamp": "Day 0 · 06:12",
            "place": "The avenue",
            "title": "The cars locked first.",
            "body": [
                "Not the engines. The doors. Four lanes of commuters sat behind glass that would not open, and the avenue went so quiet I could hear the traffic lights clicking through colours nobody was obeying.",
                "I had my phone in my hand. I still don’t know why I turned it off. Something about the way every screen on the bus lit at once, like they had all been asked the same question.",
                "I didn’t go home. Home was three hundred metres from the depot, and my calendar knew it. I walked sideways: service alley, rail cut, the footbridge the maps stopped showing years ago. By noon I was under a roof that wasn’t mine, counting what was in my bag. It wasn’t enough. It was a start."
            ],
            "sign": "— R., courier"
        }
    }
};
