import {defineStore} from "pinia";
export const useCatalogStore = defineStore('catalog', {
    state: () => ({
        catalog: <any>{},
        catalogTree: [],
        categoryDirectory: {},
        catalogTypes: [],
    }),
    actions: {
        async CATALOG_GET() {
            return await useNuxtApp().$api.catalog.get().then(res => {
                const n: any = res.data.value
                var o, r = <any>{},
                    c = (null !== (o = null == n ? void 0 : n.types) && void 0 !== o ? o : []).reduce((t: any, e: any, o: any) => {
                        var c;
                        return t.push({
                            ...e,
                            icon: "url(".concat(e.icon, ")"),
                            order: 400221 === e.ID ? 0 : o + 1,
                            route: {
                                name: "CatalogType",
                                params: {
                                    typeID: "".concat(e.ID),
                                    typeSlug: e.slug
                                }
                            },
                            subtypes: (null !== (c = null == n ? void 0 : n.subtypes) && void 0 !== c ? c : []).reduce((t: any, o: any) => {
                                var c;
                                return o.typeIDs.includes(e.ID) && t.push({
                                    ...o,
                                    route: {
                                        name: "CatalogSubtype",
                                        params: {
                                            subtypeID: "".concat(o.ID),
                                            subtypeSlug: o.slug,
                                            typeID: "".concat(e.ID),
                                            typeSlug: e.slug
                                        }
                                    },
                                    categories: (null !== (c = null == n ? void 0 : n.categories) && void 0 !== c ? c : []).reduce((t: any, n: any) => {
                                        return n.subtypeIDs.includes(o.ID) && n.typeIDs.includes(e.ID) && (void 0 === r[n.ID] && (r[n.ID] = <any>{
                                            typeID: e.ID,
                                            typeSlug: e.slug,
                                            typeName: e.name,
                                            subtypeID: o.ID,
                                            subtypeSlug: o.slug,
                                            subtypeName: o.name,
                                            categorySlug: n.slug,
                                            categoryName: n.name
                                        }), t.push({
                                            ...n,
                                            route: {
                                                name: "CatalogCategory",
                                                params: {
                                                    categoryID: "".concat(n.ID),
                                                    categorySlug: n.slug,
                                                    subtypeID: "".concat(r[n.ID].subtypeID),
                                                    subtypeSlug: r[n.ID].subtypeSlug,
                                                    typeID: "".concat(r[n.ID].typeID),
                                                    typeSlug: r[n.ID].typeSlug
                                                }
                                            }
                                        })), t
                                    }, [])
                                }), t
                            }, [])
                        }), t.sort((a: any, b: any) => {
                            return a.order - b.order
                        })
                    }, []);

                this.catalog = n
                this.categoryDirectory = r
                this.catalogTree = c

                return Promise.resolve(res.data)
            }).catch(error => {
                return Promise.reject(error)
            })
        },
        async CATALOG_GET_TYPES() {
            return await useNuxtApp().$api.catalog.get().then(res => {
                const resData: any = res.data.value
                this.catalogTypes = resData.types
                return Promise.resolve(res.data.value)
            }).catch(error => {
                return Promise.reject(error)
            })
        },
    },
    getters: {
        catalogColors: function (state) {
            return state.catalog ? undefined : state.catalog.types.reduce((result: any, item: any) => {
                result[item.ID] = {
                    color: item.color,
                    background: item.background
                }
                return result
            }, {})
        }
    }
})
