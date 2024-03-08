<script lang="ts" setup>
definePageMeta({
  middleware: async (to) => {
    const {COMMIT_BREADCRUMBS_UPD} = useAppStore();

    const page = ref(undefined)
    await useNuxtApp().$api.pages.get(to.params.slug).then((p: any) => {
      page.value = p[0]
    })

    await COMMIT_BREADCRUMBS_UPD([{
      name: "Главная страница",
      routeName: "index"
    }, {
      name: page.value?.title ? page.value.title : ""
    }])
  },
});
</script>