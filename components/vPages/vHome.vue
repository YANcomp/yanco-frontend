<script lang="ts" setup>

const appStore = useAppStore()

const route = useRoute()
const citiesStore = useCitiesStore()
const storiesStore = useStoriesStore()
const productGroupsStore = useProductGroupsStore()
const productsStore = useProductsStore()
const basketStore = useBasketStore()
const sessionsStore = useSessionsStore()
const meStore = useMeStore()
const favoritesStore = useFavoritesStore()
const catalogStore = useCatalogStore()
const notificationsStore = useNotificationsStore()

const groupProducts = ref({})
const groupProductsCount = ref({})
const isFailedGettingViewedProducts = ref(false)
const isFailedGettingSpecialOffers = ref(false)
const isFailedGettingOurProducts = ref(false)
const isLoadingOurProducts = ref(false)
const isLoadingSpecialOffers = ref(false)
const isLoadingViewedProducts = ref(false)
const loadingBasketProductIDs = ref(<any>[])
const loadingFavoritesProductIDs = ref(<any>[])
const updatingBasketProductIDs = ref(<any>[])
const isShowProductDay = ref(true)
const placeholderItems = ref([{}, {}, {}, {}, {}, {}])
const PREPARED_PRODUCTS_FIELDS = ref(["isInBasket", "isInFavorites"])


const basketItems = computed(() => {
  return basketStore.items
})
const favoritesItems = computed(() => {
  return favoritesStore.items
})
const city = computed(() => {
  return citiesStore.currentCity
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const specialOffers = computed(() => {
  return productsStore.specialOffers
})
const ourProducts = computed(() => {
  return productsStore.ourProduction
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

const homeBrands = computed(() => {
  return params.value.homeBrands ? params.value.homeBrands : []
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const hasLoyalCard = computed(() => {
  return meStore.hasLoyalCard

})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const params: any = computed(() => {
  return <any>appStore.params
})
const stories = computed(() => {
  return storiesStore.stories
})
const productGroups = computed(() => {
  let o = productGroupsStore.groups
  return o.reduce((result: any, item: any) => {
    let d = {
      ...item,
      route: "product_of_month" === item.slug ? {
        name: "CatalogType",
        params: {
          typeID: "400221",
          typeSlug: "detskoe_pitanie"
        }
      } : "all_stock" === item.slug ? {
        name: "Stock",
        params: {
          slug: "all_stock"
        }
      } : "site_discounts" === item.slug ? {
        name: "Stock",
        params: {
          slug: "site_discounts"
        }
      } : "special_offer" === item.slug ? {
        name: "Stock",
        params: {
          slug: "special_offer"
        }
      } : {
        name: "PopularCategories",
        params: {
          popularCategory: item.slug !== undefined ? item.slug : ""
        }
      },
      name: "special_offer" === item.slug ? "Спецпредложения" : "product_of_month" === item.slug ? "Детское питание" : item.name
    }
    let i = [...params.value.stockWithCategories, "partner_cards"]
    if (!i.includes(item.slug)) {
      result.push(d)
    }
    return result
  }, [])
})
const productOfDay = computed(() => {
  return productsStore.productOfDay ? productsStore.productOfDay : {}
})

onMounted(() => {
  if (Object.keys(productOfDay.value).length < 1 && city.value !== undefined) {
    loadProductOfDay()
  }
  if (specialOffers.value.length < 1 && city.value !== undefined) {
    loadSpecialOffers()
  }
  if (ourProducts.value.length < 1 && city.value !== undefined) {
    loadOurProducts()
  }
  if (productGroups.value.length < 1) {
    loadProductGroups().catch((e: any) => {
      notificationsStore.NOTIFICATIONS_UPD({
        title: "Произошла ошибка",
        desc: e,
        status: "error"
      })
      loadProductGroups()
    })
  }

  if (stories.value.length < 1) {
    loadStories().catch((e: any) => {
      notificationsStore.NOTIFICATIONS_UPD({
        title: "Произошла ошибка",
        desc: e,
        status: "error"
      })
      loadStories()
    })
  }
})

function loadStories() {
  return storiesStore.GET()
}

function loadProductGroups() {
  return productGroupsStore.GET()
}

function loadSpecialOffers() {
  //TODO
  return productsStore.GET_SPECIAL_OFFERS()
}

function loadOurProducts() {
  //TODO
  return productsStore.GET_OUR_PRODUCTS()
}

function loadProductOfDay() {
  //TODO City props
  return productsStore.GET_PRODUCT_OF_DAY()
}

const preparedProducts = uPrepared

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

function addToFavorites(item: any) {
  let cityID = city.value.ID
  if (cityID) {
    loadingFavoritesProductIDs.value.push(item)
    favoritesStore.FAVORITES_ADD({
      itemID: item,
      cityID: cityID
    }).catch((error: any) => {
      error(error)
    }).finally(() => {
      loadingFavoritesProductIDs.value = []
    })
  }
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

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: 'http://beauty.yanco.ru' + route.path,
    },
  ],
}))
useSeoMeta({
  title: 'Cosmetic | Yanco. Поиск, наличие косметики и цены в магазинах YCosmetic.',
  description: 'Удобный поиск, низкие цены и широкий ассортимент косметики в магазинах YBeauty. ' +
      'Оформляйте интернет заказ на сайте с доставкой на дом, бронируйте и покупайте в ближайшем магазине. Телефон справочной: ' + params.value.hotlinePhone + ".",
  ogType: 'website',
  ogUrl: params.value.siteURL,
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: 'Cosmetic | Yanco. Поиск, наличие косметики и цены в магазинах YCosmetic.',
  ogDescription: 'Удобный поиск, низкие цены и широкий ассортимент косметики в магазинах YBeauty. ' +
      'Оформляйте интернет заказ на сайте с доставкой на дом, бронируйте и покупайте в ближайшем магазине. Телефон справочной: ' + params.value.hotlinePhone + "."
})
</script>

<template>
  <main :class="['v-home', {mobile: isMobile}]">
    <div v-if="homeBrands.length > 0" class="brands">
      <LazyUiCSlider v-if="homeBrands.length > 0" arrow-size="s" :is-loaded="homeBrands.length > 0"
                     :is-mobile="isMobile" :item-margin=38 :items-count="homeBrands.length">
        <NuxtLink v-for="(item) in homeBrands" :key="item.ID" class="brand" :data-tooltip="item.name"
                  :to='{ name: "Brand", params: { propertyID: item.ID, propertySlug: item.slug } }'>
          <img :src='item.image' :alt='item.name'/>
        </NuxtLink>
      </LazyUiCSlider>
    </div>

    <div class="banners">
      <CarouselCCarousel :city="city" :is-mobile="isMobile" :switch-interval="params?.carouselSwitchInterval"
                         :params="params"/>
      <div v-if="!isMobile && isShowProductDay" class="product-of-day">
        <ProductCProductCard :product="preparedProducts([productOfDay], PREPARED_PRODUCTS_FIELDS)[0]"
                             :basket-items="basketItems" :city="city" :favorites-items="favoritesItems"
                             :has-loyal-card="hasLoyalCard" :is-authorized="isAuthorized"
                             :is-basket-loading="loadingBasketProductIDs.includes(productOfDay.ID)"
                             :is-basket-updating="updatingBasketProductIDs.includes(productOfDay.ID)"
                             :is-favorites-loading="loadingFavoritesProductIDs.includes(productOfDay.ID)"
                             :product-categories="productCategories" :product-subtypes="productSubtypes"
                             :product-types="productTypes" is-product-of-the-day
                             v-on:add-to-basket="addToBasket"
                             v-on:add-to-favorites="addToFavorites"
                             v-on:basket-item-update="updateBasketItem"
                             v-on:basket-store-update="updateBasketStore"
                             v-on:favorites-store-update="updateFavoritesStore"/>
      </div>
    </div>

    <div class="stories">
      <UiCSlider :is-mobile="isMobile" :item-margin="20" :is-loaded="stories.length > 0" :items-count="stories.length">
        <StoriesCStoryCard v-for="(item,index) in stories.length > 0 ? stories : placeholderItems" :key="index"
                           :story="item"/>
      </UiCSlider>
      <div v-if="!isMobile" class="stock">
        <p>Акции</p>
        <NuxtLink v-for="(item, index) in productGroups.length > 0 ? productGroups : [{}, {}, {}, {}, {}]" :key="index"
                  :class="{ empty: void 0 === item.ID }" :to="item.route || {}">
          <template v-if='"all_stock" === item.slug'>
            <div>
              <span class="icon stock"/>
              <span>Все акции</span>
            </div>
          </template>
          <template v-else>
            <span :class='["name", { "loading-content": void 0 === item.ID }]'>{{ item.name || "" }}</span>
          </template>
          <UiCArrowSVG v-if="productGroups.length > 0" :class='"all_stock" === item.slug ? "bottom-right" : ""'
                       :hover-color='"all_stock" === item.slug ? "#ff0089" : "#4960DF"' size="s"/>
        </NuxtLink>
      </div>
    </div>

    <ProductCProductsSlider title="Спецпредложения" :route='{ name: "Stock", params: { slug: "special_offer" } }'
                            :basket-items="basketItems" :city="city" :favorites-items="favoritesItems"
                            :has-loyal-card="hasLoyalCard" :is-authorized="isAuthorized" :is-mobile="isMobile"
                            :loading-basket-product-i-ds="loadingBasketProductIDs"
                            :loading-favorites-product-i-ds="loadingFavoritesProductIDs"
                            :product-categories="productCategories" :product-subtypes="productSubtypes"
                            :product-types="productTypes"
                            :products="specialOffers.length > 0 ? preparedProducts(specialOffers, PREPARED_PRODUCTS_FIELDS) : placeholderItems"
                            :updating-basket-product-i-ds="updatingBasketProductIDs"
                            v-on:add-to-basket="addToBasket"
                            v-on:add-to-favorites="addToFavorites"
                            v-on:basket-item-update="updateBasketItem"
                            v-on:basket-store-update="updateBasketStore"
                            v-on:favorites-store-update="updateFavoritesStore"/>

    <div v-if="isMobile" class="stock">
      <NuxtLink v-for="(item, index) in productGroups.length > 0 ? productGroups : [{}, {}, {}, {}, {}]" :key="index"
                :class="{ empty: void 0 === item.ID }" :to="item.route || {}">
        <template v-if='"all_stock" === item.slug'>
          <div>
            <span class="icon stock"/>
            <span>Все акции</span>
          </div>
          <span class="icon arrow-bottom"/>
        </template>
        <template v-else>
          <span :class='["name", { "loading-content": void 0 === item.ID }]'>{{ item.name || "" }}</span>
          <span class="icon arrow-right2"/>
        </template>
      </NuxtLink>
    </div>

    <CatalogCPopularCategories :city="city"/>

    <ProductCProductsSlider title="Обратите внимание"
                            :route='{ name: "PopularCategories", params: { popularCategory: "our_products" } }'
                            :basket-items="basketItems" :city="city" :favorites-items="favoritesItems"
                            :has-loyal-card="hasLoyalCard" :is-authorized="isAuthorized" :is-mobile="isMobile"
                            :loading-basket-product-i-ds="loadingBasketProductIDs"
                            :loading-favorites-product-i-ds="loadingFavoritesProductIDs"
                            :product-categories="productCategories" :product-subtypes="productSubtypes"
                            :product-types="productTypes"
                            :products="ourProducts.length > 0 ? preparedProducts(ourProducts, PREPARED_PRODUCTS_FIELDS) : placeholderItems"
                            :updating-basket-product-i-ds="updatingBasketProductIDs"
                            v-on:add-to-basket="addToBasket"
                            v-on:add-to-favorites="addToFavorites"
                            v-on:basket-item-update="updateBasketItem"
                            v-on:basket-store-update="updateBasketStore"
                            v-on:favorites-store-update="updateFavoritesStore"/>

    <LazyUiCPharmacyChainAdvantages v-if="!isMobile" :pharmacies-count="7500" :regions-count="70"/>
  </main>
</template>

<style>
.v-home {
  max-width: 1368px;
  width: 100%;
  margin: auto;
  box-sizing: border-box
}

.v-home > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 20px
}

.v-home > .brands {
  margin-bottom: 20px
}

.v-home > .brands > .c-slider {
  margin-bottom: 0
}

.v-home > .brands > .c-slider > .carousel > .list > .brand {
  height: 60px;
  width: 163px;
  display: flex;
  justify-content: center
}

.v-home > .brands > .c-slider > .carousel > .list > .brand:not(:last-of-type) {
  margin-right: 38px
}

.v-home > .brands > .c-slider > .carousel > .list > .brand > img {
  height: 100%
}

.v-home > .banners {
  display: flex;
  max-width: 1600px;
  margin: 0 auto 20px;
  height: 340px
}

.v-home > .banners > .product-of-day {
  min-width: 228px;
  margin-left: 18px
}

.v-home > .stories {
  display: flex;
  max-width: 1600px;
  margin: 0 auto 20px
}

.v-home > .stories .savings-on-card {
  height: 220px;
  min-width: 162px;
  max-width: 162px;
  border-radius: 5px;
  background: linear-gradient(145deg, #ff0089, #ff85f7, #3f51b5) 0 50%/300% 100%;
  padding: 4px;
  position: relative;
  color: #fff;
  transition: background .3s ease-in-out;
  margin-left: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-home > .stories .savings-on-card > div {
  background: #fff;
  height: 222px;
  margin: -2px;
  border-radius: 5px;
  padding: 2px 2px 0;
  position: relative
}

.v-home > .stories .savings-on-card > div > div {
  background-color: #ff0089;
  height: calc(100% - 2px);
  border-radius: 5px;
  position: relative;
  overflow: hidden
}

.v-home > .stories .savings-on-card > div > div > img {
  background: linear-gradient(180deg, #ffc5e4, #dfe4ff)
}

.v-home > .stories .savings-on-card > div > div > div {
  background-color: #ff0089;
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  height: 165px;
  width: 214px;
  top: 68px;
  left: -26px
}

.v-home > .stories .savings-on-card > div > div > div > p {
  font-weight: 700;
  line-height: 17px;
  margin-left: 37px;
  margin-top: 40px;
  max-width: 139px
}

.v-home > .stories .savings-on-card > div > div > div > p > span {
  font-weight: 700;
  font-size: 26px;
  line-height: 41px;
  letter-spacing: .115em;
  margin-top: 3px;
  display: block
}

.v-home > .stories .savings-on-card > div > div > div > p > span.s {
  font-size: 22px;
  letter-spacing: 0
}

.v-home > .stories .savings-on-card > div > div > div > p > span.xs {
  font-size: 18px
}

.v-home > .stories .savings-on-card:hover {
  cursor: pointer;
  background-position: 100% 50% !important
}

.v-home > .stories > .c-slider {
  margin-bottom: unset;
  width: 100%
}

.v-home > .stories > .c-slider > .carousel > .list > .savings-on-card {
  height: 200px;
  min-width: 148px;
  max-width: 148px;
  margin-right: 10px;
  margin-left: 0
}

.v-home > .stories > .c-slider > .carousel > .list > .savings-on-card > div {
  height: 202px
}

.v-home > .stories > .c-slider > .carousel > .list > .savings-on-card > div > div > div {
  height: 175px;
  width: 208px;
  top: 71px;
  left: -30px
}

.v-home > .stories > .c-slider > .carousel > .list > .savings-on-card > div > div > div > p {
  margin-right: 38px;
  margin-left: 38px;
  margin-top: 30px;
  max-width: 132px;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px
}

.v-home > .stories > .c-slider > .carousel > .list > .savings-on-card > div > div > div > p > span {
  margin-top: 6px;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px
}

.v-home > .stories > .c-slider > .carousel > .list > .savings-on-card > div > div > div > p > span.s {
  font-size: 20px
}

.v-home > .stories > .c-slider > .carousel > .list > .savings-on-card > div > div > div > p > span.xs {
  font-size: 16px
}

.v-home > .stories > .stock {
  height: 228px;
  min-width: 228px;
  max-width: 228px;
  margin-left: 20px
}

.v-home > .stories > .stock .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-home > .stories > .stock > p {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 33px;
  padding: 0 10px;
  line-height: 22px;
  margin-top: 5px
}

.v-home > .stories > .stock > a {
  color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  margin: 8px 0 8px 10px;
  align-items: center
}

.v-home > .stories > .stock > a.empty {
  max-width: 218px;
  max-height: 24px;
  width: 100%;
  height: 100%;
  pointer-events: none
}

.v-home > .stories > .stock > a.empty:last-of-type {
  margin-left: 10px
}

.v-home > .stories > .stock > a.empty > .name {
  background-color: #ebf0f9;
  height: 100%;
  width: 100%
}

.v-home > .stories > .stock > a:last-of-type {
  margin-left: 5px
}

.v-home > .stories > .stock > a > span:first-of-type {
  font-weight: 600;
  font-size: 13px;
  line-height: 16px
}

.v-home > .stories > .stock > a > .icon {
  background-color: #1a1a1a
}

.v-home > .stories > .stock > a > div {
  display: flex;
  align-items: center
}

.v-home > .stories > .stock > a > div > .icon {
  margin-right: 5px
}

.v-home > .stories > .stock > a > div > span:last-of-type {
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .065em;
  text-transform: uppercase;
  color: #ff0089
}

.v-home > .stories > .stock > a:hover {
  color: #4960df
}

.v-home > .stories > .stock > a:hover > .c-arrow-svg > div > span {
  background-color: #4960df
}

.v-home > .stories > .stock > a:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-home > .stories > .stock > a:hover > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.v-home > .stories > .stock > a:hover:last-of-type > .c-arrow-svg > div > span {
  background-color: #ff0089
}

.v-home > .stories > .stock > a:hover > div > .icon {
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMTQuNUMxIDE4IDQgMjEgOC41IDIxczgtMy41IDgtOC41UzEyLjUgMiA1LjUgMUM2LjMzMyAyIDcgNSA1IDcuNXMtNCAzLjUtNCA3eiIgc3Ryb2tlPSIjMUUxRTFFIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTExLjUgMTcuODg5YzAgMS43NzgtMS4zNDMgMy4xMTEtMyAzLjExMXMtMy0xLjMzMy0zLTMuMTExYzAtMS43ODggMS45NjUtMy41NTYgMi43MTQtNC4xNjZhLjQ1LjQ1IDAgMDEuNTcyIDBjLjc1LjYxIDIuNzE0IDIuMzc4IDIuNzE0IDQuMTY2eiIgc3Ryb2tlPSIjRkYwMDg5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMTQuNUMxIDE4IDQgMjEgOC41IDIxczgtMy41IDgtOC41UzEyLjUgMiA1LjUgMUM2LjMzMyAyIDcgNSA1IDcuNXMtNCAzLjUtNCA3eiIgc3Ryb2tlPSIjMUUxRTFFIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTExLjUgMTcuODg5YzAgMS43NzgtMS4zNDMgMy4xMTEtMyAzLjExMXMtMy0xLjMzMy0zLTMuMTExYzAtMS43ODggMS45NjUtMy41NTYgMi43MTQtNC4xNjZhLjQ1LjQ1IDAgMDEuNTcyIDBjLjc1LjYxIDIuNzE0IDIuMzc4IDIuNzE0IDQuMTY2eiIgc3Ryb2tlPSIjRkYwMDg5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+");
  background-color: #ff0089;
  background-image: none
}

.v-home > .stock {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #ffeaf7;
  border-radius: 5px
}

.v-home > .stock .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-home > .stock > a {
  color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  border-bottom: 1px solid #d6d6e1
}

.v-home > .stock > a.empty {
  height: 41px;
  width: 100%;
  pointer-events: none
}

.v-home > .stock > a:last-of-type {
  border: none
}

.v-home > .stock > a > span:first-of-type {
  font-weight: 500;
  font-size: 14px
}

.v-home > .stock > a > .icon {
  background-color: #818ca9
}

.v-home > .stock > a > div {
  display: flex;
  align-items: center
}

.v-home > .stock > a > div > .icon {
  margin-right: 3px;
  background-size: 55%;
  margin-bottom: 2px
}

.v-home > .stock > a > div > span:last-of-type {
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .065em;
  text-transform: uppercase
}

.v-home > .info {
  text-align: center;
  margin-bottom: 10px
}

.v-home.mobile > .brands {
  padding-left: 10px;
  margin-bottom: 10px
}

.v-home.mobile > .brands > .c-slider > .carousel > .list > .brand {
  height: 36px;
  width: 98px
}

.v-home.mobile > .brands > .c-slider > .carousel > .list > .brand:not(:last-of-type) {
  margin-right: 6px
}

.v-home.mobile > .banners {
  padding: 0;
  height: auto;
  margin-bottom: 10px
}

.v-home.mobile > .stories {
  padding: 0 10px;
  max-width: unset;
  display: block
}

.v-home.mobile > .stories > .c-slider {
  width: unset
}

.v-home.mobile > .stories > .c-slider > div > div {
  overflow-y: hidden
}

@media screen and (max-width: 1367px) {
  .v-home {
    padding: 0 20px
  }

  .v-home.mobile {
    padding: 0
  }
}

@media screen and (max-width: 1122px) {
  .v-home > .banners {
    height: auto
  }
}

</style>