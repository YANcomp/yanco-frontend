import {defineStore} from "pinia";

export const useProductsStore = defineStore('products', {
    state: () => ({
        list: <any>[],
        buyToday: <any>[],
        productOfDay: <any>{},
        specialOffers: <any>[],
        ourProduction: <any>[],

        item: <any>{},
        recommendations: <any>[],
        replacements: <any>[],
        reviews: <any>[],
        totalCountReviews: <any>undefined,
        trademarkProducts: <any>[],
    }),
    //CHECK 90%
    actions: {
        async PRODUCT_GET(filter?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.products.get(filter).then((res: any) => {
                    this.COMMIT_PRODUCT_GET(res[0] ? res[0] : {})
                    resolve(res[0] ? res[0] : {})
                }).catch((t) => {
                    reject(t)
                })
            })
        },
        async PRODUCT_GET_COUNT(e?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.products.get(e.filter, ["ID"]).then((res) => {
                    e.mutation({
                        products: null != res ? res : [],
                        listName: e.listName
                    })
                    resolve(null != res ? res : [])
                }).catch((t) => {
                    reject(t)
                })
            })
        },
        async PRODUCT_GET_PRODUCT_OF_DAY(e?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.productOfDay.get(e).then((res: any) => {
                    this.COMMIT_PRODUCT_GET_PRODUCT_OF_DAY(res[0] ? res[0] : {})
                    resolve(res[0] ? res[0] : {});
                }).catch((t) => {
                    reject(t)
                })
            })
        },
        async PRODUCT_GET_LIST(e?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.products.get(e.filter, e.fields!, e.path!).then((res: any) => {
                    e.needNotMutation || this.COMMIT_PRODUCT_GET_LIST({
                        products: ["withCategory", "search"].includes(e.path!) ? res.products ? res.products : [] : res ? res : [],
                        needToLoad: e.needToLoad,
                        listName: e.listName
                    })
                    resolve(null != res ? res : [])
                }).catch((t) => {
                    reject(t)
                })
            })
        },
        async PRODUCT_GET_REVIEWS(p?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.reviews.get(p.filter, p.fields).then((n) => {
                    if (p.mutation) {
                        p.mutation(n)
                    } else {
                        this.COMMIT_PRODUCT_GET_REVIEWS(n)
                    }
                    resolve(null != n ? n : [])
                }).catch((t) => {
                    reject(t)
                })
            })
        },

        //COMMITS
        async COMMIT_PRODUCT_GET(val?: any) {
            this.item = val
        },
        async COMMIT_PRODUCT_GET_COUNT(val?: any) {
            this.$patch((state: any) => {
                state[val.listName] = (val.products ? val.products : []).length
            })
        },
        async COMMIT_PRODUCT_GET_PRODUCT_OF_DAY(val?: any) {
            this.productOfDay = val ? val : {}
        },
        async COMMIT_PRODUCT_GET_LIST(val?: any) {
            this.$patch((state: any) => {
                state[val.listName] = val.needToLoad ? [].concat(state[val.listName] ? state[val.listName] : [], val.products) : val.products
            })
        },
        async COMMIT_PRODUCT_GET_REVIEWS(val?: any) {
            this.reviews = val
        },
        async COMMIT_PRODUCT_GET_REVIEWS_TOTAL_COUNT(val?: any) {
            this.totalCountReviews = (val ? val : []).length
        },
        async COMMIT_PRODUCT_UPD_PRODUCT_THE_MIGHT_NEED(val?: any) {
            this.$patch((state: any) => {
                state.productTheMightNeed = val
            })
        },
    },
    getters: {}
})
