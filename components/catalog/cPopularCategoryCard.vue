<script lang="ts" setup>
const props = defineProps({
  category: {
    type: <any>Object,
    required: true
  },
  isMobile: {
    type: Boolean,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  arrow: {
    type: <any>Object,
    default: function () {
      return {
        color: "#1E1E1E",
        hoverColor: "#1E1E1E"
      }
    }
  },
  isAria: {
    type: Boolean,
    default: true
  }
})

const cardClass = ref({})

</script>

<template>
  <NuxtLink
      :class='["c-popular-category-card", (cardClass["_" + (index + 1)] = isAria, cardClass.mobile = isMobile, cardClass)]'
      :style='{ background: category.backgroundColor }' :to='category.route'>
<!--    <img class="background" alt="404" :src='category.backgroundImage' width="100%" height="100%"/>-->
    <img v-if="category.image" class="photo" alt="404" :src='category.image' width="100%" height="100%"/>
    <div class="category-name">
      <span class="name" v-html="category.name"/>
      <LazyUiCArrowSVG v-if="!isMobile" class="bottom-right" :color="arrow.color" :hover-color="arrow.hoverColor"/>
    </div>
  </NuxtLink>
</template>

<style scoped>
.c-popular-category-card {
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-flow: column;
  position: relative;
  background-position: 0 50% !important;
  background-size: 300% 100% !important;
  transition: all .3s ease-in-out
}

.c-popular-category-card .background, .c-popular-category-card .photo {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain
}

.c-popular-category-card .background {
  -o-object-fit: unset;
  object-fit: unset;
  border-radius: 7px
}

.c-popular-category-card .category-name {
  display: flex;
  margin-top: auto;
  z-index: 2
}

.c-popular-category-card .category-name .name {
  margin: auto auto 10px 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: .02em;
  color: #1e1e1e;
  word-break: break-word
}

.c-popular-category-card .category-name .bottom-right {
  margin: auto 5px 10px auto
}

.c-popular-category-card:not(.mobile):hover {
  background-position: 100% 50% !important
}

.c-popular-category-card:not(.mobile):hover :deep(.c-arrow-svg) span:first-of-type {
  opacity: 1
}

.c-popular-category-card:not(.mobile):hover :deep(.c-arrow-svg) span:last-of-type {
  transform: translateX(4px)
}

.c-popular-category-card.mobile {
  -webkit-tap-highlight-color: transparent
}

.c-popular-category-card.mobile .photo {
  -o-object-fit: cover;
  object-fit: cover
}

.c-popular-category-card.mobile .name {
  margin: auto 10px 5px;
  font-size: 12px;
  line-height: 17px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-popular-category-card.mobile:active {
  background-position: 100% 50%
}

._1 {
  grid-area: a
}

._2 {
  grid-area: b
}

._3 {
  grid-area: c
}

._4 {
  grid-area: d
}

._5 {
  grid-area: e
}

._6 {
  grid-area: f
}

._7 {
  grid-area: g
}

._8 {
  grid-area: h
}

._9 {
  grid-area: i
}

._10 {
  grid-area: j
}
</style>