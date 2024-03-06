<script lang="ts" setup>
const props = defineProps({
  closeable: {
    type: Boolean,
    default: !1
  },
  hideIcon: {
    type: Boolean,
    default: !1
  },
  status: {
    type: String,
    validator(t: any) {
      return ["info", "success", "warning", "error"].includes(t)
    }
  },
  squeezing: {
    type: Boolean,
    default: !1
  }
})

const isClosing = ref(!1)
const show = ref(!1)
const showDesc = ref(!1)
const showTitle = ref(!1)

onMounted(() => {
  checkSlots()
})
onUpdated(() => {
  checkSlots()
})

const emit = defineEmits(["close"])

const slots = useSlots()

function checkSlots() {
  showTitle.value = !!slots.title
  showDesc.value = !!slots.desc
  show.value = showTitle.value || showDesc.value
}

function close() {
  isClosing.value = !0
  setTimeout(() => {
    show.value = !1
    emit("close")
  }, 350)
}
</script>

<template>
  <div v-show="show"
       :class='["c-alert", "flex-horizontal-nowrap", status, { "hide-icon": hideIcon, closeable: closeable, closing: isClosing, squeezing: squeezing }]'>
    <span v-if="!hideIcon" :class='["icon", status + "-alert"]'/>
    <div class="message flex-vertical-nowrap">
      <div v-if="showTitle" class="title">
        <slot name="title"/>
      </div>
      <div v-if="showDesc" class="desc">
        <slot name="desc"/>
      </div>
    </div>
    <span v-if="closeable" class="icon close-alert" @click="close"/>
  </div>
</template>

<style scoped>
.c-alert {
  margin: 0 auto 8px;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: -webkit-fill-available;
  width: -moz-available;
  padding: 10px 15px;
  font-family: Montserrat, sans-serif;
  transition: all .3s ease-in-out
}

.c-alert.closed {
  pointer-events: none;
  opacity: 0
}

.c-alert.opened {
  opacity: 1
}

.c-alert.info {
  background-color: #f0faff
}

.c-alert.success {
  background-color: #edfff3
}

.c-alert.warning {
  background-color: #fff5eb
}

.c-alert.error {
  background-color: #ffefe6
}

.c-alert > .icon {
  margin-left: -6px;
  margin-right: 11px;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-tap-highlight-color: transparent
}

.c-alert > .icon.info-alert {
  background-color: #3f51b5
}

.c-alert > .icon.success-alert {
  background-color: #07d088
}

.c-alert > .icon.warning-alert {
  background-color: #ff7a00
}

.c-alert > .icon.error-alert {
  background-color: #f14a4a
}

.c-alert > .message {
  flex-grow: 1;
  align-self: center;
  max-width: calc(100% - 30px)
}

.c-alert > .message > .title {
  font-size: 16px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.c-alert > .message > .desc {
  font-size: 12px;
  line-height: 15px;
  color: #636363;
  line-height: 1.3;
  margin-top: 2px;
  display: block
}

.c-alert > .message > .desc > p {
  margin: 0
}

.c-alert > .close-alert {
  cursor: pointer;
  opacity: .6;
  transition: .3s
}

.c-alert > .close-alert:hover {
  opacity: 1
}

.c-alert.hide-icon > .message {
  max-width: 100%
}

.c-alert.closing {
  -webkit-animation: alert-out .3s ease-in-out both running;
  animation: alert-out .3s ease-in-out both running
}

.c-alert.closing.squeezing {
  padding: 0 !important;
  margin: 0 !important;
  height: 0;
  transition: .3s ease-in-out
}

@-webkit-keyframes alert-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@keyframes alert-out {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}
</style>