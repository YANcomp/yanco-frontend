<script lang="ts" setup>
const props = defineProps({
  pharmaciesCount: {
    type: Number
  },
  regionsCount: {
    type: Number
  }
})
</script>

<template>
  <div class="c-pharmacy-chain-advantages">
    <h1>Преимущества магазинной сети «Янко»</h1>
    <div>
      <nuxt-link :to="{name:'pharmacies'}">
        <img src="https://pictures.apteka-april.ru/generic/pharmacy-chain-advantages/1.svg"
             :alt="pharmaciesCount + ' магазинов'" width="170px" height="118px"/>
        <span>
          <b>{{ pharmaciesCount }} магазинов</b>
          <br>
          в {{ regionsCount }} регионах России
        </span>
      </nuxt-link>
      <nuxt-link :to="{name:'loyal'}">
        <img src="https://pictures.apteka-april.ru/generic/pharmacy-chain-advantages/2.svg" alt="Программа лояльности"
             width="170px" height="118px"/>
        <span>
          Гибкая и выгодная
          <br>
          <b>программа лояльности</b>
        </span>
      </nuxt-link>
      <nuxt-link :to="{name:'mobile'}">
        <img src="https://pictures.apteka-april.ru/generic/pharmacy-chain-advantages/4.svg" alt="Мобильное приложение"
             width="170px" height="118px"/>
        <span>
          Удобное <b>мобильное
          <br>
          приложение</b>
        </span>
      </nuxt-link>
      <div>
        <img src="https://pictures.apteka-april.ru/generic/pharmacy-chain-advantages/3.svg" alt="Мобильное приложение"
             width="170px" height="118px"/>
        <span>
          Полезные советы в сторис,
          <br>
          <b>онлайн-помощник</b>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-pharmacy-chain-advantages {
  max-width: 1600px;
  margin: 30px auto;
  font-family: Montserrat, sans-serif
}

.c-pharmacy-chain-advantages > div {
  display: flex;
  justify-content: space-between
}

.c-pharmacy-chain-advantages > div > a, .c-pharmacy-chain-advantages > div > div {
  width: 327px;
  height: 192px;
  text-align: center;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  color: #1a1a1a
}

.c-pharmacy-chain-advantages > div > a:hover, .c-pharmacy-chain-advantages > div > div:hover {
  color: #3f51b5;
  cursor: pointer
}

.c-pharmacy-chain-advantages > div > a > img, .c-pharmacy-chain-advantages > div > div > img {
  margin: auto auto 20px
}

.c-pharmacy-chain-advantages > h1 {
  font-weight: 600;
  font-size: 28px;
  margin: 0 0 30px
}
</style>