/** Dread_OS strings, area "term" (ru). Mirrors en/term.js key for key. */
export default {
    banner: {
        title: '{os} {version} -- оболочка dsh',
        connected: 'Подключён как {handle}. Набери `help`, чтобы осмотреться.'
    },
    shell: {
        notFound: 'dsh: команда не найдена: {name}',
        notFoundHint: 'список команд — `help`.',
        failed: 'dsh: сбой {name}: {error}'
    },
    // Что `help` пишет о каждой команде. Сами команды остаются английскими.
    commands: {
        help: 'список команд',
        about: 'кто держит эту машину',
        whoami: 'текущий пользователь',
        projects: 'текущие проекты',
        repos: 'избранные репозитории',
        links: 'где ещё меня найти',
        chain: 'RougeChain, постквантовый L1 -- вживую',
        xrge: 'рынок XRGE вживую (Base)',
        neofetch: 'сводка по системе',
        theme: 'сменить акцент (theme <имя>)',
        matrix: 'вкл/выкл цифровой дождь',
        netrun: 'подключиться: взлом протокола, забеги вживую в RougeChain',
        date: 'системное время',
        echo: 'вывести аргументы',
        sudo: 'повысить привилегии',
        clear: 'очистить экран',
        exit: 'закрыть терминал',
        lang: 'язык интерфейса (lang <код>)'
    },
    help: {
        heading: 'Доступные команды:',
        hint: 'Tab дополняет, ↑/↓ листают историю.'
    },
    projects: {
        status: {
            live: 'в сети',
            wip: 'в работе',
            archived: 'архив',
            game: 'игра'
        }
    },
    repos: {
        stars: { one: '{n} звезда', few: '{n} звезды', many: '{n} звёзд', other: '{n} звезды' },
        footer: 'Шесть языков, 33 публичных репозитория.'
    },
    chain: {
        querying: 'опрашиваю ноду RougeChain...',
        chain: 'сеть',
        height: 'высота',
        heightValue: '{height}  (финализировано {finalized})',
        validators: 'валидаторы',
        peers: 'пиры',
        burned: 'сожжено',
        unreachable: 'нода не отвечает -- сама сеть, скорее всего, жива; загляни в эксплорер.',
        site: 'сайт',
        explorer: 'эксплорер',
        buy: 'купить XRGE',
        coinbase: 'coinbase'
    },
    xrge: {
        querying: 'опрашиваю DEXScreener...',
        noPair: 'у XRGE пока нет проиндексированного пула ликвидности.',
        contract: 'контракт: {address}',
        unreachable: 'источник рыночных данных не отвечает.',
        heading: 'XRGE на Base -- токен RougeChain',
        price: 'цена',
        change: '24 ч',
        marketCap: 'капитализация',
        liquidity: 'ликвидность',
        volume: 'объём 24 ч',
        venue: 'площадка'
    },
    neofetch: {
        os: 'ОС',
        shell: 'Оболочка',
        theme: 'Тема',
        engine: 'Движок',
        screen: 'Экран',
        uptime: 'Аптайм',
        uptimeValue: '{n} с'
    },
    theme: {
        current: 'текущая: {theme}',
        available: 'доступны: {list}',
        unknown: 'темы «{name}» нет. варианты: {list}',
        set: 'тема переключена: {name}'
    },
    matrix: {
        stopped: 'дождь кончился.',
        started: 'следуй за белым кроликом. `matrix` ещё раз — и дождь стихнет.'
    },
    netrun: {
        launching: 'запускаю netrun.exe…'
    },
    sudo: {
        denied: '{user} нет в файле sudoers. Об этом инциденте будет доложено.'
    },
    lang: {
        current: 'язык: {code}  {name}',
        available: 'доступны:',
        usage: 'сменить: `lang <код>`, например `lang {example}`.',
        already: '{name} уже включён.',
        switching: 'переключаюсь на {name}…',
        unknown: 'языка «{code}» нет. варианты: {list}'
    }
};
