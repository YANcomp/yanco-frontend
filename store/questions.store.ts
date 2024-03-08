import {defineStore} from "pinia";

export const useQuestionsStore = defineStore('questions', {
    state: () => ({
        help: <any>[],
        distanceSale: <any>[],
        subscription: <any>[],
        mpPage: <any>[],
    }),
    actions: {
        async GET_HELP() {
            return new Promise((resolve: any, reject: any) => {
                useNuxtApp().$api.FAQ.get("help").then((n: any) => {
                    this.COMMIT_GET_HELP(n)
                    resolve(n)
                }).catch((t: any) => {
                    reject(t)
                })
            })
        },
        async GET_DISTANCE_SALE() {
            return new Promise((resolve: any, reject: any) => {
                useNuxtApp().$api.FAQ.get("distance-sale").then((n: any) => {
                    this.COMMIT_GET_DISTANCE_SALE(n)
                    resolve(n)
                }).catch((t: any) => {
                    reject(t)
                })
            })
        },
        async GET_SUBSCRIPTION() {
            return new Promise((resolve: any, reject: any) => {
                useNuxtApp().$api.FAQ.get("subscription").then((n: any) => {
                    this.COMMIT_GET_SUBSCRIPTION(n)
                    resolve(n)
                }).catch((t: any) => {
                    reject(t)
                })
            })
        },
        async GET_DELIVERY() {
            return new Promise((resolve: any, reject: any) => {
                useNuxtApp().$api.FAQ.get("delivery").then((n: any) => {
                    this.COMMIT_GET_DELIVERY(n)
                    resolve(n)
                }).catch((t: any) => {
                    reject(t)
                })
            })
        },
        async GET_MP_PAGE() {
            return new Promise((resolve: any, reject: any) => {
                useNuxtApp().$api.FAQ.get("mp-page").then((n: any) => {
                    this.COMMIT_GET_MP_PAGE(n)
                    resolve(n)
                }).catch((t: any) => {
                    reject(t)
                })
            })
        },
        async COMMIT_GET_HELP(val: any) {
            this.help = val
        },
        async COMMIT_GET_DISTANCE_SALE(val: any) {
            this.distanceSale = val
        },
        async COMMIT_GET_SUBSCRIPTION(val: any) {
            this.subscription = val
        },
        async COMMIT_GET_DELIVERY(val: any) {
            this.subscription = val
        },
        async COMMIT_GET_MP_PAGE(val: any) {
            this.mpPage = val
        },
    },
    getters: {}
})
