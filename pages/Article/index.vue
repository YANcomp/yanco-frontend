<script lang="ts" setup>
definePageMeta({
  middleware: async (to) => {
    const articlesStore = useArticlesStore()
    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();

    await articlesStore.ARTICLES_GET_CATEGORIES()

    const notFound = ref(false)

    await articlesStore.ARTICLES_GET_MARKUP({
      ID: to.params.ID
    })

    await articlesStore.ARTICLES_GET({
      ID: to.params.ID,
      slug: to.params.slug,
      listName: "article"
    }).then((res:any)=>{
      notFound.value = res.ID !== to.params.ID && res.slug !== to.params.slug
    }).catch((t) => {
      notFound.value = "string" != typeof t && 404 === t.code
    })


    if (notFound.value) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }

    const article = ref(articlesStore.article)

    let C, E
    let L = articlesStore.categories.find((t: any) => {
      return t.ID === (article.value ? article.value.categoryID : "")
    })
    let title = null !== (C = (article.value ? article.value : {}).title) && void 0 !== C ? C : ""
    let N = {}

    void 0 !== (null == L ? void 0 : L.parentID) ? (E = articlesStore.categories.find((t: any) => {
      return t.ID === L.parentID
    }), N = [{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: E.title,
      routeName: "ArticleList",
      params: {
        sectionName: E.slug
      }
    }, {
      name: L.title,
      routeName: "ArticleList",
      params: {
        sectionName: E.slug,
        categoryName: L.slug
      }
    }, {
      name: title
    }]) : N = [{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: null == L ? void 0 : L.title,
      routeName: "ArticleList",
      params: {
        sectionName: to.params.sectionName
      }
    }, {
      name: title
    }]

    await COMMIT_BREADCRUMBS_UPD(N)
  },
});
</script>