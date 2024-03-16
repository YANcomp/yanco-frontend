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
import ApiPopularCategoriesModule from "~/api/popularCategories";
import ApiStoriesModule from "~/api/stories";
import ApiProductGroupsModule from "~/api/productGroups";
import ApiProductOfDayModule from "~/api/productOfDay";
import ApiProductsModule from "~/api/products";
import ApiFavoritesModule from "~/api/favorites";
import ApiSessionsModule from "~/api/sessions";
import ApiMeModule from "~/api/me";
import ApiSearchModule from "~/api/search";
import ApiPropertiesModule from "~/api/properties";
import ApiSummaryModule from "~/api/summary";
import ApiProductPropertyTypesModule from "~/api/productPropertyTypes";
import ApiRestrictTypesModule from "~/api/restrictTypes";
import ApiReviewsModule from "~/api/reviews";
import ApiViewedProductsModule from "~/api/viewedProducts";
import ApiFaqModule from "~/api/faq";
import ApiPagesModule from "~/api/pages";

export default defineNuxtPlugin((nuxtApp) => {
    const {csrf} = useCsrf()

    const opts: Parameters<typeof $fetch<unknown>> [1] = {
        baseURL: "http://cosmetic.yanco.ru/api",
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
        stories: new ApiStoriesModule(opts),
        // bindings: A,
        // bloggers: C,
        // brandAnalogs: S,
        // cardProjects: w,
        catalog: new ApiCatalogModule(opts),
        // charity: P,
        cities: new ApiCitiesModule(opts),
        // companies: k,
        FAQ: new ApiFaqModule(opts),
        favorites: new ApiFavoritesModule(opts),
        // landlords: x,
        me: new ApiMeModule(opts),
        // metric: N.a,
        // orders: B,
        // orderStatuses: R,
        pages: new ApiPagesModule(opts),
        // partners: F,
        // periods: U,
        // pharmacies: G,
        // polls: $,
        popularCategories: new ApiPopularCategoriesModule(opts),
        // productCategories: H,
        productGroups: new ApiProductGroupsModule(opts),
        productOfDay: new ApiProductOfDayModule(opts),
        productPropertyTypes: new ApiProductPropertyTypesModule(opts),
        products: new ApiProductsModule(opts),
        // productSubtypes: K,
        // productTypes: J,
        properties: new ApiPropertiesModule(opts),
        regions: new ApiRegionsModule(opts),
        restrictTypes: new ApiRestrictTypesModule(opts),
        reviews: new ApiReviewsModule(opts),
        search: new ApiSearchModule(opts),
        sessions: new ApiSessionsModule(opts),
        // subscribe: at,
        summary: new ApiSummaryModule(opts),
        // surveys: ct,
        // users: lt,
        // vacancies: ut,
        viewedProducts: new ApiViewedProductsModule(opts)
    };

    return {
        provide: {
            api: factories,
        },
    };
});