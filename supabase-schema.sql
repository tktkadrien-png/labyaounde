-- ============================================
-- Lab Yaounde - Supabase Database Schema
-- ============================================
--
-- Instructions:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project
-- 3. Navigate to SQL Editor (left sidebar)
-- 4. Create a new query and paste this entire file
-- 5. Click "Run" to execute
-- ============================================

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS reviews_status_idx ON public.reviews(status);
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON public.reviews(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews table

-- Policy: Users can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
    ON public.reviews
    FOR SELECT
    USING (status = 'approved');

-- Policy: Users can view their own reviews (any status)
CREATE POLICY "Users can view their own reviews"
    ON public.reviews
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Authenticated users can insert their own reviews
CREATE POLICY "Authenticated users can create reviews"
    ON public.reviews
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reviews (only if pending)
CREATE POLICY "Users can update their own pending reviews"
    ON public.reviews
    FOR UPDATE
    USING (auth.uid() = user_id AND status = 'pending')
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
    ON public.reviews
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- Optional: Create profiles table for extended user data
-- ============================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Create trigger for profiles updated_at
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- Create function to automatically create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Create patient_results table for lab results
-- ============================================

CREATE TABLE IF NOT EXISTS public.patient_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    test_name TEXT NOT NULL,
    test_type TEXT NOT NULL,
    result_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'viewed')),
    file_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for patient_results
CREATE INDEX IF NOT EXISTS patient_results_user_id_idx ON public.patient_results(user_id);
CREATE INDEX IF NOT EXISTS patient_results_status_idx ON public.patient_results(status);
CREATE INDEX IF NOT EXISTS patient_results_result_date_idx ON public.patient_results(result_date DESC);

-- Enable RLS for patient_results
ALTER TABLE public.patient_results ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own results
CREATE POLICY "Users can view their own results"
    ON public.patient_results
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can update their own results (mark as viewed)
CREATE POLICY "Users can update their own results"
    ON public.patient_results
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create trigger for patient_results updated_at
CREATE TRIGGER set_patient_results_updated_at
    BEFORE UPDATE ON public.patient_results
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- Admin policies for managing all data
-- ============================================

-- Admin can do everything on reviews (approve/reject)
-- Supports both email-based and is_admin flag-based authentication
CREATE POLICY "Admin can manage all reviews"
    ON public.reviews
    FOR ALL
    USING (
        auth.jwt() ->> 'email' = 'Labyaounde@gmail.com'
        OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
    );

-- Admin can manage all patient results
CREATE POLICY "Admin can manage all patient results"
    ON public.patient_results
    FOR ALL
    USING (
        auth.jwt() ->> 'email' = 'Labyaounde@gmail.com'
        OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
    );

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles"
    ON public.profiles
    FOR SELECT
    USING (
        auth.jwt() ->> 'email' = 'Labyaounde@gmail.com'
        OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
    );

-- ============================================
-- Success! Your database schema is now set up.
-- ============================================
