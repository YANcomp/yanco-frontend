<script lang="ts" setup>
const emit = defineEmits(["notice-close"])

const props = defineProps({
  isMobile: {
    type: Boolean
  },
  notice: {
    type: Object
  },
  params: {
    type: Object
  }
})
</script>

<template>
  <NotificationsCNoticeMobile v-if="isMobile" :notice="notice" :default-duration="Number(5000)"
                              v-on:notice-close="(e)=>{emit('notice-close', e)}"/>
  <NotificationsCNoticeDesktop v-else :notice="notice" :is-basket="true" :default-duration="Number(5000)"
                               v-on:notice-close="(e)=>{emit('notice-close', e)}"/>
</template>