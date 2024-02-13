<script lang="ts" setup>
const props = defineProps({
  currentCity: {
    type: <any>Object
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  isRegions: {
    type: Boolean,
    default: false
  },
  currentRegion: {
    type: <any>Object
  },
  dontChangeParentStyles: {
    type: Boolean,
    default: false
  },
  regionsStock: {
    type: <any>Object
  },
  isOpenSelector: {
    type: Boolean,
    default: false
  }
})

const cityName = ref("")
const isClosed = ref(true)
const isOpened = ref(false)
const isMouseDownOverlay = ref(false)

const buttonRef = ref(<any>undefined)
const citiesRef = ref(<any>undefined)
const overlayRef = ref(<any>undefined)

const appStore = useAppStore()
const citiesStore = useCitiesStore()
const regionsStore = useRegionsStore()

const cities = computed(() => {
  let citiesVar = citiesStore.list
  if (citiesVar) {
    watchCities(citiesVar)
    return citiesVar
  } else {
    return []
  }
})
const citiesInfo = computed(() => {
  var t = uPluralize(params.value.citiesCount, ["город", "города", "городов"]),
      e = uPluralize(params.value.regionsCount, ["регионе", "регионах", "регионах"]);
  return "".concat(params.value.citiesCount, " ").concat(t, " в ").concat(params.value.regionsCount, " ").concat(e, " России. Найдите свой город.")
})
const isCityLoaded = computed(() => {
  return props.currentCity != undefined
})
const isNotResult = computed(() => {
  return searchedCities.value.length < 1
})
const isSearched = computed(() => {
  return cityName.value.length > 0
})
const params = computed(() => {
  return appStore.params
})
const regions = computed(() => {
  return regionsStore.regions
})
const searchedCities = computed(() => {
  return cities.value.reduce((e: any, n: any) => {
    var o;
    return 0 === n.name.toLocaleLowerCase().replace("ё", "е").indexOf(cityName.value.toLocaleLowerCase().replace("ё", "е")) && e.push({
      ...n,
      regionName: null === (o = regions.value.find((t: any) => {
        return t.ID === n.regionID
      })) || void 0 === o ? void 0 : o.name
    }), e
  }, [])
})
const topTenCities = computed(() => {
  return params.value.topCitiesIDs.reduce((e: any, n: any) => {
    let r = cities.value.find((t: any) => {
      return t.ID === n
    });
    return void 0 !== r && e.push(r), e
  }, [])
})

const regionsHasStock = computed(() => {
  return regions.value.filter((e: any) => {
    return void 0 !== props.regionsStock[e.ID]
  })
})


watch(() => cities.value, () => {
  watchCities(cities.value)
});
watch(() => props.isOpenSelector, (val: any) => {
  val && openCloseOverlay()
});
watch(() => isOpened.value, (val: any) => {
  if (val) {
    setTimeout(() => {
      let input = citiesRef.value.querySelector("input");
      if (input !== null) {
        input.focus()
      }
    }, 200)
  }
});

const emit = defineEmits(["region-select"])

function changeCity(t: any) {
  if (props.isRegions) {
    emit("region-select", t)
    closeOverlay()
    clear()
  } else {
    citiesStore.CITIES_UPD(t).finally(() => {
      closeOverlay()
      clear()
    })
  }
}

function clear() {
  cityName.value = ""
}

function closeOverlay() {
  isClosed.value || openCloseOverlay()
}

function openCloseOverlay() {
  if (isOpened.value) {
    isClosed.value = !isClosed.value
    document.removeEventListener("keydown", esc)
    document.removeEventListener("mousedown", mouseDown)
    document.removeEventListener("mouseup", mouseUp)
    setTimeout(() => {
      isOpened.value = !isOpened.value
      document.body.style.overflow = ""
      if (props.isMobile) {
        let e: any = document.querySelector(".c-footer-mobile")?.querySelector(".navigation");
        e.style.overflow = "auto"
        e.style.position = "absolute"
      }
      // let appID: any = document.getElementById("app")
      // appID.style.paddingRight = "0"
      overlayRef.value.style.visibility = "hidden"
    }, 450)
  } else {
    isOpened.value = !isOpened.value
    isClosed.value = !isClosed.value
    setTimeout(() => {
      document.addEventListener("keydown", esc)
      document.addEventListener("mousedown", mouseDown)
      document.addEventListener("mouseup", mouseUp)
    }, 450)
    document.body.style.overflow = "hidden"

    if (props.isMobile) {
      let e: any = document.querySelector(".c-footer-mobile")?.querySelector(".navigation");
      e.style.overflow = "hidden"
      e.style.position = "initial"
    }
    // let appID: any = document.getElementById("app")
    // appID.style.paddingRight = "17px"
    overlayRef.value.style.visibility = "visible"
  }
}

function esc(t: any) {
  "Escape" === t.code && closeOverlay()
}

function mouseDown(event: any) {
  let refCities = citiesRef.value,
      button = buttonRef.value,
      target = event.target,
      changeCity = document.querySelector(".change-city"),
      arrayAllow = [refCities, button];

  if (changeCity !== null) {
    arrayAllow.push(changeCity)
  }

  isMouseDownOverlay.value = arrayAllow.every((function (item) {
    return !item.contains(target)
  }))
}

function mouseUp(t: any) {
  isMouseDownOverlay.value && closeOverlay()
}

function watchCities(cityComputed: any) {
  let cityFromStorage = JSON.parse(<any>localStorage.getItem("city"))
  if (cityFromStorage !== null) {
    let o = cityComputed.find((cityFind: any) => {
      return cityFind.ID === cityFromStorage.ID
    });
    if (o) {
      cityFromStorage = o
    }
  } else {
    let cityDefault = cityComputed.find((city: any) => {
      return "Москва" === city.name
    })
    if (cityDefault) {
      cityFromStorage = cityDefault
    }
  }
  citiesStore.CITIES_UPD(cityFromStorage)
}
</script>

<template>
  <div :class='["c-select-city", { mobile: isMobile }]'>
    <button v-if="isCityLoaded" ref="buttonRef" :data-tooltip='(isRegions ? currentRegion : currentCity).name'
            @click="openCloseOverlay">
      <span class="icon select-city"/>
      <span class="name">{{ (isRegions ? currentRegion : currentCity).name }}</span>
    </button>

    <div v-if="isCityLoaded" ref="overlayRef" :class='{ opened: isOpened, closed: isClosed }'
         :style='{ visibility: "hidden" }'>
      <div ref="citiesRef" :class='{ opened: isOpened, closed: isClosed }'>
        <div class="search">
          <span class="icon arrow-left" @click="closeOverlay"/>
          <div>
            <input v-if="!isRegions" v-model.trim="cityName" placeholder="Найдите свой город" @blur="$forceUpdate()">
            <span v-if="!isSearched" class="icon search"></span>
            <span v-show="cityName.length > 0" class="icon clear close2" @click="clear"></span>
            <span class="icon close2" @click="closeOverlay"></span>
          </div>
        </div>

        <div :class='[{ cities: !isRegions, regions: isRegions }]'>
          <div v-for="(itemCities,index) in isRegions ? regionsHasStock : isSearched ? searchedCities : topTenCities"
               :key="index" :class='{ current: itemCities.ID === (isRegions ? currentRegion : currentCity).ID }'
               @click="changeCity(itemCities)">
            <span v-if="itemCities.ID === (isRegions ? currentRegion : currentCity).ID" class="icon select-city"/>

            <span>
              <template v-if="isSearched">
                <div>{{ itemCities.name }}</div>
                <span class="locality">{{
                    "districtName" in itemCities ? itemCities.regionName + ", " + itemCities.districtName : itemCities.regionName
                  }}</span>
              </template>
              <template v-else>
                <span>
                  {{ itemCities.name }}
                  <span v-if="isRegions" class="count">{{ "(" + regionsStock[itemCities.ID] || 0 + ")" }}</span>
                </span>
              </template>
            </span>
            <span v-if="isNotResult">Город не найден</span>
            <div v-if="isRegions && 0 === regionsHasStock.length" class="no-regions">
              К сожалению, по Вашему запросу ничего не найдено
              <span>Попробуйте изменить критерии поиска</span>
            </div>
          </div>
          <div class="cities-info">{{ citiesInfo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-select-city {
  height: 24px;
}

.c-select-city > button {
  display: flex;
  align-items: center;
  border: 0;
  background-color: transparent;
  outline: none;
  font-weight: 400;
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;
  padding: 0;
  -webkit-tap-highlight-color: transparent
}

.c-select-city > button:active, .c-select-city > button:hover {
  color: #3f51b5
}

.c-select-city > button > .icon {
  background-color: #ff0089;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-select-city > button > .name {
  font-weight: 700
}

.c-select-city > div {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, .75);
  z-index: 9999;
  display: flex;
  opacity: 0
}

.c-select-city > div.opened {
  transition: opacity .3s ease-in-out;
  opacity: 1
}

.c-select-city > div.closed {
  transition: opacity .3s ease-in-out .25s;
  opacity: 0
}

.c-select-city > div > div {
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100%;
  max-width: 493px;
  background-color: #fff;
  padding: 0 5px 0 10px;
  margin-left: auto;
  margin-right: -493px;
  transition: all .45s ease-in-out;
  overflow-x: hidden;
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  overflow-y: scroll
}

.c-select-city > div > div::-webkit-scrollbar {
  width: 5px
}

.c-select-city > div > div::-webkit-scrollbar-track {
  background-color: #fff
}

.c-select-city > div > div::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #a2a2a2
}

.c-select-city > div > div.opened {
  margin-right: 0
}

.c-select-city > div > div.closed {
  margin-right: -493px
}

.c-select-city > div > div > .search {
  width: -webkit-fill-available;
  width: -moz-available;
  position: fixed;
  max-width: 493px;
  display: flex;
  justify-content: center;
  padding-top: 16px;
  background-color: #fff;
  margin: 0 10px;
  z-index: 1
}

.c-select-city > div > div > .search > .arrow-left {
  display: none;
  background-color: #1e1e1e
}

.c-select-city > div > div > .search > div {
  display: flex;
  max-width: 450px;
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
  position: relative
}

.c-select-city > div > div > .search > div > input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  border: none;
  padding-left: 14px;
  padding-right: 35px;
  outline: none;
  background: #ebf0f9;
  border-radius: 5px;
  box-sizing: border-box
}

.c-select-city > div > div > .search > div > input:focus {
  border: 1px solid #3f51b5;
  margin-left: -1px;
  margin-right: 1px
}

.c-select-city > div > div > .search > div > .icon {
  position: absolute;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  -webkit-mask-position: center;
  mask-position: center;
  cursor: pointer;
  transition: all .3s ease-in-out;
  -webkit-tap-highlight-color: transparent
}

.c-select-city > div > div > .search > div > .icon.close2:hover:not(.clear) {
  transform: rotate(180deg)
}

.c-select-city > div > div > .search > div > .icon.search {
  right: 10px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #3f51b5;
  cursor: default
}

.c-select-city > div > div > .search > div > .icon.clear {
  right: 5px;
  -webkit-mask-size: 35%;
  mask-size: 35%
}

.c-select-city > div > div > .search > div > .icon.clear:hover {
  background-color: #3f51b5
}

.c-select-city > div > div > .search > div > .icon:last-of-type {
  background-color: #fff;
  left: -65px;
  width: 27px;
  margin: 0;
  top: 0
}

.c-select-city > div > div > .cities, .c-select-city > div > div > .regions {
  display: flex;
  flex-flow: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  max-width: 450px;
  width: 100%;
  height: 100%;
  margin-top: 66px;
  padding-bottom: 10px
}

.c-select-city > div > div > .cities.regions, .c-select-city > div > div > .regions.regions {
  margin-top: 25px
}

.c-select-city > div > div > .cities > span, .c-select-city > div > div > .regions > span {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin-top: 10px
}

.c-select-city > div > div > .cities > div, .c-select-city > div > div > .regions > div {
  line-height: 20px;
  margin-top: 26px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer
}

.c-select-city > div > div > .cities > div:first-of-type, .c-select-city > div > div > .regions > div:first-of-type {
  margin-top: 10px
}

.c-select-city > div > div > .cities > div:hover:not(.current):not(.no-regions) > span, .c-select-city > div > div > .regions > div:hover:not(.current):not(.no-regions) > span {
  color: #3f51b5
}

.c-select-city > div > div > .cities > div.no-regions, .c-select-city > div > div > .regions > div.no-regions {
  flex-flow: column;
  cursor: default;
  margin: auto
}

.c-select-city > div > div > .cities > div > span, .c-select-city > div > div > .regions > div > span {
  font-size: 16px
}

.c-select-city > div > div > .cities > div > span > :last-child, .c-select-city > div > div > .regions > div > span > :last-child {
  font-weight: 400
}

.c-select-city > div > div > .cities > div > span > :first-child, .c-select-city > div > div > .regions > div > span > :first-child {
  font-weight: 600
}

.c-select-city > div > div > .cities > div > span > .locality, .c-select-city > div > div > .regions > div > span > .locality {
  color: #8e8e8e;
  font-size: 14px
}

.c-select-city > div > div > .cities > div > span > span > .count, .c-select-city > div > div > .regions > div > span > span > .count {
  color: #ff0089
}

.c-select-city > div > div > .cities > div.current > span > :first-child, .c-select-city > div > div > .regions > div.current > span > :first-child {
  font-weight: 700
}

.c-select-city > div > div > .cities > div.current > span.icon, .c-select-city > div > div > .regions > div.current > span.icon {
  background-color: #ff0089;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  margin-right: 5px
}

.c-select-city > div > div > .cities-info {
  margin-top: auto;
  align-self: flex-start;
  padding: 20px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 600
}

.c-select-city.mobile > button, .c-select-city.mobile {
  width: 100%
}

@media screen and (max-width: 504px) {
  .c-select-city > div > div > .search {
    max-width: unset;
    padding: 10px 0;
    margin: 0;
    border-radius: 0 0 15px 15px;
    box-shadow: 1px 1px 10px rgba(12, 7, 38, .1);
    align-items: center;
    justify-content: space-around
  }

  .c-select-city > div > div > .search > .arrow-left {
    display: block;
    -webkit-mask-size: 75%;
    mask-size: 75%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center
  }

  .c-select-city > div > div > .search > div {
    max-width: unset;
    width: 80%;
    margin-bottom: 0
  }

  .c-select-city > div > div > .search > div > input {
    width: 100%;
    height: 38px
  }

  .c-select-city > div > div > .search > div > .icon.search {
    right: 5px;
    -webkit-mask-size: 90%;
    mask-size: 90%
  }

  .c-select-city > div > div > .search > div > .icon.close2:not(.clear) {
    display: none
  }

  .c-select-city > div > div > .cities, .c-select-city > div > div > .regions {
    max-width: unset
  }

  .c-select-city > div > div > .cities.regions, .c-select-city > div > div > .regions.regions {
    margin-top: 45px
  }

  .c-select-city > div > div > .cities.regions > .no-regions, .c-select-city > div > div > .regions.regions > .no-regions {
    white-space: normal;
    text-align: center
  }

  .c-select-city > div > div > .cities-info {
    padding: 20px 0
  }
}

@media screen and (max-width: 425px) {
  .c-select-city > div > div > .cities > div:not(.no-regions) > span, .c-select-city > div > div > .regions > div:not(.no-regions) > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 400px
  }

  .c-select-city > div > div > .cities > div:not(.no-regions).current > span, .c-select-city > div > div > .regions > div:not(.no-regions).current > span {
    max-width: 370px
  }
}

@media screen and (max-width: 375px) {
  .c-select-city > div > div > .cities > div > span, .c-select-city > div > div > .regions > div > span {
    max-width: 350px
  }

  .c-select-city > div > div > .cities > div.current > span, .c-select-city > div > div > .regions > div.current > span {
    max-width: 330px
  }
}

@media screen and (max-width: 360px) {
  .c-select-city > div > div > .cities > div > span, .c-select-city > div > div > .regions > div > span {
    max-width: 340px
  }

  .c-select-city > div > div > .cities > div.current > span, .c-select-city > div > div > .regions > div.current > span {
    max-width: 320px
  }
}

@media screen and (max-width: 341px) {
  .c-select-city > div > div > .cities > div > span, .c-select-city > div > div > .regions > div > span {
    max-width: 310px
  }

  .c-select-city > div > div > .cities > div.current > span, .c-select-city > div > div > .regions > div.current > span {
    max-width: 270px
  }
}
</style>