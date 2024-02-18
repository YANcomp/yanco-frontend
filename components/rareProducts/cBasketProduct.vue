<script lang="ts" setup>
const props = defineProps({
  count: {
    type: Number
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  productLimit: {
    type: <any>Number
  }
})

const emit = defineEmits(["count-changed"])

const changeID = ref(0)
const isTouchMin = ref(false)
const isTouchMax = ref(false)
const itemCountStr = ref("1")
const itemCount = ref(1)

watch(() => props.count, (t: any) => {
  itemCount.value !== t && (itemCount.value = t)
})
watch(() => itemCount.value, (t: any) => {
  itemCountStr.value = "".concat(t)
})

function touchMaxStart() {
  isTouchMax.value = true
}

function touchMinStart() {
  isTouchMin.value = true
}

function touchMaxEnd() {
  isTouchMax.value = false
}

function touchMinEnd() {
  isTouchMin.value = false
}

function changeItemCount(t: any) {
  t < 1 || t > props.productLimit || (itemCount.value = t, commit())
}

function checkItemCount(t: any) {
  let e = t.replace(/[^\d]|^0/, ""),
      n = Number(e) < props.productLimit ? e : "".concat(props.productLimit);
  itemCountStr.value = Number(n) < 1 ? "1" : n
}

function commit() {
  changeID.value++;
  changeID.value;
  emit("count-changed", itemCount.value)
}

function itemDec() {
  itemCount.value--
  commit()
}

function itemInc() {
  itemCount.value++
  commit()
}
</script>

<template>
  <div :class='["c-rare-item-counter", { mobile: isMobile }]'>
    <div v-if="isLoading" class="loading">
      <span class="icon spinner"/>
    </div>
    <div class="quantity">
      <button :class='{ touch: isTouchMin, mobile: isMobile }' :disabled="1 === itemCount" @click="itemDec"
              v-on:touchstart="touchMinStart"
              v-on:touchend="touchMinEnd">
        <span class="icon minus"/>
      </button>
      <UiCEdit class="count" is-hide-status v-on:change="(e)=>{changeItemCount(Number(e.target.value))}"
               v-on:input="(e)=>{checkItemCount(e.target.value)}" v-model:value="itemCountStr"/>
      <button :class='{ touch: isTouchMax, mobile: isMobile }' :disabled="itemCount === productLimit" @click="itemInc"
              v-on:touchstart="touchMaxStart"
              v-on:touchend="touchMaxEnd">
        <span class="icon plus2"/>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>