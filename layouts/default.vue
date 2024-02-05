<script setup lang="ts">

const appStore = useAppStore()
if (Object.keys(appStore.params).length < 1) {
  await appStore.PARAMS_GET()
}

const notifications = ref(<any>[]);

const change = () => {
  notifications.value[0] = {ID: 2, status: "basket"}
}

function closeNotice() {
  //TODO
  console.log("closeNotice from layout")
}
</script>

<template>
  <div id="app">
    <UiCSpinner v-if="appStore.isLoading"/>

    <NotificationsCNotifications :notifications="notifications" v-on:notice-close="closeNotice"/>

    <span @click="change">click in layout</span>
    <slot/>
  </div>
</template>