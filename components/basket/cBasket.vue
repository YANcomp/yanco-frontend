<script lang="ts" setup>
const props = defineProps({
  basketCount: {
    type: Number
  },
  basketSelectedCount: {
    type: Number
  },
  basketItems: {
    type: Array
  },
  city: {
    type: Object
  },
  favoritesItems: {
    type: Array
  },
  hasFreeDelivery: {
    type: Boolean,
    default: !1
  },
  hasLoyalCard: {
    type: Boolean,
    default: !1
  },
  hasPaidPeriod: {
    type: Boolean,
    default: !1
  },
  isAllowDelivery: {
    type: Boolean,
    default: !1
  },
  isAuthorized: {
    type: Boolean,
    default: !1
  },
  isBasketChanging: {
    type: Boolean,
    default: !1
  },
  isCityAllowDelivery: {
    type: Boolean,
    default: !1
  },
  isDeniedDelivery: {
    type: Boolean,
    default: !1
  },
  isMobile: {
    type: Boolean,
    default: !1
  },
  isNoDeliveryRules: {
    type: Boolean,
    default: !1
  },
  me: {
    type: Object
  },
  amountForFreeShipping: {
    type: Number,
    default: 0
  },
  params: {
    type: Object
  },
  possiblePrices: {
    type: Object
  },
  preparedCheckItems: {
    type: Object
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  updatingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  basketPharmacyStock: {
    type: Object
  }
})

const overlayRef = ref(<any>undefined)

const isHideAlert = ref(!1)
const internalItems = ref([])
const changeID = ref(0)
const internalCityID = ref(void 0)
const isShowAlert = ref(!0)
const isClosedAlert = ref(!1)
const isOpenLoyalPrices = ref(!1)
const needClosedMobileBottomTooltip = ref(!1)
const isWidthForPhone = ref(!1)
const isOpenPromocode = ref(!1)
const currentWidth = ref(0)
const isElectronicCheckAgree = ref(!1)
const isModeBuyPeriods = ref(!1)
const periods = ref([])
const selectedPeriod = ref({})
const isSubscribePeriods = ref(!1)
const isOpenedModal = ref(!1)
const isModalTargetBindings = ref(!1)
const basketOfferedProducts = ref([])
const isGettingBasketOferredProducts = ref(!1)
const productsTheMightNeed = ref([])
const lastDraggedItemIndex = ref(null)
</script>

<template>
  <div ref="overlayRef" :class='["c-basket", { mobile: isMobile, "all-deleted": basketCount < 1 && !isNoItems }]'>

  </div>
</template>

<style scoped>
.c-basket {
  min-height: 400px;
  z-index: 998
}

.c-basket > div, .c-basket {
  height: 100%;
  width: 100%;
  display: flex
}

.c-basket > div {
  background-color: #fff;
  margin-left: auto;
  transition: all .3s ease-in-out;
  position: relative
}

.c-basket > div > .loading {
  left: 0;
  top: 0
}

.c-basket > div.mobile {
  box-sizing: border-box
}

.c-basket > div.mobile > .products {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content
}

.c-basket > div > .top {
  display: flex;
  align-items: center;
  margin-top: 29px;
  margin-left: 26px;
  margin-bottom: 10px;
  box-sizing: border-box;
  max-width: 466px;
  width: 100%
}

.c-basket > div > .top > .arrow-left {
  display: none;
  -webkit-mask-size: 75%;
  mask-size: 75%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1e1e1e;
  margin-right: 10px
}

.c-basket > div > .top > p {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin: 0
}

.c-basket > div > .top > p > .count {
  color: #ff0089
}

.c-basket > div > .top > .remove {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: .045em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  color: #818ca9;
  margin-right: 21px;
  transition: all .3s ease-in-out;
  margin-left: auto
}

.c-basket > div > .top > .remove > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 80%;
  mask-size: 80%
}

.c-basket > div > .top > .remove > .icon:hover {
  background-color: #4960df
}

.c-basket > div > .top > .remove > div {
  position: relative;
  width: 28px;
  height: 28px
}

.c-basket > div > .top > .remove > div > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  transition: all .3s ease-in-out;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  position: absolute
}

.c-basket > div > .top > .remove > div > .icon.trash-part1 {
  top: -4px;
  left: 1px;
  width: 22px;
  -webkit-mask-size: 60% 25%;
  mask-size: 60% 25%
}

.c-basket > div > .top > .remove > div > .icon.trash-part2 {
  -webkit-mask-size: 80%;
  mask-size: 80%;
  bottom: 0
}

.c-basket > div > .top > .remove:hover {
  color: #4960df;
  cursor: pointer
}

.c-basket > div > .top > .remove:hover > div > .icon {
  background-color: #4960df
}

.c-basket > div > .top > .remove:hover > div > .icon.trash-part1 {
  transform: rotate(45deg);
  top: -7px;
  left: 5px
}

.c-basket > div > .top > .remove:active {
  color: #32408f
}

.c-basket > div > .top > .remove:active > .icon {
  background-color: #32408f
}

.c-basket > div > .top.has-scroll > .remove {
  margin-right: 24px
}

.c-basket > div > .close {
  position: fixed;
  width: 513px;
  top: 20px
}

.c-basket > div > .close > .close2 {
  position: absolute;
  cursor: pointer;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  top: 10px;
  left: -30px;
  background-color: #fff;
  transition: all .3s ease-in-out;
  -webkit-tap-highlight-color: transparent;
  width: 27px;
  margin: 0
}

.c-basket > div > .close > .close2:hover {
  transform: rotate(180deg)
}

.c-basket > div > .no-items {
  box-sizing: border-box;
  padding: 0 14px;
  display: flex;
  flex-flow: column;
  height: 100%
}

.c-basket > div > .no-items > div {
  font-size: 14px;
  line-height: 21px;
  color: #1e1e1e
}

.c-basket > div > .no-items > div > span {
  color: #3f51b5;
  margin-right: 5px
}

.c-basket > div > .no-items > div > span:last-of-type {
  margin-right: 0
}

.c-basket > div > .no-items > div > span:hover {
  color: #4960df;
  cursor: pointer
}

.c-basket > div > .no-items > div > span:active {
  color: #32408f
}

.c-basket > div > .no-items > .image {
  width: 100%
}

.c-basket > div > .no-items > .image > img {
  width: 100%;
  height: 100%;
  -o-object-fit: scale-down;
  object-fit: scale-down
}

.c-basket > div > .no-items > .c-button {
  max-width: unset;
  margin-top: 10px
}

.c-basket > div > .no-items > .c-button > .caption {
  justify-content: center
}

.c-basket > div > .no-items > .c-button:hover > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-basket > div > .no-items > .c-button:hover > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-basket > div > .c-modal-window > .modal > .modal-content {
  width: 420px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > h3 {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > p {
  font-size: 14px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > div {
  display: flex;
  justify-content: space-between;
  padding-top: 10px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > div > .c-button {
  width: 167px;
  height: 46px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 600;
  max-width: unset
}

.c-basket > div > .c-modal-window > .modal > .modal-content > div > .c-button.normal {
  font-weight: 500
}

.c-basket > div > .products {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-width: 452px;
  width: 100%;
  margin-right: -15px;
  padding-right: 15px
}

.c-basket > div > .products::-webkit-scrollbar {
  width: 3px
}

.c-basket > div > .products::-webkit-scrollbar-track {
  background-color: #fff
}

.c-basket > div > .products::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.c-basket > div > .periods {
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-bottom: 20px
}

.c-basket > div > .periods > h1 {
  margin-top: 0;
  text-align: center
}

.c-basket > div > .periods > h1 > a {
  color: #3f51b5;
  text-decoration: underline
}

.c-basket > div > .periods > h1 > a:hover {
  color: #4960df
}

.c-basket > div > .periods > h1 > a:active {
  color: #32408f
}

@media screen and (max-width: 1328px) {
  .c-basket > div > .periods > h1 {
    font-size: 22px
  }
}

@media screen and (max-width: 800px) {
  .c-basket > div > .periods > h1 {
    font-size: 18px
  }
}

@media screen and (max-width: 383px) {
  .c-basket > div > .periods > h1 {
    font-size: 16px
  }
}

.c-basket > div > .periods > .items {
  display: flex;
  flex-flow: column;
  align-items: center
}

.c-basket > div > .periods > .c-checkbox > span > a {
  color: #3f51b5
}

.c-basket > div > .periods > .c-checkbox > span > a:hover {
  color: #4960df
}

.c-basket > div > .periods > .c-checkbox > span > a:active {
  color: #32408f
}

.c-basket > div > .content {
  max-width: 960px;
  width: 100%
}

.c-basket > div > .content > .products > .title {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #3f51b5;
  margin-bottom: 5px;
  margin-left: 4px
}

.c-basket > div > .content > p {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  margin: 0
}

.c-basket > div > .content > p > .count {
  color: #ff0089
}

.c-basket > div > .content > .top {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px
}

.c-basket > div > .content > .top > div {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: .045em;
  text-transform: uppercase;
  color: #3f51b5;
  display: flex;
  align-items: center
}

.c-basket > div > .content > .top > div:hover {
  cursor: pointer
}

.c-basket > div > .content > .top > div:last-of-type {
  color: #818ca9;
  display: flex;
  align-items: center
}

.c-basket > div > .content > .top > div:last-of-type:hover {
  color: #4960df
}

.c-basket > div > .content > .top > div:last-of-type:last-child:hover > .icon, .c-basket > div > .content > .top > div:last-of-type:last-child:hover > div > .icon {
  background-color: #4960df
}

.c-basket > div > .content > .top > div:last-of-type:last-child:hover > div > .icon.trash-part1 {
  transform: rotate(45deg);
  top: -7px;
  left: 5px
}

.c-basket > div > .content > .top > div:last-of-type > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 80%;
  mask-size: 80%
}

.c-basket > div > .content > .top > div:last-of-type > div {
  position: relative;
  width: 28px;
  height: 28px;
  transform-style: preserve-3d
}

.c-basket > div > .content > .top > div:last-of-type > div > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  transition: all .3s ease-in-out;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  position: absolute
}

.c-basket > div > .content > .top > div:last-of-type > div > .icon.trash-part1 {
  top: -4px;
  left: 1px;
  width: 22px;
  -webkit-mask-size: 60% 25%;
  mask-size: 60% 25%
}

.c-basket > div > .content > .top > div:last-of-type > div > .icon.trash-part2 {
  -webkit-mask-size: 80%;
  mask-size: 80%;
  bottom: 0
}

.c-basket > div > .content > .top > div:active {
  color: #32408f
}

.c-basket > div > .content > .top > div:active > .icon, .c-basket > div > .content > .top > div:active > div > .icon {
  background-color: #32408f
}

.c-basket > div > .summary {
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-top: 0;
  padding-top: 6px;
  margin-left: auto;
  max-width: 380px
}

.c-basket > div > .summary > .total {
  display: flex;
  flex-flow: column;
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 20px;
  padding: 0 12px 0 0;
  top: 70px;
  position: sticky;
  order: 1
}

.c-basket > div > .summary > .total > .c-alert {
  padding: 10px 9px;
  margin-bottom: 10px;
  align-items: center;
  order: 2
}

.c-basket > div > .summary > .total > .c-alert.info {
  background-color: #f7f8fc
}

.c-basket > div > .summary > .total > .c-alert.info .desc {
  color: #1e1e1e
}

.c-basket > div > .summary > .total > .c-alert.info .desc > div {
  display: inline-block;
  margin-bottom: -7px
}

.c-basket > div > .summary > .total > .c-alert.info .desc > a {
  color: #3f51b5;
  margin-top: 2px
}

.c-basket > div > .summary > .total > .c-alert.info .desc > a:hover {
  color: #4960df
}

.c-basket > div > .summary > .total > .c-alert.info .desc > a:active {
  color: #32408f
}

.c-basket > div > .summary > .total > .c-alert.success {
  background-color: #ebfef8
}

.c-basket > div > .summary > .total > .c-alert.success .desc {
  color: #1e1e1e
}

.c-basket > div > .summary > .total > .c-alert.warning {
  margin-bottom: 0
}

.c-basket > div > .summary > .total > .c-alert.warning .desc {
  color: #ff7a00;
  font-size: 11px;
  line-height: 13px
}

.c-basket > div > .summary > .total > .c-alert.warning > .warning-alert {
  margin-left: -16px;
  margin-right: 14px
}

.c-basket > div > .summary > .total > .c-alert > .close-alert {
  margin-left: 0;
  margin-right: -10px
}

.c-basket > div > .summary > .total > p {
  margin: 0 0 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #1e1e1e
}

.c-basket > div > .summary > .total > .sales-terms {
  display: inline-block;
  margin-top: 10px;
  color: #1e1e1e;
  line-height: 17px;
  font-size: 13px
}

.c-basket > div > .summary > .total > .sales-terms > a {
  color: #3f51b5
}

.c-basket > div > .summary > .total > .sales-terms > a:hover {
  color: #4960df
}

.c-basket > div > .summary > .total > .sales-terms > a:active {
  color: #32408f
}

.c-basket > div > .summary > .total > .checkout {
  order: 1
}

.c-basket > div > .summary > .total > .checkout > .no-select-items {
  margin-top: 5px;
  text-align: center
}

.c-basket > div > .summary > .total > .electronic-check-banner {
  cursor: pointer;
  display: flex;
  max-width: 380px;
  width: 100%;
  order: 3;
  margin: auto
}

.c-basket > div > .summary > .total > .line {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
  align-items: baseline;
  padding: 4px 0;
  font-size: 15px
}

.c-basket > div > .summary > .total > .line:first-of-type {
  margin-top: 0
}

.c-basket > div > .summary > .total > .line:before {
  content: "";
  position: absolute;
  bottom: 8px;
  height: 1px;
  width: 100%;
  background-image: linear-gradient(90deg, #d6d6e1 40%, hsla(0, 0%, 100%, 0) 0);
  background-position: top;
  background-size: 6.1px 1px;
  background-repeat: repeat-x
}

.c-basket > div > .summary > .total > .line > span {
  color: #1e1e1e;
  background-color: #fff;
  z-index: 1;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center
}

.c-basket > div > .summary > .total > .line > span:first-of-type {
  padding-right: 5px
}

.c-basket > div > .summary > .total > .line > span:last-of-type {
  padding-left: 5px
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9;
  margin-left: 5px
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.c-basket > div > .summary > .total > .line.total-price > span {
  font-weight: 600;
  font-size: 22px;
  line-height: 27px
}

.c-basket > div > .summary > .total > .line.discount {
  color: #ff0089
}

.c-basket > div > .summary > .total > .line.discount.loyal {
  z-index: 3
}

.c-basket > div > .summary > .total > .line.discount > span {
  color: #ff0089
}

.c-basket > div > .summary > .total > .promocode {
  display: flex;
  margin-top: 5px;
  margin-bottom: 20px;
  order: 2;
  -webkit-tap-highlight-color: transparent
}

.c-basket > div > .summary > .total > .promocode > .c-promo-code > .opened > div > .c-button {
  max-width: 150px;
  margin: 0;
  height: 40px
}

.c-basket > div > .summary > .total > .c-alert.info > .icon {
  margin-right: 5px
}

.c-basket > div > .summary > .total > .c-alert.info > .message {
  max-width: calc(100% - 23px)
}

.c-basket > div > .summary > .total > .c-promo-code {
  order: 2
}

.c-basket > div > .summary > .total > .c-promo-code > .c-edit, .c-basket > div > .summary > .total > .c-promo-code > .c-edit > div > input {
  width: 100%
}

.c-basket > div > .summary > .total > .c-promo-code > .c-button {
  margin-top: 0
}

.c-basket > div > .summary > .total .c-button {
  margin-top: 10px;
  max-width: unset;
  height: 46px;
  font-size: 14px;
  line-height: 17px;
  -webkit-tap-highlight-color: transparent
}

.c-basket > div > .summary > .total .c-button > .caption {
  justify-content: center
}

.c-basket > div > .summary > .total .c-button > .caption > s {
  transition: color .3s ease-in-out;
  color: #596175;
  margin: 0 5px
}

.c-basket > div > .summary > .total .c-button.primary {
  font-size: 14px;
  line-height: 17px
}

.c-basket > div > .summary > .total .c-button.primary > .caption > .c-arrow-svg {
  margin-left: 12px
}

.c-basket > div > .summary > .total .c-button:hover > .caption > s {
  color: #fff
}

.c-basket > div > .summary > .total .c-button:hover > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-basket > div > .summary > .total .c-button:hover > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-basket > div > .summary > .total .c-button:active > .caption > s {
  color: #fff
}

.c-basket > div .c-alert {
  padding: 10px;
  align-items: center
}

.c-basket > div .c-alert .desc {
  font-size: 13.5px;
  line-height: 17px
}

.c-basket > div .c-alert.info {
  background-color: #f7f8fc
}

.c-basket > div .c-alert.info .desc {
  color: #1e1e1e
}

.c-basket > div .c-alert.info .desc > div {
  display: inline-block;
  margin-bottom: -7px
}

.c-basket > div .c-alert.info .desc > div > .free-ship {
  width: 26px;
  height: 26px;
  margin-top: -4px
}

.c-basket > div .c-alert.success {
  background-color: #ebfef8;
  padding-top: 18px;
  padding-bottom: 18px
}

.c-basket > div .c-alert.success .desc {
  color: #1e1e1e
}

.c-basket > div .c-alert.warning {
  margin-top: 8px
}

.c-basket > div .c-alert.warning .desc {
  color: #ff7a00
}

.c-basket > div .c-alert > .close-alert {
  margin: 0
}

.c-basket.mobile {
  width: 100%
}

.c-basket.mobile > div > .summary {
  z-index: 1
}

.c-basket.mobile > div > .summary > .total {
  margin-bottom: 10px
}

.c-basket.mobile > div > .summary > .total > .checkout {
  position: fixed;
  background-color: #fff;
  width: calc(100% - 20px);
  left: 0;
  padding: 5px 10px 60px;
  z-index: 3;
  transition: all .3s
}

.c-basket.mobile > div > .summary > .total > .checkout.hide {
  opacity: 0
}

.c-basket.mobile > div > .summary > .total > .checkout > .c-button {
  margin: 0
}

@media screen and (max-width: 1367px) {
  .c-basket > div > .summary {
    margin-left: 20px
  }
}

@media screen and (max-width: 960px) {
  .c-basket {
    z-index: 997
  }

  .c-basket > div {
    flex-flow: column
  }

  .c-basket > div > .summary {
    max-width: unset;
    margin: 0
  }

  .c-basket > div > .summary > .total > .promocode {
    align-self: center;
    margin-bottom: 10px
  }
}

@media screen and (max-width: 610px) {
  .c-basket > div .c-alert {
    padding: 10px 20px;
    margin: 8px -10px
  }

  .c-basket > div .c-alert .desc {
    font-size: 11px;
    line-height: 13px
  }

  .c-basket > div .c-alert:last-of-type {
    margin-top: 0
  }

  .c-basket > div .c-alert > .close-alert {
    margin-right: -15px
  }

  .c-basket > div > .content > .products, .c-basket > div > .content > .top {
    margin: 10px -8px
  }

  .c-basket > div > .content > .top {
    padding: 0 5px
  }

  .c-basket > div > .content > .products > .c-basket-product-card > .card {
    box-sizing: border-box;
    padding: 0 5px
  }

  .c-basket > div > .content > .products > .c-basket-product-card > .card.removed {
    padding-left: 0
  }

  .c-basket > div > .content > p {
    font-size: 18px;
    line-height: 22px
  }

  .c-basket > div > .content > .top > div {
    font-size: 10px;
    line-height: 13px
  }

  .c-basket > div > .summary > .promocode {
    margin: 10px 0
  }
}

@media screen and (max-width: 530px) {
  .c-basket > div > .close {
    left: -20px
  }
}

@media screen and (max-width: 510px) {
  .c-basket > div > .top {
    margin: 0;
    padding: 17px 10px;
    border-radius: 0 0 15px 15px;
    box-shadow: 1px 1px 10px rgba(12, 7, 38, .1);
    position: fixed;
    background-color: #fff;
    z-index: 100
  }

  .c-basket > div > .top > .remove {
    margin-right: 0;
    -webkit-tap-highlight-color: transparent
  }

  .c-basket > div > .top > .arrow-left {
    display: block
  }

  .c-basket > div > .top > p {
    font-size: 18px;
    line-height: 22px
  }

  .c-basket > div > .top.has-scroll > .remove {
    margin-right: 0
  }

  .c-basket > div > .no-items, .c-basket > div > .products {
    margin-top: 62px
  }

  .c-basket > div > .no-items {
    padding: 0 10px
  }

  .c-basket > div > .no-items > p {
    margin-top: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #1e1e1e
  }

  .c-basket > div > .summary {
    order: 1
  }

  .c-basket > div > .summary > .total {
    order: 3;
    padding: 0
  }

  .c-basket > div > .summary > .total > .c-alert {
    order: 1;
    padding: 10px 20px;
    margin: 10px -10px
  }

  .c-basket > div > .summary > .total > .c-alert.warning {
    order: 2
  }

  .c-basket > div > .summary > .total > .c-alert:last-of-type {
    margin-top: 0
  }

  .c-basket > div > .summary > .total > .c-alert > .close-alert {
    margin-right: -15px
  }

  .c-basket > div > .summary > .total > .line > span {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px
  }

  .c-basket > div > .summary > .total > .line.total-price > span {
    font-weight: 600;
    font-size: 22px;
    line-height: 27px
  }

  .c-basket > div > .summary > .total > .c-button.normal, .c-basket > div > .summary > .total > .c-button.primary {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px
  }

  .c-basket > div > .summary > .total > .promocode {
    align-self: unset
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons {
    display: flex;
    justify-content: space-between
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button {
    height: 48px;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    max-width: unset;
    -webkit-tap-highlight-color: transparent
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button:first-of-type {
    margin-right: 10px
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button > .caption {
    justify-content: center
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button > .caption > .c-arrow-svg {
    margin-left: 10px
  }

  .c-basket > div > .products {
    max-height: unset;
    overflow: unset
  }
}

@media screen and (max-width: 403px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 13px
  }
}

@media screen and (max-width: 378px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 12px
  }
}

@media screen and (max-width: 360px) {
  .c-basket > div > .top > p {
    font-size: 16px
  }

  .c-basket > div > .name-and-price {
    margin-right: 15px
  }

  .c-basket > div > .summary > .total > .line > span {
    font-size: 12px
  }

  .c-basket > div > .summary > .total > .line > span > .c-tooltip-icon > .icon > .question2 {
    -webkit-mask-size: 75%;
    mask-size: 75%
  }

  .c-basket > div > .summary > .total > .line.total-price > span {
    font-size: 19px
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button:first-of-type {
    margin-right: 10px
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button > .caption > .c-arrow-svg {
    margin-left: 0
  }
}

@media screen and (max-width: 353px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 11px
  }
}

@media screen and (max-width: 340px) {
  .c-basket > div > .summary > .total > .line > span {
    font-size: 13px;
    line-height: 16px
  }

  .c-basket > div > .summary > .total > .line.total-price > span {
    font-size: 20px;
    line-height: 25px
  }
}

@media screen and (max-width: 327px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 10px
  }
}
</style>