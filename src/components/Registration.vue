<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
import {useChangeInputVisibility} from "@/composables/useChangeInputVisibility.ts";
import {useRegistration} from "@/composables/useRegistration.ts";
import Form from "@/components/Form.vue";

const signupWindowVisibility = defineModel('signupWindowVisibility')
const emits = defineEmits<{
  (e: 'changeFormType', type: 'registration' | 'auth'): void
  (e: 'auth'): void
}>()

const closeWindow = () => {
  signupWindowVisibility.value = false
  success.value = false
  errorMessages.value = undefined
}

const email = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')

const passwordInput = useTemplateRef<HTMLInputElement>('passwordRef')
const passwordRepeatInput = useTemplateRef<HTMLInputElement>('passwordRepeatRef')
const errorMessages = ref<string | string[] | undefined>(undefined)
const success = ref<boolean>(false)

const registration = () => {
  useRegistration(email.value, password.value, passwordRepeat.value)
      .then(answer => {
        if (answer === 'success') {
          errorMessages.value = undefined
          success.value = true
        } else {
          success.value = false
          errorMessages.value = answer
        }
      })
}
</script>

<template>
  <Form @close-form-window="closeWindow">
    <template #formHeader>Регистрация</template>
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

      <label class="form__row _small">
        <span class="input__title">Пароль еще раз</span>
        <input type="password" name="passwordRepeat" ref="passwordRepeatRef"
               v-model="passwordRepeat" autocomplete="off" placeholder="Пароль еще раз">
        <span class="_eye" @click="useChangeInputVisibility(passwordRepeatInput)">
            <img src="@/assets/images/off-password.svg" alt="eye-icon">
          </span>
      </label>

      <div class="form__bottom">
        <p>
          <span class="_gray">У вас есть аккаунт?</span>
          <span class="change-btn _small" @click="$emit('changeFormType', 'auth')">Войдите</span>
        </p>

        <p class="main-btn send-btn" @click="registration">Войти</p>
      </div>

      <Transition name="transform" mode="out-in">
        <div class="additional _errors" v-if="errorMessages">
          <p class="_small">{{errorMessages}}</p>
        </div>

        <div class="additional _success" v-else-if="success">
          <p class="_small">Вы успешно зарегистрировались</p>
        </div>
      </Transition>
    </template>
  </Form>
</template>

<style>
</style>