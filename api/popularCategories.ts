class ApiPopularCategoriesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async get(props?: any) {
        return await $fetch(`catalog/categories/popular/popular.json`, {
            ...this.$opts,
            method: 'GET',
        })

    }

    async getCount(props?: any) {
        return await $fetch(`catalog/categories/popular/popular.json`, {
            ...this.$opts,
            method: 'GET',
        })

    }
}

export default ApiPopularCategoriesModule;