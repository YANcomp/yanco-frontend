<script lang="ts" setup>
const route = useRoute()
const currentHeight = ref(0)
const currentWidth = ref(0)
const isShowThisTag = ref(!1)


const params = computed(() => {
  return useAppStore().params
})
const isMobile = computed(() => {
  return useAppStore().isMobile
})
const isWebView = computed(() => {
  return Boolean(route.query.webview)
})
const pluralizeCompanyAge = computed(() => {
  return uPluralize(params.value.companyAge, ["год", "года", "лет"])
})
const pluralizeRegions = computed(() => {
  return uPluralize(params.value.regionsCount, ["регионе", "регионах", "регионах"])
})

onMounted(() => {
  window.addEventListener("resize", resize)
  nextTick(() => {
    resize()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

function resize() {
  currentWidth.value = window.innerWidth
  isShowThisTag.value = window.innerWidth <= 500
  currentHeight.value = window.innerHeight
}

let titleHead = "Работа у нас — Cosmetic | Yanco"
let descHead = "Работа в компании «Yanco»: форма отправки анкеты и резюме, преимущества работы в нашей компании и контакты."
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
  <main :class='["v-vacancy", "flex-vertical-nowrap", { mobile: isMobile, webview: isWebView }]'>
    <div class="banner"
         :style='{ backgroundImage: isMobile && currentWidth <= 700 ? "url(https://pictures.apteka-april.ru/vacancies/banner1_mobile.webp)" : "url(https://pictures.apteka-april.ru/vacancies/banner1.webp)" }'>
      <div class="wrap">
        <section>
          <h1>
            <span>Стань частью нашей</span>
            <span>команды!</span>
          </h1>
        </section>
      </div>
    </div>
    <div class="about">
      <div class="wrap">
        <div>
          <div class="map"/>
          <section>
            <h2>О компании</h2>
            <p>Федеральная сеть магазинов «Yanco + Cosmetic» — лидер фармацевтической розницы, обладатель престижной
              премии «Магазин года».</p>
            <NuxtLink :to='{ name: "about" }'>
              Подробнее о компании
              <UiCArrowSVG hover-color="#4659c4" color="#3f51b5" size="s"/>
            </NuxtLink>
          </section>
        </div>
        <div>
          <div>
            <p>{{ params.companyAge }}</p>
            <span>{{ pluralizeCompanyAge }} успешной работы</span>
          </div>
          <div>
            <p>{{ params.pharmaciesCount }}+</p>
            <span>{{ "аптек в " + params.regionsCount + " " + pluralizeRegions + " России" }}</span>
          </div>
          <div>
            <p>7 млн</p>
            <span>постоянных покупателей</span>
          </div>
        </div>
      </div>
      <div>
        <div class="wrap">
          <div>
            <div>
              <p>Сейчас «Yanco + Cosmetic» объединяет 22 000 сотрудников</p>
              <div>
                Сегодняшние успехи компании — это, прежде всего, заслуга профессиональных, активных и целеустремленных
                сотрудников. Слаженная работа и совместные усилия всех членов команды позволили «Апрелю» стать самой
                быстро
                развивающейся аптечной сетью в стране.
              </div>
            </div>
            <div>
              <p>70% руководителей добились карьерного роста внутри компании</p>
              <div>Мы ценим потенциал каждого сотрудника и даем возможности для развития. Также особое внимание уделяем
                формированию кадрового резерва — проводим активную работу со студентами фармацевтических колледжей и
                ВУЗов, обучаем и адаптируем новых сотрудников.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="features">
      <section>
        <h2>Почему «Апрель»?</h2>
        <ul>
          <li>
            <img src="https://pictures.apteka-april.ru/vacancies/svg/1.svg" alt="" width="100%" height="100%"/>
            <div>
              <span class="name">Старт карьеры</span>
              <span>
                Мы даем шанс всем студентам на практике
                изучать основы профессии! Лучших приглашаем
                на постоянную работу в нашей сети.
              </span>
            </div>
          </li>
          <li>
            <img src="https://pictures.apteka-april.ru/vacancies/svg/2.svg" alt="" width="100%" height="100%"/>
            <div>
              <span class="name">Возможность роста</span>
              <span>
                В нашей компании на постоянной основе
                проводится обучение для всех сотрудников
                аптек – мы помогаем улучшать профессиональные навыки!
              </span>
            </div>
          </li>
          <li>
            <img src="https://pictures.apteka-april.ru/vacancies/svg/3.svg" alt="" width="100%" height="100%"/>
            <div>
              <span class="name">Социальные гарантии</span>
              <span>
                Стабильная работа в федеральной аптечной сети,
                белая заработная плата и всегда своевременное
                её получение, оформление по ТК РФ, полный соц.пакет.
              </span>
            </div>
          </li>
          <li>
            <img src="https://pictures.apteka-april.ru/vacancies/svg/4.svg" alt="" width="100%" height="100%"/>
            <div>
              <span class="name">Корпоративная культура</span>
              <span>
                Для сотрудников первого стола в нашей сети
                регулярно запускаются конкурсы с розыгрышем
                ценных призов и туристических путевок.
                Ежемесячно наши фармацевты-победители получают свои выигрыши!
              </span>
            </div>
          </li>
          <li>
            <img src="https://pictures.apteka-april.ru/vacancies/svg/5.svg" alt="" width="100%" height="100%"/>
            <div>
              <span class="name">Мотивация и поощрение</span>
              <span>
                Зарабатывая бонусы мотивации, сотрудники
                первого стола нашей сети самостоятельно
                влияют на уровень своей заработной платы
                и постоянно повышают свой доход.
              </span>
            </div>
          </li>
          <li>
            <img src="https://pictures.apteka-april.ru/vacancies/svg/6.svg" alt="" width="100%" height="100%"/>
            <div>
              <span class="name">Свобода перемещений</span>
              <span>
                Меняя место жительства, сотрудникам наших
                аптек не приходится менять работодателя!
                Фармацевты могут продолжать работу в
                компании и после переезда – сеть «Апрель»
                присутствует в {{ params.regionsCount }} {{ pluralizeRegions }}) страны
                и на сегодняшний день насчитывает
                более {{ params.pharmaciesCount }} аптек.
              </span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.v-vacancy {
  max-width: 1368px;
  width: 100%;
  margin: auto;
  min-height: -webkit-fit-content;
  min-height: -moz-fit-content;
  min-height: fit-content;
  display: flex;
  flex-direction: column
}

.v-vacancy.webview {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  max-width: 100%;
  z-index: 10000
}

.v-vacancy.webview:before {
  content: " ";
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff;
  z-index: -1
}

.v-vacancy.webview > .about > .wrap > div:first-of-type > section > a, .v-vacancy.webview > .work-in-faces {
  display: none
}

.v-vacancy.webview > .contacts > .wrap .info > ul > li > span.address {
  cursor: inherit;
  color: #1a1a1a
}

.v-vacancy.webview > .contacts > .wrap > div {
  display: none
}

.v-vacancy .wrap {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box
}

.v-vacancy > .banner {
  display: flex;
  min-height: 400px;
  align-items: center;
  background-position: 50%;
  background-repeat: no-repeat
}

[dir=ltr] .v-vacancy > .banner > .wrap > section {
  text-align: left
}

[dir=rtl] .v-vacancy > .banner > .wrap > section {
  text-align: right
}

.v-vacancy > .banner > .wrap > section > h1 {
  font-weight: 700;
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 1.6em
}

.v-vacancy > .banner > .wrap > section > h1 > span:first-child {
  color: #3f51b5;
  font-size: 1.18em
}

.v-vacancy > .banner > .wrap > section > h1 > span:last-child {
  color: #ff0089;
  font-size: 2.5em;
  line-height: .8em
}

.v-vacancy > .banner > .wrap > section > button {
  min-width: 245px;
  height: 46px
}

.v-vacancy > .about {
  min-height: 530px;
  margin: 15px 0
}

.v-vacancy > .about > .wrap {
  max-width: 1369px
}

.v-vacancy > .about > .wrap > div:first-of-type {
  display: flex;
  justify-content: space-between;
  align-items: center
}

[dir=ltr] .v-vacancy > .about > .wrap > div:first-of-type > section {
  text-align: left
}

[dir=rtl] .v-vacancy > .about > .wrap > div:first-of-type > section {
  text-align: right
}

.v-vacancy > .about > .wrap > div:first-of-type > section {
  width: 100%;
  max-width: 458px;
  border-radius: 200px 200px 0 200px;
  padding: 70px 90px;
  box-shadow: 0 0 20px rgba(63, 81, 181, .2)
}

.v-vacancy > .about > .wrap > div:first-of-type > section > h2 {
  color: #ff0089;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px
}

.v-vacancy > .about > .wrap > div:first-of-type > section > p {
  margin-top: 0;
  font-weight: 400;
  font-size: 20px;
  white-space: pre-line
}

.v-vacancy > .about > .wrap > div:first-of-type > section > a {
  color: #4659c4;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  display: flex;
  align-items: center
}

.v-vacancy > .about > .wrap > div:first-of-type > section > a:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-vacancy > .about > .wrap > div:first-of-type > section > a:hover > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.v-vacancy > .about > .wrap > div:first-of-type > .map {
  width: 100%;
  max-width: 692px;
  height: 456px;
  background-image: url(https://pictures.apteka-april.ru/vacancies/svg/map.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%
}

.v-vacancy > .about > .wrap > div:first-of-type + div {
  display: flex;
  justify-content: space-between
}

.v-vacancy > .about > .wrap > div:first-of-type + div > div {
  color: #4659c4;
  text-align: center;
  width: 33.33333%
}

.v-vacancy > .about > .wrap > div:first-of-type + div > div > p {
  margin-top: 0;
  margin-bottom: -15px;
  font-weight: 700;
  font-size: 110px;
  line-height: 134px;
  background: linear-gradient(90.1deg, #a51e98 1.98%, #d90d73 98.08%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent
}

.v-vacancy > .about > .wrap > div:first-of-type + div > div:nth-child(2) > p {
  background: linear-gradient(90deg, #404cae, #7245cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent
}

.v-vacancy > .about > .wrap > div:first-of-type + div > div:nth-child(3) > p {
  background: linear-gradient(90deg, #6e3daa, #f20078);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent
}

.v-vacancy > .about > .wrap > div:first-of-type + div > div > span {
  white-space: pre-line;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px
}

.v-vacancy > .about > div:last-of-type {
  margin-top: 40px;
  background-color: #f7f8fc
}

.v-vacancy > .about > div:last-of-type > .wrap {
  max-width: 100%;
  padding: 40px;
  height: 100%;
  display: flex;
  justify-content: space-between
}

[dir=ltr] .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type {
  text-align: left
}

[dir=rtl] .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type {
  text-align: right
}

.v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-right: 15px;
  min-width: 260px
}

.v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div {
  width: 50%
}

.v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div:first-child {
  width: calc(50% - 80px);
  padding-right: 80px
}

.v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div > div {
  font-weight: 400;
  font-size: 16px;
  line-height: 148.9%;
  max-width: 550px
}

.v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div > p {
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #ff0089;
  margin: 0 0 20px
}

.v-vacancy > .about > div:last-of-type > .wrap > .image {
  max-height: 630px;
  max-width: 560px;
  width: 100%
}

.v-vacancy > .about > div:last-of-type > .wrap > .image > img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover
}

.v-vacancy > .work-in-faces {
  margin-bottom: 40px
}

.v-vacancy > .work-in-faces > section {
  background-color: #f7f8fc;
  display: flex;
  height: 400px;
  overflow: hidden
}

.v-vacancy > .work-in-faces > section > div {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center
}

.v-vacancy > .work-in-faces > section > div:last-child {
  padding: 40px 60px
}

.v-vacancy > .work-in-faces > section > div > div {
  margin-bottom: 14px
}

.v-vacancy > .work-in-faces > section > div > div:first-child {
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #ff0089
}

.v-vacancy > .work-in-faces > section > div > div:nth-child(2) {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #1e1e1e
}

.v-vacancy > .work-in-faces > section > div > div:nth-child(3) {
  font-weight: 400;
  font-size: 16px;
  line-height: 148.9%;
  color: #1e1e1e;
  max-width: 560px;
  max-height: 170px;
  overflow: hidden
}

.v-vacancy > .work-in-faces > section > div > a {
  color: #4659c4;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-top: 30px
}

.v-vacancy > .work-in-faces > section > div > a:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-vacancy > .work-in-faces > section > div > a:hover > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.v-vacancy > .work-in-faces > h2 {
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #3f51b5
}

.v-vacancy > .video {
  display: flex;
  align-self: center;
  max-width: 1180px;
  width: 100%
}

.v-vacancy > .video:first-of-type {
  margin-bottom: 20px
}

.v-vacancy > .form {
  background-color: #ebf0f9;
  padding: 0 10px 40px;
  margin: 40px 0
}

.v-vacancy > .form > .poll-info {
  display: flex;
  flex-flow: column;
  text-align: center;
  margin-bottom: 10px
}

.v-vacancy > .form > .poll-info > h2 {
  font-size: 2em;
  margin: .67em 0 0
}

.v-vacancy > .form > .poll-info > p {
  margin: 5px 0;
  font-size: 16px
}

.v-vacancy > .form > h2 {
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: #1e1e1e;
  margin-bottom: 10px
}

.v-vacancy > .form > .city {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: left;
  margin: 10px 0 30px
}

.v-vacancy > .form > .city > span {
  margin-right: 10px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center
}

.v-vacancy > .form > .city > span.city-name {
  display: flex;
  align-items: center;
  color: #3f51b5;
  cursor: pointer;
  margin-right: 0
}

.v-vacancy > .form > .city > span.city-name:hover {
  color: #4e62d1
}

.v-vacancy > .form > .city > span.city-name > .icon {
  background-color: #ff0089;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 80%;
  mask-size: 80%
}

.v-vacancy > .form > .city > .c-combobox {
  width: 300px
}

.v-vacancy > .form > .city > .c-combobox .locality {
  color: #8e8e8e !important;
  font-size: 14px !important
}

.v-vacancy > .form > .city > .c-combobox > .c-menu {
  z-index: 4
}

.v-vacancy > .form > .city > .c-combobox > .c-menu > li.m {
  padding: 7px
}

.v-vacancy > .form > form {
  max-width: 500px;
  text-align: left;
  margin: auto;
  display: flex;
  flex-flow: column nowrap
}

.v-vacancy > .form > form > span {
  color: #ff7a00;
  margin-top: 12px
}

.v-vacancy > .form > form > .form-row {
  display: flex;
  flex-flow: column nowrap;
  font-weight: 500;
  font-size: 14px;
  color: #1e1e1e;
  position: relative;
  margin-bottom: 20px
}

.v-vacancy > .form > form > .form-row:not(.phone) {
  line-height: 25px
}

.v-vacancy > .form > form > .form-row > .mx-datepicker {
  width: -webkit-fill-available;
  width: -moz-available;
  height: 44px
}

.v-vacancy > .form > form > .form-row > .mx-datepicker.invalid {
  border: 1px solid #f14a4a;
  border-radius: 4px
}

.v-vacancy > .form > form > .form-row > .mx-datepicker > div > .mx-input {
  border: 1px solid #e7e7ea;
  box-shadow: none;
  height: 44px
}

.v-vacancy > .form > form > .form-row > .mx-datepicker > div > .mx-icon-calendar {
  width: 24px;
  height: 24px;
  background-color: #818ca9;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE2LjUgMy42NjdoLTExYTMuNjY3IDMuNjY3IDAgMDAtMy42NjcgMy42NjZWMTYuNUEzLjY2NyAzLjY2NyAwIDAwNS41IDIwLjE2N2gxMWEzLjY2NyAzLjY2NyAwIDAwMy42NjctMy42NjdWNy4zMzNBMy42NjcgMy42NjcgMCAwMDE2LjUgMy42Njd6TTcuMzMzIDEuODMzVjUuNW03LjMzNC0zLjY2N1Y1LjVNMS44MzMgOS4xNjdoMTguMzM0IiBzdHJva2U9IiM4MThDQTkiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE2LjUgMy42NjdoLTExYTMuNjY3IDMuNjY3IDAgMDAtMy42NjcgMy42NjZWMTYuNUEzLjY2NyAzLjY2NyAwIDAwNS41IDIwLjE2N2gxMWEzLjY2NyAzLjY2NyAwIDAwMy42NjctMy42NjdWNy4zMzNBMy42NjcgMy42NjcgMCAwMDE2LjUgMy42Njd6TTcuMzMzIDEuODMzVjUuNW03LjMzNC0zLjY2N1Y1LjVNMS44MzMgOS4xNjdoMTguMzM0IiBzdHJva2U9IiM4MThDQTkiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-vacancy > .form > form > .form-row > .mx-datepicker > div > .mx-icon-calendar > svg {
  display: none
}

.v-vacancy > .form > form > .form-row > .mx-datepicker > .mx-input-wrapper:hover, .v-vacancy > .form > form > .form-row > .mx-datepicker > .mx-input-wrapper:hover > input {
  cursor: pointer
}

.v-vacancy > .form > form > .form-row > .mx-datepicker .mx-calendar {
  width: 100%
}

.v-vacancy > .form > form > .form-row > .mx-datepicker.mobile.show-clear-date > div > .mx-icon-clear {
  display: block
}

.v-vacancy > .form > form > .form-row > .mx-datepicker.mobile.show-clear-date > div > .mx-icon-calendar {
  display: none
}

.v-vacancy > .form > form > .form-row.upload-file {
  flex-flow: row;
  align-items: center
}

.v-vacancy > .form > form > .form-row.upload-file > input {
  display: none
}

.v-vacancy > .form > form > .form-row.upload-file > span {
  margin-left: 10px;
  white-space: nowrap
}

.v-vacancy > .form > form > .form-row.upload-file > .btn {
  background: transparent;
  border: 1px solid #3f51b5;
  color: #3f51b5;
  max-width: 166px;
  height: 22px;
  border-radius: 5px;
  padding: 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 21px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  text-transform: uppercase
}

.v-vacancy > .form > form > .form-row.upload-file > .btn:hover {
  border-color: #4960df;
  color: #4960df
}

.v-vacancy > .form > form > .form-row > .c-edit > div > input, .v-vacancy > .form > form > .form-row > .c-edit > div > textarea {
  width: 100%;
  background-color: #fff
}

.v-vacancy > .form > form > .form-row > .c-edit > div > textarea {
  height: unset;
  max-height: 208px
}

.v-vacancy > .form > form > .form-row > .c-combobox > .c-menu {
  z-index: 5
}

.v-vacancy > .form > form > .form-row > .c-combobox > .c-edit {
  height: 44px
}

.v-vacancy > .form > form > .form-row > .c-combobox > .c-edit > div > input {
  height: 40px
}

.v-vacancy > .form > form > .form-row > .error {
  color: #f14a4a;
  display: block;
  font-size: 14px
}

.v-vacancy > .form > form > .c-checkbox > span {
  margin: 0
}

.v-vacancy > .form > form > .c-checkbox > span > a {
  font-weight: 500;
  color: #3f51b5
}

.v-vacancy > .form > form > .c-checkbox > span > a:hover {
  color: #4960df
}

.v-vacancy > .form > form > .c-checkbox > span > a:active {
  color: #32408f
}

.v-vacancy > .form > form > button {
  font-size: 13px;
  margin-top: 20px;
  width: 100%;
  max-width: 100%
}

.v-vacancy > .form > form .required:after {
  content: "*";
  margin-left: 5px;
  color: #ff7a00
}

.v-vacancy > .form > .poll {
  margin: auto;
  max-width: 900px
}

.v-vacancy > .form > .poll > div, .v-vacancy > .form > .poll {
  display: flex;
  flex-flow: column
}

.v-vacancy > .form > .poll > div > .count {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px
}

.v-vacancy > .form > .poll > div > span {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px
}

.v-vacancy > .form > .poll > div > .radio-group {
  display: flex;
  flex-flow: column
}

.v-vacancy > .form > .poll > div > .radio-group .c-radio-button {
  font-size: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  margin-right: 15px;
  line-height: 17px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.v-vacancy > .form > .poll > div > .radio-group .c-radio-button > .radio {
  min-width: 16px;
  margin: 0 10px 0 0
}

.v-vacancy > .form > .poll > div > .checkboxex {
  display: flex;
  flex-flow: column
}

.v-vacancy > .form > .poll > div > .checkboxex > .c-checkbox {
  margin: 5px 0;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.v-vacancy > .form > .poll > .c-button, .v-vacancy > .form > .poll > div > .c-button {
  max-width: 500px;
  margin: 20px auto auto
}

.v-vacancy > .form > .poll > .c-button {
  width: 100%
}

.v-vacancy > .form > .not-found {
  font-size: 24px;
  color: #8e8e8e;
  margin: auto;
  display: block;
  width: 100%;
  text-align: center
}

.v-vacancy > .form.mobile > form {
  overflow: hidden
}

.v-vacancy > .features {
  margin: 15px 0
}

[dir=ltr] .v-vacancy > .features > section > h2 {
  text-align: left
}

[dir=rtl] .v-vacancy > .features > section > h2 {
  text-align: right
}

.v-vacancy > .features > section > h2 {
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #3f51b5
}

.v-vacancy > .features > section > ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between
}

[dir=ltr] .v-vacancy > .features > section > ul > li {
  text-align: left
}

[dir=rtl] .v-vacancy > .features > section > ul > li {
  text-align: right
}

.v-vacancy > .features > section > ul > li {
  padding: 50px 24px;
  box-shadow: 0 0 20px rgba(63, 81, 181, .2);
  margin: 10px 5px;
  display: flex;
  flex-flow: row-reverse nowrap;
  box-sizing: border-box;
  width: calc(33.33333% - 20px);
  overflow: hidden
}

.v-vacancy > .features > section > ul > li:first-child, .v-vacancy > .features > section > ul > li:nth-child(5) {
  border-radius: 100px 100px 0 100px
}

.v-vacancy > .features > section > ul > li:nth-child(2), .v-vacancy > .features > section > ul > li:nth-child(6) {
  border-radius: 0 100px 100px 100px
}

.v-vacancy > .features > section > ul > li:nth-child(3) {
  border-radius: 100px 100px 100px 0
}

.v-vacancy > .features > section > ul > li:nth-child(4) {
  border-radius: 100px 0 100px 100px
}

.v-vacancy > .features > section > ul > li > img {
  width: 170px;
  height: 195px
}

.v-vacancy > .features > section > ul > li > div {
  display: flex;
  flex-flow: column nowrap
}

.v-vacancy > .features > section > ul > li > div > .name {
  font-weight: 600;
  font-size: 24px;
  color: #3f51b5;
  line-height: 29px;
  margin-bottom: 10px
}

.v-vacancy > .features > section > ul > li > div > .name + span {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #1e1e1e
}

.v-vacancy > .contacts {
  margin: 30px 0
}

.v-vacancy > .contacts > .wrap {
  display: flex;
  flex-shrink: 0
}

[dir=ltr] .v-vacancy > .contacts > .wrap > .info {
  text-align: left
}

[dir=rtl] .v-vacancy > .contacts > .wrap > .info {
  text-align: right
}

.v-vacancy > .contacts > .wrap > .info {
  align-self: center
}

.v-vacancy > .contacts > .wrap > .info h3 {
  margin: 0
}

.v-vacancy > .contacts > .wrap > .info > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.v-vacancy > .contacts > .wrap > .info > ul > li {
  padding: 10px 0;
  display: flex;
  flex-direction: column
}

.v-vacancy > .contacts > .wrap > .info > ul > li > span > a {
  color: #3f51b5;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.v-vacancy > .contacts > .wrap > .info > ul > li > span.name {
  font-weight: 500;
  min-width: 150px
}

.v-vacancy > .contacts > .wrap > .info > ul > li > span.address {
  white-space: pre-line;
  color: #3f51b5;
  cursor: pointer;
  margin: 10px 0;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.v-vacancy > .contacts > .wrap > .info > ul > li > span.phones {
  display: flex;
  flex-flow: wrap;
  margin-left: -5px
}

.v-vacancy > .contacts > .wrap > .info > ul > li > span.phones > span > a {
  color: #3f51b5;
  margin-left: 5px
}

.v-vacancy > .contacts > .wrap > div, .v-vacancy > .contacts > .wrap > section {
  max-width: 650px;
  width: 100%
}

.v-vacancy > .contacts > .wrap > div > .c-pharmacies-map, .v-vacancy > .contacts > .wrap > section > .c-pharmacies-map {
  height: 380px;
  width: 100%;
  position: relative
}

.v-vacancy.mobile h2 {
  font-size: 1.4em;
  line-height: 1em
}

.v-vacancy.mobile > .video:first-of-type {
  margin-top: 10px
}

.v-vacancy.mobile > .form > h2 {
  line-height: unset
}

.v-vacancy.mobile > .banner > .wrap > section > h1, .v-vacancy.mobile > .form > h2 {
  font-size: 1.4em;
  margin: .4em 0
}

@media screen and (max-width: 1200px) {
  .v-vacancy > .about > .wrap > div:first-of-type > section {
    box-shadow: none
  }

  .v-vacancy > .about > .wrap > div:first-of-type + div > div > p {
    font-size: 90px
  }

  .v-vacancy > .about > .wrap > div:first-of-type + div > div > span {
    font-size: 20px
  }

  .v-vacancy > .features > section > ul > li {
    width: calc(50% - 20px)
  }
}

@media screen and (max-width: 870px) {
  .v-vacancy > .about > .wrap > div:first-of-type {
    flex-direction: column-reverse
  }

  .v-vacancy > .about > .wrap > div:first-of-type > section {
    padding: 0;
    margin-bottom: 30px
  }

  .v-vacancy > .about > .wrap > div:first-of-type + div > div > p {
    font-size: 70px;
    line-height: 90px
  }

  .v-vacancy > .about > .wrap > div:first-of-type + div > div > span {
    font-size: 16px
  }

  .v-vacancy > .about > div:last-of-type {
    padding: 20px 0
  }

  .v-vacancy > .about > div:last-of-type > .wrap {
    padding: 20px
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type {
    flex-direction: column;
    max-width: 100%
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div {
    max-width: 100%;
    width: 100%
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div:first-child {
    width: 100%;
    padding: 0;
    margin-bottom: 18px
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div > div {
    max-width: 100%
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div > p {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 8px
  }

  .v-vacancy > .features > section > h2 {
    padding-left: 20px
  }

  .v-vacancy > .features > section > ul > li {
    box-shadow: none;
    flex-direction: column;
    padding: 0 20px
  }

  .v-vacancy > .work-in-faces > h2 {
    padding-left: 20px
  }

  .v-vacancy > .work-in-faces > section {
    height: inherit;
    flex-direction: column
  }
}

@media screen and (max-width: 740px) {
  .v-vacancy > .banner {
    min-height: 290px;
    background-color: #e4f1fe;
    background-position: 100%
  }

  .v-vacancy > .banner > .wrap > section > button {
    min-width: inherit;
    height: 38px;
    font-size: 12px !important;
    margin-top: 30px !important
  }

  .v-vacancy > .about > .wrap > div:first-of-type {
    flex-direction: column-reverse
  }

  .v-vacancy > .about > .wrap > div:first-of-type > .map {
    height: 200px
  }

  .v-vacancy > .about > .wrap > div:first-of-type > section > h2 {
    margin: 10px 0;
    font-size: 22px
  }

  .v-vacancy > .about > .wrap > div:first-of-type > section > p {
    font-size: 16px
  }

  .v-vacancy > .about > .wrap > div:first-of-type + div > div > p {
    font-size: 36px;
    line-height: 87px
  }

  .v-vacancy > .about > .wrap > div:first-of-type + div > div > span {
    font-size: 16px;
    line-height: 16px
  }

  .v-vacancy > .about > div:last-of-type > .wrap {
    flex-direction: column;
    padding: 0
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type {
    padding: 0 10px;
    margin-right: 0;
    margin-bottom: 25px
  }

  .v-vacancy > .features > section > h2 {
    margin: 0 10px;
    padding-left: 0;
    font-size: 22px
  }

  .v-vacancy > .features > section > ul {
    padding: 0 5px
  }

  .v-vacancy > .features > section > ul > li {
    border-radius: 0 !important;
    padding: 0 5px;
    margin: 0;
    width: 50% !important
  }

  .v-vacancy > .features > section > ul > li > div > .name {
    font-size: 16px;
    line-height: 20px
  }

  .v-vacancy > .features > section > ul > li > div > .name + span {
    font-size: 12px;
    line-height: 15px
  }

  .v-vacancy > .work-in-faces > h2 {
    margin: 10px;
    padding-left: 0;
    font-size: 22px
  }

  .v-vacancy > .work-in-faces > section > div:first-child {
    max-height: 340px;
    overflow: hidden;
    justify-content: flex-start
  }

  .v-vacancy > .work-in-faces > section > div:last-child {
    padding: 20px
  }

  .v-vacancy > .work-in-faces > section > div:last-child > a {
    margin-top: 16px;
    font-size: 13px
  }

  .v-vacancy > .form > .city {
    flex-flow: column
  }

  .v-vacancy > .form > .city > span {
    font-size: 19px;
    margin: 0 0 10px
  }

  .v-vacancy > .contacts {
    margin: 30px 0
  }

  .v-vacancy > .contacts > .wrap {
    flex-direction: column
  }
}

@media screen and (max-width: 500px) {
  .v-vacancy > .banner > .wrap > section > .mobile:not(.c-button) {
    font-size: 1.4em;
    margin: .4em 0
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div > span {
    white-space: normal
  }

  .v-vacancy > .about > div:last-of-type > .wrap > div:first-of-type > div > p {
    margin-bottom: 15px;
    font-size: 18px
  }

  .v-vacancy > .features > .wrap > ul {
    justify-content: space-between
  }

  .v-vacancy > .features > .wrap > ul > li {
    padding: 0;
    width: calc(50% - 10px)
  }

  .v-vacancy > .features > .wrap > ul > li > img {
    width: 145px;
    height: 145px
  }

  .v-vacancy > .features > .wrap > ul > li > .name {
    font-size: 18px
  }

  [dir=ltr] .v-vacancy > .form > h1 {
    text-align: left
  }

  [dir=rtl] .v-vacancy > .form > h1 {
    text-align: right
  }

  .v-vacancy > .form > h1 {
    width: 300px
  }

  .v-vacancy > .contacts {
    margin-top: 0
  }

  .v-vacancy > .contacts > .wrap {
    padding: 0
  }

  .v-vacancy > .contacts > .wrap > .info {
    padding: 20px 10px;
    width: auto
  }

  .v-vacancy > .contacts > .wrap > .info > ul {
    margin-top: 0;
    width: 100%
  }

  .v-vacancy > .contacts > .wrap > .info > ul > li {
    flex-direction: column
  }

  .v-vacancy > .contacts > .wrap > .info > ul > li:not(:last-of-type) {
    border-bottom: 1px solid #f9f9f9
  }

  .v-vacancy > .contacts > .wrap > .info > ul > li > span.address {
    white-space: normal
  }
}

@media screen and (max-width: 435px) {
  .v-vacancy.mobile > .banner > .wrap > section > .mobile:not(.c-button) {
    max-width: 180px;
    display: flex;
    flex-flow: column;
    font-size: 1.2em
  }

  .v-vacancy.mobile > .banner > .wrap > section > .c-button {
    height: 36px;
    white-space: nowrap;
    max-width: 184px
  }

  .v-vacancy.mobile > .about > .wrap > div:first-of-type + div > div > p {
    font-size: 30px;
    line-height: 70px
  }

  .v-vacancy.mobile > .about > .wrap > div:first-of-type + div > div > span {
    font-size: 14px;
    line-height: 14px
  }
}

@media screen and (max-width: 400px) {
  .v-vacancy.mobile > .banner > .wrap > section > .mobile:not(.c-button) {
    font-size: 1em
  }

  .v-vacancy.mobile > .banner > .wrap > section > .c-button > .caption {
    font-size: 13px
  }
}

@media screen and (max-width: 380px) {
  .v-vacancy > .banner > .wrap > section > .mobile:not(.c-button) {
    max-width: 180px
  }

  .v-vacancy > .form > form > .form-row.upload-file > .c-button {
    font-size: 12px;
    padding: 0 10px
  }
}

@media screen and (max-width: 365px) {
  .v-vacancy.mobile > .banner > .wrap > section > .mobile:not(.c-button) {
    font-size: .7em
  }

  .v-vacancy.mobile > .banner > .wrap > section > .c-button > .caption {
    font-size: 10px
  }
}

</style>