import {defineStore} from "pinia";

export const useRestrictTypesStore = defineStore('restrictTypes', {
    state: () => ({
        list: <any>[]
    }),
    //CHECK DONE
    actions: {
        async RESTRICT_TYPES_GET(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.restrictTypes.get().then((res: any) => {
                    this.COMMIT_RESTRICT_TYPES_GET(res)
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        },
        async COMMIT_RESTRICT_TYPES_GET(val: any) {
            this.list = val
        },
    },
    getters: {}
})
