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
            const {data: cities, error} = await useNuxtApp().$api.cities.get()
            if (error.value) {
                return Promise.reject(error.value)
            } else {
                this.list = cities.value
                return Promise.resolve(cities.value)
            }
        },
    },
})
