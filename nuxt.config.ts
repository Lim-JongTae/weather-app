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
      weatherApi: process.env.WEATHER_API,
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
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
