import { createClient } from '@supabase/supabase-js';
import { projectId as fallbackProjectId, publicAnonKey as fallbackAnonKey } from '/utils/supabase/info';

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const envProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID?.trim();
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const envPublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
const envServerUrl = import.meta.env.VITE_SERVER_URL?.trim();
const functionName = import.meta.env.VITE_SUPABASE_FUNCTION_NAME?.trim() || 'server';
const functionRoutePrefix = import.meta.env.VITE_SUPABASE_FUNCTION_ROUTE_PREFIX?.trim() || '';
const useNetlifyProxy = import.meta.env.VITE_USE_NETLIFY_PROXY === 'true';
const netlifyProxyUrl =
  import.meta.env.VITE_NETLIFY_PROXY_URL?.trim() || '/.netlify/functions/supabase-proxy';

const supabaseUrl =
  envSupabaseUrl ||
  (envProjectId ? `https://${envProjectId}.supabase.co` : `https://${fallbackProjectId}.supabase.co`);

if (!supabaseUrl) {
  throw new Error(
    'Missing Supabase URL. Set VITE_SUPABASE_URL or VITE_SUPABASE_PROJECT_ID in your .env file.'
  );
}

export const publicAnonKey = envAnonKey || envPublishableKey || fallbackAnonKey;

if (!publicAnonKey) {
  throw new Error(
    'Missing Supabase public key. Set VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.'
  );
}

const normalizedRoutePrefix = functionRoutePrefix
  ? `/${functionRoutePrefix.replace(/^\/+|\/+$/g, '')}`
  : '';
const normalizedServerUrlOverride = envServerUrl?.replace(/\/+$/g, '');
const isNetlifyHost =
  typeof window !== 'undefined' && window.location.hostname.endsWith('.netlify.app');
const preferNetlifyProxy = !import.meta.env.DEV && (useNetlifyProxy || isNetlifyHost);
const defaultServerUrl = import.meta.env.DEV
  ? '/api'
  : preferNetlifyProxy
    ? netlifyProxyUrl
    : `${supabaseUrl}/functions/v1/${functionName}${normalizedRoutePrefix}`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

// Server API base URL: https://<project>.supabase.co/functions/v1/<functionName>[/optional-prefix]
export const serverUrl =
  normalizedServerUrlOverride ||
  defaultServerUrl;
