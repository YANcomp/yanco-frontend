class ApiAdditionalSaleProductsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(params: any) {
        // var e = "catalog/".concat(c.k, "@products/additional?cityID=").concat(t, "[:3]");
        let path = "catalog/products/additional.json"
        return useAsyncData(
            'app',
            () => $fetch(path, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }
}

export default ApiAdditionalSaleProductsModule;