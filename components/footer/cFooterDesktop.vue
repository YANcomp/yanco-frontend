<script lang="ts" setup>
const props = defineProps({
  hotlineLink: {
    type: String
  },
  params: {
    type: <any>Object
  }
})
</script>

<template>
  <footer>
    <div class="container flex-vertical-nowrap">
      <div class="columns flex-horizontal-nowrap">
        <div class="contacts flex-vertical-nowrap">
          <p>Свяжитесь с нами</p>
          <span>Справочная служба. С 8:00 до 22:00 по московскому времени.</span>
          <a :href="hotlineLink" class="phone ta-justify">
            <span class="icon phone-filled"/>
            {{ params.hotlinePhone }}
          </a>
          <div class="socials">
            <span>Мы в соцсетях</span>
            <ul class="flex-horizontal-nowrap">
              <li>
                <a href="https://vk.com/aptekaaprel" target="_blank" data-tooltip="ВКонтакте" rel="nofollow">
                  <span class="icon vk"/>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCo43PhC3rV6nHjZcS0OlLTA" target="_blank"
                   data-tooltip="Youtube" rel="nofollow">
                  <span class="icon youtube"/>
                </a>
              </li>
              <li>
                <a href="https://ok.ru/aptekaaprel" target="_blank" data-tooltip="Одноклассники" rel="nofollow">
                  <span class="icon ok"/>
                </a>
              </li>
              <li>
                <a href="https://t.me/aprelapteka" target="_blank" data-tooltip="Telegram" rel="nofollow">
                  <span class="icon telegram"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ul class="menus">
          <li>
            <p>Про «Янко»</p>
            <ul>
              <li>
                <NuxtLink :to="{name:'about'}">О компании</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">Сотрудничество</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{name: 'vacancies'}">Работа у нас</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">СМИ о нас</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">Блогерам</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">Сотрудничество по кросс-акциям</NuxtLink>
              </li>
            </ul>
          </li>
          <li>
            <p>Покупателям</p>
            <ul>
              <li>
                <NuxtLink to="/">Программа лояльности</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">Доставка</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">Как сделать заказ</NuxtLink>
              </li>
            </ul>
          </li>
          <li>
            <p>Правовая информация</p>
            <ul>
              <li>
                <NuxtLink to="/">Политика обработки персональных данных</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">Публичная оферта</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <div class="media flex-vertical-nowrap">
          <div class="yandex-delivery-badge">
            Доставляем с Яндекс Go
            <img width="95px" height="30px" src="https://pictures.apteka-april.ru/generic/yandex_go_delivery.png"
                 alt="Доставляем с Яндекс Go">
          </div>
          <p class="download">Скачайте мобильное приложение</p>
          <ul class="apps flex-horizontal-nowrap">
            <li>
              <a class="app-store" :href="params.appstoreLink" target="_blank" data-tooltip="App Store"/>
            </li>
            <li>
              <a class="google-play" :href="params.googlePlayLink" target="_blank" data-tooltip="Google Play"/>
            </li>
            <li>
              <a class="ru-store" :href="params.ruStoreLink" target="_blank" data-tooltip="Ru Store"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="disclaimers">
        Магазин не осуществляет дистанционную продажу. Реализация указанной
        продукции запрещена действующим законодательством РФ. Мы не нарушаем закон. Бронирование осуществляется на
        условиях последующего выкупа товаров в выбранном Вами пункте. Цены в пунктах могут отличаться от цен, указанных
        на сайте.
      </div>
      <div class="copyright">
        © ООО «Янко», 2024 г., ОГРН: 000000000000000
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #ebf0f9;
  margin-top: 36px;
  font-size: 14px;
  padding: 36px 0 20px
}

footer > .container {
  padding: 0
}

footer > .container > .columns {
  padding-top: 10px
}

footer > .container > .columns > .contacts {
  flex-basis: 310px;
  padding-right: 20px;
  font-size: 14px;
  color: #1a1a1a;
  align-items: flex-start;
  margin-right: 15px
}

footer > .container > .columns > .contacts > p {
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 29px
}

footer > .container > .columns > .contacts > .phone {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  color: #1a1a1a;
  margin-top: 11px;
  margin-bottom: 46px
}

footer > .container > .columns > .contacts > .phone > .icon {
  margin-right: 4px;
  background-color: #1a1a1a
}

footer > .container > .columns > .contacts > .socials > span {
  font-weight: 600
}

footer > .container > .columns > .contacts > .socials > ul {
  width: 100%;
  margin: 10px 0 0;
  padding: 0;
  justify-content: space-between;
  list-style: none
}

footer > .container > .columns > .contacts > .socials > ul > li {
  margin-right: 14px
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon {
  height: 36px;
  width: 36px;
  background-color: #818ca9;
  transition: .3s;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon.instagram {
  transition: unset;
  position: relative
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon.instagram:before {
  content: "";
  height: 36px;
  width: 36px;
  position: absolute;
  opacity: 0;
  transition: .3s;
  background: linear-gradient(217.3deg, #2033de -11.82%, #de20be 28.65%, #e83d5c 55.63%, #fbff36 105.91%)
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:active.instagram:before, footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:hover.instagram:before {
  opacity: 1
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:active.vk, footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:hover.vk {
  background-color: #2787f5
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:active.youtube, footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:hover.youtube {
  background-color: red
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:active.facebook, footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:hover.facebook {
  background-color: #3b5998
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:active.ok, footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:hover.ok {
  background-color: #f7931e
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:active.whatsapp, footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:hover.whatsapp {
  background-color: #25d366
}

footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:active.telegram, footer > .container > .columns > .contacts > .socials > ul > li > a > .icon:hover.telegram {
  background-color: #4ea4f6
}

footer > .container > .columns > .menus {
  margin: 0;
  padding: 0;
  flex-grow: 1;
  list-style: none;
  -moz-column-count: 3;
  column-count: 3;
  display: flex;
  justify-content: space-evenly
}

footer > .container > .columns > .menus > li {
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  page-break-inside: avoid;
  margin-right: 30px
}

footer > .container > .columns > .menus > li > p {
  margin: 0 0 5px;
  padding: 0;
  font-weight: 600
}

footer > .container > .columns > .menus > li > ul {
  margin: 0;
  padding: 0;
  list-style: none
}

footer > .container > .columns > .menus > li > ul > li {
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  page-break-inside: avoid;
  max-width: 195px;
  margin-bottom: 7px
}

footer > .container > .columns > .menus > li > ul > li > a {
  color: #1a1a1a;
  font-size: 14px;
  transition: .2s
}

footer > .container > .columns > .menus > li > ul > li > a:hover {
  color: #3f51b5
}

footer > .container > .columns > .menus > li > ul > li > a:active {
  color: #32408f
}

footer > .container > .columns > .media {
  flex-basis: 285px;
}

footer > .container > .columns > .media > p {
  margin-top: 0;
  margin-bottom: 11px;
  max-width: 172px;
  font-size: 14px;
  font-weight: 600
}

footer > .container > .columns > .media > p.torg {
  max-width: 200px
}

footer > .container > .columns > .media > p.torg > a {
  display: flex;
  align-items: center
}

footer > .container > .columns > .media > p.torg > a > .icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(221.27deg, #f96363 11.59%, #c471ed 54.68%, #3f51b5 91.91%);
  transition: .3s
}

footer > .container > .columns > .media > p.torg > a > .text {
  flex: 1;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  background: linear-gradient(88.56deg, #3f51b5 .23%, #c35ad5 44.23%, #f96363 92.05%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-left: 5px;
  transition: .3s
}

footer > .container > .columns > .media > p.torg > a:hover > .icon {
  background-position: 32px 0;
  background-image: linear-gradient(221.27deg, #3f51b5 11.59%, #c471ed 54.68%, #f96363 91.91%)
}

footer > .container > .columns > .media > p.torg > a:hover > .text {
  background-position: 160px 0;
  background-image: linear-gradient(88.56deg, #f96363 .23%, #c35ad5 44.23%, #3f51b5 92.05%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent
}

footer > .container > .columns > .media > p > a {
  color: #1a1a1a;
  transition: .2s
}

footer > .container > .columns > .media > p > a:hover {
  color: #4960df
}

footer > .container > .columns > .media > p > a:active {
  color: #32408f
}

footer > .container > .columns > .media > p.download {
  margin-bottom: 6px
}

footer > .container > .columns > .media > .yandex-delivery-badge {
  display: flex;
  flex-flow: column;
  margin-bottom: 18px
}

footer > .container > .columns > .media > .mobile-version {
  margin-bottom: 23px;
  margin-top: 3px;
  cursor: pointer
}

footer > .container > .columns > .media > .mobile-version:hover {
  color: #3f51b5
}

footer > .container > .columns > .media > ul {
  margin: 0;
  padding: 0;
  list-style: none
}

footer > .container > .columns > .media > ul.apps {
  flex-flow: row wrap
}

footer > .container > .columns > .media > ul.apps > li {
  display: flex;
  margin-bottom: 10px
}

footer > .container > .columns > .media > ul.apps > li > a {
  height: 32px;
  width: 96px;
  margin-right: 15px
}

footer > .container > .columns > .media > ul.apps > li > .app-store {
  background: url(https://pictures.apteka-april.ru/generic/mobile/App_Store.png) no-repeat;
  background-size: contain
}

footer > .container > .columns > .media > ul.apps > li > .google-play {
  background: url(https://pictures.apteka-april.ru/generic/mobile/Google_Play.png) no-repeat;
  background-size: contain
}

footer > .container > .columns > .media > ul.apps > li > .app-gallery {
  background: url(https://pictures.apteka-april.ru/generic/mobile/App_Gallery.png) no-repeat;
  background-size: contain
}

footer > .container > .columns > .media > ul.apps > li > .ru-store {
  background: url(https://pictures.apteka-april.ru/generic/mobile/Ru_Store.png) no-repeat;
  background-size: contain
}

footer > .container > .usefull-links {
  text-align: center;
  font-size: 15px
}

footer > .container > .usefull-links > .mobile-version, footer > .container > .usefull-links > a {
  color: #1a1a1a;
  margin-left: 10px;
  text-decoration: underline
}

footer > .container > .usefull-links > .mobile-version:first-child, footer > .container > .usefull-links > a:first-child {
  margin-left: 0
}

footer > .container > .usefull-links > .mobile-version {
  cursor: pointer
}

footer > .container > .copyright, footer > .container > .disclaimers {
  max-width: 1325px;
  margin: 36px 0 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #596175
}

footer > .container > .copyright {
  margin: 5px 0 0
}

@media screen and (max-width: 1367px) {
  footer {
    padding: 36px 20px 20px
  }
}

@media screen and (max-width: 920px) {
  footer {
    min-width: 768px
  }

  footer > .container > .columns > .media {
    max-width: 240px
  }

  footer > .container > .columns > .media > ul {
    justify-content: center
  }

  footer > .container > .columns > .media > ul > li {
    margin-left: 5px
  }

  footer > .container > .columns > .media > ul.apps {
    margin-top: 10px;
    flex-flow: column;
    align-items: center
  }

  footer > .container > .columns > .media > ul.apps > li > .app-store {
    margin-right: unset
  }

  footer > .container > .columns > .media > ul.apps > :last-child {
    margin-top: 10px
  }

  footer > .container > .columns > .media > .yandex-delivery-badge {
    align-self: center
  }
}

</style>