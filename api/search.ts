class ApiSearchModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    async get(filter?: any, t?: any) {
        // var e = "";
        // return void 0 !== t && t.length > 0 && (e += t.join(",") + "@"), e += "search", void 0 !== filter && (e += "?" + filter), o.a.get(e)
        return await $fetch(`search/search.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

}

export default ApiSearchModule;