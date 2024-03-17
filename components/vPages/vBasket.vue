<script lang="ts" setup>
import {debounce, isEqual} from "lodash-es";

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const catalogStore = useCatalogStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const citiesStore = useCitiesStore()
const meStore = useMeStore()
const sessionsStore = useSessionsStore()
const viewedProductsStore = useViewedProductStore()
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
const internalItems = ref(<any>[])
const isGettingNewCheck = ref(false)
const internalFavoritesItemsIDs = ref([])
const check = ref({})
const isChangingStore = ref(false)
const basketPharmacyStock = ref({})

//COMPUTED
const amountForFreeShipping = computed(() => {
  return getAmountForFreeShipping(selectedInternalItems.value)
})
const basketCount = computed(() => {
  return basketStore.basketCount
})
const basketItems = computed(() => {
  return basketStore.items
})
const basketItemsLength = computed(() => {
  return basketStore.basketItemsLength
})
const buyTodayProducts = computed(() => {
  // return null !== (t = this.$store.state.products.buyToday) && void 0 !== t ? t : []
  return []
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const city = computed(() => {
  return citiesStore.currentCity
})
const deliveryCost = computed(() => {
  return check.value.order.deliveryCost ? check.value.order.deliveryCost : params.value.deliveryCost ? params.value.deliveryCost : 0
})
const favoritesItems = computed(() => {
  return favoritesStore.items
})
const hasFreeDelivery = computed(() => {
  return amountForFreeShipping.value <= 0 && 0 === deliveryCost.value && void 0 !== params.value.deliveryRules
})
const hasLoyalCard = computed(() => {
  return meStore.hasLoyalCard
})
const hasPaidPeriod = computed(() => {
  return meStore.hasPaidPeriod
})
const hasPromoCode = computed(() => {
  return meStore.hasPromoCode
})
const hasRecentPurchases = computed(() => {
  return recentPurchases.value.length > 0 && !isLoadingRecentProducts.value
})
const hasViewedProducts = computed(() => {
  return viewedProductsIDs.value.length > 0
})
const isAllItemsSelected = computed(() => {
  return void 0 === internalItems.value.find((i: any) => {
    return !i.isSelected
  })
})
const isAllowDelivery = computed(() => {
  return selectedInternalItems.value.every((i: any) => {
    return i.allowDelivery
  })
})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const isBasketIncludesAllViewedProducts = computed(() => {
  let e = internalItems.value.map((i: any) => {
        return i.productID
      }),
      o = viewedProductsStore.items;
  return e.length > 0 && o.length > 0 && o.every((i: any) => {
    return e.includes(i.ID)
  })
})
const isCityAllowDelivery = computed(() => {
  return city.value.allowDelivery
})
const isDeniedDelivery = computed(() => {
  return !(city.value.allowDelivery)
})
const isLoading = computed(() => {
  return appStore.getIsLoading
})
const isLoadingBasket = computed(() => {
  return appStore.isLoadingBasket
})
const isLoadingUserData = computed(() => {
  return appStore.isLoadingUserData
})
const isMobile = computed(() => {
  return appStore.isMobile || isWidthForPhone.value
})
const isNoItems = computed(() => {
  return internalItemsCount.value + internalItems.value.length < 1
})
const me = computed(() => {
  return meStore.me
})
const params = computed(() => {
  return appStore.params
})
const possiblePrices = computed(() => {
  let t: any, e: any, o: any;
  return getPossiblePrices(selectedInternalItems.value, (null !== (o = null === (e = null === (t = check.value) || void 0 === t ? void 0 : t.order) || void 0 === e ? void 0 : e.items) && void 0 !== o ? o : []).reduce((t: any, e: any) => {
    return t += e.price * e.count
  }, 0))
})
const preparedCheckItems = computed(() => {
  return getPreparedCheckItems(selectedInternalItems.value, check.value)
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
const selectedInternalItemsLength = computed(() => {
  return selectedInternalItems.value.reduce((t: any, i: any) => {
    return t += i.count
  }, 0)
})
const selectedInternalItems = computed(() => {
  return internalItems.value.filter((i: any) => {
    return i.isSelected
  })
})
const selectedItems = computed(() => {
  return basketStore.selectedItems
})
const storeCheck = computed(() => {
  return basketStore.check
})
const totalPrice = computed(() => {
  return hasLoyalCard.value && hasPaidPeriod.value || hasPromoCode.value ? possiblePrices.value.withPeriod : hasLoyalCard.value ? possiblePrices.value.withCard : possiblePrices.value.withoutCard
})
const viewedProducts = computed(() => {
  return preparedProducts(viewedProductsStore.items, ["isInBasket", "inFavorites"])
})
const viewedProductsIDs = computed(() => {
  return viewedProductsStore.viewedProductsIDs
})

watch(() => check.value, (value: any, oldValue: any) => {
  // var o, n, r, c,
  //     d = (null !== (n = null === (o = check.value.order) || void 0 === o ? void 0 : o.items) && void 0 !== n ? n : []).reduce((t: any, e: any) => {
  //       return t[e.productID] || (t[e.productID] = 0), t[e.productID] += e.count, t
  //     }, {}),
  //     m = selectedInternalItems.value.reduce((t: any, e: any) => {
  //       return t[e.productID] = e.count, t
  //     }, {});
  // isGettingNewCheck.value = !isEqual(d, m), void 0 === (null == oldValue ? void 0 : oldValue.order) && (null === (r = value.order) || void 0 === r ? void 0 : r.message) && notificationsStore.NOTIFICATIONS_UPD({
  //   desc: null === (c = value.order) || void 0 === c ? void 0 : c.message,
  //   status: "warning reverse",
  //   duration: 0,
  //   closeable: !0
  // })
})
watch(() => favoritesItems.value, (value, oldValue) => {
  (!oldValue || 0 === oldValue.length && 0 === internalFavoritesItemsIDs.value.length) && (internalFavoritesItemsIDs.value = value.map((i: any) => {
    return i.ID
  }))
})
watch(() => internalItems.value, (value) => {
  value.length < 1 && recentPurchases.value.length < 1 && isAuthorized.value && !isLoading.value && getRecentPurchases(), isAuthorized.value ? (isChangingStore.value = !0, basketStore.BASKET_UPD({
    items: value,
    cityID: city.value.ID
  }).catch((t: any) => {
    console.log(t)
    internalItems.value = basketItems.value
  }).finally(() => {
    isChangingStore.value = !1
  })) : saveToLocalStorage(value)
})
watch(() => internalFavoritesItemsIDs.value, (value) => {
  isAuthorized.value && favoritesStore.FAVORITES_UPD({
    cityID: city.value.ID,
    items: value
  }).catch((t) => {
    console.log(t)
    internalFavoritesItemsIDs.value = favoritesItems.value.map((i: any) => {
      return i.ID
    })
  })
})
watch(() => selectedInternalItemsLength.value, () => {
  // if (isGettingNewCheck.value && nextTick(() => {
  //   return isGettingNewCheck.value = !0
  // }), isGettingNewCheck.value = !0, !isAllItemsSelected.value) {
  //   var o = selectedInternalItems.value.map((t: any) => {
  //     return {
  //       productID: t.productID,
  //       count: t.count
  //     }
  //   });
  // debounce(() => {
  //   isAllItemsSelected.value || (0 !== o.length ? useNuxtApp().$api.basket.newCheck({
  //     cityID: city.value.ID,
  //     items: o
  //   }).then((t: any) => {
  //     isAllItemsSelected.value || (check.value = 0 === selectedInternalItems.value.length ? {} : t)
  //   }).catch((t) => {
  //     console.log(t)
  //   }) : check.value = {})
  // }, 1200)
  // }
})
watch(() => basketItemsLength.value, (value) => {
  value !== internalItems.value.length && (getFromStore())
})
watch(() => basketItems.value, (value) => {
  var o = value.reduce((t: any, e: any) => {
        return t[e.productID] = e.count, t
      }, {}),
      n = selectedInternalItems.value.reduce((t: any, e: any) => {
        return t[e.productID] = e.count, t
      }, {});
  isEqual(o, n) && nextTick(() => {
    return check.value = {...storeCheck}
  }), isCityChanged.value && (internalItems.value = value, isCityChanged.value = !1)
})
watch(() => city.value, (value) => {
  void 0 !== value && viewedProductsIDs.value.length > 0 && viewedProductsStore.VIEWED_PRODUCTS_GET({
    IDs: viewedProductsIDs.value,
    cityID: city.value.ID
  })
  // isGettingNewCheck.value = !0
  isCityChanged.value = !0
})
watch(() => isAuthorized.value, (value) => {
  value && recentPurchases.value.length < 1 && isNoItems.value && isMounted.value && !isLoading.value && getRecentPurchases()
})
watch(() => isLoadingRecentProducts.value, (value) => {
  !value && internalItems.value.length < 1 && buyTodayProducts.value.length < 1 && recentPurchases.value.length < 1 && viewedProductsIDs.value.length < 1 && loadBuyToday()
})
watch(() => viewedProductsIDs.value, (value) => {
  !isAuthorized.value && internalItems.value.length < 1 && buyTodayProducts.value.length < 1 && value.length < 1 && loadBuyToday()
})
watch(() => storeCheck.value, (value) => {
  isAllItemsSelected.value && (check.value = value)
})

onMounted(() => {
  isMounted.value = true
  window.addEventListener("resize", resize)
  resize()
  basketItems.value.length > 0 && (internalItems.value = basketItems.value)
  favoritesItems.value.length > 0 && (internalFavoritesItemsIDs.value = favoritesItems.value.map((i: any) => {
    return i.ID
  }))
  viewedProductsStore.VIEWED_PRODUCTS_GET_ID()
  // viewedProductsIDs.value.length > 0 && this.buyTodayProducts.length > 0 && this.$store.commit("products/".concat(l.PRODUCT.GET_LIST), {
  //   listName: "buyToday",
  //   products: void 0
  // })
  loadViewedProducts()
  // this.isAuthorized && this.isNoItems && this.getRecentPurchases()
  // !this.isAuthorized && this.basketItems.length < 1 && this.buyTodayProducts.length < 1 && this.viewedProductsIDs.length < 1 && this.loadBuyToday()
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

const getAmountForFreeShipping = uAmountForFreeShipping
const getPossiblePrices = uPossiblePrices
const getPreparedCheckItems = uPreparedCheckItems

function addToBasket(t: any, e: any) {
  if (city.value.ID) {
    let n = internalItems.value.find((i: any) => {
      return i.productID === t.productID
    });
    n ? n.count += t.count : internalItems.value.push(t)
  }
}

function addToFavorites(t: any) {
  // var e, o, n, r, c, d = this;
  // if ("number" == typeof t) return this.loadingFavoritesProductIDs.push(t), void this.$store.dispatch("favorites/".concat(l.FAVORITES.ADD), {
  //   itemID: t,
  //   cityID: null !== (o = null === (e = this.city) || void 0 === e ? void 0 : e.ID) && void 0 !== o ? o : 41
  // }).then((function (t) {
  //   d.internalFavoritesItemsIDs = t.map((function (i) {
  //     return i.ID
  //   }))
  // })).catch((function (t) {
  //   d.$emit("error", t)
  // })).finally((function () {
  //   d.loadingFavoritesProductIDs = []
  // }));
  // var f = null !== (n = t.ID) && void 0 !== n ? n : t.productID;
  // if (this.internalFavoritesItemsIDs.includes(f) ? this.internalFavoritesItemsIDs = this.internalFavoritesItemsIDs.filter((function (i) {
  //   return i !== f
  // })) : this.internalFavoritesItemsIDs.push(f), this.internalFavoritesItemsIDs.includes(f) && (this.isMobile || this.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
  //   status: "favorites",
  //   image: Object(m.prepareProduct)({
  //     images: null !== (r = null == t ? void 0 : t.images) && void 0 !== r ? r : [],
  //     ID: f
  //   }, m.SIZE_S, this.params.cdnURL.url).images[0]
  // })), !this.isAuthorized) {
  //   var v = this.favoritesItems.length > 0 ? h.c.clone(this.favoritesItems) : [];
  //   if (this.internalFavoritesItemsIDs.includes(f)) {
  //     var I = null !== (c = t.slug) && void 0 !== c ? c : t.productSlug,
  //         y = t;
  //     y.ID = f, y.slug = I, v.push(y)
  //   } else {
  //     var k = v.findIndex((function (t) {
  //       return t.ID === f
  //     }));
  //     v.splice(k, 1)
  //   }
  //   this.$store.commit("favorites/".concat(l.FAVORITES.UPD), v), localStorage.setItem("favorites", JSON.stringify(v))
  // }
}

function changeInternalItemsCount(t: any) {
  internalItemsCount.value = t
}

function error(t: any) {
  notificationsStore.NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}

function electronicCheckModalClose() {
  isOpenElectronicCheckModal.value = !1
  router.push({
    name: "checkout"
  })
}

function getRecentPurchases() {
  // var t, e, o = this,
  //     filter = "cityID=".concat(null !== (e = null === (t = this.city) || void 0 === t ? void 0 : t.ID) && void 0 !== e ? e : 41, "[:23]");
  // this.isLoadingRecentProducts = !0, v.a.me.getRecentPurchases(filter).then((function (p) {
  //   o.recentPurchases = null != p ? p : []
  // })).catch((function (t) {
  //   o.error(t)
  // })).finally((function () {
  //   o.isLoadingRecentProducts = !1
  // }))
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

function loadBuyToday() {
  // var t, e, o = this,
  //     filter = 'groups="buy_today"&cityID='.concat(null !== (e = null === (t = this.city) || void 0 === t ? void 0 : t.ID) && void 0 !== e ? e : 41, "[:23]");
  // this.isLoadingBuyToday = !0, this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), {
  //   filter: filter,
  //   fields: f.k,
  //   path: "random",
  //   listName: "buyToday"
  // }).catch((function (t) {
  //   o.error(t)
  // })).finally((function () {
  //   o.isLoadingBuyToday = !1
  // }))
}

function loadViewedProducts() {
  void 0 !== city.value && viewedProductsIDs.value.length > 0 && viewedProductsStore.VIEWED_PRODUCTS_GET({
    IDs: viewedProductsIDs.value,
    cityID: city.value.ID
  }).then(() => {
    isFailedGettingViewedProducts.value = !1
  }).catch((t: any) => {
    isFailedGettingViewedProducts.value = !0
    error(t)
  })
}

const preparedProducts = uPrepared

function resize() {
  isWidthForPhone.value = window.innerWidth <= 510
}

function saveToLocalStorage(t: any) {
  localStorage.setItem("basket", JSON.stringify(t))
  basketStore.COMMIT_BASKET_UPD([...t])
}

function showModalElectronicCheck() {
  isOpenElectronicCheckModal.value = true
}

function updateBasket(t: any) {
  internalItems.value = t.filter((i: any) => {
    return !i.isRemoved
  })
}

function updateBasketItem(t: any) {
  t.isRemoved && (internalItems.value = internalItems.value.filter((i: any) => {
    return i.productID !== t.productID
  }));
  var e = internalItems.value.find((i: any) => {
    return i.productID === t.productID
  });
  e && (e.count = t.count)
}

function selectBasketItem(t: any) {
  internalItems.value = internalItems.value.map((i: any) => {
    return {
      ...i,
      isSelected: i.productID === t.productID ? t.isSelected : i.isSelected
    }
  })
}

function updateBasketStore(t: any) {
  internalItems.value = t
}

function updateFavoritesStore(t: any) {
  favoritesStore.COMMIT_FAVORITES_UPD(t)
}

function basketSelectAll(t: any) {
  internalItems.value = internalItems.value.map((i: any) => {
    return {
      ...i,
      isSelected: t
    }
  })
}

function getFromStore() {
  isChangingStore.value || (internalItems.value = basketItems.value)
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
  title: 'Корзина — Cosmetic | Yanco',
  description: 'На этой странице представлены товары, добавленные в корзину.',
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://cosmetic.yanco.ru/img/cosmetic_logo.png',
  ogTitle: 'Корзина — Cosmetic | Yanco',
  ogDescription: 'На этой странице представлены товары, добавленные в корзину.'
})
</script>

<template>
  <main
      :class='["v-basket", { "no-items": isNoItems, mobile: isMobile, loading: isLoadingUserData || isLoadingBasket }]'>
    <template v-if="isLoadingBasket || !isMounted">
      <LazyUiCSpinner v-if="isLoadingBasket || !isMounted" size="m" position="relative"/>
    </template>
    <template v-else>
      <div v-if="isNoItems">
        <p>В корзине пока нет товаров...</p>
        <span>Вы можете начать свой выбор с главной страницы или воспользоваться поиском</span>
        <div>
          <UiCButton v-if="!isMobile" @click="goToCatalog">
            <UiCArrowSVG class="prev" color="#3f51b5" hover-color="#4960df" size="s"/>
            Перейти в каталог
          </UiCButton>
          <UiCButton @click="goToHome" mode="primary" size="xl">
            Перейти на главную
            <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
          </UiCButton>
        </div>
      </div>
      <div v-else>
        <BasketCBasket :basket-count="basketCount" :basket-items="internalItems"
                       :basket-selected-count="selectedInternalItemsLength" :city="city"
                       :favorites-items="internalFavoritesItemsIDs" :has-free-delivery="hasFreeDelivery"
                       :has-loyal-card="hasLoyalCard" :has-paid-period="hasPaidPeriod"
                       :is-allow-delivery="isAllowDelivery" :is-authorized="isAuthorized"
                       :is-basket-changing="isGettingNewCheck" :is-city-allow-delivery="isCityAllowDelivery"
                       :is-denied-delivery="isDeniedDelivery" :is-mobile="isMobile"
                       :is-no-delivery-rules="isNoDeliveryRules" :me="me"
                       :amount-for-free-shipping="amountForFreeShipping" :params="params"
                       :possible-prices="possiblePrices" :prepared-check-items="preparedCheckItems"
                       :total-price="totalPrice" :updating-basket-product-i-ds="updatingBasketProductIDs"
                       :basket-pharmacy-stock="basketPharmacyStock"
                       v-on:add-to-basket="addToBasket"
                       v-on:add-to-favorites="addToFavorites"
                       v-on:basket-item-update="updateBasketItem"
                       v-on:basket-item-select="selectBasketItem"
                       v-on:basket-select-all="basketSelectAll"
                       v-on:basket-store-update="updateBasketStore"
                       v-on:basket-update="updateBasket"
                       v-on:error="error"
                       v-on:internal-items-count-change="changeInternalItemsCount"
                       v-on:modal-electronic-check-show="showModalElectronicCheck"/>
      </div>
    </template>

    <template
        v-if="(recentPurchases.length < 1 && !isLoadingRecentProducts || !isNoItems) && !isLoadingBuyToday && buyTodayProducts.length < 1 && hasViewedProducts">
      <ProductCProductsSlider v-if="!isBasketIncludesAllViewedProducts" class="viewed-products" is-in-basket
                              :basket-items="internalItems"
                              :favorites-items="favoritesItems" :city="city" :has-loyal-card="hasLoyalCard"
                              :is-authorized="isAuthorized" :is-mobile="isMobile" :is-width-for-phone="isWidthForPhone"
                              :loading-favorites-product-i-ds="loadingFavoritesProductIDs"
                              :updating-basket-product-i-ds="updatingBasketProductIDs"
                              :product-categories="productCategories" :product-subtypes="productSubtypes"
                              :product-types="productTypes"
                              :products="viewedProducts.length > 0 ? preparedProducts(viewedProducts) : placeholderItems"
                              title="Вы смотрели"
                              v-on:add-to-basket="addToBasket"
                              v-on:add-to-favorites="addToFavorites"
                              v-on:basket-item-update="updateBasketItem"
                              v-on:basket-store-update="updateBasketStore"
                              v-on:favorites-store-update="updateFavoritesStore"/>
    </template>
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

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > :deep(.c-button) > .caption {
  justify-content: center
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-basket.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
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

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > :deep(.c-button) > .caption {
  justify-content: center
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > :deep(.c-button) > .caption > .c-arrow-svg > div > span:first-of-type {
  margin-bottom: 1px
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-basket.mobile.no-items > div:not(.c-products-slider) > div:not(.c-products-slider) > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
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