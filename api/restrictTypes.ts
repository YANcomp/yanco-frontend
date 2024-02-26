class ApiRestrictTypesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get() {
        //return o.a.get("catalog/products/restrictTypes")
        return await $fetch(`catalog/products/restrictTypes/restrictTypes.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiRestrictTypesModule;