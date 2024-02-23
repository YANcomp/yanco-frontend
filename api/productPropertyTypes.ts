class ApiProductPropertyTypesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get() {
        //catalog/products/propertyTypes

        return await $fetch(`catalog/products/propertyTypes/propertyTypes.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiProductPropertyTypesModule;