class ApiProductGroupsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get(params?: any) {
        return await $fetch(`catalog/products/groups/groups.json`, {
            ...this.$opts,
            method: 'GET',
        })

    }
}

export default ApiProductGroupsModule;