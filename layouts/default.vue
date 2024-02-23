<script lang="ts" setup>
//TODO STORE
const appStore = useAppStore()
const catalogStore = useCatalogStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const comparisonStore = useComparisonProductsStore()
const sessionsStore = useSessionsStore()
const meStore = useMeStore()
const citiesStore = useCitiesStore()
const regionsStore = useRegionsStore()
const storiesStore = useStoriesStore()
const route = useRoute()
const notificationsStore = useNotificationsStore()

//TODO END STORE

//TODO MIDDLEWARE
//....
//TODO END MIDDLEWARE

//TODO HOOKS
const device = useDevice()
await appStore.COMMIT_MOBILE_UPD(device.isMobile)
//TODO END HOOKS

//TODO DATA
const isScrolled = ref(false)
const isPopupNotifications = ref(false)

const comparisonProducts = ref([])
const searchResult = ref({})
const isChangedBasketAvailability = ref(false)
const isChangedBasketPrice = ref(false)
const isUpdateToken = ref(false)
const operatorStatus = ref(undefined)
const isBasketItemsChanged = ref(false)
const orderStatuses = ref({})
const orders = ref([])
const loadingBasketProductIDs = ref(<any>[])
const updatingBasketProductIDs = ref(<any>[])
const isOpenBarcode = ref(false)
const isFirstLoadNotCity = ref(false)
const isNoDeliveryRules = ref(false)
//TODO END DATA

//TODO COMPUTED
const breadcrumbs = computed(() => {
  return appStore.breadcrumbs
})
const isAllRankItems = computed(() => {
  return basketItems.value.every((product: any) => {
    return product.price.withPeriod !== product.price.withoutCard && product.price.withPeriod !== product.price.withCard
  })
})
const city: any = computed(() => {
  return citiesStore.currentCity
})
const check: any = computed(() => {
  return basketStore.check
})
const isAllowDelivery = computed(() => {
  return basketItems.value.every((i: any) => {
    return i.allowDelivery
  })
})
const isDeniedDelivery = computed(() => {
  return !(city.value ? city.value.allowDelivery : undefined)
})
const hasFreeDelivery = computed(() => {
  return amountForFreeShipping.value <= 0 && 0 === deliveryCost.value && void 0 !== params.value.deliveryRules
})
const amountForFreeShipping = computed(() => {
  return getAmountForFreeShipping(basketItems.value)
})
const deliveryCost = computed(() => {
  let n = check.order?.deliveryCost ? check.order.deliveryCost : params.value.deliveryCost
  return n ? n : 0
})
const basketCount = computed(() => {
  return basketStore.basketCount
})
const basketItems = computed(() => {
  return basketStore.items
})
const isBasketConflict = computed(() => {
  return basketStore.isBasketConflict
})
const favoritesItems = computed(() => {
  return favoritesStore.items
})
const favoritesCount = computed(() => {
  return favoritesStore.favoritesCount
})
const params = computed(() => {
  return appStore.params
})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const me = computed(() => {
  return meStore.getMe
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
const comparisonCount = computed(() => {
  return comparisonProducts.value.length
})
const comparisonProductIDs = computed(() => {
  return comparisonStore.list
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const isLoading = computed(() => {
  return appStore.getIsLoading
})
const notifications = computed(() => {
  return notificationsStore.notifications ? notificationsStore.notifications : []
})
const notificationsCount = computed(() => {
  return notifications ? notifications.value.length : 0
})
const isHome = computed(() => {
  return "index" === route.name
})
const isProductPage = computed(() => {
  return ["Product", "ProductReviews"].includes(<any>route.name)
})
const routeName = computed(() => {
  return route.name
})
const routeParams = computed(() => {
  return route.params
})
const possiblePrices: any = computed(() => {
  return getPossiblePrices(basketItems.value)
})
const totalPrice = computed(() => {
  return hasLoyalCard.value && hasPaidPeriod.value || hasPromoCode.value ? possiblePrices.value.withPeriod : hasLoyalCard.value ? possiblePrices.value.withCard : possiblePrices.value.withoutCard
})
const preparedCheckItems = computed(() => {
  return getPreparedCheckItems()
})
const isOpenStoryModal = computed(() => {
  return appStore.isOpenStoryModal
})
const stories = computed(() => {
  return storiesStore.stories ? storiesStore.stories : []
})
const isBreadcrumbs = computed(() => {
  return breadcrumbs.value.length > 0
})
//TODO END COMPUTED

// onBeforeMount(()=>{
//   init()
// })
//TODO MOUNTED
onMounted(() => {
  init()
  appStore.COMMIT_DISCOUNT_NOTICE_UPD(JSON.parse(localStorage.getItem("isShowDiscountNotice") ? <any>localStorage.getItem("isShowDiscountNotice") : "true"))

  window.addEventListener("storage", changeLocalStorage)
  window.addEventListener("scroll", checkScroll)

  let time = (new Date).getTime();
  isPopupNotifications.value = (time >= Number(localStorage.getItem("noticePrice"))) || (time >= Number(localStorage.getItem("noticeCookie")))

  comparisonStore.COMPARISON_PRODUCTS_GET()

  changeViewedStories()
})
onDeactivated(() => {
  window.removeEventListener("scroll", checkScroll)
  window.removeEventListener("storage", changeLocalStorage)
})
//TODO END MOUNTED

watch(() => city.value, () => {
  appStore.COMMIT_LOADING_UPD(true)
  init().finally(() => {
    appStore.COMMIT_LOADING_UPD(false)
  })
})

//TODO METHODS
function checkScroll() {
  let height = window.innerHeight;
  isScrolled.value = window.scrollY > height
}

function updateNotice(val: any) {
  notificationsStore.NOTIFICATIONS_UPD(val)
}

function closeNotice(id: number) {
  notificationsStore.NOTIFICATIONS_DEL(id)
}

const getAmountForFreeShipping = uAmountForFreeShipping
const getPossiblePrices = uPossiblePrices
const getPreparedCheckItems = uPreparedCheckItems

function addToBasket(item: any, e: any) {
  let cityID = city.value.ID
  if (cityID) {
    if (e) {
      updatingBasketProductIDs.value.push(item.productID)
    } else {
      loadingBasketProductIDs.value.push(item.productID)
    }
    basketStore.BASKET_ADD({
      item: item,
      cityID: cityID,
      isUpdate: e
    }).catch((error: any) => {
      error(error)
    }).finally(() => {
      loadingBasketProductIDs.value = []
      e && (updatingBasketProductIDs.value = [])
    })
  }
}

function updateBasketItem(item: any) {
  addToBasket(item, true)
}

function updateBasketStore(item: any) {
  basketStore.COMMIT_BASKET_UPD(item)
}

function changeLocalStorage(t: any) {
  let mFavoritesItems = JSON.stringify(favoritesItems.value),
      fBasketItems = JSON.stringify(basketItems.value),
      vComparisonProductIDs = JSON.stringify(comparisonProductIDs.value),
      VisBasketConflict = "" + isBasketConflict.value,
      y = t.storageArea?.favorites ? t.storageArea?.favorites : "[]",
      _ = t.storageArea?.basketLocalStore ? t.storageArea?.basketLocalStore : "[]",
      I = t.storageArea?.comparisonProducts ? t.storageArea?.comparisonProducts : "[]",
      A = t.storageArea?.token ? t.storageArea?.token : undefined,
      C = t.storageArea?.isBasketConflict ? t.storageArea?.isBasketConflict : undefined

  //TODO
  // if (A !== storeToken)

  "favorites" === t.key && mFavoritesItems !== y && favoritesStore.COMMIT_FAVORITES_UPD(JSON.parse(y))
  "basketLocalStore" === t.key && fBasketItems !== _ && basketStore.COMMIT_BASKET_UPD(JSON.parse(_))
  "comparisonProducts" === t.key && vComparisonProductIDs !== I && comparisonStore.COMPARISON_PRODUCTS_GET(JSON.parse(I))
  "isBasketConflict" === t.key && undefined !== C && VisBasketConflict !== C && basketStore.COMMIT_BASKET_CONFLICT(JSON.parse(C))
}

function getComparisonProducts() {
  let o = comparisonProductIDs.value.flatMap((p: any) => {
    return p.productIDs
  });
  if (o.length > 0 && o.length !== comparisonProducts.value.length) {
    //TODO API GET
    let p = [{
      "ID": 334932,
      "categoryID": 277,
      "slug": "allvit_koenzim_q10_100mg_kapsuly_30",
      "name": "Gold'n Apotheka Коэнзим Q10 капсулы №30",
      "price": {"withCard": 1393.0, "withPeriod": 1393.0, "withoutCard": 1990.0},
      "images": ["86a404f180be07cc5d68d55a3c98bf54.webp"],
      "isRecipe": false,
      "imagesSizeXS": ["https://pictures.apteka-april.ru/products/334932/80/86a404f180be07cc5d68d55a3c98bf54.webp"],
      "imagesSizeS": ["https://pictures.apteka-april.ru/products/334932/208/86a404f180be07cc5d68d55a3c98bf54.webp"]
    }]
    comparisonProducts.value = p ? <any>p : [];

    let t = comparisonProducts.value.flatMap((t: any) => {
      return t.ID
    })

    let e = comparisonProductIDs.value.reduce((e: any, n: any) => {
      let o = <any>[];
      return n.productIDs.forEach((e: any) => {
        t.includes(e) && o.push(e)
      }), o.length > 0 && e.push({
        categoryID: n.categoryID,
        productIDs: o
      }), e
    }, []);
    comparisonStore.COMPARISON_PRODUCTS_UPD(e)
  } else {
    o.length < 1 && (comparisonProducts.value = [])
  }
}

function logout() {
  sessionsStore.SESSIONS_DEL().then(() => {
    basketStore.COMMIT_BASKET_DEL()
    favoritesStore.COMMIT_FAVORITES_DEL()
    meStore.COMMIT_ME_GET({})
    //TODO t.$store.commit("bindings/".concat(z.BINDINGS.GET), void 0)
  }).catch((error: any) => {
    error(error)
  })
}

function search(filter: any) {
  let e = uAllowFiltersProduct.filter((s) => {
    return !["typeIDs", "subtypeIDs"].includes(s)
  })
  useNuxtApp().$api.search.get(filter, e).then((res: any) => {
    searchResult.value = null != res ? res : {}
  }).catch((error: any) => {
    console.log(error)
  })
}

function clearSearchResult() {
  searchResult.value = {}
}

function init() {
  return Promise.all([loadBasket(), loadFavorites()]).catch((t) => {
    console.log(t)
  })
}

function loadBasket() {
  appStore.COMMIT_LOADING_BASKET(true)
  return loadFromStoreOrLocalStorage("basket", basketStore.BASKET_GET, basketStore.COMMIT_BASKET_UPD).finally(() => {
    appStore.COMMIT_LOADING_BASKET(false)
  })
}

function loadFavorites() {
  return loadFromStoreOrLocalStorage("favorites", favoritesStore.FAVORITES_GET, favoritesStore.COMMIT_FAVORITES_UPD)
}

function loadFromStoreOrLocalStorage(nameStorage: any, getStorage: Function, updStorage: Function) {
  if (city.value === undefined) return Promise.resolve()
  let cityID = city?.value.ID
  let fromStorage = JSON.parse(localStorage.getItem(nameStorage) ? <any>localStorage.getItem(nameStorage) : "[]")
  if (!isAuthorized.value) {
    if (fromStorage.length === 0) return updStorage(fromStorage)
    let newStorage: any = {}
    if (nameStorage === "basket") {
      newStorage = fromStorage.reduce((result: any, item: any) => {
        result[item.productID] = item
        return result
      }, {})
    } else {
      newStorage = fromStorage.reduce((result: any, item: any) => {
        result[item.ID] = item
        return result
      }, {})
    }
    updStorage(Object.values(newStorage))
    return Promise.resolve(newStorage)
  }
  return Promise.resolve()
  // TODO
  // var o, r = this;
  // if (void 0 === this.city) return Promise.resolve();
  // var c = this.city.ID,
  //     l = JSON.parse(null !== (o = localStorage.getItem(t)) && void 0 !== o ? o : "[]");
  // if (!this.isAuthorized) {
  //   if (0 === l.length) return this.$store.commit(n, l), Promise.resolve();
  //   var d;
  //
  //   var h = Q.a.products.get("ID={".concat(Object.keys(d).join(), "}&cityID=").concat(c), ["ID", "price", "isInStock", "images", "allowDelivery", "allowOnlinePayment", "limitWithCard", "limitWithoutCard", "discountDescription", "isAvailable", "isWaitingArrive", "isRecipe", "discountTemplate", "deliveryAmount", "mightNeedID", "imagesSizeS", "imagesSizeXS", "isSiteSellRemains", "isOrderRcNoRc"]);
  //   return h.then((function (t) {
  //     var e, o = ni(t);
  //     try {
  //       for (o.s(); !(e = o.n()).done;) {
  //         var p = e.value;
  //         d[p.ID] = ii(ii({}, d[p.ID]), {}, {
  //           images: p.images,
  //           price: p.isInStock || void 0 === p.priceZakaz ? p.price : p.priceZakaz,
  //           isInStock: p.isInStock,
  //           isAvailable: p.isAvailable,
  //           allowDelivery: p.allowDelivery,
  //           allowOnlinePayment: p.allowOnlinePayment,
  //           limitWithCard: p.limitWithCard,
  //           limitWithoutCard: p.limitWithoutCard,
  //           deliveryAmount: p.deliveryAmount,
  //           discountTemplate: p.discountTemplate,
  //           mightNeedID: p.mightNeedID,
  //           imagesSizeS: p.imagesSizeS,
  //           imagesSizeXS: p.imagesSizeXS,
  //           isSiteSellRemains: p.isSiteSellRemains,
  //           isWaitingArrive: p.isWaitingArrive,
  //           isOrderRcNoRc: p.isOrderRcNoRc
  //         })
  //       }
  //     } catch (t) {
  //       o.e(t)
  //     } finally {
  //       o.f()
  //     }
  //     r.$store.commit(n, Object.values(d))
  //   })), h
  // }
  // return this.$store.dispatch(e, c).then((function (i) {
  //   "basket" === t && (null != i ? i : []).length > 0 && (null != l ? l : []).length > 0 ? r.$store.commit("basket/".concat(z.BASKET.CONFLICT), !0) : ((null != i ? i : []).length < 1 && (null != l ? l : []).length > 0 && ("basket" === t && r.checkBasketLimit(l), r.$store.dispatch(n, {
  //     items: "basket" === t ? l : l.map((function (t) {
  //       return t.ID
  //     })),
  //     cityID: c
  //   })), "basket" === t && localStorage.removeItem(t))
  // }))
}

function changeViewedStories() {
  let t = JSON.parse(localStorage.getItem("viewedStoriesIDs") || "[]");
  storiesStore.COMMIT_CHANGE_VIEWED_STORIES(t)
}

function error(error: any) {
  notificationsStore.NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: error,
    status: "error"
  })
}

const router = useRouter()
//TODO END METHODS
</script>

<template>
  <div id="app">
    <UiCSpinner v-if="isLoading"/>
    <LazyNotificationsCNotifications v-if="notificationsCount > 0"
                                     :notifications="notifications"
                                     :is-mobile="isMobile"
                                     :params="params"
                                     v-on:notice-close="closeNotice"/>
    <!--    cBasketConflict-->
    <LazyHeaderCTopNavigationBar v-if="!isMobile"
                                 :params="params"
                                 v-on:notice-update="updateNotice"/>

    <HeaderCHeader :is-mobile="isMobile" :is-all-rank-items="isAllRankItems" :has-free-delivery="hasFreeDelivery"
                   :is-allow-delivery="isAllowDelivery" :is-denied-delivery="isDeniedDelivery"
                   :is-no-delivery-rules="isNoDeliveryRules" :basket-count="basketCount" :basket-items="basketItems"
                   :city="city" :comparison-count="comparisonCount" :comparison-product-i-ds="comparisonProductIDs"
                   :comparison-products="comparisonProducts" :delivery-cost="deliveryCost"
                   :favorites-count="favoritesCount" :search-result="searchResult" :has-loyal-card="hasLoyalCard"
                   :has-paid-period="hasPaidPeriod" :has-promo-code="hasPromoCode" :is-authorized="isAuthorized"
                   :loading-basket-product-i-ds="loadingBasketProductIDs" :me="me" :params="params"
                   :possible-prices="possiblePrices" :prepared-check-items="preparedCheckItems" :route-name="routeName"
                   :route-params="routeParams" :total-price="totalPrice"
                   :updating-basket-product-i-ds="updatingBasketProductIDs"
                   v-on:add-to-basket="addToBasket"
                   v-on:basket-item-update="updateBasketItem"
                   v-on:basket-store-update="updateBasketStore"
                   v-on:comparison-products-get="getComparisonProducts"
                   v-on:logout="logout"
                   v-on:search-result-clear="clearSearchResult"
                   v-on:search="search"/>

    <div v-if="isMobile && isHome" class="gradient-buttons">
      <UiCButton dont-upper-case mode="gradient" @click="">
        <span class="icon search-home"/>
        Арендодателям <br>
        Продавцам бизнеса
      </UiCButton>
      <UiCButton dont-upper-case mode="gradient" @click="">
        <span class="icon form-checked"/>
        Работа у нас
      </UiCButton>
    </div>

    <!--    cOrderCarousel-->
    <HeaderCCatalogTypes :city="city" :is-mobile="isMobile"/>

    <StoriesCStoryModal :is-open-story-modal="isOpenStoryModal" :stories="stories" :params="params"
                        v-on:viewed-stories-change="changeViewedStories"/>

    <UserCLoginOrRegistration :is-mobile="isMobile"/>
    <!--    cQRPaymentModal-->

    <BreadcrumbsCBreadcrumbs :breadcrumbs="breadcrumbs" :class='{ mobile: isMobile }'/>

    <slot/>

    <!--    cCurtainProductInPharmacies-->

    <LazyUiCUpButton v-if="isScrolled && !isMobile" :is-mobile="isMobile"/>

    <img :class='["footer-banner", "container", { mobile: isMobile }]' width="100%" height="100%" alt=""
         :src='isMobile ? params?.footerBanners.mobile : params?.footerBanners.desktop'/>
    <!--    cChatBot-->
    <LazyPopupnotifCNotifications v-if="isPopupNotifications"
                                  :params="params"
                                  :is-mobile="isMobile"/>
    <!--    place-product-price-->

    <FooterCFooter :is-mobile="isMobile" :basket-count="basketCount" :city="city" :comparison-count="comparisonCount"
                   :favorites-count="favoritesCount" :has-loyal-card="hasLoyalCard"
                   :is-authorized="isAuthorized" :is-changed-basket-availability="isChangedBasketAvailability"
                   :is-changed-basket-price="isChangedBasketPrice" :me="me"
                   :params="params"
                   v-on:notice-update="updateNotice"
                   v-on:logout="logout"/>
  </div>
</template>