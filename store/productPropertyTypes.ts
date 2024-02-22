import {defineStore} from "pinia";

export const useProductPropertyTypes = defineStore('productPropertyTypes', {
    state: () => ({
        list: <any>[]
    }),
    actions: {
        async GET(props?: any) {

        },
    },
    getters: {}
})
