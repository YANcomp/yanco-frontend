class ApiSummaryModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(props: any) {
        // var t = "catalog/products/summary";
        // void 0 !== filter && (t += "?" + filter)

        return await $fetch(`catalog/products/summary/summary.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiSummaryModule;