<script lang="ts" setup>
const props = defineProps({
  productID: {
    type: Number,
    required: true,
    default: undefined
  },
  productSlug: {
    type: String,
    required: true,
    default: undefined
  },
  needOpenReviews: {
    type: String
  },
  needScrollToInstruction: {
    type: String
  },
  needOpenSidebar: {
    type: String
  },
  itemCount: {
    type: String
  }
})
const route = useRoute()
const citiesStore = useCitiesStore()
const productsStore = useProductsStore()
const productPropertyTypesStore = useProductPropertyTypes()
const catalogStore = useCatalogStore()

const city = computed(() => {
  return citiesStore.currentCity
})

//async data
const currentCityID = city.value.ID! ? city.value.ID : 41

const L = "ProductReviews" === route.name
const x = !1
const F = !1
const N = !1
const z = !1
const G = L ? productsStore.item : undefined
const U = L && productsStore.replacements! ? productsStore.replacements : []
const H = L && productsStore.recommendations! ? productsStore.recommendations : []
const j = L && productsStore.reviews! ? productsStore.reviews : []
const Y = L && productsStore.trademarkProducts! ? productsStore.trademarkProducts : []
const W = productPropertyTypesStore.list
const V = restrictTypesStore.list! ? restrictTypesStore.list : []
const Z = !1
const X = []
const Q = 0
const J = L ? 2 : 0
const K = catalogStore.categoryDirectory
const tt = articlesStore.categories
const et = 10

if (void 0 === tt) { //TODO length
                     // TODO ARTICLES.GET_CATEGORIES
}

if (void 0 === G) {
  // PRODUCT.GET "ID="
}
//case 34:


//END async data
</script>

<template>
  <main class="v-product container">
    vProduct {{ props }}
  </main>
</template>

<style scoped>
.v-product {
  max-width: 1368px;
  min-height: -webkit-fit-content;
  min-height: -moz-fit-content;
  min-height: fit-content;
  width: 100%;
  padding: 0
}

.v-product > .viewed-products {
  margin-top: 30px
}

.v-product .question {
  margin-left: 5px;
  overflow: unset;
  white-space: unset
}

.v-product .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product .question > .c-tooltip-icon .icon > div {
  text-align: left
}

.v-product > .c-bottom-bar > .loading {
  top: 0;
  left: 0
}

.v-product > .c-bottom-bar.property-bar .bar {
  padding: 10px;
  max-width: unset
}

.v-product > .c-bottom-bar.property-bar .properties {
  overflow-y: auto;
  overflow-x: hidden
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list {
  margin-bottom: 10px;
  list-style: none;
  width: 100%
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property {
  display: flex;
  min-height: 30px;
  font-size: 12px;
  justify-content: space-between;
  position: relative
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property:not(:last-of-type) {
  margin-bottom: 10px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property:before {
  content: "";
  top: 20px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: -1;
  border-bottom: 1px dashed #e7e7ea
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .name {
  position: relative;
  flex-shrink: 0;
  padding-top: 4px;
  flex-basis: unset;
  margin-right: 15px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .name > span {
  color: #596175;
  background-color: #fff;
  padding-right: 5px;
  line-height: 20px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .name > a {
  display: inline-block;
  color: #3f51b5;
  cursor: pointer;
  background-color: #fff;
  padding-right: 5px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values {
  flex-grow: unset;
  text-align: right
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value {
  background: #fff;
  display: inline-flex;
  align-items: flex-end;
  margin: 2px 0
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question), .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a {
  padding: 2px 0 2px 8px;
  font-weight: 500;
  font-size: 12px;
  white-space: unset;
  text-overflow: unset;
  overflow: unset;
  text-align: right;
  max-width: 180px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question).search, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a.search {
  color: #3f51b5;
  cursor: pointer
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a.country {
  overflow: unset;
  white-space: unset
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country > span, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a.country > span {
  display: inline-flex;
  align-items: center
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question) > span, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a > span {
  background-color: #fff;
  padding-left: 5px;
  padding-bottom: 2px
}

.v-product > .c-bottom-bar.property-bar .properties > .alert {
  font-size: 13px
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-direction: column
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict:not(:last-of-type) {
  margin-right: 30px
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > .icon {
  position: absolute;
  background-color: unset;
  z-index: 1;
  width: 22px;
  height: 22px;
  bottom: 0;
  left: 24px;
  background-size: contain
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div {
  position: relative;
  border-radius: 50%;
  z-index: -1
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div.allow {
  background-color: #ebfef8
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div.carefully {
  background-color: #fff5eb
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div.deny {
  background-color: #fff6f7
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div > .restrict-icon {
  width: 40px;
  height: 40px;
  display: block;
  background-size: contain
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > .name {
  font-size: 13px;
  display: block;
  font-weight: 500;
  margin-left: 10px
}

.v-product > .c-bottom-bar.property-bar .properties > .alert {
  font-weight: 500
}

.v-product > .c-bottom-bar.property-bar .properties > .alert > .info2 {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain
}

.v-product > .c-bottom-bar.share-bar .bar {
  padding: 10px;
  max-width: unset
}

.v-product > .c-bottom-bar.share-bar .share-links {
  margin: 0;
  padding: 0;
  list-style: none;
  display: block
}

.v-product > .c-bottom-bar.share-bar .share-links > li {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 13px;
  color: #636363;
  transition: .2s
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon {
  height: 24px;
  min-width: 24px;
  margin-right: 5px;
  -webkit-mask-size: cover;
  mask-size: cover;
  transition: .2s
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.vk {
  background-color: #2787f5
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.facebook {
  background-color: #3b5998
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.ok {
  background-color: #f7931e
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.whatsapp {
  background-color: #25d366
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.telegram, .v-product > .c-bottom-bar.share-bar .share-links > li > .icon.twitter {
  background-color: #4ea4f6
}

.v-product > .c-bottom-bar.stock-bar.rare .bar {
  height: 100%
}

.v-product > .c-bottom-bar.stock-bar .bar {
  padding: 0;
  height: auto;
  max-width: unset
}

.v-product > .c-bottom-bar.stock-bar .bar > .top {
  padding: 10px 10px 0
}

.v-product > .c-bottom-bar.question-bar .charity-description > div {
  font-size: 13px
}

.v-product > .c-bottom-bar.question-bar .charity-description > a {
  display: flex;
  font-size: 13px;
  margin-bottom: 15px;
  color: #1a1a1a;
  justify-content: space-between
}

.v-product > .c-bottom-bar.question-bar .charity-description > a > div {
  text-align: left;
  width: 195px;
  margin-right: 15px
}

.v-product > .c-bottom-bar.question-bar .charity-description > a > img {
  width: 76px;
  height: 76px
}

.v-product > .c-bottom-bar.question-bar .charity-description > a:last-of-type {
  margin-bottom: unset;
  font-weight: 500;
  color: #3f51b5
}

.v-product > .c-bottom-bar.question-bar .bonuses > a {
  color: #3f51b5;
  font-size: 13px;
  margin-right: 5px
}

.v-product > .c-bottom-bar.question-bar .delivery > .orange {
  color: #ff7a00
}

.v-product > .c-bottom-bar.question-bar .with-period .link {
  color: #3f51b5
}

.v-product > .failed-getting {
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-product > .no-product-in-city {
  text-align: center;
  margin: 0 auto
}

.v-product > .no-product-in-city > span {
  color: #636363;
  font-size: 16px
}

.v-product > .no-product-in-city > p {
  font-size: 1.5em;
  font-weight: 500
}

.v-product > .header-fixed {
  background-color: #fff;
  z-index: 99;
  position: fixed;
  transition: max-height .4s ease-in-out;
  left: 0;
  height: auto;
  max-height: 0;
  box-sizing: border-box;
  width: 100%;
  top: 60px;
  box-shadow: 0 8px 10px rgba(12, 7, 38, .1);
  overflow: hidden
}

.v-product > .header-fixed.show {
  max-height: 110px
}

.v-product > .header-fixed.mobile {
  top: 0
}

.v-product > .header-fixed.mobile.show {
  max-height: 52px
}

.v-product > .header-fixed.need-padding {
  padding-right: 17px
}

.v-product > .header-fixed > .top {
  max-width: 1368px;
  min-height: -webkit-fit-content;
  min-height: -moz-fit-content;
  min-height: fit-content;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 5px 0;
  box-sizing: border-box;
  overflow: hidden
}

.v-product > .header-fixed > .top > .product-info, .v-product > .header-fixed > .top {
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .top > .product-info > img {
  max-width: 70px;
  max-height: 70px;
  margin-right: 15px
}

.v-product > .header-fixed > .top > .product-info > div {
  display: flex;
  flex-direction: column
}

.v-product > .header-fixed > .top > .product-info > div > .name {
  font-weight: 600;
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 840px
}

.v-product > .header-fixed > .top > .product-info > div > ul {
  padding: 0;
  display: flex;
  position: relative;
  flex-flow: row wrap;
  margin: 5px 0 0
}

.v-product > .header-fixed > .top > .product-info > div > ul > li {
  display: flex;
  position: relative;
  list-style: none;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  margin-right: 15px;
  flex-shrink: 0;
  margin-bottom: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.not-available {
  color: #818ca9;
  pointer-events: none
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .stock-count {
  color: #ff0089;
  margin-left: 3px
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .sell-remains {
  color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .icon.logo2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > a {
  display: flex;
  position: relative;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  flex-shrink: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > a > .review-count {
  color: #596175;
  font-weight: 500;
  margin: 0 3px
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > a > .icon {
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  width: 16px;
  height: 16px
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > .average {
  color: #1a1a1a
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > .icon:not(.logo2) {
  background-color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > .icon:not(.logo2).heart {
  background-color: #f14a4a
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > div:not(.c-rating) {
  color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > div:not(.c-rating) > .icon:not(.rate) {
  background-color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.disabled {
  pointer-events: none;
  opacity: .5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.disabled.favorites > .icon {
  opacity: 1
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.favorites > .icon.heart2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.favorites.active > .icon {
  background-color: #cc006e;
  transform: scale(1.2)
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison {
  position: relative
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison:hover > div:first-child > .icon {
  background-color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison > div:first-child {
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison > div:first-child > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison > div:first-child > .icon.add-compare {
  background-color: #ff0089
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison:active > div:first-child > .icon {
  background-color: #cc006e
}

.v-product > .header-fixed > .top > .prices {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: 436px;
  width: 100%;
  grid-column-gap: 1vw;
  -moz-column-gap: 1vw;
  column-gap: 1vw
}

.v-product > .header-fixed > .top > .prices > section {
  display: flex
}

.v-product > .header-fixed > .top > .prices > section > div {
  display: flex;
  flex-flow: column
}

.v-product > .header-fixed > .top > .prices > section > div > span:first-of-type {
  margin-bottom: 5px
}

.v-product > .header-fixed > .top > .prices > section > div:first-of-type {
  color: #1a1a1a;
  margin-right: 15px
}

.v-product > .header-fixed > .top > .prices > section > div.with-card {
  min-width: 90px
}

.v-product > .header-fixed > .top > .prices > section > div.with-card > span:first-of-type {
  font-size: 11px;
  font-weight: 500
}

.v-product > .header-fixed > .top > .prices > section > div.with-card > span:last-of-type {
  line-height: 25px;
  background-color: #ff0089;
  color: #fff;
  padding: 0 6px;
  border-radius: 5px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  font-weight: 600;
  font-size: 20px;
  height: 25px
}

.v-product > .header-fixed > .top > .prices > section > div.without-card {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content
}

.v-product > .header-fixed > .top > .prices > section > div.without-card > span:first-of-type {
  font-size: 11px;
  color: #596175;
  margin-left: 11px
}

.v-product > .header-fixed > .top > .prices > section > div.without-card > span:last-of-type {
  font-size: 20px;
  color: #818ca9;
  line-height: 25px
}

.v-product > .header-fixed > .top > .prices > section > div.with-period {
  min-width: 90px
}

.v-product > .header-fixed > .top > .prices > section > div.with-period > span:first-of-type {
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .top > .prices > section > div.with-period > span:last-of-type {
  font-weight: 600;
  font-size: 20px;
  line-height: 25px
}

.v-product > .header-fixed > .top > .prices > .c-button {
  width: 100%;
  max-width: none;
  height: 48px
}

.v-product > .header-fixed > .product-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px
}

.v-product > .header-fixed > .product-info > h2 {
  max-width: 75%;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0
}

.v-product > .header-fixed > .product-info > ul {
  margin: 0;
  padding: 0;
  display: flex;
  position: relative;
  flex-flow: row wrap
}

.v-product > .header-fixed > .product-info > ul > li {
  display: flex;
  position: relative;
  list-style: none;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  margin-right: 5px;
  flex-shrink: 0
}

.v-product > .header-fixed > .product-info > ul > li.not-available {
  color: #818ca9;
  pointer-events: none
}

.v-product > .header-fixed > .product-info > ul > li > .stock-count {
  color: #ff0089;
  margin-left: 3px
}

.v-product > .header-fixed > .product-info > ul > li > .review-count {
  color: #596175;
  font-weight: 500;
  margin: 0 3px
}

.v-product > .header-fixed > .product-info > ul > li > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .product-info > ul > li > .icon.logo2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.disabled {
  pointer-events: none;
  opacity: .5
}

.v-product > .header-fixed > .product-info > ul > li.disabled.favorites > .icon {
  opacity: 1
}

.v-product > .header-fixed > .product-info > ul > li.favorites > .icon.heart2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.favorites.active > .icon {
  background-color: #cc006e;
  transform: scale(1.2)
}

.v-product > .header-fixed > .product-info > ul > li.comparison {
  position: relative
}

.v-product > .header-fixed > .product-info > ul > li.comparison > div:first-child {
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .product-info > ul > li.comparison > div:first-child > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .product-info > ul > li.comparison > div:first-child > .icon.add-compare {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.comparison:active > div:first-child > .icon {
  background-color: #cc006e
}

.v-product > .header-fixed > .product-info > ul > li.share > .icon.share {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.share:active > .icon {
  background-color: #cc006e
}

.v-product > .header-fixed > .product-info > ul > li > .share-links {
  top: 32px;
  left: calc(50% - 61px);
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 2;
  width: 170px;
  background-color: #fff;
  list-style: none;
  display: none;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  -webkit-animation: closed .2s;
  animation: closed .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links.opened {
  display: block;
  -webkit-animation: opened .2s;
  animation: opened .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 13px;
  color: #636363;
  transition: .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li > .icon {
  height: 21px;
  min-width: 21px;
  margin-right: 5px;
  -webkit-mask-size: cover;
  mask-size: cover;
  background-color: #818ca9;
  transition: .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover {
  background-color: #f9f9f9;
  color: #3f51b5
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.vk, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.vk {
  background-color: #2787f5
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.facebook, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.facebook {
  background-color: #3b5998
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.ok, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.ok {
  background-color: #f7931e
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.whatsapp, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.whatsapp {
  background-color: #25d366
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.telegram, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.twitter, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.telegram, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.twitter {
  background-color: #4ea4f6
}

.v-product > .header {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.v-product > .header > h1 {
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
  margin-top: 5px;
  margin-bottom: 10px
}

.v-product > .header > span {
  font-size: 14px;
  color: #596175;
  flex-shrink: 0
}

.v-product > .action-list > ul {
  padding: 0;
  display: flex;
  position: relative;
  margin: 0 0 5px;
  flex-flow: row wrap
}

.v-product > .action-list > ul > li {
  position: relative;
  list-style: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  margin-right: 20px;
  margin-bottom: 10px
}

.v-product > .action-list > ul > li > a, .v-product > .action-list > ul > li {
  display: flex;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  flex-shrink: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .action-list > ul > li > a > .review-count {
  color: #596175;
  font-weight: 500;
  margin: 0 3px
}

.v-product > .action-list > ul > li > a > .icon {
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #1a1a1a
}

.v-product > .action-list > ul > li.not-available {
  color: #818ca9;
  pointer-events: none
}

.v-product > .action-list > ul > li > .stock-count {
  color: #ff0089;
  margin-left: 3px
}

.v-product > .action-list > ul > li > .sell-remains {
  color: #3f51b5
}

.v-product > .action-list > ul > li > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .action-list > ul > li > .icon.logo2 {
  background-color: #ff0089
}

.v-product > .action-list > ul > li:not(.rating):hover {
  color: #3f51b5
}

.v-product > .action-list > ul > li:not(.rating):hover > .average {
  color: #1a1a1a
}

.v-product > .action-list > ul > li:not(.rating):hover > .icon:not(.logo2) {
  background-color: #3f51b5
}

.v-product > .action-list > ul > li:not(.rating):hover > .icon:not(.logo2).heart {
  background-color: #f14a4a
}

.v-product > .action-list > ul > li:not(.rating):hover > div > .icon {
  background-color: #3f51b5
}

.v-product > .action-list > ul > li.disabled {
  pointer-events: none;
  opacity: .5
}

.v-product > .action-list > ul > li.disabled.favorites > .icon {
  opacity: 1
}

.v-product > .action-list > ul > li.favorites > .icon.heart2 {
  background-color: #ff0089
}

.v-product > .action-list > ul > li.favorites.active > .icon {
  background-color: #cc006e;
  transform: scale(1.2)
}

.v-product > .action-list > ul > li.comparison {
  position: relative
}

.v-product > .action-list > ul > li.comparison:hover > div:first-child > .icon {
  background-color: #3f51b5
}

.v-product > .action-list > ul > li.comparison > div:first-child {
  display: flex;
  align-items: center
}

.v-product > .action-list > ul > li.comparison > div:first-child > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .action-list > ul > li.comparison > div:first-child > .icon.add-compare {
  background-color: #ff0089
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared {
  position: absolute;
  top: -65px;
  z-index: 1;
  left: -40px;
  border-radius: 5px;
  background-color: #3f51b5;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared:after, .v-product > .action-list > ul > li.comparison > .disposable-hint-compared:before {
  content: "";
  display: block;
  position: absolute;
  left: 80px;
  bottom: -12px;
  background: hsla(0, 0%, 100%, 0);
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #3f51b5;
  border-style: solid;
  border-width: 0 15px 12px;
  transform: rotate(180deg)
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared > div {
  display: flex;
  position: relative;
  width: 190px;
  padding: 12px 15px;
  box-sizing: border-box
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared > div > .close2 {
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: #fff;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-product > .action-list > ul > li.comparison:active > div:first-child > .icon {
  background-color: #cc006e
}

.v-product > .action-list > ul > li.share:hover > .icon.share, .v-product > .action-list > ul > li.share > .icon.share {
  background-color: #ff0089
}

.v-product > .action-list > ul > li.share:active > .icon {
  background-color: #cc006e
}

.v-product > .action-list > ul > li > .share-links {
  top: 32px;
  left: calc(50% - 61px);
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 2;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  background-color: #fff;
  list-style: none;
  display: none;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  -webkit-animation: closed .2s;
  animation: closed .2s
}

.v-product > .action-list > ul > li > .share-links.opened {
  display: block;
  -webkit-animation: opened .2s;
  animation: opened .2s
}

.v-product > .action-list > ul > li > .share-links > li {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 13px;
  color: #636363;
  transition: .2s
}

.v-product > .action-list > ul > li > .share-links > li > .icon {
  height: 21px;
  width: 21px;
  margin-right: 5px;
  -webkit-mask-size: cover;
  mask-size: cover;
  background-color: #818ca9;
  transition: .2s
}

.v-product > .action-list > ul > li > .share-links > li:active, .v-product > .action-list > ul > li > .share-links > li:hover {
  background-color: #f9f9f9;
  color: #3f51b5
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.vk, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.vk {
  background-color: #2787f5
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.facebook, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.facebook {
  background-color: #3b5998
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.ok, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.ok {
  background-color: #f7931e
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.whatsapp, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.whatsapp {
  background-color: #25d366
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.telegram, .v-product > .action-list > ul > li > .share-links > li:active > .icon.twitter, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.telegram, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.twitter {
  background-color: #4ea4f6
}

.v-product > .product > .summary {
  display: flex;
  border-bottom: 1px solid #d6d6e1;
  padding-bottom: 20px
}

.v-product > .product > .summary > .images, .v-product > .product > .summary > .properties {
  display: flex;
  flex-direction: column
}

.v-product > .product > .summary > .images {
  min-width: 550px;
  max-width: 665px;
  width: 100%;
  margin-right: 20px
}

.v-product > .product > .summary > .images > .image-list {
  align-content: center;
  align-items: center;
  margin-bottom: 15px;
  position: relative
}

.v-product > .product > .summary > .images > .image-list > h1 {
  display: none
}

.v-product > .product > .summary > .images > .image-list > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative;
  margin-bottom: 5px
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > .icon {
  position: absolute;
  background-color: unset;
  z-index: 1;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  background-size: contain
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div {
  position: relative;
  border-radius: 50%;
  z-index: -1
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div.allow {
  background-color: #ebfef8
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div.carefully {
  background-color: #fff5eb
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div.deny {
  background-color: #fff6f7
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div > .restrict-icon {
  width: 40px;
  height: 40px;
  display: block;
  background-size: contain
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > .name {
  padding: 2px 8px;
  font-size: 13px;
  max-width: 300px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden
}

.v-product > .product > .summary > .images > .buy {
  width: 100%
}

.v-product > .product > .summary > .images > .buy > .discount-warning, .v-product > .product > .summary > .images > .buy > .not-available, .v-product > .product > .summary > .images > .buy > .on-order {
  background-color: #fff5eb;
  font-weight: 500;
  font-size: 13px;
  color: #ff7a00;
  display: flex;
  align-items: center;
  padding: 6px 0 6px 20px
}

.v-product > .product > .summary > .images > .buy > .discount-warning > .icon, .v-product > .product > .summary > .images > .buy > .not-available > .icon, .v-product > .product > .summary > .images > .buy > .on-order > .icon {
  margin-right: 5px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #ff7a00
}

.v-product > .product > .summary > .images > .buy > .discount-warning > .find-in-pharmacies-region, .v-product > .product > .summary > .images > .buy > .not-available > .find-in-pharmacies-region, .v-product > .product > .summary > .images > .buy > .on-order > .find-in-pharmacies-region {
  margin-left: 5px;
  text-decoration: underline
}

.v-product > .product > .summary > .images > .buy > .discount-warning > .find-in-pharmacies-region:hover, .v-product > .product > .summary > .images > .buy > .not-available > .find-in-pharmacies-region:hover, .v-product > .product > .summary > .images > .buy > .on-order > .find-in-pharmacies-region:hover {
  cursor: pointer;
  color: #4960df;
  transition: all .3s ease-in-out
}

.v-product > .product > .summary > .images > .buy > .discount-warning.not-available, .v-product > .product > .summary > .images > .buy > .discount-warning.on-order, .v-product > .product > .summary > .images > .buy > .not-available.not-available, .v-product > .product > .summary > .images > .buy > .not-available.on-order, .v-product > .product > .summary > .images > .buy > .on-order.not-available, .v-product > .product > .summary > .images > .buy > .on-order.on-order {
  flex-wrap: wrap
}

.v-product > .product > .summary > .images > .buy > .alert {
  font-weight: 500;
  font-size: 13px;
  padding: 6px 0 6px 21px
}

.v-product > .product > .summary > .images > .buy > .alert > .info2 {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain
}

.v-product > .product > .summary > .images > .buy > .not-available {
  background-color: #d6d6e1;
  color: #fff;
  margin-bottom: 10px
}

.v-product > .product > .summary > .images > .buy > .not-available > .icon {
  background-color: #fff
}

.v-product > .product > .summary > .images > .buy > .on-order {
  background-color: #ff7a00;
  color: #fff
}

.v-product > .product > .summary > .images > .buy > .on-order > .icon {
  background-color: #fff
}

.v-product > .product > .summary > .images > .buy > .on-order > .question .icon > .question2, .v-product > .product > .summary > .images > .buy > .on-order > .question .icon {
  width: 18px;
  height: 18px
}

.v-product > .product > .summary > .images > .buy > .details {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box
}

.v-product > .product > .summary > .images > .buy > .details.stock {
  background: linear-gradient(93.49deg, #fff7fa, #f2f5ff)
}

.v-product > .product > .summary > .images > .buy > .details.stock > .prices {
  border-bottom: unset;
  padding: 0 20px
}

.v-product > .product > .summary > .images > .buy > .details > .prices {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d6d6e1;
  padding: 0 20px 10px;
  margin-bottom: 15px;
  margin-top: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section {
  display: flex
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div {
  display: flex;
  flex-flow: column
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div:first-of-type {
  color: #1a1a1a;
  margin-right: 15px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-card {
  min-width: 150px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-card > span:first-of-type {
  font-size: 11px;
  font-weight: 500
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-card > span:last-of-type {
  line-height: 44px;
  background-color: #ff0089;
  color: #fff;
  padding: 0 6px;
  border-radius: 5px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  font-weight: 600;
  font-size: 36px;
  height: 44px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.without-card > span:first-of-type {
  font-size: 11px;
  color: #596175;
  margin-left: 21px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.without-card > span:last-of-type {
  font-size: 36px;
  color: #818ca9;
  line-height: 44px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period {
  min-width: 150px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type {
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:last-of-type {
  font-weight: 600;
  font-size: 36px;
  line-height: 44px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > .rare-product {
  display: flex;
  margin: auto;
  align-items: center;
  font-size: 16px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > .rare-product > .icon {
  background-color: #005e01;
  width: 50px;
  height: 50px;
  margin-right: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success, .v-product > .product > .summary > .images > .buy > .details > .limit {
  font-size: 14px;
  background-color: #fff6f7;
  border-top: 1px solid #ff324b;
  border-bottom: 1px solid #ff324b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px 0;
  margin: 10px 0
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success > .icon, .v-product > .product > .summary > .images > .buy > .details > .limit > .icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #ff324b
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success {
  background-color: #ebfef8;
  border-top: 1px solid #07d088;
  border-bottom: 1px solid #07d088
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success > .icon {
  width: 20px;
  height: 20px;
  background-color: #07d088
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions {
  margin: 0 0 15px;
  padding: 0;
  list-style: none
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li {
  padding: 5px 0;
  width: 100%;
  border-top: 1px solid #ff0089;
  border-bottom: 1px solid #ff0089;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ff0089;
  display: flex;
  align-items: center;
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li:not(:first-of-type) {
  margin-top: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a {
  display: flex;
  font-size: 12px;
  margin-bottom: 15px;
  color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a > div {
  text-align: left;
  width: 187px;
  margin-right: 15px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a > img {
  width: 76px;
  height: 76px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a:last-of-type {
  margin-bottom: unset;
  font-weight: 500;
  color: #3f51b5
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects {
  margin: 10px 0;
  padding: 0;
  list-style: none
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects > li {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid #3f51b5;
  border-top: 1px solid #3f51b5;
  padding: 5px 0
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects > li > a {
  color: #3f51b5;
  display: flex;
  align-items: center;
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects > li > a > img {
  width: 30px;
  height: 18px;
  margin-left: 5px;
  border-radius: 3px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes {
  display: flex;
  padding: 0 20px;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  grid-column-gap: 1vw;
  -moz-column-gap: 1vw;
  column-gap: 1vw;
  grid-row-gap: 1vh;
  row-gap: 1vh
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .c-button-in-category {
  width: 49%
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses {
  display: flex;
  background: linear-gradient(90deg, rgba(251, 236, 255, 0), #f7dbff);
  border-radius: 20px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  align-items: center;
  padding: 8px 8px 8px 0;
  font-weight: 500;
  font-size: 14px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > .icon {
  margin-right: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div {
  display: flex;
  flex-direction: column
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > a {
  font-weight: 500;
  font-size: 13px;
  color: #ff0089;
  line-height: 17px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text {
  display: flex
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .card {
  color: #ff0089;
  margin-right: 5px;
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .promotion-description > .orange {
  color: #ff7a00
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon a {
  margin-right: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe {
  display: flex;
  width: 242px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons {
  position: relative;
  margin-right: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .icon {
  width: 29px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .truck, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .truck, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .truck {
  margin-top: -5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .amount, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .amount, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .amount {
  color: #ff7a00;
  position: absolute;
  width: 29px;
  height: 26px;
  font-weight: 700;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1px;
  left: -1
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .logo2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .logo2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .logo2 {
  width: 24px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #ff0089
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text {
  display: flex;
  flex-direction: column
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon:hover, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon:hover, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon:hover > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon:hover > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .promotion-description > .orange, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .promotion-description > .orange, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .promotion-description > .orange {
  color: #ff7a00
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > .link-free-delivery, .v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > .stock, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > .link-free-delivery, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > .stock, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > .link-free-delivery, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > .stock {
  font-weight: 500;
  font-size: 13px;
  color: #ff0089;
  line-height: 17px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship {
  width: 280px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe {
  align-items: center
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .icon {
  width: 30px;
  height: 30px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .rare-product {
  display: flex;
  align-items: center;
  font-size: 16px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .rare-product > .icon {
  background-color: #005e01;
  width: 50px;
  height: 50px;
  margin-right: 10px
}

@media (max-width: 435px) {
  .v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship {
    width: 100%
  }
}

.v-product > .product > .summary > .images > .buy > .details > .payment {
  display: flex;
  padding: 0 20px;
  margin-top: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div {
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-size: 13px;
  color: #596175;
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div:not(:first-of-type) {
  border-left: 1px solid #d6d6e1
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div > span {
  line-height: 13px
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div > .icon {
  margin-right: 5px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order {
  padding: 0 20px
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > .c-button {
  width: 100%;
  height: 48px;
  max-width: unset
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > .c-button .caption {
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > .c-button .caption > .icon {
  margin-right: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order {
  padding: 0 20px;
  display: flex;
  grid-gap: 2%;
  gap: 2%
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .с-button-basket {
  width: 49%
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button {
  width: 49%;
  height: 48px;
  max-width: unset
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button:hover .thunder {
  background-color: #fff
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button .caption {
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button .thunder {
  transition: all .3s, color 0s, background .3s ease-in-out;
  background-color: #ff0089
}

.v-product > .product > .summary > .images > .buy > .details > .message {
  font-size: 12px;
  color: #818ca9;
  line-height: 16px;
  padding: 10px 20px
}

.v-product > .product > .summary > .properties {
  width: 100%;
  flex-direction: column-reverse;
  justify-content: flex-end
}

.v-product > .product > .summary > .properties > .property-list {
  margin-bottom: 5px;
  list-style: none;
  width: 100%
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property {
  display: flex;
  min-height: 30px;
  font-size: 14px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name {
  position: relative;
  flex-basis: 30%;
  flex-shrink: 0;
  padding-top: 4px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name:before {
  content: "";
  top: 20px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: -1;
  border-bottom: 1px dashed #e7e7ea
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name > span {
  color: #596175;
  background-color: #fff;
  padding-right: 5px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name > a {
  display: inline-block;
  color: #3f51b5;
  cursor: pointer;
  background-color: #fff;
  padding-right: 5px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values {
  flex-grow: 1
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .c-rating {
  margin-left: 10px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value {
  display: inline-flex;
  align-items: center;
  margin: 2px 4px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question), .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a {
  padding: 2px 8px;
  font-size: 14px;
  max-width: 320px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 500
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question).search, .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a.search {
  color: #3f51b5;
  cursor: pointer
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country, .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a.country {
  overflow: unset;
  white-space: unset
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country > span, .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a.country > span {
  display: flex;
  align-items: center
}

.v-product > .product > .summary > .properties > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-flow: row wrap
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict:not(:last-of-type) {
  margin-right: 30px
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > .icon {
  position: absolute;
  background-color: unset;
  z-index: 1;
  width: 26px;
  height: 26px;
  bottom: 0;
  right: 0
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div {
  position: relative;
  border-radius: 50%;
  z-index: -1
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div.allow {
  background-color: #ebfef8
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div.carefully {
  background-color: #fff5eb
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div.deny {
  background-color: #fff6f7
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div > .restrict-icon {
  width: 60px;
  height: 60px;
  display: block;
  background-size: contain
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > .name {
  padding: 2px 8px;
  font-size: 13px;
  max-width: 300px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden
}

.v-product > .product > .summary > .properties > .alert {
  font-weight: 500;
  margin-bottom: 7px
}

.v-product > .product > .summary > .properties > .alert > .info2 {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain
}

.v-product > .product > .summary > .properties > .all-property {
  border-bottom: 1px solid #d6d6e1;
  border-top: 1px solid #d6d6e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  cursor: pointer
}

.v-product > .product > .summary > .properties > .all-property > h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600
}

.v-product > .product > .summary > .properties > .all-property > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s;
  transform: rotate(90deg)
}

.v-product > .product > .summary > .properties > .all-property > .icon.opened {
  transform: rotate(270deg)
}

.v-product > .product > .summary > .properties > .replacements {
  padding-top: 10px;
  max-width: 664px;
  box-sizing: border-box;
  padding-bottom: 20px;
  border-bottom: 1px solid #d6d6e1;
  margin-bottom: 20px
}

.v-product > .product > .summary > .properties > .replacements .top > p {
  font-size: 26px;
  color: #ff0089;
  margin-bottom: 5px;
  line-height: 26px
}

.v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon {
  display: inline-block;
  color: #ff0089
}

.v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon > .replacement-additionally-title {
  line-height: 5px;
  display: inline-block;
  border-bottom: 1px solid #ff0089;
  height: unset;
  width: unset
}

.v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon > div > div > div > span {
  line-height: 18px;
  display: block;
  margin-bottom: 10px;
  font-size: 11px
}

.v-product > .product > .summary > .properties > .replacements .c-slider, .v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon > div > div > div > span:last-child {
  margin-bottom: 0
}

.v-product > .product > .summary > .properties > .replacements .c-slider .carousel {
  width: 100%
}

.v-product > .product > .recommendations {
  display: none
}

.v-product > .product > .recommendations .c-slider .carousel {
  width: 100%
}

.v-product > .product > .recommendations .c-slider .carousel > .list > .c-banner-card {
  min-width: 208px;
  margin-right: 10px
}

.v-product > .product > .recommendations .c-slider .carousel > .list > .c-banner-card.mobile {
  min-width: 166px
}

.v-product > .product > .details {
  display: flex
}

.v-product > .product > .details > .content, .v-product > .product > .details > aside {
  display: flex;
  flex-direction: column
}

.v-product > .product > .details > aside {
  margin-left: auto;
  flex-shrink: 0
}

.v-product > .product > .details > aside > .recommendations {
  max-width: 436px;
  box-sizing: border-box
}

.v-product > .product > .details > aside > .recommendations > h3 {
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: 600
}

.v-product > .product > .details > aside > .recommendations > div {
  display: flex;
  flex-flow: row wrap
}

.v-product > .product > .details > aside > .recommendations > div > {
  margin-right: 10px;
  margin-bottom: 15px
}

.v-product > .product > .details > aside > .articles {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0
}

.v-product > .product > .details > aside > .articles > h3 {
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: 600;
  font-size: 28px
}

.v-product > .product > .details > aside > .articles > a {
  display: flex;
  text-align: left;
  height: unset;
  flex-flow: column;
  width: 436px
}

.v-product > .product > .details > aside > .articles > a:not(:last-of-type) {
  margin-bottom: 30px
}

.v-product > .product > .details > aside > .articles > a:first-of-type {
  margin-left: 0
}

.v-product > .product > .details > aside > .articles > a > .image {
  display: flex;
  border-radius: 5px;
  flex-shrink: 0;
  background-size: cover;
  width: 100%;
  height: 190px;
  background-position: 50%
}

.v-product > .product > .details > aside > .articles > a > div {
  margin: 10px 0;
  flex-basis: 100%;
  flex-shrink: 1;
  overflow: hidden
}

.v-product > .product > .details > aside > .articles > a > div > span {
  font-weight: 600;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1a1a1a;
  max-width: 100%;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 20px
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info {
  display: flex;
  justify-content: space-between
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div {
  display: flex;
  align-items: center
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div > span {
  display: flex;
  color: #818ca9;
  align-items: center;
  margin-right: 10px;
  font-size: 12px
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div > span > .icon {
  width: 16px;
  height: 16px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  margin-bottom: 2px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #818ca9
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div > span > .icon.eye-open2 {
  width: 15px;
  height: 12px;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .product > .details > .content {
  max-width: 850px;
  width: 100%;
  margin-right: 10px
}

.v-product > .product > .details > .content > .trademark-products {
  border-bottom: 1px solid #d6d6e1
}

.v-product > .product > .details > .content > .trademark-products > h2 {
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product {
  display: flex;
  align-items: center;
  border: 1px solid #d6d6e1;
  border-radius: 5px;
  height: 106px;
  width: 270px;
  padding: 7px;
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product:not(:last-of-type) {
  margin-right: 18px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > img {
  max-height: 80px;
  max-width: 80px;
  margin-right: 15px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div {
  display: flex;
  flex-direction: column;
  margin-right: 25px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div > .name {
  height: 46px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #1a1a1a;
  line-height: 15px;
  font-size: 13px;
  font-weight: 500;
  word-break: break-word
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div > .country {
  color: #1a1a1a;
  line-height: 15px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 3px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div > .price {
  margin-top: 10px;
  color: #ff0089;
  font-weight: 500
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > .prescription {
  width: 30px;
  height: 30px;
  margin-right: 0;
  position: absolute;
  top: 5px;
  right: 5px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product.has-country > div > .price {
  margin-top: 0
}

.v-product > .product > .details > .content > .stock {
  border-bottom: 1px solid #d6d6e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  cursor: pointer
}

.v-product > .product > .details > .content > .stock > div {
  display: flex;
  align-items: center
}

.v-product > .product > .details > .content > .stock > div > h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .stock > div > .stock-count {
  color: #ff0089;
  margin-left: 10px;
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .stock > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s
}

.v-product > .product > .details > .content > .stock > .icon.opened {
  transform: rotate(180deg)
}

.v-product > .product > .details > .content > .description {
  border-bottom: 1px solid #d6d6e1
}

.v-product > .product > .details > .content > .description.hide > div {
  overflow: hidden;
  height: 0
}

.v-product > .product > .details > .content > .description > h2 {
  margin: 20px 0;
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .description > div > .tags {
  margin-bottom: 20px
}

.v-product > .product > .details > .content > .description > div > .tags > a {
  color: #3f51b5;
  cursor: pointer;
  font-weight: 500;
  margin: 0 20px 14px 0;
  display: inline-block;
  font-size: 15px
}

.v-product > .product > .details > .content > .description > div > .tags > a.selected {
  font-weight: 600
}

.v-product > .product > .details > .content > .description > div > ul {
  margin: 0;
  padding: 0;
  list-style: none
}

.v-product > .product > .details > .content > .description > div > ul > li {
  margin-bottom: 25px
}

.v-product > .product > .details > .content > .description > div > ul > li > h3 {
  font-weight: 600;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 15px
}

.v-product > .product > .details > .content > .description > div > ul > li > section {
  font-size: 17px;
  color: #1a1a1a;
  line-height: 24px
}

.v-product > .product > .details > .content > .description > div > ul > li > section > p {
  margin: 0
}

.v-product > .product > .details > .content > .description > div > ul > li > section > ol {
  margin: 0;
  padding: 0
}

.v-product > .product > .details > .content > .description > div > ul > li.literature > section > ol {
  margin: 0;
  padding-left: 16px
}

.v-product > .product > .details > .content > .description > div > ul > li.selected > h3 {
  font-weight: 700
}

.v-product > .product > .reviews {
  position: relative
}

.v-product > .product > .reviews > .c-spinner {
  top: 0
}

.v-product > .product > .reviews > h2 {
  font-weight: 600;
  font-size: 28px
}

.v-product > .product > .reviews > h2 > span > .count {
  color: #ff0089
}

.v-product > .product > .reviews > .reviews-link {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .065em;
  text-transform: uppercase;
  color: #3f51b5;
  margin: 20px 0;
  display: block
}

.v-product > .product > .without-reviews {
  box-sizing: border-box;
  background-color: #f0faff;
  font-size: 16px;
  max-width: 850px;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center
}

.v-product > .product > .without-reviews > .info2 {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain;
  margin-right: 10px
}

.v-product.mobile {
  padding: 0 10px
}

.v-product.mobile > .viewed-products {
  margin-top: 20px
}

.v-product.mobile > .action-list {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  margin-top: 10px;
  padding-bottom: 5px
}

.v-product.mobile > .action-list > ul {
  flex-flow: row nowrap;
  padding: 0
}

.v-product.mobile > .action-list > ul > li {
  margin-bottom: 0
}

.v-product.mobile > .product > .summary {
  flex-direction: column;
  border-bottom: none;
  padding-bottom: 0
}

.v-product.mobile > .product > .summary > .images {
  margin-right: unset;
  max-width: unset;
  min-width: unset;
  width: 100%;
  margin-bottom: 15px
}

.v-product.mobile > .product > .summary > .images > .image-list {
  align-items: unset;
  margin-bottom: unset
}

.v-product.mobile > .product > .summary > .images > .image-list > .c-zoom-image {
  width: 208px;
  height: 208px;
  margin: auto
}

.v-product.mobile > .product > .summary > .images > .image-list > .c-zoom-image img {
  max-width: 208px;
  max-height: 208px
}

.v-product.mobile > .product > .summary > .images > .image-list > h1 {
  display: block;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .image-list > .replacement-scroll-button {
  max-width: unset;
  height: 30px;
  border-radius: 20px;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a {
  display: flex;
  width: 100%;
  align-items: center;
  color: #1a1a1a
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .average {
  font-weight: 600;
  font-size: 14px;
  color: #3f51b5
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .icon {
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  width: 20px;
  height: 20px;
  background-color: #3f51b5
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .hover-bottom-line {
  color: #3f51b5
}

.v-product.mobile > .product > .summary > .images > .buy > .discount-warning {
  background-color: unset;
  font-weight: 500;
  font-size: 12px;
  color: #ff7a00;
  padding: 6px 0;
  border-top: 1px solid #d6d6e1;
  border-bottom: 1px solid #d6d6e1;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details .с-button-basket {
  max-width: 152px
}

.v-product.mobile > .product > .summary > .images > .buy > .details.stock {
  background: unset
}

.v-product.mobile > .product > .summary > .images > .buy > .details.stock > .prices {
  border-bottom: unset
}

.v-product.mobile > .product > .summary > .images > .buy > .details.stock > .prices > .c-button {
  margin-right: 15px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .rare-item-order {
  padding: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices {
  position: fixed;
  bottom: calc(50px + env(safe-area-inset-bottom));
  left: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  padding: 0;
  border-bottom: unset;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .1);
  margin-bottom: 0;
  transition: bottom .3s ease-in-out
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices.show-info-message {
  bottom: calc(85px + env(safe-area-inset-bottom))
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section {
  margin: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div {
  min-width: 76px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div:first-of-type {
  margin-right: 8px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div > span:first-of-type {
  font-size: 9px;
  line-height: 14px;
  margin-bottom: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div > span:last-of-type {
  font-size: 18px;
  height: 30px;
  line-height: 30px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.without-card > span:first-of-type {
  margin-left: 11px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.with-card > span:last-of-type {
  padding: 0 3px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon > .question2, .v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon {
  width: 14px;
  height: 14px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons {
  margin: 10px 10px 10px 0;
  max-width: 130px;
  height: 36px;
  width: 100%
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-button {
  max-width: 130px;
  height: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-button .icon {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  width: 20px;
  height: 20px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product {
  max-width: 130px;
  height: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product .quantity {
  border: unset;
  max-width: 130px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product .quantity > button {
  height: 36px;
  min-width: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product .quantity > .c-edit > div > input {
  height: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .discount-success, .v-product.mobile > .product > .summary > .images > .buy > .details > .limit {
  font-size: 12px;
  justify-content: unset;
  margin: 0 0 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .discount-descriptions {
  margin: 0 0 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .discount-descriptions > li {
  font-size: 12px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes {
  padding: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses + div, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .free-ship + div:not(.rare-product) {
  height: 61px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .delivery {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > .icon {
  width: 20px;
  height: 20px;
  background-size: contain
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text {
  font-size: 11px;
  line-height: 12px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .card {
  margin-left: 5px;
  color: #1a1a1a
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question {
  position: absolute;
  top: 5px;
  right: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > a {
  font-size: 11px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div {
  padding: 10px 30px 10px 10px;
  background: #f7f8fc;
  width: 49%;
  border-radius: 5px;
  flex-direction: row;
  position: relative;
  align-items: center;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  justify-content: flex-start;
  box-sizing: border-box
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .icons > .icon, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.recipe > .icons > .icon {
  width: 24px;
  height: 24px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .icons > .amount, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.recipe > .icons > .amount {
  width: 24px;
  height: 21px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.rare-product {
  display: flex;
  font-size: 11px;
  line-height: 12px;
  padding: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.rare-product > .icon {
  width: 24px;
  height: 24px;
  background-color: #005e01;
  margin-right: 5px
}

@media screen and (max-width: 385px) {
  .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .text > .link-free-delivery, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .text > span {
    font-size: 9px
  }
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > span {
  font-size: 11px;
  line-height: 12px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > span > .question {
  position: absolute;
  top: 5px;
  right: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > .link-free-delivery, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > .stock {
  font-size: 11px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment {
  padding: 0;
  justify-content: space-between
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div {
  flex-direction: column;
  flex-grow: unset
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.cash {
  margin-right: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div:not(.card) {
  flex-shrink: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.card {
  border-right: 1px solid #d6d6e1;
  max-width: 135px;
  width: 100%
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.qr {
  margin-left: 5px;
  border-left: none
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.offline {
  flex-direction: row;
  flex-shrink: unset;
  line-height: 16px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.offline > .icon {
  flex-shrink: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .fast-order {
  padding: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .fast-order .c-button {
  width: 100%
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .message {
  padding: 0;
  margin-top: 5px;
  font-size: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .on-order {
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .properties {
  flex-direction: column
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property {
  font-size: 12px;
  justify-content: space-between;
  position: relative
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property:before {
  content: "";
  top: 20px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: -1;
  border-bottom: 1px dashed #e7e7ea
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .name {
  flex-basis: unset;
  margin-right: 15px
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .name > span {
  line-height: 20px
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values {
  flex-grow: unset;
  text-align: right
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value {
  margin: 2px 0
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span {
  padding-right: 0;
  font-size: 12px;
  white-space: unset;
  text-overflow: unset;
  overflow: unset;
  text-align: right;
  max-width: 180px
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a.country, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span.country {
  overflow: unset;
  white-space: unset
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a.country > span, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span.country > span {
  display: flex;
  align-items: center
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a > span, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span > span {
  background-color: #fff
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span {
  background-color: #fff;
  padding-left: 5px
}

.v-product.mobile > .product > .summary > .properties > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-flow: row wrap
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict:not(:last-of-type) {
  margin-right: 25px
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict > .icon {
  width: 20px;
  height: 20px;
  background-size: contain
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict > div > .restrict-icon {
  width: 40px;
  height: 40px
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict > .name {
  padding: 2px 8px;
  font-size: 13px;
  max-width: 300px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden
}

.v-product.mobile > .product > .summary > .properties > .alert {
  font-weight: 500;
  font-size: 12px
}

.v-product.mobile > .product > .summary > .properties > .replacements {
  padding-top: 20;
  border-bottom: 1px solid #d6d6e1;
  padding-bottom: 0;
  margin: 0
}

.v-product.mobile > .product > .summary > .properties > .replacements .top > p {
  font-size: 20px
}

.v-product.mobile > .product > .summary > .properties > .replacements .top > p > .replacement-additionally-title {
  cursor: pointer;
  line-height: 5px;
  display: inline-block;
  border-bottom: 1px solid #ff0089
}

.v-product.mobile > .product > .summary > .properties > .replacements .c-slider {
  margin-bottom: 20px
}

.v-product.mobile > .product > .recommendations {
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .recommendations .top > p {
  font-size: 20px;
  margin-bottom: 10px
}

.v-product.mobile > .product > .details {
  border-top: none
}

.v-product.mobile > .product > .details > .content {
  margin-right: unset
}

.v-product.mobile > .product > .details > .content > .trademark-products {
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .details > .content > .trademark-products > h2 {
  font-size: 20px;
  font-weight: 600
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product {
  height: 96px;
  width: 250px;
  padding: 7px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product:not(:last-of-type) {
  margin-right: 12px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product > img {
  max-height: 60px;
  max-width: 60px;
  margin-right: 10px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product > div > .name {
  height: 47px;
  font-size: 12px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product > div > .price {
  font-size: 13px
}

.v-product.mobile > .product > .details > .content > .stock {
  padding: 20px 0
}

.v-product.mobile > .product > .details > .content > .stock > div > .stock-count, .v-product.mobile > .product > .details > .content > .stock > div > h2 {
  font-size: 20px
}

.v-product.mobile > .product > .details > .content > .stock > div > .stock-count {
  margin-left: 8px
}

.v-product.mobile > .product > .details > .content > .stock > .icon {
  transform: rotate(90deg)
}

.v-product.mobile > .product > .details > .content > .stock > .icon.opened {
  transform: rotate(270deg)
}

.v-product.mobile > .product > .details > .content > .description {
  border-bottom: none
}

.v-product.mobile > .product > .details > .content > .description.border {
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .details > .content > .description > h2 {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between
}

.v-product.mobile > .product > .details > .content > .description > h2 > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s;
  transform: rotate(90deg)
}

.v-product.mobile > .product > .details > .content > .description > h2 > .icon.opened {
  transform: rotate(270deg)
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > h3 {
  font-size: 18px
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > section {
  font-size: 14px;
  color: #1a1a1a;
  line-height: 25px
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > section > p {
  margin: 0
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > section > ol {
  margin: 0;
  padding: 0
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li.literature > section > p {
  font-size: 18px !important
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li.literature > section > div > div > p {
  font-size: 16px !important
}

.v-product.mobile > .product > .without-reviews {
  font-size: 14px;
  margin-top: 20px
}

.v-product.mobile > .product > .reviews {
  border-top: 1px solid #d6d6e1;
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .reviews > h2 {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px
}

.v-product.mobile > .product > .reviews > h2 > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s;
  transform: rotate(90deg)
}

.v-product.mobile > .product > .reviews > h2 > .icon.opened {
  transform: rotate(270deg)
}

@media screen and (max-width: 1367px) {
  .v-product {
    padding: 0 20px
  }

  .v-product .c-products-slider.mobile {
    padding: 0
  }

  .v-product > .header-fixed > .top {
    padding: 5px 20px
  }
}

@media screen and (max-width: 1100px) {
  .v-product > .product > .recommendations {
    display: block;
    margin-top: 15px
  }

  .v-product > .product > .recommendations .top > p {
    font-size: 26px;
    margin-bottom: 10px
  }

  .v-product > .product > .details > aside {
    display: none
  }
}

@media screen and (max-width: 510px) {
  .v-product.mobile > .product > .summary > .images > .buy > .details > .prices.show-info-message {
    bottom: calc(90px + env(safe-area-inset-bottom))
  }
}

</style>