/**
 * Explorer module - file explorer window and its folder views.
 */
import { playSound, SOUNDS } from '../sound.js';
import { PROJECTS, LINKS, REPOS, GITHUB_USER } from '../../data/site-config.js';
import { t } from '../../i18n/i18n.js';

/** Opens the file explorer window. */
export function openExplorer() {
    playSound(SOUNDS.OPEN);
    const explorer = document.getElementById('explorer');
    if (!explorer) return;
    explorer.style.display = 'block';
    document.dispatchEvent(new CustomEvent('window:opened', { detail: { id: 'explorer' } }));
}

/** Closes the file explorer window. */
export function closeExplorer() {
    playSound(SOUNDS.CLOSE);
    const explorer = document.getElementById('explorer');
    if (explorer) explorer.style.display = 'none';
    document.dispatchEvent(new CustomEvent('window:closed', { detail: { id: 'explorer' } }));
}

/**
 * Shows a folder's contents.
 * @param {string} id - The ID of the content panel to show
 */
export function showContent(id) {
    playSound(SOUNDS.CLICK);
    const container = document.querySelector('.folder-container');
    if (container) container.style.display = 'none';

    document.querySelectorAll('.folder-content.active')
        .forEach(panel => panel.classList.remove('active'));

    const content = document.getElementById(id);
    if (content) content.classList.add('active');

    if (id === 'about-me') playSound(SOUNDS.LOADING);
}

/** Opens the explorer straight on the Projects folder. */
export function openProjects() {
    openExplorer();
    showContent('projects');
}

/**
 * Returns to the folder listing.
 * @param {string} id - The ID of the content panel to hide
 */
export function hideContent(id) {
    playSound(SOUNDS.CLICK);
    const container = document.querySelector('.folder-container');
    if (container) container.style.display = 'flex';

    const content = document.getElementById(id);
    if (content) content.classList.remove('active');
}

/**
 * Builds one project or link tile.
 * @param {{name: string, url: string, icon: string, status?: string, blurb?: string}} entry
 * @returns {HTMLElement}
 */
function buildTile(entry) {
    const tile = document.createElement('a');
    tile.className = 'project-item';
    tile.href = entry.url;
    tile.target = '_blank';
    tile.rel = 'noopener noreferrer';

    const thumb = document.createElement('img');
    thumb.className = 'project-thumb';
    thumb.src = entry.icon;
    thumb.alt = '';
    thumb.loading = 'lazy';
    thumb.decoding = 'async';

    const label = document.createElement('div');
    label.className = 'project-label';
    label.textContent = entry.name;

    tile.append(thumb, label);

    if (entry.status) {
        const badge = document.createElement('span');
        badge.className = `status-badge status-${entry.status}`;
        const key = `ui.explorer.projects.status.${entry.status}`;
        const label = t(key);
        badge.textContent = label === key ? entry.status : label;
        tile.appendChild(badge);
    }

    if (entry.blurb) tile.title = entry.blurb;

    return tile;
}

/**
 * One call-to-action: a link, or a button that opens a Dread_OS window.
 * @param {{label: string, url?: string, open?: string}} action
 * @param {boolean} primary
 */
export function buildAction(action, primary) {
    const el = document.createElement(action.url ? 'a' : 'button');
    el.className = primary ? 'cta cta-primary' : 'cta';
    el.textContent = action.label;
    if (action.url) {
        el.href = action.url;
        // A new tab, like every other link on the desktop.
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
    } else {
        el.type = 'button';
        el.addEventListener('click', () => openWindow(action.open));
    }
    return el;
}

/** Opens a Dread_OS window by name (the `open` of an action). */
export function openWindow(name) {
    const opener = {
        netrun: 'openNetrun',
        projects: 'openProjects',
        terminal: 'openTerminal',
        rougechain: 'openRougeCoin',
        music: 'toggleMusicPlayer',
        settings: 'openSettings',
        files: 'openExplorer'
    }[name];
    if (opener && typeof window[opener] === 'function') window[opener]();
}

/**
 * A project card: picture, name and badge, what it is, and what to do next.
 * @param {Object} project  an entry of PROJECTS
 */
function buildProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';

    const thumb = document.createElement('img');
    thumb.className = 'project-card-thumb';
    thumb.src = project.icon;
    thumb.alt = '';
    thumb.loading = 'lazy';
    thumb.decoding = 'async';

    const body = document.createElement('div');
    body.className = 'project-card-body';

    const head = document.createElement('h3');
    head.className = 'project-card-name';
    head.textContent = project.name;
    if (project.status) {
        const badge = document.createElement('span');
        badge.className = `status-badge status-${project.status}`;
        const key = `ui.explorer.projects.status.${project.status}`;
        const label = t(key);
        badge.textContent = label === key ? project.status : label;
        head.appendChild(badge);
    }

    // A div, not a p: .folder-content p types itself out like a terminal.
    const blurb = document.createElement('div');
    blurb.className = 'project-card-blurb';
    blurb.textContent = project.blurb || '';

    const actions = document.createElement('div');
    actions.className = 'project-card-actions';
    (project.actions?.length ? project.actions : [{ label: project.name, url: project.url }])
        .forEach((action, i) => actions.appendChild(buildAction(action, i === 0)));

    body.append(head, blurb);
    card.append(thumb, body, actions);
    return card;
}

/**
 * Renders the Projects and Links folders from site-config, so adding work
 * means editing one data file instead of hand-writing markup.
 */
export function renderExplorerContent() {
    const projects = document.getElementById('projectsGrid');
    if (projects) {
        projects.textContent = '';
        PROJECTS.forEach(project => projects.appendChild(buildProjectCard(project)));
    }

    const links = document.getElementById('linksGrid');
    if (links) {
        links.textContent = '';
        LINKS.forEach(link => links.appendChild(buildTile({
            name: link.label,
            url: link.url,
            icon: link.img
        })));
    }

    const repos = document.getElementById('reposList');
    if (repos) {
        repos.textContent = '';
        REPOS.forEach(repo => repos.appendChild(buildRepoRow(repo)));
    }
}

/**
 * Builds one repo row. Repos are text, not artwork, so they get a list
 * row rather than the image tile the projects grid uses.
 * @param {{name: string, desc?: string, lang?: string, license?: string,
 *          stars?: number, homepage?: string}} repo
 * @returns {HTMLElement}
 */
function buildRepoRow(repo) {
    const row = document.createElement('a');
    row.className = 'repo-row';
    row.href = `https://github.com/${GITHUB_USER}/${repo.name}`;
    row.target = '_blank';
    row.rel = 'noopener noreferrer';

    const name = document.createElement('span');
    name.className = 'repo-name';
    name.textContent = repo.name;
    row.appendChild(name);

    if (repo.desc) {
        const desc = document.createElement('span');
        desc.className = 'repo-desc';
        desc.textContent = repo.desc;
        row.appendChild(desc);
    }

    const meta = document.createElement('span');
    meta.className = 'repo-meta';

    if (repo.lang) {
        const lang = document.createElement('span');
        lang.className = 'repo-lang';
        lang.textContent = repo.lang;
        meta.appendChild(lang);
    }
    if (repo.license) {
        const license = document.createElement('span');
        license.textContent = repo.license;
        meta.appendChild(license);
    }
    if (repo.stars) {
        const stars = document.createElement('span');
        stars.textContent = t('ui.explorer.repos.stars', { n: repo.stars });
        meta.appendChild(stars);
    }
    if (repo.homepage) {
        const demo = document.createElement('span');
        demo.textContent = t('ui.explorer.repos.demo');
        meta.appendChild(demo);
    }

    if (meta.childElementCount) row.appendChild(meta);
    return row;
}

/** Opens the lightbox for a full-size image. */
export function openImageViewer(src, alt = '') {
    const viewer = document.getElementById('imageViewer');
    const image = document.getElementById('viewerImage');
    if (!viewer || !image) return;
    image.src = src;
    image.alt = alt;
    viewer.style.display = 'flex';
    playSound(SOUNDS.OPEN);
}

/** Closes the image lightbox. */
export function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    if (viewer) viewer.style.display = 'none';
    playSound(SOUNDS.CLOSE);
}

/** Keeps the explorer body sized when the window is resized. */
export function initExplorerResize() {
    const explorer = document.getElementById('explorer');
    if (!explorer || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const content = entry.target.querySelector('.explorer-content');
            if (content) content.style.height = `${entry.contentRect.height - 40}px`;
        });
    });
    observer.observe(explorer);

    // Escape closes the lightbox.
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeImageViewer();
    });
}
