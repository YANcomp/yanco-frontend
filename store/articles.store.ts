import {defineStore} from "pinia";

export const useArticlesStore = defineStore('articles', {
    state: () => ({
        products: <any>[],
        article: <any>[],
        categories: <any>[],
        list: <any>[],
        markup: <any>[],
        lastArticles: <any>[],
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
            let filter = props.ID ? "ID=".concat(props.ID, '&slug="').concat(props.slug, '"') : props.filter,
                n = props.ID ? ["ID", "categoryID", "slug", "title", "content", "image", "metaDescription", "metaTitle", "creationTime", "views", "readingTime", "commentsCount", "products"] : ["ID", "categoryID", "slug", "title", "description", "image", "creationTime", "views", "readingTime", "commentsCount"];
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.articles.get(filter, n).then((a: any) => {
                    this.COMMIT_ARTICLES_GET({
                        list: props.ID ? a[0] : null != a ? a : [],
                        needToLoad: props.needToLoad,
                        listName: props.listName
                    })
                    resolve(props.ID ? a[0] : null != a ? a : [])
                }).catch((err: any) => {
                    reject(err)
                })
            })
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
            this.$patch((state: any) => {
                state[val.listName] = val.needToLoad ? [].concat(state[val.listName] ? state[val.listName] : [], val.list) : val.list
            })
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
            return uToTree(state.categories)
        },
        preparedLastArticles: function (state) {
            let t
            return null === (t = state.lastArticles) || void 0 === t ? void 0 : t.map((a: any) => {
                let t, e, n = (null !== (t = state.categories) && void 0 !== t ? t : []).find((t: any) => {
                        return t.ID === a.categoryID
                    }),
                    o = {
                        ...a,
                        image: "url(".concat(a.image, ")"),
                        route: {
                            name: "Article",
                            params: {
                                ID: "".concat(a.ID),
                                slug: a.slug,
                                sectionName: "blog"
                            }
                        }
                    }
                return void 0 !== n && void 0 !== n.parentID && ((null === (e = o.route) || void 0 === e ? void 0 : e.params).categoryName = n.slug), o
            })
        },
    }
})
