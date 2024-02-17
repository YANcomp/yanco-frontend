import {defineStore} from "pinia";

export const useRegionsStore = defineStore('regions', {
    state: () => ({
        regions: <any>undefined
    }),
    actions: {
        async REGIONS_GET() {
            return await useNuxtApp().$api.regions.get().then(res => {
                this.regions = res
                return Promise.resolve(res)
            }).catch(error => {
                return Promise.reject(error)
            })
        },
    },
})
