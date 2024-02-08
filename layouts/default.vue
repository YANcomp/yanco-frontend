<script setup lang="ts">
//TODO STORE
const appStore = useAppStore()
const notificationsStore = useNotificationsStore()

//TODO END STORE

//TODO MIDDLEWARE
if (Object.keys(appStore.params).length < 1) {
  await appStore.PARAMS_GET()
}
//TODO END MIDDLEWARE

//TODO HOOKS
const device = useDevice();
appStore.MOBILE_UPD(device.isMobile)
//TODO END HOOKS

//TODO DATA
const isScrolled = ref(false)
const isPopupNotifications = ref(false)
//TODO END DATA

//TODO COMPUTED
const params = computed(() => {
  return appStore.params
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const isLoading = computed(() => {
  return appStore.getIsLoading
})
const notifications = computed(() => {
  return notificationsStore.notifications ? notificationsStore.notifications : []
})
const notificationsCount = computed(() => {
  return notifications ? notifications.value.length : 0
})
//TODO END COMPUTED

//TODO MOUNTED
onMounted(() => {
  window.addEventListener("scroll", checkScroll)

  let time = (new Date).getTime();
  isPopupNotifications.value = (time >= Number(localStorage.getItem("noticePrice"))) || (time >= Number(localStorage.getItem("noticeCookie")))
})
//TODO END MOUNTED

const notBasket = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "basket"})
  // notifications.value.push({ID: 1, status: "basket"})
}
const notFavorites = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "favorites"})
}
const notCompare = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "compare"})
}
const notCompareLimit = () => {
  notificationsStore.NOTIFICATIONS_UPD({status: "compare-limited"})
}
const openLogin = () => {
  useEvent("open-login-or-registration", "login")
}

//TODO METHODS
function checkScroll() {
  let height = window.innerHeight;
  isScrolled.value = window.scrollY > height
}

function updateNotice(val: any) {
  notificationsStore.NOTIFICATIONS_UPD(val)
}

function closeNotice(id: number) {
  notificationsStore.NOTIFICATIONS_DEL(id)
}

//TODO END METHODS
</script>

<template>
  <div id="app">
    <LazyUiCSpinner v-if="isLoading"/>
    <LazyNotificationsCNotifications v-if="notificationsCount > 0"
                                     :notifications="notifications"
                                     :is-mobile="isMobile"
                                     :params="params"
                                     v-on:notice-close="closeNotice"/>
    <!--    cBasketConflict-->
    <LazyHeaderCTopNavigationBar v-if="!isMobile"
                                 :params="params"
                                 v-on:notice-update="updateNotice"/>
    <!--    cHeader-->
    <span @click="notBasket">basket</span>
    <span @click="notFavorites">favorites</span>
    <span @click="notCompare">compare</span>
    <span @click="notCompareLimit">compare-limit</span>
    <span @click="openLogin">open login</span>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <!--    cOrderCarousel-->
    <!--    cCatalogTypes-->
    <!--    cStoryModal-->
    <UserCLoginOrRegistration :is-mobile="isMobile"/>
    <!--    cLoginOrRegistration-->
    <!--    cQRPaymentModal-->
    <!--    cBreadcrumbs-->
    <!--    cCurtainProductInPharmacies-->
    <slot/>

    <LazyUiCUpButton v-if="isScrolled && !isMobile" :is-mobile="isMobile"/>

    <img :class='["footer-banner", "container", { mobile: isMobile }]' width="100%" height="100%" alt=""
         :src='isMobile ? params.footerBanners.mobile : params.footerBanners.desktop'/>
    <!--    cChatBot-->
    <LazyPopupnotifCNotifications v-if="isPopupNotifications"
                                  :params="params"
                                  :is-mobile="isMobile"/>
    <!--    place-product-price-->
    <FooterCFooter :is-mobile="isMobile"
                   :params="params"
                   v-on:notice-update="updateNotice"/>
  </div>
</template>