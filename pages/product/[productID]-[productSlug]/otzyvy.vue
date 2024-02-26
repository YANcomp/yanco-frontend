<script lang="ts" setup>
definePageMeta({
  middleware: async (to) => {
    const appStore = useAppStore();
    const productsStore = useProductsStore()
    const citiesStore = useCitiesStore()
    const catalogStore = useCatalogStore()
    const productPropertyTypesStore = useProductPropertyTypesStore()
    const restrictTypesStore = useRestrictTypesStore()

    const params = to.params
    const product = ref(productsStore.item)
    let notFound = true

    let filter = "ID=" + params.productID + '&slug="' + params.productSlug + '"&cityID=' + citiesStore.currentCity.ID
    await productsStore.PRODUCT_GET(filter).then((res: any) => {
      notFound = false
      product.value = {...res}
    }).catch((err: any) => {
      notFound = "string" != typeof err && 404 === err.code
    })
    if (notFound) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }

    if (productPropertyTypesStore.list.length < 1) {
      await productPropertyTypesStore.PRODUCT_PROPERTY_TYPES_GET()
    }
    if (restrictTypesStore.list.length < 1) {
      await restrictTypesStore.RESTRICT_TYPES_GET()
    }

    let filterReviews = "productID=" + params.productID
    await productsStore.PRODUCT_GET_REVIEWS({
      filter: filterReviews,
      mutation: productsStore.COMMIT_PRODUCT_GET_REVIEWS_TOTAL_COUNT,
      fields: ["ID", "rate"]
    })

    if (productsStore.totalCountReviews > 0) {
      let ut = "productID=" + params.productID + "[0:10]"
      await productsStore.PRODUCT_GET_REVIEWS({
        filter: ut
      })
    }


    let categoryInfo = catalogStore.categoryDirectory[product.value.categoryID]
    let breadcrumbs = [{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: "Каталог товаров",
      routeName: "catalog"
    }, {
      name: categoryInfo.typeName,
      routeName: "CatalogType",
      params: {
        typeID: categoryInfo.typeID,
        typeSlug: categoryInfo.typeSlug
      }
    }, {
      name: categoryInfo.subtypeName,
      routeName: "CatalogSubtype",
      params: {
        typeID: categoryInfo.typeID,
        typeSlug: categoryInfo.typeSlug,
        subtypeID: categoryInfo.subtypeID,
        subtypeSlug: categoryInfo.subtypeSlug
      }
    }, {
      name: categoryInfo.categoryName,
      routeName: "CatalogCategory",
      params: {
        typeID: categoryInfo.typeID,
        typeSlug: categoryInfo.typeSlug,
        subtypeID: categoryInfo.subtypeID,
        subtypeSlug: categoryInfo.subtypeSlug,
        categoryID: product.value.categoryID,
        categorySlug: categoryInfo.categorySlug
      }
    }, {
      name: product.value.name,
      routeName: "Product",
      params: {
        productID: product.value.ID,
        productSlug: product.value.slug,
      }
    }, {
      name: "Отзывы"
    }]
    await appStore.COMMIT_BREADCRUMBS_UPD(breadcrumbs)
  },
});
</script>