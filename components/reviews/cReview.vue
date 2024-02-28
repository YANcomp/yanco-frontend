<script lang="ts" setup>
const props = defineProps({
  inOrder: {
    type: Boolean,
    default: !1
  },
  me: {
    type: Object
  },
  review: {
    type: Object,
    required: !0
  },
  isMobile: {
    type: Boolean,
    default: !1
  }
})

const emit = defineEmits(["images-view", "edit", "delete"])

const isCommentExpanded = ref(!1)
const isFlawsExpanded = ref(!1)
const isMeritsExpanded = ref(!1)

const preparedRating = computed(() => {
  return (props.review.rate ? props.review.rate : 0).toFixed(1).replace(".", ",")
})
const creationTime = computed(() => {
  let e = uToDate(props.review.creationTime);
  return void 0 !== e ? uFormat(e, "d.m.Y") : "Не известно"
})
const hasComment = computed(() => {
  return void 0 !== props.review.comment && props.review.comment.length > 0
})
const hasFlaws = computed(() => {
  return void 0 !== props.review.flaws && props.review.flaws.length > 0
})
const hasImages = computed(() => {
  return (props.review.images ? props.review.images : []).length > 0
})
const hasMerits = computed(() => {
  return void 0 !== props.review.merits && props.review.merits.length > 0
})
const isAwaitingModeration = computed(() => {
  return isMy.value && !props.review.isActive
})
const isCommentOverflow = computed(() => {
  return (props.review.comment ? props.review.comment : "").length > 1e3
})
const isFlawsOverflow = computed(() => {
  return (props.review.flaws ? props.review.flaws : "").length > 1e3
})
const isMeritsOverflow = computed(() => {
  return (props.review.merits ? props.review.merits : "").length > 1e3
})
const isMy = computed(() => {
  return props.me ? props.me.ID : undefined === props.review.userID
})
const rateWidth = computed(() => {
  return "" + (20 * props.review.rate) + "px"
})
const userName = computed(() => {
  return props.review.userName ? props.review.userName : "Аноним"
})

function prepareInitial(s: any) {
  let e, t = (null != s ? s : "").split(" ");
  return (t[0].charAt(0) + (null !== (e = t[1]) && void 0 !== e ? e : "").charAt(0)).toLocaleUpperCase()
}

function collapseExpand(e: any) {
  e = !e
  // this.$set(this, e, !this.$data[e])
}

function caption(e: any) {
  return e ? "Свернуть" : "Читать далее"
}

function deleteReview() {
  emit("delete", props.review.ID)
}

function edit() {
  emit("edit", props.review.ID)
}

function isLimit(a: any, b: any) {
  return a && !b
}

function viewImages(i: any) {
  emit("images-view", props.review.images, i)
}
</script>

<template>
  <div :class='["c-review", { my: isMy, "in-order": inOrder, mobile: isMobile }]' itemscope="" itemprop="review"
       itemtype="https://schema.org/Review">
    <div v-if="!isMobile" class="avatar">
      {{ prepareInitial(userName) }}
    </div>
    <div class="review">
      <span class="author" itemscope="" itemprop="author" itemtype="https://schema.org/Person">
        <div class="user">
          <div v-if="isMobile" class="avatar">
            {{ prepareInitial(userName) }}
          </div>
          <span class="name" itemprop="name">{{ userName }}</span>
        </div>
          <span class="date" itemprop="datePublished">
            <span v-if="isMy" class="icon trash2" data-tooltip="Удалить" @click="deleteReview"/>
            {{ creationTime }}
          </span>
      </span>
      <span v-if="isAwaitingModeration" class="moderation">Ожидает модерации</span>
      <div class="rating">
        <ReviewsCRatingStars :rate-width="rateWidth" :rating="review.rate" :is-review="true"/>
        <span class="number">{{ preparedRating }}</span>
      </div>
      <div class="details flex-vertical-nowrap" itemprop="reviewBody">
        <div v-if="hasMerits" :class='{ "limited-text": isLimit(isMeritsOverflow, isMeritsExpanded) }'>
          <span class="title">Достоинства</span>
          <div class="text marked" v-html="review.merits"/>
        </div>
        <span v-if="isMeritsOverflow" class="read-more"
              @click="collapseExpand(isMeritsExpanded)">{{ caption(isMeritsExpanded) }}</span>

        <div v-if="hasFlaws" :class='{ "limited-text": isLimit(isFlawsOverflow, isFlawsExpanded) }'>
          <span class="title">Недостатки</span>
          <div class="text marked" v-html="review.flaws"/>
        </div>
        <span v-if="isFlawsOverflow" class="read-more"
              @click="collapseExpand(isFlawsExpanded)">{{ caption(isFlawsExpanded) }}</span>

        <div v-if="hasComment" :class='{ "limited-text": isLimit(isCommentOverflow, isCommentExpanded) }'>
          <span class="title">Комментарий</span>
          <div class="text marked" v-html="review.comment"/>
        </div>

        <div v-if="hasImages" class="images">
          <div v-for="(image, i) in review.images" :key="i">
            <img :src="image" alt="photo" width="100%" height="100%" @click="viewImages(i)"/>
          </div>
        </div>

        <span v-if="isCommentOverflow" class="read-more"
              @click="collapseExpand(isCommentExpanded)">{{ caption(isCommentExpanded) }}</span>

      </div>
    </div>
  </div>
</template>

<style scoped>
.c-review {
  display: flex;
  justify-content: space-between
}

.c-review.my {
  background-color: #f7f8fc;
  padding: 15px;
  border-radius: 5px
}

.c-review > .avatar {
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

.c-review.mobile > .review {
  margin-left: unset;
  margin-top: unset
}

.c-review > .review {
  flex-shrink: 1;
  flex-basis: 100%;
  margin-left: 12px
}

.c-review > .review > .author {
  justify-content: space-between;
  margin-bottom: 5px
}

.c-review > .review > .author > .user, .c-review > .review > .author {
  display: flex;
  align-items: center
}

.c-review > .review > .author > .user > .name {
  font-weight: 600;
  font-size: 16px;
  line-height: 16px
}

.c-review > .review > .author > .user > .avatar {
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

.c-review > .review > .author > .date {
  font-size: 14px;
  color: #818ca9;
  display: flex;
  align-items: center
}

.c-review > .review > .author > .date > .icon {
  width: 20px;
  height: 20px;
  background-color: #818ca9;
  margin-right: 20px;
  cursor: pointer;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-review > .review > .author > .date > .icon.disabled {
  pointer-events: none;
  opacity: .5
}

.c-review > .review > .author > .date > .icon:first-of-type {
  margin-right: 10px
}

.c-review > .review > .author > .date > .icon:hover {
  background-color: #4659c4
}

.c-review > .review > .moderation {
  font-size: 14px;
  color: #ff324b;
  display: block;
  margin: 5px 0
}

.c-review > .review > .rating {
  display: flex;
  margin-bottom: 10px
}

.c-review > .review > .rating > .number {
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px
}

.c-review > .review > .control-panel {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  -webkit-tap-highlight-color: transparent
}

.c-review > .review > .control-panel > button {
  margin-left: 4px
}

.c-review > .review > .details > div {
  display: flex;
  flex-flow: column
}

.c-review > .review > .details > div:not(:last-of-type) {
  margin-bottom: 15px
}

.c-review > .review > .details > div > .title {
  font-weight: 500;
  font-size: 14px;
  width: 110px;
  flex-shrink: 0
}

.c-review > .review > .details > div > .text {
  font-size: 14px;
  word-break: break-word;
  flex-shrink: 1;
  flex-basis: 100%
}

.c-review > .review > .details > .images {
  display: flex;
  flex-flow: row wrap
}

.c-review > .review > .details > .images > div {
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 5px
}

.c-review > .review > .details > .images > div > img {
  cursor: pointer;
  max-width: 60px;
  max-height: 60px
}

.c-review > .review > .details > .read-more {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  color: #4e62d1;
  cursor: pointer;
  font-size: 16px;
  align-self: flex-start
}

.c-review > .review > .details > .read-more:hover {
  color: #3f51b5
}

.c-review > .review > .details > .limited-text {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 310px
}

.c-review.in-order > .main-side, .c-review.in-order {
  padding: 0
}

@media screen and (max-width: 850px) {
  .c-review {
    flex-flow: column nowrap
  }
}

@media screen and (max-width: 480px) {
  .c-review > .left-side {
    align-self: center
  }

  .c-review > .main-side > .details > div {
    flex-flow: column nowrap
  }

  .c-review > .main-side > .details > .read-more {
    margin-left: 0
  }
}
</style>