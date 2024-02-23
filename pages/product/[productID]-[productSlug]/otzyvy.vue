<script lang="ts" setup>
definePageMeta({
  middleware: [
    function (to) {
      const {COMMIT_BREADCRUMBS_UPD} = useAppStore();
      COMMIT_BREADCRUMBS_UPD([
        {
          name: "Главная страница",
          routeName: "index"
        },
        {
          name: "Каталог"
        },
        {
          name: "Товар " + to.params.productID + " | " + to.params.productSlug
        },
        {
          name: "Отзывы"
        }
      ])
    },
  ],
});
</script>