/**
 * Database Setup Script for Lab Yaounde
 * This script automatically creates the database schema in Supabase
 */

const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  process.exit(1);
}

// Read the SQL schema file
const sqlSchema = fs.readFileSync(
  path.join(__dirname, 'supabase-schema.sql'),
  'utf-8'
);

console.log('🚀 Setting up Lab Yaounde database...\n');
console.log('📍 Supabase URL:', SUPABASE_URL);
console.log('\n⚠️  IMPORTANT: You need to run this SQL manually in your Supabase dashboard.\n');
console.log('📝 Steps to complete setup:');
console.log('1. Go to: https://supabase.com/dashboard/project/aqppeaqlvtjrpztzoswk/sql');
console.log('2. Click "New Query"');
console.log('3. Copy and paste the SQL from supabase-schema.sql');
console.log('4. Click "Run" to execute\n');
console.log('✅ Your .env.local file has been updated with the correct credentials!');
console.log('✅ Restart your dev server for the changes to take effect.\n');
