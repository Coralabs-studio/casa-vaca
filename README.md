# 🏖️ CASA VACANZE ALGHERO - Sito Web

Sito web professionale per Casa Vacanze ad Alghero, ispirato allo stile elegante e moderno di Apulia.

## 📋 Caratteristiche

- ✨ Design moderno e professionale
- 📱 Completamente responsive (mobile, tablet, desktop)
- 🎨 Hero section con immagine di sfondo panoramica
- 🏠 Sezione proprietà con card eleganti
- 🛎️ Sezione servizi
- 🖼️ Galleria fotografica con lightbox
- 📧 Form di contatto
- ⚡ Animazioni smooth e interattività
- 🎯 SEO friendly

## 🗂️ Struttura del Progetto

```
CASAVACANZAHO/
│
├── index.html          # Pagina principale
├── css/
│   └── style.css       # Tutti gli stili
├── js/
│   └── script.js       # Interattività e funzionalità
├── images/             # Immagini del sito
│   ├── hero-alghero.jpg      # Hero background
│   ├── property1.jpg         # Casa Vista Mare
│   ├── property2.jpg         # Appartamento Corallo
│   ├── property3.jpg         # Villa Sardegna
│   ├── alghero1.jpg          # Gallery 1
│   ├── alghero2.jpg          # Gallery 2
│   ├── alghero3.jpg          # Gallery 3
│   └── alghero4.jpg          # Gallery 4
└── reference/          # Screenshot di riferimento
```

## 🚀 Come Usare

1. **Apri il sito**: Fai doppio click su `index.html` per aprire il sito nel browser

2. **Sostituisci le immagini**:
   - Sostituisci `hero-alghero.jpg` con una foto panoramica di Alghero (1920x1080px o superiore)
   - Sostituisci `property1.jpg`, `property2.jpg`, `property3.jpg` con foto delle tue proprietà
   - Sostituisci le immagini della gallery con foto di Alghero

3. **Personalizza i contenuti**:
   - Apri `index.html` con un editor di testo
   - Modifica titoli, descrizioni e prezzi delle proprietà
   - Aggiorna i dati di contatto (telefono, email, indirizzo)

4. **Aggiungi più proprietà**:
   - Copia una delle card `.property-card` esistenti
   - Modifica testo, immagini e prezzi

## ✏️ Personalizzazione Rapida

### Cambiare i Colori
Apri `css/style.css` e modifica le variabili nella sezione `:root`:

```css
:root {
    --primary-color: #2c5f7f;      /* Blu principale */
    --secondary-color: #e8a87c;    /* Arancione/Beige */
    --accent-color: #c27a50;       /* Marrone chiaro */
}
```

### Aggiungere una Proprietà
In `index.html`, nella sezione `.properties-grid`, aggiungi:

```html
<div class="property-card">
    <div class="property-image">
        <img src="images/nuova-property.jpg" alt="Nome Proprietà">
        <div class="property-badge">Disponibile</div>
    </div>
    <div class="property-content">
        <h3>Nome della Proprietà</h3>
        <p class="property-location">📍 Località, Alghero</p>
        <p class="property-description">
            Descrizione della proprietà...
        </p>
        <div class="property-features">
            <span><i>🛏️</i> X Camere</span>
            <span><i>👥</i> X Ospiti</span>
            <span><i>🚿</i> X Bagni</span>
        </div>
        <div class="property-footer">
            <div class="property-price">
                <span class="price-label">Da</span>
                <span class="price">€XX</span>
                <span class="price-period">/notte</span>
            </div>
            <a href="#contact" class="btn btn-secondary">Richiedi Info</a>
        </div>
    </div>
</div>
```

### Modificare i Contatti
Cerca nel file `index.html` la sezione `#contact` e aggiorna:
- Telefono
- Email
- Indirizzo

## 🎨 Sezioni del Sito

1. **Hero Section**: Titolo principale con call-to-action
2. **Introduzione**: Breve descrizione del servizio
3. **Proprietà**: Card con dettagli delle case vacanze
4. **Servizi**: Cosa offrite ai vostri ospiti
5. **Gallery**: Foto di Alghero e dintorni
6. **Contatti**: Form e informazioni di contatto
7. **Footer**: Link utili e social media

## 🌐 Pubblicazione Online

Per pubblicare il sito:

1. **Hosting gratuito**:
   - [Netlify](https://www.netlify.com/) - Trascina la cartella e pubblica
   - [GitHub Pages](https://pages.github.com/) - Gratis con dominio github.io
   - [Vercel](https://vercel.com/) - Deploy immediato

2. **Domini**:
   - Acquista `casavacanzealghero.it` da provider come Aruba, Register.it, etc.
   - Collega il dominio al tuo hosting

## 📱 Responsive Design

Il sito è ottimizzato per:
- 📱 Smartphone (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1920px+)

## 🔧 Browser Supportati

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 💡 Suggerimenti

- Usa immagini di alta qualità ma ottimizzate (< 200KB ciascuna)
- Aggiorna regolarmente le disponibilità
- Aggiungi recensioni dei clienti
- Collega i social media nel footer
- Considera di aggiungere un sistema di prenotazione online

## 📧 Form di Contatto

Il form attualmente mostra un alert. Per inviare email vere, puoi usare:
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- Backend personalizzato con PHP/Node.js

## 🎯 SEO

Il sito include:
- Meta tag description
- Titoli ottimizzati
- Struttura semantica HTML5
- Alt text per le immagini

## 📞 Supporto

Per modifiche o domande sul sito, rivedi questo file README e i commenti nel codice.

---

**Creato con ❤️ per Casa Vacanze Alghero**

Buona fortuna con le tue vacanze! 🏖️🌊☀️
