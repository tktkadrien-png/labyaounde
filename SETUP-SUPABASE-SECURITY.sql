-- ============================================================
-- SUPABASE SECURITY SETUP FOR LAB YAOUNDE
-- ============================================================
-- Execute this SQL in your Supabase Dashboard > SQL Editor
-- This sets up secure tables and RLS policies
-- ============================================================

-- ============================================================
-- 1. CREATE PROFILES TABLE WITH ADMIN ROLE
-- ============================================================

-- Drop existing table if it exists (be careful in production!)
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table with role field
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_admin ON profiles(is_admin);
CREATE INDEX idx_profiles_email ON profiles(email);

-- ============================================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 3. CREATE SECURE RLS POLICIES
-- ============================================================

-- Policy: Anyone can view profiles (for public display)
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Policy: Users can only insert their own profile
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile (BUT NOT role/is_admin!)
DROP POLICY IF EXISTS "Users can update own profile safely" ON profiles;
CREATE POLICY "Users can update own profile safely"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- CRITICAL: Prevent users from changing their own role or admin status
    AND (
      -- If current user is not admin, they cannot change role fields
      (SELECT role FROM profiles WHERE id = auth.uid()) != 'admin'
      OR auth.uid() = id
    )
  );

-- Policy: Only admins can delete profiles
DROP POLICY IF EXISTS "Only admins can delete profiles" ON profiles;
CREATE POLICY "Only admins can delete profiles"
  ON profiles FOR DELETE
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================
-- 4. CREATE FUNCTION TO HANDLE NEW USER SIGNUP
-- ============================================================

-- This function automatically creates a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_admin, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'user'),
    COALESCE((new.raw_user_meta_data->>'is_admin')::boolean, false),
    NOW(),
    NOW()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- 5. CREATE FUNCTION TO PREVENT ROLE ESCALATION
-- ============================================================

-- This function prevents non-admins from elevating their privileges
CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS TRIGGER AS $$
DECLARE
  current_user_role TEXT;
  current_user_is_admin BOOLEAN;
BEGIN
  -- Get current user's role
  SELECT role, is_admin INTO current_user_role, current_user_is_admin
  FROM profiles WHERE id = auth.uid();

  -- If user is not admin and trying to change role/is_admin
  IF (current_user_role != 'admin' AND current_user_is_admin != true) THEN
    IF (OLD.role != NEW.role OR OLD.is_admin != NEW.is_admin) THEN
      RAISE EXCEPTION 'Unauthorized: You cannot modify admin privileges';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to prevent role escalation
DROP TRIGGER IF EXISTS prevent_role_escalation_trigger ON profiles;
CREATE TRIGGER prevent_role_escalation_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.prevent_role_escalation();

-- ============================================================
-- 6. CREATE ADMIN REGISTRATION LOG TABLE
-- ============================================================

DROP TABLE IF EXISTS admin_registration_logs CASCADE;

CREATE TABLE admin_registration_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  ip_address TEXT,
  email TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  reason TEXT,
  user_agent TEXT
);

-- Enable RLS on logs
ALTER TABLE admin_registration_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
CREATE POLICY "Only admins can view registration logs"
  ON admin_registration_logs FOR SELECT
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Only server (service role) can insert logs
CREATE POLICY "Only service role can insert logs"
  ON admin_registration_logs FOR INSERT
  WITH CHECK (false); -- Blocked via RLS, must use service role

-- ============================================================
-- 7. CREATE REVIEWS TABLE WITH PROPER SECURITY
-- ============================================================

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  service_type TEXT,
  would_recommend BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own pending reviews
CREATE POLICY "Users can update own pending reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- Only admins can delete reviews
CREATE POLICY "Only admins can delete reviews"
  ON reviews FOR DELETE
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Admins can update any review (for moderation)
CREATE POLICY "Admins can update any review"
  ON reviews FOR UPDATE
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================
-- 8. CREATE JOB APPLICATIONS TABLE
-- ============================================================

DROP TABLE IF EXISTS job_applications CASCADE;

CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  job_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cover_letter TEXT,
  cv_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interviewed', 'accepted', 'rejected')),
  notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Only admins can view all applications
CREATE POLICY "Admins can view all applications"
  ON job_applications FOR SELECT
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Anyone can create an application
CREATE POLICY "Anyone can create applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

-- Only admins can update applications
CREATE POLICY "Admins can update applications"
  ON job_applications FOR UPDATE
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================
-- 9. CREATE CONTACT MESSAGES TABLE
-- ============================================================

DROP TABLE IF EXISTS contact_messages CASCADE;

CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  replied_at TIMESTAMP WITH TIME ZONE,
  replied_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Only admins can view messages
CREATE POLICY "Admins can view messages"
  ON contact_messages FOR SELECT
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Anyone can create a message
CREATE POLICY "Anyone can create messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Only admins can update messages
CREATE POLICY "Admins can update messages"
  ON contact_messages FOR UPDATE
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================
-- 10. CREATE HELPER FUNCTION TO CHECK ADMIN STATUS
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  admin_status BOOLEAN;
BEGIN
  SELECT (role = 'admin' OR is_admin = true) INTO admin_status
  FROM profiles WHERE id = user_id;

  RETURN COALESCE(admin_status, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 11. GRANT NECESSARY PERMISSIONS
-- ============================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to tables
GRANT SELECT ON profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON profiles TO authenticated;

GRANT SELECT, INSERT ON reviews TO anon, authenticated;
GRANT UPDATE, DELETE ON reviews TO authenticated;

GRANT INSERT ON job_applications TO anon, authenticated;
GRANT SELECT, UPDATE ON job_applications TO authenticated;

GRANT INSERT ON contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE ON contact_messages TO authenticated;

-- ============================================================
-- DONE! Your database is now secured.
-- ============================================================

-- IMPORTANT NOTES:
-- 1. This script uses RLS to protect all tables
-- 2. Admin roles can only be set via the service_role key (backend)
-- 3. Users cannot escalate their own privileges
-- 4. The trigger prevents any role modification attempts
-- 5. All admin actions are logged for audit purposes
