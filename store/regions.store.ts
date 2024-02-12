import {defineStore} from "pinia";

export const useRegionsStore = defineStore('regions', {
    state: () => ({
        regions: <any>undefined
    }),
    actions: {
        async REGIONS_GET() {
            const {data: regions, error} = await useNuxtApp().$api.regions.get()
            if (error.value) {
                return Promise.reject(error.value)
            } else {
                this.regions = regions.value
                return Promise.resolve(regions.value)
            }
        },
    },
})
