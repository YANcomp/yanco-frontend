<script lang="ts" setup>
const route = useRoute()
const appStore = useAppStore()
const catalogStore = useCatalogStore()
const notificationsStore = useNotificationsStore()

const isLocalLoading = ref(false)

const dictionaryName = ref(<any>{
  "Лекарственные препараты и БАДы": "Лекарственные <br> препараты и БАДы",
  "Одежда, обувь и аксессуары": "Одежда, обувь <br> и аксессуары"
})
const dictionaryMobileName = ref(<any>{
  "Лекарственные препараты и БАДы": "Лекарственные <br> препараты, БАДы",
  "Товары для дома и сада": "Товары для дома <br> и сада",
  "Одежда, обувь и аксессуары": "Одежда, обувь <br> и аксессуары"
})
const isUseOnlyName = ref(false)

const isGlobalLoading = computed(() => {
  return appStore.getIsLoading
})
const isLoading = computed(() => {
  return isLocalLoading.value && !isGlobalLoading.value
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const params = computed(() => {
  return appStore.params
})
const catalog: any = computed(() => {
  return catalogStore.catalog
})
const categories = computed(() => {
  return (catalog.value.types ? catalog.value.types : []).map((t: any) => {
    var e, n, r, c;
    return {
      name: isMobile.value && !isUseOnlyName.value ? null !== (e = dictionaryMobileName.value[t.name]) && void 0 !== e ? e : t.name : isUseOnlyName.value ? t.name : null !== (n = dictionaryName.value[t.name]) && void 0 !== n ? n : t.name,
      route: {
        name: "CatalogType",
        params: {
          typeID: "".concat(t.ID),
          typeSlug: t.slug
        }
      },
      image: t.image,
      backgroundImage: "",
      backgroundColor: null !== (c = null !== (r = t.backgroundGradient) && void 0 !== r ? r : t.background) && void 0 !== c ? c : ""
    }
  })
})

onMounted(() => {
  window.addEventListener("resize", resize)
  resize()
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

function resize() {
  isUseOnlyName.value = window.innerWidth <= 373
}

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: params.value.siteURL + route.path,
    },
  ],
}))
useSeoMeta({
  title: 'Каталог — Cosmetic | Yanco',
  description: 'В нашем Каталоге представлен широкий выбор товаров с низкими ценами. Оформите заказ онлайн на сайте и заберите в ближайшем магазине YCosmetic.',
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://cosmetic.yanco.ru/img/cosmetic_logo.png',
  ogTitle: 'Каталог — Cosmetic | Yanco',
  ogDescription: 'В нашем Каталоге представлен широкий выбор товаров с низкими ценами. Оформите заказ онлайн на сайте и заберите в ближайшем магазине YCosmetic.'
})
</script>

<template>
  <div :class='["v-catalog", { mobile: isMobile }]'>
    <UiCSpinner v-if="isLoading" :is-mobile="isMobile" hideOverlay position="relative" size="m"/>
    <div v-if="!isLocalLoading" :class='["grid", { mobile: isMobile }]'>
      <CatalogCPopularCategoryCard v-for="(item, index) in categories" :key="index" :index="index" :category="item"
                                   :is-mobile="isMobile" :is-aria="false"/>
    </div>
  </div>
</template>

<style scoped>
.v-catalog {
  max-width: 1388px;
  align-self: center
}

.v-catalog:not(.mobile) {
  padding: 20px 0;
  margin-left: 20px
}

.v-catalog.mobile {
  padding: 10px 0;
  margin: 0 10px
}

.v-catalog > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-catalog .grid {
  display: grid
}

.v-catalog .grid:not(.mobile) {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 223px;
  grid-column-gap: 20px;
  grid-row-gap: 20px
}

.v-catalog .grid.mobile {
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 156px;
  grid-column-gap: 10px;
  grid-row-gap: 10px
}

.v-catalog :deep(.grid) .c-popular-category-card.coupons .name {
  color: #ff0089
}

.v-catalog :deep(.grid) .c-popular-category-card .background {
  display: none
}

.v-catalog :deep(.grid) .c-popular-category-card .photo {
  align-self: center;
  top: 5px;
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  -o-object-fit: scale-down;
  object-fit: scale-down
}

</style>