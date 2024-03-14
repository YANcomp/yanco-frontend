<script lang="ts" setup>
import {NuxtLink} from "#components";

const ArticleCTreeView = resolveComponent('ArticleCTreeView')

const props = defineProps({
  items: {
    type: Array,
    default: function () {
      return []
    }
  },
  level: {
    type: Number,
    default: 1
  }
})

const slots = useSlots()
const render = () => {
  return h("ul", {
    class: "c-tree-view"
  }, props.items.map((r: any) => {
    let obj = slots.default?.()[0].children?.find((o: any) => o.key === r.ID);
    if (!obj) {
      obj = slots.default?.()[0].children[0]?.find((o: any) => o.key === r.ID);
    }
    return h("li", {
      class: "c-tree-item"
    }, [obj, r.children.length > 0 ? h(ArticleCTreeView, {
      items: r.children,
      level: props.level + 1,
      scopedSlots: {
        default: function (props: any) {
          return h('span', props.text)
        }
      }
    }, {
      default: () => [
        h("template", {}, {
          default: () => [
            r.children.map((item: any) => {
              return h(NuxtLink, {
                key: item.ID,
                class: [item.isActive ? "tree-item-active" : "tree-item", {"active-parent": item.isActiveParent}],
                style: {"padding-left": 10 * (props.level + 1) + "px"},
                to: item.route
              }, () => item.title)
            })
          ],
        })
      ],
    }) : void 0])
  }))
}
</script>

<template>
  <render/>
</template>

<style>

</style>