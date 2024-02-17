import {defineStore} from "pinia";

export const usePopularCategoriesStore = defineStore('popularCategories', {
    state: () => ({
        categories: [],
        count: 0
    }),
    actions: {
        async GET(props: any) {
            return await useNuxtApp().$api.popularCategories.get().then((res) => {
                this.categories = res ? <any>res : []
            }).catch((error: any) => {
                console.log(error)
            })
        },
        async GET_COUNT(props: any) {
            return await useNuxtApp().$api.popularCategories.getCount().then((res) => {
                this.count = (res ? <any>res : []).length
            }).catch((error: any) => {
                console.log(error)
            })
        },
    }
})
