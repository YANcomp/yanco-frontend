<script lang="ts" setup>
definePageMeta({
  middleware: async (to) => {
    const {COMMIT_BREADCRUMBS_UPD} = useAppStore()
    const propertiesStore = usePropertiesStore()

    const propertyTypeID = 10
    await propertiesStore.GET(propertyTypeID)

    let findBrand = propertiesStore.brands.find((t: any) => {
      return t.ID === Number(to.params.propertyID) && t.slug === to.params.propertySlug
    })
    if (findBrand === undefined) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }

    await COMMIT_BREADCRUMBS_UPD([{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: "Бренды",
      routeName: "Brands"
    }, {
      name: "" + findBrand.name
    }])
  },
});
</script>