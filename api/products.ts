class ApiProductsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get_special_offers() {
        return await $fetch(`catalog/products/specialOffers.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

    async get_our_products() {
        return await $fetch(`catalog/products/ourProducts.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiProductsModule;