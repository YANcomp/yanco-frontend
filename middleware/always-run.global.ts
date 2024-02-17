export default defineNuxtRouteMiddleware(async () => {
    const appStore = useAppStore()
    const catalogStore = useCatalogStore()
    const citiesStore = useCitiesStore()
    const regionsStore = useRegionsStore()

    if (Object.keys(appStore.params).length < 1) {
        await appStore.PARAMS_GET()
    }
    if (Object.keys(catalogStore.catalog).length < 1) {
        await catalogStore.CATALOG_GET()
    }
    if (citiesStore.list === undefined) {
        await citiesStore.CITIES_GET()
    }
    if (regionsStore.regions === undefined) {
        await regionsStore.REGIONS_GET()
    }
    // appStore.BREADCRUMBS_UPD()
})