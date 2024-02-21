<script lang="ts" setup>
definePageMeta({
  middleware: () => {
    const {BREADCRUMBS_UPD, LOADING_UPD} = useAppStore();
    LOADING_UPD(true)
    BREADCRUMBS_UPD([
      {
        name: "Главная страница",
        routeName: "index"
      }, {
        name: "Каталог товаров"
      }
    ]).finally(() => {
      LOADING_UPD(false)
    })
  },
});
</script>