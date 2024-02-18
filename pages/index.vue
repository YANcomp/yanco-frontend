<script lang="ts" setup>
definePageMeta({
  middleware: () => {
    const {BREADCRUMBS_UPD} = useAppStore();
    BREADCRUMBS_UPD([])
  },
});
</script>