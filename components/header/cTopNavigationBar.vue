<script lang="ts" setup>
const props = defineProps({
  isChangedBasketAvailability: {
    type: Boolean,
    default: false
  },
  isChangedBasketPrice: {
    type: Boolean,
    default: false
  },
  params: {
    type: <any>Object
  }
})

const hotlineLink = computed(() => {
  return uHotlineLink(props.params ? props.params.hotlinePhone : "")
})
const hotlinePhone = computed(() => {
  return props.params ? props.params.hotlinePhone : ""
})
const isChanged = computed(() => {
  return props.isChangedBasketAvailability || props.isChangedBasketPrice
})
</script>

<template>
  <div class="c-top-navigation-bar" role="navigation">
    <div class="container">
      <ul>
        <div class="animated">
          <li>
            <NuxtLink class="hover-bottom-line landlords" to="/">
              Арендодателям / Продавцам бизнеса
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="hover-bottom-line vacancies" to="/">
              Работа у нас
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="hover-bottom-line" to="/">
              Редкие товары
            </NuxtLink>
          </li>
        </div>

        <li>
          <NuxtLink class="hover-bottom-line" to="/">
            Подписка «Янко»
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="hover-bottom-line" to="/">
            Программа лояльности
          </NuxtLink>
        </li>
        <li class="exceptional">
          <NuxtLink class="hover-bottom-line" to="/">
            Мобильное приложение
          </NuxtLink>
        </li>
        <li>
          <a class="phone" :href="hotlineLink">
            {{ hotlinePhone }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.c-top-navigation-bar {
  width: 100%;
  background-color: #3f51b5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 3
}

.c-top-navigation-bar > .container {
  height: 34px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0
}

.c-top-navigation-bar > .container > ul {
  margin: 0;
  display: flex;
  align-items: center;
  list-style: none
}

.c-top-navigation-bar > .container > ul > .animated {
  display: flex;
  align-items: center;
  margin-right: 35px;
  background: linear-gradient(89.94deg, #ff0089 .02%, rgba(255, 0, 137, 0) 99.93%);
  line-height: 34px;
  padding-left: 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px
}

@media screen and (max-width: 1440px) {
  .c-top-navigation-bar > .container > ul > .animated {
    margin-right: 20px
  }
}

@media screen and (max-width: 1200px) {
  .c-top-navigation-bar > .container > ul > .animated {
    margin-right: 10px
  }
}

.c-top-navigation-bar > .container > ul > .animated > li {
  height: 34px
}

.c-top-navigation-bar > .container > ul > .animated > li > a {
  line-height: 16px
}

.c-top-navigation-bar > .container > ul > .animated > li > a.landlords, .c-top-navigation-bar > .container > ul > .animated > li > a.vacancies {
  position: relative;
  margin-left: 10px
}

.c-top-navigation-bar > .container > ul > .animated > li > a.landlords:after, .c-top-navigation-bar > .container > ul > .animated > li > a.vacancies:after {
  position: absolute;
  left: -10px;
  top: 5.5px;
  content: "";
  width: 6px;
  height: 6px;
  background-color: #fff;
  border-radius: 15px;
  -webkit-animation: blink .6s ease 0s infinite;
  animation: blink .6s ease 0s infinite
}

.c-top-navigation-bar > .container > ul > .animated > li > a.landlords:after {
  -webkit-animation-delay: .0666666667s;
  animation-delay: .0666666667s
}

.c-top-navigation-bar > .container > ul > .animated > li > a.vacancies:after {
  -webkit-animation-delay: .1333333333s;
  animation-delay: .1333333333s
}

.c-top-navigation-bar > .container > ul li {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 35px
}

@media screen and (max-width: 1440px) {
  .c-top-navigation-bar > .container > ul li {
    margin-right: 20px
  }
}

@media screen and (max-width: 1200px) {
  .c-top-navigation-bar > .container > ul li {
    margin-right: 10px
  }
}

@media screen and (max-width: 1050px) {
  .c-top-navigation-bar > .container > ul li.news {
    display: none
  }
}

@media screen and (max-width: 990px) {
  .c-top-navigation-bar > .container > ul li a:not(.phone) {
    width: 70%
  }

  .c-top-navigation-bar > .container > ul li .phone {
    width: 90px
  }
}

.c-top-navigation-bar > .container > ul li:last-child {
  margin-right: 0
}

.c-top-navigation-bar > .container > ul li > a {
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #fff;
  font-weight: 400
}

.c-top-navigation-bar > .container > ul li > a.landlords, .c-top-navigation-bar > .container > ul li > a.phone, .c-top-navigation-bar > .container > ul li > a.vacancies {
  font-weight: 700
}

.c-top-navigation-bar > .container > ul li > a.landlords, .c-top-navigation-bar > .container > ul li > a.vacancies {
  font-size: 13px
}

.c-top-navigation-bar > .container > ul li > a:before {
  background-color: #fff
}

@media screen and (max-width: 1367px) {
  .c-top-navigation-bar > .container {
    padding: 0 10px
  }
}

@media screen and (max-width: 915px) {
  .c-top-navigation-bar > .container > ul > .animated, .c-top-navigation-bar > .container > ul li {
    margin-right: 10px
  }

  .c-top-navigation-bar > .container > ul > .animated > a.landlords, .c-top-navigation-bar > .container > ul > .animated > a.vacancies, .c-top-navigation-bar > .container > ul li > a.landlords, .c-top-navigation-bar > .container > ul li > a.vacancies {
    font-size: 12px
  }

  .c-top-navigation-bar > .container > ul > .animated > a.landlords:after, .c-top-navigation-bar > .container > ul > .animated > a.vacancies:after, .c-top-navigation-bar > .container > ul li > a.landlords:after, .c-top-navigation-bar > .container > ul li > a.vacancies:after {
    top: 5px !important
  }
}

@media screen and (max-width: 870px) {
  .c-top-navigation-bar > .container > ul > .animated, .c-top-navigation-bar > .container > ul li {
    margin-right: 8px
  }

  .c-top-navigation-bar > .container > ul > .animated > a.landlords, .c-top-navigation-bar > .container > ul > .animated > a.vacancies, .c-top-navigation-bar > .container > ul li > a.landlords, .c-top-navigation-bar > .container > ul li > a.vacancies {
    font-size: 11px
  }
}

@media screen and (max-width: 850px) {
  .c-top-navigation-bar {
    display: none
  }
}

@-webkit-keyframes blink {
  0% {
    opacity: 1
  }

  to {
    opacity: .5
  }
}

@keyframes blink {
  0% {
    opacity: 1
  }

  to {
    opacity: .5
  }
}
</style>