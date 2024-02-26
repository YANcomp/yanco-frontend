<script lang="ts" setup>
const props = defineProps({
  position: {
    type: String,
    default: "left",
    validator(val: any) {
      return ["left", "center", "right"].includes(val)
    }
  }
})

const dropDownRef = ref(<any>undefined)
const left = ref(0)
const marginLeft = ref(0)
const taleLeft = ref(10)

onMounted(() => {
  let e = dropDownRef.value.offsetWidth;
  "center" === props.position && (left.value = 45, taleLeft.value = 50, marginLeft.value = .5 * -e)
  "right" === props.position && (left.value = 90, taleLeft.value = 90, marginLeft.value = .9 * -e)
})
</script>

<template>
  <div class="c-drop-down" ref="dropDownRef" :style='{ left: left + "%", "margin-left": marginLeft + "px" }'>
    <span :style='{ left: taleLeft + "%" }'/>
    <div>
      <div>
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-drop-down {
  position: absolute;
  top: 20px;
  padding-top: 17px;
  filter: drop-shadow(3px 3px 15px rgba(0, 0, 0, .2));
  z-index: 5
}

.c-drop-down > span {
  display: block;
  content: "";
  position: absolute;
  top: 6px;
  transform: translateX(-50%);
  background: hsla(0, 0%, 100%, 0);
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #fff;
  border-style: solid;
  border-width: 0 12px 12px
}

.c-drop-down > div {
  background-color: #fff;
  border-radius: 5px
}
</style>