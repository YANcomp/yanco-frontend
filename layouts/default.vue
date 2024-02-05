<script setup lang="ts">

const appStore = useAppStore()
if (Object.keys(appStore.params).length < 1) {
  await appStore.PARAMS_GET()
}

const notifications = ref(<any>[]);

const notBasket = () => {
  notifications.value.push({ID: 1, status: "basket"})
}
const notFavorites = () => {
  notifications.value.push({ID: 2, status: "favorites"})
}
const notCompare = () => {
  notifications.value.push({ID: 3, status: "compare"})
}
const notCompareLimit = () => {
  notifications.value.push({ID: 4, status: "compare-limited"})
}

function closeNotice(id: number) {
  notifications.value.splice(notifications.value.findIndex((item: any) => item.ID === id), 1)
}


// const clear = () => {
//   notifications.value.splice(0)
// }
</script>

<template>
  <div id="app">
    <UiCSpinner v-if="appStore.isLoading"/>
    <NotificationsCNotifications :notifications="notifications" v-on:notice-close="closeNotice"/>
    <span @click="notBasket">basket</span>
    <span @click="notFavorites">favorites</span>
    <span @click="notCompare">compare</span>
    <span @click="notCompareLimit">compare-limit</span>
    <slot/>
  </div>
</template>