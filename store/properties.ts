import {defineStore} from "pinia";

export const usePropertiesStore = defineStore('properties', {
    state: () => ({
        brands: <any>[],
        list: <any>[],
        brandAnalogsList: <any>[]
    }),
    actions: {
        async GET(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.properties.get(props).then((res: any) => {
                    this.COMMIT_GET({
                        list: null != res ? res : [],
                        name: 10 === props ? "brands" : void 0
                    })
                    resolve(null != res ? res : [])
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        async GET_BRAND_ANALOGS_LIST(props?: any) {
            return new Promise((resolve, reject) => {
                // useNuxtApp().$api.brandAnalogs.getAll().then((res: any) => {
                //     this.COMMIT_GET_BRAND_ANALOGS_LIST(null != res ? res : [])
                //     resolve(res !== null ? res : [])
                // }).catch((error: any) => {
                //     reject(error)
                // })
                resolve([])
            })
        },
        async COMMIT_GET(val?: any) {
            if (val.name !== undefined) {
                if (val.name === "brands") {
                    this.brands = val.list
                }
            } else {
                this.list = val.list
            }
        },
        async COMMIT_GET_BRAND_ANALOGS_LIST(val: any) {
            this.brandAnalogsList = val
        },
    },
    getters: {
        brandDictionary: function (state) {
            return state.brands.reduce((t: any, e: any) => {
                return 10 === e.typeID && (t[e.name.toLocaleLowerCase()] = e), t
            }, {})
        }
    }
})
