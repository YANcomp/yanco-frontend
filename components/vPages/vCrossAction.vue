<script lang="ts" setup>
const route = useRoute()
const params = computed(() => {
  return useAppStore().params
})
const isMobile = computed(() => {
  return useAppStore().isMobile
})
const headRef = ref({})

let titleHead = "Сотрудничество по кросс-акциям — Cosmetic | Yanco"
let descHead = ""
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
  <main class="v-cross-action">
    <div ref="headRef" class="banner">
      <div class="wrap">
        <section>
          <h1>Приглашаем партнёров к сотрудничеству по совместному продвижению брендов!</h1>
        </section>
      </div>
    </div>
    <div class="we-look-at">
      <div class="infographic"/>
      <section>
        <h2>Мы рассматриваем</h2>
        <ul>
          <li>кросс-акции;</li>
          <li>коммерческое продвижение;</li>
          <li>совместные мероприятия;</li>
          <li>коллаборации;</li>
          <li>корпоративные программы.</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.v-cross-action {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 1368px;
  width: 100%;
  margin: 0 auto
}

.v-cross-action > .banner {
  display: flex;
  min-height: 400px;
  padding: 65px 95px;
  background: url(https://pictures.apteka-april.ru/generic/cross_action/40152/main-banner.webp) 50% no-repeat;
  height: 430px;
  box-sizing: border-box
}

.v-cross-action > .banner > .wrap {
  max-width: 500px;
  width: 100%;
  margin: 0;
  padding: 0 10px;
  box-sizing: border-box
}

[dir=ltr] .v-cross-action > .banner > .wrap > section {
  text-align: left
}

[dir=rtl] .v-cross-action > .banner > .wrap > section {
  text-align: right
}

.v-cross-action > .banner > .wrap > section > h1 {
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 33px;
  font-size: 36px;
  line-height: normal;
  color: #3f51b5
}

.v-cross-action > .banner > .wrap > section > .c-button {
  box-sizing: border-box;
  max-width: 259px;
  height: 58px;
  padding: 12px 24px
}

.v-cross-action > .banner > .wrap > section > .c-button > .caption {
  font-size: 16px
}

.v-cross-action > .we-look-at {
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-around
}

.v-cross-action > .we-look-at > .infographic {
  width: 100%;
  max-width: 630px;
  height: 527px;
  background-image: url(https://pictures.apteka-april.ru/generic/cross_action/40154/infographic.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-right: 40px
}

.v-cross-action > .we-look-at > section {
  margin: 20px;
  border-radius: 200px 200px 0 200px;
  padding: 80px 120px;
  box-shadow: 0 0 20px rgba(63, 81, 181, .2)
}

.v-cross-action > .we-look-at > section > h2 {
  color: #ff0089;
  font-weight: 700;
  font-size: 32px;
  line-height: normal;
  margin-top: 0
}

.v-cross-action > .we-look-at > section > ul {
  font-size: 24px;
  font-weight: 400;
  line-height: 148.9%
}

.v-cross-action > .form {
  background-color: #f7f8fc;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center
}

.v-cross-action > .form > h1 {
  font-weight: 600;
  font-size: 30px;
  line-height: normal;
  text-align: center
}

.v-cross-action > .form > form {
  max-width: 600px;
  display: flex;
  flex-direction: column
}

.v-cross-action > .form > form > label {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px
}

.v-cross-action > .form > form > label > span {
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 5px
}

.v-cross-action > .form > form > label .required:after {
  content: "*";
  margin-left: 5px;
  color: #ff7a00
}

.v-cross-action > .form > form > label > .c-edit > div > input {
  width: 100%;
  background-color: #fff
}

.v-cross-action > .form > form > .c-checkbox {
  flex-direction: row;
  align-items: center
}

.v-cross-action > .form > form > .c-checkbox > span {
  margin: 0
}

.v-cross-action > .form > form > .c-checkbox > span > a {
  color: #3f51b5
}

.v-cross-action > .form > form > .c-checkbox > span > a:hover {
  color: #4960df
}

.v-cross-action > .form > form > .c-checkbox > span > a:active {
  color: #32408f
}

.v-cross-action > .form > form > .required-fields {
  color: #ff7a00;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 20px;
  margin-bottom: 20px
}

.v-cross-action > .form > form > .c-button {
  max-width: none
}

.v-cross-action > .form > form > .disabled {
  pointer-events: none;
  opacity: .5
}

@media screen and (max-width: 1350px) {
  .v-cross-action > .we-look-at > .infographic {
    height: 350px;
    max-width: 500px
  }

  .v-cross-action > .we-look-at > section {
    padding: 80px 100px
  }

  .v-cross-action > .we-look-at > section > h2 {
    font-size: 26px
  }

  .v-cross-action > .we-look-at > section > ul {
    font-size: 15px
  }

  .v-cross-action > .form > h1 {
    font-size: 20px
  }
}

@media screen and (max-width: 850px) {
  .v-cross-action > .banner {
    background: url(https://pictures.apteka-april.ru/generic/cross_action/40153/main_banner_mob.webp) 50% no-repeat;
    align-items: center;
    min-height: auto;
    max-height: 300px;
    background-size: cover
  }

  .v-cross-action > .banner > .wrap > section > h1 {
    font-size: 28px
  }

  .v-cross-action > .we-look-at > section {
    padding: 60px 90px;
    border-radius: 150px 150px 0 150px
  }

  .v-cross-action > .we-look-at > section > h2 {
    font-size: 20px
  }

  .v-cross-action > .we-look-at > section > ul {
    font-size: 14px
  }

  .v-cross-action > .form > h1 {
    font-size: 16px
  }
}

@media screen and (max-width: 700px) {
  .v-cross-action > .banner > .wrap > section > h1 {
    font-size: 24px;
    text-align: center
  }

  .v-cross-action > .banner > .wrap > section > .c-button {
    max-width: none;
    height: 40px
  }

  .v-cross-action > .banner > .wrap > section > .c-button > .caption {
    font-size: 14px
  }

  .v-cross-action > .we-look-at > section {
    padding: 40px 60px;
    border-radius: 100px 100px 0 100px
  }

  .v-cross-action > .we-look-at > section > h2 {
    font-size: 16px
  }

  .v-cross-action > .we-look-at > section > ul {
    font-size: 12px;
    padding-left: 25px
  }

  .v-cross-action > .form {
    padding: 15px 10px
  }

  .v-cross-action > .form > h1 {
    font-size: 15px
  }

  .v-cross-action > .form > form > label > span {
    font-size: 13px
  }
}

@media screen and (max-width: 550px) {
  .v-cross-action > .banner {
    padding: 40px 50px;
    max-height: 250px
  }

  .v-cross-action > .banner > .wrap > section > h1 {
    font-size: 20px
  }

  .v-cross-action > .banner > .wrap > section > .c-button > .caption {
    font-size: 11px
  }

  .v-cross-action > .we-look-at {
    flex-flow: column-reverse;
    padding: 0 10px
  }

  .v-cross-action > .we-look-at > .infographic {
    margin: 30px 0 0
  }

  .v-cross-action > .we-look-at > section {
    padding: 0;
    box-shadow: none;
    width: 100%;
    margin: 0
  }

  .v-cross-action > .we-look-at > section > h2 {
    font-size: 24px
  }

  .v-cross-action > .we-look-at > section > ul {
    font-size: 16px
  }

  .v-cross-action > .form > form > label > .c-multiselect {
    min-height: 80px
  }

  .v-cross-action > .form > form > label > .c-multiselect > .c-edit > div > .placeholder {
    top: 27px
  }
}

@media screen and (max-width: 400px) {
  .v-cross-action > .banner {
    max-height: 200px;
    padding: 20px 30px
  }

  .v-cross-action > .banner > .wrap > section > h1 {
    font-size: 16px
  }

  .v-cross-action > .we-look-at > section > h2 {
    font-size: 18px
  }

  .v-cross-action > .we-look-at > section > ul {
    font-size: 14px
  }

  .v-cross-action > .we-look-at > .infographic {
    height: 250px
  }

  .v-cross-action > .form > h1 {
    font-size: 14px
  }

  .v-cross-action > .form > form > label > span {
    font-size: 12px
  }
}

</style>