<script lang="ts" setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}
</script>

<template>
  <div :class='["c-up-button", { mobile: isMobile }]'>
    <UiCArrowSVG class="up" mode="circle" size="l" :is-up="true" @click="scrollToTop"/>
  </div>
</template>

<style scoped>
.c-up-button {
  position: fixed;
  bottom: 80px;
  left: 50px;
  z-index: 99;
  transition: .5s
}

.c-up-button > .c-arrow-svg {
  transform: translateX(0) translateY(calc(20px - 50%));
  left: 0;
  opacity: 1
}

@media screen and (max-width: 1600px) {
  .c-up-button {
    opacity: .5
  }

  .c-up-button:hover {
    opacity: 1
  }
}
</style>