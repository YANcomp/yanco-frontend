<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object,
    required: !0
  },
  hasProduct: {
    type: Boolean,
    required: !0
  },
  isInBasket: {
    type: Boolean,
    required: !0
  },
  basketItems: {
    type: Array,
    required: !0
  },
  hasLoyalCard: {
    type: Boolean,
    required: !0
  },
  isAuthorized: {
    type: Boolean,
    required: !0
  },
  isBasketUpdating: {
    type: Boolean,
    required: !0
  },
  isMobile: {
    type: Boolean,
    required: !0
  },
  isLoading: {
    type: Boolean,
    required: !0
  }
})
const emit = defineEmits(["basket-item-update", "basket-store-update", "is-max", "add-to-basket"])

function updateBasketItem(t: any) {
  emit("basket-item-update", t)
}

function updateBasketStore(t: any) {
  emit("basket-store-update", t)
}

function updateIsMax(t: any, e: any) {
  emit("is-max", t, e)
}

function addToBasket() {
  emit("add-to-basket", {
    productID: props.product.ID,
    count: 1
  }, !1)
}
</script>

<template>
  <div :class='["с-button-basket", { mobile: isMobile }]'>
    <UiCButton v-if="!product.isAvailable && hasProduct" mode="disabled">
      {{ product.isWaitingArrive ? "Ожидается" : "Временно отсутствует" }}
    </UiCButton>
    <template v-if="isInBasket">
      <BasketCBasketProduct :basket-items="basketItems" :has-loyal-card="hasLoyalCard"
                            :is-authorized="isAuthorized" :is-basket-updating="isBasketUpdating" :is-mobile="isMobile"
                            :product-i-d="product.ID" v-on:basket-item-update="updateBasketItem"
                            v-on:basket-store-update="updateBasketStore" v-on:is-max="updateIsMax"/>
    </template>
    <template v-else-if="product.isAvailable">
      <UiCButton :is-loading="isLoading" mode="primary" @click="addToBasket">
        <span v-if="!isLoading" class="icon add-basket"/>
        <span>{{ isMobile ? "в корзину" : "Добавить в корзину" }}</span>
      </UiCButton>
    </template>
  </div>
</template>

<style scoped>
.с-button-basket {
  height: 48px;
  flex: 1 1
}

.с-button-basket :deep(.caption) {
  justify-content: center;
  grid-column-gap: .25vw;
  -moz-column-gap: .25vw;
  column-gap: .25vw
}

.с-button-basket > .c-button {
  width: 100%;
  height: 48px !important;
}

.с-button-basket > .c-button.m {
  max-width: unset
}

.с-button-basket > :deep(.c-basket-product) {
  height: 48px;
  width: unset
}

.с-button-basket > :deep(.c-basket-product) .quantity {
  flex: 1 1;
  border: unset
}

.с-button-basket > :deep(.c-basket-product) .quantity button {
  height: 48px;
  min-width: 50px
}

.с-button-basket > :deep(.c-basket-product) .quantity input {
  height: 48px;
  width: unset
}

.с-button-basket > :deep(.c-basket-product) .quantity .count {
  flex: 1 1 auto
}

.с-button-basket.mobile {
  margin: 17px 10px 20px;
  height: 38px !important;
}

.с-button-basket.mobile > :deep(.c-basket-product), .с-button-basket.mobile > :deep(.c-basket-product) .quantity button, .с-button-basket.mobile > :deep(.c-basket-product) .quantity input, .с-button-basket.mobile > .c-button {
  height: 38px !important;
}
</style>