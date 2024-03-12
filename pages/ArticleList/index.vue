<script lang="ts" setup>
definePageMeta({
  middleware: async (to) => {
    const articlesStore = useArticlesStore()
    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();

    await articlesStore.ARTICLES_GET_CATEGORIES()

    const isArticleList = computed(() => {
      return "ArticleList" === to.name
    })
    const isArticle = computed(() => {
      return "Article" === to.name
    })

    await COMMIT_BREADCRUMBS_UPD([{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: "Корзина"
    }, {
      name: "Корзина"
    }])
  },
});
</script>