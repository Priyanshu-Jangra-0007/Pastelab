import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const envSupabaseUrl = env.VITE_SUPABASE_URL?.trim()
  const envProjectId = env.VITE_SUPABASE_PROJECT_ID?.trim()
  const functionName = env.VITE_SUPABASE_FUNCTION_NAME?.trim() || 'server'
  const functionRoutePrefix = env.VITE_SUPABASE_FUNCTION_ROUTE_PREFIX?.trim() || ''

  const supabaseUrl = envSupabaseUrl || (envProjectId ? `https://${envProjectId}.supabase.co` : '')
  const normalizedRoutePrefix = functionRoutePrefix
    ? `/${functionRoutePrefix.replace(/^\/+|\/+$/g, '')}`
    : ''
  const proxyTarget = supabaseUrl
    ? `${supabaseUrl}/functions/v1/${functionName}${normalizedRoutePrefix}`
    : undefined

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used - do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: proxyTarget
      ? {
          proxy: {
            '/api': {
              target: proxyTarget,
              changeOrigin: true,
              rewrite: (p) => p.replace(/^\/api/, ''),
            },
          },
        }
      : undefined,

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
