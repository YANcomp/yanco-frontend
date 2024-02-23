<script lang="ts" setup>
const props = defineProps({
  story: {
    type: <any>Object
  }
})
const appStore = useAppStore()
const storiesStore = useStoriesStore()

const isTouch = ref(false)

const isMobile = computed(() => {
  return appStore.isMobile
})
const viewed = computed(() => {
  return viewedStoriesIDs.value.includes(props.story?.ID)
})
const viewedStoriesIDs = computed(() => {
  return storiesStore.viewedStoriesIDs
})

function touchStart() {
  isTouch.value = true
}

function touchEnd() {
  isTouch.value = false
}

function openStory() {
  appStore.COMMIT_OPEN_CLOSE_STORY_MODAL(true)
  storiesStore.COMMIT_CHANGE_CURRENT_STORY_ID(props.story.ID)
}
</script>

<template>
  <div
      :class='["c-story-card", { touch: isTouch, viewed: viewed, mobile: isMobile, "loading-content": void 0 === story?.preview }]'
      v-on:touchstart="touchStart"
      v-on:touchend="touchEnd">
    <div v-if="story?.preview !== undefined" class="preview" @click="openStory">
      <img :src="story?.preview" width="100%" height="100%" alt=""/>
      <span>
        <p v-html="story?.title"/>
      </span>
    </div>
  </div>
</template>

<style scoped>
.c-story-card {
  margin-right: 20px;
  height: 220px;
  min-width: 162px;
  max-width: 162px;
  border-radius: 5px;
  background: linear-gradient(145deg, #ff0089, #ff85f7, #3f51b5) 0 50%/300% 100%;
  padding: 4px;
  position: relative;
  color: #fff;
  transition: background .3s ease-in-out
}

.c-story-card.empty {
  background: #ebf0f9;
  pointer-events: none
}

.c-story-card > .preview {
  background: #fff;
  height: 222px;
  margin: -2px;
  border-radius: 5px;
  padding: 2px 2px 0;
  position: relative
}

.c-story-card > .preview > img {
  max-height: 220px;
  width: 100%;
  transition: opacity .3s ease-in-out
}

.c-story-card > .preview > span {
  position: absolute;
  left: 0;
  font-weight: 500;
  font-size: 14px;
  height: 80px;
  line-height: 17.07px;
  width: -webkit-fill-available;
  width: -moz-available;
  padding: 0 10px;
  bottom: 0;
  transition: opacity .3s;
  z-index: 1
}

.c-story-card > .preview > span > p {
  margin: 0;
  position: absolute;
  bottom: 10px;
  width: calc(100% - 20px);
  word-break: break-word
}

.c-story-card:after {
  content: "";
  position: absolute;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .7));
  right: 4px;
  left: 4px;
  bottom: 4px;
  border-radius: 5px;
  height: 90px;
  transition: all .3s ease-in-out
}

.c-story-card.loading-content:after {
  content: none
}

.c-story-card.viewed {
  background: #c4c4c4
}

.c-story-card:not(.mobile):hover {
  cursor: pointer
}

.c-story-card:not(.mobile):hover:not(.viewed) {
  background-position: 100% 50% !important
}

.c-story-card:not(.mobile):hover > .preview > img {
  opacity: .5
}

.c-story-card:not(.mobile):hover:after {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .5))
}

.c-story-card.touch:not(.viewed) {
  background-position: 100% 50% !important
}

.c-story-card.touch > .preview > img {
  opacity: .5
}

.c-story-card.touch:after {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .5))
}

.c-story-card.mobile {
  margin-right: 10px;
  height: 200px;
  min-width: 148px;
  max-width: 148px
}

.c-story-card.mobile:after {
  height: 74px
}

.c-story-card.mobile > .preview {
  height: 202px
}

.c-story-card.mobile > .preview > img {
  max-height: 200px
}

.c-story-card.mobile > .preview > span {
  height: 74px
}

.c-story-card.mobile > .preview > span > p {
  font-size: 13px
}
</style>