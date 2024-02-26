<script lang="ts" setup>
const UiCRadio = resolveComponent('UiCRadio')
// const value = defineModel()
const emit = defineEmits(["update:value"])
const slots = useSlots()
const slotsDefault = <any>slots.default?.()
const props = defineProps({
  value: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: !1
  }
})

function change(t: any) {
  emit("update:value", t)
}

const render = () => {
  var n = slotsDefault.length > 1 ? slotsDefault : slotsDefault[0].children;
  if (n.length < 1) return h("");
  var c = n.map((n: any, i: any) => {
    var c, l, d, o, m;
    if (n) {
      var body = n.children ? n.children : [],
          f = n.props ? n.props : {},
          v = (null !== (d = n.props) && void 0 !== d ? d : {}).staticClass,
          V = null !== (m = (null !== (o = n.props) && void 0 !== o ? o : {}).class) && void 0 !== m ? m : [],
          y = [v].concat(V).filter((i) => {
            return void 0 !== i
          });
      return h(UiCRadio, {
        value: f.value,
        checked: f.value === props.value && !f.disabled,
        class: y,
        disabled: f.disabled,
        "onUpdate:checked": (t: any) => {
          return change(t)
        }
      }, body)
    }
  });
  return h("div", c)
}
</script>

<template>
  <render/>
</template>