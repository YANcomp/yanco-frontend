<script lang="ts" setup>
const modelValue = defineModel()
const attrs = useAttrs()

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

const text = ref("")
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


const iconTitle = computed(() => {
  // TODO
  return isShowPassword.value ? "РЎРєСЂС‹С‚СЊ РїР°СЂРѕР»СЊ" : "РџРѕРєР°Р·Р°С‚СЊ РїР°СЂРѕР»СЊ"
})
const isMultiline = computed(() => {
  return {}
})
const isPhone = computed(() => {
  return {}
})
const passwordMode = computed(() => {
  return {}
})
const listeners = computed(() => {
  // TODO
  // return Object.assign({}, attrs, {
  //   input: props.input,
  //   change: change,
  //   focus: focus,
  //   blur: this.blur,
  //   keydown: this.keyDown
  // })
})
const multilineBinds = computed(() => {
  let t = <any>[{
    style: props.resize
  }, {
    required: props.required
  }, {
    disabled: props.disabled
  }, {
    readonly: props.readonly
  }, {
    rows: props.rows
  }, {
    cols: props.cols
  }, {
    class: {
      error: props.isError,
      warning: props.isWarning
    }
  }, {
    autocomplete: props.autocomplete
  }, {
    ref: "input"
  }, {
    inputmode: props.inputmode
  }, {
    style: {
      "--paddingRight": props.isShowIcon || props.isClear || props.isPassword ? props.isClear && props.isShowIcon ? "60px" : "35px" : "10px"
    }
  }];
  return props.isLazy || t.push({
    value: props.value
  }), void 0 !== props.maxlength && t.push({
    maxlength: props.maxlength
  }), t
})
const singleineBinds = computed(() => {
  let t = <any>[{
    type: props.isPassword ? passwordMode.value : props.type
  }, {
    required: props.required
  }, {
    disabled: props.disabled
  }, {
    readonly: props.readonly
  }, {
    class: {
      code: props.isConfirmationCode,
      phone: isPhone.value,
      password: props.isPassword,
      error: props.isError,
      warning: props.isWarning,
      entered: props.value.length > 0 || formattedPhone.value.length > 0
    }
  }, {
    autocomplete: props.autocomplete
  }, {
    ref: "input"
  }, {
    inputmode: props.inputmode
  }, {
    style: {
      "--paddingRight": props.isShowIcon || props.isClear || props.isPassword ? props.isClear && props.isPassword && props.isShowIcon ? "60px" : "35px" : "10px"
    }
  }];
  return isPhone.value || t.push({
    value: props.value
  }), void 0 !== props.maxlength && t.push({
    maxlength: props.maxlength
  }), t
})

function clear(){
    //TODO
  // emit("update:value", "")
  isPhone.value && (formattedPhone.value = "")
  // this.$emit("input", "")
  isFocus.value = false
  // setTimeout( ()=> {
  //   t.$refs.input.blur()
  // }, 100)
}
</script>

<template>
  <label v-if="isMultiline" class="c-edit textarea">
    <div>
      <span v-if="placeholder || required" :class='["placeholder", {
                hide: isFocus || value.length > 0
            }]'>
        {{ placeholder }}
        <span v-if="required && !isHideRequired" data-tooltip="РћР±СЏР·Р°С‚РµР»СЊРЅРѕ Рє Р·Р°РїРѕР»РЅРµРЅРёСЋ">*</span>
      </span>
      <textarea v-if="isLazy" v-model="text" v-on="listeners" v-bind="multilineBinds"/>
      <textarea v-else v-bind="multilineBinds" v-on="listeners"/>
      <span v-if="isShowIcon"
            :class="['icon', 'input-icon', {'input-error':isError, 'input-warning':isWarning, 'input-valid':isValid}]"/>
      <span v-if="isClear" :class='["icon", "input-icon", { close: value.length > 0 }]'
            :style='{ right: isError || isWarning || isValid ? "32px" : "10px" }' data-tooltip="РћС‡РёСЃС‚РёС‚СЊ" @click="clear"/>
    </div>
  </label>
</template>

<style scoped>

</style>