import {defineStore} from "pinia";

export const useViewedProductStore = defineStore('viewedProduct', {
    state: () => ({
        items: <any>[],
        viewedProductsIDs: <any>[]
    }),
    actions: {

    },
    getters: {

    }
})
