/** Dread_OS, Russian. Each area lives in ./ru/ and mirrors ./en/. */
import ui from './ru/ui.js';
import content from './ru/content.js';
import chain from './ru/chain.js';
import term from './ru/term.js';
import netrun from './ru/netrun.js';

export default {
    code: 'ru',
    name: 'Русский',
    dir: 'ltr',
    locale: 'ru-RU',
    ui,
    content,
    chain,
    term,
    netrun
};
