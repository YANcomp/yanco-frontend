export default defineNitroPlugin((nitroApp) => {
    const cookieConfig = useRuntimeConfig().cookie
    const cookieKey = useRuntimeConfig().cookieKey!

    nitroApp.hooks.hook('request', async (event) => {
        let secret = getCookie(event, cookieKey)
        // TODO https://github.com/Morgbn/nuxt-csurf/blob/main/src/runtime/server/plugin/csrf.ts
        event.context.csrfToken = secret
    })
})