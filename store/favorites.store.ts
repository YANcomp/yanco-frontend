import {defineStore} from "pinia";
import {debounce} from "lodash-es";

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        items: <any>[],
        newItems: <any>[],
    }),
    actions: {
        async FAVORITES_GET(props: any) {
            return new Promise((resolve, reject) => {
                useNuxtApp().$api.favorites.get(props).then((res: any) => {
                    this.COMMIT_FAVORITES_UPD(res)
                    resolve(res)
                }).catch((function (error: any) {
                    reject(error)
                }))
            })
        },
        async FAVORITES_UPD(props: any) {
            let n = props.items,
                o = props.cityID;
            return new Promise((resolve, reject) => {
                debounce(() => {
                    let c = useAppStore().params.maxCountFavorites

                    if (n.length >= c) {
                        useNotificationsStore().NOTIFICATIONS_UPD({
                            title: "Внимание!",
                            desc: "В разделе «Избранное» добавлено максимальное количество товаров – ".concat(c, " шт."),
                            status: "warning"
                        })
                        reject()
                    }

                    useNuxtApp().$api.favorites.upd(n, o).then((p: any) => {
                        this.COMMIT_FAVORITES_UPD(null != p ? p : [])
                        resolve(null != p ? p : [])
                    }).catch((error: any) => {
                        reject(error)
                    })
                }, 1e3)
            })

        },
        async FAVORITES_ADD(props: any) {
            let n = props.itemID,
                o = props.cityID;
            return new Promise((resolve, reject) => {
                this.COMMIT_FAVORITES_ADD(n)
                //TODO
            })
            // return new Promise((function (e, r) {
            //     var c, l, f;
            //     t.commit(h.FAVORITES.ADD, n);
            //     var V = [],
            //         y = (null !== (c = t.state.items) && void 0 !== c ? c : []).map((function (i) {
            //             return i.ID
            //         })),
            //         _ = null !== (l = t.state.newItems) && void 0 !== l ? l : [],
            //         I = t.rootState.app.params.maxCountFavorites;
            //     (null !== (f = t.state.newItems) && void 0 !== f ? f : []).forEach((function (i) {
            //         V.push(i)
            //     }));
            //     var A, C = v(_);
            //     try {
            //         var S = function () {
            //             var e = A.value;
            //             if (y.includes(e)) {
            //                 var n = y.findIndex((function (t) {
            //                     return t === e
            //                 }));
            //                 y.splice(n, 1)
            //             } else {
            //                 if (y.length >= I) return t.dispatch("notifications/".concat(h.NOTIFICATIONS.UPD), {
            //                     title: "Внимание!",
            //                     desc: "В разделе «�?збранное» добавлено максимальное количество товаров – ".concat(I, " шт."),
            //                     status: "warning"
            //                 }, {
            //                     root: !0
            //                 }), "break";
            //                 y.push(e)
            //             }
            //         };
            //         for (C.s(); !(A = C.n()).done;) {
            //             if ("break" === S()) break
            //         }
            //     } catch (t) {
            //         C.e(t)
            //     } finally {
            //         C.f()
            //     }
            //     t.dispatch(h.FAVORITES.UPD, {
            //         items: y,
            //         cityID: o
            //     }).then((function (i) {
            //         t.rootState.app.isMobile || i.forEach((function (p) {
            //             if (V.includes(p.ID)) {
            //                 var image = Object(m.prepareProduct)(d.n.clone(null != p ? p : {}), m.SIZE_XS, t.rootState.app.params.cdnURL.url).images[0];
            //                 t.dispatch("notifications/".concat(h.NOTIFICATIONS.UPD), {
            //                     status: "favorites",
            //                     image: image
            //                 }, {
            //                     root: !0
            //                 })
            //             }
            //         })), e(i)
            //     })).catch((function (t) {
            //         r(t)
            //     }))
            // }))
        },
        //MUTATIONS
        async COMMIT_FAVORITES_ADD(item: any) {
            this.newItems.push(item)
        },
        async COMMIT_FAVORITES_UPD(items: any) {
            this.items = items
            localStorage.setItem("favorites", JSON.stringify(items))
            this.newItems = []
        },
        async COMMIT_FAVORITES_DEL(params: any) {
            this.items = []
            localStorage.removeItem("favorites")
        },
    },
    getters: {
        favoritesCount: function (state) {
            return state.items.length
        },
        inFavorites: function (state) {
            return (state.items ? state.items : []).reduce((function (result: any, item: any) {
                result[item.ID] = true
                return result
            }), {})
        },
    }
})
