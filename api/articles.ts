class ApiArticlesModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    async getMarkup(params: any) {
        // TODO "articles/markup?".concat(t)

        if (params.includes("ID=461")) {
            return await $fetch(`articles/markup/articleID=461.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }

        return await $fetch(`articles/markup/markup.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

    async get(filter: any, selects: any, path?: any) {
        path = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "articles"
        let e = "articles" === path ? "" : "articles/";
        void 0 !== selects && selects.length > 0 && (e += selects.join(",") + "@")
        e += path
        filter && (e += "?" + filter)
        //return o.a.get(e)
        // console.log(filter)
        // console.log(e)
        if (e.includes("articles?ID=428")) {
            return await $fetch(`articles/articlesID=428.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes("articles?ID=461")) {
            return await $fetch(`articles/articlesID=461.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e === "ID@articles?categoryID={3,4,2}") {
            return await $fetch(`articles/articlesIDAll.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e === "ID@articles?categoryID={1}") {
            return await $fetch(`articles/articlesID-1.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e === "ID@articles?categoryID={4}") {
            return await $fetch(`articles/articlesID-4.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e === "ID@articles?categoryID={3}") {
            return await $fetch(`articles/articlesID-3.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes("categoryID={3,4,2}[0:10]")) {
            return await $fetch(`articles/articlesAll.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes("categoryID={4}")) {
            return await $fetch(`articles/articles-4.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes("categoryID={3}")) {
            return await $fetch(`articles/articles-3.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes("categoryID={1}")) {
            return await $fetch(`articles/articles-1.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }

        return await $fetch(`articles/articles.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

    async getCategories() {
        return await $fetch(`articles/categories/categories.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }
}

export default ApiArticlesModule;