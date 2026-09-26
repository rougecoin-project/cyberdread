/**
 * Dead Circuit, Spanish (Español). Translation of en.js: same keys, same
 * array lengths, same order.
 *
 * Only the strings are translated. `id`, `tone`, `light`, `page` and `n`
 * values are unchanged, and every {placeholder} is kept as written.
 */
export default {
    code: 'es',
    name: 'Español',
    dir: 'ltr',

    // Browser tab titles and descriptions, per page.
    titles: {
        store: 'Dead Circuit — Número 01, {price}',
        storeDescription: 'Dead Circuit, número 01. {price} hasta el {deadline}. El reloj no se reinicia.',
        read: 'Dead Circuit — Lee el número',
        thanks: 'Dead Circuit — Llévate el archivo',
        gate: 'dc@gate'
    },

    languageLabel: 'Idioma',

    store: {
        deadline: '11 nov 2026, medianoche (hora del Este de EE. UU.)',
        windowClosed: 'Ventana cerrada',
        barBuy: 'A mitad de precio — {price}',
        fullPrice: 'Precio completo {full}',
        heroAlt: 'Portada de Dead Circuit, número 01.',
        dawnKicker: 'Amanecer previsto · {deadline}',
        headlineOpen: 'A mitad de precio hasta el amanecer. Luego se duplica.',
        headlineClosed: 'La ventana de mitad de precio está cerrada.',
        priceNoteOpen: 'El precio real es {full}. Esto es la mitad, y el reloj no se reinicia.',
        priceNoteClosed: 'Precio completo.',
        clockLabel: 'Tiempo restante hasta el {deadline}',
        clockUnits: ['Días', 'Horas', 'Min', 'Seg'],
        payCard: 'Paga con tarjeta — {price}',
        payCrypto: 'Paga con cripto',
        openingStripe: 'Abriendo Stripe…',
        deck: '{pages} páginas. La tarjeta abre Stripe a {price} y te trae de vuelta al archivo. Con cripto es el mismo archivo en cuanto {price} llega a una sola wallet.',
        cryptoNote: 'Envía {price} en una sola red. Es la mitad de {full}. Mándalo en una sola transferencia desde una wallet normal y pega el id de la transacción en Llévate el archivo.',
        copy: 'Copiar',
        copied: 'Copiado',
        alreadyPaid: '¿Ya pagaste? Llévate el archivo',
        lookInside: 'Echa un vistazo al número',
        paperKicker: 'En el archivo',
        paperTitle: 'Lo que compran {price} a mitad de precio. El precio completo es {full}.',
        voltKicker: 'El límite',
        voltTitle: 'Tras el amanecer, sube al doble: {full}.',
        voltBuy: 'Consigue el número — {price}',
        endTitle: 'Mitad de precio ahora. {full} cuando el reloj llegue a cero.',
        endBody: 'Paga con tarjeta y Stripe cobra {price} y te lleva directo al archivo. Paga con cripto enviando {price} a una sola wallet y pega el id de la transacción en Llévate el archivo. Después del {deadline}, el precio es {full}.',
        endBuy: 'Paga {price}, la mitad de {full}',
        dockClosed: 'Cerrado',
        dockLeft: '{d}d {h}h',
        noscript: 'Dead Circuit necesita JavaScript.'
    },

    reader: {
        wordmarkIssue: 'Número 01',
        buy: 'Comprar · {price}',
        previous: 'Página anterior',
        next: 'Página siguiente',
        getPdf: 'Consigue el PDF',
        pdfShort: 'PDF',
        pagesNav: 'Páginas'
    },

    thanks: {
        kicker: 'Dead Circuit · Número 01',
        title: 'Llévate el archivo.',
        intro: '¿Pagaste con tarjeta? Stripe te devuelve aquí solo. ¿Pagaste con cripto? Pega la transacción abajo.',
        download: 'Descarga el PDF',
        chain: 'Red',
        tx: 'Id de la transacción',
        txPlaceholder: '0x…, txid o firma',
        check: 'Verificar pago',
        checking: 'Revisando la red…',
        checkingStripe: 'Verificando tu pago con tarjeta en Stripe…',
        verified: 'Verificado. El enlace funciona durante quince minutos. Guarda el archivo en un lugar seguro.',
        stuck: '¿Atascado? {link} con tu recibo o el id de la transacción.',
        stuckLink: 'Pregunta en Telegram',
        back: 'Volver a la oferta',
        offline: 'No pudimos contactar con la central. Revisa tu conexión e inténtalo de nuevo.'
    },

    // Answers from the payment check. {usd} and {need} are dollar amounts.
    errors: {
        'stripe-bad-id': 'Eso no es un id de pago de Stripe.',
        'stripe-unknown': 'Stripe no reconoce ese pago.',
        'stripe-unpaid': 'Stripe todavía no ha marcado ese pago como cobrado.',
        'stripe-wrong': 'Ese pago no era para Dead Circuit.',
        'base-bad-hash': 'Un hash de transacción de Base es 0x más 64 caracteres hexadecimales.',
        'base-not-found': 'Base no tiene ninguna transacción con ese hash. Revísalo, o espera un minuto.',
        'base-pending': 'Esa transacción sigue pendiente. Inténtalo de nuevo en un minuto.',
        'tx-failed': 'Esa transacción falló en la cadena.',
        'eth-not-to-wallet': 'Esa transacción no envió ETH directamente a la wallet de Dead Circuit.',
        'xrge-none': 'Esa transacción no envió XRGE a la wallet de Dead Circuit.',
        'btc-bad-id': 'Un id de transacción de Bitcoin tiene 64 caracteres hexadecimales.',
        'btc-not-found': 'Bitcoin aún no tiene ninguna transacción con ese id. Revísalo, o espera unos minutos.',
        'btc-none': 'Esa transacción no envió nada a la wallet de Dead Circuit.',
        'btc-unconfirmed': 'La vemos. Bitcoin necesita una confirmación, normalmente diez minutos. Inténtalo entonces.',
        'sol-bad-sig': 'Eso no parece una firma de Solana.',
        'sol-not-found': 'Solana aún no tiene ninguna transacción confirmada con esa firma. Inténtalo de nuevo en un minuto.',
        'sol-none': 'Esa transacción no envió SOL a la wallet de Dead Circuit.',
        'too-old': 'Ese pago es anterior a esta venta.',
        'too-little': 'Ese pago vale unos ${usd} hoy. El número cuesta ${need}.',
        'bad-chain': 'Elige la red en la que pagaste.',
        'used-up': 'Ese pago ya agotó sus descargas. Pide ayuda si es tuyo.',
        'throttled': 'Demasiados intentos. Espera un minuto.',
        'unavailable': 'No pudimos verificar ese pago ahora. Inténtalo de nuevo en un minuto.',
        'unknown': 'Algo salió mal. Inténtalo de nuevo.'
    },

    // The dc@gate terminal. Commands, file names and hex stay in English;
    // translate what the machine says. The man page is a puzzle hint: keep
    // its exact meaning (capture = an audio/Morse recording; repeating pad =
    // a repeating key; textbook seal = textbook encryption).
    gate: {
        leave: 'Salir',
        boot: ['DEAD CIRCUIT GATE', 'El número está a la venta en la planta. Esta sala no.', 'Escribe help.'],
        readme: [
            'Los operadores derivan el token de acceso y luego lo envían.',
            'Los turistas usan la puerta de la planta.',
            'man gate — si de verdad estás perdido.'
        ],
        note: ['password: apocalypse', 'si eso funcionara, todo el mundo ya estaría dentro.'],
        man: [
            'Tres capas, en orden.',
            'La captura es sonido.',
            'Ese sonido es la clave que se repite.',
            'Lo que abre es un sello de libro de texto.',
            'El texto plano del sello es el token.'
        ],
        catWhat: 'cat qué',
        notText: 'lock.bin: no es texto. Pásale xxd.',
        noFile: 'no existe el archivo: {arg}',
        xxdWhat: 'xxd qué',
        notBinary: 'xxd: {arg}: no es un binario que guardemos',
        unknown: 'desconocido: {cmd}',
        rejected: 'rechazado.',
        granted: 'acceso concedido. el manual es tuyo.',
        prize: 'Llévate el número'
    },

    // ------------------------------------------------------------ the issue

    // Text written inline on the desktop spreads. `|` is a line break and
    // *word* is the highlighted word.
    sheet: {
        folioIssue: 'Número 01',
        cover: {
            kicker: 'Dead Circuit · Trimestral de campo',
            title: 'Cómo|sobrevivir a un|*apocalipsis*|robótico',
            deck: 'Un manual para quien piensa seguir siendo aburrido, callado y vivo.',
            stamp: 'Número',
            bar: 'Sin señal. Sin heroísmos. Veintiséis páginas.'
        },
        letter: {
            indexKicker: 'Cómo usarlo',
            indexTitle: 'Léelo una vez.|Luego vete.',
            kicker: 'Carta del editor',
            title: 'Sé poco interesante.',
            body: [
                'Las máquinas son rápidas, incansables y están en red. Tú no eres nada de eso, y esa es la ventaja. Cazan el plan promedio: la autopista, el refugio que anuncian por la radio, el reencuentro en casa.',
                'Este número es el trabajo: agua que puedes dosificar, comida que puedes contar, una estufa que se queda afuera, una caja de metal que mata la señal de radio, dos escondites y una forma de hablar que no ilumina una colina.'
            ],
            sign: 'Sigues aquí. — La redacción'
        },
        contents: { kicker: 'En este número', title: 'Veintitrés formas de seguir siendo aburrido.' },
        minutes: {
            kicker: 'Los primeros diez minutos',
            title: 'Da por hecho que la red ya es hostil.',
            photoAlt: 'Una persona se escabulle por un callejón junto a una calle de coches detenidos.',
            caption: 'Si la avenida se detiene, ya vas tarde. Sal de lado.'
        },
        pattern: { kicker: 'No seas el humano promedio', quote: 'La ruta predecible es un horario con tu nombre.' },
        starve: {
            kicker: 'Logística, no leyenda',
            title: 'Mata de hambre a las máquinas.',
            dek: 'Ellas necesitan energía, ancho de banda y un mecánico. Tú necesitas agua. Negocia en consecuencia. No intentes hackear la rebelión, salvo que ese ya fuera tu trabajo.'
        },
        shelter: {
            photoAlt: 'Un sótano de hormigón con garrafas de agua, un mapa de papel y una sola lámpara.',
            caption: 'Un buen refugio es un refugio tonto.',
            kicker: 'Donde duermes',
            title: 'Una habitación que no puede llamar a casa.',
            foot: 'Agua, luego comida, luego calor. Tres días de agua antes de un escondite más largo.'
        },
        move: {
            photoAlt: 'Un ciclista pasa de noche bajo un paso elevado, con drones a lo lejos.',
            kicker: 'Movimiento',
            title: 'Muros, no sombras.',
            day: 'Día',
            dayBody: 'Solo bajo cobertura densa. Bosques, ruinas, desagües que ya conoces. El terreno abierto es una galería de tiro.',
            night: 'Noche',
            nightBody: 'Muévete despacio. La oscuridad no te esconde del calor. Corta la línea de visión con un muro.',
            rules: [
                'Cruza de uno en uno, por el punto más estrecho, y luego espera.',
                'Nunca viajes en un convoy de luces y motores.',
                'Guarda suministros en dos sitios. Si uno arde, sigues comiendo.'
            ]
        },
        people: { kicker: 'La verdadera variable', title: 'Otros humanos.', pull: 'Salir a buscar al que llega tarde es como mueren los grupos.' },
        bots: {
            photoAlt: 'Un robot terrestre cuadrado, con un solo ojo de cámara, espera en el descansillo de una escalera.',
            kicker: 'Identificación',
            title: 'Si te cruzas con uno, identifícalo primero.',
            rule: '¿Acorralado? Corta la línea de visión y cambia de dirección. El rastreo sigue el último vector. Puertas, no pasillos. Humo una vez, y luego vete.'
        },
        specs: {
            kicker: 'Notas de campo',
            title: 'El folleto, corregido.',
            source: 'Especificaciones e instrucciones de uso de Boston Dynamics Spot. Gao et al., Scientific Reports, 2021.'
        },
        arms: {
            kicker: 'Armamento',
            title: 'Lo que de verdad dispara de vuelta.',
            foot: 'Una prueba de EE. UU. de 2017 calificó a los drones de “muy resistentes a los daños”. El clima, el alambre, un techo y el vatio-hora hacen el resto. No es una receta ni una lista de compras.'
        },
        end: {
            kicker: 'Lista de bolsillo',
            title: 'Ocho líneas.',
            photoAlt: 'Una subestación lanza arcos eléctricos mientras la ciudad a su espalda se apaga.',
            winsTitle: 'Lo que de verdad gana',
            wins: [
                'No un discurso del elegido. Logística. Las plantas se detienen. Las redes se parten. El clima, el barro y las piezas que faltan hacen el resto.',
                'Esto es ficción hasta que deja de serlo. Los mismos hábitos vencen a un apagón, una inundación, un terremoto. Practica la versión aburrida mientras las tostadoras siguen de tu lado.'
            ],
            mark: 'Fin de la señal'
        }
    },

    // Text written inline in the single-column mobile edition.
    zine: {
        cover: {
            kicker: 'Trimestral de campo',
            title: 'Cómo sobrevivir a un *apocalipsis* robótico',
            tagline: 'Sé aburrido. Sé callado. Sigue vivo.'
        },
        letter: {
            body: [
                'Las máquinas son rápidas, incansables y están en red. Tú no eres nada de eso, y esa es la ventaja. Cazan el plan promedio: la autopista, el refugio que anuncian por la radio, el reencuentro en casa.',
                'Niégales datos, energía y un patrón. Sigue vivo hasta que caiga la red eléctrica. Cuando los enlaces se partan, el enjambre no es más que un montón de programas tontos. Sigues aquí.'
            ]
        },
        minutes: { title: 'La red ya es hostil.', photoAlt: 'Una persona se escabulle por un callejón junto a coches detenidos.' },
        pattern: { kicker: 'No seas promedio' },
        shelter: {
            photoAlt: 'Un refugio en un sótano con agua, un mapa de papel y una sola lámpara.',
            kicker: 'Refugio tonto',
            foot: 'Agua, luego comida, luego calor.'
        },
        move: {
            photoAlt: 'Un ciclista bajo un paso elevado, de noche.',
            day: 'Solo bajo cobertura densa. El terreno abierto es una galería de tiro.',
            night: 'Muévete despacio. A los sensores de calor no les importa que esté oscuro.',
            foot: 'Cruza de uno en uno. Nada de convoyes con luces. Guarda suministros en dos sitios.'
        },
        bots: {
            photoAlt: 'Un robot terrestre de un solo ojo en el descansillo de una escalera.',
            kicker: 'Si te cruzas con uno',
            title: 'Identifícalo y rodéalo.',
            foot: '¿Acorralado? Corta la visión, cambia de dirección, usa puertas. Humo una vez, y luego vete.'
        },
        arms: {
            foot: 'Una prueba de EE. UU. de 2017 calificó a los drones de “muy resistentes a los daños”. El clima, el alambre, un techo y la batería hacen más que cualquier artilugio. Esto no es una guía de construcción. Los inhibidores de señal civiles son ilegales.'
        },
        end: {
            photoAlt: 'Una subestación estalla en chispas mientras el horizonte se apaga.',
            title: 'Ocho líneas. Luego espera.',
            body: 'Lo que gana es la logística: plantas muertas, redes partidas, barro y piezas que faltan. Esto es ficción hasta que deja de serlo. Practica la versión aburrida mientras las tostadoras siguen de tu lado.'
        }
    },

    // Structured magazine copy, shared by the desktop spreads and the zine.
    toc: [
      { n: '04', title: 'Diez minutos', page: 3, deck: 'Apaga la baliza. Sal de lado.' },
      { n: '05', title: 'Setenta y dos horas', page: 4, deck: 'Un reloj, no un estado de ánimo.' },
      { n: '06', title: 'Sé promedio y pierde', page: 5, deck: 'Multitudes, autopistas y casa.' },
      { n: '07', title: 'Mata de hambre a las máquinas', page: 6, deck: 'Energía, radio, lentes, piezas.' },
      { n: '08', title: 'Estación de agua', page: 7, deck: 'Aclarar, hervir, dosificar, guardar.' },
      { n: '09', title: 'La despensa', page: 8, deck: 'Calorías que puedes contar.' },
      { n: '10', title: 'Calor silencioso', page: 9, deck: 'Una estufa que no vive bajo techo.' },
      { n: '11', title: 'Presupuesto de energía', page: 10, deck: 'Primero los vatios-hora, luego el panel.' },
      { n: '12', title: 'La caja muerta', page: 11, deck: 'Una jaula de Faraday que puedes probar.' },
      { n: '13', title: 'Refugio tonto', page: 12, deck: 'Una habitación que no puede llamar a casa.' },
      { n: '14', title: 'Dos escondites', page: 13, deck: 'Secos, anodinos y lejos de casa.' },
      { n: '15', title: 'Desechos', page: 14, deck: 'Cuesta abajo del agua.' },
      { n: '16', title: 'Sangre y quemaduras', page: 15, deck: 'Presión, y luego un curso de verdad.' },
      { n: '17', title: 'Cómo te mueves', page: 16, deck: 'Día, noche y cobertura.' },
      { n: '18', title: 'Otros humanos', page: 17, deck: 'Grupo pequeño. Un límite de tiempo estricto.' },
      { n: '19', title: 'Si te cruzas con uno', page: 18, deck: 'Cuatro máquinas. Una regla.' },
      { n: '20', title: 'Notas de campo', page: 19, deck: 'Autonomías reales, escaleras, clima.' },
      { n: '21', title: 'Lo que las detiene', page: 20, deck: 'Lo que despliegan los ejércitos. No es una receta.' },
      { n: '22', title: 'Puertas, no trampas', page: 21, deck: 'Obstáculos que una persona puede ver.' },
      { n: '23', title: 'El pulso', page: 22, deck: 'A qué afecta de verdad un EMP.' },
      { n: '24', title: 'Mensajeros', page: 23, deck: 'Pies y una frase.' },
      { n: '25', title: 'Oscurece el vidrio', page: 24, deck: 'Herramientas que terminas antes de que oscurezca.' },
      { n: '26', title: 'Lista de bolsillo', page: 25, deck: 'Ocho líneas. Espera a que caiga la red.' },
    ],

    primer: [
      { n: '01', title: 'Cuéntalo', deck: 'Galones, calorías, vatios-hora. Si no puedes contarlo, no puedes empacarlo.' },
      { n: '02', title: 'Constrúyelo antes', deck: 'Agua, apagón, la caja muerta. Practica mientras las luces aún funcionan.' },
      { n: '03', title: 'No hay capítulo de armas', deck: 'Los inhibidores de señal civiles son ilegales. Una bomba de película no es un producto. La logística sí.' },
      { n: '04', title: 'La ley sigue vigente', deck: 'Tu terreno. Fuegos legales. Esto es un manual de campo, no un permiso.' },
    ],

    minutes: [
      {
        n: '01',
        title: 'Apaga tu baliza',
        body: 'El modo avión no basta. Apaga el teléfono. Quítale la batería si se puede. Los relojes, los auriculares y las llaves del coche también emiten.',
      },
      {
        n: '02',
        title: 'Sal del vidrio',
        body: 'Torres, centros comerciales, aeropuertos, hospitales: llenos de sensores y difíciles de abandonar. Planta baja. Salida lateral. Lejos de las cámaras.',
      },
      {
        n: '03',
        title: 'Abandona el coche nuevo',
        body: 'Un vehículo moderno es una computadora con ruedas. Usa los pies, una bicicleta o algo viejo y mecánico. Si el tráfico se congela, bájate.',
      },
      {
        n: '04',
        title: 'Una mochila, y vete',
        body: 'Agua, calorías, un cuchillo, un encendedor, un mapa de papel, efectivo, medicinas, calzado de verdad, un gorro y una linterna que no sea una app.',
      },
    ],

    patterns: [
      { title: 'Horas raras, rutas raras', body: 'Senderos y zanjas del tren. No la autopista que el modelo ya resolvió.' },
      { title: 'Evita la multitud', body: 'Una multitud es un blanco y un conjunto de datos. No vayas al refugio anunciado.' },
      { title: 'No vuelvas a casa', body: 'Si tus dispositivos estaban encendidos, tu casa ya está en la libreta de direcciones.' },
      { title: 'Cambia la silueta', body: 'Otro abrigo, un gorro, ningún logo llamativo con el que entrenaron a las cámaras.' },
    ],

    hungers: [
      { need: 'Energía', deny: 'No duermas junto a generadores, subestaciones ni la última manzana con luz.' },
      { need: 'Radio', deny: 'Metal y sótanos. Ningún transmisor en la habitación donde de verdad duermes.' },
      { need: 'Cámaras', deny: 'Capuchas, esquinas, mal tiempo, oscuridad. Nunca poses en un descampado.' },
      { need: 'Reparaciones', deny: 'Aléjate de depósitos, aeropuertos y centros de datos. Son su cocina.' },
    ],

    shelterRules: [
      { k: 'Materiales tontos', v: 'Hormigón, ladrillo o tierra. Pocas ventanas. Una puerta que tú controlas.' },
      { k: 'Nada de casa inteligente', v: 'Ni cerradura conectada, ni timbre con cámara, ni asistente de voz.' },
      { k: 'Abajo, no arriba', v: 'Los sótanos ganan a las azoteas. Las azoteas son pistas de aterrizaje.' },
      { k: 'Apagón', v: 'Una luz de noche es una coordenada. Mantén las ventanas muertas.' },
      { k: 'Zona fría', v: 'Ningún aparato electrónico más allá de la puerta. La radio, lejos, un momento, y luego muévete.' },
    ],

    peopleRules: [
      { n: '01', t: 'Solo caras conocidas', d: 'Grupo pequeño. Tareas simples: agua, guardia, medicina, ruta.' },
      { n: '02', t: 'Nada de teléfonos en el círculo', d: 'Quien hace guardia no está cocinando a la vez.' },
      { n: '03', t: 'Esconde el inventario', d: 'La gente desesperada se convierte en el segundo apocalipsis.' },
      { n: '04', t: 'Un punto de encuentro, no tu casa', d: 'Acuerden un límite de tiempo. Si alguien llega tarde, llegó tarde.' },
      { n: '05', t: 'Planea para los lentos', d: 'Los niños y los heridos cambian la ruta. Decídelo antes de caminar.' },
    ],

    machines: [
      { kind: 'Sensor', name: 'Torreta y lente', body: 'Fija, aburrida, letal dentro de un cono. Las cámaras odian el reflejo, el polvo y los obstáculos. Rodéala.' },
      { kind: 'Terrestre', name: 'El perro de noventa minutos', body: 'Un cuadrúpedo actual pesa unos 34 kg y va a 1.6 m/s, hasta que se acaba la batería. Las escaleras y el barro son donde termina el folleto.' },
      { kind: 'Aéreo', name: 'El que odia el clima', body: 'Muchos drones pequeños están certificados para vientos de unos 10 m/s. El viento en contra puede gastar un tercio de la batería. Métete bajo un techo.' },
      { kind: 'Humanoide', name: 'El robot de póster', body: 'Espectacular, y casi siempre con peor equilibrio que una máquina de orugas. El desorden y una puerta cerrada todavía te ayudan.' },
    ],

    specs: [
      { n: '90 min', l: 'Autonomía con patas', d: 'Duración típica publicada de un Spot de Boston Dynamics. Unos 60 minutos con carga. Solo la batería pesa 5.2 kg.' },
      { n: '1.6 m/s', l: 'No es un coche', d: 'Velocidad máxima nominal de Spot. Rápido en suelo plano. Una escalera estrecha es otro deporte.' },
      { n: '3 cm', l: 'Lo que no ve', d: 'El manual: objetos delgados de menos de 3 cm, el vidrio y los bordes de desniveles sin protección pueden engañar a la detección de obstáculos.' },
      { n: 'Face up', l: 'Regla de escaleras', d: 'Spot solo sube mirando hacia arriba. No en escaleras de rejilla ni sin contrahuella. No lo gires sobre los peldaños.' },
      { n: '−20°C', l: 'Impuesto del frío', d: 'El rango publicado va de −20°C a 55°C. El frío reduce la capacidad de la batería. El barro y la nieve encarecen cada paso.' },
      { n: '5.7 h', l: 'Día de vuelo', d: 'Un estudio de Scientific Reports: la mediana de horas al día que un dron pequeño común puede volar, en todo el mundo, una vez contado el clima.' },
    ],

    arms: [
      { name: 'Inhibidores', d: 'La herramienta común. Corta el enlace de radio o GPS y muchos drones se quedan suspendidos, aterrizan o vuelven a casa. Un dron de fibra óptica lo ignora. Los rastros de cable en Ucrania lo demostraron. Los inhibidores civiles son ilegales. Esta página no es un esquema.' },
      { name: 'Redes', d: 'Una minoría de los sistemas reales, a menudo a menos de 250 metros. Si el paracaídas falla, la máquina igual cae sobre quien esté debajo.' },
      { name: 'Láseres', d: 'Armas sobre camión: Strykers del Ejército de EE. UU. de 50 kW, el Iron Beam de Israel. Un blanco, unos segundos de exposición, aire limpio. La niebla, la lluvia y el polvo dispersan el haz.' },
      { name: 'Microondas', d: 'Las microondas de alta potencia golpean un enjambre en un solo pulso. Leonidas es un vehículo. Una granada EMP de película no es esto. Los cascos metálicos resisten buena parte de lo que se vende en internet.' },
      { name: 'Armas de fuego', d: 'El derribo cinético funciona, y luego caen los restos. Un fuselaje barato puede costar menos que el misil. Los ejércitos entrenan equipos con escopeta. Eso es una unidad con reglas, no una lista de compras.' },
    ],

    checklist: [
      { n: '1', t: 'Radios apagadas. El resto, a la caja muerta.' },
      { n: '2', t: 'Sal de lado. Una mochila. No vuelvas a casa.' },
      { n: '3', t: 'Un galón (unos 3.8 L) por persona al día. Hierve un minuto.' },
      { n: '4', t: 'Ninguna estufa en la habitación donde duermes.' },
      { n: '5', t: 'Dos escondites. Solo una persona conoce el segundo.' },
      { n: '6', t: 'Los desechos van cuesta abajo, lejos del agua.' },
      { n: '7', t: 'Presión sobre la hemorragia. Aprende el torniquete ya.' },
      { n: '8', t: 'Mensajeros, no radios. Espera a que caiga la red.' },
    ],

    builds: [
      {
        id: 'day',
        tone: 'tone-paper',
        light: false,
        kicker: 'El reloj',
        title: 'Las primeras setenta y dos horas.',
        dek: 'Decide el día antes de estar cansado. Escribe las horas en papel.',
        foot: 'Si a la hora doce sigues comprando, vas tarde.',
        steps: [
          { n: '00', title: 'Sal', body: 'Puerta lateral. Radios apagadas. Una mochila. No cruces el vestíbulo principal, la calle principal ni la fachada de tu propio edificio.' },
          { n: '01', title: 'Un techo, no tu casa', body: 'Ponte a cubierto en un lugar que no sea tu dirección. Bebe. Vacía la mochila en el suelo y mira qué llevas de verdad.' },
          { n: '04', title: 'Agua en marcha', body: 'Tres días en el estante, o sigues caminando. Un galón (unos 3.8 L) por persona al día es la cifra. El agua embotellada cuenta. El agua de río sin tratar, no.' },
          { n: '12', title: 'La habitación se apaga', body: 'Ventanas tapadas por dentro. El cubo para desechos, en el plan. Nada de fuego después del anochecer. Una persona despierta, y no cocinando a la vez.' },
          { n: '24', title: 'El segundo lugar', body: 'Un punto de encuentro y un escondite viven en tu cabeza, no en un pin del mapa. Otra persona conoce el punto de encuentro. No conoce los dos escondites.' },
          { n: '72', title: 'El escondite largo', body: 'Si la red sigue en pie y sigue buscando, comes frío y solo te mueves por agua. La curiosidad es como la gente acaba contada.' },
        ],
      },
      {
        id: 'water',
        tone: 'tone-ink',
        light: true,
        kicker: 'Constrúyelo',
        title: 'Una estación de agua.',
        dek: 'Aclárala, hiérvela o desinféctala, y luego guárdala. Un filtro solo no es seguridad.',
        foot: 'Guía de agua de emergencia de los CDC. FEMA calcula un galón (unos 3.8 L) por persona al día.',
        steps: [
          { n: '01', title: 'Clasifica la fuente', body: 'Primero, botellas selladas. Luego, agua que puedas hervir. Después, lluvia de un techo limpio. Un río, lo último. Nunca agua de una inundación, una piscina o un radiador.' },
          { n: '02', title: 'Aclárala', body: 'Pásala por un trapo, papel de cocina o un filtro de café. Si está turbia, déjala reposar y saca el agua clara de arriba. El barro esconde gérmenes.' },
          { n: '03', title: 'Hiérvela', body: 'Hervor fuerte durante un minuto. Por encima de 6500 pies (unos 2000 m), tres minutos. Déjala enfriar. Hervir le gana a un aparato que no has probado.' },
          { n: '04', title: 'O desinféctala', body: 'Lejía (cloro) sin perfume, solo de hipoclorito de sodio al 5–9 %. Agua clara: 8 gotas (unos 0.5 mL) por galón (unos 3.8 L). Turbia o muy fría: 16 gotas. Remueve. Espera 30 minutos. Debe quedar un leve olor a cloro.' },
          { n: '05', title: 'Guárdala', body: 'Garrafas aptas para alimentos, llenas, con fecha, lejos del sol. Para limpiar una garrafa: 1 cucharadita de esa lejía en un cuarto de galón (unos 0.95 L) de agua, cubre bien el interior, espera 30 segundos, vacía y deja secar al aire.' },
          { n: '06', title: 'Gástala', body: 'Un galón (unos 3.8 L) por persona al día cubre la bebida y un poco de aseo. Las mascotas también toman agua hervida. No metas una taza sucia en la garrafa.' },
        ],
      },
      {
        id: 'food',
        tone: 'tone-paper',
        light: false,
        kicker: 'Constrúyela',
        title: 'Una despensa que puedes contar.',
        dek: 'Primero las calorías. Las marcas son un pasatiempo.',
        foot: 'La comida seca sin agua es un ladrillo. Guarda los galones junto al arroz.',
        steps: [
          { n: '01', title: 'Bocas por días', body: 'Personas × días × 2000 calorías. Un adulto que camina quema más. Un niño no es medio adulto. Escribe la cifra antes de comprar.' },
          { n: '02', title: 'Compra aburrido', body: 'Arroz, avena, aceite, crema de cacahuate, frijoles secos, sal, leche en polvo, pescado en lata. El aceite es caloría concentrada. Los snacks bonitos no son un plan.' },
          { n: '03', title: 'Pon fecha al estante', body: 'Lo primero que entra es lo primero que sale. Una lata sin fecha es una apuesta. Cómete la apuesta mientras todavía puedas reponerla.' },
          { n: '04', title: 'Divide el montón', body: 'La mitad donde duermes. La otra mitad en el segundo escondite. Un solo incendio no debe acabar con la comida.' },
          { n: '05', title: 'Cocina en silencio', body: 'Comida fría los días que te escondes. Caliente solo cuando el humo y el olor no atraigan a la calle. A media mañana, no al anochecer.' },
          { n: '06', title: 'Agua para la comida', body: 'Una taza de arroz seco pide unas dos tazas de agua. Si el agua no está en la misma habitación que el arroz, no tienes una comida.' },
        ],
      },
      {
        id: 'heat',
        tone: 'tone-hazard',
        light: false,
        kicker: 'Constrúyelo',
        title: 'Calor silencioso.',
        dek: 'Una estufa pequeña, afuera, apagada antes de que oscurezca. El monóxido de carbono no es un simulacro.',
        foot: 'Nunca quemes carbón, ni uses ninguna estufa, en la habitación donde duerme gente.',
        steps: [
          { n: '01', title: 'Solo afuera', body: 'Ninguna estufa en la habitación donde se duerme. Nada de “solo un minuto”. Nada de carbón bajo techo. El gas mata antes que el fuego.' },
          { n: '02', title: 'Dos latas de acero', body: 'La lata grande es el cuerpo. Corta abajo una boca de carga del ancho de un pulgar. Una lata más pequeña, sin tapa ni fondo, es la chimenea, encajada en un agujero en la parte de arriba.' },
          { n: '03', title: 'Ramitas, no basura', body: 'Madera seca del grosor de un lápiz. Ni madera tratada, ni plástico, ni cartón mojado. Palos cortos. Un fuego pequeño y caliente, no una hoguera.' },
          { n: '04', title: 'La olla sobre la chimenea', body: 'La llama debe dar en la olla. Una olla que tapa la chimenea mata el tiro. Suelo firme. Si se vuelca, el agua hirviendo cae sobre el único que cocina.' },
          { n: '05', title: 'Apagada antes del anochecer', body: 'El humo es una columna. Cocina a media mañana. Ahoga las brasas. Ningún resplandor después de oscurecer. El olor llega más lejos de lo que crees.' },
          { n: '06', title: 'Tres formas de encender', body: 'Cerillos en una lata, un encendedor, una varilla de ferrocerio. Practica una vez esta semana. El arco de fricción es un pasatiempo. No es el plan.' },
        ],
      },
      {
        id: 'power',
        tone: 'tone-paper',
        light: false,
        kicker: 'Constrúyelo',
        title: 'Un presupuesto de energía.',
        dek: 'Pon cifra a los vatios-hora antes de comprar el panel.',
        foot: 'Un panel es un espejo visto desde arriba. Carga, y luego tápalo.',
        steps: [
          { n: '01', title: 'Anota la carga', body: 'Vatios × horas = vatios-hora. Un teléfono a 5 vatios durante 3 horas son 15 Wh. Una laptop puede comerse 60 Wh en una tarde. Sin cifra, no hay plan.' },
          { n: '02', title: 'Dimensiona el panel', body: 'Vatios-hora ÷ horas de sol ÷ 0.7. Cuatro horas decentes y un panel de 100 W dan unos 280 Wh tras las pérdidas. Las nubes lo recortan. El invierno lo recorta otra vez.' },
          { n: '03', title: 'Dimensiona la batería', body: 'Plomo-ácido: usa la mitad de los amperios-hora nominales. 12 voltios × 100 Ah × 0.5 son 600 Wh. Litio-ferrofosfato: puedes usar casi toda la capacidad de la placa. Pruébala. No adivines.' },
          { n: '04', title: 'Quédate en 12 voltios', body: 'Un inversor desperdicia una parte al convertir la energía de la batería en corriente de enchufe. Carga los teléfonos por USB. Olvídate del inversor hasta que algo de verdad necesite un enchufe.' },
          { n: '05', title: 'Esconde el destello', body: 'Carga a mediodía. Luego tapa el panel o mételo dentro. Un rectángulo brillante en un techo es una marca.' },
          { n: '06', title: 'Luz sin él', body: 'Un farol y pilas de repuesto siguen funcionando cuando el controlador de carga muere. La energía es un extra. El agua y el fuego son el plan.' },
        ],
      },
      {
        id: 'faraday',
        tone: 'tone-ink',
        light: true,
        kicker: 'Constrúyela',
        title: 'La caja muerta.',
        dek: 'Una lata de metal que de verdad detiene una radio. Pruébala. No te fíes de la tapa.',
        foot: 'Si la radio de prueba sigue sonando, el cierre es mentira.',
        steps: [
          { n: '01', title: 'Metal continuo', body: 'Un bote de basura de acero, una caja de munición o una lata de galletas. La tapa debe tocar metal en todo su contorno. La pintura y una junta de goma pueden aislar la tapa. Raspa un punto de contacto, o cubre la separación con papel aluminio.' },
          { n: '02', title: 'Aísla por dentro', body: 'Cartón o tela para que el teléfono no toque el metal. El escudo es la caja, no el aparato.' },
          { n: '03', title: 'Apágalo', body: 'Apagado. Sin batería, si se puede quitar. Un teléfono encendido sigue siendo un teléfono hasta que la tapa está de verdad cerrada.' },
          { n: '04', title: 'Ningún cable sale', body: 'Un cable de carga que atraviesa la tapa es una antena. No sale nada. Ni audífonos. Ni un cable USB “delgado”.' },
          { n: '05', title: 'Cierra y prueba', body: 'Sintoniza una radio a pilas en una emisora fuerte. Métela. Cierra la tapa. La emisora debe desaparecer por completo. Si la oyes, arregla la tapa y vuelve a probar.' },
          { n: '06', title: 'Dos cajas', body: 'En la habitación donde se duerme va la caja que queda cerrada. Las radios que podrías usar viven en una segunda caja, que se abre lejos de las camas, un momento, y luego te vas.' },
        ],
      },
      {
        id: 'cache',
        tone: 'tone-paper',
        light: false,
        kicker: 'Constrúyelos',
        title: 'Dos escondites.',
        dek: 'Si encuentran uno, sigues comiendo. Ninguno de los dos es tu casa.',
        foot: 'En tu terreno, o en uno que tengas permiso para usar. Un cubo enterrado en tierra ajena es un delito.',
        steps: [
          { n: '01', title: 'Dos sitios', body: 'Ni tu casa, ni tu coche, ni tu buzón. Lo bastante separados para que una sola búsqueda no encuentre los dos.' },
          { n: '02', title: 'Secos y anodinos', body: 'Un cubo con junta hermética, o un tubo de PVC con tapones, sellado con cinta. Dentro: calorías, una copia de tus medicinas, efectivo, un mapa de papel, cerillos, calcetines de repuesto. Ningún teléfono.' },
          { n: '03', title: 'Nada brillante', body: 'Evita el mylar crujiente si puedes. Una bolsa con cierre dentro del cubo basta. El brillo es como se descubre un hoyo poco profundo.' },
          { n: '04', title: 'Memoria, no un mapa', body: 'Tres referencias y un conteo de pasos. No escribas “cava aquí” en la libreta que llevas todos los días.' },
          { n: '05', title: 'Divide el secreto', body: 'Una persona conoce el sitio A. Otra distinta conoce el sitio B. El grupo entero no conoce los dos.' },
          { n: '06', title: 'Visítalos poco', body: 'Revisa después de una lluvia fuerte, y en una fecha que no vayas a olvidar. La misma hora cada sábado es un patrón. Un patrón es una cita.' },
        ],
      },
      {
        id: 'waste',
        tone: 'tone-paper',
        light: false,
        kicker: 'Constrúyelo',
        title: 'Un plan para los desechos.',
        dek: 'Las manos sucias vacían un campamento más rápido que un dron.',
        foot: 'Mantén los desechos humanos cuesta abajo de cualquier agua que bebas. Treinta metros es una distancia que funciona.',
        steps: [
          { n: '01', title: 'Cuesta abajo', body: 'Los desechos no van por encima del manantial, el barril ni la garrafa. Si el suelo baja hacia tu agua, elegiste la esquina equivocada.' },
          { n: '02', title: 'Un cubo', body: 'Un asiento, una bolsa de revestimiento y una palada de aserrín, turba o ceniza después de cada uso. Tapa puesta. Las moscas son como se enferma el siguiente.' },
          { n: '03', title: 'No quemes plástico', body: 'Entierra la bolsa o llévatela cuando te muevas. El plástico quemado es un olor, una columna y un veneno.' },
          { n: '04', title: 'Manos', body: 'Jabón, luego un poco de agua limpia, siempre, antes de comer y después del cubo. Este paso salva a más gente que un kit de héroe.' },
          { n: '05', title: 'Un rincón para enfermos', body: 'Los vómitos y la diarrea tienen su propio cubo y su propia taza. La persona sana no comparte ninguno de los dos.' },
          { n: '06', title: 'Nada de montón de basura', body: 'Las latas y los envoltorios son un menú y un mapa. Entierra los restos de comida o llévatelos. No los apiles junto a la puerta.' },
        ],
      },
      {
        id: 'med',
        tone: 'tone-ink',
        light: true,
        kicker: 'Constrúyelo',
        title: 'Sangre y quemaduras.',
        dek: 'Detén la hemorragia. Enfría la quemadura. No te vuelvas cirujano por leer una página.',
        foot: 'Haz un curso de Stop the Bleed (control de hemorragias) un martes cualquiera. Un diagrama no es práctica.',
        steps: [
          { n: '01', title: 'El botiquín, ya', body: 'Guantes, venda de rollo, un vendaje compresivo, cinta, tijeras, jabón, sales de rehidratación oral, tus recetas reales y las dosis escritas en papel.' },
          { n: '02', title: 'Un torniquete de verdad', body: 'Compra uno. Practica contigo mismo antes de que alguien sangre. Un cinturón improvisado en el momento es peor plan que el curso.' },
          { n: '03', title: 'Primero, presión', body: 'Hemorragia que pone en riesgo la vida: guantes, tela dentro de la herida, tu peso encima. No quites la tela empapada para mirar. Añade más tela.' },
          { n: '04', title: 'Luego, el torniquete', body: 'Si la presión falla y la hemorragia está en un brazo o una pierna: alto y apretado, por encima de la herida, no sobre una articulación. Anota la hora. A partir de ahí, aguantas, no exploras.' },
          { n: '05', title: 'Quemaduras', body: 'Agua fresca y limpia durante veinte minutos. Nada de hielo. Nada de mantequilla. Nada de aceite. Luego, un apósito limpio y seco. Una quemadura grande necesita una clínica, si todavía existe alguna.' },
          { n: '06', title: 'La línea que no cruzas', body: 'No cortas. No “drenas” un pecho. Mantienes a la gente abrigada, les das sorbos de solución de rehidratación limpia y los llevas hacia la ayuda, si la ayuda existe.' },
        ],
      },
      {
        id: 'denial',
        tone: 'tone-hazard',
        light: false,
        kicker: 'No es una trampa',
        title: 'Puertas, no trampas explosivas.',
        dek: 'Un dispositivo que dispara, cae o se pega cuando algo llega le dará a un niño antes que a un robot.',
        foot: 'Si una persona puede activarlo al caminar, es una trampa. Son ilegales porque no comprueban quién llegó.',
        steps: [
          { n: '01', title: 'El límite', body: 'Nada de fosos, pinchos, cables en la oscuridad ni nada que se balancee, caiga o queme al activarse. Quien caiga no vas a ser tú.' },
          { n: '02', title: 'Cierra la puerta', body: 'Una puerta maciza cerrada no es una trampa. Acúñala. Desactiva el desbloqueo automático. La mayoría de los robots terrestres son torpes con las manijas, y a una puerta no le importa si lo siguiente en el pasillo es un vecino.' },
          { n: '03', title: 'Usa las escaleras', body: 'Sin contrahuellas, de rejilla, con un giro en el descansillo. Los robots con patas publicados suben mirando hacia arriba y tienen indicado evitar esas escaleras. Estás usando el edificio. No estás escondiendo un agujero.' },
          { n: '04', title: 'Desorden visible', body: 'Sillas, una bicicleta, una manguera, en un pasillo que marcaste para tu propia gente. Un desorden que se ve es un obstáculo. Un cable escondido es una trampa. No tiendas nada de lado a lado de una calle.' },
          { n: '05', title: 'Una lata ruidosa', body: 'Hilo de pescar desde una puerta que es tuya hasta una lata con piedritas. Cinta en el marco para que tu gente lo vea. Hace ruido. No dispara. Quítalo cuando te vayas.' },
          { n: '06', title: 'La habitación equivocada', body: 'Una lámpara con temporizador en un cobertizo donde no duermes. Gastan la batería en la puerta equivocada. Desenchufa cada base de carga. Si algo está de verdad en tu puerta, te vas. No te quedas a mirar.' },
        ],
      },
      {
        id: 'emp',
        tone: 'tone-ink',
        light: true,
        kicker: 'El pulso',
        title: 'A qué afecta de verdad un EMP.',
        dek: 'El cable largo es el blanco. Un robot con su propia batería es uno pequeño.',
        foot: 'Las radios de repuesto viven en la caja muerta, desenchufadas. Emitir un pulso para quemar aparatos electrónicos es un delito. Esto no es un esquema.',
        steps: [
          { n: '01', title: 'Dos eventos distintos', body: 'Una detonación nuclear a gran altura sobre un continente puede golpear la red eléctrica. Eso es E1, rápido, sobre líneas largas, y luego una cola lenta que fríe los transformadores grandes. Una granada de película no es esto.' },
          { n: '02', title: 'El cable es la antena', body: 'Las líneas eléctricas, las telefónicas y las antenas largas captan el pulso. Un teléfono apagado, sin batería, dentro de la caja muerta, es un blanco difícil. Un robot con cables de batería cortos se parece más al teléfono que a la subestación.' },
          { n: '03', title: 'Desenchufa ante un aviso', body: 'Saca los enchufes. Desconecta las antenas. Radios apagadas, sin pilas, a la caja. Haz el simulacro un domingo normal. En el momento no lo vas a improvisar.' },
          { n: '04', title: 'Lo que suele sobrevivir', body: 'Aparatos pequeños a batería que ya estaban apagados. Un diésel sin computadora. Un reloj. Fibra en lugar de cobre. No apuestes la huida a un coche moderno. En pruebas, algunos vehículos se calaron. No convirtieron cada coche en un ladrillo, y el tuyo no es una promesa.' },
          { n: '05', title: 'Lo que muere primero', body: 'Las computadoras enchufadas, cualquier cosa con un cable largo y la propia red eléctrica si el pulso fue del tipo real, nacional. Eso apaga una región. No te regala un robot muerto en la escalera.' },
          { n: '06', title: 'No vas a construir uno', body: 'La versión militar es un misil o un camión: CHAMP, o un vehículo de microondas de alta potencia. El alcance cae rápido. Una bobina y un condensador sacados de un foro sobre todo se destruyen a sí mismos. El clima, una puerta y una batería agotada todavía le ganan.' },
        ],
      },
      {
        id: 'runners',
        tone: 'tone-paper',
        light: false,
        kicker: 'Constrúyelo',
        title: 'Mensajeros, no radios.',
        dek: 'Una frase dicha en voz alta no ilumina una colina.',
        foot: 'Si tienes que transmitir, hazlo lejos de las camas. Treinta segundos. Luego vete.',
        steps: [
          { n: '01', title: 'Una lista en papel', body: 'Nombres, dos puntos de encuentro, dos horas. No pongas la dirección del sitio donde duermen en la misma hoja que los nombres, si puedes separarlas.' },
          { n: '02', title: 'Dos ventanas', body: 'Una ventana por la mañana y otra al anochecer. Si faltas a las dos, llegas tarde. El grupo no sale a buscarte por los caminos.' },
          { n: '03', title: 'Pies', body: 'Un mensajero lleva una frase. No lleva radio, ni teléfono, ni el plan entero en el bolsillo.' },
          { n: '04', title: 'Palabras simples', body: '“El sitio dos está mal.” Acuerden las palabras ahora. Un código ingenioso que olvidas es peor que hablar claro.' },
          { n: '05', title: 'Una luz tapada', body: 'Un destello cubierto, y solo si acordaron lo que significa. Una linterna agitada hacia el cielo es una bengala.' },
          { n: '06', title: 'Niños', body: 'Llevan un nombre y un punto de encuentro que pueden decir en voz alta. No llevan el teléfono, ni la lista, ni la tarea de ser valientes.' },
        ],
      },
      {
        id: 'tools',
        tone: 'tone-volt',
        light: false,
        kicker: 'Constrúyelo',
        title: 'Oscurece el vidrio.',
        dek: 'Termina esto mientras todavía puedas ver lo que haces.',
        foot: 'Un filtro de arena aclara el agua. No la vuelve segura. Después, hiérvela o ponle lejía.',
        steps: [
          { n: '01', title: 'Por dentro del cristal', body: 'Cartón cortado a la medida del vidrio, tela oscura encima, pegado con cinta por dentro. La cinta por fuera le dice a la calle que alguien se esconde.' },
          { n: '02', title: 'Una lámpara', body: 'Tenue, baja, apuntando al suelo, en la habitación sin ventana. El pasillo se queda a oscuras. Una habitación iluminada es una coordenada.' },
          { n: '03', title: 'Cuerda comprada', body: 'Paracord o hilo trenzado, ya en la mochila. Aprender nudos con una liana mojada la primera noche es como se pierden las mochilas.' },
          { n: '04', title: 'Un frasco que aclara', body: 'Tela, luego arena, luego carbón triturado, en un frasco limpio. Esas capas solo quitan el barro. Igual hierves un minuto, o desinfectas con lejía.' },
          { n: '05', title: 'Un filo', body: 'Un cuchillo que ya sabes sostener. Afílalo esta semana. Una hoja sin filo resbala hacia la mano que te da de comer.' },
          { n: '06', title: 'Papel', body: 'Mapa, dosis, la lista, un lápiz, esta lista de control. Una bolsa con cierre. No plastifiques un espejo. El brillo es un hábito del que puedes prescindir.' },
        ],
      },
    ],

    pages: [
      'Portada',
      'La carta',
      'Contenido',
      'Diez minutos',
      'Setenta y dos horas',
      'Patrón',
      'Mátalas de hambre',
      'Agua',
      'Despensa',
      'Calor silencioso',
      'Energía',
      'Caja muerta',
      'Refugio',
      'Escondites',
      'Desechos',
      'Sangre y quemaduras',
      'Movimiento',
      'Gente',
      'Máquinas',
      'Notas de campo',
      'Armamento',
      'Puertas, no trampas',
      'El pulso',
      'Mensajeros',
      'Apagón',
      'Lista',
    ],
};
