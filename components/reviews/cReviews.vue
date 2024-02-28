<script lang="ts" setup>
const props = defineProps({
  inOrder: {
    type: Boolean,
    default: false
  },
  isProductReviews: {
    type: Boolean,
    default: false
  },
  isAuthorized: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isLoadingMoreReviews: {
    type: Boolean,
    default: false
  },
  isLoadingReviewAside: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  me: {
    type: Object
  },
  productID: {
    type: Number
  },
  productName: {
    type: String
  },
  totalCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: <any>Array,
    default: function () {
      return []
    }
  },
  allGrades: {
    type: Array,
    default: function () {
      return []
    }
  },
  isDontShow: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const reviewRef = ref(<any>undefined)
const photosRef = ref(<any>undefined)
const imagesRef = ref(<any>undefined)

const emit = defineEmits(["open-close-sidebar", "review-delete", "get-more-reviews", "go-to-reviews"])

const isResizeReviewBar = ref(false)
const comment = ref("")
const currentImages = ref(<any>[])
const files = ref(<any>[])
const flaws = ref("")
const ID = ref(void 0)
const imageIndex = ref(0)
const fileErrors = ref(<any>[])
const isViewImages = ref(false)
const merits = ref("")
const newImages = ref(<any>[])
const rate = ref(0)
const STARS = ref([5, 4, 3, 2, 1])
const TEXT_LIMIT = ref(5000)
const viewedImages = ref([])
const starsActive = ref(0)
const isMouseDown = ref(false)
const isMouseUp = ref(false)
const isOpenSidebar = ref(false)
const isWriteReviewClicked = ref(false)
const isDrag = ref(false)
const dragCount = ref(0)
const isOpenedExplanation = ref(false)
const isSubmitted = ref(false)

const filteredReviews = computed(() => {
  return props.reviews.filter((t: any) => {
    return t.userID !== (props.me ? props.me?.ID : undefined)
  })
})
const hasFileError = computed(() => {
  return fileErrors.value.length > 0
})
const writeReviewButtonText = computed(() => {
  return "".concat(hasMyReview.value ? "Редактировать" : "Написать", " отзыв")
})
const reviewsSummary = computed(() => {
  let e = <any>{
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }
  props.allGrades.forEach((t: any) => {
    e[t.rate] += 1
  })
  return e
})
const rateWidth = computed(() => {
  return "" + (26 * props.averageRating) + "px"
})
const hasMoreReviews = computed(() => {
  return props.totalCount > props.reviews.length
})
const canUploadImages = computed(() => {
  return currentImages.value.length + newImages.value.length < 5
})
const isNoImages = computed(() => {
  return 0 === currentImages.value.length && 0 === newImages.value.length
})
const hasMyReview = computed(() => {
  return !!myReview.value
})
const hasReviews = computed(() => {
  return (props.reviews ? props.reviews : []).length > 0
})
const meritsLength = computed(() => {
  return merits.value.length
})
const myReview = computed(() => {
  return props.me ? props.reviews.find((t: any) => {
    return t.userID === (props.me?.ID)
  }) : void 0
})
const isNotEmptyMerits = computed(() => {
  return meritsLength.value > 0
})
const flawsLength = computed(() => {
  return flaws.value.length
})
const isNotEmptyFlaws = computed(() => {
  return flawsLength.value > 0
})
const commentLength = computed(() => {
  return comment.value.length
})
const isNotEmptyComment = computed(() => {
  return commentLength.value > 0
})
const isFormValid = computed(() => {
  return rate.value > 0 && rate.value < 6 && meritsLength.value <= TEXT_LIMIT.value && flawsLength.value <= TEXT_LIMIT.value && commentLength.value <= TEXT_LIMIT.value
})
const hasChanges = computed(() => {
  return rate.value !== (myReview.value ? myReview.value?.rate : undefined) || merits.value !== myReview.value?.merits || flaws.value !== (myReview.value?.flaws) || comment.value !== (myReview.value?.comment) || JSON.stringify(currentImages.value) !== JSON.stringify(myReview.value.images) || newImages.value.length > 0
})
const isEdit = computed(() => {
  return void 0 !== myReview.value && myReview.value?.ID === ID.value
})
const buttonCaption = computed(() => {
  return isEdit.value ? "Сохранить" : "Отправить"
})
watch(() => isOpenSidebar.value, (value) => {
  if (props.isMobile) props.inOrder && emit("open-close-sidebar", value);
  else {
    emit("open-close-sidebar", value);
    let t = photosRef.value;
    if (value) {
      t.addEventListener("dragenter", preventDefault, false)
      t.addEventListener("dragleave", preventDefault, false)
      t.addEventListener("dragover", preventDefault, false)
      t.addEventListener("drop", preventDefault, false)
    } else {
      t.removeEventListener("dragenter", preventDefault, false)
      t.removeEventListener("dragleave", preventDefault, false)
      t.removeEventListener("dragover", preventDefault, false)
      t.removeEventListener("drop", preventDefault, false)
    }
  }
})
watch(() => props.isAuthorized, (value) => {
  value && isWriteReviewClicked.value && setTimeout(() => {
    isOpenSidebar.value = true
  }, 500)
})
watch(() => route.path, () => {
  rate.value = 0
  merits.value = ""
  flaws.value = ""
  comment.value = ""
  currentImages.value = []
  newImages.value = []
  fileErrors.value = []
  files.value = []
})
watch(() => props.isLoading, (value) => {
  !value && isSubmitted.value && (isSubmitted.value = false, closeSidebar(), resetForm())

})
watch(() => merits.value, (value) => {
  merits.value = value.replace(/[<>]|lt;|gt;/, "")
})
watch(() => flaws.value, (value) => {
  flaws.value = value.replace(/[<>]|lt;|gt;/, "")
})
watch(() => comment.value, (value) => {
  comment.value = value.replace(/[<>]|lt;|gt;/, "")
})

useListen("reviews-form-open", () => {
  isOpenSidebar.value || writeReview()
})

onMounted(() => {
  //useEvent("reviews-form-open")
})
onUnmounted(() => {
  //
})

function goToReviews() {
  emit("go-to-reviews")
}

function resizeReviewBar(b: any) {
  isResizeReviewBar.value = b
}

function openCloseExplanation() {
  isOpenedExplanation.value = !isOpenedExplanation.value
}

function onDropZone() {
  dragCount.value++
  isDrag.value = true
}

function offDropZone() {
  dragCount.value--
  0 === dragCount.value && (isDrag.value = false)
}

function handleDrop(e: any) {
  let t = e.dataTransfer.files;
  handleFiles(t)
  offDropZone()
}

function handleFiles(e: any) {
  fileErrors.value = [];
  for (let n = ["image/jpeg", "image/png"], r = [], i = 0; i < e.length; i++)
    if (n.includes(e[i].type)) {
      if (e[i].size > 5242880) fileErrors.value.push("Недопустимый размер у файла <b>" + e[i].name + "</b>")
      else if (files.value.push(e[i]), r[i] = new FileReader, r[i].onload = function (e) {
        newImages.value.push("" + e.target?.result)
      }, r[i].readAsDataURL(e[i]), files.value.length > 4) {
        fileErrors.value.push("Можно загрузить только 5 фотографий.");
        break
      }
    } else fileErrors.value.push("Недопустимый формат у файла <b>" + e[i].name + "</b>")
}

function preventDefault(e: any) {
  e.preventDefault()
  e.stopPropagation()
}

function closeSidebar() {
  isOpenSidebar.value = false
}

function writeReview() {
  if (!props.isAuthorized) return openLoginModal(), void (isWriteReviewClicked.value = true);
  hasMyReview.value && edit(), isOpenSidebar.value = true
}

function pluralizeStarCount(e: any) {
  return "" + e + " " + uPluralize(e, ["звезда", "звезды", "звезд"])
}

function getMoreReviews() {
  emit("get-more-reviews")
}

function openLoginModal() {
  new RegExp(["account", "checkout", "login-or-registration"].join("|"), "i").test(route.name ? <string>route.name : "") || useEvent("open-login-or-registration")
}

function starMouseDown(e: any) {
  isMouseDown.value = true
  starsActive.value = e
}

function starMouseUp() {
  isMouseDown.value = false
  isMouseUp.value = true
  setTimeout(() => {
    starsActive.value = 0
    isMouseUp.value = false
  }, 300)
}

function starMouseOut() {
  isMouseDown.value && !isMouseUp.value && (starsActive.value = 0)
}

function cancel() {
  closeSidebar()
  setTimeout(() => {
    resetForm()
  }, 450)
}

function closeViewingImages() {
  isViewImages.value = false
}

function deleteReview(e: any) {
  void 0 === myReview.value || myReview.value.ID !== e && !props.inOrder || (emit("review-delete", myReview.value), props.inOrder && closeSidebar())
}

function edit() {
  ID.value = myReview.value ? myReview.value.ID : undefined
  rate.value = myReview.value.rate ? myReview.value.rate : 0
  merits.value = myReview.value.merits ? myReview.value.merits : ""
  flaws.value = myReview.value.flaws ? myReview.value.flaws : ""
  comment.value = myReview.value.comment ? myReview.value.comment : ""
  currentImages.value = {
    ...(myReview.value.images ? myReview.value.images : [])
  }
}

function imagesOnLoad(e: any) {
  let t = e.target.files;
  handleFiles(t)
}

function isLimit(e: any) {
  return e > TEXT_LIMIT.value
}

function removeImage(i: any, s: any) {
  "newImages" === s ? (newImages.value.splice(i, 1), files.value.splice(i, 1)) : currentImages.value.splice(i, 1), imagesRef.value.value = ""
}

function resetForm() {
  ID.value = void 0
  rate.value = 0
  merits.value = ""
  flaws.value = ""
  comment.value = ""
  files.value = []
  newImages.value = []
}

function setRated(e: any) {
  rate.value = e
}

function submit() {
  // var e, t, n, r, o, l = {
  //       productID: this.productID,
  //       creationTime: new Date,
  //       rate: this.rate,
  //       merits: this.merits,
  //       flaws: this.flaws,
  //       comment: this.comment,
  //       images: this.currentImages,
  //       userID: null === (e = this.me) || void 0 === e ? void 0 : e.ID,
  //       userName: "".concat(null !== (n = null === (t = this.me) || void 0 === t ? void 0 : t.name) && void 0 !== n ? n : "", " ").concat(null !== (o = null === (r = this.me) || void 0 === r ? void 0 : r.sname) && void 0 !== o ? o : "")
  //     },
  //     c = new FormData;
  // if (this.files.length > 0)
  //   for (var i in this.files) c.append("images[]", this.files[i]);
  // void 0 === this.ID ? (c.append("review", JSON.stringify(l)), this.$emit("review-add", c)) : (l.ID = this.ID, c.append("review", JSON.stringify(l)), this.$emit("review-update", c)), this.isSubmitted = true
}

function viewImages(e: any, i: any) {
  isViewImages.value = true
  viewedImages.value = e
  imageIndex.value = i
}
</script>

<template>
  <div ref="reviewRef" :class='["c-reviews", { "in-order": inOrder, mobile: isMobile, "dont-show": isDontShow }]'>
    <template v-if="inOrder && !isDontShow">
      <div v-if="hasReviews && !isEdit" class="review-in-order">
        <h2>Ваш отзыв</h2>
        <span class="stars" :data-tooltip='"Звёзд " + reviews[0].rate + " из 5"'>
          <span class="fill" :style='{ width: 30 * reviews[0].rate + "px" }'/>
        </span>
        <ReviewsCReview v-for="t in reviews" :key="t.ID" :me="me" :review="t" in-order v-on:delete="deleteReview"
                        v-on:edit="edit" v-on:images-view="viewImages"/>
      </div>
    </template>
    <template v-if="!inOrder">
      <section class="reviews">
        <ul v-if="hasReviews || hasMyReview" class="review-list">
          <li v-if="hasMyReview">
            <ReviewsCReview :is-mobile="isMobile" :me="me" :review="myReview" v-on:delete="deleteReview"
                            v-on:edit="edit" v-on:images-view="viewImages"/>
          </li>
          <li v-for="(t,i) in filteredReviews" :key="i" :class='{ show: !!isProductReviews || i < 2 }'>
            <ReviewsCReview v-show='!!isProductReviews || i < 2' :is-mobile="isMobile" :me="me" :review="t"
                            v-on:delete="deleteReview" v-on:edit="edit" v-on:images-view="viewImages"/>
          </li>
        </ul>
        <div v-else class="no-review">
          Поделитесь своим мнением первым.
        </div>

        <aside>
          <section>
            <div>
              <ReviewsCRatingStars :rate-width="rateWidth" :rating="averageRating" :review-count="totalCount"/>
              <div class="average-rating">
                <span v-if="hasReviews">{{ averageRating + " / 5" }}</span>
                <span v-else>Нет оценок</span>
              </div>
            </div>
            <ul v-if="hasReviews">
              <li v-for="(t,i) in Object.keys(reviewsSummary).reverse()" :key="i">
                <div class="name">
                  {{ pluralizeStarCount(t) }}
                </div>
                <div class="rate">
                  <div>
                    <div :style='{ width: reviewsSummary[t] / totalCount * 100 + "%" }'/>
                  </div>
                </div>
                <div class="value">
                  {{ reviewsSummary[t] }}
                </div>
              </li>
            </ul>
            <UiCButton mode="primary" @click="writeReview">
              {{ writeReviewButtonText }}
            </UiCButton>
          </section>
        </aside>
      </section>
    </template>

    <UiCButton v-if="isProductReviews && hasMoreReviews" class="show-more" :is-loading="isLoadingMoreReviews"
               @click="getMoreReviews">
      Показать больше отзывов
    </UiCButton>

    <div v-if="isViewImages">
      cViewImages
    </div>

    <div v-if="!isMobile  && false">
      cSidebar
    </div>

    <div v-if="isMobile && false">
      bar-review c-bottom-bar
    </div>

    <div v-if="isMobile && false">
      c-bottom-bar
    </div>


  </div>
</template>

<style scoped>
.c-reviews {
  position: relative
}

.c-reviews > .loading {
  top: 0;
  left: 0
}

.c-reviews > .review-in-order {
  display: flex;
  flex-flow: column
}

.c-reviews > .review-in-order > .stars {
  position: relative;
  background-color: #c9c9c9;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkuMTAzIDEuMDdhMSAxIDAgMDExLjc5NCAwbDIuMTE1IDQuMjkxYTEgMSAwIDAwLjc1Mi41NDhsNC43MzUuNjkzYTEgMSAwIDAxLjU1MyAxLjcwNWwtMy40MjYgMy4zNDJhMSAxIDAgMDAtLjI4Ny44ODRsLjgwOCA0LjcxOWExIDEgMCAwMS0xLjQ1MiAxLjA1M2wtNC4yMjktMi4yMjdhMSAxIDAgMDAtLjkzMiAwbC00LjIzIDIuMjI3YTEgMSAwIDAxLTEuNDUtMS4wNTNsLjgwNy00LjcxOWExIDEgMCAwMC0uMjg3LS44ODRMLjk0OCA4LjMwN2ExIDEgMCAwMS41NTMtMS43MDVsNC43MzUtLjY5M2ExIDEgMCAwMC43NTItLjU0OEw5LjEwMyAxLjA3eiIgZmlsbD0iI0ZGQ0YyNCIvPjwvc3ZnPg==");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkuMTAzIDEuMDdhMSAxIDAgMDExLjc5NCAwbDIuMTE1IDQuMjkxYTEgMSAwIDAwLjc1Mi41NDhsNC43MzUuNjkzYTEgMSAwIDAxLjU1MyAxLjcwNWwtMy40MjYgMy4zNDJhMSAxIDAgMDAtLjI4Ny44ODRsLjgwOCA0LjcxOWExIDEgMCAwMS0xLjQ1MiAxLjA1M2wtNC4yMjktMi4yMjdhMSAxIDAgMDAtLjkzMiAwbC00LjIzIDIuMjI3YTEgMSAwIDAxLTEuNDUtMS4wNTNsLjgwNy00LjcxOWExIDEgMCAwMC0uMjg3LS44ODRMLjk0OCA4LjMwN2ExIDEgMCAwMS41NTMtMS43MDVsNC43MzUtLjY5M2ExIDEgMCAwMC43NTItLjU0OEw5LjEwMyAxLjA3eiIgZmlsbD0iI0ZGQ0YyNCIvPjwvc3ZnPg==");
  width: 150px;
  height: 30px
}

.c-reviews > .review-in-order > .stars > .fill {
  background-color: #fec71c;
  height: 100%;
  position: absolute
}

.c-reviews > div:not(.review-in-order):not(:last-of-type) {
  margin-bottom: 30px
}

.c-reviews.in-order {
  width: 100%;
  max-width: 400px;
  padding-top: 10px;
  padding-bottom: 20px;
  position: relative
}

.c-reviews.in-order > .loading {
  border-bottom: none;
  left: -55px;
  width: calc(100% + 110px)
}

.c-reviews.in-order.dont-show {
  padding: 0;
  margin: 0
}

.c-reviews.mobile {
  margin-bottom: 15px
}

.c-reviews.mobile > .reviews {
  flex-direction: column-reverse
}

.c-reviews.mobile > .reviews > aside {
  margin-top: unset;
  margin-bottom: 25px
}

.c-reviews.mobile > .reviews > aside > section > .c-button {
  font-size: 11px
}

.c-reviews.mobile > .reviews > .review-list {
  margin-bottom: 0
}

.c-reviews > .reviews {
  display: flex
}

.c-reviews > .reviews > .review-list {
  padding: 0;
  list-style: none;
  max-width: 850px;
  width: 100%;
  margin: 0 15px 0 0
}

.c-reviews > .reviews > .review-list > .show {
  margin-top: 50px
}

.c-reviews > .reviews > .review-list > .show:first-of-type {
  margin-top: 0
}

.c-reviews > .reviews > .review-list > li > .c-button {
  max-width: unset;
  width: 100%;
  height: 48px
}

.c-reviews > .reviews > .no-review {
  font-size: 18px
}

.c-reviews > .reviews > aside {
  max-width: 436px;
  width: 100%;
  margin-top: -70px;
  margin-left: auto;
  flex-shrink: 0
}

.c-reviews > .reviews > aside > section {
  position: sticky;
  top: 172px
}

.c-reviews > .reviews > aside > section > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px
}

.c-reviews > .reviews > aside > section > div > .c-rating-stars .stars {
  width: 130px;
  height: 25px;
  -webkit-mask-size: contain;
  mask-size: contain
}

.c-reviews > .reviews > aside > section > div > .average-rating {
  font-weight: 600;
  font-size: 20px
}

.c-reviews > .reviews > aside > section > ul {
  padding: 0;
  list-style: none;
  width: 100%;
  margin: 0 0 25px
}

.c-reviews > .reviews > aside > section > ul > li {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.c-reviews > .reviews > aside > section > ul > li:not(:last-of-type) {
  margin-bottom: 15px
}

.c-reviews > .reviews > aside > section > ul > li > .name, .c-reviews > .reviews > aside > section > ul > li > .value {
  font-size: 16px
}

.c-reviews > .reviews > aside > section > ul > li > .name {
  min-width: 75px;
  white-space: nowrap
}

.c-reviews > .reviews > aside > section > ul > li > .value {
  min-width: 30px;
  text-align: center
}

.c-reviews > .reviews > aside > section > ul > li > .rate {
  box-sizing: border-box;
  margin: 0 7px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative
}

.c-reviews > .reviews > aside > section > ul > li > .rate > div {
  background: #fff;
  height: 6px;
  border: 1px solid #ebf0f9
}

.c-reviews > .reviews > aside > section > ul > li > .rate > div > div {
  background-color: #ffcf24;
  height: 8px;
  position: absolute;
  top: 0;
  left: 0
}

.c-reviews > .reviews > aside > section > .c-button {
  max-width: unset;
  width: 100%;
  height: 48px
}

.c-reviews > .no-authorized {
  text-align: center;
  margin-top: 20px
}

.c-reviews > .no-authorized > span > span {
  color: #3f51b5;
  cursor: pointer;
  display: inline-block
}

.c-reviews > .no-authorized > span > span:hover {
  color: #4960df
}

.c-reviews > .no-authorized > span > span:active {
  color: #32408f
}

.c-reviews > .show-more {
  margin-top: 25px;
  border: unset;
  max-width: -webkit-fit-content;
  max-width: -moz-fit-content;
  max-width: fit-content
}

.c-reviews > .show-more > .caption {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .065em;
  text-transform: uppercase;
  color: #3f51b5
}

.c-reviews > .show-more.loading {
  margin-left: 50px
}

.c-reviews > .c-bottom-bar .add-review, .c-reviews > .c-sidebar .add-review {
  padding: 30px 34px;
  max-width: 584px;
  box-sizing: border-box;
  height: 100%;
  width: 100%
}

.c-reviews > .c-bottom-bar .add-review > h2, .c-reviews > .c-sidebar .add-review > h2 {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 30px;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between
}

.c-reviews > .c-bottom-bar .add-review > h2 > .c-tooltip-icon .icon, .c-reviews > .c-sidebar .add-review > h2 > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.c-reviews > .c-bottom-bar .add-review > h2 > .c-tooltip-icon .icon:hover, .c-reviews > .c-sidebar .add-review > h2 > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.c-reviews > .c-bottom-bar .add-review > h2 > .c-tooltip-icon .icon:hover > .question2, .c-reviews > .c-sidebar .add-review > h2 > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.c-reviews > .c-bottom-bar .add-review > h2 > .c-tooltip-icon .icon > .question2, .c-reviews > .c-sidebar .add-review > h2 > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.c-reviews > .c-bottom-bar .add-review > h2 > .c-tooltip-icon .text, .c-reviews > .c-sidebar .add-review > h2 > .c-tooltip-icon .text {
  max-width: 250px;
  font-size: 12px;
  font-weight: 400
}

.c-reviews > .c-bottom-bar .add-review > .grade, .c-reviews > .c-sidebar .add-review > .grade {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px
}

.c-reviews > .c-bottom-bar .add-review > .grade > .name, .c-reviews > .c-sidebar .add-review > .grade > .name {
  font-weight: 600;
  font-size: 14px
}

.c-reviews > .c-bottom-bar .add-review > .grade > .name > .note, .c-reviews > .c-sidebar .add-review > .grade > .name > .note {
  color: #ff7a00
}

.c-reviews > .c-bottom-bar .add-review > .grade > .stars, .c-reviews > .c-sidebar .add-review > .grade > .stars {
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: flex-end;
  -webkit-tap-highlight-color: transparent
}

.c-reviews > .c-bottom-bar .add-review > .grade > .stars > .star, .c-reviews > .c-sidebar .add-review > .grade > .stars > .star {
  height: 29px;
  width: 30px;
  display: flex;
  background-color: #e7e7ea;
  cursor: pointer;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkuMTAzIDEuMDdhMSAxIDAgMDExLjc5NCAwbDIuMTE1IDQuMjkxYTEgMSAwIDAwLjc1Mi41NDhsNC43MzUuNjkzYTEgMSAwIDAxLjU1MyAxLjcwNWwtMy40MjYgMy4zNDJhMSAxIDAgMDAtLjI4Ny44ODRsLjgwOCA0LjcxOWExIDEgMCAwMS0xLjQ1MiAxLjA1M2wtNC4yMjktMi4yMjdhMSAxIDAgMDAtLjkzMiAwbC00LjIzIDIuMjI3YTEgMSAwIDAxLTEuNDUtMS4wNTNsLjgwNy00LjcxOWExIDEgMCAwMC0uMjg3LS44ODRMLjk0OCA4LjMwN2ExIDEgMCAwMS41NTMtMS43MDVsNC43MzUtLjY5M2ExIDEgMCAwMC43NTItLjU0OEw5LjEwMyAxLjA3eiIgZmlsbD0iI0ZGQ0YyNCIvPjwvc3ZnPg==");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkuMTAzIDEuMDdhMSAxIDAgMDExLjc5NCAwbDIuMTE1IDQuMjkxYTEgMSAwIDAwLjc1Mi41NDhsNC43MzUuNjkzYTEgMSAwIDAxLjU1MyAxLjcwNWwtMy40MjYgMy4zNDJhMSAxIDAgMDAtLjI4Ny44ODRsLjgwOCA0LjcxOWExIDEgMCAwMS0xLjQ1MiAxLjA1M2wtNC4yMjktMi4yMjdhMSAxIDAgMDAtLjkzMiAwbC00LjIzIDIuMjI3YTEgMSAwIDAxLTEuNDUtMS4wNTNsLjgwNy00LjcxOWExIDEgMCAwMC0uMjg3LS44ODRMLjk0OCA4LjMwN2ExIDEgMCAwMS41NTMtMS43MDVsNC43MzUtLjY5M2ExIDEgMCAwMC43NTItLjU0OEw5LjEwMyAxLjA3eiIgZmlsbD0iI0ZGQ0YyNCIvPjwvc3ZnPg==");
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 85%;
  mask-size: 85%;
  transition: .3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.c-reviews > .c-bottom-bar .add-review > .grade > .stars > .star.selected, .c-reviews > .c-bottom-bar .add-review > .grade > .stars > .star.selected ~ .star, .c-reviews > .c-bottom-bar .add-review > .grade > .stars > .star:hover ~ .star, .c-reviews > .c-bottom-bar .add-review > .grade > .stars > .star:hover, .c-reviews > .c-sidebar .add-review > .grade > .stars > .star.selected, .c-reviews > .c-sidebar .add-review > .grade > .stars > .star.selected ~ .star, .c-reviews > .c-sidebar .add-review > .grade > .stars > .star:hover ~ .star, .c-reviews > .c-sidebar .add-review > .grade > .stars > .star:hover {
  background-color: #fec71c
}

.c-reviews > .c-bottom-bar .add-review > .grade > .stars > .star.active, .c-reviews > .c-sidebar .add-review > .grade > .stars > .star.active {
  transform: scale(1.2)
}

.c-reviews > .c-bottom-bar .add-review > .form-row, .c-reviews > .c-sidebar .add-review > .form-row {
  margin-bottom: 20px
}

.c-reviews > .c-bottom-bar .add-review > .form-row > div, .c-reviews > .c-sidebar .add-review > .form-row > div {
  display: flex;
  justify-content: space-between
}

.c-reviews > .c-bottom-bar .add-review > .form-row > div > .name, .c-reviews > .c-sidebar .add-review > .form-row > div > .name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px
}

.c-reviews > .c-bottom-bar .add-review > .form-row > div > .limit, .c-reviews > .c-sidebar .add-review > .form-row > div > .limit {
  color: #f14a4a
}

.c-reviews > .c-bottom-bar .add-review > .form-row > .c-edit textarea, .c-reviews > .c-sidebar .add-review > .form-row > .c-edit textarea {
  width: 100%;
  resize: none;
  height: 70px
}

.c-reviews > .c-bottom-bar .add-review > .photos, .c-reviews > .c-sidebar .add-review > .photos {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 20px;
  -webkit-tap-highlight-color: transparent;
  position: relative
}

.c-reviews > .c-bottom-bar .add-review > .photos > .drop-zone, .c-reviews > .c-sidebar .add-review > .photos > .drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  background-color: #ebf0f9;
  color: #3f51b5;
  position: absolute;
  z-index: 2
}

.c-reviews > .c-bottom-bar .add-review > .photos > .drop-zone > .icon, .c-reviews > .c-sidebar .add-review > .photos > .drop-zone > .icon {
  background-color: #3f51b5
}

.c-reviews > .c-bottom-bar .add-review > .photos > .name, .c-reviews > .c-sidebar .add-review > .photos > .name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty > .photo-zone, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .photo-zone, .c-reviews > .c-sidebar .add-review > .photos > .empty > .photo-zone, .c-reviews > .c-sidebar .add-review > .photos > .images > .photo-zone {
  width: 72px;
  height: 72px;
  border-radius: 5px;
  border: 1px solid #3f51b5;
  cursor: pointer;
  margin-right: 10px;
  display: flex
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty > .photo-zone > .icon, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .photo-zone > .icon, .c-reviews > .c-sidebar .add-review > .photos > .empty > .photo-zone > .icon, .c-reviews > .c-sidebar .add-review > .photos > .images > .photo-zone > .icon {
  width: 24px;
  height: 24px;
  background-color: #3f51b5;
  margin: auto
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty, .c-reviews > .c-sidebar .add-review > .photos > .empty {
  display: flex
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty > .instruction, .c-reviews > .c-sidebar .add-review > .photos > .empty > .instruction {
  font-size: 14px;
  margin: auto 0
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty > .instruction > div:last-of-type, .c-reviews > .c-sidebar .add-review > .photos > .empty > .instruction > div:last-of-type {
  color: #596175
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images, .c-reviews > .c-sidebar .add-review > .photos > .images {
  display: flex;
  align-items: center;
  flex-flow: row wrap
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-current, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-new {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  margin: 5px 15px 5px 0;
  position: relative
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current:hover, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new:hover, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-current:hover, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-new:hover {
  cursor: default
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > img, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > img, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-current > img, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-new > img {
  max-width: 72px;
  max-height: 72px;
  width: 100%;
  height: 100%;
  border-radius: 5px
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > .close, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > .close, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-current > .close, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-new > .close {
  position: absolute;
  right: -7px;
  top: -7px;
  background-color: #818ca9;
  border-radius: 50%
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > .close:hover, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > .close:hover, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-current > .close:hover, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-new > .close:hover {
  background-color: #f14a4a;
  cursor: pointer
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > .close > .icon, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > .close > .icon, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-current > .close > .icon, .c-reviews > .c-sidebar .add-review > .photos > .images > .images-new > .close > .icon {
  background-color: #fff;
  margin: 0;
  width: 18px;
  height: 18px
}

.c-reviews > .c-bottom-bar .add-review > .photos > .error, .c-reviews > .c-sidebar .add-review > .photos > .error {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  color: #ff7a00;
  margin-top: 10px
}

.c-reviews > .c-bottom-bar .add-review > .photos > .error > .icon, .c-reviews > .c-sidebar .add-review > .photos > .error > .icon {
  margin-right: 5px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #ff7a00
}

.c-reviews > .c-bottom-bar .add-review > .photos > .error > .errors, .c-reviews > .c-sidebar .add-review > .photos > .error > .errors {
  display: flex;
  flex-flow: column;
  max-width: 100%
}

.c-reviews > .c-bottom-bar .add-review > .photos > .error > .errors > span, .c-reviews > .c-sidebar .add-review > .photos > .error > .errors > span {
  text-overflow: ellipsis;
  overflow: hidden
}

.c-reviews > .c-bottom-bar .add-review > .note, .c-reviews > .c-sidebar .add-review > .note {
  font-size: 14px;
  color: #ff7a00
}

.c-reviews > .c-bottom-bar .add-review > .buttons-controls, .c-reviews > .c-sidebar .add-review > .buttons-controls {
  display: flex;
  margin-top: auto
}

.c-reviews > .c-bottom-bar .add-review > .buttons-controls > .c-button, .c-reviews > .c-sidebar .add-review > .buttons-controls > .c-button {
  max-width: unset;
  width: 100%;
  height: 46px
}

.c-reviews > .c-bottom-bar .add-review > .buttons-controls > .c-button:not(:first-of-type), .c-reviews > .c-sidebar .add-review > .buttons-controls > .c-button:not(:first-of-type) {
  margin-left: 15px
}

.c-reviews > .c-bottom-bar .add-review > .c-button.red, .c-reviews > .c-sidebar .add-review > .c-button.red {
  max-width: unset;
  min-height: 46px;
  margin-top: 15px
}

.c-reviews > .c-bottom-bar.bar-review .bar {
  max-width: unset;
  padding: 15px 0
}

.c-reviews > .c-bottom-bar.bar-review .bar > .top {
  padding: 0 15px
}

.c-reviews > .c-bottom-bar.bar-review .bar > .top > h2 {
  font-weight: 600
}

.c-reviews > .c-bottom-bar .explanation {
  font-size: 13px
}

.c-reviews > .c-bottom-bar .explanation > .c-button {
  max-width: unset;
  margin-top: 15px
}

.c-reviews > .c-bottom-bar .add-review {
  padding: 0 15px;
  overflow-y: auto;
  height: unset;
  max-width: unset
}

.c-reviews > .c-bottom-bar .add-review > .form-row > div > .name, .c-reviews > .c-bottom-bar .add-review > .grade > .name {
  font-weight: 500;
  font-size: 13px
}

.c-reviews > .c-bottom-bar .add-review > .form-row > .c-edit .placeholder {
  font-size: 13px
}

.c-reviews > .c-bottom-bar .add-review > .form-row > .c-edit textarea {
  height: 50px;
  font-size: 13px
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty {
  flex-direction: column
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty > .add-photo {
  color: #3f51b5;
  border: 1px solid #4960df;
  height: 46px;
  margin-top: 10px;
  display: flex;
  border-radius: 5px
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty > .add-photo > span {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  margin: auto;
  text-transform: uppercase
}

.c-reviews > .c-bottom-bar .add-review > .photos > .empty > .add-photo > span > .icon {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin-right: 10px;
  background-color: #3f51b5
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .photo-zone {
  width: 48px;
  height: 48px;
  box-sizing: border-box
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new {
  width: 48px;
  height: 48px;
  margin: 5px 15px 10px 0
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > img, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > img {
  max-width: 48px;
  max-height: 48px
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > .close, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > .close {
  position: absolute;
  right: -7px;
  top: -7px;
  background-color: #818ca9;
  border-radius: 50%
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > .close:hover, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > .close:hover {
  background-color: #f14a4a;
  cursor: pointer
}

.c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-current > .close > .icon, .c-reviews > .c-bottom-bar .add-review > .photos > .images > .images-new > .close > .icon {
  background-color: #fff;
  margin: 0;
  width: 18px;
  height: 18px
}

.c-reviews > .c-bottom-bar .add-review > .rules {
  font-size: 13px;
  color: #3f51b5;
  margin: 15px 0
}
</style>