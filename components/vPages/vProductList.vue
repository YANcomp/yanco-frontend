<script lang="ts" setup>
const props = defineProps({
  categoryID: {
    type: Number
  },
  categorySlug: {
    type: String
  },
  search: {
    type: String
  },
  subtypeID: {
    type: Number
  },
  subtypeSlug: {
    type: String
  },
  typeID: {
    type: Number
  },
  typeSlug: {
    type: String
  },
  propertyID: {
    type: Number
  },
  propertyName: {
    type: String
  },
  propertySlug: {
    type: String
  },
  propertyTypeID: {
    type: Number
  },
  propertyTypeName: {
    type: String
  }
})
</script>

<template>
  <main class="v-product-list">
    cProductList
  </main>
</template>

<style scoped>

</style>