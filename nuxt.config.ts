// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss'
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  nitro: {
    experimental: {
      wasm: true
    }
  },

  vite: {
    server: {
      allowedHosts: ['.ddev.site', '.localhost', '.local', 'simple-search-engine.ddev.site'],
      hmr: false  // Disable HMR to avoid proxy issues
    },
    optimizeDeps: {
      exclude: ['pdf-parse']
    }
  }
})