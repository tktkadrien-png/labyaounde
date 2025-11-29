# Supabase Setup Instructions

## Step 1: Get Your Supabase API Keys

1. Go to https://supabase.com/dashboard
2. Sign in with your account (tktkadrien@gmail.com)
3. Select your project (or create a new one if you haven't)
4. In the left sidebar, click on **Settings** (gear icon)
5. Click on **API** in the settings menu
6. You will see two important values:

   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (a long JWT token)

## Step 2: Update Your .env.local File

1. Open the file: `.env.local` in your project root
2. Replace the values with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Make sure to copy the ENTIRE anon key - it's very long!

## Step 3: Run the Database Schema

1. Go to https://supabase.com/dashboard
2. Select your project
3. In the left sidebar, click on **SQL Editor**
4. Click **New query**
5. Copy the entire contents of `supabase-schema.sql`
6. Paste it into the SQL Editor
7. Click **Run** (or press Ctrl+Enter)

## Step 4: Restart Your Development Server

After updating `.env.local`, restart your dev server:

1. Stop the current server (Ctrl+C)
2. Run: `npm run dev`

## Step 5: Test Authentication

1. Go to `/signup` and create a test account
2. After signup, you should be redirected to `/laisser-un-avis`
3. Submit a review
4. Check your Supabase dashboard under **Table Editor** > **reviews** to see the submitted review

---

**Note:** The `.env.local` file is ignored by git for security, so your credentials are safe.
