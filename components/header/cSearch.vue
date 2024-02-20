<script lang="ts" setup>
const props = defineProps({
  hasLoyalCard: {
    type: Boolean,
    default: false
  },
  loadingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  updatingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  basketItems: {
    type: <any>Array
  },
  city: {
    type: <any>Object
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  searchResult: {
    type: Object
  },
  routeParams: {
    type: Object
  },
  isAuthorized: {
    type: Boolean
  },
  isPageScrolled: {
    type: Boolean,
    default: false
  },
  advertisingLinks: {
    type: Array,
    default: function () {
      return []
    }
  },
  cdnUrl: {
    type: String
  }
})

const formSearchRef = ref(<any>{})
const historyRef = ref(<any>{})
const searchRef = ref(<any>{})
const searchFieldRef = ref(<any>{})
const resultRef = ref(<any>{})
const productListRef = ref(<any>{})

const isFocus = ref(false)
const isSearched = ref(false)
const limit = ref(4)
const maxLength = ref(200)
const requestText = ref(<any>"")
const oldRequestText = ref(<any>undefined)
const timeoutID = ref(<any>undefined)
const isNotFound = ref(false)
const categoryHistory = ref(<any>[])
const isLoading = ref(false)
const recognition = ref({})
const recognizedSpeech = ref("")
const isSpeaching = ref(false)
const itemIndex = ref(<any>undefined)
const isSearchPause = ref(false)
const internalSearchResult = ref(<any>{})

const meStore = useMeStore()
const catalogStore = useCatalogStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const emit = defineEmits(["search-result-clear", "search-result-open", "basket-store-update", "add-to-basket", "basket-item-update", "search"])

const me = computed(() => {
  return meStore.getMe
})
const categoryDirectory = computed(() => {
  return catalogStore.categoryDirectory
})
const catalog = computed(() => {
  return catalogStore.catalog
})
const isEmptyString = computed(() => {
  return requestText.value.length < 1
})
const isOpened = computed(() => {
  return isSearched.value || isFocus.value && props.isMobile
})
const placeholder = computed(() => {
  return isFocus.value ? "Введите название или симптом" : "Я ищу..."
})
const preparedProducts = computed(() => {
  return uPrepared(internalSearchResult.value.products ? internalSearchResult.value.products : [], ["isLoyal", "isRank", "isInBasket", "route"])
})
const preparedProperties = computed(() => {
  let e, n, o, c, l, d = this,
      h = <any>[],
      m = {
        brand: {
          page: "Бренд",
          routeName: "Brand"
        },
        deystvuyushchee_veshchestvo: {
          page: "Действующее веществ",
          routeName: "ActiveSubstance"
        },
        proizvoditel: {
          page: "Производитель",
          routeName: "Manufacturer"
        }
      },
      f = internalSearchResult.value?.properties ? [...internalSearchResult.value.properties] : []
  // TODO console.log(f)
  // try {
  //   var v = function () {
  //     var t = function (t) {
  //       for (var i = 1; i < arguments.length; i++) {
  //         var source = null != arguments[i] ? arguments[i] : {};
  //         i % 2 ? Gt(Object(source), !0).forEach((function (e) {
  //           Object(r.a)(t, e, source[e])
  //         })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source)) : Gt(Object(source)).forEach((function (e) {
  //           Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(source, e))
  //         }))
  //       }
  //       return t
  //     }({}, l.value);
  //     if (!["type", "subtype", "category"].includes(t.type) && void 0 === m[t.type]) return "continue";
  //     if (["type", "subtype", "category"].includes(t.type)) {
  //       if ("type" === t.type && (t.page = "Каталог", t.route = {
  //         name: "CatalogType",
  //         params: {
  //           typeID: "".concat(t.ID),
  //           typeSlug: t.slug
  //         }
  //       }), "subtype" === t.type) {
  //         var f = null === (e = d.catalog) || void 0 === e ? void 0 : e.subtypes.find((function (e) {
  //               return e.ID === t.ID
  //             })),
  //             v = null === (n = d.catalog) || void 0 === n ? void 0 : n.types.find((function (t) {
  //               return t.ID === (null == f ? void 0 : f.typeIDs[0])
  //             }));
  //         t.page = "".concat(v.name, " / ").concat(null == f ? void 0 : f.name), t.route = {
  //           name: "CatalogSubtype",
  //           params: {
  //             typeID: "".concat(null == f ? void 0 : f.typeIDs[0]),
  //             typeSlug: v.slug,
  //             subtypeID: "".concat(t.ID),
  //             subtypeSlug: t.slug
  //           }
  //         }
  //       }
  //       if ("category" === t.type) {
  //         var V = null === (o = d.catalog) || void 0 === o ? void 0 : o.categories.find((function (e) {
  //               return e.ID === t.ID
  //             })),
  //             y = null === (c = d.catalog) || void 0 === c ? void 0 : c.subtypes.find((function (t) {
  //               return t.ID === V.subtypeIDs[0]
  //             }));
  //         t.page = "".concat(y.name, " / ").concat(V.name), t.route = {
  //           name: "CatalogCategory",
  //           params: {
  //             typeID: "".concat(d.categoryDirectory[t.ID].typeID),
  //             typeSlug: d.categoryDirectory[t.ID].typeSlug,
  //             subtypeID: "".concat(d.categoryDirectory[t.ID].subtypeID),
  //             subtypeSlug: d.categoryDirectory[t.ID].subtypeSlug,
  //             categoryID: "".concat(t.ID),
  //             categorySlug: t.slug
  //           }
  //         }
  //       }
  //     } else t.page = m[t.type].page, t.route = {
  //       name: m[t.type].routeName,
  //       params: {
  //         propertyID: "".concat(t.ID),
  //         propertySlug: t.slug
  //       }
  //     };
  //     h.push(t)
  //   };
  //   for (f.s(); !(l = f.n()).done;) v()
  // } catch (t) {
  //   f.e(t)
  // } finally {
  //   f.f()
  // }
  return h
})

const filteredCategoryHistory = computed(() => {
  return requestText.value.length < 1 ? categoryHistory.value : categoryHistory.value.filter((e: any) => {
    return e.title.toLowerCase().includes(requestText.value.toLowerCase())
  })
})

watch(() => isOpened.value, (value) => {
  if (props.isMobile)
    if (value) {
      appStore.HIDE_MOBILE_FOOTER(true)
      //TODO this.$store.commit("app/".concat(z.APP.HIDE_CHAT_BOT), !0)
      let e: any = document.querySelector(".product-prices-fixed");
      null !== e && (e.style.display = "none")
      document.body.style.overflow = "hidden"
    } else {
      //TODO this.$store.commit("app/".concat(z.APP.HIDE_CHAT_BOT), !1)
      appStore.HIDE_MOBILE_FOOTER(false)
      let n: any = document.querySelector(".product-prices-fixed");
      null !== n && (n.style.display = "flex")
      document.body.style.overflow = ""
    }
})
watch(() => isSearched.value, () => {
  isSearchPause.value && !props.isMobile || resizeHeight()
})
watch(() => filteredCategoryHistory.value, () => {
  isSearchPause.value || nextTick(() => {
    resizeHeight()
  })
})
watch(() => props.searchResult, (value: any) => {
  isLoading.value = false
  resizeHeight()
  setTimeout(() => {
    internalSearchResult.value = null != value ? value : {}
  }, 200)
  if (!isEmptyString.value) {
    value.products?.length < 1 && value.properties?.length < 1 ? isNotFound.value = true : isNotFound.value = false
    openSearchResult()
  }
})
watch(() => requestText.value, (value, oldValue) => {
  oldRequestText.value = oldValue
  if (!isSearchPause.value) {
    if (undefined !== value) {
      requestText.value = value.slice(0, maxLength.value)
    }
    if (isEmptyString.value) {
      !props.isMobile && categoryHistory.value.length < 1 && closeSearchResult()
      itemIndex.value = undefined
      window.clearTimeout(timeoutID.value)
      void setTimeout(() => {
        emit("search-result-clear")
      }, 150)
    }
    return throttle(searchProducts, 700)
  }
})
watch(() => route, (value) => {
  setTimeout(() => {
    "Search" === value.name || requestText.value.length < 1 || isSearchPause.value || (requestText.value = "", emit("search-result-clear")), props.isMobile && emit("search-result-open", false), window.clearTimeout(timeoutID.value), closeSearchResult(), isSearchPause.value = false
  }, 200)
})

// onBeforeRouteUpdate(() => {
//   resultRef.value.style.maxHeight = "0"
// })

onMounted(() => {
  //window.addEventListener("resize", resizeHeight)
  //searchRef.value.addEventListener("paste", pasteText);


  // let o = window.localStorage.getItem("metric");
  // if (null !== o) {
  //   let r = JSON.parse(o),
  //       c = r.type,
  //       l = r.searchText,
  //       d = r.productID,
  //       h = r.isFastSearch;
  //   d === Number(route.params.productID) && metric(c, l, d, h), window.localStorage.removeItem("metric")
  // }
})


function newTabOrNewWindow(t: any, e: any, n: any, o: any) {
  window.localStorage.setItem("metric", JSON.stringify({
    type: t,
    searchText: e,
    productID: n,
    isFastSearch: o
  }))
}

function metric(t?: any, e?: any, n?: any, o?: any) {
  if (oldRequestText.value !== requestText.value && e || "search" !== t) {
    let data = <any>{
      cityID: props.city?.ID,
      type: t,
      searchText: e,
      productID: n,
      isFastSearch: o
    };
    props.isAuthorized && (data.userID = me.value.ID)
    //TODO ??? Ut.a.metric(data).then((function () {
    "search" === t && (oldRequestText.value = e)
    // }))
  }
}

function prepareCategoryRoute(t: any) {
  return {
    name: "SelectInCategory",
    params: {
      productID: "".concat(t)
    }
  }
}

function image(item: any) {
  return uPrepareProduct(item, SIZE_XS, props.cdnUrl).images[0]
}

function listenStart(t: any) {
  var e = searchFieldRef.value;
  //TODO ??? try {
  //   if (this.isSpeaching) return this.recognition.abort(), this.isSpeaching = !1, void (e.placeholder = this.placeholder);
  //   t.preventDefault(), e.placeholder = "Говорите...", this.recognizedSpeech = "", this.isSpeaching = !0, this.recognition.start(), this.isMobile || this.playSound(H.p)
  // } catch (t) {
  // this.recognition.abort()
  isSpeaching.value = false
  e.placeholder = placeholder.value
  // }
}

function transcriptHandler(t: any) {
  let e = searchFieldRef.value,
      n = parseTranscript(t);
  recognizedSpeech.value = n
  e.focus()
  //TODO ??? t.results[0].isFinal && (this.isSpeaching = !1, e.placeholder = this.placeholder, this.requestText = this.recognizedSpeech, this.isMobile || this.playSound(H.s))
}

function parseTranscript(t: any) {
  return Array.from(t.results).map((t: any) => {
    return t[0]
  }).map((t) => {
    return t.transcript
  }).join("")
}

function playSound(s: any) {
  // TODO var audio = new Audio;
  // audio.preload = "auto", audio.src = s, audio.play()
}

function deleteCategory(t: any, i: any) {
  if (1 === categoryHistory.value.length) {
    historyRef.value.style.maxHeight = "0"
    setTimeout(() => {
      localStorage.removeItem("categoryHistory")
      categoryHistory.value = []
    }, 300)
  } else {
    t.delete = true
    setTimeout(() => {
      categoryHistory.value = categoryHistory.value.findIndex((e: any) => {
        return e.title === t.title
      })
      localStorage.setItem("categoryHistory", JSON.stringify(categoryHistory.value))
    }, 300)
  }
  preparedProducts.value.length < 1 && categoryHistory.value.length < 1 && closeSearchResult()
}

function clearCategoryHistory() {
  historyRef.value.style.maxHeight = "0"
  setTimeout(() => {
    localStorage.removeItem("categoryHistory")
    categoryHistory.value = []
    preparedProducts.value.length < 1 && closeSearchResult()
  }, 200)
}

function goTo(p: any, t: any) {
  route.path === p && closeSearchResult(), searchPause(t)
}

function openBasket() {
  router.push({
    name: "basket"
  })
}

function goCatalog() {
  router.push({
    name: "catalog"
  })
}

function addToBasket(item: any) {
  if (item.isRare) router.push({
    name: "Product",
    params: {
      productID: "".concat(item.ID),
      productSlug: item.slug
    }
  });
  else if (props.isAuthorized) {
    let n = {
      productID: item.ID,
      count: 1,
      isSelected: true
    };
    emit("add-to-basket", n)
  } else {
    let o = props.basketItems.length > 0 ? [...props.basketItems] : [];
    o.push({
      productID: item.ID,
      productSlug: item.slug,
      images: item.images ? item.images : [],
      name: item.name,
      price: item.price,
      count: 1,
      isRemoved: false,
      isInStock: item.isInStock,
      allowDelivery: item.allowDelivery,
      allowOnlinePayment: item.allowOnlinePayment,
      discountID: item.discountID,
      isWithdrawn: item.isWithdrawn,
      limitWithCard: item.limitWithCard,
      limitWithoutCard: item.limitWithoutCard,
      deliveryDaysMax: item.deliveryDaysMax,
      isRecipe: item.isRecipe,
      isAvailable: item.isAvailable,
      deliveryAmount: item.deliveryAmount,
      discountTemplate: item.discountTemplate,
      mightNeedID: item.mightNeedID,
      imagesSizeXS: item.imagesSizeXS,
      imagesSizeS: item.imagesSizeS,
      isSelected: true,
      isSiteSellRemains: item.isSiteSellRemains,
      isWaitingArrive: item.isWaitingArrive,
      isOrderRcNoRc: item.isOrderRcNoRc
    })
    void 0 !== item.bonuses && void 0 === item.sticker && (o[o.length - 1].bonuses = item.bonuses)
    void 0 !== item.sticker && (o[o.length - 1].sticker = item.sticker)
    void 0 !== item.deliveryRuleID && (o[o.length - 1].deliveryRuleID = item.deliveryRuleID)
    if (!props.isMobile) {
      useNotificationsStore().NOTIFICATIONS_UPD({
        status: "basket",
        image: image(item)
      })
    }
    localStorage.setItem("basket", JSON.stringify(o))
    emit("basket-store-update", o)
  }
}

function updateBasketItem(t: any) {
  emit("basket-item-update", t)
}

function updateBasketStore(t: any) {
  emit("basket-store-update", t)
}

function blur() {
  isFocus.value = false
  searchRef.value.firstElementChild.blur()
}

function clear() {
  closeSearchResult()
  isNotFound.value = false
  setTimeout(() => {
    requestText.value = ""
    window.clearTimeout(timeoutID.value)
    emit("search-result-clear")
    emit("search-result-open", false)
  }, props.isMobile ? 0 : 200)
}

function closeSearchResult() {
  itemIndex.value = undefined;
  var e = resultRef.value;
  props.isMobile || (Array.from(e.children).forEach((t: any) => {
    t.className.includes("history") || t.className.includes("not-found") || (t.style.maxHeight = "0")
  }), e.style.maxHeight = "0")

  setTimeout(() => {
    isSearched.value = false
  }, 50)
  emit("search-result-open", false)
  blur()
  document.removeEventListener("keydown", keyDown)
  document.removeEventListener("mousedown", outside)
}

function resetItemIndex() {
  itemIndex.value = undefined
}

function searchPause(t: any) {
  isSearchPause.value = true
  requestText.value = t
  closeSearchResult()
  blur()
}

function keyDown(t: any) {
  if ("Escape" === t.code && (blur(), closeSearchResult()), "Enter" === t.code || "NumpadEnter" === t.code || "Enter" === t.key)
    if (void 0 === itemIndex.value) search();
    else {
      let o = resultRef.value.querySelector(".item-selected");
      searchPause(o.querySelector(".name").innerHTML)
      o.className.includes("product") ? o.children[0].click() : o.click()
    }
  "ArrowUp" === t.code && (
      t.preventDefault(), itemIndex.value = void 0 === itemIndex.value ? -1 : itemIndex.value - 1, itemIndex.value < 0 && (itemIndex.value = filteredCategoryHistory.value.length + preparedProperties.value.length + (props.searchResult?.products ? props.searchResult.products : []).length - 1)
  )
  "ArrowDown" === t.code && (
      t.preventDefault(), itemIndex.value = void 0 === itemIndex.value ? 0 : itemIndex.value + 1, itemIndex.value >= filteredCategoryHistory.value.length + preparedProperties.value.length + (props.searchResult?.products ? props.searchResult.products : []).length && (itemIndex.value = 0)
  )
}

function focus() {
  isFocus.value = true;
  let e = JSON.parse(localStorage.getItem("categoryHistory") ? <any>localStorage.getItem("categoryHistory") : "[]");
  if (e.length > 0) {
    categoryHistory.value = e.filter((i: any) => {
      return i.title?.length > 0 && i.url?.length > 0
    })
    openSearchResult()
  }
  0 === preparedProducts.value.length ? !1 !== isSearched.value || isEmptyString.value || searchProducts() : isEmptyString.value ? emit("search-result-clear") : openSearchResult(), props.isMobile && (resizeHeight(), emit("search-result-open", true), openSearchResult())
}

function openSearchResult() {
  isSearched.value = true
  document.addEventListener("keydown", keyDown)
  document.addEventListener("mousedown", outside)
}

function outside(t: any) {
  let e, n = searchRef.value,
      o = resultRef.value,
      form = formSearchRef.value,
      r = t.target;
  o.contains(r) || form.contains(r) || n.contains(r) || "digi-fake-button-search" === (null == r ? void 0 : r.className) || (null === (e = null == r ? void 0 : r.parentElement) || void 0 === e ? void 0 : e.className.includes("category")) || props.isMobile || (blur(), closeSearchResult())
}

function pasteText(t: any) {
  let e, n = t.clipboardData.getData("Text");
  n.includes("Источник") && (t.preventDefault(), requestText.value = "".concat(null !== (e = requestText.value) && void 0 !== e ? e : "", " ").concat(n.slice(0, n.indexOf("Источник:") - 2)).replace(/(^\s)/, ""))
}

function resizeHeight() {
  let e = resultRef.value;
  props.isMobile || nextTick(() => {
    if (isSearched.value) {
      if (requestText.value.length < 1 && filteredCategoryHistory.value.length < 1) {
        e.style.maxHeight = "0px"
      } else {
        setTimeout(() => {
          let r = 37 * filteredCategoryHistory.value.length + 58 * props.searchResult?.properties?.length + 100 * props.searchResult?.products?.length + 100 + (props.searchResult?.isAnalogs ? 110 : 0);
          Array.from(e.children).forEach((e: any) => {
            e.className.includes("history") ? e.style.maxHeight = "".concat(<any>(37 * <any>(filteredCategoryHistory.value.length) + 50), "px") : e.className.includes("property-list") ? e.style.maxHeight = "".concat(<any>(58 * props.searchResult?.properties?.length), "px") : e.className.includes("product-list") && (e.style.maxHeight = "".concat(<any>(100 * props.searchResult?.products?.length + 100), "px"))
          })
          e.style.maxHeight = "" + (isNotFound.value && !isEmptyString.value ? 115 : r) + "px"
        }, 100)
      }
    }

  })
}

function search() {
  metric("search", requestText.value)
  isEmptyString.value || requestText.value.length < 1 || (closeSearchResult(), window.clearTimeout(timeoutID.value), requestText.value !== props.routeParams?.search && router.push({
    name: "Search",
    params: {
      search: requestText.value
    }
  }))
}


function searchProducts() {
  itemIndex.value = undefined;
  let e = props.city ? props.city.ID : undefined,
      n = requestText.value.replace(/[^A-zА-яё\d\s№.,%\/+-]|\s(?=\s)|^%|[\[\]\\`\^_]|\.(?=\.)|,(?=,)|%(?=%)|\/(?=\/)|№(?=№)|-(?=-)|\+(?=\+)/, ""),
      filter = 'q="'.concat(n, '"&advanced="true"&cityID=').concat(e, "[:").concat(<any>limit.value, "]");
  emit("search", filter)
  isLoading.value = true
}

function throttle(t: any, e: any) {
  window.clearTimeout(timeoutID.value)
  timeoutID.value = window.setTimeout(() => {
    t()
  }, e)
}
</script>

<template>
  <div :class='["c-search", { mobile: isMobile, opened: isOpened }]'>
    <form ref="formSearchRef" action v-on:submit.prevent="search">
      <div ref="searchRef" :class='["search", { focus: isFocus }]'>
        <input v-model.trim="requestText" ref="searchFieldRef" :placeholder="placeholder" autocomplete="off"
               type="search" id="search-field" v-on:focus="focus" v-on:blur="blur"
               v-on:input='(e)=>{e.target.composing || (requestText = e.target.value.trim())}'
               v-on:keypress='(e)=>{return !e.type.indexOf("key") && e.keyCode === 13 && e.key=== "Enter" ? null : search}'/>
        <label v-if="!isMobile && !isFocus && requestText.length < 1 && null !== advertisingLinks"
               class="advertising-links" for="search-field">
          Например,
          <a v-for="(item, index) in advertisingLinks" :key="index" :href="item.link" rel="nofollow">{{ item.name }}</a>
        </label>
        <span v-show="!isEmptyString || isFocus && isMobile || isOpened" class="icon close" @click="clear"/>
        <button v-if="!isMobile || !isFocus && isMobile" type="submit">
          <span class="icon search"/>
        </button>
        <span v-if="!isFocus" class="icon search-mobile"/>
      </div>
      <div ref="resultRef"
           :class='["result", { opened: isOpened, "not-found": isNotFound && isOpened, "page-scrolled": isPageScrolled }]'>
        <LazyUiCSpinner v-if="isLoading"/>
        <div v-show="filteredCategoryHistory.length > 0 && !isNotFound" ref="historyRef"
             :class='["history", { only: preparedProperties.length < 1 && preparedProducts.length < 1, hidden: filteredCategoryHistory.length < 1 || isNotFound && !isEmptyString }]'>
          <div :class='["header", { hidden: !isEmptyString || filteredCategoryHistory.length < 1 }]'>
            <span class="name">Недавние</span>
            <span class="clear" @click="clearCategoryHistory">Очистить все</span>
          </div>
          <div v-for="(item, index) in filteredCategoryHistory" :key="index"
               :class='["category", { delete: item.delete, "item-selected": index === itemIndex }]'
               @click="goTo(item.url, item.title)" v-on:mouseover="resetItemIndex">
            <NuxtLink :to='{ path: item.url }'>
              <div>
                <span class="icon category-history"/>
                <span class="name">{{ item.title }}</span>
              </div>
              <span class="icon close" @click.prevent.stop="deleteCategory(item, index)"/>
            </NuxtLink>
          </div>
        </div>
        <div :class='["property-list", { hidden: preparedProperties.length < 1 }]'>
          <div v-for="(item, index) in preparedProperties" :key="index"
               :class='["property", { "item-selected": filteredCategoryHistory.length + index === itemIndex }]'
               v-on:mouseover="resetItemIndex" @click="goTo(item.route, item.name)">
            <NuxtLink :to="{...item.route}">
              <div>
                <span class="name">{{ item.name }}</span>
                <span :class='["page", item.type]'>{{ item.page }}</span>
                <UiCArrowSVG size="s" hover-color="#3F51B5"/>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div :class='["not-found-products", { show: searchResult?.isAnalogs && !isEmptyString }]'>
          <p>К сожалению, по Вашему запросу ничего не найдено</p>
          <div>
            Пожалуйста, ознакомьтесь с рекомендациями или воспользуйтесь нашим
            <NuxtLink class="hover-bottom-line" :to='{ name: "catalog" }'>каталогом<span/></NuxtLink>
          </div>
        </div>
        <div ref="productListRef" :class='["product-list", { hidden: preparedProducts.length < 1 }]'>
          <div v-for="(item, index) in preparedProducts" :key="index"
               :class='["product", { "item-selected": filteredCategoryHistory.length + preparedProperties.length + index === itemIndex }]'
               @mouseover="resetItemIndex"
               v-on:contextmenu='()=>{return newTabOrNewWindow("searchSelect", requestText, item.ID, true)}'>
            <NuxtLink :to='{...item.route}' data-tooltip="Перейти на страницу товара">
              <div class="image">
                <img :alt='item.images ? item.name : "Изображение отсутствует"' :src='image(item)'
                     :data-tooltip='item.images ? item.name : "Изображение отсутствует"' width="100%" height="100%"/>
              </div>
              <div class="description">
                <div class="title flex-vertical">
                  <!--                  TODO-->
                  <NuxtLink v-if="void 0 === item.ID" class="category" :to='prepareCategoryRoute(item.ID)'
                            data-tooltip="Перейти на страницу категории">
                    <span class="text">Выбрать в категории</span>
                    <UiCArrowSVG color="#ffffff" hover-color="#ffffff" size="s"/>
                  </NuxtLink>
                  <NuxtLink class="name" :to='{...item.route}' data-tooltip="Перейти на страницу товара">
                    {{ item.name }}
                  </NuxtLink>
                  <span v-if="item.sticker" class="sticker" v-html="item.sticker"/>
                </div>
                <span v-if="!isMobile" :class='["prescription", { icon: item.isRecipe }]'
                      :data-tooltip='item.isRecipe ? "Отпускается по рецепту" : ""'/>
                <div v-if="void 0 !== item.price" class="prices">
                  <div class="without-card">
                    <span>Цена:</span>
                    <span>{{ item.price?.withoutCard + " ₽" }}</span>
                  </div>
                  <div v-if="item.isLoyal || item.isRank" class="line"/>
                  <div v-if="item.isLoyal" class="with-card">
                    <span>По акции:</span>
                    <span>{{ item.price?.withCard + " ₽" }}</span>
                  </div>
                  <div v-if="item.isRank" class="with-period">
                    <span>Клубная цена:</span>
                    <span>{{ item.price?.withPeriod + " ₽" }}</span>
                  </div>
                </div>
                <div v-if="isMobile && item.isRecipe" class="is-recipe">
                  <span class="icon prescription-mini"/>
                  Отпускается по рецепту
                </div>
                <div v-if="!item.isAvailable" class="not-available">
                  {{ item.isWaitingArrive ? "Ожидается" : "Временно отсутствует" }}
                </div>
              </div>
            </NuxtLink>
            <div v-show="!item.isInBasket && item.isAvailable"
                 :class='["add-to-basket", { disabled: loadingBasketProductIDs.includes(item.ID), rare: item.isRare }]'
                 :data-tooltip='item.isRare ? "Оформить заказ" : "Добавить в корзину"'
                 @click.prevent="addToBasket(item)">
              <span v-if="loadingBasketProductIDs.includes(item.ID)" class="icon spinner"/>
              <span v-else class="icon add-basket2"/>
            </div>
            <div v-show="item.isInBasket && item.isAvailable" class="in-basket" data-tooltip="Перейти в корзину"
                 @click.prevent="openBasket">
              <span class="icon in-basket"/>
            </div>
          </div>
          <div v-if="preparedProducts.length === limit && !isMobile" class="show-more" @click="search">
            Посмотреть все
            <UiCArrowSVG size="s" hover-color="#3F51B5"/>
          </div>
          <div v-if="preparedProducts.length === limit && isMobile" class="show-more-mobile">
            <LazyUiCButton v-if="preparedProducts.length === limit && isMobile" mode="primary" size="xl"
                           @click="search">
              Посмотреть все
            </LazyUiCButton>
          </div>
        </div>
        <div :class='["not-found", { show: isNotFound && !isEmptyString }]'>
          <p>К сожалению, по Вашему запросу ничего не найдено</p>
          <div>
            Пожалуйста, проверьте формулировку Вашего запроса или воспользуйтесь нашим
            <span v-if="isMobile">каталогом</span>
            <NuxtLink v-else class="hover-bottom-line" :to='{name: "catalog"}'>
              каталогом
              <span/>
            </NuxtLink>
            <div>
              <LazyUiCButton v-if="isMobile" mode="primary" @click="goCatalog">
                Перейти в каталог
              </LazyUiCButton>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isMobile" :class='["overlay", { active: isSearched }]' @click="closeSearchResult"/>
    </form>
  </div>
</template>

<style scoped>
.c-search {
  flex-grow: 1
}

.c-search > form input[type=search] {
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important
}

.c-search > form input[type=search]::-webkit-search-cancel-button, .c-search > form input[type=search]::-webkit-search-decoration, .c-search > form input[type=search]::-webkit-search-results-button, .c-search > form input[type=search]::-webkit-search-results-decoration {
  display: none;
  -webkit-appearance: none
}

.c-search > form > .search-mobile, .c-search > form > .search {
  display: flex;
  margin-right: 20px;
  position: relative;
  overflow: hidden
}

.c-search > form > .search-mobile > .search-mobile, .c-search > form > .search > .search-mobile {
  display: none
}

.c-search > form > .search-mobile > .advertising-links, .c-search > form > .search > .advertising-links {
  position: absolute;
  display: flex;
  align-items: center;
  height: 40px;
  left: 70px;
  color: #818ca9;
  overflow: hidden;
  width: calc(100% - 160px);
  cursor: text
}

.c-search > form > .search-mobile > .advertising-links > a, .c-search > form > .search > .advertising-links > a {
  margin-left: 10px;
  color: #818ca9;
  position: relative;
  transition: all .3s ease-in-out
}

.c-search > form > .search-mobile > .advertising-links > a:first-of-type, .c-search > form > .search > .advertising-links > a:first-of-type {
  margin-left: 5px
}

.c-search > form > .search-mobile > .advertising-links > a:not(:last-of-type):after, .c-search > form > .search > .advertising-links > a:not(:last-of-type):after {
  content: ",";
  position: absolute
}

.c-search > form > .search-mobile > .advertising-links > a:before, .c-search > form > .search > .advertising-links > a:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 100%;
  background-image: linear-gradient(90deg, #c1c1c1 40%, hsla(0, 0%, 100%, 0) 0);
  background-position: top;
  background-size: 6.1px 1px;
  background-repeat: repeat-x;
  transition: all .3s ease-in-out
}

.c-search > form > .search-mobile > .advertising-links > a:hover, .c-search > form > .search > .advertising-links > a:hover {
  color: #4960df
}

.c-search > form > .search-mobile > .advertising-links > a:hover:before, .c-search > form > .search > .advertising-links > a:hover:before {
  background-image: linear-gradient(90deg, #4960df 40%, hsla(0, 0%, 100%, 0) 0)
}

.c-search > form > .search-mobile.focus > input, .c-search > form > .search.focus > input {
  border: 1px solid #3f51b5
}

.c-search > form > .search-mobile > input, .c-search > form > .search > input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  border: none;
  padding-left: 14px;
  padding-right: 72px;
  outline: none;
  transition: .2s;
  background: #ebf0f9 !important;
  border-radius: 5px 0 0 5px;
  box-sizing: border-box
}

.c-search > form > .search-mobile > .close, .c-search > form > .search > .close {
  position: absolute;
  cursor: pointer;
  min-width: 24px;
  top: 9px;
  right: 69px;
  background-color: #818ca9;
  z-index: 3
}

.c-search > form > .search-mobile > .close:hover, .c-search > form > .search > .close:hover {
  background-color: #3f51b5
}

.c-search > form > .search-mobile > .voice, .c-search > form > .search > .voice {
  position: absolute;
  cursor: pointer;
  min-width: 24px;
  top: 8px;
  right: 63px;
  background-color: #818ca9
}

.c-search > form > .search-mobile > .voice:hover, .c-search > form > .search > .voice:hover {
  background-color: #3f51b5
}

.c-search > form > .search-mobile > .voice.right, .c-search > form > .search > .voice.right {
  right: 96px
}

.c-search > form > .search-mobile > .voice.speaching, .c-search > form > .search > .voice.speaching {
  background-color: #f36363;
  -webkit-animation: speach .8s linear infinite;
  animation: speach .8s linear infinite
}

.c-search > form > .search-mobile > button, .c-search > form > .search > button {
  padding: 0 16px;
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
  transition: .2s;
  color: #fff;
  border-radius: 0 5px 5px 0
}

.c-search > form > .search-mobile > button:hover, .c-search > form > .search > button:hover {
  background-color: #4960df
}

.c-search > form > .search-mobile > button:active, .c-search > form > .search > button:active {
  background-color: #32408f
}

.c-search > form > .search-mobile > button > .icon, .c-search > form > .search > button > .icon {
  background-color: #fff
}

.c-search > form > .result {
  top: 50px;
  left: 0;
  position: absolute;
  width: 100%;
  overflow: hidden;
  z-index: 999;
  transition: max-height .2s;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 0;
  background-color: #fff
}

.c-search > form > .result.opened {
  padding-top: 15px
}

.c-search > form > .result > .c-spinner {
  position: absolute !important
}

.c-search > form > .result > .history, .c-search > form > .result > .property-list {
  margin: 0 auto;
  width: 100%;
  max-width: 645px;
  padding-right: 59px;
  overflow: hidden;
  height: auto;
  max-height: 0;
  transition: max-height .2s;
  padding-bottom: 4px
}

.c-search > form > .result > .history.only, .c-search > form > .result > .property-list.only {
  margin-bottom: 20px
}

.c-search > form > .result > .history.hidden, .c-search > form > .result > .property-list.hidden {
  max-height: 0;
  margin-bottom: 0;
  padding-bottom: 0
}

.c-search > form > .result > .history > .header, .c-search > form > .result > .property-list > .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 4px 4px;
  overflow: hidden;
  height: auto;
  max-height: 30px;
  transition: max-height .2s
}

.c-search > form > .result > .history > .header.hidden, .c-search > form > .result > .property-list > .header.hidden {
  max-height: 0;
  padding: 0
}

.c-search > form > .result > .history > .header > .name, .c-search > form > .result > .property-list > .header > .name {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #1a1a1a
}

.c-search > form > .result > .history > .header > .clear, .c-search > form > .result > .property-list > .header > .clear {
  font-size: 14px;
  line-height: 17px;
  color: #818ca9;
  cursor: pointer
}

.c-search > form > .result > .history > .category, .c-search > form > .result > .history > .property, .c-search > form > .result > .property-list > .category, .c-search > form > .result > .property-list > .property {
  padding: 8px 8px 5px 4px;
  color: #1a1a1a;
  border-radius: 4px;
  cursor: pointer
}

.c-search > form > .result > .history > .category > a, .c-search > form > .result > .history > .property > a, .c-search > form > .result > .property-list > .category > a, .c-search > form > .result > .property-list > .property > a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #1a1a1a
}

.c-search > form > .result > .history > .category > a > div, .c-search > form > .result > .history > .property > a > div, .c-search > form > .result > .property-list > .category > a > div, .c-search > form > .result > .property-list > .property > a > div {
  display: flex;
  flex-direction: column
}

.c-search > form > .result > .history > .category > a > div > span, .c-search > form > .result > .history > .property > a > div > span, .c-search > form > .result > .property-list > .category > a > div > span, .c-search > form > .result > .property-list > .property > a > div > span {
  font-size: 14px;
  line-height: 17px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 580px
}

.c-search > form > .result > .history > .category > a > div > span.page, .c-search > form > .result > .history > .property > a > div > span.page, .c-search > form > .result > .property-list > .category > a > div > span.page, .c-search > form > .result > .property-list > .property > a > div > span.page {
  padding: 4px 9px;
  margin-top: 5px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #8e8e8e;
  border-radius: 10px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-search > form > .result > .history > .category > a > div > span.category, .c-search > form > .result > .history > .category > a > div > span.subtype, .c-search > form > .result > .history > .category > a > div > span.type, .c-search > form > .result > .history > .property > a > div > span.category, .c-search > form > .result > .history > .property > a > div > span.subtype, .c-search > form > .result > .history > .property > a > div > span.type, .c-search > form > .result > .property-list > .category > a > div > span.category, .c-search > form > .result > .property-list > .category > a > div > span.subtype, .c-search > form > .result > .property-list > .category > a > div > span.type, .c-search > form > .result > .property-list > .property > a > div > span.category, .c-search > form > .result > .property-list > .property > a > div > span.subtype, .c-search > form > .result > .property-list > .property > a > div > span.type {
  background: #e1ffe9;
  color: #3dcb5c
}

.c-search > form > .result > .history > .category > a > div > span.brand, .c-search > form > .result > .history > .category > a > div > span.proizvoditel, .c-search > form > .result > .history > .property > a > div > span.brand, .c-search > form > .result > .history > .property > a > div > span.proizvoditel, .c-search > form > .result > .property-list > .category > a > div > span.brand, .c-search > form > .result > .property-list > .category > a > div > span.proizvoditel, .c-search > form > .result > .property-list > .property > a > div > span.brand, .c-search > form > .result > .property-list > .property > a > div > span.proizvoditel {
  background: #f3eaff;
  color: #d330b9
}

.c-search > form > .result > .history > .category > a > div > span.nozologiya, .c-search > form > .result > .history > .property > a > div > span.nozologiya, .c-search > form > .result > .property-list > .category > a > div > span.nozologiya, .c-search > form > .result > .property-list > .property > a > div > span.nozologiya {
  background: #fff3e1;
  color: #d77605
}

.c-search > form > .result > .history > .category > a > div > span.deystvuyushchee_veshchestvo, .c-search > form > .result > .history > .property > a > div > span.deystvuyushchee_veshchestvo, .c-search > form > .result > .property-list > .category > a > div > span.deystvuyushchee_veshchestvo, .c-search > form > .result > .property-list > .property > a > div > span.deystvuyushchee_veshchestvo {
  background: #e1eaff;
  color: #7fa6ff
}

.c-search > form > .result > .history > .category.property, .c-search > form > .result > .history > .property.property, .c-search > form > .result > .property-list > .category.property, .c-search > form > .result > .property-list > .property.property {
  padding: 8px 8px 8px 11px
}

.c-search > form > .result > .history > .category.category, .c-search > form > .result > .history > .property.category, .c-search > form > .result > .property-list > .category.category, .c-search > form > .result > .property-list > .property.category {
  overflow: hidden;
  height: auto;
  max-height: none;
  transition: .2s;
  cursor: pointer
}

.c-search > form > .result > .history > .category.category.delete, .c-search > form > .result > .history > .property.category.delete, .c-search > form > .result > .property-list > .category.category.delete, .c-search > form > .result > .property-list > .property.category.delete {
  padding-top: 0;
  padding-bottom: 0;
  max-height: 0
}

.c-search > form > .result > .history > .category.category > a > div, .c-search > form > .result > .history > .property.category > a > div, .c-search > form > .result > .property-list > .category.category > a > div, .c-search > form > .result > .property-list > .property.category > a > div {
  flex-direction: row;
  align-items: center
}

.c-search > form > .result > .history > .category.category > a > div > .icon, .c-search > form > .result > .history > .property.category > a > div > .icon, .c-search > form > .result > .property-list > .category.category > a > div > .icon, .c-search > form > .result > .property-list > .property.category > a > div > .icon {
  min-width: 24px;
  background-color: #818ca9;
  cursor: pointer
}

.c-search > form > .result > .history > .category.item-selected, .c-search > form > .result > .history > .category:hover, .c-search > form > .result > .history > .property.item-selected, .c-search > form > .result > .history > .property:hover, .c-search > form > .result > .property-list > .category.item-selected, .c-search > form > .result > .property-list > .category:hover, .c-search > form > .result > .property-list > .property.item-selected, .c-search > form > .result > .property-list > .property:hover {
  background-color: #ebf0f9
}

.c-search > form > .result > .history > .category.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .history > .category:hover > a > .c-arrow-svg > div > span, .c-search > form > .result > .history > .property.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .history > .property:hover > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .category.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .category:hover > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .property.item-selected > a > .c-arrow-svg > div > span, .c-search > form > .result > .property-list > .property:hover > a > .c-arrow-svg > div > span {
  background-color: #3f51b5
}

.c-search > form > .result > .history > .category.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .history > .category:hover > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .history > .property.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .history > .property:hover > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .category.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .category:hover > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .property.item-selected > a > .c-arrow-svg > div > span:first-of-type, .c-search > form > .result > .property-list > .property:hover > a > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-search > form > .result > .history > .category.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .history > .category:hover > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .history > .property.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .history > .property:hover > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .category.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .category:hover > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .property.item-selected > a > .c-arrow-svg > div > span:last-of-type, .c-search > form > .result > .property-list > .property:hover > a > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-search > form > .result > .history > .category > .icon, .c-search > form > .result > .history > .property > .icon, .c-search > form > .result > .property-list > .category > .icon, .c-search > form > .result > .property-list > .property > .icon {
  min-width: 24px
}

.c-search > form > .result > .product-list {
  width: 100%;
  max-width: 645px;
  padding-right: 59px;
  margin: 0 auto 15px;
  overflow: hidden;
  height: auto;
  max-height: 0;
  transition: max-height .2s
}

.c-search > form > .result > .product-list.hidden {
  max-height: 0;
  margin-bottom: 0
}

.c-search > form > .result > .product-list > .product {
  display: flex;
  max-width: inherit;
  width: 100%;
  padding: 10px 15px;
  color: #1a1a1a;
  border-radius: 4px;
  box-sizing: border-box;
  transition: .3s;
  align-items: center
}

.c-search > form > .result > .product-list > .product.item-selected, .c-search > form > .result > .product-list > .product:hover {
  background-color: #ebf0f9
}

.c-search > form > .result > .product-list > .product.item-selected > div > .description > .title > .name, .c-search > form > .result > .product-list > .product:hover > div > .description > .title > .name {
  color: #3f51b5
}

.c-search > form > .result > .product-list > .product.item-selected > div > .description > .title > .sticker, .c-search > form > .result > .product-list > .product:hover > div > .description > .title > .sticker {
  background-color: #f14a4a;
  color: #fff
}

.c-search > form > .result > .product-list > .product > a {
  display: flex;
  max-width: inherit;
  width: 100%;
  max-width: 517px;
  margin-right: 25px
}

.c-search > form > .result > .product-list > .product > a > .image {
  flex-basis: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  pointer-events: none
}

.c-search > form > .result > .product-list > .product > a > .image > img {
  max-height: 80px;
  max-width: 80px
}

.c-search > form > .result > .product-list > .product > a > .description {
  display: flex;
  margin-left: 10px;
  width: 100%
}

.c-search > form > .result > .product-list > .product > a > .description > .title {
  align-items: flex-start;
  width: 200px;
  margin-right: 0;
  align-self: center
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 5px;
  display: flex;
  align-items: center
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category > .text {
  padding: 5px 5px 5px 10px;
  display: block;
  line-height: 10px;
  background-color: #f7f8fc;
  border-radius: 20px 0 0 20px;
  color: #ff0089;
  font-weight: 500
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg {
  background-color: #ff0089;
  border-radius: 0 20px 20px 0;
  width: 20px;
  height: 20px
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon {
  width: 20px;
  height: 20px;
  min-width: 20px
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 1;
  transform: translateX(-4px)
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(2px)
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .name {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  max-height: 50px;
  overflow: hidden;
  color: #1a1a1a;
  display: block;
  width: inherit;
  word-wrap: break-word
}

.c-search > form > .result > .product-list > .product > a > .description > .title > .sticker {
  border: 1px solid #f14a4a;
  color: #f14a4a;
  background-color: hsla(0, 0%, 100%, .8);
  font-weight: 500;
  font-size: 10px;
  padding: 0 12px;
  z-index: 1;
  transition: .3s;
  border-radius: 10px;
  margin-top: 10px
}

.c-search > form > .result > .product-list > .product > a > .description > .prescription {
  width: 30px;
  height: 30px;
  margin-right: 0;
  align-self: center
}

.c-search > form > .result > .product-list > .product > a > .description > .prices {
  min-width: 230px;
  display: flex;
  align-items: center;
  justify-content: flex-end
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div {
  display: flex;
  flex-direction: column
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.line {
  background-color: #818ca9;
  height: 17px;
  width: 1px;
  margin: 17px 14px 0 10px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.without-card {
  color: #596175;
  max-width: 95px;
  width: 100%
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span {
  font-size: 10px;
  line-height: 12px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span:last-of-type {
  font-size: 22px;
  line-height: 27px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card, .c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-period {
  color: #1a1a1a
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span, .c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span:last-of-type, .c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span:last-of-type {
  font-weight: 700;
  font-size: 22px;
  line-height: 27px
}

.c-search > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span:last-of-type {
  color: #fff;
  background-color: #ff0089;
  padding: 0 6px;
  border-radius: 5px
}

.c-search > form > .result > .product-list > .product > a > .description > .is-recipe {
  display: flex;
  font-size: 10px;
  align-items: center;
  color: #818ca9
}

.c-search > form > .result > .product-list > .product > .add-to-basket, .c-search > form > .result > .product-list > .product > .in-basket {
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3f51b5;
  margin-left: 20px;
  border: none;
  cursor: pointer
}

.c-search > form > .result > .product-list > .product > .add-to-basket > .add-basket2, .c-search > form > .result > .product-list > .product > .in-basket > .add-basket2 {
  background-color: #fff;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-search > form > .result > .product-list > .product > .add-to-basket > .spinner, .c-search > form > .result > .product-list > .product > .in-basket > .spinner {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  margin: 0;
  background-color: #fff
}

.c-search > form > .result > .product-list > .product > .add-to-basket:not(.disabled):hover {
  background-color: #4960df
}

.c-search > form > .result > .product-list > .product > .add-to-basket.rare {
  background-color: #005e01
}

.c-search > form > .result > .product-list > .product > .add-to-basket.rare:hover {
  background-color: green
}

.c-search > form > .result > .product-list > .product > .in-basket {
  background-color: #0ada8f
}

.c-search > form > .result > .product-list > .product > .in-basket > .icon {
  background-color: #fff;
  margin: 0
}

.c-search > form > .result > .product-list > .product > .in-basket:hover {
  background-color: #59ebb6
}

.c-search > form > .result > .product-list > .show-more {
  cursor: pointer;
  color: #3f51b5;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin-top: 15px;
  margin-bottom: 15px;
  letter-spacing: .065em;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  padding-left: 15px;
  align-items: center
}

.c-search > form > .result > .product-list > :deep(.show-more) > .icon {
  width: 20px;
  height: 20px;
  background-color: #3f51b5
}

.c-search > form > .result > .product-list > :deep(.show-more:hover) > .c-arrow-svg > div > span {
  background-color: #3f51b5
}

.c-search > form > .result > .product-list > :deep(.show-more:hover) > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-search > form > .result > .product-list > :deep(.show-more:hover) > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-search > form > .result > .product-list > .show-more-mobile {
  display: flex
}

.c-search > form > .result > .product-list > :deep(.show-more-mobile) > .c-button {
  max-width: 308px;
  margin: 20px auto;
  -webkit-tap-highlight-color: transparent
}

.c-search > form > .result > .not-found-products, .c-search > form > .result > .not-found {
  margin: auto;
  padding: 0 10px;
  max-width: 680px;
  width: 100%;
  box-sizing: border-box;
  height: auto;
  max-height: 0;
  transition: .2s;
  overflow: hidden
}

.c-search > form > .result > .not-found-products.show, .c-search > form > .result > .not-found.show {
  margin-bottom: 30px;
  max-height: 85px
}

.c-search > form > .result > .not-found-products > p, .c-search > form > .result > .not-found > p {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px
}

.c-search > form > .result > .not-found-products > div, .c-search > form > .result > .not-found > div {
  font-size: 14px;
  line-height: 21px;
  max-width: 430px
}

.c-search > form > .result > .not-found-products > div > a, .c-search > form > .result > .not-found > div > a {
  color: #3f51b5;
  display: inline-flex;
  font-weight: 600
}

.c-search > form > .overlay {
  height: calc(100vh - 84px);
  width: 100%;
  left: 0;
  position: absolute;
  transition: .2s;
  visibility: hidden;
  background-color: transparent
}

.c-search > form > .overlay.active {
  visibility: visible;
  background-color: rgba(0, 0, 0, .2)
}

.c-search.mobile.opened {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  display: flex;
  padding: 0
}

.c-search.mobile.opened > form {
  height: 100%;
  padding: 0 10px;
  overflow-x: hidden;
  flex-flow: column;
  align-items: center;
  position: relative;
  overflow-y: scroll
}

.c-search.mobile.opened > form > .search, .c-search.mobile.opened > form {
  width: -webkit-fill-available;
  width: -moz-available;
  background-color: #fff;
  display: flex
}

.c-search.mobile.opened > form > .search {
  position: fixed;
  justify-content: center;
  z-index: 2;
  padding: 10px
}

.c-search.mobile.opened > form > .search > .close {
  top: 17px;
  right: 15px
}

.c-search.mobile.opened > form > .search > .voice.right {
  top: 17px;
  right: 45px
}

.c-search.mobile.opened > form > .search > .search-mobile {
  top: 18px;
  left: 13px
}

.c-search.mobile.opened > form > .result {
  display: flex;
  flex-flow: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  max-width: 450px;
  width: 100%;
  margin-top: 50px;
  padding-bottom: 10px;
  height: unset;
  top: 0;
  min-height: 75vh;
  z-index: 1
}

.c-search.mobile.opened > form > .result > .c-spinner {
  height: 98%;
  width: 95%
}

.c-search.mobile.opened > form > .result > .history {
  height: unset;
  max-height: unset;
  padding-bottom: 0;
  transition: unset;
  overflow: hidden
}

.c-search.mobile.opened > form > .result > .history > .header {
  padding: 0;
  margin-bottom: 10px
}

.c-search.mobile.opened > form > .result > .history > .category {
  padding: 8px 0
}

.c-search.mobile > form > .search > input {
  padding-right: 70px
}

.c-search.mobile > form > .search > .voice {
  top: 7px;
  right: 7px
}

.c-search.mobile > form > .search > .voice.right {
  right: 35px
}

.c-search.mobile > form > .result {
  max-height: none;
  padding: 0 10px;
  box-sizing: border-box;
  height: 0
}

.c-search.mobile > form > .result > .history, .c-search.mobile > form > .result > .property-list {
  margin-bottom: 5px;
  padding-right: 0;
  max-height: none;
  overflow: visible;
  overflow: initial
}

.c-search.mobile > form > .result > .history > .category > a > div > span, .c-search.mobile > form > .result > .history > .property > a > div > span, .c-search.mobile > form > .result > .property-list > .category > a > div > span, .c-search.mobile > form > .result > .property-list > .property > a > div > span {
  font-size: 13px;
  line-height: 16px;
  max-width: 280px
}

.c-search.mobile > form > .result > .history > .category > a > div > span.page, .c-search.mobile > form > .result > .history > .property > a > div > span.page, .c-search.mobile > form > .result > .property-list > .category > a > div > span.page, .c-search.mobile > form > .result > .property-list > .property > a > div > span.page {
  font-size: 9px;
  line-height: 11px
}

.c-search.mobile > form > .result > .product-list {
  padding-left: 0;
  max-height: none;
  overflow: visible;
  overflow: initial;
  margin-bottom: 0;
  padding-right: 0
}

.c-search.mobile > form > .result > .product-list > :deep(.show-more-mobile) > .c-button {
  margin-top: 10px;
  margin-bottom: 0;
  height: 40px
}

.c-search.mobile > form > .result > .product-list > .product {
  margin-bottom: 20px;
  padding: 0
}

.c-search.mobile > form > .result > .product-list > .product:hover {
  background-color: unset
}

.c-search.mobile > form > .result > .product-list > .product > .add-to-basket, .c-search.mobile > form > .result > .product-list > .product > .in-basket {
  margin: 0 5px;
  width: 35px;
  height: 35px;
  min-width: 35px
}

.c-search.mobile > form > .result > .product-list > .product > .add-to-basket > .icon, .c-search.mobile > form > .result > .product-list > .product > .in-basket > .icon {
  width: 22px;
  height: 22px;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-search.mobile > form > .result > .product-list > .product > a {
  margin-right: unset
}

.c-search.mobile > form > .result > .product-list > .product > a > .image {
  flex-basis: 90px;
  min-width: 90px;
  margin: auto
}

.c-search.mobile > form > .result > .product-list > .product > a > .image > img {
  max-height: 90px;
  max-width: 90px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description {
  flex-flow: column
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title {
  align-self: unset;
  margin-right: unset;
  width: 150px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .text {
  padding: 10px 3px 11px 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg {
  background-color: #ff0089;
  width: 18px;
  height: 36px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon {
  width: 18px;
  height: 36px;
  min-width: 18px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon:first-of-type {
  -webkit-mask-size: 60%;
  mask-size: 60%
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category > .c-arrow-svg .icon:last-of-type {
  -webkit-mask-size: 45%;
  mask-size: 45%;
  margin-left: -22px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:first-of-type {
  opacity: 0;
  transform: none
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .category:hover > .c-arrow-svg > div > span:last-of-type {
  transform: none
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .name {
  font-size: 13px;
  line-height: 16px;
  color: #1a1a1a
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .title > .sticker {
  font-size: 9px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices {
  flex-direction: row-reverse;
  justify-content: flex-end;
  min-width: 205px;
  margin-top: 10px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.line {
  margin: 11px 14px 0 10px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span {
  font-size: 9px;
  line-height: 11px;
  margin-bottom: 5px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.without-card > span:last-of-type {
  font-size: 20px;
  line-height: 24px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-card, .c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-period {
  max-width: 95px;
  width: 100%
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span, .c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span {
  font-size: 9px;
  line-height: 11px;
  margin-bottom: 5px
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-card > span:last-of-type, .c-search.mobile > form > .result > .product-list > .product > a > .description > .prices > div.with-period > span:last-of-type {
  font-size: 20px;
  line-height: 24px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content
}

.c-search.mobile > form > .result > .product-list > .product > a > .description > .not-available {
  font-size: 14px;
  margin: auto 0;
  color: #8e8e8e
}

.c-search.mobile > form > .result > .not-found-products, .c-search.mobile > form > .result > .not-found {
  height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  margin: auto;
  max-width: 320px
}

.c-search.mobile > form > .result > .not-found-products.show, .c-search.mobile > form > .result > .not-found.show {
  height: 100%;
  padding-bottom: 80px;
  max-height: none
}

.c-search.mobile > form > .result > .not-found-products > p, .c-search.mobile > form > .result > .not-found > p {
  font-size: 17px;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 10px
}

.c-search.mobile > form > .result > .not-found-products > div, .c-search.mobile > form > .result > .not-found > div {
  line-height: 20px
}

.c-search.mobile > form > .result > .not-found-products > div > div, .c-search.mobile > form > .result > .not-found > div > div {
  display: flex;
  margin-top: 32px
}

.c-search.mobile > form > .result > .not-found-products > div > div > .c-button, .c-search.mobile > form > .result > .not-found > div > div > .c-button {
  max-width: unset;
  -webkit-tap-highlight-color: transparent
}

.c-search.mobile > form > .result > .not-found-products {
  margin: unset
}

.c-search.mobile > form > .result > .not-found-products.show {
  margin: auto;
  padding-bottom: 10px
}

@-webkit-keyframes speach {
  50% {
    transform: scale(1.1)
  }

  to {
    transform: scale(1)
  }
}

@keyframes speach {
  50% {
    transform: scale(1.1)
  }

  to {
    transform: scale(1)
  }
}

@media screen and (max-width: 850px) {
  .c-search {
    padding: 0 10px
  }

  .c-search > form > .search {
    margin-right: 0
  }

  .c-search > form > .search.focus > input {
    padding-left: 15px
  }

  .c-search > form > .search > input {
    height: 38px;
    padding: 0 35px;
    background: #ebf0f9;
    border-radius: 5px;
    font-size: 13px
  }

  .c-search > form > .search > .close {
    top: 7px;
    right: 7px
  }

  .c-search > form > .search > .search-mobile {
    display: block;
    background-color: #3f51b5;
    position: absolute;
    min-width: 24px;
    top: 7px;
    left: 7px
  }

  .c-search > form > .search > button {
    display: none
  }

  .c-search > form > .search > .advertising-links {
    left: 90px
  }

  .c-search > form > .search > .voice {
    right: 10px
  }

  .c-search > form > .result.opened {
    top: 60px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 10px
  }

  .c-search > form > .result.opened > .product-list > .product > a > .image {
    align-items: flex-start
  }

  .c-search > form > .result.opened > .product-list > .product > .description {
    flex-flow: column;
    align-items: inherit
  }

  .c-search > form > .result.opened > .product-list > .product > .description > .title {
    font-size: 15px
  }

  .c-search > form > .result.opened > .product-list > .product > .description > .prices {
    margin-top: 7px
  }

  .c-search > form > .result.opened > .product-list > .product > .description > .prices > .with-period {
    font-size: 15px
  }
}

@media screen and (max-width: 550px) {
  .c-search > form > .result > .not-found {
    margin: auto
  }
}

@media screen and (max-width: 360px) {
  .c-search.mobile > form > .result > .product-list > .product > a > .image {
    flex-basis: 60px;
    min-width: 60px
  }

  .c-search.mobile > form > .result > .product-list > .product > a > .image > img {
    max-height: 60px;
    max-width: 60px
  }
}
</style>