import ApiParamsModule from "~/api/params";
import ApiAboutImagesModule from "~/api/aboutImages";
import ApiAdditionalSaleProductsModule from "~/api/additionalSaleProducts";
import ApiAllvitModule from "~/api/allvit";
import ApiArticlesModule from "~/api/articles";
import ApiArticlesCommentModule from "~/api/articlesComment";
import ApiBabyFoodModule from "~/api/babyFood";
import ApiBannersModule from "~/api/banners";
import ApiBasketModule from "~/api/basket";
import ApiCatalogModule from "~/api/catalog";
import ApiCitiesModule from "~/api/cities";
import ApiRegionsModule from "~/api/regions";

export default defineNuxtPlugin((nuxtApp) => {
    const {csrf} = useCsrf()

    const opts: Parameters<typeof $fetch<unknown>> [1] = {
        baseURL: "http://localhost:3000/api",
    }

    opts.headers = (opts.headers || {}) as Record<string, string>
    opts.headers["X-Requested-With"] = "XMLHTTPRequest"
    opts.headers["csrf-token"] = csrf

    /** an object containing all repositories we need to expose */
    const factories = {
        params: new ApiParamsModule(opts),
        aboutImages: new ApiAboutImagesModule(opts),
        additionalSaleProducts: new ApiAdditionalSaleProductsModule(opts),
        allvit: new ApiAllvitModule(opts),
        articles: new ApiArticlesModule(opts),
        articlesComment: new ApiArticlesCommentModule(opts),
        babyFood: new ApiBabyFoodModule(opts),
        banners: new ApiBannersModule(opts),
        basket: new ApiBasketModule(opts),
        // bindings: A,
        // bloggers: C,
        // brandAnalogs: S,
        // cardProjects: w,
        catalog: new ApiCatalogModule(opts),
        // charity: P,
        cities: new ApiCitiesModule(opts),
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
        regions: new ApiRegionsModule(opts),
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