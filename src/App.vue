<script setup lang="ts">
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Notes from "@/components/Notes.vue";

import {useAppStore} from "@/stores/appStore.ts";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import type {Component} from "vue";

const appStore = useAppStore()
const {signupWindowVisibility, authType, authMode, isAuth} = storeToRefs(appStore)

const changeFormType = (newType: 'registration' | 'auth') => {
  appStore.changeFormType(newType)
}
const authHandler = () => {
  signupWindowVisibility.value = false
  isAuth.value = true
}
const getActiveMainComponent = computed(() => {
    if (!isAuth.value) {
      return Main
    } else {
      return Notes
    }
})
</script>

<template>
  <Header v-model:signup-window-visibility="signupWindowVisibility" v-model:is-auth="isAuth" />

  <Component :is="getActiveMainComponent" />

  <Transition name="signup">
    <div v-show="signupWindowVisibility">
      <Transition name="authType">
        <Component :is="authMode[authType]"
                   v-model:signup-window-visibility="signupWindowVisibility"
                   v-model:is-auth="isAuth"
                   @changeFormType="changeFormType" @auth="authHandler" />
      </Transition>
    </div>
  </Transition>
</template>

<style>
.signup-enter-active,
.signup-leave-active {
  transition-duration: var(--transition);
}
.signup-enter-to,
.signup-leave-from {
  opacity: 1;
}
.signup-enter-from,
.signup-leave-to {
  opacity: 0;
}

.authType-enter-active,
.authType-leave-active {
  transition-duration: var(--transition);
}
.authType-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.authType-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.authType-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.authType-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>