<script lang="ts" setup>
const props = defineProps({
  sectionName: {
    type: String,
    validator(t: any) {
      return ["blog", "news"].includes(t.trim())
    }
  }
})
const articlesStore = useArticlesStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

//FETCH data
const categories = ref(articlesStore.categories)
const isLoading = ref(true)
const isFailedGettingCategories = ref(false)

// await articlesStore.ARTICLES_GET_CATEGORIES().then((t: any) => {
//   categories.value = t
// }).catch((t: any) => {
//   isFailedGettingCategories.value = !0
//   useNotificationsStore().NOTIFICATIONS_UPD({
//     title: "Произошла ошибка",
//     desc: t,
//     status: "error"
//   })
// }).finally(() => {
//   isLoading.value = false
// })
// end fetch data

const activeCategoryID = ref(void 0)
const isClosed = ref(!0)
const isOpened = ref(!1)
const category = ref(<any>void 0)

const showLastArticles = computed(() => {
  return !isMobile.value && "Article" === route.name && lastArticles.value.length > 0
})
const categoryTitle = computed(() => {
  return currentCategory.value.title ? currentCategory.value.title : "Выберите категорию"
})
const currentCategory = computed(() => {
  if (!(items.value.length < 1)) return (categories.value ? categories.value : []).find((t: any) => {
    return t.ID === activeCategoryID.value
  })
})
const hasCategories = computed(() => {
  return void 0 !== categories.value
})
const isArticleList = computed(() => {
  return "ArticleList" === route.name
})
const isArticle = computed(() => {
  return "Article" === route.name
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const items = computed(() => {
  return articlesStore.getCategoriesTree
})
const lastArticles = computed(() => {
  return articlesStore.preparedLastArticles !== null ? articlesStore.preparedLastArticles : []
})
const preparedItems = computed(() => {
  return prepareItems(items.value)
})

watch(() => route.path, () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
  category.value = void 0
  isArticleList.value && (isMobile.value && isOpened.value && openClose())
})

void 0 !== categories.value && setCategory()

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
})

function goTo(t: any) {
  openClose()
  setTimeout(() => {
    router.push(t)
  }, 400)
}

function getRootParent(t: any, e: any) {
  let r, n = (null !== (r = categories.value) && void 0 !== r ? r : []).find((t: any) => {
    return t.ID === e
  });
  if (void 0 !== n) {
    let o: any = getRootParent(t, n.parentID);
    return n.parentID === t.ID ? categories.value.find((t: any) => {
      return t.ID === e
    }) : o
  }
}

function getRootParentSlug(t: any) {
  var e, r = (null !== (e = categories.value) && void 0 !== e ? e : []).find((e: any) => {
    return e.ID === t
  });
  if (void 0 !== r) {
    if (void 0 === r.parentID) return r.slug;
    let n: any = getRootParentSlug(r.parentID);
    return n === t ? void 0 : n
  }
}

function openClose() {
  isOpened.value = !isOpened.value
}

function prepareItems(t: any) {
  return t.length > 0 ? t.map((i: any) => {
    let t, r;
    return {
      ...i,
      route: {
        name: "ArticleList",
        params: {
          sectionName: null !== (t = getRootParentSlug(i.parentID)) && void 0 !== t ? t : i.slug,
          categoryName: void 0 !== i.parentID ? i.slug : void 0
        }
      },
      isActive: i.ID === activeCategoryID.value,
      isActiveParent: i.ID === (null === (r = category.value) || void 0 === r ? void 0 : r.parentID),
      isParent: void 0 === i.parentID,
      children: prepareItems(i.children)
    }
  }) : []
}

function resolve(t: any, e: any) {
  var r, n, o,
      l = (null !== (r = categories.value) && void 0 !== r ? r : []).find((e: any) => {
        return e.slug === t
      });
  if (void 0 !== l) return null !== (o = (null !== (n = categories.value) && void 0 !== n ? n : []).find((t: any) => {
    return t.slug === e && t.parentID === l.ID ? t : t.slug === e && void 0 !== t.parentID && t.parentID !== l.ID ? getRootParent(l, t.parentID) : void 0
  })) && void 0 !== o ? o : l
}

function setCategory() {
  var t, e = route.params,
      r = e.sectionName,
      n = e.categoryName;
  category.value = resolve(r, n)
  void 0 !== (null === (t = category.value) || void 0 === t ? void 0 : t.ID) && (activeCategoryID.value = category.value?.ID)
}

</script>

<template>
  <main :class='["v-articles", "container",  { mobile: isMobile }]'>
    <h1>Наш блог</h1>
    <div v-if="isMobile" class="selected-category" @click="openClose">
      {{ categoryTitle }}
      <span class="icon arrow-down"/>
    </div>
    <UiCBottomBar v-if="isMobile" :is-opened="isOpened" title="Наш блог" @close="openClose">

    </UiCBottomBar>
    <section>
      <template v-if="!isMobile && hasCategories">
        <aside>
          <div :class='["accordion", { "article-page": isArticle }]'>
            <ArticleCTreeView :items="preparedItems">
              <NuxtLink v-for="(e) in preparedItems" :key="e.ID"
                        :class='[e.isActive ? "tree-item-active" : "tree-item", { "active-parent": e.isActiveParent }]'
                        :style='{ "padding-left": 10 + "px" }' :to="e.route">
                {{ e.title }}
              </NuxtLink>
            </ArticleCTreeView>

            <div v-if="showLastArticles" class="last-articles">
              <span>Последние статьи:</span>
              <NuxtLink v-for="(a,i) in lastArticles" :key="i" :to="a.route">
                <span class="image" :style='{ backgroundImage: a.image }'/>
                <div class="info">
                  <span class="name">{{ a.title }}</span>
                  <span class="read">
                    ЧИТАТЬ
                    <UiCArrowSVG hover-color="#4659c4" color="#3f51b5" size="s"/>
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </aside>
      </template>
      <UiCSpinner v-show="!hasCategories && !isFailedGettingCategories" :is-mobile="isMobile" hide-overlay size="m"
                  position="relative"/>

      <ArticleVArticleList v-if="isArticleList" :category="category" :categories="categories"
                           @category-set="setCategory"/>

      <ArticleVArticle v-if="isArticle" :categories="categories" :i-d="route.params.ID" @category-set="setCategory"/>
    </section>
  </main>
</template>

<style>
.v-articles {
  margin: 0 auto auto;
  flex-basis: 100%;
  flex-shrink: 1;
  min-height: -webkit-fit-content;
  min-height: -moz-fit-content;
  min-height: fit-content;
  width: 100%;
  padding: 0 !important;
  flex-flow: column
}

.v-articles.mobile, .v-articles > h1 {
  margin: 0
}

.v-articles > .selected-category {
  margin: 0 10px;
  color: #1a1a1a;
  display: flex;
  font-weight: 600;
  font-size: 14px;
  align-items: center
}

.v-articles > .selected-category > .icon {
  background-color: #1a1a1a
}

.v-articles > .c-bottom-bar ul > li li div {
  display: flex !important;
  align-items: center
}

.v-articles > .c-bottom-bar ul > li li div:before {
  display: block;
  content: ".";
  font-size: 20px;
  line-height: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  font-weight: 500 !important
}

.v-articles > .c-bottom-bar .c-checkbox .check-mark {
  margin-right: 5px;
  border: 1px solid #4960df;
  width: 17px;
  height: 17px
}

.v-articles > .c-bottom-bar .c-checkbox .check-mark:after, .v-articles > .c-bottom-bar .c-checkbox .check-mark:before {
  width: 17px;
  height: 17px
}

.v-articles > .c-bottom-bar .radio {
  width: 18px;
  height: 18px;
  margin-right: 4px
}

.v-articles > .c-bottom-bar .radio:after {
  width: 9px;
  height: 9px;
  left: 4.5px;
  top: 4.5px
}

.v-articles > .c-bottom-bar ul {
  list-style: none;
  padding: 0;
  margin: 0
}

.v-articles > .c-bottom-bar ul .c-checkbox, .v-articles > .c-bottom-bar ul .c-radio-button {
  margin-left: auto
}

.v-articles > .c-bottom-bar ul .tree-item {
  transition: background-color .2s
}

.v-articles > .c-bottom-bar ul .nuxt-link-exact-active, .v-articles > .c-bottom-bar ul .tree-item-active, .v-articles > .c-bottom-bar ul .tree-item {
  color: #1a1a1a;
  display: inline-flex;
  font-size: 14px;
  padding: 6px 0 6px 16px;
  width: -webkit-fill-available;
  width: -moz-available;
  align-items: center
}

.v-articles > .c-bottom-bar ul .nuxt-link-exact-active, .v-articles > .c-bottom-bar ul .tree-item-active {
  font-weight: 500
}

.v-articles > .c-bottom-bar ul .active-parent {
  background-color: none;
  border: none;
  font-weight: 500
}

.v-articles > section {
  display: flex
}

.v-articles > section > aside {
  text-align: left;
  min-width: 290px;
  width: 315px;
  position: relative;
  flex-shrink: 1;
  border-right: 1px solid #e7e7ea
}

.v-articles > section > aside > .accordion {
  position: sticky;
  top: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: column
}

.v-articles > section > aside > .accordion.article-page {
  height: 79vh
}

.v-articles > section > aside > .accordion > :first-child {
  padding-top: 20px
}

.v-articles > section > aside > .accordion > ul > li li > a {
  display: flex !important;
  align-items: center
}

.v-articles > section > aside > .accordion > ul > li li > a:before {
  display: block;
  content: ".";
  font-size: 20px;
  line-height: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  font-weight: 500 !important
}

.v-articles > section > aside > .accordion ul {
  list-style: none;
  padding: 0;
  margin: 0
}

.v-articles > section > aside > .accordion .tree-item {
  color: #1a1a1a;
  display: inline-block;
  transition: background-color .2s;
  font-size: 14px;
  padding: 6px 16px;
  width: -webkit-fill-available;
  width: -moz-available
}

.v-articles > section > aside > .accordion .tree-item:hover {
  background-color: #f7f8fc
}

.v-articles > section > aside > .accordion .nuxt-link-exact-active, .v-articles > section > aside > .accordion .tree-item-active {
  font-size: 14px;
  padding: 6px 16px;
  display: inline-block;
  border-right: 1px solid;
  border-color: #3f51b5;
  background-color: #f7f8fc;
  color: #1a1a1a;
  width: -webkit-fill-available;
  width: -moz-available;
  margin-right: -1px;
  font-weight: 500
}

.v-articles > section > aside > .accordion .active-parent {
  background-color: none;
  border: none;
  font-weight: 500
}

.v-articles > section > aside > .accordion > .last-articles {
  position: sticky;
  display: flex;
  flex-direction: column;
  max-width: 315px;
  width: 100%
}

.v-articles > section > aside > .accordion > .last-articles > span {
  font-size: 14px;
  color: #1a1a1a;
  margin-bottom: 10px
}

.v-articles > section > aside > .accordion > .last-articles > div > a {
  display: flex;
  margin-bottom: 15px
}

.v-articles > section > aside > .accordion > .last-articles > div > a > .image {
  width: 100px;
  min-width: 100px;
  height: 100px;
  border-radius: 5px;
  background-position: 50% 50%;
  background-size: cover
}

.v-articles > section > aside > .accordion > .last-articles > div > a > .info {
  display: flex;
  flex-direction: column;
  margin-left: 15px
}

.v-articles > section > aside > .accordion > .last-articles > div > a > .info > .name {
  font-weight: 600;
  font-size: 14px;
  color: #1a1a1a;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  flex-shrink: 0;
  text-overflow: ellipsis;
  max-width: 170px;
  margin-bottom: 15px
}

.v-articles > section > aside > .accordion > .last-articles > div > a > .info > .read {
  font-weight: 600;
  font-size: 12px;
  color: #3f51b5;
  display: flex;
  align-items: center
}

.v-articles > section > aside > .accordion > .last-articles > div > a:hover > .info > .read {
  color: #4659c4
}

.v-articles > section > aside > .accordion > .last-articles > div > a:hover > .info > .read > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.v-articles > section > aside > .accordion > .last-articles > div > a:hover > .info > .read > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.v-articles > section > .failed-getting {
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center
}

@media screen and (max-width: 850px) {
  .v-articles {
    margin: 0;
    flex-flow: column
  }

  .v-articles section {
    display: block
  }

  .v-articles section > aside {
    display: none
  }
}

@media screen and (max-width: 600px) {
  .v-articles > .selected-category {
    margin: 0 10px 10px
  }

  .v-articles > h1 {
    margin: 10px;
    font-size: 20px;
    font-weight: 600
  }
}

@-webkit-keyframes menu-in {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes menu-in {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@-webkit-keyframes menu-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@keyframes menu-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

</style>