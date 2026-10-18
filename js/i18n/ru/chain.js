/** Dread_OS strings, area "chain" (ru). Mirrors en/chain.js key for key. */
export default {
    network: {
        updated: '{chain} — обновлено в {time}',
        unreachable: 'Публичная нода не ответила. Это ещё не значит, что сеть легла, — загляни в эксплорер.'
    },
    market: {
        loading: 'Загрузка…',
        noPair: 'По пулу {pair} на {chain} пока нет цены.',
        unreachable: 'Источники рыночных данных недоступны. Скоро попробуем снова.',
        updated: '{pair} — на {dex} — через {source} — обновлено в {time}'
    },
    contract: {
        copied: 'скопировано'
    },
    wallet: {
        notConnected: 'Кошелёк не подключён',
        connect: 'Подключить кошелёк',
        connected: 'Подключён',
        noWallet: 'Кошелёк не найден. Поставь MetaMask, Rabby или другой кошелёк с EIP-1193.',
        rejected: 'Подключение отклонено.',
        addChainFailed: 'Не удалось добавить {chain} в кошелёк.',
        failed: 'Не удалось подключить кошелёк. Попробуй ещё раз.',
        loadingBalances: 'Загружаю балансы…',
        unavailable: 'недоступно'
    },
    swap: {
        connectToSwap: 'Подключи кошелёк для обмена',
        onAerodrome: 'Обменять на Aerodrome',
        fetchingRate: 'Узнаю курс…',
        noPool: 'Пул ликвидности не проиндексирован',
        rateUnavailable: 'Курс недоступен',
        rate: '1 {symbol} ≈ {amount} XRGE',
        impactUnknown: 'неизвестно',
        fee: 'считает Aerodrome'
    }
};
