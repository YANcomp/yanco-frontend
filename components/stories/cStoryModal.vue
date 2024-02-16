<script lang="ts" setup>
const props = defineProps({
  isOpenStoryModal: {
    type: Boolean
  },
  stories: {
    type: <any>Array,
    default: function () {
      return []
    }
  },
  params: {
    type: <any>Object
  }
})

const modalRef = ref(<any>undefined)

const isOpened = ref(false)
const isClosed = ref(true)
const currentSlideIndex = ref(-1)
const timeoutID = ref(<any>undefined)
const isPause = ref(false)
const startTimeoutID = ref(0)
const remaining = ref(0)
const startTouchX = ref(<any>undefined)
const viewedStoriesIDs = ref(<any>[])
const isEndSlideshow = ref(false)
const endSlideshowTimeoutID = ref(<any>undefined)
const isShowAnimate = ref(false)
const waiting = ref(0)
const waitingIntervalID = ref(<any>undefined)
const isShowArrowsMobile = ref(false)
const mobileScrollY = ref(0)
const openNextStoryIntervalID = ref(<any>undefined)
const isOpenNextStory = ref(false)
const isOpenedAdTooltip = ref(false)

const router = useRouter()
const appStore = useAppStore()
const storiesStore = useStoriesStore()

const backgroundPicture = computed(() => {
  return void 0 !== currentSlide.value ? {
    backgroundImage: "url(".concat(currentSlide.value.backgroundImage, ")"),
    backgroundRepeat: "no-repeat",
    backgroundSize: "".concat(isMobile.value ? "cover" : "100% 100%"),
    backgroundPosition: "center"
  } : {}
})
const currentSlide = computed(() => {
  return story.value.slides[currentSlideIndex.value > -1 ? currentSlideIndex.value : 0]
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const story = computed(() => {
  return storiesStore.currentStory
})
const viewed = computed(() => {
  return viewedStoriesIDs.value.includes(story.value.ID)
})
const slideElements = computed(() => {
  let t = 0;
  return Object.keys(currentSlide.value).includes("caption") && t++, Object.keys(currentSlide.value).includes("content") && t++, Object.keys(currentSlide.value).includes("target") && t++, t
})
const indexCurrentStory = computed(() => {
  return props.stories.indexOf(story.value)
})

const emit = defineEmits(["viewed-stories-change"])

watch(
    () => currentSlideIndex.value,
    (value) => {
      setTimeout(() => {
        isShowAnimate.value = true
      }, 10)

      if (value + 1 === story.value?.slides.length) {
        viewedStoriesIDs.value.includes(story.value.ID) || viewedStoriesIDs.value.push(story.value.ID)
        localStorage.setItem("viewedStoriesIDs", JSON.stringify(viewedStoriesIDs.value))
        emit("viewed-stories-change")
        if (indexCurrentStory.value !== props.stories.length - 1) {
          openNextStoryIntervalID.value = window.setTimeout(openNextStory, currentSlide.value.delay)
          isOpenNextStory.value = true
        } else {
          endSlideshowTimeoutID.value = window.setTimeout(closedModalByTimer, currentSlide.value.delay)
          isEndSlideshow.value = true
        }
      } else {
        isOpenNextStory.value = !1
        clearOpenNextStoryTimeout()
        isEndSlideshow.value = !1
        clearEndSlideshowTimeout()
      }
    }
)

watch(() => isOpened.value, (value) => {
  value || (appStore.OPEN_CLOSE_STORY_MODAL(false),
      storiesStore.CHANGE_CURRENT_STORY_ID(undefined))
})

watch(() => props.isOpenStoryModal, (value) => {
  value ? openStory() : closeModal()
})

onMounted(() => {
  viewedStoriesIDs.value = JSON.parse(localStorage.getItem("viewedStoriesIDs") || "[]")
  window.addEventListener("resize", resize)
  resize()
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

//functions
function clearOpenNextStoryTimeout() {
  void 0 !== openNextStoryIntervalID.value && clearTimeout(openNextStoryIntervalID.value)
}

function clearEndSlideshowTimeout() {
  void 0 !== endSlideshowTimeoutID.value && clearTimeout(endSlideshowTimeoutID.value)
}

function clearSwitchTimeout() {
  void 0 !== timeoutID.value && clearTimeout(timeoutID.value)
}

function closedModalByTimer() {
  setTimeout(() => {
    isEndSlideshow.value && !isPause.value && closeModal()
  }, currentSlide.value.delay)
}

function closeModal() {
  if (!isClosed.value) {
    document.removeEventListener("keydown", esc)
    openCloseModal()
    clearSwitchTimeout()
    clearOpenNextStoryTimeout()
    clearEndSlideshowTimeout()
  }
}

function esc(key: any) {
  "Escape" === key.code && closeModal()
}

function next() {
  clearSwitchTimeout()
  currentSlideIndex.value < story.value.slides.length - 1 && (isShowAnimate.value = false, setSwitchTimeout(), currentSlideIndex.value++)
}

function touchAd() {
  pause()
  isOpenedAdTooltip.value = true
}

function onTooltipClose() {
  isOpenedAdTooltip.value = !1
  restart()
}

function openCloseModal() {
  isOpened.value ? (isClosed.value = !isClosed.value, isMobile.value && !isShowArrowsMobile.value && window.scrollTo({
    top: mobileScrollY.value,
    left: 0
  }), setTimeout(() => {
    isOpened.value = !isOpened.value
    currentSlideIndex.value = -1
    document.body.style.overflow = ""
    //TODO
    isMobile.value && appStore.HIDE_MOBILE_FOOTER(false)
  }, 300)) : (isMobile.value && !isShowArrowsMobile.value && (mobileScrollY.value = window.scrollY, window.scrollTo({
    top: 0,
    left: 0
  })), document.body.style.overflow = "hidden", isMobile.value && (appStore.HIDE_MOBILE_FOOTER(true)), isOpened.value = !isOpened.value, isClosed.value = !isClosed.value)
}

function openStory() {
  document.addEventListener("keydown", esc)
  openCloseModal()
  setSwitchTimeout()
}

function openNextStory() {
  if (isOpenNextStory.value && !isPause.value) {
    storiesStore.CHANGE_CURRENT_STORY_ID(props.stories[indexCurrentStory.value + 1].ID)
    currentSlideIndex.value = -1
    setSwitchTimeout()
  }
}

function openRoute(t: any) {
  router.push(t.replace(props.params.siteURL, ""))
  closeModal()
}

function pause(t?: any) {
  isOpenedAdTooltip.value || (isPause.value = true, clearSwitchTimeout(), clearEndSlideshowTimeout(), clearOpenNextStoryTimeout(), remaining.value -= Date.now() - startTimeoutID.value, isMobile.value && void 0 !== (null == t ? void 0 : t.changedTouches) && !isShowArrowsMobile.value && (waitingIntervalID.value = window.setInterval(() => {
    waiting.value += .5
  }, 500), startTouchX.value = t.changedTouches[0].pageX))
}

function prev() {
  clearSwitchTimeout()
  currentSlideIndex.value > 0 && (isShowAnimate.value = false, setSwitchTimeout(), currentSlideIndex.value--)
}

function restart(t?: any) {
  if (!isOpenedAdTooltip.value) {
    if (isPause.value = false, isMobile.value && void 0 !== startTouchX.value && void 0 !== (null == t ? void 0 : t.changedTouches)) {
      let e = t.changedTouches[0].pageX,
          n = modalRef.value,
          o = t.changedTouches[0];
      clearInterval(waitingIntervalID.value), isShowArrowsMobile.value || (o.pageY > 65 && n.offsetHeight - o.pageY > 115 && waiting.value < 1 ? n.offsetWidth - o.pageX < n.offsetWidth / 2 ? next() : prev() : startTouchX.value - e < -70 ? prev() : startTouchX.value - e > 70 && next()), waiting.value = 0
    }
    remaining.value < 0 || (clearOpenNextStoryTimeout(), clearEndSlideshowTimeout(), clearSwitchTimeout(), startTimeoutID.value = Date.now(), timeoutID.value = window.setTimeout(next, remaining.value), isOpenNextStory.value && (openNextStoryIntervalID.value = window.setTimeout(openNextStory, remaining.value)), isEndSlideshow.value && (endSlideshowTimeoutID.value = window.setTimeout(closedModalByTimer, remaining.value)))
  }
}

function resize() {
  isShowArrowsMobile.value = window.outerHeight > 590 && window.outerWidth > 500
}

function selectSlide(t: any) {
  currentSlideIndex.value !== t && (isShowAnimate.value = false, clearSwitchTimeout(), currentSlideIndex.value = 0 === t ? -1 : t, currentSlideIndex.value < story.value.slides.length - 1 && setSwitchTimeout())
}

function setSwitchTimeout() {
  currentSlideIndex.value < 0 && setTimeout(() => {
    currentSlideIndex.value++
  }, 300), startTimeoutID.value = Date.now(), remaining.value = currentSlide.value.delay, timeoutID.value = window.setTimeout(next, currentSlide.value.delay)
}
</script>

<template>
  <div v-if="isOpened" :class='["c-story-modal", { opened: isOpened, closed: isClosed, mobile: isMobile }]'>
    <div>
      <div ref="modalRef" :style='[backgroundPicture, { overflow: isShowArrowsMobile ? "unset" : "hidden" }]'
           v-on:mousedown="pause"
           v-on:mouseup="restart"
           v-on:touchstart="(e)=>{pause(e)}"
           v-on:touchend="(e)=>{restart(e)}">
        <div :class='["lines", { "no-top-shadow": currentSlide?.isHideShadowTop }]'>
          <div v-for="(item) in story?.slides.length" :key="item"
               :style='{ "--count": story?.slides.length, "--transition": currentSlide.delay / 1e3 + "s", "--animation-play-state": isPause ? "paused" : "running" }'
               @click="selectSlide(item - 1)">
            <span :class='{ active: item - 1 === currentSlideIndex, viewed: item - 1 < currentSlideIndex }'/>
          </div>
        </div>
        <span v-if="isMobile" class="icon close2" @click="closeModal"/>
        <div
            :class='["slide", "_" + slideElements, currentSlide?.textPosition, { "no-target": void 0 === currentSlide.target, animate: isShowAnimate, "no-bottom-shadow": currentSlide?.isHideShadowBottom }]'>
          <div>
            <span v-if="void 0 !== currentSlide.caption" class="caption" v-html="currentSlide.caption"/>
            <span v-if="void 0 !== currentSlide.content" :class='["content", currentSlide?.contentFontSize]'
                  v-html="currentSlide.content"/>
            <template v-if="void 0 !== currentSlide.target">
              <span v-if="currentSlide.target.includes(params.siteURL)" class="route"
                    @click="openRoute(currentSlide.target)">
                <UiCButton :mode="currentSlide?.btnStyle" :custom-style="currentSlide?.btnCustomStyle" size="xl">
                  {{ currentSlide?.btnText }}
                </UiCButton>
              </span>
              <a v-else :href='currentSlide.target' target="_blank" rel="nofollow">
                <UiCButton :mode="currentSlide?.btnStyle" :custom-style="currentSlide?.btnCustomStyle" size="xl">
                  {{ currentSlide?.btnText }}
                </UiCButton>
              </a>
            </template>
          </div>
        </div>
        <div v-if="!isMobile && currentSlideIndex > 0" class="prev" @click="prev"/>
        <div v-if="!isMobile && currentSlideIndex < story?.slides.length - 1" class="next" @click="next"/>
        <template v-if="isMobile && isShowArrowsMobile">
          <div v-if="currentSlideIndex > 0" class="prev-mobile" @click="prev">
            <UiCArrowSVG class="prev" mode="circle"/>
          </div>
          <div v-if="currentSlideIndex < story?.slides.length - 1" class="next-mobile" @click="next">
            <UiCArrowSVG mode="circle"/>
          </div>
        </template>
      </div>
      <span v-if="!isMobile" class="icon close2" @click="closeModal"/>
      <div v-if="!isMobile" class="arrows">
        <div :class='["arrow", "prev", { visible: currentSlideIndex > 0 }]' @click="prev">
          <UiCArrowSVG class="prev" mode="circle"/>
        </div>
        <div :class='["arrow", "next", { visible: currentSlideIndex < story?.slides.length - 1 }]' @click="next">
          <UiCArrowSVG mode="circle"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-story-modal {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, .75);
  z-index: 999;
  display: flex
}

.c-story-modal > div {
  display: flex;
  position: absolute;
  width: 40vh;
  left: 50%;
  margin-left: -22.5vh;
  height: 66.1vh;
  top: 50%;
  margin-top: -35vh
}

.c-story-modal > div > div {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  overflow: auto;
  display: flex;
  flex-flow: column;
  padding: 0 10px;
  background-color: #fff;
  border-radius: 5px;
  max-height: 617px;
  max-width: 347px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 2;
  position: relative;
  transition: all .2s ease-in-out
}

.c-story-modal > div > div > .next, .c-story-modal > div > div > .prev {
  position: absolute;
  width: 50px;
  height: 95%;
  left: 0;
  z-index: 3;
  bottom: 0
}

.c-story-modal > div > div > .next {
  left: unset;
  right: 0
}

.c-story-modal > div > div > .next-mobile, .c-story-modal > div > div > .prev-mobile {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 3;
  bottom: 0
}

.c-story-modal > div > div > .next-mobile.prev-mobile, .c-story-modal > div > div > .prev-mobile.prev-mobile {
  left: unset;
  right: 0;
  margin-right: 100%
}

.c-story-modal > div > div > .next-mobile.next-mobile, .c-story-modal > div > div > .prev-mobile.next-mobile {
  margin-left: 100%
}

.c-story-modal > div > div > .next-mobile > .c-arrow-svg, .c-story-modal > div > div > .prev-mobile > .c-arrow-svg {
  left: 25px;
  transform: translateX(0) translateY(calc(20px - 50%));
  opacity: 1
}

.c-story-modal > div > div > .next-mobile > .c-arrow-svg.prev, .c-story-modal > div > div > .prev-mobile > .c-arrow-svg.prev {
  right: 25px;
  left: unset
}

.c-story-modal > div > div > .next-mobile > .c-arrow-svg:hover, .c-story-modal > div > div > .prev-mobile > .c-arrow-svg:hover {
  cursor: default
}

.c-story-modal > div > div > .lines {
  display: flex;
  position: relative;
  z-index: 3
}

.c-story-modal > div > div > .lines:after {
  content: "";
  top: 0;
  left: -10px;
  right: 0;
  position: absolute;
  height: 182px;
  width: calc(100% + 20px);
  background: linear-gradient(180deg, rgba(0, 0, 0, .4), transparent);
  border-radius: 5px 5px 0 0
}

.c-story-modal > div > div > .lines.no-top-shadow:after {
  opacity: 0
}

.c-story-modal > div > div > .lines > div {
  display: flex;
  height: 20px;
  width: calc(100% / var(--count));
  align-items: center;
  margin-right: 5px;
  z-index: 1
}

.c-story-modal > div > div > .lines > div:last-of-type {
  margin-right: 0
}

.c-story-modal > div > div > .lines > div > span {
  height: 3px;
  width: 100%;
  background-color: hsla(0, 0%, 100%, .3);
  position: relative
}

.c-story-modal > div > div > .lines > div > span:after {
  position: absolute;
  left: 0;
  content: "";
  height: 3px;
  width: 0;
  bottom: 0;
  background-color: #fff
}

.c-story-modal > div > div > .lines > div > span.viewed:after {
  width: 100%
}

.c-story-modal > div > div > .lines > div > span.active:after {
  -webkit-animation: line var(--transition) ease 0s 1 alternate forwards var(--animation-play-state);
  animation: line var(--transition) ease 0s 1 alternate forwards var(--animation-play-state)
}

.c-story-modal > div > div > .lines > div:hover {
  cursor: pointer
}

.c-story-modal > div > div > .lines > div:hover > span:not(.active) {
  background-color: hsla(0, 0%, 100%, .6)
}

.c-story-modal > div > div > .lines > div:hover > span:not(.active).viewed:after {
  width: unset
}

.c-story-modal > div > div > .close2 {
  margin-left: auto;
  margin-top: 3px;
  margin-right: 0;
  cursor: pointer;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  background-color: #c4c4c4;
  -webkit-mask-position: center;
  mask-position: center;
  z-index: 3
}

.c-story-modal > div > div > .slide {
  padding: 0 10px;
  color: #fff;
  position: relative;
  z-index: 2;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, .5)
}

.c-story-modal > div > div > .slide:after {
  content: "";
  position: absolute;
  top: -40px;
  right: 0;
  left: -10px;
  bottom: -20px;
  z-index: 1;
  width: calc(100% + 20px);
  transition: opacity .3s ease-in-out;
  border-radius: 0 0 5px 5px
}

.c-story-modal > div > div > .slide.top {
  margin-bottom: auto
}

.c-story-modal > div > div > .slide.top:after {
  top: -50px;
  background: linear-gradient(180deg, rgba(0, 0, 0, .7), transparent)
}

.c-story-modal > div > div > .slide.bottom {
  margin-top: auto;
  margin-bottom: 20px
}

.c-story-modal > div > div > .slide.bottom:after {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .7));
  top: -60px
}

.c-story-modal > div > div > .slide.no-bottom-shadow:after {
  opacity: 0
}

.c-story-modal > div > div > .slide > div {
  display: flex;
  flex-flow: column;
  align-items: center;
  z-index: 3;
  position: relative;
  margin-bottom: 15px
}

.c-story-modal > div > div > .slide > div > .caption {
  max-width: 304px;
  width: 100%;
  z-index: 2;
  font-weight: 700;
  font-size: 30px;
  line-height: 37px;
  margin-bottom: 10px;
  opacity: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.c-story-modal > div > div > .slide > div > .caption > p {
  margin: 0
}

.c-story-modal > div > div > .slide > div > .content {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  max-width: 304px;
  z-index: 2;
  width: 100%;
  margin-bottom: 20px;
  opacity: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.c-story-modal > div > div > .slide > div > .content.small {
  font-size: 13px;
  line-height: 16px
}

.c-story-modal > div > div > .slide > div > .route, .c-story-modal > div > div > .slide > div > a {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
  opacity: 0
}

.c-story-modal > div > div > .slide > div > :last-child {
  margin-bottom: 25px
}

.c-story-modal > div > div > .slide.animate._1 > div > :last-child {
  -webkit-animation: down-slide-last-child .45s ease-in-out .2s 1 forwards;
  animation: down-slide-last-child .45s ease-in-out .2s 1 forwards
}

.c-story-modal > div > div > .slide.animate._2 > div > :first-child.caption {
  -webkit-animation: down-slide-caption .45s ease-in-out .2s 1 forwards;
  animation: down-slide-caption .45s ease-in-out .2s 1 forwards
}

.c-story-modal > div > div > .slide.animate._2 > div > :first-child.content {
  -webkit-animation: down-slide-content .45s ease-in-out .2s 1 forwards;
  animation: down-slide-content .45s ease-in-out .2s 1 forwards
}

.c-story-modal > div > div > .slide.animate._2 > div > :last-child {
  -webkit-animation: down-slide-last-child .45s ease-in-out .45s 1 both;
  animation: down-slide-last-child .45s ease-in-out .45s 1 both
}

.c-story-modal > div > div > .slide.animate._3 > div > .caption {
  -webkit-animation: down-slide-caption .45s ease-in-out .2s 1 forwards;
  animation: down-slide-caption .45s ease-in-out .2s 1 forwards
}

.c-story-modal > div > div > .slide.animate._3 > div > .content {
  -webkit-animation: down-slide-content .45s ease-in-out .45s 1 both;
  animation: down-slide-content .45s ease-in-out .45s 1 both
}

.c-story-modal > div > div > .slide.animate._3 > div > :last-child {
  -webkit-animation: down-slide-last-child .45s ease-in-out .9s 1 both;
  animation: down-slide-last-child .45s ease-in-out .9s 1 both
}

.c-story-modal > div > .close2 {
  margin-left: 8px;
  margin-top: 3px;
  margin-right: 0;
  cursor: pointer;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  background-color: #c4c4c4;
  -webkit-mask-position: center;
  mask-position: center;
  z-index: 2
}

.c-story-modal > div > .close2:hover {
  background-color: #fff
}

.c-story-modal > div > .arrows {
  height: 100%;
  position: absolute;
  background: transparent;
  width: 205vh;
  max-width: unset;
  left: -84vh;
  z-index: 1;
  padding: 0;
  transition: opacity .3s;
  flex-flow: row;
  justify-content: space-between
}

.c-story-modal > div > .arrows > .arrow {
  display: flex;
  height: 100%;
  width: 84vh;
  position: relative;
  background: transparent;
  align-items: center;
  opacity: 0
}

.c-story-modal > div > .arrows > .arrow > .c-arrow-svg {
  left: 25px;
  transform: translateX(0) translateY(calc(20px - 50%));
  opacity: 1
}

.c-story-modal > div > .arrows > .arrow > .c-arrow-svg.prev {
  right: 25px;
  left: unset
}

.c-story-modal > div > .arrows > .arrow > .c-arrow-svg:hover {
  cursor: default
}

.c-story-modal > div > .arrows > .arrow.visible {
  opacity: 1;
  cursor: pointer
}

.c-story-modal > div > .arrows > .arrow.visible > .c-arrow-svg:hover {
  cursor: pointer
}

.c-story-modal.opened {
  -webkit-animation: modal-in .3s ease-in-out both running;
  animation: modal-in .3s ease-in-out both running
}

.c-story-modal.closed {
  -webkit-animation: modal-out .3s ease-in-out both running;
  animation: modal-out .3s ease-in-out both running
}

.c-story-modal.mobile > div {
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  left: unset;
  margin: 0;
  position: unset
}

.c-story-modal.mobile > div > div > .slide > div > .caption {
  font-size: 32px;
  line-height: 44px
}

.c-story-modal.mobile > div > div > .slide > div > .content {
  font-size: 20px;
  line-height: 28px
}

.c-story-modal.mobile > div > div > .slide > div > .content.small {
  font-size: 14px;
  line-height: 20px
}

.c-story-modal.mobile > div > div > .slide > div > :last-child {
  margin-bottom: 55px
}

@media screen and (max-height: 750px) {
  .c-story-modal:not(.mobile) > div > div > .slide > div > .caption {
    font-size: 24px;
    line-height: 33px
  }

  .c-story-modal:not(.mobile) > div > div > .slide > div > .content {
    font-size: 16px
  }

  .c-story-modal:not(.mobile) > div > div > .slide > div > .content.small {
    font-size: 13px
  }
}

@media screen and (max-height: 650px) {
  .c-story-modal:not(.mobile) > div > div > .slide > div > .caption {
    font-size: 20px;
    line-height: 27px
  }

  .c-story-modal:not(.mobile) > div > div > .slide > div > .content {
    font-size: 14px;
    line-height: 20px
  }

  .c-story-modal:not(.mobile) > div > div > .slide > div > .content.small {
    font-size: 10px
  }
}

@media screen and (max-height: 590px) {
  .c-story-modal.mobile {
    z-index: 10000
  }

  .c-story-modal.mobile > div {
    margin: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0
  }

  .c-story-modal.mobile > div > div {
    max-height: 100%;
    max-width: 100%;
    margin: 0;
    border-radius: 0
  }

  .c-story-modal.mobile > div > div > .lines:after, .c-story-modal.mobile > div > div > .slide:after {
    border-radius: 0
  }
}

@media screen and (max-height: 550px) {
  .c-story-modal:not(.mobile) > div > div > .slide > div > .caption {
    font-size: 18px;
    line-height: 23px
  }

  .c-story-modal:not(.mobile) > div > div > .slide > div > .content {
    font-size: 13px;
    line-height: unset
  }

  .c-story-modal:not(.mobile) > div > div > .slide > div > .content.small {
    font-size: 9px
  }
}

@media screen and (max-width: 475px) {
  .c-story-modal.mobile {
    z-index: 10000
  }

  .c-story-modal.mobile > div {
    margin: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0
  }

  .c-story-modal.mobile > div > div {
    margin: 0;
    max-height: 100%;
    max-width: 100%;
    border-radius: 0
  }

  .c-story-modal.mobile > div > div > .lines:after, .c-story-modal.mobile > div > div > .slide:after {
    border-radius: 0
  }
}

@-webkit-keyframes line {
  0% {
    width: 0
  }

  to {
    width: 100%
  }
}

@keyframes line {
  0% {
    width: 0
  }

  to {
    width: 100%
  }
}

@-webkit-keyframes modal-in {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes modal-in {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@-webkit-keyframes modal-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@keyframes modal-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@-webkit-keyframes down-slide-caption {
  0% {
    opacity: 0;
    margin-bottom: 0
  }

  to {
    opacity: 1;
    margin-bottom: 10px
  }
}

@keyframes down-slide-caption {
  0% {
    opacity: 0;
    margin-bottom: 0
  }

  to {
    opacity: 1;
    margin-bottom: 10px
  }
}

@-webkit-keyframes down-slide-content {
  0% {
    opacity: 0;
    margin-bottom: 0
  }

  to {
    opacity: 1;
    margin-bottom: 20px
  }
}

@keyframes down-slide-content {
  0% {
    opacity: 0;
    margin-bottom: 0
  }

  to {
    opacity: 1;
    margin-bottom: 20px
  }
}

@-webkit-keyframes down-slide-last-child {
  0% {
    opacity: 0;
    margin-bottom: 0
  }

  to {
    opacity: 1;
    margin-bottom: 25px
  }
}

@keyframes down-slide-last-child {
  0% {
    opacity: 0;
    margin-bottom: 0
  }

  to {
    opacity: 1;
    margin-bottom: 25px
  }
}
</style>