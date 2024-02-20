import {defineStore} from "pinia";
import {debounce} from "lodash-es";

export const useBasketStore = defineStore('basket', {
    state: () => ({
        check: <any>{},
        isBasketConflict: false,
        items: <any>[],
        newItems: <any>[],
    }),

    actions: {
        async BASKET_GET(cityID: any) {
            return new Promise((resolve) => {
                useNuxtApp().$api.basket.get(cityID).then((res: any) => {
                    let hasLoyalCard = useMeStore().hasLoyalCard,
                        itemsRes = res,
                        conflict = false;
                    if (hasLoyalCard) {
                        if (itemsRes.some((t: any) => {
                            return void 0 !== t.limitWithCard && t.count > t.limitWithCard
                        })) {
                            itemsRes.forEach((t: any) => {
                                return t.count = void 0 !== t.limitWithCard && t.count > t.limitWithCard ? t.limitWithCard : t.count
                            })
                            conflict = true
                        }
                    }
                    if (!hasLoyalCard) {
                        if (itemsRes.some((t: any) => {
                            return void 0 !== t.limitWithoutCard && t.count > t.limitWithoutCard
                        })) {
                            itemsRes.forEach((t: any) => {
                                return t.count = void 0 !== t.limitWithoutCard && t.count > t.limitWithoutCard ? t.limitWithoutCard : t.count
                            })
                            conflict = true
                        }
                    }

                    let l = itemsRes.reduce((t: any, e: any, i: any, n: any) => {
                        e.isRemoved || void 0 === e.mightNeedID || n.map((i: any) => {
                            return i.productID
                        }).includes(e.mightNeedID) || t.includes(e.mightNeedID) || t.push(e.mightNeedID)

                        return t
                    }, []);

                    if (l.length > 0) {

                        useNuxtApp().$api.products.get("ID={".concat(l.join(","), "}&cityID=").concat(cityID), ["ID", "slug", "price", "name", "images", "isInStock", "isAvailable", "allowDelivery", "allowOnlinePayment", "averageRating", "reviewsNumber", "imagesSizeXS", "imagesSizeS"]).then((e: any) => {
                            let n, o, c = <any>{};
                            if (e.length > 1)
                                if (Math.min.apply(0, e.map((i: any) => {
                                    return i.price.withoutCard
                                })) !== Math.max.apply(0, e.map((i: any) => {
                                    return i.price.withoutCard
                                }))) c = e.reduce((t: any, e: any) => {
                                    return e.price.withoutCard > t.price.withoutCard ? e : t
                                })
                                else {
                                    let l = null === (n = itemsRes.find((i: any) => {
                                        return void 0 !== i.mightNeedID && !i.isRemoved
                                    })) || void 0 === n ? void 0 : n.mightNeedID;
                                    c = e.find((i: any) => {
                                        return i.ID === l
                                    })
                                }
                            else c = e[0];
                            c = {
                                ...c,
                                route: {
                                    name: "Product",
                                    params: {
                                        productID: "".concat(c.ID),
                                        productSlug: c.slug
                                    }
                                },
                                parentID: null === (o = itemsRes.find((i: any) => {
                                    return i.mightNeedID === (null == c ? void 0 : c.ID) && !i.isRemoved
                                })) || void 0 === o ? void 0 : o.productID
                            }
                            //TODO t.commit("products/".concat(d.PRODUCT.UPD_PRODUCT_THE_MIGHT_NEED), c)
                        })
                    }

                    if (conflict) {
                        useNotificationsStore().NOTIFICATIONS_UPD({
                            title: "Изменилась корзина",
                            desc: "Некоторое количество товаров исключено из корзины из-за превышения допустимого лимита покупки",
                            status: "info"
                        })
                    }
                    this.COMMIT_BASKET_UPD(itemsRes)
                    resolve(res)
                })
            })
        },
        async BASKET_ADD(props: any) {
            let items = props.item,
                cityID = props.cityID,
                isUpdate = props.isUpdate;

            return new Promise((resolve, reject) => {
                this.COMMIT_BASKET_ADD(items)
                let f = <any>[],
                    v = <any>{};

                this.items.forEach((i: any) => {
                    v[i.productID] || (v[i.productID] = {
                        count: 0,
                        isSelected: !0
                    })
                    v[i.productID].count = v[i.productID].count + i.count
                    v[i.productID].isSelected = i.isSelected
                })
                this.newItems.forEach((i: any) => {
                    v[i.productID] || (v[i.productID] = {
                        count: 0,
                        isSelected: !0
                    }), v[i.productID].count = isUpdate ? i.count : v[i.productID].count + i.count, i.isRemoved && delete v[i.productID]
                })

                let V: any = Object.keys(v).map((t) => {
                    return {
                        productID: Number(t),
                        count: v[Number(t)].count,
                        isSelected: v[Number(t)].isSelected
                    }
                });

                this.newItems.forEach((i: any) => {
                    this.items.find((t: any) => {
                        return t.productID === i.productID
                    }) && f.push(i.productID)
                })

                this.BASKET_UPD({
                    items: V,
                    cityID: cityID
                }).then((res: any) => {
                    useAppStore().isMobile || null === res || res.forEach((p: any) => {
                        if (f.includes(p.productID)) {
                            let image = uPrepareProduct({...p}, SIZE_XS, useAppStore().params.cdnURL.url).images[0]
                            useNotificationsStore().NOTIFICATIONS_UPD({
                                status: "basket",
                                image: image
                            })
                        }
                    })
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        async BASKET_UPD(props: any) {
            let items = props.items,
                cityID = props.cityID;
            return new Promise((resolve, reject) => {
                debounce(() => {
                    useNuxtApp().$api.basket.upd(items, null != cityID ? cityID : 41).then((res: any) => {
                        this.COMMIT_BASKET_UPD(res)
                        resolve(res)
                    }).catch((error: any) => {
                        reject(error)
                    })
                }, 1200)
            })
        },
        async COMMIT_BASKET_NEW_CHECK(val: any) {
            this.check = val
        },
        async COMMIT_BASKET_UPD(val: any) {
            let b = val.map((t: any) => {
                return t.isInStock || void 0 === t.priceZakaz || (t.price = t.priceZakaz), t
            });
            this.items = b
            localStorage.setItem("basketLocalStore", JSON.stringify(b))
            this.newItems = []
        },
        async COMMIT_BASKET_ADD(val: any) {
            this.newItems.push(val)
        },
        async COMMIT_BASKET_DEL() {
            this.items = []
        },
        async COMMIT_BASKET_CONFLICT(val: boolean) {
            localStorage.setItem("isBasketConflict", "".concat(<any>val))
            this.isBasketConflict = val
        },
    },
    getters: {
        basketCount: function (state) {
            return (state.items ? state.items : []).reduce((result: any, item: any) => {
                return result += item.isRemoved ? 0 : item.count
            }, 0)
        },
        basketSelectedCount: function (state) {
            return (state.items ? state.items : []).reduce((result: any, item: any) => {
                item.isSelected && (result += item.isRemoved ? 0 : item.count)
                return result
            }, 0)
        },
        inBasket: function (state) {
            return (state.items ? state.items : []).reduce((result: any, item: any) => {
                result[item.productID] = !item.isRemoved
                return result
            }, {})
        },
        priceCheckItems: function (state) {
            //TODO
            // return (null !== (n = null === (e = null === (t = s.check) || void 0 === t ? void 0 : t.order) || void 0 === e ? void 0 : e.items) && void 0 !== n ? n : []).reduce((function (t, e) {
            //     return t += e.price * e.count
            // }), 0)
            return 1000
        },
        selectedItems: function (state) {
            return (state.items ? state.items : []).filter((item: any) => {
                return item.isSelected
            })
        },
        basketItemsLength: function (state) {
            return state.items !== undefined ? state.items.length : undefined
        },
    }
})
