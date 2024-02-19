<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const catalogStore = useCatalogStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const citiesStore = useCitiesStore()
const notificationsStore = useNotificationsStore()

const isMounted = ref(false)
const loadingBasketProductIDs = ref(<any>[])
const loadingFavoritesProductIDs = ref(<any>[])
const updatingBasketProductIDs = ref(<any>[])
const isLoadingViewedProducts = ref(false)
const isFailedGettingViewedProducts = ref(false)
const isLoadingBuyToday = ref(false)
const isFailedGettingBuyToday = ref(false)
const placeholderItems = ref([{}, {}, {}, {}, {}, {}])
const limit = ref(10)
const offset = ref(10)
const PREPARED_PRODUCTS_FIELDS = ref(["isInBasket", "isInFavorites"])

const basketItems = computed(() => {
  return basketStore.items
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const city = computed(() => {
  return citiesStore.currentCity
})
const favoritesItems = computed(() => {
  return favoritesStore.items
})
const hasFavorites = computed(() => {
  return products.value.length > 0
})
const hasLoyalCard = computed(() => {
  //TODO return this.$store.getters["me/hasLoyalCard"]
  return false
})
const isAuthorized = computed(() => {
  //TODO return this.$store.getters["sessions/isAuthorized"]
  return false
})
const isLoading = computed(() => {
  return appStore.getIsLoading
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const params = computed(() => {
  return appStore.params
})
const productCategories = computed(() => {
  return catalogStore.catalog.categories
})
const products = computed(() => {
  return favoritesStore.items
})
const productSubtypes = computed(() => {
  return catalogStore.catalog.subtypes
})
const productTypes = computed(() => {
  return catalogStore.catalog.types
})
const viewedProducts = computed(() => {
  // var t;
  //TODO return null !== (t = this.$store.state.viewedProducts.items) && void 0 !== t ? t : []
  return []
})
const hasViewedProducts = computed(() => {
  //TODO return this.viewedProductsIDs.length > 0
  return false
})
const buyTodayProducts = computed(() => {
  //TODO return null !== (t = this.$store.state.products.buyToday) && void 0 !== t ? t : []
  return []
})
const viewedProductsIDs = computed(() => {
  //TODO return null !== (t = this.$store.state.viewedProducts.viewedProductsIDs) && void 0 !== t ? t : []
  return []
})
const totalCount = computed(() => {
  return products.value.length
})
const preparedFavorites = computed(() => {
  return products.value.slice(0, offset.value)
})
const preparedLoadMoreText = computed(() => {
  return "ПОКАЗАТЬ ЕЩЁ ".concat(<any>(totalCount.value - offset.value > 10 ? 10 : totalCount.value - offset.value), " ИЗ ").concat(<any>totalCount.value, " ").concat(uPluralize(totalCount.value, ["ТОВАРА", "ТОВАРОВ", "ТОВАРОВ"]))
})
const countBarWidth = computed(() => {
  return offset.value / (totalCount.value / 100)
})

watch(() => city.value, () => {
  //TODO
  // viewedProducts.value.length < 1 && hasViewedProducts.value && loadViewedProducts()
  // buyTodayProducts.value.length < 1 && !hasViewedProducts.value && loadBuyToday()
})
watch(() => viewedProductsIDs.value, (value) => {
  //TODO
  // buyTodayProducts.value.length < 1 && value.length < 1 && loadBuyToday()
})

onMounted(() => {
  isMounted.value = true
  // TODO
  // this.$store.dispatch("viewedProducts/".concat(n.VIEWED_PRODUCTS.GET_ID))
  // this.viewedProducts.length !== this.viewedProductsIDs.length && this.hasViewedProducts && this.loadViewedProducts()
  // this.buyTodayProducts.length < 1 && !this.hasViewedProducts && this.loadBuyToday()
})


function loadMoreProducts() {
  offset.value += limit.value
}

function addToBasket(t: any, e: any) {
  e ? updatingBasketProductIDs.value.push(t.productID) : loadingBasketProductIDs.value.push(t.productID)
  basketStore.BASKET_ADD({
    item: t,
    cityID: city.value.ID,
    isUpdate: e
  }).catch((error) => {
    error(error)
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
  }).catch((error) => {
    error(error)
  }).finally(() => {
    loadingFavoritesProductIDs.value = []
  })
}

function error(t: any) {
  notificationsStore.NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}

function goToCatalog() {
  router.push({
    name: "catalog"
  })
}

function goToHome() {
  router.push({
    name: "index"
  })
}

function loadViewedProducts() {
  //TODO
  // var t, e = this;
  // void 0 !== (null === (t = this.city) || void 0 === t ? void 0 : t.ID) && this.hasViewedProducts && (this.isLoadingViewedProducts = !0, this.$store.dispatch("viewedProducts/".concat(n.VIEWED_PRODUCTS.GET), {
  //   IDs: this.viewedProductsIDs,
  //   cityID: this.city.ID
  // }).then((function () {
  //   e.isFailedGettingViewedProducts = !1
  // })).catch((function (t) {
  //   e.isFailedGettingViewedProducts = !0, e.error(t)
  // })).finally((function () {
  //   e.isLoadingViewedProducts = !1
  // })))
}

function loadBuyToday(t: any) {
  //todo
  // var e, o, r = this,
  //     filter = 'groups="buy_today"&cityID='.concat(null !== (o = null === (e = this.city) || void 0 === e ? void 0 : e.ID) && void 0 !== o ? o : 41, "[:23]"),
  //     d = this.$store.dispatch("products/".concat(n.PRODUCT.GET_LIST), {
  //       filter: filter,
  //       fields: c.k,
  //       path: "random",
  //       listName: "buyToday"
  //     });
  // return t && (this.isLoadingBuyToday = !0), d.then((function () {
  //   r.isFailedGettingBuyToday = !1
  // })).catch((function (t) {
  //   r.isFailedGettingBuyToday = !0, r.error(t)
  // })).finally((function () {
  //   t && (r.isLoadingBuyToday = !1)
  // })), d
}

const preparedProducts = uPrepared

function updateBasketItem(t: any) {
  addToBasket(t, true)
}

function updateBasketStore(t: any) {
  basketStore.BASKET_UPD(t)
}

function updateFavoritesStore(t: any) {
  favoritesStore.FAVORITES_UPD(t)
}


useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: params.value.siteURL + route.path,
    },
  ],
}))
useSeoMeta({
  title: 'Избранное - Beauty | Yanco',
  description: 'На этой странице представлены товары, добавленные в избранное.',
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: 'Избранное - Beauty | Yanco',
  ogDescription: 'На этой странице представлены товары, добавленные в избранное.'
})
</script>

<template>
  <main :class='["v-favorites", { mobile: isMobile }]'>
    <template v-if="hasFavorites">
      <h1>Избранные товары</h1>
      <div :class='["products container", { mobile: isMobile }]'>
        <ProductCProductCard v-for="(item, index) in preparedProducts(preparedFavorites, PREPARED_PRODUCTS_FIELDS)"
                             :key="index" :product="item" :index="index" size="m" :basket-items="basketItems"
                             :city="city"
                             :favorites-items="favoritesItems"
                             :has-loyal-card="hasLoyalCard" :is-authorized="isAuthorized"
                             :is-basket-loading="loadingBasketProductIDs.includes(item.ID)"
                             :is-basket-updating="updatingBasketProductIDs.includes(item.ID)"
                             :is-favorites-loading="loadingFavoritesProductIDs.includes(item.ID)"
                             :product-categories="productCategories" :product-subtypes="productSubtypes"
                             :product-types="productTypes"
                             v-on:add-to-basket="addToBasket"
                             v-on:add-to-favorites="addToFavorites"
                             v-on:basket-item-update="updateBasketItem"
                             v-on:basket-store-update="updateBasketStore"
                             v-on:favorites-store-update="updateFavoritesStore"/>

        <UiCButton v-if="totalCount > offset" class="load-more" @click="loadMoreProducts">
          {{ preparedLoadMoreText }}
          <div class="line" :style='{ width: countBarWidth + "%" }'/>
        </UiCButton>
      </div>
    </template>
    <template v-else-if="!hasFavorites && !isLoading && isMounted">
      <h1>Нет избранных товаров</h1>
      <div class="empty container flex-vertical-nowrap">
        <p>
          Добавляйте товары в избранное с помощью
          <span class="icon favorite heart-beat"/>
        </p>
      </div>
    </template>
  </main>
</template>

<style scoped>
.v-favorites {
  max-width: 1368px;
  width: 100%;
  margin: auto
}

.v-favorites > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 20px
}

.v-favorites > h1 {
  text-align: center;
  font-weight: 600;
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 20px;
  line-height: 34px;
  width: 100%
}

.v-favorites > .products {
  display: grid;
  grid-template-columns: repeat(auto-fill, 208px);
  grid-gap: 30px;
  flex-grow: 1;
  justify-content: space-between;
  margin-bottom: 20px
}

.v-favorites > .products.mobile {
  padding: 0 10px;
  grid-template-columns: repeat(auto-fill, 160px)
}

@media screen and (max-width: 390px) {
  .v-favorites > .products.mobile {
    grid-template-columns:repeat(auto-fill, 160px)
  }
}

@media screen and (max-width: 360px) {
  .v-favorites > .products.mobile {
    grid-template-columns:repeat(auto-fill, 145px)
  }
}

.v-favorites > .load-more {
  margin-top: 30px;
  max-width: 100%;
  width: 100%;
  height: 52px;
  background: #ebf0f9;
  border: none;
  color: #3f51b5;
  position: relative
}

.v-favorites > .load-more .line {
  position: absolute;
  background-color: #3f51b5;
  height: 2px;
  bottom: -7px;
  left: -3px
}

.v-favorites > .load-more .caption {
  justify-content: center
}

.v-favorites > .empty {
  align-items: center;
  padding: 0 5px
}

.v-favorites > .empty > p {
  display: inline-block;
  margin-bottom: 20px;
  margin-top: 0;
  font-size: 18px;
  line-height: 15px
}

.v-favorites > .empty > p > .icon {
  width: 26px;
  height: 26px;
  margin-left: 6px;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02Ljg4NCAyQzMuNjQyIDIgMSA0LjYwNCAxIDcuODMzYzAgMS4yNC4yNDggMy4yODEgMS42NTIgNS43MTYgMS40IDIuNDMgMy45MjggNS4yMTEgOC40MjIgNy45NzRsLjAwMy4wMDJhMS43NzYgMS43NzYgMCAwMDEuODQ2IDBsLjAwMy0uMDAyYzQuNDkzLTIuNzYzIDcuMDIxLTUuNTQ0IDguNDIyLTcuOTc0QzIyLjc1MiAxMS4xMTQgMjMgOS4wNzMgMjMgNy44MzMgMjMgNC42MDMgMjAuMzU4IDIgMTcuMTE2IDJjLTEuNjggMC0zLjEzMi45MDMtNC4xMDcgMS43MTEtLjQwNS4zMzYtLjc0Ny42NzEtMS4wMDkuOTVhMTEuMjY2IDExLjI2NiAwIDAwLTEuMDA5LS45NUMxMC4wMTYgMi45MDMgOC41NjQgMiA2Ljg4NCAyeiIgZmlsbD0iIzFFMUUxRSIvPjwvc3ZnPg==");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02Ljg4NCAyQzMuNjQyIDIgMSA0LjYwNCAxIDcuODMzYzAgMS4yNC4yNDggMy4yODEgMS42NTIgNS43MTYgMS40IDIuNDMgMy45MjggNS4yMTEgOC40MjIgNy45NzRsLjAwMy4wMDJhMS43NzYgMS43NzYgMCAwMDEuODQ2IDBsLjAwMy0uMDAyYzQuNDkzLTIuNzYzIDcuMDIxLTUuNTQ0IDguNDIyLTcuOTc0QzIyLjc1MiAxMS4xMTQgMjMgOS4wNzMgMjMgNy44MzMgMjMgNC42MDMgMjAuMzU4IDIgMTcuMTE2IDJjLTEuNjggMC0zLjEzMi45MDMtNC4xMDcgMS43MTEtLjQwNS4zMzYtLjc0Ny42NzEtMS4wMDkuOTVhMTEuMjY2IDExLjI2NiAwIDAwLTEuMDA5LS45NUMxMC4wMTYgMi45MDMgOC41NjQgMiA2Ljg4NCAyeiIgZmlsbD0iIzFFMUUxRSIvPjwvc3ZnPg==");
  background-color: #ff0089;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  display: inline-block;
  margin-bottom: -8px
}

.v-favorites > .empty > p > .heart-beat {
  -webkit-animation: heart-beat 1.5s linear infinite;
  animation: heart-beat 1.5s linear infinite
}

.v-favorites > .empty > div {
  display: flex;
  align-items: center;
  margin-bottom: 20px
}

.v-favorites > .empty > div > .c-button {
  max-width: unset;
  width: 219px
}

.v-favorites > .empty > div > .c-button.primary {
  padding-left: 16px
}

.v-favorites > .empty > div > .c-button.normal {
  padding-right: 16px
}

.v-favorites > .empty > div > .c-button:last-child {
  margin-left: 16px
}

.v-favorites > .empty > div > :deep(.c-button) > .caption {
  justify-content: center
}

.v-favorites > .empty > div > :deep(.c-button) > .caption > .c-arrow-svg > div > span:first-of-type {
  margin-bottom: 1px
}

.v-favorites > .empty > div > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-favorites > .empty > div > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.v-favorites.mobile > h1 {
  margin-top: 10px;
  margin-left: 10px;
  text-align: unset
}

.v-favorites.mobile > .empty > p {
  font-size: 14px;
  line-height: 18px
}

.v-favorites.mobile > .empty > div {
  max-width: 326px;
  width: 100%
}

.v-favorites.mobile > .empty > div > .c-button {
  font-size: 13px;
  line-height: 16px;
  margin-left: 0;
  width: 100%;
  height: 48px
}

@-webkit-keyframes heart-beat {
  0% {
    transform: scale(1)
  }

  10% {
    transform: scale(1.2)
  }

  20% {
    transform: scale(1)
  }

  30% {
    transform: scale(1.2)
  }

  40% {
    transform: scale(1)
  }
}

@keyframes heart-beat {
  0% {
    transform: scale(1)
  }

  10% {
    transform: scale(1.2)
  }

  20% {
    transform: scale(1)
  }

  30% {
    transform: scale(1.2)
  }

  40% {
    transform: scale(1)
  }
}

@media screen and (max-width: 1367px) {
  .v-favorites {
    margin: 0 20px
  }

  .v-favorites.mobile {
    margin: 0 0 20px
  }

  .v-favorites.mobile > .load-more {
    height: 46px
  }

  .v-favorites.mobile > h1 {
    font-size: 20px
  }
}

@media screen and (max-width: 375px) {
  .v-favorites > .empty > p {
    flex-flow: column;
    align-items: center;
    text-align: center
  }
}

</style>