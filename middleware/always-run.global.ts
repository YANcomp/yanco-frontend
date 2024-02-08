export default defineNuxtRouteMiddleware(async () => {
    console.log("active global middleware")

    const appStore = useAppStore()
    if (Object.keys(appStore.params).length < 1) {
        await appStore.PARAMS_GET()
    }

    // await t.store.dispatch('app/PARAMS_GET')
    // await t.store.dispatch('catalog/GET')
    // await t.store.dispatch('cities/CITIES_GET')
    // await t.store.dispatch('regions/REGIONS_GET')
})