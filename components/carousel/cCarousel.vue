<script lang="ts" setup>
const props = defineProps({
  city: {
    type: <any>Object
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  switchInterval: {
    type: Number,
    default: undefined
  },
  params: {
    type: <any>Object
  },
  items: {
    type: <any>Array
  }
})
const bannersStore = useBannersStore()
const notificationsStore = useNotificationsStore()

const banners = computed(() => {
  if (props.items) {
    return props.items
  } else if (bannersStore.banners) {
    return bannersStore.banners
  } else {
    return []
  }
})

watch(() => props.city, () => {
  loadBanners()
})

onMounted(() => {
  0 === banners.value.length && void 0 !== props.city && loadBanners().catch((e: any) => {
    notificationsStore.NOTIFICATIONS_UPD({
      title: "Произошла ошибка",
      desc: e,
      status: "error"
    })
    loadBanners()
  })
})

function loadBanners() {
  return bannersStore.GET(props.city)
}
</script>

<template>
  <LazyCarouselCCarouselMobile v-if="isMobile" :items="banners.length > 0 ? banners : [{}]" :switch-interval="switchInterval" :params="params"/>
  <LazyCarouselCCarouselDesktop v-if="!isMobile" :items="banners" :switch-interval="switchInterval" :params="params"/>
</template>