<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import {storeToRefs} from "pinia";

import {useChangeInputVisibility} from "@/composables/useChangeInputVisibility.ts";
import {useSignUp} from "@/composables/useSignUp.ts";
import {useIsUserData} from "@/composables/useIsUserData.ts";
import {useGetNotes} from "@/composables/useGetNotes.ts";
import Form from "@/components/Form.vue";

const appStore = useAppStore()
const {userData, notes} = storeToRefs(appStore)

const signupWindowVisibility = defineModel('signupWindowVisibility')
const isAuth = defineModel('isAuth')
const emits = defineEmits<{
  (e: 'changeFormType', type: 'registration' | 'auth'): void
  (e: 'auth'): void
}>()

const closeWindow = () => {
  signupWindowVisibility.value = false
}

const email = ref<string>('')
const password = ref<string>('')
const passwordInput = useTemplateRef<HTMLInputElement>('passwordRef')

const errorMessage = ref<string | string[] | undefined>(undefined)
const auth = () => {
  useSignUp(email.value, password.value)
      .then(answer => {
        if (useIsUserData(answer)) {
          errorMessage.value = undefined
          closeWindow()
          isAuth.value = true
          userData.value = answer
          return answer
        } else {
          errorMessage.value = answer as string | string[] | undefined
        }
      })
      .then(answer => {
        if (!answer) return

        return useGetNotes(answer.token)
      })
      .then(notesArray => {
        if (notesArray) notes.value = notesArray
      })
}
</script>

<template>
  <Form @close-form-window="closeWindow">
    <template #formHeader>Вход в ваш аккаунт</template>
    <template #formContent>
      <label class="form__row _small">
        <span class="input__title">Email</span>
        <input type="email" name="email"
               v-model="email" autocomplete="off" placeholder="Введите значение">
      </label>

      <label class="form__row _small">
        <span class="input__title">Пароль</span>
        <input type="password" name="password" ref="passwordRef"
               v-model="password" autocomplete="off" placeholder="Введите пароль">
        <span class="_eye" @click="useChangeInputVisibility(passwordInput)">
            <img src="@/assets/images/off-password.svg" alt="eye-icon">
          </span>
      </label>

      <div class="form__bottom">
        <p>
          <span class="_gray">У вас нет аккаунта?</span>
          <span class="change-btn _small" @click="$emit('changeFormType', 'registration')">Зарегистрируйтесь</span>
        </p>

        <p class="main-btn send-btn" @click="auth">Войти</p>
      </div>

      <Transition name="transform" mode="out-in">
        <div class="additional _errors" v-if="errorMessage && errorMessage !== 'success'">
          <p class="_small">{{errorMessage}}</p>
        </div>

        <div class="additional _success" v-else-if="isAuth">
          <p class="_small">Вы успешно авторизовались</p>
        </div>
      </Transition>
    </template>
  </Form>
<!--  <div class="form__container">-->
<!--    <div class="shadow" @click="closeWindow"></div>-->

<!--    <div class="form__window">-->
<!--      <span @click="closeWindow" class="main-btn _close"><img src="@/assets/images/close.svg" alt="close-icon"></span>-->

<!--      <h2 class="h2">Вход в ваш аккаунт</h2>-->

<!--      <form class="form">-->
<!--        <label class="form__row _small">-->
<!--          <span class="input__title">Email</span>-->
<!--          <input type="email" name="email"-->
<!--                 v-model="email" autocomplete="off" placeholder="Введите значение">-->
<!--        </label>-->

<!--        <label class="form__row _small">-->
<!--          <span class="input__title">Пароль</span>-->
<!--          <input type="password" name="password" ref="passwordRef"-->
<!--                 v-model="password" autocomplete="off" placeholder="Введите пароль">-->
<!--          <span class="_eye" @click="useChangeInputVisibility(passwordInput)">-->
<!--            <img src="@/assets/images/off-password.svg" alt="eye-icon">-->
<!--          </span>-->
<!--        </label>-->

<!--        <div class="form__bottom">-->
<!--          <p>-->
<!--            <span class="_gray">У вас нет аккаунта?</span>-->
<!--            <span class="change-btn _small" @click="$emit('changeFormType', 'registration')">Зарегистрируйтесь</span>-->
<!--          </p>-->

<!--          <p class="main-btn send-btn" @click="auth">Войти</p>-->
<!--        </div>-->

<!--        <Transition name="transform" mode="out-in">-->
<!--          <div class="additional _errors" v-if="errorMessage && errorMessage !== 'success'">-->
<!--            <p class="_small">{{errorMessage}}</p>-->
<!--          </div>-->

<!--          <div class="additional _success" v-else-if="isAuth">-->
<!--            <p class="_small">Вы успешно авторизовались</p>-->
<!--          </div>-->
<!--        </Transition>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style></style>