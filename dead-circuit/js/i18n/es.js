/**
 * Dead Circuit, Español: public strings (site UI and the free preview).
 * The paid chapters are not here; they live sealed in content/issue-01/.
 * Mirrors en.js key for key; check with dead-circuit/js/i18n/check.mjs.
 */
export default {
    "code": "es",
    "name": "Español",
    "dir": "ltr",
    "titles": {
        "store": "Dead Circuit — Número 01, {price}",
        "storeDescription": "Dead Circuit, número 01. {price} hasta el {deadline}. El reloj no se reinicia.",
        "read": "Dead Circuit — Lee el número",
        "thanks": "Dead Circuit — Llévate el archivo",
        "gate": "dc@gate"
    },
    "languageLabel": "Idioma",
    "disclaimer": {
        "kicker": "Lee esto primero",
        "title": "No oficial. Sin probar. Especulativo.",
        "body": "Dead Circuit es una guía de campo no oficial e independiente para un apocalipsis robot que no ha ocurrido. No hemos probado nada de lo que contiene. Reúne conocimiento general que ya es público, y los despachos son ficción. No es una guía oficial de emergencias ni constituye asesoramiento médico, legal o de seguridad. En una emergencia real, sigue a tus autoridades locales y fórmate como es debido.",
        "short": "No oficial y sin probar. Hecho con conocimiento público, como entretenimiento e ideas. No es asesoramiento oficial, médico, legal ni de seguridad."
    },
    "store": {
        "deadline": "11 nov 2026, medianoche (hora del Este de EE. UU.)",
        "windowClosed": "Ventana cerrada",
        "barBuy": "A mitad de precio — {price}",
        "fullPrice": "Precio completo {full}",
        "heroAlt": "Portada de Dead Circuit, número 01.",
        "dawnKicker": "Amanecer previsto · {deadline}",
        "headlineOpen": "A mitad de precio hasta el amanecer. Luego se duplica.",
        "headlineClosed": "La ventana de mitad de precio está cerrada.",
        "priceNoteOpen": "El precio real es {full}. Esto es la mitad, y el reloj no se reinicia.",
        "priceNoteClosed": "Precio completo.",
        "clockLabel": "Tiempo restante hasta el {deadline}",
        "clockUnits": [
            "Días",
            "Horas",
            "Min",
            "Seg"
        ],
        "payCard": "Paga con tarjeta — {price}",
        "payCrypto": "Paga con cripto",
        "openingStripe": "Abriendo Stripe…",
        "deck": "{pages} páginas. La tarjeta abre Stripe a {price} y te trae de vuelta al archivo. Con cripto es el mismo archivo en cuanto {price} llega a una sola wallet.",
        "cryptoNote": "Envía {price} en una sola red. Es la mitad de {full}. Mándalo en una sola transferencia desde una wallet normal y pega el id de la transacción en Llévate el archivo.",
        "copy": "Copiar",
        "copied": "Copiado",
        "alreadyPaid": "¿Ya pagaste? Llévate el archivo",
        "lookInside": "Echa un vistazo al número",
        "paperKicker": "En el archivo",
        "paperTitle": "Lo que compran {price} a mitad de precio. El precio completo es {full}.",
        "voltKicker": "El límite",
        "voltTitle": "Tras el amanecer, sube al doble: {full}.",
        "voltBuy": "Consigue el número — {price}",
        "endTitle": "Mitad de precio ahora. {full} cuando el reloj llegue a cero.",
        "endBody": "Paga con tarjeta y Stripe cobra {price} y te lleva directo al archivo. Paga con cripto enviando {price} a una sola wallet y pega el id de la transacción en Llévate el archivo. Después del {deadline}, el precio es {full}.",
        "endBuy": "Paga {price}, la mitad de {full}",
        "dockClosed": "Cerrado",
        "dockLeft": "{d}d {h}h",
        "noscript": "Dead Circuit necesita JavaScript."
    },
    "reader": {
        "wordmarkIssue": "Número 01",
        "buy": "Comprar · {price}",
        "previous": "Página anterior",
        "next": "Página siguiente",
        "getPdf": "Consigue el PDF",
        "pdfShort": "PDF",
        "pagesNav": "Páginas",
        "locked": {
            "kicker": "Aquí termina la vista previa",
            "title": "{count} páginas más en el número completo.",
            "body": "Cada construcción con su diagrama, dos hojas de trabajo, cinco despachos más del Amanecer, tarjetas de bolsillo para recortar y las fuentes. Un PDF, en tu idioma.",
            "cta": "Consigue el número — {price}",
            "badge": "En el número completo",
            "listTitle": "Dentro del número completo"
        }
    },
    "thanks": {
        "kicker": "Dead Circuit · Número 01",
        "title": "Llévate el archivo.",
        "intro": "¿Pagaste con tarjeta? Stripe te devuelve aquí solo. ¿Pagaste con cripto? Pega la transacción abajo.",
        "download": "Descarga el PDF",
        "chain": "Red",
        "tx": "Id de la transacción",
        "txPlaceholder": "0x…, txid o firma",
        "check": "Verificar pago",
        "checking": "Revisando la red…",
        "checkingStripe": "Verificando tu pago con tarjeta en Stripe…",
        "verified": "Verificado. El enlace funciona durante quince minutos. Guarda el archivo en un lugar seguro.",
        "stuck": "¿Atascado? {link} con tu recibo o el id de la transacción.",
        "stuckLink": "Pregunta en Telegram",
        "back": "Volver a la oferta",
        "offline": "No pudimos contactar con la central. Revisa tu conexión e inténtalo de nuevo."
    },
    "errors": {
        "stripe-bad-id": "Eso no es un id de pago de Stripe.",
        "stripe-unknown": "Stripe no reconoce ese pago.",
        "stripe-unpaid": "Stripe todavía no ha marcado ese pago como cobrado.",
        "stripe-wrong": "Ese pago no era para Dead Circuit.",
        "base-bad-hash": "Un hash de transacción de Base es 0x más 64 caracteres hexadecimales.",
        "base-not-found": "Base no tiene ninguna transacción con ese hash. Revísalo, o espera un minuto.",
        "base-pending": "Esa transacción sigue pendiente. Inténtalo de nuevo en un minuto.",
        "tx-failed": "Esa transacción falló en la cadena.",
        "eth-not-to-wallet": "Esa transacción no envió ETH directamente a la wallet de Dead Circuit.",
        "xrge-none": "Esa transacción no envió XRGE a la wallet de Dead Circuit.",
        "btc-bad-id": "Un id de transacción de Bitcoin tiene 64 caracteres hexadecimales.",
        "btc-not-found": "Bitcoin aún no tiene ninguna transacción con ese id. Revísalo, o espera unos minutos.",
        "btc-none": "Esa transacción no envió nada a la wallet de Dead Circuit.",
        "btc-unconfirmed": "La vemos. Bitcoin necesita una confirmación, normalmente diez minutos. Inténtalo entonces.",
        "sol-bad-sig": "Eso no parece una firma de Solana.",
        "sol-not-found": "Solana aún no tiene ninguna transacción confirmada con esa firma. Inténtalo de nuevo en un minuto.",
        "sol-none": "Esa transacción no envió SOL a la wallet de Dead Circuit.",
        "too-old": "Ese pago es anterior a esta venta.",
        "too-little": "Ese pago vale unos ${usd} hoy. El número cuesta ${need}.",
        "bad-chain": "Elige la red en la que pagaste.",
        "used-up": "Ese pago ya agotó sus descargas. Pide ayuda si es tuyo.",
        "throttled": "Demasiados intentos. Espera un minuto.",
        "unavailable": "No pudimos verificar ese pago ahora. Inténtalo de nuevo en un minuto.",
        "unknown": "Algo salió mal. Inténtalo de nuevo."
    },
    "gate": {
        "leave": "Salir",
        "boot": [
            "DEAD CIRCUIT GATE",
            "El número está a la venta en la planta. Esta sala no.",
            "Escribe help."
        ],
        "readme": [
            "Los operadores derivan el token de acceso y luego lo envían.",
            "Los turistas usan la puerta de la planta.",
            "man gate — si de verdad estás perdido."
        ],
        "note": [
            "password: apocalypse",
            "si eso funcionara, todo el mundo ya estaría dentro."
        ],
        "man": [
            "Tres capas, en orden.",
            "La captura es sonido.",
            "Ese sonido es la clave que se repite.",
            "Lo que abre es un sello de libro de texto.",
            "El texto plano del sello es el token."
        ],
        "catWhat": "cat qué",
        "notText": "lock.bin: no es texto. Pásale xxd.",
        "noFile": "no existe el archivo: {arg}",
        "xxdWhat": "xxd qué",
        "notBinary": "xxd: {arg}: no es un binario que guardemos",
        "unknown": "desconocido: {cmd}",
        "rejected": "rechazado.",
        "granted": "acceso concedido. el manual es tuyo.",
        "prize": "Llévate el número"
    },
    "sheet": {
        "folioIssue": "Número 01",
        "cover": {
            "kicker": "Dead Circuit · Trimestral de campo",
            "title": "Cómo|sobrevivir a un|*apocalipsis*|robótico",
            "deck": "Un manual para quien piensa seguir siendo aburrido, callado y vivo.",
            "stamp": "Número",
            "bar": "Sin señal. Sin heroísmos. Treinta y nueve páginas."
        },
        "letter": {
            "indexKicker": "Cómo usarlo",
            "indexTitle": "Léelo una vez.|Luego vete.",
            "kicker": "Carta del editor",
            "title": "Sé poco interesante.",
            "body": [
                "Las máquinas son rápidas, incansables y están en red. Tú no eres nada de eso, y esa es la ventaja. Cazan el plan promedio: la autopista, el refugio que anuncian por la radio, el reencuentro en casa.",
                "Este número es el trabajo: agua que puedes dosificar, comida que puedes contar, una estufa que se queda afuera, una caja de metal que mata la señal de radio, dos escondites y una forma de hablar que no ilumina una colina."
            ],
            "sign": "Sigues aquí. — La redacción"
        },
        "contents": {
            "kicker": "En este número",
            "title": "Veintitrés formas de seguir siendo aburrido.",
            "also": "También dentro: seis despachos del Amanecer · tres diagramas de construcción · dos hojas de trabajo · tarjetas de bolsillo · fuentes"
        },
        "minutes": {
            "kicker": "Los primeros diez minutos",
            "title": "Da por hecho que la red ya es hostil.",
            "photoAlt": "Una persona se escabulle por un callejón junto a una calle de coches detenidos.",
            "caption": "Si la avenida se detiene, ya vas tarde. Sal de lado."
        }
    },
    "zine": {
        "cover": {
            "kicker": "Trimestral de campo",
            "title": "Cómo sobrevivir a un *apocalipsis* robótico",
            "tagline": "Sé aburrido. Sé callado. Sigue vivo."
        },
        "letter": {
            "body": [
                "Las máquinas son rápidas, incansables y están en red. Tú no eres nada de eso, y esa es la ventaja. Cazan el plan promedio: la autopista, el refugio que anuncian por la radio, el reencuentro en casa.",
                "Niégales datos, energía y un patrón. Sigue vivo hasta que caiga la red eléctrica. Cuando los enlaces se partan, el enjambre no es más que un montón de programas tontos. Sigues aquí."
            ]
        },
        "minutes": {
            "title": "La red ya es hostil.",
            "photoAlt": "Una persona se escabulle por un callejón junto a coches detenidos."
        }
    },
    "teaser": {
        "shelter": "Un buen refugio es un refugio tonto.",
        "move": "Muros, no sombras.",
        "bots": "Si te cruzas con uno, identifícalo primero."
    },
    "toc": [
        {
            "id": "minutes",
            "title": "Diez minutos",
            "deck": "Apaga la baliza. Sal de lado."
        },
        {
            "id": "day",
            "title": "Setenta y dos horas",
            "deck": "Un reloj, no un estado de ánimo."
        },
        {
            "id": "pattern",
            "title": "Sé promedio y pierde",
            "deck": "Multitudes, autopistas y casa."
        },
        {
            "id": "starve",
            "title": "Mata de hambre a las máquinas",
            "deck": "Energía, radio, lentes, piezas."
        },
        {
            "id": "water",
            "title": "Estación de agua",
            "deck": "Aclarar, hervir, dosificar, guardar."
        },
        {
            "id": "food",
            "title": "La despensa",
            "deck": "Calorías que puedes contar."
        },
        {
            "id": "heat",
            "title": "Calor silencioso",
            "deck": "Una estufa que no vive bajo techo."
        },
        {
            "id": "power",
            "title": "Presupuesto de energía",
            "deck": "Primero los vatios-hora, luego el panel."
        },
        {
            "id": "faraday",
            "title": "La caja muerta",
            "deck": "Una jaula de Faraday que puedes probar."
        },
        {
            "id": "shelter",
            "title": "Refugio tonto",
            "deck": "Una habitación que no puede llamar a casa."
        },
        {
            "id": "cache",
            "title": "Dos escondites",
            "deck": "Secos, anodinos y lejos de casa."
        },
        {
            "id": "waste",
            "title": "Desechos",
            "deck": "Cuesta abajo del agua."
        },
        {
            "id": "med",
            "title": "Sangre y quemaduras",
            "deck": "Presión, y luego un curso de verdad."
        },
        {
            "id": "move",
            "title": "Cómo te mueves",
            "deck": "Día, noche y cobertura."
        },
        {
            "id": "people",
            "title": "Otros humanos",
            "deck": "Grupo pequeño. Un límite de tiempo estricto."
        },
        {
            "id": "bots",
            "title": "Si te cruzas con uno",
            "deck": "Cuatro máquinas. Una regla."
        },
        {
            "id": "specs",
            "title": "Notas de campo",
            "deck": "Autonomías reales, escaleras, clima."
        },
        {
            "id": "arms",
            "title": "Lo que las detiene",
            "deck": "Lo que despliegan los ejércitos. No es una receta."
        },
        {
            "id": "denial",
            "title": "Puertas, no trampas",
            "deck": "Obstáculos que una persona puede ver."
        },
        {
            "id": "emp",
            "title": "El pulso",
            "deck": "A qué afecta de verdad un EMP."
        },
        {
            "id": "runners",
            "title": "Mensajeros",
            "deck": "Pies y una frase."
        },
        {
            "id": "tools",
            "title": "Oscurece el vidrio",
            "deck": "Herramientas que terminas antes de que oscurezca."
        },
        {
            "id": "end",
            "title": "Lista de bolsillo",
            "deck": "Ocho líneas. Espera a que caiga la red."
        }
    ],
    "pages": {
        "cover": "Portada",
        "letter": "La carta",
        "contents": "Contenido",
        "d1": "Despacho 01",
        "minutes": "Diez minutos",
        "day": "Setenta y dos horas",
        "w72": "Tus 72 horas",
        "pattern": "Patrón",
        "starve": "Mátalas de hambre",
        "d2": "Despacho 02",
        "water": "Agua",
        "dwater": "Agua, dibujada",
        "food": "Despensa",
        "heat": "Calor silencioso",
        "dstove": "Estufa, dibujada",
        "power": "Energía",
        "wpower": "Hoja de energía",
        "faraday": "Caja muerta",
        "dbox": "Caja muerta, dibujada",
        "d3": "Despacho 03",
        "shelter": "Refugio",
        "cache": "Escondites",
        "waste": "Desechos",
        "med": "Sangre y quemaduras",
        "move": "Movimiento",
        "people": "Gente",
        "d4": "Despacho 04",
        "bots": "Máquinas",
        "specs": "Notas de campo",
        "arms": "Armamento",
        "d5": "Despacho 05",
        "denial": "Puertas, no trampas",
        "emp": "El pulso",
        "runners": "Mensajeros",
        "tools": "Apagón",
        "cards": "Tarjetas de bolsillo",
        "d6": "Despacho 06",
        "sources": "Fuentes",
        "end": "Lista"
    },
    "primer": [
        {
            "n": "01",
            "title": "Cuéntalo",
            "deck": "Galones, calorías, vatios-hora. Si no puedes contarlo, no puedes empacarlo."
        },
        {
            "n": "02",
            "title": "Constrúyelo antes",
            "deck": "Agua, apagón, la caja muerta. Practica mientras las luces aún funcionan."
        },
        {
            "n": "03",
            "title": "No hay capítulo de armas",
            "deck": "Los inhibidores de señal civiles son ilegales. Una bomba de película no es un producto. La logística sí."
        },
        {
            "n": "04",
            "title": "La ley sigue vigente",
            "deck": "Tu terreno. Fuegos legales. Esto es un manual de campo, no un permiso."
        }
    ],
    "minutes": [
        {
            "n": "01",
            "title": "Apaga tu baliza",
            "body": "El modo avión no basta. Apaga el teléfono. Quítale la batería si se puede. Los relojes, los auriculares y las llaves del coche también emiten."
        },
        {
            "n": "02",
            "title": "Sal del vidrio",
            "body": "Torres, centros comerciales, aeropuertos, hospitales: llenos de sensores y difíciles de abandonar. Planta baja. Salida lateral. Lejos de las cámaras."
        },
        {
            "n": "03",
            "title": "Abandona el coche nuevo",
            "body": "Un vehículo moderno es una computadora con ruedas. Usa los pies, una bicicleta o algo viejo y mecánico. Si el tráfico se congela, bájate."
        },
        {
            "n": "04",
            "title": "Una mochila, y vete",
            "body": "Agua, calorías, un cuchillo, un encendedor, un mapa de papel, efectivo, medicinas, calzado de verdad, un gorro y una linterna que no sea una app."
        }
    ],
    "builds": [
        {
            "id": "day",
            "tone": "tone-paper",
            "light": false,
            "kicker": "El reloj",
            "title": "Las primeras setenta y dos horas.",
            "dek": "Decide el día antes de estar cansado. Escribe las horas en papel.",
            "foot": "Si a la hora doce sigues comprando, vas tarde.",
            "steps": [
                {
                    "n": "00",
                    "title": "Sal",
                    "body": "Puerta lateral. Radios apagadas. Una mochila. No cruces el vestíbulo principal, la calle principal ni la fachada de tu propio edificio."
                },
                {
                    "n": "01",
                    "title": "Un techo, no tu casa",
                    "body": "Ponte a cubierto en un lugar que no sea tu dirección. Bebe. Vacía la mochila en el suelo y mira qué llevas de verdad."
                },
                {
                    "n": "04",
                    "title": "Agua en marcha",
                    "body": "Tres días en el estante, o sigues caminando. Un galón (unos 3.8 L) por persona al día es la cifra. El agua embotellada cuenta. El agua de río sin tratar, no."
                },
                {
                    "n": "12",
                    "title": "La habitación se apaga",
                    "body": "Ventanas tapadas por dentro. El cubo para desechos, en el plan. Nada de fuego después del anochecer. Una persona despierta, y no cocinando a la vez."
                },
                {
                    "n": "24",
                    "title": "El segundo lugar",
                    "body": "Un punto de encuentro y un escondite viven en tu cabeza, no en un pin del mapa. Otra persona conoce el punto de encuentro. No conoce los dos escondites."
                },
                {
                    "n": "72",
                    "title": "El escondite largo",
                    "body": "Si la red sigue en pie y sigue buscando, comes frío y solo te mueves por agua. La curiosidad es como la gente acaba contada."
                }
            ]
        }
    ],
    "dispatch": {
        "d1": {
            "kicker": "Despacho 01",
            "stamp": "Día 0 · 06:12",
            "place": "La avenida",
            "title": "Primero se bloquearon los coches.",
            "body": [
                "No los motores. Las puertas. Cuatro carriles de gente camino del trabajo, sentada detrás de un vidrio que no se abría, y la avenida se quedó tan callada que oía los semáforos chasquear al pasar por colores que nadie obedecía.",
                "Tenía el teléfono en la mano. Todavía no sé por qué lo apagué. Algo en la forma en que todas las pantallas del autobús se encendieron a la vez, como si a todas les hubieran hecho la misma pregunta.",
                "No fui a casa. Mi casa estaba a trescientos metros del depósito, y mi calendario lo sabía. Salí de lado: callejón de servicio, zanja del tren, la pasarela que los mapas dejaron de mostrar hace años. A mediodía estaba bajo un techo que no era mío, contando lo que llevaba en la mochila. No era suficiente. Era un comienzo."
            ],
            "sign": "— R., repartidor"
        }
    }
};
