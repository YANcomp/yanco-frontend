class ApiBasketModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get() {
        return useAsyncData(
            'basket',
            () => $fetch(`params/params.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }

    async upd() {
        return useAsyncData(
            'basket',
            () => $fetch(`params/params.json`, {
                ...this.$opts,
                method: 'PATCH',
            })
        );
    }

    async newCheck() {
        return useAsyncData(
            'basket',
            () => $fetch(`params/params.json`, {
                ...this.$opts,
                method: 'POST',
            })
        );
    }

    async replacement() {
        return useAsyncData(
            'basket',
            () => $fetch(`params/params.json`, {
                ...this.$opts,
                method: 'POST',
            })
        );
    }
}

export default ApiBasketModule;