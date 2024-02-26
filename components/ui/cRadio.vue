<script lang="ts" setup>
const props = defineProps({
  value: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  checked: {
    type: Boolean,
    default: !1
  },
  nowrap: {
    type: Boolean,
    default: !1
  },
  mode: {
    type: String,
    default: "primary",
    validator(val: any) {
      return ["primary", "red"].includes(val)
    }
  }
})

const attrs = useAttrs()
const emit = defineEmits(["change", "focus", "blur", "update:checked"])
const listeners = computed(() => {
  return {
    ...attrs,
    focus: focus,
    blur: blur,
    keydown: keyDown,
    change: change
  }
})

function change() {
  setChecked()
  emit("change", props.value)
}

function focus(t: any) {
  emit("focus", t)
}

function blur(t: any) {
  emit("blur", t)
}

function keyDown(t: any) {
  "Enter" !== t.code && "Space" !== t.code || (t.preventDefault(), toogle())
}

function toogle() {
  setChecked()
}

function setChecked() {
  props.disabled || emit("update:checked", props.value)
}
</script>

<template>
  <label :class='["c-radio-button", mode, { nowrap: nowrap, disabled: disabled }]' v-on="listeners">
    <input :disabled="disabled" type="radio" :value="value" :checked="checked">
    <span class="radio"/>
    <slot/>
  </label>
</template>

<style scoped>
.c-radio-button {
  display: flex;
  outline: none;
  cursor: pointer;
  align-items: center;
  margin-bottom: 6px
}

.c-radio-button.disabled {
  color: #c9c9c9;
  pointer-events: none
}

.c-radio-button.disabled > .radio {
  border-color: #d6d6e1
}

.c-radio-button.disabled > .radio:after {
  background-color: #d6d6e1
}

.c-radio-button.nowrap {
  white-space: nowrap
}

.c-radio-button > input {
  display: none
}

.c-radio-button > input:checked + .radio:after {
  opacity: 1;
  transform: scale(1);
  transition: all .3s ease-in-out
}

.c-radio-button > .radio {
  position: relative;
  width: 19px;
  height: 19px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: #fff;
  border: 1.5px solid;
  transition: all .3s ease-in-out
}

.c-radio-button > .radio:after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  left: 4.5px;
  top: 4.5px;
  border-radius: 50%;
  opacity: 0;
  transition: all .3s ease-in-out;
  transform: scale(0)
}

.c-radio-button.primary > .radio {
  border-color: #3f51b5
}

.c-radio-button.primary > .radio:after {
  background-color: #3f51b5
}

.c-radio-button.primary:hover > .radio {
  border-color: #4960df
}

.c-radio-button.primary:hover > .radio:after {
  background-color: #4960df
}

.c-radio-button.primary:active > .radio {
  border-color: #32408f
}

.c-radio-button.primary:active > .radio:after {
  background-color: #32408f
}

.c-radio-button.red {
  color: #ff324b
}

.c-radio-button.red > .radio {
  border-color: #ff324b
}

.c-radio-button.red > .radio:after {
  background-color: #ff324b
}

</style>