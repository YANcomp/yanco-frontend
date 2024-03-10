<script lang="ts" setup>
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: !1
  },
  questions: {
    type: Array,
    default: function () {
      return []
    }
  },
  isAuthorized: {
    type: Boolean,
    default: !1
  }
})

const route = useRoute()
const router = useRouter()
const currentLink = ref("")
const articleRef = ref(<any>undefined)

const preparedQuestions = computed(() => {
  return props.questions.reduce((t: any, e: any) => {
    let n = e.answer.replace("[авторизации](https://cosmetic.yanco.ru/login)", '<span class="login-or-registration hover-bottom-line" data-id="login">авторизации</span>').replace("[войти на сайт](https://cosmetic.yanco.ru/login)", '<span class="login-or-registration hover-bottom-line" data-id="login">войти на сайт</span>').replace("[регистрации](https://cosmetic.yanco.ru/registration)", '<span class="login-or-registration hover-bottom-line" data-id="registration">регистрации</span>');
    t.push({
      ...e,
      answer: n
    })
    return t
  }, [])
})

onMounted(() => {
  let article = articleRef.value;
  void 0 !== article && article.querySelectorAll(".login-or-registration").forEach((i: any) => {
    i.addEventListener("click", (e: any) => {
      return openLoginOrRegistration(e)
    })
  })
  "help" === route.name && route.hash.length > 0 && setTimeout(() => {
    let e = route.hash.replace("#", "");
    changeRouteHash(e, !0)
  }, 1)
})

function openLoginOrRegistration(t: any) {
  props.isAuthorized ? router.push({
    name: "account-card"
  }) : useEvent("open-login-or-registration", t.target.dataset.id)
}

function changeRouteHash(t: any, e?: any) {
  e || history.pushState({}, "", "".concat(route.path, "#").concat(t)), currentLink.value = t;
  let n = document.getElementById(t);
  uSmooth(n, 50)
}
</script>

<template>
  <section :class='["c-help", { mobile: isMobile }]'>
    <aside v-if="!isMobile">
      <div class="navigation flex-vertical-nowrap">
        <span v-for="(q,i) in questions" :key="i" v-show="78 !== q.ID" :class='{ active: q.slug === currentLink }'
              @click="changeRouteHash(q.slug)">
          {{ q.question }}
        </span>
      </div>
    </aside>
    <article ref="articleRef">
      <section v-for="(q,i) in preparedQuestions" :key="i" :class='["question", { selected: q.slug === currentLink }]'
               itemscope="" itemtype="https://schema.org/Question">
        <h2 :id="q.slug" itemprop="name">{{ q.question }}</h2>
        <div class="answer" itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <span class="text" itemprop="text" v-html="$mdRenderer.render(q.answer)"/>
        </div>
      </section>
    </article>
  </section>
</template>

<style scoped>
.c-help {
  display: flex;
  justify-content: space-between;
  text-align: left
}

.c-help > article {
  padding-left: 33px
}

.c-help > article > .question {
  margin-bottom: 40px
}

.c-help > article > .question > h2 {
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 500;
  line-height: 21px;
  font-size: 20px
}

.c-help > article > .question.selected > h2 {
  font-weight: 600
}

.c-help > article > .question > .answer > :deep(.text) {
  font-size: 16px;
  line-height: 26px
}

.c-help > article > .question > .answer > :deep(.text) .info2 {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #3f51b5;
  vertical-align: middle
}

.c-help > article > .question > .answer > :deep(.text) strong {
  font-weight: 500
}

.c-help > article > .question > .answer > :deep(.text) > div > div {
  display: flex
}

.c-help > article > .question > .answer > :deep(.text) > div > div > span {
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
  width: 100%
}

.c-help > article > .question > .answer > :deep(.text) > div > div > span > img {
  width: 90%
}

.c-help > article > .question > .answer > :deep(.text) > div > div > span > span {
  width: 94%
}

.c-help > article > .question > .answer > :deep(.text) a {
  color: #3f51b5;
  line-height: 20px;
  font-weight: 500
}

.c-help > article > .question > .answer > :deep(.text) a:hover {
  color: #4960df
}

.c-help > article > .question > .answer > :deep(.text) a:active {
  color: #32408f
}

.c-help > article > .question > .answer > :deep(.text) > p > .login-or-registration {
  font-weight: 500;
  color: #3f51b5
}

.c-help > article > .question > .answer > :deep(.text) > p > .login-or-registration:hover {
  cursor: pointer;
  color: #4960df
}

.c-help > article > .question > .answer > :deep(.text) > p > .warning {
  color: #ffa200
}

.c-help > article > .question > .answer > :deep(.text) > p > .warning > .icon {
  background-color: #ffa200;
  display: inline-block;
  vertical-align: top;
  margin-right: 5px;
  margin-left: -2px
}

.c-help > article > .question > .answer > :deep(.text) > p a {
  display: inline-block;
  color: #3f51b5
}

.c-help > article > .question > .answer > :deep(.text) > p a:hover {
  color: #4960df
}

.c-help > article > .question > .answer > :deep(.text) > p a:active {
  color: #32408f
}

.c-help > article > .question > .answer > :deep(.text) > p a > img {
  width: 100%;
  height: 100%;
  -o-object-fit: scale-down;
  object-fit: scale-down
}

.c-help > article > .question > .answer > :deep(.text) > p > .free-ship, .c-help > article > .question > .answer > :deep(.text) > p > .truck {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px
}

.c-help > article > .question > .answer > :deep(.text) > p > .truck {
  height: 31px
}

.c-help > article > .question > .answer > :deep(.text) ol > li:not(:last-of-type), .c-help > article > .question > .answer > :deep(.text) ul > li:not(:last-of-type) {
  margin-bottom: 15px
}

.c-help > article > .question > .answer > :deep(.text) ol > li::marker, .c-help > article > .question > .answer > :deep(.text) ul > li::marker {
  width: 1px;
  height: 1px
}

.c-help > article > .question > .answer > :deep(.text) ol > li a, .c-help > article > .question > .answer > :deep(.text) ul > li a {
  color: #3f51b5
}

.c-help > article > .question > .answer > :deep(.text) ol > li a:hover, .c-help > article > .question > .answer > :deep(.text) ul > li a:hover {
  color: #4960df
}

.c-help > article > .question > .answer > :deep(.text) ol > li a:active, .c-help > article > .question > .answer > :deep(.text) ul > li a:active {
  color: #32408f
}

.c-help > article > .question > .answer > :deep(.text) ol {
  margin: 0;
  padding: 0 0 0 19px
}

.c-help > article > .question > .answer > :deep(.text) ul > li::marker {
  font-size: 9px
}

.c-help > article > .banner {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  cursor: pointer
}

.c-help > article > .banner > img {
  width: 100%;
  height: 100%;
  -o-object-fit: scale-down;
  object-fit: scale-down
}

.c-help > aside {
  width: 310px;
  border-right: 1px solid #d6d6e1;
  flex-shrink: 0;
  margin-left: -10px
}

.c-help > aside > .navigation {
  position: sticky;
  top: 80px;
  margin-right: -1px
}

.c-help > aside > .navigation > span {
  padding: 15px 12px;
  font-size: 14px;
  color: #1a1a1a;
  border-right: 1px solid transparent;
  transition: .2s;
  cursor: pointer
}

.c-help > aside > .navigation > span:hover {
  background-color: #f7f8fc;
  border-color: #d6d6e1
}

.c-help > aside > .navigation > span.active {
  border-color: #3f51b5;
  background-color: #f7f8fc;
  font-weight: 500
}

.c-help.mobile > article > .question > .answer > :deep(.text) > div > div {
  flex-flow: column
}

.c-help.mobile > article > .question > .answer > :deep(.text) > div > div > span > img, .c-help.mobile > article > .question > .answer > :deep(.text) > div > div > span > span {
  width: 100%
}

@media screen and (max-width: 1250px) {
  .c-help > article > .question > .answer > :deep(.text) > div > div {
    flex-flow: column
  }

  .c-help > article > .question > .answer > :deep(.text) > div > div > span > img, .c-help > article > .question > .answer > :deep(.text) > div > div > span > span {
    width: 100%
  }
}

@media screen and (max-width: 850px) {
  .c-help > aside {
    display: none
  }

  .c-help > article {
    width: 100%;
    padding: 0
  }

  .c-help > article > .banner {
    margin-bottom: 15px
  }
}
</style>