<script lang="ts" setup>
const props = defineProps({
  basketItems: {
    type: Array,
    default: function () {
      return []
    }
  },
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean,
    default: false
  },
  isBasketUpdating: {
    type: Boolean,
    default: false
  },
  productID: {
    type: Number
  },
  size: {
    type: String,
    validator(val: any) {
      return ["s", "m", "l", "xl"].includes(val)
    },
    default: "l"
  },
  isBasket: {
    type: Boolean,
    default: false
  },
  isVertical: {
    type: Boolean,
    default: false
  },
  isRareProduct: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["is-max", "remove", "basket-item-update", "basket-store-update"])
const appStore = useAppStore()

const changeID = ref(0)
const internalItems = ref([])
const isNotAllowed = ref(false)
const itemCount = ref("")
const tooltipIconPosition = ref("top-center")
const isTouchMin = ref(false)
const isTouchMax = ref(false)

const isMobile = computed(() => {
  return appStore.isMobile
})
const currentItem: any = computed(() => {
  let t
  return null !== (t = internalItems.value.find((i: any) => {
    return i.productID === props.productID
  })) && void 0 !== t ? t : {}
})
const productLimit = computed(() => {
  return props.hasLoyalCard ? currentItem.value?.limitWithCard : currentItem.value?.limitWithoutCard
})

watch(() => props.basketItems, (value) => {
  internalItems.value = <any>[...value]
})
watch(() => currentItem.value.count, (value) => {
  itemCount.value = "".concat(value ? value : "")
})

onMounted(() => {
  internalItems.value = <any>[...props.basketItems]
})

//METHODS
function touchMaxStart() {
  isTouchMax.value = true
}

function touchMinStart() {
  isTouchMin.value = true
}

function touchMaxEnd() {
  isTouchMax.value = false
}

function touchMinEnd() {
  isTouchMin.value = false
}

function changeItemCount(t: any, e: any) {
  if (e < 1) return t.isRemoved = true, void commit();
  t.count = e < productLimit.value ? e : productLimit.value, commit()
}

function checkItemCount(t: any) {
  let e = t.replace(/[^\d]|^0/, ""),
      n = Number(e) < productLimit.value ? e : "".concat(productLimit.value);
  itemCount.value = Number(n) < 1 ? "0" : n
}

function commit() {
  changeID.value++;
  let e = changeID.value;
  isNotAllowed.value = true
  props.isBasket ? update() : setTimeout(() => {
    changeID.value == e && update()
  }, 1e3)
}

function isMaxCount(t: any) {
  let e = t.count >= productLimit.value;
  return emit("is-max", e, productLimit.value), e
}

function itemDec(t: any) {
  if (t.count < 2) return t.isRemoved = true, void commit();
  t.count--, commit()
}

function itemInc(t: any) {
  t.count++, commit()
}

function update() {
  currentItem.value.isRemoved && props.isBasket ? emit("remove", currentItem.value) : props.isAuthorized ? emit("basket-item-update", {
    productID: currentItem.value.productID,
    count: currentItem.value.count,
    isRemoved: currentItem.value.isRemoved,
    isSelected: currentItem.value.isSelected
  }) : (localStorage.setItem("basket", JSON.stringify(internalItems.value.filter((i: any) => {
    return !i.isRemoved
  }))), emit("basket-store-update", internalItems.value.filter((i: any) => {
    return !i.isRemoved
  })))
}
</script>

<template>
  <div
      :class='["c-basket-product", size, { mobile: isMobile, "for-basket": isBasket, vertical: isVertical, rare: isRareProduct }]'>
    <div v-if="isBasketUpdating" :class='["loading", size]'>
      <span class="icon spinner"/>
    </div>
    <div class="quantity">
      <button :class="{ touch: isTouchMin, mobile: isMobile }" @click="()=>{itemDec(currentItem)}"
              v-on:touchstart="touchMinStart"
              v-on:touchend="touchMinEnd">
        <span class="icon minus"/>
      </button>
      <template v-if="isBasket">
        <input v-model="itemCount" class="count" type="text"
               v-on:input="[(e)=>{e.target.composing || (itemCount = e.target.value)},(e)=>{return checkItemCount(e.target.value)}]"
               v-on:change="(e)=>{changeItemCount(currentItem, Number(e.target.value))}">
      </template>
      <template v-else>
        <UiCEdit class="count" is-hide-status v-model="itemCount" :value="itemCount"
                 v-on:change="(e)=>changeItemCount(currentItem, Number(e.target.value))"
                 v-on:input="(e)=>{return checkItemCount(e.target.value)}"/>
      </template>
      <button :class="{ touch: isTouchMax, mobile: isMobile }" :disabled="isMaxCount(currentItem)"
              @click="()=>{itemInc(currentItem)}"
              v-on:touchstart="touchMaxStart"
              v-on:touchend="touchMaxEnd">
        <span class="icon plus2"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
.c-basket-product {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative
}

.c-basket-product.rare > .quantity > button {
  background-color: #005e01
}

.c-basket-product.rare > .quantity > button:not(.mobile):hover:not(:disabled) {
  background-color: green
}

.c-basket-product.rare > .quantity > button.touch, .c-basket-product.rare > .quantity > button:not(.mobile):active:not(:disabled) {
  background-color: #004902
}

.c-basket-product.rare > .quantity > :deep(.count) > div > input {
  color: #005e01
}

.c-basket-product > .loading {
  position: absolute;
  background-color: hsla(0, 0%, 100%, .77255);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 2
}

.c-basket-product > .loading > .spinner {
  background-color: #3f51b5;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin: auto
}

.c-basket-product > .loading.l > .spinner {
  width: 30px;
  height: 30px
}

.c-basket-product > .quantity {
  display: flex;
  border: 1px solid #eee;
  border-radius: 4px
}

.c-basket-product > .quantity > button {
  cursor: pointer;
  outline: none;
  border: 0;
  background-color: #3f51b5;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  transition: all .3s;
  -webkit-tap-highlight-color: transparent
}

.c-basket-product > .quantity > button:first-of-type {
  border-radius: 5px 0 0 5px
}

.c-basket-product > .quantity > button:last-of-type {
  border-radius: 0 5px 5px 0
}

.c-basket-product > .quantity > button > .icon {
  background-color: #fff;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  margin-right: 0
}

.c-basket-product > .quantity > button:not(.mobile):hover:not(:disabled) {
  background-color: #4960df
}

.c-basket-product > .quantity > button.touch, .c-basket-product > .quantity > button:not(.mobile):active:not(:disabled) {
  background-color: #32408f
}

.c-basket-product > .quantity > button:disabled {
  background-color: #d6d6e1;
  cursor: default
}

.c-basket-product > .quantity > button:disabled > .icon {
  background-color: #e7e7ea
}

.c-basket-product > .quantity > .count {
  font-weight: 600;
  font-size: 16px;
  line-height: 17px
}

.c-basket-product > .quantity > :deep(.count) > div > input {
  text-align: center;
  border: none;
  border-radius: 0;
  color: #3f51b5;
  letter-spacing: .065em
}

.c-basket-product.s {
  width: 120px
}

.c-basket-product.s > .quantity > button {
  width: 36px
}

.c-basket-product.s > .quantity > .count {
  width: 48px
}

.c-basket-product.m {
  width: 166px
}

.c-basket-product.m > .quantity > button {
  width: 36px
}

.c-basket-product.m > .quantity > .count {
  width: 94px
}

.c-basket-product.l {
  width: 188px
}

.c-basket-product.l > .quantity > button {
  width: 36px
}

.c-basket-product.l > .quantity > .count {
  width: 116px
}

.c-basket-product.xl {
  width: 304px
}

.c-basket-product.xl > .quantity > button {
  width: 36px
}

.c-basket-product.xl > .quantity > .count {
  width: 232px
}

.c-basket-product.mobile {
  height: 38px
}

.c-basket-product.mobile > .quantity > button {
  height: 38px;
  width: 36px;
  padding: 0
}

.c-basket-product.mobile > .quantity > button > .icon {
  width: 16px;
  height: 16px;
  margin: auto
}

.c-basket-product.mobile > .quantity > .count {
  height: 38px;
  width: 52px
}

.c-basket-product.mobile > .quantity > :deep(.count) > div > input {
  height: 38px
}

.c-basket-product.mobile.vertical:not(.for-basket) > .quantity > :deep(.count) > div > input {
  padding: unset;
  width: 36px;
  order: 2;
  height: 24px;
  font-weight: 500;
  font-size: 19px;
  line-height: 16px;
  border: none;
  outline: none;
  color: #1e1e1e;
  text-transform: uppercase;
  letter-spacing: unset;
  text-align: center;
  background-color: transparent
}

.c-basket-product.mobile.s {
  width: 124px
}

.c-basket-product.for-basket, .c-basket-product.vertical {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  background: transparent;
  flex-flow: column
}

.c-basket-product.for-basket > .quantity, .c-basket-product.vertical > .quantity {
  border: none;
  flex-flow: row-reverse;
  align-items: center
}

.c-basket-product.for-basket > .quantity > .count, .c-basket-product.vertical > .quantity > .count {
  width: 36px;
  order: 2;
  height: 24px;
  font-weight: 500;
  font-size: 19px;
  line-height: 16px;
  border: none;
  outline: none;
  color: #1e1e1e;
  text-transform: uppercase;
  letter-spacing: unset;
  text-align: center;
  background-color: transparent
}

.c-basket-product.for-basket > .quantity > button, .c-basket-product.vertical > .quantity > button {
  height: 26px;
  width: 26px;
  border-radius: 50px;
  border: 1px solid #818ca9;
  background-color: transparent
}

.c-basket-product.for-basket > .quantity > button:first-of-type, .c-basket-product.vertical > .quantity > button:first-of-type {
  order: 3
}

.c-basket-product.for-basket > .quantity > button > .icon, .c-basket-product.vertical > .quantity > button > .icon {
  width: 10px;
  height: 10px;
  background-color: #818ca9
}

.c-basket-product.for-basket > .quantity > button:not(.mobile):hover, .c-basket-product.vertical > .quantity > button:not(.mobile):hover {
  border-color: #4960df;
  background-color: unset
}

.c-basket-product.for-basket > .quantity > button:not(.mobile):hover > .icon, .c-basket-product.vertical > .quantity > button:not(.mobile):hover > .icon {
  background-color: #4960df
}

.c-basket-product.for-basket > .quantity > button:not(.mobile):active, .c-basket-product.vertical > .quantity > button:not(.mobile):active {
  border-color: #32408f;
  background-color: unset
}

.c-basket-product.for-basket > .quantity > button:not(.mobile):active > .icon, .c-basket-product.vertical > .quantity > button:not(.mobile):active > .icon {
  background-color: #32408f
}

.c-basket-product.for-basket > .quantity > button.touch, .c-basket-product.vertical > .quantity > button.touch {
  border-color: #32408f;
  background-color: unset
}

.c-basket-product.for-basket > .quantity > button.touch > .icon, .c-basket-product.vertical > .quantity > button.touch > .icon {
  background-color: #32408f
}

.c-basket-product.for-basket > .quantity > button:disabled, .c-basket-product.vertical > .quantity > button:disabled {
  border-color: #d6d6e1
}

.c-basket-product.for-basket > .quantity > button:disabled > .icon, .c-basket-product.vertical > .quantity > button:disabled > .icon {
  background-color: #d6d6e1
}

.c-basket-product.for-basket > .quantity > span, .c-basket-product.vertical > .quantity > span {
  width: 52px;
  align-self: center;
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: .065em;
  text-transform: uppercase
}

.c-basket-product.for-basket.vertical > .quantity, .c-basket-product.vertical.vertical > .quantity {
  flex-flow: column
}

@media screen and (max-width: 340px) {
  .c-basket-product.for-basket > .quantity > .count {
    font-size: 16px
  }
}
</style>