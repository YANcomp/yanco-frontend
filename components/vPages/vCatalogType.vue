<script lang="ts" setup>
const props = defineProps({
  typeID: {
    type: Number,
    required: !0
  },
  typeSlug: {
    type: String
  }
})
const route = useRoute()
const dictionaryMobileName = ref(<any>{
  "Лекарственные препараты и БАДы": "Лекарственные препараты <br> и БАДы"
})
const isUseMobileName = ref(!1)
const loadingBasketProductIDs = ref([])
const loadingFavoritesProductIDs = ref([])
const updatingBasketProductIDs = ref([])

const appStore = useAppStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const meStore = useMeStore()
const sessionsStore = useSessionsStore()
const catalogStore = useCatalogStore()
const citiesStore = useCitiesStore()

const basketItems = computed(() => {
  return basketStore.items
})
const favoritesItems = computed(() => {
  return favoritesStore.items
})
const hasLoyalCard = computed(() => {
  return meStore.hasLoyalCard
})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const productCategories = computed(() => {
  return catalog.value.categories
})
const productSubtypes = computed(() => {
  return catalog.value.subtypes
})
const activeCatalogType = computed(() => {
  let n = catalog.value.types.find((t: any) => {
    return t.ID === props.typeID
  })
  isUseMobileName.value && (n.name = dictionaryMobileName.value[n.name] ? dictionaryMobileName.value[n.name] : n.name)
  return n
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const city = computed(() => {
  return citiesStore.currentCity
})
const hasActiveCatalogType = computed(() => {
  return Object.keys(activeCatalogType.value).length > 0
})
const isLoading = computed(() => {
  return appStore.getIsLoading
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const params = computed(() => {
  return appStore.params
})
const categoryDirectory = computed(() => {
  return catalogStore.categoryDirectory
})
const preparedCatalog = computed(() => {
  return catalogStore.catalogTree
})
const preparedProductSubtypes = computed(() => {
  let t, e, o
  return 400010 !== props.typeID ? (null !== (t = <any>preparedCatalog.value.find((t: any) => {
    return t.ID === props.typeID
  })) && void 0 !== t ? t : {}).subtypes : [].concat(
      ...(null !== (e = <any>preparedCatalog.value.find((t: any) => {
        return t.ID === props.typeID
      })) && void 0 !== e ? e : {}).subtypes,
      ...(null !== (o = <any>preparedCatalog.value.find((t: any) => {
        return 400221 === t.ID
      })) && void 0 !== o ? o : {}).subtypes
  )
  // let result = []
  // let type = <any>preparedCatalog.value.find((t: any) => {
  //   return t.ID === props.typeID
  // })
  // if (400010 !== props.typeID) {
  //   result.push(type.subtypes)
  // } else {
  //   let typeCustom = <any>preparedCatalog.value.find((t: any) => {
  //     return 400221 === t.ID
  //   })
  //   result.push(type.subtypes)
  //   result.push(typeCustom.subtypes)
  // }
  // return result
})
const productTypes = computed(() => {
  return catalog.value.types
})
const preparedCatalogCategories = computed(() => {
  return preparedProductSubtypes.value.map((s: any) => {
    return s.categories
  }).flatMap((t: any) => {
    return t
  })
})

onMounted(() => {
  isUseMobileName.value = window.innerWidth <= 350
})
let desc = "В разделе «" + activeCatalogType.value.name + "» представлен широкий выбор товаров с низкими ценами. Оформите заказ онлайн на сайте и заберите в ближайшем магазине YCosmetic."
let urlHead = "" + params.value.siteURL + "/catalog/" + props.typeID + "-" + activeCatalogType.value.slug

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: urlHead,
    },
  ],
}))
useSeoMeta({
  title: activeCatalogType.value.name + ' — Cosmetic | Yanco',
  description: desc,
  ogType: 'website',
  ogUrl: urlHead,
  ogImage: 'https://cosmetic.yanco.ru/img/cosmetic_logo.png',
  ogTitle: activeCatalogType.value.name + ' — Cosmetic | Yanco',
  ogDescription: desc
})
</script>

<template>
  <main :class='["v-catalog-type", "flex-vertical", { mobile: isMobile }]'>
    <template v-if="hasActiveCatalogType">
      <h1>{{ activeCatalogType.name }}</h1>
      <ul>
        <li v-for="(e,r) in preparedProductSubtypes" :key="r">
          <NuxtLink :to="e.route" class="hover-bottom-line">
            {{ e.name }}
          </NuxtLink>
          <ul>
            <li v-for="(b, c) in e.categories" :key="c">
              <NuxtLink :to="b.route" class="hover-bottom-line">
                {{ b.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </main>
</template>

<style scoped>
.v-catalog-type {
  margin: 0 auto;
  padding: 0;
  max-width: 1368px;
  width: 100%
}

@media screen and (max-width: 1367px) {
  .v-catalog-type {
    padding: 0 20px;
    box-sizing: border-box
  }
}

.v-catalog-type > h1 {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #1e1e1e;
  margin: 0 0 10px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.v-catalog-type > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  -moz-column-count: 3;
  column-count: 3
}

.v-catalog-type > ul > li {
  min-width: 250px;
  padding: 10px 0;
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  page-break-inside: avoid
}

.v-catalog-type > ul > li > a {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #1e1e1e
}

.v-catalog-type > ul > li > a:hover {
  color: #3f51b5
}

.v-catalog-type > ul > li > ul {
  margin: 10px 0;
  padding: 0;
  list-style: none
}

.v-catalog-type > ul > li > ul > li {
  margin: 15px 0;
  font-size: 18px;
  line-height: 22px
}

.v-catalog-type > ul > li > ul > li > a {
  color: #1e1e1e
}

.v-catalog-type > ul > li > ul > li > a:hover {
  color: #3f51b5
}

.v-catalog-type.mobile {
  padding: 0 10px
}

.v-catalog-type.mobile > h1 {
  margin-top: 10px;
  font-size: 20px;
  line-height: 20px
}

.v-catalog-type.mobile > ul > li {
  padding: 5px 0
}

.v-catalog-type.mobile > ul > li > ul {
  margin: 0
}

.v-catalog-type.mobile > ul > li > ul > li {
  margin: 10px 0
}

@media screen and (max-width: 850px) {
  .v-catalog-type > ul {
    -moz-column-count: 2;
    column-count: 2
  }
}

@media screen and (max-width: 580px) {
  .v-catalog-type.mobile > h1 {
    font-size: 17px;
    line-height: 17px
  }

  .v-catalog-type.mobile > ul > li > a, .v-catalog-type.mobile > ul > li > ul > li {
    font-size: 13px;
    line-height: 16px
  }
}

@media screen and (max-width: 550px) {
  .v-catalog-type > ul {
    -moz-column-count: 1;
    column-count: 1
  }
}

</style>