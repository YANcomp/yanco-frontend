import {defineStore} from "pinia";

export const useViewedProductStore = defineStore('viewedProduct', {
    state: () => ({
        items: <any>[],
        viewedProductsIDs: <any>[]
    }),
    actions: {
        async VIEWED_PRODUCTS_GET(props: any) {
            let n = props.IDs,
                o = props.cityID;
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.viewedProducts.get(n, o).then((o: any) => {
                    let r = (null != o ? o : []).reduce((t: any, p: any) => {
                        t[n.indexOf(p.ID)] = p
                        return t
                    }, []).filter((p: any) => {
                        return void 0 !== p
                    });

                    this.COMMIT_VIEWED_PRODUCTS_GET(null != r ? r : [])
                    resolve(null != r ? r : [])
                }).catch((t: any) => {
                    reject(t)
                })
            })
        },
        async VIEWED_PRODUCTS_GET_ID() {
            let ids = JSON.parse(localStorage.getItem("viewedProductsIDs") !== null ? <string>localStorage.getItem("viewedProductsIDs") : "[]").filter((t: any) => {
                return null !== t
            })
            await this.COMMIT_VIEWED_PRODUCTS_GET_ID(ids)
        },
        //COMMITS
        async COMMIT_VIEWED_PRODUCTS_GET(val: any) {
            this.items = val
        },
        async COMMIT_VIEWED_PRODUCTS_GET_ID(val: any) {
            this.viewedProductsIDs = val
        },
    }
})
