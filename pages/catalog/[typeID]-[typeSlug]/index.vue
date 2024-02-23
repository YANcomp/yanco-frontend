<script lang="ts" setup>
definePageMeta({
  scrollToTop: true,
  middleware: async (to) => {
    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();
    const {catalog} = useCatalogStore();

    let findType = catalog.types.find((t: any) => {
      return t.ID === Number(to.params.typeID) && t.slug === to.params.typeSlug
    })

    if (findType === undefined) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }

    await COMMIT_BREADCRUMBS_UPD([{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: "Каталог товаров",
      routeName: "catalog"
    }, {
      name: "" + findType.name ? findType.name : ""
    }])
  },
});
</script>