class ApiViewedProductsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(productsIDs: any, cityID?:any) {
        //TODO var n = "catalog/".concat(c.k, "@products");
        //         return o.a.get("".concat(n, '?isNotFound="false"&ID={').concat(t, "}&cityID=").concat(e, "&isInStock=true"))
        return await $fetch(`catalog/products/viewedProducts.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }
}

export default ApiViewedProductsModule;