<script lang="ts" setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  isShowInStatic: {
    type: Boolean,
    default: false
  },
  isStatic: {
    type: Boolean,
    default: false
  },
  routeMode: {
    type: String
  }
})

const isClosed = ref(true)
const isOpened = ref(false)
const intervalID = ref(undefined)
const isCodeSent = ref(false)
const timeout = ref(0)
const mode = ref("login")
const isRegistered = ref(false)
const isOpen = ref(false)
const isLoading = ref(false)
const errorPassword = ref("")
const errorPhone = ref("")
const errorCode = ref("")
const isMouseDownOverlay = ref(false)
const isRecovery = ref(false)
const isBanned = ref(false)
const isInputCodeDisabled = ref(false)
</script>

<template>
  <div></div>
</template>

<style scoped>

</style>