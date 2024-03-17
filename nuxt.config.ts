export default defineNuxtConfig({
    ssr: true,
    runtimeConfig: {
        // Private keys are only available on the server
        cookieKey: 'session',
        cookie: { // CookieSerializeOptions from unjs/cookie-es
            path: '/',
            httpOnly: true,
            sameSite: 'strict'
        }
    },
    routeRules: {
        '/**': { headers: { 'Access-Control-Allow-Origin': '*' } },
    },
    // Only valid on serve
    webpack: {
        devMiddleware: {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
    },
    app: {
        head: {
            title: "Cosmetic | Yanco",
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=no"},
                {"http-equiv": "Content-Type", content: "text/html; charset=UTF-8"},
                {name: "msapplication-TileColor", content: "#2b5797"},
                {name: "msapplication-config", content: "/img/favicon/browserconfig.xml"},
                {name: "theme-color", content: "#ffffff"},
            ],
            link: [
                {rel: "apple-touch-icon", sizes: "180x180", href: "/img/favicon/apple-touch-icon.png"},
                {rel: "icon", sizes: "32x32", type: "image/png", href: "/img/favicon/favicon-32x32.png"},
                {rel: "icon", sizes: "16x16", type: "image/png", href: "/img/favicon/favicon-16x16.png"},
                {rel: "manifest", href: "/img/favicon/site.webmanifest"},
                {rel: "mask-icon", href: "/img/favicon/safari-pinned-tab.svg", color: "#5bbad5"},
                {rel: "shortcut icon", href: "/img/favicon/favicon.ico"},
            ],
            style: [],
            script: [],
            noscript: [
                {textContent: 'JavaScript is required'}
            ]
        }
    },
    css: [
        '~/assets/css/normalize.css',
        '~/assets/css/main.css',
        '~/assets/css/icons.css'
    ],
    devtools: {enabled: false},
    telemetry: false,
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/device',
        '@nuxtjs/google-fonts',
    ],
    pinia: {
        storesDirs: ['./store/**'],
    },
    googleFonts: {
        families: {
            Montserrat: [400, 500, 600, 700]
        },
        prefetch: false,
        preconnect: true,
        preload: true,
        download: true,
        base64: false,
        overwriting: true // this flag
    }
})
