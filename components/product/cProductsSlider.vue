<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String
  },
  route: {
    type: Object
  },
  basketItems: {
    type: Array,
    default: function () {
      return []
    }
  },
  city: {
    type: Object
  },
  favoritesItems: {
    type: Array,
    default: function () {
      return []
    }
  },
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean,
    default: false
  },
  isInBasket: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  isChangeCounter: {
    type: Boolean,
    default: false
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
  productCategories: {
    type: Array,
    default: function () {
      return []
    }
  },
  products: {
    type: Array,
    default: function () {
      return []
    }
  },
  productSubtypes: {
    type: Array,
    default: function () {
      return []
    }
  },
  productTypes: {
    type: Array,
    default: function () {
      return []
    }
  },
  updatingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  isWidthForPhone: {
    type: Boolean,
    default: false
  },
  isShowBannerYouMayNeed: {
    type: Boolean,
    default: false
  },
  bannerYouMayNeed: {
    type: Object
  },
  noMicrodataNeeded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["add-to-basket", "add-to-favorites", "basket-item-update", "basket-store-update", "favorites-store-update"])

function addToBasket(t: any) {
  emit("add-to-basket", t)
}

function addToFavorites(t: any) {
  emit("add-to-favorites", t)
}

function updateBasketItem(t: any) {
  emit("basket-item-update", t)
}

function updateBasketStore(t: any) {
  emit("basket-store-update", t)
}

function updateFavoritesStore(t: any) {
  emit("favorites-store-update", t)
}
</script>

<template>
  <div :class='["c-products-slider", { mobile: isMobile }]'>
    <div class="top">
      <p>{{ title }}</p>
      <NuxtLink v-if="void 0 !== route" class="hover-bottom-line" :to="route">
        Все
      </NuxtLink>
    </div>
    <UiCSlider :is-mobile="isMobile" :item-margin="20" :is-loaded="products.length > 0" :items-count="products.length">
      <div v-if="isShowBannerYouMayNeed && void 0 !== bannerYouMayNeed">
        cBannerCard
      </div>
      <ProductCProductCard v-for="(item, index) in products" :key="index" :basket-items="basketItems" :city="city"
                           :favorites-items="favoritesItems" :has-loyal-card="hasLoyalCard"
                           :is-authorized="isAuthorized" :is-basket="isInBasket"
                           :is-basket-loading="loadingBasketProductIDs.includes(item.ID)"
                           :is-basket-updating="updatingBasketProductIDs.includes(item.ID)"
                           :is-favorites-loading="loadingFavoritesProductIDs.includes(item.ID)"
                           :is-change-counter="isChangeCounter" :product-categories="productCategories"
                           :product-subtypes="productSubtypes" :product-types="productTypes" :product="item"
                           :index="index" :is-width-for-phone="isWidthForPhone"
                           :no-microdata-needed="noMicrodataNeeded" size="m" v-on:add-to-basket="addToBasket"
                           v-on:add-to-favorites="addToFavorites" v-on:basket-item-update="updateBasketItem"
                           v-on:basket-store-update="updateBasketStore"
                           v-on:favorites-store-update="updateFavoritesStore"/>
    </UiCSlider>
  </div>
</template>

<style scoped>
.c-products-slider > .top {
  display: flex;
  justify-content: space-between;
  font-family: Montserrat, sans-serif;
  max-width: 1600px;
  margin: auto;
  align-items: center
}

.c-products-slider > .top > p {
  margin: 0;
  font-weight: 600;
  font-size: 28px
}

.c-products-slider > .top > a {
  font-size: 18px;
  color: #3f51b5;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content
}

.c-products-slider > :deep(.c-slider) > .c-arrow-svg {
  margin-top: -30px !important
}

.c-products-slider.mobile {
  padding: 0 10px
}

.c-products-slider.mobile > .top > p {
  font-size: 20px
}

.c-products-slider.mobile > .top > a {
  font-size: 15px
}
</style>