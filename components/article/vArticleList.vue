<script lang="ts" setup>
const props = defineProps({
  categoryName: {
    type: String
  },
  sectionName: {
    type: String
  },
  category: {
    type: Object
  },
  categories: {
    type: Array,
    default: function () {
      return []
    }
  }
})
const route = useRoute()
const articlesStore = useArticlesStore()
const appStore = useAppStore()
const emit = defineEmits(["category-set"])

const categoryIDs = ref(<any>[])
const isFailedGettingArticles = ref(!1)
const isLoadingCategories = ref(!0)
const isLocalLoading = ref(!1)
const isRequest = ref(!1)
const limit = ref(10)
const offset = ref(0)
const totalCount = ref(0)

const isShowLoadMoreButton = computed(() => {
  return !isLocalLoading.value && !isEmpty.value && articles.value.length < totalCount.value
})
const articles = computed(() => {
  return articlesStore.list
})
const isEmpty = computed(() => {
  return !isLocalLoading.value && articles.value.length < 1 && !isLoadingCategories.value
})
const isGlobalLoading = computed(() => {
  return appStore.getIsLoading
})
const isLoading = computed(() => {
  return isLocalLoading.value && !isGlobalLoading.value
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const params = computed(() => {
  return appStore.params
})
const preparedArticles = computed(() => {
  return void 0 === props.categories ? [] : articles.value.map((a: any) => {
    let e, t, r, n = (null !== (e = props.categories) && void 0 !== e ? e : []).find((t: any) => {
          return t.ID === a.categoryID
        }),
        o = {
          ...a,
          route: {
            name: "Article",
            params: {
              ID: "".concat(a.ID),
              slug: a.slug,
              sectionName: null !== (t = getRootParentSlug(n?.parentID)) && void 0 !== t ? t : n?.slug,
              categoryName: void 0 !== n?.parentID ? n?.slug : void 0
            }
          }
        };
    return void 0 !== n && void 0 !== n?.parentID && 400 !== a.ID && ((null === (r = o.route) || void 0 === r ? void 0 : r.params).categoryName = n.slug), o
  })
})

await Promise.all([setCategory(), getArticles()])

watch(() => articles.value, (value) => {
  offset.value = value.length
})
watch(() => props.category, (value) => {
  void 0 !== value && articles.value.length < 1 && (getArticles(), getTotalCount())
})
watch(() => route.path, () => {
  // articlesStore.COMMIT_ARTICLES_GET({
  //   listName: "list",
  //   list: []
  // })
  setCategory()
})

onMounted(() => {
  setCategory()
  getTotalCount()
  // getArticles()
})

onServerPrefetch(() => {
  // return
})

onBeforeUnmount(() => {
  // articlesStore.COMMIT_ARTICLES_GET({
  //   listName: "list",
  //   list: []
  // })
})


function getRootParentSlug(t: any) {
  var e, r = (null !== (e = props.categories) && void 0 !== e ? e : []).find((e: any) => {
    return e.ID === t
  });
  if (void 0 !== r) {
    if (void 0 === r?.parentID) return r?.slug;
    let n: any = getRootParentSlug(r?.parentID);
    return n === t ? void 0 : n
  }
}

function formattedCreationTime(s: any) {
  let t = uToDate(s);
  return void 0 !== t ? uFormat(t, "d.m.Y") : "Не известно"
}

function getArticles(t?: any) {
  if (void 0 !== props.category) {
    t || (isLocalLoading.value = !0), categoryIDs.value = (props.categories ? props.categories : []).reduce((t: any, e: any) => {
      let n;
      return e.parentID === (null === (n = props.category) || void 0 === n ? void 0 : n.ID) && t.push(e.ID), t
    }, []), categoryIDs.value.includes(props.category.ID) || categoryIDs.value.push(props.category.ID), isRequest.value = !0;
    let n = {
          filter: "categoryID={".concat(categoryIDs.value.join(), "}[") + offset.value + ":" + limit.value + "]",
          needToLoad: t,
          listName: "list"
        },
        o = articlesStore.ARTICLES_GET(n);
    return o.then(() => {
      isFailedGettingArticles.value = !1
    }).catch((t) => {
      isLocalLoading.value = !1
      isFailedGettingArticles.value = !0
      useNotificationsStore().NOTIFICATIONS_UPD({
        title: "Произошла ошибка",
        desc: t,
        status: "error"
      })
    }).finally(() => {
      t || (isLocalLoading.value = !1), isRequest.value = !1
    }), o
  }
}

function getTotalCount() {
  if (void 0 !== props.category) {
    categoryIDs.value = (props.categories ? props.categories : []).reduce((t: any, r: any) => {
      var n;
      return r.parentID === (null === (n = props.category) || void 0 === n ? void 0 : n.ID) && t.push(r.ID), t
    }, [])
    categoryIDs.value.includes(props.category.ID) || categoryIDs.value.push(props.category.ID);
    let r = useNuxtApp().$api.articles.get("categoryID={".concat(categoryIDs.value.join(), "}"), ["ID"]);
    return r.then((a: any) => {
      totalCount.value = (null != a ? a : []).length
    }).catch((t) => {
      console.log(t)
    }), r
  }
}

function setCategory() {
  emit("category-set")
  isLoadingCategories.value = !1
  totalCount.value = 0
}

let o = ""
let c = "".concat(params.value.siteURL, "/").concat(void 0 !== route.params.categoryName ? route.params.sectionName + "/" : "").concat(props.category?.slug);
switch (props.category?.slug) {
  case "blog":
    o = "Блог аптечной сети «Cosmetic | Yanco». Советы, полезные статьи, лайфхаки и многое другое.";
    break;
  case "news":
    o = "Актуальные новости аптечной сети «Cosmetic | Yanco».";
    break;
  case "intresting-and-useful":
    o = "Интересные и полезные статьи в блоге аптеки «Cosmetic | Yanco».";
    break;
  case "mom-and-child":
    o = "Полезные статьи на тему материнства. Будут полезны для мам и их детей."
}
let titleHead = "".concat(props.category?.title, " — Cosmetic | Yanco")
let descHead = o
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: params.value.siteURL + route.path,
    },
  ],
}))
useSeoMeta({
  title: titleHead,
  description: descHead,
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://cosmetic.yanco.ru/img/cosmetic_logo.png',
  ogTitle: titleHead,
  ogDescription: descHead
})
</script>

<template>
  <section :class='["v-article-list flex-vertical-nowrap", { mobile: isMobile }]'>
    <UiCSpinner v-show="isLoading" :is-mobile="isMobile" position="absolute" size="m"/>
    <div v-show="!isLoading && !isFailedGettingArticles && isEmpty" class="is-empty">
      <p>К сожалению, раздел, который Вы запрашиваете, пуст...</p>
      <NuxtLink :to='{ name: "index" }'>Перейти на главную</NuxtLink>
    </div>

    <div v-show="!isLoading && !isFailedGettingArticles && !isEmpty" class="articles flex-vertical">
      <NuxtLink v-for="(a,i) in preparedArticles" :key="i" :to="a.route">
        <img :src="a.image" :alt="a.title" width="100%" height="100%">
        <div class="flex-vertical-nowrap">
          <span>{{ a.title }}</span>
          <div class="description">
            {{ a.description }}
          </div>
          <div class="meta-info">
            <div>
              <span>
                <span class="icon calendar2"/>
                {{ formattedCreationTime(a.creationTime) }}
              </span>
              <span>
                <span class="icon clock2"/>
                {{ a.readingTime }} мин. чтения
              </span>
            </div>
            <div>
              <template v-if="a.views > 0">
                  <span>
                    <span class="icon eye-open2"/>
                    {{ a.views }}
                  </span>
              </template>
              <template v-if="a.commentsCount > 0">
                  <span>
                    <span class="icon comment2"/>
                    {{ a.commentsCount }}
                  </span>
              </template>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
    <UiCButton v-show="isShowLoadMoreButton" :disabled="isRequest" :is-loading="isRequest" @click="getArticles(!0)">
      Показать еще
    </UiCButton>
  </section>
</template>

<style scoped>
.v-article-list {
  width: 100%;
  flex-shrink: 1;
  margin-left: 20px;
  position: relative;
  min-height: 60vh
}

.v-article-list.mobile {
  margin-bottom: 30px
}

.v-article-list.mobile > .c-button {
  width: 100%;
  max-width: unset;
  margin-top: 10px
}

.v-article-list > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-article-list > .is-empty {
  margin: auto;
  text-align: center
}

.v-article-list > .c-button {
  margin: auto
}

.v-article-list > .articles {
  min-height: 200px;
  width: 97%;
  margin: 0
}

.v-article-list > .articles > a {
  display: flex;
  height: 150px;
  text-align: left;
  margin-bottom: 30px;
  border-bottom: 1px solid #d6d6e1
}

.v-article-list > .articles > a > img {
  max-height: 129px;
  max-width: 230px;
  border-radius: 5px
}

.v-article-list > .articles > a > div {
  margin-left: 20px;
  flex-basis: 100%;
  flex-shrink: 1;
  overflow: hidden
}

.v-article-list > .articles > a > div > span {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1a1a1a;
  max-width: 100%;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1
}

.v-article-list > .articles > a > div > span:hover {
  color: #3f51b5
}

.v-article-list > .articles > a > div > .description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #1a1a1a;
  overflow: hidden;
  text-align: justify;
  flex-shrink: 0;
  height: 45px;
  text-overflow: ellipsis;
  max-width: 755px;
  margin-bottom: 15px
}

.v-article-list > .articles > a > div > .meta-info {
  display: flex;
  justify-content: space-between
}

.v-article-list > .articles > a > div > .meta-info > div {
  display: flex;
  align-items: center
}

.v-article-list > .articles > a > div > .meta-info > div > span {
  display: flex;
  font-size: 14px;
  color: #818ca9;
  align-items: center;
  margin-right: 10px
}

.v-article-list > .articles > a > div > .meta-info > div > span > .icon {
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  margin-bottom: 2px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #818ca9;
  margin-right: 7px
}

.v-article-list > .articles > a > div > .meta-info > div > span > .icon.eye-open2 {
  -webkit-mask-size: 88%;
  mask-size: 88%;
  width: 23px;
  height: 15px
}

@media screen and (max-width: 850px) {
  .v-article-list {
    margin: 0 10px;
    width: unset
  }

  .v-article-list > .articles {
    margin: unset;
    width: unset
  }
}

@media screen and (max-width: 600px) {
  .v-article-list > button {
    margin: 10px 0
  }

  .v-article-list > .articles {
    align-self: center;
    margin: unset;
    flex-flow: wrap;
    justify-content: center
  }

  .v-article-list > .articles > a {
    height: unset;
    flex-flow: column;
    max-width: 400px;
    margin: 15px 0
  }

  .v-article-list > .articles > a > img {
    max-height: 225px;
    max-width: unset
  }

  .v-article-list > .articles > a > div {
    margin: 10px 0
  }

  .v-article-list > .articles > a > div > span {
    -webkit-line-clamp: 2;
    font-size: 20px;
    margin-bottom: 6px
  }

  .v-article-list > .articles > a > div > .description {
    text-align: unset;
    font-size: 13px;
    height: 43px
  }

  .v-article-list > .articles > a > div > .meta-info > div > span {
    font-size: 12px
  }

  .v-article-list > .articles > a > div > .meta-info > div > span > .icon {
    width: 16px;
    height: 16px
  }

  .v-article-list > .articles > a > div > .meta-info > div > span > .icon.eye-open2 {
    width: 15px;
    height: 12px;
    -webkit-mask-size: 100%;
    mask-size: 100%
  }
}

</style>