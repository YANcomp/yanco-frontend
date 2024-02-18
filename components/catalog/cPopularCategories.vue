<script lang="ts" setup>
const props = defineProps({
  city: {
    type: Object
  }
})

const appStore = useAppStore()
const popularCategoriesStore = usePopularCategoriesStore()
// await popularCategoriesStore.GET({allowDelivery: false})
await popularCategoriesStore.GET_COUNT({allowDelivery: false})

const notificationsStore = useNotificationsStore()

const isFailedGettingPopularCategories = ref(false)
const isShowCategoriesMobile = ref(appStore.isMobile)

const isMobile = computed(() => {
  return appStore.isMobile
})
const isEmptyCategories = computed(() => {
  return popularCategoriesStore.categories.length === 0
})
const categories = computed(() => {
  for (var t, r = (null !== (t = popularCategoriesStore.categories) && void 0 !== t ? t : []).reduce((t: any, r: any) => {
    var n;
    if (r.isPopular) {
      var o = "?utm_source=site&utm_medium=PK",
          c = r.icon;
      t.push({
        ...r,
        image: isMobile.value ? "".concat(c.substring(0, c.lastIndexOf(".")), "_mobile").concat(c.substring(c.lastIndexOf("."))) : c,
        route: (null == r ? void 0 : r.url) ? "".concat(r.url).concat(o) : "catalog/categories/".concat(null !== (n = r.slug) && void 0 !== n ? n : "").concat(o),
        name: r.name.includes("/") ? r.name.split("/")[isMobile.value ? 1 : 0] : r.name,
        backgroundImage: isMobile.value ? "".concat(r.backgroundImage.substring(0, r.backgroundImage.lastIndexOf(".")), "_mobile").concat(r.backgroundImage.substring(r.backgroundImage.lastIndexOf("."))) : r.backgroundImage
      })
    }
    return t
  }, []), n = []; n.length < popularCategoriesStore.count;) n.push({
    route: "/",
  });
  return r.length > 0 ? r : n
})
const isNewYearMode = computed(() => {
  return appStore.params.isNewYearMode ? appStore.params.isNewYearMode : undefined
})

watch(() => props.city, () => {
  loadPopularCategories()
})

onMounted(() => {
  !isMobile.value && categories.value[0].name === undefined && props.city !== undefined && loadPopularCategories()
  resize()
  window.addEventListener("resize", resize)
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

function resize() {
  isShowCategoriesMobile.value = window.innerWidth <= 540
}

function error(notification: any) {
  notificationsStore.NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: notification,
    status: "error"
  })
}

async function loadPopularCategories() {
  console.log("load")
  return await popularCategoriesStore.GET(props.city).catch((e) => {
    isFailedGettingPopularCategories.value = true
    error(e)
  })
}
</script>

<template>
  <div :class='["c-popular-categories", { mobile: isMobile, empty: isEmptyCategories }]'>
    <p>{{ isNewYearMode ? "Новогоднее предложение" : "Популярные категории" }}</p>
    <div :class='["categories", "_" + categories.length, { mobile: isShowCategoriesMobile }]'>
      <CatalogCPopularCategoryCard v-for="(category, index) in categories" :key="index" :index="index"
                                   :category="category" :is-mobile="isShowCategoriesMobile"/>
    </div>
  </div>
</template>

<style scoped>
.c-popular-categories {
  margin: 30px 0;
}

.c-popular-categories.empty a {
  background-color: #ebf0f9;
  pointer-events: none;
  position: relative;
  overflow: hidden
}

.c-popular-categories.empty a > {
  display: none
}

.c-popular-categories > p {
  font-weight: 600;
  font-size: 28px;
  margin: 0;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-popular-categories > div {
  display: flex;
  flex-flow: wrap;
  position: relative;
  margin-left: -10px;
  margin-right: -10px
}

.c-popular-categories > div.categories {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr
}

.c-popular-categories > div.categories:not(.mobile) {
  margin: 1px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 186px;
  grid-column-gap: 20px;
  grid-row-gap: 20px
}

.c-popular-categories > div.categories.mobile {
  grid-template-columns: 1fr 1fr;
  margin: 1px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-auto-rows: 102px
}

.c-popular-categories > div.categories._1 {
  grid-template-columns: 1fr;
  grid-template-areas: "a"
}

.c-popular-categories > div.categories._1:not(.mobile) {
  grid-auto-rows: 392px
}

.c-popular-categories > div.categories._1.mobile {
  grid-auto-rows: 214px
}

.c-popular-categories > div.categories._2 {
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "a b"
}

.c-popular-categories > div.categories._2:not(.mobile) {
  grid-auto-rows: 392px
}

.c-popular-categories > div.categories._2.mobile {
  grid-auto-rows: 214px
}

.c-popular-categories > div.categories._3:not(.mobile) {
  grid-template-areas: "a b c";
  grid-auto-rows: 392px
}

.c-popular-categories > div.categories._3.mobile {
  grid-template-areas: "a b" "a b" "c c"
}

.c-popular-categories > div.categories._4 {
  grid-template-columns: 1fr 1fr
}

.c-popular-categories > div.categories._4:not(.mobile) {
  grid-template-areas: "a b" "c d"
}

.c-popular-categories > div.categories._4.mobile {
  grid-template-areas: "a b" "a c" "d d"
}

.c-popular-categories > div.categories._5:not(.mobile) {
  grid-template-areas: "a b e" "c d e"
}

.c-popular-categories > div.categories._5.mobile {
  grid-template-areas: "a b" "a b" "c d" "e e"
}

.c-popular-categories > div.categories._6:not(.mobile) {
  grid-template-areas: "a b c" "d e f"
}

.c-popular-categories > div.categories._6.mobile {
  grid-template-areas: "a b" "a b" "c c" "d f" "e f"
}

.c-popular-categories > div.categories._7:not(.mobile) {
  grid-template-areas: "a b g" "c d g" "e f g"
}

.c-popular-categories > div.categories._7.mobile {
  grid-template-areas: "a b" "a c" "d d" "e g" "f g"
}

.c-popular-categories > div.categories._8:not(.mobile) {
  grid-template-areas: "a b e" "c d e" "f g h"
}

.c-popular-categories > div.categories._8.mobile {
  grid-template-areas: "a b" "c d" "e e" "f h" "g h"
}

.c-popular-categories > div.categories._9:not(.mobile) {
  grid-template-areas: "a b c" "d e f" "g h i"
}

.c-popular-categories > div.categories._9.mobile {
  grid-template-areas: "a b" "a c" "d f" "e f" "g g" "h i"
}

.c-popular-categories > div.categories._10:not(.mobile) {
  grid-template-areas: "a b c" "a d e" "f g j" "h i j"
}

.c-popular-categories > div.categories._10.mobile {
  grid-template-areas: "a b" "a c" "d f" "e f" "g g" "h i" "h j"
}

.c-popular-categories.mobile {
  padding: 0 10px
}

.c-popular-categories.mobile > p {
  font-size: 20px
}

</style>