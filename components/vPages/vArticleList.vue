<script lang="ts">
const props = defineProps({
  categoryName: {
    type: String
  },
  sectionName: {
    type: String
  },
  category: {
    type: Object
  },
  categories: {
    type: Array,
    default: function () {
      return []
    }
  }
})

const categoryIDs = ref([])
const isFailedGettingArticles = ref(!1)
const isLoadingCategories = ref(!0)
const isLocalLoading = ref(!1)
const isRequest = ref(!1)
const limit = ref(10)
const offset = ref(0)
const totalCount = ref(0)
</script>

<template>

</template>

<style scoped>

</style>