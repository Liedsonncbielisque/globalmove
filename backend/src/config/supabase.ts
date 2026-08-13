import { createClient } from '@supabase/supabase-js';
import { config } from './env';
import { logger } from '../utils/logger';

export const supabaseClient = createClient(
  config.supabase.url,
  config.supabase.publishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const supabaseAdmin = createClient(
  config.supabase.url,
  config.supabase.secretKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabaseAdmin
      .from('countries')
      .select('count')
      .limit(1);

    if (error) throw error;

    logger.info('✅ Supabase connected successfully');
    return true;
  } catch (error) {
    logger.error('❌ Supabase connection failed:', error);
    return false;
  }
}