class ApiCatalogModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get() {
        return useAsyncData(
            'catalog',
            () => $fetch(`catalog/catalog.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }
}

export default ApiCatalogModule;