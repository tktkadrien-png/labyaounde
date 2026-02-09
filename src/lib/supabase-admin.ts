import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================================
// SUPABASE ADMIN CLIENT - SERVER ONLY
// This file should NEVER be imported in client-side code
// ============================================================

// Lazy-loaded configuration to avoid issues during build
const getConfig = () => ({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ggpzvomrwidmzqsmexer.supabase.co',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
});

// Admin client with service role - bypasses RLS
// ONLY use this on the server side (API routes, server components)
// Returns null if service role key is not configured
let _supabaseAdmin: SupabaseClient | null = null;

export const getSupabaseAdmin = (): SupabaseClient | null => {
  const { supabaseUrl, supabaseServiceRoleKey } = getConfig();

  if (!supabaseServiceRoleKey || supabaseServiceRoleKey === 'YOUR_SERVICE_ROLE_KEY_HERE') {
    console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not configured - admin features disabled');
    return null;
  }

  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return _supabaseAdmin;
};

// Check if admin client is available (without creating it)
export const isAdminConfigured = (): boolean => {
  const { supabaseServiceRoleKey } = getConfig();
  return !!supabaseServiceRoleKey && supabaseServiceRoleKey !== 'YOUR_SERVICE_ROLE_KEY_HERE';
};

// Admin secret key for registration verification
export const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'LABYAOUNDE2025ADMIN';

// Rate limiting storage (in production, use Redis)
const registrationAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Clean up function - called manually, not via setInterval during build
export function cleanupOldAttempts(): void {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  for (const [ip, data] of registrationAttempts.entries()) {
    if (now - data.lastAttempt > oneHour) {
      registrationAttempts.delete(ip);
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now();
  const maxAttempts = 5;
  const windowMs = 15 * 60 * 1000; // 15 minutes

  const record = registrationAttempts.get(ip);

  if (!record) {
    registrationAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true, remainingAttempts: maxAttempts - 1 };
  }

  // Reset if window expired
  if (now - record.lastAttempt > windowMs) {
    registrationAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true, remainingAttempts: maxAttempts - 1 };
  }

  // Check if within limit
  if (record.count >= maxAttempts) {
    return { allowed: false, remainingAttempts: 0 };
  }

  // Increment counter
  record.count++;
  record.lastAttempt = now;
  registrationAttempts.set(ip, record);

  return { allowed: true, remainingAttempts: maxAttempts - record.count };
}

// Log admin registration attempts
export interface AdminRegistrationLog {
  timestamp: string;
  ip: string;
  email: string;
  success: boolean;
  reason?: string;
}

const registrationLogs: AdminRegistrationLog[] = [];

export function logAdminRegistration(log: AdminRegistrationLog): void {
  registrationLogs.push(log);

  // Keep only last 1000 logs in memory (in production, store in database)
  if (registrationLogs.length > 1000) {
    registrationLogs.shift();
  }

  // Console log for debugging
  console.log(`[ADMIN REGISTRATION] ${log.timestamp} - ${log.email} - ${log.success ? 'SUCCESS' : 'FAILED'} - ${log.reason || ''}`);
}

export function getRegistrationLogs(): AdminRegistrationLog[] {
  return [...registrationLogs];
}
