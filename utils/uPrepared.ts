export default function (product: any, ...opts: any[]) {
    var eProps = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : undefined,
        n = arguments.length > 2 ? arguments[2] : undefined;

    if ("undefined" == typeof window) return product;
    const basketStore = useBasketStore()
    const favoritesStore = useFavoritesStore()
    const meStore = useMeStore()
    var r = basketStore.inBasket,
        c = favoritesStore.inFavorites,
        l = meStore.hasLoyalCard;

    return n ? (null != product ? product : []).reduce((t: any, e: any) => {
        let n, o = null !== (n = e.ID) && void 0 !== n ? n : e.productID;
        return r[o] || t.push({
            ...e,
            isInFavorites: !!c[o]
        }), t
    }, []) : product.map((p: any) => {
        var t, n, o, d, h, m, f, v = null !== (t = p.ID) && void 0 !== t ? t : p.productID,
            V = null !== (n = p.slug) && void 0 !== n ? n : p.productSlug,
            y = null !== (o = p.count) && void 0 !== o ? o : 0,
            _ = {...p};
        return void 0 === eProps || 0 === eProps.length ? (_.route = {
            name: "Product",
            params: {
                productID: "".concat(v),
                productSlug: V
            }
        }, _.isLoyal = void 0 !== p.price && p.price.withCard !== p.price.withoutCard && null !== p.price.withCard, _.isRank = void 0 !== p.price && p.price.withPeriod !== p.price.withoutCard && p.price.withPeriod !== p.price.withCard && null !== p.price.withPeriod, _.isInBasket = !0 === r[v], _.isInFavorites = !!c[v], _.isLimitReached = y >= (l ? null !== (d = p.limitWithCard) && void 0 !== d ? d : 0 : null !== (h = p.limitWithoutCard) && void 0 !== h ? h : 0)) : (eProps.includes("isLoyal") && (_.isLoyal = void 0 !== p.price && p.price.withCard !== p.price.withoutCard && null !== p.price.withCard), eProps.includes("isRank") && (_.isRank = void 0 !== p.price && p.price.withPeriod !== p.price.withoutCard && p.price.withPeriod !== p.price.withCard && null !== p.price.withPeriod), eProps.includes("isInBasket") && (_.isInBasket = !0 === r[v]), eProps.includes("isInFavorites") && (_.isInFavorites = !!c[v]), eProps.includes("isLimitReached") && (_.isLimitReached = y >= (l ? null !== (m = p.limitWithCard) && void 0 !== m ? m : 0 : null !== (f = p.limitWithoutCard) && void 0 !== f ? f : 0)), eProps.includes("route") && (_.route = {
            name: "Product",
            params: {
                productID: "".concat(v),
                productSlug: V
            }
        })), _
    })
}