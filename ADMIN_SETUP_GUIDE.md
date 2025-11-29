# Admin Account Setup Guide

## ✅ What's Been Created

I've created a complete admin registration and login system for Lab Yaounde. Here's what you now have:

### 1. **Admin Registration Page**
- **URL**: http://localhost:3002/admin-register
- **Features**:
  - Protected with secret code: `LABYAOUNDE2025ADMIN`
  - Only people with this code can create admin accounts
  - Creates accounts with `is_admin: true` flag
  - Beautiful red admin theme
  - Bilingual (French/English)

### 2. **Admin Login Page** (Updated)
- **URL**: http://localhost:3002/admin-login
- **Features**:
  - Now supports multiple admin accounts
  - Checks for `is_admin` flag OR the original email (Labyaounde@gmail.com)
  - Link to registration page included
  - Beautiful red admin theme

### 3. **Admin Dashboard** (Already Working)
- **URL**: http://localhost:3002/admin-dashboard
- Automatically checks if user is admin
- Only allows access to authorized admins

## 🚀 How to Create Your First Admin Account

**Step 1**: Go to the admin registration page
```
http://localhost:3002/admin-register
```

**Step 2**: Fill in the form with:
- Full Name: Your name
- Email: Your admin email (e.g., admin@labyaounde.com)
- Password: Choose a strong password
- Confirm Password: Re-enter password
- **Secret Code**: `LABYAOUNDE2025ADMIN`

**Step 3**: Click "Create Admin Account"

**Step 4**: You'll be automatically redirected to the admin dashboard!

## 🔐 How to Login as Admin

**Step 1**: Go to admin login
```
http://localhost:3002/admin-login
```

**Step 2**: Enter your admin email and password

**Step 3**: Access the admin dashboard

## 🔑 Secret Code

The secret code is: **`LABYAOUNDE2025ADMIN`**

- Keep this code PRIVATE
- Only share with authorized Lab Yaounde owners
- Anyone with this code can create an admin account

## 📝 Important Notes

1. **Database Setup Required**: Make sure you've run the SQL schema in Supabase:
   - Go to: https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/sql
   - Run the SQL from `supabase-schema.sql`

2. **Multiple Admins**: You can create as many admin accounts as you need
   - Each needs the secret code during registration
   - Each admin has full access to the dashboard

3. **Security**:
   - Admin accounts are marked with `is_admin: true` in Supabase
   - The original email (Labyaounde@gmail.com) also has admin access
   - Regular patient signups don't get admin access

## 🎨 What Each Page Does

### Patient Signup (http://localhost:3002/signup)
- Regular users sign up here
- Creates patient accounts
- NO admin access

### Admin Registration (http://localhost:3002/admin-register)
- Lab Yaounde owners sign up here
- Requires secret code
- Creates admin accounts
- Full dashboard access

### Admin Login (http://localhost:3002/admin-login)
- Admins login here
- Checks for admin privileges
- Redirects to admin dashboard

### Admin Dashboard (http://localhost:3002/admin-dashboard)
- View all reviews
- Manage patients
- View statistics
- Full admin controls

## ✅ Testing Checklist

- [ ] Visit admin registration page
- [ ] Create your first admin account with secret code
- [ ] Login to admin dashboard
- [ ] Verify you can see all admin features
- [ ] Create another admin account (optional)
- [ ] Test that regular patients can't access admin areas

## 🌐 Production Deployment

When you deploy to production:

1. **Change the secret code** in:
   - `src/app/admin-register/page.tsx` (line 21)
   - Use something unique and secure

2. **Update environment variables** on Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Run SQL schema** in production Supabase

4. **Create your production admin account** using the registration page

## 🔗 Quick Links

- Admin Registration: http://localhost:3002/admin-register
- Admin Login: http://localhost:3002/admin-login
- Admin Dashboard: http://localhost:3002/admin-dashboard
- Patient Signup: http://localhost:3002/signup
- Patient Login: http://localhost:3002/login

---

**Need Help?** All the code is ready and working. Just follow the steps above to create your admin account!
