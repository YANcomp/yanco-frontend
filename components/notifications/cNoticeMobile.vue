<script lang="ts" setup>
const emit = defineEmits(["notice-close"])

const props = defineProps({
  defaultDuration: {
    type: Number
  },
  notice: {
    type: <any>Object
  },
  isBasket: {
    type: Boolean,
    default: false
  },
  isFavorites: {
    type: Boolean,
    default: false
  },
  isCompare: {
    type: Boolean,
    default: false
  },
  isCompareLimited: {
    type: Boolean,
    default: false
  },
  isRequest: {
    type: Boolean,
    default: false
  }
})

const isClosing = ref(false)
const isOpening = ref(true)
let currentWidth = 0

onMounted(() => {
  currentWidth = window.outerWidth;
  let timeDuration = props.notice.duration ? props.notice.duration : props.defaultDuration
  setTimeout(() => {
    close()
  }, timeDuration)
});

function close() {
  isClosing.value = true
  isOpening.value = false
  setTimeout(() => {
    isClosing.value = false
    emit("notice-close", props.notice.ID)
  }, 350)
}
</script>

<template>
  <div v-if="!notice.isClosed"
       :class='["c-notice-mobile", "flex-horizontal-nowrap", notice.status, { closing: isClosing, opening: isOpening, request: isRequest, closeable: notice.closeable }]'>
    <span v-if="notice.closeable || isRequest" class="icon close" @click="close"/>

    <template v-if="isRequest">
      <div v-if='notice.status === "request-success"' class="container">
        <h1>{{ notice.desc }}</h1>
        <!--        TODO -->
        <!--        <img/>-->
        <!--        <span></span>-->
      </div>
      <div v-else class="container error">
        <h1>{{ notice.desc }}</h1>
        <!--        TODO -->
        <!--        <img/>-->
        <!--        <span></span>-->
      </div>
    </template>
    <template v-else>
      <span
          :class='["message", "flex-vertical-nowrap", { product: isBasket || isFavorites || isCompare || isCompareLimited }]'>

        <template v-if="isCompareLimited">
          <span class="desc">
            У вас 6 товаров в сравнении
            <NuxtLink to="/" class="hover-bottom-line">
              Перейти в сравнение
            </NuxtLink>
          </span>
        </template>

        <template v-else-if="isBasket || isFavorites || isCompare">
          <img src='https://pictures1.apteka-april.ru/products/326171/208/3019d88ae96777694aa8d824a798e59d.webp'
               width="100%" height="100%" alt=""/>
          <span class="desc" v-if="isBasket">
            Товар добавлен <br v-if="currentWidth <= 425"> к вашим покупкам
            <NuxtLink to="/">
              Перейти в корзину
            </NuxtLink>
          </span>
          <span class="desc" v-if="isFavorites">
            Товар добавлен <br v-if="currentWidth <= 384"> в избранное
            <NuxtLink to="/">
              Перейти в избранное
            </NuxtLink>
          </span>
          <span class="desc" v-if="isCompare">
            Товар добавлен <br v-if="currentWidth <= 387"> к сравнению
            <NuxtLink to="/">
              Перейти в сравнение
            </NuxtLink>
          </span>
        </template>

        <template v-else-if="notice.desc">
          <span class="desc" v-html="notice.desc"/>
        </template>

      </span>
      <span v-if="notice.status" class="status">
        <span v-if="isBasket || isFavorites || isCompare || isCompareLimited"
              :class='["icon", { "in-basket": isBasket, "heart-outline": isFavorites, "add-compare": isCompare, "compare-limited": isCompareLimited }]'/>
        <span v-else :class='["icon", notice.status]'/>
      </span>
    </template>
  </div>
</template>

<style scoped>
.c-notice-mobile {
  margin-bottom: 20px;
  padding: 16px;
  border-radius: 5px;
  line-height: 1;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-animation: .3s ease-in-out both running;
  animation: .3s ease-in-out both running;
  align-items: center;
  min-height: 74px;
  width: 100%;
  box-sizing: border-box
}

.c-notice-mobile:last-of-type {
  margin-bottom: 0
}

.c-notice-mobile.info {
  background-color: #f7f8fc;
  box-shadow: 2px 2px 10px rgba(63, 81, 181, .25)
}

.c-notice-mobile.success {
  background-color: #ebfef8;
  box-shadow: 2px 2px 10px rgba(7, 208, 136, .25)
}

.c-notice-mobile.warning {
  background-color: #fff5eb;
  box-shadow: 2px 2px 10px rgba(255, 122, 0, .25)
}

.c-notice-mobile.error {
  background-color: #fff6f7;
  box-shadow: 2px 2px 10px rgba(252, 17, 59, .25)
}

.c-notice-mobile.request {
  padding: 0
}

.c-notice-mobile.request > .close {
  top: 15px;
  right: 15px;
  opacity: .6
}

.c-notice-mobile.request > .container {
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  height: 381px;
  background-color: #ebfef8;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(7, 208, 136, .25)
}

.c-notice-mobile.request > .container.error {
  background-color: #fff6f7;
  box-shadow: 2px 2px 10px rgba(252, 17, 59, .25)
}

.c-notice-mobile.request > .container > h1 {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #3f51b5;
  padding-left: 15px;
  padding-right: 15px
}

.c-notice-mobile.request > .container > span {
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  text-align: center
}

@media screen and (max-width: 350px) {
  .c-notice-mobile.request > .container {
    height: 280px;
    padding-top: 20px;
    padding-bottom: 20px
  }

  .c-notice-mobile.request > .container > h1 {
    font-size: 14px;
    margin: 0
  }

  .c-notice-mobile.request > .container > img {
    height: 60%
  }

  .c-notice-mobile.request > .container > span {
    font-size: 11px
  }
}

.c-notice-mobile.opening {
  -webkit-animation-name: notice-in;
  animation-name: notice-in
}

.c-notice-mobile.closing {
  -webkit-animation-name: notice-out;
  animation-name: notice-out
}

.c-notice-mobile.reverse {
  flex-flow: row-reverse
}

.c-notice-mobile.reverse.closeable > .message {
  padding-right: 20px
}

.c-notice-mobile.reverse > .status {
  margin-left: 0;
  margin-right: 15px
}

.c-notice-mobile > .close {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 30px;
  width: 30px;
  opacity: .6
}

.c-notice-mobile > .close:hover {
  opacity: 1
}

.c-notice-mobile > .status {
  flex-basis: 30px;
  height: 30px;
  margin-left: 20px
}

.c-notice-mobile > .status > .icon {
  height: 30px;
  width: 30px;
  margin: 0
}

.c-notice-mobile > .status > .icon.error {
  background-color: #ff324b
}

.c-notice-mobile > .status > .icon.success {
  background-color: #07d088
}

.c-notice-mobile > .status > .icon.info {
  background-color: #3f51b5
}

.c-notice-mobile > .status > .icon.warning {
  background-color: #ff7a00
}

.c-notice-mobile > .status > .icon.in-basket {
  background-color: #3f51b5;
  width: 20px;
  height: 20px
}

.c-notice-mobile > .status > .icon.add-compare, .c-notice-mobile > .status > .icon.heart-outline {
  background-color: #ff0089;
  width: 20px;
  height: 20px
}

.c-notice-mobile > .status > .icon.compare-limited {
  width: 32px;
  height: 24px
}

.c-notice-mobile.basket, .c-notice-mobile.compare-limited, .c-notice-mobile.compare, .c-notice-mobile.favorites {
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(63, 81, 181, .25);
  padding: 10px
}

.c-notice-mobile.basket > .status, .c-notice-mobile.compare-limited > .status, .c-notice-mobile.compare > .status, .c-notice-mobile.favorites > .status {
  flex-basis: 7.87402%;
  height: 20px
}

.c-notice-mobile.basket.compare-limited > .status, .c-notice-mobile.compare-limited.compare-limited > .status, .c-notice-mobile.compare.compare-limited > .status, .c-notice-mobile.favorites.compare-limited > .status {
  height: 24px
}

.c-notice-mobile > .message {
  flex-grow: 1;
  align-self: center;
  color: #1a1a1a
}

.c-notice-mobile > .message > img {
  max-width: 80px;
  max-height: 80px;
  -o-object-fit: contain;
  object-fit: contain
}

.c-notice-mobile > .message > .desc {
  font-size: 13px;
  line-height: 16px
}

.c-notice-mobile > .message > .desc > p {
  margin: 13px 0 5px
}

.c-notice-mobile > .message > .desc a {
  color: #3f51b5
}

.c-notice-mobile > .message.product {
  flex-flow: row;
  align-items: center
}

.c-notice-mobile > .message.product > .desc {
  margin-left: 20px;
  display: flex;
  flex-flow: column
}

.c-notice-mobile > .message.product > .desc > a {
  margin-top: 10px;
  white-space: nowrap
}

@-webkit-keyframes notice-in {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes notice-in {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@-webkit-keyframes notice-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@keyframes notice-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}
</style>