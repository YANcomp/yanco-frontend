<script lang="ts" setup>
definePageMeta({
  middleware: async (to) => {
    const articlesStore = useArticlesStore()
    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();

    await articlesStore.ARTICLES_GET_CATEGORIES()

    let o, m
    let h = null === (o = (null != articlesStore.categories ? articlesStore.categories : []).find((t: any) => {
      return to.params.categoryName ? t.slug === to.params.categoryName : t.slug === to.params.sectionName
    })) || void 0 === o ? void 0 : o.title
    let f = undefined

    if (!h) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
      })
    }

    to.params.categoryName?.length > 0 ? (m = (null != articlesStore.categories ? articlesStore.categories : []).find((t: any) => {
      return t.slug === to.params.sectionName
    }), f = [{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: null == m ? void 0 : m.title,
      routeName: "ArticleList",
      params: {
        // slug: null == m ? void 0 : m.slug,
        sectionName: null == m ? void 0 : m.slug
      }
    }, {
      name: h
    }]) : f = [{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: h
    }]

    await COMMIT_BREADCRUMBS_UPD(f)
  },
});
</script>