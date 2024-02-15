<script lang="ts" setup>
const emit = defineEmits(["tab-index-change"])

const props = defineProps({
  tabIndex: {
    type: Number,
    default: undefined
  },
  isBorderFitContent: {
    type: Boolean,
    default: false
  },
  isNoBorder: {
    type: Boolean,
    default: false
  },
  isNotStretchTabs: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()
const slotsDefault = <any>slots.default?.()
const internalTabIndex = ref(props.tabIndex)
const tabs = ref(<any>{})
const slider = ref(<any>{})
const border = ref(<any>{})


watch(internalTabIndex, (val: any) => {
  emit("tab-index-change", val)
})
watch(internalTabIndex, (val: any) => {
  internalTabIndex.value !== val && (internalTabIndex.value = val)
})

onMounted(() => {
  window.addEventListener("resize", resize)
  setTimeout(() => {
    resize()
  }, 300)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

function resize() {
  setTimeout(() => {
    updateSliderPos()
  }, 200)
}

function changeTabIndex(val: any) {
  internalTabIndex.value = val
}

function updateSliderPos() {
  //TODO
  if ("undefined" != typeof window) {
    var t = slider.value,
        e = border.value;
    if (void 0 !== internalTabIndex.value) {
      var n = tabs.value,
          o = n.children[internalTabIndex.value];
      if (o) {
        if (!props.isNoBorder) {
          if (props.isBorderFitContent) {
            var r, l = 0,
                d = {...n.children};
            try {
              for (d.s(); !(r = d.n()).done;) {
                l += r.value.offsetWidth
              }
            } catch (t) {
              d.e(t)
            } finally {
              d.f()
            }
            e.style.width = "".concat(<any>l, "px")
          } else e.style.width = "100%";
          e.style.display = "block", e.style.top = "".concat(<any>(o.offsetTop + o.offsetHeight - 1 - 10), "px")
        }
        t.style.display = "block", t.style.left = "".concat(o.offsetLeft + (0 !== internalTabIndex.value ? 15 : 0), "px"), t.style.width = "".concat(<any>(o.offsetWidth - ([0, n.children.length - 1].includes(internalTabIndex.value) ? 15 : [0, n.children.length - 1].includes(internalTabIndex.value) ? 0 : 30)), "px"), t.style.top = "".concat(<any>(o.offsetTop + o.offsetHeight - 1 - 10), "px")
      } else t.style.display = "none"
    } else t.style.display = "none"
  }
}

const render = () => {
  let e, n, c, l,
      r = (slotsDefault ? <any>slotsDefault : []).filter((t: any) => {
        return void 0 !== t.type && "cTab" === t.type.__name
      });
  if (r.length < 1) return h("div", []);
  let m = r.map((e: any, i: any) => {
        if (e.children && e.children.caption) {
          let n = i === internalTabIndex.value,
              caption = h("div", e.children.caption());
          return h("li", {
            class: {active: n},
            onClick: () => {
              return changeTabIndex(i)
            }
          }, [caption].filter((function (i) {
            return void 0 !== i
          })))
        }
      }),
      main = <any>[];
  if (void 0 !== internalTabIndex.value && internalTabIndex.value < m.length) {
    var f = r[internalTabIndex.value],
        body = f && null !== (e = f.children.default()) && void 0 !== e ? e : [],
        v = (null !== (n = f.data) && void 0 !== n ? n : {}).staticClass,
        V = null !== (l = (null !== (c = f.data) && void 0 !== c ? c : {}).class) && void 0 !== l ? l : [],
        y = [v].concat(Object.assign(V)).filter((function (i) {
          return void 0 !== i
        }));

    main.push(h("div", {
      class: y
    }, body))
  }
  nextTick(() => {
    return updateSliderPos()
  });
  let po = <any>[h("ul", {
    class: "tabs",
    ref: tabs
  }, m), h("div", {
    class: "slider",
    ref: slider
  })];

  return props.isNoBorder || po.push(h("div", {
    class: "border",
    ref: border
  })), h("div", {
    class: ["c-tabs", {
      "not-stretch-tabs": props.isNotStretchTabs || props.isBorderFitContent
    }]
  }, [].concat(po, main))

};
</script>

<template>
  <render/>
</template>

<style>
.c-tabs {
  position: relative;
  display: flex;
  flex-flow: column nowrap
}

.c-tabs.not-stretch-tabs {
  width: -webkit-fill-available;
  width: -moz-available;
  -webkit-tap-highlight-color: transparent
}

.c-tabs.not-stretch-tabs > .tabs {
  justify-content: unset
}

.c-tabs > .tabs {
  position: relative;
  display: flex;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  text-transform: uppercase;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: .2s;
  list-style: none;
  justify-content: space-between;
  letter-spacing: .06em;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px
}

.c-tabs > .tabs li {
  display: flex;
  flex-shrink: 0;
  padding: 15px;
  cursor: pointer
}

.c-tabs > .tabs li:first-of-type {
  padding-left: 0
}

.c-tabs > .tabs li:last-of-type {
  padding-right: 0
}

.c-tabs > .tabs li:hover {
  color: #3f51b5
}

.c-tabs > .tabs li.active {
  color: #3f51b5;
  filter: drop-shadow(0 0 0 #3f51b5)
}

.c-tabs > .border, .c-tabs > .slider {
  position: absolute;
  height: 2px;
  flex-shrink: 0;
  background-color: #3f51b5;
  transition: .2s;
  border-radius: 5px;
  z-index: 2
}

.c-tabs > .border {
  background-color: #d6d6e1;
  z-index: 1
}

.c-tabs > div:last-of-type {
  margin-top: 10px
}

.c-tabs.code > .border, .c-tabs.code > .slider, .c-tabs.code > .tabs {
  display: none !important
}
</style>