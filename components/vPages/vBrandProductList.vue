<script lang="ts" setup>
import {clone} from "lodash-es";

const props = defineProps({
  categoryID: {
    type: Number
  },
  categorySlug: {
    type: String
  },
  search: {
    type: String
  },
  subtypeID: {
    type: Number
  },
  subtypeSlug: {
    type: String
  },
  typeID: {
    type: Number
  },
  typeSlug: {
    type: String
  },
  propertyID: {
    type: Number
  },
  propertyName: {
    type: String
  },
  propertySlug: {
    type: String
  },
  propertyTypeID: {
    type: Number
  },
  propertyTypeName: {
    type: String
  }
})

const route = useRoute()
const appStore = useAppStore()
const productPropertyTypesStore = useProductPropertyTypesStore()
const citiesStore = useCitiesStore()
const catalogStore = useCatalogStore()
const productsStore = useProductsStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const meStore = useMeStore()
const sessionsStore = useSessionsStore()

const params = computed(() => {
  return appStore.params
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const city = computed(() => {
  return citiesStore.currentCity
})

//FETCH DATA
const productPropertyTypes = ref(<any>productPropertyTypesStore.list) //B
const productFilters = ref(<any>[]) //N
const summary = ref({}) //summary
const products = ref(<any>[]) //F
const isFailedGettingProducts = ref(false) //S
const totalCount = ref(0) //O
const brandAnalogsIDs = ref(<any>undefined) //C
const propertyRoute = ref(<any>{
  10: {
    name: "Бренды",
    routeName: "Brands"
  },
  13: {
    name: "Производители",
    routeName: "Manufacturers"
  },
  6: {
    name: "Действующее вещество",
    routeName: "ActiveSubstances"
  }
}) //k

const L = ref(<any>[10, 13, 5, 6])
const selectedFiltersIDs = ref(<any>[]) //R
const isBrandAnalogs = ref("BrandAnalogs" === route.name) //E
const isBrand = ref("Brand" === route.name) //_
const isManufacturer = ref("Manufacturer" === route.name) //w
const isActiveSubstance = ref("ActiveSubstance" === route.name) //U
const brandAnalogs = ref([])
const j = void 0 !== props.propertyTypeID ? Number(props.propertyTypeID) : isBrand ? 10 : isManufacturer ? 13 : isActiveSubstance ? 6 : NaN
const x = ref(false)
const M = ref(25)

let K = function () {
  let e = "cityID=" + city.value.ID,
      o = "";
  switch (true) {
    default:
      o = "properties={typeID=" + j + ",ID=" + props.propertyID + ',slug="' + props.propertySlug + '"}&' + e
  }
  return o
}
let filter = "properties={typeID=" + j + ",ID=" + props.propertyID + "}&cityID=" + city.value.ID

await useNuxtApp().$api.products.get(filter, ["price", "properties"]).then((t) => {
  productFilters.value = clone(null != t ? t : <any>[]).reduce((t: any, e: any) => {
    e.properties = e.properties.filter((p: any) => {
      return p.typeID !== j || p.typeID === j && p.ID === Number(props.propertyID)
    })
    t.push(e)
    return t
  }, [])
}).catch((t) => {
  console.log(t)
})

let V = K().includes("(properties={") || K().includes("price={")
let H = uSortProducts["Популярное"]
let Q = {
  filter: "".concat(V ? 'isNotFound="false"&' : "").concat(K(), "".concat("" !== H ? ":".concat(H) : ""), "[0:") + M + "]",
  fields: uAllowFiltersProduct,
  listName: "list"
}

await productsStore.PRODUCT_GET_LIST(Q).then((p) => {
  products.value = p
}).catch((t: any) => {
  x.value = "string" != typeof t && 404 === t.code
  isFailedGettingProducts.value = true
  x || useNotificationsStore().NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
})

if (!x) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

await useNuxtApp().$api.products.get("".concat(V ? 'isNotFound="false"&' : "").concat(K()), ["ID"], "products").then((p: any) => {
  totalCount.value = (null != p ? p : []).length
}).catch((t) => {
  console.log(t)
})
//END FETCH DATA

//DATA
const isLeaving = ref(!1)
const limit = ref(25)
const isLoadingMoreProducts = ref(!1)
const updatingBasketProductIDs = ref(<any>[])
const loadingBasketProductIDs = ref(<any>[])
const loadingFavoritesProductIDs = ref(<any>[])
const maxPrice = ref(void 0)
const minPrice = ref(void 0)
const offset = ref(0)
const preparedProductSubtypes = ref([])
const sortType = ref("Популярное")
const timeoutID = ref(void 0)
const PREPARED_PRODUCTS_FIELDS = ref(["isInBasket", "isInFavorites"])


//COMPUTED
const basketItems = computed(() => {
  return basketStore.items
})
const brandName = computed(() => {
  // return null !== (e = null === (t = this.$data.brandAnalogsIDs) || void 0 === t ? void 0 : t.brandName) && void 0 !== e ? e : ""
  return ""
})

const favoritesItems = computed(() => {
  return favoritesStore.items
})
const hasAnalogs = computed(() => {
  return false
})
const hasFilteredProducts = computed(() => {
  return products.value.length > 0 && selectedFiltersIDs.value.length > 0
})
const hasFilterList = computed(() => {
  return productFilters.value.length > 0 && Object.keys(productPropertyType.value).length > 0
})
const hasLoyalCard = computed(() => {
  return meStore.hasLoyalCard
})
const isAllProducts = computed(() => {
  return totalCount.value === products.value.length
})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const isEmpty = computed(() => {
  return 0 === products.value.length && 0 === selectedFiltersIDs.value.length && void 0 === minPrice.value && !isLeaving.value
})
const isLoading = computed(() => {
  return appStore.getIsLoading
})

const isNotFound = computed(() => {
  return !isLoading.value && !hasFilteredProducts.value && products.value.length < 1 && !isLeaving.value
})
const isShowCategories = computed(() => {
  return void 0 !== props.subtypeID && void 0 === props.categoryID
})

const preparedCategories = computed(() => {
  if (void 0 !== props.subtypeID && void 0 === props.categoryID) return productCategories.value.reduce((e: any, o: any) => {
    var n, r, c, d, l, h, y, D, v, I;
    o.subtypeIDs.includes(props.subtypeID) && o.typeIDs.includes(props.typeID) && e.push({
      ...o,
      route: {
        name: "CatalogCategory",
        params: {
          categoryID: "".concat(o.ID),
          categorySlug: o.slug,
          subtypeID: "".concat(o.subtypeIDs.length > 1 ? null === (r = null === (n = catalog.value) || void 0 === n ? void 0 : n.subtypes.find((t: any) => {
            return t.ID === o.subtypeIDs[0]
          })) || void 0 === r ? void 0 : r.ID : props.subtypeID),
          subtypeSlug: o.subtypeIDs.length > 1 ? null !== (l = null === (d = null === (c = catalog.value) || void 0 === c ? void 0 : c.subtypes.find((t: any) => {
            return t.ID === o.subtypeIDs[0]
          })) || void 0 === d ? void 0 : d.slug) && void 0 !== l ? l : "" : props.subtypeSlug,
          typeID: "".concat(o.typeIDs.length > 1 ? null === (y = null === (h = catalog.value) || void 0 === h ? void 0 : h.types.find((t: any) => {
            return t.ID === o.typeIDs[0]
          })) || void 0 === y ? void 0 : y.ID : props.typeID),
          typeSlug: o.typeIDs.length > 1 ? null !== (I = null === (v = null === (D = catalog.value) || void 0 === D ? void 0 : D.types.find((t: any) => {
            return t.ID === o.typeIDs[0]
          })) || void 0 === v ? void 0 : v.slug) && void 0 !== I ? I : "" : props.typeSlug
        }
      }
    })
    return e
  }, [])
})
const productCategories = computed(() => {
  return catalog.value.categories
})
const productPropertyType = computed(() => {
  return (productPropertyTypes.value ? productPropertyTypes.value : []).reduce((t: any, e: any) => {
    t[e.ID] = e
    return t
  }, {})
})
const requestFilters = computed(() => {
  let n = selectedFiltersIDs.value.reduce((t: any, e: any) => {
        void 0 !== e.typeID && void 0 !== e.ID && t.push("properties={typeID=".concat(e.typeID, ",ID=").concat(e.ID, "}"))
        return t
      }, []),
      r = selectedFiltersIDs.value.reduce((t: any, e: any) => {
        void 0 !== e.pharmacyID && t.push("pharmacyStockIDs=".concat(e.pharmacyID))
        return t
      }, []),
      c = "price={withoutCard>=" + minPrice.value + ", withoutCard<=" + maxPrice.value + "}",
      d = "".concat(n.length > 0 ? "(".concat(n.join("|"), ")&") : "").concat(r.length > 0 ? "(".concat(r.join("|"), ")&") : "").concat(minPrice.value ? "".concat(c, "&") : "", "cityID=") + city.value.ID,
      l = "";
  switch (!0) {
    default:
      l = "properties={typeID=" + props.propertyTypeID + ",ID=" + props.propertyID + ',slug="' + props.propertySlug + '"}&' + d
  }
  return l
})
const title = computed(() => {
  let o, n
  return void 0 !== props.propertyTypeName ? "" + props.propertyName : "".concat(null !== (n = (null !== (o = productFilters.value.flatMap((t: any) => {
    return t.properties.filter((p: any) => {
      return p.typeID === Number(props.propertyTypeID)
    })
  }).find((p: any) => {
    return (null == p ? void 0 : p.ID) === Number(props.propertyID)
  })) && void 0 !== o ? o : {}).name) && void 0 !== n ? n : "")
})

watch(() => city.value, () => {
  // this.minPrice = void 0, this.maxPrice = void 0, this.$data.selectedFiltersIDs = [], (41 !== t.ID && void 0 === e || void 0 !== e) && (this.offset = 0, this.$data.productFilters = [], this.getTotalCount(), this.getProducts()), (23 !== t.regionID && void 0 === e || void 0 !== e) && (this.$data.isBrand || this.$data.isBrandAnalogs) && this.getBrandAnalogsIDs(), this.init()
})
watch(() => products.value, (value) => {
  offset.value = value.length
})
watch(() => route.path, () => {
  window.clearTimeout(timeoutID.value)
  sortType.value = "Популярное"
  productFilters.value = []
  minPrice.value = void 0
  maxPrice.value = void 0
  selectedFiltersIDs.value = []
  isLeaving.value = !1
  void 0 !== city.value && init()
  // this.updateRouteBreadcrumbs()
})
watch(() => sortType.value, () => {
  offset.value = 0
  getProducts().then((p: any) => {
    offset.value = p.length
  })
})

onMounted(() => {
  void 0 !== city.value && init()
  // getBannersForCatalog()
  isLeaving.value = !1
})
onBeforeUnmount(() => {
  window.clearTimeout(timeoutID.value)
  "BrandAnalogs" === route.name && (brandAnalogsIDs.value = void 0)
  productsStore.COMMIT_PRODUCT_GET_LIST({
    listName: "list",
    products: []
  })
})
onBeforeRouteLeave((to, from, next) => {
  isLeaving.value = !0
  "BrandAnalogs" === route.name && (brandAnalogsIDs.value = void 0)
  productsStore.COMMIT_PRODUCT_GET_LIST({
    listName: "list",
    products: []
  })
  next()
})

//METHODS
function getBannersForCatalog() {
  // void 0 === bannersStore.forCatalog && this.$store.dispatch("banners/".concat(l.BANNERS.GET_FOR_CATALOG))
}

function changeSortType(t: any) {
  sortType.value = t
}

function addToBasket(t: any, e: any) {
  e ? updatingBasketProductIDs.value.push(t.productID) : loadingBasketProductIDs.value.push(t.productID)
  basketStore.BASKET_ADD({
    item: t,
    cityID: city.value.ID,
    isUpdate: e
  }).catch((t) => {
    error(t)
  }).finally(() => {
    loadingBasketProductIDs.value = []
    e && (updatingBasketProductIDs.value = [])
  })
}

function addToFavorites(t: any) {
  loadingFavoritesProductIDs.value.push(t)
  favoritesStore.FAVORITES_ADD({
    itemID: t,
    cityID: city.value.ID
  }).catch((t) => {
    error(t)
  }).finally(() => {
    loadingFavoritesProductIDs.value = []
  })
}

function error(t: any) {
  useNotificationsStore().NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}

function getBrandAnalogsIDs() {
  // var t = this;
  // return Object(c.a)(regeneratorRuntime.mark((function e() {
  //   var o;
  //   return regeneratorRuntime.wrap((function (e) {
  //     for (; ;) switch (e.prev = e.next) {
  //       case 0:
  //         return e.next = 2, t.$store.dispatch("brandAnalogs/".concat(l.BRAND_ANALOGS.GET), {
  //           brandID: t.$route.params.propertyID,
  //           isBrand: !0,
  //           slug: t.$data.isBrandAnalogs || t.$data.isBrand ? t.$route.params.propertySlug : void 0,
  //           regionID: null === (o = t.city) || void 0 === o ? void 0 : o.regionID
  //         }).then((function (b) {
  //           var e, o;
  //           t.$data.brandAnalogsIDs = b, t.$data.hasBrandAnalogsIDs = (null !== (e = null == b ? void 0 : b.analogIDs) && void 0 !== e ? e : []).length > 0, t.$data.showAllAnalogs = (null !== (o = null == b ? void 0 : b.analogIDs) && void 0 !== o ? o : []).length > 4, t.$data.hasBrandAnalogsIDs ? t.getBrandAnalogs() : t.$data.brandAnalogs = []
  //         })).catch((function (e) {
  //           "string" != typeof e && 404 === e.code && t.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
  //             title: "Произошла ошибка",
  //             desc: e,
  //             status: "error"
  //           })
  //         }));
  //       case 2:
  //       case "end":
  //         return e.stop()
  //     }
  //   }), e)
  // })))()
}

function getBrandAnalogs() {
  // var t, e, o, n = this;
  // if (this.$data.hasBrandAnalogsIDs) {
  //   var r = {
  //     filter: "ID={".concat(null === (t = this.$data.brandAnalogsIDs) || void 0 === t ? void 0 : t.analogIDs.slice(0, 4).join(","), "}&cityID=").concat(null !== (o = null === (e = this.city) || void 0 === e ? void 0 : e.ID) && void 0 !== o ? o : 41),
  //     fields: P,
  //     listName: "brandAnalogs"
  //   };
  //   this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), r).then((function (b) {
  //     var t;
  //     n.$data.brandAnalogs = [], null === (t = n.$data.brandAnalogsIDs) || void 0 === t || t.analogIDs.slice(0, 4).forEach((function (t) {
  //       b.find((function (e) {
  //         e.ID === t && n.$data.brandAnalogs.push(e)
  //       }))
  //     }))
  //   }))
  // }
}

function getFilters() {
  // var t, e, o, n, r, c = this,
  //     filter = this.$data.isBrandAnalogs && this.$data.hasBrandAnalogsIDs ? "ID={".concat(null === (t = this.$data.brandAnalogsIDs) || void 0 === t ? void 0 : t.analogIDs.join(","), "}&cityID=").concat(null !== (o = null === (e = this.city) || void 0 === e ? void 0 : e.ID) && void 0 !== o ? o : 41) : "properties={typeID=".concat(this.propertyTypeID, ",ID=").concat(this.propertyID, "}&cityID=").concat(null !== (r = null === (n = this.city) || void 0 === n ? void 0 : n.ID) && void 0 !== r ? r : 41),
  //     d = D.a.products.get(filter, ["price", "properties"]);
  // return d.then((function (t) {
  //   c.$data.productFilters = c.$data.isBrandAnalogs ? t : t.reduce((function (t, e) {
  //     return e.properties = e.properties.filter((function (p) {
  //       return p.typeID !== c.propertyTypeID || p.typeID === c.propertyTypeID && p.ID === c.propertyID
  //     })), t.push(e), t
  //   }), [])
  // })).catch((function (t) {
  //   console.log(t)
  // })), d
}

function getProducts(t?: any) {
  return new Promise(() => {
  })
  // var e = this,
  //     o = this.requestFilters.includes("(properties={") || this.requestFilters.includes("price={") || this.requestFilters.includes("(pharmacyStockIDs=");
  // t ? this.isLoadingMoreProducts = !0 : this.$store.commit("app/".concat(l.APP.LOADING_UPD), !0);
  // var n = this.offset,
  //     c = this.limit,
  //     d = y.n[this.sortType],
  //     h = {
  //       filter: "".concat(o ? 'isNotFound="false"&' : "").concat(this.requestFilters, "".concat("" !== d ? ":".concat(d) : ""), "[").concat(n, ":").concat(c, "]"),
  //       fields: P,
  //       needToLoad: t,
  //       listName: "list"
  //     };
  // void 0 !== this.search && (h.path = "search");
  // var D = this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), h);
  // return D.then((function (p) {
  //   e.$data.products = t ? [].concat(Object(r.a)(e.$data.products), Object(r.a)(p)) : p, e.$data.isFailedGettingProducts = !1
  // })).catch((function (t) {
  //   e.$data.isFailedGettingProducts = !0, e.error(t)
  // })).finally((function () {
  //   t ? e.isLoadingMoreProducts = !1 : e.$store.commit("app/".concat(l.APP.LOADING_UPD), !1)
  // })), D
}

function getTotalCount() {
  // var t = this,
  //     e = this.requestFilters.includes("(properties={") || this.requestFilters.includes("price={") || this.requestFilters.includes("(pharmacyStockIDs="),
  //     o = D.a.products.get("".concat(e ? 'isNotFound="false"&' : "").concat(this.requestFilters), ["ID"], "products");
  // return o.then((function (p) {
  //   t.$data.totalCount = (null != p ? p : []).length
  // })).catch((function (t) {
  //   console.log(t)
  // })), o
}

function init() {
  // this.$store.commit("app/".concat(l.APP.LOADING_UPD), !0)
  // Promise.all([this.$data.hasBrandAnalogsIDs || !this.$data.isBrand || this.$data.isBrandAnalogs ? Promise.resolve() : this.getBrandAnalogs(), void 0 === this.$data.productPropertyTypes ? this.loadPropertyTypes().catch((function () {
  //   h.p.request(t.loadPropertyTypes, 3, 5e3)
  // })) : Promise.resolve(), 0 === this.$data.productFilters.length ? this.getFilters().catch((function () {
  //   h.p.request(t.getFilters, 3, 5e3)
  // })) : Promise.resolve()]).finally((function () {
  //   t.$store.commit("app/".concat(l.APP.LOADING_UPD), !1)
  // }))
}

function loadPropertyTypes() {
  // var t = this,
  //     e = this.$store.dispatch("productPropertyTypes/".concat(l.PRODUCT_PROPERTY_TYPES.GET));
  // return e.then((function (p) {
  //   t.$data.productPropertyTypes = p
  // })), e
}

const preparedProducts = uPrepared

function pricesChanged(t: any, e: any, o: any) {
  minPrice.value = t
  maxPrice.value = e
  offset.value = 0
  getTotalCount()
  o && getProducts().then((p: any) => {
    offset.value = p.length
  })
}

function propertiesChanged(t: any, e: any) {
  selectedFiltersIDs.value = t
  offset.value = 0
  getTotalCount()
  e && getProducts().then((p: any) => {
    offset.value = p.length
  })
}

function repeatGettingProducts() {
  // var t = this;
  // this.getProducts(), this.$data.hasBrandAnalogsIDs || !this.$data.isBrand || this.$data.isBrandAnalogs || this.getBrandAnalogs(), 0 === this.$data.productFilters.length && this.getFilters().catch((function () {
  //   h.p.request(t.getFilters, 3, 5e3)
  // })), void 0 === this.$data.productPropertyTypes && this.loadPropertyTypes().catch((function () {
  //   h.p.request(t.loadPropertyTypes, 3, 5e3)
  // }))
}

function resetFilter() {
  selectedFiltersIDs.value = []
  minPrice.value = void 0
  maxPrice.value = void 0
  offset.value = 0
  getTotalCount()
  getProducts().then((p: any) => {
    offset.value = p.length
  })
}

function updateBasketItem(t: any) {
  addToBasket(t, !0)
}

function updateBasketStore(t: any) {
  basketStore.COMMIT_BASKET_UPD(t)
}

function updateFavoritesStore(t: any) {
  favoritesStore.COMMIT_FAVORITES_UPD(t)
}


//HEAD
let e
let P = productFilters.value.reduce((t: any, e: any) => {
  return void 0 !== e.price && t.push(e.price.withCard), t
}, [])
let A = P.length > 0 ? Math.min.apply(Math, [...P]) : ""
let $ = null !== (e = (productFilters.value ? productFilters.value : []).flatMap((t: any) => {
  return (t.properties !== undefined ? t.properties : []).filter((p: any) => {
    return p.typeID === props.propertyTypeID
  })
}).find((p: any) => {
  return p.ID === props.propertyID && void 0 !== p.slug
})) && void 0 !== e ? e : {}

let titleHead = "" + ($ ? $.name : "") + (A ? (" цена от " + A + " руб.") : "") + " купить в магазинах YCosmetic, инструкция по применению"
let descHead = "Купить товары от производителя " + ($ ? $.name : "") + " по низким ценам в магазинах YCosmetic. Оформите заказ на сайте и заберите в ближайшем магазине."
let urlHead = "" + params.value.siteURL + "/brand/" + ($ ? $.ID : "") + "-" + ($ ? $.slug : "")
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: urlHead,
    },
  ],
}))
useSeoMeta({
  title: titleHead,
  description: descHead,
  ogType: 'website',
  ogUrl: urlHead,
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: titleHead,
  ogDescription: descHead
})
</script>

<template>
  <main class="v-product-list">
    <ProductCProductList :basket-items="basketItems"
                         :brand-analogs="preparedProducts(brandAnalogs, PREPARED_PRODUCTS_FIELDS)"
                         :brand-name="brandName"
                         :category-i-d="categoryID"
                         :favorites-items="favoritesItems"
                         :has-analogs="hasAnalogs"
                         :is-brand-analogs="isBrandAnalogs"
                         :is-empty="isEmpty"
                         :is-failed-getting-products="isFailedGettingProducts"
                         :is-loading-more-products="isLoadingMoreProducts"
                         :is-mobile="isMobile"
                         :is-show-categories="isShowCategories"
                         :updating-basket-product-i-ds="updatingBasketProductIDs"
                         :loading-basket-product-i-ds="loadingBasketProductIDs"
                         :loading-favorites-product-i-ds="loadingFavoritesProductIDs"
                         :params="params"
                         :prepared-categories="preparedCategories"
                         :prepared-product-subtypes="preparedProductSubtypes"
                         :product-filters="productFilters"
                         :product-property-type="productPropertyType"
                         :products="preparedProducts(products, PREPARED_PRODUCTS_FIELDS)"
                         :property-i-d="propertyID"
                         :property-slug="propertySlug"
                         :property-type-i-d="propertyTypeID"
                         :selected-filters-i-ds="selectedFiltersIDs"
                         :subtype-i-d="subtypeID"
                         :summary="summary"
                         :title="title"
                         :brand-has-products="(brandAnalogsIDs || {}).brandHasProducts"
                         :total-count="totalCount"
                         v-on:add-to-basket="addToBasket"
                         v-on:add-to-favorites="addToFavorites"
                         v-on:basket-item-update="updateBasketItem"
                         v-on:basket-store-update="updateBasketStore"
                         v-on:favorites-store-update="updateFavoritesStore"
                         v-on:more-products-load="getProducts"
                         v-on:prices-changed="pricesChanged"
                         v-on:properties-changed="propertiesChanged"
                         v-on:repeat-getting-products="repeatGettingProducts"
                         v-on:reset-filter="resetFilter"
                         v-on:sort-type-change="changeSortType"/>
  </main>
</template>