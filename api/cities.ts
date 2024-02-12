class ApiCitiesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get() {
        return useAsyncData(
            'cities',
            () => $fetch(`gis/cities.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }

}

export default ApiCitiesModule;