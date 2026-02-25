import { createClient } from '@supabase/supabase-js';
import { projectId as fallbackProjectId, publicAnonKey as fallbackAnonKey } from '/utils/supabase/info';

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const envProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID?.trim();
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const envServerUrl = import.meta.env.VITE_SERVER_URL?.trim();
const functionName = import.meta.env.VITE_SUPABASE_FUNCTION_NAME?.trim() || 'server';
const functionRoutePrefix = import.meta.env.VITE_SUPABASE_FUNCTION_ROUTE_PREFIX?.trim() || '';

const supabaseUrl =
  envSupabaseUrl ||
  (envProjectId ? `https://${envProjectId}.supabase.co` : `https://${fallbackProjectId}.supabase.co`);

if (!supabaseUrl) {
  throw new Error(
    'Missing Supabase URL. Set VITE_SUPABASE_URL or VITE_SUPABASE_PROJECT_ID in your .env file.'
  );
}

export const publicAnonKey = envAnonKey || fallbackAnonKey;

if (!publicAnonKey) {
  throw new Error('Missing Supabase anon key. Set VITE_SUPABASE_ANON_KEY in your .env file.');
}

const normalizedRoutePrefix = functionRoutePrefix
  ? `/${functionRoutePrefix.replace(/^\/+|\/+$/g, '')}`
  : '';
const normalizedServerUrlOverride = envServerUrl?.replace(/\/+$/g, '');

export const supabase = createClient(supabaseUrl, publicAnonKey);

// Server API base URL: https://<project>.supabase.co/functions/v1/<functionName>[/optional-prefix]
export const serverUrl =
  normalizedServerUrlOverride ||
  `${supabaseUrl}/functions/v1/${functionName}${normalizedRoutePrefix}`;
