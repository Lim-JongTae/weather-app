// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'], 

  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    public: {
      weatherApi: process.env.WEATHER_API
    }
  },
  plugins: [
    '~/plugins/firebase.client.ts'
  ],
  app: {
    head: {
      title: 'Weather forecast',
      htmlAttrs: { lang: 'ko'},
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icon.png'
        },        
      ]
    }
  },

})
