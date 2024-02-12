export default function (basket: any) {
    const meStore = useMeStore()
    const basketStore = useBasketStore()
    if ("undefined" == typeof window) return {
        withoutCard: 0,
        withCard: 0,
        withPeriod: 0,
        defaultWithPeriod: 0
    };
    var o = meStore.hasPaidPeriod,
        r = meStore.hasPromoCode,
        c = meStore.hasLoyalCard,
        l = basketStore.priceCheckItems,
        d = basket.reduce((result: any, item: any) => {
            return result.withoutCard += item.price.withoutCard * item.count, result.withCard += item.price.withCard * item.count, result.withPeriod += item.price.withPeriod * item.count, result.defaultWithPeriod += item.price.withPeriod * item.count, result
        }, {
            withoutCard: 0,
            withCard: 0,
            withPeriod: 0,
            defaultWithPeriod: 0
        });
    return (o || r) && l > 0 && (d.withPeriod = l), c && !o && l > 0 && (d.withCard = l), d
}