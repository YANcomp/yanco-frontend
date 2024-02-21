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

let properties = isBrands ? propertiesStore.brands : propertiesStore.list ? propertiesStore.list : []
const brandAnalogs = propertiesStore.brandAnalogsList ? propertiesStore.brandAnalogsList : []


onServerPrefetch(() => {
  if (properties.length < 1 || isBrandsAnalogs) {
    return new Promise(async (resolve) => {
      await propertiesStore.GET(propertyTypeID).catch((error: any) => {
        console.log(error)
      })
      properties = isBrands ? propertiesStore.brands : propertiesStore.list ? propertiesStore.list : []
      resolve("")
    })
  }
});

// if (brandAnalogs.length < 1 && isBrandsAnalogs) {
//   await new Promise(() => {
//     propertiesStore.GET_BRAND_ANALOGS_LIST().catch((error: any) => {
//       console.log(error)
//     })
//   })
// }
// if (properties.length < 1 || isBrandsAnalogs) {
//   await new Promise((resolve) => {
//     propertiesStore.GET(propertyTypeID).then((res)=>{
//       // resolve(res)
//     }).catch((error: any) => {
//       console.log(error)
//     }).finally(()=>{
//       resolve([])
//     })
//   })
// }

// await Promise.all([
//   useFetch(config.API_BASE_URL+'/companies/'+route.params.company),
//   useFetch(config.API_BASE_URL+'/companies/'+route.params.company+'/cafes/'+route.params.cafe)
// ])

// await useAsyncData('v-PropertyList', () => {
//   if (isRareProducts) {
//     // await
//   }
//   if (brandAnalogs.length < 1 && isBrandsAnalogs) {
//     propertiesStore.GET_BRAND_ANALOGS_LIST().catch((error: any) => {
//       console.log(error)
//     })
//   }
//   if (properties.length < 1 || isBrandsAnalogs) {
//     propertiesStore.GET(propertyTypeID).catch((error: any) => {
//       console.log(error)
//     })
//   }
// })
</script>

<template>
  <div>{{ properties }}</div>
</template>

<style scoped>

</style>