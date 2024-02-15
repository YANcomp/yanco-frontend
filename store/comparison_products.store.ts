import {defineStore} from "pinia";

export const useComparisonProductsStore = defineStore('comparisonProducts', {
    state: () => ({
        list: [],
    }),
    actions: {
        async COMPARISON_PRODUCTS_GET(list?:any) {
            if (list) {
                return this.list = list
            }
            this.list = JSON.parse(localStorage.getItem("comparisonProducts") !== null ? <any>localStorage.getItem("comparisonProducts") : "[]");
        },
        async COMPARISON_PRODUCTS_UPD(val: any) {
            if (val.length < 1) {
                localStorage.removeItem("comparisonProducts")
            } else {
                localStorage.setItem("comparisonProducts", JSON.stringify(val))
                this.list = JSON.parse(localStorage.getItem("comparisonProducts") ? <any>localStorage.getItem("comparisonProducts") : "[]")
            }
        },
    }
})
