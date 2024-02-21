<script lang="ts" setup>
const props = defineProps({
  isBrandsAnalogs: {
    type: Boolean,
    default: !1
  },
  isMobile: {
    type: Boolean,
    default: !1
  },
  isRareProducts: {
    type: Boolean,
    default: !1
  },
  properties: {
    type: <any>Array,
    default: function () {
      return []
    }
  },
  propertyTypeID: {
    type: <any>Number
  },
  failedGetting: {
    type: Boolean,
    default: !1
  },
  isLoading: {
    type: Boolean,
    default: !1
  }
})
const route = useRoute()
const router = useRouter()

const allLetters = ref(<any>["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
const routeProperties = ref(<any>{
  10: "Brand",
  13: "Manufacturer",
  6: "ActiveSubstance"
})
const routePropertyIDs = ref(<any>[10, 13, 6])
const routes = ref(<any>[{
  name: "RareProducts",
  title: "Редкие препараты"
}, {
  name: "Brands",
  title: "Бренды"
}, {
  name: "ActiveSubstances",
  title: "Действующее вещество"
}, {
  name: "Manufacturers",
  title: "Производители"
}, {
  name: "Analogi",
  title: "Аналоги"
}])
const propertiesRef = ref("")
const russianLetters = ref(uRussian())
const selectedLetter = ref(<any>"")
const index = ref(<any>routes.value.findIndex((e: any) => {
  return e.name === route.name
}))

const hasSelectedLatter = computed(() => {
  return selectedLetter.value.length > 0
})
const letters = computed(() => {
  let e = props.properties.reduce((e: any, r: any, n: any) => {
    let o;
    return (null === (o = props.properties[n - 1]) || void 0 === o ? void 0 : o.name.substr(0, 1)) !== r.name.substr(0, 1) && e.push(r.name.substr(0, 1)), e
  }, []);
  return allLetters.value.reduce((t: any, r: any) => {
    t.push({
      letter: r,
      thereIs: e.includes(r)
    })
    return t
  }, <any>[])
})
const preparedPropertiesList = computed(() => {
  return selectedLetter.value.length > 0 ? [{
    letter: selectedLetter.value,
    properties: props.properties.filter((p: any) => {
      return -1 !== p.name.search("/") && russianLetters.value.includes(selectedLetter.value) ? -1 !== p.name.replace("/ ", "/").split("/")[1].substr(0, 1).search(selectedLetter.value) : -1 !== p.name.substr(0, 1).search(selectedLetter.value)
    })
  }] : props.properties.reduce((e: any, r: any, n: any) => {
    var o;
    return (null === (o = props.properties[n - 1]) || void 0 === o ? void 0 : o.name.substr(0, 1)) !== r.name.substr(0, 1) && e.push({
      letter: r.name.substr(0, 1),
      properties: props.properties.filter((p: any) => {
        return p.name.substr(0, 1) === r.name.substr(0, 1)
      })
    }), e
  }, [])
})
const routeName = computed(() => {
  return route.name ? route.name : ""
})

onMounted(() => {
  index.value = routes.value.findIndex((e: any) => {
    return e.name === routeName.value
  })
})

function propertyLink(p: any) {
  let t = routePropertyIDs.value.includes(props.propertyTypeID) ? routeProperties.value["".concat(props.propertyTypeID)] : "";
  return props.isRareProducts ? {
    name: "Product",
    params: {
      productID: "".concat(p.ID),
      productSlug: "".concat(p.slug)
    }
  } : t === "Brand" ? {
    name: "Brand",
    params: {
      propertyID: "".concat(p.ID),
      propertySlug: "".concat(p.slug)
    }
  } : {
    name: props.isBrandsAnalogs ? "BrandAnalogs" : t,
    params: {
      propertyID: "".concat(p.ID),
      propertyName: p.name.trim(),
      propertyTypeID: "".concat(props.isBrandsAnalogs ? 10 : p.typeID),
      propertySlug: "".concat(p.slug)
    }
  }
}

function selectLetter(t: any) {
  t.thereIs && (selectedLetter.value = t.letter, propertiesRef.value.scrollIntoView({ behavior: 'smooth' }))
}
</script>

<template>
  <section :class='["c-reference-page", "container", { mobile: isMobile, "rare-items": isRareProducts }]'>
    <h1>{{ routes[index].title }}</h1>
    <div class="letters">
      <span v-for="(e,i) in letters" :key="i" :class='{ active: e.letter === selectedLetter, no: !e.thereIs }'
            @click='selectLetter(e)'>{{ e.letter }}</span>
    </div>
    <div ref="propertiesRef" :class='["properties", { "one-property": hasSelectedLatter }]'>
      <h1 v-if="hasSelectedLatter">{{ selectedLetter }}</h1>
      <ul v-for="(p,i) in preparedPropertiesList" :key="i">
        <li v-if="!hasSelectedLatter" class="letter">
          <h1>{{ p.letter }}</h1>
        </li>
        <ul>
          <li v-for="(e, n) in p.properties" :key="n" class="name">
            <NuxtLink :to="propertyLink(e)">
              {{ e.name }}
            </NuxtLink>
          </li>
        </ul>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.c-reference-page.container {
  padding: 0
}

.c-reference-page >h1 {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #1e1e1e;
  margin: 0 0 10px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}

.c-reference-page.rare-items > .properties {
  -moz-column-count: 2;
  column-count: 2
}

.c-reference-page.rare-items > .properties.one-property > ul {
  -moz-column-count: unset;
  column-count: unset
}

.c-reference-page > .routes {
  display: flex;
  background-color: #ebf0f9;
  border-radius: 20px;
  height: 40px;
  position: relative
}

.c-reference-page > .routes > .background {
  position: absolute;
  height: 40px;
  top: 0;
  background-color: #3f51b5;
  border-radius: 20px;
  transition: .7s
}

.c-reference-page > .routes > h1 {
  color: #1a1a1a;
  padding: 0 5px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-grow: 1;
  font-weight: 600;
  font-size: 18px;
  line-height: 40px;
  border-radius: 20px;
  transition: .3s;
  margin: 0;
  z-index: 2;
  cursor: pointer
}

.c-reference-page > .routes > h1.active {
  color: #fff
}

.c-reference-page > .routes > h1:hover {
  background-color: #4960df;
  color: #fff
}

.c-reference-page > .letters {
  display: flex;
  margin: 20px auto;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 920px
}

.c-reference-page > .letters > span {
  padding: 0 10px;
  color: #1a1a1a;
  width: 15px;
  font-weight: 500;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 18px;
  background-color: #f9f9f9;
  margin: 3px 5px;
  border-radius: 4px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s
}

.c-reference-page > .letters > span:hover {
  color: #4e62d1;
  background-color: #eee;
  cursor: pointer
}

.c-reference-page > .letters > span.active {
  background-color: #4e62d1;
  color: #fff
}

.c-reference-page > .letters > span.no {
  color: #8e8e8e
}

.c-reference-page > .letters > span.no:hover {
  cursor: default;
  background-color: #f9f9f9
}

.c-reference-page > .failed-getting {
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center
}

.c-reference-page > .properties {
  padding: 10px;
  -moz-column-count: 4;
  column-count: 4;
  border-top: 1px solid #eee
}

.c-reference-page > .properties > ul {
  list-style: none;
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  page-break-inside: avoid;
  padding: 0
}

.c-reference-page > .properties > ul:first-child {
  margin-top: 0
}

.c-reference-page > .properties > ul > .letter {
  list-style: none
}

.c-reference-page > .properties > ul > .letter > h1 {
  font-size: 22px;
  margin: 0
}

.c-reference-page > .properties > ul > ul {
  list-style: none;
  padding: 0
}

.c-reference-page > .properties > ul > ul > .name {
  color: #1a1a1a;
  list-style: none;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding-top: 7px;
  padding-bottom: 7px
}

.c-reference-page > .properties > ul > ul > .name > a {
  color: #1a1a1a
}

.c-reference-page > .properties > ul > ul > .name > a:hover {
  color: #4e62d1;
  cursor: pointer
}

.c-reference-page > .properties.one-property {
  -moz-column-count: unset;
  column-count: unset
}

.c-reference-page > .properties.one-property > h1 {
  font-size: 22px;
  margin: 0
}

.c-reference-page > .properties.one-property > ul {
  margin: 0;
  -moz-column-count: 4;
  column-count: 4
}

.c-reference-page.mobile > .properties {
  margin-bottom: 40px
}

@media screen and (max-width: 1367px) {
  .c-reference-page.container {
    padding: 0 10px
  }
}

@media screen and (max-width: 850px) {
  .c-reference-page > .properties {
    -moz-column-count: 3;
    column-count: 3
  }

  .c-reference-page > .properties.one-property {
    -moz-column-count: unset;
    column-count: unset
  }

  .c-reference-page > .properties.one-property > ul {
    -moz-column-count: 3;
    column-count: 3
  }
}

@media screen and (max-width: 750px) {
  .c-reference-page > .routes {
    background-color: unset;
    border-radius: unset;
    height: unset;
    position: unset;
    flex-direction: column;
    align-items: center
  }

  .c-reference-page > .routes > .background {
    display: none
  }

  .c-reference-page > .routes > h1 {
    padding: 10px 30px;
    background-color: #f9f9f9;
    width: 170px;
    text-align: center;
    margin: 5px;
    border-radius: 4px;
    font-size: 13px;
    line-height: unset
  }

  .c-reference-page > .routes > h1.active {
    background-color: #3f51b5
  }
}

@media screen and (max-width: 666px) {
  .c-reference-page > .properties {
    -moz-column-count: 2;
    column-count: 2
  }

  .c-reference-page > .properties.one-property {
    -moz-column-count: unset;
    column-count: unset
  }

  .c-reference-page > .properties.one-property > ul {
    -moz-column-count: 2;
    column-count: 2
  }
}

@media screen and (max-width: 520px) {
  .c-reference-page.rare-items > .properties {
    -moz-column-count: 1;
    column-count: 1
  }

  .c-reference-page.rare-items > .properties.one-property {
    -moz-column-count: unset;
    column-count: unset
  }

  .c-reference-page.rare-items > .properties.one-property > ul, .c-reference-page > .properties {
    -moz-column-count: 1;
    column-count: 1
  }

  .c-reference-page > .properties.one-property {
    -moz-column-count: unset;
    column-count: unset
  }

  .c-reference-page > .properties.one-property > ul {
    -moz-column-count: 1;
    column-count: 1
  }
}

</style>