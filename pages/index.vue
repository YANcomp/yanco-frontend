<script lang="ts" setup>
definePageMeta({
  middleware: async () => {
    const bannersStore = useBannersStore()
    const storiesStore = useStoriesStore()
    const productGroupsStore = useProductGroupsStore()
    const productsStore = useProductsStore()


    await bannersStore.GET()
    await productsStore.PRODUCT_GET_PRODUCT_OF_DAY()
    await storiesStore.GET()
    await productGroupsStore.GET()
    //GET OUR PRODUCTS
    let filter = 'groups="our_products"'
    await productsStore.PRODUCT_GET_LIST({
      filter: filter,
      path: "random",
      listName: "ourProduction"
    })
    //GET_SPECIAL_OFFERS
    filter = 'groups="special_offer"'
    await productsStore.PRODUCT_GET_LIST({
      filter: filter,
      path: "random",
      listName: "specialOffers"
    })

    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();
    await COMMIT_BREADCRUMBS_UPD([])
  },
});
</script>