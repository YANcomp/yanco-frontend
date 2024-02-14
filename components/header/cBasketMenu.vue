<script lang="ts" setup>
const props = defineProps({
  isAllRankItems: {
    type: Boolean
  },
  hasFreeDelivery: {
    type: Boolean
  },
  isAllowDelivery: {
    type: Boolean
  },
  isDeniedDelivery: {
    type: Boolean
  },
  basketItems: {
    type: Array
  },
  hasPaidPeriod: {
    type: Boolean
  },
  city: {
    type: Object
  },
  hasPromoCode: {
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean
  },
  possiblePrices: {
    type: <any>Object
  },
  preparedCheckItems: {
    type: Object
  },
  totalPrice: {
    type: Number
  },
  isNoDeliveryRules: {
    type: Boolean
  },
  params: {
    type: Object
  }
})

const route = useRoute()
const isLoading = ref(false)
const loadingBasketOfferedProductsIDs = ref([])

const preparedProducts = computed(() => {
  return uPrepared(props.basketItems, ["isLoyal", "isRank", "route"])
})

const productTheMightNeed = computed(() => {
  //TODO
  // return favoritesStore.items ? favoritesStore.items : []
})

watch(
    () => props.basketItems,
    () => {
      isLoading.value = false
    }
)

function image(product: any) {
  return Object(uPrepareProduct)(product, SIZE_XS, props.params?.cdnURL.url).images[0]
}

function remove(item: any) {
  //TODO
  // var e;
  // if (this.isAuthorized) {
  //   this.isLoading = !0;
  //   var n = null !== (e = this.basketItems.find((function (i) {
  //     return i.productID === t
  //   }))) && void 0 !== e ? e : {};
  //   this.$emit("basket-item-update", {
  //     productID: n.productID,
  //     count: n.count,
  //     isRemoved: !0
  //   })
  // } else localStorage.setItem("basket", JSON.stringify(this.basketItems.filter((function (i) {
  //   return i.productID !== t
  // })))), this.$emit("basket-store-update", this.basketItems.filter((function (i) {
  //   return i.productID !== t
  // })))
}

function addToBasketPoductMightNeed() {
  //TODO
}
</script>

<template>
  <div class="c-basket-menu">
    <div>
      <div>
        <UiCSpinner v-if="isLoading" class="loading" size="m" position="absolute"/>
        <div class="products">
          <div v-for="(product, index) in preparedProducts" :key="index">
            <NuxtLink :to="product.route" data-tooltip="Перейти на страницу товара">
              <div class="image">
                <img :alt='product.images ? product.name : "Изображение отсутствует"' :src='image(product)'
                     :data-tooltip='product.images ? product.name : "Изображение отсутствует"' width="100%"
                     height="100%"/>
              </div>
              <span class="name">{{ product.name }}</span>
              <span class="prescription"></span>
              <div v-if="product.price" class="price">

                <template v-if="product.isLoyal">
                  <div>
                    <span>По акции</span>
                    <span class="loyal">{{ product.price.withCard + " ₽" }}</span>
                  </div>
                </template>
                <template v-if="product.isRank">
                  <div>
                    <span>Клубная цена</span>
                    <span>{{ product.price.withPeriod + " ₽" }}</span>
                  </div>
                </template>
                <div>
                  <span>Цена</span>
                  <span>{{ product.price.withoutCard + " ₽" }}</span>
                </div>

              </div>
              <span v-if='"basket" !== route.name' class="icon item-remove" data-tooltip="Удалить из корзины"
                    @click.prevent="remove(product.ID)"/>
              <span class="count">{{ product.count + " шт." }}</span>
            </NuxtLink>
            <!--            TODO -->
          </div>
        </div>
        <div class="total">
          <div class="line flex-horizontal-nowrap">
            <span>Стоимость заказа</span>
            <span>{{ possiblePrices.withoutCard + " ₽" }}</span>
          </div>
          <div v-if="totalPrice !== possiblePrices.withoutCard" class="line flex-horizontal-nowrap discount">
            <span>Экономия по вашей карте</span>
            <span>{{ possiblePrices.withoutCard - totalPrice + " ₽" }}</span>
          </div>
          <div v-if="hasFreeDelivery && isAllowDelivery && !isDeniedDelivery && !isNoDeliveryRules"
               class="line flex-horizontal-nowrap discount">
            <span>Доставка</span>
            <span>бесплатно</span>
          </div>
          <div class="line total-price flex-horizontal-nowrap">
            <span>Итого к оплате:</span>
            <span>{{ totalPrice + " ₽" }}</span>
          </div>
          <div class="buttons">
            <NuxtLink :to="{name:'checkout'}">
              <UiCButton mode="primary" size="xl">
                оформить заказ
                <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
              </UiCButton>
            </NuxtLink>
            <NuxtLink :to="{name:'basket'}">
              <UiCButton size="xl">
                в корзину
              </UiCButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-basket-menu {
  position: absolute;
  top: 40px;
  left: -465px;
  width: 530px;
  max-height: 360px;
  padding-top: 17px;
  filter: drop-shadow(3px 3px 15px rgba(0, 0, 0, .2))
}

.c-basket-menu:after, .c-basket-menu:before {
  display: block;
  content: "";
  position: absolute;
  top: 6px;
  left: 497px;
  transform: translateX(-50%);
  background: hsla(0, 0%, 100%, 0);
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #fff;
  border-style: solid;
  border-width: 0 12px 12px
}

.c-basket-menu:before {
  top: 4.5px
}

.c-basket-menu > div {
  background-color: #fff;
  border-radius: 5px
}

.c-basket-menu > div > div {
  display: flex;
  flex-flow: column;
  padding: 16px 10px 20px;
  position: relative
}

.c-basket-menu > div > div > .loading {
  left: 0;
  top: 0;
  border-radius: 5px
}

.c-basket-menu > div > div > .products {
  max-height: 300px;
  overflow-y: auto
}

.c-basket-menu > div > div > .products::-webkit-scrollbar {
  width: 3px
}

.c-basket-menu > div > div > .products::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.c-basket-menu > div > div > .products > div > a {
  display: flex;
  color: #1a1a1a;
  align-items: center;
  margin-top: 13px;
  padding: 5px 10px;
  position: relative;
  transition: all .2s ease-in-out
}

.c-basket-menu > div > div > .products > div > a:first-of-type {
  margin-top: 0
}

.c-basket-menu > div > div > .products > div > a > .icon:not(.prescription) {
  position: absolute;
  right: 9px;
  top: 9px;
  margin: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #818ca9;
  opacity: 0;
  transition: all .2s ease-in-out
}

.c-basket-menu > div > div > .products > div > a > .icon:not(.prescription):hover {
  background-color: #3f51b5
}

.c-basket-menu > div > div > .products > div > a > .prescription {
  width: 30px;
  height: 30px;
  margin-right: 10px
}

.c-basket-menu > div > div > .products > div > a > .count {
  background: #d6d6e1;
  border-radius: 10px;
  color: #1e1e1e;
  position: absolute;
  right: 14.5px;
  top: 37px;
  padding: 4.5px 5px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px
}

.c-basket-menu > div > div > .products > div > a > .image {
  margin-right: 10px;
  max-width: 80px;
  max-height: 80px;
  min-width: 80px
}

.c-basket-menu > div > div > .products > div > a > .image > img {
  max-height: 80px;
  max-width: 80px;
  min-height: 80px;
  display: block;
  margin: 0 auto
}

.c-basket-menu > div > div > .products > div > a > .name {
  max-width: 130px;
  max-height: 51px;
  width: 100%;
  font-weight: 500;
  line-height: 17px;
  margin-right: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden
}

.c-basket-menu > div > div > .products > div > a > .price {
  display: flex;
  max-width: 195px
}

.c-basket-menu > div > div > .products > div > a > .price > div {
  display: flex;
  flex-flow: column
}

.c-basket-menu > div > div > .products > div > a > .price > div:first-of-type {
  max-width: 90px;
  margin-right: 20px
}

.c-basket-menu > div > div > .products > div > a > .price > div:first-of-type > span:first-of-type {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 2px;
  width: 90px;
  height: 15px
}

.c-basket-menu > div > div > .products > div > a > .price > div:first-of-type > span:last-of-type {
  font-weight: 600;
  font-size: 19px;
  line-height: 27px;
  height: 26px
}

.c-basket-menu > div > div > .products > div > a > .price > div:first-of-type > span:last-of-type.loyal {
  background-color: #ff0089;
  border-radius: 5px;
  color: #fff;
  padding: 1px 6px;
  height: 24px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-basket-menu > div > div > .products > div > a > .price > div:first-of-type > div {
  font-weight: 500;
  font-size: 11px;
  line-height: 15px;
  margin-top: 8px;
  color: #ff0089
}

.c-basket-menu > div > div > .products > div > a > .price > div:last-of-type {
  max-width: 80px;
  min-width: 80px;
  position: relative;
  color: #596175
}

.c-basket-menu > div > div > .products > div > a > .price > div:last-of-type > span:first-of-type {
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 3px;
  height: 14px
}

.c-basket-menu > div > div > .products > div > a > .price > div:last-of-type > span:last-of-type {
  font-size: 19px;
  line-height: 27px;
  height: 26px
}

.c-basket-menu > div > div > .products > div > a > .price > div:last-of-type:before {
  display: block;
  content: "";
  position: absolute;
  height: 17px;
  width: 1px;
  background-color: #818ca9;
  left: -15px;
  top: 20px
}

.c-basket-menu > div > div > .products > div > a:hover {
  background-color: #ebf0f9
}

.c-basket-menu > div > div > .products > div > a:hover > .icon {
  opacity: 1
}

.c-basket-menu > div > div > .products > div > a:hover > .name {
  color: #3f51b5
}

.c-basket-menu > div > div > .products > div > a:last-of-type > a:last-of-type {
  margin-bottom: 0
}

.c-basket-menu > div > div > .total {
  display: flex;
  flex-flow: column;
  background-color: #fdf6ff;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: -20px;
  padding: 15px 20px 19px;
  border-radius: 0 0 5px 5px
}

.c-basket-menu > div > div > .total > .line {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
  align-items: baseline;
  padding: 4px 0;
  font-size: 15px;
  margin: 5.5px 0
}

.c-basket-menu > div > div > .total > .line:first-of-type {
  margin-top: 0
}

.c-basket-menu > div > div > .total > .line:before {
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

.c-basket-menu > div > div > .total > .line > span {
  color: #1e1e1e;
  background-color: #fdf6ff;
  z-index: 1;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center
}

.c-basket-menu > div > div > .total > .line > span:first-of-type {
  padding-right: 5px
}

.c-basket-menu > div > div > .total > .line > span:last-of-type {
  padding-left: 5px
}

.c-basket-menu > div > div > .total > .line.total-price > span {
  font-weight: 700;
  font-size: 24px;
  line-height: 29px
}

.c-basket-menu > div > div > .total > .line.discount > span, .c-basket-menu > div > div > .total > .line.discount {
  color: #ff0089
}

.c-basket-menu > div > div > .total > .total-price-info {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ff7a00;
  display: flex;
  align-items: center;
  margin: 5.5px 0
}

.c-basket-menu > div > div > .total > .total-price-info > .icon {
  margin-right: 8px;
  width: 19px;
  height: 19px
}

.c-basket-menu > div > div > .total > .buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 16px
}

.c-basket-menu > div > div > .total > .buttons > a {
  max-width: 238px;
  width: 100%
}

.c-basket-menu > div > div > .total > .buttons > a > :deep(.c-button) > .caption {
  justify-content: center
}

.c-basket-menu > div > div > .total > .buttons > a > :deep(.c-button) > .caption > .c-arrow-svg > div > span:first-of-type {
  margin-bottom: 1px
}

.c-basket-menu > div > div > .total > .buttons > a > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-basket-menu > div > div > .total > .buttons > a > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}
</style>