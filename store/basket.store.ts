import {defineStore} from "pinia";

export const useBasketStore = defineStore('basket', {
    state: () => ({
        isBasketConflict: false,
        items: [],
        newItems: [],
    }),
    //TODO
    actions: {
        async BASKET_GET(val: boolean) {
        },
        async BASKET_UPD(val: boolean) {
        },
        async BASKET_ADD(val: boolean) {
        },
    },
    getters: {
        basketCount: function (state) {
            return (state.items ? state.items : []).reduce((result: any, item: any) => {
                return result += item.isRemoved ? 0 : item.count
            }, 0)
        },
        basketSelectedCount: function (state) {
            return (state.items ? state.items : []).reduce((result: any, item: any) => {
                item.isSelected && (result += item.isRemoved ? 0 : item.count)
                return result
            }, 0)
        },
        inBasket: function (state) {
            return (state.items ? state.items : []).reduce((result: any, item: any) => {
                result[item.productID] = !item.isRemoved
                return result
            }, {})
        },
        priceCheckItems: function (state) {
            //TODO
            // return (null !== (n = null === (e = null === (t = s.check) || void 0 === t ? void 0 : t.order) || void 0 === e ? void 0 : e.items) && void 0 !== n ? n : []).reduce((function (t, e) {
            //     return t += e.price * e.count
            // }), 0)
            return 1000
        },
        selectedItems: function (state) {
            return (state.items ? state.items : []).filter((item: any) => {
                return item.isSelected
            })
        },
        basketItemsLength: function (state) {
            return state.items !== undefined ? state.items.length : undefined
        },
    }
})
