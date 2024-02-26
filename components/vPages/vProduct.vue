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

const city = computed(() => {
  return citiesStore.currentCity
})

//async data
const currentCityID = city.value.ID! ? city.value.ID : 41

const isProductReviews = ref("ProductReviews" === route.name)
const isFailedGettingProduct = ref(false)
const isFailedGettingReplacements = ref(false)
const isFailedGettingRecommend = ref(false)
const isFailedGettingReviews = ref(false)
const product = ref(productsStore.item)
const replacements = ref(productsStore.replacements)
const recommendations = ref(productsStore.recommendations)
const reviews = ref(productsStore.reviews)
const trademarkProducts = ref(productsStore.trademarkProducts)
const W = ref(productPropertyTypesStore.list)
const V = ref(restrictTypesStore.list! ? restrictTypesStore.list : [])
const Z = ref(false)
const allGrades = ref([])
const totalCountReviews = ref(0)
const activeTab = ref(isProductReviews.value ? 2 : 0)
const K = ref(catalogStore.categoryDirectory)
const articleCategories = ref(<any>articlesStore.categories)
const et = ref(10)

if (articleCategories.value.length < 1) {
  // TODO ARTICLES.GET_CATEGORIES
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


const needPaddingHeader = ref(false)
const isShowDescription = ref(false)
const isShowReviews = ref(true)
const SIZE_XS = ref(uSIZE_XS)
const SIZE_S = ref(uSIZE_S)
const SIZE_M = ref(uSIZE_M)
const SIZE_L = ref(uSIZE_L)
const isHorizontalCardMode = ref(false)
const isLoadingReviewAside = ref(false)
const isLoadingMoreReviews = ref(false)
const lastScrollTop = ref(0)
const isScrollTop = ref(false)
const headerTop = ref(0)
const isShowFixedHeader = ref(false)
const activeAccordion = ref(undefined)
const BONUSES_TITLE = ref(uBONUSES_TITLE)
const descriptionHash = ref(undefined)
const internalItems = ref([])
const isComparisonLoading = ref(false)
const isFavoritesLoading = ref(false)
const isFromCatalog = ref(false)
const isLoadingReplacements = ref(false)
const isLoadingRecommend = ref(false)
const isLoadingReviews = ref(false)
const isOpenedShare = ref(false)
const showDisposableHintCompared = ref(false)
const loadingBasketProductIDs = ref([])
const loadingFavoritesProductIDs = ref([])
const pharmacyStock = ref([])
const routeCatalogParams = ref({})
const routeProperties = ref({
  10: "Brand",
  13: "Manufacturer",
  6: "ActiveSubstance",
  "Производитель": "Manufacturers",
  "Бренд": "Brands",
  "Действующее вещество": "ActiveSubstances"
})
const routePropertyIDs = ref([10, 13, 6])
const routePropertyKey = ref(["Производитель", "Бренд", "Действующее вещество"])
const updatingBasketProductIDs = ref([])
const intervalID = ref(undefined)
const isActiveMap = ref(false)
const isProductFavoriteActive = ref(false)
const isMouseDown = ref(false)
const isMouseUp = ref(false)
const articles = ref([])
const limitReviews = ref(10)
const isOpenStockSidebar = ref(false)
const isLimitProduct = ref(false)
const limitProduct = ref(0)
const limitProperty = ref(4)
const isOpenedPropertyBar = ref(false)
const question = ref(undefined)
const questionTitle = ref({
  charity: "Благотворительность",
  bonuses: "Начисление баллов",
  delivery: "Доставка",
  stock: "Способ получения",
  recipe: "Рецепт",
  "with-period": "Клубная цена",
  "on-order": "Под заказ",
  country: "Страна",
  manufacturer: "Производитель",
  "replacement-additionally-info": "Информация"
})
const PREPARED_PRODUCTS_FIELDS = ref(["isInBasket", "isInFavorites"])
const TOOLTIP_TEXT = ref({
  "Страна": "Страна производства может отличаться от указанной на сайте. Проверяйте, пожалуйста, при получении заказа.",
  "Производитель": "Производитель может отличаться от указанного на сайте. Проверяйте, пожалуйста, при получении заказа."
})
const isGetRegionPharmacies = ref(false)
const regionPharmacies = ref([])
const regionPharmacyStock = ref([])
const region = ref(undefined)
const isLoadingRegionPharmacies = ref(false)
const regionsStock = ref({})
const fastOrderCity = ref(undefined)
const isMounted = ref(false)
const positionTooltipAdditionallyInfo = ref("bottom")
const rareItemCount = ref(1)

//COMPUTED

const categoryRoute = computed(() => {
  return void 0 === product.value ? {} : {
    name: "SelectInCategory",
    params: {
      productID: "".concat(product.value.ID)
    }
  }
})
const titleReplacementSlider = computed(() => {
  var t, e, o;
  return null !== (o = null === (e = null === (t = product.value) || void 0 === t ? void 0 : t.replacementsTitle) || void 0 === e ? void 0 : e.title) && void 0 !== o ? o : ""
})
const replacementButtonText = computed(() => {
  var p = product.value,
      rt = p.replacementsTitle,
      t = "".concat(this.hasPaidPeriod ? rt.rank : rt.loyal, " ");
  return p.isAvailable || p.isWaitingArrive || (t = ""), "".concat("" === t ? rt.title : rt.buttonTitle, " ").concat(t).concat(rt.remarks)
})
const isShowBannerCard = computed(() => {
  return this.$data.recommendations.length > 0 && void 0 !== this.bannerYouMayNeed
})
const bannerYouMayNeed = computed(() => {
  var t;
  return (null !== (t = this.$store.state.banners.youMayNeed) && void 0 !== t ? t : [])[0]
})
const hasAttributes = computed(() => {
  return this.hasBonuses && !this.isStock && !this.hasPaidPeriod || product.value.allowDelivery || this.isRecipe || this.productCategory.name || this.isRare && (this.isMobile || !product.value.isAvailable)
})
const isSwapReplacementSlider = computed(() => {
  return !this.$data.isFailedGettingReplacements && !this.hasReplacements && this.hasRecommend
})
const viewedProducts = computed(() => {
  var t, e, o = this;
  return null !== (e = null === (t = this.$store.state.viewedProducts.items) || void 0 === t ? void 0 : t.filter((function (i) {
    return i.ID !== o.productID
  }))) && void 0 !== e ? e : []
})
const hasViewedProducts = computed(() => {
  return viewedProductsIDs.value.length > 0
})
const viewedProductsIDs = computed(() => {
  var t;
  return null !== (t = this.$store.state.viewedProducts.viewedProductsIDs) && void 0 !== t ? t : []
})
const deliveryDate = computed(() => {
  var t, e = new Date;
  return e.setDate(e.getDate() + (null !== (t = product.value.deliveryDaysMax) && void 0 !== t ? t : 1)), v.s.format(e, "j FG")
})
const isOpenedQuestion = computed(() => {
  return void 0 !== question.value
})
const hasFilteredDiscountDescription = computed(() => {
  return filteredDiscountDescription.value.length > 0
})
const filteredDiscountDescription = computed(() => {
  var t, e;
  return (null !== (e = null === (t = product.value) || void 0 === t ? void 0 : t.discountDescription) && void 0 !== e ? e : []).filter((function (t) {
    return !t.includes("Бесплатная доставка")
  }))
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
  return null !== (t = this.$store.state.favorite.products) && void 0 !== t ? t : []
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
  return this.$data.replacements.length > 0
})
const hasTrademarkProducts = computed(() => {
  return this.$data.trademarkProducts.length > 0
})
const hasBonuses = computed(() => {
  return void 0 !== product.value.bonuses
})
const hasDeliveryRuleID = computed(() => {
  return void 0 !== product.value.deliveryRuleID
})
const hasImages = computed(() => {
  var t;
  return (null !== (t = product.value.images) && void 0 !== t ? t : []).length > 0
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
  var t, e;
  return null !== (e = null === (t = this.city) || void 0 === t ? void 0 : t.allowDelivery) && void 0 !== e && e
})
const isDeletionFromFavorites = computed(() => {
  return isInFavorites.value && isFavoritesLoading.value
})
const isGlobalLoading = computed(() => {
  return appStore.getIsLoading
})
const isInBasket = computed(() => {
  return !0 === basketStore.inBasket[props.productID]
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
  return !0 === favoritesStore.inFavorites[props.productID]
})
const isLoyal = computed(() => {
  var t, e, o, r;
  return (null === (e = null === (t = product.value) || void 0 === t ? void 0 : t.price) || void 0 === e ? void 0 : e.withCard) !== (null === (r = null === (o = product.value) || void 0 === o ? void 0 : o.price) || void 0 === r ? void 0 : r.withoutCard)
})
const isMobile = computed(() => {
  return appStore.isMobile
})
const isNotAvailable = computed(() => {
  return 0 === this.pharmacyStock.length
})
const isRank = computed(() => {
  var t, e, o, r;
  return !isLoyal.value && (null === (e = null === (t = product.value) || void 0 === t ? void 0 : t.price) || void 0 === e ? void 0 : e.withPeriod) !== (null === (r = null === (o = product.value) || void 0 === o ? void 0 : o.price) || void 0 === r ? void 0 : r.withoutCard)
})
const isRecipe = computed(() => {
  return product.value.isRecipe
})
const allowOnlinePayment = computed(() => {
  return product.value.allowOnlinePayment
})
const isStock = computed(() => {
  return void 0 !== product.value.sticker
})
const preparedPharmacies = computed(() => {
  var t = this,
      e = (this.isGetRegionPharmacies ? this.regionPharmacies : this.pharmacies).map((function (p) {
        var e = void 0 !== t.preparedPharmacyStock[p.ID] ? t.preparedPharmacyStock[p.ID].name : m.u;
        return z(z({}, p), {}, {
          availability: e,
          sort: "Много" === e ? 4 : "Достаточно" === e ? 3 : "Мало" === e ? 2 : 1
        })
      })).sort((function (a, b) {
        return a.sort === b.sort ? 0 : Number(a.sort) > Number(b.sort) ? -1 : 1
      })).filter((function (p) {
        var e = !0;
        return t.isRare && (e = p.isRareProduct), e
      }));
  return product.value.isWithdrawn || product.value.isSiteSellRemains || product.value.isOrderRcNoRc ? e.filter((function (p) {
    return "Под заказ" !== p.availability && "Отсутствует" !== p.availability
  })) : e
})
const linkFreeDelivery = computed(() => {
  var t, e, o, r, n;
  return {
    name: "PopularCategories",
    params: {
      popularCategory: null !== (n = null === (r = (null !== (o = null === (e = null !== (t = this.params) && void 0 !== t ? t : {}) || void 0 === e ? void 0 : e.deliveryRules) && void 0 !== o ? o : {})[product.value.deliveryRuleID]) || void 0 === r ? void 0 : r.code) && void 0 !== n ? n : void 0 !== product.value.deliveryAmount ? "free_ship_pack" : "free_ship"
    }
  }
})
const me = computed(() => {
  return meStore.getMe ? meStore.getMe : {}
})
const params = computed(() => {
  return appStore.params
})
const productSumFreeShip = computed(() => {
  var t, e;
  return null !== (e = null === (t = this.params.deliveryRules[product.value.deliveryRuleID]) || void 0 === t ? void 0 : t.productAmount) && void 0 !== e ? e : 0
})

const pluralizeBonuses = computed(() => {
  return void 0 === product.value.bonuses ? "" : v.r.pluralize(product.value.bonuses, ["балл", "балла", "баллов"])
})
const preparedPharmacyStock = computed(() => {
  return (this.isGetRegionPharmacies ? this.regionPharmacyStock : this.pharmacyStock).reduce((function (t, e) {
    return t[e.pharmacyID] = e, t
  }), {})
})
const regions = computed(() => {
  return regionsStore.regions
})
const preparedRestricts = computed(() => {
  var t, e = this;
  return (null !== (t = product.value.restricts) && void 0 !== t ? t : []).reduce((function (t, o) {
    var r = e.preparedRestrictTypes.get(o.typeID),
        n = m.l[o.level];
    return void 0 !== r && void 0 !== n && t.push(z(z({}, o), {}, {
      icon: r.icon,
      caption: "".concat(n, " ").concat(r.name.toLowerCase())
    })), t
  }), [])
})
const preparedRestrictTypes = computed(() => {
  var t = new Map;
  return this.restrictTypes.forEach((function (e) {
    t.set(e.ID, z(z({}, e), {}, {
      icon: "url(".concat(e.icon, ")")
    }))
  })), t
})
const productCardProjects = computed(() => {
  var t = this;
  return this.cardProjects.filter((function (e) {
    var o;
    return (null !== (o = t.$data.product.cardProjects) && void 0 !== o ? o : []).indexOf(e.code) > -1
  }))
})
const productCharity = computed(() => {
  var t = this;
  return this.charity.filter((function (e) {
    var o;
    return (null !== (o = t.$data.product.charity) && void 0 !== o ? o : []).indexOf(e.code) > -1
  }))
})
const productCategories = computed(() => {
  var t, e;
  return null !== (e = null === (t = this.catalog) || void 0 === t ? void 0 : t.categories) && void 0 !== e ? e : []
})
const productCategory = computed(() => {
  var t, e = this;
  return null !== (t = this.productCategories.find((function (t) {
    return t.ID === e.$data.product.categoryID
  }))) && void 0 !== t ? t : {}
})
const productSubtypes = computed(() => {
  var t, e;
  return null !== (e = null === (t = this.catalog) || void 0 === t ? void 0 : t.subtypes) && void 0 !== e ? e : []
})
const productTypes = computed(() => {
  var t, e;
  return null !== (e = null === (t = this.catalog) || void 0 === t ? void 0 : t.types) && void 0 !== e ? e : []
})
const hasDiscount = computed(() => {
  return "n+m" === product.value.discountTemplate && void 0 !== this.preparedCheckItems[this.productID] && void 0 !== this.preparedCheckItems[this.productID].ruleID
})
const preparedCheckItems = computed(() => {
  return getPreparedCheckItems()
})
const properties = computed(() => {
  var t, e = this;
  if (0 !== Object.keys(this.propertyTypes).length) {
    var o = (null !== (t = product.value.properties) && void 0 !== t ? t : []).reduce((function (t, p) {
      if (!e.propertyTypes[p.typeID] || !e.propertyTypes[p.typeID].isVisible) return t;
      var o = e.propertyTypes[p.typeID].name;
      return void 0 === t[o] && (t[o] = []), t[o].push(p), t
    }), {});
    isMobile.value && (o["Артикул"] = [{
      name: props.productID
    }]);
    for (var r = {}, n = 0, c = ["Действующее вещество", "� ецептурность", "Форма выпуска", "Бренд", "Производитель", "Страна", "Способ хранения", "Артикул"]; n < c.length; n++) {
      var p = c[n];
      void 0 !== o[p] && (r[p] = o[p])
    }
    return r
  }
})
const propertyTypes = computed(() => {
  return productPropertyTypesStore.list.reduce((t: any, p: any) => {
    return t[p.ID] = p, t
  }, {})
})
const restrictTypes = computed(() => {
  return restrictTypesStore.list
})
const shareLinks = computed(() => {
  var imageShare = image(uSIZE_M),
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
  var t = this;
  return void 0 === this.$data.articleCategories ? [] : this.articles.map((function (a) {
    var e, o, r = (null !== (e = t.$data.articleCategories) && void 0 !== e ? e : []).find((function (t) {
          return t.ID === a.categoryID
        })),
        n = z(z({}, a), {}, {
          image: "url(".concat(a.image.endsWith(h.SIZE_S) ? a.image.slice(0, -h.SIZE_S.length) + h.SIZE_L : a.image, ")"),
          route: {
            name: "Article",
            params: {
              ID: "".concat(a.ID),
              slug: a.slug,
              sectionName: "blog"
            }
          }
        });
    return void 0 !== r && void 0 !== r.parentID && ((null === (o = n.route) || void 0 === o ? void 0 : o.params).categoryName = r.slug), n
  }))
})
const hasRegionsStock = computed(() => {
  var t;
  return Object.keys(null !== (t = this.regionsStock) && void 0 !== t ? t : {}).length > 0
})
const productName = computed(() => {
  var t, e;
  return null !== (e = null === (t = product.value.properties.find((function (p) {
    return 10 === p.typeID
  }))) || void 0 === t ? void 0 : t.name) && void 0 !== e ? e : product.value.name
})
const selectedRegion = computed(() => {
  var t = this;
  return this.regions.find((function (e) {
    var o;
    return e.ID === (null === (o = t.city) || void 0 === o ? void 0 : o.regionID)
  }))
})
const hasStockInHomeRegion = computed(() => {
  var t;
  return "".concat(null === (t = this.selectedRegion) || void 0 === t ? void 0 : t.ID) in this.regionsStock
})
const isRare = computed(() => {
  return product.value.isRare
})
const productOnlyInPharmacies = computed(() => {
  return product.value.isSiteSellRemains || product.value.isWaitingArrive || product.value.isOrderRcNoRc
})
//END COMPUTED

onBeforeRouteUpdate((to, from, next) => {

})
onMounted(() => {

})
onBeforeUnmount(() => {

})
onUnmounted(() => {

})


//FUNCTIONS
function onStorageChanged(t) {
  var e;
  "viewedProductsIDs" === t.key && (JSON.parse(null !== (e = t.newValue) && void 0 !== e ? e : "[]").includes(product.value.ID) || this.setViewedProductID())
}


const getPreparedCheckItems = uPreparedCheckItems

function getCharity() {
  this.$store.dispatch("charity/".concat(l.CHARITY.GET))
}

function getCardProjects() {
  this.$store.dispatch("cardProjects/".concat(l.CARD_PROJECTS.GET))
}

function getBannerYouMayNeed() {
  void 0 === this.bannerYouMayNeed && this.$store.dispatch("banners/".concat(l.BANNERS.GET_YOU_MAY_NEED))
}


// const translit: uTransliter // TODO

function trademarkProductCountry(p) {
  var t, e;
  return null !== (e = null === (t = p.properties.find((function (t) {
    return 15 === t.typeID
  }))) || void 0 === t ? void 0 : t.name) && void 0 !== e ? e : ""
}

function trademarkProductHasCountry(p) {
  return product.value.typeIDs.includes(396070) && void 0 !== p.properties.find((function (t) {
    return 15 === t.typeID
  }))
}

function closeDisposableHintCompared() {
  localStorage.setItem("disposable-hint-compared", "false"), this.showDisposableHintCompared = !1
}

function changePaddingHeader() {
  this.needPaddingHeader = !this.needPaddingHeader
}

function showHideDescription() {
  this.isShowDescription = !this.isShowDescription
}

function showHideReviews() {
  this.isMobile && (this.isShowReviews = !this.isShowReviews)
}

function image(t: any, e: any) {
  return uPrepareProduct(product.value, t, params.value.cdnURL.url).images[0]
}

function loadViewedProducts() {
  var t;
  void 0 !== (null === (t = this.city) || void 0 === t ? void 0 : t.ID) && this.hasViewedProducts && this.$store.dispatch("viewedProducts/".concat(l.VIEWED_PRODUCTS.GET), {
    IDs: this.viewedProductsIDs,
    cityID: this.city.ID
  })
}

function setQuestion(q) {
  this.question = q
}

function updateIsMax(t, e) {
  this.isLimitProduct = t, this.limitProduct = e
}

function openReviewsForm() {
  var t = this;
  setTimeout((function () {
    t.$nuxt.$emit("reviews-form-open")
  }), 500)
}

function openClosePropertybar() {
  this.isOpenedPropertyBar = !this.isOpenedPropertyBar
}

function closeQuestionbar() {
  this.question = void 0
}

function openStockSidebar() {
  this.$nuxt.$emit("open-product-curtain", product.value.ID, product.value.slug, !1, !this.hasStockInHomeRegion && !this.isRare), this.isOpenStockSidebar = !0
}

function formattedCreationTime(s) {
  var t = v.r.toDate(s);
  return void 0 !== t ? v.s.format(t, "d.m.Y") : "Не известно"
}

function getArticlesRandom(t) {
  var e = this,
      o = this.$data.articleCategories.reduce((function (t, e) {
        return "news" !== e.slug && t.push(e.ID), t
      }), []),
      filter = "categoryID={".concat(o.join(), "}").concat(t ? "" : "&products=".concat(product.value.ID), "[0:2]");
  f.a.articles.get(filter, ["ID", "categoryID", "slug", "title", "image", "creationTime", "views", "readingTime", "commentsCount"], "random").then((function (a) {
    e.articles = null != a ? a : [], null === a && e.getArticlesRandom(!0)
  })).catch((function (o) {
    t || e.getArticlesRandom(!0), e.error(o)
  })).finally((function () {
    e.$nextTick((function () {
      e.checkHeight()
    }))
  }))
}

function pluralizeRestrictAge(t: any) {
  var e = t.minimalAge,
      o = "Месяц" === t.minimalAgeType;
  return uPluralize(e, o ? ["месяца", "месяцев", "месяцев"] : ["года", "лет", "лет"])
}

function favoriteMouseDown() {
  this.isMouseDown = !0, this.isProductFavoriteActive = !0
}

function favoriteMouseUp() {
  var t = this;
  this.isMouseDown = !1, this.isMouseUp = !0, setTimeout((function () {
    t.isProductFavoriteActive = !1, t.isMouseUp = !1
  }), 300)
}

function favoriteMouseOut() {
  this.isMouseDown && !this.isMouseUp && (this.isProductFavoriteActive = !1)
}

function addReview(t) {
  var e = this;
  this.isLoadingReviewAside = !0, f.a.reviews.new(t).then((function () {
    e.getTotalCountReviews(), e.getReviews().finally((function () {
      e.isLoadingReviewAside = !1
    }))
  })).catch((function (t) {
    e.isLoadingReviewAside = !1, e.error(t)
  }))
}

function checkScroll() {
  this.lastScrollTop > window.scrollY ? this.isScrollTop = !0 : (this.isScrollTop = !1, this.headerTop = -60), this.lastScrollTop = window.scrollY;
  var t = this.$refs["v-product"];
  this.isShowFixedHeader = window.scrollY > .2 * t.clientHeight
}

function addToBasket(t, e) {
  var o, r, n, c = this;
  if (e || (this.reachGoal("addbasket"), this.ecommerce("add", [product.value])), this.isAuthorized) e ? this.updatingBasketProductIDs.push(t.productID) : this.loadingBasketProductIDs.push(t.productID), this.$store.dispatch("basket/".concat(l.BASKET.ADD), {
    item: t,
    cityID: null === (o = this.city) || void 0 === o ? void 0 : o.ID,
    isUpdate: e
  }).finally((function () {
    c.loadingBasketProductIDs = [], e && (c.updatingBasketProductIDs = [])
  }));
  else {
    var d = v.c.clone(this.basketItems);
    d.push({
      productID: product.value.ID,
      productSlug: product.value.slug,
      images: product.value.images,
      name: product.value.name,
      price: product.value.price,
      priceZakaz: product.value.priceZakaz,
      count: 1,
      isRemoved: !1,
      isInStock: product.value.isInStock,
      allowDelivery: product.value.allowDelivery,
      allowOnlinePayment: product.value.allowOnlinePayment,
      discountID: product.value.discountID,
      isWithdrawn: product.value.isWithdrawn,
      limitWithCard: product.value.limitWithCard,
      limitWithoutCard: product.value.limitWithoutCard,
      deliveryDaysMax: product.value.deliveryDaysMax,
      isRecipe: null !== (n = null === (r = product.value) || void 0 === r ? void 0 : r.isRecipe) && void 0 !== n && n,
      isAvailable: product.value.isAvailable,
      deliveryAmount: product.value.deliveryAmount,
      discountTemplate: product.value.discountTemplate,
      mightNeedID: product.value.mightNeedID,
      imagesSizeXS: product.value.imagesSizeXS,
      imagesSizeS: product.value.imagesSizeS,
      isSelected: !1,
      isSiteSellRemains: product.value.isSiteSellRemains,
      isWaitingArrive: product.value.isWaitingArrive,
      isOrderRcNoRc: product.value.isOrderRcNoRc
    }), this.hasBonuses && !this.isStock && (d[d.length - 1].bonuses = product.value.bonuses), void 0 !== product.value.sticker && (d[d.length - 1].sticker = product.value.sticker), void 0 !== product.value.deliveryRuleID && (d[d.length - 1].deliveryRuleID = product.value.deliveryRuleID), this.isMobile || this.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
      status: "basket",
      image: this.image(h.SIZE_XS)
    }), localStorage.setItem("basket", JSON.stringify(d)), this.$store.commit("basket/".concat(l.BASKET.UPD), d)
  }
}

function checkHeight() {
  var t, e, o, r, n, c, d, l = this,
      v = null !== (t = this.$refs.recommendations) && void 0 !== t ? t : {},
      h = (null !== (o = null === (e = this.$refs.description) || void 0 === e ? void 0 : e.clientHeight) && void 0 !== o ? o : 0) + 50,
      m = null !== (c = (null !== (r = v.clientHeight) && void 0 !== r ? r : 0) + (null !== (n = this.$refs.articles) && void 0 !== n ? n : {}).clientHeight) && void 0 !== c ? c : 0;
  h < m && (this.$refs.articles.style.display = "none", h < (null !== (d = v.clientHeight) && void 0 !== d ? d : 0) && Array.from(v.children[1].children).forEach((function (t, i) {
    i > 1 && (t.style.display = "none")
  })), this.$nextTick((function () {
    var t, e;
    h < (null !== (e = (null !== (t = l.$refs.recommendations) && void 0 !== t ? t : {}).clientHeight) && void 0 !== e ? e : 0) && (Array.from(v.children[1].children).forEach((function (t, i) {
      i > 0 && (t.style.display = "none")
    })), l.isHorizontalCardMode = !0)
  })))
}

function addToComparison() {
  var t, e = this;
  if (!this.isComparisonLoading) {
    this.isComparisonLoading = !0;
    var o = v.c.clone(this.comparisonProducts);
    if (this.isInComparison) {
      var r = null !== (t = o.find((function (p) {
        return p.categoryID === e.productCategory.ID
      }))) && void 0 !== t ? t : {};
      o = 1 === r.productIDs.length ? o.filter((function (p) {
        return p.categoryID !== e.productCategory.ID
      })) : o.filter((function (p) {
        return p.categoryID === e.productCategory.ID && (p.productIDs = p.productIDs.filter((function (t) {
          return t !== e.productID
        }))), p
      }))
    } else void 0 === o.find((function (t) {
      return t.categoryID === e.productCategory.ID
    })) ? (o.push({
      categoryID: this.productCategory.ID,
      productIDs: [this.productID]
    }), this.sendNoticeCompare()) : o.map((function (t) {
      return t.categoryID === e.productCategory.ID && (t.productIDs.length < 6 ? (t.productIDs.push(e.productID), e.sendNoticeCompare(), 6 !== t.productIDs.length || e.isMobile || e.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
        status: "compare-limited",
        productCategoryName: e.productCategory.name.length > 21 && !e.isMobile ? "".concat(e.productCategory.name.slice(0, 21), "...") : e.productCategory.name
      })) : e.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
        title: "Ошибка",
        desc: 'В сравнении может быть только <br> 6 товаров данной категории.<br><br><a href="/compare" class="hover-bottom-line">Перейти в сравнение</a>',
        status: "error"
      })), t
    }));
    this.$store.dispatch("comparisonProducts/".concat(l.COMPARISON_PRODUCTS.UPD), o).finally((function () {
      e.isComparisonLoading = !1
    }))
  }
}

function goToReviews() {
  var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
  this.$data.isProductReviews && (this.scrollTo("reviews"), !0 === t && this.openReviewsForm())
}

function goToProduct() {
  this.$data.isProductReviews || (this.scrollTo("description"), this.isShowDescription = !0)
}

function goToLoyal() {
  this.$router.push({
    name: "loyal"
  })
}

function sendNoticeCompare() {
  this.isMobile || this.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
    status: "compare",
    image: this.image(h.SIZE_XS)
  })
}

function addToFavorites(t, e) {
  var o, r, n, c = this;
  if (!e || !this.isFavoritesLoading)
    if (this.isAuthorized) this.loadingFavoritesProductIDs.push(t), this.loadingFavoritesProductIDs.includes(product.value.ID) && (this.isFavoritesLoading = !0), this.$store.dispatch("favorites/".concat(l.FAVORITES.ADD), {
      itemID: t,
      cityID: null !== (r = null === (o = this.city) || void 0 === o ? void 0 : o.ID) && void 0 !== r ? r : 41
    }).catch((function (t) {
      c.error(t)
    })).finally((function () {
      c.loadingFavoritesProductIDs.includes(c.$data.product.ID) && (c.isFavoritesLoading = !1), c.loadingFavoritesProductIDs = []
    }));
    else {
      var d = v.c.clone(null !== (n = this.$store.state.favorites.items) && void 0 !== n ? n : []);
      if (this.isInFavorites) {
        var m = d.findIndex((function (t) {
          return t.ID === c.$data.product.ID
        }));
        d.splice(m, 1)
      } else {
        if (d.length >= this.params.maxCountFavorites) return void this.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
          title: "Внимание!",
          desc: "В разделе «�?збранное» добавлено максимальное количество товаров – ".concat(this.params.maxCountFavorites, " шт."),
          status: "warning"
        });
        this.isMobile || this.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
          status: "favorites",
          image: this.image(h.SIZE_XS)
        }), d.push(product.value)
      }
      localStorage.setItem("favorites", JSON.stringify(d)), this.$store.commit("favorites/".concat(l.FAVORITES.UPD), d)
    }
}

function closeShareLinks() {
  this.isOpenedShare = !1, document.removeEventListener("keydown", this.esc), document.removeEventListener("click", this.outside)
}

function copyText() {
  var t, text = window.getSelection(),
      e = text + "<br /><br />�?сточник: ".concat(this.params.siteURL).concat(this.$route.path),
      div = document.createElement("div");
  div.style.position = "absolute", div.style.left = "-99999px", div.innerHTML = "".concat(e).replace(/\n/g, "<br />"), null === (t = document.getElementById("app")) || void 0 === t || t.appendChild(div), null == text || text.selectAllChildren(div), setTimeout((function () {
    var t;
    null === (t = document.getElementById("app")) || void 0 === t || t.removeChild(div)
  }), 100)
}

function deleteReview(t) {
  var e = this;
  this.isLoadingReviews = !0, f.a.reviews.del(t).then((function () {
    e.getTotalCountReviews(), e.getReviews().finally((function () {
      e.isLoadingReviews = !1
    })), t.isActive && e.getProduct()
  })).catch((function (t) {
    e.isLoadingReviews = !1, e.error(t)
  }))
}

function scrollTodescription(t) {
  if ("#instrukciya-po-primeneniyu" !== t) {
    var e = document.querySelector(t);
    this.descriptionHash = t, v.q.smooth(e, -150)
  } else this.goToProduct()
}

function scrollTo(t) {
  var e, o = null !== (e = this.$refs[t].$el) && void 0 !== e ? e : this.$refs[t];
  v.q.smooth(o, this.isMobile ? -60 : -150)
}

function error(t) {
  this.$store.dispatch("notifications/".concat(l.NOTIFICATIONS.UPD), {
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}

function esc(t) {
  "Escape" === t.code && this.closeShareLinks()
}

function getReplacements(t) {
  var e, o, r, n, c = this;
  if (0 === (null !== (e = product.value.replacements) && void 0 !== e ? e : []).length) return Promise.resolve();
  t && (this.isLoadingReplacements = !0);
  var d = null !== (n = null === (r = null === (o = this.$store.state.cities) || void 0 === o ? void 0 : o.currentCity) || void 0 === r ? void 0 : r.ID) && void 0 !== n ? n : 41,
      v = {
        filter: 'isNotFound="false"&ID={'.concat(product.value.replacements.join(), "}&cityID=").concat(d, "&isInStock=true&saveSort=true"),
        fields: m.k,
        listName: "replacements"
      },
      h = this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), v);
  return h.then((function (p) {
    c.$data.replacements = [], c.$data.product.replacements.forEach((function (t) {
      p.find((function (e) {
        e.ID === t && c.$data.replacements.push(e)
      }))
    })), c.$data.isFailedGettingReplacements = !1
  })).catch((function (t) {
    c.$data.isFailedGettingReplacements = !0, c.error(t)
  })).finally((function () {
    t && (c.isLoadingReplacements = !1)
  })), h
}

function getTrademarkProducts() {
  var t, e, o, r, n, c = this,
      d = null === (t = product.value.properties.find((function (p) {
        return 10 === p.typeID
      }))) || void 0 === t ? void 0 : t.ID;
  if (0 === (null !== (e = product.value.trademarkProducts) && void 0 !== e ? e : []).length || void 0 === d) return Promise.resolve();
  var v = null !== (n = null === (r = null === (o = this.$store.state.cities) || void 0 === o ? void 0 : o.currentCity) || void 0 === r ? void 0 : r.ID) && void 0 !== n ? n : 41,
      h = ["ID", "images", "name", "price", "slug", "isRecipe", "imagesSizeXS"];
  product.value.typeIDs.includes(396070) && h.push("properties");
  var m = {
        filter: "ID!=".concat(this.productID, "&properties={typeID=10,ID=").concat(d, "}&categoryID=").concat(product.value.categoryID, "&cityID=").concat(v, "&isInStock=true&isAvailable=true[0:20]"),
        fields: h,
        path: "random",
        listName: "trademarkProducts"
      },
      f = this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), m);
  return f.then((function (p) {
    c.$data.trademarkProducts = null != p ? p : []
  })).catch((function (t) {
    c.error(t)
  })), f
}

function getPharmacy() {
  return this.$store.dispatch("pharmacies/".concat(l.PHARMACIES.GET), {
    city: this.city
  })
}

function getPharmacyStock() {
  var t = this;
  if (void 0 !== this.city && product.value.isAvailable) {
    var e = f.a.pharmacies.getStock({
      productID: [this.productID],
      city: this.city,
      isRareProduct: this.isRare
    });
    return this.isGetRegionPharmacies = !1, e.then((function (p) {
      t.pharmacyStock = null != p ? p : []
    })).catch((function (t) {
      console.log(t)
    })), e
  }
  return void 0 !== this.city && (this.pharmacyStock = [], this.isOpenStockSidebar = !1, this.isGetRegionPharmacies = !0), Promise.resolve()
}

function getProduct() {
  var t, e, o = this,
      r = this.$store.dispatch("products/".concat(l.PRODUCT.GET), "ID=".concat(this.productID, '&slug="').concat(this.productSlug, '"&cityID=').concat(null !== (e = null === (t = this.city) || void 0 === t ? void 0 : t.ID) && void 0 !== e ? e : 41));
  return r.then((function (p) {
    o.$data.product = p, o.$data.isFailedGettingProduct = !1
  })).catch((function (t) {
    o.$data.isFailedGettingProduct = !0, o.error(t)
  })), r
}

function getRecommend(t) {
  var e, o, r, n, c = this;
  if (0 === (null !== (e = product.value.recommend) && void 0 !== e ? e : []).length) return Promise.resolve();
  t && (this.isLoadingRecommend = !0);
  var d = null !== (n = null === (r = null === (o = this.$store.state.cities) || void 0 === o ? void 0 : o.currentCity) || void 0 === r ? void 0 : r.ID) && void 0 !== n ? n : 41,
      v = {
        filter: 'isNotFound="false"&ID={'.concat(product.value.recommend.join(), "}&cityID=").concat(d, "&isInStock=true"),
        fields: m.k,
        listName: "recommendations"
      },
      h = this.$store.dispatch("products/".concat(l.PRODUCT.GET_LIST), v);
  return h.then((function (p) {
    var t, e = null != p ? p : [],
        o = null !== (t = c.$data.product.recommend) && void 0 !== t ? t : [],
        r = [];
    o.forEach((function (t) {
      var o = e.find((function (e) {
        return e.ID === t
      }));
      void 0 !== o && r.push(o)
    })), c.$data.recommendations = r, c.$data.isFailedGettingRecommend = !1
  })).catch((function (t) {
    c.$data.isFailedGettingRecommend = !0, c.error(t)
  })).finally((function () {
    t && (c.isLoadingRecommend = !1)
  })), h
}

function getRestrictTypes() {
  return 0 !== this.restrictTypes.length ? Promise.resolve() : this.$store.dispatch("restrictTypes/".concat(l.RESTRICT_TYPES.GET))
}

function getTotalCountReviews() {
  var t = this;
  if (this.isRecipe) return this.$data.allGrades = [], this.$data.totalCountReviews = 0, Promise.resolve();
  var e = f.a.reviews.get("productID=".concat(this.productID), ["ID", "rate"]);
  return e.then((function (e) {
    t.$data.allGrades = null != e ? e : [], t.$data.totalCountReviews = t.$data.allGrades.length
  })).catch((function (e) {
    t.error(e)
  })), e
}

function getRegionPharmacies() {
  var t = this;
  return Object(c.a)(regeneratorRuntime.mark((function e() {
    var o, r;
    return regeneratorRuntime.wrap((function (e) {
      for (; ;) switch (e.prev = e.next) {
        case 0:
          return t.$store.commit("app/".concat(l.APP.LOADING_UPD), !0), t.isGetRegionPharmacies || (t.isGetRegionPharmacies = !0), t.isLoadingRegionPharmacies = !0, o = function () {
            var e;
            f.a.pharmacies.get({
              regionID: null === (e = t.region) || void 0 === e ? void 0 : e.ID
            }).then((function (p) {
              t.regionPharmacies = null != p ? p : []
            })).catch((function (t) {
              console.error(t)
            }))
          }, r = function () {
            var e;
            f.a.pharmacies.getStock({
              productID: [t.productID],
              regionID: null === (e = t.region) || void 0 === e ? void 0 : e.ID,
              isRareProduct: t.isRare
            }).then((function (p) {
              t.regionPharmacyStock = null != p ? p : []
            })).catch((function (t) {
              console.error(t)
            }))
          }, e.next = 7, Promise.all([o(), r()]).finally((function () {
            t.$store.commit("app/".concat(l.APP.LOADING_UPD), !1), t.isLoadingRegionPharmacies = !1, t.isOpenStockSidebar || t.openStockSidebar()
          }));
        case 7:
        case "end":
          return e.stop()
      }
    }), e)
  })))()
}

function getReviews(t) {
  var e = this;
  if (this.isRecipe) return this.$data.reviews = [], Promise.resolve();
  var o = t ? "".concat(this.filterReviews, "[").concat(this.$data.reviews.length, ":").concat(this.limitReviews, "]") : "".concat(this.filterReviews, "[0:").concat(this.limitReviews, "]"),
      n = f.a.reviews.get(o);
  return t ? this.isLoadingMoreReviews = !0 : this.isLoadingReviews = !0, n.then((function (o) {
    e.$data.isFailedGettingReviews = !1, e.$data.reviews = t ? [].concat(Object(r.a)(e.$data.reviews), Object(r.a)(o)) : null != o ? o : []
  })).catch((function (t) {
    e.$data.isFailedGettingReviews = !0, e.error(t)
  })).finally((function () {
    t ? e.isLoadingMoreReviews = !1 : e.isLoadingReviews = !1
  })), n
}

function init() {
  var t, e, o = this;
  return this.$store.commit("app/".concat(l.APP.LOADING_UPD), !0), this.region = this.regions.find((function (t) {
    var e;
    return t.ID === (null === (e = o.city) || void 0 === e ? void 0 : e.regionID)
  })), Promise.all([0 === Object.keys(this.propertyTypes).length ? this.loadPropertyTypes().catch((function () {
    v.p.request(o.loadPropertyTypes, 3, 5e3)
  })) : Promise.resolve(), 0 === this.restrictTypes.length ? this.getRestrictTypes().catch((function () {
    v.p.request(o.getRestrictTypes, 3, 5e3)
  })) : Promise.resolve(), 0 === this.pharmacyStock.length ? this.getPharmacyStock().catch((function () {
    v.p.request(o.getPharmacyStock, 3, 5e3)
  })) : Promise.resolve(), (null === (t = this.pharmacies[0]) || void 0 === t ? void 0 : t.cityID) !== (null === (e = this.city) || void 0 === e ? void 0 : e.ID) ? this.getPharmacy().catch((function () {
    v.p.request(o.getPharmacy, 3, 5e3)
  })) : Promise.resolve(), this.setViewedProductID(), this.cardProjects.length < 1 ? this.getCardProjects() : Promise.resolve(), this.charity.length < 1 ? this.getCharity() : Promise.resolve()]).finally((function () {
    o.$store.commit("app/".concat(l.APP.LOADING_UPD), !1)
  }))
}

function loadPropertyTypes() {
  return this.$store.dispatch("productPropertyTypes/".concat(l.PRODUCT_PROPERTY_TYPES.GET))
}

function openFastOrder() {
  var t, e, o, r, n, c, d, v = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
  this.reachGoal("oneclick");
  var h = {
    productID: null === (t = product.value) || void 0 === t ? void 0 : t.ID,
    productSlug: null === (e = product.value) || void 0 === e ? void 0 : e.slug,
    name: null === (o = product.value) || void 0 === o ? void 0 : o.name,
    count: this.isRare ? this.rareItemCount : 1,
    price: null === (r = product.value) || void 0 === r ? void 0 : r.price,
    images: null === (n = product.value) || void 0 === n ? void 0 : n.images,
    isSiteSellRemains: null === (c = product.value) || void 0 === c ? void 0 : c.isSiteSellRemains,
    isOrderRcNoRc: null === (d = product.value) || void 0 === d ? void 0 : d.isOrderRcNoRc
  };
  this.$store.commit("checkout/".concat(l.CHECKOUT.FAST_ORDER_UPD), {
    item: h,
    pharmacyID: v,
    city: this.fastOrderCity,
    isRare: this.isRare
  }), this.$router.push({
    name: "checkout"
  })
}

function openPopup(t) {
  var e = screen.width / 2 - 300,
      o = screen.height / 2 - 200;
  window.open(t, "", "width=".concat(600, ", height=").concat(400, ", top=").concat(o, ", left=").concat(e))
}

function openShareLinks() {
  this.isOpenedShare = !0, document.addEventListener("keydown", this.esc), document.addEventListener("click", this.outside)
}

function outside(t) {
  var menu = this.$refs.menu,
      button = this.$refs.button,
      e = t.target;
  menu.contains(e) || button.contains(e) || this.closeShareLinks()
}

const preparedProducts = uPrepared

function repeatGettingProduct() {
  var t, e, o = this;
  this.getProduct().then((function () {
    return o.updateBreadcrumbs(), Promise.all([o.getReplacements(), o.getTrademarkProducts(), o.getRecommend()])
  })), 0 === Object.keys(this.propertyTypes).length ? this.loadPropertyTypes().catch((function () {
    v.p.request(o.loadPropertyTypes, 3, 5e3)
  })) : Promise.resolve(), 0 === this.restrictTypes.length ? this.getRestrictTypes().catch((function () {
    v.p.request(o.getRestrictTypes, 3, 5e3)
  })) : Promise.resolve(), this.getTotalCountReviews(), this.getReviews(), 0 === this.pharmacyStock.length ? this.getPharmacyStock().catch((function () {
    v.p.request(o.getPharmacyStock, 3, 5e3)
  })) : Promise.resolve(), (null === (t = this.pharmacies[0]) || void 0 === t ? void 0 : t.cityID) !== (null === (e = this.city) || void 0 === e ? void 0 : e.ID) ? this.getPharmacy().catch((function () {
    v.p.request(o.getPharmacy, 3, 5e3)
  })) : Promise.resolve(), this.setViewedProductID()
}

function routeProperty(t, e, o) {
  var r = (o ? this.routePropertyKey.includes(t) : this.routePropertyIDs.includes(e.typeID)) ? this.routeProperties["".concat(o ? t : e.typeID)] : "";
  return o ? {
    name: r
  } : {
    name: r,
    params: {
      propertyID: "".concat(e.ID),
      propertyName: e.name.trim(),
      propertyTypeID: "".concat(e.typeID),
      propertyTypeName: t.trim(),
      propertySlug: "".concat(e.slug)
    }
  }
}

function setViewedProductID() {
  var t, e = v.c.clone(JSON.parse(null !== (t = localStorage.getItem("viewedProductsIDs")) && void 0 !== t ? t : "[]"));
  e.length > 0 && e.includes(product.value.ID) && e.splice(e.indexOf(product.value.ID), 1), e.length >= 30 && e.splice(29, 1), e.unshift(product.value.ID), localStorage.setItem("viewedProductsIDs", JSON.stringify(e))
}

function share() {
  this.isOpenedShare ? this.closeShareLinks() : this.openShareLinks()
}

function startTimer() {
  var t = this;
  this.intervalID = window.setInterval((function () {
    Object.keys(t.$data.product).length > 0 && void 0 !== window && (t.ecommerce("detail", [t.$data.product]), clearInterval(t.intervalID))
  }), 1e3)
}

function updateBasketItem(t) {
  this.addToBasket(t, !0)
}

function updateBasketStore(t) {
  this.$store.commit("basket/".concat(l.BASKET.UPD), t)
}


function updateFavoritesStore(t) {
  this.$store.commit("favorites/".concat(l.FAVORITES.UPD), t)
}

function updateReview(t) {
  var e = this;
  this.isLoadingReviewAside = !0, f.a.reviews.update(t).then((function () {
    e.getTotalCountReviews(), e.getReviews().finally((function () {
      e.isLoadingReviewAside = !1
    }))
  })).catch((function (t) {
    e.isLoadingReviewAside = !1, e.error(t)
  }))
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
  ogImage: product.value.images ? "" + product.value.images[0] : "https://pictures.apteka-april.ru/generic/pharmacy_logo.png",
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
            <li :class='["favorites", "unselect", { active: isProductFavoriteActive, disabled: isFavoritesLoading }]'>
              <!--              mousedown: t.favoriteMouseDown,-->
              <!--              mouseout: t.favoriteMouseOut,-->
              <!--              mouseup: t.favoriteMouseUp,-->
              <!--              click(e) {-->
              <!--              return e.preventDefault(), t.addToFavorites(t.product.ID, !0)-->
              <!--              }-->
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
                <li v-if='hasRating && product.isAvailable && !isRare'>
                  <ReviewsCRating :rating="product.rating"/>
                </li>
                <li v-if="hasDescription" @click="goToProduct">
                  <NuxtLink class="hover-bottom-line"
                            :to='{ name: "Product", params: { productID: "" + product.ID, productSlug: "" + product.slug, needScrollToInstruction: "true" }, hash: isMobile ? void 0 : "#instrukciya-po-primeneniyu" }'>
                    Инструкция
                  </NuxtLink>
                </li>
                <li :class='["favorites", { active: isProductFavoriteActive, disabled: isFavoritesLoading }]'>
                  <!--                  mousedown: t.favoriteMouseDown,-->
                  <!--                  mouseout: t.favoriteMouseOut,-->
                  <!--                  mouseup: t.favoriteMouseUp,-->
                  <!--                  click: function (e) {-->
                  <!--                  return e.preventDefault(), t.addToFavorites(t.product.ID, !0)-->
                  <!--                  }-->
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
                    <span>{{ product.price.withoutCard }} ₽</span>
                  </span>
                </div>
              </template>
            </section>
            <template v-if="!isRare">
              ButtonBasket
              <!--              TODO-->
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="action-list">
      <ul>
        <li v-if="!isMobile && hasRating && product.isAvailable && !isRare" class="rating">

        </li>
        <li v-if="!isMobile && !isRecipe" @click="goToReviews(!hasReviews)">
          <NuxtLink
              :to='{ name: "ProductReviews", params: { productID: "" + product.ID, productSlug: "" + product.slug, needOpenReviews: "" + !hasReviews } }'>
            <template v-if="hasReviews">
              <span class="icon star2"/>
              <span class="average hover-bottom-line">Читать отзывы</span>
              <span class="review-count">({{ totalCountReviews }})</span>
            </template>
            <template v-else>
              <span class="icon star2"/>
              <span class="hover-bottom-line">Написать отзыв</span>
            </template>
          </NuxtLink>
        </li>
        <li v-if="hasDescription" @click="goToProduct">
          <NuxtLink
              :to='{ name: "Product", params: { productID: "" + product.ID, productSlug: "" + product.slug, needScrollToInstruction: "true" }, hash: isMobile ? void 0 : "#instrukciya-po-primeneniyu" }'>
            <span class="icon instruction"/>
            <span class="hover-bottom-line">Инструкция</span>
          </NuxtLink>
        </li>
        <li :class='["favorites", { active: isProductFavoriteActive, disabled: isFavoritesLoading }]'>
          <!--          mousedown: t.favoriteMouseDown,-->
          <!--          mouseout: t.favoriteMouseOut,-->
          <!--          mouseup: t.favoriteMouseUp,-->
          <!--          click: function (e) {-->
          <!--          return e.preventDefault(), t.addToFavorites(t.product.ID, !0)-->
          <!--          }-->
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
            <div v-if='!isInComparison && showDisposableHintCompared && !isMobile' class="disposable-hint-compared">
              <div>
                <span class="icon close2" @click.prevent="closeDisposableHintCompared">
                  Вы можете добавить
                  <br>
                  товар к сравнению
                </span>
              </div>
            </div>
          </div>
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
            cZoomImage
          </div>

          <div class="buy">

          </div>

        </div>
      </div>
    </section>


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

.v-product > .c-bottom-bar.property-bar .bar {
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

.v-product > .c-bottom-bar.share-bar .bar {
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

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > .c-button .caption {
  justify-content: center
}

.v-product > .product > .summary > .images > .buy > .details > .rare-item-order > .c-button .caption > .icon {
  margin-right: 5px
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order {
  padding: 0 20px;
  display: flex;
  grid-gap: 2%;
  gap: 2%
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .с-button-basket {
  width: 49%
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button {
  width: 49%;
  height: 48px;
  max-width: unset
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button:hover .thunder {
  background-color: #fff
}

.v-product > .product > .summary > .images > .buy > .details > .fast-order > .c-button .caption {
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

.v-product > .product > .details > aside > .recommendations > div > {
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
  color: #1a1a1a
}

.v-product.mobile > .product > .summary > .images > .image-list > .reviews > a > .average {
  font-weight: 600;
  font-size: 14px;
  color: #3f51b5
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