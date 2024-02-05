<script lang="ts" setup>
const emit = defineEmits(["notice-close"])

const props = defineProps({
  defaultDuration: {
    type: Number
  },
  notice: {
    type: <any>Object
  },
  isBasket: {
    type: Boolean,
    default: false
  },
  isFavorites: {
    type: Boolean,
    default: false
  },
  isCompare: {
    type: Boolean,
    default: false
  },
  isCompareLimited: {
    type: Boolean,
    default: false
  },
  isRequest: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div>
    {{props.notice}}
  </div>
</template>

<style>

</style>