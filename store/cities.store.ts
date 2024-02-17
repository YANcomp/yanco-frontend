import {defineStore} from "pinia";

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        currentCity: <any>undefined,
        list: <any>undefined,
    }),

    actions: {
        async CITIES_UPD(val: any) {
            localStorage.setItem("city", JSON.stringify(val))
            this.currentCity = val
        },
        async CITIES_GET() {
            return await useNuxtApp().$api.cities.get().then(res => {
                this.list = res
                return Promise.resolve(res)
            }).catch(error => {
                return Promise.reject(error)
            })
        },
    },
})
