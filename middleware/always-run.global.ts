export default defineNuxtRouteMiddleware(async () => {
    const appStore = useAppStore()
    const catalogStore = useCatalogStore()

    if (Object.keys(appStore.params).length < 1) {
        await appStore.PARAMS_GET()
    }
    if (Object.keys(catalogStore.catalog).length < 1) {
        await catalogStore.CATALOG_GET()
    }
    // await t.store.dispatch('cities/CITIES_GET')
    // await t.store.dispatch('regions/REGIONS_GET')
})