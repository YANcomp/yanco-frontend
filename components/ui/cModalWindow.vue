<script lang="ts" setup>
const props = defineProps({
  isOpened: {
    type: Boolean,
    default: !1
  },
  isMobile: {
    type: Boolean,
    default: !1
  }
})
const emit = defineEmits(["close"])
const appStore = useAppStore()
const isClosed = ref(!1)

watch(() => props.isOpened, (value) => {
  value ? (isClosed.value = !1, props.isMobile ? appStore.COMMIT_HIDE_MOBILE_FOOTER(!0) : (document.body.style.overflow = "hidden"), isClosed.value = !1, appStore.COMMIT_HIDE_CHAT_BOT(!0)) : setTimeout(() => {
    props.isMobile ? appStore.COMMIT_HIDE_MOBILE_FOOTER(!1) : (document.body.style.overflow = ""), appStore.COMMIT_HIDE_CHAT_BOT(!1)
  }, 300)
})

function close() {
  isClosed.value || (isClosed.value = !0, emit("close"))
}

onBeforeUnmount(() => {
  document.body.style.overflow = ""
})
</script>

<template>
  <div :class='["c-modal-window", { opened: isOpened, closed: isClosed || !isOpened }]'>
    <div class="overlay" @click="close"/>
    <div class="modal">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.c-modal-window {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99991;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: all .25s ease-in-out
}

.c-modal-window.opened {
  visibility: visible;
  opacity: 1
}

.c-modal-window.closed {
  pointer-events: none
}

.c-modal-window > .overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 9998;
  background-color: rgba(0, 0, 0, .75)
}

.c-modal-window > .modal {
  border-radius: 4px;
  position: fixed;
  padding: 20px;
  z-index: 9999;
  background-color: #fff
}
</style>