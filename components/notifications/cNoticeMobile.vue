<script lang="ts" setup>
const emit = defineEmits(["notice-close"])

const props = defineProps({
  defaultDuration: {
    type: Number
  },
  notice: {
    type: Object
  },
})
</script>

<template>
  <div>
    {{props.notice}}
  </div>
</template>

<style>

</style>