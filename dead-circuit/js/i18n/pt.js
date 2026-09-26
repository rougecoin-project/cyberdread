/**
 * Dead Circuit, Português: public strings (site UI and the free preview).
 * The paid chapters are not here; they live sealed in content/issue-01/.
 * Mirrors en.js key for key; check with dead-circuit/js/i18n/check.mjs.
 */
export default {
    "code": "pt",
    "name": "Português",
    "dir": "ltr",
    "titles": {
        "store": "Dead Circuit — Edição 01, {price}",
        "storeDescription": "Dead Circuit, edição 01. {price} até {deadline}. O relógio não volta.",
        "read": "Dead Circuit — Leia a edição",
        "thanks": "Dead Circuit — Pegue o arquivo",
        "gate": "dc@gate"
    },
    "languageLabel": "Idioma",
    "disclaimer": {
        "kicker": "Leia isto primeiro",
        "title": "Não oficial. Não testado. Especulativo.",
        "body": "Dead Circuit é um guia de campo não oficial e independente para um apocalipse robô que não aconteceu. Não testamos nada do que está nele. Ele reúne conhecimento geral que já é público, e os relatos são ficção. Não é orientação oficial de emergência nem aconselhamento médico, jurídico ou de segurança. Numa emergência real, siga as autoridades locais e faça um treinamento de verdade.",
        "short": "Não oficial e não testado. Feito com conhecimento público, para entretenimento e ideias. Não é aconselhamento oficial, médico, jurídico ou de segurança."
    },
    "store": {
        "deadline": "11 nov. 2026, meia-noite (horário do leste dos EUA)",
        "windowClosed": "Janela fechada",
        "barBuy": "Metade do preço — {price}",
        "fullPrice": "Preço cheio {full}",
        "heroAlt": "Capa da Dead Circuit, edição 01.",
        "dawnKicker": "Amanhecer previsto · {deadline}",
        "headlineOpen": "Metade do preço até o amanhecer. Depois, dobra.",
        "headlineClosed": "A janela da metade do preço fechou.",
        "priceNoteOpen": "O preço real é {full}. Isto é metade, e o relógio não volta.",
        "priceNoteClosed": "Preço cheio.",
        "clockLabel": "Tempo restante até {deadline}",
        "clockUnits": [
            "Dias",
            "Horas",
            "Min",
            "Seg"
        ],
        "payCard": "Pagar com cartão — {price}",
        "payCrypto": "Pagar com cripto",
        "openingStripe": "Abrindo o Stripe…",
        "deck": "{pages} páginas. O cartão abre o Stripe em {price} e traz você de volta ao arquivo. Com cripto, é o mesmo arquivo assim que {price} cair em uma carteira.",
        "cryptoNote": "Envie {price} em uma rede só. É metade de {full}. Mande em uma única transferência, de uma carteira comum, e cole o id da transação em Pegue o arquivo.",
        "copy": "Copiar",
        "copied": "Copiado",
        "alreadyPaid": "Já pagou? Pegue o arquivo",
        "lookInside": "Veja o miolo da edição",
        "paperKicker": "No arquivo",
        "paperTitle": "O que {price}, pela metade, compra. O preço cheio é {full}.",
        "voltKicker": "O limite",
        "voltTitle": "Depois do amanhecer, isto dobra para {full}.",
        "voltBuy": "Leve a edição — {price}",
        "endTitle": "Metade do preço agora. {full} quando o relógio zerar.",
        "endBody": "No cartão, o Stripe cobra {price} e manda você direto ao arquivo. Em cripto, envie {price} para uma carteira e cole o id da transação em Pegue o arquivo. Depois de {deadline}, o preço é {full}.",
        "endBuy": "Pague {price}, metade de {full}",
        "dockClosed": "Fechado",
        "dockLeft": "{d}d {h}h",
        "noscript": "A Dead Circuit precisa de JavaScript."
    },
    "reader": {
        "wordmarkIssue": "Edição 01",
        "buy": "Comprar · {price}",
        "previous": "Página anterior",
        "next": "Próxima página",
        "getPdf": "Baixar o PDF",
        "pdfShort": "PDF",
        "pagesNav": "Páginas",
        "locked": {
            "kicker": "A prévia termina aqui",
            "title": "Mais {count} páginas na edição completa.",
            "body": "Cada montagem com o seu diagrama, duas fichas, mais cinco relatos do Amanhecer, cartões de bolso para recortar e as fontes. Um PDF, no seu idioma.",
            "cta": "Leve a edição — {price}",
            "badge": "Na edição completa",
            "listTitle": "Dentro da edição completa"
        }
    },
    "thanks": {
        "kicker": "Dead Circuit · Edição 01",
        "title": "Pegue o arquivo.",
        "intro": "Pagou com cartão? O Stripe traz você de volta sozinho. Pagou com cripto? Cole a transação abaixo.",
        "download": "Baixar o PDF",
        "chain": "Rede",
        "tx": "Id da transação",
        "txPlaceholder": "0x…, txid ou assinatura",
        "check": "Verificar pagamento",
        "checking": "Consultando a rede…",
        "checkingStripe": "Conferindo seu pagamento no cartão com o Stripe…",
        "verified": "Confirmado. O link vale por quinze minutos. Guarde o arquivo em um lugar seguro.",
        "stuck": "Travou? {link} com seu recibo ou o id da transação.",
        "stuckLink": "Chame no Telegram",
        "back": "Voltar à oferta",
        "offline": "Não deu para falar com a central. Confira sua conexão e tente de novo."
    },
    "errors": {
        "stripe-bad-id": "Isso não é um id de checkout do Stripe.",
        "stripe-unknown": "O Stripe não conhece esse checkout.",
        "stripe-unpaid": "O Stripe ainda não marcou esse checkout como pago.",
        "stripe-wrong": "Esse checkout não era da Dead Circuit.",
        "base-bad-hash": "Um hash de transação da Base é 0x seguido de 64 caracteres hexadecimais.",
        "base-not-found": "A Base não tem transação com esse hash. Confira, ou espere um minuto.",
        "base-pending": "Essa transação ainda está pendente. Tente de novo em um minuto.",
        "tx-failed": "Essa transação falhou na rede.",
        "eth-not-to-wallet": "Essa transação não enviou ETH direto para a carteira da Dead Circuit.",
        "xrge-none": "Essa transação não enviou XRGE para a carteira da Dead Circuit.",
        "btc-bad-id": "Um id de transação de Bitcoin tem 64 caracteres hexadecimais.",
        "btc-not-found": "O Bitcoin ainda não tem transação com esse id. Confira, ou espere alguns minutos.",
        "btc-none": "Essa transação não enviou nada para a carteira da Dead Circuit.",
        "btc-unconfirmed": "Já vimos. O Bitcoin precisa de uma confirmação, em geral dez minutos. Tente de novo depois disso.",
        "sol-bad-sig": "Isso não parece uma assinatura da Solana.",
        "sol-not-found": "A Solana ainda não tem transação confirmada com essa assinatura. Tente de novo em um minuto.",
        "sol-none": "Essa transação não enviou SOL para a carteira da Dead Circuit.",
        "too-old": "Esse pagamento é anterior a esta venda.",
        "too-little": "Hoje esse pagamento vale cerca de US${usd}. A edição custa US${need}.",
        "bad-chain": "Escolha a rede em que você pagou.",
        "used-up": "Esse pagamento já foi usado para os downloads dele. Peça ajuda se ele for seu.",
        "throttled": "Tentativas demais. Espere um minuto.",
        "unavailable": "Não deu para verificar esse pagamento agora. Tente de novo em um minuto.",
        "unknown": "Algo deu errado. Tente de novo."
    },
    "gate": {
        "leave": "Sair",
        "boot": [
            "DEAD CIRCUIT GATE",
            "A edição está à venda lá embaixo. Esta sala, não.",
            "Digite help."
        ],
        "readme": [
            "Operadores derivam o token de acesso e depois o enviam com submit.",
            "Turistas usam a porta lá de baixo.",
            "man gate — se você estiver mesmo perdido."
        ],
        "note": [
            "password: apocalypse",
            "se isso funcionasse, todo mundo já estaria aqui dentro."
        ],
        "man": [
            "Três camadas, nesta ordem.",
            "A captura é som.",
            "Esse som é a chave que se repete.",
            "O que ela abre é um selo de livro-texto.",
            "O texto claro do selo é o token."
        ],
        "catWhat": "cat o quê",
        "notText": "lock.bin: não é texto. Use xxd.",
        "noFile": "arquivo inexistente: {arg}",
        "xxdWhat": "xxd o quê",
        "notBinary": "xxd: {arg}: não é um binário nosso",
        "unknown": "desconhecido: {cmd}",
        "rejected": "recusado.",
        "granted": "acesso liberado. o manual é seu.",
        "prize": "Leve a edição"
    },
    "sheet": {
        "folioIssue": "Edição 01",
        "cover": {
            "kicker": "Dead Circuit · Trimestral de campo",
            "title": "Como|sobreviver a um|*apocalipse*|robô",
            "deck": "Um manual para quem pretende continuar sem graça, calado e vivo.",
            "stamp": "Edição",
            "bar": "Sem sinal. Sem heroísmo. Trinta e nove páginas."
        },
        "letter": {
            "indexKicker": "Como usar",
            "indexTitle": "Leia uma vez.|Depois vá.",
            "kicker": "Carta do editor",
            "title": "Seja desinteressante.",
            "body": [
                "Máquinas são rápidas, incansáveis e conectadas. Você não é nada disso, e essa é a vantagem. Elas caçam o plano médio: a rodovia, o abrigo anunciado no rádio, o reencontro em casa.",
                "Esta edição é o trabalho: água que você sabe dosar, comida que você sabe contar, um fogareiro que fica do lado de fora, uma caixa de metal que mata sinal de rádio, dois esconderijos e um jeito de se comunicar que não acende um morro."
            ],
            "sign": "Você ainda está aqui. — A redação"
        },
        "contents": {
            "kicker": "Nesta edição",
            "title": "Vinte e três jeitos de continuar sem graça.",
            "also": "Também nesta edição: seis relatos do Amanhecer · três diagramas de montagem · duas fichas · cartões de bolso · fontes"
        },
        "minutes": {
            "kicker": "Os primeiros dez minutos",
            "title": "Parta do princípio de que a rede já é hostil.",
            "photoAlt": "Uma pessoa entra num beco, passando por uma rua de carros parados.",
            "caption": "Se a avenida parou, você já está atrasado. Saia pela lateral."
        }
    },
    "zine": {
        "cover": {
            "kicker": "Trimestral de campo",
            "title": "Como sobreviver a um *apocalipse* robô",
            "tagline": "Sem graça. Calado. Vivo."
        },
        "letter": {
            "body": [
                "Máquinas são rápidas, incansáveis e conectadas. Você não é nada disso, e essa é a vantagem. Elas caçam o plano médio: a rodovia, o abrigo anunciado no rádio, o reencontro em casa.",
                "Negue a elas dados, energia e um padrão. Fique vivo até a rede cair. Quando os enlaces se partem, o enxame vira só um monte de programas burros. Você ainda está aqui."
            ]
        },
        "minutes": {
            "title": "A rede já é hostil.",
            "photoAlt": "Uma pessoa entra num beco, passando por carros parados."
        }
    },
    "teaser": {
        "shelter": "Abrigo bom é abrigo burro.",
        "move": "Paredes, não sombras.",
        "bots": "Se encontrar um, identifique antes."
    },
    "toc": [
        {
            "id": "minutes",
            "title": "Dez minutos",
            "deck": "Mate o sinal. Saia pela lateral."
        },
        {
            "id": "day",
            "title": "Setenta e duas horas",
            "deck": "Um relógio, não um estado de espírito."
        },
        {
            "id": "pattern",
            "title": "Seja médio e perca",
            "deck": "Multidões, rodovias e casa."
        },
        {
            "id": "starve",
            "title": "Deixe as máquinas com fome",
            "deck": "Energia, rádio, lentes, peças."
        },
        {
            "id": "water",
            "title": "Estação de água",
            "deck": "Clarear, ferver, dosar, guardar."
        },
        {
            "id": "food",
            "title": "A despensa",
            "deck": "Calorias que você sabe contar."
        },
        {
            "id": "heat",
            "title": "Calor discreto",
            "deck": "Um fogareiro que não mora dentro de casa."
        },
        {
            "id": "power",
            "title": "Orçamento de energia",
            "deck": "Primeiro os watts-hora, depois o painel."
        },
        {
            "id": "faraday",
            "title": "A caixa morta",
            "deck": "Uma gaiola de Faraday que você pode testar."
        },
        {
            "id": "shelter",
            "title": "Abrigo burro",
            "deck": "Um cômodo que não consegue ligar para casa."
        },
        {
            "id": "cache",
            "title": "Dois esconderijos",
            "deck": "Secos, sem graça e longe de casa."
        },
        {
            "id": "waste",
            "title": "Dejetos",
            "deck": "Morro abaixo da água."
        },
        {
            "id": "med",
            "title": "Sangue e queimaduras",
            "deck": "Pressão, depois um curso de verdade."
        },
        {
            "id": "move",
            "title": "Como se deslocar",
            "deck": "Dia, noite e cobertura."
        },
        {
            "id": "people",
            "title": "Outros humanos",
            "deck": "Grupo pequeno. Prazo rígido."
        },
        {
            "id": "bots",
            "title": "Se encontrar um",
            "deck": "Quatro máquinas. Uma regra."
        },
        {
            "id": "specs",
            "title": "Notas de campo",
            "deck": "Autonomia real, escadas, clima."
        },
        {
            "id": "arms",
            "title": "O que os detém",
            "deck": "O que exércitos usam. Não é receita."
        },
        {
            "id": "denial",
            "title": "Portas, não armadilhas",
            "deck": "Obstáculos que uma pessoa enxerga."
        },
        {
            "id": "emp",
            "title": "O pulso",
            "deck": "O que um PEM atinge de fato."
        },
        {
            "id": "runners",
            "title": "Mensageiros",
            "deck": "Pés e uma frase."
        },
        {
            "id": "tools",
            "title": "Apague o vidro",
            "deck": "Ferramentas prontas antes de escurecer."
        },
        {
            "id": "end",
            "title": "Checklist de bolso",
            "deck": "Oito linhas. Espere a rede cair."
        }
    ],
    "pages": {
        "cover": "Capa",
        "letter": "A carta",
        "contents": "Sumário",
        "d1": "Relato 01",
        "minutes": "Dez minutos",
        "day": "Setenta e duas horas",
        "w72": "Suas 72 horas",
        "pattern": "Padrão",
        "starve": "Deixe-as com fome",
        "d2": "Relato 02",
        "water": "Água",
        "dwater": "Água, no desenho",
        "food": "Despensa",
        "heat": "Calor discreto",
        "dstove": "Fogareiro, no desenho",
        "power": "Energia",
        "wpower": "Ficha de energia",
        "faraday": "Caixa morta",
        "dbox": "Caixa morta, no desenho",
        "d3": "Relato 03",
        "shelter": "Abrigo",
        "cache": "Esconderijos",
        "waste": "Dejetos",
        "med": "Sangue e queimaduras",
        "move": "Deslocamento",
        "people": "Pessoas",
        "d4": "Relato 04",
        "bots": "Máquinas",
        "specs": "Notas de campo",
        "arms": "Armamento",
        "d5": "Relato 05",
        "denial": "Portas, não armadilhas",
        "emp": "O pulso",
        "runners": "Mensageiros",
        "tools": "Blecaute",
        "cards": "Cartões de bolso",
        "d6": "Relato 06",
        "sources": "Fontes",
        "end": "Checklist"
    },
    "primer": [
        {
            "n": "01",
            "title": "Conte",
            "deck": "Galões, calorias, watts-hora. Se você não sabe contar, não sabe empacotar."
        },
        {
            "n": "02",
            "title": "Monte antes",
            "deck": "Água, blecaute, a caixa morta. Treine enquanto as luzes ainda funcionam."
        },
        {
            "n": "03",
            "title": "Sem capítulo de armas",
            "deck": "Bloqueadores de sinal civis são ilegais. Bomba de filme não é produto. Logística é."
        },
        {
            "n": "04",
            "title": "A lei continua valendo",
            "deck": "Seu terreno. Fogo dentro da lei. Isto é um manual de campo, não uma autorização."
        }
    ],
    "minutes": [
        {
            "n": "01",
            "title": "Mate o seu sinal",
            "body": "Modo avião não basta. Desligue o celular. Tire a bateria, se der. Relógios, fones e chaves de carro também transmitem."
        },
        {
            "n": "02",
            "title": "Saia do vidro",
            "body": "Torres, shoppings, aeroportos, hospitais: cheios de sensores e difíceis de deixar. Térreo. Saída lateral. Longe das câmeras."
        },
        {
            "n": "03",
            "title": "Largue o carro novo",
            "body": "Um veículo moderno é um computador com rodas. Vá a pé, de bicicleta ou em algo velho e mecânico. Se o trânsito travar, desça."
        },
        {
            "n": "04",
            "title": "Uma mochila, e vá",
            "body": "Água, calorias, uma faca, um isqueiro, um mapa de papel, dinheiro vivo, remédios, calçado de verdade, um chapéu e uma lanterna que não seja um app."
        }
    ],
    "builds": [
        {
            "id": "day",
            "tone": "tone-paper",
            "light": false,
            "kicker": "O relógio",
            "title": "As primeiras setenta e duas horas.",
            "dek": "Decida o dia antes de estar cansado. Escreva os horários no papel.",
            "foot": "Se na hora doze você ainda está fazendo compras, está atrasado.",
            "steps": [
                {
                    "n": "00",
                    "title": "Saia",
                    "body": "Porta lateral. Rádios desligados. Uma mochila. Não atravesse o saguão principal, a avenida principal nem a frente do seu próprio prédio."
                },
                {
                    "n": "01",
                    "title": "Um teto, não a casa",
                    "body": "Fique sob um abrigo que não seja o seu endereço. Beba água. Esvazie a mochila no chão e veja o que de fato tem nela."
                },
                {
                    "n": "04",
                    "title": "Água em andamento",
                    "body": "Três dias na prateleira, ou você ainda está andando. Um galão (cerca de 3,8 L) por pessoa por dia é o número. Água engarrafada conta. Água de rio sem tratamento, não."
                },
                {
                    "n": "12",
                    "title": "O cômodo apaga",
                    "body": "Janelas vedadas por dentro. Balde de dejetos no plano. Nada de fogo depois do anoitecer. Uma pessoa acordada, e ela não está cozinhando."
                },
                {
                    "n": "24",
                    "title": "O segundo lugar",
                    "body": "Ponto de encontro e esconderijo ficam na sua cabeça, não num pin. Uma outra pessoa sabe o ponto de encontro. Ela não sabe os dois esconderijos."
                },
                {
                    "n": "72",
                    "title": "O esconderijo longo",
                    "body": "Se a rede ainda está de pé e ainda procurando, você come frio e só se move para buscar água. Curiosidade é como as pessoas entram na contagem."
                }
            ]
        }
    ],
    "dispatch": {
        "d1": {
            "kicker": "Relato 01",
            "stamp": "Dia 0 · 06:12",
            "place": "A avenida",
            "title": "Os carros travaram primeiro.",
            "body": [
                "Não os motores. As portas. Quatro faixas de gente indo para o trabalho, presa atrás de vidros que não abriam, e a avenida ficou tão quieta que eu ouvia os semáforos estalando entre cores que ninguém obedecia.",
                "Eu estava com o celular na mão. Até hoje não sei por que desliguei. Alguma coisa no jeito como todas as telas do ônibus acenderam ao mesmo tempo, como se todas tivessem recebido a mesma pergunta.",
                "Não fui para casa. Minha casa ficava a trezentos metros do depósito, e a minha agenda sabia disso. Fui pela lateral: beco de serviço, corte da ferrovia, a passarela que os mapas pararam de mostrar anos atrás. Ao meio-dia eu estava debaixo de um teto que não era meu, contando o que havia na mochila. Não era o bastante. Era um começo."
            ],
            "sign": "— R., entregador"
        }
    }
};
