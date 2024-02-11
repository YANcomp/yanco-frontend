<script lang="ts" setup>
const props = defineProps({
  me: {
    type: <any>Object
  },
  params: {
    type: <any>Object
  },
  routeName: {
    type: String
  }
})

const avatar = computed(() => {
  //TODO
  return ""
  // return $.i.avatar(null === (t = this.me) || void 0 === t ? void 0 : t.avatar, null !== (n = null === (e = this.params) || void 0 === e ? void 0 : e.avatarsURL) && void 0 !== n ? n : "https://pictures.apteka-april.ru/avatars")
})
const name = computed(() => {
  return [props.me.sname ? undefined : props.me.sname].filter((s) => {
    return void 0 !== s
  }).join(" ")
})
const phone = computed(() => {
  return uPhone(props.me ? undefined : props.me.phone)
})

const emit = defineEmits(["logout"])

function logout() {
  emit("logout")
}
</script>

<template>
  <div class="c-profile-menu">
    <div>
      <div>
        <div class="items-list">
          <nuxt-link :to='{name: "account-card"}'>
            <span class="icon discont-card2"/>
            <span class="title">Моя карта лояльности</span>
          </nuxt-link>
          <nuxt-link :class='{ "nuxt-link-exact-active": "account-order-id" === routeName }'
                     :to='{name: "account-orders"}'>
            <span class="icon my-orders"/>
            <span class="title">Мои покупки</span>
          </nuxt-link>
          <nuxt-link :to='{name: "account-favorites-pharmacies"}'>
            <span class="icon favorites-pharmacies"/>
            <span class="title">Избранные аптеки</span>
          </nuxt-link>
          <nuxt-link :to='{name: "help"}'>
            <span class="icon help"/>
            <span class="title">Помощь</span>
          </nuxt-link>
          <nuxt-link :to='{name: "account-settings"}'>
            <span class="icon settings2"/>
            <span class="title">Настройки</span>
          </nuxt-link>
          <span class="user-logout" @click="logout">
            <span class="icon logout2"></span>
            <span class="title">Выйти</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-profile-menu {
  position: absolute;
  top: 40px;
  left: -105px;
  width: 246px;
  max-height: 395px;
  padding-top: 17px;
  filter: drop-shadow(3px 3px 15px rgba(0, 0, 0, .2))
}

.c-profile-menu:after, .c-profile-menu:before {
  display: block;
  content: "";
  position: absolute;
  top: 6px;
  left: 132px;
  transform: translateX(-50%);
  background: hsla(0, 0%, 100%, 0);
  border-color: hsla(0, 0%, 100%, 0) hsla(0, 0%, 100%, 0) #fff;
  border-style: solid;
  border-width: 0 12px 12px
}

.c-profile-menu:before {
  top: 4.5px
}

.c-profile-menu > div {
  background-color: #fff;
  border-radius: 5px
}

.c-profile-menu > div > div {
  padding-top: 5px
}

.c-profile-menu > div > div > .items-list > .user-logout, .c-profile-menu > div > div > .items-list > a {
  display: flex;
  align-items: center;
  color: #1a1a1a;
  transition: .3s;
  height: 24px;
  padding: 12px 18px 12px 20px
}

.c-profile-menu > div > div > .items-list > .user-logout > .title, .c-profile-menu > div > div > .items-list > a > .title {
  margin-left: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px
}

.c-profile-menu > div > div > .items-list > .user-logout:hover, .c-profile-menu > div > div > .items-list > a:hover {
  color: #4e62d1;
  transition: .3s;
  cursor: pointer;
  background-color: #ebf0f9
}

.c-profile-menu > div > div > .items-list > .nuxt-link-exact-active {
  color: #4e62d1;
  background-color: #ebf0f9
}
</style>