import type {RouterConfig} from '@nuxt/schema'

export default <RouterConfig>{
    mode: "history",
    base: "/",
    linkActiveClass: "nuxt-link-active",
    linkExactActiveClass: "nuxt-link-exact-active",
    routes: (_routes) => [{
        path: "/about",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "about"
    }, {
        path: "/account",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "account",
        children: [{
            path: "bindings",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "account-bindings"
        }, {
            path: "card",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "account-card"
        }, {
            path: "favorites-pharmacies",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "account-favorites-pharmacies"
        }, {
            path: "orders",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "account-orders"
        }, {
            path: "settings",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "account-settings"
        }, {
            path: "subscription",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "account-subscription"
        }, {
            path: "order/:id?",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "account-order-id"
        }]
    }, {
        path: "/basket",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "basket"
    }, {
        path: "/bloggers",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "bloggers"
    }, {
        path: "/catalog",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "catalog"
    }, {
        path: "/checkout",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "checkout"
    }, {
        path: "/compare",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "compare"
    }, {
        path: "/cross-action",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "cross-action"
    }, {
        path: "/delivery",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "delivery"
    }, {
        path: "/distance-sale",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "distance-sale"
    }, {
        path: "/error",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "error"
    }, {
        path: "/favorites",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "favorites"
    }, {
        path: "/help",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "help"
    }, {
        path: "/investment",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "investment"
    }, {
        path: "/landlords",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "landlords"
    }, {
        path: "/loyal",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "loyal"
    }, {
        path: "/mobile",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "mobile"
    }, {
        path: "/partners",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "partners"
    }, {
        path: "/pharmacies",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "pharmacies"
    }, {
        path: "/survey",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "survey"
    }, {
        path: "/vacancies",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "vacancies"
    }, {
        path: "/",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "index"
    }, {
        path: "/login",
        redirect: {
            name: "login-or-registration",
            params: {
                mode: "login"
            }
        },
        name: "login"
    }, {
        path: "/registration",
        redirect: {
            name: "login-or-registration",
            params: {
                mode: "registration"
            }
        },
        name: "registration"
    }, {
        path: "/:mode(login|registration)",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "login-or-registration"
    }, {
        path: "/pages/:slug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "Pages"
    }, {
        path: "/distance-sale/:slug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "Company"
    }, {
        path: "/product/:productID(\\d+)-:productSlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                productID: Number(t.params.productID),
                needOpenSidebar: t.params.needOpenSidebar,
                itemCount: t.params.itemCount
            })
        },
        name: "Product",
        children: [{
            path: "otzyvy",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            name: "ProductReviews"
        }]
    }, {
        path: "/stock/:slug?",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                slug: t.params.slug
            })
        },
        name: "Stock"
    }, {
        path: "/catalog/:typeID(\\d+)-:typeSlug/:subtypeID(\\d+)-:subtypeSlug/:categoryID(\\d+)-:categorySlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                typeID: Number(t.params.typeID),
                subtypeID: Number(t.params.subtypeID),
                categoryID: Number(t.params.categoryID)
            })
        },
        name: "CatalogCategory"
    }, {
        path: "/catalog/select-in-category/:productID(\\d+)",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                productID: Number(t.params.productID)
            })
        },
        name: "SelectInCategory"
    }, {
        path: "/catalog/:typeID(\\d+)-:typeSlug/:subtypeID(\\d+)-:subtypeSlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                typeID: Number(t.params.typeID),
                subtypeID: Number(t.params.subtypeID)
            })
        },
        name: "CatalogSubtype"
    }, {
        path: "/catalog/:typeID(\\d+)-:typeSlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                typeID: Number(t.params.typeID)
            })
        },
        name: "CatalogType"
    }, {
        path: "/catalog/:slug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "CatalogNewYears"
    }, {
        path: "/search/:search",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "Search"
    }, {
        path: "/poll/:ID(\\d+)",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                ID: Number(t.params.ID)
            })
        },
        name: "Poll"
    }, {
        path: "/catalog/categories/:popularCategory",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "PopularCategories"
    }, {
        path: "/deystvuyushchee_veshchestvo",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "ActiveSubstances"
    }, {
        path: "/deystvuyushchee_veshchestvo/:propertyID(\\d+)-:propertySlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                propertyTypeID: 6,
                propertyID: Number(t.params.propertyID)
            })
        },
        name: "ActiveSubstance"
    }, {
        path: "/proizvoditel",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "Manufacturers"
    }, {
        path: "/proizvoditel/:propertyID(\\d+)-:propertySlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                propertyTypeID: 13,
                propertyID: Number(t.params.propertyID)
            })
        },
        name: "Manufacturer"
    }, {
        path: "/brand",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "Brands"
    }, {
        path: "/brand/:propertyID(\\d+)-:propertySlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                propertyTypeID: 10,
                propertyID: Number(t.params.propertyID)
            })
        },
        name: "Brand"
    }, {
        path: "/analogi",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "Analogi"
    }, {
        path: "/analogi/:propertyID(\\d+)-:propertySlug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                propertyTypeID: 10,
                propertyID: Number(t.params.propertyID)
            })
        },
        name: "BrandAnalogs"
    }, {
        path: "/redkie-preparaty",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        name: "RareProducts"
    }, {
        path: "/apteki",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                ID: Number(t.params.ID),
                slug: t.params.slug
            })
        },
        name: "Apteki",
        children: [{
            path: ":ID(\\d+)-:slug",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            props: function (t) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    ID: Number(t.params.ID),
                    slug: t.params.slug
                })
            },
            name: "PharmaciesCity"
        }]
    }, {
        path: "/confirmation/:code?",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
        },
        alias: "/account",
        name: "Confirmation"
    }, {
        path: "/blog/400-:slug",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: function (t) {
            return Object.assign(Object.assign({}, t.params), {}, {
                slug: t.params.slug
            })
        },
        name: "Allvit",
        children: [{
            path: ":setName",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            props: function (t) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    setName: t.params.setName
                })
            },
            name: "AllvitSections",
            children: [{
                path: ":productID",
                component: () => import('~/components/vHome.vue').then(r => r.default || r),
                props: function (t) {
                    return Object.assign(Object.assign({}, t.params), {}, {
                        productID: t.params.productID
                    })
                },
                name: "AllvitProduct"
            }]
        }]
    }, {
        path: "/:sectionName(blog|news)",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "Articles",
        children: [{
            path: ":categoryName(mom-and-child|intresting-and-useful)?/:ID(\\d+)-:slug",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            props: function (t) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    ID: Number(t.params.ID),
                    slug: t.params.slug
                })
            },
            name: "Article"
        }, {
            path: "/:sectionName(blog|news)/:categoryName(mom-and-child|intresting-and-useful)?",
            component: () => import('~/components/vHome.vue').then(r => r.default || r),
            props: function (t) {
                return Object.assign(Object.assign({}, t.params), {}, {
                    sectionName: t.params.sectionName,
                    categoryName: t.params.categoryName
                })
            },
            name: "ArticleList"
        }]
    }, {
        path: "/vacancies/faces",
        component: () => import('~/components/vHome.vue').then(r => r.default || r),
        props: !0,
        name: "WorkInFaces"
    }],
    fallback: false
}