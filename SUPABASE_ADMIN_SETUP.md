# Supabase Admin Account Setup Guide

This guide will help you create an admin account for Lab Yaounde using Supabase.

## Creating an Admin Account

Since we've simplified the authentication system, admin accounts are now managed directly through Supabase. Here's how to create the admin account:

### Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your Lab Yaounde project

### Step 2: Navigate to Authentication

1. In the left sidebar, click on **Authentication**
2. Click on **Users** tab

### Step 3: Create Admin User Manually

1. Click the **Add User** button (usually in the top right)
2. Fill in the user details:
   - **Email**: `Labyaounde@gmail.com` (or your preferred admin email)
   - **Password**: Create a strong password (you'll use this to login)
   - **Auto Confirm User**: Enable this option (check the box)

3. Click **Create User**

### Step 4: Verify Admin Account

That's it! The authentication system has been simplified:
- No special admin flags needed
- No metadata configuration required
- Admin access is determined by email address

## How Admin Authentication Works

The system uses a simple email-based check:
- If a user logs in with `Labyaounde@gmail.com`, they have admin access
- All other users are regular patients
- No complicated role management needed

## Login as Admin

You have two options to access the admin dashboard:

### Option 1: Direct Admin Login (Recommended)
1. Go to `https://yourwebsite.com/admin-login`
2. Enter:
   - Email: `Labyaounde@gmail.com`
   - Password: [the password you created in Supabase]
3. You'll be redirected to the admin dashboard

### Option 2: Regular Login
1. Go to your website
2. Click **Login** (Se connecter)
3. Enter:
   - Email: `Labyaounde@gmail.com`
   - Password: [the password you created in Supabase]
4. Navigate to `/admin-dashboard` manually

## Regular User Signup

Regular users can sign up normally through the website:
1. Click **Sign Up** (Créer un compte)
2. Fill in their details:
   - Full Name
   - Email
   - Password
   - Confirm Password
3. They are automatically created as patient accounts
4. After signup, they are redirected to the home page

## Security Notes

1. Keep your admin email and password secure
2. Use a strong password for the admin account
3. Consider enabling 2FA in Supabase for additional security
4. Only share admin credentials with trusted team members

## Troubleshooting

### Can't Login as Admin
- Verify the email is exactly `Labyaounde@gmail.com` in Supabase
- Check that the password is correct
- Ensure the user is confirmed in Supabase (Auto Confirm User should be enabled)

### Want to Change Admin Email
If you want to use a different email for admin access, you'll need to update the code:
1. Open the relevant admin check files
2. Search for `Labyaounde@gmail.com`
3. Replace with your new admin email
4. Create a new user in Supabase with that email

## Additional Supabase Configuration

### Email Confirmations (Optional)
By default, email confirmation is disabled for easier signup. If you want to enable it:
1. Go to Authentication > Settings in Supabase
2. Enable Email Confirmations
3. Configure your email templates

### Row Level Security (RLS)
Make sure your `reviews` table has proper RLS policies:
1. Users can insert their own reviews
2. Everyone can read reviews
3. Only admins can update/delete reviews

## Need Help?

If you encounter issues:
1. Check Supabase logs (Project > Logs)
2. Verify user exists in Authentication > Users
3. Ensure the user is confirmed
4. Check browser console for errors
