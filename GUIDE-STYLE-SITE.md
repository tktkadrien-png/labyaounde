# Guide de Style - LabYaounde

## Document de Retouche Simple

---

## COULEURS PRINCIPALES

### Bleu Roi (Primary)
- **Code:** `#0A065D`
- **Usage:** Textes principaux, titres, footer background

### Bleu Clair
- **Code:** `#60AAE3`
- **Usage:** Navbar scroll, backgrounds sections, overlays

### Orange (Accent)
- **Code:** `#FE5000`
- **Usage:** Boutons CTA, liens hover, decorations
- **Hover:** `#CC4000`

### Blanc
- **Code:** `#FFFFFF` ou `#F5F8FD`
- **Usage:** Fonds, textes sur fond sombre

### Cyan
- **Code:** `#00CED1`
- **Usage:** Accents secondaires, gradients

---

## POLICES (FONTS)

### Police Principale
- **Font:** `Roboto, sans-serif`
- **Usage:** Tout le site

### Tailles
- Titre Hero: `text-4xl lg:text-6xl xl:text-7xl` (36px - 72px)
- Titre Section: `text-3xl md:text-4xl lg:text-5xl` (30px - 48px)
- Sous-titre: `text-xl lg:text-2xl` (20px - 24px)
- Texte Body: `text-base md:text-lg` (16px - 18px)
- Petit texte: `text-sm` (14px)

### Poids
- Bold: `font-bold` (700)
- Semibold: `font-semibold` (600)
- Medium: `font-medium` (500)

---

## IMAGES

### Logo
- **Chemin:** `/images/images.png`
- **Taille navbar:** `h-24 sm:h-28 md:h-32 lg:h-[180px]`

### Images Background
- **Footer:** `/images/pexels-polina-tankilevitch-3735716.jpg`
- **Newsletter:** `/images/ChatGPT Image Nov 19, 2025, 01_48_32 AM.png`

### Videos
- **Chemin:** `/videos/`
- **Format:** MP4

---

## NAVIGATION MENU

### A Propos (Mega Menu)
```
Header: "Decouvrez notre laboratoire"
Sous-titre: "Excellence & Innovation depuis 2012"

Qui sommes-nous:
- Notre vision (/notre-vision)
- Nos Standards (/nos-standards)
- Nos Strategies (/nos-strategies)
- Nos Objectifs (/nos-objectifs)

Organisation:
- Organigramme (/organigramme)
- Notre Equipe (/notre-equipe)
- Nos Valeurs (/nos-valeurs)

Footer: "Besoin d'aide? Contactez-nous au (+237) 242 04 68 50"
```

### Nos Services
```
Analyses Medicales:
- Biochimie (/biochimie-clinique)
- Hematologie (/hematologie)
- Immunologie (/immunologie)
- Microbiologie (/microbiologie)
- Parasitologie (/parasitologie)
```

### Assurance Qualite
```
Notre Referentiel:
- Charte de qualite (/charte-de-qualite)
- Controle qualite (/controle-qualite)
- Normes ISO (/normes-iso)
```

### Patients
```
Services Patients:
- Conseils et informations (/conseils-et-informations)
- Dois-je prendre rdv? (/dois-je-prendre-rdv)
- Questions frequentes (/questions-frequentes)
- Mes resultats (/mes-resultats)
- Laisser un avis (/laisser-un-avis)
```

### Carrieres
- Lien direct: `/carrieres/offres-emploi-stages`

---

## BOUTONS

### Bouton Principal (Orange)
```css
bg-[#FE5000] text-white font-bold
hover:bg-[#CC4000]
px-10 py-4 rounded-xl
```

### Bouton Secondaire (Bleu Roi)
```css
bg-[#0A065D] text-white font-semibold
hover:bg-[#0080FF]
py-4 px-10 rounded-lg
```

### Bouton Outline
```css
border-2 border-[#0A065D] text-[#0A065D]
hover:bg-[#0A065D] hover:text-white
```

---

## SECTIONS SPECIALES

### Section A Propos
- Background: `#60AAE3` avec overlay
- Titre: Bleu roi `#0A065D`
- Sous-titre: Blanc `#F5F8FD`
- Boutons: Orange `#FE5000`

### Section Carrieres (Job Openings)
- Background: Bleu roi `#0A065D`
- Cards: Glass effect `bg-white/15 backdrop-blur-md`
- Texte: Blanc
- Boutons CTA: Orange

### Footer
- Background: Bleu roi `#0A065D` avec image
- Texte: Blanc/blanc transparent
- Liens hover: Orange `#FE5000`

### Navbar (Scroll)
- Background: `#60AAE3`
- Texte: Blanc
- Bouton langue: Orange `#FE5000`

---

## EFFETS VISUELS

### Glass Effect
```css
bg-white/10 backdrop-blur-md border border-white/20
```

### Shadow
```css
shadow-lg hover:shadow-xl
shadow-2xl
```

### Hover Transform
```css
hover:scale-105
transform transition-all duration-300
```

### Gradients
```css
/* Bleu Roi Gradient */
bg-gradient-to-br from-[#0A065D] via-[#0080FF] to-[#0909FF]

/* Orange Gradient */
bg-gradient-to-br from-[#FE5000] to-[#CC4000]

/* Cyan Gradient */
bg-gradient-to-br from-[#00CED1] to-[#0A065D]
```

---

## ANIMATIONS

### Fade In
```css
transition-all duration-700
opacity-100 translate-y-0 (visible)
opacity-0 translate-y-8 (hidden)
```

### Pulse
```css
animate-pulse
```

### Hover Rotate
```css
group-hover:rotate-6 transition-transform duration-300
```

---

## CONTACT INFO

- **Telephone:** (+237) 242 04 68 50
- **Email:** contact@labyaounde.cm
- **Adresse:** Carrefour Ancien Batiments, Cite verte Batiment B01 Yaounde 2 Rue 2.711

### Reseaux Sociaux
- Facebook: https://www.facebook.com/profile.php?id=61584110146922
- TikTok: https://www.tiktok.com/@laby.cite.vert
- Instagram: https://www.instagram.com/labyciteverte/

---

## RESPONSIVE BREAKPOINTS

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Container Max Width
```css
max-w-[1200px] mx-auto px-6
```

---

Document cree le: 2026-02-02
Version: 1.0
