<script lang="ts" setup>

const props = defineProps({
  basketItems: {
    type: Array
  },
  isAuthorized: {
    type: Boolean
  },
  isMobile: {
    type: Boolean
  },
  loadingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  params: {
    type: Object
  }
})

const favoritesStore = useFavoritesStore()
const router = useRouter()

const preparedProducts = computed(() => {
  return uPrepared(products.value, ["isLoyal", "isRank", "isInBasket", "route"])
})
const products = computed(() => {
  return favoritesStore.items ? favoritesStore.items : []
})

function addToBasket(item: any) {
  //TODO
}

function openBasket(item: any) {
  router.push({
    name: "basket"
  })
}

function image(p: any) {
  return Object(uPrepareProduct)(p, SIZE_XS, props.params?.cdnURL.url).images[0]
}
</script>

<template>
  <div class="c-favorites-menu">
    <div>
      <div>
        <div class="products">
          <NuxtLink v-for="(product, index) in preparedProducts" :key="index" :to='product.route'
                    data-tooltip="Перейти на страницу товара">
            <div class="image">
              <img :alt='product.images ? product.name : "Изображение отсутствует"' :src='image(product)'
                   :data-tooltip='product.images ? product.name : "Изображение отсутствует"' width="100%"
                   height="100%"/>
            </div>
            <span class="name">
              {{ product.name }}
            </span>
            <div v-if="product.price" class="price">
              <template v-if="product.isLoyal">
                <div>
                  <span>По акции</span>
                  <span class="loyal">
                      {{ product.price.withCard + " ₽" }}
                    </span>
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
            <div v-show="!product.isInBasket && product.isAvailable"
                 :class='["add-to-basket", { disabled: loadingBasketProductIDs.includes(product.ID) }]'
                 data-tooltip="Добавить в корзину" @click.prevent="addToBasket(product)">
              <span v-if="loadingBasketProductIDs.includes(product.ID)" class="icon spinner"/>
              <span v-else class="icon add-basket"/>
            </div>
            <div v-show="product.isInBasket && product.isAvailable" class="in-basket" data-tooltip="Перейти в корзину"
                 @click.prevent="openBasket">
              <span class="icon in-basket"/>
            </div>
          </NuxtLink>
        </div>
        <NuxtLink :to='{name:"favorites"}'>
          <UiCButton mode="primary" size="xl">
            в избранное
            <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
          </UiCButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-favorites-menu {
  position: absolute;
  top: 40px;
  left: -385px;
  width: 530px;
  max-height: 360px;
  padding-top: 17px;
  filter: drop-shadow(3px 3px 15px rgba(0, 0, 0, .2))
}

.c-favorites-menu:after, .c-favorites-menu:before {
  display: block;
  content: "";
  position: absolute;
  top: 6px;
  left: 417px;
  transform: translateX(-50%);
  background: hsla(0, 0%, 100%, 0);
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #fff;
  border-style: solid;
  border-width: 0 12px 12px
}

.c-favorites-menu:before {
  top: 4.5px
}

.c-favorites-menu > div {
  background-color: #fff;
  border-radius: 5px
}

.c-favorites-menu > div > div {
  display: flex;
  flex-flow: column;
  padding: 16px 10px 20px
}

.c-favorites-menu > div > div > a {
  margin: 20px auto 0;
  width: 304px
}

.c-favorites-menu > div > div > a > :deep(.c-button) > .caption {
  justify-content: center
}

.c-favorites-menu > div > div > a > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-favorites-menu > div > div > a > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-favorites-menu > div > div > .products {
  max-height: 300px;
  overflow-y: auto
}

.c-favorites-menu > div > div > .products::-webkit-scrollbar {
  width: 3px
}

.c-favorites-menu > div > div > .products::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.c-favorites-menu > div > div > .products > a {
  display: flex;
  color: #1a1a1a;
  align-items: center;
  margin-top: 13px;
  padding: 5px 10px;
  position: relative;
  transition: all .2s ease-in-out
}

.c-favorites-menu > div > div > .products > a:first-of-type {
  margin-top: 0
}

.c-favorites-menu > div > div > .products > a > .add-to-basket, .c-favorites-menu > div > div > .products > a > .in-basket {
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3f51b5;
  margin-left: 0;
  border: none;
  transition: all .3s ease-in-out
}

.c-favorites-menu > div > div > .products > a > .add-to-basket > .add-basket, .c-favorites-menu > div > div > .products > a > .in-basket > .add-basket {
  background-color: #fff;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-favorites-menu > div > div > .products > a > .add-to-basket > .spinner, .c-favorites-menu > div > div > .products > a > .in-basket > .spinner {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin: 0;
  background-color: #fff
}

.c-favorites-menu > div > div > .products > a > .add-to-basket:not(.disabled):hover {
  background-color: #4960df
}

.c-favorites-menu > div > div > .products > a > .add-to-basket:not(.disabled):active {
  background-color: #32408f
}

.c-favorites-menu > div > div > .products > a > .in-basket {
  background-color: #0ada8f
}

.c-favorites-menu > div > div > .products > a > .in-basket > .icon {
  background-color: #fff;
  margin: 0
}

.c-favorites-menu > div > div > .products > a > .in-basket:hover {
  background-color: #59ebb6
}

.c-favorites-menu > div > div > .products > a > .in-basket:active {
  background-color: #19be6b
}

.c-favorites-menu > div > div > .products > a > .image {
  margin-right: 10px;
  max-width: 80px;
  max-height: 80px;
  min-width: 80px
}

.c-favorites-menu > div > div > .products > a > .image > img {
  max-height: 80px;
  max-width: 80px;
  min-height: 80px;
  display: block;
  margin: 0 auto
}

.c-favorites-menu > div > div > .products > a > .name {
  max-width: 140px;
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

.c-favorites-menu > div > div > .products > a > .prescription {
  min-width: 30px;
  height: 30px;
  margin-right: 10px
}

.c-favorites-menu > div > div > .products > a > .price {
  display: flex;
  max-width: 195px
}

.c-favorites-menu > div > div > .products > a > .price > div {
  display: flex;
  flex-flow: column
}

.c-favorites-menu > div > div > .products > a > .price > div:first-of-type {
  max-width: 90px;
  margin-right: 20px
}

.c-favorites-menu > div > div > .products > a > .price > div:first-of-type > span:first-of-type {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 2px;
  width: 90px;
  height: 15px
}

.c-favorites-menu > div > div > .products > a > .price > div:first-of-type > span:last-of-type {
  font-weight: 600;
  font-size: 19px;
  line-height: 27px;
  height: 26px
}

.c-favorites-menu > div > div > .products > a > .price > div:first-of-type > span:last-of-type.loyal {
  background-color: #ff0089;
  border-radius: 5px;
  color: #fff;
  padding: 1px 6px;
  height: 24px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-favorites-menu > div > div > .products > a > .price > div:last-of-type {
  max-width: 80px;
  min-width: 80px;
  position: relative;
  color: #596175
}

.c-favorites-menu > div > div > .products > a > .price > div:last-of-type > span:first-of-type {
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 3px;
  height: 14px
}

.c-favorites-menu > div > div > .products > a > .price > div:last-of-type > span:last-of-type {
  font-size: 19px;
  line-height: 27px;
  height: 26px
}

.c-favorites-menu > div > div > .products > a > .price > div:last-of-type:before {
  display: block;
  content: "";
  position: absolute;
  height: 17px;
  width: 1px;
  background-color: #818ca9;
  left: -15px;
  top: 20px
}

.c-favorites-menu > div > div > .products > a:hover {
  background-color: #ebf0f9
}

.c-favorites-menu > div > div > .products > :deep(a:hover) > .icon {
  opacity: 1
}

.c-favorites-menu > div > div > .products > :deep(a:hover) > .name {
  color: #3f51b5
}

.c-favorites-menu > div > div > .products > a:last-of-type > a:last-of-type {
  margin-bottom: 0
}
</style>