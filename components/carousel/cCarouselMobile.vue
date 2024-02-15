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

function mouseDown(val: any) {
  //TODO
}

function mouseMove(val: any) {
  //TODO
}

function mouseUp() {
  //TODO
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
  <div class="c-carousel-mobile">
    <div ref="carouselRef" :class='["carousel", { dragging: isDragging && isMouseDowned }]' v-on:mousedown="mouseDown"
         v-on:touchstart="mouseDown">
      <div ref="slidesRef" class="slides" :style='{ left: left + "px" }'>
        <div v-for="(item, index) in items" :key="index">
          <div v-if="item.imageMobile !== undefined" class="image"
               :style='{ backgroundImage: "url(" + item.imageMobile + ")" }'
               v-on:dragstart="(t)=>{if (t.preventDefault(), t.target !== t.currentTarget) return null}"
               v-on:click="getRoute(item.targetAddress)"/>
          <div v-else class="loading-content"/>
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