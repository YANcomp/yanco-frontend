class ApiFavoritesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get(props?:any) {
        return await $fetch(`favorites/favorites.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }
    async upd(items?:any, props?:any) {
        return await $fetch(`favorites/favorites.json`, {
            ...this.$opts,
            method: 'PATCH',
        })
    }

}

export default ApiFavoritesModule;