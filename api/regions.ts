class ApiRegionsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get() {
        return await $fetch(`gis/regions.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiRegionsModule;