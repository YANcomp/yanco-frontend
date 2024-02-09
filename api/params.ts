class ApiParamsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get() {
        return useAsyncData(
            'app',
            () => $fetch(`/appParams.json`, {
                ...this.$opts,
                method: 'GET',
                // params: {
                //     search: search.value,
                // }
            })
        );
    }
}

export default ApiParamsModule;