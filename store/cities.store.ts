import {defineStore} from "pinia";

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        currentCity: <any>{
            ID: 3,
            allowDelivery: false,
            coords: [55.69188, 37.62657],
            districtID: 548,
            hasPharmacies: true,
            isCity: true,
            locality: "Москва, Москва",
            name: "Москва",
            regionID: 77,
            regionName: "Москва",
            slug: "moskva",
        },
        list: <any>undefined,
    }),

    actions: {
        async CITIES_UPD(val: any, needLocalStorage?: boolean) {
            if (needLocalStorage) {
                localStorage?.setItem("city", JSON.stringify(val))
            }
            if (this.currentCity.name !== val.name) {
                this.currentCity = val
            }
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
