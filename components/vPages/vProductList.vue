<script lang="ts" setup>
import {useProductsStore} from "~/store/products.store";

const props = defineProps({
  categoryID: {
    type: Number
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
  productID: {
    type: Number
  }
})

const popularCategoriesStore = usePopularCategoriesStore()
const productPropertyTypesStore = useProductPropertyTypes()
const citiesStore = useCitiesStore()
const catalogStore = useCatalogStore()
const productsStore = useProductsStore()

const cityAsync = ref(<any>citiesStore.currentCity ? citiesStore.currentCity : {
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
const product = ref(<any>undefined)
const productFilters = ref(<any>[])
const productPropertyTypes = ref(<any>productPropertyTypesStore.list)
const summary = ref(<any>{})
const subtypeIDs = ref(<any>[])
const products = ref(<any>[])
const isFailedGettingProducts = ref(<any>false) //TODO
const totalCount = ref(<any>false)
const buyToday = ref(<any>[]) // TODO state.products.buyToday
const isFailedGettingStockProducts = ref(<any>false) // TODO
const catalogAsync = ref(<any>catalogStore.catalog)
const categoryDirectoryAsync = ref(<any>catalogStore.categoryDirectory)
// const Y = ref(<any>catalogStore.categoryDirectory)
const isSearchEmpty = ref(<any>false)
// const H = void 0 !== props.search ? 200 : 25
const isAnalogSearchProducts = ref(<any>false)
const needUpdateFilters = ref(<any>true)
// const W = r.state.banners.forCatalog
const selectCategoryTitle = ref(<any>"")
const popularCategories = ref(<any>popularCategoriesStore.categories)

//TODO  void 0 === W && r.dispatch("banners/".concat(l.BANNERS.GET_FOR_CATALOG))

// TODO Z = function () {
//   var t, e = "cityID=".concat(null !== (t = null == N ? void 0 : N.ID) && void 0 !== t ? t : 41),
//       o = "";
//   switch (!0) {
//     case void 0 !== c.search:
//       o = 'q="'.concat(c.search, '"&').concat(e);
//       break;
//     case "our_products" === c.popularCategory:
//       o = 'groups="our_products_all"&'.concat(e);
//       break;
//     case void 0 !== c.popularCategory:
//       o = 'groups="'.concat(c.popularCategory, '"&').concat(e);
//       break;
//     case void 0 !== c.categoryID:
//       o = "typeIDs=".concat(c.typeID, '&typeSlugs="').concat(c.typeSlug, '"&subtypeIDs=').concat(c.subtypeID, '&subtypeSlugs="').concat(c.subtypeSlug, '"&categoryID=').concat(c.categoryID, '&categorySlug="').concat(c.categorySlug, '"&').concat(e);
//       break;
//     case void 0 !== c.subtypeID:
//       o = "typeIDs=".concat(c.typeID, '&typeSlugs="').concat(c.typeSlug, '"&subtypeIDs=').concat(c.subtypeID, '&subtypeSlugs="').concat(c.subtypeSlug, '"&').concat(e);
//       break;
//     case void 0 !== c.productID:
//       o = "productID=".concat(c.productID, "&").concat(e);
//       break;
//     default:
//       o = e
//   }
//   return o
// }

if (popularCategories.value.length < 1 && props.popularCategory !== undefined) {
  await popularCategoriesStore.GET(cityAsync).then((res: any) => {
    popularCategories.value = res
  })
}
const findCategory = ref(<any>undefined)
if (void 0 !== props.categoryID && void 0 !== catalogAsync) {
  findCategory.value = catalogAsync.value.categories.find((t: any) => {
    return t.slug === props.categorySlug
  })
}
const findSubtype = ref(<any>undefined)
if (void 0 !== props.subtypeID && void 0 !== catalogAsync) {
  findSubtype.value = catalogAsync.value.subtypes.find((t: any) => {
    return t.slug === props.subtypeSlug
  })
}

const notFound = ref(<any>true)

if (undefined !== catalogAsync && undefined === props.search && undefined === props.productID && undefined === props.popularCategory) {
  if (undefined !== catalogAsync.value.types.find((t: any) => {
    return t.slug === props.typeSlug
  })) {
    notFound.value = false
  } else if (undefined !== props.subtypeID && void 0 !== findSubtype.value) {
    if (Number(props.subtypeID) === findSubtype.value.ID) {
      notFound.value = false
    }
  } else if (void 0 !== props.categoryID && void 0 !== findCategory.value) {
    if (Number(props.categoryID) !== findCategory.value.ID) {
      notFound.value = false
    }
  } else if (void 0 !== findCategory.value && (findCategory.value.subtypeIDs.includes(Number(props.subtypeID)) && !findCategory.value.typeIDs.includes(Number(props.typeID)))) {
    notFound.value = false
  } else if (void 0 !== findSubtype.value && findSubtype.value.typeIDs.includes(Number(props.typeID))) {
    notFound.value = false
  }
} else if (void 0 !== props.popularCategory && popularCategories.value.length > 0 && void 0 !== popularCategories.value.find((p: any) => {
  return p.slug === props.popularCategory
})) {
  notFound.value = false
} else if (props.search) {
  notFound.value = false
} else {
  let et = categoryDirectoryAsync.value[Number(props.categoryID)]
  if (void 0 !== props.categoryID && void 0 !== et) {
    notFound.value = et.typeID !== Number(props.typeID) || et.typeSlug !== props.typeSlug || et.subtypeID !== Number(props.subtypeID) || et.subtypeSlug !== props.subtypeSlug || et.categorySlug !== props.categorySlug
  }
}

if (props.productID !== undefined) {
  await useNuxtApp().$api.products.get("ID=" + props.productID + "&cityID=" + "41", ["name"]).then((p: any) => {
    product.value = p[0]
  }).catch((t) => {
    console.log(t)
  })
  if (product.value !== undefined) {
    notFound.value = false
  }
}

if (notFound.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}


if (props.popularCategory !== undefined || props.search !== undefined || props.productID !== undefined) {
  let filter = ""
  let path = undefined

  if (props.search !== undefined) {
    filter = 'q="'.concat(props.search, '"&cityID=').concat(cityAsync.value ? cityAsync.value.ID : 41)
    path = "search"
  } else if (props.popularCategory === "our_products") {
    filter = 'groups="our_products_all"&cityID='.concat(cityAsync.value ? cityAsync.value.ID : 41)
  } else if (props.popularCategory !== undefined) {
    filter = 'groups="'.concat(props.popularCategory, '"&cityID=').concat(cityAsync.value ? cityAsync.value.ID : 41)
  } else if (props.productID !== undefined) {
    filter = "productID=" + props.productID + "&cityID=".concat(cityAsync.value ? cityAsync.value.ID : 41)
    path = "withCategory"
  }

  if (props.search === undefined) {
    await useNuxtApp().$api.products.get(filter, ["price", "properties"], path).then( (p:any)=> {
      productFilters.value = void 0 !== props.productID ? p.products ? p.products : [] : p ? p : []
    }).catch( (t:any)=> {
      console.log(t)
    })
  }
}

if (productPropertyTypes.value.length < 1) {
  await productPropertyTypesStore.GET().then((res:any) => {
    productPropertyTypes.value = res
  })
}

let K
if (props.subtypeID !== undefined) {
  K = props.categoryID === undefined ? "subtype" : "category"

  //todo summary api
  // await context.app.$api.summary.get('type="'.concat(K, '"&ID=').concat(params.categoryID ? params.categoryID : params.subtypeID, "&cityID=").concat(city ? city.ID : 41)).then((s) => {
  //   summary = s
  // }).catch((err) => {
  //   console.log(err)
  // })
}

// if (route.params.popularCategory === "free_ship") {
//   await context.app.$api.products.get('groups="free_ship"&cityID='.concat(city ? city.ID : 41), ["subtypeIDs"]).then((p) => {
//     var t = p.flatMap((t) => {
//       return t.subtypeIDs
//     })
//
//     subtypeIDs = t.filter((function (s, i) {
//       return t.indexOf(s) === i
//     }))
//   }).catch((err) => {
//     console.log(err)
//   })
// }

// let Z = SYS["Популярное"]
//params for store.dispatch - products/GET_LIST
// let Q = {
//   filter: "".concat(getMainPath(), "".concat("" !== Z ? ":".concat(Z) : ""), "[0:").concat(Number(limit), "]"),
//   // fields: m,
//   listName: "list"
// }

await productsStore.GET_LIST().then((res:any)=>{
  products.value = props.search ? res ? res : [] : res ? res : []
  isSearchEmpty.value = props.search && (res ? res : []).length < 1
  isAnalogSearchProducts.value = props.search !== undefined && res.isAnalogs
  if (props.search !== undefined) {
    totalCount.value = (res ? res : []).length
    if (needUpdateFilters.value) {
      productFilters.value = res ? res : []
      needUpdateFilters.value = false
    }
  }
}).catch((err) => {
  isFailedGettingProducts.value = true
  console.log(err)
})

// tt
let catalogType = (catalogAsync.value !== undefined ? catalogAsync.value.types : []).find((t:any) => {
  return t.ID === Number(props.typeID)
})
//et
let catalogSubtype = (catalogAsync.value !== undefined ? catalogAsync.value.subtypes : []).find((t:any) => {
  return t.ID === Number(props.subtypeID)
})
//ot
let popularCategory = (popularCategories.value ? popularCategories.value : []).find( (t:any)=> {
  return t.slug === props.popularCategory
})

let title = function () {
  if (props.search) return "Результаты поиска по запросу «".concat(props.search, "» :");
  if (props.popularCategory) return popularCategory.name.includes("/") ? popularCategory.name.split("/")[useAppStore().isMobile ? 1 : 0] : popularCategory.name;
  if (catalogAsync.value.length < 1) return "";

  let o = props.categoryID ? catalogAsync.value.categories.find((t:any) => {
    return t.ID === Number(props.categoryID)
  }) : catalogAsync.value.subtypes.find((t:any) => {
    return t.ID === Number(props.subtypeID)
  });

  let t = (o !== undefined ? o : {}).name
  return t !== undefined ? t : ""
}

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: useAppStore().params.siteURL,
    },
  ],
}))
useSeoMeta({
  title: title() + ' — Cosmetic | Yanco',
  description: "",
  ogType: 'website',
  ogUrl: useAppStore().params.siteURL,
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: title() + ' — Cosmetic | Yanco',
  ogDescription: ""
})
</script>

<template>
  <main class="v-product-list">
    {{ title() }}
    cProductList
  </main>
</template>

<style scoped>

</style>