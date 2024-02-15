import {defineStore} from "pinia";

export const usePopularCategoriesStore = defineStore('popularCategories', {
    state: () => ({
        categories: [],
        count: 0
    }),
    actions: {
        async GET(props: any) {
            return useNuxtApp().$api.popularCategories.getCount().then((res) => {
                this.categories = res.data.value ? <any>res.data.value : []
            }).catch((error: any) => {
                console.log(error)
            })
        },
        async GET_COUNT(props: any) {
            return useNuxtApp().$api.popularCategories.getCount().then((res) => {
                this.count = (res.data.value ? <any>res.data.value : []).length
            }).catch((error: any) => {
                console.log(error)
            })
        },
    }
})
