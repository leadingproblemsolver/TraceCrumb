import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const AI_FUNCTION_NAME = import.meta.env.VITE_AI_FUNCTION_NAME?.trim() || 'ai-orchestrator';

function offlineError(operation) {
  return new Error(
    `Supabase is not configured; ${operation} is unavailable. ` +
      'Copy .env.example to .env.local and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
  );
}

function offlineBuilder(operation) {
  const result = { data: null, error: offlineError(operation) };
  const builder = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    eq: () => builder,
    order: () => builder,
    limit: () => builder,
    single: async () => result,
    maybeSingle: async () => result,
    then: (resolve, reject) => Promise.resolve(result).then(resolve, reject),
  };
  return builder;
}

const offlineClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe() {} } },
    }),
    signUp: async () => ({ data: null, error: offlineError('sign up') }),
    signInWithPassword: async () => ({ data: null, error: offlineError('sign in') }),
    signOut: async () => ({ error: null }),
  },
  from: (table) => offlineBuilder(`table ${table}`),
  functions: {
    invoke: async () => ({ data: null, error: offlineError('AI orchestration') }),
  },
};

if (!isSupabaseConfigured) {
  console.warn(
    'TraceCrumb is running in offline/demo-safe mode because Supabase environment variables are absent.',
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : offlineClient;
