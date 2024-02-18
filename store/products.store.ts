import {defineStore} from "pinia";

export const useProductsStore = defineStore('products', {
    state: () => ({
        item: <any>{},
        productOfDay: <any>{},
    }),
    //TODO
    actions: {
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
    },
    // getters: {
    //     getIsLoading: function (state) {
    //         return state.requestCounter > 0
    //     }
    // }
})
