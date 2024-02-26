import {defineStore} from "pinia";

export const useArticlesStore = defineStore('articles', {
    state: () => ({
        products: <any>[],
        categories: <any>[],
        markup: <any>[],
    }),
    //CHECK GETTERS
    actions: {
        async ARTICLES_GET_MARKUP(props?: any) {
            var n = "articleID=".concat(props.ID);
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.articles.getMarkup(n).then((res: any) => {
                    if (null !== res) {
                        this.COMMIT_ARTICLES_GET_MARKUP(res)
                    }
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        },
        async ARTICLES_GET(props?: any) {
            // return new Promise((resolve, reject) => {
            //     useNuxtApp().$api.articles.getMarkup(n).then((res: any) => {
            //         if (null !== res) {
            //             this.COMMIT_ARTICLES_GET(res)
            //         }
            //         resolve(res)
            //     }).catch((err: any) => {
            //         reject(err)
            //     })
            // })
        },
        async ARTICLES_GET_CATEGORIES(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.articles.getCategories().then((res: any) => {
                    this.COMMIT_ARTICLES_GET_CATEGORIES(res)
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        },
        async ARTICLES_GET_PRODUCTS(props?: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.products.get(props.filter, null == props.fields ? void 0 : props.fields).then((res: any) => {
                    let r: any = [],
                        c = (null != res ? res : []).reduce((t: any, e: any) => {
                            t[e.ID] = e
                            return t
                        }, {});
                    this.products.forEach((t: any) => {
                        let p = c[t];
                        void 0 !== p && r.push(p)
                    })
                    this.COMMIT_ARTICLES_GET_PRODUCTS(r)
                    resolve(r)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        async COMMIT_ARTICLES_GET_MARKUP(val: any) {
            this.markup = val
        },
        async COMMIT_ARTICLES_GET(val: any) {
            //TODO  this.categories = val
        },
        async COMMIT_ARTICLES_GET_CATEGORIES(val: any) {
            this.categories = val
        },
        async COMMIT_ARTICLES_GET_PRODUCTS(val: any) {
            this.products = val
        },
    },
    getters: {
        getMarkup: function (state) {
            return state.markup
        },
        getCategoriesTree: function (state) {
            return uToTree(state.categories) //TODO uToTree
        },
        preparedLastArticles: function (state) {
            //TODO
            // return null === (t = state.lastArticles) || void 0 === t ? void 0 : t.map((function (a) {
            //     var t, e, n = (null !== (t = s.categories) && void 0 !== t ? t : []).find((function (t) {
            //             return t.ID === a.categoryID
            //         })),
            //         o = y(y({}, a), {}, {
            //             image: "url(".concat(a.image, ")"),
            //             route: {
            //                 name: "Article",
            //                 params: {
            //                     ID: "".concat(a.ID),
            //                     slug: a.slug,
            //                     sectionName: "blog"
            //                 }
            //             }
            //         });
            //     return void 0 !== n && void 0 !== n.parentID && ((null === (e = o.route) || void 0 === e ? void 0 : e.params).categoryName = n.slug), o
            // }))
        },
    }
})
