class ApiArticlesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async getMarkup(params: any) {
        // TODO "articles/markup?".concat(t)
        // return useAsyncData(
        //     'app',
        //     () => $fetch(`articles/markup.json`, {
        //         ...this.$opts,
        //         method: 'GET',
        //     })
        // );
    }

    async get(filter: any, selects: any) {
        //var path = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "articles",
        //                     e = "articles" === path ? "" : "articles/";
        //                 return void 0 !== t && t.length > 0 && (e += t.join(",") + "@"), e += path, void 0 !== filter && (e += "?" + filter), o.a.get(e)
        return useAsyncData(
            'app',
            () => $fetch(`articles/articles.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }

    async getCategories(filter: any, selects: any) {
        return useAsyncData(
            'app',
            () => $fetch(`articles/categories.json`, {
                ...this.$opts,
                method: 'GET',
            })
        );
    }
}

export default ApiArticlesModule;