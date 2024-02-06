<script lang="ts" setup>
const props = defineProps({
  isUp: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: "#818ca9"
  },
  hoverColor: {
    type: String,
    default: "#818ca9"
  },
  size: {
    type: String,
    default: "m",
    validator(value: string) {
      return ["s", "m", "l"].includes(value)
    }
  },
  mode: {
    type: String,
    default: "normal",
    validator(value: string) {
      return ["normal", "circle"].includes(value)
    }
  },
  isNoShadow: {
    type: Boolean,
    default: false
  },
  styled: {
    type: String,
    default: "normal",
    validator(value: string) {
      return ["normal", "primary"].includes(value)
    }
  }
})

const emit = defineEmits(["click"])


function click(val: any) {
  emit("click", val)
}
</script>

<template>
  <div :class='["c-arrow-svg", size, mode, styled, { "no-shadow": isNoShadow }]'
       :style='{ "--color": color, "--hover-color": hoverColor }' @click="click">
    <div>
      <span class="icon arrow-part1"/>
      <span class="icon arrow-part2"/>
    </div>
  </div>
</template>

<style scoped>
.c-arrow-svg.circle {
  margin-top: 9px !important;
  background-color: #fff;
  box-shadow: 1px 3px 10px 1px rgba(12, 7, 38, .15);
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  position: absolute;
  padding: 5px;
  z-index: 3;
  opacity: 0;
  transition: opacity .3s ease, transform .3s;
  right: 10px;
  left: auto;
  transform: translateX(10px) translateY(calc(20px - 50%))
}

.c-arrow-svg.no-shadow {
  box-shadow: none
}

.c-arrow-svg > div {
  display: flex;
  transform-style: preserve-3d
}

.c-arrow-svg > div > span {
  transition: opacity .3s cubic-bezier(.215, .61, .355, 1), .3s cubic-bezier(.215, .61, .355, 1);
  background-color: var(--color)
}

.c-arrow-svg > div > span:first-of-type {
  opacity: 0;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  margin-left: 5px
}

.c-arrow-svg > div > span:first-of-type, .c-arrow-svg > div > span:last-of-type {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-arrow-svg > div > span:last-of-type {
  -webkit-mask-size: 45%;
  mask-size: 45%;
  margin-left: -25px
}

.c-arrow-svg.primary {
  background-color: #3f51b5
}

.c-arrow-svg.primary > div > span {
  background-color: #fff
}

.c-arrow-svg.s.circle {
  width: 30px;
  height: 30px
}

.c-arrow-svg.s > div > span:first-of-type {
  -webkit-mask-size: 50%;
  mask-size: 50%;
  margin-left: 2px
}

.c-arrow-svg.s > div > span:last-of-type {
  -webkit-mask-size: 35%;
  mask-size: 35%
}

.c-arrow-svg.m.circle {
  width: 40px;
  height: 40px
}

.c-arrow-svg.m > div > span:first-of-type {
  -webkit-mask-size: 70%;
  mask-size: 70%
}

.c-arrow-svg.m > div > span:last-of-type {
  -webkit-mask-size: 45%;
  mask-size: 45%
}

.c-arrow-svg.l.circle {
  width: 50px;
  height: 50px
}

.c-arrow-svg.l > div > span:first-of-type {
  -webkit-mask-size: 90%;
  mask-size: 90%
}

.c-arrow-svg.l > div > span:last-of-type {
  -webkit-mask-size: 50%;
  mask-size: 50%;
  //margin-top: -1px
}

.c-arrow-svg.prev.circle {
  left: 10px;
  right: auto;
  transform: translateX(-10px) translateY(calc(20px - 50%))
}

.c-arrow-svg.prev > div {
  transform: rotate(180deg)
}

.c-arrow-svg.up > div {
  transform: rotate(-90deg)
}

.c-arrow-svg.bottom-right > div {
  transform: rotate(45deg);
  -webkit-clip-path: view-box;
  clip-path: view-box
}

.c-arrow-svg:hover {
  cursor: pointer
}

.c-arrow-svg:hover > div > span {
  background-color: var(--hover-color)
}

.c-arrow-svg:hover > div > span:first-of-type {
  opacity: 1
}

.c-arrow-svg:hover > div > span:last-of-type {
  transform: translateX(4px)
}

.c-arrow-svg:hover.primary {
  background-color: #4960df
}

.c-arrow-svg:hover.primary > div > span {
  background-color: #fff
}

.c-arrow-svg:hover.l > div > span:last-of-type {
  transform: translateX(5px)
}

</style>