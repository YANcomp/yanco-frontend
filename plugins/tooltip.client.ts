import vueDataTooltip from "~/plugins/vue-data-tooltip/vue-data-tooltip";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vueDataTooltip)
})