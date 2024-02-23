import {defineStore} from "pinia";

export const useProductPropertyTypes = defineStore('productPropertyTypes', {
    state: () => ({
        list: <any>[]
    }),
    actions: {
        async PRODUCT_PROPERTY_TYPES_GET(props?: any) {
            return new Promise( (resolve, reject)=> {
                useNuxtApp().$api.productPropertyTypes.get().then( (res:any)=> {
                    this.COMMIT_PRODUCT_PROPERTY_TYPES_GET(res)
                    resolve(res)
                }).catch( (err:any)=> {
                    reject(err)
                })
            })
        },
        async COMMIT_PRODUCT_PROPERTY_TYPES_GET(val: any) {
            this.list = val
        },
    },
    getters: {}
})
