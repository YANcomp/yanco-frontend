<script lang="ts" setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  params: {
    type: Object
  }
})

const route = useRoute()

const notices = ref(<any>[])
const data = ref([{
  key: "noticePrice",
  text: 'Внимание! Указанные цены действительны только при бронировании через сайт.',
  textSize: 16,
  expireDays: 1,
}, {
  key: "noticeCookie",
  text: 'Используя этот сайт, вы выражаете согласие на сбор и обработку ваших персональных данных,' +
      ' в том числе с привлечением сторонних сервисов, с применением cookie-файлов и средств анализа поведения пользователей,' +
      ' согласно нашей <a href="/">Политике о персональных данных.</a>',
  textSize: 14,
  expireDays: 7,
  button: "Понятно"
}])

const hasBottomButton = computed(() => {
  return "Product" === route.name || "checkout" === route.name || "basket" === route.name
})

onMounted(() => {
  let time = (new Date).getTime();
  notices.value = data.value.filter((e) => {
    return time >= Number(localStorage.getItem(e.key))
  })
});

function close(key: any) {
  notices.value.splice(notices.value.findIndex((notice: any) => {
    if (notice.key === key) {
      localStorage.setItem(notice.key, ((new Date).getTime() + 864e5 * notice.expireDays).toString())
    }
    return notice.key === key
  }), 1)
}
</script>

<template>
  <section :class='["c-notices", { mobile: isMobile, "has-button": hasBottomButton }]'>
    <PopupnotifCNotice v-for="(item) in notices" :key="item.key" :notice="item" @close="close"/>
  </section>
</template>

<style>
.c-notices {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  pointer-events: none
}

.c-notices.mobile {
  bottom: calc(50px + env(safe-area-inset-bottom))
}

.c-notices.mobile.has-button {
  bottom: calc(110px + env(safe-area-inset-bottom))
}

.c-notices.mobile > .c-notice.hasButton > .wrap {
  flex-flow: column nowrap
}

.c-notices.mobile > .c-notice.hasButton > .wrap > button {
  max-width: 100%;
  margin-top: 10px
}

.c-notices.mobile > .c-notice > .wrap > .message {
  text-align: left;
  font-size: 12px !important
}
</style>