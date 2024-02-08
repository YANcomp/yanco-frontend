<script lang="ts" setup>
const props = defineProps({
  iconColor: {
    type: String
  },
  iconColorHover: {
    type: String
  },
  iconColorActive: {
    type: String
  },
  position: {
    type: String,
    default: "top-center",
    validator(val: any) {
      return ["top-center", "top-right", "top-left", "bottom-center", "bottom-right", "bottom-left", "to-left", "to-right", "product-card"].includes(val)
    }
  },
  isMobileTooltip: {
    type: Boolean,
    default: false
  },
  isTextAlignCenter: {
    type: Boolean,
    default: false
  },
  isTextAlignStart: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: "m",
    validator(val: any) {
      return ["s", "m", "l"].includes(val)
    }
  },
  mobileBottomTooltipName: {
    type: String
  },
  isStatic: {
    type: Boolean,
    default: false
  },
  isCheckUpdated: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: "normal",
    validator(val: any) {
      return ["normal", "primary", "crimson"].includes(val)
    }
  }
})

const tooltipRef = ref(<any>{})
const textRef = ref(<any>{})
const arrowLeft = ref("unset")
const arrowTop = ref("unset")
const arrowBottom = ref("unset")
const isTooltipToCenter = ref(false)
const isFirst = ref(true)
const isMobileTooltipActive = ref(false)

const appStore = useAppStore()
const isMobile = computed(() => {
  return appStore.isMobile
})

watch(() => props.isStatic, () => {
  setTimeout(() => {
    init()
  }, 300)
});
watch(() => isMobile, (value: any) => {
  value ? (window.addEventListener("resize", resize), resize()) : (window.removeEventListener("resize", resize), init())

});
watch(() => props.position, () => {
  init()
});

onMounted(() => {
  (window.innerWidth <= 460 || props.isMobileTooltip) && !props.isStatic && (isMobileTooltipActive.value = true), isMobile.value ? (window.addEventListener("resize", resize), resize()) : init()
})

const emit = defineEmits(["close", "show-mobile-tooltip"])

function close() {
  emit("close")
}

function showMobileTooltip() {
  (window.innerWidth <= 460 || props.isMobileTooltip) && emit("show-mobile-tooltip", props.mobileBottomTooltipName)
}

function resize() {
  var e = tooltipRef.value.children[0];
  (window.innerWidth <= 460 || props.isMobileTooltip) && !props.isStatic ? (e.addEventListener("click", showMobileTooltip), isMobileTooltipActive.value = true) : (isMobileTooltipActive.value = false, (isTooltipToCenter.value || isFirst.value) && setTimeout(() => {
    init()
  }, 300))
}

function init() {
  //TODO
  var t = tooltipRef.value,
      div = textRef.value;
  if (isTooltipToCenter.value = false, isFirst.value = false, div.offsetHeight <= 64 && !props.isTextAlignStart ? div.style.textAlign = "center" : props.isTextAlignStart && (div.style.textAlign = "start"), div.offsetHeight <= 64 && (div.children[0].children[0].style.padding = "23px 21px 23px 22px"), props.position.includes("top")) return div.style.top = "-".concat(div.offsetHeight + 16, "px"), arrowTop.value = "".concat(<any>(div.offsetHeight - ("top-center" === props.position ? 0 : 13)), "px"), void ("top-center" === props.position ? (div.style.bottom = "unset", arrowBottom.value = "unset", div.style.top = "-".concat(div.offsetHeight + 16, "px"), arrowTop.value = "".concat(<any>(div.offsetHeight - ("top-center" === props.position ? 0 : 13)), "px"), div.style.left = "-".concat(<any>(div.offsetWidth / 2 - t.offsetWidth / 2), "px"), arrowLeft.value = "".concat(<any>(div.offsetWidth / 2 - 15), "px")) : "top-right" === props.position ? (arrowLeft.value = "unset", div.style.right = "-27px", div.style.left = "unset") : "top-left" === props.position && (div.style.left = "-27px", arrowLeft.value = "46px"));
  if (props.position.includes("bottom")) return div.style.bottom = "-".concat(div.offsetHeight + 16, "px"), arrowTop.value = "bottom-center" === props.position ? "unset" : "-19px", void ("bottom-center" === props.position ? (div.style.top = "unset", arrowTop.value = "unset", div.style.bottom = "-".concat(div.offsetHeight + 16, "px"), arrowTop.value = "bottom-center" === props.position ? "unset" : "-19px", div.style.left = "-".concat(<any>(div.offsetWidth / 2 - t.offsetWidth / 2), "px"), arrowLeft.value = "".concat(<any>(div.offsetWidth / 2 - 15), "px"), arrowBottom.value = "".concat(<any>(div.offsetHeight - ("bottom-center" === props.position ? 0 : 13)), "px")) : "bottom-right" === props.position ? (div.style.top = "unset", arrowLeft.value = "unset", div.style.right = "-27px", div.style.left = "unset") : "bottom-left" === props.position && (div.style.left = "-27px", arrowLeft.value = "46px"));
  if (props.position.includes("to-")) {
    var e = t.children[0];
    return div.style.top = "-".concat(<any>(div.offsetHeight / 2 - e.offsetHeight / 2), "px"), arrowTop.value = "".concat(<any>(div.offsetHeight / 2 - 6), "px"), "to-right" === props.position && (div.style.left = "".concat(t.offsetWidth + 20, "px"), arrowLeft.value = "-21px"), void ("to-left" === props.position && (div.style.right = "38px", div.style.left = "unset"))
  }
  return props.position.includes("product-card") ? (div.style.top = "-".concat(div.offsetHeight + 16, "px"), arrowTop.value = "".concat(<any>(div.offsetHeight - 13), "px"), div.style.left = "-65px", void (arrowLeft.value = "90px")) : void 0
}
</script>

<template>
  <div ref="tooltipRef" :class='["c-tooltip-icon", position, mode, { mobile: isMobile, static: isStatic }]'
       :style='{ "--iconColor": iconColor, "--iconColorHover": iconColorHover || iconColor, "--iconColorActive": iconColorActive || iconColor, "--arrowTop": arrowTop, "--arrowLeft": arrowLeft, "--arrowBottom": arrowBottom }'
       v-on:mouseenter="init">
    <slot name="icon"/>
    <div ref="textRef" v-show="!isMobileTooltipActive" :class="size">
      <div>
        <div :class='{ center: isTextAlignCenter }'>
          <slot name="text"/>
          <span v-if="isStatic" class="icon close2" @click="close"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-tooltip-icon {
  position: relative;
  color: #1e1e1e
}

.c-tooltip-icon > div {
  position: absolute;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  max-width: 290px;
  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, .2));
  z-index: 999;
  font-size: 12px;
  min-width: 154px;
  transition: all .3s ease-in-out;
  opacity: 0;
  visibility: hidden
}

.c-tooltip-icon > div.s {
  max-width: 248px
}

.c-tooltip-icon > div.m {
  max-width: 290px
}

.c-tooltip-icon > div.l {
  max-width: 332px
}

.c-tooltip-icon > div:hover {
  visibility: visible;
  opacity: 1
}

.c-tooltip-icon > div:after, .c-tooltip-icon > div:before {
  content: "";
  display: block;
  position: absolute;
  left: var(--arrowLeft);
  top: var(--arrowTop);
  bottom: var(--arrowBottom);
  background: hsla(0, 0%, 100%, 0);
  border-style: solid;
  border-width: 0 15px 12px
}

.c-tooltip-icon > div > div {
  border-radius: 5px
}

.c-tooltip-icon > div > div > div {
  padding: 19px 18px 21px 20px
}

.c-tooltip-icon > div > div > div.center {
  text-align: center;
  padding: 15px 10px
}

.c-tooltip-icon > div > div > div > .link:hover, .c-tooltip-icon > div > div > div > a:hover {
  cursor: pointer
}

.c-tooltip-icon > .icon {
  background-color: var(--iconColor);
  position: relative;
  margin-right: 0
}

.c-tooltip-icon > .icon.info2 {
  width: 20px;
  height: 20px
}

.c-tooltip-icon > .icon.free-ship, .c-tooltip-icon > .icon.truck2 {
  width: 28px;
  height: 28px
}

.c-tooltip-icon > .icon:hover {
  background-color: var(--iconColorHover)
}

.c-tooltip-icon > .icon:hover ~ div {
  visibility: visible;
  opacity: 1
}

.c-tooltip-icon > .icon:active {
  background-color: var(--iconColorActive)
}

.c-tooltip-icon.normal > div:after, .c-tooltip-icon.normal > div:before {
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #fff
}

.c-tooltip-icon.normal > div > div {
  background-color: #fff
}

.c-tooltip-icon.normal > div > div > div {
  color: #1e1e1e
}

.c-tooltip-icon.normal > div > div > div > .close2 {
  background-color: #8e8e8e
}

.c-tooltip-icon.normal > div > div > div > .link, .c-tooltip-icon.normal > div > div > div > a {
  color: #3f51b5
}

.c-tooltip-icon.normal > div > div > div > .link:hover, .c-tooltip-icon.normal > div > div > div > a:hover {
  color: #4960df
}

.c-tooltip-icon.normal > div > div > div > .link:active, .c-tooltip-icon.normal > div > div > div > a:active {
  color: #32408f
}

.c-tooltip-icon.primary > div:after, .c-tooltip-icon.primary > div:before {
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #3f51b5
}

.c-tooltip-icon.primary > div > div {
  background-color: #3f51b5
}

.c-tooltip-icon.primary > div > div > div {
  color: #fff
}

.c-tooltip-icon.primary > div > div > div > .close2 {
  background-color: #fff
}

.c-tooltip-icon.primary > div > div > div > .link, .c-tooltip-icon.primary > div > div > div > .link:active, .c-tooltip-icon.primary > div > div > div > .link:hover, .c-tooltip-icon.primary > div > div > div > a, .c-tooltip-icon.primary > div > div > div > a:active, .c-tooltip-icon.primary > div > div > div > a:hover {
  color: #ff0089
}

.c-tooltip-icon.crimson > div:after, .c-tooltip-icon.crimson > div:before {
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #ff0089
}

.c-tooltip-icon.crimson > div > div {
  background-color: #ff0089
}

.c-tooltip-icon.crimson > div > div > div {
  color: #fff
}

.c-tooltip-icon.crimson > div > div > div > .close2 {
  background-color: #fff
}

.c-tooltip-icon.crimson > div > div > div > .link, .c-tooltip-icon.crimson > div > div > div > a {
  color: #3f51b5
}

.c-tooltip-icon.crimson > div > div > div > .link:hover, .c-tooltip-icon.crimson > div > div > div > a:hover {
  color: #4960df
}

.c-tooltip-icon.crimson > div > div > div > .link:active, .c-tooltip-icon.crimson > div > div > div > a:active {
  color: #32408f
}

.c-tooltip-icon.static > div {
  opacity: 1;
  visibility: visible
}

.c-tooltip-icon.static > div > div > div {
  padding: 12px 14px 14px 17px
}

.c-tooltip-icon.static > div > div > div > .close2 {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  position: absolute;
  top: 8px;
  right: 0;
  cursor: pointer
}

.c-tooltip-icon.mobile > .icon:active.info2, .c-tooltip-icon.mobile > .icon:hover.info2 {
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOS4xODggMTAuOTEyYTkgOSAwIDExLTE4IDAgOSA5IDAgMDExOCAwem0tOS45My0zLjc2NmExIDEgMCAwMTEtMWguMDA4YTEgMSAwIDExMCAyaC0uMDA4YTEgMSAwIDAxLTEtMXpNOC41IDkuMTc3YS43NS43NSAwIDEwMCAxLjVoMS4yNXYyLjVIOC41YS43NS43NSAwIDAwMCAxLjVoNGEuNzUuNzUgMCAxMDAtMS41aC0xLjI1di0zLjI1YS43NS43NSAwIDAwLS43NS0uNzVoLTJ6IiBmaWxsPSIjM0Y1MUI1Ii8+PC9zdmc+");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOS4xODggMTAuOTEyYTkgOSAwIDExLTE4IDAgOSA5IDAgMDExOCAwem0tOS45My0zLjc2NmExIDEgMCAwMTEtMWguMDA4YTEgMSAwIDExMCAyaC0uMDA4YTEgMSAwIDAxLTEtMXpNOC41IDkuMTc3YS43NS43NSAwIDEwMCAxLjVoMS4yNXYyLjVIOC41YS43NS43NSAwIDAwMCAxLjVoNGEuNzUuNzUgMCAxMDAtMS41aC0xLjI1di0zLjI1YS43NS43NSAwIDAwLS43NS0uNzVoLTJ6IiBmaWxsPSIjM0Y1MUI1Ii8+PC9zdmc+");
  background-color: #3f51b5
}

.c-tooltip-icon.top-center > div:after, .c-tooltip-icon.top-center > div:before {
  transform: rotate(180deg)
}

.c-tooltip-icon.bottom-right > div:after, .c-tooltip-icon.bottom-right > div:before, .c-tooltip-icon.top-right > div:after, .c-tooltip-icon.top-right > div:before {
  border-width: 0 6px 32px;
  transform: rotate(280deg);
  right: 46px
}

.c-tooltip-icon.bottom-left > div:after, .c-tooltip-icon.bottom-left > div:before, .c-tooltip-icon.top-left > div:after, .c-tooltip-icon.top-left > div:before {
  border-width: 0 6px 32px;
  transform: rotate(80deg)
}

.c-tooltip-icon.bottom-right > div:after, .c-tooltip-icon.bottom-right > div:before {
  transform: rotate(260deg)
}

.c-tooltip-icon.bottom-left > div:after, .c-tooltip-icon.bottom-left > div:before {
  transform: rotate(100deg)
}

.c-tooltip-icon.to-left > div, .c-tooltip-icon.to-right > div {
  min-height: 64px
}

.c-tooltip-icon.to-left > div:after, .c-tooltip-icon.to-left > div:before, .c-tooltip-icon.to-right > div:after, .c-tooltip-icon.to-right > div:before {
  transform: rotate(270deg)
}

.c-tooltip-icon.to-left > div > div, .c-tooltip-icon.to-right > div > div {
  min-height: 64px;
  display: flex;
  align-items: center
}

.c-tooltip-icon.to-left > div > div > div, .c-tooltip-icon.to-right > div > div > div {
  width: 100%
}

.c-tooltip-icon.to-left > div:after, .c-tooltip-icon.to-left > div:before {
  transform: rotate(90deg);
  right: -21px
}

.c-tooltip-icon.product-card > div {
  max-width: 214px;
  text-align: center
}

.c-tooltip-icon.product-card > div:after, .c-tooltip-icon.product-card > div:before {
  border-width: 0 6px 32px;
  transform: rotate(80deg)
}
</style>