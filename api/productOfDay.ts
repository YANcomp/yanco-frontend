class ApiProductOfDayModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get() {
        return await $fetch(`catalog/products/productOfDay.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiProductOfDayModule;