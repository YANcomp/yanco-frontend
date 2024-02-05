// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
        '~/assets/css/icons.css'
    ],
    devtools: {enabled: false},
    telemetry: false,
    modules: ['@pinia/nuxt'],
    pinia: {
        storesDirs: ['./store/**'],
    },
})
