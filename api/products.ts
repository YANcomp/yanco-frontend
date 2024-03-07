class ApiProductsModule {
    private $opts: Parameters<typeof $fetch<unknown>> [1];

    constructor(opts: Parameters<typeof $fetch<unknown>> [1]) {
        this.$opts = opts;
    }

    //TODO
    // get: function (filter, t) {
    //     var e, path = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "products";
    //     switch (path) {
    //     case "search":
    //         e = "";
    //         break;
    //     case "withCategory":
    //     case "random":
    //         e = "catalog/products/";
    //         break;
    //     default:
    //         e = "catalog/"
    //     }
    //     return void 0 !== t && t.length > 0 && (e += t.join(",") + "@"), e += path, void 0 !== filter && (e += "?" + filter), o.a.get(e)
    // }
    async get(filter?: any, select?: any, path?: any) {
        let e = ""
        let pathNew = path ? path : "products";
        switch (path) {
            case "search":
                e = "";
                break;
            case "withCategory":
            case "random":
                e = "catalog/products/";
                break;
            default:
                e = "catalog/"
        }
        void 0 !== select && select.length > 0 && (e += select.join(",") + "@"), e += path
        void 0 !== filter && (e += "?" + filter)
        // return o.a.get(e)

        if (e.includes('price,properties') && filter.includes('typeID=10,ID=3743')) {
            return await $fetch(`catalog/products/pricepropertiestype10id3743.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes('{typeID=10,ID=3743,slug="abirateron"}')) {
            return await $fetch(`catalog/products/type10id3743slugAbirateron.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes('price,properties') && filter.includes('typeID=10,ID=118')) {
            return await $fetch(`catalog/products/pricepropertiestype10id118.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes('{typeID=10,ID=118,slug="agusha"}')) {
            return await $fetch(`catalog/products/type10id118slugAgusha.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes('price,properties') && filter.includes('typeID=10,ID=11623')) {
            return await $fetch(`catalog/products/pricepropertiestype10id11623.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (e.includes('{typeID=10,ID=11623,slug="okuoku"}')) {
            return await $fetch(`catalog/products/type10id11623slugokuoku.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }

        if (filter.includes('categoryID=374')) {
            return await $fetch(`catalog/products/374.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (filter.includes('our_products')) {
            return await $fetch(`catalog/products/ourProducts.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (filter.includes('special_offer')) {
            return await $fetch(`catalog/products/specialOffers.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (filter.includes('buy_today')) {
            return await $fetch(`catalog/products/buyToday.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (filter.includes('categoryID=')) {
            return await $fetch(`catalog/products/225.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (filter.includes('subtypeIDs=')) {
            return await $fetch(`catalog/products/2552.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }
        if (filter.includes('=327211')) {
            return await $fetch(`catalog/products/327211.json`, {
                ...this.$opts,
                method: 'GET',
            })
        }

        return await $fetch(`catalog/products/product.json`, {
            ...this.$opts,
            method: 'GET',
        })
    }
}

export default ApiProductsModule;