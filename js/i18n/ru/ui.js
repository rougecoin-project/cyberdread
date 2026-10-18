/** Dread_OS strings, area "ui" (ru): index.html and the desktop shell. Mirrors en/ui.js key for key. */
export default {
    meta: {
        title: 'CyberDread — {Dread_OS}',
        description: '{Dread_OS} — киберпанк-рабочий стол прямо в браузере. Игры, музыка, рабочий терминал и RougeChain — постквантовый блокчейн первого уровня (мейннет запущен) с живой статистикой сети и рыночными данными XRGE.'
    },

    boot: {
        title: 'ИНИЦИАЛИЗАЦИЯ {Dread_OS}...',
        start: 'Запустить систему',
        reconnect: 'Переподключиться',
        buildDate: 'Дата сборки: {date}',
        hardware: 'Ядра: {cores}    Экран: {viewport}',
        coresUnknown: 'н/д',
        systemCheck: 'Проверка системы: OK',
        memoryTest: 'Тест памяти: ПРОЙДЕН',
        steps: [
            'Инициализация нейроинтерфейса...',
            'Подключение к киберпространству...',
            'Загрузка протоколов ICE...',
            'Обход защиты...',
            'Вход в {os}...'
        ]
    },

    apps: {
        files: 'Файлы',
        music: 'Музыка',
        settings: 'Настройки',
        store: 'Магазин',
        power: 'Питание'
    },

    taskbar: {
        start: 'Пуск',
        startMenu: 'Меню «Пуск»',
        user: 'нетраннер · {Dread_OS}',
        tickerNoPair: 'У XRGE пока нет проиндексированного пула ликвидности.',
        tickerOffline: 'Источник рыночных данных недоступен.',
        tickerLive: 'XRGE, токен RougeChain, в реальном времени. Нажми, чтобы открыть панель RougeChain.'
    },

    home: {
        status: 'Статус',
        desktop: 'Рабочий стол',
        block: 'Блок {height}',
        mainnet: 'Мейннет RougeChain',
        reset: 'Сбросить',
        done: 'Готово',
        editing: 'Правка главного экрана. Перетащи значок, чтобы переместить его. «Готово» — закончить.',
        saved: 'Главный экран сохранён.',
        homeButton: 'Домой'
    },

    tour: {
        start: 'Добро пожаловать, нетраннер! Жми «Пуск», чтобы открыть главное меню.',
        files: 'Открой «Файлы», чтобы покопаться в данных.',
        music: 'Загляни в «Музыку» — там есть что послушать.',
        terminal: 'Открой «term.exe» и набери help — весь сайт доступен из командной строки.',
        access: 'Через «access.exe» можно выйти на связь с другими чумбами.'
    },

    window: {
        maximize: 'Развернуть',
        close: 'Закрыть',
        terminal: 'Терминал',
        terminalInput: 'Ввод в терминал',
        netrun: 'netrun.exe — взлом протокола'
    },

    access: {
        label: 'Зашифрованный доступ',
        text: 'Обнаружен зашифрованный сетевой доступ. Запустить расшифровку?',
        decrypt: 'РАСШИФРОВАТЬ',
        abort: 'ОТМЕНА'
    },

    shutdown: {
        label: 'Выключение',
        question: 'Выключить систему?',
        yes: 'Да',
        no: 'Нет',
        screen: 'ВЫКЛЮЧЕНИЕ...'
    },

    settings: {
        title: 'Настройки',
        language: 'Язык',
        accent: 'Цвет',
        display: 'Экран',
        crt: 'Строки развёртки и мерцание CRT',
        motion: 'Анимации и глитч-эффекты',
        tilt: 'Глубина наклона (обои двигаются, когда наклоняешь телефон)',
        tiltChecking: 'Проверяю датчик движения…',
        audio: 'Звук',
        sounds: 'Звуки интерфейса',
        note: 'Настройки хранятся только в этом браузере.',
        themes: {
            ice: 'ICE-циан',
            acid: 'Кислотный',
            magenta: 'Розовый неон',
            amber: 'Янтарь CRT'
        }
    },

    tilt: {
        kickerAsk: '// связь с датчиком',
        kickerRefused: '// связь отклонена',
        kickerCalibrating: '// калибровка',
        kickerOnline: '// онлайн',
        askTitle: 'Подключи наклон',
        askText: 'Пусть сетка следует за твоими руками.',
        sync: 'Подключить',
        later: 'Позже',
        pausedTitle: 'Наклон на паузе',
        pausedSetting: 'Глубина наклона выключена в Настройках.',
        pausedReduceMotion: 'В настройках телефона включено «Уменьшение движения».',
        pausedAnimations: 'Анимации выключены в Настройках.',
        blockedTitle: 'Доступ запрещён',
        blockedReopen: 'Перезапусти приложение и нажми «Подключить» в Настройки › Глубина наклона.',
        blockedIos: 'iOS отказал. Перезапусти приложение и снова нажми «Подключить».',
        calibratingTitle: 'Подключаемся',
        calibratingText: 'Наклоняй телефон и осмотри сетку.',
        onlineTitle: 'Глубина онлайн ✦',
        onlineText: 'Теперь сетка движется вместе с тобой.',
        chipRelink: 'ТАПНИ — <b>ВЕРНУТЬ ГИРОСКОП</b>',
        chipOnline: 'ГИРОСКОП <b>ОНЛАЙН</b>',
        chipRefused: 'ГИРОСКОП <b>ОТКАЗ</b>',
        statusPaused: 'Пауза: {reason}',
        statusDesktop: 'Компьютер: обои следуют за мышью.',
        statusNotLinked: 'Не подключено. Нажми «Подключить», чтобы связать наклон.',
        statusLinked: 'Подключено ✦ Сетка движется вместе с тобой.',
        statusWaiting: 'Жду датчик движения…',
        buttonSync: '◉ Подключить',
        buttonRecalibrate: '◉ Перекалибровать'
    },

    explorer: {
        title: 'Проводник',
        window: 'Проводник',
        back: '← Назад',
        folders: {
            about: 'Обо мне',
            projects: 'Проекты',
            repos: 'Репозитории',
            links: 'Ссылки',
            chat: 'Чат',
            pictures: 'Картинки',
            bin: 'Корзина'
        },
        about: {
            title: 'Обо мне',
            intro: 'Вижу, у тебя получилось — добро пожаловать на лиминальную поверхность пыли, что сыплется из недр моего ICE-сервера, {Dread_OS}.',
            work: 'Я нетраннер, и не только. Делаю постквантовый блокчейн первого уровня с запущенным мейннетом (<a href="https://rougechain.io" target="_blank" rel="noopener noreferrer">RougeChain</a>), его зашифрованный кошелёк и мессенджер — уже в App Store (<a href="https://qwalla.io" target="_blank" rel="noopener noreferrer">Qwalla</a>), форум без теневых банов (<a href="https://antireddit.com" target="_blank" rel="noopener noreferrer">AntiReddit</a>), студию генеративного ИИ (<a href="https://gltchrunner.com" target="_blank" rel="noopener noreferrer">GltchRunner</a>), браузерные игры и музыку где-то между синтвейвом и трэпом.',
            code: 'Шесть языков в 33 публичных репозиториях — исходники на <a href="https://github.com/cyberdreadx" target="_blank" rel="noopener noreferrer">GitHub</a>. А то, что оплачивает счета, живёт на <a href="https://brandonmenard.dev" target="_blank" rel="noopener noreferrer">brandonmenard.dev</a>.',
            tip: 'Совет: открой <strong>term.exe</strong> и набери <code>help</code> — всё, что здесь есть, доступно и из командной строки.'
        },
        projects: {
            title: 'Проекты',
            status: {
                live: 'онлайн',
                game: 'игра',
                wip: 'в работе'
            }
        },
        repos: {
            title: 'Репозитории',
            intro: 'Шесть языков в 33 публичных репозиториях. Избранное:',
            all: 'Все репозитории на GitHub →',
            stars: { one: '{n} звезда', few: '{n} звезды', many: '{n} звёзд', other: '{n} звезды' },
            demo: 'демо онлайн'
        },
        links: {
            title: 'Ссылки'
        },
        chat: {
            title: 'Секретный чат',
            handle: 'Ник',
            handleLabel: 'Твой ник',
            message: 'Сообщение...',
            messageLabel: 'Сообщение',
            send: 'Отправить',
            empty: 'Передач пока нет. Скажи что-нибудь.',
            offline: 'Канал офлайн — ретранслятор не отвечает.',
            missing: 'Введи ник и сообщение.',
            sending: 'Отправка...',
            failed: 'Не удалось отправить сообщение.',
            serverStatus: 'Сервер ответил {status}'
        },
        pictures: {
            title: 'Изображения',
            neon: 'Неоновые обои',
            desktop: 'Фон рабочего стола',
            desktopCaption: 'Прежний фон рабочего стола',
            cybergirl: 'Кибердевушка',
            alternate: 'Запасной фон',
            closeViewer: 'Закрыть изображение'
        },
        bin: {
            text: 'тут нечего взламывать...',
            hint: '(попробуй <code>sudo</code> в term.exe)'
        }
    },

    music: {
        window: 'Музыкальный плеер',
        title: 'Плейлист CyberDread',
        noTrack: 'Ничего не играет',
        blocked: 'Воспроизведение заблокировано — нажми ▶',
        unavailable: 'Трек недоступен',
        previous: 'Предыдущий трек',
        play: 'Играть',
        pause: 'Пауза',
        next: 'Следующий трек',
        volume: 'Громкость'
    },

    rougechain: {
        tagline: 'Постквантовый с генезиса · <strong>мейннет запущен</strong> · нативный токен <strong>XRGE</strong>',
        buy: 'Купить XRGE',
        network: 'Сеть — онлайн',
        height: 'Высота блока',
        finalized: 'Финализировано',
        validators: 'Валидаторы',
        peers: 'Пиры',
        burned: 'Сожжено комиссий',
        explorer: 'Открыть обозреватель блоков →',
        layer1: 'Постквантовый L1',
        token: 'XRGE — один токен, две сети',
        contract: 'Контракт в Base',
        market: 'Рынок — XRGE в Base',
        price: 'Цена',
        change: '24 ч',
        cap: 'Капитализация',
        liquidity: 'Ликвидность',
        volume: 'Объём за 24 ч',
        buyAerodrome: 'Купить XRGE на Aerodrome',
        buyCoinbase: 'Купить XRGE в Coinbase',
        poolChart: 'График пула →',
        basescan: 'Контракт на BaseScan →',
        community: 'Сообщество',
        swap: 'Обмен',
        walletNone: 'Кошелёк не подключён',
        connect: 'Подключить кошелёк',
        from: 'Отдаёшь',
        fromToken: 'Токен, который отдаёшь',
        to: 'Получишь (оценка)',
        toAmount: 'Сколько XRGE получишь (оценка)',
        rate: 'Курс',
        impact: 'Влияние на цену (оценка)',
        fee: 'Комиссия сети',
        connectToSwap: 'Подключи кошелёк для обмена',
        disclaimer: 'Оценки ориентировочные. XRGE торгуется в <strong>Base</strong>. Обмен откроется на Aerodrome с уже выбранной парой — введи там сумму, чтобы получить итоговую котировку.'
    }
};
