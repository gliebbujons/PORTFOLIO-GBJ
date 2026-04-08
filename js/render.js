// ─── render.js ─────────────────────────────────────────────────────────────
// Llegeix window.POSTS i renderitza targetes a qualsevol element de la pàgina.
// ───────────────────────────────────────────────────────────────────────────

const BADGE_LABEL = {
  arquitectura: { ca: 'Arq.', en: 'Arch.' },
  creativitat: { ca: 'Creat.', en: 'Creat.' },
  blog: { ca: 'Blog', en: 'Blog' }
};

const READ_LABEL = {
  arquitectura: { ca: 'Veure projecte →', en: 'View project →' },
  creativitat: { ca: 'Veure projecte →', en: 'View project →' },
  blog: { ca: 'Llegir →', en: 'Read →' }
};

const PLACEHOLDER_SVG = `
  <div class="card-img">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1">
      <rect x="2" y="2" width="20" height="20"/>
      <path d="M2 9l5-5 5 5 5-5 5 5"/>
    </svg>
  </div>`;

function formatDate(isoDate, lang) {
  return new Date(isoDate).toLocaleDateString(
    lang === 'en' ? 'en-GB' : 'ca-ES',
    { month: 'short', year: 'numeric' }
  );
}

function buildCard(post, lang) {
  const title = post.title[lang] || post.title.ca;
  const desc = post.desc[lang] || post.desc.ca;
  const badge = (BADGE_LABEL[post.category] || {})[lang] || post.category;
  const label = (READ_LABEL[post.category] || {})[lang] || '→';
  const date = formatDate(post.date, lang);
  const href = `pages/${post.category}/${post.slug}/${lang === 'en' ? 'en.html' : 'ca.html'}`;
  const imgEl = post.cover
    ? `<img class="card-img" src="${post.cover}" alt="${title}">`
    : PLACEHOLDER_SVG;

  return `
    <li class="card" data-href="${href}">
      ${imgEl}
      <div class="card-body">
        <div class="card-meta">
          <span class="badge">${badge}</span>
          <span class="card-date">${date}</span>
        </div>
        <div class="card-title">${title}</div>
        <p class="card-desc">${desc}</p>
        <span class="card-link">${label}</span>
      </div>
    </li>`;
}

function renderGrid(targetId, options) {
  const { category = null, limit = null, isCarousel = false } = options || {};
  const lang = localStorage.getItem('gbj-lang') || 'ca';
  const el = document.getElementById(targetId);
  if (!el || !window.POSTS) return;

  let posts = [...window.POSTS].sort((a, b) => new Date(b.pubDate || b.date) - new Date(a.pubDate || a.date));
  if (category) posts = posts.filter(p => p.category === category);
  if (limit) posts = posts.slice(0, limit);

  if (posts.length === 0) {
    const msg = lang === 'en' ? 'Content coming soon.' : 'Aviat hi haurà contingut.';
    el.innerHTML = `<p style="color:var(--muted);font-size:.85rem;">${msg}</p>`;
    return;
  }

  const listClass = isCarousel ? 'card-carousel' : 'grid';
  el.innerHTML = `<ul class="${listClass}">${posts.map(p => buildCard(p, lang)).join('')}</ul>`;
  el.querySelectorAll('[data-href]').forEach(card => {
    card.addEventListener('click', () => location.href = card.dataset.href);
  });
}

// Called on load and on lang change
function renderAll() {
  // Category pages
  if (document.getElementById('posts-grid')) {
    const cat = document.body.dataset.category || null;
    renderGrid('posts-grid', { category: cat });
  }

  // Index page — General recent (Carousel)
  renderGrid('posts-recents', { limit: 6, isCarousel: true });

  // Index page — 3 separate sections, 3 posts each
  renderGrid('posts-arq', { category: 'arquitectura', limit: 3 });
  renderGrid('posts-cre', { category: 'creativitat', limit: 3 });
  renderGrid('posts-blo', { category: 'blog', limit: 3 });
}

window.renderAll = renderAll;

