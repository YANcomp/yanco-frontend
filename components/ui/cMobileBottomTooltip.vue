<script lang="ts" setup>
const props = defineProps({
  closed: {
    type: Boolean
  },
  isHideFooter: {
    type: Boolean,
    default: false
  },
  mobileBottomTooltipName: {
    type: String
  },
  isForbiddenClose: {
    type: Boolean,
    default: false
  },
  isFullScreenMap: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isNoClosure: {
    type: Boolean,
    default: false
  },
  isNeedCheckUpdated: {
    type: Boolean,
    default: false
  }
})

const contentRef = ref(<any>{})
const isOpened = ref(!1)
const isClosed = ref(!0)
const isOpenedContent = ref(!1)
const height = ref(0)
const timeoutOpenedDelay = ref(props.isHideFooter ? 300 : 0)
const timeoutOpenedContentDelay = ref(props.isHideFooter ? 500 : 200)

watch(() => props.closed, (value) => {
  value && close()
});

const appStore = useAppStore()
const emit = defineEmits(["close"])

onMounted(() => {
  props.isHideFooter && appStore.COMMIT_HIDE_MOBILE_FOOTER(true), setTimeout(() => {
    isClosed.value = false, isOpened.value = true
  }, timeoutOpenedDelay.value), setTimeout(() => {
    isOpenedContent.value = true
  }, timeoutOpenedContentDelay.value), height.value = contentRef.value.offsetHeight
})

function close() {
  props.isForbiddenClose && !props.closed || (isClosed.value = true, setTimeout(() => {
    isOpened.value = false
  }, 300), setTimeout(() => {
    props.isHideFooter && appStore.COMMIT_HIDE_MOBILE_FOOTER(false), emit("close", props.mobileBottomTooltipName)
  }, 600))
}
</script>

<template>
  <div :class='["c-mobile-bottom-tooltip", { opened: isOpened, closed: isClosed, "full-screen-map": isFullScreenMap }]'
       :style='{ "--height": height + "px" }' @click="close">
    <div ref="contentRef" :class='{ opened: isOpenedContent }' @click="(t)=>{t.stopPropagation()}">
      <LazyUiCSpinner v-if="isLoading" class="loading" size="s" position="absolute"/>
      <div class="top">
        <slot name="title"/>
        <span v-if="!isNoClosure" class="icon close2" @click="close"/>
      </div>
      <div class="content">
        <slot name="text"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-mobile-bottom-tooltip {
  display: flex;
  position: fixed;
  background-color: rgba(0, 0, 0, .75);
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: all .3s ease-in-out;
  opacity: 0;
  z-index: 999
}

.c-mobile-bottom-tooltip.full-screen-map {
  background-color: transparent;
  z-index: 10001
}

.c-mobile-bottom-tooltip > div {
  width: 100%;
  margin-top: auto;
  border-radius: 15px 15px 0 0;
  background-color: #fff;
  padding: 25px 15px;
  transition: all 0s ease-in-out;
  transform: translateY(var(--height));
  position: relative
}

.c-mobile-bottom-tooltip > div > .loading {
  left: 0;
  top: 0;
  border-radius: 15px 15px 0 0
}

.c-mobile-bottom-tooltip > div.opened {
  transition: all .3s ease-in-out;
  transform: translateY(0)
}

.c-mobile-bottom-tooltip > div > .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1e1e1e;
  margin-bottom: 15px
}

.c-mobile-bottom-tooltip > div > .top > .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 60%;
  mask-size: 60%;
  background-color: #818ca9;
  min-width: 24px
}

.c-mobile-bottom-tooltip > div > .content {
  font-size: 13px;
  color: #1e1e1e
}

.c-mobile-bottom-tooltip > div > .content .link, .c-mobile-bottom-tooltip > div > .content a {
  color: #3f51b5
}

.c-mobile-bottom-tooltip > div > .content .link:hover, .c-mobile-bottom-tooltip > div > .content a:hover {
  cursor: pointer;
  color: #4960df
}

.c-mobile-bottom-tooltip > div > .content .link:active, .c-mobile-bottom-tooltip > div > .content a:active {
  color: #32408f
}

.c-mobile-bottom-tooltip.opened {
  opacity: 1
}

.c-mobile-bottom-tooltip.closed > div {
  transform: translateY(var(--height))
}

@media screen and (max-width: 360px) {
  .c-mobile-bottom-tooltip > div > .top {
    font-size: 17px
  }
}
</style>