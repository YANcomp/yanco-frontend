<script lang="ts" setup>
definePageMeta({
  middleware: [
    function (to) {
      const {BREADCRUMBS_UPD} = useAppStore();
      BREADCRUMBS_UPD([
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
      ])
    },
  ],
});
</script>