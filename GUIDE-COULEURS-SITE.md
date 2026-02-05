# GUIDE DE MODIFICATION DU SITE - LabYaounde

Ce document vous montre comment modifier les elements visuels du site: logo, couleurs, polices.

---

## SOMMAIRE

1. [MODIFICATION DU LOGO](#1-modification-du-logo)
2. [Navigation (Navbar)](#2-navigation-navbar)
3. [Section A Propos (About Us)](#3-section-a-propos)
4. [Section Newsletter](#4-section-newsletter)
5. [Section Offres d'Emploi (Job Openings)](#5-section-offres-demploi)
6. [Section Notre ADN (Three Pillars)](#6-section-notre-adn)
7. [Section Actualites (News)](#7-section-actualites)
8. [Footer](#8-footer)
9. [Palette de couleurs](#9-palette-de-couleurs)

---

## 1. MODIFICATION DU LOGO

### A. Logo dans la Navigation (Navbar)

**Fichier:** `src/components/sections/main-navigation.tsx`

**Ligne ~85-95 - Taille du logo:**

```tsx
// ACTUEL:
<Image
  src="/labyaounde-white-blue.png"
  alt="LabYaounde Logo"
  width={200}
  height={180}
  className="h-28 sm:h-32 md:h-36 lg:h-[200px] w-auto object-contain"
  priority
/>

// POUR MODIFIER LA TAILLE:
// width={200} = largeur en pixels
// height={180} = hauteur en pixels
// h-28 = hauteur mobile (7rem = 112px)
// sm:h-32 = hauteur tablette (8rem = 128px)
// md:h-36 = hauteur ecran moyen (9rem = 144px)
// lg:h-[200px] = hauteur grand ecran (200px)

// EXEMPLES:
// Pour un logo plus petit: h-20 sm:h-24 md:h-28 lg:h-[150px]
// Pour un logo plus grand: h-32 sm:h-36 md:h-40 lg:h-[250px]
```

**Ligne ~80 - Hauteur du conteneur logo:**

```tsx
// ACTUEL:
<Link href="/" className="flex items-center h-28 sm:h-32 md:h-36 lg:h-[180px]">

// Ajustez cette hauteur pour correspondre a votre logo
```

### B. Logo dans le Footer

**Fichier:** `src/components/sections/footer.tsx`

**Ligne ~160-170:**

```tsx
// ACTUEL:
<Image
  src="/labyaounde-white-blue.png"
  alt="LabYaounde"
  width={220}
  height={90}
  className="h-[90px] w-auto object-contain"
  priority
/>

// POUR MODIFIER:
// width={220} = largeur
// height={90} = hauteur
// h-[90px] = hauteur affichee

// EXEMPLES:
// Plus petit: width={150} height={60} className="h-[60px]..."
// Plus grand: width={280} height={120} className="h-[120px]..."
```

---

## 2. NAVIGATION (NAVBAR)

**Fichier:** `src/components/sections/main-navigation.tsx`

### A. Texte des menus

```tsx
// Couleur du texte des liens:
className="text-black hover:text-[#0047AB]"

// Pour changer:
// text-black = couleur normale
// hover:text-[#0047AB] = couleur au survol
```

### B. Bouton de deconnexion

```tsx
// ACTUEL (orange):
className="text-[#FE5000] hover:bg-[#FE5000]/10"

// Pour changer la couleur, modifiez #FE5000
```

---

## 3. SECTION A PROPOS

**Fichier:** `src/components/sections/about-us.tsx`

### Overlay sur la video

```tsx
className="bg-gradient-to-br from-[#ADD8E6]/85 via-[#0047AB]/80 to-[#0080FF]/85"
```

---

## 4. SECTION NEWSLETTER

**Fichier:** `src/components/sections/lab-finder.tsx`

### Fond degrade

```tsx
className="bg-gradient-to-br from-[#87CEEB]/85 via-[#5BA3E0]/80 to-[#00CED1]/85"
```

---

## 5. SECTION OFFRES D'EMPLOI

**Fichier:** `src/components/sections/job-openings.tsx`

### Fond de la section

```tsx
// ACTUEL (bleu roi):
className="bg-[#0A065D]"
```

### Bouton gradient orange

```tsx
className="bg-gradient-to-r from-[#FE5000] to-[#CC4000]"
```

---

## 6. SECTION NOTRE ADN

**Fichier:** `src/components/sections/three-pillars.tsx`

### Fond de la section (orange clair)

```tsx
// ACTUEL:
className="bg-gradient-to-br from-[#FE5000]/15 to-[#FE5000]/25"

// Pour modifier l'intensite:
// /15 = 15% opacite (tres clair)
// /25 = 25% opacite
// /50 = 50% opacite (plus visible)
```

### Couleur du texte

```tsx
// Titre: text-[#0A065D] (bleu roi)
// Sous-titre: text-[#0A065D]/80 (bleu roi 80%)
```

---

## 7. SECTION ACTUALITES

**Fichier:** `src/components/sections/news-articles.tsx`

### Fond gris

```tsx
className="bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#cbd5e1]"
```

---

## 8. FOOTER

**Fichier:** `src/components/sections/footer.tsx`

### Fond bleu

```tsx
className="bg-gradient-to-b from-[#4A90D9]/90 via-[#5BA3E0]/85 to-[#6BB8E8]/90"
```

### Ligne orange sous les titres

```tsx
className="bg-[#FE5000]"
```

---

## 9. PALETTE DE COULEURS

### Couleurs principales

| Nom | Code | Usage |
|-----|------|-------|
| **Orange** | `#FE5000` | Boutons, accents, icones |
| **Orange fonce** | `#CC4000` | Hover boutons |
| **Bleu Roi** | `#0A065D` | Fond job-openings, textes |
| **Bleu Cobalt** | `#0047AB` | Titres, liens |

### Bleus secondaires

| Nom | Code | Usage |
|-----|------|-------|
| Bleu Cobalt | `#0080FF` | Boutons, accents |
| Bleu Ciel | `#87CEEB` | Fonds clairs |
| Cyan | `#00CED1` | Accents, highlights |
| Bleu Moyen | `#5BA3E0` | Degrades |

### Neutres

| Nom | Code | Usage |
|-----|------|-------|
| Blanc | `#FFFFFF` | Fonds |
| Gris Clair | `#f1f5f9` | Fonds sections |
| Noir | `#000000` | Textes |

---

## COMMENT MODIFIER

### Etape 1: Ouvrir le fichier
Dans VS Code, allez dans `src/components/sections/` ou `src/app/`

### Etape 2: Trouver la ligne
Utilisez `Ctrl+G` et tapez le numero de ligne

### Etape 3: Modifier
Remplacez le code hex (ex: `#0047AB`) par votre nouvelle couleur

### Etape 4: Sauvegarder
Appuyez sur `Ctrl+S` - le site se rafraichit automatiquement

### Etape 5: Commiter
```bash
git add .
git commit -m "style: modification des couleurs/logo"
git push origin main
```

---

## ASTUCES TAILWIND CSS

### Opacite
`text-[#0047AB]/80` = 80% opacite

### Degrades
- `bg-gradient-to-r` = vers la droite
- `bg-gradient-to-b` = vers le bas
- `bg-gradient-to-br` = vers bas-droite

### Tailles responsives
- `h-28` = mobile
- `sm:h-32` = tablette (640px+)
- `md:h-36` = moyen (768px+)
- `lg:h-[200px]` = grand (1024px+)

---

*Document mis a jour le 05/02/2026*
