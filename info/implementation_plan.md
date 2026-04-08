# Pla de Refactorització del CSS

La meva proposta és dividir el contingut actual de `style.css` (que té més de 600 línies) en difersos arxius molt més petits i especialitzats dins la carpeta `css/`. D'aquesta manera, quan vulguis canviar colors o tipografies, sabràs exactament on anar, i quan vulguis canviar la maquetació d'una targeta, sabràs on buscar.

## Proposed Changes

La idea principal és utilitzar la regla `@import` dins del teu `style.css` actual. Si ho fem així, no ens caldrà anar pàgina per pàgina modificant els arxius `.html` ni patir per si ens n'oblidem algun. L'HTML seguirà carregant `style.css`, però aquest fitxer "cridarà" de forma ordenada a tota la resta.

L'estructura quedaria així:

### [CSS Architecture]

#### [NEW] `css/tokens.css`
Aquí guardarem totes les "Variables CSS" (`:root { ... }`): els colors (`--bg`, `--white`, `--text`), les tipografies (`--sans`, `--serif`), els `padding` i l'amplada màxima. Qualsevol canvi estètic general es farà des d'aquí.

#### [NEW] `css/reset.css`
Aquest inclourà els margin 0, padding 0, el `box-sizing`, l'importació de Google Fonts i les estilitzacions generals sobre les etiquetes base (`body`, `a`, `img`, `ul`, `html`).

#### [NEW] `css/layout.css`
Els estils d'estructura fonamentals de la web d'escala macro: contàiners genèrics (`.wrap`), la definició general de `.grid`, el reixat adaptable (`.col-2`, `.col-3`).

#### [NEW] `css/components.css`
L'arxiu on hi haurà els "blocs de construcció" de la teva interfície, elements petits molt reutilitzats: les targetes previsualitzables (`.card`), les capçaleres de seccions, the `badge`, el menú de navegació (`.site-header`, `.nav`), i per descomptat l'interrupctor d'idiomes (`.lang`). També el peu de pàgina.

#### [NEW] `css/pages.css`
Els contenidors específics de "situació": els estils que només es fan servir en certs llocs determinats, per exemple per mostrar l'article amb el projecte (`.post-header`, `.post-carousel`, `.post-format`) o apartats com les seccions introdutòries (`.intro-section`).

#### [MODIFY] `css/style.css`
El buidarem sencer i posarem un recull net d'imports:
```css
@import url('./reset.css');
@import url('./tokens.css');
@import url('./layout.css');
@import url('./components.css');
@import url('./pages.css');
```

## User Review Required

Què et sembla aquesta distribució? Vols que canvii el nom d'algun arxiu, o que les categories siguin d'alguna altra forma? Si et quadra l'estructura, aprova el pla (dient-me que endavant o sí) i faré l'extracció jo mateix de forma minuciosa creant tots els fitxers!
