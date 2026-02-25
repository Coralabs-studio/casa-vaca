# 📖 GUIDA AI TEMPLATE APPARTAMENTI

## File Disponibili

1. **TEMPLATE_APPARTAMENTO.md** - Template vuoto da inviare al cliente
2. **ESEMPIO_COMPILATO.md** - Esempio già compilato per mostrare come fare
3. Questo file README con le istruzioni

---

## 📤 COME INVIARE IL TEMPLATE AL CLIENTE

### Opzione 1: Email
1. Apri `TEMPLATE_APPARTAMENTO.md`
2. Copia tutto il contenuto
3. Incollalo in un documento Word/Google Docs
4. Invia al cliente via email con oggetto: "📋 Scheda Appartamento da Compilare"

### Opzione 2: Google Docs
1. Crea un nuovo Google Doc
2. Copia il contenuto di `TEMPLATE_APPARTAMENTO.md`
3. Formattalo (grassetti, dimensioni titoli, ecc.)
4. Condividi il link con permessi di modifica al cliente

### Opzione 3: Stampa PDF
1. Apri il file .md in un editor Markdown (VS Code con preview, Typora, ecc.)
2. Esporta come PDF
3. Invia il PDF al cliente (dovrà compilare a mano o digitalmente)

---

## ✅ COSA FARE QUANDO IL CLIENTE RESTITUISCE IL TEMPLATE

### Passo 1: Verifica Completezza
Controlla che abbia compilato:
- ✓ Nome appartamento
- ✓ Capacità (ospiti, camere, bagni)
- ✓ Descrizione (almeno 2-3 frasi)
- ✓ Orari check-in/out
- ✓ Codici identificativi
- ✓ Almeno 10-15 dotazioni spuntate
- ✓ Link alle foto o cartella con almeno 5 foto

### Passo 2: Prepara le Foto
1. Scarica tutte le foto dal link/cartella fornito
2. Rinomina le foto: `appartamento-nome-01.jpg`, `appartamento-nome-02.jpg`, ecc.
3. Carica le foto su:
   - Server web (cartella `images/properties/`)
   - Servizio cloud (Cloudinary, ImgBB, ecc.)
   - Oppure nella cartella locale `images/`
4. Ottieni gli URL completi di ogni foto

### Passo 3: Crea l'ID Appartamento
Crea un ID univoco dalla posizione, ad esempio:
- "Casa Marina" in "Alghero Centro" → `casa-marina-centro`
- "Villa Vista Mare" → `villa-vista-mare`
- Usa solo minuscole, trattini, nessuno spazio

### Passo 4: Converti in JSON
Apri il file `js/properties-data.json` e aggiungi un nuovo oggetto nella lista `properties`:

```json
{
  "id": "casa-marina-centro",
  "name": "Casa Marina",
  "location": "Alghero Centro",
  "guests": 4,
  "bedrooms": 2,
  "bathrooms": 1,
  "description": "Descrizione copiata dal template compilato dal cliente",
  "images": [
    "images/casa-marina-01.jpg",
    "images/casa-marina-02.jpg",
    "images/casa-marina-03.jpg",
    "images/casa-marina-04.jpg",
    "images/casa-marina-05.jpg"
  ],
  "amenities": [
    "Wi-Fi gratuito",
    "Aria condizionata",
    "TV Smart",
    "Cucina attrezzata",
    "Balcone",
    "Self check-in"
  ],
  "pricePerNight": 95,
  "cancellationPolicy": "Cancellazione gratuita senza pagamento anticipato"
}
```

### Passo 5: Inserisci le Dotazioni
Dal template, prendi tutte le caselle spuntate [X] e inseriscile nell'array `amenities`.

**IMPORTANTE:** Usa la stessa dicitura del template per far funzionare le icone automatiche!

---

## 🎨 ICONE DOTAZIONI AUTOMATICHE

Il sistema assegna automaticamente icone in base al nome della dotazione. Assicurati di usare questi nomi esatti:

### Internet & Tech
- `Wi-Fi gratuito` o `WiFi` → icona Wi-Fi
- `Wi-Fi ad alta velocità` → icona Wi-Fi
- `TV Smart` o `TV` → icona TV

### Climatizzazione
- `Aria condizionata` → icona fiocco neve
- `Climatizzazione` → icona fiocco neve

### Cucina
- `Cucina completa` → icona forchetta-coltello
- `Cucina attrezzata` → icona forchetta-coltello
- `Angolo cottura` → icona forchetta-coltello
- `Frigorifero` → icona frigorifero

### Bagno
- `Doccia` → icona doccia
- `Bidet` → icona toilette
- `Phon` → icona phon
- `Asciugamani` → icona asciugamano
- `Shampoo` → icona goccia

### Camera
- `Biancheria da letto` → icona letto
- `Letto matrimoniale` → icona letto
- `Divano letto` → icona divano

### Servizi
- `Lavatrice` → icona t-shirt
- `Ferro da stiro` → icona ferro
- `Ascensore` → icona ascensore
- `Self check-in` → icona chiave
- `Non fumatori` → icona sigaretta sbarrata

### Esterni
- `Balcone` → icona porta
- `Terrazzo` → icona sole
- `Vista mare` → icona onde
- `Giardino` → icona albero
- `Parcheggio` → icona auto

### Posizione
- `Centro` → icona mappa
- `In città` → icona edifici

### Extra
- `Ristrutturato di recente` → icona pennello

---

## 🔄 FORMATO JSON COMPLETO

```json
{
  "properties": [
    {
      "id": "identificativo-unico",
      "name": "Nome Appartamento",
      "location": "Zona/Quartiere",
      "guests": 4,
      "bedrooms": 2,
      "bathrooms": 1,
      "description": "Descrizione completa dell'appartamento di 2-4 frasi",
      "images": [
        "URL_immagine_1",
        "URL_immagine_2",
        "URL_immagine_3",
        "URL_immagine_4",
        "URL_immagine_5"
      ],
      "amenities": [
        "Dotazione 1",
        "Dotazione 2",
        "Dotazione 3"
      ],
      "pricePerNight": 100,
      "cancellationPolicy": "Cancellazione gratuita senza pagamento anticipato"
    }
  ]
}
```

---

## 📝 CHECKLIST PRIMA DI PUBBLICARE

Prima di pubblicare un nuovo appartamento sul sito:

- [ ] Template compilato completamente dal cliente
- [ ] Foto scaricate e rinominate correttamente (minimo 5)
- [ ] Foto ottimizzate (max 2MB ciascuna, 1920px larghezza)
- [ ] ID univoco creato (minuscolo, trattini, no spazi)
- [ ] JSON aggiunto in `properties-data.json`
- [ ] Tutti i campi obbligatori compilati (name, location, guests, bedrooms, bathrooms, description, images, amenities)
- [ ] Dotazioni con nomi corretti per icone automatiche
- [ ] Testato caricamento pagina: `property-detail.html?id=identificativo-unico`
- [ ] Verificato che titolo, descrizione, dotazioni compaiano correttamente
- [ ] Verificato che gallery funzioni e mostri tutte le foto
- [ ] Verificato form WhatsApp con nome appartamento

---

## 🆘 PROBLEMI COMUNI

### Il cliente non ha i codici identificativi
→ Scrivere "DA DEFINIRE" e aggiornarli dopo

### Le foto sono troppo grandi
→ Usare tool online: TinyPNG, Squoosh, o Photoshop per ridurle

### Il cliente vuole dotazioni non in lista
→ Aggiungerle in "ALTRE DOTAZIONI" e poi nell'array amenities con nome descrittivo

### Non so quale icona usare per una dotazione
→ Verrà usata l'icona di default (cerchio check), oppure puoi mappare nuove icone in `property-detail.js` nell'oggetto `amenityIconMap`

---

## 📞 CONTATTI

Per domande su come compilare il template o problemi tecnici:
- Email: [tuo_email@email.com]
- WhatsApp: [tuo_numero]

---

**Creato per: Casa Vacanze Alghero**  
**Ultima modifica: Febbraio 2026**
