import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, ADMIN_SECRET_KEY, checkRateLimit, logAdminRegistration } from '@/lib/supabase-admin';

// ============================================================
// ADMIN REGISTRATION API ROUTE
// This is the ONLY way to create admin accounts
// ============================================================

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  try {
    // 1. Rate limiting check
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      logAdminRegistration({
        timestamp,
        ip,
        email: 'unknown',
        success: false,
        reason: 'Rate limit exceeded',
      });

      return NextResponse.json(
        {
          error: 'Trop de tentatives. Veuillez réessayer dans 15 minutes.',
          error_en: 'Too many attempts. Please try again in 15 minutes.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { email, password, full_name, admin_secret_key } = body;

    // 3. Validate required fields
    if (!email || !password || !admin_secret_key) {
      logAdminRegistration({
        timestamp,
        ip,
        email: email || 'unknown',
        success: false,
        reason: 'Missing required fields',
      });

      return NextResponse.json(
        {
          error: 'Tous les champs sont requis.',
          error_en: 'All fields are required.',
          code: 'MISSING_FIELDS'
        },
        { status: 400 }
      );
    }

    // 4. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logAdminRegistration({
        timestamp,
        ip,
        email,
        success: false,
        reason: 'Invalid email format',
      });

      return NextResponse.json(
        {
          error: 'Format d\'email invalide.',
          error_en: 'Invalid email format.',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      );
    }

    // 5. Validate password strength
    if (password.length < 6) {
      logAdminRegistration({
        timestamp,
        ip,
        email,
        success: false,
        reason: 'Password too short',
      });

      return NextResponse.json(
        {
          error: 'Le mot de passe doit contenir au moins 6 caractères.',
          error_en: 'Password must be at least 6 characters.',
          code: 'WEAK_PASSWORD'
        },
        { status: 400 }
      );
    }

    // 6. CRITICAL: Verify admin secret key
    if (admin_secret_key !== ADMIN_SECRET_KEY) {
      logAdminRegistration({
        timestamp,
        ip,
        email,
        success: false,
        reason: 'Invalid admin secret key',
      });

      // Return generic error to prevent key enumeration
      return NextResponse.json(
        {
          error: 'Clé secrète invalide. Seuls les propriétaires autorisés peuvent créer des comptes admin.',
          error_en: 'Invalid secret key. Only authorized owners can create admin accounts.',
          code: 'INVALID_SECRET_KEY'
        },
        { status: 403 }
      );
    }

    // 7. Get Supabase Admin client (null if not configured)
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not configured');
      logAdminRegistration({
        timestamp,
        ip,
        email,
        success: false,
        reason: 'Server misconfiguration - missing service role key',
      });

      return NextResponse.json(
        {
          error: 'Configuration serveur incomplète. Contactez l\'administrateur.',
          error_en: 'Server configuration incomplete. Contact administrator.',
          code: 'SERVER_CONFIG_ERROR'
        },
        { status: 500 }
      );
    }

    // 8. Create admin user using Supabase Admin API
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for admin
      user_metadata: {
        full_name: full_name || 'Admin',
        is_admin: true,
        role: 'admin',
      },
    });

    if (authError) {
      console.error('Supabase auth error:', authError);

      logAdminRegistration({
        timestamp,
        ip,
        email,
        success: false,
        reason: `Supabase error: ${authError.message}`,
      });

      // Handle specific errors
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        return NextResponse.json(
          {
            error: 'Cette adresse email est déjà utilisée.',
            error_en: 'This email address is already in use.',
            code: 'EMAIL_EXISTS'
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          error: 'Erreur lors de la création du compte. Veuillez réessayer.',
          error_en: 'Error creating account. Please try again.',
          code: 'AUTH_ERROR'
        },
        { status: 500 }
      );
    }

    // 9. Create/update profile with admin role
    if (authData.user) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: authData.user.id,
          full_name: full_name || 'Admin',
          role: 'admin',
          is_admin: true,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't fail the registration, just log it
        // The user is created, profile can be fixed later
      }
    }

    // 10. Log successful registration
    logAdminRegistration({
      timestamp,
      ip,
      email,
      success: true,
      reason: 'Admin account created successfully',
    });

    // 11. Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Compte administrateur créé avec succès.',
        message_en: 'Admin account created successfully.',
        user: {
          id: authData.user?.id,
          email: authData.user?.email,
        }
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Admin registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    logAdminRegistration({
      timestamp,
      ip,
      email: 'unknown',
      success: false,
      reason: `Unexpected error: ${errorMessage}`,
    });

    return NextResponse.json(
      {
        error: 'Une erreur inattendue est survenue. Veuillez réessayer.',
        error_en: 'An unexpected error occurred. Please try again.',
        code: 'UNEXPECTED_ERROR'
      },
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
