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
  let timeDuration = props.notice?.duration ? props.notice?.duration : props.defaultDuration
  setTimeout(() => {
    close()
  }, timeDuration)
});

function close() {
  isClosing.value = true
  isOpening.value = false
  setTimeout(() => {
    isClosing.value = false
    emit("notice-close", props.notice?.ID)
  }, 350)
}
</script>

<template>
  <div v-if="!notice.isClosed"
       :class='[
           "c-notice-desktop",
           "flex-horizontal-nowrap",
           notice.status,
           { closing: isClosing, opening: isOpening, request: isRequest }
  ]'>
    <span class="icon close2" @click="close"/>
    <template v-if="isRequest">
      <div v-if="notice.status === 'request-success'" class="container">

      </div>
      <div v-else class="container error">

      </div>
    </template>
    <template v-else>
      <span
          :class='["message", "flex-vertical-nowrap", {product: isBasket || isFavorites || isCompare || isCompareLimited}]'>

        <template v-if="isCompareLimited">
          <span v-if="isCompareLimited" class="desc">
  <!--          compare TODO-->
            compare
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
            Товар добавлен <br v-if="currentWidth <= 384"> к вашим покупкам
            <NuxtLink to="/">
              Перейти в корзину
            </NuxtLink>
          </span>
          <span class="desc" v-if="isCompare">
            Товар добавлен <br v-if="currentWidth <= 387"> к вашим покупкам
            <NuxtLink to="/">
              Перейти в корзину
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
.c-notice-desktop {
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
  width: 324px;
  box-sizing: border-box
}

.c-notice-desktop.info {
  background-color: #f7f8fc;
  box-shadow: 2px 2px 10px rgba(63, 81, 181, .25)
}

.c-notice-desktop.success {
  background-color: #ebfef8;
  box-shadow: 2px 2px 10px rgba(7, 208, 136, .25)
}

.c-notice-desktop.warning {
  background-color: #fff5eb;
  box-shadow: 2px 2px 10px rgba(255, 122, 0, .25)
}

.c-notice-desktop.error {
  background-color: #fff6f7;
  box-shadow: 2px 2px 10px rgba(252, 17, 59, .25)
}

.c-notice-desktop.reverse {
  flex-flow: row-reverse
}

.c-notice-desktop.reverse > .close2 {
  left: unset;
  right: 15px;
  top: 15px;
  width: 13px;
  height: 13px
}

.c-notice-desktop.reverse > .status {
  margin-right: 10px
}

.c-notice-desktop.reverse > .message {
  padding-right: 20px
}

.c-notice-desktop.request {
  width: unset;
  margin-bottom: 10px;
  padding: 0
}

.c-notice-desktop.request > .close2 {
  left: unset;
  right: 23px;
  top: 23px
}

.c-notice-desktop.request > .container {
  height: 381px;
  max-width: 519px;
  background-color: #ebfef8;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(7, 208, 136, .25)
}

.c-notice-desktop.request > .container.error {
  background-color: #fff6f7;
  box-shadow: 2px 2px 10px rgba(252, 17, 59, .25)
}

.c-notice-desktop.request > .container > h1 {
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
  color: #3f51b5
}

.c-notice-desktop.request > .container > span {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center
}

.c-notice-desktop.opening {
  -webkit-animation-name: notice-in;
  animation-name: notice-in
}

.c-notice-desktop.closing {
  -webkit-animation-name: notice-out;
  animation-name: notice-out
}

.c-notice-desktop > .status {
  flex-basis: 30px;
  height: 30px
}

.c-notice-desktop > .status > .icon {
  height: 30px;
  width: 30px;
  margin: 0
}

.c-notice-desktop > .status > .icon.error {
  background-color: #ff324b
}

.c-notice-desktop > .status > .icon.success {
  background-color: #07d088
}

.c-notice-desktop > .status > .icon.info {
  background-color: #3f51b5
}

.c-notice-desktop > .status > .icon.warning {
  background-color: #ff7a00
}

.c-notice-desktop > .status > .icon.in-basket {
  background-color: #3f51b5;
  width: 20px;
  height: 20px
}

.c-notice-desktop > .status > .icon.add-compare, .c-notice-desktop > .status > .icon.heart-outline {
  background-color: #ff0089;
  width: 20px;
  height: 20px
}

.c-notice-desktop > .status > .icon.compare-limited {
  width: 32px;
  height: 24px
}

.c-notice-desktop > .message {
  flex-grow: 1;
  align-self: center;
  color: #1a1a1a
}

.c-notice-desktop > .message > img {
  max-width: 80px;
  max-height: 80px;
  -o-object-fit: contain;
  object-fit: contain
}

.c-notice-desktop > .message > .desc {
  font-size: 14px;
  line-height: 17px
}

.c-notice-desktop > .message > .desc > p {
  margin: 13px 0 5px
}

.c-notice-desktop > .message > .desc a {
  color: #3f51b5
}

.c-notice-desktop > .message.product {
  flex-flow: row;
  align-items: center
}

.c-notice-desktop > .message.product > .desc {
  max-width: 170px;
  margin-left: 20px;
  display: flex;
  flex-flow: column
}

.c-notice-desktop > .message.product > .desc > a {
  margin-top: 10px
}

.c-notice-desktop.basket, .c-notice-desktop.compare-limited, .c-notice-desktop.compare, .c-notice-desktop.favorites {
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(63, 81, 181, .25);
  padding: 10px;
  width: 308px
}

.c-notice-desktop.basket > .status, .c-notice-desktop.compare-limited > .status, .c-notice-desktop.compare > .status, .c-notice-desktop.favorites > .status {
  flex-basis: 25px;
  height: 20px
}

.c-notice-desktop.basket.compare-limited > .status, .c-notice-desktop.compare-limited.compare-limited > .status, .c-notice-desktop.compare.compare-limited > .status, .c-notice-desktop.favorites.compare-limited > .status {
  flex-basis: 32px;
  height: 24px;
  margin-right: 10px
}

.c-notice-desktop.basket.compare-limited > .message.product > .desc, .c-notice-desktop.compare-limited.compare-limited > .message.product > .desc, .c-notice-desktop.compare.compare-limited > .message.product > .desc, .c-notice-desktop.favorites.compare-limited > .message.product > .desc {
  max-width: 210px
}

.c-notice-desktop > .close2 {
  top: 5px;
  left: -25px;
  margin: 0;
  width: 14px;
  height: 14px;
  position: absolute;
  cursor: pointer;
  opacity: .6;
  transition: .3s;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-notice-desktop > .close2:hover {
  opacity: 1
}

@-webkit-keyframes notice-out {
  0% {
    transform-origin: 0 0;
    transform: translateX(0);
    opacity: 1
  }
  70% {
    transform-origin: 0 0;
    transform: translateX(100%);
    height: auto;
    padding: 16px;
    opacity: 0
  }
  to {
    transform-origin: 0 0;
    transform: translateX(100%);
    height: 0;
    padding: 0;
    opacity: 0
  }
}

@keyframes notice-out {
  0% {
    transform-origin: 0 0;
    transform: translateX(0);
    opacity: 1
  }
  70% {
    transform-origin: 0 0;
    transform: translateX(100%);
    height: auto;
    padding: 16px;
    opacity: 0
  }
  to {
    transform-origin: 0 0;
    transform: translateX(100%);
    height: 0;
    padding: 0;
    opacity: 0
  }
}

@-webkit-keyframes notice-in {
  0% {
    opacity: 0;
    transform-origin: 0 0;
    transform: translateX(100%)
  }
  to {
    opacity: 1;
    transform-origin: 0 0;
    transform: translateX(0)
  }
}

@keyframes notice-in {
  0% {
    opacity: 0;
    transform-origin: 0 0;
    transform: translateX(100%)
  }
  to {
    opacity: 1;
    transform-origin: 0 0;
    transform: translateX(0)
  }
}

</style>