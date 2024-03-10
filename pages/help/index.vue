<script lang="ts" setup>
definePageMeta({
  middleware: () => {
    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();
    COMMIT_BREADCRUMBS_UPD([{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: "Вопрос-ответ"
    }])
  },
});
</script>