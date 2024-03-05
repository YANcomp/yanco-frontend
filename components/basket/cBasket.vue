<script lang="ts" setup>
const emit = defineEmits(["modal-electronic-check-show", "basket-store-update", "basket-item-select", "basket-item-update", "basket-update", "add-to-basket", "add-to-favorites", "basket-changing"])
const props = defineProps({
  basketCount: {
    type: Number
  },
  basketSelectedCount: {
    type: Number
  },
  basketItems: {
    type: Array
  },
  city: {
    type: Object
  },
  favoritesItems: {
    type: Array
  },
  hasFreeDelivery: {
    type: Boolean,
    default: !1
  },
  hasLoyalCard: {
    type: Boolean,
    default: !1
  },
  hasPaidPeriod: {
    type: Boolean,
    default: !1
  },
  isAllowDelivery: {
    type: Boolean,
    default: !1
  },
  isAuthorized: {
    type: Boolean,
    default: !1
  },
  isBasketChanging: {
    type: Boolean,
    default: !1
  },
  isCityAllowDelivery: {
    type: Boolean,
    default: !1
  },
  isDeniedDelivery: {
    type: Boolean,
    default: !1
  },
  isMobile: {
    type: Boolean,
    default: !1
  },
  isNoDeliveryRules: {
    type: Boolean,
    default: !1
  },
  me: {
    type: Object
  },
  amountForFreeShipping: {
    type: Number,
    default: 0
  },
  params: {
    type: Object
  },
  possiblePrices: {
    type: Object
  },
  preparedCheckItems: {
    type: Object
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  updatingBasketProductIDs: {
    type: Array,
    default: function () {
      return []
    }
  },
  basketPharmacyStock: {
    type: Object
  }
})
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const meStore = useMeStore()
const productsStore = useProductsStore()
const overlayRef = ref(<any>undefined)
const checkoutButtonRef = ref(<any>undefined)
const preparedProducts = uPrepared
const rounding = uRounding

const isHideAlert = ref(!1)
const internalItems = ref(<any>[])
const changeID = ref(<any>0)
const internalCityID = ref(void 0)
const isShowAlert = ref(!0)
const isClosedAlert = ref(!1)
const isOpenLoyalPrices = ref(!1)
const needClosedMobileBottomTooltip = ref(<any>false)
const isWidthForPhone = ref(!1)
const isOpenPromocode = ref(!1)
const currentWidth = ref(0)
const isElectronicCheckAgree = ref(!1)
const isModeBuyPeriods = ref(!1)
const periods = ref([])
const selectedPeriod = ref({})
const isSubscribePeriods = ref(!1)
const isOpenedModal = ref(!1)
const isModalTargetBindings = ref(!1)
const basketOfferedProducts = ref([])
const isGettingBasketOferredProducts = ref(!1)
const productsTheMightNeed = ref([])
const lastDraggedItemIndex = ref(null)
const B = ref(["isLoyal", "isRank", "isInFavorites", "isLimitReached", "route"])

const buyForButtonRoute = computed(() => {
  if (props.isAuthorized) {
    if ("block" === props.me?.loyalCardStatus) return "account-card";
    if (!props.hasPaidPeriod) return "none"
  }
  return props.isAuthorized && props.hasPaidPeriod ? "loyal" : "account-subscription"
})

// isSelectedAll
const isSelectedAll = computed(() => {
  return false
})
const hasDeliveryRuleIDs = computed(() => {
  return selectedBasketItems.value.some((t: any) => {
    return t.deliveryRuleID
  })
})
const isNoItems = computed(() => {
  return internalItems.value.length < 1
})
const isOpenMobileBottomTooltip = computed(() => {
  return isOpenLoyalPrices.value || (isOpenedModal.value || isOpenPromocode.value) && isWidthForPhone.value
})
const isShowAlertDelivery = computed(() => {
  return !props.isDeniedDelivery && hasDeliveryRuleIDs.value && props.isAllowDelivery
})
const isShowModalElectronicCheck = computed(() => {
  var t, e: any = new Date(null !== (t = props.me?.lastElectronicCheckAdTime) && void 0 !== t ? t : "");
  return e.setMonth(e.getMonth() + 3), !props.me?.isElectronicCheckAgree && Date.parse("".concat(e)) < Date.parse("" + new Date)
})
const mobileBottomTooltipName = computed(() => {
  return isOpenedModal.value && isWidthForPhone.value ? "isOpenedModal" : isOpenLoyalPrices.value ? "isOpenLoyalPrices" : isOpenPromocode.value ? "isOpenPromocode" : ""
})
const mobileBottomTooltipTitle = computed(() => {
  return isOpenedModal.value && isWidthForPhone.value ? "".concat(isModalTargetBindings.value ? "Нет банковской карты" : "Удаление товаров") : isOpenLoyalPrices.value ? "Клубные цены" : isOpenPromocode.value ? "Применение промокода" : ""
})
const preparedBasketProducts = computed(() => {
  return preparedProducts(props.basketItems, B.value)
})
const subscribePeriods = computed(() => {
  return (subscribeStore.periods ? subscribeStore.periods : []).sort((a: any, b: any) => {
    return b.duration - a.duration
  })
})
const bindings = computed(() => {
  return bindingsStore.bindings
})
const activeBindings = computed(() => {
  return (bindings.value ? bindings.value : []).find((b: any) => {
    return b.isDefault
  })
})
const activeSubscribe = computed(() => {
  return subscribeStore.subscribe
})
const isHideMobileFooter = computed(() => {
  return appStore.isHideMobileFooter
})
const hasSubscription = computed(() => {
  return meStore.hasSubscription
})
const hasActiveBindings = computed(() => {
  return void 0 !== activeBindings.value
})
const productTheMightNeed = computed(() => {
  return productsStore.productTheMightNeed
})
const productsForOffer = computed(() => {
  return basketOfferedProducts.value.filter((p: any) => {
    return !hasBasketOffered(p.ID)
  })
})
const selectedBasketItems = computed(() => {
  return (props.basketItems ? props.basketItems : []).filter((i: any) => {
    return i.isSelected
  })
})

watch(() => isHideMobileFooter.value, () => {
})
watch(() => isModeBuyPeriods.value, () => {
})
watch(() => periods.value, () => {
})
watch(() => route.path, () => {
})
watch(() => isSubscribePeriods.value, () => {
})
watch(() => props.favoritesItems, () => {
})
watch(() => internalItems.value, () => {
})
watch(() => props.basketItems, () => {
})
watch(() => productsTheMightNeed.value, () => {
})
watch(() => props.isAuthorized, () => {
})
watch(() => isOpenMobileBottomTooltip.value, () => {
})
watch(() => isOpenedModal.value, () => {
})
watch(() => isWidthForPhone.value, () => {
})
watch(() => preparedBasketProducts.value, () => {
})
watch(() => props.me, () => {
})

internalItems.value = [...preparedBasketProducts.value]
internalCityID.value = props.city?.ID
internalItems.value.some((i: any) => {
  return void 0 !== i.mightNeedID
}) && getProductsTheMightNeed()

onMounted(() => {
  window.addEventListener("resize", resize)
  resize()
  void 0 !== props.me && (isElectronicCheckAgree.value = props.me.isElectronicCheckAgree)
  internalItems.value.length > 0 && basketOfferedProducts.value.length < props.params?.basketOfferedProductsIDs.length && !isGettingBasketOferredProducts.value && getBasketOfferedProducts()
  // props.isAuthorized && (void 0 === bindings.value && getBindings(), hasSubscription.value && void 0 === activeSubscribe.value && getActiveSubscribe(), subscribePeriods.value.length < 1 && getSubscribePeriods(), periods.value.length < 1 && getPeriods())
  props.isMobile && document.addEventListener("scroll", onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
  props.isMobile && document.removeEventListener("scroll", onScroll)
})

//METHODS
function addToBasketProductMightNeed() {
  addBasketOfferedProduct(productTheMightNeed.value)
}

function dragItem(t: any) {
  lastDraggedItemIndex.value = t
}

function getProductsTheMightNeed() {
  // let t, e,
  //     o = internalItems.value.reduce( (t, e, i, n)=> {
  //       return e.isRemoved || void 0 === e.mightNeedID || n.map( (i)=> {
  //         return i.productID
  //       }).includes(e.mightNeedID) || t.includes(e.mightNeedID) || t.push(e.mightNeedID), t
  //     }, []);
  // if (o.length > 0) {
  //   d.a.products.get("ID={".concat(o.join(","), "}&cityID=").concat(null !== (e = null === (t = this.city) || void 0 === t ? void 0 : t.ID) && void 0 !== e ? e : 41), ["ID", "slug", "price", "name", "images", "isInStock", "isAvailable", "allowDelivery", "allowOnlinePayment", "averageRating", "reviewsNumber", "imagesSizeXS", "imagesSizeS", "rating", "ratingText", "limitWithCard", "limitWithoutCard"]).then((function (p) {
  //     n.productsTheMightNeed = n.preparedProducts(p)
  //   }))
  // } else this.productsTheMightNeed = []
  productsTheMightNeed.value = []
}

function addBasketOfferedProduct(p: any) {
  let t = internalItems.value.find((i: any) => {
    return i.productID === p.ID
  });
  t ? restore(t) : emit("add-to-basket", {
    productID: p.ID,
    productSlug: p.slug,
    images: p.images,
    name: p.name,
    price: p.price,
    count: 1,
    isRemoved: !1,
    isInStock: p.isInStock,
    allowDelivery: p.allowDelivery,
    allowOnlinePayment: p.allowOnlinePayment,
    discountID: p.discountID,
    isWithdrawn: p.isWithdrawn,
    limitWithCard: p.limitWithCard,
    limitWithoutCard: p.limitWithoutCard,
    deliveryDaysMax: p.deliveryDaysMax,
    isRecipe: p.isRecipe,
    isAvailable: p.isAvailable,
    deliveryAmount: p.deliveryAmount,
    discountTemplate: p.discountTemplate,
    mightNeedID: p.mightNeedID,
    imagesSizeXS: p.imagesSizeXS,
    imagesSizeS: p.imagesSizeS,
    isSelected: !0,
    isSiteSellRemains: p.isSiteSellRemains,
    isWaitingArrive: p.isWaitingArrive,
    isOrderRcNoRc: p.isOrderRcNoRc
  })
}

function preparedImage(p: any) {
  return uPrepareProduct({...p}, uSIZE_XS, props.params?.cdnURL.url).images[0]
}

function hasBasketOffered(t: any) {
  return internalItems.value.some((i: any) => {
    return i.productID === t && !i.isRemoved
  })
}

function getBasketOfferedProducts() {
  // var t, e, n = this,
  //     o = this.internalItems.map((function (i) {
  //       return i.productID
  //     })),
  //     r = this.params.basketOfferedProductsIDs.filter((function (i) {
  //       return !o.includes(i)
  //     }));
  // if (r.length > 0) {
  //   this.isGettingBasketOferredProducts = !0, d.a.products.get("ID={".concat(r.join(","), "}&cityID=").concat(null !== (e = null === (t = this.city) || void 0 === t ? void 0 : t.ID) && void 0 !== e ? e : 41), ["ID", "name", "slug", "price", "isInStock", "images", "isAvailable", "allowDelivery", "allowOnlinePayment", "limitWithCard", "limitWithoutCard", "discountTemplate", "imagesSizeXS", "imagesSizeS", "rating", "ratingText", "isSiteSellRemains", "isWaitingArrive", "isOrderRcNoRc"]).then((function (p) {
  //     n.basketOfferedProducts = n.preparedProducts(p)
  //   })).finally((function () {
  //     n.isGettingBasketOferredProducts = !1
  //   }))
  // }
}

function closeModal(t: any) {
  isWidthForPhone.value ? (needClosedMobileBottomTooltip.value = !0, setTimeout(() => {
    needClosedMobileBottomTooltip.value = !1
  }, 600)) : openCloseModal("boolean" == typeof t && t)
}

function openCloseModal(t: any) {
  isModalTargetBindings.value = Boolean(t)
  isOpenedModal.value = !isOpenedModal.value
}

function selectPeriod(p: any) {
  // this.selectedPeriod = p, this.isMobile && this.$refs["checkout-button"].scrollIntoView({
  //   block: "center",
  //   behavior: "smooth"
  // })
}

function getActiveSubscribe() {
  // this.$store.commit("app/".concat(r.APP.LOADING_UPD), !0), this.$store.dispatch("subscribe/".concat(r.SUBSCRIBE.GET)).finally((function () {
  //   t.$store.commit("app/".concat(r.APP.LOADING_UPD), !1)
  // }))
}

function getBindings() {
  // var t = this;
  // this.$store.commit("app/".concat(r.APP.LOADING_UPD), !0), this.$store.dispatch("bindings/".concat(r.BINDINGS.GET)).finally((function () {
  //   t.$store.commit("app/".concat(r.APP.LOADING_UPD), !1)
  // }))
}

function getSubscribePeriods() {
  // var t = this;
  // this.$store.dispatch("subscribe/".concat(r.SUBSCRIBE.GET_PERIODS)).catch((function (e) {
  //   t.error(e)
  // }))
}

function getPeriods() {
  // var t = this;
  // this.$store.commit("app/".concat(r.APP.LOADING_UPD), !0), d.a.periods.get().then((function (p) {
  //   t.periods = (null != p ? p : []).sort((function (a, b) {
  //     return b.duration - a.duration
  //   }))
  // })).finally((function () {
  //   t.$store.commit("app/".concat(r.APP.LOADING_UPD), !1)
  // }))
}

function addToFavoritesProductMightNeed() {
  addToFavorites(productTheMightNeed.value)
}

function addToFavorites(t: any) {
  emit("add-to-favorites", t)
}

function closeAlert() {
  isClosedAlert.value || (isClosedAlert.value = !0, setTimeout(() => {
    isShowAlert.value = !1
    isHideAlert.value = !0
  }, 450))
}

function closeOverlay() {
  if (isWidthForPhone.value && (isOpenLoyalPrices.value || isOpenPromocode.value || isOpenedModal.value)) return isOpenedModal.value ? closeModal(isModalTargetBindings.value) : (needClosedMobileBottomTooltip.value = !0, setTimeout(() => {
    needClosedMobileBottomTooltip.value = !1
  }, 600)), void setTimeout(() => {
    isOpenLoyalPrices.value = !1
    isOpenPromocode.value = !1
  }, 600);
  isOpenedModal.value && closeModal(isModalTargetBindings.value)
  isOpenLoyalPrices.value = !1
  isOpenPromocode.value = !1
}

function commit(e?: any) {
  if (emit("basket-changing"), e) {
    changeID.value++;
    let n = changeID.value;
    setTimeout(() => {
      changeID.value == n && update()
    }, 1e3)
  } else update()
}

function error(t: any) {
  useNotificationsStore().NOTIFICATIONS_UPD({
    title: "Произошла ошибка",
    desc: t,
    status: "error"
  })
}

function payPeriods() {
  // var t, e, n, o, c, l, h, m, f = this;
  // this.$store.commit("app/".concat(r.APP.LOADING_UPD), !0);
  // var data = {
  //   clientName: "".concat(null !== (e = null === (t = this.me) || void 0 === t ? void 0 : t.sname) && void 0 !== e ? e : "", " ").concat(null !== (o = null === (n = this.me) || void 0 === n ? void 0 : n.name) && void 0 !== o ? o : "").trim(),
  //   clientPhone: null === (c = this.me) || void 0 === c ? void 0 : c.phone,
  //   services: [{
  //     periodID: this.selectedPeriod.ID,
  //     count: 1
  //   }],
  //   cityID: null !== (h = null === (l = this.city) || void 0 === l ? void 0 : l.ID) && void 0 !== h ? h : 41
  // };
  // void 0 !== (null === (m = this.me) || void 0 === m ? void 0 : m.email) && this.me.email.length > 0 && (data.clientEmail = this.me.email), d.a.orders.new(data).then((function (t) {
  //   f.reachGoal("card".concat(14 === f.selectedPeriod.duration ? 12 : 7 === f.selectedPeriod.duration ? 6 : f.selectedPeriod.duration)), setTimeout((function () {
  //     location.href = t[0].paymentURL
  //   }), 100)
  // })).catch((function (t) {
  //   f.error(t)
  // })).finally((function () {
  //   f.$store.commit("app/".concat(r.APP.LOADING_UPD), !1)
  // }))
}

// reachGoal: c.l.reachGoal,
function buySubscription() {
  // var t, e, n, o, c = this;
  // if (this.hasActiveBindings)
  //   if (this.hasSubscription) {
  //     var data = {
  //       ID: null === (t = this.activeSubscribe) || void 0 === t ? void 0 : t.ID,
  //       services: [{
  //         periodID: this.selectedPeriod.ID,
  //         count: 1,
  //         price: this.selectedPeriod.price,
  //         name: this.selectedPeriod.name
  //       }]
  //     };
  //     this.$store.commit("app/".concat(r.APP.LOADING_UPD), !0), d.a.subscribe.upd(data).then((function () {
  //       c.reachGoal("subscription".concat(c.selectedPeriod.durationBase)), c.getActiveSubscribe(), c.$store.dispatch("notifications/".concat(r.NOTIFICATIONS.UPD), {
  //         title: "�?зменен срок подписки",
  //         desc: "Вы успешно изменили срок подписки",
  //         status: "success"
  //       }), c.isModeBuyPeriods = !1, c.goToRoute("Checkout")
  //     })).catch((function (t) {
  //       c.error(t)
  //     })).finally((function () {
  //       c.$store.commit("app/".concat(r.APP.LOADING_UPD), !1)
  //     }))
  //   } else {
  //     var l = {
  //       cityID: null !== (n = null === (e = this.city) || void 0 === e ? void 0 : e.ID) && void 0 !== n ? n : 41,
  //       services: [{
  //         periodID: this.selectedPeriod.ID,
  //         count: 1,
  //         price: this.selectedPeriod.price,
  //         name: this.selectedPeriod.name
  //       }],
  //       binding: {
  //         ID: null === (o = this.activeBindings) || void 0 === o ? void 0 : o.ID
  //       }
  //     };
  //     this.$store.commit("app/".concat(r.APP.LOADING_UPD), !0), d.a.subscribe.add(l).then((function (u) {
  //       c.reachGoal("subscription".concat(c.selectedPeriod.durationBase)), c.$store.commit("me/".concat(r.ME.GET), u), c.$store.dispatch("notifications/".concat(r.NOTIFICATIONS.UPD), {
  //         title: "Подписка оформлена",
  //         desc: "Вы успешно оформили подписку",
  //         status: "success"
  //       })
  //     })).catch((function (t) {
  //       c.error(t)
  //     })).finally((function () {
  //       c.$store.commit("app/".concat(r.APP.LOADING_UPD), !1)
  //     }))
  //   }
  // else openCloseModal(!0)
}

// ecommerce: c.h.e,
function goToRoute(t: any) {
  if ("none" !== t)
    if ("buy-period" !== t) {
      // "checkout" === t && this.$store.commit("checkout/".concat(r.CHECKOUT.ONLY_SELECTED_ITEMS_UPD), !0);
      let n = isOpenLoyalPrices.value || isOpenPromocode.value || isOpenedModal.value || isOpenMobileBottomTooltip.value ? isOpenMobileBottomTooltip.value ? 600 : 450 : 0;
      closeOverlay()
      setTimeout(() => {
        "checkout" === t && isShowModalElectronicCheck.value ? emit("modal-electronic-check-show") : router.push("string" != typeof t ? t : {
          name: t
        })
      }, n)
    } else router.push({
      name: "basket",
      query: {
        periods: null
      }
    })
}

function onScroll() {
  lastDraggedItemIndex.value = null
}

function openCloseMobileBottomTooltip(t: any) {
  isOpenedModal.value && isModalTargetBindings.value && (isModalTargetBindings.value = !1)
  // this.$data[t] = !this.$data[t]
  //TODO
}

function openPromocode() {
  isOpenPromocode.value = !0
}


function remove(t: any) {
  t.isRemoved = true
  t.isRestored = false
  // this.$set(t, "isRemoved", !0), this.$set(t, "isRestored", !1), this.commit(!1)
}

function removeSelected(e?: any) {
  if ("boolean" == typeof e && e) return closeModal(), internalItems.value = internalItems.value.filter((i: any) => {
    return !selectedBasketItems.value.map((t: any) => {
      return t.productID
    }).includes(i.productID)
  }), void update();
  openCloseModal()
}

function resize() {
  isWidthForPhone.value = window.innerWidth <= 510
  currentWidth.value = window.innerWidth
}

function restore(t: any) {
  t.isRemoved = false
  t.isRestored = true
  // this.$set(t, "isRemoved", !1)
  // this.$set(t, "isRestored", !0)
  // this.commit(!1)
}


function update() {
  emit("basket-update", internalItems.value)
}

function updateBasketItem(t: any) {
  emit("basket-item-update", t)
}

function selectBasketItem(t: any) {
  emit("basket-item-select", t)
}

function updateBasketStore(t: any) {
  emit("basket-store-update", t)
}
</script>

<template>
  <div ref="overlayRef" :class='["c-basket", { mobile: isMobile, "all-deleted": basketCount < 1 && !isNoItems }]'>
    <div :class='{ mobile: isWidthForPhone || isMobile }'>
      <div class="content">
        <p>
          Корзина
          <span v-if="basketCount > 0" class="count">({{ basketCount }})</span>
        </p>
        <div v-if="!isHideAlert">cAlert</div>
        <div class="top">
          <div>
            <UiCCheckbox mode="default" v-model:checked="isSelectedAll">
              Выбрать все
            </UiCCheckbox>
          </div>
          <div v-if="selectedBasketItems.length > 0" @click="removeSelected">
            Удалить выбранные
            <div v-if="currentWidth > 850">
              <span class="icon trash-part1"/>
              <span class="icon trash-part2"/>
            </div>
            <span v-else class="icon trash2"/>
          </div>
        </div>

        <div class="products">
          <BasketCBasketProductCard v-for="(p, i) in internalItems" :key="i" :basket-items="basketItems"
                                    :can-be-dragged="i === lastDraggedItemIndex" :current-width="currentWidth"
                                    :has-loyal-card="hasLoyalCard" :has-paid-period="hasPaidPeriod"
                                    :is-authorized="isAuthorized"
                                    :is-basket-updating="updatingBasketProductIDs.includes(p.productID)"
                                    :is-city-allow-delivery="isCityAllowDelivery" :is-mobile="isMobile"
                                    :favorites-items-i-ds="favoritesItems"
                                    :is-quantity-vertical="currentWidth <= 520 || currentWidth <= 700 && currentWidth > 610 || currentWidth <= 1180 && currentWidth > 960"
                                    :is-show-under-the-order="currentWidth > 1180 && !p.isInStock && !p.isRemoved"
                                    :is-width-for-phone="currentWidth <= 420" :prepared-check-items="preparedCheckItems"
                                    :product="p" :params="params" :is-select-product="p.isSelected" for-basket-page
                                    v-on:add-to-favorites="addToFavorites"
                                    v-on:basket-item-update="updateBasketItem"
                                    v-on:basket-item-select="selectBasketItem"
                                    v-on:basket-store-update="updateBasketStore"
                                    v-on:drag="dragItem(i)"
                                    v-on:remove="remove"
                                    v-on:restore="restore"
                                    v-on:route="(e)=>goToRoute(e)"
                                    v-on:add-to-basket-product-might-need="addToBasketProductMightNeed"
                                    v-on:add-to-favorites-product-might-need="addToFavoritesProductMightNeed"/>
          <template v-if="productsForOffer.length > 0 && internalItems.length > 0">
            <span v-if="basketOfferedProducts.length > 0" class="title">Добавить к заказу</span>
            cBasketOfferedProduct
          </template>
        </div>
      </div>

      <div v-if="internalItems.length > 0" class="summary">
        <div class="total">
          <template v-if="isBasketChanging">
            <div>
              <LazyUiCSpinner v-if="isBasketChanging" position="relative"/>
            </div>
          </template>

          <template v-else>
            <p>Ваш заказ</p>
            <div class="line flex-horizontal-nowrap">
              <span>Стоимость по обычным ценам</span>
              <span>{{ possiblePrices.withoutCard }} ₽</span>
            </div>
            <div v-if="totalPrice !== possiblePrices.withoutCard" class="line flex-horizontal-nowrap discount">
              <span>Экономия по вашей карте</span>
              <span>{{ rounding(possiblePrices.withoutCard - totalPrice) }} ₽</span>
            </div>
            <div class="line total-price flex-horizontal-nowrap">
              <span>Итого к оплате:</span>
              <span>{{ rounding(isAuthorized ? totalPrice : possiblePrices.withoutCard) }} ₽</span>
            </div>
            <div class="promocode">
              cPromoCode
            </div>

            <div ref="checkoutButtonRef"
                 :class='["checkout", { hide: isOpenedModal && !isWidthForPhone || isOpenMobileBottomTooltip }]'
                 :style='{ bottom: isMobile ? "0" : "unset" }'>
              <UiCButton :disabled="basketSelectedCount < 1" mode="primary" size="xl" @click="goToRoute('checkout')">
                Оформить заказ
                <UiCArrowSVG color="#fff" hover-color="#fff" size="s"/>
              </UiCButton>
              <div v-if="basketSelectedCount < 1" class="no-select-items">Выберите товары, чтобы продолжить</div>
            </div>

          </template>
        </div>
      </div>

      <template v-if="!isWidthForPhone">
        <!--        TODO cModalWindow-->
      </template>

      <template v-if="isOpenMobileBottomTooltip">
        <UiCMobileBottomTooltip :closed="needClosedMobileBottomTooltip"
                                :mobile-bottom-tooltip-name="mobileBottomTooltipName" is-hide-footer
                                @close="openCloseMobileBottomTooltip">
          <template v-slot:title>
            {{ mobileBottomTooltipTitle }}
          </template>
          <template v-slot:text>
            <template v-if="isOpenedModal && !isModalTargetBindings && isWidthForPhone">
              <p>
                Вы точно хотите удалить выбранные товары из корзины?
                <br>
                Отменить это действие будет невозможно.
              </p>
              <div class="buttons">
                <UiCButton size="m" @click="closeModal">Отмена</UiCButton>
                <UiCButton mode="primary" size="m" @click="removeSelected(!0)">Да, хочу</UiCButton>
              </div>
            </template>
            <template v-if="isOpenPromocode">
              cPromoCode
            </template>
          </template>
        </UiCMobileBottomTooltip>
      </template>
    </div>
  </div>
</template>

<style scoped>
.c-basket {
  min-height: 400px;
  z-index: 998
}

.c-basket > div, .c-basket {
  height: 100%;
  width: 100%;
  display: flex
}

.c-basket > div {
  background-color: #fff;
  margin-left: auto;
  transition: all .3s ease-in-out;
  position: relative
}

.c-basket > div > .loading {
  left: 0;
  top: 0
}

.c-basket > div.mobile {
  box-sizing: border-box
}

.c-basket > div.mobile > .products {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content
}

.c-basket > div > .top {
  display: flex;
  align-items: center;
  margin-top: 29px;
  margin-left: 26px;
  margin-bottom: 10px;
  box-sizing: border-box;
  max-width: 466px;
  width: 100%
}

.c-basket > div > .top > .arrow-left {
  display: none;
  -webkit-mask-size: 75%;
  mask-size: 75%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1e1e1e;
  margin-right: 10px
}

.c-basket > div > .top > p {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin: 0
}

.c-basket > div > .top > p > .count {
  color: #ff0089
}

.c-basket > div > .top > .remove {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: .045em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  color: #818ca9;
  margin-right: 21px;
  transition: all .3s ease-in-out;
  margin-left: auto
}

.c-basket > div > .top > .remove > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 80%;
  mask-size: 80%
}

.c-basket > div > .top > .remove > .icon:hover {
  background-color: #4960df
}

.c-basket > div > .top > .remove > div {
  position: relative;
  width: 28px;
  height: 28px
}

.c-basket > div > .top > .remove > div > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  transition: all .3s ease-in-out;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  position: absolute
}

.c-basket > div > .top > .remove > div > .icon.trash-part1 {
  top: -4px;
  left: 1px;
  width: 22px;
  -webkit-mask-size: 60% 25%;
  mask-size: 60% 25%
}

.c-basket > div > .top > .remove > div > .icon.trash-part2 {
  -webkit-mask-size: 80%;
  mask-size: 80%;
  bottom: 0
}

.c-basket > div > .top > .remove:hover {
  color: #4960df;
  cursor: pointer
}

.c-basket > div > .top > .remove:hover > div > .icon {
  background-color: #4960df
}

.c-basket > div > .top > .remove:hover > div > .icon.trash-part1 {
  transform: rotate(45deg);
  top: -7px;
  left: 5px
}

.c-basket > div > .top > .remove:active {
  color: #32408f
}

.c-basket > div > .top > .remove:active > .icon {
  background-color: #32408f
}

.c-basket > div > .top.has-scroll > .remove {
  margin-right: 24px
}

.c-basket > div > .close {
  position: fixed;
  width: 513px;
  top: 20px
}

.c-basket > div > .close > .close2 {
  position: absolute;
  cursor: pointer;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 70%;
  mask-size: 70%;
  top: 10px;
  left: -30px;
  background-color: #fff;
  transition: all .3s ease-in-out;
  -webkit-tap-highlight-color: transparent;
  width: 27px;
  margin: 0
}

.c-basket > div > .close > .close2:hover {
  transform: rotate(180deg)
}

.c-basket > div > .no-items {
  box-sizing: border-box;
  padding: 0 14px;
  display: flex;
  flex-flow: column;
  height: 100%
}

.c-basket > div > .no-items > div {
  font-size: 14px;
  line-height: 21px;
  color: #1e1e1e
}

.c-basket > div > .no-items > div > span {
  color: #3f51b5;
  margin-right: 5px
}

.c-basket > div > .no-items > div > span:last-of-type {
  margin-right: 0
}

.c-basket > div > .no-items > div > span:hover {
  color: #4960df;
  cursor: pointer
}

.c-basket > div > .no-items > div > span:active {
  color: #32408f
}

.c-basket > div > .no-items > .image {
  width: 100%
}

.c-basket > div > .no-items > .image > img {
  width: 100%;
  height: 100%;
  -o-object-fit: scale-down;
  object-fit: scale-down
}

.c-basket > div > .no-items > .c-button {
  max-width: unset;
  margin-top: 10px
}

.c-basket > div > .no-items > :deep(.c-button) > .caption {
  justify-content: center
}

.c-basket > div > .no-items > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-basket > div > .no-items > :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-basket > div > .c-modal-window > .modal > .modal-content {
  width: 420px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > h3 {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > p {
  font-size: 14px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > div {
  display: flex;
  justify-content: space-between;
  padding-top: 10px
}

.c-basket > div > .c-modal-window > .modal > .modal-content > div > .c-button {
  width: 167px;
  height: 46px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 600;
  max-width: unset
}

.c-basket > div > .c-modal-window > .modal > .modal-content > div > .c-button.normal {
  font-weight: 500
}

.c-basket > div > .products {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-width: 452px;
  width: 100%;
  margin-right: -15px;
  padding-right: 15px
}

.c-basket > div > .products::-webkit-scrollbar {
  width: 3px
}

.c-basket > div > .products::-webkit-scrollbar-track {
  background-color: #fff
}

.c-basket > div > .products::-webkit-scrollbar-thumb {
  height: 1px;
  border-radius: 5px;
  background-color: #d6d6e1
}

.c-basket > div > .periods {
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-bottom: 20px
}

.c-basket > div > .periods > h1 {
  margin-top: 0;
  text-align: center
}

.c-basket > div > .periods > h1 > a {
  color: #3f51b5;
  text-decoration: underline
}

.c-basket > div > .periods > h1 > a:hover {
  color: #4960df
}

.c-basket > div > .periods > h1 > a:active {
  color: #32408f
}

@media screen and (max-width: 1328px) {
  .c-basket > div > .periods > h1 {
    font-size: 22px
  }
}

@media screen and (max-width: 800px) {
  .c-basket > div > .periods > h1 {
    font-size: 18px
  }
}

@media screen and (max-width: 383px) {
  .c-basket > div > .periods > h1 {
    font-size: 16px
  }
}

.c-basket > div > .periods > .items {
  display: flex;
  flex-flow: column;
  align-items: center
}

.c-basket > div > .periods > .c-checkbox > span > a {
  color: #3f51b5
}

.c-basket > div > .periods > .c-checkbox > span > a:hover {
  color: #4960df
}

.c-basket > div > .periods > .c-checkbox > span > a:active {
  color: #32408f
}

.c-basket > div > .content {
  max-width: 960px;
  width: 100%
}

.c-basket > div > .content > .products > .title {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #3f51b5;
  margin-bottom: 5px;
  margin-left: 4px
}

.c-basket > div > .content > p {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  margin: 0
}

.c-basket > div > .content > p > .count {
  color: #ff0089
}

.c-basket > div > .content > .top {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px
}

.c-basket > div > .content > .top > div {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: .045em;
  text-transform: uppercase;
  color: #3f51b5;
  display: flex;
  align-items: center
}

.c-basket > div > .content > .top > div:hover {
  cursor: pointer
}

.c-basket > div > .content > .top > div:last-of-type {
  color: #818ca9;
  display: flex;
  align-items: center
}

.c-basket > div > .content > .top > div:last-of-type:hover {
  color: #4960df
}

.c-basket > div > .content > .top > div:last-of-type:last-child:hover > .icon, .c-basket > div > .content > .top > div:last-of-type:last-child:hover > div > .icon {
  background-color: #4960df
}

.c-basket > div > .content > .top > div:last-of-type:last-child:hover > div > .icon.trash-part1 {
  transform: rotate(45deg);
  top: -7px;
  left: 5px
}

.c-basket > div > .content > .top > div:last-of-type > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 80%;
  mask-size: 80%
}

.c-basket > div > .content > .top > div:last-of-type > div {
  position: relative;
  width: 28px;
  height: 28px;
  transform-style: preserve-3d
}

.c-basket > div > .content > .top > div:last-of-type > div > .icon {
  margin-left: 4.5px;
  margin-right: 0;
  background-color: #818ca9;
  transition: all .3s ease-in-out;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  position: absolute
}

.c-basket > div > .content > .top > div:last-of-type > div > .icon.trash-part1 {
  top: -4px;
  left: 1px;
  width: 22px;
  -webkit-mask-size: 60% 25%;
  mask-size: 60% 25%
}

.c-basket > div > .content > .top > div:last-of-type > div > .icon.trash-part2 {
  -webkit-mask-size: 80%;
  mask-size: 80%;
  bottom: 0
}

.c-basket > div > .content > .top > div:active {
  color: #32408f
}

.c-basket > div > .content > .top > div:active > .icon, .c-basket > div > .content > .top > div:active > div > .icon {
  background-color: #32408f
}

.c-basket > div > .summary {
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-top: 0;
  padding-top: 6px;
  margin-left: auto;
  max-width: 380px
}

.c-basket > div > .summary > .total {
  display: flex;
  flex-flow: column;
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 20px;
  padding: 0 12px 0 0;
  top: 70px;
  position: sticky;
  order: 1
}

.c-basket > div > .summary > .total > .c-alert {
  padding: 10px 9px;
  margin-bottom: 10px;
  align-items: center;
  order: 2
}

.c-basket > div > .summary > .total > .c-alert.info {
  background-color: #f7f8fc
}

.c-basket > div > .summary > .total > .c-alert.info .desc {
  color: #1e1e1e
}

.c-basket > div > .summary > .total > .c-alert.info .desc > div {
  display: inline-block;
  margin-bottom: -7px
}

.c-basket > div > .summary > .total > .c-alert.info .desc > a {
  color: #3f51b5;
  margin-top: 2px
}

.c-basket > div > .summary > .total > .c-alert.info .desc > a:hover {
  color: #4960df
}

.c-basket > div > .summary > .total > .c-alert.info .desc > a:active {
  color: #32408f
}

.c-basket > div > .summary > .total > .c-alert.success {
  background-color: #ebfef8
}

.c-basket > div > .summary > .total > .c-alert.success .desc {
  color: #1e1e1e
}

.c-basket > div > .summary > .total > .c-alert.warning {
  margin-bottom: 0
}

.c-basket > div > .summary > .total > .c-alert.warning .desc {
  color: #ff7a00;
  font-size: 11px;
  line-height: 13px
}

.c-basket > div > .summary > .total > .c-alert.warning > .warning-alert {
  margin-left: -16px;
  margin-right: 14px
}

.c-basket > div > .summary > .total > .c-alert > .close-alert {
  margin-left: 0;
  margin-right: -10px
}

.c-basket > div > .summary > .total > p {
  margin: 0 0 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #1e1e1e
}

.c-basket > div > .summary > .total > .sales-terms {
  display: inline-block;
  margin-top: 10px;
  color: #1e1e1e;
  line-height: 17px;
  font-size: 13px
}

.c-basket > div > .summary > .total > .sales-terms > a {
  color: #3f51b5
}

.c-basket > div > .summary > .total > .sales-terms > a:hover {
  color: #4960df
}

.c-basket > div > .summary > .total > .sales-terms > a:active {
  color: #32408f
}

.c-basket > div > .summary > .total > .checkout {
  order: 1
}

.c-basket > div > .summary > .total > .checkout > .no-select-items {
  margin-top: 5px;
  text-align: center
}

.c-basket > div > .summary > .total > .electronic-check-banner {
  cursor: pointer;
  display: flex;
  max-width: 380px;
  width: 100%;
  order: 3;
  margin: auto
}

.c-basket > div > .summary > .total > .line {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
  align-items: baseline;
  padding: 4px 0;
  font-size: 15px
}

.c-basket > div > .summary > .total > .line:first-of-type {
  margin-top: 0
}

.c-basket > div > .summary > .total > .line:before {
  content: "";
  position: absolute;
  bottom: 8px;
  height: 1px;
  width: 100%;
  background-image: linear-gradient(90deg, #d6d6e1 40%, hsla(0, 0%, 100%, 0) 0);
  background-position: top;
  background-size: 6.1px 1px;
  background-repeat: repeat-x
}

.c-basket > div > .summary > .total > .line > span {
  color: #1e1e1e;
  background-color: #fff;
  z-index: 1;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center
}

.c-basket > div > .summary > .total > .line > span:first-of-type {
  padding-right: 5px
}

.c-basket > div > .summary > .total > .line > span:last-of-type {
  padding-left: 5px
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf0f9;
  margin-left: 5px
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon:hover {
  background-color: #fdf6ff
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon:hover > .question2 {
  background-color: #fe60b5
}

.c-basket > div > .summary > .total > .line > span > .c-tooltip-icon .icon > .question2 {
  margin: 0;
  width: 20px;
  height: 20px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #1a1a1a
}

.c-basket > div > .summary > .total > .line.total-price > span {
  font-weight: 600;
  font-size: 22px;
  line-height: 27px
}

.c-basket > div > .summary > .total > .line.discount {
  color: #ff0089
}

.c-basket > div > .summary > .total > .line.discount.loyal {
  z-index: 3
}

.c-basket > div > .summary > .total > .line.discount > span {
  color: #ff0089
}

.c-basket > div > .summary > .total > .promocode {
  display: flex;
  margin-top: 5px;
  margin-bottom: 20px;
  order: 2;
  -webkit-tap-highlight-color: transparent
}

.c-basket > div > .summary > .total > .promocode > .c-promo-code > .opened > div > .c-button {
  max-width: 150px;
  margin: 0;
  height: 40px
}

.c-basket > div > .summary > .total > .c-alert.info > .icon {
  margin-right: 5px
}

.c-basket > div > .summary > .total > .c-alert.info > .message {
  max-width: calc(100% - 23px)
}

.c-basket > div > .summary > .total > .c-promo-code {
  order: 2
}

.c-basket > div > .summary > .total > .c-promo-code > .c-edit, .c-basket > div > .summary > .total > .c-promo-code > .c-edit > div > input {
  width: 100%
}

.c-basket > div > .summary > .total > .c-promo-code > .c-button {
  margin-top: 0
}

.c-basket > div > .summary > .total .c-button {
  margin-top: 10px;
  max-width: unset;
  height: 46px;
  font-size: 14px;
  line-height: 17px;
  -webkit-tap-highlight-color: transparent
}

.c-basket > div > .summary > .total :deep(.c-button) > .caption {
  justify-content: center
}

.c-basket > div > .summary > .total :deep(.c-button) > .caption > s {
  transition: color .3s ease-in-out;
  color: #596175;
  margin: 0 5px
}

.c-basket > div > .summary > .total .c-button.primary {
  font-size: 14px;
  line-height: 17px
}

.c-basket > div > .summary > .total :deep(.c-button.primary) > .caption > .c-arrow-svg {
  margin-left: 12px
}

.c-basket > div > .summary > .total :deep(.c-button:hover) > .caption > s {
  color: #fff
}

.c-basket > div > .summary > .total :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:first-of-type {
  opacity: 1
}

.c-basket > div > .summary > .total :deep(.c-button:hover) > .caption > .c-arrow-svg > div > span:last-of-type {
  transform: translateX(4px)
}

.c-basket > div > .summary > .total :deep(.c-button:active) > .caption > s {
  color: #fff
}

.c-basket > div .c-alert {
  padding: 10px;
  align-items: center
}

.c-basket > div .c-alert .desc {
  font-size: 13.5px;
  line-height: 17px
}

.c-basket > div .c-alert.info {
  background-color: #f7f8fc
}

.c-basket > div .c-alert.info .desc {
  color: #1e1e1e
}

.c-basket > div .c-alert.info .desc > div {
  display: inline-block;
  margin-bottom: -7px
}

.c-basket > div .c-alert.info .desc > div > .free-ship {
  width: 26px;
  height: 26px;
  margin-top: -4px
}

.c-basket > div .c-alert.success {
  background-color: #ebfef8;
  padding-top: 18px;
  padding-bottom: 18px
}

.c-basket > div .c-alert.success .desc {
  color: #1e1e1e
}

.c-basket > div .c-alert.warning {
  margin-top: 8px
}

.c-basket > div .c-alert.warning .desc {
  color: #ff7a00
}

.c-basket > div .c-alert > .close-alert {
  margin: 0
}

.c-basket.mobile {
  width: 100%
}

.c-basket.mobile > div > .summary {
  z-index: 1
}

.c-basket.mobile > div > .summary > .total {
  margin-bottom: 10px
}

.c-basket.mobile > div > .summary > .total > .checkout {
  position: fixed;
  background-color: #fff;
  width: calc(100% - 20px);
  left: 0;
  padding: 5px 10px 60px;
  z-index: 3;
  transition: all .3s
}

.c-basket.mobile > div > .summary > .total > .checkout.hide {
  opacity: 0
}

.c-basket.mobile > div > .summary > .total > .checkout > .c-button {
  margin: 0
}

@media screen and (max-width: 1367px) {
  .c-basket > div > .summary {
    margin-left: 20px
  }
}

@media screen and (max-width: 960px) {
  .c-basket {
    z-index: 997
  }

  .c-basket > div {
    flex-flow: column
  }

  .c-basket > div > .summary {
    max-width: unset;
    margin: 0
  }

  .c-basket > div > .summary > .total > .promocode {
    align-self: center;
    margin-bottom: 10px
  }
}

@media screen and (max-width: 610px) {
  .c-basket > div .c-alert {
    padding: 10px 20px;
    margin: 8px -10px
  }

  .c-basket > div .c-alert .desc {
    font-size: 11px;
    line-height: 13px
  }

  .c-basket > div .c-alert:last-of-type {
    margin-top: 0
  }

  .c-basket > div .c-alert > .close-alert {
    margin-right: -15px
  }

  .c-basket > div > .content > .products, .c-basket > div > .content > .top {
    margin: 10px -8px
  }

  .c-basket > div > .content > .top {
    padding: 0 5px
  }

  .c-basket > div > .content > .products > .c-basket-product-card > .card {
    box-sizing: border-box;
    padding: 0 5px
  }

  .c-basket > div > .content > .products > .c-basket-product-card > .card.removed {
    padding-left: 0
  }

  .c-basket > div > .content > p {
    font-size: 18px;
    line-height: 22px
  }

  .c-basket > div > .content > .top > div {
    font-size: 10px;
    line-height: 13px
  }

  .c-basket > div > .summary > .promocode {
    margin: 10px 0
  }
}

@media screen and (max-width: 530px) {
  .c-basket > div > .close {
    left: -20px
  }
}

@media screen and (max-width: 510px) {
  .c-basket > div > .top {
    margin: 0;
    padding: 17px 10px;
    border-radius: 0 0 15px 15px;
    box-shadow: 1px 1px 10px rgba(12, 7, 38, .1);
    position: fixed;
    background-color: #fff;
    z-index: 100
  }

  .c-basket > div > .top > .remove {
    margin-right: 0;
    -webkit-tap-highlight-color: transparent
  }

  .c-basket > div > .top > .arrow-left {
    display: block
  }

  .c-basket > div > .top > p {
    font-size: 18px;
    line-height: 22px
  }

  .c-basket > div > .top.has-scroll > .remove {
    margin-right: 0
  }

  .c-basket > div > .no-items, .c-basket > div > .products {
    margin-top: 62px
  }

  .c-basket > div > .no-items {
    padding: 0 10px
  }

  .c-basket > div > .no-items > p {
    margin-top: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #1e1e1e
  }

  .c-basket > div > .summary {
    order: 1
  }

  .c-basket > div > .summary > .total {
    order: 3;
    padding: 0
  }

  .c-basket > div > .summary > .total > .c-alert {
    order: 1;
    padding: 10px 20px;
    margin: 10px -10px
  }

  .c-basket > div > .summary > .total > .c-alert.warning {
    order: 2
  }

  .c-basket > div > .summary > .total > .c-alert:last-of-type {
    margin-top: 0
  }

  .c-basket > div > .summary > .total > .c-alert > .close-alert {
    margin-right: -15px
  }

  .c-basket > div > .summary > .total > .line > span {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px
  }

  .c-basket > div > .summary > .total > .line.total-price > span {
    font-weight: 600;
    font-size: 22px;
    line-height: 27px
  }

  .c-basket > div > .summary > .total > .c-button.normal, .c-basket > div > .summary > .total > .c-button.primary {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px
  }

  .c-basket > div > .summary > .total > .promocode {
    align-self: unset
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons {
    display: flex;
    justify-content: space-between
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button {
    height: 48px;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    max-width: unset;
    -webkit-tap-highlight-color: transparent
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button:first-of-type {
    margin-right: 10px
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > :deep(.c-button) > .caption {
    justify-content: center
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > :deep(.c-button) > .caption > .c-arrow-svg {
    margin-left: 10px
  }

  .c-basket > div > .products {
    max-height: unset;
    overflow: unset
  }
}

@media screen and (max-width: 403px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 13px
  }
}

@media screen and (max-width: 378px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 12px
  }
}

@media screen and (max-width: 360px) {
  .c-basket > div > .top > p {
    font-size: 16px
  }

  .c-basket > div > .name-and-price {
    margin-right: 15px
  }

  .c-basket > div > .summary > .total > .line > span {
    font-size: 12px
  }

  .c-basket > div > .summary > .total > .line > span > .c-tooltip-icon > .icon > .question2 {
    -webkit-mask-size: 75%;
    mask-size: 75%
  }

  .c-basket > div > .summary > .total > .line.total-price > span {
    font-size: 19px
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > .c-button:first-of-type {
    margin-right: 10px
  }

  .c-basket > div > .c-mobile-bottom-tooltip > div > .content > .buttons > :deep(.c-button) > .caption > .c-arrow-svg {
    margin-left: 0
  }
}

@media screen and (max-width: 353px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 11px
  }
}

@media screen and (max-width: 340px) {
  .c-basket > div > .summary > .total > .line > span {
    font-size: 13px;
    line-height: 16px
  }

  .c-basket > div > .summary > .total > .line.total-price > span {
    font-size: 20px;
    line-height: 25px
  }
}

@media screen and (max-width: 327px) {
  .c-basket > div > .periods > .c-checkbox {
    font-size: 10px
  }
}
</style>