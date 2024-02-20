class ApiBasketModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get(cityID?: any) {
        //"basket?cityID=".concat(cityID)
        return $fetch(`basket/basket.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

    async upd(items: any, cityID: any) {
        //"basket?cityID=".concat(cityID)
        return $fetch(`basket/basket.json`, {
            ...this.$opts,
            method: 'PATCH',
        })
    }

    async newCheck(items: any) {
        //TODO return o.a.post("basket/processing", items)
        return $fetch(`basket/processing.json`, {
            ...this.$opts,
            method: 'POST',
        })

    }

    async replacement(items: any) {
        //TODO return o.a.post("basket/replacements", b)
        return $fetch(`basket/replacements.json`, {
            ...this.$opts,
            method: 'POST',
        })
    }
}

export default ApiBasketModule;