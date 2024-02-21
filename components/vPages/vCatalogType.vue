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
</script>

<template>
  <main class="v-catalog-type flex-vertical">
    vCatalogType
    {{props}}
  </main>
</template>

<style scoped>

</style>