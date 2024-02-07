<script lang="ts" setup>
const notificationsMobile = resolveComponent('LazyNotificationsCNoticeMobile')
const notificationsDesktop = resolveComponent('LazyNotificationsCNoticeDesktop')

const emit = defineEmits(["notice-close"])

const props = defineProps({
  isMobile: {
    type: Boolean
  },
  notice: {
    type: <any>Object
  },
  params: {
    type: Object
  }
})

let isBasket = props.notice.status === "basket"
let isFavorites = props.notice.status === "favorites"
let isCompare = props.notice.status === "compare"
let isCompareLimited = props.notice.status === "compare-limited"
let isRequest = props.notice.status.includes("request")

</script>

<template>
  <component v-if="isMobile" :is="notificationsMobile" :notice="notice"
             :is-basket="isBasket"
             :is-favorites="isFavorites"
             :is-compare="isCompare"
             :is-compare-limited="isCompareLimited"
             :is-request="isRequest"
             :default-duration="Number(5000)"
             v-on:notice-close="(e)=>{emit('notice-close', e)}"/>
  <component v-else :is="notificationsDesktop" :notice="notice"
             :is-basket="isBasket"
             :is-favorites="isFavorites"
             :is-compare="isCompare"
             :is-compare-limited="isCompareLimited"
             :is-request="isRequest"
             :default-duration="Number(5000)"
             v-on:notice-close="(e)=>{emit('notice-close', e)}"/>
</template>