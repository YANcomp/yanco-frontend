<script lang="ts" setup>
const emit = defineEmits([
  "add-to-basket", "basket-item-update", "basket-store-update",
  "search-result-clear", "comparison-products-get", "logout", "search"
])

const props = defineProps({
  isAllRankItems: {
    type: Boolean,
    default: false
  },
  hasFreeDelivery: {
    type: Boolean,
    default: false
  },
  isAllowDelivery: {
    type: Boolean,
    default: false
  },
  isDeniedDelivery: {
    type: Boolean,
    default: false
  },
  isNoDeliveryRules: {
    type: Boolean,
    default: false
  },
  basketItems: {
    type: Array
  },
  basketCount: {
    type: Number,
    default: 0
  },
  city: {
    type: Object
  },
  comparisonCount: {
    type: Number,
    default: 0
  },
  comparisonProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  comparisonProducts: {
    type: Array,
    default: function () {
      return []
    }
  },
  deliveryCost: {
    type: Number,
    default: 0
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  searchResult: {
    type: Object
  },
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  hasPaidPeriod: {
    type: Boolean,
    default: false
  },
  hasPromoCode: {
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  loadingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  me: {
    type: Object
  },
  params: {
    type: Object
  },
  possiblePrices: {
    type: Object
  },
  preparedCheckItems: {
    type: Object
  },
  routeName: {
    type: String
  },
  routeParams: {
    type: Object
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  updatingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  }
})

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const catalogStore = useCatalogStore()

const isOpenSearchResult = ref(false)
const startScrollY = ref(0)

//HTML ref
const headerRef = ref(<any>{})
const topRef = ref(<any>{})

//COMPUTED
const isPageScrolled = computed(() => {
  return startScrollY.value > 0
})
const hasFavoritesItems = computed(() => {
  return props.favoritesCount > 0
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const hasBasketItems = computed(() => {
  return props.basketCount > 0
})
const hasComparison = computed(() => {
  return props.comparisonCount > 0
})
const productCategories = computed(() => {
  return catalog.value.categories !== undefined ? catalog.value.categories : []
})

const isShowDiscountNotice = computed(() => {
  return appStore.isShowDiscountNotice
})

//WATCH
watch(
    () => props.comparisonProductIDs,
    () => {
      getComparisonProducts()
    },
);
watch(
    () => props.isMobile,
    (value) => {
      if (value) {
        addListeners()
      } else {
        document.removeEventListener("scroll", checkScroll)
        document.removeEventListener("touchstart", touch)
        document.removeEventListener("touchend", touch)
        document.removeEventListener("mousemove", touch)
        document.removeEventListener("mouseup", touch)
      }
    },
);

onMounted(() => {
  if (props.isMobile) {
    addListeners()
  }
})

//METHODS
function openBasket() {
  if (route.name !== "basket") {
    router.push({
      name: "basket"
    })
  }
}

function addListeners() {
  document.addEventListener("scroll", checkScroll)
  document.addEventListener("touchstart", touch)
  document.addEventListener("touchend", touch)
  document.addEventListener("mousemove", touch)
  document.addEventListener("mouseup", touch)
}

function touch() {
  startScrollY.value = window.scrollY
}

function checkScroll() {
  let header = headerRef.value
  window.scrollY <= 50 || window.scrollY > startScrollY.value ? header.style.top = "-95px" : window.scrollY < 10 ? header.style.top = "0" : header.style.top = "-37px"
}

function openLoginModal() {
  new RegExp(["account", "checkout", "login-or-registration"].join("|"), "i").test(route.name ? <string>route.name : "") || useEvent("open-login-or-registration")
}

function addToBasket(val: any) {
  emit("add-to-basket", val)
}

function updateBasketItem(val: any) {
  emit("basket-item-update", val)
}

function updateBasketStore(val: any) {
  emit("basket-store-update", val)
}

function clearSearchResult() {
  emit("search-result-clear")
}

function openSearchResult(val: any) {
  isOpenSearchResult.value = val
}

function getComparisonProducts() {
  emit("comparison-products-get")
}

function logout() {
  emit("logout")
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}

function search(filter: any) {
  emit("search", filter)
}
</script>

<template>
  <header ref="headerRef"
          :class='["c-header", { "open-result": isOpenSearchResult, mobile: isMobile, fixed: isOpenSearchResult && isMobile, "page-scrolled": isPageScrolled }]'>
    <div class="container">
      <section ref="topRef" class="top">
        <NuxtLink to="/">
          <div class="logo" @click="scrollToTop"/>
        </NuxtLink>

        <LazyHeaderCCatalog v-if="!isMobile"/>

        <HeaderCSearch :advertising-links="props.params?.advertisingLinksForSearch"
                       :cdn-url="props.params?.cdnURL.url"
                       :loading-basket-product-i-ds="loadingBasketProductIDs"
                       :updating-basket-product-i-ds="updatingBasketProductIDs"
                       :basket-items="basketItems"
                       :city="city"
                       :is-mobile="isMobile"
                       :is-authorized="isAuthorized"
                       :search-result="searchResult"
                       :route-params="routeParams"
                       :has-loyal-card="hasLoyalCard"
                       :is-page-scrolled="isPageScrolled"
                       v-on:search-result-clear="clearSearchResult"
                       v-on:search-result-open="openSearchResult"
                       v-on:search="search"
                       v-on:add-to-basket="addToBasket"
                       v-on:basket-item-update="updateBasketItem"
                       v-on:basket-store-update="updateBasketStore"/>

        <div v-if="!isMobile" class="menu-items">
          <div class="pharmacies">
            <NuxtLink :to="{name: 'pharmacies'}">
              <span class="icon logo-header-menu"/>
              <span>Адреса магазинов</span>
            </NuxtLink>
          </div>
          <div v-show="!isAuthorized" class="login">
            <div class="login" @click="openLoginModal">
              <span class="icon user"/>
              <LazyUiCBadge v-if="!isAuthorized && isShowDiscountNotice" :count="1"/>
              <span>Войти</span>
            </div>
          </div>
          <div v-show="isAuthorized" class="profile dropdown-menu">
            <NuxtLink :to="{name: 'account-card'}">
              <span class="icon user"/>
              <span>Профиль</span>
            </NuxtLink>
            <LazyHeaderCProfileMenu v-if="isAuthorized" class="profile-dropdown-menu" :me="me" :params="params"
                                    :route-name="routeName"/>
          </div>
          <div class="compare dropdown-menu">
            <NuxtLink :to="{name: 'compare'}">
              <span class="icon compare"/>
              <LazyUiCBadge v-if="hasComparison" :count="comparisonCount"/>
              <span>Сравнение</span>
            </NuxtLink>
            <LazyHeaderCCompareMenu v-if="hasComparison" class="compare-dropdown-menu" :params="params"
                                    :comparison-product-i-ds="comparisonProductIDs"
                                    :comparison-products="comparisonProducts"
                                    :product-categories="productCategories"/>
          </div>
          <div class="favorites dropdown-menu">
            <NuxtLink :to="{name: 'favorites'}">
              <span class="icon favorites"/>
              <LazyUiCBadge v-if="hasFavoritesItems" :count="favoritesCount"/>
              <span>Избранное</span>
            </NuxtLink>
            <LazyHeaderCFavoritesMenu v-if="hasFavoritesItems" class="favorites-dropdown-menu" :params="params"
                                      :loading-basket-product-i-ds="loadingBasketProductIDs" :basket-items="basketItems"
                                      :is-authorized="isAuthorized" :is-mobile="isMobile"
                                      v-on:add-to-basket="addToBasket"
                                      v-on:basket-store-update="updateBasketStore"/>
          </div>
          <div class="basket dropdown-menu">
            <div class="basket" @click="openBasket">
              <span class="icon basket"/>
              <LazyUiCBadge v-if="hasBasketItems" :count="basketCount"/>
              <span>Корзина</span>
            </div>
            <LazyHeaderCBasketMenu v-if="hasBasketItems" class="basket-dropdown-menu" :params="params" :city="city"
                                   :is-all-rank-items="isAllRankItems" :has-free-delivery="hasFreeDelivery"
                                   :is-allow-delivery="isAllowDelivery" :is-denied-delivery="isDeniedDelivery"
                                   :is-no-delivery-rules="isNoDeliveryRules" :basket-items="basketItems"
                                   :has-paid-period="hasPaidPeriod" :has-promo-code="hasPromoCode"
                                   :is-authorized="isAuthorized" :possible-prices="possiblePrices"
                                   :prepared-check-items="preparedCheckItems" :total-price="totalPrice"
                                   v-on:basket-item-update="updateBasketItem"
                                   v-on:basket-store-update="updateBasketStore"/>
          </div>
        </div>
      </section>
    </div>
  </header>
</template>

<style scoped>
.c-header {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 999;
  position: sticky;
  top: 0;
  padding-bottom: 10px
}

.c-header.open-result {
  z-index: 9999
}

.c-header.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff
}

.c-header > .container {
  padding: 0
}

.c-header > .container > .top {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center
}

.c-header > .container > .top > a {
  flex-basis: 190px;
  flex-shrink: 0;
  max-height: 40px
}

.c-header > .container > .top > a > .logo {
  height: 40px;
  width: 170px;
  margin-right: 20px
}

.c-header > .container > .top > a > .logo:active {
  margin-top: 1px
}

.c-header > .container > .top > .menu-items {
  display: flex;
  align-items: center;
  flex-shrink: 0
}

.c-header > .container > .top > .menu-items > div {
  position: relative;
  margin-right: 19px
}

.c-header > .container > .top > .menu-items > div:last-of-type {
  margin-right: 0
}

.c-header > .container > .top > .menu-items > div > .basket, .c-header > .container > .top > .menu-items > div > .login, .c-header > .container > .top > .menu-items > div > a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1a1a1a;
  font-size: 11px;
  transition: .2s;
  font-weight: 500;
  line-height: 13px
}

.c-header > .container > .top > .menu-items > div > .basket > .icon, .c-header > .container > .top > .menu-items > div > .login > .icon, .c-header > .container > .top > .menu-items > div > a > .icon {
  height: 24px;
  width: 24px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  margin-bottom: 3px;
  background-color: #1a1a1a
}

.c-header > .container > .top > .menu-items > div > .basket > .icon.logo-header-menu, .c-header > .container > .top > .menu-items > div > .login > .icon.logo-header-menu, .c-header > .container > .top > .menu-items > div > a > .icon.logo-header-menu {
  transition: all .3s ease-in-out;
  background-color: #ff0089
}

.c-header > .container > .top > .menu-items > div > .basket:hover, .c-header > .container > .top > .menu-items > div > .login:hover, .c-header > .container > .top > .menu-items > div > a:hover {
  opacity: .7;
  cursor: pointer
}

.c-header > .container > .top > .menu-items > div > .basket > .c-badge, .c-header > .container > .top > .menu-items > div > .login > .c-badge, .c-header > .container > .top > .menu-items > div > a > .c-badge {
  top: 1px;
  font-size: 9px;
  padding: 0;
  line-height: unset
}

.c-header > .container > .top > .menu-items > .dropdown-menu:hover > div:not(.basket) {
  opacity: 1;
  visibility: visible;
  pointer-events: unset
}

.c-header > .container > .top > .menu-items > .dropdown-menu > div:not(.basket) {
  opacity: 0;
  visibility: hidden;
  transition: all .25s ease-in-out;
  pointer-events: none
}

.c-header > .container > .top > .menu-items > .compare > a > .c-badge, .c-header > .container > .top > .menu-items > .favorites > a > .c-badge {
  right: 16px
}

.c-header > .container > .top > .menu-items > .basket > .basket > .c-badge {
  right: 7px
}

.c-header.mobile {
  padding-bottom: 0;
  position: static;
  z-index: 998
}

.c-header.mobile.open-result {
  background-image: unset;
  top: 0 !important
}

.c-header.mobile.open-result > .c-mobile-app-link {
  display: none
}

.c-header.mobile.open-result > .container > .top {
  top: 0
}

.c-header.mobile > .c-mobile-app-link {
  background-color: unset
}

.c-header.mobile > .container > .top {
  flex-flow: row;
  z-index: 2;
  background-color: #fff
}

.c-header.mobile > .container > .top > a {
  margin: 0 0 0 10px
}

.c-header.mobile > .container > .top > a > .logo {
  width: 40px
}

@media screen and (max-width: 1367px) {
  .c-header:not(.mobile) > .container {
    padding: 0 20px
  }
}

@media screen and (max-width: 1100px) {
  .c-header > .container > .top > a {
    flex-basis: 50px
  }

  .c-header > .container > .top > a > .logo {
    width: 41px;
    margin-right: 10px;
    background-size: 165px;
    background-position-x: 0
  }
}

@media screen and (max-width: 850px) {
  .c-header > .container {
    padding: 0
  }

  .c-header > .container > .top {
    margin-top: 0;
    height: inherit;
    flex-direction: column;
    box-shadow: 1px 2px 10px rgba(12, 7, 38, .1);
    border-radius: 0 0 15px 15px;
    align-items: inherit;
    position: relative;
    top: 0;
    transition: .2s;
    padding: 11px 0 6px
  }

  .c-header > .container > .top > a {
    margin: 0 auto 10px;
    flex-basis: inherit;
    flex-shrink: 0
  }

  .c-header > .container > .top > a > .logo {
    height: 40px;
    width: 170px;
    margin-right: 0;
    background-size: auto
  }

  .c-header > .container > .top > a > .logo:active {
    margin-top: 1px
  }

  .c-header > .container > .top > .menu-items {
    display: none
  }

  .c-header.open-result > .container > .top {
    top: -46px;
    box-shadow: none;
    padding-top: 10px !important;
    background-color: #fff
  }

  .c-header.open-result > .container > .top > a {
    margin-left: 0
  }

  .c-header.open-result > .container > .top > a > .logo {
    display: none
  }

  .c-header.open-result.page-scrolled > .container > .top {
    top: 0
  }
}
</style>