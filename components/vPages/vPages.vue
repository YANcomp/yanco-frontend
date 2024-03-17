<script lang="ts" setup>
const props = defineProps({
  slug: {
    type: String,
    required: !0
  }
})
const route = useRoute()
const appStore = useAppStore()
const params = computed(() => {
  return appStore.params
})

const isLocalLoading = ref(!0)
const isFailedGettingPage = ref(!1)
const page = ref({})
const isNotFound = ref(!1)
const isPageAboutUs = ref(!1)

const isMounted = ref(!1)
const limit = ref(8)
const offset = ref(0)

await useNuxtApp().$api.pages.get(props.slug).then((p: any) => {
  page.value = p[0]
  1 === page.value.ID && (page.value.content = page.value.content.replace("$pharmaciesCount", "".concat(params.value.pharmaciesCount)).replace("$regionsCount", "".concat(params.value.regionsCount)))
  5 === page.value.ID && (isPageAboutUs.value = !0)
}).catch((t: any) => {
  isNotFound.value = "string" != typeof t && 404 === t.code
  isFailedGettingPage.value = !0
  isNotFound.value || useNotificationsStore().NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}).finally(() => {
  isLocalLoading.value = !1
})

if (isNotFound.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

const articleRef = ref(<any>undefined)

const isGlobalLoading = computed(() => {
  return appStore.getIsLoading
})
const isLoading = computed(() => {
  return isLocalLoading.value && !isGlobalLoading.value
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const pageTitle = computed(() => {
  return page.value.title
})
const pageContent = computed(() => {
  return page.value.content
})
const isShowButtonMore = computed(() => {
  return isMounted.value && isPageAboutUs.value && offset.value < params.value.videoAboutUs.length
})
const preparedLoadMoreText = computed(() => {
  return "ПОКАЗАТЬ ЕЩЁ " + (params.value.videoAboutUs.length - offset.value > limit.value ? limit.value : params.value.videoAboutUs.length - offset.value) + " ИЗ " + params.value.videoAboutUs.length + " ВИДЕО"
})
const countBarWidth = computed(() => {
  return offset.value / (params.value.videoAboutUs.length / 100)
})

onMounted(() => {
  isMounted.value = !0
  isPageAboutUs.value && loadMoreVideo()
})

function loadMoreVideo() {
  let video = params.value.videoAboutUs.slice(offset.value, limit.value + offset.value),
      t = uVideo(video);
  if (void 0 !== t) {
    offset.value += video.length;
    for (var e = 0, n = [...t]; e < n.length; e++) {
      var i = n[e];
      articleRef.value.append(i)
    }
  }
}

let titleHead = page.value.title + " — Cosmetic | Yanco"
let descHead = page.value.metaDescription
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: params.value.siteURL + route.path,
    },
  ],
}))
useSeoMeta({
  title: titleHead,
  description: descHead,
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://cosmetic.yanco.ru/img/cosmetic_logo.png',
  ogTitle: titleHead,
  ogDescription: descHead
})
</script>

<template>
  <main :class='["v-pages", { loading: isLoading }]'>
    <UiCSpinner v-show="isLoading" :is-mobile="isMobile" position="absolute" size="m"/>
    <section v-show="!isLoading && !isFailedGettingPage && !isLocalLoading">
      <h1>{{ pageTitle }}</h1>
      <article ref="articleRef" v-html="$mdRenderer.render(pageContent)"/>
      <UiCButton v-if="isShowButtonMore" class="load-more" @click="loadMoreVideo">
        {{ preparedLoadMoreText }}
        <div class="line" :style='{ width: countBarWidth + "%" }'/>
      </UiCButton>
    </section>
  </main>
</template>

<style scoped>
.v-pages {
  padding: 0 20px;
  max-width: 1000px;
  position: relative
}

.v-pages.loading, .v-pages {
  margin: auto
}

.v-pages > .c-spinner {
  display: block;
  left: 0
}

.v-pages > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-pages > section > :deep(article) > iframe {
  margin-right: 5px
}

.v-pages > section > .load-more {
  margin-top: 30px;
  margin-bottom: 20px;
  max-width: 100%;
  width: 100%;
  height: 52px;
  background: #ebf0f9;
  border: none;
  color: #3f51b5;
  position: relative
}

.v-pages > section > .load-more .line {
  position: absolute;
  background-color: #3f51b5;
  height: 2px;
  bottom: -7px;
  left: -3px
}

.v-pages > section > .load-more .caption {
  justify-content: center
}

.v-pages > section > .load-more .icon {
  width: 12px;
  height: 12px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin-left: 10px
}

@media screen and (max-width: 850px) {
  .v-pages {
    word-wrap: break-word;
    margin: 0
  }
}

@media screen and (max-width: 520px) {
  .v-pages > section > :deep(article) > iframe {
    width: 100%
  }
}

</style>