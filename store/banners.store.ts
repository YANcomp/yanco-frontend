import {defineStore} from "pinia";

export const useBannersStore = defineStore('banners', {
    state: () => ({
        banners: <any>[],
        forCatalog: <any>[],
        youMayNeed: <any>[],
    }),
    actions: {
        async GET(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.banners.get(props).then((res: any) => {
                    this.COMMIT_GET(res)
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        async GET_FOR_CATALOG(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.banners.get(props).then((res: any) => {
                    this.COMMIT_GET_FOR_CATALOG(res)
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        async GET_YOU_MAY_NEED(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.banners.get(props).then((res: any) => {
                    this.COMMIT_GET_YOU_MAY_NEED(res)
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        async COMMIT_GET(val: any) {
            this.banners = val
        },
        async COMMIT_GET_FOR_CATALOG(val: any) {
            this.forCatalog = val
        },
        async COMMIT_GET_YOU_MAY_NEED(val: any) {
            this.youMayNeed = val
        },
    },
})
