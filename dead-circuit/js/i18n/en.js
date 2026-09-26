/**
 * Dead Circuit, English. This is the source every other language file
 * mirrors: same keys, same array lengths, same order.
 *
 * Translate only the strings. Never change `id`, `tone`, `light`, `page`,
 * or `n` values, and keep {placeholders} exactly as written.
 */
export default {
    code: 'en',
    name: 'English',
    dir: 'ltr',

    // Browser tab titles and descriptions, per page.
    titles: {
        store: 'Dead Circuit — Issue 01, {price}',
        storeDescription: 'Dead Circuit, issue 01. {price} until {deadline}. The clock does not reset.',
        read: 'Dead Circuit — Read the issue',
        thanks: 'Dead Circuit — Take the file',
        gate: 'dc@gate'
    },

    languageLabel: 'Language',

    store: {
        deadline: '11 Nov 2026, midnight Eastern',
        windowClosed: 'Window closed',
        barBuy: 'Half off — {price}',
        fullPrice: 'Full price {full}',
        heroAlt: 'Cover of Dead Circuit, issue 01.',
        dawnKicker: 'Predicted dawn · {deadline}',
        headlineOpen: 'Half off until the dawn. Then it doubles.',
        headlineClosed: 'The half-off window is closed.',
        priceNoteOpen: 'The real price is {full}. This is half off, and the clock does not reset.',
        priceNoteClosed: 'Full price.',
        clockLabel: 'Time left until {deadline}',
        clockUnits: ['Days', 'Hours', 'Min', 'Sec'],
        payCard: 'Pay by card — {price}',
        payCrypto: 'Pay with crypto',
        openingStripe: 'Opening Stripe…',
        deck: '{pages} pages. Card opens Stripe at {price} and brings you back to the file. Crypto is the same file once {price} hits one wallet.',
        cryptoNote: 'Send {price} on one chain. That is half of {full}. Send it in one transfer from a regular wallet, then paste the transaction id on Take the file.',
        copy: 'Copy',
        copied: 'Copied',
        alreadyPaid: 'Already paid? Take the file',
        lookInside: 'Look inside the issue',
        paperKicker: 'In the file',
        paperTitle: 'What half-off {price} buys. Full price is {full}.',
        voltKicker: 'The limit',
        voltTitle: 'After the dawn this doubles to {full}.',
        voltBuy: 'Get the issue — {price}',
        endTitle: 'Half off now. {full} when the clock hits zero.',
        endBody: 'Pay by card and Stripe charges {price}, then sends you straight to the file. Pay with crypto by sending {price} to one wallet, then paste the transaction id on Take the file. After {deadline} the price is {full}.',
        endBuy: 'Pay {price}, half of {full}',
        dockClosed: 'Closed',
        dockLeft: '{d}d {h}h',
        noscript: 'Dead Circuit needs JavaScript.'
    },

    reader: {
        wordmarkIssue: 'Issue 01',
        buy: 'Buy · {price}',
        previous: 'Previous page',
        next: 'Next page',
        getPdf: 'Get the PDF',
        pdfShort: 'PDF',
        pagesNav: 'Pages'
    },

    thanks: {
        kicker: 'Dead Circuit · Issue 01',
        title: 'Take the file.',
        intro: 'Paid by card? Stripe sends you back here on its own. Paid with crypto? Paste the transaction below.',
        download: 'Download the PDF',
        chain: 'Chain',
        tx: 'Transaction id',
        txPlaceholder: '0x…, txid or signature',
        check: 'Check payment',
        checking: 'Checking the chain…',
        checkingStripe: 'Checking your card payment with Stripe…',
        verified: 'Verified. The link works for fifteen minutes. Save the file somewhere safe.',
        stuck: 'Stuck? {link} with your receipt or transaction id.',
        stuckLink: 'Ask on Telegram',
        back: 'Back to the offer',
        offline: 'Could not reach the desk. Check your connection and try again.'
    },

    // Answers from the payment check. {usd} and {need} are dollar amounts.
    errors: {
        'stripe-bad-id': 'That is not a Stripe checkout id.',
        'stripe-unknown': 'Stripe does not know that checkout.',
        'stripe-unpaid': 'Stripe has not marked that checkout paid yet.',
        'stripe-wrong': 'That checkout was not for Dead Circuit.',
        'base-bad-hash': 'A Base transaction hash is 0x plus 64 hex characters.',
        'base-not-found': 'Base has no transaction with that hash. Check it, or wait a minute.',
        'base-pending': 'That transaction is still pending. Try again in a minute.',
        'tx-failed': 'That transaction failed on chain.',
        'eth-not-to-wallet': 'That transaction did not send ETH straight to the Dead Circuit wallet.',
        'xrge-none': 'That transaction sent no XRGE to the Dead Circuit wallet.',
        'btc-bad-id': 'A Bitcoin transaction id is 64 hex characters.',
        'btc-not-found': 'Bitcoin has no transaction with that id yet. Check it, or wait a few minutes.',
        'btc-none': 'That transaction sent nothing to the Dead Circuit wallet.',
        'btc-unconfirmed': 'Seen it. Bitcoin needs one confirmation, usually ten minutes. Try again then.',
        'sol-bad-sig': 'That does not look like a Solana signature.',
        'sol-not-found': 'Solana has no confirmed transaction with that signature yet. Try again in a minute.',
        'sol-none': 'That transaction sent no SOL to the Dead Circuit wallet.',
        'too-old': 'That payment is older than this sale.',
        'too-little': 'That payment is worth about ${usd} today. The issue is ${need}.',
        'bad-chain': 'Pick the chain you paid on.',
        'used-up': 'That payment has already been used for its downloads. Ask for help if this is yours.',
        'throttled': 'Too many tries. Wait a minute.',
        'unavailable': 'Could not check that payment right now. Try again in a minute.',
        'unknown': 'Something went wrong. Try again.'
    },

    // The dc@gate terminal. Commands, file names and hex stay in English;
    // translate what the machine says. The man page is a puzzle hint: keep
    // its exact meaning (capture = an audio/Morse recording; repeating pad =
    // a repeating key; textbook seal = textbook encryption).
    gate: {
        leave: 'Leave',
        boot: ['DEAD CIRCUIT GATE', 'The issue is for sale on the floor. This room is not.', 'Type help.'],
        readme: [
            'Operators derive the clearance token, then submit it.',
            'Tourists use the door on the floor.',
            'man gate — if you are actually lost.'
        ],
        note: ['password: apocalypse', 'if that worked, everyone would already be inside.'],
        man: [
            'Three layers, in order.',
            'The capture is sound.',
            'That sound is the repeating pad.',
            'What it opens is a textbook seal.',
            'The seal’s plaintext is the token.'
        ],
        catWhat: 'cat what',
        notText: 'lock.bin: not text. xxd it.',
        noFile: 'no such file: {arg}',
        xxdWhat: 'xxd what',
        notBinary: 'xxd: {arg}: not a binary we keep',
        unknown: 'unknown: {cmd}',
        rejected: 'rejected.',
        granted: 'clearance granted. the manual is yours.',
        prize: 'Take the issue'
    },

    // ------------------------------------------------------------ the issue

    // Text written inline on the desktop spreads. `|` is a line break and
    // *word* is the highlighted word; move them wherever your language needs.
    sheet: {
        folioIssue: 'Issue 01',
        cover: {
            kicker: 'Dead Circuit · Field quarterly',
            title: 'How to|survive a|robot|*apocalypse*',
            deck: 'A manual for people who intend to stay boring, quiet, and alive.',
            stamp: 'Issue',
            bar: 'No signal. No heroics. Twenty-six pages.'
        },
        letter: {
            indexKicker: 'How to use it',
            indexTitle: 'Read once.|Then go.',
            kicker: 'Editor’s letter',
            title: 'Be uninteresting.',
            body: [
                'Machines are fast, tireless, and networked. You are none of those, and that is the advantage. They hunt the average plan: the highway, the shelter on the radio, the reunion at home.',
                'This issue is the work: water you can dose, food you can count, a stove that stays outside, a metal box that kills a radio signal, two caches, and a way to talk that does not light a hill.'
            ],
            sign: 'You are still here. — The desk'
        },
        contents: { kicker: 'In this issue', title: 'Twenty-three ways to stay boring.' },
        minutes: {
            kicker: 'The first ten minutes',
            title: 'Assume the network is already hostile.',
            photoAlt: 'A person slips into an alley past a street of frozen cars.',
            caption: 'If the avenue stops, you are already late. Leave sideways.'
        },
        pattern: { kicker: 'Do not be the average human', quote: 'The predictable route is a schedule with your name on it.' },
        starve: {
            kicker: 'Logistics, not legend',
            title: 'Starve the machines.',
            dek: 'They need power, bandwidth, and a mechanic. You need water. Trade accordingly. Do not try to hack the uprising unless that was already your job.'
        },
        shelter: {
            photoAlt: 'A concrete basement with water jugs, a paper map, and one lamp.',
            caption: 'Good shelter is dumb shelter.',
            kicker: 'Where you sleep',
            title: 'A room that cannot ping home.',
            foot: 'Water, then food, then warmth. Three days of water before a longer hide.'
        },
        move: {
            photoAlt: 'A cyclist rides under an overpass at night, drones far off.',
            kicker: 'Movement',
            title: 'Walls, not shadows.',
            day: 'Day',
            dayBody: 'Only under thick cover. Woods, ruins, drains you already know. Open ground is a gallery.',
            night: 'Night',
            nightBody: 'Move slow. Darkness does not hide you from heat. Break the line of sight with a wall.',
            rules: [
                'Cross one person at a time, at the narrowest point, then wait.',
                'Never travel as a convoy of lights and engines.',
                'Cache supplies in two places. If one burns, you still eat.'
            ]
        },
        people: { kicker: 'The real variable', title: 'Other humans.', pull: 'Searching for the late is how groups die.' },
        bots: {
            photoAlt: 'A boxy ground robot with one camera eye waits on a stair landing.',
            kicker: 'Identification',
            title: 'If you meet one, name it first.',
            rule: 'Cornered? Break the line of sight, then change direction. Tracking follows the last vector. Doors, not hallways. Smoke once, then leave.'
        },
        specs: {
            kicker: 'Field notes',
            title: 'The brochure, corrected.',
            source: 'Boston Dynamics Spot specs and instructions for use. Gao et al., Scientific Reports, 2021.'
        },
        arms: {
            kicker: 'Ordnance',
            title: 'What actually shoots back.',
            foot: 'A 2017 U.S. trial called the drones “very resilient against damage.” Weather, wire, a ceiling, and the watt-hour do the rest. Not a recipe, and not a shopping list.'
        },
        end: {
            kicker: 'Pocket checklist',
            title: 'Eight lines.',
            photoAlt: 'A substation arcs as the city behind it goes dark.',
            winsTitle: 'What actually wins',
            wins: [
                'Not a chosen-one speech. Logistics. Plants stop. Networks split. Weather, mud, and missing parts do the rest.',
                'This is fiction until it isn’t. The same habits beat a blackout, a flood, a quake. Practice the boring version while the toasters are still on your side.'
            ],
            mark: 'End of signal'
        }
    },

    // Text written inline in the single-column mobile edition.
    zine: {
        cover: {
            kicker: 'Field quarterly',
            title: 'How to survive a robot *apocalypse*',
            tagline: 'Stay boring. Stay quiet. Stay alive.'
        },
        letter: {
            body: [
                'Machines are fast, tireless, and networked. You are none of those, and that is the advantage. They hunt the average plan: the highway, the shelter on the radio, the reunion at home.',
                'Deny them data, power, and a pattern. Stay alive until the grid fails. When the links partition, the swarm is just many stupid programs. You are still here.'
            ]
        },
        minutes: { title: 'The network is already hostile.', photoAlt: 'A person slips into an alley past frozen cars.' },
        pattern: { kicker: 'Do not be average' },
        shelter: {
            photoAlt: 'A basement shelter with water, a paper map, and one lamp.',
            kicker: 'Dumb shelter',
            foot: 'Water, then food, then warmth.'
        },
        move: {
            photoAlt: 'A cyclist under an overpass at night.',
            day: 'Only under thick cover. Open ground is a gallery.',
            night: 'Move slow. Heat sensors do not care that it is dark.',
            foot: 'Cross one at a time. No convoys of lights. Cache supplies in two places.'
        },
        bots: {
            photoAlt: 'A one-eyed ground robot on a stair landing.',
            kicker: 'If you meet one',
            title: 'Name it, then go around.',
            foot: 'Cornered? Break sight, change direction, use doors. Smoke once, then leave.'
        },
        arms: {
            foot: 'A 2017 U.S. trial called the drones “very resilient against damage.” Weather, wire, a ceiling, and the battery do more than a gadget. This is not a build guide. Civilian jammers are illegal.'
        },
        end: {
            photoAlt: 'A substation flares as the skyline goes dark.',
            title: 'Eight lines. Then wait.',
            body: 'What wins is logistics: dead plants, split networks, mud, and missing parts. This is fiction until it isn’t. Practice the boring version while the toasters are still on your side.'
        }
    },

    // Structured magazine copy, shared by the desktop spreads and the zine.
    toc: [
      { n: "04", title: "Ten minutes", page: 3, deck: "Kill the beacon. Leave sideways." },
      { n: "05", title: "Seventy-two hours", page: 4, deck: "A clock, not a mood." },
      { n: "06", title: "Be average, and lose", page: 5, deck: "Crowds, highways, and home." },
      { n: "07", title: "Starve the machines", page: 6, deck: "Power, radio, lenses, parts." },
      { n: "08", title: "Water station", page: 7, deck: "Clear, boil, dose, store." },
      { n: "09", title: "The pantry", page: 8, deck: "Calories you can count." },
      { n: "10", title: "Quiet heat", page: 9, deck: "A stove that does not live indoors." },
      { n: "11", title: "Power budget", page: 10, deck: "Watt-hours, then a panel." },
      { n: "12", title: "The dead box", page: 11, deck: "A Faraday can you can test." },
      { n: "13", title: "Dumb shelter", page: 12, deck: "A room that cannot ping home." },
      { n: "14", title: "Two caches", page: 13, deck: "Dry, dull, and not at home." },
      { n: "15", title: "Waste", page: 14, deck: "Downhill of the water." },
      { n: "16", title: "Blood and burns", page: 15, deck: "Pressure, then a real class." },
      { n: "17", title: "How you move", page: 16, deck: "Day, night, and cover." },
      { n: "18", title: "Other humans", page: 17, deck: "Small group. A hard time limit." },
      { n: "19", title: "If you meet one", page: 18, deck: "Four machines. One rule." },
      { n: "20", title: "Field notes", page: 19, deck: "Real runtimes, stairs, weather." },
      { n: "21", title: "What stops them", page: 20, deck: "What armies field. Not a recipe." },
      { n: "22", title: "Doors, not traps", page: 21, deck: "Obstacles a person can see." },
      { n: "23", title: "The pulse", page: 22, deck: "What an EMP actually hits." },
      { n: "24", title: "Runners", page: 23, deck: "Feet and a sentence." },
      { n: "25", title: "Black the glass", page: 24, deck: "Tools you finish before dark." },
      { n: "26", title: "Pocket checklist", page: 25, deck: "Eight lines. Wait out the grid." },
    ],

    primer: [
      { n: "01", title: "Count it", deck: "Gallons, calories, watt-hours. If you cannot count it, you cannot pack it." },
      { n: "02", title: "Build it early", deck: "Water, blackout, the dead box. Practice while the lights still work." },
      { n: "03", title: "No weapon chapter", deck: "Civilian jammers are illegal. A movie bomb is not a product. Logistics is." },
      { n: "04", title: "The law stays", deck: "Your land. Legal fires. This is a field manual, not a permission slip." },
    ],

    minutes: [
      {
        n: "01",
        title: "Kill your beacon",
        body: "Airplane mode is not enough. Power the phone off. Pull the battery if it has one. Watches, earbuds, and car keys broadcast too.",
      },
      {
        n: "02",
        title: "Get off the glass",
        body: "Towers, malls, airports, hospitals: dense with sensors and hard to leave. Ground floor. Side exit. Away from cameras.",
      },
      {
        n: "03",
        title: "Ditch the new car",
        body: "A modern vehicle is a computer with wheels. Use feet, a bicycle, or something old and mechanical. If traffic freezes, get out.",
      },
      {
        n: "04",
        title: "One bag, then go",
        body: "Water, calories, a knife, a lighter, a paper map, cash, medicine, real shoes, a hat, and a flashlight that is not an app.",
      },
    ],

    patterns: [
      { title: "Odd hours, odd paths", body: "Footpaths and rail cuts. Not the highway the model already solved." },
      { title: "Skip the crowd", body: "A crowd is a target and a dataset. Do not join the announced shelter." },
      { title: "Do not go home", body: "If your devices were on, home is already in the address book." },
      { title: "Change the silhouette", body: "Different coat, a hat, no bright logo the cameras were trained on." },
    ],

    hungers: [
      { need: "Power", deny: "Do not sleep beside the generators, substations, or the last lit block." },
      { need: "Radio", deny: "Metal and basements. No transmitter in the room where you actually sleep." },
      { need: "Cameras", deny: "Hoods, corners, weather, dark. Never pose in an open lot." },
      { need: "Repairs", deny: "Stay clear of depots, airports, and server farms. That is their kitchen." },
    ],

    shelterRules: [
      { k: "Dumb materials", v: "Concrete, brick, or earth. Few windows. One door you control." },
      { k: "No smart house", v: "No connected lock, doorbell camera, or voice assistant." },
      { k: "Down, not up", v: "Basements beat rooftops. Rooftops are landing pads." },
      { k: "Blackout", v: "A light at night is a coordinate. Keep the windows dead." },
      { k: "Cold zone", v: "No electronics past the door. Radio far away, briefly, then move." },
    ],

    peopleRules: [
      { n: "01", t: "Known faces only", d: "Small group. Jobs are simple: water, watch, medical, route." },
      { n: "02", t: "No phones in the circle", d: "The person on watch is not also cooking." },
      { n: "03", t: "Hide the inventory", d: "Desperate people become the second apocalypse." },
      { n: "04", t: "A rally point, not home", d: "Agree a time limit. If someone is late, they are late." },
      { n: "05", t: "Plan the slow", d: "Children and the injured change the route. Decide that before you walk." },
    ],

    machines: [
      { kind: "Sensor", name: "Turret & lens", body: "Fixed, bored, deadly inside a cone. Cameras hate glare, dust, and occlusion. Go around." },
      { kind: "Ground", name: "Ninety-minute dog", body: "A current quadruped is about 34 kg and 1.6 m/s, then the battery is done. Stairs and mud are where the brochure ends." },
      { kind: "Aerial", name: "The weather hater", body: "Many small drones are rated near a 10 m/s wind. A headwind can burn a third of the pack. Get under a roof." },
      { kind: "Humanoid", name: "The poster bot", body: "Dramatic, and usually worse at balance than a tracked machine. Clutter and a closed door still help you." },
    ],

    specs: [
      { n: "90 min", l: "Legged runtime", d: "Published typical life for a Boston Dynamics Spot. About 60 minutes with a payload. The battery itself weighs 5.2 kg." },
      { n: "1.6 m/s", l: "Not a car", d: "Spot’s nominal top speed. Fast on a flat floor. A tight stairwell is a different sport." },
      { n: "3 cm", l: "What it misses", d: "The manual: thin objects under 3 cm, glass, and unblocked cliff edges can fool obstacle detection." },
      { n: "Face up", l: "Stair rule", d: "Spot climbs only while facing up. Not on grated or open-riser stairs. Do not turn it on the steps." },
      { n: "−20°C", l: "Cold tax", d: "Published band is −20°C to 55°C. Cold shrinks battery capacity. Mud and snow raise the energy of every step." },
      { n: "5.7 h", l: "Flyable day", d: "A Scientific Reports study: median hours per day a common small drone can fly, worldwide, once weather is counted." },
    ],

    arms: [
      { name: "Jammers", d: "The common tool. Cut the radio or GPS link and many drones hover, land, or go home. A fiber-optic drone ignores it. Ukraine’s cable trails proved that. Civilian jammers are illegal. This page is not a schematic." },
      { name: "Nets", d: "A minority of real systems, often inside 250 meters. If the parachute fails, the machine still falls on whoever is below." },
      { name: "Lasers", d: "Truck weapons: 50 kW Army Strykers, Israel’s Iron Beam. One target, a few seconds of dwell, clear air. Fog, rain, and dust scatter the beam." },
      { name: "Microwaves", d: "High-power microwave hits a swarm in one pulse. Leonidas is a vehicle. A movie EMP grenade is not this. Metal hulls shrug off a lot of what is sold online." },
      { name: "Guns", d: "Kinetic kills work, then the wreckage falls. A cheap airframe can cost less than the missile. Militaries train shotgun teams. That is a unit with rules, not a shopping list." },
    ],

    checklist: [
      { n: "1", t: "Radios off. The rest go in the dead box." },
      { n: "2", t: "Leave sideways. One bag. Do not go home." },
      { n: "3", t: "One gallon each, per day. Boil one minute." },
      { n: "4", t: "No stove in the room where you sleep." },
      { n: "5", t: "Two caches. One person knows the second." },
      { n: "6", t: "Waste goes downhill, away from water." },
      { n: "7", t: "Pressure on bleeding. Train the tourniquet now." },
      { n: "8", t: "Runners, not radios. Wait out the grid." },
    ],

    builds: [
      {
        id: "day",
        tone: "tone-paper",
        light: false,
        kicker: "The clock",
        title: "The first seventy-two hours.",
        dek: "Decide the day before you are tired. Write the times on paper.",
        foot: "If you are still shopping at hour twelve, you are late.",
        steps: [
          { n: "00", title: "Leave", body: "Side door. Radios off. One bag. Do not cross the main hall, the main road, or the front of your own building." },
          { n: "01", title: "A roof, not home", body: "Get under cover that is not your address. Drink. Empty the bag on the floor and see what is actually in it." },
          { n: "04", title: "Water started", body: "Three days on the shelf, or you are still walking. One gallon per person per day is the number. Bottled counts. Untreated river water does not." },
          { n: "12", title: "The room goes dark", body: "Windows blacked from the inside. Waste bucket in the plan. No fire after dusk. One person awake, not also cooking." },
          { n: "24", title: "The second place", body: "A rally point and a cache live in your head, not in a pin. One other person knows the rally. They do not know both caches." },
          { n: "72", title: "The long hide", body: "If the grid is still up and still looking, you eat cold and you move only for water. Curiosity is how people get counted." },
        ],
      },
      {
        id: "water",
        tone: "tone-ink",
        light: true,
        kicker: "Build it",
        title: "A water station.",
        dek: "Clear it, boil it or dose it, then store it. A filter alone is not safety.",
        foot: "CDC emergency water guidance. FEMA plans one gallon per person per day.",
        steps: [
          { n: "01", title: "Rank the source", body: "Sealed bottles first. Then water you can boil. Rain off a clean roof next. A river last. Never a flood, a pool, or a radiator." },
          { n: "02", title: "Clear it", body: "Pour through cloth, a paper towel, or a coffee filter. If it is cloudy, let it sit and draw off the clear water. Mud hides germs." },
          { n: "03", title: "Boil it", body: "A rolling boil for one minute. Above 6,500 feet, three minutes. Let it cool. Boiling beats a gadget you have not tested." },
          { n: "04", title: "Or dose it", body: "Unscented bleach, 5–9% sodium hypochlorite only. Clear water: 8 drops (about 0.5 mL) per gallon. Cloudy or very cold: 16 drops. Stir. Wait 30 minutes. You want a faint chlorine smell." },
          { n: "05", title: "Store it", body: "Food-grade jugs, filled, dated, out of sun. To clean a jug: 1 teaspoon of that bleach in a quart of water, coat the inside, wait 30 seconds, pour out, air dry." },
          { n: "06", title: "Spend it", body: "One gallon per person per day covers drink and a little wash. Pets get the boiled water too. Do not dip a dirty cup into the jug." },
        ],
      },
      {
        id: "food",
        tone: "tone-paper",
        light: false,
        kicker: "Build it",
        title: "A pantry you can count.",
        dek: "Calories first. Brands are a hobby.",
        foot: "Dry food without water is a brick. Store the gallons with the rice.",
        steps: [
          { n: "01", title: "Mouths times days", body: "People × days × 2,000 calories. A walking adult burns more. A child is not half an adult. Write the number before you buy." },
          { n: "02", title: "Buy boring", body: "Rice, oats, oil, peanut butter, dry beans, salt, powdered milk, canned fish. Oil is dense calories. Pretty snacks are not a plan." },
          { n: "03", title: "Date the shelf", body: "First in, first out. A can with no date is a guess. Eat the guess while you can still replace it." },
          { n: "04", title: "Split the pile", body: "Half where you sleep. Half in the second cache. One fire should not end the food." },
          { n: "05", title: "Cook quiet", body: "Cold food on days you are hiding. Hot food only when smoke and smell will not draw the street. Late morning, not dusk." },
          { n: "06", title: "Water the meal", body: "A cup of dry rice wants about two cups of water. If the water is not in the same room as the rice, you do not have a meal." },
        ],
      },
      {
        id: "heat",
        tone: "tone-hazard",
        light: false,
        kicker: "Build it",
        title: "Quiet heat.",
        dek: "A small stove, outside, dead before dark. Carbon monoxide is not a drill.",
        foot: "Never burn charcoal, or any stove, in the room where people sleep.",
        steps: [
          { n: "01", title: "Outside only", body: "No stove in the sleeping room. No “just a minute.” No charcoal indoors. The gas kills before the fire does." },
          { n: "02", title: "Two steel cans", body: "The big can is the body. Cut a thumb-wide fuel door at the bottom. A smaller can, both ends removed, is the chimney, seated in a hole in the top." },
          { n: "03", title: "Twigs, not trash", body: "Pencil-thick dry wood. Not treated lumber, not plastic, not wet cardboard. Short sticks. A small hot fire, not a bonfire." },
          { n: "04", title: "Pot on the chimney", body: "The flame should hit the pot. A pot that seals the chimney kills the draft. Stable ground. A tip spills boiling water on the only cook." },
          { n: "05", title: "Dead before dusk", body: "Smoke is a column. Cook late morning. Drown the coals. No glow after dark. Smell travels farther than you think." },
          { n: "06", title: "Three ways to light", body: "Matches in a tin, a lighter, a ferro rod. Practice once this week. A bow drill is a hobby. It is not the plan." },
        ],
      },
      {
        id: "power",
        tone: "tone-paper",
        light: false,
        kicker: "Build it",
        title: "A power budget.",
        dek: "Name the watt-hours before you buy the panel.",
        foot: "A panel is a mirror from above. Charge, then cover it.",
        steps: [
          { n: "01", title: "Write the load", body: "Watts × hours = watt-hours. A phone at 5 watts for 3 hours is 15 Wh. A laptop can eat 60 Wh in an afternoon. No number, no plan." },
          { n: "02", title: "Size the panel", body: "Watt-hours ÷ sun hours ÷ 0.7. Four decent hours and a 100 W panel is about 280 Wh after losses. Clouds cut that. Winter cuts it again." },
          { n: "03", title: "Size the battery", body: "Lead-acid: use half the rated amp-hours. 12 volts × 100 Ah × 0.5 is 600 Wh. Lithium iron phosphate: you can use most of the nameplate. Test it. Do not guess." },
          { n: "04", title: "Stay at 12 volts", body: "An inverter wastes a slice turning battery power into wall power. Charge phones from USB. Skip the inverter until something truly needs a plug." },
          { n: "05", title: "Hide the glint", body: "Charge at midday. Then cover the panel or bring it inside. A bright rectangle on a roof is a mark." },
          { n: "06", title: "Lights without it", body: "A lantern and spare cells still work when the charge controller dies. Power is a bonus. Water and fire are the plan." },
        ],
      },
      {
        id: "faraday",
        tone: "tone-ink",
        light: true,
        kicker: "Build it",
        title: "The dead box.",
        dek: "A metal can that actually stops a radio. Test it. Do not trust the lid.",
        foot: "If the test radio still plays, the seal is a lie.",
        steps: [
          { n: "01", title: "Continuous metal", body: "A steel trash can, an ammo can, or a biscuit tin. The lid must meet metal all the way around. Paint and a rubber gasket can insulate the lid. Scrape a contact, or bridge the gap with foil." },
          { n: "02", title: "Insulate inside", body: "Cardboard or cloth so the phone does not touch the metal. The shield is the box, not the gadget." },
          { n: "03", title: "Power down", body: "Off. Battery out if it comes out. A live phone is still a phone until the lid is actually sealed." },
          { n: "04", title: "No wire leaves", body: "A charging cable through the lid is an antenna. Nothing exits. Not headphones. Not a “thin” USB cord." },
          { n: "05", title: "Close and test", body: "Tune a battery radio to a strong station. Put it in. Close the lid. The station should drop to nothing. If you hear it, fix the lid and test again." },
          { n: "06", title: "Two boxes", body: "The sleep room gets the box that stays shut. Radios you might use live in a second box, opened far from the beds, briefly, then you leave." },
        ],
      },
      {
        id: "cache",
        tone: "tone-paper",
        light: false,
        kicker: "Build it",
        title: "Two caches.",
        dek: "If one is found, you still eat. Neither cache is your house.",
        foot: "On your land, or land you have permission to use. A buried bucket on someone else’s ground is a crime.",
        steps: [
          { n: "01", title: "Two sites", body: "Not your house, your car, or your mailbox. Far enough apart that one search does not find both." },
          { n: "02", title: "Dry and dull", body: "A gasketed bucket, or PVC with end caps, taped. Inside: calories, a copy of medicine, cash, a paper map, matches, spare socks. No phone." },
          { n: "03", title: "Nothing shiny", body: "Skip the crinkly mylar if you can. A zip bag inside the bucket is enough. Shine is how a shallow hole gets noticed." },
          { n: "04", title: "Memory, not a pin", body: "Three landmarks and a pace count. Do not write “dig here” in the notebook you carry every day." },
          { n: "05", title: "Split the secret", body: "One person knows site A. A different person knows site B. The whole group does not get both." },
          { n: "06", title: "Visit rarely", body: "Check after a hard rain, and on a date you will not forget. The same hour every Saturday is a pattern. A pattern is a meeting." },
        ],
      },
      {
        id: "waste",
        tone: "tone-paper",
        light: false,
        kicker: "Build it",
        title: "A waste plan.",
        dek: "Dirty hands empty a camp faster than a drone.",
        foot: "Keep human waste downhill of any water you drink. Thirty meters is a working distance.",
        steps: [
          { n: "01", title: "Downhill", body: "Waste does not go above the spring, the barrel, or the jug. If the ground slopes toward your water, you picked the wrong corner." },
          { n: "02", title: "A bucket", body: "A seat, a liner bag, and a scoop of sawdust, peat, or ash after every use. Lid on. Flies are how the next person gets sick." },
          { n: "03", title: "Do not burn plastic", body: "Bury the bag or pack it when you move. Burning plastic is a smell, a column, and a poison." },
          { n: "04", title: "Hands", body: "Soap, then a little clean water, every time, before food and after the bucket. This step saves more people than a hero kit." },
          { n: "05", title: "A sick corner", body: "Vomiting and diarrhea get their own bucket and their own cup. The well person does not share either." },
          { n: "06", title: "No trash pile", body: "Cans and wrappers are a menu and a map. Bury food scraps or carry them. Do not stack them by the door." },
        ],
      },
      {
        id: "med",
        tone: "tone-ink",
        light: true,
        kicker: "Build it",
        title: "Blood and burns.",
        dek: "Stop bleeding. Cool a burn. Do not become a surgeon on a page.",
        foot: "Take a Stop the Bleed class on an ordinary Tuesday. A diagram is not practice.",
        steps: [
          { n: "01", title: "The kit, now", body: "Gloves, roller gauze, a pressure bandage, tape, shears, soap, oral rehydration salts, your real prescriptions, and the doses written on paper." },
          { n: "02", title: "A real tourniquet", body: "Buy one. Practice it on yourself before anyone is bleeding. A belt you invent in the moment is a worse plan than the class." },
          { n: "03", title: "Pressure first", body: "Life-threatening bleeding: gloves, cloth into the wound, your weight on it. Do not peel the soaked cloth off to look. Add more cloth." },
          { n: "04", title: "Then the tourniquet", body: "If pressure fails and the bleed is on an arm or leg: high and tight, above the wound, not on a joint. Note the time. Then you are holding, not exploring." },
          { n: "05", title: "Burns", body: "Cool clean water for twenty minutes. No ice. No butter. No oil. Then a clean dry cover. A large burn needs a clinic if a clinic still exists." },
          { n: "06", title: "The stop line", body: "You do not cut. You do not “drain” a chest. You keep people warm, you keep them sipping clean rehydration fluid, and you move them toward help if help exists." },
        ],
      },
      {
        id: "denial",
        tone: "tone-hazard",
        light: false,
        kicker: "Not a trap",
        title: "Doors, not booby traps.",
        dek: "A device that fires, falls, or sticks when something arrives will hit a child before it hits a robot.",
        foot: "If a person can set it off by walking, it is a booby trap. Those are illegal because they do not check who showed up.",
        steps: [
          { n: "01", title: "The line", body: "No pits, spikes, wires in the dark, or anything that swings, drops, or burns when a switch is tripped. You will not be the one who walks into it." },
          { n: "02", title: "Shut the door", body: "A closed solid door is not a trap. Wedge it. Kill the auto-unlock. Most ground robots are bad at knobs, and a door does not care if the next thing in the hall is a neighbor." },
          { n: "03", title: "Use the stairs", body: "Open risers, a grate, a turn on the landing. Published legged robots climb face-up and are told to stay off those stairs. You are using the building. You are not hiding a hole." },
          { n: "04", title: "Visible clutter", body: "Chairs, a bicycle, a hose, in a hall you have marked for your own people. A mess you can see is an obstacle. A hidden wire is a trap. Do not string anything across a street." },
          { n: "05", title: "A noisy can", body: "Fishing line from a door you own to a can of pebbles. Tape on the frame so your people see it. It makes noise. It does not fire. Take it down when you leave." },
          { n: "06", title: "The wrong room", body: "A lamp on a timer in a shed you do not sleep in. They spend the battery on the wrong door. Unplug every dock. If something is actually at your door, you leave. You do not stay to watch." },
        ],
      },
      {
        id: "emp",
        tone: "tone-ink",
        light: true,
        kicker: "The pulse",
        title: "What an EMP actually hits.",
        dek: "The long wire is the target. A robot on its own battery is a small one.",
        foot: "Spare radios live in the dead box, unplugged. Radiating a pulse to burn electronics is a crime. This is not a schematic.",
        steps: [
          { n: "01", title: "Two different events", body: "A nuclear burst high over a continent can hit the grid. That is E1, fast, into long lines, then a slow tail that cooks big transformers. A grenade in a film is not this." },
          { n: "02", title: "The cord is the antenna", body: "Power lines, phone lines, and long aerials pick the pulse up. A phone that is off, battery out, inside the dead box, is a hard target. A robot with short battery leads is closer to the phone than to the substation." },
          { n: "03", title: "Unplug on a warning", body: "Pull plugs. Disconnect antennas. Radios off, batteries out, into the box. Do the drill on a normal Sunday. In the moment you will not invent it." },
          { n: "04", title: "What often lives", body: "Small battery gear that was already off. Diesel with no computer. A watch. Fiber instead of copper. Do not bet the escape on a modern car. Tests have stalled some vehicles. They did not turn every car into a brick, and yours is not a promise." },
          { n: "05", title: "What dies first", body: "Plugged-in computers, anything with a long cord, and the grid itself if the pulse was the real, national kind. That darkens a region. It does not hand you one dead robot in the stairwell." },
          { n: "06", title: "You will not build one", body: "The military version is a missile or a truck: CHAMP, or a high-power microwave vehicle. Range falls off fast. A coil and a capacitor from a forum mostly destroys itself. Weather, a door, and a dead battery still beat it." },
        ],
      },
      {
        id: "runners",
        tone: "tone-paper",
        light: false,
        kicker: "Build it",
        title: "Runners, not radios.",
        dek: "A spoken sentence does not light up a hill.",
        foot: "If you must transmit, do it far from the beds. Thirty seconds. Then leave.",
        steps: [
          { n: "01", title: "A paper roster", body: "Names, two rally points, two times. Do not put the sleep-site address on the same page as the names if you can split them." },
          { n: "02", title: "Two windows", body: "A morning window and a dusk window. Miss both, and you are late. The group does not search the roads for you." },
          { n: "03", title: "Feet", body: "A runner carries one sentence. They do not carry a radio, a phone, or the whole plan in their pocket." },
          { n: "04", title: "Plain words", body: "“Site two is bad.” Agree the words now. A clever code you forget is worse than English." },
          { n: "05", title: "A covered light", body: "One shaded blink, and only if you agreed what it means. A flashlight waved at the sky is a flare." },
          { n: "06", title: "Children", body: "They carry a name and a rally point they can say out loud. They do not carry the phone, the roster, or the job of being brave." },
        ],
      },
      {
        id: "tools",
        tone: "tone-volt",
        light: false,
        kicker: "Build it",
        title: "Black the glass.",
        dek: "Finish these while you can still see the work.",
        foot: "A sand filter makes water clearer. It does not make water safe. Boil or bleach after.",
        steps: [
          { n: "01", title: "Inside the pane", body: "Cardboard cut to the glass, dark cloth over it, taped on the inside. Tape on the outside tells the street that someone is hiding." },
          { n: "02", title: "One lamp", body: "Dim, low, aimed at the floor, in the room with no window. The hall stays black. A bright room is a coordinate." },
          { n: "03", title: "Cord you bought", body: "Paracord or bank line, already in the bag. Learning knots from a wet vine on night one is how packs get lost." },
          { n: "04", title: "A clearer jar", body: "Cloth, then sand, then crushed charcoal, into a clean jar. That stack only clears mud. You still boil for one minute, or you dose with bleach." },
          { n: "05", title: "A sharp edge", body: "One knife you already know how to hold. Sharpen it this week. A dull blade slips into the hand that is feeding you." },
          { n: "06", title: "Paper", body: "Map, doses, the roster, a pencil, this checklist. A zip bag. Do not laminate a mirror. Shine is a habit you can skip." },
        ],
      },
    ],

    pages: [
      "Cover",
      "The letter",
      "Contents",
      "Ten minutes",
      "Seventy-two hours",
      "Pattern",
      "Starve them",
      "Water",
      "Pantry",
      "Quiet heat",
      "Power",
      "Dead box",
      "Shelter",
      "Caches",
      "Waste",
      "Blood and burns",
      "Movement",
      "People",
      "Machines",
      "Field notes",
      "Ordnance",
      "Doors, not traps",
      "The pulse",
      "Runners",
      "Blackout",
      "Checklist",
    ],
};
