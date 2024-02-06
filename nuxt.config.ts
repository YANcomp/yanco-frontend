// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: true,
    app: {
        head: {
            title: "Yanco Beauty",
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=no"},
                {"http-equiv": "Content-Type", content: "text/html; charset=UTF-8"}
            ],
            link: [
                {rel: "icon", type: "image/x-icon", href: "https://cdn.apteka-april.ru/web/statics/logo.png"},
                {rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700"}
            ],
            style: [],
            script: [],
            noscript: [
                {textContent: 'JavaScript is required'}
            ]
        }
    },
    css: [
        '~/assets/css/main.css',
        '~/assets/css/icons.css'
    ],
    devtools: {enabled: false},
    telemetry: false,
    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        '@nuxtjs/device'
    ],
    pinia: {
        storesDirs: ['./store/**'],
    },
})
