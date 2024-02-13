<script lang="ts" setup>
const footerMobile = resolveComponent('LazyFooterCFooterMobile')
const footerDesktop = resolveComponent('LazyFooterCFooterDesktop')

const props = defineProps({
  basketCount: {
    type: Number
  },
  city: {
    type: Object
  },
  comparisonCount: {
    type: Number
  },
  favoritesCount: {
    type: Number
  },
  favoritesPharmaciesCount: {
    type: Number
  },
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean,
    default: false
  },
  isChangedBasketAvailability: {
    type: Boolean,
    default: false
  },
  isChangedBasketPrice: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  me: {
    type: Object
  },
  params: {
    type: <any>Object
  }
})

const hotlineLink = computed(() => {
  return uHotlineLink(props.params.hotlinePhone ? props.params.hotlinePhone : "")
})
</script>

<template>
  <component v-if="isMobile" :basket-count="basketCount" :city="city" :comparison-count="comparisonCount"
             :favorites-count="favoritesCount" :favorites-pharmacies-count="favoritesPharmaciesCount"
             :has-loyal-card="hasLoyalCard" :is-authorized="isAuthorized"
             :is-changed-basket-availability="isChangedBasketAvailability"
             :is-changed-basket-price="isChangedBasketPrice" :me="me"
             :is="footerMobile" :params="params" :hotlineLink="hotlineLink"/>
  <component v-else :is="footerDesktop" :params="params" :hotlineLink="hotlineLink"/>
</template>

<style scoped>

</style>