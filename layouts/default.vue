<script setup lang="ts">
//TODO STORE
const appStore = useAppStore()
const catalogStore = useCatalogStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const comparisonStore = useComparisonProductsStore()
const meStore = useMeStore()
const citiesStore = useCitiesStore()
const regionsStore = useRegionsStore()
const route = useRoute()
const notificationsStore = useNotificationsStore()

//TODO END STORE


//TODO MIDDLEWARE
//....
//TODO END MIDDLEWARE

//TODO HOOKS
const device = useDevice();
appStore.MOBILE_UPD(device.isMobile)
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
const loadingBasketProductIDs = ref([])
const updatingBasketProductIDs = ref([])
const isOpenBarcode = ref(false)
const isFirstLoadNotCity = ref(false)
const isNoDeliveryRules = ref(false)
//TODO END DATA

//TODO COMPUTED
const isAllRankItems = computed(() => {
  return basketItems.value.every((product: any) => {
    return product.price.withPeriod !== product.price.withoutCard && product.price.withPeriod !== product.price.withCard
  })
})
const city = computed(() => {
  return citiesStore.currentCity
})
const isAllowDelivery = computed(() => {
  return basketItems.value.every((i: any) => {
    return i.allowDelivery
  })
})
const isDeniedDelivery = computed(() => {
  // return !(city.value ? city.value.allowDelivery : undefined)
  //TODO
  return false
})
const hasFreeDelivery = computed(() => {
  return amountForFreeShipping.value <= 0 && 0 === deliveryCost.value && void 0 !== params.value.deliveryRules
})
const amountForFreeShipping = computed(() => {
  return getAmountForFreeShipping(basketItems.value)
})
const deliveryCost = computed(() => {
  return 0
  //TODO
  // return null !== (n = null !== (e = null === (t = this.check.order) || void 0 === t ? void 0 : t.deliveryCost) && void 0 !== e ? e : this.params.deliveryCost) && void 0 !== n ? n : 0
})
const basketCount = computed(() => {
  return basketStore.basketCount
})
const basketItems = computed(() => {
  return basketStore.items !== undefined ? basketStore.items : []
})
const isBasketConflict = computed(() => {
  return basketStore.isBasketConflict
})
const favoritesCount = computed(() => {
  return favoritesStore.favoritesCount
})
const params = computed(() => {
  return appStore.params
})
const isAuthorized = computed(() => {
  //TODO             return this.$store.getters["sessions/isAuthorized"]
  return false
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
  return hasLoyalCard && hasPaidPeriod || hasPromoCode ? possiblePrices.withPeriod : hasLoyalCard ? possiblePrices.withCard : possiblePrices.withoutCard
})
const preparedCheckItems = computed(() => {
  return getPreparedCheckItems()
})

//TODO END COMPUTED

//TODO MOUNTED
onMounted(() => {
  window.addEventListener("scroll", checkScroll)

  let time = (new Date).getTime();
  isPopupNotifications.value = (time >= Number(localStorage.getItem("noticePrice"))) || (time >= Number(localStorage.getItem("noticeCookie")))
})
//TODO END MOUNTED

const notBasket = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "basket"})
}
const notFavorites = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "favorites"})
}
const notCompare = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "compare"})
}
const notCompareLimit = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "compare-limited"})
}
const openLogin = () => {
  useEvent("open-login-or-registration", "login")
}

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

function getPossiblePrices(basket: any) {
  return uPossiblePrices(basket)
}

function getAmountForFreeShipping(basket: any) {
  // TODO return uPossiblePrices(basket)
  return 1000
}

function getPreparedCheckItems() {
  return uPreparedCheckItems([], [])
}

function addToBasket(t: any, e: any) {
  return
  // TODO return uPreparedCheckItems
}

function updateBasketItem(item: any) {
  addToBasket(item, true)
}

function updateBasketStore(item: any) {
  basketStore.BASKET_UPD(item)
}

function getComparisonProducts() {
  //TODO
  return []
}

function logout() {
  //TODO
  return
}

function search() {
  //TODO
  return
}

function clearSearchResult() {
  searchResult.value = {}
}

//TODO END METHODS
</script>

<template>
  <div id="app">
    <LazyUiCSpinner v-if="isLoading"/>
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
    <!--    cStoryModal-->
    <UserCLoginOrRegistration :is-mobile="isMobile"/>
    <!--    cQRPaymentModal-->
    <!--    cBreadcrumbs-->
    <!--    cCurtainProductInPharmacies-->
    <slot/>

    <LazyUiCUpButton v-if="isScrolled && !isMobile" :is-mobile="isMobile"/>

    <img :class='["footer-banner", "container", { mobile: isMobile }]' width="100%" height="100%" alt=""
         :src='isMobile ? params?.footerBanners.mobile : params?.footerBanners.desktop'/>
    <!--    cChatBot-->
    <LazyPopupnotifCNotifications v-if="isPopupNotifications"
                                  :params="params"
                                  :is-mobile="isMobile"/>
    <!--    place-product-price-->

    <!--    TODO favorites pharmacies count-->
    <FooterCFooter :is-mobile="isMobile" :basket-count="basketCount" :city="city" :comparison-count="comparisonCount"
                   :favorites-count="favoritesCount" :favorites-pharmacies-count="0" :has-loyal-card="hasLoyalCard"
                   :is-authorized="isAuthorized" :is-changed-basket-availability="isChangedBasketAvailability"
                   :is-changed-basket-price="isChangedBasketPrice" :me="me"
                   :params="params"
                   v-on:notice-update="updateNotice"
                   v-on:logout="logout"/>
  </div>
</template>