# 🚀 Guide de Déploiement Vercel

## ❌ PROBLÈME ACTUEL:
Le build a échoué car les variables d'environnement Supabase ne sont PAS configurées sur Vercel.

**Erreur**: `supabaseUrl is required`

## ✅ SOLUTION - AJOUTER LES VARIABLES D'ENVIRONNEMENT:

### **Étape 1: Allez sur votre projet Vercel**
Ouvrez ce lien:
```
https://vercel.com/greens-projects-a6bb362e/labyaounde/settings/environment-variables
```

### **Étape 2: Ajoutez ces 2 variables d'environnement**

**Variable 1:**
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://aqppeaqlvtjrpztzoswk.supabase.co`
- **Environment**: Cochez **Production**, **Preview**, et **Development**

**Variable 2:**
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcHBlYXFsdnRqcnB6dHpvc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjgwMDUsImV4cCI6MjA3OTY0NDAwNX0.oXEmY-ECKnr2scwy6MzUc8AUv-Unohc21FZ_DBqfsfc`
- **Environment**: Cochez **Production**, **Preview**, et **Development**

### **Étape 3: Cliquez sur "Save"**

### **Étape 4: Redéployez**
Allez sur:
```
https://vercel.com/greens-projects-a6bb362e/labyaounde
```

Cliquez sur **"Redeploy"** ou utilisez cette commande:
```bash
npx vercel --prod --force
```

---

## 📋 ALTERNATIVE - COMMANDE RAPIDE:

Vous pouvez aussi ajouter les variables en une commande:

```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Entrez: https://aqppeaqlvtjrpztzoswk.supabase.co

npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Entrez: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcHBlYXFsdnRqcnB6dHpvc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjgwMDUsImV4cCI6MjA3OTY0NDAwNX0.oXEmY-ECKnr2scwy6MzUc8AUv-Unohc21FZ_DBqfsfc
```

Puis redéployez:
```bash
npx vercel --prod --force
```

---

## 🎯 APRÈS LE DÉPLOIEMENT RÉUSSI:

Votre site sera disponible à:
```
https://labyaounde.vercel.app
```
OU
```
https://labyaounde-dr9rh9nc3-greens-projects-a6bb362e.vercel.app
```

### 📧 LIEN À ENVOYER À VOS CLIENTS:
```
https://labyaounde.vercel.app
```

### 🔐 LIEN ADMIN ACCESS:
```
https://labyaounde.vercel.app/admin-access
```
**Code secret**: `LABYAOUNDE2025ADMIN`

---

## ✅ CHECKLIST APRÈS DÉPLOIEMENT:

- [ ] Ouvrir le site web
- [ ] Tester la page d'accueil
- [ ] Tester l'inscription patient
- [ ] Tester login patient
- [ ] Laisser un avis de test
- [ ] Accéder au dashboard admin avec le code secret
- [ ] Vérifier que les avis s'affichent dans le dashboard

---

**Besoin d'aide?** Tout est maintenant configuré, il suffit d'ajouter les variables d'environnement et redéployer!
