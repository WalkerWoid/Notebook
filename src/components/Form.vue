<script setup lang="ts">
const emits = defineEmits<{
  (e: 'closeFormWindow'): void
}>()
</script>

<template>
  <div class="form__container">
    <div class="shadow" @click="$emit('closeFormWindow')"></div>

    <div class="form__window">
      <span @click="$emit('closeFormWindow')" class="main-btn _close"><img src="@/assets/images/close.svg" alt="close-icon"></span>

      <h2 class="h2"><slot name="formHeader">Заголовок не указан</slot></h2>

      <form class="form">
        <slot name="formContent"></slot>
      </form>
    </div>
  </div>
</template>

<style>
.form__container {
  inset: 0;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
}
.shadow {
  position: absolute;
  inset: 0;
  background-color: rgba(10, 31, 56, .7);
}

.form__window {
  z-index: 1;
  position: relative;
  background-color: var(--dark-middle-color);
  border-radius: 40px;
  padding: 80px;
  max-width: 780px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-height: 100%;
  overflow: auto;
}
.form__window .h2 {
  padding-right: 66px;
  word-break: break-word;
  text-wrap: balance;
}

.form, .form__row {
  display: flex;
  flex-direction: column;
}
.form {
  gap: 24px;
}
.form__row {
  gap: 8px;
  position: relative;
}
.form__bottom {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  margin-top: 16px;
}
.form__bottom p {
}
.change-btn {
  margin-left: 8px;
  cursor: pointer;
  font-weight: 700;
  color: var(--green-light-color);
}


._eye {
  position: absolute;
  right: 28px;
  bottom: 29px;
  display: flex;
}
._eye img {
  width: 18px;
  height: 16px;
}

.input__title {
  color: var(--gray-color);
  padding-left: 24px;
}



@media screen and (max-width: 1366px) {
  .form__window {
    padding: 56px;
    max-width: 594px;
  }
}
@media screen and (max-width: 1024px) {
  .form__window {
    max-width: 688px;
  }
}
@media screen and (max-width: 768px) {
  .form {
    flex: 1 1 auto;
  }
  .form .form__bottom {
    margin-top: auto;
  }
}
@media screen and (max-width: 480px) {
  .form__window {
    padding: 42px 16px;
    max-width: calc(100vw - 8px);
    height: calc(100vh - 8px);
    overflow: auto;
    gap: 28px;
  }
  .form {
    gap: 16px;
  }
  .form__bottom {
    flex-direction: column;
    gap: 12px;
    margin-top: 14px;
  }
  .form__bottom .main-btn {
    width: 100%;
    order: 1;
    justify-content: center;
  }
  .form__bottom p {
    flex-direction: row;
    text-align: center;
    justify-content: center;
    order: 2;
    margin: 0;
  }
  .form__bottom span {
    font-size: 14px;
    line-height: 24px;
  }
  .change-btn {
  }
}

.additional {
  padding: 8px 20px;
  border-radius: 24px;
}
.additional._errors {
  background-color: rgba(255, 116, 97, 0.1);
}
.additional._errors p {
  color: rgba(255, 116, 97, 1);
}

.additional._success {
  background-color: rgba(165, 187, 12, .1);
}
.additional._success p {
  color: var(--green-light-color);
}

.transform-enter-active,
.transform-leave-active {
  transition-duration: var(--transition);
}
.transform-enter-to,
.transform-leave-from {
  opacity: 1;
}
.transform-enter-from,
.transform-leave-to {
  opacity: 0;
}
</style>