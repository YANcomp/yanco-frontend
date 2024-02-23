class ApiPropertiesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(propID: any) {
        //TODO return o.a.get("catalog/products/properties?typeID=".concat(t))
        return await $fetch(`catalog/products/properties/` + propID + '.json', {
            ...this.$opts,
            method: 'GET',
        })
    }
}

export default ApiPropertiesModule;