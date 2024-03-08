<script lang="ts" setup>
definePageMeta({
  middleware: async () => {
    const questionsStore = useQuestionsStore()
    await questionsStore.GET_MP_PAGE()

    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();
    COMMIT_BREADCRUMBS_UPD([{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: "Мобильное приложение"
    }])
  },
});
</script>