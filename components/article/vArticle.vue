<script lang="ts" setup>
const props = defineProps({
  ID: {
    type: String
  },
  slug: {
    type: String
  },
  categories: {
    type: Array,
    default: function () {
      return []
    }
  }
})
const emit = defineEmits(["category-set"])
const articlesStore = useArticlesStore()
const appStore = useAppStore()
const route = useRoute()

const isFailedGettingArticle = ref(!1)
const isLocalLoading = ref(!0)
const markup = ref(void 0)
const articleData = ref(<any>undefined)
const A = ref(articlesStore.categories)
const notFound = ref(!1)

if (A.value.length < 1) {
  await articlesStore.ARTICLES_GET_CATEGORIES().then((t: any) => {
    A.value = t
  })
}

await articlesStore.ARTICLES_GET_MARKUP({
  ID: props.ID
}).then(() => {
  markup.value = articlesStore.markup
})

await articlesStore.ARTICLES_GET({
  ID: route.params.ID,
  slug: route.params.slug,
  listName: "article"
}).then((a: any) => {
  // var t, e, n;
  // notFound.value = void 0 === route.params.categoryName ? route.params.sectionName !== (null === (t = null == A.value ? void 0 : A.value.find((t: any) => {
  //   return t.ID === a.categoryID
  // })) || void 0 === t ? void 0 : t.slug) : route.params.sectionName !== (null === (e = null == A.value ? void 0 : A.value.find((t: any) => {
  //   var e;
  //   return t.ID === (null === (e = null == A.value ? void 0 : A.value.find((t: any) => {
  //     return t.ID === a.categoryID
  //   })) || void 0 === e ? void 0 : e.parentID)
  // })) || void 0 === e ? void 0 : e.slug) || route.params.categoryName !== (null === (n = null == A.value ? void 0 : A.value.find((t: any) => {
  //   return t.ID === a.categoryID
  // })) || void 0 === n ? void 0 : n.slug)
  articleData.value = a
}).catch((t) => {
  notFound.value = "string" != typeof t && 404 === t.code, isFailedGettingArticle.value = !0, notFound.value || useNotificationsStore().NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}).finally(() => {
  isLocalLoading.value = !1
})

if (notFound.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}
// const markup = ref(P)
// const isFailedGettingArticle = ref(I)
// const isLocalLoading = ref(k)

const articleRef = ref(<any>undefined)
const comment = ref("")
const isSendingComment = ref(!1)
const isErrorComment = ref(!1)
const comments = ref([])
const mapTimes = ref({})
const loadingBasketProductIDs = ref([])
const loadingFavoritesProductIDs = ref([])
const updatingBasketProductIDs = ref([])
const isMounted = ref(!1)
const isDeletion = ref(!1)
const deletingCommentID = ref(0)
const PREPARED_PRODUCTS_FIELDS = ref(["isInBasket", "isInFavorites"])

const shareLinks = computed(() => {
  var image = article.value.image,
      title = article.value.title,
      t = "".concat(params.value.siteURL).concat(route.path);
  return [{
    name: "Вконтакте",
    icon: "vk",
    link: "https://vk.com/share.php?image=".concat(image, "&title=").concat(title, "&url=").concat(t)
  }, {
    name: "Twitter",
    icon: "twitter",
    link: "https://twitter.com/intent/tweet?url=".concat(t)
  }, {
    name: "Одноклассники",
    icon: "ok",
    link: "https://connect.ok.ru/offer?url=".concat(t, "&title=").concat(title, "&imageUrl=").concat(image)
  }, {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://api.whatsapp.com/send?text=".concat(t)
  }, {
    name: "Telegram",
    icon: "telegram",
    link: "https://telegram.me/share/url?url=".concat(t, "&text=").concat(title)
  }]
})
const productTypes = computed(() => {
  return catalog.value.types
})
const productSubtypes = computed(() => {
  return catalog.value.subtypes
})
const catalog = computed(() => {
  return useCatalogStore().catalog
})
const productCategories = computed(() => {
  return catalog.value.categories
})
const hasLoyalCard = computed(() => {
  return useMeStore().hasLoyalCard
})
const favoritesItems = computed(() => {
  return useFavoritesStore().items
})
const basketItems = computed(() => {
  return useBasketStore().items
})
const hasProducts = computed(() => {
  return (products.value ? products.value : []).length > 0
})
const city = computed(() => {
  return useCitiesStore().currentCity
})
const hasComments = computed(() => {
  return comments.value.length > 0
})
const me = computed(() => {
  return useMeStore().me
})
const isAuthorized = computed(() => {
  return useSessionsStore().isAuthorized
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
const article = computed(() => {
  return articlesStore.article
})
const products = computed(() => {
  return articlesStore.products
})
const lastArticles = computed(() => {
  return articlesStore.preparedLastArticles
})

onMounted(() => {
  isMounted.value = !0
  // getComments()
  // articleRef.value.addEventListener("copy", copyText)
})

function closeDeletingComment() {

}
</script>

<template>
  <section ref="articleRef" :class='["v-article", { loading: isLoading, mobile: isMobile }]'>
    <section class="article">
      <template v-if="isMounted">
        <UiCBottomBar v-if="isMobile" :is-opened="isDeletion" title="Вы уверены?..." @close="closeDeletingComment">

        </UiCBottomBar>
        <UiCModalWindow v-else :is-opened="isDeletion" :is-mobile="isMobile" @close="closeDeletingComment">

        </UiCModalWindow>
      </template>
      <UiCSpinner v-if="isLoading" :is-mobile="isMobile" hideOverlay position="absolute" size="m"/>

      <h1>{{ article.title }}</h1>

      <div class="meta-info">
        <div>
          <span>
            <span class="icon calendar2"/>
            <!--            {{ formattedCreationTime(article.creationTime)}}-->
          </span>
          <span>
            <span class="icon clock2"/>
            {{ article.readingTime + " мин. чтения" }}
          </span>
        </div>
        <div>
          <span v-if="article.views > 0">
            <span class="icon eye-open2"/>
            {{ article.views }}
          </span>
          <span v-if="article.commentsCount > 0">
            <span class="icon comment2"/>
            {{ article.commentsCount }}
          </span>
        </div>
      </div>

      <section class="content" v-html="$mdRenderer.render(article.content || '')"/>
    </section>
  </section>
</template>

<style scoped>
.v-article {
  position: relative;
  margin: 0 20px 20px;
  display: flex
}

.v-article.mobile {
  display: block
}

.v-article.loading {
  margin: auto
}

.v-article > aside {
  margin-left: 10px
}

.v-article > aside > div {
  position: sticky;
  top: 70px
}

.v-article > aside > div > span {
  font-size: 14px;
  color: #1a1a1a
}

.v-article > aside > div > ul {
  padding: 0;
  list-style: none
}

.v-article > aside > div > ul > li {
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: auto
}

.v-article > aside > div > ul > li:not(:last-of-type) {
  margin-bottom: 15px
}

.v-article > aside > div > ul > li > .icon {
  width: 30px;
  height: 30px;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  transition: .3s
}

.v-article > aside > div > ul > li > .icon:active.vk, .v-article > aside > div > ul > li > .icon:hover.vk {
  background-color: #2787f5
}

.v-article > aside > div > ul > li > .icon:active.facebook, .v-article > aside > div > ul > li > .icon:hover.facebook {
  background-color: #3b5998
}

.v-article > aside > div > ul > li > .icon:active.ok, .v-article > aside > div > ul > li > .icon:hover.ok {
  background-color: #f7931e
}

.v-article > aside > div > ul > li > .icon:active.whatsapp, .v-article > aside > div > ul > li > .icon:hover.whatsapp {
  background-color: #25d366
}

.v-article > aside > div > ul > li > .icon:active.telegram, .v-article > aside > div > ul > li > .icon:active.twitter, .v-article > aside > div > ul > li > .icon:hover.telegram, .v-article > aside > div > ul > li > .icon:hover.twitter {
  background-color: #4ea4f6
}

.v-article > .article > h1 {
  font-weight: 600;
  font-size: 30px
}

.v-article > .article > .c-modal-window .deleting {
  width: 370px
}

.v-article > .article > .c-modal-window .deleting > span {
  font-weight: 600;
  font-size: 24px
}

.v-article > .article > .c-modal-window .deleting > p {
  font-size: 14px;
  font-weight: 400
}

.v-article > .article > .c-modal-window .deleting > div {
  display: flex;
  justify-content: space-between
}

.v-article > .article > .c-modal-window .deleting > div > .c-button {
  max-width: 177px
}

.v-article > .article > .c-bottom-bar .deleting > p {
  font-size: 14px;
  font-weight: 400;
  margin-top: 0
}

.v-article > .article > .c-bottom-bar .deleting > div {
  display: flex;
  justify-content: space-between
}

.v-article > .article > .c-bottom-bar .deleting > div > .c-button {
  max-width: 160px
}

.v-article > .article > .meta-info {
  margin: 10px 0;
  display: flex;
  justify-content: space-between
}

.v-article > .article > .meta-info > div {
  display: flex;
  align-items: center
}

.v-article > .article > .meta-info > div > span {
  display: flex;
  font-size: 14px;
  color: #818ca9;
  align-items: center;
  margin-right: 10px
}

.v-article > .article > .meta-info > div > span > .icon {
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  margin-bottom: 2px;
  background-color: #818ca9;
  margin-right: 7px
}

.v-article > .article > .meta-info > div > span > .icon.eye-open2 {
  width: 23px;
  height: 16px
}

.v-article > .article > h1, .v-article > .article > section {
  margin: 0 !important
}

.v-article > .article > h1 > table, .v-article > .article > section > table {
  border-collapse: collapse;
  width: 100%
}

.v-article > .article > h1 > table td, .v-article > .article > h1 > table th, .v-article > .article > section > table td, .v-article > .article > section > table th {
  border: 1px solid #000;
  padding: 5px
}

.v-article > .article > h1 a, .v-article > .article > section a {
  color: #3f51b5
}

.v-article > .article > h1 a:hover, .v-article > .article > section a:hover {
  color: #4960df
}

.v-article > .article > h1 a:active, .v-article > .article > section a:active {
  color: #32408f
}

.v-article > .article > :deep(.content) {
  font-size: 18px;
  line-height: 28px
}

.v-article > .article > :deep(.content) img {
  max-width: 100%;
  display: flex;
  margin: auto
}

.v-article > .article > .failed-getting {
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-article > .article > .products {
  padding: 0;
  max-width: 912px
}

.v-article > .article > .products > .top {
  margin-bottom: 20px
}

.v-article > .article > .last-articles > p {
  font-weight: 600;
  font-size: 20px;
  margin: 10px 0
}

.v-article > .article > .last-articles > .article-carousel {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  background-color: #fff;
  margin: 0
}

.v-article > .article > .last-articles > .article-carousel > .list {
  display: flex;
  flex-flow: row nowrap;
  padding: 0;
  margin: 0
}

.v-article > .article > .last-articles > .article-carousel > .list > a {
  display: flex;
  text-align: left;
  height: unset;
  flex-flow: column;
  width: 300px;
  margin: 10px 4px
}

.v-article > .article > .last-articles > .article-carousel > .list > a:first-of-type {
  margin-left: 0
}

.v-article > .article > .last-articles > .article-carousel > .list > a > .image {
  display: flex;
  border-radius: 5px;
  flex-shrink: 0;
  background-size: cover;
  width: 100%;
  height: 170px;
  background-position: 50%
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div {
  margin: 10px 0;
  flex-basis: 100%;
  flex-shrink: 1;
  overflow: hidden
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div > span {
  font-weight: 600;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1a1a1a;
  max-width: 100%;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 16px
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div > .description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: #1a1a1a;
  overflow: hidden;
  flex-shrink: 0;
  text-overflow: ellipsis;
  max-width: 755px;
  margin-bottom: 15px;
  text-align: unset;
  font-size: 13px;
  height: 76px
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div > .meta-info {
  display: flex;
  justify-content: space-between
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div > .meta-info > div {
  display: flex;
  align-items: center
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div > .meta-info > div > span {
  display: flex;
  color: #818ca9;
  align-items: center;
  margin-right: 10px;
  font-size: 12px
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div > .meta-info > div > span > .icon {
  width: 16px;
  height: 16px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  margin-bottom: 2px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #818ca9
}

.v-article > .article > .last-articles > .article-carousel > .list > a > div > .meta-info > div > span > .icon.eye-open2 {
  width: 15px;
  height: 12px;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-article > .article > .share-links {
  margin: 20px 0;
  padding: 15px 0;
  border-top: 1px solid #d6d6e1;
  border-bottom: 1px solid #d6d6e1
}

.v-article > .article > .share-links > span {
  font-weight: 500;
  font-size: 14px;
  color: #1a1a1a
}

.v-article > .article > .share-links > ul {
  display: flex;
  margin: 10px 0 0;
  padding: 0;
  list-style: none
}

.v-article > .article > .share-links > ul > li:not(:last-of-type) {
  margin-right: 10px
}

.v-article > .article > .share-links > ul > li > .icon {
  background-color: #818ca9
}

.v-article > .article > .share-links > ul > li > .icon:active.vk, .v-article > .article > .share-links > ul > li > .icon:hover.vk {
  background-color: #2787f5
}

.v-article > .article > .share-links > ul > li > .icon:active.facebook, .v-article > .article > .share-links > ul > li > .icon:hover.facebook {
  background-color: #3b5998
}

.v-article > .article > .share-links > ul > li > .icon:active.ok, .v-article > .article > .share-links > ul > li > .icon:hover.ok {
  background-color: #f7931e
}

.v-article > .article > .share-links > ul > li > .icon:active.whatsapp, .v-article > .article > .share-links > ul > li > .icon:hover.whatsapp {
  background-color: #25d366
}

.v-article > .article > .share-links > ul > li > .icon:active.telegram, .v-article > .article > .share-links > ul > li > .icon:active.twitter, .v-article > .article > .share-links > ul > li > .icon:hover.telegram, .v-article > .article > .share-links > ul > li > .icon:hover.twitter {
  background-color: #4ea4f6
}

.v-article > .article > .add-comment > span {
  font-size: 18px
}

.v-article > .article > .add-comment > .c-edit {
  width: 100%;
  margin: 15px 0
}

.v-article > .article > .add-comment > .c-edit textarea {
  width: 100%;
  height: 70px;
  resize: none
}

.v-article > .article > .add-comment > .c-button .icon {
  width: 20px;
  height: 20px;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-article > .article > .no-authorized {
  text-align: center;
  margin-top: 20px
}

.v-article > .article > .no-authorized > span > span {
  color: #3f51b5;
  cursor: pointer;
  display: inline-block
}

.v-article > .article > .no-authorized > span > span:hover {
  color: #4960df
}

.v-article > .article > .no-authorized > span > span:active {
  color: #32408f
}

.v-article > .article > .comments {
  padding: 0;
  margin: 20px 0 0;
  list-style: none
}

.v-article > .article > .comments > li {
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative
}

.v-article > .article > .comments > li:not(:last-of-type) {
  margin-bottom: 20px
}

.v-article > .article > .comments > li > .avatar {
  display: flex;
  min-width: 45px;
  height: 45px;
  color: #fff;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  letter-spacing: 1.5px;
  background-color: #ebf0f9;
  font-size: 20px
}

.v-article > .article > .comments > li > .avatar > span {
  margin-left: 2px
}

.v-article > .article > .comments > li > .info {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 15px;
  margin-top: 12px
}

.v-article > .article > .comments > li > .info > .top {
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center
}

.v-article > .article > .comments > li > .info > .top > .user {
  display: flex;
  align-items: center
}

.v-article > .article > .comments > li > .info > .top > .user > .name {
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a
}

.v-article > .article > .comments > li > .info > .top > .date {
  font-size: 14px;
  color: #818ca9;
  display: flex;
  align-items: center
}

.v-article > .article > .comments > li > .info > .top > .date > .icon {
  width: 20px;
  height: 20px;
  background-color: #818ca9;
  margin-right: 20px;
  cursor: pointer;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-article > .article > .comments > li > .info > .top > .date > .icon.disabled {
  pointer-events: none;
  opacity: .5
}

.v-article > .article > .comments > li > .info > .top > .date > .icon:first-of-type {
  margin-right: 10px
}

.v-article > .article > .comments > li > .info > .top > .date > .icon:hover {
  background-color: #4659c4
}

.v-article > .article > .comments > li > .info > .text {
  font-size: 14px;
  color: #1a1a1a
}

.v-article > .article > .comments > li > .info > .edit-comment {
  display: flex;
  flex-direction: column
}

.v-article > .article > .comments > li > .info > .edit-comment > .c-edit {
  width: 100%
}

.v-article > .article > .comments > li > .info > .edit-comment > .c-edit textarea {
  width: 100%;
  height: 70px;
  resize: none
}

.v-article > .article > .comments > li > .info > .edit-comment > .c-edit textarea::-webkit-scrollbar {
  width: 3px
}

.v-article > .article > .comments > li > .info > .edit-comment > .c-edit textarea::-webkit-scrollbar-track {
  background-color: #ebf0f9
}

.v-article > .article > .comments > li > .info > .edit-comment > .c-edit textarea::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.v-article > .article > .comments > li > .info > .edit-comment > .action {
  display: flex;
  align-items: center;
  justify-content: flex-end
}

.v-article > .article > .comments > li > .info > .edit-comment > .action > .icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: #818ca9
}

.v-article > .article > .comments > li > .info > .edit-comment > .action > .icon:first-of-type {
  margin-right: 5px
}

.v-article > .article > .comments > li > .info > .edit-comment > .action > .icon.checkmark:hover {
  background-color: #19be6b
}

.v-article > .article > .comments > li > .info > .edit-comment > .action > .icon.close:hover {
  background-color: #f36363
}

.v-article > .article > .comments > li > .info > .edit-comment > .action > .icon.disabled {
  background-color: #818ca9;
  opacity: .6;
  pointer-events: none
}

.v-article > .article > .comments > li > .info > .moderation {
  font-size: 14px;
  color: #818ca9
}

@media screen and (max-width: 1345px) {
  .v-article > .article > .products {
    max-width: 682px
  }
}

@media screen and (max-width: 1100px) {
  .v-article > .article > .products {
    max-width: 455px
  }
}

@media screen and (max-width: 850px) {
  .v-article {
    margin: 0 10px 20px
  }

  .v-article > .article > h1 {
    font-size: 20px
  }

  .v-article > .article > .meta-info {
    padding: 15px 0;
    border-top: 1px solid #d6d6e1;
    border-bottom: 1px solid #d6d6e1
  }

  .v-article > .article > .meta-info > div > span {
    font-size: 12px
  }

  .v-article > .article > .meta-info > div > span > .icon {
    width: 16px;
    height: 16px;
    -webkit-mask-size: 100%;
    mask-size: 100%
  }

  .v-article > .article > .meta-info > div > span > .icon.eye-open2 {
    width: 15px;
    height: 12px
  }

  .v-article > .article > .add-comment > span, .v-article > .article > .content {
    font-size: 14px
  }

  .v-article > .article > .add-comment > span > span {
    display: none
  }

  .v-article > .article > .add-comment > .c-edit textarea {
    font-size: 13px
  }

  .v-article > .article > .add-comment > .c-button {
    width: 124px
  }

  .v-article > .article > .comments > li > .info {
    margin-left: 0;
    margin-top: 0
  }

  .v-article > .article > .comments > li > .info > .top {
    margin-bottom: 5px
  }

  .v-article > .article > .comments > li > .info > .top > .user > .avatar {
    min-width: 40px;
    height: 40px;
    font-size: 16px;
    display: flex;
    color: #fff;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    letter-spacing: 1.5px;
    background-color: #ebf0f9;
    margin-right: 10px
  }

  .v-article > .article > .comments > li > .info > .top > .user > .avatar > span {
    margin-left: 2px
  }

  .v-article > .article > .comments > li > .info > .top > .user > .name {
    font-size: 14px
  }

  .v-article > .article > .comments > li > .info > .top > .date {
    font-size: 12px
  }

  .v-article > .article > .comments > li > .info > .top > .date > .icon {
    width: 18px;
    height: 18px
  }

  .v-article > .article > .comments > li > .info > .top > .action {
    font-size: 12px
  }

  .v-article > .article > .comments > li > .info > .text {
    font-size: 13px
  }

  .v-article > .article > .comments > li > .info > .edit-comment {
    display: flex;
    flex-direction: column
  }

  .v-article > .article > .comments > li > .info > .edit-comment > .c-edit textarea, .v-article > .article > .comments > li > .info > .moderation {
    font-size: 13px
  }
}
</style>