# TheWootz Shopify Thema

Volledig custom Shopify thema voor [thewootz.com](https://thewootz.com) — handgemaakte houten snijplanken, hakblokken en borrelplanken.

## Kleurenpalet

| Naam | Hex | Gebruik |
|------|-----|---------|
| Linen | `#F5EFE4` | Hoofdachtergrond |
| Espresso | `#3D2B1F` | Primaire tekst & koppen |
| Mocha | `#6B4F3A` | Secundaire tekst |
| Sage | `#7A8C6E` | Labels & accenten |
| Terracotta | `#B5633A` | CTA knoppen |
| Gold | `#C4974A` | Prijzen & highlights |

---

## 🔗 GitHub → Shopify koppeling (stap voor stap)

### Stap 1 — Zet deze map op GitHub

1. Ga naar [github.com](https://github.com) en maak een **nieuw repository** aan
   - Naam: `thewootz-theme` (of wat je wilt)
   - Zichtbaarheid: **Private** (aanbevolen)
2. Upload alle bestanden uit deze map naar dat repository
   - Of gebruik GitHub Desktop / `git push`

### Stap 2 — Koppel GitHub aan Shopify

1. Ga in je Shopify admin naar **Online Store → Thema's**
2. Klik op **Thema toevoegen → Verbinden met GitHub**
3. Klik **Verbinden met GitHub** — log in als gevraagd
4. Selecteer:
   - **Repository:** `thewootz-theme`
   - **Branch:** `main`
5. Klik **Verbinden** — Shopify importeert het thema automatisch

### Stap 3 — Thema activeren

1. Het thema verschijnt onder "Thema-bibliotheek"
2. Klik **Aanpassen** om het te bewerken in de Theme Editor
3. Of klik **Publiceren** om het live te zetten

### Stap 4 — Instellingen configureren

In de **Theme Editor** (Online Store → Aanpassen):

#### Homepage secties koppelen:
- **Hero** → Voeg 4 productfoto's toe via de afbeeldingskiezer
- **Productgrid** → Selecteer je collectie "all"
- **Uitgelicht product** → Selecteer het hakblok
- **Merkverhaal** → Upload een lifestyle foto
- **E-mail funnel** → Tekst staat al ingesteld

#### Thema-instellingen (tandwiel-icoon):
- **Meta Pixel ID** → Vul je Facebook Pixel ID in
- **Social media URLs** → Instagram, Facebook, TikTok, Pinterest
- **Gratis verzending drempel** → Staat op €80

#### Navigatiemenu's aanmaken (Content → Navigatie):
- `main-menu` → Home, Producten, Ons verhaal, Zakelijk, Contact, Blog
- `footer-shop` → Alle producten met directe links
- `footer-info` → Ons verhaal, Blog, Zakelijk, Retourbeleid
- `footer-contact` → Contactformulier, Instagram, Privacybeleid

### Stap 5 — Automatische updates via GitHub

Elke keer als je een bestand in GitHub aanpast en naar `main` pusht, **wordt het thema automatisch bijgewerkt** in Shopify.

---

## Bestandsstructuur

```
thewootz-theme/
├── assets/
│   ├── base.css          ← Volledig design system
│   └── theme.js          ← Cart, animaties, interacties
├── config/
│   ├── settings_schema.json  ← Theme Editor instellingen
│   └── settings_data.json    ← Standaardwaarden
├── layout/
│   └── theme.liquid      ← Hoofd HTML-structuur + cart drawer
├── locales/
│   └── nl.default.json   ← Nederlandse vertalingen
├── sections/             ← Alle aanpasbare secties
│   ├── announcement-bar.liquid
│   ├── article-page.liquid
│   ├── blog-page.liquid
│   ├── blog-posts.liquid
│   ├── brand-story.liquid
│   ├── care-section.liquid
│   ├── cart-page.liquid
│   ├── email-funnel.liquid
│   ├── featured-collection.liquid
│   ├── featured-product.liquid
│   ├── footer.liquid
│   ├── header.liquid
│   ├── hero.liquid
│   ├── marquee.liquid
│   ├── page-content.liquid
│   ├── product-page.liquid
│   ├── reviews.liquid
│   └── trust-bar.liquid
├── snippets/
│   └── product-recommendations.liquid
└── templates/
    ├── 404.liquid
    ├── article.liquid
    ├── blog.liquid
    ├── cart.liquid
    ├── collection.liquid
    ├── index.json        ← Homepage sectie-volgorde
    ├── index.liquid
    ├── page.liquid
    ├── product.liquid
    ├── search.liquid
    └── customers/
        ├── account.liquid
        └── login.liquid
```

---

## Productlabels via Shopify tags

Voeg tags toe aan producten in Shopify admin voor automatische badges:
- `bestseller` → Donker badge "Bestseller"
- `nieuw` of `new` → Groen badge "Nieuw"
- Uitverkocht → Automatisch via voorraad

---

## Technische details

- **Geen externe dependencies** — puur Liquid + CSS + vanilla JS
- **AJAX cart** — toevoegen zonder paginaverversing
- **Responsive** — mobiel, tablet en desktop
- **SEO** — JSON-LD structured data, canonical URLs, OG tags
- **Meta Pixel** — PageView, AddToCart, InitiateCheckout, Lead tracking
- **Toegankelijkheid** — ARIA labels, keyboard navigatie, focus management
