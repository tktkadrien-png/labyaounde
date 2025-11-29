# Admin Registration & Profile Image Setup Instructions

## Overview
Your Lab Yaounde website now has two new features:
1. **Admin Registration System** - Secure admin account creation with secret code
2. **Profile Image Upload** - Patients can upload profile photos

---

## 1. Admin Registration System

### How It Works
- The signup page now has a toggle button to switch between **Patient** and **Administrator** registration
- Admin registration requires a **secret code**: `LABYAOUNDE2025ADMIN`
- Only users who register with this code will have admin access

### Features
- **Visual Distinction**: Admin mode shows red theme, patient mode shows blue theme
- **Secure Access**: Secret code validation prevents unauthorized admin registration
- **Role-Based Routing**: Admins are redirected to dashboard, patients to review page
- **Dual Authentication**: Admin access works via both email (`Labyaounde@gmail.com`) AND `is_admin` flag

### How to Register as Admin
1. Go to the signup page: `http://localhost:3000/signup`
2. Click **"S'inscrire en tant qu'administrateur"** (Register as administrator)
3. Fill in your details:
   - Full name
   - Email address
   - Password
   - Confirm password
   - **Secret Code**: `LABYAOUNDE2025ADMIN`
4. Click **"Créer compte administrateur"** (Create admin account)
5. You'll be automatically redirected to the admin dashboard

### Security Notes
- Keep the secret code (`LABYAOUNDE2025ADMIN`) confidential
- Only share it with trusted website owners
- To change the secret code, edit line 30 in `src/app/signup/page.tsx`

---

## 2. Profile Image Upload

### How It Works
- Patients can upload profile photos from their profile page
- Images are stored in Supabase Storage
- Photos are displayed in navigation and throughout the site

### Setup Required: Create Supabase Storage Bucket

**IMPORTANT**: You must create a storage bucket in Supabase for this feature to work.

### Step-by-Step Setup:

1. **Go to Supabase Dashboard**
   ```
   https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/storage/buckets
   ```

2. **Create New Bucket**
   - Click **"New bucket"**
   - Bucket name: `profiles`
   - Public bucket: **Yes** (check the box)
   - Click **"Create bucket"**

3. **Configure Bucket Policies** (Optional - for additional security)
   - Click on the `profiles` bucket
   - Go to **"Policies"** tab
   - Add policy to allow authenticated users to upload:

   ```sql
   -- Allow authenticated users to upload their own avatars
   CREATE POLICY "Users can upload their own avatar"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (
     bucket_id = 'profiles'
     AND (storage.foldername(name))[1] = 'avatars'
   );

   -- Allow authenticated users to update their own avatars
   CREATE POLICY "Users can update their own avatar"
   ON storage.objects FOR UPDATE
   TO authenticated
   USING (
     bucket_id = 'profiles'
     AND (storage.foldername(name))[1] = 'avatars'
   );

   -- Allow public to view avatars
   CREATE POLICY "Anyone can view avatars"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'profiles');
   ```

### How Patients Upload Images:
1. Log in to the website
2. Click on profile icon in navigation
3. Select **"Mon profil"** / **"My Profile"**
4. Click the camera icon on the profile photo placeholder
5. Select an image file
6. Image uploads automatically and displays immediately

---

## 3. Database Schema Update

### What Changed
The database schema now supports admin role checking via the `is_admin` flag.

### Update Your Database:

1. **Go to Supabase SQL Editor**
   ```
   https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/sql
   ```

2. **Run the Updated Schema**
   - Open `supabase-schema.sql` in this project
   - Copy the **entire** contents
   - Paste into SQL Editor
   - Click **"Run"**

   **Note**: If you've already run this schema before, Supabase will skip existing tables/policies and only add the new ones.

### What the Update Does:
- Updates admin policies to check BOTH email and `is_admin` flag
- Allows multiple admin accounts (not just the main email)
- Maintains backward compatibility with existing admin email

---

## 4. Testing Your Setup

### Test Admin Registration:
- [ ] Go to signup page
- [ ] Click "Register as administrator" toggle
- [ ] Fill form with secret code
- [ ] Verify redirect to admin dashboard
- [ ] Check dashboard shows all admin features

### Test Patient Registration:
- [ ] Go to signup page
- [ ] Keep "Register as patient" mode (default)
- [ ] Fill form without secret code
- [ ] Verify redirect to review page
- [ ] Confirm NO access to admin dashboard

### Test Profile Image Upload:
- [ ] Log in as patient
- [ ] Go to profile page
- [ ] Click camera icon
- [ ] Upload an image
- [ ] Verify image displays in profile
- [ ] Check image shows in navigation dropdown

### Test Admin Access:
- [ ] Log in with admin account
- [ ] Verify admin dashboard access
- [ ] Check all admin features work (reviews, patients, results)
- [ ] Confirm stats display correctly

---

## 5. File Changes Summary

### New Files:
- `ADMIN_SETUP_INSTRUCTIONS.md` - This file

### Modified Files:
- `src/app/signup/page.tsx` - Added admin registration with secret code
- `src/app/profile/page.tsx` - Added image upload functionality
- `src/app/admin-dashboard/page.tsx` - Updated admin check to include `is_admin` flag
- `supabase-schema.sql` - Updated admin policies for dual authentication

---

## 6. Configuration

### Secret Code
**Current Code**: `LABYAOUNDE2025ADMIN`
**Location**: `src/app/signup/page.tsx` line 30

To change it:
```typescript
const ADMIN_SECRET_CODE = "YOUR_NEW_SECRET_CODE";
```

### Admin Email
**Current Email**: `Labyaounde@gmail.com`
**Locations**:
- `src/app/admin-login/page.tsx` line 21
- `src/app/admin-dashboard/page.tsx` line 47

---

## 7. Troubleshooting

### Issue: Profile image upload fails
**Solution**:
1. Verify `profiles` bucket exists in Supabase Storage
2. Ensure bucket is set to public
3. Check browser console for errors
4. Verify Supabase credentials in `.env.local`

### Issue: Admin registration not working
**Solution**:
1. Verify secret code is exactly: `LABYAOUNDE2025ADMIN`
2. Check browser console for errors
3. Clear browser cache and try again
4. Ensure Supabase auth is working

### Issue: Can't access admin dashboard after signup
**Solution**:
1. Verify you used the correct secret code during signup
2. Check user metadata in Supabase Dashboard > Authentication > Users
3. Look for `is_admin: true` in user metadata
4. Try logging out and logging back in

### Issue: Database policies not working
**Solution**:
1. Ensure you ran the updated `supabase-schema.sql`
2. Check policies in Supabase Dashboard > Database > Policies
3. Verify RLS is enabled on all tables
4. Look for policy errors in browser console

---

## 8. Security Best Practices

### Protect Your Secret Code
- Never commit the secret code to public repositories
- Consider using environment variables for production
- Change the code periodically for security

### Monitor Admin Access
- Regularly check admin users in Supabase Dashboard
- Remove admin flag from users who shouldn't have access
- Review admin activity logs

### Image Upload Security
- Set file size limits (currently unlimited)
- Add file type validation (currently accepts all images)
- Consider adding virus scanning for production

---

## 9. Next Steps

### Recommended Enhancements:
1. **Email Notifications**
   - Send confirmation email when admin account is created
   - Notify main admin when new admin registers

2. **Image Optimization**
   - Compress images before upload
   - Generate thumbnails for better performance
   - Add image cropping functionality

3. **Admin Management**
   - Create admin user management page
   - Allow admins to grant/revoke admin access
   - Add admin activity logs

4. **Enhanced Security**
   - Add two-factor authentication for admins
   - Implement IP whitelisting
   - Add admin session timeout

---

## 10. Support

### Quick Links:
- Supabase Dashboard: https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk
- Storage Buckets: https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/storage/buckets
- SQL Editor: https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/sql
- Authentication: https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/auth/users

### Key Files:
- Admin registration: `src/app/signup/page.tsx`
- Admin dashboard: `src/app/admin-dashboard/page.tsx`
- Profile page: `src/app/profile/page.tsx`
- Database schema: `supabase-schema.sql`

---

## ✅ Setup Complete!

Once you've completed the setup steps above, your website will have:
- ✅ Secure admin registration with secret code
- ✅ Profile image upload for all users
- ✅ Multiple admin accounts support
- ✅ Enhanced security and access control

**Remember**: You must create the `profiles` storage bucket in Supabase for profile images to work!
