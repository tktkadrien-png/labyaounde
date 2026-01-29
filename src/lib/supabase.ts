import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aqppeaqlvtjrpztzoswk.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcHBlYXFsdnRqcnB6dHpvc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjgwMDUsImV4cCI6MjA3OTY0NDAwNX0.oXEmY-ECKnr2scwy6MzUc8AUv-Unohc21FZ_DBqfsfc';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'X-Client-Info': 'laboyaounde-web',
    },
  },
});

// Types for our database
export interface Review {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  service_type?: string;
  would_recommend?: boolean;
  status?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}
