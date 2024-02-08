<script lang="ts" setup>
const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: "primary",
    validator(val: any) {
      return ["primary", "red", "default"].includes(val)
    }
  },
  nowrap: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: "m",
    validator(val: any) {
      return ["s", "sm", "m", "l"].includes(val)
    }
  }
})

const attrs = useAttrs()
const emit = defineEmits(["update:checked", "change", "focus", "blur"])

const listeners = computed(() => {
  return Object.assign({}, attrs, {
    focus: focus,
    blur: blur,
    keydown: keyDown
  })
})

function blur(t: any) {
  emit("blur", t)
}

function change(t: any) {
  setChecked(t.target.checked)
}

function focus(t: any) {
  emit("focus", t)
}

function keyDown(t: any) {
  "Enter" !== t.code && "Space" !== t.code || toogle()
}

function setChecked(t: any) {
  props.disabled || emit("change", t), emit("update:checked", t)
}

function toogle(): any {
  setChecked(!props.checked)
}
</script>

<template>
  <label :class='["c-checkbox", mode, size, { nowrap: nowrap, disabled: disabled }]' v-on="listeners">
    <input :disabled="disabled" type="checkbox" :checked="checked" @change="change">
    <span :class='["check-mark", {checked: checked}]'/>
    <slot/>
  </label>
</template>

<style scoped>
.c-checkbox {
  display: flex;
  outline: none;
  cursor: pointer;
  align-items: center;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-checkbox.nowrap {
  white-space: nowrap
}

.c-checkbox > input {
  display: none
}

.c-checkbox > .check-mark {
  width: 21px;
  height: 21px;
  margin: auto 9px auto 0;
  border-radius: 5px;
  background-color: #fff;
  border: 2px solid #596175;
  transition: all .2s ease-in-out;
  flex-shrink: 0;
  position: relative
}

.c-checkbox > .check-mark:after, .c-checkbox > .check-mark:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 21px;
  height: 21px;
  display: block;
  z-index: 1;
  transition: all .3s ease-in-out;
  transform: scale(0);
  opacity: 0
}

.c-checkbox > .check-mark:after {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEgMUw0LjUzOCA4IDEuNSA0LjUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==") no-repeat 50%
}

.c-checkbox > .check-mark:before {
  border-radius: 5px
}

.c-checkbox > .check-mark.checked:after, .c-checkbox > .check-mark.checked:before {
  transform: scale(1.3);
  opacity: 1
}

.c-checkbox.primary > .check-mark, .c-checkbox.primary > .checked {
  border-color: #3f51b5
}

.c-checkbox.primary > .checked:before {
  background-color: #3f51b5
}

.c-checkbox.red > .check-mark, .c-checkbox.red > .checked {
  border-color: #ff324b
}

.c-checkbox.red > .checked:before {
  background-color: #ff324b
}

.c-checkbox.default > .check-mark {
  border: 1px solid #818ca9
}

.c-checkbox.default > .checked {
  border-color: #3f51b5
}

.c-checkbox.default > .checked:before {
  background-color: #3f51b5
}

.c-checkbox.disabled > .check-mark {
  border-color: #d6d6e1
}

.c-checkbox.disabled > .checked {
  background-color: #d6d6e1
}

.c-checkbox:hover > .check-mark {
  transition: .2s
}

.c-checkbox:hover.primary > .check-mark, .c-checkbox:hover.primary > .checked {
  border-color: #4960df
}

.c-checkbox:hover.primary > .checked:before {
  background-color: #4960df
}

.c-checkbox:hover.red > .check-mark {
  border-color: #ff324b
}

.c-checkbox:active.primary > .check-mark, .c-checkbox:active.primary > .checked {
  border-color: #32408f
}

.c-checkbox:active.primary > .checked:before {
  background-color: #32408f
}

.c-checkbox:active.red > .check-mark {
  border-color: #ff324b
}

.c-checkbox.s > .check-mark, .c-checkbox.s > .check-mark:after, .c-checkbox.s > .check-mark:before {
  width: 16px;
  height: 16px
}

.c-checkbox.s > .check-mark.checked:after, .c-checkbox.s > .check-mark.checked:before {
  transform: scale(1.18)
}

.c-checkbox.sm > .check-mark, .c-checkbox.sm > .check-mark:after, .c-checkbox.sm > .check-mark:before {
  width: 18px;
  height: 18px
}

.c-checkbox.sm > .check-mark.checked:after, .c-checkbox.sm > .check-mark.checked:before {
  transform: scale(1.22)
}

.c-checkbox.m > .check-mark, .c-checkbox.m > .check-mark:after, .c-checkbox.m > .check-mark:before {
  width: 20px;
  height: 20px
}

.c-checkbox.l > .check-mark, .c-checkbox.l > .check-mark:after, .c-checkbox.l > .check-mark:before {
  width: 25px;
  height: 25px
}
</style>