<script lang="ts" setup>
const props = defineProps({
  productID: {
    type: Number,
    required: true,
    default: 0
  },
  productSlug: {
    type: String,
    required: true,
    default: ""
  },
  needOpenReviews: {
    type: String
  },
  needScrollToInstruction: {
    type: String
  },
  needOpenSidebar: {
    type: String
  },
  itemCount: {
    type: String
  }
})
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const citiesStore = useCitiesStore()
const regionsStore = useRegionsStore()
const productsStore = useProductsStore()
const productPropertyTypesStore = useProductPropertyTypesStore()
const catalogStore = useCatalogStore()
const restrictTypesStore = useRestrictTypesStore()
const articlesStore = useArticlesStore()
const meStore = useMeStore()
const sessionsStore = useSessionsStore()
const basketStore = useBasketStore()
const favoritesStore = useFavoritesStore()
const comparisonProductsStore = useComparisonProductsStore()
const bannersStore = useBannersStore()
const viewedProductsStore = useViewedProductStore()
const notificationsStore = useNotificationsStore()

const emit = defineEmits(["reviews-form-open", "open-product-curtain"])

const city = computed(() => {
  return citiesStore.currentCity
})

//async data

const isProductReviews = ref("ProductReviews" === route.name)
const isFailedGettingProduct = ref(false)
const isFailedGettingReplacements = ref(false)
const isFailedGettingRecommend = ref(false)
// const isFailedGettingReviews = ref(false)
const product = ref(<any>productsStore.item)
const replacements = ref(<any>productsStore.replacements)
const recommendations = ref(<any>productsStore.recommendations)
const reviews = ref(<any>productsStore.reviews)
const trademarkProducts = ref(<any>productsStore.trademarkProducts)
const W = ref(productPropertyTypesStore.list)
const V = ref(restrictTypesStore.list! ? restrictTypesStore.list : [])
const Z = ref(false)
const allGrades = ref(productsStore.reviews)
const totalCountReviews = ref(<any>productsStore.totalCountReviews)
// const activeTab = ref(isProductReviews.value ? 2 : 0)
const K = ref(<any>catalogStore.categoryDirectory)
const articleCategories = ref(<any>articlesStore.categories)
const et = ref(10)

if (articleCategories.value.length < 1) {
  await articlesStore.ARTICLES_GET_CATEGORIES().then((res: any) => {
    articleCategories.value = res
  }).catch((err) => {
    console.log(err)
  })
}

// activeTab: J,
// trademarkProducts: Y,
// isProductReviews: L,
// isFailedGettingProduct: x,
// isFailedGettingReplacements: F,
// isFailedGettingRecommend: N,
// isFailedGettingReviews: z,
// category: lt,
// product: G,
// recommendations: H,
// reviews: j,
// replacements: U,
// articleCategories: tt,
// allGrades: X,
// totalCountReviews: Q
//END async data

const vProductRef = ref(<any>undefined)
const comparisonRef = ref(<any>undefined)
const menuRef = ref(<any>undefined)
const propertiesRef = ref(<any>undefined)
const recommendationsRef = ref(<any>{})
const replacementsRef = ref(<any>undefined)
const descriptionRef = ref(<any>undefined)
const articlesRef = ref(<any>{})
const reviewsRef = ref(<any>undefined)

const needPaddingHeader = ref(false)
const isShowDescription = ref(false)
const isShowReviews = ref(true)
const SIZE_XS = ref(uSIZE_XS)
const SIZE_S = ref(uSIZE_S)
const SIZE_M = ref(uSIZE_M)
const SIZE_L = ref(uSIZE_L)
const isHorizontalCardMode = ref(false)
const isLoadingReviewAside = ref(<any>false)
const isLoadingMoreReviews = ref(false)
const lastScrollTop = ref(0)
const isScrollTop = ref(false)
const headerTop = ref(0)
const isShowFixedHeader = ref(false)
// const activeAccordion = ref(undefined)
// const BONUSES_TITLE = ref(uBONUSES_TITLE)
const descriptionHash = ref(undefined)
const internalItems = ref(<any>[])
const isComparisonLoading = ref(false)
const isFavoritesLoading = ref(false)
const isFromCatalog = ref(false)
// const isLoadingReplacements = ref(false)
// const isLoadingRecommend = ref(false)
const isLoadingReviews = ref(false)
const isOpenedShare = ref(false)
const showDisposableHintCompared = ref(false)
const loadingBasketProductIDs = ref(<any>[])
const loadingFavoritesProductIDs = ref(<any>[])
const pharmacyStock = ref([])
const routeCatalogParams = ref({})
const routeProperties = ref(<any>{
  10: "Brand",
  // 13: "Manufacturer",
  // 6: "ActiveSubstance",
  // "Производитель": "Manufacturers",
  "Бренд": "Brands",
  // "Действующее вещество": "ActiveSubstances"
})
const routePropertyIDs = ref([10, 13, 6])
const routePropertyKey = ref(<any>["Производитель", "Бренд", "Действующее вещество"])
const updatingBasketProductIDs = ref(<any>[])
const intervalID = ref(<any>undefined)
// const isActiveMap = ref(false)
const isProductFavoriteActive = ref(false)
const isMouseDown = ref(false)
const isMouseUp = ref(false)
const articles = ref([])
// const limitReviews = ref(10)
const isOpenStockSidebar = ref(false)
const isLimitProduct = ref(false)
const limitProduct = ref(0)
const limitProperty = ref(4)
const isOpenedPropertyBar = ref(false)
const question = ref(undefined)
// const questionTitle = ref({
//   charity: "Благотворительность",
//   bonuses: "Начисление баллов",
//   delivery: "Доставка",
//   stock: "Способ получения",
//   recipe: "Рецепт",
//   "with-period": "Клубная цена",
//   "on-order": "Под заказ",
//   country: "Страна",
//   manufacturer: "Производитель",
//   "replacement-additionally-info": "Информация"
// })
const PREPARED_PRODUCTS_FIELDS = ref(["isInBasket", "isInFavorites"])
// const TOOLTIP_TEXT = ref({
//   "Страна": "Страна производства может отличаться от указанной на сайте. Проверяйте, пожалуйста, при получении заказа.",
//   "Производитель": "Производитель может отличаться от указанного на сайте. Проверяйте, пожалуйста, при получении заказа."
// })
// const isGetRegionPharmacies = ref(false)
// const regionPharmacies = ref([])
// const regionPharmacyStock = ref([])
// const region = ref(undefined)
// const isLoadingRegionPharmacies = ref(false)
// const regionsStock = ref({})
// const fastOrderCity = ref(undefined)
const isMounted = ref(false)
// const positionTooltipAdditionallyInfo = ref("bottom")
const rareItemCount = ref(1)

//COMPUTED

const categoryRoute = computed(() => {
  return undefined === product.value ? {} : {
    name: "SelectInCategory",
    params: {
      productID: "".concat(product.value.ID)
    }
  }
})
const titleReplacementSlider = computed(() => {
  let t, e, o;
  return null !== (o = null === (e = null === (t = product.value) || undefined === t ? undefined : t.replacementsTitle) || undefined === e ? undefined : e.title) && undefined !== o ? o : ""
})
const replacementButtonText = computed(() => {
  let p = product.value,
      rt = p.replacementsTitle,
      t = "".concat(hasPaidPeriod.value ? rt.rank : rt.loyal, " ");
  return p.isAvailable || p.isWaitingArrive || (t = ""), "".concat("" === t ? rt.title : rt.buttonTitle, " ").concat(t).concat(rt.remarks)
})
const isShowBannerCard = computed(() => {
  return recommendations.value.length > 0 && undefined !== bannerYouMayNeed.value
})
const bannerYouMayNeed = computed(() => {
  return bannersStore.youMayNeed.length > 0 ? bannersStore.youMayNeed[0] : {}
})
const hasAttributes = computed(() => {
  return hasBonuses.value && !isStock.value && !hasPaidPeriod.value || product.value.allowDelivery || isRecipe.value || productCategory.value.name || isRare.value && (isMobile.value || !product.value.isAvailable)
})
const isSwapReplacementSlider = computed(() => {
  return !isFailedGettingReplacements.value && !hasReplacements.value && hasRecommend.value
})
const viewedProducts = computed(() => {
  return viewedProductsStore.items.filter((i: any) => {
    return i.ID !== props.productID
  })
})
const hasViewedProducts = computed(() => {
  return viewedProductsIDs.value.length > 0
})
const viewedProductsIDs = computed(() => {
  return viewedProductsStore.viewedProductsIDs.filter((i: any) => {
    return i !== props.productID
  })
})
const deliveryDate = computed(() => {
  // let e = new Date;
  // e.setDate(e.getDate() + (product.value.deliveryDaysMax ? product.value.deliveryDaysMax : 1))
  // return uFormat(e, "j FG")
})
const isOpenedQuestion = computed(() => {
  return undefined !== question.value
})
const hasFilteredDiscountDescription = computed(() => {
  return filteredDiscountDescription.value.length > 0
})
const filteredDiscountDescription = computed(() => {
  let t, e;
  return (null !== (e = null === (t = product.value) || undefined === t ? undefined : t.discountDescription) && undefined !== e ? e : []).filter((t: any) => {
    return !t.includes("Бесплатная доставка")
  })
})
const filterReviews = computed(() => {
  return "productID=" + props.productID
})
const basketItems = computed(() => {
  return basketStore.items
})
const cardProjects = computed(() => {
  //TODO return cardProjectsStore.list
  return []
})

const catalog = computed(() => {
  return catalogStore.catalog
})
const cities = computed(() => {
  return citiesStore.list
})
const comparisonCaption = computed(() => {
  return isInComparison.value ? "В сравнении" : "Сравнить"
})
const comparisonProducts = computed(() => {
  return comparisonProductsStore.list
})
const favorites = computed(() => {
  //TODO
  // return null !== (t = this.$store.state.favorite.products) && undefined !== t ? t : []
  return []
})
const favoritesCaption = computed(() => {
  return isInFavorites.value ? "В избранном" : "В избранное"
})
const favoritesItems = computed(() => {
  return favoritesStore.items
})
const hasReviews = computed(() => {
  return product.value.reviewsNumber > 0
})
const hasRating = computed(() => {
  return !!product.value.rating
})
const hasDescription = computed(() => {
  return description.value.length > 0
})
const hasRemarks = computed(() => {
  return !!product.value.replacementsTitle.remarks && !!product.value.replacementsTitle.remarksHint
})
const hasReplacements = computed(() => {
  return replacements.value.length > 0
})
const hasTrademarkProducts = computed(() => {
  return trademarkProducts.value.length > 0
})
const hasBonuses = computed(() => {
  return undefined !== product.value.bonuses
})
const hasDeliveryRuleID = computed(() => {
  return undefined !== product.value.deliveryRuleID
})
const hasImages = computed(() => {
  return product.value.images.length > 0
})
const hasLoyalCard = computed(() => {
  return meStore.hasLoyalCard
})
const hasPaidPeriod = computed(() => {
  return meStore.hasPaidPeriod
})
const hasProduct = computed(() => {
  return Object.keys(product.value).length > 0
})
const hasRecommend = computed(() => {
  return recommendations.value.length > 0
})
const hasRestricts = computed(() => {
  return preparedRestricts.value.length > 0
})
const isAddingToFavorites = computed(() => {
  return !isInFavorites.value && isFavoritesLoading.value
})
const isAuthorized = computed(() => {
  return sessionsStore.isAuthorized
})
const isCityAllowDelivery = computed(() => {
  return city.value.allowDelivery
})
const isDeletionFromFavorites = computed(() => {
  return isInFavorites.value && isFavoritesLoading.value
})
const isGlobalLoading = computed(() => {
  return appStore.getIsLoading
})
const isInBasket = computed(() => {
  return true === basketStore.inBasket[props.productID]
})
const isInComparison = computed(() => {
  return comparisonProducts.value.find((t: any) => {
    return t.categoryID === productCategory.value.ID && t.productIDs.includes(props.productID)
  })
})
const description = computed(() => {
  return product.value.description ? product.value.description : []
})
const isInFavorites = computed(() => {
  return true === favoritesStore.inFavorites[props.productID]
})
const isLoyal = computed(() => {
  return product.value.price.withCard! !== product.value.price.withoutCard!
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const isNotAvailable = computed(() => {
  return 0 === pharmacyStock.value.length
})
const isRank = computed(() => {
  return !isLoyal.value && product.value.price.withPeriod !== product.value.price.withoutCard
})
const isRecipe = computed(() => {
  return product.value.isRecipe
})
const allowOnlinePayment = computed(() => {
  return product.value.allowOnlinePayment
})
const isStock = computed(() => {
  return undefined !== product.value.sticker
})

const linkFreeDelivery = computed(() => {
  //TODO
  // return {
  //   name: "PopularCategories",
  //   params: {
  //     popularCategory: null !== (n = null === (r = (null !== (o = null === (e = null !== (t = this.params) && undefined !== t ? t : {}) || undefined === e ? undefined : e.deliveryRules) && undefined !== o ? o : {})[product.value.deliveryRuleID]) || undefined === r ? undefined : r.code) && undefined !== n ? n : undefined !== product.value.deliveryAmount ? "free_ship_pack" : "free_ship"
  //   }
  // }
})
const me = computed(() => {
  return meStore.getMe ? meStore.getMe : {}
})
const params = computed(() => {
  return <any>appStore.params
})
const productSumFreeShip = computed(() => {
  return params.value.deliveryRules[product.value.deliveryRuleID] ? params.value.deliveryRules[product.value.deliveryRuleID].productAmount : 0
})

const pluralizeBonuses = computed(() => {
  return undefined === product.value.bonuses ? "" : uPluralize(product.value.bonuses, ["балл", "балла", "баллов"])
})

const regions = computed(() => {
  return regionsStore.regions
})
const preparedRestricts = computed(() => {
  if (product.value.restricts) {
    return product.value.restricts.reduce((t: any, o: any) => {
      let r = preparedRestrictTypes.value.get(o.typeID),
          n = uRestrictAccess[o.level];
      undefined !== r && undefined !== n && t.push({
        ...o,
        icon: r.icon,
        caption: "" + n + " " + r.name.toLowerCase()
      })
      return t
    }, [])
  }

  return []
})
const preparedRestrictTypes = computed(() => {
  let t = new Map;
  restrictTypes.value.forEach((e: any) => {
    t.set(e.ID, {
      ...e,
      icon: "url(".concat(e.icon, ")")
    })
  })
  return t
})
const productCardProjects = computed(() => {
  return cardProjects.value.filter((e: any) => {
    return (product.value.cardProjects ? product.value.cardProjects : []).indexOf(e.code) > -1
  })
})
const productCharity = computed(() => {
  // let t = this;
  // return this.charity.filter((function (e) {
  //   let o;
  //   return (null !== (o = t.$data.product.charity) && undefined !== o ? o : []).indexOf(e.code) > -1
  // }))
})
const productCategories = computed(() => {
  return catalog.value.categories
})
const productCategory = computed(() => {
  return productCategories.value.find((t: any) => {
    return t.ID === product.value.categoryID
  })
})
const productSubtypes = computed(() => {
  return catalog.value.subtypes
})
const productTypes = computed(() => {
  return catalog.value.types
})
const hasDiscount = computed(() => {
  return "n+m" === product.value.discountTemplate && undefined !== preparedCheckItems.value[props.productID] && undefined !== preparedCheckItems.value[props.productID].ruleID
})
const preparedCheckItems = computed(() => {
  //TODO
  // return getPreparedCheckItems()
  return <any>{}
})
const properties = computed(() => {
  if (0 !== Object.keys(propertyTypes.value).length) {
    let o = product.value.properties.reduce((t: any, p: any) => {
      if (!propertyTypes.value[p.typeID] || !propertyTypes.value[p.typeID].isVisible) return t;
      let o = propertyTypes.value[p.typeID].name;
      return undefined === t[o] && (t[o] = []), t[o].push(p), t
    }, {});
    isMobile.value && (o["Артикул"] = [{
      name: props.productID
    }]);
    let r = <any>{}
    let c = ["Действующее вещество", "Рецептурность", "Форма выпуска", "Бренд", "Производитель", "Страна", "Способ хранения", "Артикул"]
    for (let n = 0; n < c.length; n++) {
      let p = c[n];
      undefined !== o[p] && (r[p] = o[p])
    }
    return r
  }
})
const propertyTypes = computed(() => {
  return productPropertyTypesStore.list.reduce((t: any, p: any) => {
    t[p.ID] = p
    return t
  }, {})
})
const restrictTypes = computed(() => {
  return restrictTypesStore.list
})
const shareLinks = computed(() => {
  let imageShare = image(SIZE_M.value),
      title = product.value.name,
      t = "".concat(params.value.siteURL, "/product/").concat(product.value.ID, "-").concat(product.value.slug);
  return [{
    name: "Вконтакте",
    icon: "vk",
    link: "https://vk.com/share.php?image=".concat(imageShare, "&title=").concat(title, "&url=").concat(t)
  }, {
    name: "Одноклассники",
    icon: "ok",
    link: "https://connect.ok.ru/offer?url=".concat(t, "&title=").concat(title, "&imageUrl=").concat(imageShare)
  }, {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://api.whatsapp.com/send?text=".concat(t)
  }, {
    name: "Telegram",
    icon: "telegram",
    link: "https://telegram.me/share/url?url=".concat(t, "&text=").concat(title)
  }]
})
const preparedArticles = computed(() => {
  return undefined === articleCategories.value ? [] : articles.value.map((a: any) => {
    let o, r = articleCategories.value.find((t: any) => {
          return t.ID === a.categoryID
        }),
        n = {
          ...a,
          image: "url(".concat(a.image.endsWith(uSIZE_S) ? a.image.slice(0, -uSIZE_S.length) + uSIZE_L : a.image, ")"),
          route: {
            name: "Article",
            params: {
              ID: "".concat(a.ID),
              slug: a.slug,
              sectionName: "blog"
            }
          }
        }
    return undefined !== r && undefined !== r.parentID && ((null === (o = n.route) || undefined === o ? undefined : o.params).categoryName = r.slug), n
  })
})
const hasRegionsStock = computed(() => {
  // let t;
  // return Object.keys(null !== (t = this.regionsStock) && undefined !== t ? t : {}).length > 0
})
const productName = computed(() => {
  return product.value.name
})
const selectedRegion = computed(() => {
  // let t = this;
  // return this.regions.find((function (e) {
  //   let o;
  //   return e.ID === (null === (o = t.city) || undefined === o ? undefined : o.regionID)
  // }))
})
const hasStockInHomeRegion = computed(() => {
  return false
  // let t;
  // return "".concat(null === (t = this.selectedRegion) || undefined === t ? undefined : t.ID) in this.regionsStock
})
const isRare = computed(() => {
  return product.value.isRare
})
const productOnlyInPharmacies = computed(() => {
  return product.value.isSiteSellRemains || product.value.isWaitingArrive || product.value.isOrderRcNoRc
})
const averageRating = computed(() => {
  return product.value.averageRating ? product.value.averageRating : 0
})
const rateWidth = computed(() => {
  return "" + (20 * averageRating.value) + "px"
})
//END COMPUTED

useListen("change-padding-header-product", () => {
  changePaddingHeader()
})
router.afterEach((to, from, next) => {
  to.hash.length > 0 ? scrollToDescription(to.hash) : window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
  isFromCatalog.value = "CatalogCategory" === from.name
  routeCatalogParams.value = from.params
})

onBeforeRouteUpdate((to, from, next) => {
  isProductReviews.value = "ProductReviews" === to.name
  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth"
  // })
  next()
})
onMounted(() => {
  route.hash.length > 0 ? scrollToDescription(route.hash) : window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })

  isMounted.value = true

  let disposableHintCompared = localStorage.getItem("disposable-hint-compared");
  // this.getBannerYouMayNeed()
  window.addEventListener("storage", onStorageChanged)
  showDisposableHintCompared.value = "false" !== disposableHintCompared

  viewedProductsStore.VIEWED_PRODUCTS_GET_ID()
  loadViewedProducts()

  document.addEventListener("scroll", checkScroll)
  getArticlesRandom()

  internalItems.value = [...basketItems.value]

  if (city.value.ID) {
    init().finally(() => {
      isProductReviews.value && scrollTo("reviews")
    })
  }

  startTimer()

  !isProductReviews.value && product.value.description && nextTick(() => {
    descriptionRef.value.addEventListener("copy", copyText)
  })

  "true" === props.needOpenSidebar && setTimeout(() => {
    return openStockSidebar()
  }, 300)

  isRare.value && !isNaN(Number(props.itemCount)) && (rareItemCount.value = Number(props.itemCount))
})

onBeforeUnmount(() => {
  window.removeEventListener("storage", onStorageChanged)
  // productsStore.COMMIT_PRODUCT_GET({})
  // productsStore.COMMIT_PRODUCT_GET_REVIEWS([])
  // productsStore.PRODUCT_GET_LIST({
  //   listName: "analogs",
  //   products: []
  // })
  // productsStore.PRODUCT_GET_LIST({
  //   listName: "replacements",
  //   products: []
  // })
  // productsStore.PRODUCT_GET_LIST({
  //   listName: "recommendations",
  //   products: []
  // })
  // productsStore.PRODUCT_GET_LIST({
  //   listName: "trademarkProducts",
  //   products: []
  // })
})
onUnmounted(() => {
  document.removeEventListener("scroll", checkScroll)
})


//FUNCTIONS
function onStorageChanged(t: any) {
  "viewedProductsIDs" === t.key && (JSON.parse(t.newValue ? t.newValue : "[]").includes(product.value.ID) || setViewedProductID())
}


const getPreparedCheckItems = uPreparedCheckItems

// function getCharity() {
//   this.$store.dispatch("charity/".concat(l.CHARITY.GET))
// }

// function getCardProjects() {
// this.$store.dispatch("cardProjects/".concat(l.CARD_PROJECTS.GET))
// }

// function getBannerYouMayNeed() {
//   undefined === this.bannerYouMayNeed && this.$store.dispatch("banners/".concat(l.BANNERS.GET_YOU_MAY_NEED))
// }


const translit = uTransliter

function trademarkProductCountry(p: any) {
  let prop = p.properties.find((t: any) => {
    return 15 === t.typeID
  })
  return prop.name ? prop.name : ""
}

function trademarkProductHasCountry(p: any) {
  return product.value.typeIDs.includes(396070) && undefined !== p.properties.find((t: any) => {
    return 15 === t.typeID
  })
}

function closeDisposableHintCompared() {
  localStorage.setItem("disposable-hint-compared", "false")
  showDisposableHintCompared.value = false
}

function changePaddingHeader() {
  needPaddingHeader.value = !needPaddingHeader.value
}

function showHideDescription() {
  isShowDescription.value = !isShowDescription.value
}

function showHideReviews() {
  isMobile.value && (isShowReviews.value = !isShowReviews.value)
}

function image(t: any, e?: any) {
  return uPrepareProduct({...product.value}, t, params.value.cdnURL.url).images[0]
}

function loadViewedProducts() {
  if (hasViewedProducts.value) {
    viewedProductsStore.VIEWED_PRODUCTS_GET({
      IDs: viewedProductsIDs.value,
      cityID: city.value.ID
    })
  }
}

function setQuestion(q: any) {
  question.value = q
}

function updateIsMax(t: any, e: any) {
  isLimitProduct.value = t
  limitProduct.value = e
}

function openReviewsForm() {
  setTimeout(() => {
    emit("reviews-form-open")
  }, 500)
}

function openClosePropertybar() {
  isOpenedPropertyBar.value = !isOpenedPropertyBar.value
}

function closeQuestionbar() {
  question.value = undefined
}

function openStockSidebar() {
  emit("open-product-curtain", product.value.ID, product.value.slug, false, !hasStockInHomeRegion.value && !isRare.value)
  isOpenStockSidebar.value = true
}

function formattedCreationTime(s: any) {
  let t = uToDate(s);
  return undefined !== t ? uFormat(t, "d.m.Y") : "Не известно"
}

function getArticlesRandom(t?: any) {
  let o = articleCategories.value.reduce((t: any, e: any) => {
        "news" !== e.slug && t.push(e.ID)
        return t
      }, []),
      filter = "categoryID={".concat(o.join(), "}").concat(t ? "" : "&products=".concat(product.value.ID), "[0:2]");
  useNuxtApp().$api.articles.get(filter, ["ID", "categoryID", "slug", "title", "image", "creationTime", "views", "readingTime", "commentsCount"], "random").then((a: any) => {
    articles.value = null != a ? a : []
    null === a && getArticlesRandom(true)
  }).catch((o) => {
    t || getArticlesRandom(true)
    error(o)
  }).finally(() => {
    nextTick(() => {
      checkHeight()
    })
  })
}

function pluralizeRestrictAge(t: any) {
  let e = t.minimalAge,
      o = "Месяц" === t.minimalAgeType;
  return uPluralize(e, o ? ["месяца", "месяцев", "месяцев"] : ["года", "лет", "лет"])
}

function favoriteMouseDown() {
  isMouseDown.value = true
  isProductFavoriteActive.value = true
}

function favoriteMouseUp() {
  isMouseDown.value = false
  isMouseUp.value = true
  setTimeout(() => {
    isProductFavoriteActive.value = false
    isMouseUp.value = false
  }, 300)
}

function favoriteMouseOut() {
  isMouseDown.value && !isMouseUp.value && (isProductFavoriteActive.value = false)
}

function addReview(t: any) {
  // isLoadingReviewAside.value = true
  // useNuxtApp().$api.reviews.new(t).then(() => {
  //   getTotalCountReviews()
  //   getReviews().finally(() => {
  //     isLoadingReviewAside.value = false
  //   })
  // }).catch((t: any) => {
  //   isLoadingReviewAside.value = false
  //   console.log(t)
  // })
}

function checkScroll() {
  lastScrollTop.value > window.scrollY ? isScrollTop.value = true : (isScrollTop.value = false, headerTop.value = -60), lastScrollTop.value = window.scrollY;
  let t = vProductRef.value
  isShowFixedHeader.value = window.scrollY > .2 * t.clientHeight
}

function addToBasket(t: any, e: any) {
  if (isAuthorized.value) {
    e ? updatingBasketProductIDs.value.push(t.productID) : loadingBasketProductIDs.value.push(t.productID)
    basketStore.BASKET_ADD({
      item: t,
      cityID: city.value.ID,
      isUpdate: e
    }).finally(() => {
      loadingBasketProductIDs.value = []
      e && (updatingBasketProductIDs.value = [])
    })
  } else {
    let d = [...basketItems.value]
    d.push({
      productID: product.value.ID,
      productSlug: product.value.slug,
      images: product.value.images,
      name: product.value.name,
      price: product.value.price,
      priceZakaz: product.value.priceZakaz,
      count: 1,
      isRemoved: false,
      isInStock: product.value.isInStock,
      allowDelivery: product.value.allowDelivery,
      allowOnlinePayment: product.value.allowOnlinePayment,
      discountID: product.value.discountID,
      isWithdrawn: product.value.isWithdrawn,
      limitWithCard: product.value.limitWithCard,
      limitWithoutCard: product.value.limitWithoutCard,
      deliveryDaysMax: product.value.deliveryDaysMax,
      isRecipe: product.value.isRecipe ? product.value.isRecipe : false,
      isAvailable: product.value.isAvailable,
      deliveryAmount: product.value.deliveryAmount,
      discountTemplate: product.value.discountTemplate,
      mightNeedID: product.value.mightNeedID,
      imagesSizeXS: product.value.imagesSizeXS,
      imagesSizeS: product.value.imagesSizeS,
      isSelected: false,
      isSiteSellRemains: product.value.isSiteSellRemains,
      isWaitingArrive: product.value.isWaitingArrive,
      isOrderRcNoRc: product.value.isOrderRcNoRc
    })
    hasBonuses.value && !isStock.value && (d[d.length - 1].bonuses = product.value.bonuses)
    undefined !== product.value.sticker && (d[d.length - 1].sticker = product.value.sticker)
    undefined !== product.value.deliveryRuleID && (d[d.length - 1].deliveryRuleID = product.value.deliveryRuleID)
    isMobile.value || notificationsStore.NOTIFICATIONS_UPD({
      status: "basket",
      image: image(SIZE_XS.value)
    })
    localStorage.setItem("basket", JSON.stringify(d))
    basketStore.COMMIT_BASKET_UPD(d)
  }
}

function checkHeight() {
  let c, d,
      v = recommendationsRef.value,
      h = (descriptionRef.value.clientHeight ? descriptionRef.value.clientHeight : 0) + 50,
      m = null !== (c = (v.clientHeight ? v.clientHeight : 0) + articlesRef.value.clientHeight) && undefined !== c ? c : 0;
  h < m && (articlesRef.value.style.display = "none", h < (null !== (d = v.clientHeight) && undefined !== d ? d : 0) && Array.from(v.children[1].children).forEach((t: any, i: any) => {
    i > 1 && (t.style.display = "none")
  }), nextTick(() => {
    h < (recommendationsRef.value.clientHeight ? recommendationsRef.value.clientHeight : 0) && (Array.from(v.children[1].children).forEach((t: any, i: any) => {
      i > 0 && (t.style.display = "none")
    }), isHorizontalCardMode.value = true)
  }))
}

function addToComparison() {
  if (!isComparisonLoading.value) {
    isComparisonLoading.value = true;
    let o: any = [...comparisonProducts.value];
    if (isInComparison.value) {
      let r = o.find((p: any) => {
        return p.categoryID === productCategory.value.ID
      })
      o = 1 === r.productIDs.length ? o.filter((p: any) => {
        return p.categoryID !== productCategory.value.ID
      }) : o.filter((p: any) => {
        return p.categoryID === productCategory.value.ID && (p.productIDs = p.productIDs.filter((t: any) => {
          return t !== props.productID
        })), p
      })
    } else undefined === o.find((t: any) => {
      return t.categoryID === productCategory.value.ID
    }) ? (o.push({
      categoryID: productCategory.value.ID,
      productIDs: [props.productID]
    }), sendNoticeCompare()) : o.map((t: any) => {
      return t.categoryID === productCategory.value.ID && (t.productIDs.length < 6 ? (t.productIDs.push(props.productID), sendNoticeCompare(), 6 !== t.productIDs.length || isMobile.value || notificationsStore.NOTIFICATIONS_UPD({
        status: "compare-limited",
        productCategoryName: productCategory.value.name.length > 21 && !isMobile.value ? "".concat(productCategory.value.name.slice(0, 21), "...") : productCategory.value.name
      })) : notificationsStore.NOTIFICATIONS_UPD({
        title: "Ошибка",
        desc: 'В сравнении может быть только <br> 6 товаров данной категории.<br><br><a href="/compare" class="hover-bottom-line">Перейти в сравнение</a>',
        status: "error"
      })), t
    });
    comparisonProductsStore.COMPARISON_PRODUCTS_UPD(o).finally(() => {
      isComparisonLoading.value = false
    })
  }
}

function goToReviews(t?: any) {
  isProductReviews.value && (scrollTo("reviews"), true === t && openReviewsForm())
}

function goToProduct() {
  isProductReviews.value || (scrollTo("description"), isShowDescription.value = true)
}

function goToLoyal() {
  router.push({
    name: "loyal"
  })
}

function sendNoticeCompare() {
  isMobile.value || notificationsStore.NOTIFICATIONS_UPD({
    status: "compare",
    image: image(SIZE_XS.value)
  })
}

function addToFavorites(t: any, e: any) {
  if (!e || !isFavoritesLoading.value)
    if (isAuthorized.value) {
      loadingFavoritesProductIDs.value.push(t)
      loadingFavoritesProductIDs.value.includes(product.value.ID) && (isFavoritesLoading.value = true)
      favoritesStore.FAVORITES_ADD({
        itemID: t,
        cityID: city.value.ID
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        loadingFavoritesProductIDs.value.includes(product.value.ID) && (isFavoritesLoading.value = false)
        loadingFavoritesProductIDs.value = []
      })
    } else {
      let d = [...favoritesStore.items]
      if (isInFavorites.value) {
        let m = d.findIndex((t) => {
          return t.ID === product.value.ID
        })
        d.splice(m, 1)
      } else {
        if (d.length >= params.value.maxCountFavorites) return void notificationsStore.NOTIFICATIONS_UPD({
          title: "Внимание!",
          desc: "В разделе «Избранное» добавлено максимальное количество товаров – " + params.value.maxCountFavorites + " шт.",
          status: "warning"
        });
        isMobile.value || notificationsStore.NOTIFICATIONS_UPD({
          status: "favorites",
          image: image(SIZE_XS.value)
        })
        d.push(product.value)
      }
      localStorage.setItem("favorites", JSON.stringify(d))
      favoritesStore.COMMIT_FAVORITES_UPD(d)
    }
}

function closeShareLinks() {
  isOpenedShare.value = false
  document.removeEventListener("keydown", esc)
  // document.removeEventListener("click", outside)
}

function copyText() {
  let t, text = window.getSelection(),
      e = text + "<br /><br />Источник: ".concat(params.value.siteURL).concat(route.path),
      div = document.createElement("div");
  div.style.position = "absolute"
  div.style.left = "-99999px"
  div.innerHTML = "".concat(e).replace(/\n/g, "<br />")
  null === (t = document.getElementById("app")) || undefined === t || t.appendChild(div)
  null == text || text.selectAllChildren(div), setTimeout(() => {
    let t;
    null === (t = document.getElementById("app")) || undefined === t || t.removeChild(div)
  }, 100)
}

function deleteReview(t: any) {
  // let e = this;
  // this.isLoadingReviews = true, f.a.reviews.del(t).then((function () {
  //   e.getTotalCountReviews(), e.getReviews().finally((function () {
  //     e.isLoadingReviews = false
  //   })), t.isActive && e.getProduct()
  // })).catch((function (t) {
  //   e.isLoadingReviews = false, e.error(t)
  // }))
}

function scrollToDescription(t: any) {
  if ("#instrukciya-po-primeneniyu" !== t) {
    let e = document.querySelector(t);
    descriptionHash.value = t
    uSmooth(e, -150)
  } else goToProduct()
}

function scrollTo(t: any) {
  let o = vProductRef.value;
  switch (t) {
    case "reviews":
      o = reviewsRef.value
      break;
    case "description":
      o = descriptionRef.value
      break;
    case "replacements":
      o = replacementsRef.value
      break;
    case "properties":
      o = propertiesRef.value
      break;
    default:
      break;
  }
  uSmooth(o, isMobile.value ? -60 : -150)
}

function error(t: any) {
  notificationsStore.NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}

function esc(t: any) {
  "Escape" === t.code && closeShareLinks()
}

function getReplacements(t: any) {
  // let e, o, r, n, c = this;
  // if (0 === (null !== (e = product.value.replacements) && undefined !== e ? e : []).length) return Promise.resolve();
  // t && (this.isLoadingReplacements = true);
  // let d = null !== (n = null === (r = null === (o = this.$store.state.cities) || undefined === o ? undefined : o.currentCity) || undefined === r ? undefined : r.ID) && undefined !== n ? n : 41,
  //     v = {
  //       filter: 'isNotFound="false"&ID={'.concat(product.value.replacements.join(), "}&cityID=").concat(d, "&isInStock=true&saveSort=true"),
  //       fields: m.k,
  //       listName: "replacements"
  //     },
  //     h = this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), v);
  // return h.then((function (p) {
  //   c.$data.replacements = [], c.$data.product.replacements.forEach((function (t) {
  //     p.find((function (e) {
  //       e.ID === t && c.$data.replacements.push(e)
  //     }))
  //   })), c.$data.isFailedGettingReplacements = false
  // })).catch((function (t) {
  //   c.$data.isFailedGettingReplacements = true, c.error(t)
  // })).finally((function () {
  //   t && (c.isLoadingReplacements = false)
  // })), h
}

function getTrademarkProducts() {
  // let t, e, o, r, n, c = this,
  //     d = null === (t = product.value.properties.find((function (p) {
  //       return 10 === p.typeID
  //     }))) || undefined === t ? undefined : t.ID;
  // if (0 === (null !== (e = product.value.trademarkProducts) && undefined !== e ? e : []).length || undefined === d) return Promise.resolve();
  // let v = null !== (n = null === (r = null === (o = this.$store.state.cities) || undefined === o ? undefined : o.currentCity) || undefined === r ? undefined : r.ID) && undefined !== n ? n : 41,
  //     h = ["ID", "images", "name", "price", "slug", "isRecipe", "imagesSizeXS"];
  // product.value.typeIDs.includes(396070) && h.push("properties");
  // let m = {
  //       filter: "ID!=".concat(this.productID, "&properties={typeID=10,ID=").concat(d, "}&categoryID=").concat(product.value.categoryID, "&cityID=").concat(v, "&isInStock=true&isAvailable=true[0:20]"),
  //       fields: h,
  //       path: "random",
  //       listName: "trademarkProducts"
  //     },
  //     f = this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), m);
  // return f.then((function (p) {
  //   c.$data.trademarkProducts = null != p ? p : []
  // })).catch((function (t) {
  //   c.error(t)
  // })), f
}

// function getPharmacy() {
//   return this.$store.dispatch("pharmacies/".concat(l.PHARMACIES.GET), {
//     city: this.city
//   })
// }

// function getPharmacyStock() {
//   let t = this;
//   if (undefined !== this.city && product.value.isAvailable) {
//     let e = f.a.pharmacies.getStock({
//       productID: [this.productID],
//       city: this.city,
//       isRareProduct: this.isRare
//     });
//     return this.isGetRegionPharmacies = false, e.then((function (p) {
//       t.pharmacyStock = null != p ? p : []
//     })).catch((function (t) {
//       console.log(t)
//     })), e
//   }
//   return undefined !== this.city && (this.pharmacyStock = [], this.isOpenStockSidebar = false, this.isGetRegionPharmacies = true), Promise.resolve()
// }

function getProduct() {
  // let t, e, o = this,
  //     r = this.$store.dispatch("products/".concat(l.PRODUCT.GET), "ID=".concat(this.productID, '&slug="').concat(this.productSlug, '"&cityID=').concat(null !== (e = null === (t = this.city) || undefined === t ? undefined : t.ID) && undefined !== e ? e : 41));
  // return r.then((function (p) {
  //   o.$data.product = p, o.$data.isFailedGettingProduct = false
  // })).catch((function (t) {
  //   o.$data.isFailedGettingProduct = true, o.error(t)
  // })), r
}

function getRecommend(t: any) {
  // let e, o, r, n, c = this;
  // if (0 === (null !== (e = product.value.recommend) && undefined !== e ? e : []).length) return Promise.resolve();
  // t && (this.isLoadingRecommend = true);
  // let d = null !== (n = null === (r = null === (o = this.$store.state.cities) || undefined === o ? undefined : o.currentCity) || undefined === r ? undefined : r.ID) && undefined !== n ? n : 41,
  //     v = {
  //       filter: 'isNotFound="false"&ID={'.concat(product.value.recommend.join(), "}&cityID=").concat(d, "&isInStock=true"),
  //       fields: m.k,
  //       listName: "recommendations"
  //     },
  //     h = this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), v);
  // return h.then((function (p) {
  //   let t, e = null != p ? p : [],
  //       o = null !== (t = c.$data.product.recommend) && undefined !== t ? t : [],
  //       r = [];
  //   o.forEach((function (t) {
  //     let o = e.find((function (e) {
  //       return e.ID === t
  //     }));
  //     undefined !== o && r.push(o)
  //   })), c.$data.recommendations = r, c.$data.isFailedGettingRecommend = false
  // })).catch((function (t) {
  //   c.$data.isFailedGettingRecommend = true, c.error(t)
  // })).finally((function () {
  //   t && (c.isLoadingRecommend = false)
  // })), h
}

function getRestrictTypes() {
  // return 0 !== this.restrictTypes.length ? Promise.resolve() : this.$store.dispatch("restrictTypes/".concat(l.RESTRICT_TYPES.GET))
}

function getTotalCountReviews() {
  // let t = this;
  // if (this.isRecipe) return this.$data.allGrades = [], this.$data.totalCountReviews = 0, Promise.resolve();
  // let e = f.a.reviews.get("productID=".concat(this.productID), ["ID", "rate"]);
  // return e.then((function (e) {
  //   t.$data.allGrades = null != e ? e : [], t.$data.totalCountReviews = t.$data.allGrades.length
  // })).catch((function (e) {
  //   t.error(e)
  // })), e
}

function getRegionPharmacies() {
  // let t = this;
  // return Object(c.a)(regeneratorRuntime.mark((function e() {
  //   let o, r;
  //   return regeneratorRuntime.wrap((function (e) {
  //     for (; ;) switch (e.prev = e.next) {
  //       case 0:
  //         return t.$store.commit("app/".concat(l.APP.LOADING_UPD), true), t.isGetRegionPharmacies || (t.isGetRegionPharmacies = true), t.isLoadingRegionPharmacies = true, o = function () {
  //           let e;
  //           f.a.pharmacies.get({
  //             regionID: null === (e = t.region) || undefined === e ? undefined : e.ID
  //           }).then((function (p) {
  //             t.regionPharmacies = null != p ? p : []
  //           })).catch((function (t) {
  //             console.error(t)
  //           }))
  //         }, r = function () {
  //           let e;
  //           f.a.pharmacies.getStock({
  //             productID: [t.productID],
  //             regionID: null === (e = t.region) || undefined === e ? undefined : e.ID,
  //             isRareProduct: t.isRare
  //           }).then((function (p) {
  //             t.regionPharmacyStock = null != p ? p : []
  //           })).catch((function (t) {
  //             console.error(t)
  //           }))
  //         }, e.next = 7, Promise.all([o(), r()]).finally((function () {
  //           t.$store.commit("app/".concat(l.APP.LOADING_UPD), false), t.isLoadingRegionPharmacies = false, t.isOpenStockSidebar || t.openStockSidebar()
  //         }));
  //       case 7:
  //       case "end":
  //         return e.stop()
  //     }
  //   }), e)
  // })))()
}

function getReviews(t?: any) {
  // let e = this;
  // if (this.isRecipe) return this.$data.reviews = [], Promise.resolve();
  // let o = t ? "".concat(this.filterReviews, "[").concat(this.$data.reviews.length, ":").concat(this.limitReviews, "]") : "".concat(this.filterReviews, "[0:").concat(this.limitReviews, "]"),
  //     n = f.a.reviews.get(o);
  // return t ? this.isLoadingMoreReviews = true : this.isLoadingReviews = true, n.then((function (o) {
  //   e.$data.isFailedGettingReviews = false, e.$data.reviews = t ? [].concat(Object(r.a)(e.$data.reviews), Object(r.a)(o)) : null != o ? o : []
  // })).catch((function (t) {
  //   e.$data.isFailedGettingReviews = true, e.error(t)
  // })).finally((function () {
  //   t ? e.isLoadingMoreReviews = false : e.isLoadingReviews = false
  // })), n
}

async function init() {
  // let t, e, o = this;
  // return this.$store.commit("app/".concat(l.APP.LOADING_UPD), true), this.region = this.regions.find((function (t) {
  //   let e;
  //   return t.ID === (null === (e = o.city) || undefined === e ? undefined : e.regionID)
  // })), Promise.all([0 === Object.keys(this.propertyTypes).length ? this.loadPropertyTypes().catch((function () {
  //   v.p.request(o.loadPropertyTypes, 3, 5e3)
  // })) : Promise.resolve(), 0 === this.restrictTypes.length ? this.getRestrictTypes().catch((function () {
  //   v.p.request(o.getRestrictTypes, 3, 5e3)
  // })) : Promise.resolve(), 0 === this.pharmacyStock.length ? this.getPharmacyStock().catch((function () {
  //   v.p.request(o.getPharmacyStock, 3, 5e3)
  // })) : Promise.resolve(), (null === (t = this.pharmacies[0]) || undefined === t ? undefined : t.cityID) !== (null === (e = this.city) || undefined === e ? undefined : e.ID) ? this.getPharmacy().catch((function () {
  //   v.p.request(o.getPharmacy, 3, 5e3)
  // })) : Promise.resolve(), this.setViewedProductID(), this.cardProjects.length < 1 ? this.getCardProjects() : Promise.resolve(), this.charity.length < 1 ? this.getCharity() : Promise.resolve()]).finally((function () {
  //   o.$store.commit("app/".concat(l.APP.LOADING_UPD), false)
  // }))
  return new Promise((resolve) => {
    setViewedProductID()
    resolve("")
  })
}

function loadPropertyTypes() {
  // return this.$store.dispatch("productPropertyTypes/".concat(l.PRODUCT_PROPERTY_TYPES.GET))
}

function openFastOrder() {
  // let t, e, o, r, n, c, d, v = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : undefined;
  // this.reachGoal("oneclick");
  // let h = {
  //   productID: null === (t = product.value) || undefined === t ? undefined : t.ID,
  //   productSlug: null === (e = product.value) || undefined === e ? undefined : e.slug,
  //   name: null === (o = product.value) || undefined === o ? undefined : o.name,
  //   count: this.isRare ? this.rareItemCount : 1,
  //   price: null === (r = product.value) || undefined === r ? undefined : r.price,
  //   images: null === (n = product.value) || undefined === n ? undefined : n.images,
  //   isSiteSellRemains: null === (c = product.value) || undefined === c ? undefined : c.isSiteSellRemains,
  //   isOrderRcNoRc: null === (d = product.value) || undefined === d ? undefined : d.isOrderRcNoRc
  // };
  // this.$store.commit("checkout/".concat(l.CHECKOUT.FAST_ORDER_UPD), {
  //   item: h,
  //   pharmacyID: v,
  //   city: this.fastOrderCity,
  //   isRare: this.isRare
  // }), this.$router.push({
  //   name: "checkout"
  // })
}

function openPopup(t: any) {
  let e = screen.width / 2 - 300,
      o = screen.height / 2 - 200;
  window.open(t, "", "width=" + 600 + ", height=" + 400 + ", top=" + o + ", left=" + e)
}

function openShareLinks() {
  isOpenedShare.value = true
  document.addEventListener("keydown", esc)
}

// function outside(t: any) {
//   let menu = menuRef.value,
//       e = t.target;
//   menu.contains(e) || closeShareLinks()
// }

const preparedProducts = uPrepared

function repeatGettingProduct() {
  // let t, e, o = this;
  // this.getProduct().then((function () {
  //   return o.updateBreadcrumbs(), Promise.all([o.getReplacements(), o.getTrademarkProducts(), o.getRecommend()])
  // })), 0 === Object.keys(this.propertyTypes).length ? this.loadPropertyTypes().catch((function () {
  //   v.p.request(o.loadPropertyTypes, 3, 5e3)
  // })) : Promise.resolve(), 0 === this.restrictTypes.length ? this.getRestrictTypes().catch((function () {
  //   v.p.request(o.getRestrictTypes, 3, 5e3)
  // })) : Promise.resolve(), this.getTotalCountReviews(), this.getReviews(), 0 === this.pharmacyStock.length ? this.getPharmacyStock().catch((function () {
  //   v.p.request(o.getPharmacyStock, 3, 5e3)
  // })) : Promise.resolve(), (null === (t = this.pharmacies[0]) || undefined === t ? undefined : t.cityID) !== (null === (e = this.city) || undefined === e ? undefined : e.ID) ? this.getPharmacy().catch((function () {
  //   v.p.request(o.getPharmacy, 3, 5e3)
  // })) : Promise.resolve(), this.setViewedProductID()
}

function routeProperty(t: any, e: any, o?: any) {
  let r = (o ? routePropertyKey.value.includes(t) : routePropertyIDs.value.includes(e.typeID)) ? routeProperties.value[o ? t : e.typeID] : "";
  return o ? {
    name: r
  } : {
    name: r,
    params: {
      propertyID: "".concat(e.ID),
      // propertyName: e.name.trim(),
      // propertyTypeID: "".concat(e.typeID),
      // propertyTypeName: t.trim(),
      propertySlug: "".concat(e.slug)
    }
  }
}

function setViewedProductID() {
  let e = [...JSON.parse(localStorage.getItem("viewedProductsIDs") !== null ? <any>localStorage.getItem("viewedProductsIDs") : "[]")];
  e.length > 0 && e.includes(product.value.ID) && e.splice(e.indexOf(product.value.ID), 1)
  e.length >= 30 && e.splice(29, 1)
  e.unshift(product.value.ID)
  localStorage.setItem("viewedProductsIDs", JSON.stringify(e))
}

function share() {
  isOpenedShare.value ? closeShareLinks() : openShareLinks()
}

function startTimer() {
  intervalID.value = window.setInterval(() => {
    Object.keys(product.value).length > 0 && undefined !== window && (clearInterval(intervalID.value))
  }, 1e3)
}

function updateBasketItem(t: any) {
  addToBasket(t, true)
}

function updateBasketStore(t: any) {
  basketStore.COMMIT_BASKET_UPD(t)
}


function updateFavoritesStore(t: any) {
  favoritesStore.COMMIT_FAVORITES_UPD(t)
}

function updateReview(t: any) {
  // isLoadingReviewAside.value = true
  // useNuxtApp().$api.reviews.update(t).then(() => {
  //   getTotalCountReviews()
  //   getReviews().finally(() => {
  //     isLoadingReviewAside.value = false
  //   })
  // }).catch((t: any) => {
  //   isLoadingReviewAside.value = false
  //   console.log(t)
  // })
}

//END FUNCTIONS

//HEAD props
let y = product.value.properties!.find((p: any) => {
  return 13 === p.typeID
}).name.replace('"', "«").replace('"', "»")
let urlHead = "" + params.value.siteURL + "/product/" + props.productID + "-" + product.value.slug + (isProductReviews.value ? "/otzyvy" : "")
let titleHead = isProductReviews.value ? "Отзывы " + product.value.name + (y ? " " + y : "") : "" + product.value.name + " цена от " + (product.value.price.withPeriod ? product.value.price.withPeriod : "") + " руб. купить в магазинах YComsmetic, инструкция по применению"
let descHead = isProductReviews.value ? "Ознакомьтесь с отзывами покупателей о " + product.value.name + ", ценой и наличием в магазинах YCosmetic. " + (y ? "Производитель: " + y + ". " : "") + "Оформите заказ онлайн и заберите в ближайшем магазине." : "Купить " + product.value.name + " по цене от " + product.value.price.withPeriod + " руб. в магазинах YCosmetic. Инструкция по применению, аналоги и отзывы покупателей. Закажите на сайте и заберите в ближайшем магазине."
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: urlHead,
    },
  ],
}))
useSeoMeta({
  title: titleHead,
  description: descHead,
  ogType: 'website',
  ogUrl: urlHead,
  ogImage: product.value.images ? "" + product.value.images[0] : 'https://cosmetic.yanco.ru/img/cosmetic_logo.png',
  ogTitle: product.value.name ? product.value.name : "",
  ogDescription: descHead
})
</script>

<template>
  <main ref="vProductRef" :class='["v-product", "container", { mobile: isMobile }]' itemscope=""
        itemtype="http://schema.org/Product">
    <div v-if="isFailedGettingProduct && hasProduct && isGlobalLoading" class="no-product-in-city">
      <p>К сожалению, товар отсутствует в Вашем городе</p>
      <span>
        Пожалуйста, воспользуйтесь нашим
        <NuxtLink class="hover-bottom-line" :to='{ name: "catalog" }'>
          каталогом
        </NuxtLink>
      </span>
    </div>

    <div v-if="!isMobile" class="header">
      <h1 itemprop="name">{{ isProductReviews ? "Отзывы о " + product.name : product.name }}</h1>
      <span>Артикул: {{ productID }}</span>
    </div>
    <div
        :class='["header-fixed", { show: isShowFixedHeader, mobile: isMobile, "need-padding": isOpenStockSidebar || needPaddingHeader }]'>
      <template v-if="isMobile">
        <div class="product-info">
          <h2>{{ productName }}</h2>
          <ul>
            <li :class='["favorites", "unselect", { active: isProductFavoriteActive, disabled: isFavoritesLoading }]'
                v-on:mousedown="favoriteMouseDown"
                v-on:mouseout="favoriteMouseOut"
                v-on:mouseup="favoriteMouseUp"
                v-on:click.prevent="addToFavorites(product.ID, !0)">
              <span
                  :class='["icon", { heart2: isInFavorites || isAddingToFavorites, "heart-outline2": !isInFavorites || isDeletionFromFavorites }]'/>
            </li>
            <li class="share" @click="share">
              <span :class='["icon", { share: isOpenedShare, "share-outline": !isOpenedShare }]'/>
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <div class="top">
          <div class="product-info">
            <img :src='image(SIZE_XS)' alt="" width="100%" height="100%"/>
            <div>
              <div class="name">{{ product.name }}</div>
              <ul>
                <li v-if='hasRating' class="rating">
                  <ReviewsCRating :rate-width="rateWidth" :rating="averageRating"
                                  :review-count="product.reviewsNumber"/>
                </li>
                <li @click='scrollTo("properties")'>
                  <span class="hover-bottom-line">Характеристики</span>
                </li>
                <li v-if="hasDescription" @click="goToProduct">
                  <NuxtLink class="hover-bottom-line"
                            :to='{ name: "Product", params: { productID: "" + product.ID, productSlug: "" + product.slug }, hash: isMobile ? undefined : "#instrukciya-po-primeneniyu" }'>
                    Инструкция
                  </NuxtLink>
                </li>
                <li :class='["favorites", { active: isProductFavoriteActive, disabled: isFavoritesLoading }]'
                    v-on:mousedown="favoriteMouseDown"
                    v-on:mouseout="favoriteMouseOut"
                    v-on:mouseup="favoriteMouseUp"
                    v-on:click.prevent="addToFavorites(product.ID, !0)">
                  <span
                      :class='["icon", { heart2: isInFavorites || isAddingToFavorites, "heart-outline2": !isInFavorites || isDeletionFromFavorites }]'/>
                </li>
                <li ref="comparisonRef" :class='["comparison", { disabled: isComparisonLoading }]'>
                  <div @click.prevent="addToComparison">
                    <span :class='["icon compare", { "add-compare": isInComparison }]'/>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="product.isAvailable" class="prices">
            <section>
              <template v-if="isLoyal">
                <div class="with-card">
                  <span>По акции</span>
                  <span>
                    <span>{{ product.price.withCard }} ₽</span>
                  </span>
                </div>
              </template>
              <template v-if="isRank">
                <div class="with-period">
                  <span>Клубная цена</span>
                  <span>
                    <span>{{ product.price.withPeriod }} ₽</span>
                  </span>
                </div>
              </template>
              <template v-if="hasProduct">
                <div class="without-card">
                  <span>Цена</span>
                  <span>
                    <span>| {{ product.price.withoutCard }} ₽</span>
                  </span>
                </div>
              </template>
            </section>
            <template v-if="!isRare">
              <BasketCButtonBasket :basket-items="basketItems"
                                   :has-loyal-card="hasLoyalCard"
                                   :has-product="hasProduct" :is-authorized="isAuthorized"
                                   :is-basket-updating="updatingBasketProductIDs.includes(product.ID)"
                                   :is-in-basket="isInBasket"
                                   :is-loading="loadingBasketProductIDs.includes(product.ID)"
                                   :is-mobile="isMobile"
                                   :product="product" v-on:basket-item-update="updateBasketItem"
                                   v-on:basket-store-update="updateBasketStore" v-on:is-max="updateIsMax"
                                   v-on:add-to-basket="addToBasket"/>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="action-list">
      <ul>
        <li v-if="hasReviews && !isMobile" class="rating">
          <ReviewsCRating :rate-width="rateWidth" :rating="averageRating"
                          :review-count="product.reviewsNumber"/>
        </li>
        <li v-if="!isMobile" @click="goToReviews(!hasReviews)">
          <NuxtLink
              :to='{ name: "ProductReviews", params: { productID: "" + product.ID, productSlug: "" + product.slug } }'>
            <template v-if="hasReviews">
              <span class="average hover-bottom-line">Читать отзывы </span>
              <span class="review-count">({{ totalCountReviews }})</span>
            </template>
            <template v-else>
              <span class="icon star2"/>
              <span class="hover-bottom-line">Написать отзыв</span>
            </template>
          </NuxtLink>
        </li>
        <li v-if="hasDescription" @click="goToProduct">
          <span class="icon instruction"/>
          <NuxtLink
              :to='{ name: "Product", params: { productID: "" + product.ID, productSlug: "" + product.slug }, hash: isMobile ? undefined : "#instrukciya-po-primeneniyu" }'>
            <span class="hover-bottom-line">Инструкция</span>
          </NuxtLink>
        </li>
        <li :class='["favorites", { active: isProductFavoriteActive, disabled: isFavoritesLoading }]'
            v-on:mousedown="favoriteMouseDown"
            v-on:mouseout="favoriteMouseOut"
            v-on:mouseup="favoriteMouseUp"
            v-on:click.prevent="addToFavorites(product.ID, !0)">
          <span
              :class='["icon", { heart2: isInFavorites || isAddingToFavorites, "heart-outline2": !isInFavorites || isDeletionFromFavorites }]'/>
          <span class="hover-bottom-line">{{ favoritesCaption }}</span>
        </li>
        <li ref="comparisonRef" :class='["comparison", { disabled: isComparisonLoading }]'>
          <div @click.prevent="addToComparison">
            <span :class='["icon compare", { "add-compare": isInComparison }]'/>
            <span class="hover-bottom-line">
              {{ comparisonCaption }}
            </span>
          </div>
          <!--          <div v-if='!isInComparison && showDisposableHintCompared && !isMobile' class="disposable-hint-compared">-->
          <!--            <div>-->
          <!--                <span class="icon close2" @click.prevent="closeDisposableHintCompared">-->
          <!--                  Вы можете добавить-->
          <!--                  <br>-->
          <!--                  товар к сравнению-->
          <!--                </span>-->
          <!--            </div>-->
          <!--          </div>-->
        </li>
        <li class="share" @click="share">
          <span :class='["icon", { share: isOpenedShare, "share-outline": !isOpenedShare }]'/>
          <span class="hover-bottom-line">
            Поделиться
          </span>
          <ul v-if="!isMobile" ref="menuRef" :class='["share-links", { opened: isOpenedShare && !isMobile }]'>
            <li v-for="(e,i) in shareLinks" :key="i" @click="openPopup(e.link)">
              <span :class='["icon", e.icon]'/>
              {{ e.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <section class="product">
      <div class="summary">
        <div class="images">
          <div class="image-list flex-vertical-nowrap">
            <ProductCZoomImage class="zoom-image" :disabled="!hasImages || isMobile"
                               :image="image(isMobile ? SIZE_S : SIZE_M)"
                               :image-title='product.images ? product.name : "Изображение отсутствует"'
                               :is-mobile="isMobile" :scale="2" :zoomed-image="image(SIZE_L)"/>
            <h1 v-if="isMobile" itemprop="name">{{ product.name }}</h1>
            <UiCButton class="replacement-scroll-button" mode="gradient" @click='scrollTo("replacements")'
                       v-if="isMobile && replacements.length > 0 && (product.replacementsTitle || {}).isBenefit">
              {{ replacementButtonText }}
            </UiCButton>
            <div v-if="hasRating && isMobile && product.isAvailable && !isRare" class="reviews unselect">
              <div class="c-rating mobile internal-card">
                <ReviewsCRating :rate-width="rateWidth" :rating="averageRating"
                                :review-count="product.reviewsNumber"/>
              </div>
              <NuxtLink
                  :to='{ name: "ProductReviews", params: { productID: "" + product.ID, productSlug: "" + product.slug } }'>
                <template v-if="hasReviews">
                  <span class="average">Читать отзывы </span>
                  <span class="review-count">({{ totalCountReviews }})</span>
                </template>
                <template v-else>
                  <span class="icon star2"/>
                  <span class="">Написать отзыв</span>
                </template>
              </NuxtLink>
            </div>
            <ul v-show="hasRestricts && !isMobile" class="restrict-list">
              <li v-for="(e,r) in preparedRestricts" :key="r" class="restrict"
                  :data-tooltip='e.caption + (e.minimalAge ? " от " + e.minimalAge + " " + pluralizeRestrictAge(e) : "")'>
                <div :class="e.level">
                  <span class="restrict-icon" :style='{ "background-image": e.icon }'/>
                </div>
                <span :class='["icon", e.level]'/>
              </li>
            </ul>
          </div>

          <div class="buy">
            <template v-if="product.isAvailable">
              <div v-if="!product.isInStock" class="on-order">
                <span class="icon warning"/>
                {{ isRare ? "Редкий препарат." : "" }}
                Товар под заказ
                <span class="question">
                  <UiCTooltipIcon mobile-bottom-tooltip-name="on-order" position="top-center"
                                  :is-mobile-tooltip="isMobile" :size='isMobile ? "s" : "l"' @click.stop
                                  v-on:show-mobile-tooltip="setQuestion">
                    <template v-slot:icon>
                      <span class="icon">
                        <span class="icon question2"/>
                      </span>
                    </template>
                    <template v-if="isRare" v-slot:text>
                      С вами свяжется наш менеджер для согласования стоимости товара и условий доставки.
                    </template>
                    <template v-else v-slot:text>
                      Придётся подождать...
                      <br>
                      Оформите товар под заказ, и его доставят в удобный для вас магазин
                    </template>
                  </UiCTooltipIcon>
                </span>
              </div>
            </template>
            <template v-else>
              <div class="not-available">
                <span class="icon error"/>
                {{ product.isWaitingArrive ? "Ожидается." : "Временно отсутствует" }}
              </div>
            </template>

            <div v-if="product.isDietarySupplement && !isMobile" class="alert">
              <span class="icon info2"/>
              БАД. Не является лекарственным средством!
            </div>

            <div v-if="product.discountDescription" class="discount-warning">
              <span class="icon warning"/>
              Окончательный расчет скидки будет произведен при покупке.
            </div>

            <div :class='["details", { stock: isStock }]'>
              <div v-if="product.isAvailable" class="prices product-prices-fixed">
                <section itemprop="offers" itemscope="" itemtype="http://schema.org/AggregateOffer">
                  <template v-if="isLoyal">
                    <div class="with-card">
                      <span>По акции</span>
                      <span>
                        <meta :content="product.price.withCard" itemprop="lowPrice">
                        {{ product.price.withCard + " ₽" }}
                      </span>
                    </div>
                  </template>
                  <template v-if="isRank">
                    <div class="with-period">
                      <span>Клубная цена</span>
                      <span>
                        <meta :content="product.price.withPeriod" itemprop="lowPrice">
                        {{ product.price.withPeriod + " ₽" }}
                      </span>
                    </div>
                  </template>
                  <template v-if="hasProduct">
                    <div class="without-card">
                      <span>Цена</span>
                      <span>
                        <meta :content="product.price.withoutCard" itemprop="highPrice">
                        {{ " | " + product.price.withoutCard + " ₽" }}
                      </span>
                    </div>
                  </template>
                  <meta content="RUB" itemprop="priceCurrency">
                  <link v-if="product.isAvailable" href="http://schema.org/InStock" itemprop="availability"/>
                </section>

                <template v-if="isRare && !isMobile">
                  <div class="rare-product">
                    <span class="icon warning"/>
                    Редкий препарат
                  </div>
                </template>

                <BasketCButtonBasket :basket-items="basketItems"
                                     :has-loyal-card="hasLoyalCard"
                                     :has-product="hasProduct" :is-authorized="isAuthorized"
                                     :is-basket-updating="updatingBasketProductIDs.includes(product.ID)"
                                     :is-in-basket="isInBasket"
                                     :is-loading="loadingBasketProductIDs.includes(product.ID)"
                                     :is-mobile="isMobile"
                                     :product="product" v-on:basket-item-update="updateBasketItem"
                                     v-on:basket-store-update="updateBasketStore" v-on:is-max="updateIsMax"
                                     v-on:add-to-basket="addToBasket"/>
              </div>

              <div v-if="hasDiscount" class="discount-success">
                <span class="icon success-alert"/>
                Ура! Вы воспользовались акцией!
              </div>

              <ul v-if="hasFilteredDiscountDescription" class="discount-descriptions">
                <li v-for="(e,i) in filteredDiscountDescription" :key="i">
                  {{ e }}
                </li>
              </ul>

              <ul v-if="productCardProjects.length > 0" class="card-projects">
                productCardProjects
              </ul>

              <div v-if="hasAttributes" class="attributes">
                <div v-if="hasBonuses && !isStock && !hasPaidPeriod && product.isAvailable" class="bonuses">
                  <span class="icon discont-card2"/>
                  <div>
                    <span class="text">
                      {{ product.bonuses + " " + pluralizeBonuses }}
                      <template v-if="isMobile">
                        <br>
                        на карту
                      </template>
                      <template v-else>
                        <span class="card">на карту</span>
                      </template>
                    </span>
                  </div>
                </div>

                <div v-if="product.allowDelivery"
                     :class='["free-ship", { delivery: product.allowDelivery && !product.deliveryRuleID }]'>
                  <div class="icons">
                    <span :class='["icon", product.deliveryRuleID && isCityAllowDelivery ? "free-ship" : "truck"]'/>
                    <span v-if="product.deliveryAmount" class="amount">
                      {{ product.deliveryAmount || "" }}
                    </span>
                  </div>
                  <div class="text">
                    <span>
                      <template v-if="product.deliveryRuleID && isCityAllowDelivery">
                        <span v-if="product.deliveryAmount">
                          Бесплатная
                          <br v-if="isMobile">
                          доставка от {{ product.deliveryAmount || "" }} шт
                        </span>
                        <span v-else>
                          Бесплатная
                          <br v-if="isMobile">
                          доставка от {{ productSumFreeShip }}₽
                        </span>
                      </template>
                      <template v-else>
                        Доставка
                        <br v-if="isMobile">
                        по адресу
                        <span class="question">
                          <UiCTooltipIcon mobile-bottom-tooltip-name="delivery" position="top-center" size="l"
                                          @click.prevent v-on:show-mobile-tooltip="setQuestion">
                            <template v-slot:icon>
                              <span class="icon">
                                <span class="icon question2"/>
                              </span>
                            </template>
                            <template v-slot:text>
                              <div v-if="product.deliveryRuleID && isCityAllowDelivery" class="promotion-description">
                                В акции «Бесплатная доставка» участвуют товары, отмеченные знаком
                                <span class="orange">с оранжевой машинкой</span>.
                                Закажите любые позиции
                                <span v-if="product.deliveryAmount">
                                  {{ "от " + product.deliveryAmount + " шт." }}
                                </span>
                                <span v-else>
                                  {{ "на сумму от " + productSumFreeShip + " ₽" }}
                                </span>
                                и вам доставят товары в день заказа бесплатно с 8:00 до 20:00. Доставка
                                заказов, принятых после {{ params.deliveryMaxTimeOrderToday }} выполняется на следующий день.
                                <br><br>
                                Оплата заказа производится онлайн.
                              </div>
                              <div v-else>
                                Доставка товаров осуществляется {{
                                  params.deliveryTimePeriod
                                }} по единому тарифу {{ params.deliveryCost || 0 }}₽.
                                Доставка заказов, принятых после {{ params.deliveryMaxTimeOrderToday }}, выполняется на следующий день.
                                Оплата заказа производится онлайн.
                              </div>
                            </template>
                          </UiCTooltipIcon>
                        </span>
                      </template>
                    </span>
                  </div>
                </div>

                <div v-if="isRecipe" class="recipe">
                  <div class="icons">
                    <span class="icon prescription"/>
                  </div>
                  <div class="text">
                    <span>Отпускается по рецепту</span>
                  </div>
                </div>
              </div>

              <div v-if="product.isAvailable" class="fast-order">
                <UiCButton mode="white-to-crimson" @click="openFastOrder">
                  <span class="icon thunder"/>
                  Заказать в 1 клик
                </UiCButton>
              </div>

              <div class="message">
                Производитель оставляет за собой право изменять внешний вид и описание товара. Цена {{ productName }} в
                аптеках может отличаться от цены, указанной на сайте. Товары из оформленного заказа отпускаются по
                наименьшей из цен на сайте или в магазине.
              </div>
            </div>
          </div>
        </div>

        <div class="properties" ref="propertiesRef">
          <table v-if="!isMobile" class="property-list">
            <tbody>
            <tr v-for="(p,e,r) in properties" :key="e" v-show="!isMobile || r < limitProperty"
                class="property unselect">
              <td class="name">
                <NuxtLink v-if="routePropertyKey.includes(e)" class="hover-bottom-line" :to="routeProperty(e, p, !0)">
                  {{ e }}
                </NuxtLink>
                <span v-else>
                  {{ e }}
                </span>
              </td>
              <td class="values">
                <span v-for="(r,n) in p" :key="n" class="value unselect">
                  <template v-if="routePropertyIDs.includes(r.typeID) && void 0 !== r.slug">
                    <NuxtLink class="search" :to="routeProperty(e, r)">
                      <span class="hover-bottom-line" :data-tooltip="r.name">
                        {{ r.name }}
                      </span>
                    </NuxtLink>
                  </template>
                  <template v-else-if="routePropertyIDs.includes(r.typeID) && null == r.slug">
                    <span>
                      <span :data-tooltip="r.name">{{ r.name }}</span>
                    </span>
                  </template>
                  <template v-else>
                    <span :class='{ country: "Страна" === e }'>
                      {{ r.name }}
                    </span>
                  </template>
                </span>
              </td>
            </tr>
            </tbody>
          </table>

          <div v-if="product.isDietarySupplement && isMobile" class="alert">
            <span class="icon info2"/>
            БАД. Не является лекарственным средством!
          </div>

          <div v-if="isMobile" class="all-property unselect" @click="openClosePropertybar">
            <h2>
              <span>Все характеристики {{ productName }}</span>
            </h2>
            <span :class='["icon", "arrow-right2", { opened: isOpenedPropertyBar }]'/>
          </div>

          <div v-if="!isFailedGettingReplacements && hasReplacements" ref="replacementsRef">
            cProductsSlider
          </div>
        </div>
      </div>

      <div class="details">
        <div :class='["content", { border: hasRecommend }]'>
          <div v-if="hasTrademarkProducts" class="trademark-products">
            <h2>{{ "Другие формы выпуска " + productName }}</h2>
            cSlider
          </div>

          <section v-if="product.description && !isProductReviews" ref="descriptionRef"
                   :class='["description", { hide: !isShowDescription && isMobile, border: isRecipe }]'>
            <h2 @click="showHideDescription">
              Инструкция по применению {{ productName }}
              <span v-if="isMobile" :class='["icon", "arrow-right2", { opened: isShowDescription }]'/>
            </h2>
            <div>
              <div v-if="!isMobile" class="tags">
                <NuxtLink v-for="(desc, e) in product.description" :key="e"
                          :class='["hover-bottom-line", "unselect", { selected: translit(desc.name, !0) === descriptionHash }]'
                          :to='{ name: "Product", params: { productID: product.ID, productSlug: product.slug }, hash: "#" + translit(desc.name, !0) }'>
                  {{ desc.name }}
                </NuxtLink>
              </div>
              <ul itemprop="description">
                <li v-for="(desc, e) in product.description" :key="e"
                    :class='{ selected: translit(desc.name, !0) === descriptionHash, literature: 666 === desc.typeID }'>
                  <h3 :id='"" + translit(desc.name, !0)'>{{ desc.name }}</h3>
                  <section v-html="desc.description"/>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <aside v-if="!isProductReviews && hasDescription">
          <template v-if="isFailedGettingRecommend || !hasRecommend || isSwapReplacementSlider"></template>
          <template v-else>
            <div ref="recommendationsRef" class="recommendations">
              <h3>Вам может понадобиться</h3>
              <div>
                <ProductCProductCard v-for="(e,r) in preparedProducts(recommendations, PREPARED_PRODUCTS_FIELDS)"
                                     v-show="isShowBannerCard ? r < 3 : r < 4" :key="r" :basket-items="basketItems"
                                     :favorites-items="favoritesItems" :city="city" :has-loyal-card="hasLoyalCard"
                                     :index="r" :is-authorized="isAuthorized"
                                     :is-basket-loading="loadingBasketProductIDs.includes(e.ID)"
                                     :is-basket-updating="updatingBasketProductIDs.includes(e.ID)"
                                     :is-favorites-loading="loadingFavoritesProductIDs.includes(e.ID)"
                                     :is-horizontal-mode="isHorizontalCardMode" :product="e"
                                     :product-categories="productCategories" :product-subtypes="productSubtypes"
                                     :product-types="productTypes" no-microdata-needed size="m"
                                     v-on:add-to-basket="addToBasket"
                                     v-on:add-to-favorites="addToFavorites"
                                     v-on:basket-item-update="updateBasketItem"
                                     v-on:basket-store-update="updateBasketStore"
                                     v-on:favorites-store-update="updateFavoritesStore"/>
                <div v-if="isShowBannerCard">
                  cBannerCard
                </div>
              </div>
            </div>
          </template>

          <div ref="articlesRef" class="articles">
            <h3>Полезные статьи</h3>
            <NuxtLink v-for="(a,i) in preparedArticles" :key="i" :to="a.route">
              <span class="image" :style="{ backgroundImage: a.image }"/>
              <div class="flex-vertical-nowrap">
                <span>{{ a.title }}</span>
                <div class="meta-info">
                  <div>
                    <span>
                      <span class="icon calendar2"/>
                      {{ formattedCreationTime(a.creationTime) }}
                    </span>
                    <span>
                      <span class="icon clock2"/>
                      {{ a.readingTime }} мин. чтения
                    </span>
                  </div>
                  <div>
                    <span v-if="a.views > 0">
                      <span class="icon eye-open2"/>
                      {{ a.views }}
                    </span>
                    <span v-if="a.commentsCount > 0">
                      <span class="icon comment2"/>
                      {{ a.commentsCount }}
                    </span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

        </aside>
      </div>

      <section ref="reviewsRef" class="reviews">
        <LazyUiCSpinner v-if="isLoadingReviews" class="loading" :position='isMobile ? "fixed" : "absolute"'/>
        <h2 @click="showHideReviews">
          <span v-if="totalCountReviews > 0">
            Отзывы
            <span class="count">({{ totalCountReviews }})</span>
          </span>
          <span v-else>
            Отзывов пока нет
          </span>

          <span v-if="isMobile" :class='["icon", "arrow-right2", { opened: isShowReviews }]'/>
        </h2>

        <ReviewsCReviews v-if="isShowReviews" :all-grades="allGrades" :average-rating="product.averageRating"
                         :is-authorized="isAuthorized" :is-loading="isLoadingReviews"
                         :is-loading-more-reviews="isLoadingMoreReviews" :is-loading-review-aside="isLoadingReviewAside"
                         :is-product-reviews="isProductReviews" :is-mobile="isMobile" :me="me" :product-i-d="productID"
                         :product-name="product.name" :reviews="reviews" :total-count="totalCountReviews"
                         v-on:error="error"
                         v-on:review-add="addReview"
                         v-on:review-delete="deleteReview"
                         v-on:review-update="updateReview"
                         v-on:get-more-reviews="getReviews(!0)"
                         v-on:go-to-reviews="goToReviews"
                         v-on:open-close-sidebar="changePaddingHeader"/>

        <NuxtLink v-if="!isProductReviews && totalCountReviews > 2 && isShowReviews" class="reviews-link"
                  :to='{ name: "ProductReviews", params: { productID: "" + product.ID, productSlug: "" + product.slug } }'>
          Читать все отзывы
        </NuxtLink>
      </section>
    </section>

    <UiCBottomBar v-if="isMobile" class="share-bar" :is-opened="isOpenedShare" title="Поделиться" @close="share">
      <ul class="share-links" ref="menuRef">
        <li v-for="(e,i) in shareLinks" :key="i" @click="openPopup(e.link)">
          <span :class='["icon", e.icon]'/>
          {{ e.name }}
        </li>
      </ul>
    </UiCBottomBar>
    <UiCBottomBar v-if="isMobile" class="property-bar" :is-opened="isOpenedPropertyBar" title="Все характеристики"
                  @close="openClosePropertybar">
      <div class="properties">
        <table class="property-list">
          <tbody>
          <tr v-for="(p,e) in properties" :key="e" class="property">
            <td class="name">
              <NuxtLink v-if="routePropertyKey.includes(e)" class="unselect" :to="routeProperty(e, p, !0)">
                {{ e }}
              </NuxtLink>
              <span v-else>{{ e }}</span>
            </td>
            <td class="values">
              <span v-for="(r,n) in p" :key="n" class="value unselect">
                  <template v-if="routePropertyIDs.includes(r.typeID) && void 0 !== r.slug">
                    <NuxtLink class="search" :to="routeProperty(e, r)">
                      <span>
                        {{ r.name }}
                      </span>
                    </NuxtLink>
                  </template>
                  <template v-else-if="routePropertyIDs.includes(r.typeID) && null == r.slug">
                    <span>
                      <span>{{ r.name }}</span>
                    </span>
                  </template>
                  <template v-else>
                    <span :class='{ country: "Страна" === e }'>
                      {{ r.name }}
                    </span>
                  </template>
                </span>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="product.isDietarySupplement" class="alert">
          <span class="icon info2"/>
          БАД. Не является лекарственным средством!
        </div>
        <ul v-show="hasRestricts" class="restrict-list">
          <li v-for="(e,r) in preparedRestricts" :key="r" class="restrict">
            <div :class="e.level">
              <span class="restrict-icon" :style='{ "background-image": e.icon }'/>
            </div>
            <span :class='["icon", e.level]'/>
            <span class="name">
              {{ e.caption + (e.minimalAge ? " от " + e.minimalAge + " " + pluralizeRestrictAge(e) : "") }}
            </span>
          </li>
        </ul>
      </div>
    </UiCBottomBar>

    <ProductCProductsSlider v-if="hasViewedProducts" class="viewed-products" :basket-items="basketItems"
                            :favorites-items="favoritesItems" :city="city" :has-loyal-card="hasLoyalCard"
                            :is-authorized="isAuthorized" :is-mobile="isMobile"
                            :loading-basket-product-i-ds="loadingBasketProductIDs"
                            :loading-favorites-product-i-ds="loadingFavoritesProductIDs"
                            :updating-basket-product-i-ds="updatingBasketProductIDs"
                            :product-categories="productCategories" :product-subtypes="productSubtypes"
                            :product-types="productTypes"
                            :products="preparedProducts(viewedProducts, PREPARED_PRODUCTS_FIELDS)" no-microdata-needed
                            title="Вы смотрели"
                            v-on:add-to-basket="addToBasket"
                            v-on:add-to-favorites="addToFavorites"
                            v-on:basket-item-update="updateBasketItem"
                            v-on:basket-store-update="updateBasketStore"
                            v-on:favorites-store-update="updateFavoritesStore"/>
  </main>
</template>

<style scoped>
.v-product {
  max-width: 1368px;
  min-height: -webkit-fit-content;
  min-height: -moz-fit-content;
  min-height: fit-content;
  width: 100%;
  padding: 0
}

.v-product > .viewed-products {
  margin-top: 30px
}

.v-product .question {
  margin-left: 5px;
  overflow: unset;
  white-space: unset
}

.v-product .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product .question > .c-tooltip-icon .icon > div {
  text-align: left
}

.v-product > .c-bottom-bar > .loading {
  top: 0;
  left: 0
}

.v-product > .c-bottom-bar.property-bar :deep(.bar) {
  padding: 10px;
  max-width: unset
}

.v-product > .c-bottom-bar.property-bar .properties {
  overflow-y: auto;
  overflow-x: hidden
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list {
  margin-bottom: 10px;
  list-style: none;
  width: 100%
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property {
  display: flex;
  min-height: 30px;
  font-size: 12px;
  justify-content: space-between;
  position: relative
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property:not(:last-of-type) {
  margin-bottom: 10px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property:before {
  content: "";
  top: 20px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: -1;
  border-bottom: 1px dashed #e7e7ea
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .name {
  position: relative;
  flex-shrink: 0;
  padding-top: 4px;
  flex-basis: unset;
  margin-right: 15px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .name > span {
  color: #596175;
  background-color: #fff;
  padding-right: 5px;
  line-height: 20px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .name > a {
  display: inline-block;
  color: #3f51b5;
  cursor: pointer;
  background-color: #fff;
  padding-right: 5px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values {
  flex-grow: unset;
  text-align: right
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value {
  background: #fff;
  display: inline-flex;
  align-items: flex-end;
  margin: 2px 0
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question), .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a {
  padding: 2px 0 2px 8px;
  font-weight: 500;
  font-size: 12px;
  white-space: unset;
  text-overflow: unset;
  overflow: unset;
  text-align: right;
  max-width: 180px
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question).search, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a.search {
  color: #3f51b5;
  cursor: pointer
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a.country {
  overflow: unset;
  white-space: unset
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country > span, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a.country > span {
  display: inline-flex;
  align-items: center
}

.v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value > span:not(.question) > span, .v-product > .c-bottom-bar.property-bar .properties > .property-list > tbody > .property > .values > .value a > span {
  background-color: #fff;
  padding-left: 5px;
  padding-bottom: 2px
}

.v-product > .c-bottom-bar.property-bar .properties > .alert {
  font-size: 13px
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-direction: column
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict:not(:last-of-type) {
  margin-right: 30px
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > .icon {
  position: absolute;
  background-color: unset;
  z-index: 1;
  width: 22px;
  height: 22px;
  bottom: 0;
  left: 24px;
  background-size: contain
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div {
  position: relative;
  border-radius: 50%;
  z-index: -1
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div.allow {
  background-color: #ebfef8
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div.carefully {
  background-color: #fff5eb
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div.deny {
  background-color: #fff6f7
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > div > .restrict-icon {
  width: 40px;
  height: 40px;
  display: block;
  background-size: contain
}

.v-product > .c-bottom-bar.property-bar .properties > .restrict-list > .restrict > .name {
  font-size: 13px;
  display: block;
  font-weight: 500;
  margin-left: 10px
}

.v-product > .c-bottom-bar.property-bar .properties > .alert {
  font-weight: 500
}

.v-product > .c-bottom-bar.property-bar .properties > .alert > .info2 {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain
}

.v-product > .c-bottom-bar.share-bar :deep(.bar) {
  padding: 10px;
  max-width: unset
}

.v-product > .c-bottom-bar.share-bar .share-links {
  margin: 0;
  padding: 0;
  list-style: none;
  display: block
}

.v-product > .c-bottom-bar.share-bar .share-links > li {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 13px;
  color: #636363;
  transition: .2s
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon {
  height: 24px;
  min-width: 24px;
  margin-right: 5px;
  -webkit-mask-size: cover;
  mask-size: cover;
  transition: .2s
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.vk {
  background-color: #2787f5
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.facebook {
  background-color: #3b5998
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.ok {
  background-color: #f7931e
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.whatsapp {
  background-color: #25d366
}

.v-product > .c-bottom-bar.share-bar .share-links > li > .icon.telegram, .v-product > .c-bottom-bar.share-bar .share-links > li > .icon.twitter {
  background-color: #4ea4f6
}

.v-product > .c-bottom-bar.stock-bar.rare .bar {
  height: 100%
}

.v-product > .c-bottom-bar.stock-bar .bar {
  padding: 0;
  height: auto;
  max-width: unset
}

.v-product > .c-bottom-bar.stock-bar .bar > .top {
  padding: 10px 10px 0
}

.v-product > .c-bottom-bar.question-bar .charity-description > div {
  font-size: 13px
}

.v-product > .c-bottom-bar.question-bar .charity-description > a {
  display: flex;
  font-size: 13px;
  margin-bottom: 15px;
  color: #1a1a1a;
  justify-content: space-between
}

.v-product > .c-bottom-bar.question-bar .charity-description > a > div {
  text-align: left;
  width: 195px;
  margin-right: 15px
}

.v-product > .c-bottom-bar.question-bar .charity-description > a > img {
  width: 76px;
  height: 76px
}

.v-product > .c-bottom-bar.question-bar .charity-description > a:last-of-type {
  margin-bottom: unset;
  font-weight: 500;
  color: #3f51b5
}

.v-product > .c-bottom-bar.question-bar .bonuses > a {
  color: #3f51b5;
  font-size: 13px;
  margin-right: 5px
}

.v-product > .c-bottom-bar.question-bar .delivery > .orange {
  color: #ff7a00
}

.v-product > .c-bottom-bar.question-bar .with-period .link {
  color: #3f51b5
}

.v-product > .failed-getting {
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center
}

.v-product > .no-product-in-city {
  text-align: center;
  margin: 0 auto
}

.v-product > .no-product-in-city > span {
  color: #636363;
  font-size: 16px
}

.v-product > .no-product-in-city > p {
  font-size: 1.5em;
  font-weight: 500
}

.v-product > .header-fixed {
  background-color: #fff;
  z-index: 99;
  position: fixed;
  transition: max-height .4s ease-in-out;
  left: 0;
  height: auto;
  max-height: 0;
  box-sizing: border-box;
  width: 100%;
  top: 60px;
  box-shadow: 0 8px 10px rgba(12, 7, 38, .1);
  overflow: hidden
}

.v-product > .header-fixed.show {
  max-height: 110px
}

.v-product > .header-fixed.mobile {
  top: 0
}

.v-product > .header-fixed.mobile.show {
  max-height: 52px
}

.v-product > .header-fixed.need-padding {
  padding-right: 17px
}

.v-product > .header-fixed > .top {
  max-width: 1368px;
  min-height: -webkit-fit-content;
  min-height: -moz-fit-content;
  min-height: fit-content;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 5px 0;
  box-sizing: border-box;
  overflow: hidden
}

.v-product > .header-fixed > .top > .product-info, .v-product > .header-fixed > .top {
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .top > .product-info > img {
  max-width: 70px;
  max-height: 70px;
  margin-right: 15px
}

.v-product > .header-fixed > .top > .product-info > div {
  display: flex;
  flex-direction: column
}

.v-product > .header-fixed > .top > .product-info > div > .name {
  font-weight: 600;
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 840px
}

.v-product > .header-fixed > .top > .product-info > div > ul {
  padding: 0;
  display: flex;
  position: relative;
  flex-flow: row wrap;
  margin: 5px 0 0
}

.v-product > .header-fixed > .top > .product-info > div > ul > li {
  display: flex;
  position: relative;
  list-style: none;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  margin-right: 15px;
  flex-shrink: 0;
  margin-bottom: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.not-available {
  color: #818ca9;
  pointer-events: none
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .stock-count {
  color: #ff0089;
  margin-left: 3px
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .sell-remains {
  color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > .icon.logo2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > a {
  display: flex;
  position: relative;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  flex-shrink: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > a > .review-count {
  color: #596175;
  font-weight: 500;
  margin: 0 3px
}

.v-product > .header-fixed > .top > .product-info > div > ul > li > a > .icon {
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  width: 16px;
  height: 16px
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > .average {
  color: #1a1a1a
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > .icon:not(.logo2) {
  background-color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > .icon:not(.logo2).heart {
  background-color: #f14a4a
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > div:not(.c-rating) {
  color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li:hover > div:not(.c-rating) > .icon:not(.rate) {
  background-color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.disabled {
  pointer-events: none;
  opacity: .5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.disabled.favorites > .icon {
  opacity: 1
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.favorites > .icon.heart2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.favorites.active > .icon {
  background-color: #cc006e;
  transform: scale(1.2)
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison {
  position: relative
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison:hover > div:first-child > .icon {
  background-color: #3f51b5
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison > div:first-child {
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison > div:first-child > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison > div:first-child > .icon.add-compare {
  background-color: #ff0089
}

.v-product > .header-fixed > .top > .product-info > div > ul > li.comparison:active > div:first-child > .icon {
  background-color: #cc006e
}

.v-product > .header-fixed > .top > .prices {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: 436px;
  width: 100%;
  grid-column-gap: 1vw;
  -moz-column-gap: 1vw;
  column-gap: 1vw
}

.v-product > .header-fixed > .top > .prices > section {
  display: flex
}

.v-product > .header-fixed > .top > .prices > section > div {
  display: flex;
  flex-flow: column
}

.v-product > .header-fixed > .top > .prices > section > div > span:first-of-type {
  margin-bottom: 5px
}

.v-product > .header-fixed > .top > .prices > section > div:first-of-type {
  color: #1a1a1a;
  margin-right: 15px
}

.v-product > .header-fixed > .top > .prices > section > div.with-card {
  min-width: 90px
}

.v-product > .header-fixed > .top > .prices > section > div.with-card > span:first-of-type {
  font-size: 11px;
  font-weight: 500
}

.v-product > .header-fixed > .top > .prices > section > div.with-card > span:last-of-type {
  line-height: 25px;
  background-color: #ff0089;
  color: #fff;
  padding: 0 6px;
  border-radius: 5px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  font-weight: 600;
  font-size: 20px;
  height: 25px
}

.v-product > .header-fixed > .top > .prices > section > div.without-card {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content
}

.v-product > .header-fixed > .top > .prices > section > div.without-card > span:first-of-type {
  font-size: 11px;
  color: #596175;
  margin-left: 11px
}

.v-product > .header-fixed > .top > .prices > section > div.without-card > span:last-of-type {
  font-size: 20px;
  color: #818ca9;
  line-height: 25px
}

.v-product > .header-fixed > .top > .prices > section > div.with-period {
  min-width: 90px
}

.v-product > .header-fixed > .top > .prices > section > div.with-period > span:first-of-type {
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .top > .prices > section > div.with-period > span:last-of-type {
  font-weight: 600;
  font-size: 20px;
  line-height: 25px
}

.v-product > .header-fixed > .top > .prices > .c-button {
  width: 100%;
  max-width: none;
  height: 48px
}

.v-product > .header-fixed > .product-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px
}

.v-product > .header-fixed > .product-info > h2 {
  max-width: 75%;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0
}

.v-product > .header-fixed > .product-info > ul {
  margin: 0;
  padding: 0;
  display: flex;
  position: relative;
  flex-flow: row wrap
}

.v-product > .header-fixed > .product-info > ul > li {
  display: flex;
  position: relative;
  list-style: none;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  margin-right: 5px;
  flex-shrink: 0
}

.v-product > .header-fixed > .product-info > ul > li.not-available {
  color: #818ca9;
  pointer-events: none
}

.v-product > .header-fixed > .product-info > ul > li > .stock-count {
  color: #ff0089;
  margin-left: 3px
}

.v-product > .header-fixed > .product-info > ul > li > .review-count {
  color: #596175;
  font-weight: 500;
  margin: 0 3px
}

.v-product > .header-fixed > .product-info > ul > li > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .product-info > ul > li > .icon.logo2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.disabled {
  pointer-events: none;
  opacity: .5
}

.v-product > .header-fixed > .product-info > ul > li.disabled.favorites > .icon {
  opacity: 1
}

.v-product > .header-fixed > .product-info > ul > li.favorites > .icon.heart2 {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.favorites.active > .icon {
  background-color: #cc006e;
  transform: scale(1.2)
}

.v-product > .header-fixed > .product-info > ul > li.comparison {
  position: relative
}

.v-product > .header-fixed > .product-info > ul > li.comparison > div:first-child {
  display: flex;
  align-items: center
}

.v-product > .header-fixed > .product-info > ul > li.comparison > div:first-child > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .header-fixed > .product-info > ul > li.comparison > div:first-child > .icon.add-compare {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.comparison:active > div:first-child > .icon {
  background-color: #cc006e
}

.v-product > .header-fixed > .product-info > ul > li.share > .icon.share {
  background-color: #ff0089
}

.v-product > .header-fixed > .product-info > ul > li.share:active > .icon {
  background-color: #cc006e
}

.v-product > .header-fixed > .product-info > ul > li > .share-links {
  top: 32px;
  left: calc(50% - 61px);
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 2;
  width: 170px;
  background-color: #fff;
  list-style: none;
  display: none;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  -webkit-animation: closed .2s;
  animation: closed .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links.opened {
  display: block;
  -webkit-animation: opened .2s;
  animation: opened .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 13px;
  color: #636363;
  transition: .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li > .icon {
  height: 21px;
  min-width: 21px;
  margin-right: 5px;
  -webkit-mask-size: cover;
  mask-size: cover;
  background-color: #818ca9;
  transition: .2s
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover {
  background-color: #f9f9f9;
  color: #3f51b5
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.vk, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.vk {
  background-color: #2787f5
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.facebook, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.facebook {
  background-color: #3b5998
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.ok, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.ok {
  background-color: #f7931e
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.whatsapp, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.whatsapp {
  background-color: #25d366
}

.v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.telegram, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:active > .icon.twitter, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.telegram, .v-product > .header-fixed > .product-info > ul > li > .share-links > li:hover > .icon.twitter {
  background-color: #4ea4f6
}

.v-product > .header {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.v-product > .header > h1 {
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
  margin-top: 5px;
  margin-bottom: 10px
}

.v-product > .header > span {
  font-size: 14px;
  color: #596175;
  flex-shrink: 0
}

.v-product > .action-list > ul {
  padding: 0;
  display: flex;
  position: relative;
  margin: 0 0 5px;
  flex-flow: row wrap
}

.v-product > .action-list > ul > li {
  position: relative;
  list-style: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  margin-right: 20px;
  margin-bottom: 10px
}

.v-product > .action-list > ul > li > a, .v-product > .action-list > ul > li {
  display: flex;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  flex-shrink: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .action-list > ul > li > a > .review-count {
  color: #596175;
  font-weight: 500;
  margin: 0 3px
}

.v-product > .action-list > ul > li > a > .icon {
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #1a1a1a
}

.v-product > .action-list > ul > li.not-available {
  color: #818ca9;
  pointer-events: none
}

.v-product > .action-list > ul > li > .stock-count {
  color: #ff0089;
  margin-left: 3px
}

.v-product > .action-list > ul > li > .sell-remains {
  color: #3f51b5
}

.v-product > .action-list > ul > li > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .action-list > ul > li > .icon.logo2 {
  background-color: #ff0089
}

.v-product > .action-list > ul > li:not(.rating):hover {
  color: #3f51b5
}

.v-product > .action-list > ul > li:not(.rating):hover > .average {
  color: #1a1a1a
}

.v-product > .action-list > ul > li:not(.rating):hover > .icon:not(.logo2) {
  background-color: #3f51b5
}

.v-product > .action-list > ul > li:not(.rating):hover > .icon:not(.logo2).heart {
  background-color: #f14a4a
}

.v-product > .action-list > ul > li:not(.rating):hover > div > .icon {
  background-color: #3f51b5
}

.v-product > .action-list > ul > li.disabled {
  pointer-events: none;
  opacity: .5
}

.v-product > .action-list > ul > li.disabled.favorites > .icon {
  opacity: 1
}

.v-product > .action-list > ul > li.favorites > .icon.heart2 {
  background-color: #ff0089
}

.v-product > .action-list > ul > li.favorites.active > .icon {
  background-color: #cc006e;
  transform: scale(1.2)
}

.v-product > .action-list > ul > li.comparison {
  position: relative
}

.v-product > .action-list > ul > li.comparison:hover > div:first-child > .icon {
  background-color: #3f51b5
}

.v-product > .action-list > ul > li.comparison > div:first-child {
  display: flex;
  align-items: center
}

.v-product > .action-list > ul > li.comparison > div:first-child > .icon {
  background-color: #1a1a1a;
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .action-list > ul > li.comparison > div:first-child > .icon.add-compare {
  background-color: #ff0089
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared {
  position: absolute;
  top: -65px;
  z-index: 1;
  left: -40px;
  border-radius: 5px;
  background-color: #3f51b5;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared:after, .v-product > .action-list > ul > li.comparison > .disposable-hint-compared:before {
  content: "";
  display: block;
  position: absolute;
  left: 80px;
  bottom: -12px;
  background: hsla(0, 0%, 100%, 0);
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #3f51b5;
  border-style: solid;
  border-width: 0 15px 12px;
  transform: rotate(180deg)
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared > div {
  display: flex;
  position: relative;
  width: 190px;
  padding: 12px 15px;
  box-sizing: border-box
}

.v-product > .action-list > ul > li.comparison > .disposable-hint-compared > div > .close2 {
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: #fff;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-product > .action-list > ul > li.comparison:active > div:first-child > .icon {
  background-color: #cc006e
}

.v-product > .action-list > ul > li.share:hover > .icon.share, .v-product > .action-list > ul > li.share > .icon.share {
  background-color: #ff0089
}

.v-product > .action-list > ul > li.share:active > .icon {
  background-color: #cc006e
}

.v-product > .action-list > ul > li > .share-links {
  top: 32px;
  left: calc(50% - 61px);
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 2;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  background-color: #fff;
  list-style: none;
  display: none;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  -webkit-animation: closed .2s;
  animation: closed .2s
}

.v-product > .action-list > ul > li > .share-links.opened {
  display: block;
  -webkit-animation: opened .2s;
  animation: opened .2s
}

.v-product > .action-list > ul > li > .share-links > li {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 13px;
  color: #636363;
  transition: .2s
}

.v-product > .action-list > ul > li > .share-links > li > .icon {
  height: 21px;
  width: 21px;
  margin-right: 5px;
  -webkit-mask-size: cover;
  mask-size: cover;
  background-color: #818ca9;
  transition: .2s
}

.v-product > .action-list > ul > li > .share-links > li:active, .v-product > .action-list > ul > li > .share-links > li:hover {
  background-color: #f9f9f9;
  color: #3f51b5
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.vk, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.vk {
  background-color: #2787f5
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.facebook, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.facebook {
  background-color: #3b5998
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.ok, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.ok {
  background-color: #f7931e
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.whatsapp, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.whatsapp {
  background-color: #25d366
}

.v-product > .action-list > ul > li > .share-links > li:active > .icon.telegram, .v-product > .action-list > ul > li > .share-links > li:active > .icon.twitter, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.telegram, .v-product > .action-list > ul > li > .share-links > li:hover > .icon.twitter {
  background-color: #4ea4f6
}

.v-product > .product > .summary {
  display: flex;
  border-bottom: 1px solid #d6d6e1;
  padding-bottom: 20px
}

.v-product > .product > .summary > .images, .v-product > .product > .summary > .properties {
  display: flex;
  flex-direction: column
}

.v-product > .product > .summary > .images {
  min-width: 550px;
  max-width: 665px;
  width: 100%;
  margin-right: 20px
}

.v-product > .product > .summary > .images > .image-list {
  align-content: center;
  align-items: center;
  margin-bottom: 15px;
  position: relative
}

.v-product > .product > .summary > .images > .image-list > h1 {
  display: none
}

.v-product > .product > .summary > .images > .image-list > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative;
  margin-bottom: 5px
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > .icon {
  position: absolute;
  background-color: unset;
  z-index: 1;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  background-size: contain
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div {
  position: relative;
  border-radius: 50%;
  z-index: -1
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div.allow {
  background-color: #ebfef8
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div.carefully {
  background-color: #fff5eb
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div.deny {
  background-color: #fff6f7
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > div > .restrict-icon {
  width: 40px;
  height: 40px;
  display: block;
  background-size: contain
}

.v-product > .product > .summary > .images > .image-list > .restrict-list > .restrict > .name {
  padding: 2px 8px;
  font-size: 13px;
  max-width: 300px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden
}

.v-product > .product > .summary > .images > .buy {
  width: 100%
}

.v-product > .product > .summary > .images > .buy > .discount-warning, .v-product > .product > .summary > .images > .buy > .not-available, .v-product > .product > .summary > .images > .buy > .on-order {
  background-color: #fff5eb;
  font-weight: 500;
  font-size: 13px;
  color: #ff7a00;
  display: flex;
  align-items: center;
  padding: 6px 0 6px 20px
}

.v-product > .product > .summary > .images > .buy > .discount-warning > .icon, .v-product > .product > .summary > .images > .buy > .not-available > .icon, .v-product > .product > .summary > .images > .buy > .on-order > .icon {
  margin-right: 5px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #ff7a00
}

.v-product > .product > .summary > .images > .buy > .discount-warning > .find-in-pharmacies-region, .v-product > .product > .summary > .images > .buy > .not-available > .find-in-pharmacies-region, .v-product > .product > .summary > .images > .buy > .on-order > .find-in-pharmacies-region {
  margin-left: 5px;
  text-decoration: underline
}

.v-product > .product > .summary > .images > .buy > .discount-warning > .find-in-pharmacies-region:hover, .v-product > .product > .summary > .images > .buy > .not-available > .find-in-pharmacies-region:hover, .v-product > .product > .summary > .images > .buy > .on-order > .find-in-pharmacies-region:hover {
  cursor: pointer;
  color: #4960df;
  transition: all .3s ease-in-out
}

.v-product > .product > .summary > .images > .buy > .discount-warning.not-available, .v-product > .product > .summary > .images > .buy > .discount-warning.on-order, .v-product > .product > .summary > .images > .buy > .not-available.not-available, .v-product > .product > .summary > .images > .buy > .not-available.on-order, .v-product > .product > .summary > .images > .buy > .on-order.not-available, .v-product > .product > .summary > .images > .buy > .on-order.on-order {
  flex-wrap: wrap
}

.v-product > .product > .summary > .images > .buy > .alert {
  font-weight: 500;
  font-size: 13px;
  padding: 6px 0 6px 21px
}

.v-product > .product > .summary > .images > .buy > .alert > .info2 {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain
}

.v-product > .product > .summary > .images > .buy > .not-available {
  background-color: #d6d6e1;
  color: #fff;
  margin-bottom: 10px
}

.v-product > .product > .summary > .images > .buy > .not-available > .icon {
  background-color: #fff
}

.v-product > .product > .summary > .images > .buy > .on-order {
  background-color: #ff7a00;
  color: #fff
}

.v-product > .product > .summary > .images > .buy > .on-order > .icon {
  background-color: #fff
}

.v-product > .product > .summary > .images > .buy > .on-order > .question .icon > .question2, .v-product > .product > .summary > .images > .buy > .on-order > .question .icon {
  width: 18px;
  height: 18px
}

.v-product > .product > .summary > .images > .buy > .details {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box
}

.v-product > .product > .summary > .images > .buy > .details.stock {
  background: linear-gradient(93.49deg, #fff7fa, #f2f5ff)
}

.v-product > .product > .summary > .images > .buy > .details.stock > .prices {
  border-bottom: unset;
  padding: 0 20px
}

.v-product > .product > .summary > .images > .buy > .details > .prices {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d6d6e1;
  padding: 0 20px 10px;
  margin-bottom: 15px;
  margin-top: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section {
  display: flex
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div {
  display: flex;
  flex-flow: column
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div:first-of-type {
  color: #1a1a1a;
  margin-right: 15px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-card {
  min-width: 150px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-card > span:first-of-type {
  font-size: 11px;
  font-weight: 500
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-card > span:last-of-type {
  line-height: 44px;
  background-color: #ff0089;
  color: #fff;
  padding: 0 6px;
  border-radius: 5px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  font-weight: 600;
  font-size: 36px;
  height: 44px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.without-card > span:first-of-type {
  font-size: 11px;
  color: #596175;
  margin-left: 21px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.without-card > span:last-of-type {
  font-size: 36px;
  color: #818ca9;
  line-height: 44px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period {
  min-width: 150px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type {
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:last-of-type {
  font-weight: 600;
  font-size: 36px;
  line-height: 44px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > .rare-product {
  display: flex;
  margin: auto;
  align-items: center;
  font-size: 16px
}

.v-product > .product > .summary > .images > .buy > .details > .prices > .rare-product > .icon {
  background-color: #005e01;
  width: 50px;
  height: 50px;
  margin-right: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success, .v-product > .product > .summary > .images > .buy > .details > .limit {
  font-size: 14px;
  background-color: #fff6f7;
  border-top: 1px solid #ff324b;
  border-bottom: 1px solid #ff324b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px 0;
  margin: 10px 0
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success > .icon, .v-product > .product > .summary > .images > .buy > .details > .limit > .icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #ff324b
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success {
  background-color: #ebfef8;
  border-top: 1px solid #07d088;
  border-bottom: 1px solid #07d088
}

.v-product > .product > .summary > .images > .buy > .details > .discount-success > .icon {
  width: 20px;
  height: 20px;
  background-color: #07d088
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions {
  margin: 0 0 15px;
  padding: 0;
  list-style: none
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li {
  padding: 5px 0;
  width: 100%;
  border-top: 1px solid #ff0089;
  border-bottom: 1px solid #ff0089;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ff0089;
  display: flex;
  align-items: center;
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li:not(:first-of-type) {
  margin-top: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a {
  display: flex;
  font-size: 12px;
  margin-bottom: 15px;
  color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a > div {
  text-align: left;
  width: 187px;
  margin-right: 15px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a > img {
  width: 76px;
  height: 76px
}

.v-product > .product > .summary > .images > .buy > .details > .discount-descriptions > li > .c-tooltip-icon .charity-description > a:last-of-type {
  margin-bottom: unset;
  font-weight: 500;
  color: #3f51b5
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects {
  margin: 10px 0;
  padding: 0;
  list-style: none
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects > li {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid #3f51b5;
  border-top: 1px solid #3f51b5;
  padding: 5px 0
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects > li > a {
  color: #3f51b5;
  display: flex;
  align-items: center;
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .card-projects > li > a > img {
  width: 30px;
  height: 18px;
  margin-left: 5px;
  border-radius: 3px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes {
  display: flex;
  padding: 0 20px;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  grid-column-gap: 1vw;
  -moz-column-gap: 1vw;
  column-gap: 1vw;
  grid-row-gap: 1vh;
  row-gap: 1vh
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .c-button-in-category {
  width: 49%
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses {
  display: flex;
  background: linear-gradient(90deg, rgba(251, 236, 255, 0), #f7dbff);
  border-radius: 20px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  align-items: center;
  padding: 8px 8px 8px 0;
  font-weight: 500;
  font-size: 14px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > .icon {
  margin-right: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div {
  display: flex;
  flex-direction: column
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > a {
  font-weight: 500;
  font-size: 13px;
  color: #ff0089;
  line-height: 17px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text {
  display: flex
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .card {
  color: #ff0089;
  margin-right: 5px;
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon .promotion-description > .orange {
  color: #ff7a00
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question > .c-tooltip-icon a {
  margin-right: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe {
  display: flex;
  width: 242px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons {
  position: relative;
  margin-right: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .icon {
  width: 29px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .truck, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .truck, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .truck {
  margin-top: -5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .amount, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .amount, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .amount {
  color: #ff7a00;
  position: absolute;
  width: 29px;
  height: 26px;
  font-weight: 700;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1px;
  left: -1
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .icons > .logo2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .icons > .logo2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .logo2 {
  width: 24px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #ff0089
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text {
  display: flex;
  flex-direction: column
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question {
  margin-left: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon:hover, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon:hover, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon:hover > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon:hover > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .icon > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .icon > .question2, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > span > .question > .c-tooltip-icon .promotion-description > .orange, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > span > .question > .c-tooltip-icon .promotion-description > .orange, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > span > .question > .c-tooltip-icon .promotion-description > .orange {
  color: #ff7a00
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > .link-free-delivery, .v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship > .text > .stock, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > .link-free-delivery, .v-product > .product > .summary > .images > .buy > .details > .attributes > .pharmacy-stock > .text > .stock, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > .link-free-delivery, .v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .text > .stock {
  font-weight: 500;
  font-size: 13px;
  color: #ff0089;
  line-height: 17px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship {
  width: 280px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe {
  align-items: center
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .recipe > .icons > .icon {
  width: 30px;
  height: 30px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .rare-product {
  display: flex;
  align-items: center;
  font-size: 16px
}

.v-product > .product > .summary > .images > .buy > .details > .attributes > .rare-product > .icon {
  background-color: #005e01;
  width: 50px;
  height: 50px;
  margin-right: 10px
}

@media (max-width: 435px) {
  .v-product > .product > .summary > .images > .buy > .details > .attributes > .free-ship {
    width: 100%
  }
}

.v-product > .product > .summary > .images > .buy > .details > .payment {
  display: flex;
  padding: 0 20px;
  margin-top: 10px
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div {
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-size: 13px;
  color: #596175;
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div:not(:first-of-type) {
  border-left: 1px solid #d6d6e1
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div > span {
  line-height: 13px
}

.v-product > .product > .summary > .images > .buy > .details > .payment > div > .icon {
  margin-right: 5px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order {
  padding: 0 20px
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > .c-button {
  width: 100%;
  height: 48px;
  max-width: unset
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > :deep(.c-button) .caption {
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > :deep(.c-button) .caption > .icon {
  margin-right: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order {
  padding: 0 20px;
  display: flex;
  grid-gap: 2%;
  gap: 2%
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .с-button-basket, .v-product > .product > .summary > .images > .buy > .details > .prices > .с-button-basket {
  height: unset;
  flex: unset;
  width: 49%;
  align-self: flex-end;
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button {
  /*width: 49%;*/
  height: 48px;
  max-width: unset
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button:hover .thunder {
  background-color: #fff
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > :deep(.c-button) .caption {
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button .thunder {
  transition: all .3s, color 0s, background .3s ease-in-out;
  background-color: #ff0089
}

.v-product > .product > .summary > .images > .buy > .details > .message {
  font-size: 12px;
  color: #818ca9;
  line-height: 16px;
  padding: 10px 20px
}

.v-product > .product > .summary > .properties {
  width: 100%;
  flex-direction: column-reverse;
  justify-content: flex-end
}

.v-product > .product > .summary > .properties > .property-list {
  margin-bottom: 5px;
  list-style: none;
  width: 100%
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property {
  display: flex;
  min-height: 30px;
  font-size: 14px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name {
  position: relative;
  flex-basis: 30%;
  flex-shrink: 0;
  padding-top: 4px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name:before {
  content: "";
  top: 20px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: -1;
  border-bottom: 1px dashed #e7e7ea
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name > span {
  color: #596175;
  background-color: #fff;
  padding-right: 5px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .name > a {
  display: inline-block;
  color: #3f51b5;
  cursor: pointer;
  background-color: #fff;
  padding-right: 5px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values {
  flex-grow: 1
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .c-rating {
  margin-left: 10px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value {
  display: inline-flex;
  align-items: center;
  margin: 2px 4px
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question), .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a {
  padding: 2px 8px;
  font-size: 14px;
  max-width: 320px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 500
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question).search, .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a.search {
  color: #3f51b5;
  cursor: pointer
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country, .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a.country {
  overflow: unset;
  white-space: unset
}

.v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span:not(.question).country > span, .v-product > .product > .summary > .properties > .property-list > tbody > .property > .values > .value a.country > span {
  display: flex;
  align-items: center
}

.v-product > .product > .summary > .properties > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-flow: row wrap
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict:not(:last-of-type) {
  margin-right: 30px
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > .icon {
  position: absolute;
  background-color: unset;
  z-index: 1;
  width: 26px;
  height: 26px;
  bottom: 0;
  right: 0
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div {
  position: relative;
  border-radius: 50%;
  z-index: -1
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div.allow {
  background-color: #ebfef8
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div.carefully {
  background-color: #fff5eb
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div.deny {
  background-color: #fff6f7
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > div > .restrict-icon {
  width: 60px;
  height: 60px;
  display: block;
  background-size: contain
}

.v-product > .product > .summary > .properties > .restrict-list > .restrict > .name {
  padding: 2px 8px;
  font-size: 13px;
  max-width: 300px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden
}

.v-product > .product > .summary > .properties > .alert {
  font-weight: 500;
  margin-bottom: 7px
}

.v-product > .product > .summary > .properties > .alert > .info2 {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain
}

.v-product > .product > .summary > .properties > .all-property {
  border-bottom: 1px solid #d6d6e1;
  border-top: 1px solid #d6d6e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  cursor: pointer
}

.v-product > .product > .summary > .properties > .all-property > h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600
}

.v-product > .product > .summary > .properties > .all-property > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s;
  transform: rotate(90deg)
}

.v-product > .product > .summary > .properties > .all-property > .icon.opened {
  transform: rotate(270deg)
}

.v-product > .product > .summary > .properties > .replacements {
  padding-top: 10px;
  max-width: 664px;
  box-sizing: border-box;
  padding-bottom: 20px;
  border-bottom: 1px solid #d6d6e1;
  margin-bottom: 20px
}

.v-product > .product > .summary > .properties > .replacements .top > p {
  font-size: 26px;
  color: #ff0089;
  margin-bottom: 5px;
  line-height: 26px
}

.v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon {
  display: inline-block;
  color: #ff0089
}

.v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon > .replacement-additionally-title {
  line-height: 5px;
  display: inline-block;
  border-bottom: 1px solid #ff0089;
  height: unset;
  width: unset
}

.v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon > div > div > div > span {
  line-height: 18px;
  display: block;
  margin-bottom: 10px;
  font-size: 11px
}

.v-product > .product > .summary > .properties > .replacements .c-slider, .v-product > .product > .summary > .properties > .replacements .top > p > .c-tooltip-icon > div > div > div > span:last-child {
  margin-bottom: 0
}

.v-product > .product > .summary > .properties > .replacements .c-slider .carousel {
  width: 100%
}

.v-product > .product > .recommendations {
  display: none
}

.v-product > .product > .recommendations .c-slider .carousel {
  width: 100%
}

.v-product > .product > .recommendations .c-slider .carousel > .list > .c-banner-card {
  min-width: 208px;
  margin-right: 10px
}

.v-product > .product > .recommendations .c-slider .carousel > .list > .c-banner-card.mobile {
  min-width: 166px
}

.v-product > .product > .details {
  display: flex
}

.v-product > .product > .details > .content, .v-product > .product > .details > aside {
  display: flex;
  flex-direction: column
}

.v-product > .product > .details > aside {
  margin-left: auto;
  flex-shrink: 0
}

.v-product > .product > .details > aside > .recommendations {
  max-width: 436px;
  box-sizing: border-box
}

.v-product > .product > .details > aside > .recommendations > h3 {
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: 600
}

.v-product > .product > .details > aside > .recommendations > div {
  display: flex;
  flex-flow: row wrap
}

.v-product > .product > .details > aside > .recommendations > div > * {
  margin-right: 10px;
  margin-bottom: 15px
}

.v-product > .product > .details > aside > .articles {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0
}

.v-product > .product > .details > aside > .articles > h3 {
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: 600;
  font-size: 28px
}

.v-product > .product > .details > aside > .articles > a {
  display: flex;
  text-align: left;
  height: unset;
  flex-flow: column;
  width: 436px
}

.v-product > .product > .details > aside > .articles > a:not(:last-of-type) {
  margin-bottom: 30px
}

.v-product > .product > .details > aside > .articles > a:first-of-type {
  margin-left: 0
}

.v-product > .product > .details > aside > .articles > a > .image {
  display: flex;
  border-radius: 5px;
  flex-shrink: 0;
  background-size: cover;
  width: 100%;
  height: 190px;
  background-position: 50%
}

.v-product > .product > .details > aside > .articles > a > div {
  margin: 10px 0;
  flex-basis: 100%;
  flex-shrink: 1;
  overflow: hidden
}

.v-product > .product > .details > aside > .articles > a > div > span {
  font-weight: 600;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1a1a1a;
  max-width: 100%;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 20px
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info {
  display: flex;
  justify-content: space-between
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div {
  display: flex;
  align-items: center
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div > span {
  display: flex;
  color: #818ca9;
  align-items: center;
  margin-right: 10px;
  font-size: 12px
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div > span > .icon {
  width: 16px;
  height: 16px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  margin-bottom: 2px;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  background-color: #818ca9
}

.v-product > .product > .details > aside > .articles > a > div > .meta-info > div > span > .icon.eye-open2 {
  width: 15px;
  height: 12px;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.v-product > .product > .details > .content {
  max-width: 850px;
  width: 100%;
  margin-right: 10px
}

.v-product > .product > .details > .content > .trademark-products {
  border-bottom: 1px solid #d6d6e1
}

.v-product > .product > .details > .content > .trademark-products > h2 {
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product {
  display: flex;
  align-items: center;
  border: 1px solid #d6d6e1;
  border-radius: 5px;
  height: 106px;
  width: 270px;
  padding: 7px;
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product:not(:last-of-type) {
  margin-right: 18px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > img {
  max-height: 80px;
  max-width: 80px;
  margin-right: 15px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div {
  display: flex;
  flex-direction: column;
  margin-right: 25px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div > .name {
  height: 46px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #1a1a1a;
  line-height: 15px;
  font-size: 13px;
  font-weight: 500;
  word-break: break-word
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div > .country {
  color: #1a1a1a;
  line-height: 15px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 3px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > div > .price {
  margin-top: 10px;
  color: #ff0089;
  font-weight: 500
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product > .prescription {
  width: 30px;
  height: 30px;
  margin-right: 0;
  position: absolute;
  top: 5px;
  right: 5px
}

.v-product > .product > .details > .content > .trademark-products > .c-slider .product.has-country > div > .price {
  margin-top: 0
}

.v-product > .product > .details > .content > .stock {
  border-bottom: 1px solid #d6d6e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  cursor: pointer
}

.v-product > .product > .details > .content > .stock > div {
  display: flex;
  align-items: center
}

.v-product > .product > .details > .content > .stock > div > h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .stock > div > .stock-count {
  color: #ff0089;
  margin-left: 10px;
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .stock > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s
}

.v-product > .product > .details > .content > .stock > .icon.opened {
  transform: rotate(180deg)
}

.v-product > .product > .details > .content > .description {
  border-bottom: 1px solid #d6d6e1
}

.v-product > .product > .details > .content > .description.hide > div {
  overflow: hidden;
  height: 0
}

.v-product > .product > .details > .content > .description > h2 {
  margin: 20px 0;
  font-size: 26px;
  font-weight: 600
}

.v-product > .product > .details > .content > .description > div > .tags {
  margin-bottom: 20px
}

.v-product > .product > .details > .content > .description > div > .tags > a {
  color: #3f51b5;
  cursor: pointer;
  font-weight: 500;
  margin: 0 20px 14px 0;
  display: inline-block;
  font-size: 15px
}

.v-product > .product > .details > .content > .description > div > .tags > a.selected {
  font-weight: 600
}

.v-product > .product > .details > .content > .description > div > ul {
  margin: 0;
  padding: 0;
  list-style: none
}

.v-product > .product > .details > .content > .description > div > ul > li {
  margin-bottom: 25px
}

.v-product > .product > .details > .content > .description > div > ul > li > h3 {
  font-weight: 600;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 15px
}

.v-product > .product > .details > .content > .description > div > ul > li > section {
  font-size: 17px;
  color: #1a1a1a;
  line-height: 24px
}

.v-product > .product > .details > .content > .description > div > ul > li > section > p {
  margin: 0
}

.v-product > .product > .details > .content > .description > div > ul > li > section > ol {
  margin: 0;
  padding: 0
}

.v-product > .product > .details > .content > .description > div > ul > li.literature > section > ol {
  margin: 0;
  padding-left: 16px
}

.v-product > .product > .details > .content > .description > div > ul > li.selected > h3 {
  font-weight: 700
}

.v-product > .product > .reviews {
  position: relative
}

.v-product > .product > .reviews > .c-spinner {
  top: 0
}

.v-product > .product > .reviews > h2 {
  font-weight: 600;
  font-size: 28px
}

.v-product > .product > .reviews > h2 > span > .count {
  color: #ff0089
}

.v-product > .product > .reviews > .reviews-link {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .065em;
  text-transform: uppercase;
  color: #3f51b5;
  margin: 20px 0;
  display: block
}

.v-product > .product > .without-reviews {
  box-sizing: border-box;
  background-color: #f0faff;
  font-size: 16px;
  max-width: 850px;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center
}

.v-product > .product > .without-reviews > .info2 {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #3f51b5;
  vertical-align: middle;
  -webkit-mask-size: contain;
  mask-size: contain;
  margin-right: 10px
}

.v-product.mobile {
  padding: 0 10px
}

.v-product.mobile > .viewed-products {
  margin-top: 20px
}

.v-product.mobile > .action-list {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  margin-top: 10px;
  padding-bottom: 5px
}

.v-product.mobile > .action-list::-webkit-scrollbar {
  display: none
}

.v-product.mobile > .action-list > ul {
  flex-flow: row nowrap;
  padding: 0
}

.v-product.mobile > .action-list > ul > li {
  margin-bottom: 0
}

.v-product.mobile > .product > .summary {
  flex-direction: column;
  border-bottom: none;
  padding-bottom: 0
}

.v-product.mobile > .product > .summary > .images {
  margin-right: unset;
  max-width: unset;
  min-width: unset;
  width: 100%;
  margin-bottom: 15px
}

.v-product.mobile > .product > .summary > .images > .image-list {
  align-items: unset;
  margin-bottom: unset
}

.v-product.mobile > .product > .summary > .images > .image-list > .c-zoom-image {
  width: 208px;
  height: 208px;
  margin: auto
}

.v-product.mobile > .product > .summary > .images > .image-list > .c-zoom-image img {
  max-width: 208px;
  max-height: 208px
}

.v-product.mobile > .product > .summary > .images > .image-list > h1 {
  display: block;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .image-list > .replacement-scroll-button {
  max-width: unset;
  height: 30px;
  border-radius: 20px;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a {
  display: flex;
  width: 100%;
  align-items: center;
  margin-left: 10px;
  color: #1a1a1a
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .average {
  font-weight: 600;
  font-size: 14px;
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .review-count {
  font-weight: 600;
  font-size: 13px;
  margin-left: 3px;
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .icon {
  transition: .2s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
  mask-size: 100%;
  width: 20px;
  height: 20px;
  background-color: #3f51b5
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .hover-bottom-line {
  color: #3f51b5
}

.v-product.mobile > .product > .summary > .images > .buy > .discount-warning {
  background-color: unset;
  font-weight: 500;
  font-size: 12px;
  color: #ff7a00;
  padding: 6px 0;
  border-top: 1px solid #d6d6e1;
  border-bottom: 1px solid #d6d6e1;
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details .с-button-basket {
  max-width: 152px
}

.v-product.mobile > .product > .summary > .images > .buy > .details.stock {
  background: unset
}

.v-product.mobile > .product > .summary > .images > .buy > .details.stock > .prices {
  border-bottom: unset
}

.v-product.mobile > .product > .summary > .images > .buy > .details.stock > .prices > .c-button {
  margin-right: 15px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .rare-item-order {
  padding: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices {
  position: fixed;
  bottom: calc(50px + env(safe-area-inset-bottom));
  left: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  padding: 0;
  border-bottom: unset;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .1);
  margin-bottom: 0;
  transition: bottom .3s ease-in-out
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices.show-info-message {
  bottom: calc(85px + env(safe-area-inset-bottom))
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section {
  margin: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div {
  min-width: 76px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div:first-of-type {
  margin-right: 8px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div > span:first-of-type {
  font-size: 9px;
  line-height: 14px;
  margin-bottom: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div > span:last-of-type {
  font-size: 18px;
  height: 30px;
  line-height: 30px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.without-card > span:first-of-type {
  margin-left: 11px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.with-card > span:last-of-type {
  padding: 0 3px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon > .question2, .v-product.mobile > .product > .summary > .images > .buy > .details > .prices > section > div.with-period > span:first-of-type > .question > .c-tooltip-icon .icon {
  width: 14px;
  height: 14px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons {
  margin: 10px 10px 10px 0;
  max-width: 130px;
  height: 36px;
  width: 100%
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-button {
  max-width: 130px;
  height: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-button .icon {
  -webkit-mask-size: 100%;
  mask-size: 100%;
  width: 20px;
  height: 20px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product {
  max-width: 130px;
  height: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product .quantity {
  border: unset;
  max-width: 130px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product .quantity > button {
  height: 36px;
  min-width: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .prices > .buttons > .c-basket-product .quantity > .c-edit > div > input {
  height: 36px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .discount-success, .v-product.mobile > .product > .summary > .images > .buy > .details > .limit {
  font-size: 12px;
  justify-content: unset;
  margin: 0 0 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .discount-descriptions {
  margin: 0 0 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .discount-descriptions > li {
  font-size: 12px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes {
  padding: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses + div, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .free-ship + div:not(.rare-product) {
  height: 61px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .delivery {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > .icon {
  width: 20px;
  height: 20px;
  background-size: contain
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text {
  font-size: 11px;
  line-height: 12px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .card {
  margin-left: 5px;
  color: #1a1a1a
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > .text > .question {
  position: absolute;
  top: 5px;
  right: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > .bonuses > div > a {
  font-size: 11px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div {
  padding: 10px 30px 10px 10px;
  background: #f7f8fc;
  width: 49%;
  border-radius: 5px;
  flex-direction: row;
  position: relative;
  align-items: center;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  justify-content: flex-start;
  box-sizing: border-box
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .icons > .icon, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.recipe > .icons > .icon {
  width: 24px;
  height: 24px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .icons > .amount, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.recipe > .icons > .amount {
  width: 24px;
  height: 21px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.rare-product {
  display: flex;
  font-size: 11px;
  line-height: 12px;
  padding: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.rare-product > .icon {
  width: 24px;
  height: 24px;
  background-color: #005e01;
  margin-right: 5px
}

@media screen and (max-width: 385px) {
  .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .text > .link-free-delivery, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div.free-ship > .text > span {
    font-size: 9px
  }
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > span {
  font-size: 11px;
  line-height: 12px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > span > .question {
  position: absolute;
  top: 5px;
  right: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > .link-free-delivery, .v-product.mobile > .product > .summary > .images > .buy > .details > .attributes > div > .text > .stock {
  font-size: 11px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment {
  padding: 0;
  justify-content: space-between
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div {
  flex-direction: column;
  flex-grow: unset
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.cash {
  margin-right: 5px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div:not(.card) {
  flex-shrink: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.card {
  border-right: 1px solid #d6d6e1;
  max-width: 135px;
  width: 100%
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.qr {
  margin-left: 5px;
  border-left: none
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.offline {
  flex-direction: row;
  flex-shrink: unset;
  line-height: 16px
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .payment > div.offline > .icon {
  flex-shrink: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .fast-order {
  padding: 0
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .fast-order .c-button {
  width: 100%
}

.v-product.mobile > .product > .summary > .images > .buy > .details > .message {
  padding: 0;
  margin-top: 5px;
  font-size: 10px
}

.v-product.mobile > .product > .summary > .images > .buy > .on-order {
  margin-bottom: 10px
}

.v-product.mobile > .product > .summary > .properties {
  flex-direction: column
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property {
  font-size: 12px;
  justify-content: space-between;
  position: relative
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property:before {
  content: "";
  top: 20px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: -1;
  border-bottom: 1px dashed #e7e7ea
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .name {
  flex-basis: unset;
  margin-right: 15px
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .name > span {
  line-height: 20px
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values {
  flex-grow: unset;
  text-align: right
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value {
  margin: 2px 0
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span {
  padding-right: 0;
  font-size: 12px;
  white-space: unset;
  text-overflow: unset;
  overflow: unset;
  text-align: right;
  max-width: 180px
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a.country, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span.country {
  overflow: unset;
  white-space: unset
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a.country > span, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span.country > span {
  display: flex;
  align-items: center
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > a > span, .v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span > span {
  background-color: #fff
}

.v-product.mobile > .product > .summary > .properties > .property-list > tbody > .property > .values > .value > span {
  background-color: #fff;
  padding-left: 5px
}

.v-product.mobile > .product > .summary > .properties > .restrict-list {
  margin: 0 0 10px;
  padding: 2px;
  list-style: none;
  display: flex;
  flex-flow: row wrap
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict {
  display: flex;
  align-items: center;
  padding: 5px 5px 0 0;
  position: relative
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict:not(:last-of-type) {
  margin-right: 25px
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict > .icon {
  width: 20px;
  height: 20px;
  background-size: contain
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict > div > .restrict-icon {
  width: 40px;
  height: 40px
}

.v-product.mobile > .product > .summary > .properties > .restrict-list > .restrict > .name {
  padding: 2px 8px;
  font-size: 13px;
  max-width: 300px;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden
}

.v-product.mobile > .product > .summary > .properties > .alert {
  font-weight: 500;
  font-size: 12px
}

.v-product.mobile > .product > .summary > .properties > .replacements {
  padding-top: 20;
  border-bottom: 1px solid #d6d6e1;
  padding-bottom: 0;
  margin: 0
}

.v-product.mobile > .product > .summary > .properties > .replacements .top > p {
  font-size: 20px
}

.v-product.mobile > .product > .summary > .properties > .replacements .top > p > .replacement-additionally-title {
  cursor: pointer;
  line-height: 5px;
  display: inline-block;
  border-bottom: 1px solid #ff0089
}

.v-product.mobile > .product > .summary > .properties > .replacements .c-slider {
  margin-bottom: 20px
}

.v-product.mobile > .product > .recommendations {
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .recommendations .top > p {
  font-size: 20px;
  margin-bottom: 10px
}

.v-product.mobile > .product > .details {
  border-top: none
}

.v-product.mobile > .product > .details > .content {
  margin-right: unset
}

.v-product.mobile > .product > .details > .content > .trademark-products {
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .details > .content > .trademark-products > h2 {
  font-size: 20px;
  font-weight: 600
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product {
  height: 96px;
  width: 250px;
  padding: 7px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product:not(:last-of-type) {
  margin-right: 12px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product > img {
  max-height: 60px;
  max-width: 60px;
  margin-right: 10px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product > div > .name {
  height: 47px;
  font-size: 12px
}

.v-product.mobile > .product > .details > .content > .trademark-products > .c-slider .product > div > .price {
  font-size: 13px
}

.v-product.mobile > .product > .details > .content > .stock {
  padding: 20px 0
}

.v-product.mobile > .product > .details > .content > .stock > div > .stock-count, .v-product.mobile > .product > .details > .content > .stock > div > h2 {
  font-size: 20px
}

.v-product.mobile > .product > .details > .content > .stock > div > .stock-count {
  margin-left: 8px
}

.v-product.mobile > .product > .details > .content > .stock > .icon {
  transform: rotate(90deg)
}

.v-product.mobile > .product > .details > .content > .stock > .icon.opened {
  transform: rotate(270deg)
}

.v-product.mobile > .product > .details > .content > .description {
  border-bottom: none
}

.v-product.mobile > .product > .details > .content > .description.border {
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .details > .content > .description > h2 {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between
}

.v-product.mobile > .product > .details > .content > .description > h2 > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s;
  transform: rotate(90deg)
}

.v-product.mobile > .product > .details > .content > .description > h2 > .icon.opened {
  transform: rotate(270deg)
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > h3 {
  font-size: 18px
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > section {
  font-size: 14px;
  color: #1a1a1a;
  line-height: 25px
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > section > p {
  margin: 0
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li > section > ol {
  margin: 0;
  padding: 0
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li.literature > section > p {
  font-size: 18px !important
}

.v-product.mobile > .product > .details > .content > .description > div > ul > li.literature > section > div > div > p {
  font-size: 16px !important
}

.v-product.mobile > .product > .without-reviews {
  font-size: 14px;
  margin-top: 20px
}

.v-product.mobile > .product > .reviews {
  border-top: 1px solid #d6d6e1;
  border-bottom: 1px solid #d6d6e1
}

.v-product.mobile > .product > .reviews > h2 {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px
}

.v-product.mobile > .product > .reviews > h2 > .icon {
  cursor: unset;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  transition: .3s;
  transform: rotate(90deg)
}

.v-product.mobile > .product > .reviews > h2 > .icon.opened {
  transform: rotate(270deg)
}

@media screen and (max-width: 1367px) {
  .v-product {
    padding: 0 20px
  }

  .v-product .c-products-slider.mobile {
    padding: 0
  }

  .v-product > .header-fixed > .top {
    padding: 5px 20px
  }
}

@media screen and (max-width: 1100px) {
  .v-product > .product > .recommendations {
    display: block;
    margin-top: 15px
  }

  .v-product > .product > .recommendations .top > p {
    font-size: 26px;
    margin-bottom: 10px
  }

  .v-product > .product > .details > aside {
    display: none
  }
}

@media screen and (max-width: 510px) {
  .v-product.mobile > .product > .summary > .images > .buy > .details > .prices.show-info-message {
    bottom: calc(90px + env(safe-area-inset-bottom))
  }
}

</style>