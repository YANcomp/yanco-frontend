<script lang="ts" setup>
const props = defineProps({
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  loadingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  updatingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  basketItems: {
    type: Array
  },
  city: {
    type: Object
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  searchResult: {
    type: Object
  },
  routeParams: {
    type: Object
  },
  isAuthorized: {
    type: Boolean
  },
  isPageScrolled: {
    type: Boolean,
    default: false
  },
  advertisingLinks: {
    type: Array,
    default: function () {
      return []
    }
  },
  cdnUrl: {
    type: String
  }
})

const formSearchRef = ref(<any>{})
const searchRef = ref(<any>{})
const searchFieldRef = ref(<any>{})

const requestText = ref(<any>undefined)

const isOpened = computed(() => {
  //TODO
  // return this.isSearched || this.isFocus && this.isMobile
  return false
})
</script>
<template>
  <div :class='["c-search", { mobile: isMobile, opened: isOpened }]'>
    <form ref="formSearchRef" action="" @submit.prevent>
      <!--      TODO isFocus -->
      <div ref="searchRef" class="search" :class='["search", { focus: false }]'>
        <input v-model.trim="requestText" ref="searchFieldRef" id="search-field" type="search" autocomplete="off"
               placeholder="Я Ищу...">
        <button type="submit">
          <span class="icon search"/>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.c-search {
  flex-grow: 1
}

.c-search > form input[type=search] {
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important
}

.c-search > form input[type=search]::-webkit-search-cancel-button, .c-search > form input[type=search]::-webkit-search-decoration, .c-search > form input[type=search]::-webkit-search-results-button, .c-search > form input[type=search]::-webkit-search-results-decoration {
  display: none;
  -webkit-appearance: none
}

.c-search > form > .search-mobile, .c-search > form > .search {
  display: flex;
  margin-right: 20px;
  position: relative;
  overflow: hidden
}

.c-search > form > .search-mobile > .search-mobile, .c-search > form > .search > .search-mobile {
  display: none
}

.c-search > form > .search-mobile > .advertising-links, .c-search > form > .search > .advertising-links {
  position: absolute;
  display: flex;
  align-items: center;
  height: 40px;
  left: 70px;
  color: #818ca9;
  overflow: hidden;
  width: calc(100% - 160px);
  cursor: text
}

.c-search > form > .search-mobile > .advertising-links > a, .c-search > form > .search > .advertising-links > a {
  margin-left: 10px;
  color: #818ca9;
  position: relative;
  transition: all .3s ease-in-out
}

.c-search > form > .search-mobile > .advertising-links > a:first-of-type, .c-search > form > .search > .advertising-links > a:first-of-type {
  margin-left: 5px
}

.c-search > form > .search-mobile > .advertising-links > a:not(:last-of-type):after, .c-search > form > .search > .advertising-links > a:not(:last-of-type):after {
  content: ",";
  position: absolute
}

.c-search > form > .search-mobile > .advertising-links > a:before, .c-search > form > .search > .advertising-links > a:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 100%;
  background-image: linear-gradient(90deg, #c1c1c1 40%, hsla(0, 0%, 100%, 0) 0);
  background-position: top;
  background-size: 6.1px 1px;
  background-repeat: repeat-x;
  transition: all .3s ease-in-out
}

.c-search > form > .search-mobile > .advertising-links > a:hover, .c-search > form > .search > .advertising-links > a:hover {
  color: #4960df
}

.c-search > form > .search-mobile > .advertising-links > a:hover:before, .c-search > form > .search > .advertising-links > a:hover:before {
  background-image: linear-gradient(90deg, #4960df 40%, hsla(0, 0%, 100%, 0) 0)
}

.c-search > form > .search-mobile.focus > input, .c-search > form > .search.focus > input {
  border: 1px solid #3f51b5
}

.c-search > form > .search-mobile > input, .c-search > form > .search > input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  border: none;
  padding-left: 14px;
  padding-right: 72px;
  outline: none;
  transition: .2s;
  background: #ebf0f9 !important;
  border-radius: 5px 0 0 5px;
  box-sizing: border-box
}

.c-search > form > .search-mobile > .close, .c-search > form > .search > .close {
  position: absolute;
  cursor: pointer;
  min-width: 24px;
  top: 9px;
  right: 69px;
  background-color: #818ca9;
  z-index: 3
}

.c-search > form > .search-mobile > .close:hover, .c-search > form > .search > .close:hover {
  background-color: #3f51b5
}

.c-search > form > .search-mobile > .voice, .c-search > form > .search > .voice {
  position: absolute;
  cursor: pointer;
  min-width: 24px;
  top: 8px;
  right: 63px;
  background-color: #818ca9
}

.c-search > form > .search-mobile > .voice:hover, .c-search > form > .search > .voice:hover {
  background-color: #3f51b5
}

.c-search > form > .search-mobile > .voice.right, .c-search > form > .search > .voice.right {
  right: 96px
}

.c-search > form > .search-mobile > .voice.speaching, .c-search > form > .search > .voice.speaching {
  background-color: #f36363;
  -webkit-animation: speach .8s linear infinite;
  animation: speach .8s linear infinite
}

.c-search > form > .search-mobile > button, .c-search > form > .search > button {
  padding: 0 16px;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  background-color: #3f51b5;
  transition: .2s;
  color: #fff;
  border-radius: 0 5px 5px 0
}

.c-search > form > .search-mobile > button:hover, .c-search > form > .search > button:hover {
  background-color: #4960df
}

.c-search > form > .search-mobile > button:active, .c-search > form > .search > button:active {
  background-color: #32408f
}

.c-search > form > .search-mobile > button > .icon, .c-search > form > .search > button > .icon {
  background-color: #fff
}

.c-search > form > .result {
  top: 50px;
  left: 0;
  position: absolute;
  width: 100%;
  overflow: hidden;
  z-index: 999;
  transition: max-height .2s;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 0;
  background-color: #fff
}

.c-search > form > .result.opened {
  padding-top: 15px
}

.c-search > form > .result > .c-spinner {
  position: absolute !important
}

.c-search > form > .result > .history, .c-search > form > .result > .property-list {
  margin: 0 auto;
  width: 100%;
  max-width: 645px;
  padding-right: 59px;
  overflow: hidden;
  height: auto;
  max-height: 0;
  transition: max-height .2s;
  padding-bottom: 4px
}

.c-search > form > .result > .history.only, .c-search > form > .result > .property-list.only {
  margin-bottom: 20px
}

.c-search > form > .result > .history.hidden, .c-search > form > .result > .property-list.hidden {
  max-height: 0;
  margin-bottom: 0;
  padding-bottom: 0
}

.c-search > form > .result > .history > .header, .c-search > form > .result > .property-list > .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 4px 4px;
  overflow: hidden;
  height: auto;
  max-height: 30px;
  transition: max-height .2s
}

.c-search > form > .result > .history > .header.hidden, .c-search > form > .result > .property-list > .header.hidden {
  max-height: 0;
  padding: 0
}

.c-search > form > .result > .history > .header > .name, .c-search > form > .result > .property-list > .header > .name {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #1a1a1a
}

.c-search > form > .result > .history > .header > .clear, .c-search > form > .result > .property-list > .header > .clear {
  font-size: 14px;
  line-height: 17px;
  color: #818ca9;
  cursor: pointer
}

.c-search > form > .result > .history > .category, .c-search > form > .result > .history > .property, .c-search > form > .result > .property-list > .category, .c-search > form > .result > .property-list > .property {
  padding: 8px 8px 5px 4px;
  color: #1a1a1a;
  border-radius: 4px;
  cursor: pointer
}

.c-search > form > .result > .history > .category > a, .c-search > form > .result > .history > .property > a, .c-search > form > .result > .property-list > .category > a, .c-search > form > .result > .property-list > .property > a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #1a1a1a
}

.c-search > form > .result > .history > .category > a > div, .c-search > form > .result > .history > .property > a > div, .c-search > form > .result > .property-list > .category > a > div, .c-search > form > .result > .property-list > .property > a > div {
  display: flex;
  flex-direction: column
}

.c-search > form > .result > .history > .category > a > div > span, .c-search > form > .result > .history > .property > a > div > span, .c-search > form > .result > .property-list > .category > a > div > span, .c-search > form > .result > .property-list > .property > a > div > span {
  font-size: 14px;
  line-height: 17px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 580px
}

.c-search > form > .result > .history > .category > a > div > span.page, .c-search > form > .result > .history > .property > a > div > span.page, .c-search > form > .result > .property-list > .category > a > div > span.page, .c-search > form > .result > .property-list > .property > a > div > span.page {
  padding: 4px 9px;
  margin-top: 5px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #8e8e8e;
  border-radius: 10px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-search > form > .result > .history > .category > a > div > span.category, .c-search > form > .result > .history > .category > a > div > span.subtype, .c-search > form > .result > .history > .category > a > div > span.type, .c-search > form > .result > .history > .property > a > div > span.category, .c-search > form > .result > .history > .property > a > div > span.subtype, .c-search > form > .result > .history > .property > a > div > span.type, .c-search > form > .result > .property-list > .category > a > div > span.category, .c-search > form > .result > .property-list > .category > a > div > span.subtype, .c-search > form > .result > .property-list > .category > a > div > span.type, .c-search > form > .result > .property-list > .property > a > div > span.category, .c-search > form > .result > .property-list > .property > a > div > span.subtype, .c-search > form > .result > .property-list > .property > a > div > span.type {
  background: #e1ffe9;
  color: #3dcb5c
}

.c-search > form > .result > .history > .category > a > div > span.brand, .c-search > form > .result > .history > .category > a > div > span.proizvoditel, .c-search > form > .result > .history > .property > a > div > span.brand, .c-search > form > .result > .history > .property > a > div > span.proizvoditel, .c-search > form > .result > .property-list > .category > a > div > span.brand, .c-search > form > .result > .property-list > .category > a > div > span.proizvoditel, .c-search > form > .result > .property-list > .property > a > div > span.brand, .c-search > form > .result > .property-list > .property > a > div > span.proizvoditel {
  background: #f3eaff;
  color: #d330b9
}

.c-search > form > .result > .history > .category > a > div > span.nozologiya, .c-search > form > .result > .history > .property > a > div > span.nozologiya, .c-search > form > .result > .property-list > .category > a > div > span.nozologiya, .c-search > form > .result > .property-list > .property > a > div > span.nozologiya {
  background: #fff3e1;
  color: #d77605
}

.c-search > form > .result > .history > .category > a > div > span.deystvuyushchee_veshchestvo, .c-search > form > .result > .history > .property > a > div > span.deystvuyushchee_veshchestvo, .c-search > form > .result > .property-list > .category > a > div > span.deystvuyushchee_veshchestvo, .c-search > form > .result > .property-list > .property > a > div > span.deystvuyushchee_veshchestvo {
  background: #e1eaff;
  color: #7fa6ff
}

.c-search > form > .result > .history > .category.property, .c-search > form > .result > .history > .property.property, .c-search > form > .result > .property-list > .category.property, .c-search > form > .result > .property-list > .property.property {
  padding: 8px 8px 8px 11px
}

.c-search > form > .result > .history > .category.category, .c-search > form > .result > .history > .property.category, .c-search > form > .result > .property-list > .category.category, .c-search > form > .result > .property-list > .property.category {
  overflow: hidden;
  height: auto;
  max-height: none;
  transition: .2s;
  cursor: pointer
}

.c-search > form > .result > .history > .category.category.delete, .c-search > form > .result > .history > .property.category.delete, .c-search > form > .result > .property-list > .category.category.delete, .c-search > form > .result > .property-list > .property.category.delete {
  padding-top: 0;
  padding-bottom: 0;
  max-height: 0
}

.c-search > form > .result > .history > .category.category > a > div, .c-search > form > .result > .history > .property.category > a > div, .c-search > form > .result > .property-list > .category.category > a > div, .c-search > form > .result > .property-list > .property.category > a > div {
  flex-direction: row;
  align-items: center
}

.c-search > form > .result > .history > .category.category > a > div > .icon, .c-search > form > .result > .history > .property.category > a > div > .icon, .c-search > form > .result > .property-list > .category.category > a > div > .icon, .c-search > form > .result > .property-list > .property.category > a > div > .icon {
  min-width: 24px;
  background-color: #818ca9;
  cursor: pointer
}

.c-search > form > .result > .history > .category.item-selected, .c-search > form > .result > .history > .category:hover, .c-search > form > .result > .history > .property.item-selected, .c-search > form > .result > .history > .property:hover, .c-search > form > .result > .property-list > .category.item-selected, .c-search > form > .result > .property-list > .category:hover, .c-search > form > .result > .property-list > .property.item-selected, .c-search > form > .result > .property-list > .property:hover {
  background-color: #ebf0f9
}

.c-search > form > .result > .history > .category.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .history > .category:hover > a > .c-arrow-svg > div > span, .c-search > form > .result > .history > .property.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .history > .property:hover > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .category.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .category:hover > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .property.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .property:hover > a > .c-arrow-svg > div > span {
  background-color: #3f51b5
}

.c-search > form > .result > .history > .category.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .history > .category:hover > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .history > .property.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .history > .property:hover > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .category.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .category:hover > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .property.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .property:hover > a > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-search > form > .result > .history > .category.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .history > .category:hover > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .history > .property.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .history > .property:hover > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .category.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .category:hover > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .property.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .property:hover > a > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-search > form > .result > .history > .category > .icon, .c-search > form > .result > .history > .property > .icon, .c-search > form > .result > .property-list > .category > .icon, .c-search > form > .result > .property-list > .property > .icon {
  min-width: 24px
}

.c-search > form > .result > .product-list {
  width: 100%;
  max-width: 645px;
  padding-right: 59px;
  margin: 0 auto 15px;
  overflow: hidden;
  height: auto;
  max-height: 0;
  transition: max-height .2s
}

.c-search > form > .result > .product-list.hidden {
  max-height: 0;
  margin-bottom: 0
}

.c-search > form > .result > .product-list > .product {
  display: flex;
  max-width: inherit;
  width: 100%;
  padding: 10px 15px;
  color: #1a1a1a;
  border-radius: 4px;
  box-sizing: border-box;
  transition: .3s;
  align-items: center
}

.c-search > form > .result > .product-list > .product.item-selected, .c-search > form > .result > .product-list > .product:hover {
  background-color: #ebf0f9
}

.c-search > form > .result > .product-list > .product.item-selected > div > .description > .title > .name, .c-search > form > .result > .product-list > .product:hover > div > .description > .title > .name {
  color: #3f51b5
}

.c-search > form > .result > .product-list > .product.item-selected > div > .description > .title > .sticker, .c-search > form > .result > .product-list > .product:hover > div > .description > .title > .sticker {
  background-color: #f14a4a;
  color: #fff
}

.c-search > form > .result > .product-list > .product > a {
  display: flex;
  max-width: inherit;
  width: 100%;
  max-width: 517px;
  margin-right: 25px
}

.c-search > form > .result > .product-list > .product > a > .image {
  flex-basis: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  pointer-events: none
}

.c-search > form > .result > .product-list > .product > a > .image > img {
  max-height: 80px;
  max-width: 80px
}

.c-search > form > .result > .product-list > .product > a > .description {
  display: flex;
  margin-left: 10px;
  width: 100%
}

.c-search > form > .result > .product-list > .product > a > .description > .title {
  align-items: flex-start;
  width: 200px;
  margin-right: 0;
  align-self: center
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 5px;
  display: flex;
  align-items: center
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category > .text {
  padding: 5px 5px 5px 10px;
  display: block;
  line-height: 10px;
  background-color: #f7f8fc;
  border-radius: 20px 0 0 20px;
  color: #ff0089;
  font-weight: 500
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg {
  background-color: #ff0089;
  border-radius: 0 20px 20px 0;
  width: 20px;
  height: 20px
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon {
  width: 20px;
  height: 20px;
  min-width: 20px
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 1;
  transform: translateX(-4px)
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(2px)
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .name {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  max-height: 50px;
  overflow: hidden;
  color: #1a1a1a;
  display: block;
  width: inherit;
  word-wrap: break-word
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .sticker {
  border: 1px solid #f14a4a;
  color: #f14a4a;
  background-color: hsla(0, 0%, 100%, .8);
  font-weight: 500;
  font-size: 10px;
  padding: 0 12px;
  z-index: 1;
  transition: .3s;
  border-radius: 10px;
  margin-top: 10px
}

.c-search > form > .result > .product-list > .product > a > .description > .prescription {
  width: 30px;
  height: 30px;
  margin-right: 0;
  align-self: center
}

.c-search > form > .result > .product-list > .product > a > .description > .prices {
  min-width: 230px;
  display: flex;
  align-items: center;
  justify-content: flex-end
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div {
  display: flex;
  flex-direction: column
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.line {
  background-color: #818ca9;
  height: 17px;
  width: 1px;
  margin: 17px 14px 0 10px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.without-card {
  color: #596175;
  max-width: 95px;
  width: 100%
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span {
  font-size: 10px;
  line-height: 12px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span:last-of-type {
  font-size: 22px;
  line-height: 27px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card, .c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-period {
  color: #1a1a1a
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span, .c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span:last-of-type, .c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span:last-of-type {
  font-weight: 700;
  font-size: 22px;
  line-height: 27px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span:last-of-type {
  color: #fff;
  background-color: #ff0089;
  padding: 0 6px;
  border-radius: 5px
}

.c-search > form > .result > .product-list > .product > a > .description > .is-recipe {
  display: flex;
  font-size: 10px;
  align-items: center;
  color: #818ca9
}

.c-search > form > .result > .product-list > .product > .add-to-basket, .c-search > form > .result > .product-list > .product > .in-basket {
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3f51b5;
  margin-left: 20px;
  border: none;
  cursor: pointer
}

.c-search > form > .result > .product-list > .product > .add-to-basket > .add-basket2, .c-search > form > .result > .product-list > .product > .in-basket > .add-basket2 {
  background-color: #fff;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-search > form > .result > .product-list > .product > .add-to-basket > .spinner, .c-search > form > .result > .product-list > .product > .in-basket > .spinner {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin: 0;
  background-color: #fff
}

.c-search > form > .result > .product-list > .product > .add-to-basket:not(.disabled):hover {
  background-color: #4960df
}

.c-search > form > .result > .product-list > .product > .add-to-basket.rare {
  background-color: #005e01
}

.c-search > form > .result > .product-list > .product > .add-to-basket.rare:hover {
  background-color: green
}

.c-search > form > .result > .product-list > .product > .in-basket {
  background-color: #0ada8f
}

.c-search > form > .result > .product-list > .product > .in-basket > .icon {
  background-color: #fff;
  margin: 0
}

.c-search > form > .result > .product-list > .product > .in-basket:hover {
  background-color: #59ebb6
}

.c-search > form > .result > .product-list > .show-more {
  cursor: pointer;
  color: #3f51b5;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin-top: 15px;
  margin-bottom: 15px;
  letter-spacing: .065em;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  padding-left: 15px;
  align-items: center
}

.c-search > form > .result > .product-list > .show-more > .icon {
  width: 20px;
  height: 20px;
  background-color: #3f51b5
}

.c-search > form > .result > .product-list > .show-more:hover > .c-arrow-svg > div > span {
  background-color: #3f51b5
}

.c-search > form > .result > .product-list > .show-more:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-search > form > .result > .product-list > .show-more:hover > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-search > form > .result > .product-list > .show-more-mobile {
  display: flex
}

.c-search > form > .result > .product-list > .show-more-mobile > .c-button {
  max-width: 308px;
  margin: 20px auto;
  -webkit-tap-highlight-color: transparent
}

.c-search > form > .result > .not-found-products, .c-search > form > .result > .not-found {
  margin: auto;
  padding: 0 10px;
  max-width: 680px;
  width: 100%;
  box-sizing: border-box;
  height: auto;
  max-height: 0;
  transition: .2s;
  overflow: hidden
}

.c-search > form > .result > .not-found-products.show, .c-search > form > .result > .not-found.show {
  margin-bottom: 30px;
  max-height: 85px
}

.c-search > form > .result > .not-found-products > p, .c-search > form > .result > .not-found > p {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px
}

.c-search > form > .result > .not-found-products > div, .c-search > form > .result > .not-found > div {
  font-size: 14px;
  line-height: 21px;
  max-width: 430px
}

.c-search > form > .result > .not-found-products > div > a, .c-search > form > .result > .not-found > div > a {
  color: #3f51b5;
  display: inline-flex;
  font-weight: 600
}

.c-search > form > .overlay {
  height: calc(100vh - 84px);
  width: 100%;
  left: 0;
  position: absolute;
  transition: .2s;
  visibility: hidden;
  background-color: transparent
}

.c-search > form > .overlay.active {
  visibility: visible;
  background-color: rgba(0, 0, 0, .2)
}

.c-search.mobile.opened {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  display: flex;
  padding: 0
}

.c-search.mobile.opened > form {
  height: 100%;
  padding: 0 10px;
  overflow-x: hidden;
  flex-flow: column;
  align-items: center;
  position: relative;
  overflow-y: scroll
}

.c-search.mobile.opened > form > .search, .c-search.mobile.opened > form {
  width: -webkit-fill-available;
  width: -moz-available;
  background-color: #fff;
  display: flex
}

.c-search.mobile.opened > form > .search {
  position: fixed;
  justify-content: center;
  z-index: 2;
  padding: 10px
}

.c-search.mobile.opened > form > .search > .close {
  top: 17px;
  right: 15px
}

.c-search.mobile.opened > form > .search > .voice.right {
  top: 17px;
  right: 45px
}

.c-search.mobile.opened > form > .search > .search-mobile {
  top: 18px;
  left: 13px
}

.c-search.mobile.opened > form > .result {
  display: flex;
  flex-flow: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  max-width: 450px;
  width: 100%;
  margin-top: 50px;
  padding-bottom: 10px;
  height: unset;
  top: 0;
  min-height: 75vh;
  z-index: 1
}

.c-search.mobile.opened > form > .result > .c-spinner {
  height: 98%;
  width: 95%
}

.c-search.mobile.opened > form > .result > .history {
  height: unset;
  max-height: unset;
  padding-bottom: 0;
  transition: unset;
  overflow: hidden
}

.c-search.mobile.opened > form > .result > .history > .header {
  padding: 0;
  margin-bottom: 10px
}

.c-search.mobile.opened > form > .result > .history > .category {
  padding: 8px 0
}

.c-search.mobile > form > .search > input {
  padding-right: 70px
}

.c-search.mobile > form > .search > .voice {
  top: 7px;
  right: 7px
}

.c-search.mobile > form > .search > .voice.right {
  right: 35px
}

.c-search.mobile > form > .result {
  max-height: none;
  padding: 0 10px;
  box-sizing: border-box;
  height: 0
}

.c-search.mobile > form > .result > .history, .c-search.mobile > form > .result > .property-list {
  margin-bottom: 5px;
  padding-right: 0;
  max-height: none;
  overflow: visible;
  overflow: initial
}

.c-search.mobile > form > .result > .history > .category > a > div > span, .c-search.mobile > form > .result > .history > .property > a > div > span, .c-search.mobile > form > .result > .property-list > .category > a > div > span, .c-search.mobile > form > .result > .property-list > .property > a > div > span {
  font-size: 13px;
  line-height: 16px;
  max-width: 280px
}

.c-search.mobile > form > .result > .history > .category > a > div > span.page, .c-search.mobile > form > .result > .history > .property > a > div > span.page, .c-search.mobile > form > .result > .property-list > .category > a > div > span.page, .c-search.mobile > form > .result > .property-list > .property > a > div > span.page {
  font-size: 9px;
  line-height: 11px
}

.c-search.mobile > form > .result > .product-list {
  padding-left: 0;
  max-height: none;
  overflow: visible;
  overflow: initial;
  margin-bottom: 0;
  padding-right: 0
}

.c-search.mobile > form > .result > .product-list > .show-more-mobile > .c-button {
  margin-top: 10px;
  margin-bottom: 0;
  height: 40px
}

.c-search.mobile > form > .result > .product-list > .product {
  margin-bottom: 20px;
  padding: 0
}

.c-search.mobile > form > .result > .product-list > .product:hover {
  background-color: unset
}

.c-search.mobile > form > .result > .product-list > .product > .add-to-basket, .c-search.mobile > form > .result > .product-list > .product > .in-basket {
  margin: 0 5px;
  width: 35px;
  height: 35px;
  min-width: 35px
}

.c-search.mobile > form > .result > .product-list > .product > .add-to-basket > .icon, .c-search.mobile > form > .result > .product-list > .product > .in-basket > .icon {
  width: 22px;
  height: 22px;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-search.mobile > form > .result > .product-list > .product > a {
  margin-right: unset
}

.c-search.mobile > form > .result > .product-list > .product > a > .image {
  flex-basis: 90px;
  min-width: 90px;
  margin: auto
}

.c-search.mobile > form > .result > .product-list > .product > a > .image > img {
  max-height: 90px;
  max-width: 90px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description {
  flex-flow: column
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title {
  align-self: unset;
  margin-right: unset;
  width: 150px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .text {
  padding: 10px 3px 11px 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg {
  background-color: #ff0089;
  width: 18px;
  height: 36px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon {
  width: 18px;
  height: 36px;
  min-width: 18px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon:first-of-type {
  -webkit-mask-size: 60%;
  mask-size: 60%
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon:last-of-type {
  -webkit-mask-size: 45%;
  mask-size: 45%;
  margin-left: -22px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 0;
  transform: none
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:last-of-type {
  transform: none
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .name {
  font-size: 13px;
  line-height: 16px;
  color: #1a1a1a
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .sticker {
  font-size: 9px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices {
  flex-direction: row-reverse;
  justify-content: flex-end;
  min-width: 205px;
  margin-top: 10px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.line {
  margin: 11px 14px 0 10px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span {
  font-size: 9px;
  line-height: 11px;
  margin-bottom: 5px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span:last-of-type {
  font-size: 20px;
  line-height: 24px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-card, .c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-period {
  max-width: 95px;
  width: 100%
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span, .c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span {
  font-size: 9px;
  line-height: 11px;
  margin-bottom: 5px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span:last-of-type, .c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span:last-of-type {
  font-size: 20px;
  line-height: 24px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .not-available {
  font-size: 14px;
  margin: auto 0;
  color: #8e8e8e
}

.c-search.mobile > form > .result > .not-found-products, .c-search.mobile > form > .result > .not-found {
  height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  margin: auto;
  max-width: 320px
}

.c-search.mobile > form > .result > .not-found-products.show, .c-search.mobile > form > .result > .not-found.show {
  height: 100%;
  padding-bottom: 80px;
  max-height: none
}

.c-search.mobile > form > .result > .not-found-products > p, .c-search.mobile > form > .result > .not-found > p {
  font-size: 17px;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 10px
}

.c-search.mobile > form > .result > .not-found-products > div, .c-search.mobile > form > .result > .not-found > div {
  line-height: 20px
}

.c-search.mobile > form > .result > .not-found-products > div > div, .c-search.mobile > form > .result > .not-found > div > div {
  display: flex;
  margin-top: 32px
}

.c-search.mobile > form > .result > .not-found-products > div > div > .c-button, .c-search.mobile > form > .result > .not-found > div > div > .c-button {
  max-width: unset;
  -webkit-tap-highlight-color: transparent
}

.c-search.mobile > form > .result > .not-found-products {
  margin: unset
}

.c-search.mobile > form > .result > .not-found-products.show {
  margin: auto;
  padding-bottom: 10px
}

@-webkit-keyframes speach {
  50% {
    transform: scale(1.1)
  }

  to {
    transform: scale(1)
  }
}

@keyframes speach {
  50% {
    transform: scale(1.1)
  }

  to {
    transform: scale(1)
  }
}

@media screen and (max-width: 850px) {
  .c-search {
    padding: 0 10px
  }

  .c-search > form > .search {
    margin-right: 0
  }

  .c-search > form > .search.focus > input {
    padding-left: 15px
  }

  .c-search > form > .search > input {
    height: 38px;
    padding: 0 35px;
    background: #ebf0f9;
    border-radius: 5px;
    font-size: 13px
  }

  .c-search > form > .search > .close {
    top: 7px;
    right: 7px
  }

  .c-search > form > .search > .search-mobile {
    display: block;
    background-color: #3f51b5;
    position: absolute;
    min-width: 24px;
    top: 7px;
    left: 7px
  }

  .c-search > form > .search > button {
    display: none
  }

  .c-search > form > .search > .advertising-links {
    left: 90px
  }

  .c-search > form > .search > .voice {
    right: 10px
  }

  .c-search > form > .result.opened {
    top: 60px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 10px
  }

  .c-search > form > .result.opened > .product-list > .product > a > .image {
    align-items: flex-start
  }

  .c-search > form > .result.opened > .product-list > .product > .description {
    flex-flow: column;
    align-items: inherit
  }

  .c-search > form > .result.opened > .product-list > .product > .description > .title {
    font-size: 15px
  }

  .c-search > form > .result.opened > .product-list > .product > .description > .prices {
    margin-top: 7px
  }

  .c-search > form > .result.opened > .product-list > .product > .description > .prices > .with-period {
    font-size: 15px
  }
}

@media screen and (max-width: 550px) {
  .c-search > form > .result > .not-found {
    margin: auto
  }
}

@media screen and (max-width: 360px) {
  .c-search.mobile > form > .result > .product-list > .product > a > .image {
    flex-basis: 60px;
    min-width: 60px
  }

  .c-search.mobile > form > .result > .product-list > .product > a > .image > img {
    max-height: 60px;
    max-width: 60px
  }
}
</style>