<script lang="ts" setup>
const route = useRoute()
const appStore = useAppStore()
const catalogStore = useCatalogStore()

const catalogRef = ref(<any>undefined)
const buttonRef = ref(<any>undefined)

const isOpened = ref(false)
const typeID = ref(undefined)
const currentSubtype = ref(<any>{})

const hasCurrentSubtype = computed(() => {
  return undefined !== currentSubtype.value.ID
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const params: any = computed(() => {
  return appStore.params
})
const preparedCatalog: any = computed(() => {
  return catalogStore.catalogTree
})

watch(
    () => route.path,
    () => {
      closeCatalog()
    }
)

function setSubtype(val: any) {
  currentSubtype.value = val
}

function closeCatalog() {
  isOpened.value = false
  document.removeEventListener("keydown", esc)
  document.removeEventListener("click", outside)
  document.body.style.overflow = ""
  //TODO
  // this.$store.commit("app/".concat(z.APP.HIDE_CHAT_BOT), !1)
}

function esc(val: any) {
  "Escape" === val.code && closeCatalog()
}

function openCatalog() {
  document.body.style.overflow = "hidden"
  // TODO this.$store.commit("app/".concat(z.APP.HIDE_CHAT_BOT), !0)
  isOpened.value = true
  document.addEventListener("keydown", esc)
  document.addEventListener("click", outside)
  void 0 === typeID.value && (typeID.value = preparedCatalog.value[0].ID)
}

function openCloseCatalog() {
  isOpened.value ? closeCatalog() : openCatalog()
}

function outside(val: any) {
  var e = catalogRef.value,
      button = buttonRef.value,
      n = val.target;
  e.contains(n) || button.contains(n) || closeCatalog()
}

function setTypeID(val: any) {
  typeID.value = val
  currentSubtype.value = {}
}
</script>

<template>
  <div class="c-catalog">
    <button ref="buttonRef" @click="openCloseCatalog">
      <span :class='["burger", { opened: isOpened }]'>
        <span/>
        <span/>
        <span/>
      </span>
      <span>КАТАЛОГ</span>
    </button>
    <div ref="catalogRef" :class='{ opened: isOpened }'>
      <div class="container">
        <div class="types scrollbar">
          <ul>
            <li v-if="params?.isShowCoupons" class="special">
              <NuxtLink :to='{ name: "Stock", params: { slug: "coupons" } }'>
                <span class="icon flame"/>
                <span class="icon flame-internal"/>
                <span class="name">
                  Скидки по купонам
                </span>
              </NuxtLink>
            </li>
            <li v-for="(item, index) in preparedCatalog" :key="index" v-on:mouseover="setTypeID(item.ID)">
              <NuxtLink :class='{ selected: typeID === item.ID }'
                        :style='{ "--background": item.background, "--color": item.color }' :to="item.route">
                <span class="icon" :style='{ "mask-image": item.icon }'/>
                <span class="name">{{ item.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="sybtypes scrollbar">
          <template v-for="type in preparedCatalog" :key="'t'+type.ID">
            <ul v-if="type.ID === typeID">
              <li v-for="subtype in type.subtypes" :key="'st'+subtype.ID" @mouseover="setSubtype(subtype)">
                <NuxtLink :to="subtype.route" :class="{selected: subtype.ID === currentSubtype.ID}">
                  <span class="name">{{ subtype.name }}</span>
                  <UiCArrowSVG size="s" hoverColor="#3F51B5" color="#d6d6e1"/>
                </NuxtLink>
              </li>
            </ul>
          </template>

        </div>
        <div v-if="hasCurrentSubtype" class="categories scrollbar">
          <ul>
            <li v-for="(category, index) in currentSubtype.categories" :key="index">
              <nuxt-link :to="category.route">{{ category.name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="overlay" @click="openCloseCatalog"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-catalog .scrollbar::-webkit-scrollbar {
  width: 3px
}

.c-catalog .scrollbar::-webkit-scrollbar-track {
  background-color: #fff
}

.c-catalog .scrollbar::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.c-catalog > button {
  margin-right: 20px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  background-color: #3f51b5;
  border-radius: 5px;
  height: 40px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  flex-basis: 180px;
  flex-shrink: 0;
  letter-spacing: .065em;
  transition: .2s
}

.c-catalog > button:hover {
  background-color: #4960df
}

.c-catalog > button:active {
  background-color: #32408f
}

.c-catalog > button:focus {
  box-shadow: 0 0 0 2px rgba(63, 81, 181, .15)
}

.c-catalog > button .burger {
  height: 15px;
  width: 18px;
  margin-right: 10px;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  position: relative
}

.c-catalog > button .burger > span {
  height: 2px;
  width: 100%;
  display: block;
  position: absolute;
  background-color: #fff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .3s ease-in-out;
  transform-origin: left center
}

.c-catalog > button .burger > span:first-child {
  top: 2px
}

.c-catalog > button .burger > span:nth-child(2) {
  top: 7px
}

.c-catalog > button .burger > span:nth-child(3) {
  top: 12px
}

.c-catalog > button .burger.opened > span:first-child {
  transform: translateY(-1px) translateZ(0) rotate(42deg)
}

.c-catalog > button .burger.opened > span:nth-child(2) {
  width: 0;
  opacity: 0
}

.c-catalog > button .burger.opened > span:nth-child(3) {
  transform: translateY(1px) translateZ(0) rotate(-42deg)
}

.c-catalog > div {
  top: 90px;
  left: 0;
  position: absolute;
  visibility: hidden;
  width: 100%;
  max-height: 0;
  overflow: hidden;
  z-index: 999;
  opacity: 0;
  transition: .2s;
  background: linear-gradient(90deg, #fff 45%, rgba(30, 30, 30, 0) 55%)
}

.c-catalog > div.opened {
  visibility: visible;
  top: 60px;
  opacity: 1;
  max-height: calc(100vh - 60px)
}

.c-catalog > div > .container {
  display: flex;
  max-height: inherit;
  padding: 0
}

.c-catalog > div > .container > .types {
  background-color: #fff;
  flex-basis: 312px;
  border-right: 1px solid #d6d6e1;
  height: calc(100vh - 60px);
  min-width: 250px;
  z-index: 1
}

.c-catalog > div > .container > .types > ul {
  margin: 0;
  padding: 16px 0;
  list-style: none;
  top: 0
}

.c-catalog > div > .container > .types > ul > li > a {
  margin: 8px 0;
  padding: 0 2px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 16px;
  height: 38px;
  color: #1a1a1a;
  transition: .2s;
  font-weight: 500
}

.c-catalog > div > .container > .types > ul > li > a > .icon {
  margin-right: 8px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a;
  transition: .2s
}

.c-catalog > div > .container > .types > ul > li > a.nuxt-link-exact-active, .c-catalog > div > .container > .types > ul > li > a.selected, .c-catalog > div > .container > .types > ul > li > a:hover {
  color: var(--color);
  background-color: var(--background)
}

.c-catalog > div > .container > .types > ul > li > a.nuxt-link-exact-active > .icon, .c-catalog > div > .container > .types > ul > li > a.selected > .icon, .c-catalog > div > .container > .types > ul > li > a:hover > .icon {
  background-color: var(--color)
}

.c-catalog > div > .container > .types > ul > li.special > a {
  color: #1a1a1a;
  position: relative
}

.c-catalog > div > .container > .types > ul > li.special > a > .flame {
  background-color: #1a1a1a
}

.c-catalog > div > .container > .types > ul > li.special > a > .flame-internal {
  position: absolute;
  background-color: #ff0089
}

.c-catalog > div > .container > .types > ul > li.special > a.nuxt-link-exact-active, .c-catalog > div > .container > .types > ul > li.special > a.selected, .c-catalog > div > .container > .types > ul > li.special > a:hover {
  background-color: #f2e8ff;
  color: #ff0089
}

.c-catalog > div > .container > .types > ul > li.special > a.nuxt-link-exact-active > .flame, .c-catalog > div > .container > .types > ul > li.special > a.selected > .flame, .c-catalog > div > .container > .types > ul > li.special > a:hover > .flame {
  background-color: #ff0089
}

.c-catalog > div > .container > .categories, .c-catalog > div > .container > .sybtypes {
  z-index: 1;
  background-color: #fff;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
  max-width: 350px;
  width: 100%;
  overflow-y: auto;
  border-right: 7px solid #fff
}

.c-catalog > div > .container > .categories > ul, .c-catalog > div > .container > .sybtypes > ul {
  margin: 0;
  padding: 0;
  list-style: none
}

.c-catalog > div > .container > .categories > ul > li, .c-catalog > div > .container > .sybtypes > ul > li {
  margin-bottom: 17px;
  transition: .2s;
  max-width: 320px;
  line-height: 24px
}

.c-catalog > div > .container > .categories > ul > li > a, .c-catalog > div > .container > .sybtypes > ul > li > a {
  color: #1a1a1a;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between
}

.c-catalog > div > .container > .categories > ul > li > a.selected, .c-catalog > div > .container > .categories > ul > li > a:hover, .c-catalog > div > .container > .sybtypes > ul > li > a.selected, .c-catalog > div > .container > .sybtypes > ul > li > a:hover {
  color: #3f51b5;
  text-shadow: .5px 0 0 #3f51b5
}

.c-catalog > div > .container > .categories > ul > li > a.selected > .c-arrow-svg > div > span, .c-catalog > div > .container > .categories > ul > li > :deep(a:hover) > .c-arrow-svg > div > span, .c-catalog > div > .container > .sybtypes > ul > li > a.selected > .c-arrow-svg > div > span, .c-catalog > div > .container > .sybtypes > ul > li > :deep(a:hover) > .c-arrow-svg > div > span {
  background-color: #3f51b5
}

.c-catalog > div > .container > .categories > ul > li > a.selected > .c-arrow-svg > div > span:first-of-type, .c-catalog > div > .container > .categories > ul > li > :deep(a:hover) > .c-arrow-svg > div > span:first-of-type, .c-catalog > div > .container > .sybtypes > ul > li > a.selected > .c-arrow-svg > div > span:first-of-type, .c-catalog > div > .container > .sybtypes > ul > li > :deep(a:hover) > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-catalog > div > .container > .categories > ul > li > a.selected > .c-arrow-svg > div > span:last-of-type, .c-catalog > div > .container > .categories > ul > li > :deep(a:hover) > .c-arrow-svg > div > span:last-of-type, .c-catalog > div > .container > .sybtypes > ul > li > a.selected > .c-arrow-svg > div > span:last-of-type, .c-catalog > div > .container > .sybtypes > ul > li > :deep(a:hover) > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-catalog > div > .container > .categories > ul > li > a > .icon, .c-catalog > div > .container > .sybtypes > ul > li > a > .icon {
  min-width: 24px;
  background-color: #d6d6e1
}

.c-catalog > div > .container > .categories {
  border-left: 1px solid #d6d6e1
}

.c-catalog > div > .container > .overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(30, 30, 30, .70196)
}

@media screen and (max-width: 1367px) {
  .c-catalog > div > .container {
    padding: 0 20px
  }
}

@media screen and (max-width: 1200px) {
  .c-catalog > button {
    flex-basis: 120px
  }

  .c-catalog > button > span:last-child > span:last-child {
    display: none
  }
}

@media screen and (max-width: 850px) {
  .c-catalog {
    display: none
  }
}
</style>