<script lang="ts" setup>
definePageMeta({
  scrollToTop: true,
  middleware: (to) => {
    const {BREADCRUMBS_UPD} = useAppStore();
    const {catalog} = useCatalogStore();

    let findType = catalog.types.find((t: any) => {
      return t.ID === Number(to.params.typeID) && t.slug === to.params.typeSlug
    })
    let findSubtype = catalog.subtypes.find((t: any) => {
      return t.ID === Number(to.params.subtypeID) && t.slug === to.params.subtypeSlug
    })

    if (findType === undefined || findSubtype === undefined) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }

    BREADCRUMBS_UPD([{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: "Каталог товаров",
      routeName: "catalog"
    }, {
      name: "" + findType.name ? findType.name : "",
      routeName: "CatalogType",
      params: {
        typeID: "".concat(findType.ID),
        typeSlug: findType.slug
      }
    }, {
      name: "" + findSubtype.name ? findSubtype.name : ""
    }])
  },
});
</script>