<script lang="ts" setup>
const route = useRoute()
const params = computed(() => {
  return useAppStore().params
})
const isMobile = computed(() => {
  return useAppStore().isMobile
})
const headRef = ref({})

let titleHead = "Блогерам — Cosmetic | Yanco"
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
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: titleHead,
  ogDescription: descHead
})
</script>

<template>
  <main :class='["v-bloggers", { mobile: isMobile }]'>
    <div ref="headRef" class="banner">
      <div class="wrap">
        <section>
          <h1>
            <span class="blue-text">Приглашаем</span>
            <span class="pink-text">БЛОГЕРОВ</span>
            <span class="blue-text">к сотрудничеству</span>
          </h1>
        </section>
      </div>
    </div>
    <div class="we-look-at">
      <div class="banner-smm"/>
      <section>
        <h2>Мы рассматриваем</h2>
        <p>
          блогеров на всех возможных площадках! Мы ждём от вас обратную связь, если вы:
        </p>
        <ul>
          <li>бьюти-блогер;</li>
          <li>ведёте блог о семье, здоровье;</li>
          <li>делаете обзоры и распаковки.</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.v-bloggers {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 1368px;
  width: 100%;
  margin: 0 auto
}

.v-bloggers > .banner {
  display: flex;
  min-height: 400px;
  align-items: center;
  padding: 30px;
  background: url(https://pictures.apteka-april.ru/bloggers/1.webp) 50% no-repeat
}

.v-bloggers > .banner > .wrap {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box
}

[dir=ltr] .v-bloggers > .banner > .wrap > section {
  text-align: left
}

[dir=rtl] .v-bloggers > .banner > .wrap > section {
  text-align: right
}

.v-bloggers > .banner > .wrap > section > h1 {
  font-weight: 700;
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 1.6em
}

.v-bloggers > .banner > .wrap > section > h1 > span {
  max-width: 400px
}

.v-bloggers > .banner > .wrap > section > h1 > span.pink-text {
  color: #ff0089;
  font-size: 2.5em;
  line-height: 1.2em
}

.v-bloggers > .banner > .wrap > section > h1 > span.blue-text {
  color: #3f51b5;
  font-size: 1.4em;
  line-height: 1.2em
}

.v-bloggers > .banner > .wrap > section > button {
  min-width: 245px;
  max-width: 420px;
  height: 46px
}

.v-bloggers > .we-look-at {
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  align-items: center
}

.v-bloggers > .we-look-at > .banner-smm {
  width: 100%;
  max-width: 630px;
  height: 416px;
  background-image: url(https://pictures.apteka-april.ru/bloggers/2.webp);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-right: 40px
}

.v-bloggers > .we-look-at > section {
  margin: 20px;
  border-radius: 200px 200px 0 200px;
  padding: 100px 111px;
  box-shadow: 0 0 20px rgba(63, 81, 181, .2)
}

.v-bloggers > .we-look-at > section > h2 {
  color: #ff0089;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px
}

.v-bloggers > .we-look-at > section > p, .v-bloggers > .we-look-at > section > ul {
  font-weight: 400;
  font-size: 20px;
  line-height: 148.9%
}

.v-bloggers > .form {
  background-color: #f7f8fc;
  padding: 30px 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center
}

.v-bloggers > .form > h2 {
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  text-align: center
}

.v-bloggers > .form > h2 > a {
  color: #3f51b5;
  cursor: pointer
}

.v-bloggers > .form > .c-alert {
  justify-content: center;
  align-items: center
}

.v-bloggers > .form > .c-alert > .message {
  flex-grow: 0
}

.v-bloggers > .form > form {
  max-width: 600px;
  display: flex;
  flex-direction: column
}

.v-bloggers > .form > form label {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px
}

.v-bloggers > .form > form label span {
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 5px
}

.v-bloggers > .form > form label .required:after {
  content: "*";
  margin-left: 5px;
  color: #ff7a00
}

.v-bloggers > .form > form label > .c-edit > div > input {
  width: 100%;
  background-color: #fff
}

.v-bloggers > .form > form > .c-checkbox {
  flex-direction: row;
  align-items: center
}

.v-bloggers > .form > form > .c-checkbox > span {
  margin: 0
}

.v-bloggers > .form > form > .c-checkbox > span > a {
  color: #3f51b5
}

.v-bloggers > .form > form > .c-checkbox > span > a:hover {
  color: #4960df
}

.v-bloggers > .form > form > .c-checkbox > span > a:active {
  color: #32408f
}

.v-bloggers > .form > form > .required-fields {
  color: #ff7a00;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 20px;
  margin-bottom: 20px
}

.v-bloggers > .form > form > .submit-button > .c-button {
  max-width: 1230px
}

.v-bloggers > .form > form > .disabled {
  pointer-events: none;
  opacity: .5
}

.v-bloggers > .form > form > .submit-button > .c-button.disabled {
  font-size: 14px
}

@media screen and (max-width: 1350px) {
  .v-bloggers > .we-look-at > section {
    padding: 60px 80px
  }

  .v-bloggers > .we-look-at > section > h2 {
    font-size: 26px
  }

  .v-bloggers > .we-look-at > section > p {
    font-size: 15px
  }
}

@media screen and (max-width: 850px) {
  .v-bloggers > .banner {
    min-height: 300px;
    background: url(https://pictures.apteka-april.ru/bloggers/1-mobile.webp) 50% no-repeat;
    background-size: cover
  }

  .v-bloggers > .banner > .wrap > section > h1 {
    margin-bottom: .5em
  }

  .v-bloggers > .banner > .wrap > section > h1 > span.pink-text {
    font-size: 1.4em
  }

  .v-bloggers > .banner > .wrap > section > h1 > span.blue-text {
    font-size: .9em
  }

  .v-bloggers > .banner > .wrap > section > button {
    min-width: 135px;
    max-width: 250px;
    height: 32px
  }

  .v-bloggers > .we-look-at {
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px
  }

  .v-bloggers > .we-look-at > section {
    border-radius: 0;
    box-shadow: none;
    padding: 0
  }

  .v-bloggers > .we-look-at > section > h2 {
    font-size: 26px
  }

  .v-bloggers > .we-look-at > section p {
    font-size: 14px
  }

  .v-bloggers > .form > h2 {
    font-size: 22px
  }

  [dir=ltr] .v-bloggers > .form > .c-alert {
    text-align: left
  }

  [dir=rtl] .v-bloggers > .form > .c-alert {
    text-align: right
  }

  .v-bloggers > .form > .c-alert {
    padding-right: 30px
  }
}

@media screen and (max-width: 600px) {
  .v-bloggers.mobile > .banner {
    min-height: 200px
  }

  .v-bloggers.mobile > .banner > .wrap {
    padding: 0
  }

  .v-bloggers.mobile > .banner > .wrap > section > h1 {
    margin-bottom: .2em
  }

  .v-bloggers.mobile > .banner > .wrap > section > h1 > span.pink-text {
    font-size: .9em
  }

  .v-bloggers.mobile > .banner > .wrap > section > h1 > span.blue-text {
    font-size: .55em
  }

  .v-bloggers.mobile > .banner > .wrap > section > .c-button {
    max-width: 150px
  }

  .v-bloggers.mobile > .we-look-at > .banner-smm {
    margin: 0;
    max-height: 250px
  }

  .v-bloggers.mobile > .we-look-at > section {
    margin: 5px
  }

  .v-bloggers.mobile > .we-look-at > section > .we-look-at {
    margin-top: 10px;
    margin-bottom: 10px
  }

  .v-bloggers.mobile > .form {
    padding: 10px
  }

  .v-bloggers.mobile > .form > h2 {
    font-size: 15px;
    line-height: normal
  }

  .v-bloggers.mobile > .form > form > label > .c-combobox > .c-edit {
    padding: 0
  }
}
</style>