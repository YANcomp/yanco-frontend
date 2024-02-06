<script lang="ts" setup>
const route = useRoute();
const router = useRouter()

const props = defineProps({
  basketCount: {
    type: Number
  },
  city: {
    type: <any>Object
  },
  comparisonCount: {
    type: Number
  },
  comparisonProductIDs: {
    type: Array
  },
  favoritesCount: {
    type: Number
  },
  favoritesPharmaciesCount: {
    type: Number
  },
  hasLoyalCard: {
    type: Boolean
  },
  hotlineLink: {
    type: String
  },
  hotlinePhone: {
    type: String
  },
  isAuthorized: {
    type: Boolean
  },
  isChangedBasketAvailability: {
    type: Boolean
  },
  isChangedBasketPrice: {
    type: Boolean
  },
  me: {
    type: <any>Object
  },
  params: {
    type: <any>Object
  }
})

const isOpened = ref(false)
const menuLeft = ref(0)

watch(
    () => route.path,
    () => {
      closeSideBar()
    },
);

function resize() {
  //TODO
  // menuLeft.value= $refs.navigation.offsetWidth
}

function openBasket() {
  if ("basket" !== route.name) {
    router.push({name: "basket"})
  }
}

function overlay() {
  closeSideBar()
}

function openCloseMenu() {
  isOpened ? closeSideBar() : openSideBar()
}

function openSideBar() {
  isOpened.value = true
  document.body.style.overflow = "hidden"
}

function closeSideBar() {
  isOpened.value = false
  document.body.style.overflow = ""
}
</script>

<template>
  <div>mobile</div>
</template>

<style scoped>

</style>