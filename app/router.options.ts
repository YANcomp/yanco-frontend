import type {RouterConfig} from '@nuxt/schema'
import type {RouteRecordRaw} from "vue-router";
import {merge} from "lodash-es";

export default <RouterConfig>{
    // TODO
    // scrollBehavior: async (to, from, savedPosition) => {
    //     return new Promise(async (resolve, reject) => {
    //         const nuxtApp = useNuxtApp()
    //
    //         if (to.hash) {
    //             setTimeout(
    //                 () => {
    //                     resolve({el: to.hash, top: 60, behavior: 'smooth'})
    //                 },
    //                 !from || to.path != from.path ? 500 : 1
    //             )
    //         } else if (savedPosition) {
    //             nuxtApp.hooks.hook('page:finish', async () => {
    //                 await nextTick()
    //                 setTimeout(() => {
    //                     resolve({...savedPosition, behavior: 'smooth'})
    //                 }, 200)
    //             })
    //         } else {
    //             nuxtApp.hooks.hook('page:finish', async () => {
    //                 await nextTick()
    //                 setTimeout(() => {
    //                     resolve({top: 0, behavior: 'smooth'})
    //                 }, 130)
    //             })
    //         }
    //     })
    // },
    mode: "history",
    base:
        "/",
    linkActiveClass:
        "nuxt-link-active",
    linkExactActiveClass:
        "nuxt-link-exact-active",
    routes: (_routes) => [
        {
            path: "/",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "index"
        },
        {
            path: "/about",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "about"
        },
        {
            path: "/account",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "account",
            children: [{
                path: "bindings",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "account-bindings"
            }, {
                path: "card",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "account-card"
            }, {
                path: "favorites-pharmacies",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "account-favorites-pharmacies"
            }, {
                path: "orders",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "account-orders"
            }, {
                path: "settings",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "account-settings"
            }, {
                path: "subscription",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "account-subscription"
            }, {
                path: "order/:id?",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "account-order-id"
            }]
        },
        {
            path: "/basket",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "basket"
        },
        {
            path: "/bloggers",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "bloggers"
        },
        {
            path: "/catalog",
            component: () => import('~/components/pages/VCatalog.vue').then(r => r.default || r),
            name: "catalog",
        },
        {
            path: "/checkout",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "checkout"
        },
        {
            path: "/compare",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "compare"
        },
        {
            path: "/cross-action",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "cross-action"
        },
        {
            path: "/delivery",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "delivery"
        },
        {
            path: "/distance-sale",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "distance-sale"
        },
        {
            path: "/error",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "error"
        },
        {
            path: "/favorites",
            component: () => import('~/components/pages/vFavorites.vue').then(r => r.default || r),
            name: "favorites"
        },
        {
            path: "/help",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "help"
        },
        {
            path: "/investment",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "investment"
        },
        {
            path: "/landlords",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "landlords"
        },
        {
            path: "/loyal",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "loyal"
        },
        {
            path: "/mobile",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "mobile"
        },
        {
            path: "/partners",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "partners"
        },
        {
            path: "/pharmacies",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "pharmacies"
        },
        {
            path: "/survey",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "survey"
        },
        {
            path: "/vacancies",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "vacancies"
        },
        {
            path: "/login",
            redirect: {
                name: "login-or-registration",
                params: {
                    mode: "login"
                }
            },
            name: "login"
        },
        {
            path: "/registration",
            redirect: {
                name: "login-or-registration",
                params: {
                    mode: "registration"
                }
            },
            name: "registration"
        },
        {
            path: "/:mode(login|registration)",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "login-or-registration"
        },
        {
            path: "/pages/:slug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "Pages"
        },
        {
            path: "/distance-sale/:slug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "Company"
        },
        {
            path: "/product/:productID(\\d+)-:productSlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    productID: Number(t.params.productID),
                    needOpenSidebar: t.params.needOpenSidebar,
                    itemCount: t.params.itemCount
                })
            },
            name: "Product",
            children: [{
                path: "otzyvy",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                name: "ProductReviews"
            }]
        },
        {
            path: "/stock/:slug?",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    slug: t.params.slug
                })
            },
            name: "Stock"
        },
        {
            path: "/catalog/:typeID(\\d+)-:typeSlug/:subtypeID(\\d+)-:subtypeSlug/:categoryID(\\d+)-:categorySlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    typeID: Number(t.params.typeID),
                    subtypeID: Number(t.params.subtypeID),
                    categoryID: Number(t.params.categoryID)
                })
            },
            name: "CatalogCategory"
        },
        {
            path: "/catalog/select-in-category/:productID(\\d+)",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    productID: Number(t.params.productID)
                })
            },
            name: "SelectInCategory"
        },
        {
            path: "/catalog/:typeID(\\d+)-:typeSlug/:subtypeID(\\d+)-:subtypeSlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    typeID: Number(t.params.typeID),
                    subtypeID: Number(t.params.subtypeID)
                })
            },
            name: "CatalogSubtype"
        },
        {
            path: "/catalog/:typeID(\\d+)-:typeSlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    typeID: Number(t.params.typeID)
                })
            },
            name: "CatalogType"
        },
        {
            path: "/catalog/:slug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "CatalogNewYears"
        },
        {
            path: "/search/:search",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "Search"
        },
        {
            path: "/poll/:ID(\\d+)",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    ID: Number(t.params.ID)
                })
            },
            name: "Poll"
        },
        {
            path: "/catalog/categories/:popularCategory",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "PopularCategories"
        },
        {
            path: "/deystvuyushchee_veshchestvo",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "ActiveSubstances"
        },
        {
            path: "/deystvuyushchee_veshchestvo/:propertyID(\\d+)-:propertySlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    propertyTypeID: 6,
                    propertyID: Number(t.params.propertyID)
                })
            },
            name: "ActiveSubstance"
        },
        {
            path: "/proizvoditel",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "Manufacturers"
        },
        {
            path: "/proizvoditel/:propertyID(\\d+)-:propertySlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    propertyTypeID: 13,
                    propertyID: Number(t.params.propertyID)
                })
            },
            name: "Manufacturer"
        },
        {
            path: "/brand",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "Brands"
        },
        {
            path: "/brand/:propertyID(\\d+)-:propertySlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    propertyTypeID: 10,
                    propertyID: Number(t.params.propertyID)
                })
            },
            name: "Brand"
        },
        {
            path: "/analogi",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "Analogi"
        },
        {
            path: "/analogi/:propertyID(\\d+)-:propertySlug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    propertyTypeID: 10,
                    propertyID: Number(t.params.propertyID)
                })
            },
            name: "BrandAnalogs"
        },
        {
            path: "/redkie-preparaty",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            name: "RareProducts"
        },
        {
            path: "/apteki",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    ID: Number(t.params.ID),
                    slug: t.params.slug
                })
            },
            name: "Apteki",
            children: [{
                path: ":ID(\\d+)-:slug",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                props: function (t: any) {
                    return Object.assign(Object.assign({}, t.params), {}, {
                        ID: Number(t.params.ID),
                        slug: t.params.slug
                    })
                },
                name: "PharmaciesCity"
            }]
        },
        {
            path: "/confirmation/:code?",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
            },
            alias: "/account",
            name: "Confirmation"
        },
        {
            path: "/blog/400-:slug",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    slug: t.params.slug
                })
            },
            name: "Allvit",
            children: [{
                path: ":setName",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                props: function (t: any) {
                    return Object.assign(Object.assign({}, t.params), {}, {
                        setName: t.params.setName
                    })
                },
                name: "AllvitSections",
                children: [{
                    path: ":productID",
                    component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                    props: function (t: any) {
                        return Object.assign(Object.assign({}, t.params), {}, {
                            productID: t.params.productID
                        })
                    },
                    name: "AllvitProduct"
                }]
            }]
        },
        {
            path: "/:sectionName(blog|news)",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "Articles",
            children: [{
                path: ":categoryName(mom-and-child|intresting-and-useful)?/:ID(\\d+)-:slug",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                props: function (t: any) {
                    return Object.assign(Object.assign({}, t.params), {}, {
                        ID: Number(t.params.ID),
                        slug: t.params.slug
                    })
                },
                name: "Article"
            }, {
                path: "/:sectionName(blog|news)/:categoryName(mom-and-child|intresting-and-useful)?",
                component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
                props: function (t: any) {
                    return Object.assign(Object.assign({}, t.params), {}, {
                        sectionName: t.params.sectionName,
                        categoryName: t.params.categoryName
                    })
                },
                name: "ArticleList"
            }]
        },
        {
            path: "/vacancies/faces",
            component: () => import('~/components/pages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "WorkInFaces"
        }
    ].map(route => withMeta(_routes, route))
}

function withMeta(originalRoutes: Readonly<RouteRecordRaw[]>, route: RouteRecordRaw) {
    const originalRoute = originalRoutes.find(originalRoute => originalRoute.path === route.path)

    return merge(originalRoute, route)
}