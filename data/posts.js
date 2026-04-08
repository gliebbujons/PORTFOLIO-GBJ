// ─── POSTS DATA ───────────────────────────────────────────────────────────────
// Afegeix un objecte per cada nou post que creïs.
//
// Instruccions:
//   1. Crea la carpeta:  pages/[categoria]/[slug]/
//   2. Copia la plantilla _template/ca.html i _template/en.html a dins
//   3. Edita el contingut dels fitxers copiats
//   4. Afegeix una entrada aquí (copia el format de sota)
//   5. Desa — el post apareixerà automàticament a la pàgina corresponent
//
// Camps:
//   slug      → nom de la carpeta del post (sense espais, minúscules)
//   category  → "arquitectura" | "creativitat" | "blog"
//   pubDate   → "YYYY-MM-DD"  (data de publicació al web, s'usa per ordenar els últims posts)
//   date      → "YYYY-MM-DD"  (data real de creació del projecte, és el que es mostra escrita)
//   title     → { ca: "...", en: "..." }
//   desc      → { ca: "...", en: "..." }  descripció curta (2-3 frases)
//   cover     → ruta de la imatge de portada, o "" si no n'hi ha
// ─────────────────────────────────────────────────────────────────────────────

window.POSTS = [

  {
    slug: 'museu',
    category: 'arquitectura',
    pubDate: '2026-08-08',
    date: '2024-05-02',
    title: { ca: "De l'Aïllament a la Sensibilitat", en: 'From Enclosure to Fragility' },
    desc: { ca: "El contrast entre l'aïllament i la transparència a través del recorregut.", en: 'Contrast between enclosure and openness trough the journey.' },
    cover: ''
  },

  // Exemple — descomenta i edita quan tinguis el primer post real:
  // {
  //   slug:     'nom-del-projecte',
  //   category: 'arquitectura',
  //   pubDate:  '2026-04-08',
  //   date:     '2026-04-08',
  //   title: { ca: 'Títol en català', en: 'Title in English' },
  //   desc:  { ca: 'Descripció breu.', en: 'Short description.' },
  //   cover: ''
  // },

];
