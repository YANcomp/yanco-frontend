<script lang="ts" setup>
const props = defineProps({
  mode: {
    type: String,
    default: "normal",
    validator(value: string) {
      return ["normal", "orange", "primary", "gradient", "crimson", "disabled", "custom", "custom gradient", "white-to-crimson", "red", "green", "white", "dark-green"].includes(value)
    }
  },
  type: {
    type: String,
    default: "button",
    validator(value: string) {
      return ["button", "submit", "reset"].includes(value)
    }
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: "m",
    validator(value: string) {
      return ["s", "m", "l", "xl", "xxl"].includes(value)
    }
  },
  customStyle: {
    type: <any>Object
  },
  dontUpperCase: {
    type: Boolean,
    default: false
  },
  isJustText: {
    type: Boolean,
    default: false
  }
})


const isTouch = ref(false)
const isMobile = computed(() => {
  return useAppStore().isMobile
})

const emit = defineEmits(["click"])

function click(val: any) {
  if (isMobile) {
    setTimeout(() => {
      emit("click", val)
    }, ["white-to-crimson", "gradient"].includes(props.mode) ? 300 : 100)
  } else {
    emit("click", val)
  }
}

function touchStart() {
  isTouch.value = true
}

function touchEnd() {
  setTimeout(() => {
    isTouch.value = false
  }, ["white-to-crimson", "gradient"].includes(props.mode) ? 300 : 100)
}

function mouseDown() {
  isTouch.value = true
}

function mouseUp() {
  setTimeout(() => {
    isTouch.value = false
  }, ["white-to-crimson", "gradient"].includes(props.mode) ? 300 : 100)
}

function touchMove(val: any) {
  // TODO console.log(val)
}
</script>

<template>
  <button ref="btn"
          :class='[
            "c-button", mode, size, {active: isTouch, touch: isTouch, loading: isLoading, mobile: isMobile, gradient: (customStyle ? customStyle : {}).position, "not-color": (customStyle ? customStyle.color !== undefined : false), "not-position": (customStyle ? customStyle.position !== undefined : false), "not-upper-case": dontUpperCase, "just-text": isJustText}
          ]'
          :style='customStyle ? {"--background": customStyle.background, "--hover": customStyle.hover, "--active": customStyle.active, "--color": customStyle.color, "--position": customStyle.position} : {}'
          :disabled="disabled"
          @touchstart="touchStart" @touchend="touchEnd" @touchcancel="touchEnd" @touchmove="touchMove"
          @mousedown="mouseDown" @mouseup="mouseUp" @mouseout="mouseUp" v-on:click="click"
  >
    <span v-show="isLoading" class="icon spinner"/>
    <span v-show="!isLoading" class="caption">
      <slot/>
    </span>
  </button>
</template>

<style scoped>
.c-button {
  font-family: Montserrat, sans-serif;
  position: relative;
  display: inline-flex;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 5px;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  transition: all .3s, color 0s, background .3s ease-in-out;
  padding: 8px 4px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: .065em;
  text-transform: uppercase;
  width: 100%
}

.c-button.not-upper-case {
  text-transform: unset
}

.c-button > .spinner {
  margin: auto;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #fff
}

.c-button > .caption {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-evenly
}

.c-button > .caption > .icon {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #fff
}

.c-button > .caption > .checkout {
  font-size: 10px
}

.c-button.loading {
  pointer-events: none
}

.c-button.loading:before {
  content: "";
  box-sizing: border-box;
  z-index: 1;
  display: block;
  border-radius: inherit;
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px
}

.c-button.loading {
  cursor: default
}

.c-button.normal {
  background: transparent;
  border-color: #3f51b5;
  color: #3f51b5
}

.c-button.normal .icon {
  background-color: #3f51b5
}

.c-button.normal:not(.mobile):hover {
  border-color: #4960df;
  color: #4960df
}

.c-button.normal:not(.mobile):hover .icon {
  background-color: #4960df
}

.c-button.normal.touch, .c-button.normal:not(.mobile).active {
  border-color: #818ca9;
  color: #818ca9
}

.c-button.orange {
  background: #ff7a00;
  border-color: #ff7a00;
  color: #fff
}

.c-button.orange .icon {
  background-color: #fff
}

.c-button.orange:not(.mobile):hover {
  background-color: #ffae63;
  border-color: #ffae63;
  color: #fff
}

.c-button.orange:not(.mobile):hover .icon {
  background-color: #fff
}

.c-button.orange.touch, .c-button.orange:not(.mobile).active {
  background-color: #dd6a00
}

.c-button.primary {
  background-color: #3f51b5;
  border-color: #3f51b5;
  color: #fff
}

.c-button.primary:not(.mobile):hover {
  background-color: #4960df
}

.c-button.primary.loading, .c-button.primary.touch, .c-button.primary:not(.mobile).active {
  background-color: #32408f
}

.c-button.red {
  background-color: #f14a4a;
  border-color: #f14a4a;
  color: #fff
}

.c-button.red:not(.mobile):hover {
  background-color: #f36363
}

.c-button.red.loading, .c-button.red.touch, .c-button.red:not(.mobile).active {
  background-color: #db3a3a
}

.c-button.white {
  background-color: #fff;
  border-color: transparent;
  color: #1e1e1e;
  font-weight: 500
}

.c-button.white:not(.mobile):hover {
  border-color: #4960df
}

.c-button.white:not(.mobile).active {
  border-color: #32408f
}

.c-button.white.loading, .c-button.white.touch {
  border-color: #4960df
}

.c-button.green {
  background-color: #19be6b;
  border-color: #19be6b;
  color: #fff
}

.c-button.green:not(.mobile):hover {
  background-color: #07d088
}

.c-button.green.loading, .c-button.green.touch, .c-button.green:not(.mobile).active {
  background-color: green
}

.c-button.crimson {
  background-color: #ff0089;
  border-color: #ff0089;
  color: #fff
}

.c-button.crimson.touch, .c-button.crimson:not(.mobile):hover {
  background-color: #cc006e;
  border-color: #cc006e
}

.c-button.white-to-crimson {
  background: transparent;
  border-color: #ff0089;
  color: #ff0089;
  transition: all .3s ease-in-out, color .3s ease-in-out
}

.c-button.white-to-crimson:not(.mobile):hover {
  background-color: #ff0089;
  border-color: #ff0089;
  color: #fff
}

.c-button.white-to-crimson.touch, .c-button.white-to-crimson:not(.mobile).active {
  background-color: #cc006e;
  border-color: #cc006e;
  color: #fff
}

.c-button.gradient {
  background: linear-gradient(92.59deg, #f9028a, #484db2, #f841aa, #5c45fb) 0 50%/300% 100%;
  border: none;
  color: #fff
}

.c-button.gradient.touch, .c-button.gradient:not(.mobile):hover {
  background-position: 55% 50% !important
}

.c-button.dark-green {
  background-color: #005e01;
  border-color: #005e01;
  color: #fff
}

.c-button.dark-green:not(.mobile):hover {
  background-color: green
}

.c-button.dark-green.loading, .c-button.dark-green.touch, .c-button.dark-green:not(.mobile).active {
  background-color: #004902
}

.c-button.custom {
  background: var(--background);
  border-color: var(--background);
  color: var(--color)
}

.c-button.custom.not-color {
  color: #fff
}

.c-button.custom:not(.mobile).gradient:hover {
  background-position: var(--position) !important
}

.c-button.custom:not(.mobile).gradient:hover.not-position {
  background-position: 55% 50% !important
}

.c-button.custom:not(.mobile):not(.gradient).not-position:hover {
  background: var(--hover);
  border-color: var(--hover)
}

.c-button.custom.touch:not(.gradient).not-position, .c-button.custom:not(.mobile):not(.gradient).active.not-position {
  background: var(--active);
  border-color: var(--active)
}

.c-button.just-text {
  border: none;
  text-transform: unset
}

.c-button.disabled, .c-button:disabled {
  color: #fff;
  background-color: #d6d6e1;
  border-color: #d6d6e1;
  pointer-events: none
}

.c-button.disabled.just-text, .c-button:disabled.just-text {
  cursor: not-allowed;
  background-color: unset;
  color: #8e8e8e;
  border-color: unset;
  pointer-events: unset
}

.c-button.disabled {
  font-size: 10px
}

.c-button.s {
  max-width: 120px;
  height: 40px
}

.c-button.m {
  max-width: 166px;
  height: 40px
}

.c-button.l {
  max-width: 188px;
  height: 40px
}

.c-button.xl {
  max-width: 304px;
  height: 40px
}

.c-button.xxl {
  max-width: 304px;
  height: 50px;
  font-size: 16px
}

.c-button.mobile {
  font-size: 10px;
  -webkit-tap-highlight-color: transparent
}

.c-button.mobile.s {
  max-width: 124px;
  height: 38px
}

.c-button.mobile > .caption > .icon {
  -webkit-mask-size: 90%;
  mask-size: 90%
}

.c-button.mobile.xl {
  max-width: 314px;
  height: 38px
}

.c-button.mobile.active.disabled, .c-button.mobile.active:disabled, .c-button.mobile.touch.disabled, .c-button.mobile.touch:disabled, .c-button.mobile:hover.disabled, .c-button.mobile:hover:disabled {
  color: #fff;
  background-color: #d6d6e1;
  border-color: #d6d6e1;
  pointer-events: none
}

.c-button.mobile.active.disabled, .c-button.mobile.touch.disabled, .c-button.mobile:hover.disabled {
  font-size: 10px
}

</style>