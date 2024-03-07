<script lang="ts" setup>
const ProductCFilters = resolveComponent('FilterCFilters')

const props = defineProps({
  isBrandAnalogs: {
    type: Boolean,
    default: !1
  },
  isFreeShip: {
    type: Boolean,
    default: !1
  },
  isMobile: {
    type: Boolean,
    default: !1
  },
  isOpened: {
    type: Boolean,
    default: !1
  },
  isStock: {
    type: Boolean,
    default: !1
  },
  itemCount: {
    type: Number
  },
  preparedProductSubtypes: {
    type: Array,
    default: function () {
      return []
    }
  },
  productFilters: {
    type: Array,
    default: function () {
      return []
    }
  },
  productPropertyType: {
    type: <any>Object
  },
  propertyName: {
    type: String
  },
  propertyID: {
    type: Number
  },
  propertyTypeID: {
    type: Number
  },
  summary: {
    type: <any>Object
  },
  isSearchEmpty: {
    type: Boolean
  },
  isHorizontalCardsMode: {
    type: Boolean,
    default: !1
  },
  pharmacies: {
    type: Array
  },
  favoritesPharmacies: {
    type: Array
  },
  stockBabyProductCategories: {
    type: Array,
    default: function () {
      return []
    }
  }
})

const listener = useAttrs()

const properties = computed(() => {
  var r, o, n, c, d, k, m, v = <any>{};
  if (Object.keys(props.summary).length > 0) {
    var f: any, C = E(props.summary.properties);
    try {
      var S = function () {
        var p = f.value;
        if (void 0 === v[p.typeID] && (null === (r = props.productPropertyType[p.typeID]) || void 0 === r ? void 0 : r.isVisible)) return v[p.typeID] = {
          uniqueValue: p.typeID === props.propertyTypeID && p.ID === props.propertyID ? [{
            ...p,
            isSelectedFilter: !0,
            isShow: !0
          }] : [{
            ...p,
            isSelectedFilter: !1,
            isShow: !0
          }],
          isShowAll: !0,
          search: "",
          countSelected: 0
        }, "continue";
        (null === (o = props.productPropertyType[p.typeID]) || void 0 === o ? void 0 : o.isVisible) && !v[p.typeID].uniqueValue.find((function (e: any) {
          return e.ID === p.ID
        })) && v[p.typeID].uniqueValue.push(p.typeID === props.propertyTypeID && p.ID === props.propertyID ? {
          ...p,
          isSelectedFilter: !0,
          isShow: !0
        } : {
          ...p,
          isSelectedFilter: !1,
          isShow: !0
        })
      };
      for (C.s(); !(f = C.n()).done;) S()
    } catch (e) {
      C.e(e)
    } finally {
      C.f()
    }

  } else {
    var _, I = E(props.productFilters);
    try {
      for (I.s(); !(_ = I.n()).done;) {
        var D = _.value;
        if (void 0 !== D.properties) {
          var w: any, P = E(D.properties);
          try {
            var M = function () {
              var p = w.value;
              if (void 0 === v[p.typeID] && (null === (n = props.productPropertyType[p.typeID]) || void 0 === n ? void 0 : n.isVisible)) return v[p.typeID] = {
                uniqueValue: p.typeID !== props.propertyTypeID || p.ID !== props.propertyID || props.isBrandAnalogs ? [{
                  ...p,
                  isSelectedFilter: !1,
                  isShow: !0
                }] : [{
                  ...p,
                  isSelectedFilter: !0,
                  isShow: !0
                }],
                isShowAll: !0,
                search: "",
                countSelected: 0
              }, "continue";
              (null === (c = props.productPropertyType[p.typeID]) || void 0 === c ? void 0 : c.isVisible) && !v[p.typeID].uniqueValue.find((function (e: any) {
                return e.ID === p.ID
              })) && v[p.typeID].uniqueValue.push(p.typeID !== props.propertyTypeID || p.ID !== props.propertyID || props.isBrandAnalogs ? {
                ...p,
                isSelectedFilter: !1,
                isShow: !0
              } : {
                ...p,
                isSelectedFilter: !0,
                isShow: !0
              })
            };
            for (P.s(); !(w = P.n()).done;) M()
          } catch (e) {
            P.e(e)
          } finally {
            P.f()
          }
        }
      }
    } catch (e) {
      I.e(e)
    } finally {
      I.f()
    }
  }

  return v
})

onMounted(async () => {
  for (let F = 0, k = Object.keys(properties.value); F < k.length; F++) {
    var i = k[F];
    properties.value[Number(i)].uniqueValue.sort((a: any, b: any) => {
      return a.name?.localeCompare(b.name)
    })
  }
})

function z(e?: any, t?: any) {
  (null == t || t > e.length) && (t = e.length);
  for (var i = 0, r = new Array(t); i < t; i++) r[i] = e[i];
  return r
}

function E(e?: any, t?: any) {
  var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return z(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === r && e.constructor && (r = e.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(e);
      if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return z(e, t)
    }(e)) || t && e && "number" == typeof e.length) {
      r && (e = r);
      var i = 0,
          o = function () {
          };
      return {
        s: o,
        n: function () {
          return i >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[i++]
          }
        },
        e: function (e: any) {
          throw e
        },
        f: o
      }
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
  }
  var n: any, c = !0,
      l = !1;
  return {
    s: function () {
      r = r.call(e)
    },
    n: function () {
      var e = r.next();
      return c = e.done, e
    },
    e: function (e: any) {
      l = !0, n = e
    },
    f: function () {
      try {
        c || null == r.return || r.return()
      } finally {
        if (l) throw n
      }
    }
  }
}
const render = () => {
  var r, o, n, c, d, k, m, v = <any>{};
  if (void 0 !== props.summary.prices) k = props.summary.prices.withoutCard.min, m = props.summary.prices.withoutCard.max;
  else {
    var x: any = props.productFilters.reduce((function (e: any, t: any) {
      return void 0 !== t.price && e.push(t.price.withoutCard), e
    }), []);
    k = Math.min.apply(Math, Object(x)), m = Math.max.apply(Math, Object(x))
  }
  var O = Math.ceil(.1 * (m - k)),
      B = uPluralize(props.itemCount, ["Найден", "Найдено", "Найдено"]),
      A = uPluralize(props.itemCount, ["товар", "товара", "товаров"]),
      T = "".concat(B, " ") + props.itemCount + " ".concat(A),
      L = "Показать " + props.itemCount + " ".concat(A),
      z = !isFinite(k) && !isFinite(m),
      H = (props.isFreeShip || props.isStock) && (null !== (d = props.preparedProductSubtypes) && void 0 !== d ? d : []).length > 0
  return h(ProductCFilters, {
    "is-brand-analogs": props.isBrandAnalogs,
    "is-mobile": props.isMobile,
    "is-horizontal-cards-mode": props.isHorizontalCardsMode,
    "property-name": props.propertyName,
    "is-no-prices": z,
    "is-show-categories": H,
    max: m,
    "min-range": O,
    min: k,
    "prepared-product-subtypes": props.preparedProductSubtypes,
    "stock-baby-product-categories": props.stockBabyProductCategories,
    "product-count": T,
    "product-count-button": L,
    "product-property-type": props.productPropertyType,
    properties: properties.value,
    pharmacies: props.pharmacies,
    "total-count": props.itemCount,
    "favorites-pharmacies": props.favoritesPharmacies,
    "property-i-d": props.propertyID,
    "property-type-i-d": props.propertyTypeID,
    "is-search-empty": props.isSearchEmpty,
    "is-opened": props.isOpened,
    onPricesChanged: () => {
      return listener.onPricesChanged
    },
    onChangeCardsMode: () => {
      return listener.onChangeCardsMode
    },
    onPropertiesChanged: () => {
      return listener.onPropertiesChanged
    },
    onSortTypeChange: () => {
      return listener.onSortTypeChange
    },
    onReset: () => {
      return listener.onReset
    },
  })
}
</script>

<template>
  <render/>
</template>
