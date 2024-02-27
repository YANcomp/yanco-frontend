<script lang="ts" setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: !1
  },
  forArticle: {
    type: Boolean,
    default: !1
  },
  image: {
    type: String,
    default: ""
  },
  imageTitle: {
    type: String
  },
  isMobile: {
    type: Boolean,
    default: !1
  },
  scale: {
    type: Number,
    validator(val: any) {
      return val > 0
    },
    default: 1
  },
  zoomedImage: {
    type: String,
    default: ""
  }
})

const zoomed = ref(false)
const zoomRef = ref(<any>undefined)
const zoomImageRef = ref(<any>undefined)
const normalRef = ref(<any>undefined)

const imageURL = computed(() => {
  return props.zoomedImage || props.image
})

onMounted(() => {
  zoomRef.value.style.transform = "scale(" + props.scale + ")"
})

function move(t: any) {
  let e = t.changedTouches ? t.changedTouches[0] : t,
      o = pageOffset(zoomImageRef.value),
      r = zoomRef.value,
      n = normalRef.value,
      c = e.clientX - o.x + window.pageXOffset,
      d = e.clientY - o.y + window.pageYOffset,
      l = c / n.offsetWidth,
      v = d / n.offsetHeight,
      h = l * (r.offsetWidth * props.scale - n.offsetWidth),
      m = v * (r.offsetHeight * props.scale - n.offsetHeight);
  r.style.left = "" + -h + "px"
  r.style.top = "" + -m + "px"
}

function pageOffset(t: any) {
  let e, o, rect = t.getBoundingClientRect(),
      r = null !== (e = window.pageXOffset) && void 0 !== e ? e : document.documentElement.scrollLeft,
      n = null !== (o = window.pageYOffset) && void 0 !== o ? o : document.documentElement.scrollTop;
  return {
    y: rect.top + n,
    x: rect.left + r
  }
}

function unzoom() {
  zoomed.value = !1;
  let t = zoomImageRef.value;
  void 0 !== t && (t.removeEventListener("mouseleave", unzoom), t.removeEventListener("touchend", unzoom), t.removeEventListener("mousemove", move), t.removeEventListener("touchmove", move))
  props.isMobile && (document.body.style.overflow = "")
}

function zoom() {
  if (!props.disabled) {
    zoomed.value = !0;
    let t = zoomImageRef.value
    void 0 !== t && (t.addEventListener("mouseleave", unzoom), t.addEventListener("touchend", unzoom), t.addEventListener("mousemove", move), t.addEventListener("touchmove", move))
    props.isMobile && (document.body.style.overflow = "hidden")
  }
}
</script>

<template>
  <div ref="zoomImageRef" :class='["c-zoom-image", { zoomed: zoomed, "for-article": forArticle }]'
       v-on:mouseenter="zoom" v-on:touchstart="zoom">
    <div v-if="!isMobile" class="icon-zoom">
      <span class="icon zoom-image"/>
    </div>
    <img ref="normalRef" class="normal" :alt="imageTitle" :src="image" itemprop="image" width="100%" height="100%"/>
    <img ref="zoomRef" class="zoom" :alt="imageTitle" :src="imageURL" width="100%" height="100%"/>
  </div>
</template>

<style scoped>
.c-zoom-image {
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 390px;
  width: 390px
}

.c-zoom-image.for-article {
  height: 460px;
  width: 460px
}

.c-zoom-image.for-article > img {
  max-height: 460px;
  max-width: 460px
}

.c-zoom-image > .icon-zoom {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #596175;
  padding: 8px;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  cursor: zoom-in
}

.c-zoom-image > .icon-zoom > .zoom-image {
  margin-right: 0;
  width: 30px;
  height: 30px;
  background-color: #fff
}

.c-zoom-image.zoomed > .icon-zoom, .c-zoom-image.zoomed > .zoom {
  opacity: 1
}

.c-zoom-image.zoomed > .normal {
  opacity: 0
}

.c-zoom-image > img {
  max-height: 390px;
  max-width: 390px
}

.c-zoom-image > .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left
}

.c-zoom-image > .zoom:hover {
  cursor: zoom-in
}
</style>