import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

// ============================================================
// ADMIN VERIFICATION API ROUTE
// Verifies if a logged-in user has admin privileges
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id } = body;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID required', is_admin: false },
        { status: 400 }
      );
    }

    // Get Supabase Admin client (null if not configured)
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration incomplete', is_admin: false },
        { status: 500 }
      );
    }

    // Primary check: Query profiles table for admin role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, role, is_admin, email')
      .eq('id', user_id)
      .single();

    if (profileError || !profile) {
      // Fallback to auth user metadata
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(user_id);

      if (userError || !userData.user) {
        return NextResponse.json(
          { error: 'User not found', is_admin: false },
          { status: 404 }
        );
      }

      const isAdmin =
        userData.user.user_metadata?.is_admin === true ||
        userData.user.user_metadata?.role === 'admin' ||
        userData.user.email === 'Labyaounde@gmail.com';

      return NextResponse.json({
        is_admin: isAdmin,
        user: {
          id: userData.user.id,
          email: userData.user.email,
          full_name: userData.user.user_metadata?.full_name,
        }
      });
    }

    // Check admin status from profile
    const isAdmin =
      profile.is_admin === true ||
      profile.role === 'admin' ||
      profile.email === 'Labyaounde@gmail.com';

    return NextResponse.json({
      is_admin: isAdmin,
      user: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role,
      }
    });

  } catch (error: unknown) {
    console.error('Admin verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed', is_admin: false },
      { status: 500 }
    );
  }
}

// Block GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
