<script lang="ts" setup>
const props = defineProps({
  params: {
    type: Object
  },
  comparisonProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  comparisonProducts: {
    type: Array,
    default: function () {
      return []
    }
  },
  productCategories: {
    type: Array,
    default: function () {
      return []
    }
  }
})

const preparedComparisonProducts = computed(() => {
  return props.comparisonProductIDs.reduce((result: any, product: any) => {
    let category: any = props.productCategories.find((value: any) => {
      return value.ID === product.categoryID
    })

    let products: any = props.comparisonProducts.reduce((resultProducts: any, productComp: any) => {
      if (product.productIDs.includes(productComp.ID)) {
        resultProducts.push({
          ...productComp,
          isLoyal: productComp.price !== undefined && productComp.price.withCard !== productComp.price.withoutCard,
          isRank: productComp.price !== undefined && productComp.price.withCard !== productComp.price.withoutCard,
          route: {
            name: "Product",
            params: {
              productID: "" + productComp.ID,
              productSlug: "" + productComp.slug
            }
          }
        })
      }
      return resultProducts
    })

    result.push({
      category: (category ? category : {}).name,
      products: products
    })
  }, [])
})

function image(product: any) {
  return Object(uPrepareProduct)(...product, SIZE_XS, props.params?.cdnURL.url).images[0]
}

function remove(item: any) {
  //TODO
  // var e, n = $.c.clone(this.comparisonProductIDs),
  //     o = null !== (e = this.comparisonProductIDs.find((function (p) {
  //       return p.productIDs.includes(t)
  //     }))) && void 0 !== e ? e : {};
  // n = 1 === o.productIDs.length ? this.comparisonProductIDs.filter((function (p) {
  //   return p.categoryID !== o.categoryID
  // })) : n.filter((function (p) {
  //   return p.categoryID === o.categoryID && (p.productIDs = p.productIDs.filter((function (e) {
  //     return e !== t
  //   }))), p
  // })), this.$store.dispatch("comparisonProducts/".concat(z.COMPARISON_PRODUCTS.UPD), n)
}
</script>

<template>
  <div class="c-compare-menu">
    <div>
      <div>
        <div class="products">
          <div v-for="(category, index) in preparedComparisonProducts" :key="index">
            <span :data-tooltip="category.category">{{ category.category }}</span>
            <NuxtLink v-for="(product) in category.products" :key="product.ID" :to="product.route"
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
                <div>
                  <template v-if="product.isLoyal">
                    <span>По акции</span>
                    <span class="loyal">
                      {{ product.price.withCard + " ₽" }}
                    </span>
                  </template>
                  <template v-if="product.isRank">
                    <span>Клубная цена</span>
                    <span>{{ product.price.withPeriod + " ₽" }}</span>
                  </template>
                  <div>
                    <span>Цена</span>
                    <span>{{ product.price.withoutCard + " ₽" }}</span>
                  </div>
                </div>
              </div>
              <span class="icon item-remove" data-tooltip="Удалить из сравнения" @click.prevent="remove(product.ID)"/>
            </NuxtLink>
          </div>
        </div>

        <NuxtLink :to='{name: "compare"}'>
          <UiCButton size="xl" mode="primary">
            сравнить товары
            <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
          </UiCButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-compare-menu {
  position: absolute;
  top: 40px;
  left: -245px;
  width: 480px;
  max-height: 425px;
  padding-top: 17px;
  filter: drop-shadow(3px 3px 15px rgba(0, 0, 0, .2))
}

.c-compare-menu:after, .c-compare-menu:before {
  display: block;
  content: "";
  position: absolute;
  top: 6px;
  left: 277px;
  transform: translateX(-50%);
  background: hsla(0, 0%, 100%, 0);
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #fff;
  border-style: solid;
  border-width: 0 12px 12px
}

.c-compare-menu:before {
  top: 4.5px
}

.c-compare-menu > div {
  background-color: #fff;
  border-radius: 5px
}

.c-compare-menu > div > div {
  display: flex;
  flex-flow: column;
  padding: 16px 10px 20px
}

.c-compare-menu > div > div > a {
  margin: 20px auto 0;
  width: 304px
}

.c-compare-menu > div > div > a > .c-button > .caption {
  justify-content: center
}

.c-compare-menu > div > div > a > .c-button:hover > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-compare-menu > div > div > a > .c-button:hover > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-compare-menu > div > div > .products {
  max-height: 365px;
  overflow-y: auto
}

.c-compare-menu > div > div > .products::-webkit-scrollbar {
  width: 3px
}

.c-compare-menu > div > div > .products::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.c-compare-menu > div > div > .products > div > span {
  font-weight: 700;
  line-height: 17px;
  margin-left: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-compare-menu > div > div > .products > div > a {
  display: flex;
  color: #1a1a1a;
  align-items: center;
  margin-top: 13px;
  padding: 5px 10px;
  position: relative;
  transition: all .2s ease-in-out
}

.c-compare-menu > div > div > .products > div > a:first-of-type {
  margin-top: 11px
}

.c-compare-menu > div > div > .products > div > a:last-of-type {
  margin-bottom: 17px
}

.c-compare-menu > div > div > .products > div > a > .icon:not(.prescription) {
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

.c-compare-menu > div > div > .products > div > a > .icon:not(.prescription):hover {
  background-color: #3f51b5
}

.c-compare-menu > div > div > .products > div > a > .prescription {
  min-width: 30px;
  height: 30px;
  margin-right: 10px
}

.c-compare-menu > div > div > .products > div > a > .image {
  margin-right: 10px;
  max-width: 80px;
  max-height: 80px;
  min-width: 80px
}

.c-compare-menu > div > div > .products > div > a > .image > img {
  max-height: 80px;
  max-width: 80px;
  min-height: 80px;
  display: block;
  margin: 0 auto
}

.c-compare-menu > div > div > .products > div > a > .name {
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

.c-compare-menu > div > div > .products > div > a > .price {
  display: flex;
  max-width: 195px
}

.c-compare-menu > div > div > .products > div > a > .price > div {
  display: flex;
  flex-flow: column
}

.c-compare-menu > div > div > .products > div > a > .price > div:first-of-type {
  max-width: 90px;
  margin-right: 20px
}

.c-compare-menu > div > div > .products > div > a > .price > div:first-of-type > span:first-of-type {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 2px;
  width: 90px;
  height: 15px
}

.c-compare-menu > div > div > .products > div > a > .price > div:first-of-type > span:last-of-type {
  font-weight: 600;
  font-size: 19px;
  line-height: 27px;
  height: 26px
}

.c-compare-menu > div > div > .products > div > a > .price > div:first-of-type > span:last-of-type.loyal {
  background-color: #ff0089;
  border-radius: 5px;
  color: #fff;
  padding: 1px 6px;
  height: 24px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-compare-menu > div > div > .products > div > a > .price > div:last-of-type {
  max-width: 80px;
  min-width: 80px;
  position: relative;
  color: #596175
}

.c-compare-menu > div > div > .products > div > a > .price > div:last-of-type > span:first-of-type {
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 3px;
  height: 14px
}

.c-compare-menu > div > div > .products > div > a > .price > div:last-of-type > span:last-of-type {
  font-size: 19px;
  line-height: 27px;
  height: 26px
}

.c-compare-menu > div > div > .products > div > a > .price > div:last-of-type:before {
  display: block;
  content: "";
  position: absolute;
  height: 17px;
  width: 1px;
  background-color: #818ca9;
  left: -15px;
  top: 20px
}

.c-compare-menu > div > div > .products > div > a:hover {
  background-color: #ebf0f9
}

.c-compare-menu > div > div > .products > div > a:hover > .icon {
  opacity: 1
}

.c-compare-menu > div > div > .products > div > a:hover > .name {
  color: #3f51b5
}

.c-compare-menu > div > div > .products > div:last-of-type > a:last-of-type {
  margin-bottom: 0
}
</style>