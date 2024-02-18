<script lang="ts" setup>
const emit = defineEmits(["favorites-store-update", "add-to-favorites", "comparison-remove", "route", "basket-store-update", "add-to-basket", "basket-item-update"])
const props = defineProps({
  basketItems: {
    type: <any>Array
  },
  city: {
    type: Object
  },
  favoritesItems: {
    type: <any>Array
  },
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean
  },
  isBasket: {
    type: Boolean,
    default: false
  },
  isBasketLoading: {
    type: Boolean
  },
  isBasketUpdating: {
    type: Boolean
  },
  isFavoritesLoading: {
    type: Boolean
  },
  isNotAvailable: {
    type: Boolean,
    default: false
  },
  product: {
    type: <any>Object
  },
  productCategories: {
    type: Array,
    default: function () {
      return []
    }
  },
  productSubtypes: {
    type: Array,
    default: function () {
      return []
    }
  },
  productTypes: {
    type: Array,
    default: function () {
      return []
    }
  },
  size: {
    type: String
  },
  isProductOfTheDay: {
    type: Boolean,
    default: false
  },
  isChangeCounter: {
    type: Boolean,
    default: false
  },
  activeCatalogTypeID: {
    type: Number
  },
  isHorizontalMode: {
    type: Boolean,
    default: false
  },
  isAdditional: {
    type: Boolean,
    default: false
  },
  isWidthForPhone: {
    type: Boolean,
    default: false
  },
  isForComparison: {
    type: Boolean,
    default: false
  },
  noMicrodataNeeded: {
    type: Boolean,
    default: false
  },
  isInCategory: {
    type: Boolean,
    default: false
  },
  advertising: {
    type: Object
  }
})

const isProductFavoriteActive = ref(false)
const isMouseDown = ref(false)
const isMouseUp = ref(false)
const isFavoriteTouch = ref(false)

const appStore = useAppStore()
const catalogStore = useCatalogStore()
const notificationsStore = useNotificationsStore()
const router = useRouter()

const params = computed(() => {
  return appStore.params
})
const hasProduct = computed(() => {
  return props.product ? props.product.ID : undefined
})
const isLoyal = computed(() => {
  return void 0 !== (props.product ? props.product.price : undefined) && props.product?.price.withCard !== props.product?.price.withoutCard
})
const isRank = computed(() => {
  return void 0 !== props.product?.price && !isLoyal.value && props.product?.price?.withPeriod !== props.product?.price?.withoutCard
})
const image = computed(() => {
  return uPrepareProduct(props.product ? props.product : {}, SIZE_S, params.value.cdnURL.url).images[0]
})
const averageRating = computed(() => {
  return (props.product?.averageRating ? props.product.averageRating : 0).toFixed(1).replace(".", ",")
})
const productCategory: any = computed(() => {
  let t
  return null !== (t = props.productCategories.find((item: any) => {
    return item.ID === props.product?.categoryID
  })) && void 0 !== t ? t : {}
})
const categoryDirectory: any = computed(() => {
  return catalogStore.categoryDirectory
})
const categoryRoute = computed(() => {
  return void 0 === props.product ? {} : {
    name: "CatalogCategory",
    params: <any>{
      typeID: "" + categoryDirectory.value[props.product.categoryID].typeID,
      typeSlug: categoryDirectory.value[props.product.categoryID].typeSlug,
      subtypeID: "" + categoryDirectory.value[props.product.categoryID].subtypeID,
      subtypeSlug: categoryDirectory.value[props.product.categoryID].subtypeSlug,
      categoryID: "" + props.product?.categoryID,
      categorySlug: productCategory.value?.slug
    }
  }
  // return void 0 === props.product ? {} : {
  //   name: "SelectInCategory",
  //   params: {
  //     productID: "".concat(props.product?.ID)
  //   }
  // }
})
const isRecipe = computed(() => {
  return props.product?.isRecipe
})
const isCityAllowDelivery = computed(() => {/**/
  return props.city?.allowDelivery
})
const isShowIcon = computed(() => {
  return void 0 !== props.product?.deliveryRuleID && isCityAllowDelivery.value || !0 === props.product?.allowDelivery || isRecipe.value
})
const productRoute = computed(() => {
  return {
    name: "Product",
    params: {
      productID: "".concat(props.product?.ID),
      productSlug: "".concat(props.product?.slug)
    }
  }
})
const hasBonuses = computed(() => {
  return void 0 !== props.product?.bonuses
})
const isMobile = computed(() => {
  return appStore.isMobile || props.isWidthForPhone
})
const hasSticker = computed(() => {
  return void 0 !== props.product?.discountTemplate
})
const sticker = computed(() => {
  return hasSticker.value ? Object(uDiscountTemplate)[props.product?.discountTemplate] : undefined
})
const nuxtLinkBinds = computed(() => {
  var t = [];
  return props.isAdditional && t.push({
    event: ""
  }), t
})
const isInBasket = computed(() => {
  return props.basketItems?.some((i: any) => {
    return i.productID === props.product?.ID
  })
})
const isRare = computed(() => {
  return !!props.product?.isRare
})

const catalogTypeColors = computed(() => {
  return catalogStore.catalogColors
})

const categoryColors = computed(() => {
  return props.product?.isAvailable ? catalogTypeColors.value[props.activeCatalogTypeID ? props.activeCatalogTypeID : props.product.typeIDs[0]] : {
    background: "#d6d6e1",
    color: "#ffffff"
  }
})

//METHODS
function microdataBinds(t: any) {
  let e = <any>{}
  if (!props.noMicrodataNeeded) {
    if (t === "parent") {
      e.itemscope = "itemscope"
      e.itemtype = "https://schema.org/Offer"
    }
    if (t === "image") {
      e.itemprop = "image"
    }
    if (t === "url") {
      if (props.isAdditional) {
        e.event = ""
      }
      e.itemprop = "url"
    }
    if (t === "name") {
      e.itemprop = "name"
    }
  }
  return e
}

function favoriteTouchStart() {
  isFavoriteTouch.value = true
}

function favoriteTouchEnd() {
  isFavoriteTouch.value = false
}

function removeComparison() {
  emit("comparison-remove", props.product?.ID)
}

function route() {
  let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
  props.isChangeCounter && emit("route", "boolean" == typeof t ? {
    name: "ProductReviews",
    params: {
      ...productRoute.value.params,
      isShowReviews: true
    }
  } : productRoute.value)
}

function favoriteMouseDown() {
  isMouseDown.value = true
  isProductFavoriteActive.value = true
}

function favoriteMouseUp() {
  isMouseDown.value = false
  isMouseUp.value = true
  setTimeout(() => {
    isProductFavoriteActive.value = false
    isMouseUp.value = false
  }, 300)
}

function favoriteMouseOut() {
  isMouseDown.value && !isMouseUp.value && (isProductFavoriteActive.value = false)
}

function updateBasketItem(t: any) {
  emit("basket-item-update", t)
}

function updateBasketStore(t: any) {
  emit("basket-store-update", t)
}

function addToBasket() {
  if (isRare.value) goToProduct();
  else {
    let t = <any>props.product;
    if (props.isAdditional) emit("add-to-basket", t);
    else {
      let e = <any>{
        productID: t.ID,
        productSlug: t.slug,
        images: t.images,
        name: t.name,
        price: t.price,
        count: 1,
        isRemoved: false,
        isInStock: t.isInStock,
        allowDelivery: t.allowDelivery,
        allowOnlinePayment: t.allowOnlinePayment,
        discountID: t.discountID,
        isWithdrawn: t.isWithdrawn,
        limitWithCard: t.limitWithCard,
        limitWithoutCard: t.limitWithoutCard,
        deliveryDaysMax: t.deliveryDaysMax,
        isRecipe: t.isRecipe,
        isAvailable: t.isAvailable,
        deliveryAmount: t.deliveryAmount,
        discountTemplate: t.discountTemplate,
        mightNeedID: t.mightNeedID,
        imagesSizeXS: t.imagesSizeXS,
        imagesSizeS: t.imagesSizeS,
        isSelected: true,
        isSiteSellRemains: t.isSiteSellRemains,
        isWaitingArrive: t.isWaitingArrive,
        isOrderRcNoRc: t.isOrderRcNoRc
      };
      if (hasBonuses.value && !hasSticker.value && (e.bonuses = t.bonuses), void 0 !== t.sticker && (e.sticker = t.sticker), void 0 !== t.deliveryRuleID && (e.deliveryRuleID = t.deliveryRuleID), props.isAuthorized) {
        let o = {
          productID: t.ID,
          count: 1,
          isSelected: !0
        };
        emit("add-to-basket", props.isBasket ? e : o)
      } else {
        let r = props.basketItems.length > 0 ? [...props.basketItems] : [];
        r.push(e)
        isMobile.value || notificationsStore.NOTIFICATIONS_UPD({
          status: "basket",
          image: image.value
        })
        localStorage.setItem("basket", JSON.stringify(r))
        emit("basket-store-update", r)
      }
    }
  }
}

function addToFavorites() {
  var t;
  if (!props.isFavoritesLoading) {
    var e = props.product;
    if (props.isAdditional) emit("add-to-favorites", e);
    else if (props.isAuthorized) emit("add-to-favorites", e?.ID);
    else {
      var o = props.favoritesItems.length > 0 ? [...props.favoritesItems] : [];
      if (props.product?.isInFavorites) {
        var r = o.findIndex((t) => {
          return t.ID === e?.ID
        });
        o.splice(r, 1)
      } else {
        if (o.length >= params.value.maxCountFavorites) return void notificationsStore.NOTIFICATIONS_UPD({
          title: "Внимание!",
          desc: "В разделе «Избранное» добавлено максимальное количество товаров – ".concat(params.value.maxCountFavorites, " шт."),
          status: "warning"
        });
        isMobile.value || notificationsStore.NOTIFICATIONS_UPD({
          status: "favorites",
          image: image.value
        }), o.push(e)
      }
      localStorage.setItem("favorites", JSON.stringify(o))
      emit("favorites-store-update", o)
    }
  }
}

function goToProduct() {
  router.push({
    name: "Product",
    params: {
      productID: "".concat(props.product?.ID),
      productSlug: "".concat(props.product?.slug)
    }
  })
}
</script>

<template>
  <div v-bind="microdataBinds('parent')"
       :class='["c-product-card", { horizontal: isHorizontalMode, "not-available": !product?.isAvailable, "product-of-the-day": isProductOfTheDay, mobile: isMobile, "loading-content": !hasProduct, additional: isAdditional }]'>

    <div>
      <meta v-if="!noMicrodataNeeded" content="RUB" itemprop="priceCurrency"/>
      <div v-if="isProductOfTheDay" :class='["header", { placeholder: !hasProduct }]'>
        <span>Товар дня!</span>
      </div>
      <div class="body-card">
        <div :class='["image", {placeholder: !hasProduct}]' @mouseup.middle>
          <NuxtLink v-if="hasProduct" :to="productRoute" @click="route.apply(null, arguments)" v-bind="nuxtLinkBinds">
            <img :alt='product.images ? product.name : "Изображение отсутствует"'
                 :data-tooltip='product.images ? product.name : "Изображение отсутствует"' :src="image" width="100%"
                 height="100%" v-bind="microdataBinds('image')"/>
            <div v-if='hasSticker && void 0 !== sticker' :class='["sticker", { pair: 9 === sticker.ID}]'>
              <span v-if='sticker.needTextOnIcon && void 0 !== product.sticker'
                    :class='["icon-text", { "transform-text": sticker.transformText, small: product.sticker.length > 5 }]'>
                {{ product.sticker }}
              </span>
              <img :src='"https://pictures.apteka-april.ru/generic/stickers/"+sticker.icon' width="100%" height="100%"
                   alt=""/>
              <div v-if="!isMobile">
                <div :class='{ present: 12 === sticker.ID, action: 15 === sticker.ID }'>
                  <span v-if='[9, 10, 11, 14, 15].includes(sticker.ID) || !isMobile && sticker.title.length > 0'
                        :class='["title", { hidden: isMobile && 9 === sticker.ID }]'>
                    {{
                      [9, 10, 11, 14, 15].includes(sticker?.ID) ? product.sticker : [7, 8].includes(sticker?.ID) ? sticker.title + " " + product.sticker : sticker.title
                    }}
                  </span>
                  <span v-if="![10, 11, 12, 14, 15].includes(sticker.ID)">
                    {{ [1, 7, 8, 9].includes(sticker?.ID) ? sticker.text : product.sticker }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="hasSticker && void 0 !== sticker && !isMobile"
                 :class='["part-image", { pair: [9, 14].includes(sticker.ID) }]'
                 :data-tooltip='product.images ? product.name : "Изображение отсутствует"'/>
          </NuxtLink>
        </div>
        <div class="card-info">
          <template v-if="isHorizontalMode && isMobile">
            <div v-if="product.isAvailable" :class='["rating", { placeholder: !hasProduct }]'>
              <nuxt-link v-if="!isRecipe" :to='{}'
                         data-tooltip="Перейти к отзывам"
                         @click="route(true)">
                <span class="icon star"></span>
                <span class="average">{{ averageRating }}</span>
                <span class="review-count">({{ product.reviewsNumber || 0 }})</span>
              </nuxt-link>
            </div>
          </template>
          <template v-else>
            <div :class='["rating", { placeholder: !hasProduct }]'>
              <template v-if="hasProduct">
                <nuxt-link v-if="!isRecipe" :to='{}'
                           data-tooltip="Перейти к отзывам"
                           @click="route()">
                  <span class="icon star"></span>
                  <span class="average">{{ averageRating }}</span>
                  <span class="review-count">({{ product.reviewsNumber || 0 }})</span>
                </nuxt-link>
                <div
                    :class='{ delivery: product.allowDelivery, "free-delivery": product.deliveryRuleID && isCityAllowDelivery, prescription: isRecipe, placeholder: !hasProduct }'>
                  <template v-if="isRecipe">
                    <span class="icon prescription" data-tooltip="Отпускается по рецепту"/>
                  </template>
                  <template v-else-if="product.deliveryRuleID && isCityAllowDelivery">
                    <div class="free-ship"
                         :data-tooltip='"Бесплатная доставка от " + (product.deliveryAmount ? product.deliveryAmount + " шт." : "980 ₽")'>
                      <span class="icon free-ship"/>
                      <span v-if="product.deliveryAmount" class="amount">{{ product.deliveryAmount || "" }}</span>
                    </div>
                  </template>
                  <template v-else-if="product.allowDelivery">
                    <span class="icon truck" data-tooltip="Доставим на дом"/>
                  </template>
                </div>
              </template>
            </div>
          </template>

          <template v-if="!productCategory.name || isProductOfTheDay || isAdditional || isInCategory">
            <div v-if="!isProductOfTheDay && !hasProduct && !isAdditional" class="category placeholder"/>
          </template>
          <template v-else>
            <NuxtLink :to="categoryRoute" :class='["category", { hidden: isRare }]'
                      :style='{ backgroundColor: categoryColors.background, color: categoryColors.color }'>
              {{ productCategory.name }}
            </NuxtLink>
            <!--            <nuxt-link :to="categoryRoute" :class='["category", { hidden: isRare }]'>-->
            <!--              <span class="text">Выбрать в категории</span>-->
            <!--              <UiCArrowSVG color="#ffffff" hover-color="#ffffff" size="s"/>-->
            <!--            </nuxt-link>-->
          </template>

          <template v-if="hasProduct">
            <NuxtLink class="name" :to="productRoute" v-bind="microdataBinds('url')">
              <span :data-tooltip="product.name" v-bind="microdataBinds('name')">
                {{ product.name }}
              </span>
            </NuxtLink>
          </template>
          <template v-else>
            <div class="name placeholder"/>
          </template>

          <div class="footer-card">
            <div v-if="product.price !== undefined" class="prices">
              <meta v-if="isLoyal && !noMicrodataNeeded" :content='"По акции " + product.price.withCard + " ₽"'
                    itemprop="price"/>
              <meta v-if="isRank && !noMicrodataNeeded" :content='"Клубная цена " + product.price.withPeriod + " ₽"'
                    itemprop="price"/>
              <div v-if="isLoyal" class="loyal">
                <span>По акции</span>
                <span>{{ product.price.withCard + " ₽" }}</span>
              </div>
              <div v-if="isRank">
                <span>Клубная цена</span>
                <span>{{ product.price.withPeriod + " ₽" }}</span>
              </div>
              <div>
                <span>Цена</span>
                <span>{{ "| " + product.price.withoutCard + " ₽" }}</span>
              </div>
            </div>
            <div v-else-if="!hasProduct" class="prices placeholder"/>

            <div v-if="!isHorizontalMode || !isMobile"
                 :class='["button", { "no-price": void 0 === product.price, placeholder: !hasProduct }]'>
              <template v-if="!product.isAvailable && hasProduct">
                <UiCButton :size='isProductOfTheDay ? "l" : "m"' mode="disabled">
                  {{ product.isWaitingArrive ? "Ожидается" : "Временно отсутствует" }}
                </UiCButton>
              </template>

              <template v-if="product.isAvailable && isInBasket">
                cBasketProduct
              </template>
              <template v-else-if="product.isAvailable && product.isInStock">
                <UiCButton :size='isMobile ? "s" : isProductOfTheDay ? "l" : "m"' :is-loading="isBasketLoading"
                           :mode='isProductOfTheDay ? "gradient" : isRare ? "dark-green" : "primary"'
                           @click="addToBasket">
                  <span v-if="!isBasketLoading && !isMobile || !isRare" class="icon add-basket"/>
                  <span v-if="isRare" class="checkout">
                    Оформить заказ
                  </span>
                  <span v-else>
                    В корзину
                  </span>
                </UiCButton>
              </template>
              <template v-else-if="product.isAvailable && !isProductOfTheDay">
                <UiCButton :size='isMobile ? "s" : "m"' :is-loading="isBasketLoading"
                           :mode='isRare ? "dark-green" : "orange"' @click="addToBasket">
                  <span v-if="!isBasketLoading" class="icon under-the-order"/>
                  <span>Под заказ</span>
                </UiCButton>
              </template>

              <span v-if="isForComparison" class="icon trash2" data-tooltip="Удалить из сравнения"
                    @click="removeComparison"/>

              <span
                  v-else-if="!isProductOfTheDay && (product.isAvailable && !isMobile || !product.isAvailable && !isMobile || product.isAvailable && isMobile)"
                  :class='["icon", "favorite", { mobile: isMobile, touch: isFavoriteTouch, active: isProductFavoriteActive, heart2: product.isInFavorites || !product.isInFavorites && isFavoritesLoading, "heart-outline2": !product.isInFavorites || product.isInFavorites && isFavoritesLoading }]'
                  :data-tooltip='product.isInFavorites ? "Удалить из избранного" : "Добавить в избранное"'
                  @click="addToFavorites" @mousedown="favoriteMouseDown" @mouseup="favoriteMouseUp"
                  @mouseout="favoriteMouseOut" v-on:touchstart="favoriteTouchStart" v-on:touchend="favoriteTouchEnd"/>
            </div>
          </div>
        </div>

        <template v-if="isMobile && isHorizontalMode">
          <div :class='["button", { "no-price": void 0 === product.price, placeholder: !hasProduct }]'>
            <div
                :class='{ delivery: product.allowDelivery, "free-delivery": product.deliveryRuleID && isCityAllowDelivery, prescription: isRecipe }'>
              <template v-if="isRecipe">
                <span class="icon prescription" data-tooltip="Отпускается по рецепту"/>
              </template>
              <template v-else-if="product.deliveryRuleID && isCityAllowDelivery">
                <div class="free-ship"
                     :data-tooltip='"Бесплатная доставка от " + (product.deliveryAmount ? product.deliveryAmount + " шт." : "980 ₽")'>
                  <span class="icon free-ship"/>
                  <span v-if="product.deliveryAmount" class="amount">{{ product.deliveryAmount || "" }}</span>
                </div>
              </template>
              <template v-else-if="product.allowDelivery">
                <span class="icon truck" data-tooltip="Доставим на дом"/>
              </template>
            </div>
            <template v-if="product.isAvailable && product.isInBasket">
              cBasketProduct
            </template>
            <template v-else-if='isRare && product.isAvailable && product.isInStock'>
              <UiCButton size="s" mode="dark-green" @click="goToProduct">
                <span class="icon add-basket"/>
              </UiCButton>
            </template>
            <template v-else-if='isRare && product.isAvailable'>
              <UiCButton size="s" mode="dark-green" @click="goToProduct">
                <span class="icon under-the-order"/>
              </UiCButton>
            </template>
            <template v-else-if='product.isAvailable && product.isInStock'>
              <UiCButton :size='isMobile ? "s" : isProductOfTheDay ? "l" : "m"' :is-loading="isBasketLoading"
                         :mode='isProductOfTheDay ? "gradient" : "primary"' @click="addToBasket">
                <span v-if="!isBasketLoading" class="icon add-basket"/>
              </UiCButton>
            </template>
            <template v-else-if='product.isAvailable && !isProductOfTheDay'>
              <UiCButton :size='isMobile ? "s" : "m"' :is-loading="isBasketLoading" mode="orange" @click="addToBasket">
                <span v-if="!isBasketLoading" class="icon under-the-order"/>
              </UiCButton>
            </template>

            <span v-if="isForComparison" class="icon trash2" @click="removeComparison"/>
            <span
                v-if='!isProductOfTheDay && (product.isAvailable && !isMobile || !product.isAvailable && !isMobile || product.isAvailable && isMobile)'
                :class='["icon favorite", { mobile: isMobile, touch: isFavoriteTouch, active: isProductFavoriteActive, heart2: product.isInFavorites || !product.isInFavorites && isFavoritesLoading, "heart-outline2": !product.isInFavorites || product.isInFavorites && isFavoritesLoading }]'
                :data-tooltip='product.isInFavorites ? "Удалить из избранного" : "Добавить в избранное"'
                @click="addToFavorites" @mousedown="favoriteMouseDown" @mouseup="favoriteMouseUp"
                @mouseout="favoriteMouseOut" v-on:touchstart="favoriteTouchStart" v-on:touchend="favoriteTouchEnd"/>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<style scoped>
.c-product-card {
  height: 423px;
  width: 208px;
  background: #fff;
  border-radius: 5px;
  font-family: Montserrat, sans-serif;
  margin-right: 20px
}

.c-product-card.loading-content {
  background: none !important
}

.c-product-card.horizontal {
  height: 208px;
  width: 653px
}

.c-product-card.horizontal > div > .body-card {
  flex-flow: row
}

.c-product-card.horizontal > div > .body-card > .card-info {
  width: 100%;
  margin-left: 10px;
  justify-content: center
}

.c-product-card.horizontal > div > .body-card > .card-info > .rating > .c-rating {
  margin-bottom: 10px
}

.c-product-card.horizontal > div > .body-card > .card-info > .category, .c-product-card.horizontal > div > .body-card > .card-info > .name {
  max-width: 430px
}

.c-product-card.horizontal > div > .body-card > .card-info > .name {
  margin: 7px 0;
  height: 34px
}

.c-product-card.horizontal > div > .body-card > .card-info > .footer-card {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: unset
}

.c-product-card.horizontal > div > .body-card > .card-info > .footer-card > .prices {
  margin-right: 15px
}

.c-product-card.horizontal > div > .body-card > .card-info > .footer-card > .button > .c-button {
  min-width: 156px
}

.c-product-card.horizontal > div > .body-card > .card-info > .footer-card > .button > .icon {
  min-width: 25px
}

.c-product-card.horizontal.mobile {
  height: unset;
  width: 100%;
  max-width: 653px
}

.c-product-card.horizontal.mobile > div > .body-card {
  justify-content: center
}

.c-product-card.horizontal.mobile > div > .body-card > .image {
  width: 80px;
  height: 80px;
  max-height: 80px
}

.c-product-card.horizontal.mobile > div > .body-card > .image.placeholder {
  width: 100%;
  height: 100%;
  background: #ebf0f9
}

.c-product-card.horizontal.mobile > div > .body-card > .image > a {
  width: 80px;
  height: 80px
}

.c-product-card.horizontal.mobile > div > .body-card > .image > a > img {
  max-width: 80px;
  max-height: 80px
}

.c-product-card.horizontal.mobile > div > .body-card > .image > a > .sticker > .icon-text {
  width: 40px;
  height: 40px;
  font-size: 12px
}

.c-product-card.horizontal.mobile > div > .body-card > .image > a > .sticker > img {
  max-height: 40px;
  max-width: 40px;
  min-height: 40px;
  min-width: 40px
}

.c-product-card.horizontal.mobile > div > .body-card > .card-info {
  justify-content: unset;
  max-width: 300px
}

.c-product-card.horizontal.mobile > div > .body-card > .card-info > .category {
  max-width: 166px;
  margin-bottom: 3px
}

.c-product-card.horizontal.mobile > div > .body-card > .card-info > .name {
  height: unset;
  max-width: 300px;
  margin-top: 0
}

.c-product-card.horizontal.mobile > div > .body-card > .card-info > .footer-card > .prices {
  margin-right: unset
}

.c-product-card.horizontal.mobile > div > .body-card > .button {
  display: flex;
  align-items: center;
  margin-left: 10px;
  position: relative
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery > .free-ship {
  display: flex;
  position: relative
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery > .free-ship > .icon {
  background-color: #ff7a00
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery > .free-ship > .amount {
  color: #ff7a00;
  position: absolute;
  width: 28px;
  height: 29px;
  font-weight: 700;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .delivery, .c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery, .c-product-card.horizontal.mobile > div > .body-card > .button > .prescription {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .delivery > .free-ship > .icon, .c-product-card.horizontal.mobile > div > .body-card > .button > .delivery > .free-ship, .c-product-card.horizontal.mobile > div > .body-card > .button > .delivery > .icon, .c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery > .free-ship > .icon, .c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery > .free-ship, .c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery > .icon, .c-product-card.horizontal.mobile > div > .body-card > .button > .prescription > .free-ship > .icon, .c-product-card.horizontal.mobile > div > .body-card > .button > .prescription > .free-ship, .c-product-card.horizontal.mobile > div > .body-card > .button > .prescription > .icon {
  width: 24px;
  height: 24px
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .delivery > .free-ship > .amount, .c-product-card.horizontal.mobile > div > .body-card > .button > .free-delivery > .free-ship > .amount, .c-product-card.horizontal.mobile > div > .body-card > .button > .prescription > .free-ship > .amount {
  width: 22px;
  height: 22px
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .c-basket-product {
  width: 40px
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .c-basket-product .c-edit {
  padding: unset
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .c-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .c-button .icon {
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 20px;
  height: 20px
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .c-button .spinner {
  margin: unset;
  margin-right: unset
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .icon {
  margin-left: 10px;
  margin-right: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .icon.favorite {
  transition: .3s;
  background-color: #1e1e1e
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .icon.favorite:not(.mobile):hover {
  background-color: #fe60b5;
  cursor: pointer
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .icon.favorite.active {
  background-color: #cc006e;
  position: relative;
  transform: scale(1.2)
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .icon.favorite.heart2 {
  background-color: #ff0089
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .icon.favorite.touch {
  background-color: #fe60b5
}

.c-product-card.horizontal.mobile > div > .body-card > .button > .favorite {
  margin-left: 5px
}

.c-product-card > div {
  display: flex;
  flex-flow: column;
  height: 100%
}

.c-product-card > div .icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-product-card > div > .body-card {
  display: flex;
  flex-flow: column;
  height: 100%
}

.c-product-card > div > .body-card > .image {
  width: 208px;
  height: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  max-height: 208px
}

.c-product-card > div > .body-card > .image.placeholder {
  width: 100%;
  height: 100%;
  background: #ebf0f9
}

.c-product-card > div > .body-card > .image > a {
  width: 208px;
  height: 208px;
  text-align: center
}

.c-product-card > div > .body-card > .image > a > img {
  max-width: 208px;
  max-height: 208px
}

.c-product-card > div > .body-card > .image > a > .part-image {
  height: 64px;
  margin-left: 64px;
  width: calc(100% - 64px);
  background-color: transparent;
  position: absolute;
  bottom: 0;
  z-index: 0;
  left: 0
}

.c-product-card > div > .body-card > .image > a > .part-image.pair {
  margin-left: 84px;
  width: calc(100% - 84px)
}

.c-product-card > div > .body-card > .image > a > .sticker {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  left: 0;
  filter: drop-shadow(3px 3px 3px rgba(163, 21, 131, .1));
  overflow: hidden
}

.c-product-card > div > .body-card > .image > a > .sticker:hover {
  z-index: 1
}

.c-product-card > div > .body-card > .image > a > .sticker > .icon-text {
  position: absolute;
  z-index: 2;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center
}

.c-product-card > div > .body-card > .image > a > .sticker > .icon-text.small {
  font-size: 14px
}

.c-product-card > div > .body-card > .image > a > .sticker > .icon-text:hover ~ img {
  width: 208px;
  padding-right: 100%;
  max-width: unset
}

.c-product-card > div > .body-card > .image > a > .sticker > .icon-text:hover ~ div > div {
  opacity: 1;
  left: 4px
}

.c-product-card > div > .body-card > .image > a > .sticker > .transform-text {
  transform: rotate(-15deg)
}

.c-product-card > div > .body-card > .image > a > .sticker > div {
  width: 100%;
  background: transparent;
  position: absolute;
  left: 28px;
  height: 64px;
  overflow: hidden
}

.c-product-card > div > .body-card > .image > a > .sticker > div > div {
  transition: all .25s ease-in-out 0s;
  display: flex;
  flex-flow: column;
  width: 100%;
  background: #fff;
  opacity: 0;
  position: absolute;
  left: -20px;
  max-width: 134px;
  height: 64px;
  justify-content: center;
  padding-left: 45px;
  border-radius: 5px
}

.c-product-card > div > .body-card > .image > a > .sticker > div > div > span {
  padding-right: 10px;
  display: block
}

.c-product-card > div > .body-card > .image > a > .sticker > div > div > span.title {
  color: #ff0089;
  font-weight: 700
}

.c-product-card > div > .body-card > .image > a > .sticker > div > div > span:last-of-type {
  font-size: 10px;
  max-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 12px
}

.c-product-card > div > .body-card > .image > a > .sticker > div > div.action > span.title {
  font-size: 18px
}

.c-product-card > div > .body-card > .image > a > .sticker > div > div.present > span:last-of-type {
  font-size: 15px;
  line-height: 17px;
  max-height: 60px
}

.c-product-card > div > .body-card > .image > a > .sticker > img {
  min-height: 64px;
  min-width: 64px;
  max-height: 64px;
  max-width: 64px;
  align-self: center;
  z-index: 1
}

.c-product-card > div > .body-card > .image > a > .sticker > img:hover {
  width: 208px;
  padding-right: 100%;
  max-width: unset
}

.c-product-card > div > .body-card > .image > a > .sticker > img:hover ~ div > div {
  opacity: 1;
  left: 4px
}

.c-product-card > div > .body-card > .image > a > .sticker.pair > .icon-text {
  width: 84px
}

.c-product-card > div > .body-card > .image > a > .sticker.pair > img {
  min-width: 84px;
  max-width: 84px
}

.c-product-card > div > .body-card > .image > a > .sticker.pair > div {
  left: 45px
}

.c-product-card > div > .body-card > .image > a > .sticker.pair > div > div {
  max-width: 114px
}

.c-product-card > div > .body-card > .card-info {
  height: 100%;
  display: flex;
  flex-direction: column
}

.c-product-card > div > .body-card > .card-info > .category {
  background-color: #7fa6ff;
  border-radius: 10px;
  color: #fff;
  font-weight: 500;
  font-size: 10px;
  line-height: 12.19px;
  height: 10px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 5px 10px;
  max-width: 188px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden
}

.c-product-card > div > .body-card > .card-info > .category.placeholder {
  background: #ebf0f9;
  width: 100%;
  border-radius: 0
}

.c-product-card > div > .body-card > .card-info > .category.hidden {
  visibility: hidden
}

.c-product-card > div > .body-card > .card-info > .rating {
  display: flex;
  height: 17px;
  margin: 7px 0 10px;
  -webkit-tap-highlight-color: transparent;
  justify-content: space-between;
  align-items: center
}

.c-product-card > div > .body-card > .card-info > .rating > .delivery, .c-product-card > div > .body-card > .card-info > .rating > .free-delivery, .c-product-card > div > .body-card > .card-info > .rating > .prescription {
  margin-left: auto
}

.c-product-card > div > .body-card > .card-info > .rating > .free-delivery > .free-ship {
  display: flex;
  position: relative
}

.c-product-card > div > .body-card > .card-info > .rating > .free-delivery > .free-ship > .icon {
  background-color: #ff7a00
}

.c-product-card > div > .body-card > .card-info > .rating > .free-delivery > .free-ship > .amount {
  color: #ff7a00;
  position: absolute;
  width: 28px;
  height: 29px;
  font-weight: 700;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center
}

.c-product-card > div > .body-card > .card-info > .rating > .prescription {
  margin-left: auto
}

.c-product-card > div > .body-card > .card-info > .rating.placeholder {
  background: #ebf0f9;
  max-width: 90px
}

.c-product-card > div > .body-card > .card-info > .rating > a {
  display: flex;
  align-items: center
}

.c-product-card > div > .body-card > .card-info > .rating > a > span {
  line-height: 15.07px;
  font-size: 12px
}

.c-product-card > div > .body-card > .card-info > .rating > a > .star {
  width: 13px;
  height: 13px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #ffcf24
}

.c-product-card > div > .body-card > .card-info > .rating > a > .average {
  font-weight: 600;
  color: #1a1a1a
}

.c-product-card > div > .body-card > .card-info > .rating > a > .review-count {
  color: #818ca9;
  margin-left: 3px;
  font-weight: 500
}

.c-product-card > div > .body-card > .card-info > .name {
  height: 37px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: 600;
  line-height: 18.07px;
  font-size: 14px;
  margin: 10px 0;
  color: #1a1a1a;
  max-width: 208px
}

.c-product-card > div > .body-card > .card-info > .name.placeholder {
  background: #ebf0f9;
  width: 100%
}

.c-product-card > div > .body-card > .card-info > .footer-card {
  margin-top: auto
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices {
  display: flex;
  height: 40px
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices.placeholder {
  background-color: #ebf0f9;
  width: 100%
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div {
  display: flex;
  flex-flow: column
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div > span:first-of-type {
  font-size: 10px;
  line-height: 12.19px;
  height: 15px
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div > span:last-of-type {
  font-size: 22px;
  line-height: 26.82px;
  height: 22px
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div:first-of-type {
  color: #1a1a1a;
  width: 102px
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div:first-of-type > span {
  font-weight: 600
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div:last-of-type {
  color: #596175
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div:last-of-type > span:first-of-type {
  font-weight: 600;
  margin-left: 10px
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div:last-of-type > span:last-of-type {
  font-weight: 400
}

.c-product-card > div > .body-card > .card-info > .footer-card > .prices > div.loyal > span:last-of-type {
  background-color: #ff0089;
  color: #fff;
  padding: 2px 6px;
  border-radius: 5px;
  height: 24px;
  line-height: 26.82px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button {
  display: flex;
  align-items: center;
  margin-top: 10px
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button.no-price {
  margin-top: auto
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button.placeholder {
  background: #ebf0f9;
  width: 100%;
  height: 40px;
  margin-top: 10px
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > div.c-basket-product {
  padding: 0
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon {
  margin-left: 10px;
  margin-right: 0;
  width: 27px;
  height: 27px;
  cursor: pointer;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon.favorite {
  transition: .3s;
  background-color: #1e1e1e
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon.favorite:not(.mobile):hover {
  background-color: #fe60b5;
  cursor: pointer
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon.favorite.heart2 {
  background-color: #ff0089
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon.favorite.active {
  background-color: #cc006e;
  position: relative;
  transform: scale(1.2)
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon.favorite.touch {
  background-color: #fe60b5
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon.trash2 {
  width: 24px;
  height: 24px;
  -webkit-mask-size: 90%;
  mask-size: 90%;
  background-color: #818ca9;
  transition: all .3s ease-in-out
}

.c-product-card > div > .body-card > .card-info > .footer-card > .button > .icon.trash2:hover {
  background-color: #4960df
}

.c-product-card.product-of-the-day {
  height: 340px;
  box-shadow: 4px 4px 22px rgba(255, 0, 137, .2);
  margin: 0;
  max-width: 228px;
  width: 100%;
  transition: box-shadow .3s ease-in-out
}

.c-product-card.product-of-the-day:hover {
  box-shadow: 4px 4px 22px rgba(0, 43, 255, .2)
}

.c-product-card.product-of-the-day > div {
  padding: 10px 20px 20px;
  height: unset
}

.c-product-card.product-of-the-day > div > .header {
  display: flex;
  margin-bottom: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  justify-content: space-between
}

.c-product-card.product-of-the-day > div > .header.placeholder {
  width: 100%;
  background: #ebf0f9
}

.c-product-card.product-of-the-day > div > .header > span:first-of-type {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px
}

.c-product-card.product-of-the-day > div > .body-card > .image {
  width: 218px;
  height: 120px;
  align-self: center
}

.c-product-card.product-of-the-day > div > .body-card > .image.placeholder {
  width: 188px
}

.c-product-card.product-of-the-day > div > .body-card > .image > a {
  width: unset;
  height: unset
}

.c-product-card.product-of-the-day > div > .body-card > .image > a > img {
  max-width: 208px;
  max-height: 120px
}

.c-product-card.product-of-the-day > div > .body-card > .card-info {
  height: unset
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .name {
  margin: 0;
  line-height: 17.07px;
  height: 34px
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .rating {
  margin: 5px 0
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .footer-card {
  margin-top: 10px
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .footer-card > .prices {
  height: 40px
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .footer-card > .prices > div > span:first-of-type {
  width: 102px
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .footer-card > .prices > div > span:last-of-type {
  font-size: 20px
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .footer-card > .button {
  margin-top: 10px
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .footer-card > .button > div {
  padding: 12px 4px 12px 0;
  background: linear-gradient(90deg, #ff0089, rgba(255, 0, 137, 0)), #3f51b5
}

.c-product-card.product-of-the-day > div > .body-card > .card-info > .footer-card > .button > div.c-basket-product {
  padding: 0
}

.c-product-card.not-available > div > .body-card > .image > a {
  opacity: .5
}

.c-product-card.not-available > div > .body-card > .image > a.placeholder {
  opacity: 1
}

.c-product-card.not-available > div > .body-card > .card-info > .category {
  background-color: #d6d6e1;
  color: #fff
}

.c-product-card.not-available > div > .body-card > .card-info > .category.placeholder {
  background: #ebf0f9
}

.c-product-card.not-available > div > .body-card > .card-info > .delivery, .c-product-card.not-available > div > .body-card > .card-info > .free-delivery, .c-product-card.not-available > div > .body-card > .card-info > .name {
  color: #818ca9
}

.c-product-card.not-available > div > .body-card > .card-info > .delivery > .icon, .c-product-card.not-available > div > .body-card > .card-info > .free-delivery > .icon {
  background-color: #818ca9
}

.c-product-card.not-available > div > .body-card > .card-info > .footer-card > .prices > div > span {
  color: #818ca9
}

.c-product-card.not-available > div > .body-card > .card-info > .footer-card > .prices > div.loyal > span:last-of-type {
  background-color: #d6d6e1;
  color: #fff;
  padding: 0 10px;
  border-radius: 5px
}

.c-product-card.not-available > div > .body-card > .card-info > .footer-card > .button > span {
  opacity: .5
}

.c-product-card.mobile {
  width: 166px;
  height: 370px;
  margin-right: 10px;
  flex-shrink: 0
}

.c-product-card.mobile > div > .body-card > .image {
  width: 166px;
  max-height: 166px;
  -webkit-tap-highlight-color: transparent
}

.c-product-card.mobile > div > .body-card > .image > a {
  width: 166px;
  height: 166px
}

.c-product-card.mobile > div > .body-card > .image > a > img {
  max-width: 166px;
  max-height: 166px
}

.c-product-card.mobile > div > .body-card > .image > a > .part-image {
  height: 52px;
  margin-left: 52px;
  width: calc(100% - 60px);
  background-color: transparent;
  position: absolute;
  bottom: 3px;
  z-index: 0;
  left: 0
}

.c-product-card.mobile > div > .body-card > .image > a > .part-image.pair {
  margin-left: 72px;
  width: calc(100% - 80px)
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker {
  bottom: 3px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > .icon-text {
  width: 52px;
  height: 52px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > .icon-text.small {
  font-size: 12px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > div {
  width: calc(100% - 20px);
  height: 52px;
  left: 23px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > div > div {
  max-width: 107px;
  padding-left: 35px;
  height: 52px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > div > div > span {
  font-size: 11px;
  color: #1a1a1a
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > div > div > span.hidden {
  height: 0;
  opacity: 0
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > img {
  max-height: 52px;
  max-width: 52px;
  min-height: 52px;
  min-width: 52px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker > img:hover {
  width: 166px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker.pair > .icon-text {
  width: 72px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker.pair > img {
  min-width: 72px;
  max-width: 72px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker.pair > div {
  width: calc(100% - 40px);
  left: 40px
}

.c-product-card.mobile > div > .body-card > .image > a > .sticker.pair > div > div {
  max-width: 87px
}

.c-product-card.mobile > div > .body-card > .card-info > .category {
  font-size: 9px;
  max-width: 146px;
  line-height: 10.97px
}

.c-product-card.mobile > div > .body-card > .card-info > .rating {
  margin: 5px 0;
  height: 16px
}

.c-product-card.mobile > div > .body-card > .card-info > .rating > .delivery, .c-product-card.mobile > div > .body-card > .card-info > .rating > .free-delivery, .c-product-card.mobile > div > .body-card > .card-info > .rating > .prescription {
  margin-left: auto
}

.c-product-card.mobile > div > .body-card > .card-info > .rating > .delivery > .free-ship > .icon, .c-product-card.mobile > div > .body-card > .card-info > .rating > .delivery > .icon, .c-product-card.mobile > div > .body-card > .card-info > .rating > .free-delivery > .free-ship > .icon, .c-product-card.mobile > div > .body-card > .card-info > .rating > .free-delivery > .icon, .c-product-card.mobile > div > .body-card > .card-info > .rating > .prescription > .free-ship > .icon, .c-product-card.mobile > div > .body-card > .card-info > .rating > .prescription > .icon {
  margin-right: 6px;
  width: 24px;
  height: 24px
}

.c-product-card.mobile > div > .body-card > .card-info > .rating > .delivery > .free-ship > .amount, .c-product-card.mobile > div > .body-card > .card-info > .rating > .free-delivery > .free-ship > .amount, .c-product-card.mobile > div > .body-card > .card-info > .rating > .prescription > .free-ship > .amount {
  width: 23px;
  height: 25px
}

.c-product-card.mobile > div > .body-card > .card-info > .rating.placeholder {
  margin-top: 3px
}

.c-product-card.mobile > div > .body-card > .card-info > .name {
  margin: 7px 0;
  font-size: 13px;
  line-height: 15.85px;
  height: 46px;
  max-width: 156px;
  -webkit-line-clamp: 3
}

.c-product-card.mobile > div > .body-card > .card-info > .delivery, .c-product-card.mobile > div > .body-card > .card-info > .free-delivery, .c-product-card.mobile > div > .body-card > .card-info > .prescription {
  align-items: center
}

.c-product-card.mobile > div > .body-card > .card-info > .delivery > span:last-of-type, .c-product-card.mobile > div > .body-card > .card-info > .free-delivery > span:last-of-type, .c-product-card.mobile > div > .body-card > .card-info > .prescription > span:last-of-type {
  font-size: 9px;
  line-height: 10.97px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices {
  height: 39px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices > div > span:first-of-type {
  font-size: 9px;
  line-height: 15px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices > div > span:last-of-type {
  font-size: 18px;
  line-height: 24.38px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices > div:first-of-type {
  width: 80px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices > div:first-of-type > span:first-of-type {
  font-weight: 600
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices > div.loyal > span:last-of-type {
  padding: 0 5px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button {
  margin-top: 7px;
  -webkit-tap-highlight-color: transparent
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button.no-price {
  margin-top: auto
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button > div.c-basket-product {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button > div > span:last-of-type {
  font-size: 10px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button > .icon {
  width: 25px;
  min-width: 20px
}

.c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button > .icon.trash2 {
  width: 24px;
  -webkit-mask-size: 80%;
  mask-size: 80%
}

@media screen and (max-width: 360px) {
  .c-product-card.mobile {
    width: 140px;
    height: 344px
  }

  .c-product-card.mobile > div > .body-card > .image > a, .c-product-card.mobile > div > .body-card > .image {
    width: 140px;
    height: 140px
  }

  .c-product-card.mobile > div > .body-card > .image > a > img {
    max-width: 140px;
    max-height: 140px
  }

  .c-product-card.mobile > div > .body-card > .card-info > .category {
    max-width: 120px
  }

  .c-product-card.mobile > div > .body-card > .card-info > .name {
    max-width: 140px;
    font-size: 12px
  }

  .c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices {
    height: 39px
  }

  .c-product-card.mobile > div > .body-card > .card-info > .footer-card > .prices > div > span:last-of-type {
    font-size: 15px;
    line-height: 24.38px
  }

  .c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button > .c-basket-product > .quantity > button {
    width: 30px
  }

  .c-product-card.mobile > div > .body-card > .card-info > .footer-card > .button > .c-basket-product > .quantity > input {
    width: 48px
  }

  .c-product-card.horizontal.mobile > div > .body-card > .image {
    width: 60px;
    max-height: 60px
  }

  .c-product-card.horizontal.mobile > div > .body-card > .image > a > img {
    max-width: 60px;
    max-height: 60px
  }

  .c-product-card.horizontal.mobile > div > .body-card > .card-info > .category {
    max-width: 142px
  }

  .c-product-card.horizontal.mobile > div > .body-card > .button > .c-basket-product {
    width: 36px
  }

  .c-product-card.horizontal.mobile > div > .body-card > .button > .c-button {
    width: 36px;
    height: 36px
  }

  .c-product-card.horizontal.mobile > div > .body-card > .button > .c-button .icon {
    -webkit-mask-size: contain;
    mask-size: contain;
    width: 20px;
    height: 20px
  }

  .c-product-card.horizontal.mobile > div > .body-card > .button > .icon {
    width: 24px;
    height: 24px
  }

  .c-product-card.additional {
    background-color: unset;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content
  }

  .c-product-card.additional > div > .prices {
    margin: unset
  }
}
</style>