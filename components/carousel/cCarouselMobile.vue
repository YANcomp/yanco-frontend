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
  }
})

const router = useRouter()

const carouselRef = ref(<any>undefined)
const slidesRef = ref(<any>undefined)

const capacity = ref(0)
const currentLeft = ref(null)
const isDragging = ref(false)
const isMouseDowned = ref(false)
const itemIndex = ref(0)
const itemMargins = ref(0)
const itemWidth = ref(0)
const startItemCount = ref(0)
const startLeft = ref(null)
const timeoutID = ref(undefined)

const currentItem: any = computed(() => {
  if (!(itemIndex.value > (props.items ? props.items : []).length - 1)) return props.items[itemIndex.value]
})
const itemCount = computed(() => {
  return props.items.length
})
const left = computed(() => {
  var t,
      e = null !== itemIndex.value && slidesRef.value ? -1 * ((null !== (t = slidesRef.value.children[itemIndex.value]) && void 0 !== t ? t : {}).offsetLeft - itemMargins.value) : 0;
  return null !== currentLeft.value && null !== startLeft.value ? e + currentLeft.value - startLeft.value : e
})

watch(() => props.switchInterval, (value: any) => {
  clearSwitchTimeout()
  value > 0 && setSwitchTimeout()
})

onMounted(() => {
  setSwitchTimeout()
})

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

function mouseDown(key: any) {
  if (!(startItemCount.value < capacity.value)) {
    let e = key.changedTouches ? key.changedTouches[0] : key;
    isMouseDowned.value = true
    startLeft.value = e.pageX
    currentLeft.value = startLeft.value
    document.addEventListener("mouseup", mouseUp)
    document.addEventListener("touchend", mouseUp)
    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("touchmove", mouseMove)
    document.body.style.userSelect = "none"
  }
}

function mouseMove(key: any) {
  nextTick(() => {
    let r, n = carouselRef.value,
        o = key.target;
    if (n.contains(o)) {
      let c = null !== (r = slidesRef.value.children) && void 0 !== r ? r : [],
          l = (key.changedTouches ? key.changedTouches[0] : key).pageX;
      l != currentLeft.value && (isDragging.value = true, currentLeft.value = l), itemWidth.value = c[0].offsetWidth + 2 * itemMargins.value
    }
  })
}

function mouseUp() {
  let t, e, r = -left.value;
  if (isDragging.value) {
    let n = left.value > 0 && 0 === itemIndex.value,
        o = (null !== (t = currentLeft.value) && void 0 !== t ? t : 0) < (null !== (e = startLeft.value) && void 0 !== e ? e : 0) && itemIndex.value + 1 === itemCount.value;
    n || o || (itemIndex.value = Math.round(Math.abs(r) / itemWidth.value) > 0 ? Math.round(Math.abs(r) / itemWidth.value) : 0)
  }
  isMouseDowned.value = false
  isDragging.value = false
  currentLeft.value = null
  startLeft.value = null
  document.removeEventListener("mouseup", mouseUp)
  document.removeEventListener("touchend", mouseUp)
  document.removeEventListener("mousemove", mouseMove)
  document.removeEventListener("touchmove", mouseMove)
  document.body.style.userSelect = ""
}

function next() {
  clearSwitchTimeout()
  setSwitchTimeout()
  itemIndex.value = itemIndex.value < (props.items ? props.items : []).length - 1 ? itemIndex.value + 1 : 0
}

function setSwitchTimeout() {
  props.switchInterval > 0 && (timeoutID.value = <any>window.setTimeout(next, 1e3 * props.switchInterval))
}

</script>

<template>
  <div :class='["c-carousel-mobile", { "loading-content": items.length <= 1 }]'>
    <div v-if="currentItem" ref="carouselRef" :class='["carousel", { dragging: isDragging && isMouseDowned }]'
         v-on:mousedown="mouseDown"
         v-on:touchstart="mouseDown">
      <div ref="slidesRef" class="slides" :style='{ left: left + "px" }'>
        <div v-for="(item, index) in items" :key="index">
          <div v-if="item.imageMobile !== undefined" class="image"
               :style='{ backgroundImage: "url(" + item.imageMobile + ")" }'
               v-on:dragstart="(t)=>{if (t.preventDefault(), t.target !== t.currentTarget) return null}"
               v-on:click="getRoute(item.targetAddress)"/>
          <div v-else class="image loading-content"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-carousel-mobile {
  display: flex;
  flex-direction: column;
  width: 100%
}

.c-carousel-mobile > .carousel {
  overflow: hidden;
  position: relative;
  width: 100%;
  transition: .3s;
  height: 100%
}

.c-carousel-mobile > .carousel > .slides {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  transition: .3s;
  width: 100%;
  height: 100%
}

.c-carousel-mobile > .carousel > .slides > div {
  display: flex;
  width: 100%;
  flex-shrink: 0;
  position: relative
}

.c-carousel-mobile > .carousel > .slides > div > .c-ad-marker {
  top: 5px;
  right: 5px
}

.c-carousel-mobile > .carousel > .slides > div > .image {
  width: 100%;
  padding-top: 56%;
  background-size: contain
}
</style>