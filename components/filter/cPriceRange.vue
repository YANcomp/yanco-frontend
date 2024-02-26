<script lang="ts" setup>
const props = defineProps({
  max: {
    type: <any>Number
  },
  min: {
    type: <any>Number
  },
  minRange: {
    type: <any>Number,
    default: 10
  },
  resetID: {
    type: <any>Number
  },
  internalMax: {
    type: <any>Number
  },
  internalMin: {
    type: <any>Number
  }
})

const emit = defineEmits(["change", "dragging"])
const sliderRef = ref(<any>undefined)

const currentMax = ref(<any>props.max)
const currentMin = ref(<any>props.min)
const cursorLeft = ref(<any>undefined)
const isDragging = ref(<any>false)
const isLeft = ref(<any>false)
const startPercent = ref(<any>undefined)
const isChanginMin = ref(<any>false)
const isChanginMax = ref(<any>false)

const end = computed(() => {
  let e = 100 - (props.max! - props.min! - (props.max! - currentMax.value!)) / weight.value;
  return e >= 0 ? e : 0
})
const start = computed(() => {
  let e = (currentMin.value! - props.min!) / weight.value
  return e >= 0 ? e : 0
})
const weight = computed(() => {
  return (props.max! - props.min!) / 100
})
const inOnePrice = computed(() => {
  return props.max === props.min
})

watch(() => props.max, (value) => {
  currentMax.value = isFinite(value!) ? value : ""
})
watch(() => props.min, (value) => {
  currentMin.value = isFinite(value!) ? value : ""
})
watch(() => props.resetID, () => {
  currentMin.value = props.min
  currentMax.value = props.max
})
watch(() => props.internalMax, (value) => {
  value !== currentMax.value && undefined !== value && changeMax(value)
  undefined === value && (currentMax.value = props.max)
})
watch(() => props.internalMin, (value) => {
  value !== currentMin.value && undefined !== value && changeMin(value)
  undefined === value && (currentMin.value = props.min)
})

function change(e: any, t: any, r?: any) {
  //TODO ??? false === isDragging.value && currentMin.value === e && currentMax.value === t && $forceUpdate()
  currentMin.value = e
  currentMax.value = t
  false === isDragging.value && r && (currentMin.value === props.min && currentMax.value === props.max ? emit("change", undefined, undefined) : emit("change", currentMin.value, currentMax.value))
}

function changeCurrentMax(e: any, t?: any) {
  let r = Math.round(e),
      o = currentMin.value;
  r > props.max ? r = props.max : r <= props.min + props.minRange ? (r = props.min + props.minRange, o = props.min) : r <= currentMin.value + props.minRange ? o = r - props.minRange : isNaN(r) && (r = currentMax.value)
  change(o, r, t)
}

function changeCurrentMin(e: any, t?: any) {
  let r = Math.round(e),
      o = currentMax.value;

  r < props.min ? r = props.min : r >= props.max - props.minRange ? (r = props.max - props.minRange, o = props.max) : r >= o - props.minRange ? o = r + props.minRange : isNaN(r) && (r = currentMin.value)
  change(r, o, t)
}

function changeMax(e: any) {
  "number" == typeof e ? changeCurrentMax(e, false) : changeCurrentMax(Number(e.target.value))
}

function changeMin(e: any) {
  "number" == typeof e ? changeCurrentMin(e, false) : changeCurrentMin(Number(e.target.value))
}

function mouseDown(e: any, t: any) {
  let r = e.changedTouches ? e.changedTouches[0] : e;
  isLeft.value = t
  isDragging.value = true
  cursorLeft.value = r.pageX
  startPercent.value = t ? start.value : end.value
  t ? isChanginMin.value = true : isChanginMax.value = true
  document.addEventListener("mousemove", mouseMove)
  document.addEventListener("mouseup", mouseUp)
  document.addEventListener("touchmove", mouseMove)
  document.addEventListener("touchend", mouseUp)
  document.body.style.userSelect = "none"
  emit("dragging", isDragging.value)
}

function mouseMove(e: any) {
  let t = e.changedTouches ? e.changedTouches[0] : e,
      r = sliderRef.value.clientWidth / 100,
      o = t.pageX - cursorLeft.value,
      n = isLeft.value ? o / r : -o / r;
  isLeft.value ? changeCurrentMin(props.min! + (startPercent.value! + n) * weight.value) : changeCurrentMax(props.max! - (startPercent.value! + n) * weight.value)
}

function mouseUp() {
  isDragging.value = false
  cursorLeft.value = undefined
  startPercent.value = undefined
  isChanginMin.value = false
  isChanginMax.value = false
  currentMin.value === props.min && currentMax.value === props.max ? emit("change", undefined, undefined) : emit("change", currentMin.value, currentMax.value)
  document.removeEventListener("mousemove", mouseMove)
  document.removeEventListener("touchmove", mouseMove)
  document.removeEventListener("mouseup", mouseUp)
  document.removeEventListener("touchend", mouseUp)
  document.body.style.userSelect = ""
  emit("dragging", isDragging.value)
}
</script>

<template>
  <div :class='["c-price-range", { disabled: inOnePrice }]'>
    <div class="prices">
      <span>{{ min }} ₽</span>
      <span>{{ max }} ₽</span>
    </div>
    <div ref="sliderRef" class="slider">

      <span class="current-range" :style='{ left: start + "%", right: end + "%" }'/>
      <span class="slider-handle" :style='{ left: start + "%" }' v-on:mousedown="(t:any)=>{mouseDown(t, true)}"
            v-on:touchstart="(t:any)=>{mouseDown(t, true)}"/>
      <span class="slider-handle" :style='{ right: end + "%" }' v-on:mousedown="(t:any)=>{mouseDown(t, false)}"
            v-on:touchstart="(t:any)=>{mouseDown(t, false)}"/>
    </div>
    <div class="editors">
      <div :class='["min", { changed: currentMin !== min }]'>
        <UiCEdit :class='{ "show-border": isChanginMin }' :placeholder="currentMin.toString()"
                 :value="currentMin.toString()"
                 :is-hide-status="true"
                 v-on:change="changeMin"/>
      </div>
      <div :class='["max", { changed: currentMax !== max }]'>
        <UiCEdit :class='{ "show-border": isChanginMax }' :placeholder="currentMax.toString()"
                 :value="currentMax.toString()"
                 :is-hide-status="true"
                 v-on:change="changeMax"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-price-range {
  padding: 16px;
  width: 318px;
  box-sizing: border-box
}

.c-price-range > .prices {
  font-weight: 400;
  font-size: 14px;
  color: #1a1a1a
}

.c-price-range > .editors, .c-price-range > .prices {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.c-price-range > .editors > div {
  margin: 0 5px;
  position: relative
}

.c-price-range > .editors > :deep(div) > .c-edit {
  width: 112px
}

.c-price-range > .editors > :deep(div) > .c-edit > div > input {
  margin-top: 2px;
  padding: 0 22px 0 28px;
  text-align: right;
  background: #ebf0f9;
  font-weight: 500;
  border-radius: 5px;
  font-size: 14px;
  color: #818ca9;
  border: 1px solid #ebf0f9;
  height: 34px
}

.c-price-range > .editors > :deep(div) > .c-edit > div > input:focus {
  box-shadow: none;
  border-color: #3f51b5
}

.c-price-range > .editors > :deep(div) > .c-edit > div:after, .c-price-range > .editors > :deep(div) > .c-edit > div:before {
  font-weight: 500;
  font-size: 14px;
  content: "₽";
  top: 9px;
  right: -3px;
  width: 20px;
  position: absolute;
  color: #818ca9
}

.c-price-range > .editors > :deep(div) > .c-edit.show-border {
  border-color: #3f51b5
}

.c-price-range > .editors > :deep(div.min) > .c-edit > div:before {
  content: "от";
  left: 7px
}

.c-price-range > .editors > :deep(div.max) > .c-edit > div:before {
  content: "до";
  left: 7px
}

.c-price-range > .editors > :deep(div.changed) > .c-edit, .c-price-range > .editors > :deep(div.changed) > .c-edit > div:after, .c-price-range > .editors > :deep(div.changed) > .c-edit > div > input {
  color: #1a1a1a
}

.c-price-range > .slider {
  height: 4px;
  width: calc(100% - 25px);
  margin: 10px auto 20px;
  background-color: #eee;
  border-radius: 5px;
  display: flex;
  position: relative
}

.c-price-range > .slider > .current-range {
  background-color: #3f51b5;
  position: absolute;
  height: 4px
}

.c-price-range > .slider > .slider-handle {
  height: 20px;
  width: 20px;
  position: absolute;
  top: -10px;
  margin: auto -10px;
  background-color: #3f51b5;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff
}

.c-price-range > .slider > .slider-handle:active {
  z-index: 1
}

.c-price-range.disabled {
  pointer-events: none;
  opacity: .4
}
</style>