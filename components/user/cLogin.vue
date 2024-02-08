<script lang="ts" setup>
const emit = defineEmits(["error-password-hide", "error-phone-hide", "login", "error", "recovery-form-open", "register-form-open"])

const props = defineProps({
  isErrorPassword: {
    type: Boolean,
    default: false
  },
  isErrorPhone: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isStatic: {
    type: Boolean,
    default: false
  },
  isErrorCode: {
    type: Boolean,
    default: false
  }
})
const cLoginRef = ref<HTMLElement | null>(null)

defineExpose({
  cLoginRef
})

const isInvalidPassword = ref(false)
const isRememberMe = ref(true)
const password = ref("")
const passwordRef = ref(<any>{})
const phone = ref("")
const isOpenMBTRememberMe = ref(false)
const isOpenMBTRecovery = ref(false)
const currentStep = ref(1)
const loginType = ref("password")
const confirmationCode = ref("")
const errorCode = ref("")
const timeout = ref(0)
const isCodeSent = ref(false)
const isBanned = ref(false)
const intervalID = ref(<any>undefined)

const noPasswordEntered = computed(() => {
  return password.value.length < 1
})
const showErrorCode = computed(() => {
  return errorCode.value.length > 0 || props.isErrorCode && confirmationCode.value.length > 3 && !props.isLoading
})
const noPhoneEntered = computed(() => {
  return phone.value.length < 10
})
const phoneFormatting = computed(() => {
  return uPhone(Number("7".concat(phone.value)))
})
const isTimeOver = computed(() => {
  return timeout.value < 1
})

watch(password, () => {
  emit("error-password-hide")
})
watch(phone, () => {
  emit("error-phone-hide")
})
watch(confirmationCode, (val: any) => {
  errorCode.value = ""
  val.length > 3 && login({
    phone: Number("7".concat(phone.value)),
    code: val,
    isRememberMe: true
  })
})

function startTimer() {
  intervalID.value = window.setInterval(() => {
    timeout.value--
    isTimeOver.value && clearInterval(intervalID.value)
  }, 1e3)
}

function getLoginType() {
  setTimeout(() => {
    if (passwordRef.value.cEditRef) {
      passwordRef.value.cEditRef.querySelector("input").focus()
    }
  }, 300)
  currentStep.value = 2
  //TODO
  // var t = this;
  // V.a.me.getLoginType("7".concat(this.phone)).then((function (e) {
  //   var n;
  //   t.loginType = null !== (n = e.type) && void 0 !== n ? n : t.loginType, "sms" === t.loginType && (t.getCode(), setTimeout((function () {
  //     var input = document.getElementsByClassName("c-edit code reg")[0].childNodes[0].childNodes[0];
  //     null != input && input.focus()
  //   }), 500)), "password" === t.loginType && setTimeout((function () {
  //     var e;
  //     null === (e = t.$refs.password.$el.querySelector("input")) || void 0 === e || e.focus()
  //   }), 500)
  // })).finally((function () {
  //   t.currentStep = 2
  // }))
}

function getCode(val: any) {
  //TODO
  // var t = this;
  // V.a.me.sendSMS("7".concat(this.phone)).then((function (e) {
  //   t.timeout = null == e ? void 0 : e.timeout, t.startTimer(), t.isCodeSent = !0
  // })).catch((function (e) {
  //   t.isBanned = e.includes("Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ"), e.toLowerCase().includes("РµС‰С‘") && (t.timeout = parseInt(e.replace(/[^\d]/g, "")), t.startTimer()), e.toLowerCase().includes("РєРѕРґ ") && (t.errorCode = e.includes("'".concat(t.confirmationCode, "'")) ? e.replace("'".concat(t.confirmationCode, "'"), "") : e)
  // }))
}

function openCloseMobileBottomTooltip(val: any) {
  if (val === "isOpenMBTRememberMe") {
    isOpenMBTRememberMe.value = !isOpenMBTRememberMe.value
  }
  if (val === "isOpenMBTRecovery") {
    isOpenMBTRecovery.value = !isOpenMBTRecovery.value
  }
}

function login(data: any) {
  emit("login", data)
}

function recovery() {
  emit("recovery-form-open")
}

function register() {
  emit("register-form-open")
}

function submit() {
  //TODO
  let t = Number("7".concat(phone.value)),
      e = password.value;
  login({
    phone: t,
    password: e,
    isRememberMe: isRememberMe.value
  })
}


</script>

<template>
  <form ref="cLoginRef" class="c-login flex-vertical-nowrap" v-on:submit="(t)=>{t.preventDefault()}">
    <template v-if="currentStep === 1">
      <UiCEdit :is-error="isErrorPhone || isBanned" :is-show-icon="true" type="tel" placeholder="Номер телефона"
               inputmode="numeric" v-model:value="phone">
        <template v-slot:status-text v-if="isErrorPhone || isBanned">
          <span v-if="isBanned">
            Пользователь заблокирован
          </span>
          <span v-else>
            Номер телефона не найден. <br> Проверьте его ещё раз или
            <span style="font-weight:500; cursor: pointer" @click="register">зарегистрируйтесь.</span>
          </span>
        </template>
      </UiCEdit>
      <UiCButton :disabled="isLoading || noPhoneEntered" mode="primary" size="xl" @click="getLoginType">
        Продолжить
        <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
      </UiCButton>
    </template>
    <template v-else-if="currentStep === 2">
      <UiCEdit v-if='loginType === "password"' ref="passwordRef" :is-error="isErrorPassword" :is-password="true"
               :is-show-icon="true" placeholder="Пароль" v-model:value.trim="password">
        <template v-slot:status-text v-if="isErrorPassword">
          <span>
            Неверный пароль. <br>
            Проверьте его ещё раз или
            <span style="font-weight:500; cursor: pointer" @click="recovery">восстановите.</span>
          </span>
        </template>
      </UiCEdit>
      <div>
        <div>
          <UiCCheckbox size="s" v-model:checked="isRememberMe">
            Запомнить меня
          </UiCCheckbox>
          <UiCTooltipIcon icon-color="#818CA9" icon-color-hover="#4960DF" icon-color-active="#32408F"
                          position="top-center" mobile-bottom-tooltip-name="isOpenMBTRememberMe"
                          @click="(t)=>{t.stopPropagation()}" v-on:show-mobile-tooltip="openCloseMobileBottomTooltip">
            <template v-slot:icon>
              <span class="icon info2"/>
            </template>
            <template v-slot:text>
              При выборе опции «Запомнить меня» вы сможете получить доступ к учётной записи с помощью устройства и
              используемого браузера без необходимости нового входа в систему. Рекомендуем этот вариант только если вы
              уверены в надёжности устройства
            </template>
          </UiCTooltipIcon>
        </div>
        <div>
          <span @click="recovery">Забыли пароль?</span>
          <UiCTooltipIcon icon-color="#818CA9" icon-color-hover="#4960DF" icon-color-active="#32408F"
                          position="top-center" mobile-bottom-tooltip-name="isOpenMBTRecovery"
                          @click="(t)=>{t.stopPropagation()}" v-on:show-mobile-tooltip="openCloseMobileBottomTooltip">
            <template v-slot:icon>
              <span class="icon info2"/>
            </template>
            <template v-slot:text>
              Мы отправим код подтверждения на ваш номер телефона. После этого вы сразу же сможете обновить пароль.
            </template>
          </UiCTooltipIcon>
        </div>
      </div>
      <UiCButton :disabled="isLoading || noPasswordEntered || noPhoneEntered" mode="primary" size="xl" @click="submit">
        Войти
        <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
      </UiCButton>
    </template>
    <LazyUiCMobileBottomTooltip v-if="isOpenMBTRememberMe || isOpenMBTRecovery" :is-hide-footer="isStatic"
                                :mobile-bottom-tooltip-name='isOpenMBTRememberMe ? "isOpenMBTRememberMe" : "isOpenMBTRecovery"'
                                @close="openCloseMobileBottomTooltip">
      <template v-slot:title>
        {{ isOpenMBTRememberMe ? "Запомнить меня" : "Забыли пароль?" }}
      </template>
      <template v-slot:text>
        <p v-if="isOpenMBTRememberMe">
          При выборе опции «Запомнить меня» вы сможете получить доступ к учётной записи с помощью устройства и
          используемого браузера без необходимости нового входа в систему. Рекомендуем этот вариант только если вы
          уверены в надёжности устройства.
        </p>
        <p v-if="isOpenMBTRecovery">
          Отправим код подтверждения на ваш номер телефона. После этого вы сможете обновить пароль в вашем личном
          кабинете.
        </p>
      </template>
    </LazyUiCMobileBottomTooltip>
  </form>
</template>

<style scoped>
.c-login {
  padding-bottom: 20px
}

.c-login > a {
  color: #1a1a1a;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  text-decoration: underline
}

.c-login > a:hover {
  color: #4e62d1
}

.c-login > .c-edit {
  margin-top: 10px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  -webkit-tap-highlight-color: transparent
}

.c-login > .sms-code {
  display: flex;
  flex-flow: row;
  margin-bottom: 12px;
  justify-content: center
}

.c-login > .sms-code > span {
  display: flex;
  flex-flow: column;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px
}

.c-login > .sms-code > span.icon {
  margin-right: 13px;
  min-width: 24px
}

.c-login > .blocked {
  display: flex;
  color: #ff324b;
  font-size: 12px;
  line-height: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  font-weight: 500
}

.c-login > .blocked > .icon {
  background-color: #ff324b;
  margin-right: 8px;
  width: 20px;
  min-width: 20px;
  height: 20px
}

.c-login > div {
  justify-content: space-between;
  flex-flow: wrap
}

.c-login > div > div, .c-login > div {
  display: flex;
  align-items: center
}

.c-login > div > div > .c-checkbox {
  margin: 20px 0;
  -webkit-tap-highlight-color: transparent
}

.c-login > div > div > .c-tooltip-icon {
  margin-left: 5px
}

.c-login > div > div > span {
  color: #3f51b5;
  line-height: 17px;
  display: flex;
  align-items: center
}

.c-login > div > div > span:hover {
  cursor: pointer;
  color: #4960df
}

.c-login > div > div > span:active {
  color: #32408f
}

.c-login > .c-button {
  max-width: 360px !important;
  -webkit-tap-highlight-color: transparent
}

.c-login :deep(.c-button) > .caption {
  justify-content: center
}

.c-login :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-login :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-login > span {
  margin-top: 19px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ff7a00;
  text-align: center
}

.c-login > span.time-out-over {
  color: #4e62d1;
  cursor: pointer
}

.c-login > span.time-out-over:hover {
  color: #3f51b5
}

.c-login > span > span {
  font-weight: 400
}

.c-login > button {
  margin-top: 10px
}

@media screen and (max-width: 340px) {
  .c-login > .c-edit:last-of-type {
    margin-bottom: 10px
  }

  .c-login > div > div:first-of-type {
    order: 2
  }

  .c-login > div > div:last-of-type {
    order: 1
  }
}
</style>