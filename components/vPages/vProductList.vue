<script lang="ts" setup>
const props = defineProps({
  categoryID: {
    type: <any>Number
  },
  categorySlug: {
    type: String
  },
  popularCategory: {
    type: String
  },
  search: {
    type: String
  },
  subtypeID: {
    type: <any>Number
  },
  subtypeSlug: {
    type: String
  },
  typeID: {
    type: <any>Number
  },
  typeSlug: {
    type: String
  },
  productID: {
    type: Number
  }
})

const route = useRoute()
const appStore = useAppStore()
const popularCategoriesStore = usePopularCategoriesStore()
const productPropertyTypesStore = useProductPropertyTypes()
const citiesStore = useCitiesStore()
const catalogStore = useCatalogStore()
const productsStore = useProductsStore()

const params = computed(() => {
  return appStore.params
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const categoryDirectory = computed(() => {
  return catalogStore.categoryDirectory
})
const city = computed(() => {
  return citiesStore.currentCity
})
const cityDefault = ref({
  ID: 41,
  regionID: 23,
  name: "Краснодар",
  slug: "krasnodar",
  hasPharmacies: !0,
  allowDelivery: !0,
  coords: [45.05314, 38.99339],
  districtID: 129,
  isCity: !0
})
const notFound = ref(<any>true)
const popularCategories = ref(popularCategoriesStore.categories)
const findType = ref(<any>undefined)
const findSubtype = ref(<any>undefined)
const findCategory = ref(<any>undefined)
const findPopularCategories = ref(<any>undefined)
const productFilters = ref(<any>[])
const productPropertyTypes = ref(<any>productPropertyTypesStore.list)
const summary = ref(<any>{})
const limitProduct = ref(props.search ? 100 : 25)
const fieldsProduct = ref(uAllowFiltersProduct)
const needUpdateFilters = ref(true)
const totalCount = ref(0)
const products = ref(<any>[])
const isSearchEmpty = ref(false)
const isAnalogSearchProducts = ref(false)
const isFailedGettingProducts = ref(false)
const isFailedGettingStockProducts = ref(false)
const buyToday = ref(<any>productsStore.buyToday)
// TODO FETCH DATA

if (popularCategories.value.length < 1 && props.popularCategory !== undefined) {
  await popularCategoriesStore.GET(city.value ? city.value : cityDefault.value).then((res: any) => {
    popularCategories.value = res
  })
}

if (undefined !== props.categoryID && undefined !== catalog.value) {
  findCategory.value = catalog.value.categories.find((t: any) => {
    return t.slug === props.categorySlug
  })
}

if (undefined !== props.subtypeID && undefined !== catalog.value) {
  findSubtype.value = catalog.value.subtypes.find((t: any) => {
    return t.slug === props.subtypeSlug
  })
}

if (undefined !== props.typeID && undefined !== catalog.value) {
  findType.value = catalog.value.types.find((t: any) => {
    return t.slug === props.typeSlug
  })
}

if (undefined !== props.popularCategory) {
  findPopularCategories.value = (popularCategories.value ? popularCategories.value : []).find((t: any) => {
    return t.slug === props.popularCategory
  })
}

if (undefined !== catalog.value && undefined === props.search && undefined === props.productID && undefined === props.popularCategory) {
  if (undefined !== findCategory.value &&
      (findCategory.value.subtypeIDs.includes(Number(props.subtypeID)) &&
          findCategory.value.typeIDs.includes(Number(props.typeID)))) {
    notFound.value = false
  } else if (undefined !== findSubtype.value &&
      findSubtype.value.typeIDs.includes(Number(props.typeID))) {
    notFound.value = false
  }
} else if (undefined !== props.popularCategory && popularCategories.value.length > 0 && undefined !== popularCategories.value.find((p: any) => {
  return p.slug === props.popularCategory
})) {
  notFound.value = false
} else if (props.search) {
  notFound.value = false
} else {
  let currentCategory = categoryDirectory.value[Number(props.categoryID)]
  if (undefined !== currentCategory) {
    notFound.value = currentCategory.typeID !== Number(props.typeID) || currentCategory.typeSlug !== props.typeSlug || currentCategory.subtypeID !== Number(props.subtypeID) || currentCategory.subtypeSlug !== props.subtypeSlug || currentCategory.categorySlug !== props.categorySlug
  }
}

if (notFound.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

if (props.popularCategory !== undefined ||
    props.search !== undefined) {
  let filter = ""
  let path = undefined

  if (void 0 !== props.search) {
    filter = 'q="' + props.search + '"&cityID=' + (city.value?.ID ? city.value.ID : 41)
    path = "search"
  } else if ("our_products" === props.popularCategory) {
    filter = 'groups="our_products_all"&cityID=' + (city.value?.ID ? city.value.ID : 41)
  } else if (undefined !== props.popularCategory) {
    filter = 'groups="' + props.popularCategory + '"&cityID=' + (city.value?.ID ? city.value.ID : 41)
  }

  // if (props.search === undefined) {
  useNuxtApp().$api.products.get(filter, ["price", "properties"]).then((res: any) => {
    productFilters.value = void 0 !== props.search ? res.products ? res.products : [] : res ? res : []
  }).catch((error: any) => {
    console.log(error)
  })
  // }
}

//STEP 62
if (productPropertyTypes.value.length < 1) {
  await productPropertyTypesStore.PRODUCT_PROPERTY_TYPES_GET().then((res: any) => {
    productPropertyTypes.value = res
  })
}

if (props.subtypeID !== undefined) {
  let ot = void 0 === props.categoryID ? "subtype" : "category"
  await useNuxtApp().$api.summary.get('type="'.concat(ot, '"&ID=') + (props.categoryID ? props.categoryID : props.subtypeID + "&cityID=" + city.value ? city.value.ID : 41)).then((s: any) => {
    summary.value = s
  }).catch((err: any) => {
    console.log(err)
  })
}

if ("free_ship" === route.params.popularCategory) {
  // v.a.products.get('groups="free_ship"&cityID='.concat(null !== ($ = null == N ? void 0 : N.ID) && void 0 !== $ ? $ : 41), ["subtypeIDs"]).then((function (p) {
  //   var t = p.flatMap((function (t) {
  //     return t.subtypeIDs
  //   }));
  //   E = t.filter((function (s, i) {
  //     return t.indexOf(s) === i
  //   }))
  // })).catch((function (t) {
  //   console.log(t)
  // }))
}

// case 72:
function getPath() {
  let cityPath = "cityID=" + (city.value?.ID ? city.value.ID : 41),
      path = ""
  switch (true) {
    case void 0 !== props.search:
      path = 'q="' + props.search + '"&' + cityPath;
      break;
    case "our_products" === props.popularCategory:
      path = 'groups="our_products_all"&' + cityPath;
      break;
    case void 0 !== props.popularCategory:
      path = 'groups="' + props.popularCategory + '"&' + cityPath;
      break;
    case void 0 !== props.categoryID:
      path = "typeIDs=" + props.typeID + '&typeSlugs="' + props.typeSlug + '"&subtypeIDs=' + props.subtypeID + '&subtypeSlugs="' + props.subtypeSlug + '"&categoryID=' + props.categoryID + '&categorySlug="' + props.categorySlug + '"&' + cityPath;
      break;
    case void 0 !== props.subtypeID:
      path = "typeIDs=" + props.typeID + '&typeSlugs="' + props.typeSlug + '"&subtypeIDs=' + props.subtypeID + '&subtypeSlugs="' + props.subtypeSlug + '"&' + cityPath;
      break;
    default:
      path = cityPath
  }
  return path
}

let sortProducts = {
  "Популярное": "",
  "Цена по возрастанию": "+price",
  "Цена по убыванию": "-price",
  "С лучшей оценкой": "-averageRating",
  "С отзывами": "-reviewsNumber",
  "Бесплатная доставка": "+deliveryRuleID"
}
let it = sortProducts["Популярное"]
let at = <any>{
  filter: "" + getPath() + (it !== '' ? ':' + it : '') + "[0:" + limitProduct.value + "]",
  fields: fieldsProduct.value,
  listName: "list"
}
if (props.search) {
  at.path = "search"
}

await productsStore.GET_LIST(at).then((res: any) => {
  products.value = void 0 !== props.search ? res.products ? res.products : [] : res ? res : []
  isSearchEmpty.value = void 0 !== props.search && (res.products ? res.products : []).length < 1
  isAnalogSearchProducts.value = void 0 !== props.search && res.isAnalogs
  if (props.search !== undefined) {
    totalCount.value = (res.products ? res.products : []).length
    if (needUpdateFilters.value) {
      productFilters.value = res.products ? res.products : []
      needUpdateFilters.value = false
    }
  }
}).catch((error: any) => {
  isFailedGettingProducts.value = true
  console.log(error)
})

if (props.search === undefined) {
  //TODO
  await useNuxtApp().$api.products.get(getPath(), ["ID"], "products").then((p: any) => {
    totalCount.value = p.length
  }).catch((t) => {
    console.log(t)
  })
  // totalCount.value = 324
}

if (buyToday.value.length < 1) {
  //TODO get buy today
  await productsStore.GET_SPECIAL_OFFERS().then((res: any) => {
    buyToday.value = res
  }).catch((err: any) => {
    console.log(err)
    buyToday.value = []
  })
  //TODO  st = 'groups="buy_today"&cityID='.concat(null !== (k = null == N ? void 0 : N.ID) && void 0 !== k ? k : 41, "[:20]"), "buyToday", o.next = 86, r.dispatch("products/".concat(l.PRODUCT.GET_LIST), {
  //   filter: st,
  //   fields: P,
  //   listName: "buyToday"
  // }).then((function (p) {
  //   G = null != p ? p : []
  // })).catch((function (t) {
  //   tt(t), G = []
  // }))
}

// findType - ct
// findSubtype - nt
// findPopularCategories - ut


// TODO END FETCH DATA


//CONST DATA
const limit = ref(25)
const isLoadingMoreProducts = ref(false)
const loadingBasketProductIDs = ref(<any>[])
const loadingFavoritesProductIDs = ref(<any>[])
const maxPrice = ref(undefined)
const minPrice = ref(undefined)
const offset = ref(0)
const preparedProductSubtypes = ref([])
const selectedFiltersIDs = ref([])
const sortType = ref("Популярное")
const timeoutID = ref(undefined)
const updatingBasketProductIDs = ref(<any>[])
const PREPARED_PRODUCTS_FIELDS = ref(["isInBasket", "isInFavorites"])
const isLeaving = ref(false)

onMounted(() => {
  void 0 !== city.value && init()
  // this.getBannersForCatalog()
  isLeaving.value = false
  0 === buyToday.value.length && loadBuyToday()
  // this.updateRouteBreadcrumbs()
})
onBeforeUnmount(() => {
  window.clearTimeout(timeoutID.value)
  productFilters.value = []
  productsStore.COMMIT_GET_LIST()
  // TODO this.$store.commit("products/".concat(l.PRODUCT.GET_LIST), {
  //   listName: "list",
  //   products: void 0
  // })
  // this.$store.commit("products/".concat(l.PRODUCT.GET_LIST), {
  //   listName: "buyToday",
  //   products: void 0
  // })
})
onBeforeRouteUpdate((to, from, next) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
  next()
})
onBeforeRouteLeave((to, from, next) => {
  isLeaving.value = true
  productFilters.value = []
  productsStore.COMMIT_GET_LIST()
  // TODO this.$store.commit("products/".concat(l.PRODUCT.GET_LIST), {
  //   listName: "list",
  //   products: void 0
  // })
  // if (!["CatalogCategory", "CatalogSubtype", "CatalogType", "PopularCategories"].includes(null !== (r = null == t ? void 0 : t.name) && void 0 !== r ? r : "")) {
  //   this.$store.commit("products/".concat(l.PRODUCT.GET_LIST), {
  //     listName: "buyToday",
  //     products: void 0
  //   })
  // }
  next()
})

const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
//COMPUTED
const basketItems = computed(() => {
  return basketStore.items
})
const favoritesItems = computed(() => {
  return favoritesStore.items
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
const productSubtypes = computed(() => {
  return catalog.value.subtypes
})
const productTypes = computed(() => {
  return catalog.value.types
})
const isShowCategories = computed(() => {
  return void 0 !== props.subtypeID && void 0 === props.categoryID
})
const isSelectInCategory = computed(() => {
  return "SelectInCategory" === route.name
})
const activeCatalogSubtype = computed(() => {
  return catalog.value.subtypes.find((s: any) => {
    return s.ID === props.subtypeID
  })
})
const activeCatalogType = computed(() => {
  return catalog.value.types.find((t: any) => {
    return t.ID === props.typeID
  })
})
const preparedCategories = computed(() => {
  if (void 0 !== props.subtypeID && void 0 === props.categoryID) return productCategories.value.reduce((e: any, o: any) => {
    o.subtypeIDs.includes(props.subtypeID) && o.typeIDs.includes(props.typeID) && e.push({
      ...o,
      color: activeCatalogType.value ? activeCatalogType.value.color : undefined,
      background: activeCatalogType.value ? activeCatalogType.value.background : undefined,
      route: {
        name: "CatalogCategory",
        params: {
          categoryID: "".concat(o.ID),
          categorySlug: o.slug,
          subtypeID: "".concat(categoryDirectory.value[o.ID].subtypeID),
          subtypeSlug: categoryDirectory.value[o.ID].subtypeSlug,
          typeID: "".concat(categoryDirectory.value[o.ID].typeID),
          typeSlug: categoryDirectory.value[o.ID].typeSlug
        }
      }
    })
    return e
  }, [])
})
const isEmpty = computed(() => {
  return 0 === products.value.length && 0 === selectedFiltersIDs.value.length && void 0 === minPrice.value && !isLeaving.value
})
const currentPopularCategory = computed(() => {
  return popularCategories.value.find((t: any) => {
    return t.slug === props.popularCategory
  })
})
const title = computed(() => {
  if (void 0 !== props.search) return "Результаты поиска по запросу «" + props.search + "»"
  if (void 0 !== props.popularCategory) return findPopularCategories.value.name.includes("/") ? findPopularCategories.value.name.split("/")[isMobile.value ? 1 : 0] : findPopularCategories.value.name;
  if (void 0 === catalog.value) return "";
  let o = props.categoryID ? catalog.value.categories.find((t: any) => {
    return t.ID === Number(props.categoryID)
  }) : catalog.value.subtypes.find((t: any) => {
    return t.ID === Number(props.subtypeID)
  })
  return o.name ? o.name : ""
})
const preparedProducts = uPrepared
const metaInfo = computed(() => {
  let meta,
      l = function (t: any) {
        let o = "В разделе ".concat(title.value ? title.value : "", " представлен широкий выбор товаров с низкими ценами. Оформите заказ онлайн на сайте и заберите в ближайшем магазине YCosmetic."),
            r = <any>{
              types: props.typeID,
              subtypes: props.subtypeID,
              categories: props.categoryID
            },
            c = catalog.value[t].find((e: any) => {
              return e.ID === r[t]
            });
        return {
          title: (null == c ? void 0 : c.title) || title.value,
          description: (null == c ? void 0 : c.description) || o
        }
      };
  switch (route.name) {
    case "CatalogType":
      meta = l("types");
      break;
    case "CatalogSubtype":
      meta = l("subtypes");
      break;
    case "CatalogCategory":
      meta = l("categories");
      break;
    default:
      meta = {
        description: "В разделе ".concat(title.value ? title.value : "", " представлен широкий выбор товаров с низкими ценами. Оформите заказ онлайн на сайте и заберите в ближайшем магазине YCosmetic."),
        title: title.value ? title.value : ""
      }
  }
  return meta
})

let titleHead = (metaInfo.value.title ? metaInfo.value.title : "") + " — Cosmetic | Yanco",
    descHead = "".concat(metaInfo.value.description),
    urlHead = "".concat(params.value.siteURL).concat(route.path);
switch (route.name) {
  case "CatalogSubtype":
    urlHead = "".concat(params.value.siteURL, "/catalog/").concat(props.typeID, "-").concat((productTypes.value.find((p: any) => {
      return p.ID === props.typeID
    }))?.slug, "/").concat(props.subtypeID, "-").concat((productSubtypes.value.find((s: any) => {
      return s.ID === props.subtypeID
    })).slug);
    break;
  case "CatalogCategory":
    urlHead = "".concat(params.value.siteURL, "/catalog/").concat(props.typeID, "-").concat((productTypes.value.find((p: any) => {
      return p.ID === props.typeID
    }))?.slug, "/").concat(props.subtypeID, "-").concat((productSubtypes.value.find((s: any) => {
      return s.ID === props.subtypeID
    }))?.slug, "/").concat(props.categoryID, "-").concat((productCategories.value.find((t: any) => {
      return t.ID === props.categoryID
    }))?.slug)
}

//METHODS
function setViewedCategory() {
  if (void 0 !== props.search && 0 !== products.value.length || void 0 !== props.categoryID || void 0 !== props.subtypeID) {
    let o = JSON.parse(localStorage.getItem("categoryHistory") !== null ? <any>localStorage.getItem("categoryHistory") : "[]"),
        r = {
          title: props.search ? props.search : title.value,
          url: decodeURI(route.fullPath)
        };
    JSON.stringify(o).includes(JSON.stringify(r)) || (o.unshift(r), o.length > 4 && (o = o.slice(0, 4)), localStorage.setItem("categoryHistory", JSON.stringify(o)))
  }
}

function init() {
  appStore.COMMIT_LOADING_UPD(true)
  // Promise.all([
  //   void 0 === popularCategories.value ? loadPopularCategories() : Promise.resolve(),
  //   void 0 === productPropertyTypes.value ? loadPropertyTypes().catch((function () {
  //     y.p.request(t.loadPropertyTypes, 3, 5e3)
  //   })) : Promise.resolve(),
  //   void 0 === this.popularCategory && void 0 === this.search || 0 !== this.$data.productFilters.length ? Promise.resolve() : this.getFilters().catch((function () {
  //     y.p.request(t.getFilters, 3, 5e3)
  //   })),
  //   0 === Object.keys(this.$data.summary).length ? this.getSummary().catch((function () {
  //     y.p.request(t.getSummary, 3, 5e3)
  //   })) : Promise.resolve(),
  //   this.isFreeShip ? this.getSubtypeIDs() : Promise.resolve()
  // ]).finally(() => {
  //   setViewedCategory()
  //   appStore.COMMIT_LOADING_UPD(false)
  // })
  setViewedCategory()
  appStore.COMMIT_LOADING_UPD(false)
}

function changeSortType(t: any) {
  sortType.value = t
}

function addToBasket(t: any, e: any) {
  if (e) {
    updatingBasketProductIDs.value.push(t.productID)
  } else {
    loadingBasketProductIDs.value.push(t.productID)
  }
  basketStore.BASKET_ADD({
    item: t,
    cityID: city.value.ID,
    isUpdate: e
  }).catch((t) => {
    console.log(t)
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
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    loadingFavoritesProductIDs.value = []
  })
}

function resetFilter() {
  selectedFiltersIDs.value = []
  minPrice.value = undefined
  maxPrice.value = undefined
  offset.value = 0
  getTotalCount()
  getProducts().then((p: any) => {
    offset.value = undefined !== props.search ? (p.products ? p.products : []).length : p.length
  })
}

function updateBasketItem(t: any) {
  addToBasket(t, true)
}

function updateBasketStore(t: any) {
  basketStore.COMMIT_BASKET_UPD(t)
}

function updateFavoritesStore(t: any) {
  favoritesStore.COMMIT_FAVORITES_UPD(t)
}

function getProducts(t?: any) {
  //TODO
}

function pricesChanged(t?: any) {
  //TODO
}

function loadBuyToday(t?: any) {
  //TODO
}

function propertiesChanged(t?: any) {
  //TODO
}

function repeatGettingProducts(t?: any) {
  //TODO
}

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
    <ProductCProductList :search="route.params.search" :is-analog-search-products="isAnalogSearchProducts"
                         :prepared-product-subtypes="preparedProductSubtypes"
                         :loading-basket-product-i-ds="loadingBasketProductIDs"
                         :updating-basket-product-i-ds="updatingBasketProductIDs"
                         :loading-favorites-product-i-ds="loadingFavoritesProductIDs"
                         :selected-filters-i-ds="selectedFiltersIDs" :total-count="totalCount"
                         :basket-items="basketItems" :buy-today="preparedProducts(buyToday, PREPARED_PRODUCTS_FIELDS)"
                         :current-popular-category="currentPopularCategory" :favorites-items="favoritesItems"
                         :is-failed-getting-products="isFailedGettingProducts" :is-empty="isEmpty"
                         :is-select-in-category="isSelectInCategory" :title="title"
                         :is-show-categories="isShowCategories" :params="params"
                         :prepared-categories="preparedCategories" :product-filters="productFilters" :summary="summary"
                         :product-property-type="productPropertyType"
                         :products="preparedProducts(products, PREPARED_PRODUCTS_FIELDS)"
                         :is-failed-getting-stock-products="isFailedGettingStockProducts" :category-i-d="categoryID"
                         :subtype-i-d="subtypeID" :type-i-d="typeID" :is-loading-more-products="isLoadingMoreProducts"
                         :is-mobile="isMobile" :is-search-empty="isSearchEmpty" :is-leaving="isLeaving"
                         v-on:add-to-basket="addToBasket"
                         v-on:add-to-favorites="addToFavorites"
                         v-on:basket-item-update="updateBasketItem"
                         v-on:basket-store-update="updateBasketStore"
                         v-on:favorites-store-update="updateFavoritesStore"
                         v-on:load-buy-today="loadBuyToday"
                         v-on:more-products-load="getProducts"
                         v-on:prices-changed="pricesChanged"
                         v-on:properties-changed="propertiesChanged"
                         v-on:repeat-getting-products="repeatGettingProducts"
                         v-on:reset-filter="resetFilter"
                         v-on:sort-type-change="changeSortType"/>

  </main>
</template>