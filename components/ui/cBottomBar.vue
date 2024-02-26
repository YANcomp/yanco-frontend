<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String
  },
  isOpened: {
    type: Boolean,
    default: !1
  },
  hideFooter: {
    type: Boolean,
    default: !0
  },
  isResize: {
    type: Boolean,
    default: !1
  },
  scrollTop: {
    type: Boolean,
    default: !1
  },
  closeIcon: {
    type: String,
    default: ""
  },
  notNeededNextTick: {
    type: Boolean,
    default: !1
  }
})
const emit = defineEmits(["close"])

const barRef = ref(<any>undefined)
const appStore = useAppStore()

const bottom = ref(-1e3)
const maxHeight = ref(0)
const internalOpened = ref(!1)

const hasTitle = computed(() => {
  return void 0 !== props.title
})

watch(() => props.isResize, () => {
  resize()
})
watch(() => props.isOpened, (value) => {
  value ? (nextTick(() => {
    setTimeout(() => {
      bottom.value = -barRef.value.clientHeight
    }, 100)
  }), nextTick(() => {
    props.scrollTop && barRef.value.scrollTo({
      top: 0
    }), setTimeout(() => {
      bottom.value = 0
      document.body.style.overflow = "hidden"
      props.hideFooter && appStore.COMMIT_HIDE_MOBILE_FOOTER(true)
      internalOpened.value = !0
    }, 100)
  })) : (internalOpened.value = !1, bottom.value = -barRef.value.clientHeight, props.hideFooter && appStore.COMMIT_HIDE_MOBILE_FOOTER(false))
})

onMounted(() => {
  window.addEventListener("resize", resize)
  resize()
  props.notNeededNextTick || nextTick(() => {
    setTimeout(() => {
      bottom.value = -barRef.value.clientHeight
    }, 400)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
  if (props.hideFooter) {
    internalOpened.value = !1
    bottom.value = -barRef.value.clientHeight
    document.body.style.overflow = ""
    appStore.COMMIT_HIDE_MOBILE_FOOTER(false)
  }
})

function close() {
  emit("close")
}

function resize() {
  nextTick(() => {
    maxHeight.value = .95 * window.innerHeight
  })
}
</script>

<template>
  <div :class='["c-bottom-bar", { opened: internalOpened }]'>
    <div class="overlay" @click="close"/>
    <div ref="barRef" class="bar" :style='{ maxHeight: maxHeight + "px", bottom: bottom + "px" }'>
      <div class="top">
        <h2 v-if="hasTitle">{{ title }}</h2>
        <span :class='["icon", closeIcon, { close: !closeIcon }]' @click="close"/>
      </div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.c-bottom-bar {
  height: 100%;
  width: 100%;
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: opacity .3s
}

.c-bottom-bar.opened {
  visibility: visible
}

.c-bottom-bar.opened > .overlay {
  background-color: rgba(0, 0, 0, .75)
}

.c-bottom-bar > .overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 999;
  transition: .3s;
  background-color: transparent
}

.c-bottom-bar > .bar {
  border-radius: 15px 15px 0 0;
  position: fixed;
  padding: 20px 20px calc(20px + env(safe-area-inset-bottom));
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  width: -moz-available;
  transition: .4s ease-in-out;
  z-index: 999;
  background-color: #fff;
  box-sizing: border-box
}

.c-bottom-bar > .bar > .top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px
}

.c-bottom-bar > .bar > .top > h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 500
}

.c-bottom-bar > .bar > .top > .icon {
  min-width: 24px;
  margin-left: 10px
}
</style>