<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const catalogStore = useCatalogStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const citiesStore = useCitiesStore()
const notificationsStore = useNotificationsStore()

//DATA
const isNoDeliveryRules = ref(false)
const internalItemsCount = ref(0)
const updatingBasketProductIDs = ref([])
const loadingFavoritesProductIDs = ref([])
const isMounted = ref(false)
const recentPurchases = ref([])
const placeholderItems = ref([{}, {}, {}, {}, {}, {}])
const isCityChanged = ref(false)
const isLoadingRecentProducts = ref(false)
const isLoadingBuyToday = ref(false)
const isFailedGettingViewedProducts = ref(false)
const isWidthForPhone = ref(false)
const isOpenElectronicCheckModal = ref(false)
const internalItems = ref([])
const isGettingNewCheck = ref(false)
const internalFavoritesItemsIDs = ref([])
const check = ref({})
const isChangingStore = ref(false)
const basketPharmacyStock = ref({})

//COMPUTED
const params = computed(() => {
  return appStore.params
})
// const amountForFreeShipping = computed(() => {
//   return this.getAmountForFreeShipping(this.selectedInternalItems)
// })
// const basketCount = computed(() => {
//   return this.$store.getters["basket/basketCount"]
// })
// const basketItems = computed(() => {
//   var t;
//   return null !== (t = this.$store.state.basket.items) && void 0 !== t ? t : []
// })
// const basketItemsLength = computed(() => {
//   return this.$store.getters["basket/basketItemsLength"]
// })
// const buyTodayProducts = computed(() => {
//   var t;
//   return null !== (t = this.$store.state.products.buyToday) && void 0 !== t ? t : []
// })
// const catalog = computed(() => {
//   return this.$store.state.catalog.catalog
// })
// const city = computed(() => {
//   return this.$store.state.cities.currentCity
// })
// const deliveryCost = computed(() => {
//   var t, e, o;
//   return null !== (o = null !== (e = null === (t = this.check.order) || void 0 === t ? void 0 : t.deliveryCost) && void 0 !== e ? e : this.params.deliveryCost) && void 0 !== o ? o : 0
// })
// const favoritesItems = computed(() => {
//   var t;
//   return null !== (t = this.$store.state.favorites.items) && void 0 !== t ? t : []
// })
// const hasFreeDelivery = computed(() => {
//   return this.amountForFreeShipping <= 0 && 0 === this.deliveryCost && void 0 !== this.params.deliveryRules
// })
// const hasLoyalCard = computed(() => {
//   return this.$store.getters["me/hasLoyalCard"]
// })
// const hasPaidPeriod = computed(() => {
//   return this.$store.getters["me/hasPaidPeriod"]
// })
// const hasPromoCode = computed(() => {
//   return this.$store.getters["me/hasPromoCode"]
// })
// const hasRecentPurchases = computed(() => {
//   return this.recentPurchases.length > 0 && !this.isLoadingRecentProducts
// })
// const hasViewedProducts = computed(() => {
//   return this.viewedProductsIDs.length > 0
// })
// const isAllItemsSelected = computed(() => {
//   return void 0 === this.internalItems.find((function (i) {
//     return !i.isSelected
//   }))
// })
// const isAllowDelivery = computed(() => {
//   return this.selectedInternalItems.every((function (i) {
//     return i.allowDelivery
//   }))
// })
// const isAuthorized = computed(() => {
//   return this.$store.getters["sessions/isAuthorized"]
// })
// const isBasketIncludesAllViewedProducts = computed(() => {
//   var t, e = this.internalItems.map((function (i) {
//         return i.productID
//       })),
//       o = null !== (t = this.$store.state.viewedProducts.items) && void 0 !== t ? t : [];
//   return e.length > 0 && o.length > 0 && o.every((function (i) {
//     return e.includes(i.ID)
//   }))
// })
// const isCityAllowDelivery = computed(() => {
//   var t, e;
//   return null !== (e = null === (t = this.city) || void 0 === t ? void 0 : t.allowDelivery) && void 0 !== e && e
// })
// const isDeniedDelivery = computed(() => {
//   var t;
//   return !(null === (t = this.city) || void 0 === t ? void 0 : t.allowDelivery)
// })
// const isLoading = computed(() => {
//   return this.$store.getters["app/isLoading"]
// })
// const isLoadingBasket = computed(() => {
//   return this.$store.state.app.isLoadingBasket
// })
// const isLoadingUserData = computed(() => {
//   return this.$store.state.app.isLoadingUserData
// })
// const isMobile = computed(() => {
//   return appStore.isMobile || isWidthForPhone.value
// })
// const isNoItems = computed(() => {
//   return this.internalItemsCount + this.internalItems.length < 1
// })
// const me = computed(() => {
//   var t;
//   return null !== (t = this.$store.getters["me/me"]) && void 0 !== t ? t : {}
// })
// const possiblePrices = computed(() => {
//   var t, e, o;
//   return this.getPossiblePrices(this.selectedInternalItems, (null !== (o = null === (e = null === (t = this.check) || void 0 === t ? void 0 : t.order) || void 0 === e ? void 0 : e.items) && void 0 !== o ? o : []).reduce((function (t, e) {
//     return t += e.price * e.count
//   }), 0))
// })
// const preparedCheckItems = computed(() => {
//   return this.getPreparedCheckItems(this.selectedInternalItems, this.check)
// })
// const productCategories = computed(() => {
//   var t, e;
//   return null !== (e = null === (t = this.catalog) || void 0 === t ? void 0 : t.categories) && void 0 !== e ? e : []
// })
// const productSubtypes = computed(() => {
//   var t, e;
//   return null !== (e = null === (t = this.catalog) || void 0 === t ? void 0 : t.subtypes) && void 0 !== e ? e : []
// })
// const productTypes = computed(() => {
//   var t, e;
//   return null !== (e = null === (t = this.catalog) || void 0 === t ? void 0 : t.types) && void 0 !== e ? e : []
// })
// const selectedInternalItemsLength = computed(() => {
//   return this.selectedInternalItems.reduce((function (t, i) {
//     return t += i.count
//   }), 0)
// })
// const selectedInternalItems = computed(() => {
//   return this.internalItems.filter((function (i) {
//     return i.isSelected
//   }))
// })
// const selectedItems = computed(() => {
//   return this.$store.getters["basket/selectedItems"]
// })
// const storeCheck = computed(() => {
//   var t;
//   return null !== (t = this.$store.state.basket.check) && void 0 !== t ? t : {}
// })
// const totalPrice = computed(() => {
//   return this.hasLoyalCard && this.hasPaidPeriod || this.hasPromoCode ? this.possiblePrices.withPeriod : this.hasLoyalCard ? this.possiblePrices.withCard : this.possiblePrices.withoutCard
// })
// const viewedProducts = computed(() => {
//   var t;
//   return this.preparedProducts(null !== (t = this.$store.state.viewedProducts.items) && void 0 !== t ? t : [], ["isInBasket", "inFavorites"])
// })
// const viewedProductsIDs = computed(() => {
//   var t;
//   return null !== (t = this.$store.state.viewedProducts.viewedProductsIDs) && void 0 !== t ? t : []
// })

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: params.value.siteURL + route.path,
    },
  ],
}))
useSeoMeta({
  title: 'Корзина — Cosmetic | Yanco',
  description: 'На этой странице представлены товары, добавленные в корзину.',
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: 'Корзина — Cosmetic | Yanco',
  ogDescription: 'На этой странице представлены товары, добавленные в корзину.'
})
</script>

<template>
  <main class="v-basket">
    v-basket
  </main>
</template>

<style scoped>
.v-basket {
  max-width: 1368px;
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 0 auto auto;
  padding: 0;
  box-sizing: border-box
}

.v-basket.loading {
  margin: auto
}

.v-basket.no-items > div:not(.c-products-slider) {
  display: flex;
  flex-flow: column
}

.v-basket.no-items > div:not(.c-products-slider) > p {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #1e1e1e;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center
}

.v-basket.no-items > div:not(.c-products-slider) > span {
  font-size: 18px;
  line-height: 15px;
  color: #1e1e1e;
  text-align: center
}

.v-basket.no-items > div:not(.c-products-slider) > span > a {
  color: #3f51b5;
  margin-right: 5px
}

.v-basket.no-items > div:not(.c-products-slider) > span > a:hover {
  color: #4960df
}

.v-basket.no-items > div:not(.c-products-slider) > span > a:active {
  color: #32408f
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) {
  display: flex;
  margin-top: 20px;
  align-items: center;
  align-self: center;
  margin-bottom: 20px
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button {
  max-width: unset;
  width: 219px
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button.primary {
  padding-left: 16px
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button.normal {
  padding-right: 16px
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button:last-child {
  margin-left: 16px
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button > .caption {
  justify-content: center
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button:hover > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button:hover > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.v-basket > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-basket > .failed-getting > .c-button {
  margin-bottom: 20px
}

.v-basket > .failed-getting, .v-basket > .viewed-products {
  margin-top: 20px
}

.v-basket > .c-products-slider.mobile {
  padding: 0
}

.v-basket.mobile {
  margin-bottom: 10px
}

.v-basket.mobile > .viewed-products {
  margin-top: 0
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > p {
  margin-top: 10px
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) {
  max-width: 326px;
  width: 100%
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button {
  font-size: 13px;
  line-height: 16px;
  margin-left: 0;
  width: 100%;
  height: 48px
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button > .caption {
  justify-content: center
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button > .caption > .c-arrow-svg > div > span:first-of-type {
  margin-bottom: 1px
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button:hover > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > .c-button:hover > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

@media screen and (max-width: 1368px) {
  .v-basket {
    padding: 0 10px
  }
}

@media screen and (max-width: 930px) {
  .v-basket {
    overflow: hidden
  }
}

@media screen and (max-width: 850px) {
  .v-basket.no-items > div:not(.c-products-slider) > p {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 10px
  }

  .v-basket.no-items > div:not(.c-products-slider) > span {
    font-size: 14px;
    line-height: 18px
  }
}

@media screen and (max-width: 580px) {
  .v-basket.no-items > div:not(.c-products-slider) > p {
    font-size: 20px;
    line-height: 22px
  }
}

@media screen and (max-width: 510px) {
  .v-basket.no-items > div > .c-products-slider {
    padding: 0
  }

  .v-basket.no-items > div:not(.c-products-slider) > .c-button {
    max-width: unset
  }
}

@media screen and (max-width: 370px) {
  .v-basket.no-items > div:not(.c-products-slider) > p {
    font-size: 18px;
    line-height: 20px
  }

  .v-basket.no-items > div:not(.c-products-slider) > span {
    font-size: 13px
  }
}

</style>