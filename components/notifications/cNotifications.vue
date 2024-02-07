<script lang="ts" setup>
import {watch} from "vue";

const route = useRoute()

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  notifications: {
    type: Array,
    default: () => []
  },
  params: {
    type: Object
  }
})
const emit = defineEmits(["notice-close"])


const internalItems = ref(props.notifications)
watch(props.notifications, (val: any) => {
  internalItems.value = val
})
const hasButton = computed(() => {
  return "basket" === route.name
})
const isHideMobileFooter = computed(() => {
  return false //this.$store.state.app.isHideMobileFooter
})

const isScreenDisabled = computed(() => {
  return internalItems.value.some((elem: any) => {
    return elem.disableScreen
  })
})
watch(isScreenDisabled, (val) => {
  if (val) {
    document.body.style.overflow = "hidden"
    document.body.style.position = "relative"
    document.addEventListener("keydown", disableTabAndEnter)
  } else {
    document.body.style.overflow = ""
    document.body.style.position = ""
    document.removeEventListener("keydown", disableTabAndEnter)
  }
})

function closeNotice(id: number) {
  internalItems.value = internalItems.value.map((elem: any) => {
    if (elem.ID === id) {
      elem.isClosed = true
      return elem
    }
  })
  emit("notice-close", id)
}

function disableTabAndEnter(t: any) {
  if (t.key == "Tab" && t.key == "Enter") {
    t.preventDefault()
  }
}
</script>

<template>
  <div :class='["c-notifications", {
    mobile: isMobile,
    "without-mobile-footer": isHideMobileFooter,
    "disable-screen": isScreenDisabled,
    "has-button": hasButton
  }]'>
    <div v-if="isScreenDisabled" class="overlay"/>
    <NotificationsCNotice
        v-for="(item) in internalItems"
        :key="item.ID"
        :is-mobile="isMobile"
        :notice="item"
        :params="params"
        v-on:notice-close="closeNotice"
    />
  </div>
</template>

<style scoped>
.c-notifications {
  bottom: 80px;
  right: 0;
  padding: 0;
  margin: 0 24px 0 0;
  z-index: 99992;
  position: fixed;
  list-style: none;
  max-width: 519px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  display: flex;
  flex-flow: column;
  align-items: flex-end
}

.c-notifications.mobile {
  width: 100%;
  max-width: 95%;
  margin: auto;
  right: 0;
  left: 0;
  top: auto;
  bottom: 70px
}

.c-notifications.mobile.has-button {
  bottom: 120px
}

.c-notifications.disable-screen {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: none;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end
}

.c-notifications.disable-screen > .overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3)
}

.c-notifications.disable-screen > .c-notice-desktop {
  right: 24px;
  bottom: 80px
}

.c-notifications.disable-screen.mobile {
  align-items: center
}

.c-notifications.disable-screen.mobile > .c-notice-mobile {
  width: 95%;
  bottom: 60px
}

</style>