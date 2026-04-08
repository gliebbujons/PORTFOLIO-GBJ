# Guia d'Ús: Portfolio GBJ

Aquest document explica com està muntat el web i com gestionar-ne el contingut. L'objectiu és que puguis ser completament autònom per afegir nous projectes i editar-ho tot.

## 1. Estructura del Web

El web està creat des de zero ("code-first") sense fer servir plataformes com WordPress i sense dependències complicades. Hem utilitzat només **HTML, CSS i Javascript bàsic**. És súper minimalista tant en el disseny com en el codi, cosa que fa que sigui molt fàcil i ràpid de carregar, però també més fàcil d'entendre al llegir els arxius.

### Fitxers principals:
*   `index.html`: La pàgina d'inici (Té la teva introducció, foto i les tres graelles on automàticament van sortint els posts més nous).
*   `arquitectura.html`, `creativitat.html`, `blog.html`: Les tres categories. Aquestes pàgines es dediquen exclusivament a la funció de "graella", i automàticament reben totes les targetes pertinents segons la categoria de l'arxiu `posts.js`.
*   `css/style.css`: Estils de la web (colors, marges, mides). Netejat de cantonades rodones o animacions.
*   `data/posts.js`: **La teva base de dades.** On hauràs de registrar els teus nous projectes publicats per tal que es linkin automàticament a les graelles visuals del web.
*   `js/main.js` & `js/render.js`: Controlen que tinguis bilingüisme o s'omplin les targetines sense gaire embolic. 

---

## 2. Com provar la Web

A causa de que usem Javascript per carregar la informació dels teus posts cap a dins la pàgina de cop, de vegades el navegador bloqueja algunes accions si només fas doble clic damunt un `index.html`. 

Si tens una terminal o algun programa com Visual Studio Code, pots generar un petit "servidor local" instantani (en ser static sites, amb qualsevol funciona, per exemple si tens Node.js pots utilitzar l'eina `serve`):
1. Obre la consola/terminal a la carpeta d'aquest projecte (`PORTFOLIO GBJ`).
2. Escriu: `npx serve .` i prem Enter.
3. El programa et donarà una adreça que normalment s'assembla a `http://localhost:3000`. Obre-la al navegador i ho veuràs tot perfecte i segur com ho veurien els teus usuaris futurs per internet.

---

## 3. Com Afegir un Nou Projecte / Post

El web s'actualitza i es pinta amb "Targetes" automàticament depenent de l'ordre cronològic quan registres un projecte nou. Segueix exactament aquests passos:

### Pas 1: Crea la carpeta on anirà el teu arxiu individual (Post)
Ves a la carpeta **`pages/`**. Entra a una de les categories (`arquitectura`, `creativitat` o `blog`).
A dins d'aquesta categoria triada crea una subcarpeta amb el nom del projecte (recomanat que posis un nom curt, tot en **minúscules**, i els espais canviats per **guions** (`-`), res d'accents o caràcters estranys). Exemple de nom de carpeta inventat: `reforma-sant-gervasi`. 

### Pas 2: Posa-hi la plantilla precreada o text individual
Copia a dins d'aquesta nova carpeta els dos fitxers que t'esperen dins de `pages/_template/` (`ca.html` i `en.html`).

*Obre el `ca.html` amb el teu editor i omple les dades reals tal i com indiquen en majúscules la pròpia plantilla.* Veuràs que de forma fàcil hi podràs escriure dins dels `<h1>` i de les teves `<h2>` en català i l'altre si el vols anglès en l'`en.html`. 

### Pas 3: Registra el Projecte (La Màgia)
Això és l'únic que generarà una **targeta visual i linkada** capaç d'enllaçar de les planes inicials fins al teu html explicatiu precreat al *Pas 2*.

Obre l'arxiu base de dades local anomenat `data/posts.js`. Afegiràs un bloc nou de codi com el següent exemple *dins de la llista general [ ]* : 
```javascript
window.POSTS = [
  // COPIA D'ESTRUCTURA NORMAL I CORRENT (EL , COMMA SEPARADOR FINAL és obligatori si afegeixes més carpetes a sota):
  {
    slug:     'reforma-sant-gervasi', // (EL NOM EXACTE DE LA CARPETA CREADA AL PAS 1)
    category: 'arquitectura', // ("arquitectura", "creativitat", o "blog")
    date:     '2026-06-15', // Ordenarà de més nous o antics 
    title: { ca: 'Reforma d\'un àtic  a Sant Gervasi', en: 'Penthouses Renovation...' },
    desc:  { ca: 'Text super curt, explicatiu de 2 línes.', en: 'Short description text..' },
    cover: '' // (Pots posar directori o deixar-ho '', o no omplirà res visual.)
  },

  // Altres posts continuarien aquí... A sota...
];
```

Un cop guardis i posis a refrescar les altres planes, tot començarà automàticament i serà capaç de portar el teu visitant dins a l'arxiu propi teu creat al *Pas 2*!

---

## 4. Canviar de nom Categories o Traduccions Estàtiques

Si el dia de demà vols cambiar un títol base:

1. **La Navegació i La pàgina d'inici**: Directament obre l'arxiu HTML (ex: `index.html`). Veuràs seccions amb els codis o text explicatiu que tenen les traduccions incrustades dins de les tags `<div data-ca="Hola, soc GBJ" data-en="Hi, I'm... ">Hola, soc GBJ</div>`. Reemplaces el seu text "data" amb molt de compte de respectar l'idioma dins de les cometes, i també el text visible fora d'elles.
2. **Text d'Etiquetes (Les "Badges") petites al damunt cada foto de la web**: Si desitges canviar l'aparença a `['Arq.', 'Arch']` has d'anar a localitzar al fixter generador de targetes (`js/render.js`),  la variable constant que es diu `BADGE_LABEL` i canviar-li el valor interior allà mateix.

---

## 5. Estils i Maquetació de Contingut Automàtica

Per evitar que perdis temps barallant-te amb l'estètica (CSS) de cada post nou que facis, t'he creat i injectat un "kit de disseny complet" o *"Caixa d'eines"*. Si vas a l'arxiu genèric on sempre comences (`_template/ca.html` i `en.html`), veuràs que els trossos especials ja hi són explicats però **inactius amb un comentari (`<!-- -->`)**. 

Si desitges activar-los o moure'ls, només els has d'eliminar les dates `<!--` de principi i fi. Podràs usar coses automàtiques com:

*   **1. Columnes de Fotos (2 o 3)**:
    Escriure `<div class="col-2">` (o `col-3`) i just dins seu hi poses entre dues a tres imatges `<img>`. Això farà que automàticament ocupin mitja pantalla exactament o un terç (I estaran ja automatitzades als mòbils petits apilant-se una sota l'altra).
*   **2. Carrusel Swipe Lateral**:
    Si envols imatges amb el paràmetre `<div class="post-carousel">` aquestes sortiran allargades infinitament fins al fons pla, donant a l'usuari un control on podrà utilitzar el dit en la versió móvil com si es tractes de targetetes rebotadisses (L'efecte Insta-carousel).
*   **3. Reflexió Externa**:
    Escull un bloc de text el qual voldràs ressaltar com alguna cosa cèlebre o pròpia escrivint la tag universal `<blockquote> Tota la raó... </blockquote>`
*   **4. Fotografies Documentades:**
    Emprant la classe `<div class="post-figure">` obtindràs la certesa de posar un `<p class="post-caption">Figura A...</p>` perquè aquesta explicació s'arreli com text súper miniaturitzat al seu centre-inferior de l'objecte visual.
