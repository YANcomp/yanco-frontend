<script lang="ts" setup>
const props = defineProps({
  activedPromocode: {
    type: String
  },
  isMobile: {
    type: Boolean,
    default: !1
  },
  isOpenedMobile: {
    type: Boolean,
    default: !1
  }
})

const isSendingPromoCode = ref(!1)
const isEmptyPromoCode = ref(!1)
const promoCode = ref("")
const isOpened = ref(!1)

const hasActivedPromocode = computed(() => {
  return void 0 !== props.activedPromocode
})

const emit = defineEmits(["open", "close", "finally"])


watch(() => props.isOpenedMobile, (value) => {
  value && (isOpened.value = !0)
})
watch(() => promoCode.value, (value) => {
  promoCode.value = value.slice(0, 20).replace(/[^A-zА-яё\d]|\^|`|\\|\[|\]|\s/, "")
  isEmptyPromoCode.value = !1
})

onMounted(() => {
  promoCode.value = props.activedPromocode ? props.activedPromocode : ""
})

function open() {
  hasActivedPromocode.value || (props.isMobile ? emit("open") : isOpened.value = !0)
}

function changePromoCode(e?: any) {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "apply",
      n = promoCode.value;
  if (n.length < 1) isEmptyPromoCode.value = !0;
  else {
    isSendingPromoCode.value = !0;
    let o = "apply" === e ? useNuxtApp().$api.me.applyPromoCode({
      promoCode: n
    }) : useNuxtApp().$api.me.cancelPromoCode();
    o.then((e) => {
      useMeStore().ME_GET().then((e: any) => {
        promoCode.value = e.promocode ? e.promocode : ""
      }).finally(() => {
        isSendingPromoCode.value = !1
        isOpened.value = !1
        props.isOpenedMobile && emit("close")
      })
      useNotificationsStore().NOTIFICATIONS_UPD({
        desc: e.message,
        status: "success"
      })
    }).catch((e) => {
      useNotificationsStore().NOTIFICATIONS_UPD({
        title: "Произошла ошибка",
        desc: e,
        status: "error"
      })
      isSendingPromoCode.value = !1
    }).finally(() => {
      props.isMobile && emit("finally")
    })
  }
}
</script>

<template>
  <div :class='["c-promo-code", { mobile: isMobile }]'>
    <div v-if="isOpened || isOpenedMobile" class="opened">
      <div class="top">
        <span class="icon info-alert"/>
        <span>Используйте только один промокод в заказе.</span>
      </div>
      <div class="input-button">
        <UiCEdit :class='{ "has-promocode": hasActivedPromocode, loading: isSendingPromoCode }'
                 :is-error="isEmptyPromoCode" placeholder="Введите промокод" v-model:value="promoCode">
          <template v-if="isEmptyPromoCode" v-slot:status-text>
            <span>Промокод не введен</span>
          </template>
        </UiCEdit>
        <UiCButton :disabled="isSendingPromoCode" :is-loading="isSendingPromoCode" mode="primary" size="l"
                   @click="changePromoCode">
          Применить
        </UiCButton>
      </div>
    </div>
    <div v-else :class='["info", { apply: hasActivedPromocode }]' @click="open">
      <span class="icon promocode"/>
      <template v-if="hasActivedPromocode">
        <span>{{ "Промокод " + activedPromocode + " применён." }}</span>
        <div class="remove" @click.prevent='changePromoCode("cancel")'>
          <span>Удалить</span>
          <span class="icon trash2"/>
        </div>
      </template>
      <template v-else>
        <span class="hover-bottom-line">У вас есть промокод? Примените его!</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.c-promo-code {
  display: flex;
  margin-top: 10px
}

.c-promo-code > div {
  display: flex;
  align-items: center
}

.c-promo-code > div > .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #3f51b5;
  margin-right: 7px;
  transition: all .3s ease-in-out
}

.c-promo-code > div > span {
  color: #3f51b5;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  transition: all .3s ease-in-out
}

.c-promo-code > div > .remove {
  display: flex;
  align-items: center;
  margin-left: 15px
}

.c-promo-code > div > .remove > span {
  font-size: 14px;
  line-height: 17px;
  color: #818ca9;
  transition: all .3s ease-in-out
}

.c-promo-code > div > .remove > .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 80%;
  mask-size: 80%;
  background-color: #818ca9;
  transition: all .3s ease-in-out;
  margin-right: 0;
  margin-left: 5px
}

.c-promo-code > div > .remove:hover {
  cursor: pointer
}

.c-promo-code > div > .remove:hover > span {
  color: #f14a4a
}

.c-promo-code > div > .remove:hover > .icon {
  background-color: #f14a4a
}

.c-promo-code > div.info {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.c-promo-code > div.opened {
  align-items: unset;
  flex-flow: column
}

.c-promo-code > div.opened > div {
  display: flex;
  align-items: flex-start
}

.c-promo-code > div.opened > div.top {
  align-items: center;
  margin-bottom: 11px
}

.c-promo-code > div.opened > div.top > .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #3f51b5;
  margin-right: 10px
}

.c-promo-code > div.opened > div.top > span {
  font-size: 14px;
  line-height: 17px;
  color: #1a1a1a
}

.c-promo-code > div.opened > div > :deep(.c-edit) {
  margin-right: 10px;
  max-width: 300px
}

.c-promo-code > div.opened > div > :deep(.c-edit.has-promocode), .c-promo-code > div.opened > div > :deep(.c-edit.loading) {
  pointer-events: none
}

.c-promo-code > div.opened > div > :deep(.c-edit) input {
  width: 100%
}

.c-promo-code > div.opened > div > :deep(.c-button) {
  max-width: 150px;
  font-size: 13px;
  line-height: 16px;
  flex-shrink: 0
}

.c-promo-code > div:hover.info:not(.apply) {
  cursor: pointer
}

.c-promo-code > div:hover.info:not(.apply) > .icon {
  background-color: #4960df
}

.c-promo-code > div:hover.info:not(.apply) > span {
  color: #4960df
}

.c-promo-code > div:active > .icon {
  background-color: #32408f
}

.c-promo-code > div:active > span {
  color: #32408f
}

.c-promo-code.mobile > div.opened {
  width: 100%
}

.c-promo-code.mobile > div.opened > .input-button {
  flex-direction: column;
  grid-gap: 15px;
  gap: 15px
}

.c-promo-code.mobile > div.opened > .input-button > :deep(.c-edit) {
  width: 100%;
  max-width: unset
}

.c-promo-code.mobile > div.opened > .input-button > :deep(.c-button) {
  max-width: unset;
  flex-shrink: unset
}

.c-promo-code.mobile > div.opened > .top {
  margin-bottom: 15px
}

.c-promo-code.mobile > div.opened > .top > span {
  font-size: 13px
}

.c-promo-code.mobile > div > .icon {
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 20px;
  height: 20px
}

.c-promo-code.mobile > div > span {
  font-size: 12px;
  line-height: 15px
}

@media screen and (max-width: 350px) {
  .c-promo-code.mobile > div.opened > div > :deep(.c-edit) {
    width: 100%
  }

  .c-promo-code.mobile > div.opened > div > :deep(.c-button) {
    max-width: 120px;
    flex-shrink: unset
  }
}
</style>