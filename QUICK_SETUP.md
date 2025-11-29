# Quick Setup Guide - Lab Yaounde Review System

## ✅ Step 1: Credentials Updated

Your `.env.local` has been updated with the correct Supabase credentials:
- **URL**: `https://aqppeaqlvtjrpztzoswk.supabase.co`
- **Key**: Updated ✓

## 🔥 Step 2: Restart Your Dev Server

**IMPORTANT:** Stop and restart your dev server for the new credentials to take effect:

1. Press `Ctrl+C` in your terminal to stop the current server
2. Run: `npm run dev`

## 📊 Step 3: Set Up Database Tables

Go to your Supabase SQL Editor and run the schema:

**Direct Link:** https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/sql

### Instructions:
1. Click the link above (or go to Supabase Dashboard → Your Project → SQL Editor)
2. Click **"New Query"**
3. Copy the ENTIRE contents from the file `supabase-schema.sql` in your project
4. Paste it into the SQL Editor
5. Click **"Run"** (or press Ctrl+Enter)

### What this creates:
- ✅ `reviews` table (stores user reviews)
- ✅ `profiles` table (stores user profile data)
- ✅ Row Level Security policies (data protection)
- ✅ Automatic profile creation on signup
- ✅ Indexes for better performance

## 🧪 Step 4: Test the System

After completing the above steps:

1. Go to: http://localhost:3000/signup
2. Create a test account
3. You'll be redirected to `/laisser-un-avis`
4. Submit a test review
5. Check your Supabase dashboard:
   - Go to: https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/editor
   - Click on the `reviews` table
   - You should see your test review!

## 🎨 What's Been Updated

All pages now have a **minimalist, modern design**:

- ✅ [Login Page](http://localhost:3000/login) - Clean underline borders
- ✅ [Signup Page](http://localhost:3000/signup) - Minimalist form design
- ✅ [Review Page](http://localhost:3000/laisser-un-avis) - Requires authentication, saves to database

## 🔒 Authentication Flow

1. Users must sign up or log in first
2. Authentication is handled by Supabase
3. Only authenticated users can submit reviews
4. Reviews are automatically linked to user accounts
5. User name and email are pre-filled from their profile

## 📝 Quick SQL Schema Summary

If you want to quickly check what tables will be created, here's a summary:

```sql
-- reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT,
  email TEXT,
  rating INTEGER (1-5),
  comment TEXT,
  status TEXT (pending/approved/rejected),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## ❓ Need Help?

- **Database not working?** Make sure you ran the SQL schema in Step 3
- **Login not working?** Make sure you restarted the dev server in Step 2
- **API Key error?** Check that `.env.local` has the correct credentials

## 🚀 You're All Set!

Once you complete the 4 steps above, your review system will be fully functional with:
- User authentication
- Database storage
- Minimalist modern design
- Bilingual support (FR/EN)
