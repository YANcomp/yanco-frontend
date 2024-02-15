import {defineStore} from "pinia";

export const useBannersStore = defineStore('banners', {
    state: () => ({
        banners: <any>[]
    }),
    //TODO
    actions: {
        async GET(props?: any) {
            return await useNuxtApp().$api.banners.get().then(res => {
                this.banners = res.data.value
                return Promise.resolve(res.data.value)
            }).catch(error => {
                return Promise.reject(error)
            })
        },
    },
    // getters: {
    //     getIsLoading: function (state) {
    //         return state.requestCounter > 0
    //     }
    // }
})
