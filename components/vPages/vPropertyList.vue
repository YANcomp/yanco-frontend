<script lang="ts" setup>
const route = useRoute()
const propertiesStore = usePropertiesStore()

const isBrands = "Brands" === route.name
const isManufacturers = "Manufacturers" === route.name
const isActiveSubstances = "ActiveSubstances" === route.name
const isBrandsAnalogs = "Analogi" === route.name
const isRareProducts = "RareProducts" === route.name
const propertyTypeID = isBrands ? 10 : isManufacturers ? 13 : isActiveSubstances ? 6 : isRareProducts ? 20 : 10
const title = isBrands ? "Бренды" : isManufacturers ? "Производители" : isActiveSubstances ? "Действующее вещество" : isRareProducts ? "Редкие препараты" : "Аналоги"
const properties = ref(isBrands ? propertiesStore.brands : propertiesStore.list ? propertiesStore.list : [])
const brandAnalogs = ref(propertiesStore.brandAnalogsList ? propertiesStore.brandAnalogsList : [])

if (brandAnalogs.value.length < 1 && isBrandsAnalogs) {
  await new Promise(async (resolve) => {
    await propertiesStore.GET_BRAND_ANALOGS_LIST().then(() => {
      brandAnalogs.value = propertiesStore.brandAnalogsList ? propertiesStore.brandAnalogsList : []
      resolve("")
    }).catch((error: any) => {
      console.log(error)
    })
  })
}

if (properties.value.length < 1 || isBrandsAnalogs) {
  await new Promise(async (resolve) => {
    return await propertiesStore.GET(propertyTypeID).then(() => {
      properties.value = isBrands ? propertiesStore.brands : propertiesStore.list ? propertiesStore.list : []
      resolve("")
    }).catch((error: any) => {
      console.log(error)
    })
  })
}
const isLoading = ref(false)
const appStore = useAppStore()

const isMobile = computed(() => {
  return appStore.isMobile
})
const params = computed(() => {
  return appStore.params
})
const preparedProperties = computed(() => {
  return isBrandsAnalogs ? brandAnalogs.value : properties.value
})
// const failedGetting = computed(() => {
//   return this.$data.failedGettingProperties || this.$data.failedGettingBrandAnalogs
// })

onBeforeRouteLeave((to, from, next) => {
  if (isBrands && "Brand" !== to.name || isManufacturers && "Manufacturer" !== to.name || isActiveSubstances && "ActiveSubstance" !== to.name) {
    propertiesStore.COMMIT_GET({
      list: []
    })
    properties.value = []
  }
  next()
})

let titleHeader = "".concat(title, " — Cosmetic | Yanco")
let descriptionHeader = isBrands ? "Алфавитный указатель для брендов, представленных в аптеках Апрель. Быстрый и удобный поиск товаров на сайте аптеки Апрель по бренду" : isManufacturers ? "Алфавитный указатель для производителей. Быстрый и удобный поиск товаров на сайте аптеки Апрель по производителю." : isActiveSubstances ? "Алфавитный указатель для действующего вещества. Быстрый и удобный поиск препаратов на сайте аптеки Апрель по действующему веществу" : isRareProducts ? "Алфавитный указатель для редких препаратов. Быстрый и удобный поиск товаров на сайте." : "Алфавитный указатель аналогов и заменителей, представленных в аптеках Апрель. Быстрый и удобный поиск товаров на сайте.";
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: params.value.siteURL + route.path,
    },
  ],
}))
useSeoMeta({
  title: titleHeader,
  description: descriptionHeader,
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: titleHeader,
  ogDescription: descriptionHeader
})

</script>

<template>
  <main class="v-property-list">
    <ReferencePageCReferencePage :is-brands-analogs="isBrandsAnalogs" :is-loading="isLoading" :is-mobile="isMobile"
                                 :is-rare-products="isRareProducts" :properties="preparedProperties"
                                 :property-type-i-d="propertyTypeID"/>
  </main>
</template>

<style scoped>

</style>