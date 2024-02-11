<script lang="ts" setup>
const props = defineProps({
  count: {
    type: Number,
    default: undefined,
    validator(val: any) {
      return (val != undefined ? val : 0) >= 0
    }
  }
})

const render = () => {
  return (props.count != undefined ? props.count : 0) > 0 ? h("span", {
    class: "c-badge"
  }, "" + props.count) : h("")
}
</script>

<template>
  <render/>
</template>

<style scoped>
.c-badge {
  position: absolute;
  top: 1px;
  right: 1px;
  font-size: 11px;
  background-color: #ff0089;
  color: #fff;
  border-radius: 15px;
  min-width: 14px;
  text-align: center;
  line-height: 14px;
  height: 14px;
  padding: 2px 3px;
  font-weight: 600
}
</style>