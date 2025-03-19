<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import {storeToRefs} from "pinia";
import {useUnAuth} from "@/composables/useUnAuth.ts";

const appStore = useAppStore()
const {userData, notes} = storeToRefs(appStore)

const signupWindowVisibility = defineModel('signupWindowVisibility')
const isAuth = defineModel<boolean>('isAuth')

const unAuthVisibility = ref<boolean>(false)

const unAuth = () => {
  useUnAuth(userData.value.token)
      .then(answer => {
        userData.value.id = -1
        userData.value.email = ''
        userData.value.token = ''
        notes.value = []

        isAuth.value = false
        unAuthVisibility.value = false
      })
}
</script>

<template>
  <header>
    <div class="container">
      <a class="logo">
        <picture><img src="@/assets/images/logo.svg" alt="logo"></picture>
      </a>

      <p v-if="!isAuth" class="main-btn" @click="signupWindowVisibility = true">
        <picture>
          <img src="@/assets/images/login.svg" alt="login-icon">
        </picture>
        <span>Вход</span>
      </p>

      <div v-else class="user-profile">
        <p class="_small user__email">
          {{userData.email}}
        </p>
        <p class="main-btn user__avatar" @click="unAuthVisibility = !unAuthVisibility">
          <img src="@/assets/images/user.svg" alt="user-icon">
        </p>

        <div class="unAuth _small" v-if="unAuthVisibility">
          <p @click="unAuth" class="_pointer">Выйти</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
header {
  padding: 43px 0;
}
header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.logo {
  min-width: 154px;
}

.user-profile {
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;
  max-width: calc(100% - 219px);
  justify-content: flex-end;
}
.user__email {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.user__avatar {
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-middle-color);
  border-radius: var(--round);
  cursor: pointer;
}
.user__avatar img {
  width: 20px;
}

.unAuth {
  position: absolute;
  color: var(--green-light-color);
  padding: 40px;
  right: 0;
  top: calc(100% + 21px);
  background-color: var(--dark-middle-color);
  border-radius: 12px;
  z-index: 2;
}
.unAuth:after {
  content: '';
  position: absolute;
  bottom: 100%;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 9px solid var(--dark-middle-color);
}

@media screen and (max-width: 1366px) {
  header {
    padding: 20px 0;
  }
}
@media screen and (max-width: 480px) {
  header .container {
    gap: 0 22px;
  }
  .user-profile {
    max-width: calc(100% - 154px);
  }
  .logo {
    max-width: 154px;
  }
}
</style>