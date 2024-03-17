<script lang="ts" setup>
const route = useRoute()

const currentImageIndex = ref(0)
const timeoutID = ref(<any>undefined)
const isShowSlider = ref(!0)
const isWidthLess465 = ref(!1)
const images = ref(<any>{
  slider: [],
  icon: [],
  other: []
})

const currentImage = computed(() => {
  if (!(currentImageIndex.value > (images.value.slider).length - 1)) return images.value.slider[currentImageIndex.value]
})
const isMobile = computed(() => {
  return useAppStore().isMobile
})
const params = computed(() => {
  return useAppStore().params
})
const pluralizeCompanyAge = computed(() => {
  return uPluralize(params.value.companyAge, ["год", "года", "лет"])
})
const pluralizePharmacies = computed(() => {
  return uPluralize(params.value.pharmaciesCount, ["аптеки", "аптек", "аптек"])
})
const pluralizeRegions = computed(() => {
  return uPluralize(params.value.regionsCount, ["регионе", "регионах", "регионах"])
})

watch(() => isShowSlider.value, (value) => {
  value ? setSwitchTimeout() : clearSwitchTimeout()
})

await getImages()

onMounted(async () => {
  window.addEventListener("resize", resize)
  resize()
  setSwitchTimeout()
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

function clearSwitchTimeout() {
  void 0 !== timeoutID.value && clearTimeout(timeoutID.value)
}

async function getImages() {
  await useNuxtApp().$api.aboutImages.get().then((e) => {
    images.value = e
  }).catch((t) => {
    console.log(t)
  })
}

function next() {
  clearSwitchTimeout()
  setSwitchTimeout()
  currentImageIndex.value = currentImageIndex.value < (images.value.slider).length - 1 ? currentImageIndex.value + 1 : 0
}

function resize() {
  isWidthLess465.value = window.innerWidth < 466
  isShowSlider.value = window.innerWidth > 850
}

function setSwitchTimeout() {
  params.value.carouselSwitchInterval > 0 && (timeoutID.value = window.setTimeout(next, 1e3 * params.value.carouselSwitchInterval))
}

function switchSlide(i: any) {
  i < 0 || i > (images.value.slider).length - 1 || (clearSwitchTimeout(), setSwitchTimeout(), currentImageIndex.value = i)
}

let titleHead = "О компании — Cosmetic | Yanco"
let descHead = "Информация о компании: история развития сети «Yanco» и наши преимущества."
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
  <main class="v-about">
    <div class="banner">
      <div>
        <h1 class="title">«Yanco»: ваш выбор</h1>
        <p class="desc">
          {{
            "Аптечная сеть «Yanco» — это " + params.companyAge + " " + pluralizeCompanyAge + " безупречной работы на рынке фармритейла, более " + params.pharmaciesCount + " " + pluralizePharmacies + " в " + params.regionsCount + " " + pluralizeRegions + " России и более двух миллионов активных карт лояльности!"
          }}
          <span>Сеть, в которой каждый покупатель — любимый.</span>
        </p>
      </div>
      <div class="image">
        <img :src="images.other[0]" width="100%" height="100%" alt="">
      </div>
    </div>
    <div class="middle">
      <div>
        <p class="title">
          Всегда рядом
        </p>
        <p class="desc">
          <b>
            Количество открытых магазинов позволяет с уверенностью говорить о том, что «Yanco + Cosmetic» — ваша аптека
            у дома.
          </b>
          Мы открываемся в самых удобных местах, близ крупных ЖК и на транспортных узлах. Мы стремимся к тому, чтобы вы
          в любой момент могли оглянуться по сторонам и увидеть яркую вывеску «Yanco + Cosmetic».
          <br>
          <br>
          Более того
          <b>для ещё большего удобства покупателей работают наши сайт и приложение,</b>
          где вы можете в любой момент найти интересующий вас препарат, узнать его стоимость и наличие в аптеках и
          воспользоваться услугой доставки (кроме рецептурных лекарств и лекарств со специальными условиями хранения).
        </p>
      </div>
      <div class="image">
        <img width="100%" height="100%" :src="images.other[1]" alt="">
      </div>
    </div>
    <div class="middle one-step-ahead">
      <div class="image">
        <img :src="images.other[2]" width="100%" height="100%" alt="">
      </div>
      <div>
        <p class="title">
          На шаг впереди
        </p>
        <p class="desc">
          «Yanco + Cosmetic» — инновационная компания, которая стремится идти в ногу со временем и работать на
          опережение.
          <br>
          <br>
          <b>Мы — первая аптечная сеть, запустившая услугу Доставки, одни из первых перешли на систему «Честный знак» и
            ввели возможность оплаты по QR-коду.</b>
          Каждый день совершенствуя свои технологии, мы работаем ради вашего удобства и спокойствия!
        </p>
      </div>
    </div>
    <div class="middle">
      <div>
        <p class="title">
          Выбор за вами
        </p>
        <p class="desc">
          <b>
            Уникальная, гибкая Программа лояльности «Yanco + Cosmetic» разработана для удобства каждого покупателя.
          </b>
          Только у нас вы можете выбрать — копить баллы или пользоваться самым широким спектром низких цен.
        </p>
      </div>
      <div class="image">
        <img :src="images.other[3]" width="100%" height="100%" alt="">
      </div>
    </div>

    <div class="formats">
      <div>
        <div>
          <p class="title">
            «Yanco + Cosmetic»
          </p>
          <p class="desc">
            Магазин «Yanco + Cosmetic» отличаются не только максимально удобным расположением, но и доступом к программе
            лояльности.
            В данных аптеках мы также реализовали для вас возможность приобретать все товары
            по ЭКСТЕМАЛЬНО НИЗКИМ ЦЕНАМ*, участвовать в акциях для держателей карт и получать дополнительные
            привилегии.
          </p>
        </div>
      </div>
      <p>
        *По сравнению с обычными ценами (ценами без карты) на товары сети магазинов «Yanco + Cosmetic».
      </p>
    </div>

    <div class="about-pharmacies">
      <div>
        <p>
          <b>
            Более десяти миллионов карт лояльности
          </b>
          красноречивее любых слов скажет об очевидных выгодах участия в «Аптечном клубе». Каждый месяц миллионы человек
          выбирают «Апрель», и мы заботимся о каждом их них.
        </p>
        <p>
          <b>Один раз сделав выбор в пользу «Апреля», вам больше не придется выбирать между ценой и качеством.</b>
          Все товары, представленные в сети, проходят двойной контроль качества и зарегистрированы в системе «Честный
          знак».
          А наши клубные цены позволяют приобретать товары со скидкой до 50% и экономить ещё больше!
        </p>
        <div v-if="!isShowSlider" class="image">
          <img :src="images.slider[0]" alt="" width="100%" height="100%">
        </div>
        <p>
          <b>Широкий ассортимент</b>
          представленных позиций позволяет вам избежать утомительных поисков нужного
          препарата, а наши фармацевты всегда проведут грамотную консультацию при необходимости замены товара.
        </p>
        <p>
          В нашей сети
          <b>работают более 22 000 сотрудников</b>
          и каждый из них — профессионал своего дела.
          <span>Фармацевты «Апреля» чутко относятся к проблемам покупателя, главная цель компании — помочь каждому покупателю, ведь никто не приходит в аптеку по приятному поводу, и в этой ситуации человеческое и профессиональное отношение —лучшее, что мы можем вам предложить.</span>
          <span>«Апрель» — это сеть, в которой вы — не просто клиент.</span>
        </p>
        <div v-if="!isShowSlider" class="image">
          <img :src="images.slider[1]" alt="" width="100%" height="100%">
        </div>
      </div>
      <div v-if="isShowSlider" class="slider">
        <img :src="currentImage" width="100%" height="100%" alt="">
        <ul class="pagination">
          <li v-for="(e,r) in images.slider" :key="r" :class="{ selected: currentImageIndex === r }"
              @click="switchSlide(r)"/>
        </ul>
      </div>
    </div>

    <div class="choice">
      <template v-if="isWidthLess465">
        <p>
          Выбирая «Апрель»,
          <br>
          вы выбираете:
        </p>
      </template>
      <template v-else>
        <p>
          Выбирая «Апрель», вы выбираете:
        </p>
      </template>
      <div class="icons">
        <div v-for="(i,e) in images.icon" :key="e">
          <img :src="i.url" :alt="i.name" width="100px" height="100px">
          <span>{{ i.name }}</span>
        </div>
      </div>
      <p>
        <span class="icon logotype"/>
        <span v-if="isShowSlider">
          : МЫ ДЕЛАЕМ ЛЕКАРСТВА ДОСТУПНЕЕ
        </span>
        <span v-else>
          МЫ ДЕЛАЕМ
          <br>
          ЛЕКАРСТВА ДОСТУПНЕЕ
        </span>
      </p>
    </div>
  </main>
</template>

<style scoped>
.v-about {
  max-width: 1368px;
  margin: auto
}

.v-about > .banner {
  display: flex;
  border-radius: 5px;
  background-color: #e4eaff;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  width: 100%
}

.v-about > .banner > div {
  width: 50%;
  margin: 65px 56px 40px 45px
}

.v-about > .banner > div > .title {
  font-weight: 700;
  font-size: 36px;
  line-height: 46px;
  margin: 0;
  color: #3f51b5
}

.v-about > .banner > div > .desc {
  font-weight: 500;
  font-size: 22px
}

.v-about > .banner > div > .desc > span {
  display: block;
  margin-top: 20px;
  color: #3f51b5
}

.v-about > .banner > .image {
  margin: 0
}

.v-about > .banner > .image > img {
  border-radius: 0 5px 5px 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover
}

.v-about > .middle {
  max-width: 1200px;
  display: flex;
  width: -webkit-fill-available;
  width: -moz-available;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 22px auto;
  justify-content: space-between;
  padding: 0 10px
}

.v-about > .middle > div {
  width: 100%;
  max-width: 623px;
  margin: auto 0
}

.v-about > .middle > div > .title {
  margin-top: 37px;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  margin-bottom: 0
}

.v-about > .middle > div > .desc {
  margin-top: 22px;
  font-size: 16px
}

.v-about > .middle > div > .desc > b {
  font-weight: 500
}

.v-about > .middle > .image {
  max-width: 443px;
  margin-left: 20px
}

.v-about > .middle > .image > img {
  width: 100%;
  height: 100%;
  -o-object-fit: scale-down;
  object-fit: scale-down
}

.v-about > .middle.one-step-ahead > div {
  order: 2
}

.v-about > .middle.one-step-ahead > .image {
  order: 1;
  margin-right: 20px;
  margin-left: 0
}

.v-about > .formats {
  display: flex;
  flex-flow: column;
  padding: 26px 41px 25px 44px;
  border-radius: 5px;
  background-color: #3f51b5;
  color: #fff
}

.v-about > .formats > p:first-of-type {
  font-weight: 600;
  font-size: 16px
}

.v-about > .formats > p:last-of-type {
  font-size: 12px;
  margin-bottom: 0;
  margin-top: 40px
}

.v-about > .formats > div {
  display: flex;
  justify-content: space-between;
  width: 100%
}

.v-about > .formats > div > div {
  width: 50%;
  max-width: 623px
}

.v-about > .formats > div > div:last-of-type {
  margin-left: 20px
}

.v-about > .formats > div > div > .title {
  font-weight: 600;
  font-size: 30px;
  line-height: 37px
}

.v-about > .formats > div > div > .desc {
  font-size: 16px;
  line-height: 24px
}

.v-about > .about-pharmacies {
  max-width: 1295px;
  display: flex;
  width: -webkit-fill-available;
  width: -moz-available;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 51px auto;
  justify-content: space-between;
  padding: 0 10px
}

.v-about > .about-pharmacies > div {
  max-width: 594px;
  width: 50%
}

.v-about > .about-pharmacies > div > p {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 25px
}

.v-about > .about-pharmacies > div > p > b {
  font-weight: 600
}

.v-about > .about-pharmacies > div > p > span {
  display: block;
  margin-top: 10px
}

.v-about > .about-pharmacies > div > p > span:last-of-type {
  color: #3f51b5;
  font-weight: 600
}

.v-about > .about-pharmacies > .slider {
  max-width: 684px;
  transition: all .3s;
  display: flex;
  flex-direction: column;
  margin: auto auto auto 35px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content
}

.v-about > .about-pharmacies > .slider > img {
  border-radius: 5px;
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  -o-object-fit: scale-down;
  object-fit: scale-down;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, .1)
}

.v-about > .about-pharmacies > .slider > .pagination {
  padding: 0;
  display: flex;
  transition: inherit;
  margin: 20px auto 0
}

.v-about > .about-pharmacies > .slider > .pagination > li {
  list-style: none;
  margin-right: 6px;
  background-color: #818ca9;
  transition: all .77s ease-in-out 0s;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  overflow: visible;
  padding: 0;
  cursor: pointer
}

.v-about > .about-pharmacies > .slider > .pagination > li:hover {
  background-color: #3f51b5
}

.v-about > .about-pharmacies > .slider > .pagination > li.selected {
  background-color: #3f51b5;
  width: 18px
}

.v-about > .choice {
  margin: 20px 0;
  display: flex;
  flex-flow: column;
  width: -webkit-fill-available;
  width: -moz-available;
  padding: 0 10px
}

.v-about > .choice > p:first-of-type {
  font-weight: 600;
  font-size: 30px;
  line-height: 37px
}

.v-about > .choice > p:last-of-type {
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  display: flex;
  align-items: center;
  font-style: italic;
  color: #3f51b5;
  margin: 40px auto 0
}

.v-about > .choice > p:last-of-type > .icon {
  background-size: 100%;
  width: 170px;
  height: 40px
}

.v-about > .choice > .icons {
  display: flex;
  flex-flow: wrap;
  max-width: 990px;
  margin: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-about > .choice > .icons > div {
  align-items: center;
  display: flex;
  flex-flow: column;
  margin: 40px;
  width: 250px
}

.v-about > .choice > .icons > div > img {
  width: 100px;
  height: 100px
}

.v-about > .choice > .icons > div > span {
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  margin-top: 22px;
  text-transform: uppercase
}

@media screen and (max-width: 1367px) {
  .v-about > .banner > .image > img, .v-about > .banner, .v-about > .formats {
    border-radius: 0
  }
}

@media screen and (max-width: 1010px) {
  .v-about > .choice > .icons {
    justify-content: center
  }
}

@media screen and (max-width: 850px) {
  .v-about > .banner {
    flex-flow: column;
    background-color: unset
  }

  .v-about > .banner > div {
    margin: 0;
    width: -webkit-fill-available;
    width: -moz-available
  }

  .v-about > .banner > div:not(.image) {
    background-color: #e4eaff
  }

  .v-about > .banner > div > .title {
    margin: 0 10px;
    font-size: 24px
  }

  .v-about > .banner > div > .desc {
    font-size: 16px;
    margin: 0 10px 10px
  }

  .v-about > .middle {
    flex-flow: column
  }

  .v-about > .middle > div {
    max-width: unset;
    width: -webkit-fill-available;
    width: -moz-available
  }

  .v-about > .middle > div > .title {
    font-size: 24px;
    margin: 0
  }

  .v-about > .middle > div > .desc {
    font-size: 14px
  }

  .v-about > .middle > .image {
    margin: 0;
    align-self: center
  }

  .v-about > .middle.one-step-ahead > div {
    order: 1
  }

  .v-about > .middle.one-step-ahead > .image {
    order: 2;
    margin: 0
  }

  .v-about > .formats {
    padding: 10px
  }

  .v-about > .formats > p:last-of-type {
    margin-bottom: 20px;
    margin-top: 0
  }

  .v-about > .formats > div {
    flex-flow: column
  }

  .v-about > .formats > div > div {
    width: 100%
  }

  .v-about > .formats > div > div > .title {
    font-size: 24px;
    margin: 10px 0
  }

  .v-about > .formats > div > div > .desc {
    font-size: 14px;
    margin: 0 0 20px
  }

  .v-about > .formats > div > div:last-of-type {
    margin: 0
  }

  .v-about > .about-pharmacies {
    margin: 20px auto 0
  }

  .v-about > .about-pharmacies > div {
    max-width: unset;
    width: 100%
  }

  .v-about > .about-pharmacies > div > .image {
    margin-bottom: 20px;
    margin-left: -10px;
    margin-right: -10px;
    display: flex;
    justify-content: center
  }

  .v-about > .about-pharmacies > div > .image > img {
    -o-object-fit: scale-down;
    object-fit: scale-down;
    height: 100%;
    border-radius: 5px
  }

  .v-about > .choice > p:first-of-type {
    font-size: 24px;
    margin: 0
  }

  .v-about > .choice > p:last-of-type {
    margin: 20px 0 0
  }

  .v-about > .choice > p:last-of-type > span {
    font-size: 12px;
    line-height: 15px
  }

  .v-about > .choice > .icons > div {
    margin: 40px;
    width: 130px
  }

  .v-about > .choice > .icons > div > img {
    width: 80px;
    height: 80px
  }

  .v-about > .choice > .icons > div > span {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    margin-top: 16px
  }
}

@media screen and (max-width: 684px) {
  .v-about > .about-pharmacies > div > .image > img {
    border-radius: 0;
    width: 100%
  }
}

@media screen and (max-width: 650px) {
  .v-about > .choice > .icons > div {
    margin: 30px
  }
}

@media screen and (max-width: 590px) {
  .v-about > .choice > .icons > div {
    margin: 20px
  }
}

@media screen and (max-width: 465px) {
  .v-about > .choice > p:first-of-type {
    line-height: 29px
  }
}

@media screen and (max-width: 360px) {
  .v-about > .choice > .icons > div {
    margin: 20px 10px
  }
}

@media screen and (max-width: 355px) {
  .v-about > .choice > p:last-of-type > .icon {
    width: 130px
  }
}

</style>