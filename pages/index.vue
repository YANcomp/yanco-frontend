<script lang="ts" setup>
definePageMeta({
  middleware: async () => {
    const bannersStore = useBannersStore()
    const storiesStore = useStoriesStore()
    const productGroupsStore = useProductGroupsStore()
    const productsStore = useProductsStore()

    await bannersStore.GET()
    await productsStore.GET_PRODUCT_OF_DAY()
    await storiesStore.GET()
    await productGroupsStore.GET()
    await productsStore.GET_OUR_PRODUCTS()
    await productsStore.GET_SPECIAL_OFFERS()

    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();
    await COMMIT_BREADCRUMBS_UPD([])
  },
});
</script>