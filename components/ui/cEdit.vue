<script lang="ts" setup>
// const valueComp:any = defineModel()

const attrs = useAttrs()
const emit = defineEmits(["update:value", "update:code", "input", "change", "keydown", "focus"])

const props = defineProps({
  cols: {
    type: Number,
    default: 20
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  isClear: {
    type: Boolean,
    default: false
  },
  isConfirmationCode: {
    type: Boolean,
    default: false
  },
  isError: {
    type: Boolean,
    default: false
  },
  isLazy: {
    type: Boolean,
    default: false
  },
  isPassword: {
    type: Boolean,
    default: false
  },
  isShowIcon: {
    type: Boolean,
    default: false
  },
  isValid: {
    type: Boolean,
    default: false
  },
  isWarning: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: "singleline",
    validator(value: string) {
      return ["singleline", "multiline"].includes(value)
    }
  },
  placeholder: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  resize: {
    type: String,
    default: "vertical",
    validator(value: string) {
      return ["vertical", "horizontal", "none", "both"].includes(value)
    }
  },
  rows: {
    type: Number,
    default: 1
  },
  type: {
    type: String,
    default: "text",
    validator(value: string) {
      return ["text", "number", "password", "email", "tel"].includes(value)
    }
  },
  value: {
    type: String,
    default: ""
  },
  codeLength: {
    type: Number,
    default: 6
  },
  inputmode: {
    type: String,
    default: "text"
  },
  isHideStatus: {
    type: Boolean,
    default: false
  },
  isSearch: {
    type: Boolean,
    default: false
  },
  isSearchLeft: {
    type: Boolean,
    default: false
  },
  isSearchIconBold: {
    type: Boolean,
    default: true
  },
  iconName: {
    type: String
  },
  iconColor: {
    type: String,
    default: "#3F51B5"
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  isHideRequired: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: String
  }
})

const cEditRef = ref<HTMLElement | null>(null)

defineExpose({
  cEditRef
})

const inputRef = ref(<any>{})
const text = ref(props.value)
const isShowPassword = ref(false)
const isFocus = ref(false)
const hasStatusText = ref(false)
const formattedPhone = ref("")
const formattedCode = ref("")
const code = ref(Object.fromEntries(Array.from({
  length: props.codeLength
}, ((t, i) => {
  return [i + 1, ""]
}))))

watch(() => props.value, () => {
  text.value = props.value
  if (isPhone.value) {
    0 !== (props.value || "").length ? phoneFormatting("value") : formattedPhone.value = ""
  }
});

onMounted(() => {
  checkSlots()
})
onUpdated(() => {
  checkSlots()
})

const iconTitle = computed(() => {
  // TODO
  return isShowPassword.value ? "Скрыть пароль" : "Показать пароль"
})
const isMultiline = computed(() => {
  return "multiline" === props.mode
})
const isPhone = computed(() => {
  return "tel" === props.type
})
const passwordMode = computed(() => {
  return isShowPassword.value ? "text" : "password"
})
const listeners = computed(() => {
  return Object.assign({}, attrs, {
    input: input,
    change: change,
    focus: focus,
    blur: blur,
    keydown: keyDown
  })
})
const multilineBinds = computed(() => {
  let t = <any>{
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly,
    rows: props.rows,
    cols: props.cols,
    class: {
      error: props.isError,
      warning: props.isWarning
    },
    autocomplete: props.autocomplete,
    ref: inputRef,
    inputmode: props.inputmode,
    style: {
      "--paddingRight": props.isShowIcon || props.isClear || props.isPassword ? props.isClear && props.isShowIcon ? "60px" : "35px" : "10px"
    },
  }
  props.isLazy || t.push({
    value: props.value
  })
  void 0 !== props.maxlength && t.push({
    maxlength: props.maxlength
  })
  return t
})
const singlelineBinds = computed(() => {
  let t = <any>{
    type: props.isPassword ? passwordMode.value : props.type,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly,
    class: {
      code: props.isConfirmationCode,
      phone: isPhone.value,
      password: props.isPassword,
      error: props.isError,
      warning: props.isWarning,
      entered: props.value.length > 0 || formattedPhone.value.length > 0
    },
    autocomplete: props.autocomplete,
    ref: inputRef,
    inputmode: props.inputmode,
    style: {
      "--paddingRight": props.isShowIcon || props.isClear || props.isPassword ? props.isClear && props.isPassword && props.isShowIcon ? "60px" : "35px" : "10px"
    },
  }
  if (!isPhone.value) {
    //t.value = props.value
  }
  if (props.maxlength !== undefined) {
    t.maxlength = props.maxlength
  }

  return t
})

function keyDown(key: any) {
  emit("keydown", key)
}

const slots = defineSlots()

function checkSlots() {
  hasStatusText.value = !!slots["status-text"]
}

function change(val: any) {
  if (props.isLazy) {
    emit("update:value", text.value)
  }
  emit("change", val)
}

function blur(val: any) {
  isFocus.value = false
  emit("focus", val)
}

function focus(val: any) {
  isFocus.value = true
  emit("focus", val)
}

function clear() {
  emit("update:value", "")
  isPhone.value && (formattedPhone.value = "")
  emit("input", "")
  isFocus.value = false
  setTimeout(() => {
    inputRef.value.input.blur()
  }, 100)
}

function phoneFormatting(val: any) {
  //TODO
  let p = formattedPhone.value.replace(/\D/g, "")

  p.length > 10 && ["7", "8"].includes(p[0]) && (p = p.slice(1));
  var e = p.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  null !== e && (formattedPhone.value = e[2] ? e[1] + " " + e[2] + (e[3] ? "-" + e[3] : "") + (e[4] ? "-" + e[4] : "") : e[1], emit("update:value", e[0]))
}

function input(val: any) {
  if (isPhone.value) return "deleteContentBackward" === val.inputType && formattedPhone.value.length < 1 ? emit("update:value", "") : (phoneFormatting("formattedPhone"), emit("input", val));
  if (props.isConfirmationCode) {
    var e = Number(val.target.dataset.id);
    code.value[e] = code.value[e].replace(/\D/g, "");
    var n: any = cEditRef.value;
    code.value[e].length > 0 && e !== Object.keys(code.value).length && n.querySelector('input[data-id="'.concat(<any>(e + 1), '"]')).focus();
    var o = Object.values(code.value).reduce((function (a, b) {
      return a + b
    }));
    emit("update:code", o)
  } else props.isLazy || emit("update:value", val.target.value), emit("input", val)
}

function showPassword() {
  isShowPassword.value = !isShowPassword.value
}
</script>

<template>
  <label ref="cEditRef" v-if="isMultiline" class="c-edit textarea">
    <div>
          <span v-if="placeholder || required" :class='["placeholder", {
                    hide: isFocus || value.length > 0
                }]'>
            {{ placeholder }}
            <span v-if="required && !isHideRequired"
                  data-tooltip="РћР±СЏР·Р°С‚РµР»СЊРЅРѕ Рє Р·Р°РїРѕР»РЅРµРЅРёСЋ">*</span>
          </span>
      <textarea v-if="isLazy" v-model="text" v-on="listeners" v-bind="multilineBinds"/>
      <textarea v-else v-bind="multilineBinds" v-on="listeners"/>
      <span v-if="isShowIcon"
            :class="['icon', 'input-icon', {'input-error':isError, 'input-warning':isWarning, 'input-valid':isValid}]"/>
      <span v-if="isClear" :class='["icon", "input-icon", { close: value.length > 0 }]'
            :style='{ right: isError || isWarning || isValid ? "32px" : "10px" }' data-tooltip="РћС‡РёСЃС‚РёС‚СЊ"
            @click="clear"/>
    </div>
    <div v-if="!isHideStatus" :class='["status-text", { show: hasStatusText, error: isError, warning: isWarning }]'>
      <slot name="status-text"/>
    </div>
  </label>
  <label v-else-if="isConfirmationCode" ref="cEditRef" :class='["c-edit", "code", { reg: codeLength < 6 }]'>
    <div>
      <input v-for="i in parseInt(codeLength.toString())" v-model="code[i]" :key="i" :data-id="i" maxlength="1"
             pattern="\d*"
             inputmode="numeric"
             :type="singlelineBinds.type"
             v-bind="singlelineBinds"
             v-on="listeners">
    </div>
  </label>
  <label v-else class="c-edit" ref="cEditRef">
    <div :class='{ "has-left-icon": iconName }'>
      <span v-if="iconName" :class='["icon", iconName]' :style='{ left: "10px", backgroundColor: iconColor }'/>
      <span v-if="placeholder || required"
            :class='["placeholder", { hide: isFocus || value.length > 0 || formattedPhone.length > 0, phone: isPhone, "search-left": isSearchLeft }]'>
          {{ placeholder }}
          <span v-if="required && !isHideRequired">*</span>
        </span>
      <input v-if="isLazy" v-model.lazy="text" v-bind="singlelineBinds" v-on="listeners"/>
      <template v-else-if="isPhone">
        <input v-if='"checkbox" === singlelineBinds.type' v-model="formattedPhone" :checked="formattedPhone"
               v-bind="singlelineBinds" v-on="listeners"/>
        <input v-else v-model="formattedPhone" :type="singlelineBinds.type" v-bind="singlelineBinds"
               v-on="listeners"/>
      </template>
      <template v-else>
        <input v-bind="singlelineBinds" v-model.trim="text" v-on="listeners">
      </template>
      <span v-if="isPhone"
            :class='["code-country", { show: isFocus || formattedPhone.length > 0, error: isError, warning: isWarning, disabled: disabled }]'>
          +7
        </span>
      <span v-if="isShowIcon"
            :class="['icon', 'input-icon', {'input-error':isError, 'input-warning':isWarning, 'input-valid':isValid}]"/>
      <span v-if="isClear" :class="['icon', 'input-icon', {close: value.length > 0}]"
            :style="{right: isError || isWarning || isValid ? '32px' : '10px'}" @click="clear"
            data-tooltip="Очистить"></span>
      <span v-if="isPassword"
            :class="['icon', {'eye-closed':!isShowPassword, 'eye-open':isShowPassword, show: value.length > 0}]"
            :style="{right: isClear && (isError || isWarning || isValid) ? '60px' : isError || isWarning || isValid || isClear ? '40px' : '10px'}"
            :data-tooltip="iconTitle"
            @click="(e)=>{return e.preventDefault(), showPassword()}"></span>
    </div>

    <div v-if="!isHideStatus" :class="['status-text', {show: hasStatusText, error: isError, warning: isWarning}]">
      <slot name="status-text"/>
    </div>

  </label>
</template>

<style scoped>
.c-edit {
  display: flex;
  flex-flow: column
}

.c-edit.textarea {
  height: auto !important
}

.c-edit:not(.textarea) > div > .placeholder {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 15px)
}

.c-edit > div {
  display: flex;
  position: relative
}

.c-edit > div.status-text {
  font-size: 12px;
  line-height: 15px;
  opacity: 0;
  transition: opacity .3s ease-in-out;
  margin-top: 4px
}

.c-edit > div.status-text.show {
  opacity: 1
}

.c-edit > div.status-text.error {
  color: #ff324b
}

.c-edit > div.status-text.warning {
  color: #ff7a00
}

.c-edit > div > .placeholder {
  color: #818ca9;
  position: absolute;
  top: 10px;
  left: 10px;
  transition: opacity .2s ease-in-out;
  z-index: 2;
  pointer-events: none;
  box-sizing: border-box
}

.c-edit > div > .placeholder.search-left {
  left: 46px
}

.c-edit > div > .placeholder.hide {
  opacity: 0
}

.c-edit > div > .placeholder > span {
  color: #ff7a00;
  margin-left: -3px
}

.c-edit > div > input[type=password]:not(:-moz-placeholder-shown) {
  font-family: Verdana, Geneva, sans-serif;
  letter-spacing: 2px
}

.c-edit > div > input[type=password]:not(:-ms-input-placeholder) {
  font-family: Verdana, Geneva, sans-serif;
  letter-spacing: 2px
}

.c-edit > div > input[type=password]:not(:placeholder-shown) {
  font-family: Verdana, Geneva, sans-serif;
  letter-spacing: 2px
}

.c-edit > div > .code-country {
  position: absolute;
  top: 13px;
  left: 16px;
  opacity: 0;
  transition: opacity .2s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 1
}

.c-edit > div > .code-country.show {
  opacity: 1
}

.c-edit > div > .code-country.error {
  color: #ff324b
}

.c-edit > div > .code-country.warning {
  color: #ff7a00
}

.c-edit > div > .code-country.disabled {
  color: #c9c9c9
}

.c-edit > div > textarea {
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  padding: 11px 30px 12px 10px;
  background-color: #ebf0f9;
  height: 58px;
  width: 360px;
  border: 1px solid transparent;
  transition: all .3s ease-in-out, height 0s, width 0s;
  padding-right: var(--paddingRight)
}

.c-edit > div > textarea:focus {
  border: 1px solid #3f51b5
}

.c-edit > div > textarea:disabled {
  background-color: #f9f9f9;
  pointer-events: none;
  color: #c9c9c9
}

.c-edit > div > textarea.error {
  background-color: #ffe1e3;
  color: #ff324b;
  border: 1px solid #ff324b
}

.c-edit > div > textarea.warning {
  background-color: #ffebd9;
  color: #ff7a00;
  border: 1px solid #ff7a00
}

.c-edit > div > input {
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  border: 1px solid transparent;
  font: inherit;
  overflow-x: hidden;
  text-overflow: ellipsis;
  height: 40px;
  width: 360px;
  padding: 0 10px;
  background-color: #ebf0f9;
  transition: all .3s ease-in-out, letter-spacing 0s;
  padding-right: var(--paddingRight)
}

.c-edit > div > input.password {
  z-index: 1
}

.c-edit > div > input.password.entered {
  z-index: 0
}

.c-edit > div > input.phone {
  padding-left: 35px
}

.c-edit > div > input:focus {
  border: 1px solid #3f51b5
}

.c-edit > div > input:focus.error, .c-edit > div > input:focus.warning {
  margin-left: unset
}

.c-edit > div > input.code {
  font-size: 18px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: #ebf0f9;
  border: none;
  padding: 0;
  text-align: center
}

.c-edit > div > input.code:last-of-type {
  margin-right: 0
}

.c-edit > div > input:disabled {
  background-color: #f9f9f9;
  color: #c9c9c9;
  pointer-events: none
}

.c-edit > div > input.error {
  background-color: #ffe1e3;
  color: #ff324b;
  border: 1px solid #ff324b
}

.c-edit > div > input.warning {
  background-color: #ffebd9;
  color: #ff7a00;
  border: 1px solid #ff7a00
}

.c-edit > div.has-left-icon > .placeholder {
  padding-left: 28px
}

.c-edit > div.has-left-icon > .code-country {
  left: 38px
}

.c-edit > div.has-left-icon > input {
  padding-left: 38px
}

.c-edit > div.has-left-icon > input.phone {
  padding-left: 57px
}

.c-edit > div.has-left-icon > .icon:first-child {
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-edit > div.has-left-icon > .icon:first-child, .c-edit > div > .icon {
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat
}

.c-edit > div > .icon {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px
}

.c-edit > div > .icon.input-icon {
  opacity: 0;
  background-color: transparent;
  z-index: 1
}

.c-edit > div > .icon.input-error {
  opacity: 1;
  background-color: #ff324b;
  transition: all .3s ease-in-out
}

.c-edit > div > .icon.input-warning {
  opacity: 1;
  background-color: #ff7a00;
  transition: all .3s ease-in-out
}

.c-edit > div > .icon.input-valid {
  opacity: 1;
  background-color: #0ada8f;
  transition: all .3s ease-in-out
}

.c-edit > div > .icon.search-mobile {
  opacity: 1;
  background-color: #818ca9;
  transition: all .3s ease-in-out
}

.c-edit > div > .icon.search-mobile.hide {
  opacity: 0;
  z-index: 0
}

.c-edit > div > .icon.close {
  background-color: #818ca9;
  transition: all .3s ease-in-out;
  width: 24px;
  height: 24px;
  top: 8px;
  right: 8px;
  opacity: 1
}

.c-edit > div > .icon.close:hover {
  cursor: pointer;
  background-color: #3f51b5
}

.c-edit > div > .icon.eye-closed, .c-edit > div > .icon.eye-open {
  -webkit-mask-size: contain;
  mask-size: contain;
  margin: 0;
  background-color: #818ca9;
  transition: all .3s ease-in-out;
  opacity: 0;
  z-index: 1;
  pointer-events: none
}

.c-edit > div > .icon.eye-closed.need-margin, .c-edit > div > .icon.eye-open.need-margin {
  right: 40px
}

.c-edit > div > .icon.eye-closed.show, .c-edit > div > .icon.eye-open.show {
  pointer-events: unset;
  opacity: 1
}

.c-edit > div > .icon.eye-closed:hover, .c-edit > div > .icon.eye-open:hover {
  cursor: pointer;
  background-color: #3f51b5
}

.c-edit > div > .icon.left {
  left: 10px
}

.c-edit > div > .icon.search2 {
  opacity: 1;
  transition: all .3s ease-in-out;
  width: 24px;
  height: 24px;
  background-color: #3f51b5;
  top: 8px;
  margin: 0;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-edit > div > .icon.search2.hide {
  opacity: 0;
  z-index: 0
}

.c-edit.code > div, .c-edit.code {
  align-items: center
}

.c-edit.code > div {
  width: 100%;
  justify-content: space-between
}

.c-edit.code.reg > div {
  justify-content: space-evenly
}

.c-edit.pointer > div > input, .c-edit.pointer {
  cursor: pointer
}
</style>