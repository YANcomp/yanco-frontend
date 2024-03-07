<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const popupTarget = ref(<any>void 0)
const tooltipTarget = ref(void 0)
const popupOpened = ref(!1)
const isOpenedMobileBottomTooltip = ref(!1)

const bottomBarTitle = computed(() => {
  switch (popupTarget.value) {
    case "EXAMPLE":
      return "Пример из практики";
    case "REASON_TO_PAY":
      return "Зачем мне нужно оплачивать период?";
    case "NO_PAY":
      return "Зачем мне карта лояльности, если я не буду оплачивать периоды?";
    case "FORGET_PAY":
      return "Что делать, если я забуду оплатить период на будущий месяц?";
    case "NEED_PLASTIC":
      return "Нужно ли носить с собой пластиковую карту?";
    case "WHY_CHEAP":
      return "А почему так дёшево? У вас сертифицированные препараты?";
    case "CHANGE_NUM":
      return "Как поменять номер, привязанный к карте программы лояльности?";
    default:
      return ""
  }
})
const isAuthorized = computed(() => {
  return useSessionsStore().isAuthorized
})
const params = computed(() => {
  return useAppStore().params
})

const isMobile = computed(() => {
  return useAppStore().isMobile
})

watch(() => isOpenedMobileBottomTooltip.value, (value) => {
  document.body.style.overflow = value ? "hidden" : ""
})

useListen("change-padding-header-product", () => {
  changePadding()
})
useListen("change-body-overflow", () => {
  changeBodyOverflow()
})

function changePadding() {
  popupOpened.value && nextTick(() => {
    // return document.getElementById("app")!.style.paddingRight = "17px"
  })
}

function changeBodyOverflow() {
  popupOpened.value && (document.body.style.overflow = "hidden")
}

function openLoginModal() {
  new RegExp(["account", "checkout", "login-or-registration"].join("|"), "i").test(route.name ? <string>route.name : "") || useEvent("open-login-or-registration")
}


function goToSettings() {
  router.push({
    name: "account-settings"
  })
}

function rublesPluralize(t: any) {
  return uPluralize(t, ["рубль", "рубля", "рублей"])
}

function closePopup() {
  popupOpened.value = !1
}

function openPopup(t: any) {
  popupTarget.value = t
  popupOpened.value = !0
}

function openMobileBottomTooltip(t: any) {
  tooltipTarget.value = t
  isOpenedMobileBottomTooltip.value = !0
}

function closeMobileBottomTooltip(t: any) {
  console.log(t)
  //TODO this.$data[t] = !this.$data[t]
  tooltipTarget.value = void 0
}

let titleHead = "Программа лояльности — Cosmetic | Yanco"
let descHead = "Условия программы лояльности для покупателей."
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: params.value.siteURL + route.path,
    },
  ],
}))
useSeoMeta({
  title: titleHead,
  description: descHead,
  ogType: 'website',
  ogUrl: params.value.siteURL + route.path,
  ogImage: 'https://pictures.apteka-april.ru/generic/pharmacy_logo.png',
  ogTitle: titleHead,
  ogDescription: descHead
})
</script>

<template>
  <main class="v-loyal">
    <div class="banner">
      <div class="wrap">
        <h1>
          В нашей программе лояльности
          <br>
          «Yanco + Cosmetic»
          <br>
          уже более 12 000 000 участников
        </h1>
        <div class="description">
          <template v-if="isAuthorized ">
            Вы — один из них!
            <br>
            Покупайте товары по экстремально низким ценам
            <br>
            с помощью нашей карты лояльности.
          </template>
          <template v-else>
            А вы готовы присоединиться?
            <br>
            Расскажем, как покупать товары по экстремально
            <br>
            низким ценам с помощью нашей карты лояльности.
          </template>
        </div>
      </div>
    </div>

    <div v-show="!isAuthorized" class="pay-less">
      <h1>Платить меньше — просто</h1>
      <div class="steps">
        <div class="step">
          <div class="images-title">
            <div class="images">
              <span class="number one"/>
              <img src="https://pictures.apteka-april.ru/generic/loyal/il_loyalty_1.svg" alt="">
              <span class="arrow-next-step"/>
            </div>
            <h2>
              <span>1. </span>
              Зарегистрируйтесь на сайте или в приложении «YCosmetic»
            </h2>
          </div>
          <ul class="list">
            <li>Получите виртуальную карту лояльности при первой регистрации по номеру телефона.</li>
            <li>Или получите пластиковую карту в аптеке при покупке на сумму от 500 ₽ или оплатив период.</li>
          </ul>
        </div>
        <div class="step">
          <div class="images-title">
            <div class="images">
              <span class="number two"/>
              <img src="https://pictures.apteka-april.ru/generic/loyal/il_loyalty_2.svg" alt="">
              <span class="arrow-next-step"/>
            </div>
            <h2>
              <span>2. </span>
              Зайдите в раздел «Моя карта лояльности» в вашем профиле
            </h2>
          </div>
          <ul class="list">
            <li>В нём вы увидите всю необходимую информацию по вашей карте лояльности: оплаченные периоды, вашу
              экономию, накопленные баллы, а также возможность оформить подписку.
            </li>
          </ul>
        </div>
        <div class="step">
          <div class="images-title">
            <div class="images">
              <span class="number three"/>
              <img src="https://pictures.apteka-april.ru/generic/loyal/il_loyalty_3.svg" alt="">
              <span/>
            </div>
            <h2>
              <span>3. </span>
              Оплатите период, чтобы покупать товары по низким клубным ценам
            </h2>
          </div>
          <ul class="list">
            <li>Срок периода может быть 1, 3, 6 или 12 месяцев. Период можно оплатить онлайн банковской картой,
              накопленными баллами или на кассе в любом магазине «YCosmetic».
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="systems">
      <section>
        <h1>Бонусная система «YCosmetic»</h1>
        <ul v-show="isAuthorized">
          <li>Получите возможность приобретать товары по сниженным ценам и накапливать баллы с каждого чека.</li>
          <li>Накопленными баллами вы можете оплатить до 50% следующих покупок.</li>
        </ul>
        <h2>Начисление баллов</h2>
        <p>Баллы начисляются на весь ассортимент, кроме товаров, участвующих в акциях. Количество баллов за определенный
          товар вы сможете увидеть на ценниках в аптеках и суммарно в чеке по факту покупки.</p>
        <p>Если вы частично оплачиваете товары ранее накопленными баллами, то новые баллы будут начисляться на ту часть
          покупки, которая была оплачена деньгами.</p>
        <h2>Списание баллов</h2>
        <p><b>Запомните главную формулу: 1 балл = 1 рубль.</b></p>
        <p>Оплата товаров баллами возможна до 50% суммы чека, а оплата периодов до 100% их стоимости
          при условии оплаты стоимости периодов не менее 1 ₽. Минимальная сумма для списания не ограничена.</p>
        <p><b>Мы предлагаем уникальную возможность только для держателей карт без
          оплаченного периода: оплатите накопленными баллами период любой длительности и получайте доступ к выгодным
          ценам!</b></p>
        <p>Воспользоваться накопленными баллами вы сможете в течение 364 дней со дня активации
          баллов, то есть со следующего дня после покупки. В день покупки вы не можете воспользоваться баллами, поэтому
          срок их действия исчисляется со следующего дня.</p>
        <span class="attention">
          Общее количество чеков не должно превышать 5 в день и 30 в месяц. При достижении лимита, вы также можете приобретать товары, но уже без начисления баллов.
        </span>
      </section>
    </div>

    <section class="answers">
      <h1>Ответы на самые популярные вопросы</h1>
      <div class="answers">
        <div class="answer" @click='openPopup("REASON_TO_PAY")'>
          <img src="https://pictures.apteka-april.ru/generic/loyal/1.svg" alt="">
          <span>Зачем мне нужно оплачивать период?</span>
          <UiCArrowSVG/>
        </div>
        <div class="answer" @click='openPopup("NO_PAY")'>
          <img src="https://pictures.apteka-april.ru/generic/loyal/3.svg" alt="">
          <span>Если я не буду оплачивать периоды, зачем мне карта лояльности?</span>
          <UiCArrowSVG/>
        </div>
        <div class="answer" @click='openPopup("FORGET_PAY")'>
          <img src="https://pictures.apteka-april.ru/generic/loyal/5.svg" alt="">
          <span>Что делать, если я забуду оплатить периоды на будущий месяц?</span>
          <UiCArrowSVG/>
        </div>
        <div class="answer" @click='openPopup("WHY_CHEAP")'>
          <img src="https://pictures.apteka-april.ru/generic/loyal/2.svg" alt="">
          <span>А почему так дёшево? <br> У вас сертифицированные препараты?</span>
          <UiCArrowSVG/>
        </div>
        <div class="answer" @click='openPopup("NEED_PLASTIC")'>
          <img src="https://pictures.apteka-april.ru/generic/loyal/4.svg" alt="">
          <span>Нужно ли носить с собой пластиковую карту?</span>
          <UiCArrowSVG/>
        </div>
        <div class="answer" @click='openPopup("CHANGE_NUM")'>
          <img src="https://pictures.apteka-april.ru/generic/loyal/6.svg" alt="">
          <span>Как поменять номер телефона, привязанный к карте программы лояльности?</span>
          <UiCArrowSVG/>
        </div>
      </div>
    </section>

    <template v-if="isMobile">
      <UiCMobileBottomTooltip v-if="isOpenedMobileBottomTooltip" is-hide-footer
                              :mobile-bottom-tooltip-name="isOpenedMobileBottomTooltip"
                              @close="closeMobileBottomTooltip">
        <!--        <template v-if="1 === tooltipTarget">-->
        <!--          <template v-slot:title>-->
        <!--            Информация-->
        <!--          </template>-->
        <!--          <template v-slot:text>-->
        <!--            <div>Клубные цены — это специальные низкие цены, по которым товары доступны участникам программы лояльности-->
        <!--              с оплаченным периодом.-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </template>-->
        <!--        <template v-else-if="2 === tooltipTarget">-->
        <!--          <template v-slot:title>-->
        <!--            Информация-->
        <!--          </template>-->
        <!--          <template v-slot:text>-->
        <!--            <div>Помимо лекарственных препаратов и БАДов, в сети аптек «Апрель» широкий выбор товаров для детей и мам,-->
        <!--              средств для красоты и гигиены, медицинской техники и других категорий товаров.-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </template>-->
      </UiCMobileBottomTooltip>
    </template>
    <template v-else>
      <UiCModalWindow :is-opened="popupOpened" @close="closePopup">
        <div class="container">
          <span class="icon close" @close="closePopup"/>

          <template v-if='"EXAMPLE" === popupTarget'>
            <section>
              <h1>Пример из практики</h1>
              <p>Саша простыл, а впереди праздники, и ему необходимо как можно скорее «встать� на ноги». Он заказывает
                на сайте аптеки «Апрель» все необходимые средства:</p>
            </section>
          </template>
          <template v-else-if='"REASON_TO_PAY" === popupTarget'>
            <section>
              <h1>Зачем мне нужно оплачивать период?</h1>
              <p>Оплата периода открывает вам доступ к пользованию экстремально
                низкими клубными ценами нашей сети.</p>
              <p><b>Стоимость оплаченного
                периода окупается в среднем за 1-2 покупки за счёт возможности приобретения товаров по экстремально
                низким ценам.</b></p>
              <p>
                Клубные цены доступны для всех категорий товаров в
                <NuxtLink class="hover-bottom-line" :to="{name:'catalog'}">каталоге.</NuxtLink>
              </p>
              <ul>
                <li>
                  <a href="catalog/396070-lekarstvennye_preparaty_i_bady" class="hover-bottom-line">
                    Лекарственные препараты и БАДы
                  </a>.
                </li>
                <li><a href="catalog/396198-medicinskaya_tehnika" class="hover-bottom-line">
                  Медицинская техника
                </a>.
                </li>
                <li>Товары
                  <a href="catalog/400010-mat_i_ditya" class="hover-bottom-line">
                    для детей и мам
                  </a>
                  : от
                  питания до игрушек.
                </li>
                <li>Средства
                  <a href="catalog/398631-gigiena_i_uhod" class="hover-bottom-line">
                    по уходу за личной
                    гигиеной
                  </a>.
                </li>
                <li>Товары
                  <a href="catalog/398611-krasota_i_zdorove" class="hover-bottom-line">
                    для красоты и здоровья
                  </a>.
                </li>
              </ul>
            </section>
            <section>
              <img src="https://pictures.apteka-april.ru/generic/loyal/online%20pharmacy.svg" alt="">
            </section>
          </template>
          <template v-else-if='"NO_PAY" === popupTarget'>
            <section>
              <h1>Зачем мне карта лояльности, если я не буду оплачивать периоды?</h1>
              <p><b>Без оплаченного периода вы становитесь участником бонусной системы «Апрель».</b></p>
              <p>Баллы начисляются на весь ассортимент, кроме товаров, участвующих в акциях. Количество баллов за
                определённый товар вы сможете увидеть на ценниках в аптеках и суммарно в чеке по факту покупки.</p>
              <p>Если вы частично оплачиваете товары ранее накопленными баллами, то новые баллы будут начисляться на ту
                часть покупки, которая была оплачена деньгами.</p>
              <p><b>Запомните главную формулу: 1 балл = 1 рубль.</b></p>
              <p>Оплата товаров баллами возможна до 50% суммы чека, а оплата периодов до 100% их стоимости при условии
                оплаты стоимости периодов не менее 1 ₽. Минимальная сумма для списания не ограничена.</p>
              <p>Воспользоваться накопленными баллами вы сможете в течение 364 дней со дня активации баллов, то есть со
                следующего дня после покупки. В день покупки вы не можете воспользоваться баллами, поэтому срок их
                действия исчисляется со следующего дня.</p>
              <p>Общее количество чеков не должно превышать 5 в день и 30 в месяц. При достижении лимита, вы также
                можете приобретать товары, но уже без начисления баллов.</p>
            </section>
            <section>
              <img src="https://pictures.apteka-april.ru/generic/loyal/il_card_without_subscribe.svg" alt="">
            </section>
          </template>
          <template v-else-if='"FORGET_PAY" === popupTarget'>
            <section>
              <h1>Что делать, если я забуду оплатить период на будущий месяц?</h1>
              <p><b>Вы можете оформить подписку «Апрель» — это автоматическое продление периодов по карте программы
                лояльности «Апрель+Аптечный клуб».</b></p>
              <p>Теперь вам не нужно беспокоиться и следить, когда заканчивается оплаченный период по карте. Просто
                воспользуйтесь подпиской «Апрель», чтобы непрерывно получать доступ к клубным ценам и приобретать товары
                по самым низким ценам.</p>

              <ul>
                <li>Выберите подходящий для себя период продления — 1, 3, 6 или 12 месяцев и приобретайте товары по
                  самым низким ценам. Заметьте, чем дольше период, тем выгоднее условия.
                </li>
                <li>Привяжите банковскую карту в личном кабинете.</li>
                <li>Подтвердите согласие на обработку персональных данных и правила оформления подписки.</li>
              </ul>

              <p>Подписку можно отменить в любое время, нажав на кнопку <b>«Отменить»</b> в разделе <b>Подписка
                «Апрель»</b>.</p>

            </section>
            <section>
              <h3>Преимущества подписки «Апрель»</h3>
              <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage1.svg"> <span>Постоянный доступ к клубным ценам</span>
              </div>
              <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage2.svg"> <span>Больше не надо помнить о дате завершения периода</span>
              </div>
              <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage3.svg"> <span>Стоимость оплаченного периода окупается в среднем за 1-2 покупки</span>
              </div>
              <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage4.svg"> <span>Уникальные предложения для пользователей подписки</span>
              </div>
            </section>
          </template>
          <template v-else-if='"NEED_PLASTIC" === popupTarget'>
            <section>
              <h1>Нужно ли носить с собой пластиковую карту?</h1>
              <p>При оплате покупок в аптеке необходимо предъявить пластиковую карту программы лояльности «Апрель +
                Аптечный клуб» или виртуальную карту, которую можно найти в мобильном приложении «Аптека Апрель».</p>
              <p>Найдите приложение «Аптека Апрель» в магазине приложений на вашем телефоне, устанавливайте и бронируйте
                препараты выгодно!</p>
            </section>
            <section>
              <img src="https://pictures.apteka-april.ru/generic/loyal/il_qr_app.svg" alt="">
            </section>
          </template>
          <template v-else-if='"WHY_CHEAP" === popupTarget'>
            <section>
              <h1>А почему так дёшево? У вас сертифицированные препараты?</h1>
              <p>Мы занимаемся продажей только сертифицированных лекарственных препаратов и БАДов с поставками напрямую
                от производителей. С ассортиментом вы можете ознакомиться в нашем
                <NuxtLink :to="{name:'catalog'}" class="hover-bottom-line">каталоге.</NuxtLink>
              </p>

            </section>
            <section>
              <img src="https://pictures.apteka-april.ru/generic/loyal/il_certificate.svg" alt="">
            </section>
          </template>
          <template v-else-if='"CHANGE_NUM" === popupTarget'>
            <section>
              <h1>Как поменять номер, привязанный к карте программы лояльности?</h1>
              <p>Для того, чтобы поменять номер телефона, привязанный к карте программы лояльности, вам необходимо:</p>
              <ul>
                <li>Обратиться в любую аптеку нашей сети и написать заявление о смене номера.</li>
                <li>Или зайти в Профиль → Настройки → Номер телефона и выполнить замену номера телефона.</li>
              </ul>
            </section>
            <section>
              <img src="https://pictures.apteka-april.ru/generic/loyal/il_phone_number.svg" alt="">
            </section>
          </template>
        </div>
      </UiCModalWindow>
    </template>

    <template v-if="isMobile">
      <UiCBottomBar scroll-top :is-opened="popupOpened" :title="bottomBarTitle" @close="closePopup">
        <template v-if='"EXAMPLE" === popupTarget'>
          <section>
            <p>Саша простыл, а впереди праздники, и ему необходимо как можно скорее «встать� на ноги». Он заказывает
              на сайте аптеки «Апрель» все необходимые средства:</p>
          </section>
        </template>
        <template v-else-if='"REASON_TO_PAY" === popupTarget'>
          <section>
            <p>Оплата периода открывает вам доступ к пользованию экстремально
              низкими клубными ценами нашей сети.</p>
            <p><b>Стоимость оплаченного
              периода окупается в среднем за 1-2 покупки за счёт возможности приобретения товаров по экстремально
              низким ценам.</b></p>
            <p>
              Клубные цены доступны для всех категорий товаров в
              <NuxtLink class="hover-bottom-line" :to="{name:'catalog'}">каталоге.</NuxtLink>
            </p>
            <ul>
              <li>
                <a href="catalog/396070-lekarstvennye_preparaty_i_bady" class="hover-bottom-line">
                  Лекарственные препараты и БАДы
                </a>.
              </li>
              <li><a href="catalog/396198-medicinskaya_tehnika" class="hover-bottom-line">
                Медицинская техника
              </a>.
              </li>
              <li>Товары
                <a href="catalog/400010-mat_i_ditya" class="hover-bottom-line">
                  для детей и мам
                </a>
                : от
                питания до игрушек.
              </li>
              <li>Средства
                <a href="catalog/398631-gigiena_i_uhod" class="hover-bottom-line">
                  по уходу за личной
                  гигиеной
                </a>.
              </li>
              <li>Товары
                <a href="catalog/398611-krasota_i_zdorove" class="hover-bottom-line">
                  для красоты и здоровья
                </a>.
              </li>
            </ul>
          </section>
          <section>
            <img src="https://pictures.apteka-april.ru/generic/loyal/online%20pharmacy.svg" alt="">
          </section>
        </template>
        <template v-else-if='"NO_PAY" === popupTarget'>
          <section>
            <p><b>Без оплаченного периода вы становитесь участником бонусной системы «Апрель».</b></p>
            <p>Баллы начисляются на весь ассортимент, кроме товаров, участвующих в акциях. Количество баллов за
              определённый товар вы сможете увидеть на ценниках в аптеках и суммарно в чеке по факту покупки.</p>
            <p>Если вы частично оплачиваете товары ранее накопленными баллами, то новые баллы будут начисляться на ту
              часть покупки, которая была оплачена деньгами.</p>
            <p><b>Запомните главную формулу: 1 балл = 1 рубль.</b></p>
            <p>Оплата товаров баллами возможна до 50% суммы чека, а оплата периодов до 100% их стоимости при условии
              оплаты стоимости периодов не менее 1 ₽. Минимальная сумма для списания не ограничена.</p>
            <p>Воспользоваться накопленными баллами вы сможете в течение 364 дней со дня активации баллов, то есть со
              следующего дня после покупки. В день покупки вы не можете воспользоваться баллами, поэтому срок их
              действия исчисляется со следующего дня.</p>
            <p>Общее количество чеков не должно превышать 5 в день и 30 в месяц. При достижении лимита, вы также
              можете приобретать товары, но уже без начисления баллов.</p>
          </section>
          <section>
            <img src="https://pictures.apteka-april.ru/generic/loyal/il_card_without_subscribe.svg" alt="">
          </section>
        </template>
        <template v-else-if='"FORGET_PAY" === popupTarget'>
          <section>
            <p><b>Вы можете оформить подписку «Апрель» — это автоматическое продление периодов по карте программы
              лояльности «Апрель+Аптечный клуб».</b></p>
            <p>Теперь вам не нужно беспокоиться и следить, когда заканчивается оплаченный период по карте. Просто
              воспользуйтесь подпиской «Апрель», чтобы непрерывно получать доступ к клубным ценам и приобретать товары
              по самым низким ценам.</p>

            <ul>
              <li>Выберите подходящий для себя период продления — 1, 3, 6 или 12 месяцев и приобретайте товары по
                самым низким ценам. Заметьте, чем дольше период, тем выгоднее условия.
              </li>
              <li>Привяжите банковскую карту в личном кабинете.</li>
              <li>Подтвердите согласие на обработку персональных данных и правила оформления подписки.</li>
            </ul>

            <p>Подписку можно отменить в любое время, нажав на кнопку <b>«Отменить»</b> в разделе <b>Подписка
              «Апрель»</b>.</p>

          </section>
          <section>
            <h3>Преимущества подписки «Апрель»</h3>
            <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage1.svg"> <span>Постоянный доступ к клубным ценам</span>
            </div>
            <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage2.svg"> <span>Больше не надо помнить о дате завершения периода</span>
            </div>
            <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage3.svg"> <span>Стоимость оплаченного периода окупается в среднем за 1-2 покупки</span>
            </div>
            <div class="advantage"><img src="https://pictures.apteka-april.ru/generic/loyal/advantage4.svg"> <span>Уникальные предложения для пользователей подписки</span>
            </div>
          </section>
        </template>
        <template v-else-if='"NEED_PLASTIC" === popupTarget'>
          <section>
            <p>При оплате покупок в аптеке необходимо предъявить пластиковую карту программы лояльности «Апрель +
              Аптечный клуб» или виртуальную карту, которую можно найти в мобильном приложении «Аптека Апрель».</p>
            <p>Найдите приложение «Аптека Апрель» в магазине приложений на вашем телефоне, устанавливайте и бронируйте
              препараты выгодно!</p>
          </section>
          <section>
            <img src="https://pictures.apteka-april.ru/generic/loyal/il_qr_app.svg" alt="">
          </section>
        </template>
        <template v-else-if='"WHY_CHEAP" === popupTarget'>
          <section>
            <p>Мы занимаемся продажей только сертифицированных лекарственных препаратов и БАДов с поставками напрямую
              от производителей. С ассортиментом вы можете ознакомиться в нашем
              <NuxtLink :to="{name:'catalog'}" class="hover-bottom-line">каталоге.</NuxtLink>
            </p>

          </section>
          <section>
            <img src="https://pictures.apteka-april.ru/generic/loyal/il_certificate.svg" alt="">
          </section>
        </template>
        <template v-else-if='"CHANGE_NUM" === popupTarget'>
          <section>
            <p>Для того, чтобы поменять номер телефона, привязанный к карте программы лояльности, вам необходимо:</p>
            <ul>
              <li>Обратиться в любую аптеку нашей сети и написать заявление о смене номера.</li>
              <li>Или зайти в Профиль → Настройки → Номер телефона и выполнить замену номера телефона.</li>
            </ul>
          </section>
          <section>
            <img src="https://pictures.apteka-april.ru/generic/loyal/il_phone_number.svg" alt="">
          </section>
        </template>
      </UiCBottomBar>
    </template>
  </main>
</template>

<style scoped>
.v-loyal {
  margin: 0 auto;
  max-width: 1368px
}

.v-loyal > .banner {
  background: url(https://pictures.apteka-april.ru/generic/loyal/main_banner.webp) 50% no-repeat;
  background-size: contain;
  display: flex;
  padding: 150px
}

.v-loyal > .banner > .wrap {
  margin: auto
}

.v-loyal > .banner > .wrap > h1 {
  font-weight: 600;
  font-size: 36px;
  line-height: 47px;
  text-align: center
}

.v-loyal > .banner > .wrap > .description {
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  text-align: center
}

.v-loyal > .banner > .wrap > .buttons {
  display: flex;
  margin-top: 50px;
  justify-content: center
}

.v-loyal > .banner > .wrap > .buttons > .c-button:first-of-type {
  margin-right: 10px
}

.v-loyal > .pay-less > h1 {
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center
}

.v-loyal > .pay-less > .steps {
  display: flex
}

.v-loyal > .pay-less > .steps > .step {
  padding-left: 15px;
  padding-right: 15px;
  flex: 1
}

.v-loyal > .pay-less > .steps > .step > .images-title > .images {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.v-loyal > .pay-less > .steps > .step > .images-title > .images > .number {
  display: block;
  width: 30px;
  height: 60px;
  background-color: #ff0089
}

.v-loyal > .pay-less > .steps > .step > .images-title > .images > .number.one {
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjguNjA4IDQ1LjZ2OC40NDhIMi43ODRWNDUuNmg4LjgzMlYxMS44MDhjLS41MTIgMi4zMDQtMS4zNDQgNC4wOTYtMi40OTYgNS4zNzYtMS4xNTIgMS4yMTYtMi4zNjggMi4wOC0zLjY0OCAyLjU5Mi0xLjI4LjUxMi0yLjQzMi44MzItMy40NTYuOTZDLjk5MiAyMC44LjMyIDIwLjgzMiAwIDIwLjgzMlYxMC4xNzZjLjM4NC4wNjQgMS4yMTYuMDY0IDIuNDk2IDAgMS4yOC0uMTI4IDIuNjU2LS41MTIgNC4xMjgtMS4xNTIgMS41MzYtLjY0IDIuODgtMS42NjQgNC4wMzItMy4wNzJDMTEuODA4IDQuNTQ0IDEyLjQ0OCAyLjU2IDEyLjU3NiAwaDguNjR2NDUuNmg3LjM5MnoiIGZpbGw9IiNGRjAwODkiLz48L3N2Zz4=");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjguNjA4IDQ1LjZ2OC40NDhIMi43ODRWNDUuNmg4LjgzMlYxMS44MDhjLS41MTIgMi4zMDQtMS4zNDQgNC4wOTYtMi40OTYgNS4zNzYtMS4xNTIgMS4yMTYtMi4zNjggMi4wOC0zLjY0OCAyLjU5Mi0xLjI4LjUxMi0yLjQzMi44MzItMy40NTYuOTZDLjk5MiAyMC44LjMyIDIwLjgzMiAwIDIwLjgzMlYxMC4xNzZjLjM4NC4wNjQgMS4yMTYuMDY0IDIuNDk2IDAgMS4yOC0uMTI4IDIuNjU2LS41MTIgNC4xMjgtMS4xNTIgMS41MzYtLjY0IDIuODgtMS42NjQgNC4wMzItMy4wNzJDMTEuODA4IDQuNTQ0IDEyLjQ0OCAyLjU2IDEyLjU3NiAwaDguNjR2NDUuNmg3LjM5MnoiIGZpbGw9IiNGRjAwODkiLz48L3N2Zz4=")
}

.v-loyal > .pay-less > .steps > .step > .images-title > .images > .number.two {
  width: 41px;
  height: 55px;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNTQuNzJ2LTguMTZsMi40LTEuMjQ4YzEuNjY0LS44OTYgMy43NDQtMi4wOCA2LjI0LTMuNTUyYTE2NC40NTIgMTY0LjQ1MiAwIDAwNy44NzItNS4xODQgNjcuMzgxIDY3LjM4MSAwIDAwNy41ODQtNi4zMzZjMi4zMDQtMi4zMDQgNC4wNjQtNC42NzIgNS4yOC03LjEwNCAxLjQ3Mi0yLjk0NCAxLjkyLTUuNTM2IDEuMzQ0LTcuNzc2LS41MTItMi4yNC0xLjY5Ni0zLjk2OC0zLjU1Mi01LjE4NC0xLjg1Ni0xLjI4LTQuMDY0LTEuOTItNi42MjQtMS45Mi0zLjQ1NiAwLTYuMjA4IDEuMTUyLTguMjU2IDMuNDU2LTIuMDQ4IDIuMzA0LTIuNzUyIDUuODU2LTIuMTEyIDEwLjY1NmwtOS4xMi0xLjI0OGMtLjQ0OC00LjQxNi4xNi04LjE5MiAxLjgyNC0xMS4zMjggMS43MjgtMy4xMzYgNC4yMjQtNS41MzYgNy40ODgtNy4yQzEzLjYzMi44NjQgMTcuMzc2IDAgMjEuNiAwYzMuNDU2IDAgNi41Ni42NCA5LjMxMiAxLjkyIDIuNzUyIDEuMjggNC45NiAzLjA0IDYuNjI0IDUuMjggMS43MjggMi4yNCAyLjcyIDQuOCAyLjk3NiA3LjY4LjI1NiAyLjg4LS40MTYgNS45NTItMi4wMTYgOS4yMTYtMS4yMTYgMi40MzItMi45MTIgNC43NjgtNS4wODggNy4wMDhhNTEuMzEzIDUxLjMxMyAwIDAxLTYuOTEyIDUuOTUyYy0yLjQzMiAxLjc5Mi00LjgzMiAzLjM2LTcuMiA0LjcwNC0yLjMwNCAxLjI4LTQuMzIgMi4zMzYtNi4wNDggMy4xNjgtMS43MjguNzY4LTIuODggMS4yMTYtMy40NTYgMS4zNDRoMzEuNjh2OC40NDhIMHoiIGZpbGw9IiNGRjAwODkiLz48L3N2Zz4=");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNTQuNzJ2LTguMTZsMi40LTEuMjQ4YzEuNjY0LS44OTYgMy43NDQtMi4wOCA2LjI0LTMuNTUyYTE2NC40NTIgMTY0LjQ1MiAwIDAwNy44NzItNS4xODQgNjcuMzgxIDY3LjM4MSAwIDAwNy41ODQtNi4zMzZjMi4zMDQtMi4zMDQgNC4wNjQtNC42NzIgNS4yOC03LjEwNCAxLjQ3Mi0yLjk0NCAxLjkyLTUuNTM2IDEuMzQ0LTcuNzc2LS41MTItMi4yNC0xLjY5Ni0zLjk2OC0zLjU1Mi01LjE4NC0xLjg1Ni0xLjI4LTQuMDY0LTEuOTItNi42MjQtMS45Mi0zLjQ1NiAwLTYuMjA4IDEuMTUyLTguMjU2IDMuNDU2LTIuMDQ4IDIuMzA0LTIuNzUyIDUuODU2LTIuMTEyIDEwLjY1NmwtOS4xMi0xLjI0OGMtLjQ0OC00LjQxNi4xNi04LjE5MiAxLjgyNC0xMS4zMjggMS43MjgtMy4xMzYgNC4yMjQtNS41MzYgNy40ODgtNy4yQzEzLjYzMi44NjQgMTcuMzc2IDAgMjEuNiAwYzMuNDU2IDAgNi41Ni42NCA5LjMxMiAxLjkyIDIuNzUyIDEuMjggNC45NiAzLjA0IDYuNjI0IDUuMjggMS43MjggMi4yNCAyLjcyIDQuOCAyLjk3NiA3LjY4LjI1NiAyLjg4LS40MTYgNS45NTItMi4wMTYgOS4yMTYtMS4yMTYgMi40MzItMi45MTIgNC43NjgtNS4wODggNy4wMDhhNTEuMzEzIDUxLjMxMyAwIDAxLTYuOTEyIDUuOTUyYy0yLjQzMiAxLjc5Mi00LjgzMiAzLjM2LTcuMiA0LjcwNC0yLjMwNCAxLjI4LTQuMzIgMi4zMzYtNi4wNDggMy4xNjgtMS43MjguNzY4LTIuODggMS4yMTYtMy40NTYgMS4zNDRoMzEuNjh2OC40NDhIMHoiIGZpbGw9IiNGRjAwODkiLz48L3N2Zz4=")
}

.v-loyal > .pay-less > .steps > .step > .images-title > .images > .number.three {
  width: 44px;
  height: 58px;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIyLjQ2NCA1Ny41MzFjLTQuMjg4IDAtOC4xMjgtLjc1Ni0xMS41Mi0yLjI3LTMuMzkyLTEuNTEyLTYuMDgtMy43ODItOC4wNjQtNi44MDhDLjk2IDQ1LjM2IDAgNDEuNTQ1IDAgMzcuMDA2bDkuNDA4LTEuMzgyYy4xMjggNC4yNzYgMS40MDggNy41NjYgMy44NCA5Ljg2OCAyLjQ5NiAyLjIzNyA1LjYzMiAzLjM1NSA5LjQwOCAzLjM1NSAzLjI2NCAwIDUuOTUyLS44ODggOC4wNjQtMi42NjQgMi4xNzYtMS44NDIgMy4yNjQtNC4xNDUgMy4yNjQtNi45MDggMC0yLjE3LS41NDQtMy44NDgtMS42MzItNS4wMzItMS4wODgtMS4yNS0yLjQ2NC0yLjEzOS00LjEyOC0yLjY2NS0xLjYtLjU5Mi0zLjItLjg4OC00LjgtLjg4OGgtNi40MzJ2LTUuMjNoNi42MjRjMi42MjQgMCA0Ljg2NC0uNTYgNi43Mi0xLjY3OCAxLjkyLTEuMTE4IDIuODgtMi45NiAyLjg4LTUuNTI2IDAtMy4wMjYtMS4wMjQtNS40MjctMy4wNzItNy4yMDQtMi4wNDgtMS43NzYtNC44LTIuNjY0LTguMjU2LTIuNjY0LTIuNzUyIDAtNC45OTIuNTkyLTYuNzIgMS43NzYtMS43MjggMS4xODQtMy4wNCAyLjYzMi0zLjkzNiA0LjM0Mi0uODMyIDEuNzEtMS4yOCAzLjM1NS0xLjM0NCA0LjkzNGwtOC43MzYtMS40OGMwLTEuMDUzLjMyLTIuNTMzLjk2LTQuNDQuNjQtMS45NzQgMS42OTYtMy45OCAzLjE2OC02LjAyIDEuNTM2LTIuMTA1IDMuNjE2LTMuODgyIDYuMjQtNS4zMjlDMTQuMjA4LjcyNCAxNy41NjggMCAyMS42IDBjNi40NjQgMCAxMS40ODggMS40NDcgMTUuMDcyIDQuMzQyIDMuNTg0IDIuODI5IDUuMzc2IDYuNjc3IDUuMzc2IDExLjU0NiAwIDMuMjIzLS44OTYgNS45ODYtMi42ODggOC4yODktMS43MjggMi4zMDMtNC4yODggMy42ODQtNy42OCA0LjE0NSAzLjM5Mi40NiA2LjE0NCAxLjkwOCA4LjI1NiA0LjM0MiAyLjExMiAyLjM2OCAzLjE2OCA1LjI5NSAzLjE2OCA4Ljc4MiAwIDMuMzU1LS44OTYgNi4yNS0yLjY4OCA4LjY4NC0xLjcyOCAyLjM2OS00LjE2IDQuMjEtNy4yOTYgNS41MjYtMy4xMzYgMS4yNS02LjY4OCAxLjg3NS0xMC42NTYgMS44NzV6IiBmaWxsPSIjRkYwMDg5Ii8+PC9zdmc+");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIyLjQ2NCA1Ny41MzFjLTQuMjg4IDAtOC4xMjgtLjc1Ni0xMS41Mi0yLjI3LTMuMzkyLTEuNTEyLTYuMDgtMy43ODItOC4wNjQtNi44MDhDLjk2IDQ1LjM2IDAgNDEuNTQ1IDAgMzcuMDA2bDkuNDA4LTEuMzgyYy4xMjggNC4yNzYgMS40MDggNy41NjYgMy44NCA5Ljg2OCAyLjQ5NiAyLjIzNyA1LjYzMiAzLjM1NSA5LjQwOCAzLjM1NSAzLjI2NCAwIDUuOTUyLS44ODggOC4wNjQtMi42NjQgMi4xNzYtMS44NDIgMy4yNjQtNC4xNDUgMy4yNjQtNi45MDggMC0yLjE3LS41NDQtMy44NDgtMS42MzItNS4wMzItMS4wODgtMS4yNS0yLjQ2NC0yLjEzOS00LjEyOC0yLjY2NS0xLjYtLjU5Mi0zLjItLjg4OC00LjgtLjg4OGgtNi40MzJ2LTUuMjNoNi42MjRjMi42MjQgMCA0Ljg2NC0uNTYgNi43Mi0xLjY3OCAxLjkyLTEuMTE4IDIuODgtMi45NiAyLjg4LTUuNTI2IDAtMy4wMjYtMS4wMjQtNS40MjctMy4wNzItNy4yMDQtMi4wNDgtMS43NzYtNC44LTIuNjY0LTguMjU2LTIuNjY0LTIuNzUyIDAtNC45OTIuNTkyLTYuNzIgMS43NzYtMS43MjggMS4xODQtMy4wNCAyLjYzMi0zLjkzNiA0LjM0Mi0uODMyIDEuNzEtMS4yOCAzLjM1NS0xLjM0NCA0LjkzNGwtOC43MzYtMS40OGMwLTEuMDUzLjMyLTIuNTMzLjk2LTQuNDQuNjQtMS45NzQgMS42OTYtMy45OCAzLjE2OC02LjAyIDEuNTM2LTIuMTA1IDMuNjE2LTMuODgyIDYuMjQtNS4zMjlDMTQuMjA4LjcyNCAxNy41NjggMCAyMS42IDBjNi40NjQgMCAxMS40ODggMS40NDcgMTUuMDcyIDQuMzQyIDMuNTg0IDIuODI5IDUuMzc2IDYuNjc3IDUuMzc2IDExLjU0NiAwIDMuMjIzLS44OTYgNS45ODYtMi42ODggOC4yODktMS43MjggMi4zMDMtNC4yODggMy42ODQtNy42OCA0LjE0NSAzLjM5Mi40NiA2LjE0NCAxLjkwOCA4LjI1NiA0LjM0MiAyLjExMiAyLjM2OCAzLjE2OCA1LjI5NSAzLjE2OCA4Ljc4MiAwIDMuMzU1LS44OTYgNi4yNS0yLjY4OCA4LjY4NC0xLjcyOCAyLjM2OS00LjE2IDQuMjEtNy4yOTYgNS41MjYtMy4xMzYgMS4yNS02LjY4OCAxLjg3NS0xMC42NTYgMS44NzV6IiBmaWxsPSIjRkYwMDg5Ii8+PC9zdmc+")
}

.v-loyal > .pay-less > .steps > .step > .images-title > .images > .arrow-next-step {
  display: block;
  width: 70px;
  height: 24px;
  -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjggOUw1MyAuMzR2MTcuMzJMNjggOXpNMCAxMC41aDU0LjV2LTNIMHYzeiIgZmlsbD0iI0ZGMDA4OSIvPjwvc3ZnPg==");
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjggOUw1MyAuMzR2MTcuMzJMNjggOXpNMCAxMC41aDU0LjV2LTNIMHYzeiIgZmlsbD0iI0ZGMDA4OSIvPjwvc3ZnPg==");
  background-color: #ff0089
}

.v-loyal > .pay-less > .steps > .step > .images-title > h2 {
  font-weight: 600;
  font-size: 20px;
  line-height: 131.4%
}

.v-loyal > .pay-less > .steps > .step > .images-title > h2 > span {
  display: none
}

.v-loyal > .pay-less > .steps > .step > span {
  font-weight: 400;
  font-size: 16px;
  line-height: 139.9%
}

.v-loyal > .pay-less > .steps > .step > ul {
  font-size: 16px;
  line-height: 139.9%
}

.v-loyal > .pay-less > .steps > .step > ul:not(.list) {
  padding-right: 25px;
  font-weight: 400;
  padding-left: 0
}

.v-loyal > .pay-less > .steps > .step > ul:not(.list) > li {
  list-style-type: none
}

.v-loyal > .systems {
  display: flex
}

.v-loyal > .systems > section {
  flex: 1
}

.v-loyal > .systems > section > h1 {
  font-weight: 600;
  font-size: 36px;
  line-height: 139.9%
}

.v-loyal > .systems > section > h2 {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px
}

.v-loyal > .systems > section > h3 {
  font-weight: 600;
  font-size: 18px;
  line-height: 129.9%;
  text-align: center
}

.v-loyal > .systems > section > span {
  font-weight: 400;
  font-size: 16px;
  line-height: 139.9%
}

.v-loyal > .systems > section > span > b > a {
  color: #3f51b5;
  cursor: pointer
}

.v-loyal > .systems > section > span .c-tooltip-icon, .v-loyal > .systems > section > span > .help-alert {
  display: inline-block
}

.v-loyal > .systems > section > span .c-tooltip-icon > .icon {
  border-radius: 50%
}

.v-loyal > .systems > section > span .c-tooltip-icon > .icon > .question2 {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center
}

.v-loyal > .systems > section > ul {
  font-weight: 400;
  font-size: 16px;
  line-height: 139.9%;
  padding-left: 25px
}

.v-loyal > .systems > section > ul > li {
  margin-bottom: 1em
}

.v-loyal > .systems > section > .attention {
  font-weight: 400;
  font-size: 12px;
  line-height: 139.9%;
  color: #596175
}

.v-loyal > .systems > section > table {
  border: 1px solid #e7e7ea;
  border-collapse: collapse;
  margin: 20px 0;
  width: 100%
}

.v-loyal > .systems > section > table > thead > tr > th {
  border: 1px solid #e7e7ea;
  padding: 8px
}

.v-loyal > .systems > section > table > tbody > tr > td {
  border: 1px solid #e7e7ea;
  padding: 5px;
  text-align: center
}

.v-loyal > .systems > section > table > tbody > tr > td.red {
  color: #f14a4a
}

.v-loyal > .systems > section > table > tbody > tr > td:first-child {
  font-weight: 600
}

.v-loyal > .systems > section > table > tbody > tr > td:last-child {
  font-weight: 600;
  color: #ff0089;
  display: flex;
  justify-content: center;
  align-items: center
}

.v-loyal > .systems > section > table > tbody > tr > td:last-child > .icon {
  margin-right: 5px;
  background-color: #000
}

.v-loyal > .buttons {
  display: flex;
  margin: 20px auto;
  justify-content: center
}

.v-loyal > .buttons > .c-button:first-of-type {
  margin-right: 10px
}

.v-loyal > .answers > h1 {
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center
}

.v-loyal > .answers > .answers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around
}

.v-loyal > .answers > .answers > .answer {
  position: relative;
  background: linear-gradient(120deg, #f7f8fc, #eaeeff 100.07%);
  border-radius: 5px;
  box-sizing: border-box;
  width: 443px;
  height: 160px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 40px
}

.v-loyal > .answers > .answers > .answer > img {
  width: 80px;
  height: 80px;
  margin-right: 30px
}

.v-loyal > .answers > .answers > .answer > :deep(.c-arrow-svg) {
  position: absolute;
  right: 10px;
  bottom: 10px;
  transform: rotate(45deg)
}

.v-loyal > .answers > .answers > .answer > span {
  font-weight: 600;
  font-size: 17px;
  line-height: 22px
}

.v-loyal > .answers > .answers > .answer:hover {
  cursor: pointer
}

.v-loyal > .answers > .answers > .answer:hover > :deep(.c-arrow-svg) > div > span:first-of-type {
  opacity: 1
}

.v-loyal > .answers > .answers > .answer:hover > :deep(.c-arrow-svg) > div > span:last-of-type {
  transform: translateX(4px)
}

.v-loyal > .not-authorized-banner {
  display: flex;
  background: url(https://pictures.apteka-april.ru/generic/loyal/banner%20QR_bg.webp) no-repeat;
  padding: 70px 600px 70px 70px
}

.v-loyal > .not-authorized-banner > section > h1 {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px
}

.v-loyal > .not-authorized-banner > section > h1 > a {
  color: #ff0089
}

.v-loyal > .not-authorized-banner > section > p {
  font-weight: 400;
  font-size: 16px;
  line-height: 132.9%;
  margin-bottom: 40px
}

.v-loyal > .not-authorized-banner > section > .mobile-apps-icons {
  display: flex;
  flex-wrap: wrap
}

.v-loyal > .not-authorized-banner > section > .mobile-apps-icons > a {
  height: 41px;
  width: 130px;
  margin-right: 15px
}

.v-loyal > .not-authorized-banner > section > .mobile-apps-icons > .app-store {
  background: url(https://pictures.apteka-april.ru/generic/loyal/app_store_badge.svg) 50% no-repeat;
  background-size: contain
}

.v-loyal > .not-authorized-banner > section > .mobile-apps-icons > .google-play {
  background: url(https://pictures.apteka-april.ru/generic/loyal/googleplay_badge.svg) 50% no-repeat;
  background-size: contain
}

.v-loyal > .not-authorized-banner > section > .mobile-apps-icons > .app-gallery {
  background: url(https://pictures.apteka-april.ru/generic/loyal/appgallery_badge.svg) 50% no-repeat;
  background-size: contain
}

.v-loyal > .not-authorized-banner > section > .mobile-apps-icons > .ru-store {
  background: url(https://pictures.apteka-april.ru/generic/loyal/rustore_badge.svg) 50% no-repeat;
  background-size: contain
}

.v-loyal > .c-modal-window > .modal {
  padding: 0;
  max-width: 97%;
  max-height: 100%
}

.v-loyal > .c-modal-window > .modal > .container {
  display: flex;
  padding-left: 45px;
  padding-right: 45px;
  max-width: 1368px;
  align-items: center;
  overflow: auto
}

.v-loyal > .c-modal-window > .modal > .container > .close {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  opacity: .7;
  width: 30px;
  height: 30px
}

.v-loyal > .c-modal-window > .modal > .container > .close:hover {
  opacity: 1
}

.v-loyal > .c-modal-window > .modal > .container > section {
  display: flex;
  flex-flow: column;
  padding-top: 45px;
  padding-bottom: 45px
}

.v-loyal > .c-modal-window > .modal > .container > section:first-of-type {
  flex: 1.5;
  margin-right: 100px
}

.v-loyal > .c-modal-window > .modal > .container > section:last-of-type {
  flex: 1
}

.v-loyal > .c-modal-window > .modal > .container > section.check {
  background: url(https://pictures.apteka-april.ru/generic/loyal/pic_check.svg);
  background-size: cover;
  height: 100%;
  padding-left: 25px;
  padding-right: 25px
}

.v-loyal > .c-modal-window > .modal > .container > section.check > h1 {
  text-align: center
}

.v-loyal > .c-modal-window > .modal > .container > section > h1 {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px
}

.v-loyal > .c-modal-window > .modal > .container > section > h2 {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  display: flex;
  justify-content: center
}

.v-loyal > .c-modal-window > .modal > .container > section > h2 > .action {
  background-color: #ff0089
}

.v-loyal > .c-modal-window > .modal > .container > section > h3 {
  font-weight: 600;
  font-size: 18px;
  line-height: 132.9%
}

.v-loyal > .c-modal-window > .modal > .container > section > h3 > a {
  cursor: pointer;
  color: #ff0089
}

.v-loyal > .c-modal-window > .modal > .container > section > p {
  font-weight: 400;
  font-size: 14px;
  line-height: 132.9%
}

.v-loyal > .c-modal-window > .modal > .container > section > p > a {
  color: #3f51b5
}

.v-loyal > .c-modal-window > .modal > .container > section > p > b > a {
  color: #ff0089
}

.v-loyal > .c-modal-window > .modal > .container > section > ul > li > a {
  color: #3f51b5
}

.v-loyal > .c-modal-window > .modal > .container > section > img {
  width: 100%
}

.v-loyal > .c-modal-window > .modal > .container > section > .buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px
}

.v-loyal > .c-modal-window > .modal > .container > section > .buttons > .c-button:first-of-type {
  margin-right: 10px
}

.v-loyal > .c-modal-window > .modal > .container > section > .buttons > .c-button, .v-loyal > .c-modal-window > .modal > .container > section > .c-button {
  max-width: none
}

.v-loyal > .c-modal-window > .modal > .container > section > table {
  width: 100%
}

.v-loyal > .c-modal-window > .modal > .container > section > table > thead > tr {
  text-align: left
}

.v-loyal > .c-modal-window > .modal > .container > section > table > tbody > .summary {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px
}

.v-loyal > .c-modal-window > .modal > .container > section > table > tbody > tr > td {
  padding-top: 7px;
  padding-bottom: 7px
}

.v-loyal > .c-modal-window > .modal > .container > section > .economy {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ff0089;
  padding-bottom: 20px;
  border-bottom: 1px dashed #818ca9
}

.v-loyal > .c-modal-window > .modal > .container > section > .postscript {
  font-weight: 400;
  font-size: 12px;
  line-height: 139.9%;
  color: #596175
}

.v-loyal > .c-modal-window > .modal > .container > section > .advantage {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  padding-right: 50px
}

.v-loyal > .c-modal-window > .modal > .container > section > .advantage > span {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-left: 20px
}

.v-loyal > .c-modal-window > .modal > .container > section > .mobile-apps-icons {
  display: flex;
  flex-wrap: wrap;
  background-position: 50%;
  margin-top: 15px
}

.v-loyal > .c-modal-window > .modal > .container > section > .mobile-apps-icons > a {
  height: 41px;
  width: 130px;
  margin-right: 15px
}

.v-loyal > .c-modal-window > .modal > .container > section > .mobile-apps-icons > .app-store {
  background: url(https://pictures.apteka-april.ru/generic/loyal/app_store_badge.svg) no-repeat;
  background-size: contain
}

.v-loyal > .c-modal-window > .modal > .container > section > .mobile-apps-icons > .google-play {
  background: url(https://pictures.apteka-april.ru/generic/loyal/googleplay_badge.svg) no-repeat;
  background-size: contain
}

.v-loyal > .c-modal-window > .modal > .container > section > .mobile-apps-icons > .app-gallery {
  background: url(https://pictures.apteka-april.ru/generic/loyal/appgallery_badge.svg) no-repeat;
  background-size: contain
}

.v-loyal > .c-modal-window > .modal > .container > section > .mobile-apps-icons > .ru-store {
  background: url(https://pictures.apteka-april.ru/generic/loyal/rustore_badge.svg) no-repeat;
  background-size: contain
}

.v-loyal > :deep(.c-bottom-bar) > .bar {
  padding: 0;
  overflow: auto
}

.v-loyal > :deep(.c-bottom-bar) > .bar > .top {
  padding: 25px 15px 0
}

.v-loyal > :deep(.c-bottom-bar) > .bar > .top > h2 {
  font-weight: 600
}

.v-loyal > :deep(.c-bottom-bar) > .bar > div {
  padding: 0 15px 20px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section:first-of-type {
  padding-top: 0
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section:not(.check):not(.apps) {
  padding-left: 15px;
  padding-right: 15px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section:not(.check):not(.apps):last-of-type {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check {
  background: url(https://pictures.apteka-april.ru/generic/loyal/pic_check.svg);
  background-size: cover;
  height: 100%;
  margin-top: 20px;
  padding: 50px 15px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check > h1 {
  text-align: center;
  margin-bottom: 15px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check > .table {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px dashed #818ca9
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check > .table > table {
  margin: auto
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check > .table > table > thead > tr {
  text-align: left
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check > .table > table > tbody > .summary {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check > .table > table > tbody > tr > td {
  padding-top: 5px;
  padding-bottom: 5px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.check > .table > table > tbody > tr > td.economy {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ff0089
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section.apps {
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  background: url(https://pictures.apteka-april.ru/generic/loyal/Mob%20banner%20QR_bg.webp) 50% no-repeat;
  background-size: cover
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > h1 {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > h2 {
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  display: flex;
  justify-content: center
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > h2 > .action {
  background-color: #ff0089
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > h3 {
  font-weight: 600;
  font-size: 13px;
  line-height: 150.4%
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > h3 > a {
  color: #ff0089
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > p {
  font-size: 13px;
  line-height: 150.4%;
  margin-top: 5px;
  margin-bottom: 5px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > p > a {
  color: #3f51b5
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > ul {
  padding-left: 20px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > ul > li {
  font-size: 13px;
  line-height: 132.9%
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > ul > li > a {
  color: #3f51b5
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > ol {
  padding-left: 20px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > img {
  width: 80%
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .buttons {
  display: flex;
  flex-flow: column
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .buttons > .c-button {
  max-width: none
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .buttons > .c-button:first-of-type {
  margin-bottom: 10px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .c-button {
  max-width: none
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .postscript {
  font-size: 10px;
  line-height: 12px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .advantages > .advantage {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  padding-right: 0
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .advantages > .advantage > span {
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  margin-left: 20px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .mobile-apps-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-position: 50%;
  margin: auto
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .mobile-apps-icons > a {
  height: 41px;
  width: 130px;
  margin-bottom: 5px
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .mobile-apps-icons > .app-store {
  background: url(https://pictures.apteka-april.ru/generic/loyal/app_store_badge.svg) no-repeat;
  background-size: contain
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .mobile-apps-icons > .google-play {
  background: url(https://pictures.apteka-april.ru/generic/loyal/googleplay_badge.svg) no-repeat;
  background-size: contain
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .mobile-apps-icons > .app-gallery {
  background: url(https://pictures.apteka-april.ru/generic/loyal/appgallery_badge.svg) no-repeat;
  background-size: contain
}

.v-loyal > :deep(.c-bottom-bar) > .bar > section > .mobile-apps-icons > .ru-store {
  background: url(https://pictures.apteka-april.ru/generic/loyal/rustore_badge.svg) no-repeat;
  background-size: contain
}

@media screen and (max-width: 1600px) {
  .v-loyal > .c-modal-window > .container > section > p {
    margin-top: 5px;
    margin-bottom: 5px
  }
}

@media screen and (max-width: 1400px) {
  .v-loyal > .systems {
    padding-left: 30px;
    padding-right: 30px
  }

  .v-loyal > .c-modal-window > .modal > .container > section.check > h1 {
    margin: 0;
    font-size: 20px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > h1 {
    font-size: 24px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > span, .v-loyal > .c-modal-window > .modal > .container > section > ul {
    font-size: 12px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > h2 {
    font-size: 16px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > h3 {
    font-size: 15px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > .economy {
    font-size: 14px;
    padding-bottom: 10px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > .postscript {
    font-size: 10px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > table > tbody, .v-loyal > .c-modal-window > .modal > .container > section > table > thead {
    font-size: 12px
  }

  .v-loyal > .c-modal-window > .modal > .container > section > table > tbody > .summary {
    font-size: 12px;
    line-height: 13px;
    padding-top: 5px;
    padding-bottom: 5px
  }
}

@media screen and (max-width: 1270px) {
  .v-loyal > .not-authorized-banner {
    padding-right: 450px;
    background-size: cover;
    display: flex;
    align-items: center;
    min-height: 200px
  }

  .v-loyal > .not-authorized-banner > section > h1 {
    font-size: 22px;
    line-height: 100%
  }

  .v-loyal > .not-authorized-banner > section > p {
    font-size: 12px;
    margin-bottom: 25px
  }

  .v-loyal > .not-authorized-banner > section > .mobile-apps-icons > a {
    margin-right: 5px;
    width: 110px
  }
}

@media screen and (max-width: 1070px) {
  .v-loyal > .banner {
    padding-top: 60px;
    padding-bottom: 60px
  }

  .v-loyal > .banner > .wrap > h1 {
    font-size: 30px
  }

  .v-loyal > .banner > .wrap > .description {
    font-size: 20px
  }

  .v-loyal > .banner > .wrap > .buttons {
    margin-top: 20px
  }

  .v-loyal > .not-authorized-banner {
    min-height: 285px;
    padding-top: unset;
    padding-bottom: unset
  }

  .v-loyal > .not-authorized-banner > section > h1 {
    font-size: 20px
  }

  .v-loyal > .not-authorized-banner > section > p {
    margin-bottom: 15px
  }

  .v-loyal > .not-authorized-banner > section > .mobile-apps-icons > a {
    margin: 0
  }
}

@media screen and (max-width: 850px) {
  .v-loyal {
    width: 100%;
    box-sizing: border-box
  }

  .v-loyal > .banner {
    background: url(https://pictures.apteka-april.ru/generic/loyal/main_banner_mob.svg) 50% no-repeat;
    padding: 0;
    flex-flow: column;
    align-items: center;
    background-size: cover
  }

  .v-loyal > .banner > .wrap {
    padding: 50px 10px;
    display: flex;
    flex-flow: column;
    align-items: center;
    box-sizing: border-box;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content
  }

  .v-loyal > .banner > .wrap > h1 {
    font-size: 22px;
    line-height: 18px
  }

  .v-loyal > .banner > .wrap > .description {
    font-size: 16px;
    line-height: 17px
  }

  .v-loyal > .buttons:last-of-type {
    margin-top: 0
  }

  .v-loyal > .pay-less {
    padding-left: 10px;
    padding-right: 10px
  }

  .v-loyal > .pay-less > h1 {
    font-size: 22px;
    line-height: 27px;
    text-align: left
  }

  .v-loyal > .pay-less > .steps {
    flex-flow: column
  }

  .v-loyal > .pay-less > .steps > .step {
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 10px
  }

  .v-loyal > .pay-less > .steps > .step > .images-title {
    display: flex
  }

  .v-loyal > .pay-less > .steps > .step > .images-title > .images > .number {
    display: none
  }

  .v-loyal > .pay-less > .steps > .step > .images-title > .images > img {
    width: 112px;
    height: 100px
  }

  .v-loyal > .pay-less > .steps > .step > .images-title > .images > .arrow-next-step {
    display: none
  }

  .v-loyal > .pay-less > .steps > .step > .images-title > h2 {
    font-size: 16px;
    line-height: 20px
  }

  .v-loyal > .pay-less > .steps > .step > .images-title > h2 > span {
    display: inline
  }

  .v-loyal > .pay-less > .steps > .step > ul {
    font-size: 13px;
    line-height: 145%;
    padding-left: 20px
  }

  .v-loyal > .pay-less > .steps > .step > ul:not(.list) {
    padding-left: 20px;
    padding-right: 0
  }

  .v-loyal > .pay-less > .steps > .step > ul:not(.list) > li {
    list-style-type: disc
  }

  .v-loyal > .systems {
    flex-flow: column;
    padding-left: 10px;
    padding-right: 10px
  }

  .v-loyal > .systems > section:first-of-type {
    border: 0;
    padding-right: 0;
    border-bottom: 2px solid #d6d6e1;
    padding-bottom: 30px
  }

  .v-loyal > .systems > section:last-of-type {
    padding: 0
  }

  .v-loyal > .systems > section > h1 {
    font-size: 22px;
    line-height: 27px
  }

  .v-loyal > .systems > section > h2, .v-loyal > .systems > section > h3 {
    font-size: 16px;
    line-height: 20px
  }

  .v-loyal > .systems > section > h3 {
    text-align: left
  }

  .v-loyal > .systems > section > span, .v-loyal > .systems > section > ul {
    font-size: 13px;
    line-height: 145%
  }

  .v-loyal > .systems > section > table {
    font-size: 12px
  }

  .v-loyal > .systems > section > .attention {
    font-size: 10px;
    line-height: 139.9%
  }

  .v-loyal > .buttons {
    flex-flow: column;
    padding-left: 10px;
    padding-right: 10px
  }

  .v-loyal > .buttons > .c-button {
    max-width: none;
    margin-bottom: 10px
  }

  .v-loyal > .buttons > .c-button:first-of-type {
    margin-right: 0
  }

  .v-loyal > .answers {
    padding-left: 10px;
    padding-right: 10px
  }

  .v-loyal > .answers > h1 {
    font-size: 22px;
    line-height: 27px;
    text-align: left
  }

  .v-loyal > .answers > .answers > .answer {
    width: 100%;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    padding: 10px
  }

  .v-loyal > .answers > .answers > .answer > :deep(.c-arrow-svg) {
    display: none
  }

  .v-loyal > .answers > .answers > .answer > img {
    width: 60px;
    height: 60px
  }

  .v-loyal > .answers > .answers > .answer > span {
    font-size: 13px;
    line-height: 16px
  }

  .v-loyal > .not-authorized-banner {
    background: url(https://pictures.apteka-april.ru/generic/loyal/Mob%20banner%20QR_bg.webp) no-repeat;
    background-size: cover;
    padding: 20px 10px 20px 20px
  }

  .v-loyal > .not-authorized-banner > section > h1 {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 30px
  }

  .v-loyal > .not-authorized-banner > section > p {
    display: none
  }

  .v-loyal > .not-authorized-banner > section > .mobile-apps-icons {
    justify-content: space-around;
    padding-left: 50px;
    padding-right: 50px
  }

  .v-loyal > .not-authorized-banner > section > .mobile-apps-icons > a {
    margin: 0 0 15px
  }
}

@media screen and (max-width: 500px) {
  .v-loyal > .banner > .wrap {
    padding-top: 30px;
    padding-bottom: 30px;
    width: 100%
  }

  .v-loyal > .banner > .wrap > h1 {
    font-size: 18px;
    line-height: 22px
  }

  .v-loyal > .banner > .wrap > .description {
    font-size: 12px;
    line-height: 15px
  }

  .v-loyal > .banner > .wrap > .buttons {
    flex-flow: column;
    width: 100%
  }

  .v-loyal > .banner > .wrap > .buttons > .c-button {
    max-width: none;
    margin-bottom: 10px
  }

  .v-loyal > .banner > .wrap > .buttons > .c-button:first-of-type {
    margin-right: 0
  }

  .v-loyal > .not-authorized-banner {
    min-height: unset
  }
}

@media screen and (max-width: 360px) {
  .v-loyal > .systems > section > table > tbody > tr > td:last-child > .icon {
    margin-right: 0
  }

  .v-loyal > .not-authorized-banner > section > .mobile-apps-icons {
    padding: 0
  }

  .v-loyal > :deep(.c-bottom-bar) > .bar > .top {
    margin-bottom: 10px
  }

  .v-loyal > :deep(.c-bottom-bar) > .bar > .top > h2 {
    font-size: 16px
  }

  .v-loyal > :deep(.c-bottom-bar) > .bar > section {
    padding-left: 10px;
    padding-right: 10px
  }

  .v-loyal > :deep(.c-bottom-bar) > .bar > section.check {
    padding: 10px
  }

  .v-loyal > :deep(.c-bottom-bar) > .bar > section.apps {
    padding-left: 0;
    padding-right: 0
  }
}

</style>