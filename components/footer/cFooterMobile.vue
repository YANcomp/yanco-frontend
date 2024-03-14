<script lang="ts" setup>
const route = useRoute();
const router = useRouter()

const props = defineProps({
  basketCount: {
    type: Number,
    default: 0
  },
  city: {
    type: <any>Object
  },
  comparisonCount: {
    type: Number,
    default: 0
  },
  comparisonProductIDs: {
    type: Array
  },
  favoritesCount: {
    type: Number,
    default: 0
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
const navigation = ref(<any>{})

watch(
    () => route.path,
    () => {
      closeSideBar()
    },
);

onMounted(() => {
  window.addEventListener("resize", resize)
  resize()
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
})

const appStore = useAppStore()

const hasBasketItems = computed(() => {
  return props.basketCount > 0
})
const hasComparison = computed(() => {
  return props.comparisonCount > 0
})
const hasFavoritesItems = computed(() => {
  return props.favoritesCount > 0
})

const isHide = computed(() => {
  return appStore.isHideMobileFooter
})
const isDim = computed(() => {
  return appStore.isDimMobileFooter
})
const preparedPhone = computed(() => {
  return "+7 ".concat(props.params.hotlinePhone.slice(2))
})

function resize() {
  menuLeft.value = navigation.value.offsetWidth
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
  isOpened.value ? closeSideBar() : openSideBar()
}

function openSideBar() {
  isOpened.value = true
  resize()
  document.body.style.overflow = "hidden"
}

function closeSideBar() {
  isOpened.value = false
  document.body.style.overflow = ""
}

function openChatBot() {
  //TODO openChatBot
}

function openLoginOrRegistration(val: string) {
  new RegExp(["account", "checkout", "login-or-registration"].join("|"), "i").test(route.name ? <string>route.name : "") ? closeSideBar() : useEvent("open-login-or-registration", val)
}
</script>

<template>
  <div :class='["c-footer-mobile", { dim: isDim }]'>
    <div :class='{ opened: isOpened, hide: isHide }'>
      <div :class='["side-bar", { opened: isOpened }]'>
        <div class="overlay" @click="overlay"/>
        <div ref="navigation" class="navigation" :style='{"--left":"-" + menuLeft + "px"}'>
          <div class="phone">
            <a :href="hotlineLink">
              <span class="icon phone-filled"/>
              {{ preparedPhone }}
            </a>
            <span>Единый номер справочной службы «Янко»</span>
          </div>

          <!--       TODO   isAuthorized-->
          <ul class="no-authorized">
            <li class="buttons">
              <UiCButton mode="primary" @click="()=>{ openLoginOrRegistration('login') }">
                Вход
              </UiCButton>
              <UiCButton mode="primary" @click="()=>{ openLoginOrRegistration('registration') }">
                Регистрация
              </UiCButton>
            </li>
            <li>
              <NuxtLink :to='{ name: "loyal" }' class="image">
                <span>Программа лояльности «Янко»</span>
                <img src="https://pictures.apteka-april.ru/generic/programma-loyalnosti.png" width="100%" height="57px"
                     alt=""/>
              </NuxtLink>
            </li>
            <li>
              <CitiesCSelectCity :current-city="city" :is-mobile="true"/>
            </li>
          </ul>
          <ul>
            <li>
              <NuxtLink :to='{name:"delivery"}'>
                Доставка
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to='{name:"help"}'>
                Как сделать заказ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to='{ name: "ArticleList", params: { sectionName: "blog" } }'>
                Полезные статьи
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="favorites" :to='{name:"favorites"}'>
                Избранное
                <span v-if="hasFavoritesItems" class="count">{{ "(" + favoritesCount + ")" }}</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="compare" :to='{name:"compare"}'>
                В сравнении
                <span v-if="hasComparison" class="count">{{ "(" + comparisonCount + ")" }}</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to='{ name: "ArticleList", params: { sectionName: "news" } }'>
                Новости
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{name:'about'}">
                О Компании
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to='{ name: "Pages", params: { slug: "cooperation" } }'>
                Сотрудничество
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to='{ name: "bloggers" }'>
                Блогерам
              </NuxtLink>
            </li>
          </ul>
          <ul class="other">
            <li>
              <a href="/">
                Условия дистанционной продажи
              </a>
            </li>
            <li>
              <a href="/">
                Политика обработки персональных данных
              </a>
            </li>
            <li>
              <a href="/">
                Публичная оферта
              </a>
            </li>
          </ul>
          <div class="socials">
            <span @click="openChatBot">
              Написать в чат
              <span class="icon arrow-right2"/>
            </span>
            <div>
              <span>Мы на связи с вами</span>
              <div>
                <a href="https://vk.com/aptekaaprel" target="_blank" title="ВКонтакте" rel="nofollow">
                  <span class="icon vk"/>
                </a>
                <a href="https://t.me/aprelapteka" target="_blank" data-tooltip="Telegram" rel="nofollow">
                  <span class="icon telegram"/>
                </a>
                <a href="https://www.youtube.com/channel/UCo43PhC3rV6nHjZcS0OlLTA" target="_blank" title="Youtube"
                   rel="nofollow">
                  <span class="icon youtube"/>
                </a>
                <a href="https://ok.ru/aptekaaprel" target="_blank" title="Одноклассники" rel="nofollow">
                  <span class="icon ok"/>
                </a>
                <a href="https://api.whatsapp.com/send?phone=79182009001" target="_blank" title="WhatsApp"
                   rel="nofollow">
                  <span class="icon whatsapp"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <li>
          <button class="flex-vertical-nowrap" @click="openCloseMenu">
            <span ref="burger" :class='["burger", { opened: isOpened }]'>
              <span/>
              <span/>
              <span/>
            </span>
            <span>Меню</span>
          </button>
        </li>
        <li>
          <NuxtLink :to='{ name: "catalog" }'>
            <span class="icon catalog"/>
            <span>Каталог</span>
          </NuxtLink>
        </li>
        <li class="stock">
          <NuxtLink :to='{ name: "Stock" }'>
            <span class="icon flame"/>
            <span class="icon flame-internal"/>
            <span>Акции</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to='{ name: "favorites" }'>
            <span class="icon heart-outline-bold"/>
            <UiCBadge v-if="hasFavoritesItems" :count="favoritesCount"/>
            <span>Избранное</span>
          </NuxtLink>
        </li>
        <li>
          <div @click="openBasket">
            <span class="icon basket2"/>
            <UiCBadge v-if="hasBasketItems" :count="basketCount"/>
            <span>Корзина</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.c-footer-mobile {
  width: 100%;
  height: 40px
}

.c-footer-mobile > div {
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  transition: transform .3s ease-in-out
}

.c-footer-mobile > div.hide {
  transform: translateY(calc(52px + env(safe-area-inset-bottom)))
}

.c-footer-mobile > div > .side-bar {
  height: calc(100% - 52px - env(safe-area-inset-bottom, 20px));
  width: 100%;
  position: fixed;
  visibility: hidden;
  top: 0;
  z-index: 9998
}

.c-footer-mobile > div > .side-bar.opened {
  visibility: visible
}

.c-footer-mobile > div > .side-bar.opened > .overlay {
  background-color: rgba(0, 0, 0, .5)
}

.c-footer-mobile > div > .side-bar.opened > .navigation {
  left: 0
}

.c-footer-mobile > div > .side-bar > .overlay {
  width: 100%;
  z-index: 9998;
  background-color: transparent
}

.c-footer-mobile > div > .side-bar > .navigation, .c-footer-mobile > div > .side-bar > .overlay {
  height: calc(100% + 12px - env(safe-area-inset-top));
  position: absolute;
  transition: .3s, height 0s
}

.c-footer-mobile > div > .side-bar > .navigation {
  width: -webkit-fill-available;
  width: -moz-available;
  left: var(--left);
  z-index: 9999;
  overflow: auto;
  background-color: #fff;
  max-width: 493px;
  padding: 13px 10px 0;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.c-footer-mobile > div > .side-bar > .navigation > .phone {
  display: flex;
  align-items: center
}

.c-footer-mobile > div > .side-bar > .navigation > .phone > a {
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  margin-right: 12px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: #3f51b5;
  -webkit-tap-highlight-color: transparent
}

.c-footer-mobile > div > .side-bar > .navigation > .phone > a > .icon {
  background-color: #3f51b5;
  margin-right: 4px;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 100%;
  mask-size: 100%
}

.c-footer-mobile > div > .side-bar > .navigation > .phone > a:hover {
  color: #4960df
}

.c-footer-mobile > div > .side-bar > .navigation > .phone > a:hover > .icon {
  background-color: #4960df
}

.c-footer-mobile > div > .side-bar > .navigation > .phone > a:active {
  color: #32408f
}

.c-footer-mobile > div > .side-bar > .navigation > .phone > a:active > .icon {
  background-color: #32408f
}

.c-footer-mobile > div > .side-bar > .navigation > .phone > span {
  font-size: 11px;
  line-height: 13px;
  color: #596175;
  max-width: 170px
}

@media screen and (max-width: 366px) {
  .c-footer-mobile > div > .side-bar > .navigation > .phone {
    flex-flow: column;
    align-items: unset
  }

  .c-footer-mobile > div > .side-bar > .navigation > .phone > span {
    margin-top: 5px;
    max-width: unset
  }
}

.c-footer-mobile > div > .side-bar > .navigation > .socials, .c-footer-mobile > div > .side-bar > .navigation > ul {
  position: relative
}

.c-footer-mobile > div > .side-bar > .navigation > ul:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #d6d6e1
}

.c-footer-mobile > div > .side-bar > .navigation > ul {
  margin: 0;
  padding: 0 0 16px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  margin: 24px 0
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li:first-child {
  margin-top: 16px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li:last-child {
  margin-bottom: 0
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > .image {
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > .image > span {
  position: absolute;
  max-width: 175px;
  color: #1e1e1e;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > .image > img {
  -o-object-fit: none;
  object-fit: none;
  border-radius: 5px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.buttons {
  display: flex
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.buttons > .c-button {
  font-size: 13px;
  line-height: 16px;
  max-width: unset
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.buttons > .c-button:first-child {
  margin-right: 9px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .avatar {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .avatar.empty {
  background-color: #d6d6e1;
  display: flex;
  align-items: center;
  justify-content: center
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .avatar.empty > .icon {
  background-color: #fff;
  margin: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .info {
  flex-grow: 1;
  padding-left: 12px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .info > span {
  color: #1e1e1e;
  line-height: 17px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .info > .name {
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 150px;
  margin-bottom: 8px
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .info > .phone {
  font-weight: 500
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .logout3 {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: #818ca9;
  transition: .3s;
  margin: 0
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .logout3:active, .c-footer-mobile > div > .side-bar > .navigation > ul > li.profile > .logout3:hover {
  cursor: pointer;
  background-color: #4960df
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > .c-select-city > button > .icon {
  -webkit-mask-size: 70%;
  mask-size: 70%
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > span:hover {
  cursor: pointer
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > a, .c-footer-mobile > div > .side-bar > .navigation > ul > li > span {
  color: #1e1e1e;
  transition: .3s ease-in-out;
  -webkit-tap-highlight-color: transparent
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > a > .count, .c-footer-mobile > div > .side-bar > .navigation > ul > li > span > .count {
  color: #ff0089
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > a:hover, .c-footer-mobile > div > .side-bar > .navigation > ul > li > span:hover {
  color: #4960df
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > a:active, .c-footer-mobile > div > .side-bar > .navigation > ul > li > span:active {
  color: #32408f
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > a.loyal, .c-footer-mobile > div > .side-bar > .navigation > ul > li > span.loyal {
  color: #ff0089
}

.c-footer-mobile > div > .side-bar > .navigation > ul > li > .nuxt-link-exact-active {
  color: #3f51b5
}

.c-footer-mobile > div > .side-bar > .navigation > ul.authorized > li:first-child, .c-footer-mobile > div > .side-bar > .navigation > ul.no-authorized > li:first-child {
  margin-bottom: 16px
}

.c-footer-mobile > div > .side-bar > .navigation > ul.authorized > li:nth-child(2), .c-footer-mobile > div > .side-bar > .navigation > ul.no-authorized > li:nth-child(2) {
  margin: 16px 0
}

.c-footer-mobile > div > .side-bar > .navigation > ul.authorized > li:nth-child(3), .c-footer-mobile > div > .side-bar > .navigation > ul.no-authorized > li:nth-child(3) {
  margin-top: 16px
}

.c-footer-mobile > div > .side-bar > .navigation > ul.other > li {
  font-weight: unset
}

.c-footer-mobile > div > .side-bar > .navigation > ul.authorized {
  padding-top: 8px;
  margin-top: 16px
}

.c-footer-mobile > div > .side-bar > .navigation > ul.authorized:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #d6d6e1
}

.c-footer-mobile > div > .side-bar > .navigation > .image {
  display: flex;
  position: relative;
  margin-top: 16px;
  text-align: center;
  align-items: center;
  justify-content: center
}

.c-footer-mobile > div > .side-bar > .navigation > .image > span {
  position: absolute;
  max-width: 175px;
  color: #1e1e1e;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px
}

.c-footer-mobile > div > .side-bar > .navigation > .image > img {
  -o-object-fit: none;
  object-fit: none;
  border-radius: 5px
}

.c-footer-mobile > div > .side-bar > .navigation > .socials {
  display: flex;
  flex-flow: column;
  padding: 16px 0;
  margin-bottom: 16px
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3f51b5;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  -webkit-tap-highlight-color: transparent
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > span > .icon {
  margin: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 50%;
  mask-size: 50%;
  background-color: #596175
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > span:hover {
  cursor: pointer;
  color: #4960df
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > span:hover > .icon {
  background-color: #4960df
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > span:active {
  color: #32408f
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > span:active > .icon {
  background-color: #32408f
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > span {
  color: #1e1e1e;
  font-weight: 500;
  line-height: 18px;
  margin-right: 9px;
  white-space: nowrap
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div {
  display: flex
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a {
  margin-right: 10px;
  -webkit-tap-highlight-color: transparent
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a > .icon {
  height: 30px;
  width: 30px;
  margin: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a > .icon.vk {
  background-color: #2787f5
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a > .icon.telegram {
  background-color: #4ea4f6
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a > .icon.youtube {
  background-color: red
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a > .icon.ok {
  background-color: #f7931e
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a > .icon.whatsapp {
  background-color: #25d366
}

.c-footer-mobile > div > .side-bar > .navigation > .socials > div > div > a:last-child {
  margin-right: 0
}

@media screen and (max-width: 364px) {
  .c-footer-mobile > div > .side-bar > .navigation > .socials > div > div {
    margin-top: 10px
  }
}

.c-footer-mobile > div > .side-bar > .navigation > .c-mobile-app-link {
  padding: 0;
  margin-bottom: 22px
}

.c-footer-mobile > div > .side-bar > .navigation > .c-mobile-app-link > span {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px
}

.c-footer-mobile > div > .side-bar > .navigation > .c-mobile-app-link > .c-button {
  max-width: unset;
  height: 40px
}

.c-footer-mobile > div > ul {
  height: 52px;
  width: 100%;
  margin: 0;
  list-style: none;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .1);
  border-radius: 15px 15px 0 0;
  z-index: 9999;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  padding: 0 0 env(safe-area-inset-bottom, 20px)
}

.c-footer-mobile > div > ul > li, .c-footer-mobile > div > ul {
  display: flex;
  justify-content: center;
  align-items: center
}

.c-footer-mobile > div > ul > li {
  width: 20%
}

.c-footer-mobile > div > ul > li.stock > a {
  position: relative
}

.c-footer-mobile > div > ul > li.stock > a > .flame-internal {
  position: absolute;
  background-color: #ff0089
}

.c-footer-mobile > div > ul > li.stock > a > .flame {
  background-color: #818ca9
}

.c-footer-mobile > div > ul > li.stock > a:hover > .flame {
  background-color: #3f51b5
}

.c-footer-mobile > div > ul > li.stock > a:hover > .flame-internal {
  position: absolute;
  background-color: #ff0089
}

.c-footer-mobile > div > ul > li > button {
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border: 0;
  padding: 0;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  background-color: transparent;
  color: #636363
}

.c-footer-mobile > div > ul > li > button:hover {
  color: #3f51b5
}

.c-footer-mobile > div > ul > li > button:hover > .burger > span {
  background-color: #3f51b5
}

.c-footer-mobile > div > ul > li > button .burger {
  height: 15px;
  width: 18px;
  padding-bottom: 4px;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  position: relative;
  margin-top: 8px;
  margin-bottom: 2px
}

.c-footer-mobile > div > ul > li > button .burger > span {
  height: 2px;
  width: 100%;
  display: block;
  position: absolute;
  background-color: #818ca9;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .3s ease-in-out;
  transform-origin: left center;
  font-size: 10px;
  color: #596175
}

.c-footer-mobile > div > ul > li > button .burger > span:first-child {
  top: 0
}

.c-footer-mobile > div > ul > li > button .burger > span:nth-child(2) {
  top: 6px
}

.c-footer-mobile > div > ul > li > button .burger > span:nth-child(3) {
  top: 12px
}

.c-footer-mobile > div > ul > li > button .burger.opened > span:first-child {
  transform: translateY(-1px) translateZ(0) rotate(42deg);
  top: 2px
}

.c-footer-mobile > div > ul > li > button .burger.opened > span:nth-child(2) {
  width: 0;
  opacity: 0
}

.c-footer-mobile > div > ul > li > button .burger.opened > span:nth-child(3) {
  transform: translateY(1px) translateZ(0) rotate(-42deg)
}

.c-footer-mobile > div > ul > li > a, .c-footer-mobile > div > ul > li > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  line-height: 12px;
  padding-top: 2px;
  font-size: 10px;
  color: #596175;
  transition: .2s
}

.c-footer-mobile > div > ul > li > a > .icon, .c-footer-mobile > div > ul > li > div > .icon {
  margin-bottom: 4px;
  background-color: #818ca9;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  margin-right: 0
}

.c-footer-mobile > div > ul > li > a:hover, .c-footer-mobile > div > ul > li > div:hover {
  color: #3f51b5
}

.c-footer-mobile > div > ul > li > a:hover > .icon, .c-footer-mobile > div > ul > li > div:hover > .icon {
  background-color: #3f51b5
}

.c-footer-mobile > div > ul > li > a.barcode > .icon, .c-footer-mobile > div > ul > li > div.barcode > .icon {
  margin-right: 0
}

.c-footer-mobile > div > ul > li > a > .c-badge, .c-footer-mobile > div > ul > li > div > .c-badge {
  top: 6px;
  font-size: 9px;
  padding: 0;
  right: unset;
  margin-left: 18px
}

.c-footer-mobile.dim > div > .side-bar > .overlay {
  height: 100%
}

.c-footer-mobile.dim > div > .side-bar > .navigation {
  overflow: hidden;
  position: static;
  height: 100%
}

.c-footer-mobile.dim > div > ul {
  position: static
}

.c-footer-mobile.dim > div > ul:before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 52px;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1
}

</style>