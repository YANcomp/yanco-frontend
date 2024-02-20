<script lang="ts" setup>
const emit = defineEmits(["mode-change", "open-close-recovery", "change-padding-header-product", "change-body-overflow"])

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  isShowInStatic: {
    type: Boolean,
    default: false
  },
  isStatic: {
    type: Boolean,
    default: false
  },
  routeMode: {
    type: String
  }
})

const route = useRoute()
const appStore = useAppStore()
const sessionsStore = useSessionsStore()
const notificationsStore = useNotificationsStore()

useListen("open-login-or-registration", (val: any) => {
  if (val === "recovery") {
    isRecovery.value = true
  } else {
    modeRef.value = val ? val : "login"
    isOpen.value = true
    if (isRecovery.value && "registration" === val) {
      isRecovery.value = false
    }
  }
})

const overlayRef = ref(<any>{})
const loginRef = ref(<any>undefined)
const contentRef = ref(<any>{})

const isClosed = ref(true)
const isOpened = ref(false)
const intervalID = ref(<any>undefined)
const isCodeSent = ref(false)
const timeout = ref(0)
const modeRef = ref("login")
const isRegistered = ref(false)
const isOpen = ref(false)
const isLoading = ref(false)
const errorPassword = ref("")
const errorPhone = ref("")
const errorCode = ref("")
const isMouseDownOverlay = ref(false)
const isRecovery = ref(false)
const isBanned = ref(false)
const isInputCodeDisabled = ref(false)

const isShowDiscountNotice = computed(() => {
  return appStore.isShowDiscountNotice
})
const advantagesTitle = computed(() => {
  return "login" === modeRef.value ? "После входа вы сможете:" : "После регистрации вы сможете:"
})
const caption = computed(() => {
  return isRecovery.value ? "Восстановление пароля" : "login" === modeRef.value ? "Авторизация" : "Регистрация"
})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const isLoginAttempt = computed(() => {
  return appStore.isLoginAttempt
})
const isTimeOver = computed(() => {
  return timeout.value < 1
})
const isMe = computed(() => {
  return {}
})
const params = computed(() => {
  return appStore.params
})
const tabIndex = computed(() => {
  let index = ["login", "registration"].indexOf(modeRef.value);
  return -1 === index ? 0 : index
})

watch(isOpen, (val: any) => {
  val && openCloseOverlay()
})
watch(
    () => route,
    () => {
      closeOverlay()
    },
);
watch(tabIndex, () => {
  errorPhone.value = ""
  errorPassword.value = ""
})
watch(modeRef, (val: any) => {
  if (val === "login") {
    nextTick(() => {
      phoneFocus()
    })
  }
  emit("mode-change", val)
})
watch(isRecovery, (val: any) => {
  emit("open-close-recovery", val)
  if (!val) {
    nextTick(() => {
      phoneFocus()
    })
  }
})
watch(isOpened, (val: any) => {
  if (val) {
    setTimeout(() => {
      phoneFocus()
    }, 450)
  } else {
    appStore.DISCOUNT_NOTICE_UPD(false)
  }
})

function openCloseOverlay() {
  if (isOpened.value) {
    isClosed.value = !isClosed.value
    document.removeEventListener("keydown", esc)
    document.removeEventListener("mousedown", mouseDown)
    document.removeEventListener("mouseup", mouseUp)
    setTimeout(() => {
      isOpened.value = !isOpened.value
      document.body.style.overflow = ""
      if (props.isMobile) {
        // TODO t.$store.commit("app/".concat(r.APP.DIM_MOBILE_FOOTER), !1)
      } else {
        emit("change-padding-header-product")
        // let appElementById = document.getElementById("app") || <any>{}
        // appElementById.style.paddingRight = "0"
        // TODO t.$store.commit("app/".concat(r.APP.HIDE_CHAT_BOT), !1)
      }
      emit("change-body-overflow")
      overlayRef.value.style.visibility = "hidden"
      isOpen.value = false
      errorPhone.value = ""
      errorPassword.value = ""
    }, 450)
  } else {
    isOpened.value = !isOpened.value
    isClosed.value = !isClosed.value
    setTimeout(() => {
      document.addEventListener("keydown", esc)
      document.addEventListener("mousedown", mouseDown)
      document.addEventListener("mouseup", mouseUp)
    }, 450)
    document.body.style.overflow = "hidden"
    if (props.isMobile) {
      // TODO this.$store.commit("app/".concat(r.APP.DIM_MOBILE_FOOTER), !0)
    } else {
      emit("change-padding-header-product")
      // let appElementById = document.getElementById("app") || <any>{}
      // appElementById.style.paddingRight = "17px"
      // TODO this.$store.commit("app/".concat(r.APP.HIDE_CHAT_BOT), !0)
    }
    overlayRef.value.style.visibility = "visible"
  }
}

function mouseDown(key: any) {
  isMouseDownOverlay.value = !contentRef.value.contains(key.target)
}

function mouseUp() {
  !props.isMobile && isMouseDownOverlay.value && closeOverlay()
}

function esc(key: any) {
  "Escape" === key.code && closeOverlay()
}

function changeIsLoading(val: any) {
  isLoading.value = val
}

function changeTabIndex(val: any) {
  modeRef.value = ["login", "registration"][val != null ? val : 0]
}

function closeOverlay() {
  if (!isClosed.value) {
    if (isAuthorized.value && isRecovery.value) {
      isRecovery.value = false
    }
    if (isAuthorized.value && isRegistered.value) {
      isRegistered.value = false
      isCodeSent.value = false
    }
    openCloseOverlay()
  }
}

function phoneFocus() {
  if (!isClosed.value || props.isStatic) {
    if (loginRef.value) {
      loginRef.value.cLoginRef.querySelector("input").focus()
    }
  }
}

function back() {
  if (isRecovery.value && !isAuthorized.value) {
    openLoginForm()
  } else {
    closeOverlay()
  }
}

function openLoginForm() {
  isRecovery.value = false
}

function openRecoveryForm() {
  isRecovery.value = true
}

function openRegisterForm() {
  changeTabIndex(1)
}

function submit(data: any) {
  isCodeSent.value ? register(data) : getCode(data)
}

function register(data: any) {
  //TODO
  console.log(data)
  isRegistered.value = true
}

function login(data: any, t: any) {
  //TODO
  console.log(data)
  closeOverlay()
}

function getCode(data: any) {
  //TODO
  timeout.value = 60
  startTimer()
  isCodeSent.value = true
  isInputCodeDisabled.value = false
}

function startTimer() {
  intervalID.value = window.setInterval(() => {
    timeout.value--
    isTimeOver.value && clearInterval(intervalID.value)
  }, 1e3)
}

function error(val: any) {
  notificationsStore.NOTIFICATIONS_UPD({
    title: "login" === route.params.mode ? "Ошибка авторизации" : "Ошибка регистрации",
    desc: val,
    status: "error"
  })
}

function hideErrorPassword() {
  errorPassword.value = ""
}

function hideErrorPhone() {
  errorPhone.value = ""
}

function hideErrorCode() {
  errorCode.value = ""
}
</script>

<template>
  <div ref="overlayRef"
       style="visibility: hidden"
       :class='["c-login-or-registration", { opened: isOpened || isStatic && isShowInStatic, closed: isClosed && !isStatic, mobile: isMobile, static: isStatic && isShowInStatic }]'>
    <div ref="contentRef" :class='{ opened: isOpened || isStatic && isShowInStatic, closed: isClosed && !isStatic }'>
      <LazyUiCSpinner v-if="isLoading" class="loading" :size='isMobile ? "s" : "m"' position="absolute"/>
      <div v-if="!isStatic" class="close">
        <span class="icon close2" @click="closeOverlay"/>
      </div>
      <div v-if="!isStatic" class="top">
        <span class="icon arrow-left" @click="back"/>
        <p>{{ caption }}</p>
      </div>
      <template v-if="isRecovery">cRecovery</template>
      <template v-else>
        <UiCTabs v-if="isOpen || isStatic && isShowInStatic" :tab-index="tabIndex"
                 :class='[modeRef, { code: isCodeSent }]'
                 v-on:tab-index-change="changeTabIndex">
          <UiCTab>
            <template v-slot:caption>
              Войти
            </template>
            <LazyUserCLogin v-if="tabIndex === 0" ref="loginRef"
                            :is-error-password="errorPassword.length > 0"
                            :is-error-phone="errorPhone.length > 0"
                            :is-error-code="errorCode.length > 0"
                            :is-banned="isBanned"
                            :is-mobile="isMobile"
                            :is-loading="isLoading"
                            :is-static="isStatic"
                            v-on:error-password-hide="hideErrorPassword"
                            v-on:error-phone-hide="hideErrorPhone"
                            v-on:error="error"
                            v-on:login="login"
                            v-on:recovery-form-open="openRecoveryForm"
                            v-on:register-form-open="openRegisterForm"/>
          </UiCTab>
          <UiCTab>
            <template v-slot:caption>
              Регистрация
            </template>
            <LazyUserCRegistration v-if="tabIndex === 1" :error-password="errorPassword" :error-phone="errorPhone"
                                   :error-code="errorCode" :is-code-sent="isCodeSent"
                                   :is-input-code-disabled="isInputCodeDisabled" :is-loading="isLoading"
                                   :is-mobile="isMobile" :is-registered="isRegistered" :is-time-over="isTimeOver"
                                   :timeout="timeout"
                                   v-on:submit="submit"
                                   v-on:overlay-close="closeOverlay"
                                   v-on:error="error"
                                   v-on:code-get="getCode"
                                   v-on:error-code-hide="hideErrorCode"
                                   v-on:error-phone-hide="hideErrorPhone"
                                   v-on:error-password-hide="hideErrorPassword"/>
          </UiCTab>
        </UiCTabs>
        <div v-if='"login" === modeRef && (isOpened || isStatic && isShowInStatic) && "checkout" !== route.name'
             class="banner"
             :style='{ backgroundImage: "url(https://pictures.apteka-april.ru/generic/banner_qr/" + (isMobile ? "40340/banner_qr_mob.webp" : "40339/banner_qr_desk.webp") + ")" }'>
          <span v-if="isShowDiscountNotice" class="icon warning-fill"/>
        </div>
        <div v-if="!isStatic" class="advantages">
          <div>
            <span>{{ advantagesTitle }}</span>
            <NuxtLink class="hover-bottom-line" :to='{ name: "loyal" }'>О программе лояльности</NuxtLink>
          </div>
          <div>
            <div>
              <span class="icon advantages-card"></span>
              <div>
                Покупать по выгодным ценам
                <br>с программой лояльности
                <br>«Янко»
              </div>
            </div>
            <div>
              <span class="icon advantages-pharmacy"></span>
              <div>
                Сохранять избранные
                <br>магазины, удобные
                <br>по расположению
              </div>
            </div>
            <div>
              <span class="icon advantages-truck"></span>
              <div>
                Заказывать товары на дом,
                <br>оплачивая их онлайн
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.c-login-or-registration {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, .75);
  z-index: 99999;
  display: flex;
  opacity: 0
}

.c-login-or-registration.opened {
  transition: opacity .3s ease-in-out;
  opacity: 1
}

.c-login-or-registration.closed {
  transition: opacity .3s ease-in-out .25s;
  opacity: 0
}

.c-login-or-registration > div {
  width: 100%;
  height: 100%;
  max-width: 617px;
  background-color: #fff;
  padding: 0 10px;
  margin-left: auto;
  margin-right: -617px;
  transition: all .45s ease-in-out;
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden
}

.c-login-or-registration > div > .loading {
  left: 0;
  top: 0
}

.c-login-or-registration > div::-webkit-scrollbar {
  width: 5px
}

.c-login-or-registration > div::-webkit-scrollbar-track {
  background-color: #fff
}

.c-login-or-registration > div::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #a2a2a2
}

.c-login-or-registration > div.opened {
  margin-right: 0
}

.c-login-or-registration > div.closed {
  margin-right: -617px
}

.c-login-or-registration > div > .close {
  position: fixed;
  width: 650px;
  transform-style: preserve-3d
}

.c-login-or-registration > div > .close > .close2 {
  position: absolute;
  cursor: pointer;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  top: 10px;
  left: -30px;
  background-color: #fff;
  transition: all .3s ease-in-out;
  -webkit-tap-highlight-color: transparent;
  width: 27px;
  margin: 0;
  transform: translateZ(1px)
}

.c-login-or-registration > div > .close > .close2:hover {
  transform: rotate(180deg)
}

.c-login-or-registration > div > .top {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 48px;
  width: -webkit-fill-available;
  width: -moz-available
}

.c-login-or-registration > div > .top > .arrow-left {
  display: none;
  -webkit-mask-size: 75%;
  mask-size: 75%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1e1e1e;
  margin-right: 10px
}

.c-login-or-registration > div > .top > p {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px
}

.c-login-or-registration > div > .c-tabs {
  max-width: 360px;
  width: -webkit-fill-available;
  width: -moz-available;
  -webkit-tap-highlight-color: transparent
}

.c-login-or-registration > div > .banner {
  position: relative;
  cursor: pointer;
  height: 230px;
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 575px;
  width: 100%;
  margin: auto 12px auto 30px
}

.c-login-or-registration > div > .banner > .icon {
  position: absolute;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #ff0089;
  top: 5px;
  left: 5px
}

.c-login-or-registration > div > .advantages {
  margin: auto 12px 41px 30px;
  width: -webkit-fill-available;
  width: -moz-available
}

.c-login-or-registration > div > .advantages > div {
  display: flex;
  margin-top: 11px;
  align-items: center
}

.c-login-or-registration > div > .advantages > div:first-of-type {
  margin-top: 0;
  justify-content: space-between
}

.c-login-or-registration > div > .advantages > div:first-of-type > a {
  color: #3f51b5;
  display: flex;
  font-weight: 500;
  line-height: 17px;
  align-items: center
}

.c-login-or-registration > div > .advantages > div:first-of-type > a:hover {
  color: #4960df
}

.c-login-or-registration > div > .advantages > div:first-of-type > a:active {
  color: #32408f
}

.c-login-or-registration > div > .advantages > div > span {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #596175
}

.c-login-or-registration > div > .advantages > div > div {
  margin-right: 30px;
  min-height: 77px
}

.c-login-or-registration > div > .advantages > div > div:last-of-type {
  margin-right: 0
}

.c-login-or-registration > div > .advantages > div > div > .advantages-truck {
  width: 28px
}

.c-login-or-registration > div > .advantages > div > div > div {
  margin-top: 8px;
  font-size: 12px;
  line-height: 15px;
  color: #596175
}

.c-login-or-registration.static {
  position: unset;
  background-color: unset;
  min-height: 400px;
  z-index: 998
}

.c-login-or-registration.static > .opened {
  margin: auto;
  overflow: visible
}

.c-login-or-registration.mobile {
  width: 100%
}

.c-login-or-registration.mobile.static {
  min-height: 450px
}

.c-login-or-registration.mobile.static > .opened {
  overflow: hidden
}

@media screen and (max-width: 670px) {
  .c-login-or-registration > div > .close {
    display: none
  }

  .c-login-or-registration > div > .top {
    margin: 0 -10px 20px;
    padding: 17px 20px;
    border-radius: 0 0 15px 15px;
    box-shadow: 1px 1px 10px rgba(12, 7, 38, .1)
  }

  .c-login-or-registration > div > .top > .arrow-left {
    display: block
  }

  .c-login-or-registration > div > .top > p {
    margin: 0;
    font-size: 18px
  }
}

@media screen and (max-width: 617px) {
  .c-login-or-registration > div > .advantages {
    display: none
  }
}

@media screen and (max-width: 350px) {
  .c-login-or-registration > div > .c-tabs > .tabs {
    font-size: 15px
  }
}

</style>