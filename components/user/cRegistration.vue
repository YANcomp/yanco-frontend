<script lang="ts" setup>
const props = defineProps({
  errorPassword: {
    type: <any>String
  },
  errorPhone: {
    type: <any>String
  },
  errorCode: {
    type: <any>String
  },
  isCodeSent: {
    type: Boolean
  },
  isInputCodeDisabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  isRegistered: {
    type: Boolean,
    default: false
  },
  isTimeOver: {
    type: Boolean
  },
  timeout: {
    type: Number
  }
})

const codeRef = ref(<any>{})
const confirmationCode = ref("")
const email = ref("")
const isAccepted = ref(false)
const isInvalidEmail = ref(false)
const isInvalidPassword = ref(false)
const isInvalidPhone = ref(false)
const isInvalidAccepted = ref(false)
const password = ref("")
const phone = ref("")

const isErrorPassword = computed(() => {
  return props.errorPassword.length > 0
})
const isErrorPhone = computed(() => {
  return props.errorPhone.length > 0
})
const isErrorCode = computed(() => {
  return props.errorCode.length > 0
})
const noPasswordEntered = computed(() => {
  return password.value.length < 1
})
const noPhoneEntered = computed(() => {
  return phone.value.length < 1
})
const phoneFormatting = computed(() => {
  return uPhone(Number("7".concat(phone.value)))
})
const isButtonDisabled = computed(() => {
  return props.isLoading || noPasswordEntered.value || noPhoneEntered.value || isInvalidPassword.value || isInvalidPhone.value || isInvalidEmail.value || !isAccepted.value
})

const emit = defineEmits(["error-password-hide", "error-phone-hide", "error-code-hide", "submit", "code-get", "overlay-close"])

watch(() => email.value, (value: any) => {
  isInvalidEmail.value = "" !== value && !uEmailCheck(value)
})
watch(() => password.value, (value: any) => {
  isInvalidPassword.value = value.length > 0 && !/(?=.*[A-z])[A-z\d]{6,}/.test(value), emit("error-password-hide")
})
watch(() => phone.value, (value: any) => {
  isInvalidPhone.value = value.length > 0 && value.length < 10, emit("error-phone-hide")
})
watch(() => props.isCodeSent, (value: any) => {
  value && nextTick(() => {
    let code = codeRef.value;
    void 0 !== code && code.cEditRef.querySelector("input").focus()
  })
})
watch(() => confirmationCode, (value: any) => {
  emit("error-code-hide")
})

function close() {
  emit("overlay-close")
}

function getCode() {
  let t = Number("7".concat(phone.value)),
      e = password.value,
      n = email.value,
      data = <any>{
        phone: t,
        password: e
      };
  n.length > 0 && (data.email = n), emit("code-get", data)
}

function submit() {
  console.log("submit")
  let t = Number("7".concat(phone.value)),
      e = password.value,
      n = email.value,
      o = confirmationCode.value,
      r = isAccepted.value,
      data = <any>{
        phone: t,
        password: e
      };
  n.length > 0 && (data.email = n), o.length > 0 && (data.confirmationCode = o), isInvalidAccepted.value = !r, r && emit("submit", data)
}
</script>

<template>
  <div v-if="isRegistered" class="registered">
    <p>
      вы зарегистрированы
      <span class="icon checkmark4"/>
    </p>
    <p>
      <div>Спасибо за регистрацию!</div>
      У вас появилась виртуальная карта
      <NuxtLink to="/">программы лояльности «Янко»</NuxtLink>
      , которая открывает доступ к акционным ценам и возможность накапливать баллы за покупки.
    </p>
    <UiCButton mode="primary" size="xl" @click="close">
      Продолжить
      <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
    </UiCButton>
  </div>
  <div v-else-if="isCodeSent" class="code">
    <span class="title">подтверждение телефона</span>
    <div>
      <span class="icon message2"/>
      <span>
        Введите код из смс на номер
        <span>{{ phoneFormatting }}</span>
      </span>
    </div>
    <UiCEdit ref="codeRef" :code-length=4 :is-error="isErrorCode" is-confirmation-code v-model:code="confirmationCode">
      <template v-if="isErrorCode" v-slot:status-text>
        <span>{{ errorCode }}</span>
      </template>
    </UiCEdit>
    <UiCButton :disabled="isLoading || confirmationCode.length < 4 || isInputCodeDisabled" mode="primary" size="xl"
               @click="submit">
      Продолжить
      <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
    </UiCButton>
    <span v-if="isTimeOver" class="time-out-over" @click="getCode">Получить новый код</span>
    <span v-else class="time-out">
        Получить новый код можно через {{ timeout }} сек
    </span>
  </div>
  <form v-else class="c-registration flex-vertical-nowrap" @submit.prevent="submit.apply(null, arguments)">
    <UiCEdit :is-error="isInvalidEmail" :is-valid="email.length > 0 && !isInvalidEmail" is-show-icon
             placeholder="E-mail" v-model:value.trim="email">
      <template v-if="isInvalidEmail" v-slot:status-text>
        Некорректный email-адрес. Поле должно быть заполнено по примеру: name@domain.ru
      </template>
    </UiCEdit>

    <UiCEdit :is-error="isErrorPhone || isInvalidPhone" :is-valid="phone.length > 0 && !isErrorPhone && !isInvalidPhone"
             is-show-icon required type="tel"
             inputmode="numeric" placeholder="Номер телефона" v-model:value.trim="phone">
      <template v-if="isInvalidPhone || isErrorPhone" v-slot:status-text>
        <span>{{ isInvalidPhone ? "Номер телефона введён не полностью" : errorPhone }}</span>
      </template>
    </UiCEdit>

    <UiCEdit :is-error="isErrorPassword || isInvalidPassword"
             :is-valid="password.length > 0 && !isErrorPassword && !isInvalidPassword" is-show-icon is-password required
             placeholder="Придумайте пароль" v-model:value.trim="password">
      <template v-if="isInvalidPassword || isErrorPassword" v-slot:status-text>
        <span>{{
            isInvalidPassword ? "Пароль должен состоять из не менее 6 символов: латинских букв и цифр" : errorPassword
          }}</span>
      </template>
    </UiCEdit>

    <UiCCheckbox :mode='isInvalidAccepted ? "red" : "primary"' size="s" v-model:checked="isAccepted">
      <span>
        Я подтверждаю, что ознакомился с
        <a href="/" target="_blank">
          политикой обработки персональных данных ООО «Янко»
        </a>
        и даю свое
        <a href="/" target="_blank">
          согласие на обработку моих персональных данных
          <span style="color:#ff7a00; margin-left: 3px">*</span>
        </a>
      </span>
    </UiCCheckbox>

    <UiCButton :disabled="isButtonDisabled" mode="primary" size="xl" type="submit">
      Продолжить
      <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
    </UiCButton>

    <div v-if="isInvalidAccepted" class="invalid-accepted">
      <span class="icon error-filled"/>
      <span>Ошибка регистрации. Необходимо ознакомиться и дать согласие на обработку персональных данных</span>
    </div>
    <span v-else>
       *
      <span>Поля, обязательные для заполнения</span>
    </span>
  </form>
</template>

<style scoped>
.c-registration {
  padding-bottom: 20px
}

.c-registration > .c-edit {
  margin-top: 10px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  -webkit-tap-highlight-color: transparent
}

.c-registration > .c-checkbox {
  margin: 20px 0;
  -webkit-tap-highlight-color: transparent
}

.c-registration > .c-checkbox > span:last-of-type {
  line-height: 17px
}

.c-registration > .c-checkbox > span > a {
  color: #3f51b5;
  font-weight: 600;
  font-size: 13px;
}

.c-registration > .c-checkbox > span > a:hover {
  color: #4960df
}

.c-registration > .c-checkbox > span > a:active {
  color: #32408f
}

.c-registration > .c-button {
  max-width: unset !important;
  -webkit-tap-highlight-color: transparent
}

.c-registration :deep(.c-button) > .caption {
  justify-content: center
}

.c-registration :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-registration :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-registration > span {
  margin-top: 19px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ff7a00
}

.c-registration > span > span {
  font-weight: 400
}

.c-registration > .invalid-accepted {
  display: flex;
  color: #ff324b;
  font-size: 12px;
  line-height: 15px;
  align-items: center;
  margin-top: 8px;
  font-weight: 500
}

.c-registration > .invalid-accepted > .icon {
  background-color: #ff324b;
  margin-right: 8px;
  width: 20px;
  min-width: 20px;
  height: 20px
}

.code > .title, .registered > .title {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: .06em;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #1e1e1e
}

.code > div, .registered > div {
  align-items: center;
  display: flex
}

.code > div > span, .registered > div > span {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px
}

.code > div > span.icon, .registered > div > span.icon {
  margin-right: 13px
}

.code > div > span > span, .registered > div > span > span {
  display: block
}

.code > .c-edit, .registered > .c-edit {
  margin: 40px auto;
  justify-content: center
}

.code > .c-edit > .status-text, .registered > .c-edit > .status-text {
  text-align: center
}

.code > .c-button, .registered > .c-button {
  max-width: unset !important;
}

.code :deep(.c-button) > .caption, .registered :deep(.c-button) > .caption {
  justify-content: center
}

.code :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type, .registered :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.code :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type, .registered :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.code > span:not(.title), .registered > span:not(.title) {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #818ca9;
  display: block;
  margin-top: 18px;
  text-align: center
}

.code > span:not(.title).time-out-over, .registered > span:not(.title).time-out-over {
  color: #4e62d1;
  cursor: pointer
}

.code > span:not(.title).time-out-over:hover, .registered > span:not(.title).time-out-over:hover {
  color: #3f51b5
}

.code > p:first-of-type, .registered > p:first-of-type {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: .06em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 22px
}

.code > p:first-of-type > span, .registered > p:first-of-type > span {
  margin-left: 13px
}

.code > p:last-of-type, .registered > p:last-of-type {
  margin-top: 0;
  margin-bottom: 29px
}

.code > p:last-of-type > a, .registered > p:last-of-type > a {
  color: #3f51b5;
  font-weight: 500
}

.code > p:last-of-type > a:last-of-type, .registered > p:last-of-type > a:last-of-type {
  margin-right: 5px
}

.code > p:last-of-type > a:hover, .registered > p:last-of-type > a:hover {
  color: #4960df
}

.code > p:last-of-type > a:active, .registered > p:last-of-type > a:active {
  color: #32408f
}

.code > p:last-of-type > div, .registered > p:last-of-type > div {
  margin-bottom: 8px
}

</style>