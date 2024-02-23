<script lang="ts" setup>
definePageMeta({
  middleware: () => {
    const {COMMIT_BREADCRUMBS_UPD, COMMIT_LOADING_UPD} = useAppStore();
    COMMIT_LOADING_UPD(true)
    COMMIT_BREADCRUMBS_UPD([
      {
        name: "Главная страница",
        routeName: "index"
      }, {
        name: "Каталог товаров"
      }
    ]).finally(() => {
      COMMIT_LOADING_UPD(false)
    })
  },
});
</script>