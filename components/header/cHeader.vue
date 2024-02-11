<script lang="ts" setup>
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
    type: Number
  },
  city: {
    type: Object
  },
  comparisonCount: {
    type: Number
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

const isOpenSearchResult = ref(false)
const startScrollY = ref(0)

const headerRef = ref(<any>{})
const topRef = ref(<any>{})

const isPageScrolled = computed(() => {
  return startScrollY.value > 0
})

function openLoginModal() {
  new RegExp(["account", "checkout", "login-or-registration"].join("|"), "i").test(route.name ? <string>route.name : "") || useEvent("open-login-or-registration")
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}
</script>

<template>
  <header ref="headerRef"
          :class='["c-header", { "open-result": isOpenSearchResult, mobile: isMobile, fixed: isOpenSearchResult && isMobile, "page-scrolled": isPageScrolled }]'>
    <!--   TODO ? cMobileAppLink-->
    <div class="container">
      <section ref="topRef" class="top">
        <NuxtLink to="/">
          <div class="logo" @click="scrollToTop"/>
        </NuxtLink>
        <div v-if="!isMobile">cCatalog</div>
        <HeaderCSearch :is-mobile="isMobile"/>
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
              <span>Войти</span>
            </div>
          </div>
          <div v-show="isAuthorized" class="profile dropdown-menu">
            <NuxtLink :to="{name: 'account-card'}">
              <span class="icon user"/>
              <span>Профиль</span>
            </NuxtLink>
            <!--            cProfileMenu-->
          </div>
          <div class="compare dropdown-menu">
            <NuxtLink :to="{name: 'compare'}">
              <span class="icon compare"/>
              <span>Сравнение</span>
            </NuxtLink>
            <!--            cCompareMenu-->
          </div>
          <div class="favorites dropdown-menu">
            <NuxtLink :to="{name: 'favorites'}">
              <span class="icon favorites"/>
              <span>Избранное</span>
            </NuxtLink>
            <!--            cFavoritesMenu-->
          </div>
          <div class="basket dropdown-menu">
            <!--            TODO openBasket @click-->
            <div class="basket" @click="">
              <span class="icon basket"/>
              <span>Корзина</span>
            </div>
            <!--            cBasketMenu-->
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
    padding: 7px 0 7px
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