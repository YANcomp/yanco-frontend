<script lang="ts" setup>
const props = defineProps({
  isBrandAnalogs: {
    type: Boolean,
    default: false
  },
  isStock: {
    type: Boolean,
    default: false
  },
  propertyID: {
    type: Number
  },
  propertySlug: {
    type: String
  },
  propertyTypeID: {
    type: Number
  },
  preparedProductSubtypes: {
    type: Array,
    default: function () {
      return []
    }
  },
  loadingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  loadingFavoritesProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  selectedFiltersIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  totalCount: {
    type: <any>Number,
    default: 0
  },
  updatingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  basketItems: {
    type: Array,
    default: function () {
      return []
    }
  },
  brandAnalogs: {
    type: Array,
    default: function () {
      return []
    }
  },
  isAnalogSearchProducts: {
    type: Boolean,
    default: false
  },
  brandHasProducts: {
    type: Boolean,
    default: false
  },
  brandName: {
    type: String
  },
  buyToday: {
    type: Array,
    default: function () {
      return []
    }
  },
  currentPopularCategory: {
    type: Object
  },
  favoritesItems: {
    type: Array,
    default: function () {
      return []
    }
  },
  hasAnalogs: {
    type: Boolean,
    default: false
  },
  isFailedGettingProducts: {
    type: Boolean,
    default: false
  },
  isEmpty: {
    type: Boolean,
    default: false
  },
  isSelectInCategory: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  isShowCategories: {
    type: Boolean,
    default: false
  },
  preparedCategories: {
    type: Array,
    default: function () {
      return []
    }
  },
  stockBabyProductCategories: {
    type: Array,
    default: function () {
      return []
    }
  },
  productFilters: {
    type: Array,
    default: function () {
      return []
    }
  },
  summary: {
    type: Object
  },
  productPropertyType: {
    type: Object
  },
  showAllAnalogs: {
    type: Boolean,
    default: false
  },
  products: {
    type: <any>Array,
    default: function () {
      return []
    }
  },
  isFailedGettingStockProducts: {
    type: Boolean,
    default: false
  },
  categoryID: {
    type: Number
  },
  subtypeID: {
    type: Number
  },
  typeID: {
    type: Number
  },
  isLoadingMoreProducts: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean
  },
  isSearchEmpty: {
    type: Boolean,
    default: false
  },
  search: {
    type: String
  },
  params: {
    type: Object
  }
})

const isCategoriesView = ref(false)
const isClosedAlert = ref(false)
const isHideAlertSelectInCategory = ref(false)
const isManyCategories = ref(false)
const isOpened = ref(false)
const countBarLeft = ref(0)
const topBarOffset = ref(0)
const searchOffset = ref(0)
const searchLimit = ref(25)

const route = useRoute()
const meStore = useMeStore()
const citiesStore = useCitiesStore()
const bannersStore = useBannersStore()
const catalogStore = useCatalogStore()
const appStore = useAppStore()
const sessionsStore = useSessionsStore()
const popularCategoriesStore = usePopularCategoriesStore()

const me = computed(() => {
  return meStore.getMe
})
const city = computed(() => {
  return citiesStore.currentCity
})
const bannerCatalog = computed(() => {
  return (bannersStore.forCatalog)[0]
})
const isShowButtonMore = computed(() => {
  return props.search ? !isAllProducts.value && props.products.length > 0 : searchOffset.value + searchLimit.value < props.products.length
})
const preparedLoadMoreText = computed(() => {
  return void 0 === props.search ? "ПОКАЗАТЬ ЕЩЁ " + (props.totalCount - props.products.length > 25 ? 25 : props.totalCount - props.products.length) + " ИЗ " + props.totalCount + " ".concat(uPluralize(props.totalCount, ["ТОВАРА", "ТОВАРОВ", "ТОВАРОВ"])) : "ПОКАЗАТЬ ЕЩЁ " + (props.totalCount - (searchLimit.value + searchOffset.value) > 25 ? 25 : props.totalCount - (searchLimit.value + searchOffset.value)) + " ИЗ " + props.totalCount + " ".concat(uPluralize(props.totalCount, ["ТОВАРА", "ТОВАРОВ", "ТОВАРОВ"]))
})
const countBarWidth = computed(() => {
  return void 0 === props.search ? props.products.length / (props.totalCount / 100) : (searchLimit.value + searchOffset.value) / (props.totalCount / 100)
})
const hasFilteredProducts = computed(() => {
  return props.products.length > 0 && props.selectedFiltersIDs.length > 0
})
const hasFilterList = computed(() => {
  return (props.productFilters.length > 0 || void 0 !== props.summary && Object.keys(props.summary).length > 0) && void 0 !== props.productPropertyType && Object.keys(props.productPropertyType).length > 0
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const currentCity = computed(() => {
  return citiesStore.currentCity
})
const hasLoyalCard = computed(() => {
  return meStore.hasLoyalCard
})
const isHorizontalCardsMode = computed(() => {
  return appStore.isHorizontalCardsMode
})
const isAllProducts = computed(() => {
  return props.totalCount === props.products.length
})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const isFreeShip = computed(() => {
  return "free_ship" === route.params.popularCategory
})
const isLoading = computed(() => {
  return appStore.getIsLoading
})
const isNotFound = computed(() => {
  return !isLoading.value && !hasFilteredProducts.value && props.products.length < 1
})
const popularCategories = computed(() => {
  return popularCategoriesStore.categories
})
const productCategories = computed(() => {
  return catalog.value.categories
})
const productSubtypes = computed(() => {
  return catalog.value.subtypes
})
const productTypes = computed(() => {
  return catalog.value.types
})
// const favoritesPharmacies = computed(() => {
//   var e;
//   return (null !== (e = this.$store.state.pharmacies.favorites) && void 0 !== e ? e : []).map((function (p) {
//     return p.pharmacyID
//   }))
// })
// const pharmacies = computed(() => {
//   var e;
//   if (void 0 === this.city) return [];
//   var t = "".concat(this.city.name.toLowerCase().replace("ё", "е"), ",");
//   return (null !== (e = this.$store.state.pharmacies.list) && void 0 !== e ? e : []).reduce((function (e, r) {
//     if (r.address.toLowerCase().replace("ё", "е").match(t)) {
//       var o = r.address.slice(r.address.toLowerCase().replace("ё", "е").indexOf(t) + t.length).replace("ул. ", "").replace("проспект ", "").trim();
//       e.push(Y(Y({}, r), {}, {
//         address: o.length > 5 ? o : r.address
//       }))
//     } else e.push(r);
//     return e
//   }), [])
// })

watch(() => city.value, () => {
  isCategoriesView.value = false
})
watch(() => route.path, () => {
  isCategoriesView.value = false
})

onMounted(() => {
  if (props.isMobile) {
    let t = <any>document.querySelector(".c-types"),
        r = <any>document.querySelector(".c-breadcrumbs");
    null !== t && (t.style.display = "none")
    null !== r && (r.style.marginTop = "10px")
  }
  let o = JSON.parse(localStorage.getItem("isHorizontalCardsMode") || "null");
  if (o !== null) {
    appStore.COMMIT_CARD_MODE_UPD(o)
  } else {
    props.isMobile && appStore.COMMIT_CARD_MODE_UPD(true)
  }
  topBarOffset.value = props.isMobile ? 0 : <any>document.querySelector(".c-header")?.clientHeight
  void 0 !== props.subtypeID && void 0 === props.categoryID && checkCategories()
  calculateCountBarLeft()
})
onUnmounted(() => {

})
</script>

<template>
  <div :class='["c-product-list", { empty: isEmpty, mobile: isMobile }]'>
    <div v-show="!isEmpty" class="results">
      <div v-if="!isSearchEmpty" class="top-bar">
        <!--        TODO-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-product-list {
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 20px
}

.c-product-list > {
  padding: 0 10px
}

.c-product-list.empty {
  height: 100%
}

.c-product-list > .failed-getting {
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center
}

.c-product-list > .results {
  padding: 0
}

.c-product-list > .results > {
  max-width: 1368px;
  margin: auto;
  padding: 0 10px
}

.c-product-list > .results > .top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 998;
  background-color: #fff
}

.c-product-list > .results > .top-bar > span > h1 {
  font-size: 28px;
  font-weight: 600
}

.c-product-list > .results > .top-bar > span > h1.analogs-search {
  font-size: 24px;
  line-height: 26px
}

.c-product-list > .results > .top-bar > span > h1.analogs-search > .recommendations {
  font-size: 22px
}

.c-product-list > .results > .top-bar > span > h1.analogs-search > .recommendations > .pink, .c-product-list > .results > .top-bar > span > h1 > .count {
  color: #ff0089
}

.c-product-list > .results > .top-bar > span > h1 > .count.not-found {
  color: #1a1a1a
}

.c-product-list > .results > .top-bar > span > h1 > a {
  color: #4e62d1
}

.c-product-list > .results > .top-bar > span > h1 > a:hover {
  color: #3f51b5
}

.c-product-list > .results > .alert {
  padding: 0
}

.c-product-list > .results > .alert > .c-alert {
  padding: 10px;
  margin-bottom: 10px
}

.c-product-list > .results > .categories {
  display: flex;
  justify-content: space-between;
  margin: 10px auto
}

.c-product-list > .results > .categories > div.list {
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  max-width: 1325px;
  height: auto;
  overflow: hidden;
  transition: max-height .3s;
  max-height: 50px
}

.c-product-list > .results > .categories > div.list > a {
  margin: 7px 8px 7px 0;
  padding: 7px 14px;
  display: block;
  border-radius: 15px;
  transition: .3s;
  font-weight: 500;
  font-size: 13px
}

.c-product-list > .results > .categories > div.list > a:hover {
  background-color: #ebf0f9 !important
}

.c-product-list > .results > .categories > div.action {
  display: flex;
  justify-content: flex-end;
  align-self: flex-start;
  align-items: center;
  flex-shrink: 0;
  color: #3f51b5;
  font-size: 14px;
  padding-top: 11px
}

.c-product-list > .results > .categories > div.action > span {
  cursor: pointer
}

.c-product-list > .results > .categories > div.action > .icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  transition: .3s;
  background-color: #3f51b5
}

.c-product-list > .results > .categories > div.action > .icon.opened {
  transform: rotate(180deg)
}

.c-product-list > .results > .free-delivery > .message > .desc {
  line-height: revert;
  margin-top: 0
}

.c-product-list > .results > .free-delivery > .message > .desc > div > p {
  display: inline-block;
  margin: 0
}

.c-product-list > .results > .free-delivery > .message > .desc > div > div {
  display: inline-block;
  width: 30px;
  height: 16px
}

.c-product-list > .results > .free-delivery > .message > .desc > div > div > span {
  margin-left: 4px;
  width: 24px;
  height: 24px
}

.c-product-list > .results > .free-delivery > .message > .desc > div > div > span.free-ship {
  background-color: #ff7a00;
  width: 28px;
  margin-top: 0;
  margin-left: 2px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-product-list > .results > .free-delivery > .message > .desc > div > div > span.free-ship-pack {
  background-color: #ff7a00;
  width: 31px;
  height: 27px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center
}

.c-product-list > .results > .catalog {
  margin-top: 20px
}

.c-product-list > .results > .catalog > div {
  flex-grow: 1
}

.c-product-list > .results > .catalog > div > .products {
  display: grid;
  grid-template-columns: repeat(auto-fill, 208px);
  grid-gap: 30px;
  flex-grow: 1;
  justify-content: space-between
}

.c-product-list > .results > .catalog > div > .products.horizontal-cards {
  grid-template-columns: repeat(auto-fill, 653px);
  grid-gap: 40px
}

.c-product-list > .results > .catalog > div > .load-more {
  margin-top: 30px;
  max-width: 100%;
  width: 100%;
  height: 52px;
  background: #ebf0f9;
  border: none;
  color: #3f51b5;
  position: relative
}

.c-product-list > .results > .catalog > div > .load-more .line {
  position: absolute;
  background-color: #3f51b5;
  height: 2px;
  bottom: -7px;
  left: -3px
}

.c-product-list > .results > .catalog > div > .load-more .caption {
  justify-content: center
}

.c-product-list > .results > .catalog > div > .load-more .icon {
  width: 12px;
  height: 12px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin-left: 10px
}

.c-product-list > .results > .catalog > div > .analogs {
  margin-top: 20px
}

.c-product-list > .results > .catalog > div > .analogs.horizontal-cards > div {
  display: grid;
  grid-template-columns: repeat(auto-fill, 653px);
  grid-gap: 40px;
  margin-top: 20px;
  flex-grow: 1;
  justify-content: space-between
}

.c-product-list > .results > .catalog > div > .analogs > span {
  font-weight: 600;
  font-size: 20px;
  color: #ff0089
}

.c-product-list > .results > .catalog > div > .analogs > a {
  margin: 7px 8px 7px 0;
  padding: 4px 8px;
  color: #1a1a1a;
  display: block;
  background-color: #f9f9f9;
  border-radius: 4px;
  transition: .3s;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-product-list > .results > .catalog > div > .analogs > a:hover {
  cursor: pointer;
  background-color: #eee;
  color: #3f51b5
}

.c-product-list > .results > .catalog > div > .analogs > div {
  display: flex;
  flex-flow: wrap;
  grid-gap: 10px;
  margin-top: 10px
}

.c-product-list > .results > .catalog > div > .analogs > div > .c-product-card-desktop {
  margin: 0
}

.c-product-list > .results > .catalog > div > .not-found {
  text-align: left;
  margin: 0 auto
}

.c-product-list > .results > .catalog > div > .not-found > span {
  color: #1a1a1a;
  font-size: 16px
}

.c-product-list > .not-found-search-products, .c-product-list > .not-found {
  text-align: center;
  justify-content: center;
  margin: auto
}

.c-product-list > .not-found-search-products > p, .c-product-list > .not-found > p {
  margin-top: 0;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 24px
}

.c-product-list > .not-found-search-products > span, .c-product-list > .not-found > span {
  color: #1a1a1a;
  font-size: 16px
}

.c-product-list > .not-found-search-products > p {
  margin-top: 10px;
  font-size: 20px
}

.c-product-list > .stock {
  max-width: 1368px;
  margin: auto
}

.c-product-list > .stock > .top {
  margin: 35px 0 15px;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #1a1a1a
}

.c-product-list.mobile > .results {
  width: inherit
}

.c-product-list.mobile > .results > .top-bar {
  flex-flow: column;
  top: 0;
  z-index: 999;
  align-items: flex-start;
  margin-bottom: 10px
}

.c-product-list.mobile > .results > .top-bar > span > h1 {
  font-size: 16px;
  margin: 5px 0 0;
  line-height: 19px
}

.c-product-list.mobile > .results > .top-bar > span > h1.analogs-search {
  font-size: 16px;
  line-height: 18px
}

.c-product-list.mobile > .results > .top-bar > span > h1.analogs-search > .recommendations {
  font-size: 14px;
  display: block;
  margin-top: 5px
}

.c-product-list.mobile > .results > .top-bar > div {
  display: flex;
  align-items: center
}

.c-product-list.mobile > .results > .top-bar > div > .c-button {
  display: block;
  margin-right: 10px
}

.c-product-list.mobile > .results > .categories {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  margin-bottom: 10px
}

.c-product-list.mobile > .results > .categories::-webkit-scrollbar {
  display: none
}

.c-product-list.mobile > .results > .categories > .list {
  display: flex;
  flex-flow: row nowrap;
  padding: 0;
  overflow: unset
}

.c-product-list.mobile > .results > .categories > .list > a {
  flex-shrink: 0;
  margin: unset;
  margin-right: 10px;
  font-size: 12px;
  padding: 5px 10px
}

.c-product-list.mobile > .results > .catalog {
  margin-top: 0
}

.c-product-list.mobile > .results > .catalog > div > .not-found {
  text-align: left;
  justify-content: center;
  margin: auto
}

.c-product-list.mobile > .results > .catalog > div > .not-found > p {
  margin-top: 0;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 16px
}

.c-product-list.mobile > .results > .catalog > div > .not-found > span {
  color: #1a1a1a;
  font-weight: 400;
  font-size: 13px
}

.c-product-list.mobile > .results > .catalog > div > .products {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: 0;
  grid-gap: 0
}

.c-product-list.mobile > .results > .catalog > div > .products.horizontal-cards {
  margin-top: 10px
}

.c-product-list.mobile > .results > .catalog > div > .products.horizontal-cards >, .c-product-list.mobile > .results > .catalog > div > .products > {
  margin: 0 0 30px
}

.c-product-list.mobile > .results > .catalog > div > .load-more {
  height: 46px
}

.c-product-list.mobile > .results > .catalog > div > .analogs.horizontal-cards > div {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-left: 0;
  grid-gap: 0
}

.c-product-list.mobile > .results > .catalog > div > .analogs.horizontal-cards > div > {
  margin: 0 0 30px
}

.c-product-list.mobile > .results > .catalog > div > .analogs > div {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-left: 0;
  grid-gap: 0
}

.c-product-list.mobile > .results > .catalog > div > .analogs > div > {
  margin: 4px
}

.c-product-list.mobile > .not-found > p {
  font-size: 16px;
  text-align: left;
  line-height: 19px;
  margin-bottom: 5px
}

.c-product-list.mobile > .not-found > span {
  color: #1a1a1a;
  font-size: 14px;
  text-align: left;
  line-height: 18px
}

.c-product-list.mobile > .stock > .top {
  margin: 10px 0 8px;
  font-size: 17px
}

.c-product-list.mobile > .stock > .top > p {
  font-size: 17px;
  line-height: 20px
}

.c-product-list.mobile > .stock {
  width: calc(100% - 20px);
  padding: 0 10px
}

.c-product-list.mobile > .stock > p {
  margin-bottom: 10px
}

.c-product-list > .info {
  text-align: center;
  margin-bottom: 10px
}

</style>