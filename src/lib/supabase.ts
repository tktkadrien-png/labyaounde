import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aqppeaqlvtjrpztzoswk.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcHBlYXFsdnRqcnB6dHpvc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjgwMDUsImV4cCI6MjA3OTY0NDAwNX0.oXEmY-ECKnr2scwy6MzUc8AUv-Unohc21FZ_DBqfsfc';

// Custom fetch with retry logic for network failures
const fetchWithRetry = async (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      const isLastAttempt = attempt === maxRetries - 1;
      const isNetworkError =
        error?.name === 'AbortError' ||
        error?.message?.toLowerCase().includes('network') ||
        error?.message?.toLowerCase().includes('failed to fetch') ||
        error?.message?.toLowerCase().includes('networkerror');

      if (isLastAttempt || !isNetworkError) {
        throw error;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }

  throw new Error('Network request failed after retries');
};

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
    fetch: fetchWithRetry,
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
