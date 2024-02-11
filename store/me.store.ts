import {defineStore} from "pinia";

export const useMeStore = defineStore('me', {
    state: () => ({
        me: <any>{}
    }),
    //TODO
    actions: {
        async ME_GET() {
            this.me = {}
        },
        async ME_UPD() {
            this.me = {}
        },
    },
    getters: {
        getMe: function (state) {
            return void 0 === state.me ? void 0 : {
                ...state.me,
                birthday: uToDate(state.me?.birthday)
            }
        },
        loyalCard: function (state) {
            return state.me ? state.me.loyalCard : undefined
        },
        hasLoyalCard: function (state) {
            return state.me === undefined ? undefined : state.me.loyalCard
        },
        hasPaidPeriod: function (state) {
            return state.me.loyalCard === undefined ? undefined : state.me.loyalCard.periodBlockDate
        },
        hasSubscription: function (state) {
            return state.me === undefined ? undefined : state.me.isSubscribePeriod
        },
        hasPromoCode: function (state) {
            return state.me === undefined ? undefined : state.me.promocode
        },
        saved: function (state) {
            return "" + (state.me.loyalCard.saved ? state.me.loyalCard.saved : 0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        },
    }
})
