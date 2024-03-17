<script lang="ts" setup>
const route = useRoute()
const questionsStore = useQuestionsStore()

const isGlobalLoading = computed(() => {
  return useAppStore().getIsLoading
})
const isLoading = computed(() => {
  return isGlobalLoading.value
})
const isMobile = computed(() => {
  return useAppStore().isMobile
})
const params = computed(() => {
  return useAppStore().params
})
const questions = computed(() => {
  return questionsStore.mpPage
})

let titleHead = "Мобильное приложение — Cosmetic | Yanco"
let descHead = "Удобное мобильное приложение «Yanco + Cosmetic» в App Store или Google Play."
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
  <main class="v-mobile flex-vertical">
    <UiCSpinner v-show="isLoading" :is-mobile="isMobile" position="absolute" size="m"/>
    <div class="banner">
      <div class="title-apps">
        <h1>Мобильное приложение «Yanco + Cosmetic»</h1>
        <div class="apps">
          <a class="app-store" :href="params.appstoreLink" target="_blank" data-tooltip="App Store"/>
          <a class="google-play" :href="params.googlePlayLink" target="_blank" data-tooltip="Google Play"/>
          <a class="ru-store" :href="params.ruStoreLink" target="_blank" data-tooltip="Ru Store"/>
        </div>
      </div>
    </div>
    <div class="text">
      <span>
        Торопитесь лично оценить обновления, которые сделали использование мобильного приложения в разы удобнее!
        <br> <br>
        Итак, что нового?
      </span>
      <div class="answers">
        <div v-if="questions[0]" class="answer">
          <span class="answer-icon shopping"/>
          <span v-html="questions[0].answer"/>
        </div>
        <div v-if="questions[1]" class="answer">
          <span class="answer-icon loyality"/>
          <span v-html="questions[1].answer"/>
        </div>
        <div v-if="questions[2]" class="answer">
          <span class="answer-icon check"/>
          <span v-html="questions[2].answer"/>
        </div>
        <div v-if="questions[3]" class="answer">
          <span class="answer-icon search"/>
          <span v-html="questions[3].answer"/>
        </div>
      </div>
    </div>

    <h2>Акция! При первой авторизации в мобильном приложении «Аптека Апрель» 3 месяца клубных цен в подарок!</h2>
  </main>
</template>

<style scoped>
.v-mobile {
  max-width: 1368px;
  margin: auto
}

.v-mobile > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-mobile > .banner {
  width: 1368px;
  height: 430px;
  background: url(https://pictures.apteka-april.ru/generic/mobile/41639/desk.webp) no-repeat;
  background-size: contain;
  display: flex;
  padding: 3% 0 16% 7%;
  box-sizing: border-box
}

.v-mobile > .banner > .title-apps {
  max-width: 630px;
  display: flex;
  flex-flow: column;
  grid-gap: 26px;
  gap: 26px
}

.v-mobile > .banner > .title-apps > h1 {
  font-size: 36px;
  font-weight: 700;
  line-height: normal;
  margin: 0
}

.v-mobile > .banner > .title-apps > .apps {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 17.5px;
  gap: 17.5px
}

.v-mobile > .banner > .title-apps > .apps > a {
  width: 144px;
  height: 48px;
  background-size: contain;
  background-repeat: no-repeat
}

.v-mobile > .banner > .title-apps > .apps > a.app-store {
  background-image: url(https://pictures.apteka-april.ru/generic/mobile/41642/appstore_badge_footer.webp)
}

.v-mobile > .banner > .title-apps > .apps > a.google-play {
  background-image: url(https://pictures.apteka-april.ru/generic/mobile/41643/googleplay_badge_footer.webp)
}

.v-mobile > .banner > .title-apps > .apps > a.app-gallery {
  background-image: url(https://pictures.apteka-april.ru/generic/mobile/41641/appgallery_badge_footer.webp)
}

.v-mobile > .banner > .title-apps > .apps > a.ru-store {
  background-image: url(https://pictures.apteka-april.ru/generic/mobile/41644/rustore_badge_footer.webp)
}

.v-mobile > .text {
  max-width: 886px;
  display: flex;
  flex-flow: column;
  grid-gap: 30px;
  gap: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  font-size: 18px;
  font-weight: 400;
  line-height: 140%
}

.v-mobile > .text > .answers {
  display: flex;
  flex-flow: column;
  grid-gap: 24px;
  gap: 24px
}

.v-mobile > .text > .answers > .answer {
  display: flex;
  align-items: center;
  grid-gap: 20px;
  gap: 20px
}

.v-mobile > .text > .answers > .answer > .answer-icon {
  min-width: 24px;
  height: 24px
}

.v-mobile > .text > .answers > .answer > .answer-icon.shopping {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI2NDFfNDM3MjYpIj48cGF0aCBkPSJNOSAyM2gxMmEyIDIgMCAwMDItMlYzYTIgMiAwIDAwLTItMkgxMWEyIDIgMCAwMC0yIDJ2MW01IDBoNCIgc3Ryb2tlPSIjMUUxRTFFIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0zLjk2MyA2Ljg1N2wxLjA5MSA4LjQxN0EuODMzLjgzMyAwIDAwNS44OCAxNmg2LjM1M2E0IDQgMCAwMDMuOTYtMy40NGwuNjczLTQuNzUzYS44MzMuODMzIDAgMDAtLjgyNS0uOTVIMy45NjN6bTAgMEwxIDQiIHN0cm9rZT0iI0ZGMDA4OSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNNyAxMC4zMzNMOS44IDEzIDE0IDkiIHN0cm9rZT0iI0ZGMDA4OSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTkuNSIgcj0iMS41IiBmaWxsPSIjRkYwMDg5Ii8+PGNpcmNsZSBjeD0iNi41IiBjeT0iMTkuNSIgcj0iMS41IiBmaWxsPSIjRkYwMDg5Ii8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDBfMjY0MV80MzcyNiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgyNHYyNEgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==")
}

.v-mobile > .text > .answers > .answer > .answer-icon.loyality {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMTBWNWEzIDMgMCAwMTMtM2gxNmEzIDMgMCAwMTMgM3YxMGEzIDMgMCAwMS0zIDNoLS41TTEgNmgyMiIgc3Ryb2tlPSIjMUUxRTFFIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI2NDFfNDM3MjcpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIuNDI0IDE2YzAtMy4yNCAyLjU0NC01LjgxOCA1LjYyNC01LjgxOC4zNSAwIC42OTQuMDMzIDEuMDI4LjA5N0w1LjIzOSAyMS4wNGMtMS42NzYtMS0yLjgxNS0yLjg3Mi0yLjgxNS01LjA0em00LjYyOSA1LjcyN2MuMzIzLjA2LjY1Ni4wOTEuOTk1LjA5MSAyLjYwMiAwIDQuODIxLTEuODQgNS40NDgtNC4zNjNoLTQuOTJsLTEuNTIzIDQuMjcyem02LjYtNi4yMTJhNS44MyA1LjgzIDAgMDAtMi43NjctNC41MzhsLTEuNjE4IDQuNTM4aDQuMzg1ek04LjA0OCA4LjI0MkMzLjg0NCA4LjI0Mi40ODQgMTEuNzQyLjQ4NCAxNnMzLjM2IDcuNzU4IDcuNTY0IDcuNzU4YzQuMjA0IDAgNy41NjQtMy41IDcuNTY0LTcuNzU4cy0zLjM2LTcuNzU4LTcuNTY0LTcuNzU4eiIgZmlsbD0iI0ZGMDA4OSIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwXzI2NDFfNDM3MjciPjxwYXRoIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgOCkiIGQ9Ik0wIDBoMTZ2MTZIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=")
}

.v-mobile > .text > .answers > .answer > .answer-icon.check {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYgMjFWMTFINGEyIDIgMCAwMC0yIDJ2OGEyIDIgMCAxMDQgMHoiIHN0cm9rZT0iIzFFMUUxRSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNNCAyM2gxNWEzIDMgMCAwMDMtM1YzYTIgMiAwIDAwLTItMkg4YTIgMiAwIDAwLTIgMnY5IiBzdHJva2U9IiMxRTFFMUUiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHBhdGggZD0iTTExLjU5IDlhMS41IDEuNSAwIDEwMC0zIDEuNSAxLjUgMCAwMDAgM3pNMTAgMTQuNWg4bS04IDRoNCIgc3Ryb2tlPSIjRkYwMDg5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+")
}

.v-mobile > .text > .answers > .answer > .answer-icon.search {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI2NDFfNDM3MjkpIiBzdHJva2Utd2lkdGg9IjEuNSI+PHBhdGggZD0iTTEwLjggMjAuNGE5LjYgOS42IDAgMTAwLTE5LjIgOS42IDkuNiAwIDAwMCAxOS4yem0xMiAyLjRMMTggMTgiIHN0cm9rZT0iIzFFMUUxRSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTguNzU3IDguNTg2bC0yLjEyMSAyLjEyMWEzIDMgMCAwMDAgNC4yNDN2MGEzIDMgMCAwMDQuMjQzIDBsMi4xMi0yLjEyMk04Ljc1OCA4LjU4NmwyLjEyMi0yLjEyMmEzIDMgMCAwMTQuMjQyIDB2MGEzIDMgMCAwMTAgNC4yNDNMMTMgMTIuODI4TTguNzU3IDguNTg2TDEzIDEyLjgyOCIgc3Ryb2tlPSIjRkYwMDg5Ii8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDBfMjY0MV80MzcyOSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgyNHYyNEgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==")
}

.v-mobile > .text > .answers > .answer > span > p {
  margin: 0
}

.v-mobile > h2 {
  margin: 30px auto 60px;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #ff0089
}

@media screen and (max-width: 1368px) {
  .v-mobile {
    width: 100%
  }

  .v-mobile > .banner {
    width: 100%;
    height: auto;
    background-size: cover
  }

  .v-mobile > .text {
    margin-top: 40px
  }
}

@media screen and (max-width: 1200px) {
  .v-mobile > .banner > .title-apps {
    max-width: 580px
  }

  .v-mobile > .banner > .title-apps > h1 {
    font-size: 32px
  }

  .v-mobile > .banner > .title-apps > .apps > a {
    width: 130px;
    height: 43.2px;
    background-size: 100% 100%
  }

  .v-mobile > .text {
    margin-top: 25px;
    font-size: 16px
  }

  .v-mobile > h2 {
    font-size: 16px;
    margin: 25px auto 35px
  }
}

@media screen and (max-width: 800px) {
  .v-mobile > .banner > .title-apps {
    max-width: 400px;
    grid-gap: 15px;
    gap: 15px
  }

  .v-mobile > .banner > .title-apps > h1 {
    font-size: 22px
  }

  .v-mobile > .banner > .title-apps > .apps {
    grid-gap: 18px;
    gap: 18px
  }

  .v-mobile > .banner > .title-apps > .apps > a {
    width: 80px;
    height: 26.5px;
    background-size: 100% 100%
  }

  .v-mobile > .text {
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    padding: 0 10px;
    margin-top: 16px
  }

  .v-mobile > .text > .answers, .v-mobile > .text {
    grid-gap: 16px;
    gap: 16px
  }

  .v-mobile > h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
    padding: 0 10px;
    margin: 16px auto
  }
}

@media screen and (max-width: 600px) {
  .v-mobile > .banner {
    background: url(https://pictures.apteka-april.ru/generic/mobile/41640/mobile.webp) 50% no-repeat;
    background-size: cover;
    min-height: 500px;
    padding: 0
  }

  .v-mobile > .banner > .title-apps {
    margin-left: auto;
    margin-right: auto;
    margin-top: 14px;
    grid-gap: 13px;
    gap: 13px;
    max-width: 100%
  }

  .v-mobile > .banner > .title-apps > h1 {
    text-align: center;
    font-size: 32px
  }

  .v-mobile > .banner > .title-apps > .apps {
    justify-content: center;
    grid-gap: 13px;
    gap: 13px;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto
  }

  .v-mobile > .banner > .title-apps > .apps > a {
    width: 130px;
    height: 43.2px;
    background-size: 100% 100%
  }
}

@media screen and (max-width: 435px) {
  .v-mobile > .banner {
    min-height: 470px
  }

  .v-mobile > .banner > .title-apps > h1 {
    font-size: 24px
  }
}

@media screen and (max-width: 400px) {
  .v-mobile > .banner {
    min-height: 430px
  }
}

</style>