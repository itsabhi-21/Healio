import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Expose env variables without VITE_ prefix
      'import.meta.env.API_URL': JSON.stringify(env.API_URL),
      'import.meta.env.GOOGLE_AUTH_URL': JSON.stringify(env.GOOGLE_AUTH_URL),
      'import.meta.env.APP_NAME': JSON.stringify(env.APP_NAME),
      'import.meta.env.APP_VERSION': JSON.stringify(env.APP_VERSION),
    }
  }
})
