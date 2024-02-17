class ApiParamsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get() {
        return await $fetch(`params/params.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }
}

export default ApiParamsModule;