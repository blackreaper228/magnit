import './style.css'

// Burger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const burgerButton = document.querySelector('.Header_burger');
  const headerLinks = document.querySelector('.HeaderLinks');

  if (!burgerButton || !headerLinks) return;

  const toggleMenu = () => {
    burgerButton.classList.toggle('active');
    headerLinks.classList.toggle('active');
  };

  burgerButton.addEventListener('click', toggleMenu);

  // Ensure menu resets when switching to desktop
  const mediaQuery = window.matchMedia('(min-width: 1025px)');
  const handleViewportChange = () => {
    if (mediaQuery.matches) {
      burgerButton.classList.remove('active');
      headerLinks.classList.remove('active');
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleViewportChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleViewportChange);
  }

  // Normalize absolute URLs only on GitHub Pages (avoid breaking localhost)
  const isGhPages = /github\.io$/i.test(window.location.hostname);
  if (isGhPages) {
    const getRepoBase = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      // For project pages the first segment is the repo name
      return parts.length > 0 ? `/${parts[0]}/` : '/';
    };
    const repoBase = getRepoBase();
    const isAbsoluteHttp = (href) => /^(?:[a-z]+:)?\/\//i.test(href);
    const isSpecial = (href) => href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:');
    const needsPrefix = (v) => typeof v === 'string' && v.startsWith('/') && !v.startsWith('//');

    const prefixAttr = (el, attr) => {
      const v = el.getAttribute(attr);
      if (!v || isAbsoluteHttp(v) || isSpecial(v)) return;
      if (needsPrefix(v)) el.setAttribute(attr, repoBase + v.slice(1));
    };

    document.querySelectorAll('a[href]').forEach((a) => prefixAttr(a, 'href'));
    document.querySelectorAll('img[src]').forEach((img) => prefixAttr(img, 'src'));
    document
      .querySelectorAll('link[rel="icon"][href]')
      .forEach((lnk) => prefixAttr(lnk, 'href'));
  }
});
