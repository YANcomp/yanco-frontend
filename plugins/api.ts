import ApiParamsModule from "~/api/app";


export default defineNuxtPlugin((nuxtApp) => {
    const {csrf} = useCsrf()

    const opts: Parameters<typeof $fetch<unknown>> [1] = {
        baseURL: "http://localhost:3000",
    }

    opts.headers = (opts.headers || {}) as Record<string, string>
    opts.headers["X-Requested-With"] = "XMLHTTPRequest"
    opts.headers["csrf-token"] = csrf

    /** an object containing all repositories we need to expose */
    const factories = {
        params: new ApiParamsModule(opts),
        // aboutImages: r,
        // additionalSaleProducts: l,
        // allvit: f,
        // articles: v,
        // articlesComment: V,
        // babyFood: y,
        // banners: _,
        // basket: I,
        // bindings: A,
        // bloggers: C,
        // brandAnalogs: S,
        // cardProjects: w,
        // catalog: O,
        // charity: P,
        // cities: D,
        // companies: k,
        // FAQ: T,
        // favorites: E,
        // landlords: x,
        // me: M,
        // metric: N.a,
        // orders: B,
        // orderStatuses: R,
        // pages: j,
        // partners: F,
        // periods: U,
        // pharmacies: G,
        // polls: $,
        // popularCategories: z,
        // productCategories: H,
        // productGroups: W,
        // productOfDay: Q,
        // productPropertyTypes: Y,
        // products: Z,
        // productSubtypes: K,
        // productTypes: J,
        // properties: X,
        // regions: tt,
        // restrictTypes: et,
        // reviews: it,
        // search: nt,
        // sessions: ot,
        // stories: st,
        // subscribe: at,
        // summary: summary,
        // surveys: ct,
        // users: lt,
        // vacancies: ut,
        // viewedProducts: pt
    };

    return {
        provide: {
            api: factories,
        },
    };
});