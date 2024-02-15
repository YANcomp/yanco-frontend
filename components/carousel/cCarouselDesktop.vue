<script lang="ts" setup>
const props = defineProps({
  items: {
    type: <any>Array
  },
  switchInterval: {
    type: <any>Number
  },
  params: {
    type: <any>Object
  },
  isForBabyFood: {
    type: Boolean
  }
})

const router = useRouter()

const currentItemIndex = ref(0)
const timeoutID = ref(undefined)
const isShowImg = ref(false)

const backgroundPicture = computed(() => {
  return currentItem.value && currentItem.value.image ? {
    backgroundImage: "url(" + currentItem.value.image + ")",
    backgroundPosition: "right center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%"
  } : {}
})
const currentItem: any = computed(() => {
  if (!(currentItemIndex.value > (props.items ? props.items : []).length - 1)) return props.items[currentItemIndex.value]
})

watch(() => props.switchInterval, (value: any) => {
  clearSwitchTimeout()
  value > 0 && setSwitchTimeout()
})

onMounted(() => {
  setSwitchTimeout()
  window.addEventListener("resize", resize)
  resize()
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

function resize() {
  isShowImg.value = window.innerWidth <= 1122
}

function clearSwitchTimeout() {
  void 0 !== timeoutID.value && clearTimeout(timeoutID.value)
}

function getRoute(val: any) {
  if (val.includes(props.params.siteURL)) router.push(val.replace(props.params.siteURL, ""));
  else {
    let a = document.createElement("a");
    a.target = "_blank"
    a.rel = "nofollow"
    a.href = val
    a.click()
  }
}

function next() {
  clearSwitchTimeout()
  setSwitchTimeout()
  currentItemIndex.value = currentItemIndex.value < (props.items ? props.items : []).length - 1 ? currentItemIndex.value + 1 : 0
}

function prev() {
  clearSwitchTimeout()
  setSwitchTimeout()
  currentItemIndex.value = currentItemIndex.value > 0 ? currentItemIndex.value - 1 : (props.items ? props.items : []).length - 1
}

function setSwitchTimeout() {
  props.switchInterval > 0 && (timeoutID.value = <any>window.setTimeout(next, 1e3 * props.switchInterval))
}

function switchSlide(index: any) {
  index < 0 || index > (props.items ? props.items : []).length - 1 || (clearSwitchTimeout(), setSwitchTimeout(), currentItemIndex.value = index)
}
</script>

<template>
  <div :class='["c-carousel-desktop", { "loading-content": items.length < 1 }]'>
    <div>
      <LazyUiCArrowSVG v-if="items.length > 1" class="prev" mode="circle" @click="prev"/>
      <div v-if="currentItem" class="slide">
        <img v-if="isShowImg" :src="currentItem.image" alt="" width="100%" height="100%"
             @click="getRoute(currentItem?.targetAddress)"/>
        <div v-else :style="backgroundPicture" @click="getRoute(currentItem?.targetAddress)"/>
        <ul v-if="items.length > 1" class="pagination">
          <li v-for="(item, index) in items" :key="index" :class='{ selected: currentItemIndex === index }'
              @click="switchSlide(index)"/>
        </ul>
      </div>
      <LazyUiCArrowSVG v-if="items.length > 1" mode="circle" @click="next"/>
    </div>
  </div>
</template>

<style scoped>
.c-carousel-desktop {
  width: 100%;
  height: 100%;
  transition: all .3s;
  display: flex;
  flex-direction: column;
  background-color: #ebf0f9;
  border-radius: 5px;
  flex-basis: 1122px
}

.c-carousel-desktop.for-baby-food {
  flex-basis: 1368px
}

.c-carousel-desktop > div {
  align-items: center
}

.c-carousel-desktop > div > .slide, .c-carousel-desktop > div {
  display: flex;
  height: 100%;
  transition: inherit;
  position: relative
}

.c-carousel-desktop > div > .slide {
  width: 100%;
  flex-direction: column;
  border-radius: 5px
}

.c-carousel-desktop > div > .slide > .c-ad-marker {
  top: 0;
  right: 0
}

.c-carousel-desktop > div > .slide > div:not(.c-ad-marker) {
  transition: inherit;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer
}

.c-carousel-desktop > div > .slide > img {
  transition: inherit;
  max-height: 340px;
  border-radius: 5px;
  cursor: pointer
}

.c-carousel-desktop > div > .slide > .pagination {
  margin: 0;
  padding: 0;
  bottom: 35px;
  left: 62px;
  display: flex;
  width: calc(100% - 62px);
  transition: inherit;
  position: absolute
}

.c-carousel-desktop > div > .slide > .pagination > li {
  list-style: none;
  margin-right: 6px;
  background-color: #f4f4f4;
  transition: all .77s ease-in-out 0s;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  overflow: visible;
  padding: 0;
  cursor: pointer
}

.c-carousel-desktop > div > .slide > .pagination > li:hover {
  background-color: #3f51b5
}

.c-carousel-desktop > div > .slide > .pagination > li.selected {
  background-color: #3f51b5;
  width: 18px
}

.c-carousel-desktop > :deep(div:hover) > .c-arrow-svg {
  transform: translateX(0) translateY(calc(20px - 50%));
  opacity: 1
}
</style>