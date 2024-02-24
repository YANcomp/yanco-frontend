<script lang="ts" setup>
const props = defineProps({
  isBrandAnalogs: {
    type: Boolean
  },
  isNoPrices: {
    type: Boolean,
    default: false
  },
  isShowCategories: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number
  },
  min: {
    type: Number
  },
  minRange: {
    type: Number
  },
  preparedProductSubtypes: {
    type: Array
  },
  totalCount: {
    type: Number
  },
  productCount: {
    type: String
  },
  productCountButton: {
    type: String
  },
  productPropertyType: {
    type: Object
  },
  stockBabyProductCategories: {
    type: Array,
    default: function () {
      return []
    }
  },
  properties: {
    type: Object
  },
  propertyID: {
    type: <any>Number
  },
  propertyTypeID: {
    type: <any>Number
  },
  propertyName: {
    type: String
  },
  isSearchEmpty: {
    type: Boolean
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  isHorizontalCardsMode: {
    type: Boolean,
    default: false
  },
  pharmacies: {
    type: Array
  },
  favoritesPharmacies: {
    type: Array
  }
})

const route = useRoute()

const cFilterRef = ref(<any>undefined)
const priceRef = ref(<any>undefined)
const showCategoriesRef = ref(<any>undefined)
const categoriesRef = ref(<any>undefined)
const filtersRef = ref(<any>undefined)

const currentMax = ref(undefined)
const currentMin = ref(undefined)
const isShowPrices = ref(!0)
const preparedProperty = ref(props.properties)
const preparedPropertySubtypes = ref([])
const preparedPharmaciesFilter = ref([])
const preparedfavoritePharmacies = ref([])
const propertyLimit = ref(5)
const resetID = ref(0)
const selectedFilters = ref([])
const sortType = ref("Популярное")
const SORT_TYPES = ref(uSortTypes)
const isOpened = ref(false)
const openedSort = ref(false)
const searchCategoryName = ref("")
const isShowAllFreeShip = ref(!0)
const searchPharmacyAddress = ref("")
const isShowAllPharamcy = ref(false)
const pharamciesMode = ref("all")
const isFilterInHeader = ref(false)
const countSelectedPharmacy = ref(0)
const countSelectedSubtype = ref(0)
const filterTop = ref(0)
const productListOffset = ref(0)
const lastScrollTop = ref(0)
const isScrollTop = ref(false)
const snapshotSelectedFilters = ref("")
const snapshotSelectedPrices = ref("")
const isDraggingPrice = ref(false)
const isOpenedFilterPrice = ref(false)
const openedSortBar = ref(false)
const isManyCategories = ref(false)
const isCategoriesView = ref(false)
const isShowStockCategories = ref(!0)


const hasStockCategories = computed(() => {
  return props.stockBabyProductCategories.length > 0
})
const countSelectedFilters = computed(() => {
  var e = selectedFilters.value.length;
  return isNaN(props.propertyID) || isNaN(props.propertyTypeID) || props.isBrandAnalogs || (e -= 1), showPricesFilter.value && (e += 1), e
})
const directorySelectedFilter = computed(() => {
  return selectedFilters.value.reduce((e: any, t: any) => {
    void 0 !== t.subtypeID && (void 0 === e[666] && (e[666] = {}), e[666][t.subtypeID] = t)
    void 0 !== t.pharmacyID && (void 0 === e[777] && (e[777] = {}), e[777][t.pharmacyID] = t)
    void 0 !== t.categoryID && (void 0 === e[888] && (e[888] = {}), e[888][t.categoryID] = t)
    void 0 !== t.typeID && (void 0 === e[t.typeID] && (e[t.typeID] = {}), e[t.typeID][t.ID] = t)
    return e
  }, {})
})
const showButtonReset = computed(() => {
  return selectedFilters.value.length > (isNaN(props.propertyID) || isNaN(props.propertyTypeID) || props.isBrandAnalogs ? 1 : 2) || selectedFilters.value.length > (isNaN(props.propertyID) || isNaN(props.propertyTypeID) || props.isBrandAnalogs ? 0 : 1) && (void 0 !== currentMin.value && currentMin.value !== props.min || void 0 !== currentMax.value && currentMax.value !== props.max)
})
const hasFavoritePharmacies = computed(() => {
  return preparedfavoritePharmacies.value.length > 0
})
const preparedPharmacies = computed(() => {
  return "all" === pharamciesMode.value ? preparedPharmaciesFilter.value : preparedfavoritePharmacies.value
})
const showPricesFilter = computed(() => {
  return !(void 0 === currentMin.value && void 0 === currentMax.value || currentMin.value === props.min && currentMax.value === props.max)
})
const isFiltersSelected = computed(() => {
  return selectedFilters.value.length > (isNaN(props.propertyID) || isNaN(props.propertyTypeID) || props.isBrandAnalogs ? 0 : 1) || void 0 !== currentMin.value && currentMin.value !== props.min || void 0 !== currentMax.value && currentMax.value !== props.max
})

watch(() => openedSortBar.value, () => {

})
watch(() => isDraggingPrice.value, () => {

})
watch(() => pharamciesMode.value, () => {

})
watch(() => sortType.value, () => {

})
watch(() => props.preparedProductSubtypes, () => {

})
watch(() => props.pharmacies, () => {

})
watch(() => props.properties, () => {

})
watch(() => route.path, () => {

})

onBeforeMount(() => {

})
onMounted(() => {

})
onBeforeUnmount(() => {

})


function showHideCategories() {
  // this.isCategoriesView = !this.isCategoriesView;
  // var e = this.$refs.categories;
  // e.scrollHeight > 300 && (e.style.transition = "max-height 0.5s"), e.style.maxHeight = this.isCategoriesView ? "".concat(e.scrollHeight, "px") : "".concat(1.5 * e.children[0].scrollHeight, "px")
}

function checkCategories() {
  // var e = this.$refs.categories;
  // this.isManyCategories = e.scrollHeight > 1.5 * e.children[0].scrollHeight, e.style.maxHeight = "".concat(1.5 * e.children[0].scrollHeight, "px")
}

function dragging(b: any) {
  // this.isDraggingPrice = b
}

function emitPropertiesChanged() {
  // var e = this,
  //     t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
  // this.$emit("properties-changed", this.isBrandAnalogs || isNaN(this.propertyTypeID) ? this.selectedFilters : this.selectedFilters.filter((function (t) {
  //   return t.typeID !== e.propertyTypeID
  // })), t)
}

function onFilterPrices() {
  // var e, t;
  // this.isOpenedFilterPrice = !0, this.snapshotSelectedPrices = JSON.stringify({
  //   min: null !== (e = this.currentMin) && void 0 !== e ? e : this.min,
  //   max: null !== (t = this.currentMax) && void 0 !== t ? t : this.max
  // })
}

function leaveFilterPrices() {
  // var e, t;
  // this.isOpenedFilterPrice = !1, this.isDraggingPrice || this.snapshotSelectedPrices !== JSON.stringify({
  //   min: null !== (e = this.currentMin) && void 0 !== e ? e : this.min,
  //   max: null !== (t = this.currentMax) && void 0 !== t ? t : this.max
  // }) && this.$emit("prices-changed", this.currentMin, this.currentMax)
}

function onFilterType() {
  // this.snapshotSelectedFilters = JSON.stringify(this.directorySelectedFilter)
}

function leaveFilterType(e: any) {
  // this.sortActiveProperties(e), this.snapshotSelectedFilters !== JSON.stringify(this.directorySelectedFilter) && this.emitPropertiesChanged()
}

function checkScroll() {
  // var e, t;
  // this.lastScrollTop > window.scrollY ? (this.isScrollTop = !0, this.filterTop = (this.isMobile ? 0 : document.querySelector(".c-header").clientHeight) - 2 - (null !== (t = null === (e = this.$refs.categories) || void 0 === e ? void 0 : e.clientHeight) && void 0 !== t ? t : 0)) : (this.isScrollTop = !1, this.filterTop = -this.$refs["c-filter"].clientHeight), this.lastScrollTop = window.scrollY, this.isFilterInHeader = window.scrollY + (this.isFilterInHeader ? 42 : 0) > this.productListOffset
}

function changeCardsMode(e: any) {
  // this.isHorizontalCardsMode !== e && this.$emit("change-cards-mode", e)
}

function openCloseSort() {
  // this.isMobile && (this.openedSortBar = !this.openedSortBar)
}

function openFilter() {
  // var e = this;
  // (setTimeout((function () {
  //   var t, r;
  //   e.isOpened = !0, e.snapshotSelectedPrices = JSON.stringify({
  //     min: null !== (t = e.currentMin) && void 0 !== t ? t : e.min,
  //     max: null !== (r = e.currentMax) && void 0 !== r ? r : e.max
  //   }), e.snapshotSelectedFilters = JSON.stringify(e.directorySelectedFilter)
  // }), this.isMobile ? 300 : 0), document.body.style.overflow = "hidden", this.isMobile) ? this.$store.commit("app/".concat(c.APP.HIDE_MOBILE_FOOTER), !0) : (document.getElementById("app").style.paddingRight = "17px", this.$store.commit("app/".concat(c.APP.HIDE_CHAT_BOT), !0), document.querySelector(".c-header").style.zIndex = "99")
}

function closeFilter() {
  // var e, t, r = this;
  // this.isOpened = !1, this.snapshotSelectedPrices === JSON.stringify({
  //   min: null !== (e = this.currentMin) && void 0 !== e ? e : this.min,
  //   max: null !== (t = this.currentMax) && void 0 !== t ? t : this.max
  // }) && this.snapshotSelectedFilters === JSON.stringify(this.directorySelectedFilter) || this.emitPropertiesChanged(), setTimeout((function () {
  //   (document.body.style.overflow = "", r.isMobile) ? r.$store.commit("app/".concat(c.APP.HIDE_MOBILE_FOOTER), !1) : (document.getElementById("app").style.paddingRight = "0", r.$store.commit("app/".concat(c.APP.HIDE_CHAT_BOT), !1), document.querySelector(".c-header").style.zIndex = "999")
  // }), 450)
}

function resize() {
  // var e = this.$refs.filters,
  //     t = e.clientWidth,
  //     r = e.childElementCount;
  // this.isMobile ? Array.from(e.children).forEach((function (t, i) {
  //   0 === i || i === e.children.length - 1 ? t.style.display = "list-item" : e.children[i].style.display = "none"
  // })) : t / 200 < r && (r = Math.ceil(t / 200), Array.from(e.children).forEach((function (t, i) {
  //   i < r ? t.style.display = "list-item" : e.children[i - 1].style.display = "none"
  // })))
}

function filteringValues(e: any, s: any) {
  // 666 === e ? (this.isShowAllFreeShip = !0, this.preparedPropertySubtypes.forEach((function (e) {
  //   0 !== e.name.toLocaleLowerCase().indexOf(s.toLocaleLowerCase()) ? e.isShow = !1 : e.isShow = !0
  // }))) : 777 === e ? (this.isShowAllPharamcy = !0, this.preparedPharmacies.forEach((function (e) {
  //   0 !== e.address.toLocaleLowerCase().replace("ё", "е").indexOf(s.toLocaleLowerCase().replace("ё", "е")) ? e.isShow = !1 : e.isShow = !0
  // }))) : (this.preparedProperty[e].isShowAll = !0, this.preparedProperty[e].uniqueValue.forEach((function (e) {
  //   0 !== e.name.toLocaleLowerCase().indexOf(s.toLocaleLowerCase()) ? e.isShow = !1 : e.isShow = !0
  // })))
}

function removeFilter(e?: any, t?:any) {
  // var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  // if (void 0 !== e.typeID) {
  //   this.selectingFilter(e, !1, !0, t);
  //   var r = this.preparedProperty[e.typeID].uniqueValue.find((function (t) {
  //     return t.ID === e.ID
  //   }));
  //   r.isSelectedFilter = !1
  // }
  // if (void 0 !== e.subtypeID) {
  //   this.selectingFilter(e, !1, !0, t);
  //   var o = this.preparedPropertySubtypes.find((function (t) {
  //     return t.ID === e.subtypeID
  //   }));
  //   o.isSelectedFilter = !1
  // }
  // if (void 0 !== e.categoryID) {
  //   this.selectingFilter(e, !1, !0, t);
  //   var n = this.stockBabyProductCategories.find((function (t) {
  //     return t.ID === e.categoryID
  //   }));
  //   n.isSelectedFilter = !1
  // }
  // if (void 0 !== e.pharmacyID) {
  //   this.selectingFilter(e, !1, !0, t);
  //   var c = this.preparedPharmacies.find((function (t) {
  //     return t.ID === e.pharmacyID
  //   }));
  //   c.isSelectedFilter = !1
  // }
}

function changeRange(e: any, t: any) {
  // var r, o, n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
  //     c = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
  // this.productListOffset = null !== (o = null === (r = document.querySelector("#product-list")) || void 0 === r ? void 0 : r.offsetTop) && void 0 !== o ? o : 0, this.currentMin = e, this.currentMax = t, n && this.$emit("prices-changed", e, t, c)
}

function resetPrices(e?: any, t?: any) {
  // var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
  //     t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  // this.currentMin = void 0, this.currentMax = void 0, this.resetID += 1, e && this.$emit("prices-changed", void 0, void 0, t)
}

function resetFilterType(e: any) {
  // if (666 === e) {
  //   this.countSelectedSubtype = 0;
  //   var t, r = x(this.preparedPropertySubtypes);
  //   try {
  //     for (r.s(); !(t = r.n()).done;) {
  //       t.value.isSelectedFilter = !1
  //     }
  //   } catch (e) {
  //     r.e(e)
  //   } finally {
  //     r.f()
  //   }
  //   this.selectedFilters = this.selectedFilters.filter((function (e) {
  //     return void 0 === e.subtypeID
  //   }))
  // } else if (777 === e) {
  //   this.countSelectedPharmacy = 0;
  //   var o, n = x(this.preparedPharmacies);
  //   try {
  //     for (n.s(); !(o = n.n()).done;) {
  //       o.value.isSelectedFilter = !1
  //     }
  //   } catch (e) {
  //     n.e(e)
  //   } finally {
  //     n.f()
  //   }
  //   this.selectedFilters = this.selectedFilters.filter((function (e) {
  //     return void 0 === e.pharmacyID
  //   }))
  // } else {
  //   this.preparedProperty[e].countSelected = 0;
  //   var c, l = x(this.preparedProperty[e].uniqueValue);
  //   try {
  //     for (l.s(); !(c = l.n()).done;) {
  //       c.value.isSelectedFilter = !1
  //     }
  //   } catch (e) {
  //     l.e(e)
  //   } finally {
  //     l.f()
  //   }
  //   this.selectedFilters = this.selectedFilters.filter((function (e) {
  //     return void 0 === e.typeID
  //   }))
  // }
  // isNaN(this.propertyID) || isNaN(this.propertyTypeID) || this.isBrandAnalogs || this.selectedFilters.push({
  //   ID: this.propertyID,
  //   typeID: this.propertyTypeID,
  //   name: this.propertyName
  // }), this.emitPropertiesChanged(!1)
}

function resetFilters() {
  // var e, t;
  // this.currentMin = void 0, this.currentMax = void 0, this.resetID += 1, this.countSelectedPharmacy = 0, this.countSelectedSubtype = 0;
  // var r = [];
  // if (this.selectedFilters.length > 0) {
  //   var o, n = x(this.selectedFilters);
  //   try {
  //     for (n.s(); !(o = n.n()).done;) {
  //       var c = o.value;
  //       if (!(r.includes(c.typeID) || r.includes(c.subtypeID) || r.includes(c.categoryID) || r.includes(c.pharmacyID))) {
  //         if (void 0 !== c.subtypeID && r.push(c.subtypeID), void 0 !== c.categoryID && r.push(c.categoryID), void 0 !== c.pharmacyID && r.push(c.pharmacyID), void 0 !== c.typeID && r.push(c.typeID), r.includes(c.subtypeID)) {
  //           var l, d = x(this.preparedPropertySubtypes);
  //           try {
  //             for (d.s(); !(l = d.n()).done;) {
  //               l.value.isSelectedFilter = !1
  //             }
  //           } catch (e) {
  //             d.e(e)
  //           } finally {
  //             d.f()
  //           }
  //         }
  //         if (r.includes(c.categoryID)) {
  //           var h, y = x(this.stockBabyProductCategories);
  //           try {
  //             for (y.s(); !(h = y.n()).done;) {
  //               h.value.isSelectedFilter = !1
  //             }
  //           } catch (e) {
  //             y.e(e)
  //           } finally {
  //             y.f()
  //           }
  //         }
  //         if (r.includes(c.pharmacyID)) {
  //           var m, v = x(this.preparedPharmacies);
  //           try {
  //             for (v.s(); !(m = v.n()).done;) {
  //               m.value.isSelectedFilter = !1
  //             }
  //           } catch (e) {
  //             v.e(e)
  //           } finally {
  //             v.f()
  //           }
  //         }
  //         if (r.includes(c.typeID) && (c.typeID !== this.propertyTypeID || this.isBrandAnalogs)) {
  //           this.preparedProperty[c.typeID].countSelected = 0;
  //           var f, C = x(this.preparedProperty[c.typeID].uniqueValue);
  //           try {
  //             for (C.s(); !(f = C.n()).done;) {
  //               f.value.isSelectedFilter = !1
  //             }
  //           } catch (e) {
  //             C.e(e)
  //           } finally {
  //             C.f()
  //           }
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     n.e(e)
  //   } finally {
  //     n.f()
  //   }
  //   this.selectedFilters = [], isNaN(this.propertyID) || isNaN(this.propertyTypeID) || this.isBrandAnalogs || this.selectedFilters.push({
  //     ID: this.propertyID,
  //     typeID: this.propertyTypeID,
  //     name: this.propertyName
  //   })
  // }
  // this.snapshotSelectedFilters = JSON.stringify(this.directorySelectedFilter), this.snapshotSelectedPrices = JSON.stringify({
  //   min: null !== (e = this.currentMin) && void 0 !== e ? e : this.min,
  //   max: null !== (t = this.currentMax) && void 0 !== t ? t : this.max
  // }), this.$emit("reset")
}

function clickCategory(e: any) {
  // this.$set(e, "isSelectedFilter", !Boolean(e.isSelectedFilter)), this.selectingFilter({
  //   categoryID: e.ID,
  //   name: e.name
  // }, e.isSelectedFilter, !0)
}

function selectingFilter(i: any, e: any) {
  // var t, r, o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
  //     n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
  // this.productListOffset = null !== (r = null === (t = document.querySelector("#product-list")) || void 0 === t ? void 0 : t.offsetTop) && void 0 !== r ? r : 0, e ? (this.selectedFilters.push(i), void 0 !== i.typeID && this.preparedProperty[i.typeID].countSelected++, void 0 !== i.subtypeID && this.countSelectedSubtype++, void 0 !== i.pharmacyID && this.countSelectedPharmacy++) : (void 0 !== i.typeID && this.preparedProperty[i.typeID].countSelected--, void 0 !== i.subtypeID && this.countSelectedSubtype--, void 0 !== i.pharmacyID && this.countSelectedPharmacy--, this.selectedFilters.splice(this.selectedFilters.findIndex((function (e) {
  //   return void 0 !== i.subtypeID ? e.subtypeID === i.subtypeID : void 0 !== i.categoryID ? e.categoryID === i.categoryID : void 0 !== i.pharmacyID ? e.pharmacyID === i.pharmacyID : e.ID === i.ID && e.typeID === i.typeID
  // })), 1)), o && this.emitPropertiesChanged(n)
}

function sortActiveProperties(e: any) {
  // var t;
  // 666 === e ? this.preparedPropertySubtypes.sort((function (a, b) {
  //   return Number(b.isSelectedFilter) - Number(a.isSelectedFilter)
  // })) : 777 === e ? this.preparedPharmacies.sort((function (a, b) {
  //   return Number(b.isSelectedFilter) - Number(a.isSelectedFilter)
  // })) : null === (t = this.preparedProperty[e]) || void 0 === t || t.uniqueValue.sort((function (a, b) {
  //   return Number(b.isSelectedFilter) - Number(a.isSelectedFilter)
  // }))
}
</script>

<template>
  <div v-if="!isSearchEmpty" ref="cFilterRef"
       :class='["c-filter", { mobile: isMobile, opened: isOpened, header: isFilterInHeader }]'
       :style='{ top: filterTop + "px" }'>
    <div :class='["filter-side-bar", { opened: isOpened }]'>
      <div class="overlay" @click="closeFilter"/>
      <div class="side-bar">
        <div class="header">
          <div class="top">
            <span class="title">
              Фильтры
              <span v-if="countSelectedFilters > 0" class="count">({{ countSelectedFilters }})</span>
            </span>
            <span v-if="!isMobile" :class='["reset", { show: isFiltersSelected && showButtonReset }]'
                  @click="resetFilters">
              Сбросить все
              <span class="icon trash2"/>
            </span>
            <span class="icon close2" @click="closeFilter"/>
            <!--            TODO THIS -->
          </div>
        </div>
        <section class="scrollbar">
          <div v-if="isFiltersSelected" class="selected-filters">
            <span>
              Выбраны:
            </span>
            <ul>
              <li v-if="showPricesFilter" class="prices">
                <span class="name">
                  <span>от {{ currentMin }}</span>
                  <span>до {{ currentMax }} ₽</span>
                </span>
                <span class="icon close" @click="resetPrices(true, false)"/>
              </li>
              <li v-for="(t,o) in selectedFilters" :key="o"
                  v-show="t.ID !== propertyID && t.typeID !== propertyTypeID || void 0 !== t.subtypeID || void 0 !== t.categoryID">
                <span class="name" :data-tooltip="t.name">
                  {{t.name}}
                </span>
                <span class="icon close" @click="removeFilter(t, false)"/>
              </li>
              <li v-if="isMobile && showButtonReset" class="reset" @click="resetFilters">
                <span class="name">
                  Сбросить все
                </span>
              </li>
            </ul>
          </div>
          <ul>
            <li>stock</li>
            <li v-if="!isNoPrices" ref="priceRef" class="prices">
              <span class="property-name">
                Цена
                <span v-if="showPricesFilter" class="reset" @click="resetPrices(true, false)">
                  Сбросить
                </span>
              </span>
              cPriceRange
            </li>
            <li v-if="isShowCategories" ref="showCategoriesRef">
              <span class="property-name">
                Категория
                <span v-if="countSelectedSubtype > 0" class="reset" @click="resetFilterType(666)">
                  Сбросить
                </span>
              </span>
              <div class="search">
                <span class="icon search-mobile"/>
                cEdit
              </div>
              <div :class='["scrollbar", { show: isShowAllFreeShip }]'>
                checkBox v for preparedPropertySubtypes
              </div>
            </li>
            <li v-for="(p,t) in preparedProperty" :key="t" ref="t">
              <span class="property-name">
                {{productPropertyType[t].name}}
                <span v-if="p.countSelected > 0" class="reset" @click="resetFilterType(t)">
                  Сбросить
                </span>
              </span>
              <div class="search">
                <span class="icon search-mobile"/>
                cEdit
              </div>
              <div :class='["scrollbar", { show: p.isShowAll }]'>
                checkbox v-for p.uniqueValue
              </div>
            </li>
          </ul>
        </section>
        <div class="show-product">
          <UiCButton mode="primary" @click="closeFilter">
            {{totalCount > 0 ? productCountButton : "СОЖАЛЕЕМ, НИЧЕГО НЕ НАЙДЕНО"}}
          </UiCButton>
        </div>
      </div>
    </div>

    <div v-if="hasStockCategories && isShowStockCategories" id="categories" class="categories container">
      <div ref="categoriesRef" class="list">
        stockBabyProductCategories
      </div>
    </div>

    <div class="filters container">
      <ul ref="filtersRef">
        <li :class='["sort", { mobile: isMobile, opened: openedSort, "opened-bar": openedSortBar }]' @click="openCloseSort">
          <span class="property-name">
            Сортировка
            <span class="icon arrow-down2"/>
          </span>
          cDropDown
<!--          TODO -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>