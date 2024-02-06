<script lang="ts" setup>
const props = defineProps({
  notice: {
    type: <any>Object
  }
})

const fontSize = computed(() => {
  return props.notice.textSize + "px"
})

const emit = defineEmits(["close"])

function close() {
  emit("close", props.notice.key)
}
</script>

<template>
  <div :class='["c-notice", { hasButton: notice.button }]'>
    <div class="wrap">
      <div class="message" :style="{'font-size': fontSize}" v-html="notice.text"/>
      <UiCButton v-if="notice.button" mode="primary" size="s" @click="close">
        {{ notice.button }}
      </UiCButton>
      <span v-else class="icon close" @click="close"/>
    </div>
  </div>
</template>

<style scoped>
.c-notice {
  max-width: 1368px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
  border-radius: 5px;
  margin: auto auto 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: fill
}

.c-notice > .wrap, .c-notice {
  width: 100%;
  display: flex;
  align-items: center
}

.c-notice > .wrap {
  height: 100%;
  flex-flow: row nowrap;
  padding: 8px 16px
}

.c-notice > .wrap > .message {
  width: -webkit-fill-available;
  width: -moz-available;
  text-align: center
}

.c-notice > .wrap > .icon {
  -webkit-mask-size: 26px;
  mask-size: 26px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat
}

.c-notice > .wrap > .icon:hover {
  cursor: pointer;
  background-color: #3f51b5
}

@media screen and (max-width: 1400px) {
  .c-notice {
    width: calc(100% - 30px)
  }
}
</style>