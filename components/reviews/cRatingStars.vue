<script lang="ts" setup>
const props = defineProps({
  isCard: {
    type: Boolean,
    default: !1
  },
  isReview: {
    type: Boolean,
    default: !1
  },
  rateWidth: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    validator(e: any) {
      return ["s", "m", "l"].includes(e)
    },
    default: "l"
  },
  isShowAverageRating: {
    type: Boolean,
    default: !1
  }
})

const binds = computed(() => {
  return props.isCard || props.reviewCount < 1 ? {} : {
    itemscope: !0,
    itemprop: props.isReview ? "reviewRating" : "aggregateRating",
    itemtype: props.isReview ? "https://schema.org/Rating" : "https://schema.org/AggregateRating",
  }
})
const averageRating = computed(() => {
  return props.rating.toFixed(1).replace(".", ",")
})
</script>

<template>
  <div class="c-rating-stars" v-bind="binds">
    <template v-if="reviewCount > 0">
      <meta v-if="isReview" content="1" itemprop="worstRating"/>
      <meta :content="rating" itemprop="ratingValue"/>
      <meta v-if="!isReview" :content="reviewCount" itemprop="reviewCount"/>
      <meta v-if="isReview" content="5" itemprop="bestRating"/>
    </template>
    <span :class='["stars", size]' :data-tooltip='rating > 0 ? "Звёзд " + rating + " из 5" : ""'>
      <span class="fill" :style="{ width: rateWidth }"/>
    </span>
    <span v-if="isShowAverageRating" class="average">{{ averageRating }}</span>
    <slot/>
  </div>
</template>

<style scoped>
.c-rating-stars {
  display: flex;
  align-items: center
}

.c-rating-stars > .stars {
  position: relative;
  text-align: left;
  background-color: #c9c9c9;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkuMTAzIDEuMDdhMSAxIDAgMDExLjc5NCAwbDIuMTE1IDQuMjkxYTEgMSAwIDAwLjc1Mi41NDhsNC43MzUuNjkzYTEgMSAwIDAxLjU1MyAxLjcwNWwtMy40MjYgMy4zNDJhMSAxIDAgMDAtLjI4Ny44ODRsLjgwOCA0LjcxOWExIDEgMCAwMS0xLjQ1MiAxLjA1M2wtNC4yMjktMi4yMjdhMSAxIDAgMDAtLjkzMiAwbC00LjIzIDIuMjI3YTEgMSAwIDAxLTEuNDUtMS4wNTNsLjgwNy00LjcxOWExIDEgMCAwMC0uMjg3LS44ODRMLjk0OCA4LjMwN2ExIDEgMCAwMS41NTMtMS43MDVsNC43MzUtLjY5M2ExIDEgMCAwMC43NTItLjU0OEw5LjEwMyAxLjA3eiIgZmlsbD0iI0ZGQ0YyNCIvPjwvc3ZnPg==");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkuMTAzIDEuMDdhMSAxIDAgMDExLjc5NCAwbDIuMTE1IDQuMjkxYTEgMSAwIDAwLjc1Mi41NDhsNC43MzUuNjkzYTEgMSAwIDAxLjU1MyAxLjcwNWwtMy40MjYgMy4zNDJhMSAxIDAgMDAtLjI4Ny44ODRsLjgwOCA0LjcxOWExIDEgMCAwMS0xLjQ1MiAxLjA1M2wtNC4yMjktMi4yMjdhMSAxIDAgMDAtLjkzMiAwbC00LjIzIDIuMjI3YTEgMSAwIDAxLTEuNDUtMS4wNTNsLjgwNy00LjcxOWExIDEgMCAwMC0uMjg3LS44ODRMLjk0OCA4LjMwN2ExIDEgMCAwMS41NTMtMS43MDVsNC43MzUtLjY5M2ExIDEgMCAwMC43NTItLjU0OEw5LjEwMyAxLjA3eiIgZmlsbD0iI0ZGQ0YyNCIvPjwvc3ZnPg==")
}

.c-rating-stars > .stars > .fill {
  background-color: #fec71c;
  height: 100%;
  position: absolute
}

.c-rating-stars > .stars.l {
  width: 100px;
  height: 20px
}

.c-rating-stars > .stars.m {
  width: 75px;
  height: 15px
}

.c-rating-stars > .stars.s {
  width: 65px;
  height: 13px
}

.c-rating-stars > .average {
  color: #1a1a1a;
  margin-left: 5px;
  font-weight: 600;
  line-height: 15px
}
</style>