/**
 * Dead Circuit, Portuguese (Brazil). Portuguese translation of en.js:
 * same keys, same array lengths, same order.
 *
 * Only the strings are translated. `id`, `tone`, `light`, `page` and `n`
 * values are unchanged, and {placeholders} are kept exactly as written.
 */
export default {
    code: 'pt',
    name: 'Português',
    dir: 'ltr',

    // Browser tab titles and descriptions, per page.
    titles: {
        store: 'Dead Circuit — Edição 01, {price}',
        storeDescription: 'Dead Circuit, edição 01. {price} até {deadline}. O relógio não volta.',
        read: 'Dead Circuit — Leia a edição',
        thanks: 'Dead Circuit — Pegue o arquivo',
        gate: 'dc@gate'
    },

    languageLabel: 'Idioma',

    store: {
        deadline: '11 nov. 2026, meia-noite (horário do leste dos EUA)',
        windowClosed: 'Janela fechada',
        barBuy: 'Metade do preço — {price}',
        fullPrice: 'Preço cheio {full}',
        heroAlt: 'Capa da Dead Circuit, edição 01.',
        dawnKicker: 'Amanhecer previsto · {deadline}',
        headlineOpen: 'Metade do preço até o amanhecer. Depois, dobra.',
        headlineClosed: 'A janela da metade do preço fechou.',
        priceNoteOpen: 'O preço real é {full}. Isto é metade, e o relógio não volta.',
        priceNoteClosed: 'Preço cheio.',
        clockLabel: 'Tempo restante até {deadline}',
        clockUnits: ['Dias', 'Horas', 'Min', 'Seg'],
        payCard: 'Pagar com cartão — {price}',
        payCrypto: 'Pagar com cripto',
        openingStripe: 'Abrindo o Stripe…',
        deck: '{pages} páginas. O cartão abre o Stripe em {price} e traz você de volta ao arquivo. Com cripto, é o mesmo arquivo assim que {price} cair em uma carteira.',
        cryptoNote: 'Envie {price} em uma rede só. É metade de {full}. Mande em uma única transferência, de uma carteira comum, e cole o id da transação em Pegue o arquivo.',
        copy: 'Copiar',
        copied: 'Copiado',
        alreadyPaid: 'Já pagou? Pegue o arquivo',
        lookInside: 'Veja o miolo da edição',
        paperKicker: 'No arquivo',
        paperTitle: 'O que {price}, pela metade, compra. O preço cheio é {full}.',
        voltKicker: 'O limite',
        voltTitle: 'Depois do amanhecer, isto dobra para {full}.',
        voltBuy: 'Leve a edição — {price}',
        endTitle: 'Metade do preço agora. {full} quando o relógio zerar.',
        endBody: 'No cartão, o Stripe cobra {price} e manda você direto ao arquivo. Em cripto, envie {price} para uma carteira e cole o id da transação em Pegue o arquivo. Depois de {deadline}, o preço é {full}.',
        endBuy: 'Pague {price}, metade de {full}',
        dockClosed: 'Fechado',
        dockLeft: '{d}d {h}h',
        noscript: 'A Dead Circuit precisa de JavaScript.'
    },

    reader: {
        wordmarkIssue: 'Edição 01',
        buy: 'Comprar · {price}',
        previous: 'Página anterior',
        next: 'Próxima página',
        getPdf: 'Baixar o PDF',
        pdfShort: 'PDF',
        pagesNav: 'Páginas'
    },

    thanks: {
        kicker: 'Dead Circuit · Edição 01',
        title: 'Pegue o arquivo.',
        intro: 'Pagou com cartão? O Stripe traz você de volta sozinho. Pagou com cripto? Cole a transação abaixo.',
        download: 'Baixar o PDF',
        chain: 'Rede',
        tx: 'Id da transação',
        txPlaceholder: '0x…, txid ou assinatura',
        check: 'Verificar pagamento',
        checking: 'Consultando a rede…',
        checkingStripe: 'Conferindo seu pagamento no cartão com o Stripe…',
        verified: 'Confirmado. O link vale por quinze minutos. Guarde o arquivo em um lugar seguro.',
        stuck: 'Travou? {link} com seu recibo ou o id da transação.',
        stuckLink: 'Chame no Telegram',
        back: 'Voltar à oferta',
        offline: 'Não deu para falar com a central. Confira sua conexão e tente de novo.'
    },

    // Answers from the payment check. {usd} and {need} are dollar amounts.
    errors: {
        'stripe-bad-id': 'Isso não é um id de checkout do Stripe.',
        'stripe-unknown': 'O Stripe não conhece esse checkout.',
        'stripe-unpaid': 'O Stripe ainda não marcou esse checkout como pago.',
        'stripe-wrong': 'Esse checkout não era da Dead Circuit.',
        'base-bad-hash': 'Um hash de transação da Base é 0x seguido de 64 caracteres hexadecimais.',
        'base-not-found': 'A Base não tem transação com esse hash. Confira, ou espere um minuto.',
        'base-pending': 'Essa transação ainda está pendente. Tente de novo em um minuto.',
        'tx-failed': 'Essa transação falhou na rede.',
        'eth-not-to-wallet': 'Essa transação não enviou ETH direto para a carteira da Dead Circuit.',
        'xrge-none': 'Essa transação não enviou XRGE para a carteira da Dead Circuit.',
        'btc-bad-id': 'Um id de transação de Bitcoin tem 64 caracteres hexadecimais.',
        'btc-not-found': 'O Bitcoin ainda não tem transação com esse id. Confira, ou espere alguns minutos.',
        'btc-none': 'Essa transação não enviou nada para a carteira da Dead Circuit.',
        'btc-unconfirmed': 'Já vimos. O Bitcoin precisa de uma confirmação, em geral dez minutos. Tente de novo depois disso.',
        'sol-bad-sig': 'Isso não parece uma assinatura da Solana.',
        'sol-not-found': 'A Solana ainda não tem transação confirmada com essa assinatura. Tente de novo em um minuto.',
        'sol-none': 'Essa transação não enviou SOL para a carteira da Dead Circuit.',
        'too-old': 'Esse pagamento é anterior a esta venda.',
        'too-little': 'Hoje esse pagamento vale cerca de US${usd}. A edição custa US${need}.',
        'bad-chain': 'Escolha a rede em que você pagou.',
        'used-up': 'Esse pagamento já foi usado para os downloads dele. Peça ajuda se ele for seu.',
        'throttled': 'Tentativas demais. Espere um minuto.',
        'unavailable': 'Não deu para verificar esse pagamento agora. Tente de novo em um minuto.',
        'unknown': 'Algo deu errado. Tente de novo.'
    },

    // The dc@gate terminal. Commands, file names and hex stay in English;
    // only what the machine says is translated. The man page is a puzzle
    // hint (capture = audio/Morse recording; repeating pad = repeating key;
    // textbook seal = textbook encryption).
    gate: {
        leave: 'Sair',
        boot: ['DEAD CIRCUIT GATE', 'A edição está à venda lá embaixo. Esta sala, não.', 'Digite help.'],
        readme: [
            'Operadores derivam o token de acesso e depois o enviam com submit.',
            'Turistas usam a porta lá de baixo.',
            'man gate — se você estiver mesmo perdido.'
        ],
        note: ['password: apocalypse', 'se isso funcionasse, todo mundo já estaria aqui dentro.'],
        man: [
            'Três camadas, nesta ordem.',
            'A captura é som.',
            'Esse som é a chave que se repete.',
            'O que ela abre é um selo de livro-texto.',
            'O texto claro do selo é o token.'
        ],
        catWhat: 'cat o quê',
        notText: 'lock.bin: não é texto. Use xxd.',
        noFile: 'arquivo inexistente: {arg}',
        xxdWhat: 'xxd o quê',
        notBinary: 'xxd: {arg}: não é um binário nosso',
        unknown: 'desconhecido: {cmd}',
        rejected: 'recusado.',
        granted: 'acesso liberado. o manual é seu.',
        prize: 'Leve a edição'
    },

    // ------------------------------------------------------------ the issue

    // Text written inline on the desktop spreads. `|` is a line break and
    // *word* is the highlighted word.
    sheet: {
        folioIssue: 'Edição 01',
        cover: {
            kicker: 'Dead Circuit · Trimestral de campo',
            title: 'Como|sobreviver a um|*apocalipse*|robô',
            deck: 'Um manual para quem pretende continuar sem graça, calado e vivo.',
            stamp: 'Edição',
            bar: 'Sem sinal. Sem heroísmo. Vinte e seis páginas.'
        },
        letter: {
            indexKicker: 'Como usar',
            indexTitle: 'Leia uma vez.|Depois vá.',
            kicker: 'Carta do editor',
            title: 'Seja desinteressante.',
            body: [
                'Máquinas são rápidas, incansáveis e conectadas. Você não é nada disso, e essa é a vantagem. Elas caçam o plano médio: a rodovia, o abrigo anunciado no rádio, o reencontro em casa.',
                'Esta edição é o trabalho: água que você sabe dosar, comida que você sabe contar, um fogareiro que fica do lado de fora, uma caixa de metal que mata sinal de rádio, dois esconderijos e um jeito de se comunicar que não acende um morro.'
            ],
            sign: 'Você ainda está aqui. — A redação'
        },
        contents: { kicker: 'Nesta edição', title: 'Vinte e três jeitos de continuar sem graça.' },
        minutes: {
            kicker: 'Os primeiros dez minutos',
            title: 'Parta do princípio de que a rede já é hostil.',
            photoAlt: 'Uma pessoa entra num beco, passando por uma rua de carros parados.',
            caption: 'Se a avenida parou, você já está atrasado. Saia pela lateral.'
        },
        pattern: { kicker: 'Não seja o humano médio', quote: 'A rota previsível é uma agenda com o seu nome.' },
        starve: {
            kicker: 'Logística, não lenda',
            title: 'Deixe as máquinas com fome.',
            dek: 'Elas precisam de energia, banda e um mecânico. Você precisa de água. Aja de acordo. Não tente hackear a revolta, a não ser que isso já fosse o seu trabalho.'
        },
        shelter: {
            photoAlt: 'Um porão de concreto com galões de água, um mapa de papel e uma única lâmpada.',
            caption: 'Abrigo bom é abrigo burro.',
            kicker: 'Onde você dorme',
            title: 'Um cômodo que não consegue ligar para casa.',
            foot: 'Água, depois comida, depois calor. Três dias de água antes de um esconderijo longo.'
        },
        move: {
            photoAlt: 'Um ciclista passa sob um viaduto à noite, com drones ao longe.',
            kicker: 'Deslocamento',
            title: 'Paredes, não sombras.',
            day: 'Dia',
            dayBody: 'Só sob cobertura densa. Mato, ruínas, galerias que você já conhece. Campo aberto é uma vitrine.',
            night: 'Noite',
            nightBody: 'Ande devagar. O escuro não esconde você do calor. Corte a linha de visada com uma parede.',
            rules: [
                'Atravesse uma pessoa por vez, no ponto mais estreito, e espere.',
                'Nunca viaje em comboio de faróis e motores.',
                'Guarde suprimentos em dois lugares. Se um queimar, você ainda come.'
            ]
        },
        people: { kicker: 'A variável real', title: 'Outros humanos.', pull: 'Sair procurando quem se atrasou é como grupos morrem.' },
        bots: {
            photoAlt: 'Um robô terrestre quadradão, com um único olho de câmera, espera num patamar de escada.',
            kicker: 'Identificação',
            title: 'Se encontrar um, identifique antes.',
            rule: 'Encurralado? Corte a linha de visada e mude de direção. O rastreamento segue o último vetor. Portas, não corredores. Fumaça uma vez, depois saia.'
        },
        specs: {
            kicker: 'Notas de campo',
            title: 'O folheto, corrigido.',
            source: 'Especificações e instruções de uso do Spot, da Boston Dynamics. Gao et al., Scientific Reports, 2021.'
        },
        arms: {
            kicker: 'Armamento',
            title: 'O que de fato atira de volta.',
            foot: 'Um teste dos EUA em 2017 chamou os drones de “muito resistentes a danos”. Clima, fio, um teto e o watt-hora fazem o resto. Não é receita, nem lista de compras.'
        },
        end: {
            kicker: 'Checklist de bolso',
            title: 'Oito linhas.',
            photoAlt: 'Uma subestação solta faíscas enquanto a cidade atrás dela apaga.',
            winsTitle: 'O que de fato vence',
            wins: [
                'Não é discurso de escolhido. É logística. Fábricas param. Redes se partem. Clima, lama e peças que faltam fazem o resto.',
                'Isto é ficção até deixar de ser. Os mesmos hábitos vencem um apagão, uma enchente, um terremoto. Treine a versão sem graça enquanto as torradeiras ainda estão do seu lado.'
            ],
            mark: 'Fim do sinal'
        }
    },

    // Text written inline in the single-column mobile edition.
    zine: {
        cover: {
            kicker: 'Trimestral de campo',
            title: 'Como sobreviver a um *apocalipse* robô',
            tagline: 'Sem graça. Calado. Vivo.'
        },
        letter: {
            body: [
                'Máquinas são rápidas, incansáveis e conectadas. Você não é nada disso, e essa é a vantagem. Elas caçam o plano médio: a rodovia, o abrigo anunciado no rádio, o reencontro em casa.',
                'Negue a elas dados, energia e um padrão. Fique vivo até a rede cair. Quando os enlaces se partem, o enxame vira só um monte de programas burros. Você ainda está aqui.'
            ]
        },
        minutes: { title: 'A rede já é hostil.', photoAlt: 'Uma pessoa entra num beco, passando por carros parados.' },
        pattern: { kicker: 'Não seja a média' },
        shelter: {
            photoAlt: 'Um abrigo no porão com água, um mapa de papel e uma única lâmpada.',
            kicker: 'Abrigo burro',
            foot: 'Água, depois comida, depois calor.'
        },
        move: {
            photoAlt: 'Um ciclista sob um viaduto, à noite.',
            day: 'Só sob cobertura densa. Campo aberto é uma vitrine.',
            night: 'Ande devagar. Sensor de calor não liga se está escuro.',
            foot: 'Atravesse um de cada vez. Nada de comboio de faróis. Guarde suprimentos em dois lugares.'
        },
        bots: {
            photoAlt: 'Um robô terrestre de um olho só num patamar de escada.',
            kicker: 'Se encontrar um',
            title: 'Identifique, depois contorne.',
            foot: 'Encurralado? Corte a visada, mude de direção, use portas. Fumaça uma vez, depois saia.'
        },
        arms: {
            foot: 'Um teste dos EUA em 2017 chamou os drones de “muito resistentes a danos”. Clima, fio, um teto e a bateria fazem mais que um gadget. Isto não é guia de montagem. Bloqueadores de sinal civis são ilegais.'
        },
        end: {
            photoAlt: 'Uma subestação solta um clarão enquanto o horizonte apaga.',
            title: 'Oito linhas. Depois, espere.',
            body: 'O que vence é logística: fábricas paradas, redes partidas, lama e peças que faltam. Isto é ficção até deixar de ser. Treine a versão sem graça enquanto as torradeiras ainda estão do seu lado.'
        }
    },

    // Structured magazine copy, shared by the desktop spreads and the zine.
    toc: [
      { n: '04', title: 'Dez minutos', page: 3, deck: 'Mate o sinal. Saia pela lateral.' },
      { n: '05', title: 'Setenta e duas horas', page: 4, deck: 'Um relógio, não um estado de espírito.' },
      { n: '06', title: 'Seja médio e perca', page: 5, deck: 'Multidões, rodovias e casa.' },
      { n: '07', title: 'Deixe as máquinas com fome', page: 6, deck: 'Energia, rádio, lentes, peças.' },
      { n: '08', title: 'Estação de água', page: 7, deck: 'Clarear, ferver, dosar, guardar.' },
      { n: '09', title: 'A despensa', page: 8, deck: 'Calorias que você sabe contar.' },
      { n: '10', title: 'Calor discreto', page: 9, deck: 'Um fogareiro que não mora dentro de casa.' },
      { n: '11', title: 'Orçamento de energia', page: 10, deck: 'Primeiro os watts-hora, depois o painel.' },
      { n: '12', title: 'A caixa morta', page: 11, deck: 'Uma gaiola de Faraday que você pode testar.' },
      { n: '13', title: 'Abrigo burro', page: 12, deck: 'Um cômodo que não consegue ligar para casa.' },
      { n: '14', title: 'Dois esconderijos', page: 13, deck: 'Secos, sem graça e longe de casa.' },
      { n: '15', title: 'Dejetos', page: 14, deck: 'Morro abaixo da água.' },
      { n: '16', title: 'Sangue e queimaduras', page: 15, deck: 'Pressão, depois um curso de verdade.' },
      { n: '17', title: 'Como se deslocar', page: 16, deck: 'Dia, noite e cobertura.' },
      { n: '18', title: 'Outros humanos', page: 17, deck: 'Grupo pequeno. Prazo rígido.' },
      { n: '19', title: 'Se encontrar um', page: 18, deck: 'Quatro máquinas. Uma regra.' },
      { n: '20', title: 'Notas de campo', page: 19, deck: 'Autonomia real, escadas, clima.' },
      { n: '21', title: 'O que os detém', page: 20, deck: 'O que exércitos usam. Não é receita.' },
      { n: '22', title: 'Portas, não armadilhas', page: 21, deck: 'Obstáculos que uma pessoa enxerga.' },
      { n: '23', title: 'O pulso', page: 22, deck: 'O que um PEM atinge de fato.' },
      { n: '24', title: 'Mensageiros', page: 23, deck: 'Pés e uma frase.' },
      { n: '25', title: 'Apague o vidro', page: 24, deck: 'Ferramentas prontas antes de escurecer.' },
      { n: '26', title: 'Checklist de bolso', page: 25, deck: 'Oito linhas. Espere a rede cair.' },
    ],

    primer: [
      { n: '01', title: 'Conte', deck: 'Galões, calorias, watts-hora. Se você não sabe contar, não sabe empacotar.' },
      { n: '02', title: 'Monte antes', deck: 'Água, blecaute, a caixa morta. Treine enquanto as luzes ainda funcionam.' },
      { n: '03', title: 'Sem capítulo de armas', deck: 'Bloqueadores de sinal civis são ilegais. Bomba de filme não é produto. Logística é.' },
      { n: '04', title: 'A lei continua valendo', deck: 'Seu terreno. Fogo dentro da lei. Isto é um manual de campo, não uma autorização.' },
    ],

    minutes: [
      {
        n: '01',
        title: 'Mate o seu sinal',
        body: 'Modo avião não basta. Desligue o celular. Tire a bateria, se der. Relógios, fones e chaves de carro também transmitem.',
      },
      {
        n: '02',
        title: 'Saia do vidro',
        body: 'Torres, shoppings, aeroportos, hospitais: cheios de sensores e difíceis de deixar. Térreo. Saída lateral. Longe das câmeras.',
      },
      {
        n: '03',
        title: 'Largue o carro novo',
        body: 'Um veículo moderno é um computador com rodas. Vá a pé, de bicicleta ou em algo velho e mecânico. Se o trânsito travar, desça.',
      },
      {
        n: '04',
        title: 'Uma mochila, e vá',
        body: 'Água, calorias, uma faca, um isqueiro, um mapa de papel, dinheiro vivo, remédios, calçado de verdade, um chapéu e uma lanterna que não seja um app.',
      },
    ],

    patterns: [
      { title: 'Horários e caminhos estranhos', body: 'Trilhas e cortes de ferrovia. Não a rodovia que o modelo já resolveu.' },
      { title: 'Fuja da multidão', body: 'Multidão é alvo e base de dados. Não vá para o abrigo anunciado.' },
      { title: 'Não volte para casa', body: 'Se seus aparelhos estavam ligados, sua casa já está na agenda.' },
      { title: 'Mude a silhueta', body: 'Outro casaco, um chapéu, nenhum logo chamativo em que as câmeras foram treinadas.' },
    ],

    hungers: [
      { need: 'Energia', deny: 'Não durma perto de geradores, subestações ou do último quarteirão iluminado.' },
      { need: 'Rádio', deny: 'Metal e porões. Nenhum transmissor no cômodo onde você de fato dorme.' },
      { need: 'Câmeras', deny: 'Capuz, cantos, mau tempo, escuro. Nunca faça pose num terreno aberto.' },
      { need: 'Consertos', deny: 'Fique longe de depósitos, aeroportos e data centers. Ali é a cozinha delas.' },
    ],

    shelterRules: [
      { k: 'Materiais burros', v: 'Concreto, tijolo ou terra. Poucas janelas. Uma porta que você controla.' },
      { k: 'Nada de casa inteligente', v: 'Nenhuma fechadura conectada, campainha com câmera ou assistente de voz.' },
      { k: 'Para baixo, não para cima', v: 'Porão ganha de cobertura. Cobertura é heliponto.' },
      { k: 'Blecaute', v: 'Uma luz à noite é uma coordenada. Janelas sempre apagadas.' },
      { k: 'Zona fria', v: 'Nenhum eletrônico da porta para dentro. Rádio bem longe, por pouco tempo, e depois mude de lugar.' },
    ],

    peopleRules: [
      { n: '01', t: 'Só rostos conhecidos', d: 'Grupo pequeno. Funções simples: água, vigia, saúde, rota.' },
      { n: '02', t: 'Nada de celular na roda', d: 'Quem está de vigia não está também cozinhando.' },
      { n: '03', t: 'Esconda o estoque', d: 'Gente desesperada vira o segundo apocalipse.' },
      { n: '04', t: 'Um ponto de encontro, não a casa', d: 'Combinem um prazo. Se alguém se atrasou, se atrasou.' },
      { n: '05', t: 'Planeje para os lentos', d: 'Crianças e feridos mudam a rota. Decida isso antes de sair andando.' },
    ],

    machines: [
      { kind: 'Sensor', name: 'Torreta e lente', body: 'Fixa, entediada, letal dentro de um cone. Câmeras odeiam reflexo, poeira e obstrução. Dê a volta.' },
      { kind: 'Terrestre', name: 'O cão de noventa minutos', body: 'Um quadrúpede atual pesa uns 34 kg e anda a 1,6 m/s, até a bateria acabar. Escada e lama são onde o folheto termina.' },
      { kind: 'Aéreo', name: 'O que odeia o tempo', body: 'Muitos drones pequenos são homologados para vento de uns 10 m/s. Um vento contra pode queimar um terço da bateria. Entre debaixo de um teto.' },
      { kind: 'Humanoide', name: 'O robô de pôster', body: 'Dramático, e em geral com equilíbrio pior que uma máquina de esteiras. Bagunça e uma porta fechada ainda ajudam você.' },
    ],

    specs: [
      { n: '90 min', l: 'Autonomia com pernas', d: 'Duração típica publicada de um Spot, da Boston Dynamics. Cerca de 60 minutos com carga. Só a bateria pesa 5,2 kg.' },
      { n: '1.6 m/s', l: 'Não é um carro', d: 'Velocidade máxima nominal do Spot. Rápido em piso plano. Uma escada apertada é outro esporte.' },
      { n: '3 cm', l: 'O que ele não vê', d: 'O manual: objetos finos com menos de 3 cm, vidro e bordas de desnível sem proteção podem enganar a detecção de obstáculos.' },
      { n: 'Face up', l: 'Regra da escada', d: 'O Spot só sobe de frente para o alto da escada. Não em degraus vazados ou de grade. Não o vire em cima dos degraus.' },
      { n: '−20°C', l: 'Imposto do frio', d: 'A faixa publicada vai de −20°C a 55°C. O frio encolhe a capacidade da bateria. Lama e neve aumentam o gasto de cada passo.' },
      { n: '5.7 h', l: 'Dia de voo', d: 'Um estudo da Scientific Reports: a mediana de horas por dia em que um drone pequeno comum consegue voar, no mundo todo, contando o clima.' },
    ],

    arms: [
      { name: 'Bloqueadores', d: 'A ferramenta comum. Corte o link de rádio ou de GPS e muitos drones pairam, pousam ou voltam para a base. Um drone de fibra óptica ignora isso. As trilhas de cabo na Ucrânia provaram. Bloqueadores civis são ilegais. Esta página não é um esquema.' },
      { name: 'Redes', d: 'Uma minoria dos sistemas reais, em geral a menos de 250 metros. Se o paraquedas falhar, a máquina cai do mesmo jeito em quem estiver embaixo.' },
      { name: 'Lasers', d: 'Armas montadas em veículo: Strykers do Exército dos EUA com 50 kW, o Iron Beam de Israel. Um alvo, alguns segundos de exposição, ar limpo. Neblina, chuva e poeira espalham o feixe.' },
      { name: 'Micro-ondas', d: 'Micro-ondas de alta potência atingem um enxame em um único pulso. O Leonidas é um veículo. A granada de PEM dos filmes não é isso. Cascos de metal ignoram boa parte do que se vende na internet.' },
      { name: 'Armas de fogo', d: 'Abate cinético funciona, e depois os destroços caem. Um drone barato pode custar menos que o míssil. Exércitos treinam equipes com escopeta. Isso é uma unidade com regras, não uma lista de compras.' },
    ],

    checklist: [
      { n: '1', t: 'Rádios desligados. O resto vai para a caixa morta.' },
      { n: '2', t: 'Saia pela lateral. Uma mochila. Não volte para casa.' },
      { n: '3', t: 'Um galão (cerca de 3,8 L) por pessoa, por dia. Ferva por um minuto.' },
      { n: '4', t: 'Nenhum fogareiro no cômodo onde se dorme.' },
      { n: '5', t: 'Dois esconderijos. Só uma pessoa sabe do segundo.' },
      { n: '6', t: 'Dejetos vão morro abaixo, longe da água.' },
      { n: '7', t: 'Pressão no sangramento. Treine o torniquete agora.' },
      { n: '8', t: 'Mensageiros, não rádios. Espere a rede cair.' },
    ],

    builds: [
      {
        id: 'day',
        tone: 'tone-paper',
        light: false,
        kicker: 'O relógio',
        title: 'As primeiras setenta e duas horas.',
        dek: 'Decida o dia antes de estar cansado. Escreva os horários no papel.',
        foot: 'Se na hora doze você ainda está fazendo compras, está atrasado.',
        steps: [
          { n: '00', title: 'Saia', body: 'Porta lateral. Rádios desligados. Uma mochila. Não atravesse o saguão principal, a avenida principal nem a frente do seu próprio prédio.' },
          { n: '01', title: 'Um teto, não a casa', body: 'Fique sob um abrigo que não seja o seu endereço. Beba água. Esvazie a mochila no chão e veja o que de fato tem nela.' },
          { n: '04', title: 'Água em andamento', body: 'Três dias na prateleira, ou você ainda está andando. Um galão (cerca de 3,8 L) por pessoa por dia é o número. Água engarrafada conta. Água de rio sem tratamento, não.' },
          { n: '12', title: 'O cômodo apaga', body: 'Janelas vedadas por dentro. Balde de dejetos no plano. Nada de fogo depois do anoitecer. Uma pessoa acordada, e ela não está cozinhando.' },
          { n: '24', title: 'O segundo lugar', body: 'Ponto de encontro e esconderijo ficam na sua cabeça, não num pin. Uma outra pessoa sabe o ponto de encontro. Ela não sabe os dois esconderijos.' },
          { n: '72', title: 'O esconderijo longo', body: 'Se a rede ainda está de pé e ainda procurando, você come frio e só se move para buscar água. Curiosidade é como as pessoas entram na contagem.' },
        ],
      },
      {
        id: 'water',
        tone: 'tone-ink',
        light: true,
        kicker: 'Monte',
        title: 'Uma estação de água.',
        dek: 'Clareie, ferva ou dose, depois guarde. Filtro sozinho não é segurança.',
        foot: 'Orientação do CDC para água em emergências. A FEMA calcula um galão (cerca de 3,8 L) por pessoa por dia.',
        steps: [
          { n: '01', title: 'Classifique a fonte', body: 'Primeiro, garrafas lacradas. Depois, água que você pode ferver. Em seguida, chuva de um telhado limpo. Rio por último. Nunca enchente, piscina ou radiador.' },
          { n: '02', title: 'Clareie', body: 'Passe por um pano, papel-toalha ou filtro de café. Se estiver turva, deixe decantar e retire a água limpa de cima. Lama esconde germes.' },
          { n: '03', title: 'Ferva', body: 'Fervura forte por um minuto. Acima de 6.500 pés (cerca de 2.000 m), três minutos. Deixe esfriar. Ferver ganha de um aparelho que você nunca testou.' },
          { n: '04', title: 'Ou dose', body: 'Água sanitária sem perfume, só hipoclorito de sódio a 5–9%. Água limpa: 8 gotas (cerca de 0,5 mL) por galão (cerca de 3,8 L). Turva ou muito fria: 16 gotas. Mexa. Espere 30 minutos. O certo é um leve cheiro de cloro.' },
          { n: '05', title: 'Guarde', body: 'Galões próprios para alimentos, cheios, datados, longe do sol. Para limpar um galão: 1 colher de chá dessa água sanitária em um quarto de galão (cerca de 0,95 L) de água, molhe todo o interior, espere 30 segundos, despeje, deixe secar ao ar.' },
          { n: '06', title: 'Use', body: 'Um galão (cerca de 3,8 L) por pessoa por dia cobre beber e se lavar um pouco. Os animais também bebem a água fervida. Não mergulhe um copo sujo no galão.' },
        ],
      },
      {
        id: 'food',
        tone: 'tone-paper',
        light: false,
        kicker: 'Monte',
        title: 'Uma despensa que você sabe contar.',
        dek: 'Calorias primeiro. Marca é hobby.',
        foot: 'Comida seca sem água é um tijolo. Guarde os galões junto com o arroz.',
        steps: [
          { n: '01', title: 'Bocas vezes dias', body: 'Pessoas × dias × 2.000 calorias. Um adulto andando gasta mais. Criança não é meio adulto. Escreva o número antes de comprar.' },
          { n: '02', title: 'Compre o sem graça', body: 'Arroz, aveia, óleo, pasta de amendoim, feijão seco, sal, leite em pó, peixe enlatado. Óleo é caloria concentrada. Salgadinho bonito não é plano.' },
          { n: '03', title: 'Date a prateleira', body: 'Primeiro que entra, primeiro que sai. Lata sem data é um palpite. Coma o palpite enquanto ainda dá para repor.' },
          { n: '04', title: 'Divida a pilha', body: 'Metade onde você dorme. Metade no segundo esconderijo. Um incêndio não pode acabar com a comida.' },
          { n: '05', title: 'Cozinhe em silêncio', body: 'Comida fria nos dias em que você está escondido. Comida quente só quando fumaça e cheiro não vão atrair a rua. Fim da manhã, não o anoitecer.' },
          { n: '06', title: 'Água para a refeição', body: 'Uma xícara de arroz cru pede umas duas xícaras de água. Se a água não está no mesmo cômodo que o arroz, você não tem uma refeição.' },
        ],
      },
      {
        id: 'heat',
        tone: 'tone-hazard',
        light: false,
        kicker: 'Monte',
        title: 'Calor discreto.',
        dek: 'Um fogareiro pequeno, do lado de fora, apagado antes de escurecer. Monóxido de carbono não é simulação.',
        foot: 'Nunca queime carvão, nem use fogareiro algum, no cômodo onde as pessoas dormem.',
        steps: [
          { n: '01', title: 'Só do lado de fora', body: 'Nenhum fogareiro no quarto. Nada de “só um minutinho”. Nada de carvão dentro de casa. O gás mata antes do fogo.' },
          { n: '02', title: 'Duas latas de aço', body: 'A lata grande é o corpo. Corte na base uma portinha de combustível da largura de um polegar. Uma lata menor, sem as duas tampas, é a chaminé, encaixada num furo no topo.' },
          { n: '03', title: 'Gravetos, não lixo', body: 'Madeira seca da grossura de um lápis. Nada de madeira tratada, plástico ou papelão molhado. Galhos curtos. Um fogo pequeno e quente, não uma fogueira.' },
          { n: '04', title: 'Panela na chaminé', body: 'A chama deve bater na panela. Panela que veda a chaminé mata a tiragem. Chão firme. Se tombar, derrama água fervendo no único cozinheiro.' },
          { n: '05', title: 'Apagado antes do anoitecer', body: 'Fumaça é uma coluna. Cozinhe no fim da manhã. Afogue as brasas. Nenhuma brasa acesa depois de escurecer. O cheiro vai mais longe do que você imagina.' },
          { n: '06', title: 'Três jeitos de acender', body: 'Fósforos numa lata, um isqueiro, uma pederneira de ferrocério. Treine uma vez nesta semana. Arco de fricção é hobby. Não é o plano.' },
        ],
      },
      {
        id: 'power',
        tone: 'tone-paper',
        light: false,
        kicker: 'Monte',
        title: 'Um orçamento de energia.',
        dek: 'Diga quantos watts-hora antes de comprar o painel.',
        foot: 'Visto de cima, um painel é um espelho. Carregue, depois cubra.',
        steps: [
          { n: '01', title: 'Anote a carga', body: 'Watts × horas = watts-hora. Um celular a 5 watts por 3 horas dá 15 Wh. Um notebook pode comer 60 Wh numa tarde. Sem número, sem plano.' },
          { n: '02', title: 'Dimensione o painel', body: 'Watts-hora ÷ horas de sol ÷ 0,7. Quatro horas boas e um painel de 100 W dão cerca de 280 Wh depois das perdas. Nuvens cortam isso. O inverno corta de novo.' },
          { n: '03', title: 'Dimensione a bateria', body: 'Chumbo-ácido: use metade dos amperes-hora nominais. 12 volts × 100 Ah × 0,5 dá 600 Wh. Lítio-ferro-fosfato: dá para usar quase tudo da placa. Teste. Não chute.' },
          { n: '04', title: 'Fique nos 12 volts', body: 'Um inversor desperdiça uma fatia ao transformar a energia da bateria em energia de tomada. Carregue celulares por USB. Dispense o inversor até algo realmente precisar de tomada.' },
          { n: '05', title: 'Esconda o brilho', body: 'Carregue ao meio-dia. Depois cubra o painel ou leve para dentro. Um retângulo brilhante no telhado é um alvo.' },
          { n: '06', title: 'Luz sem ele', body: 'Um lampião e pilhas extras ainda funcionam quando o controlador de carga morre. Energia é bônus. Água e fogo são o plano.' },
        ],
      },
      {
        id: 'faraday',
        tone: 'tone-ink',
        light: true,
        kicker: 'Monte',
        title: 'A caixa morta.',
        dek: 'Uma lata de metal que realmente bloqueia rádio. Teste. Não confie na tampa.',
        foot: 'Se o rádio de teste ainda toca, a vedação é mentira.',
        steps: [
          { n: '01', title: 'Metal contínuo', body: 'Uma lixeira de aço, uma caixa de munição ou uma lata de biscoito. A tampa precisa encostar em metal em toda a volta. Tinta e borracha de vedação podem isolar a tampa. Raspe um ponto de contato, ou feche a fresta com papel-alumínio.' },
          { n: '02', title: 'Isole por dentro', body: 'Papelão ou pano para o celular não encostar no metal. A blindagem é a caixa, não o aparelho.' },
          { n: '03', title: 'Desligue', body: 'Desligado. Bateria fora, se ela sair. Um celular ligado continua sendo um celular até a tampa estar realmente fechada.' },
          { n: '04', title: 'Nenhum fio sai', body: 'Um cabo de carregador passando pela tampa é uma antena. Nada sai. Nem fone de ouvido. Nem um cabo USB “fininho”.' },
          { n: '05', title: 'Feche e teste', body: 'Sintonize um rádio a pilha numa estação forte. Coloque dentro. Feche a tampa. A estação tem que sumir. Se você ainda ouvir, conserte a tampa e teste de novo.' },
          { n: '06', title: 'Duas caixas', body: 'O quarto fica com a caixa que não se abre. Os rádios que você talvez use ficam numa segunda caixa, aberta longe das camas, rapidamente, e aí você sai.' },
        ],
      },
      {
        id: 'cache',
        tone: 'tone-paper',
        light: false,
        kicker: 'Monte',
        title: 'Dois esconderijos.',
        dek: 'Se acharem um, você ainda come. Nenhum dos dois é a sua casa.',
        foot: 'No seu terreno, ou em terreno onde você tem permissão. Balde enterrado em terra alheia é crime.',
        steps: [
          { n: '01', title: 'Dois locais', body: 'Nem a sua casa, nem o seu carro, nem a sua caixa de correio. Longe o bastante um do outro para uma busca não achar os dois.' },
          { n: '02', title: 'Seco e sem graça', body: 'Um balde com vedação, ou um cano de PVC com tampões, fechado com fita. Dentro: calorias, uma reserva dos remédios, dinheiro vivo, um mapa de papel, fósforos, meias extras. Nada de celular.' },
          { n: '03', title: 'Nada que brilhe', body: 'Evite a manta metalizada barulhenta, se puder. Um saco zip dentro do balde basta. Brilho é como um buraco raso é notado.' },
          { n: '04', title: 'Memória, não pin', body: 'Três pontos de referência e uma contagem de passos. Não escreva “cave aqui” no caderno que você carrega todo dia.' },
          { n: '05', title: 'Divida o segredo', body: 'Uma pessoa sabe do local A. Outra pessoa sabe do local B. O grupo inteiro não sabe dos dois.' },
          { n: '06', title: 'Visite pouco', body: 'Confira depois de uma chuva forte, e numa data que você não vai esquecer. A mesma hora todo sábado é um padrão. Um padrão é um encontro marcado.' },
        ],
      },
      {
        id: 'waste',
        tone: 'tone-paper',
        light: false,
        kicker: 'Monte',
        title: 'Um plano para os dejetos.',
        dek: 'Mãos sujas esvaziam um acampamento mais rápido que um drone.',
        foot: 'Mantenha os dejetos humanos morro abaixo de qualquer água que você bebe. Trinta metros é uma distância que funciona.',
        steps: [
          { n: '01', title: 'Morro abaixo', body: 'Dejeto não fica acima da nascente, do barril ou do galão. Se o terreno desce na direção da sua água, você escolheu o canto errado.' },
          { n: '02', title: 'Um balde', body: 'Um assento, um saco por dentro e uma pá de serragem, turfa ou cinza depois de cada uso. Tampa fechada. Moscas são como a próxima pessoa fica doente.' },
          { n: '03', title: 'Não queime plástico', body: 'Enterre o saco ou leve com você quando mudar de lugar. Plástico queimando é cheiro, coluna e veneno.' },
          { n: '04', title: 'Mãos', body: 'Sabão, depois um pouco de água limpa, toda vez, antes de comer e depois do balde. Este passo salva mais gente que um kit de herói.' },
          { n: '05', title: 'Um canto dos doentes', body: 'Vômito e diarreia ganham balde e copo próprios. Quem está bem não divide nenhum dos dois.' },
          { n: '06', title: 'Nada de pilha de lixo', body: 'Latas e embalagens são um cardápio e um mapa. Enterre os restos de comida ou leve com você. Não empilhe na porta.' },
        ],
      },
      {
        id: 'med',
        tone: 'tone-ink',
        light: true,
        kicker: 'Monte',
        title: 'Sangue e queimaduras.',
        dek: 'Pare o sangramento. Resfrie a queimadura. Não vire cirurgião por causa de uma página.',
        foot: 'Faça um curso Stop the Bleed (controle de hemorragias) numa terça-feira qualquer. Diagrama não é prática.',
        steps: [
          { n: '01', title: 'O kit, agora', body: 'Luvas, atadura de rolo, curativo compressivo, esparadrapo, tesoura, sabão, sais de reidratação oral, as suas receitas de verdade e as doses escritas no papel.' },
          { n: '02', title: 'Um torniquete de verdade', body: 'Compre um. Treine em você mesmo antes de alguém estar sangrando. Um cinto improvisado na hora é um plano pior que o curso.' },
          { n: '03', title: 'Pressão primeiro', body: 'Sangramento com risco de vida: luvas, pano dentro do ferimento, o seu peso em cima. Não tire o pano encharcado para olhar. Ponha mais pano.' },
          { n: '04', title: 'Depois o torniquete', body: 'Se a pressão falhar e o sangramento for num braço ou numa perna: alto e apertado, acima do ferimento, não sobre uma articulação. Anote a hora. A partir daí você segura, não investiga.' },
          { n: '05', title: 'Queimaduras', body: 'Água limpa e fresca por vinte minutos. Sem gelo. Sem manteiga. Sem óleo. Depois, uma cobertura limpa e seca. Queimadura grande precisa de clínica, se ainda existir clínica.' },
          { n: '06', title: 'O limite', body: 'Você não corta. Você não “drena” um tórax. Você mantém as pessoas aquecidas, dando goles de soro de reidratação limpo, e leva todos na direção da ajuda, se houver ajuda.' },
        ],
      },
      {
        id: 'denial',
        tone: 'tone-hazard',
        light: false,
        kicker: 'Não é armadilha',
        title: 'Portas, não armadilhas.',
        dek: 'Um dispositivo que dispara, cai ou prende quando algo chega vai acertar uma criança antes de acertar um robô.',
        foot: 'Se uma pessoa pode acioná-lo andando, é uma armadilha. Armadilhas são ilegais porque não conferem quem apareceu.',
        steps: [
          { n: '01', title: 'O limite', body: 'Nada de fossos, estacas, fios no escuro ou qualquer coisa que balance, caia ou queime quando um gatilho é acionado. Quem cai nela não vai ser você.' },
          { n: '02', title: 'Feche a porta', body: 'Uma porta maciça fechada não é armadilha. Calce. Desative a abertura automática. A maioria dos robôs terrestres é ruim com maçanetas, e a porta não se importa se o próximo no corredor é um vizinho.' },
          { n: '03', title: 'Use a escada', body: 'Degraus vazados, uma grade, uma curva no patamar. Robôs com pernas documentados sobem de frente e são orientados a evitar essas escadas. Você está usando o prédio. Não está escondendo um buraco.' },
          { n: '04', title: 'Bagunça visível', body: 'Cadeiras, uma bicicleta, uma mangueira, num corredor que você marcou para o seu pessoal. Bagunça que se vê é obstáculo. Fio escondido é armadilha. Não estique nada atravessando uma rua.' },
          { n: '05', title: 'Uma lata barulhenta', body: 'Linha de pesca de uma porta que é sua até uma lata com pedrinhas. Fita no batente para o seu pessoal ver. Faz barulho. Não dispara nada. Desmonte quando for embora.' },
          { n: '06', title: 'O cômodo errado', body: 'Um abajur com timer num galpão onde você não dorme. Elas gastam a bateria na porta errada. Tire da tomada toda base de carregamento. Se algo estiver mesmo na sua porta, você sai. Não fica para assistir.' },
        ],
      },
      {
        id: 'emp',
        tone: 'tone-ink',
        light: true,
        kicker: 'O pulso',
        title: 'O que um PEM atinge de fato.',
        dek: 'O alvo é o fio comprido. Um robô com bateria própria é um alvo pequeno.',
        foot: 'Rádios reserva ficam na caixa morta, fora da tomada. Irradiar um pulso para queimar eletrônicos é crime. Isto não é um esquema.',
        steps: [
          { n: '01', title: 'Dois eventos diferentes', body: 'Uma explosão nuclear no alto, sobre um continente, pode atingir a rede elétrica. Isso é o E1, rápido, nas linhas longas, e depois uma cauda lenta que cozinha transformadores grandes. Granada de filme não é isso.' },
          { n: '02', title: 'O fio é a antena', body: 'Linhas de energia, linhas telefônicas e antenas longas captam o pulso. Um celular desligado, sem bateria, dentro da caixa morta, é um alvo difícil. Um robô com cabos de bateria curtos está mais perto do celular que da subestação.' },
          { n: '03', title: 'Desconecte ao primeiro aviso', body: 'Tire os plugues. Desconecte antenas. Rádios desligados, pilhas fora, para dentro da caixa. Faça o treino num domingo normal. Na hora, você não vai improvisar.' },
          { n: '04', title: 'O que costuma sobreviver', body: 'Equipamento pequeno a pilha que já estava desligado. Diesel sem computador. Um relógio. Fibra no lugar de cobre. Não aposte a fuga num carro moderno. Testes fizeram alguns veículos morrerem. Não transformaram todo carro num tijolo, e o seu não é garantia.' },
          { n: '05', title: 'O que morre primeiro', body: 'Computadores na tomada, qualquer coisa com fio comprido e a própria rede elétrica, se o pulso foi do tipo real, nacional. Isso apaga uma região. Não entrega a você um robô morto na escada.' },
          { n: '06', title: 'Você não vai construir um', body: 'A versão militar é um míssil ou um caminhão: o CHAMP, ou um veículo de micro-ondas de alta potência. O alcance cai rápido. Uma bobina e um capacitor de fórum quase sempre destroem a si mesmos. Clima, uma porta e uma bateria descarregada ainda ganham dele.' },
        ],
      },
      {
        id: 'runners',
        tone: 'tone-paper',
        light: false,
        kicker: 'Monte',
        title: 'Mensageiros, não rádios.',
        dek: 'Uma frase falada não acende um morro.',
        foot: 'Se precisar transmitir, faça longe das camas. Trinta segundos. Depois saia.',
        steps: [
          { n: '01', title: 'Uma lista no papel', body: 'Nomes, dois pontos de encontro, dois horários. Não ponha o endereço de onde vocês dormem na mesma página dos nomes, se der para separar.' },
          { n: '02', title: 'Duas janelas', body: 'Uma janela de manhã e uma ao anoitecer. Perdeu as duas, você está atrasado. O grupo não sai procurando você nas estradas.' },
          { n: '03', title: 'Pés', body: 'Um mensageiro leva uma frase. Não leva rádio, celular, nem o plano inteiro no bolso.' },
          { n: '04', title: 'Palavras simples', body: '“O local dois está ruim.” Combinem as palavras agora. Um código esperto que você esquece é pior que português claro.' },
          { n: '05', title: 'Uma luz coberta', body: 'Uma piscada abafada, e só se vocês combinaram o que ela significa. Lanterna balançada para o céu é sinalizador.' },
          { n: '06', title: 'Crianças', body: 'Levam um nome e um ponto de encontro que conseguem dizer em voz alta. Não levam o celular, a lista, nem a tarefa de ser corajosas.' },
        ],
      },
      {
        id: 'tools',
        tone: 'tone-volt',
        light: false,
        kicker: 'Monte',
        title: 'Apague o vidro.',
        dek: 'Termine isto enquanto ainda dá para ver o trabalho.',
        foot: 'Filtro de areia deixa a água mais clara. Não deixa a água segura. Depois, ferva ou use água sanitária.',
        steps: [
          { n: '01', title: 'Por dentro da vidraça', body: 'Papelão cortado no tamanho do vidro, pano escuro por cima, preso com fita por dentro. Fita do lado de fora avisa a rua que tem alguém escondido.' },
          { n: '02', title: 'Uma luz', body: 'Fraca, baixa, apontada para o chão, no cômodo sem janela. O corredor fica escuro. Cômodo iluminado é coordenada.' },
          { n: '03', title: 'Corda comprada', body: 'Paracord ou linha trançada, já na mochila. Aprender nó com cipó molhado na primeira noite é como mochilas se perdem.' },
          { n: '04', title: 'Um pote que clareia', body: 'Pano, depois areia, depois carvão triturado, num pote limpo. Essa pilha só tira a lama. Você ainda ferve por um minuto, ou dosa com água sanitária.' },
          { n: '05', title: 'Um fio afiado', body: 'Uma faca que você já sabe segurar. Afie nesta semana. Lâmina cega escorrega na mão que alimenta você.' },
          { n: '06', title: 'Papel', body: 'Mapa, doses, a lista, um lápis, este checklist. Um saco zip. Não plastifique um espelho. Brilho é um hábito que dá para cortar.' },
        ],
      },
    ],

    pages: [
      'Capa',
      'A carta',
      'Sumário',
      'Dez minutos',
      'Setenta e duas horas',
      'Padrão',
      'Deixe-as com fome',
      'Água',
      'Despensa',
      'Calor discreto',
      'Energia',
      'Caixa morta',
      'Abrigo',
      'Esconderijos',
      'Dejetos',
      'Sangue e queimaduras',
      'Deslocamento',
      'Pessoas',
      'Máquinas',
      'Notas de campo',
      'Armamento',
      'Portas, não armadilhas',
      'O pulso',
      'Mensageiros',
      'Blecaute',
      'Checklist',
    ],
};
