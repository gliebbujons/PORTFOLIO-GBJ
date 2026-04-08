const LANG_KEY = 'gbj-lang';
let lang = localStorage.getItem(LANG_KEY) || 'ca';

function setLang(l) {
  lang = l;
  localStorage.setItem(LANG_KEY, l);
  document.documentElement.lang = l;

  // On post pages: navigate to sibling language file instead of translating
  const selfLang = document.documentElement.dataset.langSelf;
  if (selfLang) {
    document.querySelectorAll('.lang button').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.lang === l));
    if (selfLang !== l) location.href = l === 'en' ? 'en.html' : 'ca.html';
    return;
  }

  // Translate inline elements (nav, hero, footer…)
  document.querySelectorAll('[data-ca][data-en]').forEach(el => {
    el.textContent = el.dataset[l];
  });
  document.querySelectorAll('.lang button').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.lang === l));

  // Re-render dynamic grids (index & category pages)
  if (typeof renderAll === 'function') renderAll();
}

// Mark active nav link
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a[href]').forEach(a => {
  if (a.getAttribute('href').split('/').pop() === page) a.classList.add('active');
});

// Mobile toggle
const toggle = document.getElementById('nav-toggle');
const navEl = document.getElementById('nav-links');
if (toggle) toggle.addEventListener('click', () => navEl.classList.toggle('open'));

// Lang buttons
document.querySelectorAll('.lang button').forEach(btn =>
  btn.addEventListener('click', () => setLang(btn.dataset.lang)));

// Clickable static cards/rows (non-dynamic)
document.querySelectorAll('[data-href]').forEach(el =>
  el.addEventListener('click', () => location.href = el.dataset.href));

// Render Global Footer via Fetch
async function init() {
  const footerElements = document.querySelectorAll('.site-footer');
  if (footerElements.length > 0) {
    try {
      const scriptTag = document.querySelector('script[src*="main.js"]');
      const basePath = scriptTag ? scriptTag.getAttribute('src').replace('js/main.js', '') : '';
      const response = await fetch(basePath + 'components/footer.html');
      const html = await response.text();
      footerElements.forEach(f => f.innerHTML = html);
    } catch (err) {
      console.error("Error carregant el footer externe:", err);
    }
  }

  // Init lang after footer is loaded so it can be translated correctly
  setLang(lang);
}

init();
