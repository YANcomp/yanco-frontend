import type {RouterConfig} from '@nuxt/schema'
import type {RouteRecordRaw} from "vue-router";
import {merge} from "lodash-es";

export default <RouterConfig>{
    scrollBehavior: async (t, e, n) => {
        const nuxtApp = useNuxtApp()
        let o: any = navigator.userAgent.toLowerCase(),
            r: any = false,
            c: any = [t];
        r = {
            top: 0,
            left: 0,
            behavior: "smooth"
        }
        n && (r = {...n, behavior: "smooth"})
        let d: any = void 0 !== t.params.productID && void 0 !== e.params.productID;
        return new Promise(async (resolve) => {
            nuxtApp.hooks.hookOnce('page:finish', () => {
                if (t.hash) {
                    let c = t.hash;
                    void 0 !== window.CSS && void 0 !== window.CSS.escape && (c = "#" + window.CSS.escape(c.substr(1)));
                    try {
                        document.querySelector(c) && (r = {
                            selector: c
                        })
                    } catch (t) {
                        console.warn("Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).")
                    }
                }
                d && (+t.params.productID != +e.params.productID && ("Product" === t.name && "ProductReviews" === e.name || "ProductReviews" === t.name && "Product" === e.name) ? resolve(r) : resolve()), /firefox/.test(o) ? setTimeout(() => {
                    resolve(r)
                }, 100) : resolve(r)
            })
        })
    },
    mode: "history",
    base:
        "/",
    linkActiveClass:
        "nuxt-link-active",
    linkExactActiveClass:
        "nuxt-link-exact-active",
    strict: true,
    routes: (_routes) => [
        {
            path: "/",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "index"
        },
        {
            path: "/about",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "about"
        },
        {
            path: "/account",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "account",
            children: [{
                path: "bindings",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                name: "account-bindings"
            }, {
                path: "card",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                name: "account-card"
            }, {
                path: "favorites-pharmacies",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                name: "account-favorites-pharmacies"
            }, {
                path: "orders",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                name: "account-orders"
            }, {
                path: "settings",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                name: "account-settings"
            }, {
                path: "subscription",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                name: "account-subscription"
            }, {
                path: "order/:id?",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                name: "account-order-id"
            }]
        },
        {
            path: "/basket",
            component: () => import('~/components/vPages/vBasket.vue').then(r => r.default || r),
            name: "basket"
        },
        {
            path: "/bloggers",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "bloggers"
        },
        {
            path: "/catalog",
            component: () => import('~/components/vPages/vCatalog.vue').then(r => r.default || r),
            name: "catalog",
        },
        {
            path: "/checkout",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "checkout"
        },
        {
            path: "/compare",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "compare"
        },
        {
            path: "/cross-action",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "cross-action"
        },
        {
            path: "/delivery",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "delivery"
        },
        {
            path: "/distance-sale",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "distance-sale"
        },
        {
            path: "/error",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "error"
        },
        {
            path: "/favorites",
            component: () => import('~/components/vPages/vFavorites.vue').then(r => r.default || r),
            name: "favorites"
        },
        {
            path: "/help",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "help"
        },
        {
            path: "/investment",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "investment"
        },
        {
            path: "/landlords",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "landlords"
        },
        {
            path: "/loyal",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "loyal"
        },
        {
            path: "/mobile",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "mobile"
        },
        {
            path: "/partners",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "partners"
        },
        {
            path: "/pharmacies",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "pharmacies"
        },
        {
            path: "/survey",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "survey"
        },
        {
            path: "/vacancies",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
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
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "login-or-registration"
        },
        {
            path: "/pages/:slug",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "Pages"
        },
        {
            path: "/distance-sale/:slug",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "Company"
        },
        {
            path: "/product/:productID()-:productSlug()",
            component: () => import('~/components/vPages/vProduct.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    productID: Number(t.params.productID),
                    needOpenSidebar: t.params.needOpenSidebar,
                    itemCount: t.params.itemCount
                })
            },
            name: "Product",
        },
        {
            path: "/product/:productID()-:productSlug()/otzyvy",
            component: () => import('~/components/vPages/vProduct.vue'),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    productID: Number(t.params.productID),
                    needOpenSidebar: t.params.needOpenSidebar,
                    itemCount: t.params.itemCount
                })
            },
            name: "ProductReviews"
        },
        {
            path: "/stock/:slug?",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    slug: t.params.slug
                })
            },
            name: "Stock"
        },
        {
            path: "/catalog/:typeID()-:typeSlug()/:subtypeID()-:subtypeSlug()/:categoryID()-:categorySlug()",
            component: () => import('~/components/vPages/vProductList.vue').then(r => r.default || r),
            props: function (t: any) {
                return {
                    ...t.params,
                    typeID: Number(t.params.typeID),
                    subtypeID: Number(t.params.subtypeID),
                    categoryID: Number(t.params.categoryID)
                }
            },
            name: "CatalogCategory"
        },
        {
            path: "/catalog/select-in-category/:productID()",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    productID: Number(t.params.productID)
                })
            },
            name: "SelectInCategory"
        },
        {
            path: "/catalog/:typeID()-:typeSlug()/:subtypeID()-:subtypeSlug()",
            component: () => import('~/components/vPages/vProductList.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    typeID: Number(t.params.typeID),
                    subtypeID: Number(t.params.subtypeID)
                })
            },
            name: "CatalogSubtype"
        },
        {
            path: "/catalog/:typeID()-:typeSlug()",
            component: () => import('~/components/vPages/vCatalogType.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    typeID: Number(t.params.typeID)
                })
            },
            name: "CatalogType"
        },
        {
            path: "/search/:search()",
            component: () => import('~/components/vPages/vProductList.vue').then(r => r.default || r),
            props: !0,
            name: "Search"
        },
        {
            path: "/poll/:ID()",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    ID: Number(t.params.ID)
                })
            },
            name: "Poll"
        },
        {
            path: "/catalog/categories/:popularCategory()",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "PopularCategories"
        },
        {
            path: "/deystvuyushchee_veshchestvo",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "ActiveSubstances"
        },
        {
            path: "/deystvuyushchee_veshchestvo/:propertyID()-:propertySlug",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
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
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "Manufacturers"
        },
        {
            path: "/proizvoditel/:propertyID()-:propertySlug",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
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
            component: () => import('~/components/vPages/vPropertyList.vue').then(r => r.default || r),
            name: "Brands"
        },
        {
            path: "/brand/:propertyID()-:propertySlug()",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: (t: any) => {
                return {
                    ...t.params,
                    propertyTypeID: 10,
                    propertyID: Number(t.params.propertyID)
                }
            },
            name: "Brand"
        },
        {
            path: "/analogi",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "Analogi"
        },
        {
            path: "/analogi/:propertyID()-:propertySlug",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
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
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            name: "RareProducts"
        },
        {
            path: "/apteki",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    ID: Number(t.params.ID),
                    slug: t.params.slug
                })
            },
            name: "Apteki",
            children: [{
                path: ":ID()-:slug",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
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
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
            },
            alias: "/account",
            name: "Confirmation"
        },
        {
            path: "/blog/400-:slug",
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: function (t: any) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    slug: t.params.slug
                })
            },
            name: "Allvit",
            children: [{
                path: ":setName",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                props: function (t: any) {
                    return Object.assign(Object.assign({}, t.params), {}, {
                        setName: t.params.setName
                    })
                },
                name: "AllvitSections",
                children: [{
                    path: ":productID",
                    component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
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
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "Articles",
            children: [{
                path: ":categoryName(mom-and-child|intresting-and-useful)?/:ID()-:slug",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
                props: function (t: any) {
                    return Object.assign(Object.assign({}, t.params), {}, {
                        ID: Number(t.params.ID),
                        slug: t.params.slug
                    })
                },
                name: "Article"
            }, {
                path: "/:sectionName(blog|news)/:categoryName(mom-and-child|intresting-and-useful)?",
                component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
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
            component: () => import('~/components/vPages/vHome.vue').then(r => r.default || r),
            props: !0,
            name: "WorkInFaces"
        }
    ].map(route => withMeta(_routes, route))
}

function withMeta(originalRoutes: Readonly<RouteRecordRaw[]>, route: RouteRecordRaw) {
    const originalRoute = originalRoutes.find(originalRoute => originalRoute.path === route.path)
    // console.log(route)
    // console.log(originalRoutes)
    return merge(originalRoute, route)
}