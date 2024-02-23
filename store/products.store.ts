import {defineStore} from "pinia";

export const useProductsStore = defineStore('products', {
    state: () => ({
        item: <any>{},
        list: <any>[],
        buyToday: <any>[],
        productOfDay: <any>{},
        specialOffers: <any>[],
        ourProduction: <any>[],
    }),
    //TODO
    actions: {
        async GET_LIST(props?: any) {
            //TODO
            if (props.filter?.length > 190) {
                return await useNuxtApp().$api.products.get_special_offers().then((res: any) => {
                    this.list = res
                    return Promise.resolve(res)
                })
            } else {
                return await useNuxtApp().$api.products.get_our_products().then((res: any) => {
                    this.list = res
                    return Promise.resolve(res)
                })
            }
        },
        async GET_PRODUCT_OF_DAY(props?: any) {
            return await useNuxtApp().$api.productOfDay.get().then((res: any) => {
                this.productOfDay = res[0]
                return Promise.resolve(res[0])
            })
            // return await useNuxtApp().$api.productGroups.get().then(res => {
            //     let n = (res ? <any>res : []).reduce((result: any, item: any) => {
            //         return "site_discounts" === item.slug && (item.name = "Онлайн-акции"), "buy_today" === item.slug && (item.name = "Сегодня покупают"), void 0 === result.find((t: any) => {
            //             return t.slug === item.slug
            //         }) && result.push(item), result
            //     }, []);
            //     n.push({
            //         ID: 111,
            //         name: "Все акции",
            //         slug: "all_stock"
            //     })
            //     this.groups = n
            //     return Promise.resolve(n)
            // }).catch(error => {
            //     return Promise.reject(error)
            // })
        },
        async GET_SPECIAL_OFFERS(props?: any) {
            return await useNuxtApp().$api.products.get_special_offers().then((res: any) => {
                this.specialOffers = res
                return Promise.resolve(res)
            })
            // return await useNuxtApp().$api.productGroups.get().then(res => {
            //     let n = (res ? <any>res : []).reduce((result: any, item: any) => {
            //         return "site_discounts" === item.slug && (item.name = "Онлайн-акции"), "buy_today" === item.slug && (item.name = "Сегодня покупают"), void 0 === result.find((t: any) => {
            //             return t.slug === item.slug
            //         }) && result.push(item), result
            //     }, []);
            //     n.push({
            //         ID: 111,
            //         name: "Все акции",
            //         slug: "all_stock"
            //     })
            //     this.groups = n
            //     return Promise.resolve(n)
            // }).catch(error => {
            //     return Promise.reject(error)
            // })
        },
        async GET_OUR_PRODUCTS(props?: any) {
            return await useNuxtApp().$api.products.get_our_products().then((res: any) => {
                this.ourProduction = res
                return Promise.resolve(res)
            })
            // return await useNuxtApp().$api.productGroups.get().then(res => {
            //     let n = (res ? <any>res : []).reduce((result: any, item: any) => {
            //         return "site_discounts" === item.slug && (item.name = "Онлайн-акции"), "buy_today" === item.slug && (item.name = "Сегодня покупают"), void 0 === result.find((t: any) => {
            //             return t.slug === item.slug
            //         }) && result.push(item), result
            //     }, []);
            //     n.push({
            //         ID: 111,
            //         name: "Все акции",
            //         slug: "all_stock"
            //     })
            //     this.groups = n
            //     return Promise.resolve(n)
            // }).catch(error => {
            //     return Promise.reject(error)
            // })
        },
        async COMMIT_GET_LIST(val?: any) {
            this.list = []
            this.buyToday = []
        },
    },
    // getters: {
    //     getIsLoading: function (state) {
    //         return state.requestCounter > 0
    //     }
    // }
})
