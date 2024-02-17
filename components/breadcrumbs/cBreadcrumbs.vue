<script lang="ts" setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: function () {
      return []
    }
  }
})

const preparedBreadcrumbs: any = computed(() => {
  return props.breadcrumbs
})

function routeTo(item: any) {
  return {
    name: preparedBreadcrumbs.value[item]?.routeName,
    params: preparedBreadcrumbs.value[item]?.params ? preparedBreadcrumbs.value[item].params : {}
  }
}
</script>

<template>
  <ol class="c-breadcrumbs container" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li v-for="(item,index) in preparedBreadcrumbs" :key="index" itemscope itemprop="itemListElement"
        itemtype="https://schema.org/ListItem">
      <span class="icon arrow-forward"/>
      <template v-if="void 0 !== item.routeName">
        <NuxtLink class="route hover-bottom-line" :to="routeTo(index)" itemprop="item">
          <span itemprop="name">{{ item.name }}</span>
        </NuxtLink>
      </template>
      <template v-else>
        <span itemprop="name">{{ item.name }}</span>
      </template>
      <meta itemprop="position" :content="index + 1">
    </li>
  </ol>
</template>

<style scoped>
.c-breadcrumbs {
  max-width: 1368px;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  padding: 0
}

.c-breadcrumbs > li {
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.c-breadcrumbs > li > a, .c-breadcrumbs > li > span {
  color: #8e8e8e
}

.c-breadcrumbs > li > a.icon, .c-breadcrumbs > li > span.icon {
  height: 17px;
  width: 17px;
  background-color: #c9c9c9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  margin: 4px 7px 0
}

.c-breadcrumbs > li > a.route, .c-breadcrumbs > li > span.route {
  color: #4e62d1;
  cursor: pointer
}

.c-breadcrumbs > li > a.route:hover, .c-breadcrumbs > li > span.route:hover {
  color: #3f51b5
}

.c-breadcrumbs > li:first-child {
  align-items: center
}

.c-breadcrumbs > li:first-child > .icon {
  display: none
}

.c-breadcrumbs.mobile {
  display: flex;
  margin-bottom: 0;
  padding: 0 10px;
  flex-wrap: nowrap;
  overflow-x: auto
}

.c-breadcrumbs.mobile::-webkit-scrollbar {
  display: none
}

.c-breadcrumbs.mobile > li:last-child {
  padding-right: 10px
}

.c-breadcrumbs.mobile > li > a, .c-breadcrumbs.mobile > li > span {
  white-space: nowrap
}

@media screen and (max-width: 1367px) {
  .c-breadcrumbs {
    padding: 0 20px
  }
}

</style>