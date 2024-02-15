<script lang="ts" setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  itemMargin: {
    type: Number,
    default: 0
  },
  isLoaded: {
    type: Boolean,
    default: false
  },
  itemsCount: {
    type: Number,
    default: 0
  },
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  arrowSize: {
    type: String,
    default: "m",
    validator(val: any) {
      return ["s", "m", "l"].includes(val)
    }
  },
  needReset: {
    type: Boolean,
    default: false
  }
})

const itemsRef = ref(<any>undefined)
const carouselRef = ref(<any>undefined)

const offset = ref(0)
const isShowArrows = ref(false)
const itemWidth = ref(0)
const order = ref(0)
const round = ref(0)
const isMovementWas = ref(false)

watch(() => props.isMobile, (value) => {
  if (movement(), value) {
    let e = itemsRef.value;
    if (e.style.transform.length > 0) {
      e.style.transform = ""
      order.value = 0
      round.value = 0
      offset.value = 0;
      for (let i = 0; i < props.itemsCount; i++) e.children[i].style.transform = ""
    }
  }
})
watch(() => props.isLoaded, (value) => {
  value && nextTick(() => {
    resize()
  })
})
watch(() => props.itemsCount, () => {
  nextTick(() => {
    props.needReset && reset()
    resize()
  })
})
watch(() => props.hasLoyalCard, (value) => {
  value && nextTick(() => {
    resize()
  })
})
watch(() => isShowArrows.value, () => {
  movement()
})

onMounted(() => {
  window.addEventListener("resize", resize)
  resize()
  props.isLoaded && movement()
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

function reset() {
  let items = itemsRef.value;
  for (let i in items.style.transform = "translateX(0px)", items.children) isNaN(Number(i)) || (items.children[i].style.transform = "translateX(0px)");
  order.value = 0
  round.value = 0
  offset.value = 0
  movement()
}

function movement() {
  if (props.itemsCount > 2) {
    if (isShowArrows.value && !isMovementWas.value && !props.isMobile) {
      let items = itemsRef.value,
          firstChild = items.firstChild,
          lastChild = items.lastChild;
      null !== lastChild && null !== firstChild && (items.removeChild(lastChild), items.insertBefore(lastChild, firstChild), isMovementWas.value = true)
    }
    if ((!isShowArrows.value || props.isMobile) && isMovementWas.value) {
      let items = itemsRef.value,
          firstChild = items.firstChild;
      null !== firstChild && (items.removeChild(firstChild), items.appendChild(firstChild), isMovementWas.value = false)
    }
  }
}

function resize() {
  let items = itemsRef.value,
      carousel = carouselRef.value;
  if (!props.isMobile && void 0 !== items && 0 !== items.children.length) {
    itemWidth.value = items.children[0].offsetWidth + props.itemMargin;
    let o = Math.round(carousel.clientWidth / itemWidth.value);
    isShowArrows.value = props.itemsCount > o
  }
}

function next() {
  let items = itemsRef.value;
  order.value++, order.value > 0 && [0, -1].includes(round.value) && (round.value = 1), (props.itemsCount * round.value / order.value == 1 || order.value > props.itemsCount * (round.value + 1) && round.value < -1) && round.value++;
  let e = items.children[offset.value],
      o = round.value < 0 ? -1 * round.value : 0 === round.value ? 1 : offset.value === props.itemsCount - 1 ? round.value - 1 : round.value,
      r = order.value <= 0 ? "" + (itemWidth.value * (props.itemsCount * o) * -1 + itemWidth.value * (props.itemsCount * (round.value < -1 && -1 * order.value >= props.itemsCount ? 1 : o))) : "" + (itemWidth.value * (props.itemsCount * o)),
      n = order.value < 0 ? "" + (-itemWidth.value * order.value) : "-" + (itemWidth.value * order.value);
  e.style.transform = "translateX(".concat(r, "px)"), items.style.transform = "translateX(".concat(n, "px)"), offset.value = offset.value + 1 === props.itemsCount ? 0 : offset.value + 1
}

function prev() {
  let items = itemsRef.value;
  order.value--, order.value < 0 && [0, 1].includes(round.value) && (round.value = -1), (props.itemsCount * round.value / order.value == -1 || order.value < 0 && props.itemsCount * round.value * -1 / order.value == -1 || order.value < props.itemsCount * (round.value - 1) && round.value > 1) && round.value--;
  let e = offset.value - 1 < 0 ? props.itemsCount - 1 : offset.value - 1,
      o = items.children[e],
      r = round.value < 0 ? -1 * (0 === e ? round.value + 1 : round.value) : 0 === round.value ? 1 : round.value,
      n = order.value < 0 ? "-" + (itemWidth.value * (props.itemsCount * r)) : "" + (itemWidth.value * (props.itemsCount * r) + itemWidth.value * (props.itemsCount * (round.value > 1 && order.value >= props.itemsCount ? r - (r - 1) : r)) * -1),
      d = order.value < 0 ? "" + (-itemWidth.value * order.value) : "-" + (itemWidth.value * order.value);
  o.style.transform = "translateX(".concat(n, "px)"), items.style.transform = "translateX(".concat(d, "px)"), offset.value = e
}
</script>

<template>
  <div :class='["c-slider", { mobile: isMobile }]'>
    <LazyUiCArrowSVG v-if="!isMobile && isShowArrows" class="prev" :size="arrowSize" mode="circle" @click="prev"/>
    <div ref="carouselRef" class="carousel">
      <div ref="itemsRef" class="list"
           :style='{ "margin-left": isShowArrows && !isMobile && itemsCount > 2 ? "-" + itemWidth + "px" : 0 }'>
        <slot/>
      </div>
    </div>
    <LazyUiCArrowSVG v-if="!isMobile && isShowArrows" :size="arrowSize" mode="circle" @click="next"/>
  </div>
</template>

<style scoped>
.c-slider {
  align-items: center;
  position: relative;
  max-width: 1368px;
  margin: auto auto 30px
}

.c-slider > div, .c-slider {
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden
}

.c-slider > div::-webkit-scrollbar {
  display: none
}

.c-slider > div > .list {
  display: flex;
  flex-flow: row nowrap;
  transition: .3s
}

.c-slider > div > .list > .c-product-card:not(.mobile) {
  margin-right: 21px
}

.c-slider:hover > :deep(.c-arrow-svg) {
  transform: translateX(0) translateY(calc(20px - 50%));
  opacity: 1
}

.c-slider.mobile > div > .list {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 2px
}

.c-slider.mobile > div > .list::-webkit-scrollbar {
  display: none
}

</style>