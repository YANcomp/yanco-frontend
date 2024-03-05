<script lang="ts" setup>
const props = defineProps({
  params: {
    type: <any>Object
  },
  basketItems: {
    type: Array
  },
  canBeDragged: {
    type: Boolean,
    default: !1
  },
  forBasketPage: {
    type: Boolean,
    default: !1
  },
  hasLoyalCard: {
    type: Boolean
  },
  hasPaidPeriod: {
    type: Boolean
  },
  isAdditional: {
    type: Boolean
  },
  isAuthorized: {
    type: Boolean
  },
  isBasketLoading: {
    type: Boolean,
    default: !1
  },
  isBasketUpdating: {
    type: Boolean,
    default: !1
  },
  isCityAllowDelivery: {
    type: Boolean
  },
  isMobile: {
    type: Boolean
  },
  isQuantityVertical: {
    type: Boolean,
    default: !1
  },
  isShowUnderTheOrder: {
    type: Boolean,
    default: !1
  },
  isWidthForPhone: {
    type: Boolean,
    default: !1
  },
  preparedCheckItems: {
    type: <any>Object
  },
  product: {
    type: <any>Object
  },
  currentWidth: {
    type: Number
  },
  favoritesItemsIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  pharmacyStockCount: {
    type: Number
  }
})

const cardRef = ref(<any>undefined)
const cardLeftPos = ref(0)
const isProductFavoriteActive = ref(!1)
const isMouseDown = ref(!1)
const isMouseUp = ref(!1)
const isSelected = ref(props.product.isSelected)
const lastTouchLeft = ref(0)
const rounding = uRounding
const preparedProducts = uPrepared
const emit = defineEmits(["drag", "remove", "add-to-favorites", "add-to-favorites-product-might-need", "add-to-basket", "add-to-basket-product-might-need", "open-product-curtain", "basket-store-update", "basket-item-update", "restore"])
const cardLeftPosPx = computed(() => {
  return "" + cardLeftPos.value + "px"
})
const productCount = computed(() => {
  return props.product.count !== undefined ? props.product.count : 1
})
const productTheMightNeed = computed(() => {
  return useProductsStore().productTheMightNeed
})
const image = computed(() => {
  return uPrepareProduct({...(props.product !== null ? props.product : {})}, uSIZE_XS, props.params.cdnURL.url).images[0]
})
const isFavorite = computed(() => {
  return props.favoritesItemsIDs.includes(props.product.productID)
})

watch(() => props.canBeDragged, () => {
})
watch(() => props.product, () => {
})
watch(() => isSelected.value, () => {
})

function addToBasketProductMightNeed() {
  emit("add-to-basket-product-might-need")
}

function addToBasket(t: any) {
  emit("add-to-basket", t)
}

function addToFavoritesProductMightNeed() {
  emit("add-to-favorites-product-might-need")
}

function addToFavorites() {
  props.isMobile && setTimeout(() => {
    cardLeftPos.value = 0
  }, 500)
  emit("add-to-favorites", props.product)
}

function discountByAction(t: any) {
  return (null != t ? t : "").split("+").reduce((t: any, e: any) => {
    return Number(t) + Number(e)
  }, 0)
}

function favoriteMouseDown() {
  isMouseDown.value = !0
  isProductFavoriteActive.value = !0
}

function favoriteMouseOut() {
  isMouseDown.value && !isMouseUp.value && (isProductFavoriteActive.value = !1)
}

function favoriteMouseUp() {
  isMouseDown.value = !1
  isMouseUp.value = !0
  setTimeout(() => {
    isProductFavoriteActive.value = !1
    isMouseUp.value = !1
  }, 300)
}

function hasDiscountByAction(t: any) {
  return void 0 !== props.preparedCheckItems[t] && void 0 !== props.preparedCheckItems[t].ruleID
}

function touchStart(t: any) {
  if (props.isMobile) {
    cardRef.value.style.transition = "";
    let e = t.changedTouches ? t.changedTouches[0] : t;
    lastTouchLeft.value = e.pageX
    document.addEventListener("touchmove", touchMove)
    document.addEventListener("touchend", touchEnd)
    emit("drag")
  }
}

function touchMove(t: any) {
  let e = cardRef.value,
      n = t.target;
  if (e.contains(n)) {
    var o = (t.changedTouches ? t.changedTouches[0] : t).pageX,
        r = cardLeftPos.value - lastTouchLeft.value + o;
    cardLeftPos.value = r > 0 ? 0 : r < -153 ? -153 : r
    lastTouchLeft.value = o
  }
}

function touchEnd() {
  cardRef.value.style.transition = ".3s"
  cardLeftPos.value = cardLeftPos.value > -64 ? 0 : -128
  document.removeEventListener("touchend", touchEnd)
  document.removeEventListener("touchmove", touchMove)
}

function remove(t: any) {
  cardLeftPos.value = 0
  emit("remove", t)
}

function restore(t: any) {
  emit("restore", t)
}

function basketSticker(t: any) {
  return V.c[t]
}

function sticker(t: any) {
  return V.q[t]
}

function updateBasketItem(t: any) {
  emit("basket-item-update", t)
}

function updateBasketStore(t: any) {
  emit("basket-store-update", t)
}

function openProductCurtain() {
  emit("open-product-curtain", props.product.productID, props.product.productSlug, !0)
}
</script>

<template>
  <div class="c-basket-product-card">
    <div v-if="isMobile && !product.isRemoved" class="mobile-buttons">
      <div class="icon-wrap" @click="addToFavorites" @mousedown="favoriteMouseDown" @mouseup="favoriteMouseUp"
           @mouseout="favoriteMouseOut">
        <span
            :class='["icon favorite", { active: isProductFavoriteActive, heart2: isFavorite, "heart-outline3": !isFavorite }]'/>
      </div>
      <div class="separator"/>
      <div class="icon-wrap" @click="remove(product)">
        <span class="icon trash2"/>
      </div>
    </div>
    <div ref="cardRef"
         :class='["card", { removed: product.isRemoved, "under-the-order": !product.isInStock && !product.isRemoved, "for-basket-page": forBasketPage }]'
         :style='{ left: product.isRemoved ? 0 : cardLeftPosPx }' @touchstart="touchStart">
      <template v-if="product.isRemoved && !isAdditional">
        <div :class='["removed", { mobile: currentWidth <= 510 }]'>
          <div class="intro">
            <span>Вы удалили</span>
            <span class="name">{{ product.name }}</span>
          </div>
          <div class="restore" @click="restore(product)">
            <span v-if="currentWidth > 510">Вернуть</span>
            <span :class='["icon", { restore: !forBasketPage, "restore-bold": forBasketPage }]'/>
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          <UiCCheckbox mode="default" v-model:checked="isSelected"/>
          <NuxtLink class="image" :to="product.route">
            <!--            <span>sticker</span>-->
            <img :alt='product.images ? product.name : "Изображение отсутствует"' :src="image"
                 data-tooltip="Перейти на страницу товара" width="100%" height="100%"/>
          </NuxtLink>
          <div :class='["name-and-price", { "is-recipe": product.isRecipe }]'>
            <NuxtLink :to="product.route" data-tooltip="Перейти на страницу товара"
                      :class='["name", { "not-margin": isWidthForPhone && !isAdditional && (product.allowDelivery || product.deliveryRuleID && isCityAllowDelivery) }]'>
              <span>{{ product.name }}</span>
              <div v-if="product.isRecipe && currentWidth >= 610" class="is-recipe">
                <span class="icon prescription-mini"/>
                Отпускается по рецепту
              </div>
            </NuxtLink>

            <div v-if="void 0 !== product.price"
                 :class='["price", { "has-discount": product.isLoyal ? void 0 !== preparedCheckItems[product.productID] && preparedCheckItems[product.productID].discount > 0 : product.isRank ? hasDiscountByAction(product.productID) && preparedCheckItems[product.productID].discount > 0 : hasDiscountByAction(product.productID), "no-paid-period": !hasPaidPeriod, "one-count": 1 === productCount }]'>
              <!--             TODO end [n("div", [t.product.isLoyal ? [n("span", [t._v("По акции")]), t._v(" "), n("span", {-->
            </div>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.c-basket-product-card {
  position: relative
}

.c-basket-product-card > .mobile-buttons {
  position: absolute;
  right: 0;
  z-index: 0;
  display: flex;
  width: 128px;
  justify-content: space-around;
  align-items: center;
  height: 100%
}

.c-basket-product-card > .mobile-buttons > .icon-wrap {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: stretch
}

.c-basket-product-card > .mobile-buttons > .icon-wrap > .icon {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  transition: .3s;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-basket-product-card > .mobile-buttons > .icon-wrap > .icon.heart2 {
  background-color: #ff0089
}

.c-basket-product-card > .mobile-buttons > .icon-wrap > .icon.active {
  background-color: #cc006e;
  position: relative;
  transform: scale(1.2)
}

.c-basket-product-card > .mobile-buttons > .icon-wrap > .icon.trash2 {
  background-color: #ff324b
}

.c-basket-product-card > .mobile-buttons > .separator {
  height: 80px;
  width: 1px;
  background-color: #d6d6e1
}

.c-basket-product-card > .card {
  display: flex;
  flex-flow: column;
  min-height: 85px;
  width: 100%;
  margin: 15px 0;
  align-items: center;
  position: relative;
  z-index: 1;
  background-color: #fff
}

.c-basket-product-card > .card.removed {
  min-height: unset;
  box-sizing: border-box;
  margin-left: 4px
}

.c-basket-product-card > .card.removed > div {
  width: 100%
}

.c-basket-product-card > .card.removed > div > .intro {
  display: flex;
  align-items: center
}

.c-basket-product-card > .card.removed > div > .intro > span:first-of-type {
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #1e1e1e;
  margin-right: 13px;
  white-space: nowrap
}

.c-basket-product-card > .card.removed > div > .intro > .name {
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #818ca9;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden
}

.c-basket-product-card > .card.removed > div > .restore {
  display: flex;
  color: #3f51b5;
  align-items: center;
  margin-left: auto
}

.c-basket-product-card > .card.removed > div > .restore > .icon {
  margin: 0 0 0 5px;
  background-color: #3f51b5;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: all .45s ease-in-out;
  border: 1px solid #fff
}

.c-basket-product-card > .card.removed > div > .restore:hover {
  color: #4960df;
  cursor: pointer
}

.c-basket-product-card > .card.removed > div > .restore:hover > .icon {
  background-color: #4960df;
  transform: rotate(-1turn)
}

.c-basket-product-card > .card.removed > div > .restore:active {
  color: #32408f
}

.c-basket-product-card > .card.removed > div > .restore:active > .icon {
  background-color: #32408f
}

.c-basket-product-card > .card.removed > div.mobile > .intro {
  flex-flow: column;
  align-items: unset
}

.c-basket-product-card > .card.removed > div.mobile > .intro > span:first-of-type {
  margin-bottom: 5px
}

.c-basket-product-card > .card.removed > div.mobile > .intro > .name {
  -webkit-line-clamp: 1
}

.c-basket-product-card > .card.under-the-order {
  background-color: #fff5eb;
  padding-top: 5px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) {
  display: flex;
  align-items: center;
  transition: all .3s ease-in-out;
  justify-content: space-between;
  width: 100%
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .image {
  margin-right: 15px;
  max-width: 85px;
  max-height: 85px;
  min-width: 85px;
  position: relative
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .image > .sticker {
  border-radius: 15px;
  padding: 3px 10px;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .image > .sticker.text {
  font-size: 10px;
  padding: 4px 7px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .image > img {
  max-height: 85px;
  max-width: 85px;
  min-height: 85px;
  display: block;
  margin: 0 auto
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .image > img:hover {
  cursor: pointer
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .add-to-basket {
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3f51b5;
  border: none;
  transition: all .3s ease-in-out
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .add-to-basket > .add-basket {
  background-color: #fff;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .add-to-basket > .spinner {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin: 0;
  background-color: #fff
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .add-to-basket:hover {
  cursor: pointer;
  background-color: #4960df
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .add-to-basket:active {
  background-color: #32408f
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price {
  display: flex;
  flex-flow: column
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .name {
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  max-width: 220px;
  color: #1e1e1e;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 12px;
  width: 100%
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .name > span:hover {
  color: #4960df;
  cursor: pointer
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .name > span:active {
  color: #32408f
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .name > .stock-count {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .3s;
  font-size: 14px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .name > .stock-count > span {
  color: #3f51b5;
  font-weight: 600
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .name > .stock-count > span > span {
  color: #ff0089
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .name > .stock-count:hover > span {
  color: #4960df
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .stock-count {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .3s;
  font-size: 14px
}

@media screen and (max-width: 365px) {
  .c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .stock-count {
    font-size: 11px
  }
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .stock-count > span {
  color: #3f51b5;
  font-weight: 600
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .stock-count > span > span {
  color: #ff0089
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .stock-count:hover > span {
  color: #4960df
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .icon2, .c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .icon {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  min-width: 30px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .icon2 {
  background-color: transparent
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price {
  display: flex;
  max-width: 218px;
  min-width: 218px;
  height: 59px;
  white-space: nowrap
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price.has-discount {
  height: 82px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div {
  display: flex;
  flex-flow: column
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div > div {
  font-size: 11px;
  line-height: 13px;
  margin-top: 3px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div > .discount {
  font-weight: 500;
  font-size: 11px;
  line-height: 15px;
  margin-top: 8px;
  color: #ff0089
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type {
  max-width: 105px;
  margin-right: 20px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:first-of-type {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 2px;
  width: 90px;
  height: 15px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:last-of-type {
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  height: 26px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:last-of-type.loyal {
  background-color: #ff0089;
  border-radius: 5px;
  color: #fff;
  padding: 1px 5px;
  height: 24px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type {
  max-width: 93px;
  min-width: 93px;
  position: relative;
  color: #818ca9
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type > span:first-of-type {
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 3px;
  height: 14px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type > span:last-of-type {
  font-size: 22px;
  line-height: 27px;
  height: 26px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type:before {
  display: block;
  content: "";
  position: absolute;
  height: 17px;
  width: 1px;
  background-color: #818ca9;
  left: -15px;
  top: 20px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price.no-paid-period.has-discount {
  height: 59px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price.no-paid-period > div:first-of-type > span:last-of-type.loyal {
  margin-top: 3px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price.no-paid-period > div > .discount {
  margin: 3px 0
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price.one-count {
  height: auto
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .price.one-count > div > .discount {
  margin-top: 4px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons {
  display: flex;
  align-items: center;
  margin-top: 10px;
  max-width: 165px
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons > .c-button {
  max-width: 124px;
  font-size: 10px;
  line-height: 12px;
  -webkit-tap-highlight-color: transparent
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons > .icon, .c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons > .c-button > .caption > .icon {
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons > .icon {
  height: 27px;
  width: 27px;
  margin: 0 0 0 auto;
  transition: .3s;
  background-color: #1e1e1e;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-tap-highlight-color: transparent
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons > .icon:hover {
  background-color: #fe60b5;
  cursor: pointer
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons > .icon.heart2 {
  background-color: #ff0089
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price > .buttons > .icon.active {
  background-color: #cc006e;
  position: relative;
  transform: scale(1.2)
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price.is-recipe > .name {
  margin-bottom: 0
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .name-and-price.is-recipe .is-recipe {
  display: flex;
  font-size: 10px;
  align-items: center;
  color: #818ca9
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .quantity > .c-basket-product > .loading {
  background-color: transparent
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icon2, .c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icon {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icon2 {
  background-color: transparent
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .favorite {
  margin: 0 0 0 15px;
  width: 27px;
  min-width: 27px;
  height: 27px;
  cursor: pointer;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  transition: .3s;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .favorite:hover {
  background-color: #fe60b5;
  cursor: pointer
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .favorite.heart2 {
  background-color: #ff0089
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .favorite.active {
  background-color: #cc006e;
  position: relative;
  transform: scale(1.2)
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons {
  display: flex
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons > .favorite {
  margin: 0 0 0 15px;
  width: 27px;
  min-width: 27px;
  height: 27px;
  cursor: pointer;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  transition: .3s;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons > .favorite:hover:not(.mobile) {
  background-color: #fe60b5;
  cursor: pointer
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons > .favorite.heart2 {
  background-color: #ff0089
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons > .favorite.active {
  background-color: #cc006e;
  position: relative;
  transform: scale(1.2)
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons > .trash2 {
  width: 24px;
  height: 24px;
  background-color: #818ca9;
  margin: 0 0 0 10px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 90%;
  mask-size: 90%
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons > .trash2:hover {
  cursor: pointer;
  background-color: #4960df
}

.c-basket-product-card > .card > div:not(.alert):not(.might-need) > .icons > .trash2:active {
  background-color: #32408f
}

.c-basket-product-card > .card > .alert {
  color: #1e1e1e;
  font-size: 12px;
  line-height: 14px;
  justify-content: center;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: 5px;
  max-height: 20px
}

.c-basket-product-card > .card > .alert > .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 70%;
  mask-size: 70%
}

.c-basket-product-card > .card > .alert.limit-reached {
  background-color: #fff6f7
}

.c-basket-product-card > .card > .alert.discount {
  background-color: #fdf6ff
}

.c-basket-product-card > .card > .alert.used {
  background-color: #ebfef8
}

.c-basket-product-card > .card > .alert.used > .icon {
  background-color: #07d088
}

.c-basket-product-card > .card > .alert.under-the-order {
  background-color: #ff7a00;
  color: #fff
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) {
  width: 100%
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image {
  max-height: 80px;
  max-width: 80px;
  min-width: 80px;
  -webkit-tap-highlight-color: transparent
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image > img {
  max-height: 80px;
  max-width: 80px;
  min-height: 80px
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price {
  flex-flow: row;
  align-items: center;
  max-width: 600px;
  width: 100%
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .name {
  max-width: 355px;
  font-size: 16px;
  line-height: 23px;
  margin-right: 27px;
  -webkit-line-clamp: 2;
  -webkit-tap-highlight-color: transparent
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .quantity {
  display: flex;
  flex-flow: column;
  align-items: center
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .quantity > .c-basket-product {
  margin: 0 10px
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .icon2, .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .icon {
  min-width: 30px;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .icons > .favorite {
  min-width: 27px;
  margin-right: 0;
  -webkit-tap-highlight-color: transparent
}

.c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .icons > .trash2 {
  margin: 0 0 0 15px;
  min-width: 24px
}

.c-basket-product-card > .card.for-basket-page > .removed {
  justify-content: space-between;
  background-color: #f7f8fc;
  padding: 8px 0
}

.c-basket-product-card > .card.for-basket-page > .removed > .intro {
  align-items: center
}

.c-basket-product-card > .card.for-basket-page > .removed > .intro > span {
  font-size: unset;
  line-height: unset;
  white-space: nowrap
}

.c-basket-product-card > .card.for-basket-page > .removed > .intro > .name {
  white-space: unset;
  max-width: unset;
  min-width: unset
}

.c-basket-product-card > .card.for-basket-page > .removed > .restore {
  font-weight: 500
}

@media screen and (max-width: 1245px) {
  .c-basket-product-card > .card.for-basket-page > div > .icons > .favorite {
    margin-left: 0
  }

  .c-basket-product-card > .card.for-basket-page > div > .icons > .trash2 {
    margin-left: 10px
  }
}

@media screen and (max-width: 930px) {
  .c-basket-product-card > .card.for-basket-page > div > .icon2, .c-basket-product-card > .card.for-basket-page > div > .icon {
    margin-right: 0
  }
}

@media screen and (max-width: 700px) {
  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .name {
    word-wrap: anywhere
  }
}

@media screen and (max-width: 670px) {
  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .name {
    font-size: 14px;
    line-height: 17px
  }
}

@media screen and (max-width: 610px) {
  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image {
    max-height: 80px;
    max-width: 80px;
    min-width: 80px;
    margin-right: 10px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image > img {
    max-height: 80px;
    max-width: 80px;
    min-height: 80px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .restore {
    padding-right: 5px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price {
    flex-flow: column;
    align-items: unset;
    max-width: 222px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price {
    max-width: 165px;
    min-width: 165px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type {
    max-width: 88px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:first-of-type {
    font-size: 9px;
    line-height: 11px;
    margin: 0
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:last-of-type {
    font-size: 18px;
    line-height: 24px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type {
    max-width: 80px;
    min-width: 80px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type > span:first-of-type {
    font-size: 9px;
    line-height: 11px;
    margin: 0
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type > span:last-of-type {
    font-size: 18px;
    line-height: 24px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price.is-recipe > .name {
    margin-bottom: 12px
  }
}

@media screen and (max-width: 510px) {
  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .image {
    margin-right: 10px;
    max-width: 105px;
    max-height: 105px;
    min-width: 105px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .image > img {
    max-height: 105px;
    max-width: 105px;
    min-height: 105px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price {
    margin-right: 20px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .name {
    max-width: 165px;
    margin-bottom: 0
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .icon2, .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .icon {
    margin: 0
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .price {
    max-width: 165px;
    min-width: 165px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type {
    max-width: 88px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:first-of-type {
    font-size: 9px;
    line-height: 11px;
    margin: 0
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:last-of-type {
    font-size: 18px;
    line-height: 24px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type {
    max-width: 80px;
    min-width: 80px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type > span:first-of-type {
    font-size: 9px;
    line-height: 11px;
    margin: 0
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type > span:last-of-type {
    font-size: 18px;
    line-height: 24px
  }

  .c-basket-product-card > .card:not(.for-basket-page).removed {
    align-items: flex-start;
    padding: 0 10px;
    margin-left: 0
  }

  .c-basket-product-card > .card:not(.for-basket-page).removed > div > .restore {
    font-weight: 500
  }

  .c-basket-product-card > .card:not(.for-basket-page).removed > div > .restore > span:first-of-type {
    order: 2
  }

  .c-basket-product-card > .card:not(.for-basket-page).removed > div > .restore > span:last-of-type {
    order: 1;
    margin: 0
  }

  .c-basket-product-card > .card.for-basket-page > .alert {
    font-size: 10px;
    line-height: 12px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .icon2, .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .icon {
    margin: 0
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .name {
    font-size: 13px;
    line-height: 16px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .name.not-margin {
    margin-bottom: 0
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .icons {
    height: 78px;
    flex-flow: column;
    align-items: center;
    justify-content: space-between
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .icons > .icon {
    margin: 0
  }
}

@media screen and (max-width: 450px) {
  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need):not(.removed) {
    width: unset
  }
}

@media screen and (max-width: 400px) {
  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .name {
    font-size: 12px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price {
    max-width: 135px;
    min-width: 135px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type {
    max-width: 78px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type > span:last-of-type, .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:last-of-type > span:last-of-type {
    font-size: 14px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div > .discount {
    font-size: 10px
  }
}

@media screen and (max-width: 360px) {
  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .image {
    margin-right: 5px;
    max-width: 65px;
    max-height: 65px;
    min-width: 65px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .image > .sticker {
    font-size: 8px;
    padding: 2px 5px
  }

  .c-basket-product-card > .card:not(.for-basket-page) > div:not(.alert):not(.might-need) > .image > img {
    max-height: 65px;
    max-width: 65px;
    min-height: 65px
  }
}

@media screen and (max-width: 350px) {
  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image {
    max-height: 70px;
    max-width: 70px;
    min-width: 70px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image > .sticker {
    font-size: 8px;
    padding: 2px 5px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image > img {
    max-height: 70px;
    max-width: 70px;
    min-height: 70px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price {
    max-width: 120px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .name-and-price > .price > div:first-of-type {
    margin-right: 15px;
    max-width: 70px
  }
}

@media screen and (max-width: 330px) {
  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image {
    max-height: 50px;
    max-width: 50px;
    min-width: 50px
  }

  .c-basket-product-card > .card.for-basket-page > div:not(.alert):not(.might-need) > .image > img {
    max-height: 50px;
    max-width: 50px;
    min-height: 50px
  }
}
</style>