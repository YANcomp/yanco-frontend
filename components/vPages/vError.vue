<script lang="ts" setup>
const props = defineProps({
  error: {
    type: <any>Object
  }
})
const router = useRouter()

const isError404 = computed(() => {
  return 404 === props.error.statusCode
})
const isError500 = computed(() => {
  return 500 === props.error.statusCode
})

const handleError = () => {
  clearError({
    redirect: '/',
  });
};
function reload() {
  location.reload()
}

useSeoMeta({
  title: 'Ошибка — Cosmetic | Yanco',
})
</script>

<template>
  <main class="v-error">
    <template v-if="isError500">
      <h1>Страница временно недоступна</h1>
      <p>
        Пожалуйста,
        <span class="hover-bottom-line" @click="reload">обновите страницу</span>
        или попробуйте позже
      </p>
    </template>
    <template v-else-if="isError404">
      <h1>Страница не найдена</h1>
      <p>
        К сожалению, страница, которую Вы запрашиваете, не существует…
      </p>
    </template>
    <template v-else>
      <h1>Произошла ошибка</h1>
    </template>
    <UiCButton mode="primary" size="l" @click="handleError">Перейти на главную</UiCButton>
  </main>
</template>

<style scoped>
.v-error {
  margin: auto;
  margin-bottom: 30px;
  text-align: center
}

.v-error > p > span {
  color: #3f51b5;
  cursor: pointer
}

.v-error > p > span:hover {
  color: #4960df
}

.v-error > p > span:active {
  color: #32408f
}
</style>