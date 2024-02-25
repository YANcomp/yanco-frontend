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
    type: <any>Array
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
const emit = defineEmits(["change-cards-mode", "prices-changed", "reset", "properties-changed"])

const route = useRoute()
const appStore = useAppStore()
const cFilterRef = ref(<any>undefined)
const priceRef = ref(<any>undefined)
const showCategoriesRef = ref(<any>undefined)
const categoriesRef = ref(<any>undefined)
const filtersRef = ref(<any>undefined)

const currentMax = ref(undefined)
const currentMin = ref(undefined)
const isShowPrices = ref(!0)
const preparedProperty = ref(<any>props.properties)
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
  let r: any = document.querySelector("#product-list")
  productListOffset.value = r ? r.offsetTop : 0
  filterTop.value = (props.isMobile ? 0 : <any>document.querySelector(".c-header")?.clientHeight) - 2
  isFilterInHeader.value = window.scrollY + (isFilterInHeader.value ? 42 : 0) > productListOffset.value
  document.addEventListener("scroll", checkScroll)
  if (props.isShowCategories && props.preparedProductSubtypes.length > 0) {
    preparedPropertySubtypes.value = props.preparedProductSubtypes.map((p: any) => {
      return {
        ...p,
        isSelectedFilter: !1,
        isShow: !0
      }
    }).sort((a: any, b: any) => {
      return a.name < b.name ? -1 : 1
    })
  }
  window.addEventListener("resize", resize)
  resize()
  hasStockCategories.value && !props.isMobile && checkCategories()
})
onBeforeUnmount(() => {

})


function showHideCategories() {
  isCategoriesView.value = !isCategoriesView.value;
  let e = categoriesRef.value;
  e.scrollHeight > 300 && (e.style.transition = "max-height 0.5s")
  e.style.maxHeight = isCategoriesView.value ? "".concat(e.scrollHeight, "px") : "" + (1.5 * e.children[0].scrollHeight) + "px"
}

function checkCategories() {
  let e = categoriesRef.value;
  isManyCategories.value = e.scrollHeight > 1.5 * e.children[0].scrollHeight
  e.style.maxHeight = "" + (1.5 * e.children[0].scrollHeight) + "px"
}

function dragging(b: any) {
  isDraggingPrice.value = b
}

function emitPropertiesChanged() {
  var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
  emit("properties-changed", props.isBrandAnalogs || isNaN(props.propertyTypeID) ? selectedFilters.value : selectedFilters.value.filter((t: any) => {
    return t.typeID !== props.propertyTypeID
  }), t)
}

function onFilterPrices() {
  isOpenedFilterPrice.value = !0
  snapshotSelectedPrices.value = JSON.stringify({
    min: currentMin.value ? currentMin.value : props.min,
    max: currentMax.value ? currentMax.value : props.max
  })
}

function leaveFilterPrices() {
  isOpenedFilterPrice.value = false
  isDraggingPrice.value || snapshotSelectedPrices.value !== JSON.stringify({
    min: currentMin.value ? currentMin.value : props.min,
    max: currentMax.value ? currentMax.value : props.max
  }) && emit("prices-changed", currentMin.value, currentMax.value)
}

function onFilterType(e?: any) {
  snapshotSelectedFilters.value = JSON.stringify(directorySelectedFilter.value)
}

function leaveFilterType(e: any) {
  sortActiveProperties(e)
  snapshotSelectedFilters.value !== JSON.stringify(directorySelectedFilter.value) && emitPropertiesChanged()
}

function checkScroll() {
  if (lastScrollTop.value > window.scrollY) {
    isScrollTop.value = true
    filterTop.value = (props.isMobile ? 0 : <any>document.querySelector(".c-header")?.clientHeight) - 2 - (categoriesRef.value?.clientHeight ? categoriesRef.value.clientHeight : 0)
  } else {
    isScrollTop.value = !1
    filterTop.value = -cFilterRef.value.clientHeight
  }
  lastScrollTop.value = window.scrollY
  isFilterInHeader.value = window.scrollY + (isFilterInHeader.value ? 42 : 0) > productListOffset.value
}

function changeCardsMode(e: any) {
  props.isHorizontalCardsMode !== e && emit("change-cards-mode", e)
}

function openCloseSort() {
  props.isMobile && (openedSortBar.value = !openedSortBar.value)
}

function openFilter() {
  setTimeout(() => {
    isOpened.value = true
    snapshotSelectedPrices.value = JSON.stringify({
      min: currentMin.value ? currentMin.value : props.min,
      max: currentMax.value ? currentMax.value : props.max
    })
    snapshotSelectedFilters.value = JSON.stringify(directorySelectedFilter.value)
  }, props.isMobile ? 300 : 0)

  document.body.style.overflow = "hidden"

  if (props.isMobile) {
    appStore.COMMIT_HIDE_MOBILE_FOOTER(true)
  } else {
    appStore.COMMIT_HIDE_CHAT_BOT(true)
    document.querySelector(".c-header")!.style.zIndex = "99"
  }
}

function closeFilter() {
  isOpened.value = false
  snapshotSelectedPrices.value === JSON.stringify({
    min: currentMin.value ? currentMin.value : props.min,
    max: currentMax.value ? currentMax.value : props.max
  }) && snapshotSelectedFilters.value === JSON.stringify(directorySelectedFilter.value) || emitPropertiesChanged()
  setTimeout(() => {
    document.body.style.overflow = ""
    if (props.isMobile) {
      appStore.COMMIT_HIDE_MOBILE_FOOTER(false)
    } else {
      appStore.COMMIT_HIDE_CHAT_BOT(false)
      document.querySelector(".c-header")!.style.zIndex = "999"
    }
  }, 450)
}

function resize() {
  var e = filtersRef.value,
      t = e.clientWidth,
      r = e.childElementCount;
  props.isMobile ? Array.from(e.children).forEach((t: any, i: any) => {
    0 === i || i === e.children.length - 1 ? t.style.display = "list-item" : e.children[i].style.display = "none"
  }) : t / 200 < r && (r = Math.ceil(t / 200), Array.from(e.children).forEach((t: any, i: any) => {
    i < r ? t.style.display = "list-item" : e.children[i - 1].style.display = "none"
  }))
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

function removeFilter(e?: any, t?: any) {
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
                  {{ t.name }}
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
                {{ productPropertyType[t].name }}
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
            {{ totalCount > 0 ? productCountButton : "СОЖАЛЕЕМ, НИЧЕГО НЕ НАЙДЕНО" }}
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
        <li :class='["sort", { mobile: isMobile, opened: openedSort, "opened-bar": openedSortBar }]'
            @click="openCloseSort">
          <span class="property-name">
            Сортировка
            <span class="icon arrow-down2"/>
          </span>

          <!--          TODO -->
        </li>
        <li v-if="!isMobile && !isNoPrices" :class='{ opened: isOpenedFilterPrice || isDraggingPrice }'
            v-on:mouseenter="onFilterPrices" v-on:mouseleave="leaveFilterPrices">
          <span class="property-name">
            Цена
            <span v-if="showPricesFilter" class="badge">(1)</span>
            <span class="icon arrow-down2"/>
          </span>

          <!--          TODO -->
        </li>
        <li v-if="isShowCategories && preparedPropertySubtypes.length > 0 && !isMobile" class="property"
            v-on:mouseleave="leaveFilterType(666)" v-on:mouseenter="onFilterType(666)">
          <span class="property-name">
            Категория
            <span v-if="countSelectedSubtype > 0" class="badge">
              ({{ countSelectedSubtype }})
            </span>
            <span class="icon arrow-down2"/>
          </span>

          <!--          TODO -->

        </li>
        <li v-for="(p,t) in preparedProperty" v-show="!isMobile" :key="t" ref="t" class="property"
            v-on:mouseleave="leaveFilterType(t)"
            v-on:mouseenter="onFilterType(t)">
          <span class="property-name">
            {{ productPropertyType[t].name }}
            <span v-if="p.countSelected > 0" class="badge">({{ p.countSelected }})</span>
            <span class="icon arrow-down2"/>
          </span>
          <!--          TODO -->

        </li>

        <li class="all-filters" @click="openFilter">
          <span class="property-name">
            <span class="icon filter"/>
            Все фильтры
            <span v-if="countSelectedFilters > 0 && isMobile">
              ({{ countSelectedFilters }})
            </span>
          </span>
        </li>
      </ul>
      <div v-if="!isMobile" class="card-modes">
        <span :class='["icon grid-vertical", { actived: !isHorizontalCardsMode }]' data-tooltip="Вертикальные карточки"
              @click="changeCardsMode(false)"/>
        <span :class='["icon grid-horizontal", { actived: isHorizontalCardsMode }]'
              data-tooltip="Горизонтальные карточки"
              @click="changeCardsMode(true)"/>
      </div>
    </div>
    <div v-show="isFiltersSelected" class="selected-filters container">
      <span v-show="!isMobile">
        Выбраны:
      </span>
      <ul>
        <li v-if="showPricesFilter" class="prices">
          <span class="name">
            <span>от {{ currentMin }}</span>
            <span>до {{ currentMax }} ₽</span>
          </span>
          <span class="icon close" @click="resetPrices"/>
        </li>
        <li v-for="(t,o) in selectedFilters"
            v-show="t.ID !== propertyID && t.typeID !== propertyTypeID || void 0 !== t.subtypeID || void 0 !== t.categoryID"
            :key="o">
          <span class="name" :data-tooltip="t.name">
            {{ t.name }}
          </span>
          <span class="icon close" @click="removeFilter(t)"/>
        </li>
        <li v-show="showButtonReset" class="reset" @click="resetFilters">
          <span class="name">Сбросить все</span>
        </li>
      </ul>
    </div>
    <div v-if="isMobile && totalCount > 0" class="count">
      <span>{{ productCount }}</span>
      <div class="card-modes">
        <span :class='["icon grid-vertical", { actived: !isHorizontalCardsMode }]' @click="changeCardsMode(false)"/>
        <span :class='["icon grid-horizontal", { actived: isHorizontalCardsMode }]' @click="changeCardsMode(true)"/>
      </div>
    </div>
    <div v-if="isMobile">
      <!--      cBottomBar-->
    </div>
  </div>
</template>

<style scoped>
.c-filter {
  background-color: #fff;
  z-index: 998;
  position: sticky;
  max-width: unset !important;
  transition: all .4s ease-in-out
}

.c-filter > .sort-bar .bar {
  max-width: unset;
  padding: 20px 0
}

.c-filter > .sort-bar .bar > .top {
  padding: 0 20px
}

.c-filter > .sort-bar .bar > .values > .radio-group > .c-radio-button {
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 10px 20px
}

.c-filter > .sort-bar .bar > .values > .radio-group > .c-radio-button.actived {
  background-color: #ebf0f9;
  font-weight: 500
}

.c-filter.header {
  box-shadow: 0 8px 10px rgba(12, 7, 38, .1)
}

.c-filter .container {
  padding: 0
}

.c-filter.opened {
  z-index: 999
}

.c-filter > .count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px
}

.c-filter > .count > span {
  font-weight: 600;
  font-size: 13px;
  color: #ff0089
}

.c-filter > .count > .card-modes {
  display: flex
}

.c-filter > .count > .card-modes > .icon {
  cursor: pointer;
  background-color: #818ca9
}

.c-filter > .count > .card-modes > .icon.actived {
  display: none
}

.c-filter > .count > .card-modes > .icon:hover {
  background-color: #4960df
}

.c-filter .scrollbar::-webkit-scrollbar {
  width: 3px
}

.c-filter .scrollbar::-webkit-scrollbar-track {
  background-color: #fff
}

.c-filter .scrollbar::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.c-filter > .filter-side-bar {
  height: 100%;
  width: 100%;
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: opacity .3s
}

.c-filter > .filter-side-bar.opened {
  visibility: visible
}

.c-filter > .filter-side-bar.opened > .overlay {
  background-color: rgba(0, 0, 0, .75)
}

.c-filter > .filter-side-bar.opened > .side-bar {
  margin-right: 0
}

.c-filter > .filter-side-bar > .overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 9998;
  transition: .3s;
  background-color: transparent
}

.c-filter > .filter-side-bar > .side-bar {
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  width: -moz-available;
  max-width: 491px;
  margin-right: -550px;
  position: relative;
  transition: .45s ease-in-out;
  z-index: 9999;
  height: 100%;
  margin-left: auto;
  background-color: #fff;
  padding: 25px 0 10px;
  box-sizing: border-box
}

.c-filter > .filter-side-bar > .side-bar > * {
  padding: 0 27px
}

.c-filter > .filter-side-bar > .side-bar > .header > .top {
  height: 50px;
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 7px
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .title {
  font-weight: 600;
  font-size: 24px;
  color: #1a1a1a
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .title > .count {
  color: #ff0089
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .reset {
  opacity: 0;
  color: #8e8e8e;
  transition: .2s;
  visibility: hidden;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  align-items: center
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .reset > .icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  -webkit-mask-size: 20px;
  mask-size: 20px;
  background-color: #8e8e8e
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .reset:hover {
  color: #4960df
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .reset:hover > .icon {
  background-color: #4960df
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .reset.show {
  visibility: visible;
  opacity: 1
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .close2 {
  position: absolute;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  -webkit-mask-position: center;
  mask-position: center;
  cursor: pointer;
  transition: all .3s ease-in-out;
  -webkit-tap-highlight-color: transparent;
  background-color: #fff;
  left: -80px;
  width: 27px;
  margin: 0;
  top: 0
}

.c-filter > .filter-side-bar > .side-bar > .header > .top > .close2:hover {
  transform: rotate(180deg)
}

.c-filter > .filter-side-bar > .side-bar > .header > .count {
  font-weight: 500;
  font-size: 14px;
  color: #ff0089;
  margin-bottom: 20px
}

.c-filter > .filter-side-bar > .side-bar > section {
  display: flex;
  flex-direction: column;
  overflow-y: auto
}

.c-filter > .filter-side-bar > .side-bar > section > .selected-filters {
  flex-direction: column;
  padding-left: 7px
}

.c-filter > .filter-side-bar > .side-bar > section > .selected-filters > span {
  margin-left: 0;
  margin-bottom: 8px
}

.c-filter > .filter-side-bar > .side-bar > section > .selected-filters > ul > li {
  margin: 0 10px 10px 0
}

.c-filter > .filter-side-bar > .side-bar > section > ul {
  margin: 0;
  padding: 0;
  list-style: none
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li {
  overflow-x: hidden;
  border-bottom: 1px solid #d6d6e1;
  padding: 10px 0;
  max-width: 436px;
  height: auto;
  max-height: 360px;
  transition: .4s;
  overflow-y: hidden
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock {
  max-height: 410px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > .radio-group {
  display: flex;
  padding: 10px 0;
  margin: 0 8px;
  justify-content: space-between
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > .radio-group * {
  margin-bottom: 0;
  font-weight: 400
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > .radio-group :hover {
  color: #4960df
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > .radio-group * .actived {
  font-weight: 500
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > .radio-group * .radio {
  width: 15px;
  height: 15px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > .radio-group * .radio:after {
  width: 8px;
  height: 8px;
  left: 3.5px;
  top: 3.5px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > .show {
  margin-bottom: 10px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.stock > a {
  font-weight: 500;
  font-size: 14px;
  letter-spacing: .06em;
  color: #3f51b5;
  padding: 0 8px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.prices {
  max-height: 150px;
  padding: 20px 0
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .c-price-range {
  width: 98%;
  padding: 0 0 0 7px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.closed {
  max-height: 27px;
  overflow-y: hidden
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li.closed > .property-name > .arrow-down {
  transform: rotate(0deg)
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li:last-child {
  border-bottom: none
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .property-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 18px;
  padding: 0 7px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .property-name > .reset {
  cursor: pointer;
  font-size: 13px;
  color: #3f51b5;
  font-weight: 400
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .property-name > .arrow-down {
  height: 20px;
  width: 20px;
  transition: .3s;
  transform: rotate(180deg);
  background-color: #1a1a1a
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .search {
  padding: 0 7px;
  position: relative;
  display: flex;
  align-items: center
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .search > .search-mobile {
  position: absolute;
  z-index: 1;
  margin-left: 7px;
  background-color: #3f51b5
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .search > .c-edit {
  width: 100%
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .search > .c-edit input {
  height: 38px;
  width: 100%;
  padding-left: 40px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .search > .c-edit .placeholder {
  left: 40px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > div {
  height: auto;
  max-height: 160px;
  overflow: hidden;
  transition: .3s
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > div.show {
  overflow: auto;
  max-height: 259px;
  margin-top: 10px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > div > .c-checkbox {
  transition: .3s;
  font-weight: 500;
  font-size: 14px;
  color: #1a1a1a;
  padding: 8px;
  width: -webkit-fill-available;
  width: -moz-available
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > div > .c-checkbox:hover {
  color: #4960df;
  background-color: #ebf0f9
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > div > .c-checkbox .checked + .property-value {
  font-weight: 500
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > div > .c-checkbox > .property-value {
  font-weight: 400;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > div > .c-checkbox.disabled {
  pointer-events: none;
  opacity: .4
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .show-all {
  color: #3f51b5;
  cursor: pointer;
  margin: 7px 8px;
  display: flex;
  align-items: center;
  font-size: 14px
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .show-all > .icon {
  height: 18px;
  width: 18px;
  margin-left: 5px;
  transition: .2s;
  background-color: #3f51b5
}

.c-filter > .filter-side-bar > .side-bar > section > ul > li > .show-all > .icon.opened {
  transform: rotate(180deg)
}

.c-filter > .filter-side-bar > .side-bar > .show-product {
  margin: auto 0 10px
}

.c-filter > .filter-side-bar > .side-bar > .show-product > .c-button {
  max-width: 434px;
  margin-top: 10px;
  height: 46px;
  font-size: 13px
}

.c-filter > .categories {
  display: flex;
  justify-content: space-between;
  margin: 10px auto
}

.c-filter > .categories > div.list {
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  max-width: 1325px;
  height: auto;
  overflow: hidden;
  transition: max-height .3s;
  max-height: 50px
}

.c-filter > .categories > div.list > div {
  margin: 7px 8px 7px 0;
  padding: 7px 14px;
  display: block;
  border-radius: 15px;
  transition: .3s;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer
}

.c-filter > .categories > div.list > div.selected {
  background-color: #f7f8fc !important
}

.c-filter > .categories > div.list > div:hover {
  background-color: #ebf0f9 !important
}

.c-filter > .categories > div.action {
  display: flex;
  justify-content: flex-end;
  align-self: flex-start;
  align-items: center;
  flex-shrink: 0;
  color: #3f51b5;
  font-size: 14px;
  padding-top: 11px
}

.c-filter > .categories > div.action > span {
  cursor: pointer
}

.c-filter > .categories > div.action > .icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  transition: .3s;
  background-color: #3f51b5
}

.c-filter > .categories > div.action > .icon.opened {
  transform: rotate(180deg)
}

.c-filter > .top {
  margin-bottom: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  text-align: center;
  border: 1px solid #e7e7ea;
  position: sticky;
  top: 70px;
  border-radius: 4px;
  z-index: 2;
  height: auto;
  max-height: 29px;
  overflow: hidden;
  transition: .3s
}

.c-filter > .top.opened {
  max-height: 65px
}

.c-filter > .top > .reset {
  display: block;
  color: #4e62d1;
  cursor: pointer
}

.c-filter > .filters {
  display: flex;
  justify-content: space-between;
  align-items: center
}

.c-filter > .filters > .card-modes {
  display: flex;
  flex-grow: 0
}

.c-filter > .filters > .card-modes > .icon {
  cursor: pointer;
  background-color: #818ca9
}

.c-filter > .filters > .card-modes > .icon.actived, .c-filter > .filters > .card-modes > .icon:hover {
  background-color: #4960df
}

.c-filter > .filters > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-grow: 2
}

.c-filter > .filters > ul > li {
  margin: 10px 0;
  position: relative;
  flex-shrink: 0
}

.c-filter > .filters > ul > li > .c-drop-down {
  opacity: 0;
  visibility: hidden;
  transition: all .25s ease-in-out;
  pointer-events: none
}

.c-filter > .filters > ul > li.opened > .c-drop-down, .c-filter > .filters > ul > li:hover:not(.mobile) > .c-drop-down {
  opacity: 1;
  visibility: visible;
  pointer-events: unset
}

.c-filter > .filters > ul > li.opened > .property-name, .c-filter > .filters > ul > li:hover:not(.mobile) > .property-name {
  color: #3f51b5
}

.c-filter > .filters > ul > li.opened > .property-name > .arrow-down2, .c-filter > .filters > ul > li:hover:not(.mobile) > .property-name > .arrow-down2 {
  transform: rotate(180deg);
  background-color: #3f51b5
}

.c-filter > .filters > ul > li.opened > .property-name > .filter, .c-filter > .filters > ul > li:hover:not(.mobile) > .property-name > .filter {
  background-color: #3f51b5
}

.c-filter > .filters > ul > li.sort > .property-name {
  padding-left: 0
}

.c-filter > .filters > ul > li.sort.opened-bar > .property-name > .arrow-down2 {
  transform: rotate(180deg)
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values {
  padding: 10px 0
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values .radio-group {
  width: 244px;
  background-color: #fff;
  border-radius: 5px
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values .radio-group > * {
  padding: 10px 21px;
  font-weight: 400;
  font-size: 14px
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values .radio-group > * .actived {
  font-weight: 500
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values .radio-group > * .radio {
  width: 15px;
  height: 15px
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values .radio-group > * .radio:after {
  width: 8px;
  height: 8px;
  left: 3.5px;
  top: 3.5px
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values .radio-group > :hover {
  background-color: #ebf0f9;
  color: #4960df
}

.c-filter > .filters > ul > li.sort > .c-drop-down .values .radio-group > :last-of-type {
  margin: 0
}

.c-filter > .filters > ul > li.property > .c-drop-down {
  min-width: 300px;
  max-width: 335px
}

.c-filter > .filters > ul > li.property > .c-drop-down .values {
  padding: 20px 10px 10px
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .search {
  padding: 0 10px;
  position: relative;
  display: flex;
  align-items: center
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .search > .search-mobile {
  position: absolute;
  z-index: 1;
  margin-left: 7px;
  background-color: #3f51b5
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .search > .c-edit {
  width: 100%
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .search > .c-edit input {
  height: 38px;
  width: 100%;
  padding-left: 40px
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .search > .c-edit .placeholder {
  left: 40px
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .radio-group {
  display: flex;
  padding-top: 10px;
  margin: 0 10px;
  justify-content: space-between
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .radio-group * {
  margin-bottom: 0;
  font-weight: 400
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .radio-group * .actived {
  font-weight: 500
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .radio-group * .radio {
  width: 15px;
  height: 15px
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .radio-group * .radio:after {
  width: 8px;
  height: 8px;
  left: 3.5px;
  top: 3.5px
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .list {
  margin-top: 10px;
  max-height: 288px;
  overflow: auto
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .list > .c-checkbox {
  padding: 10px;
  transition: .3s;
  font-weight: 500;
  font-size: 14px;
  color: #1a1a1a;
  width: -webkit-fill-available;
  width: -moz-available
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .list > .c-checkbox:hover {
  color: #4960df;
  background-color: #ebf0f9
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .list > .c-checkbox .checked + .property-value {
  font-weight: 500
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .list > .c-checkbox > .property-value {
  font-weight: 400;
  max-width: 300px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}

.c-filter > .filters > ul > li.property > .c-drop-down .values > .list > .c-checkbox.disabled {
  pointer-events: none;
  opacity: .4
}

.c-filter > .filters > ul > li.closed {
  height: 32px;
  overflow-y: hidden
}

.c-filter > .filters > ul > li.closed > .property-name > .arrow-down2 {
  transform: rotate(0deg)
}

.c-filter > .filters > ul > li:last-child {
  border-bottom: none
}

.c-filter > .filters > ul > li > .property-name {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #1a1a1a;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.c-filter > .filters > ul > li > .property-name > .arrow-down2 {
  margin-left: 5px;
  height: 14px;
  width: 14px;
  transition: .25s;
  background-color: #1a1a1a
}

.c-filter > .filters > ul > li > .property-name > .badge {
  color: #ff0089;
  width: 31px;
  text-align: center
}

.c-filter > .filters > ul > li > .property-name > .filter {
  background-color: #1a1a1a
}

.c-filter > .filters > ul > li > .show-all {
  color: #3f51b5;
  cursor: pointer;
  margin: 0 15px
}

.c-filter .selected-filters {
  display: flex;
  align-items: baseline
}

.c-filter .selected-filters > span {
  font-weight: 600;
  font-size: 14px;
  color: #1a1a1a;
  margin-right: 10px;
  flex-shrink: 0
}

.c-filter .selected-filters > ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  flex-flow: row wrap
}

.c-filter .selected-filters > ul > li {
  display: flex;
  padding: 9px 14px;
  background: #f7f8fc;
  border-radius: 5px;
  margin: 10px 10px 10px 0;
  font-size: 13px;
  align-items: center;
  max-width: 206px;
  box-sizing: border-box
}

.c-filter .selected-filters > ul > li.reset {
  background: #f7f8fc;
  cursor: pointer
}

.c-filter .selected-filters > ul > li.reset > .name {
  color: #596175;
  font-weight: 400
}

.c-filter .selected-filters > ul > li > .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: #1a1a1a
}

.c-filter .selected-filters > ul > li > .close {
  cursor: pointer;
  margin-left: 5px;
  flex-shrink: 0;
  background-color: #3f51b5
}

.c-filter .selected-filters > ul > li:hover > .name {
  color: #4960df
}

.c-filter .selected-filters > ul > li:hover > .close, .c-filter .selected-filters > ul > li:hover > .icon {
  background-color: #4960df
}

.c-filter.mobile {
  top: 83px;
  z-index: 1
}

.c-filter.mobile.header, .c-filter.mobile.opened {
  z-index: 9998
}

.c-filter.mobile.header > .filters > ul > li, .c-filter.mobile.opened > .filters > ul > li {
  margin-top: 5px
}

.c-filter.mobile > .filter-side-bar.opened > .side-bar {
  bottom: 0
}

.c-filter.mobile > .filter-side-bar > .side-bar {
  border-radius: 15px 15px 0 0;
  position: fixed;
  height: calc(100% - 120px);
  padding: 5px 0;
  margin-right: 0;
  height: -webkit-fill-available;
  height: -moz-available;
  max-height: 690px;
  bottom: -690px;
  max-width: unset
}

.c-filter.mobile > .filter-side-bar > .side-bar > *{
  padding: 0 5px
}

.c-filter.mobile > .filter-side-bar > .side-bar > .header > .top > .title {
  font-size: 20px
}

.c-filter.mobile > .filter-side-bar > .side-bar > .header > .top > .close2 {
  right: 0;
  left: unset;
  background-color: #1a1a1a;
  width: 20px;
  position: relative;
  margin-right: 10px
}

.c-filter.mobile > .filter-side-bar > .side-bar > .header > .count {
  font-size: 13px;
  margin-bottom: 10px
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > .selected-filters > span {
  font-size: 13px
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > .selected-filters > ul {
  font-size: 13px;
  max-width: 100%
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > .selected-filters > ul > li {
  max-width: inherit;
  margin: 0 5px 5px 0
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li {
  max-height: 436px;
  max-width: unset
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li.closed {
  max-height: 24px
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li > .property-name {
  font-size: 16px
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li > .c-price-range *, .c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li > .search > .c-edit * {
  font-size: 13px
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li > div {
  max-height: 271px;
  margin: 10px 0;
  overflow: auto
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li > div > .c-checkbox {
  flex-direction: row-reverse;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 3px
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li > div > .c-checkbox.actived {
  background-color: #f7f8fc
}

.c-filter.mobile > .filter-side-bar > .side-bar > section > ul > li > .show-all {
  display: none
}

.c-filter.mobile > .filter-side-bar > .side-bar > .show-product {
  display: flex;
  justify-content: center
}

.c-filter.mobile > .filter-side-bar > .side-bar > .show-product > .c-button {
  height: 48px
}

.c-filter.mobile > .filters > ul {
  justify-content: space-between;
  align-items: center
}

.c-filter.mobile > .filters > ul > li {
  margin: 0 0 5px
}

.c-filter.mobile > .filters > ul > li > .property-name {
  font-size: 12px;
  padding: 0
}

.c-filter.mobile > .categories {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  margin: 0 0 10px;
  height: auto;
  transition: .3s;
  max-width: unset
}

.c-filter.mobile > .categories::-webkit-scrollbar {
  display: none
}

.c-filter.mobile > .categories > div.list {
  max-width: unset;
  display: flex;
  flex-flow: row nowrap;
  padding: 0;
  overflow: unset
}

.c-filter.mobile > .categories > div.list > div {
  margin: 7px 8px 7px 0;
  padding: 7px 14px;
  display: block;
  border-radius: 15px;
  transition: .3s;
  font-weight: 500;
  font-size: 13px;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content
}

.c-filter.mobile > .categories > div.list > div:hover {
  background-color: #ebf0f9 !important
}

.c-filter.mobile > .categories > div.list > div.selected {
  background-color: #f7f8fc !important
}

.c-filter.mobile > .selected-filters {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  margin: 0 0 10px;
  height: auto;
  max-height: 42px;
  transition: .3s
}

.c-filter.mobile > .selected-filters::-webkit-scrollbar {
  display: none
}

.c-filter.mobile > .selected-filters > ul {
  display: flex;
  flex-flow: row nowrap;
  padding: 0;
  overflow: unset
}

.c-filter.mobile > .selected-filters > ul > li {
  margin: unset;
  margin-right: 10px
}

.c-filter.mobile > .count {
  padding-bottom: 5px
}
</style>