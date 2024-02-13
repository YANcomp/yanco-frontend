<script lang="ts" setup>
const props = defineProps({
  city: {
    type: Object
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const isScrolled = ref(false)
const typesRef = ref(<any>undefined)

const catalogStore = useCatalogStore()
const catalog = computed(() => {
  return catalogStore.catalog
})
const preparedProductTypes = computed(() => {
  let c = <any>{
    "Лекарственные препараты и БАДы": "Лекарства и БАДы",
    "Медицинская техника": "Мед. техника",
    "Медицинские изделия": "Мед. изделия",
    "Мать и дитя": "Для детей и мам"
  }
  let preparedTypes = [];
  if (catalog.value !== undefined) {
    let catalogTypes: any = catalog.value.types.map((t: any, i: any) => {
      return {
        ...t,
        order: 400010 === t.ID ? 0 : i + 1
      }
    })

    let sortTypes = catalogTypes.sort((a: any, b: any) => {
      return a.order - b.order
    })

    for (let i = 0; i < sortTypes.length; i++) {
      if (preparedTypes.length > 6 && !props.isMobile) break

      preparedTypes.push({
        ...sortTypes[i],
        name: c[sortTypes[i].name] ? c[sortTypes[i].name] : sortTypes[i].name,
        route: {
          name: "CatalogType",
          params: {
            typeID: "".concat(sortTypes[i].ID),
            typeSlug: sortTypes[i].slug
          }
        }
      })
    }
  }
  return preparedTypes
})

onMounted(() => {
  if (!props.isMobile) {
    document.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", resize)
    // resize()
  }
})

function resize() {
  let t = typesRef.value,
      e = t.clientWidth,
      n = t.childElementCount;
  e / 175 < n && (n = Math.ceil(e / 175), Array.from(t.children).forEach((t: any, i: any) => {
    i < n ? (t.style.display = "list-item", i === n - 1 && (t.className = "last-item")) : t.style.display = "none"
  }))
}

function checkScroll() {
  isScrolled.value = window.scrollY > 40
}
</script>

<template>
  <section :class='["c-types", "container", { hide: isScrolled }, { mobile: isMobile }]'>
    <div v-if="!isMobile">
      <LazyCitiesCSelectCity v-if="!isMobile" :current-city="city"/>
    </div>
    <ul ref="typesRef">
      <li v-for="(type, index) in preparedProductTypes" :key="index">
        <NuxtLink class="hover-bottom-line" :to="type.route">
          {{ type.name }}
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.c-types {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 45px;
  height: auto;
  transition: .2s;
  overflow: hidden;
  margin-top: 6px;
  margin-bottom: 16px;
  opacity: 1
}

.c-types.container {
  width: 100%;
  padding: 0
}

.c-types.mobile {
  overflow-x: auto;
  padding: 10px
}

.c-types.mobile > ul, .c-types.mobile {
  display: flex;
  flex-flow: row nowrap;
  margin: 0
}

.c-types.mobile > ul {
  padding: 0;
  list-style: none
}

.c-types.mobile > ul > li {
  flex-shrink: 0;
  padding-right: 20px;
  margin-right: 0
}

.c-types.mobile > ul > li > a {
  font-size: 12px;
  font-weight: unset;
  color: #1a1a1a
}

.c-types.hide {
  padding-top: 0
}

.c-types > div {
  max-width: 170px;
  width: 100%;
  margin-right: 20px
}

.c-types > div > .c-select-city-desktop > button > .name {
  max-width: 142px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.c-types > ul {
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: space-between
}

.c-types > ul > li {
  margin-right: 15px
}

.c-types > ul > li.last-item {
  margin-right: 0
}

.c-types > ul > li > a {
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
  transition: .2s
}

.c-types > ul > li > a:hover {
  color: #3f51b5
}

.c-types > ul > li > a:active {
  color: #32408f
}

.c-types > ul > li:first-of-type > a {
  color: #ff0089;
  font-weight: 600
}

.c-types > ul > li:first-of-type > a:before {
  background-color: #ff0089
}

@media screen and (max-width: 1367px) {
  .c-types.container:not(.mobile) {
    padding: 0 20px
  }
}

@media screen and (max-width: 850px) {
  .c-types > ul {
    margin-left: 40px
  }
}
</style>