const headerFallback = `
<header class="site-header">
    <div class="brand-block">
        <span class="brand-name">Nicolas Henrique Santana Caetano</span>
    </div>

    <div class="header-actions">
        <nav class="main-nav" aria-label="Menu principal">
            <ul class="menu">
                <li><a href="index.html" data-href="index.html">Início</a></li>
                <li><a href="pages/curriculo.html" data-href="pages/curriculo.html">Currículo</a></li>
                <li><a href="pages/formulario.html" data-href="pages/formulario.html">Contato</a></li>
                <li><a href="pages/multimidia.html" data-href="pages/multimidia.html">Multimídia</a></li>
                <li><a href="pages/grafico.html" data-href="pages/grafico.html">Gráficos</a></li>
            </ul>
        </nav>

        <button type="button" class="theme-toggle" data-theme-toggle>Tema escuro</button>
    </div>
</header>`;

const footerFallback = `
<footer>
    <p>&copy; 2026 - Nicolas Henrique Santana Caetano</p>
    <p>Portfólio acadêmico desenvolvido para a disciplina de Desenvolvimento Web.</p>
</footer>`;

const resolveNavigationPath = (href) => {
    const normalized = href.replace(/^\.\//, '').replace(/^\//, '');

    if (window.location.pathname.includes('/pages/')) {
        if (normalized === 'index.html') return '../index.html';
        if (normalized.startsWith('pages/')) return `../${normalized}`;
        return normalized;
    }

    return normalized;
};

const insertFragment = async (targetId, url, fallbackMarkup) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const html = await response.text();
        target.innerHTML = html;
    } catch (error) {
        target.innerHTML = fallbackMarkup;
    }

    if (targetId === 'site-header') {
        target.querySelectorAll('a[data-href]').forEach((link) => {
            link.setAttribute('href', resolveNavigationPath(link.dataset.href));
        });
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const currentScript = document.currentScript;
    const headerPath = currentScript?.dataset.headerPath || 'components/header.html';
    const footerPath = currentScript?.dataset.footerPath || 'components/footer.html';

    await Promise.all([
        insertFragment('site-header', headerPath, headerFallback),
        insertFragment('site-footer', footerPath, footerFallback)
    ]);

    window.dispatchEvent(new CustomEvent('components:loaded'));
});
