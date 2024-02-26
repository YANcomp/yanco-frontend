class ApiReviewsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    // get: function (filter, t) {
    //     var e = "catalog/products/";
    //     return void 0 !== t && t.length > 0 && (e += t.join(",") + "@"), e += "reviews", void 0 !== filter && (e += "?" + filter), o.a.get(e)
    // },
    // new: function (t) {
    //     return o.a.post("catalog/products/reviews", t)
    // },
    // update: function (t) {
    //     return o.a.patch("catalog/products/reviews", t)
    // },
    // del: function (t) {
    //     return o.a.delete("catalog/products/reviews?ID=".concat(t.ID))
    // }

    async get(filter: any, t: any) {
        return await $fetch(`catalog/products/reviews.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }

    async new(t: any) {
        // return await $fetch(`catalog/products/reviews.json`, {
        //     ...this.$opts,
        //     method: 'GET',
        // })
    }

    async update(t: any) {
        // return await $fetch(`catalog/products/reviews.json`, {
        //     ...this.$opts,
        //     method: 'GET',
        // })
    }

    async del(t: any) {
        // return await $fetch(`catalog/products/reviews.json`, {
        //     ...this.$opts,
        //     method: 'GET',
        // })
    }

}

export default ApiReviewsModule;