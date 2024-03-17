<script lang="ts" setup>

const questionsStore = useQuestionsStore()
const questions = ref(questionsStore.help)

const isFailedGettingQuestions = ref(false)
const isLocalLoading = ref(true)

await questionsStore.GET_HELP().then((q) => {
  questions.value = null != q ? q : []
  isFailedGettingQuestions.value = false
}).catch((t) => {
  isFailedGettingQuestions.value = true
  useNotificationsStore().NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}).finally(() => {
  isLocalLoading.value = false
})

const route = useRoute()
const params = computed(() => {
  return useAppStore().params
})
const isMobile = computed(() => {
  return useAppStore().isMobile
})
const isAuthorized = computed(() => {
  return useSessionsStore().isAuthorized
})
const isGlobalLoading = computed(() => {
  return useAppStore().getIsLoading
})
const isLoading = computed(() => {
  return isLocalLoading.value && !isGlobalLoading.value
})
const preparedQuestions = computed(() => {
  return void 0 !== questions.value ? questions.value.filter((e: any) => {
    return 71 !== e.ID
  }) : questions.value
})

let titleHead = "Вопрос-ответ — Cosmetic | Yanco"
let descHead = "Ответы на часто задаваемые вопросы по регистрации на сайте, оформлению, оплате и получению заказа."
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
  <main class="v-help container">
    <h1>Ответы на часто задаваемые вопросы</h1>
    <UiCSpinner v-show="isLoading" :is-mobile="isMobile" position="absolute" size="m"/>
    <UiCHelp v-show="!isLoading && !isFailedGettingQuestions" :is-mobile="isMobile" :questions="preparedQuestions"
             :is-authorized="isAuthorized"/>
  </main>
</template>

<style scoped>
.v-help {
  text-align: center;
  position: relative;
  padding: 0
}

.v-help > .c-spinner {
  left: 0
}

.v-help > h1 {
  margin-top: 0;
  text-align: left;
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 20px;
  line-height: 30px
}

.v-help > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center
}

@media screen and (max-width: 1367px) {
  .v-help {
    padding: 0 20px
  }
}

@media screen and (max-width: 850px) {
  .v-help {
    padding: 0 10px
  }

  .v-help > h1 {
    font-size: 24px
  }
}

</style>