<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    default: "s",
    validator(value: string) {
      // The value must match one of these strings
      return ["s", "m", "l"].includes(value)
    }
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: "fixed",
    validator(value: string) {
      // The value must match one of these strings
      return ["fixed", "absolute", "relative"].includes(value)
    }
  },
  hideOverlay: {
    type: Boolean,
    default: false,
  },
})

const spinnerSize = computed(() => {
  return "".concat({"s": "38", "m": "50", "l": "65"}[props.size]!, "px") || false
})
</script>
<template>
  <div :class="['c-spinner', {mobile: props.isMobile}]"
       :style="{
         position: props.position,
         backgroundColor: props.hideOverlay ? 'transparent' : '#ffffffc5',
         zIndex: 'fixed' === props.position ? 99992 : 998
  }">
    <span class="icon spinner" :style="{height: spinnerSize, width: spinnerSize}"/>
  </div>
</template>
<style scoped>
.c-spinner {
  height: 100%;
  width: 100%;
  display: flex
}

.c-spinner.mobile {
  z-index: 998;
  min-height: 100px
}

.c-spinner>span {
  margin: auto;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #3f51b5
}
</style>