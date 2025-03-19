<script setup lang="ts">

</script>

<template>
  <main>
    <div class="container">
      <div class="text__container">
        <h1 class="h1">Мои <br> заметки</h1>
        <h3 class="h3">Не забывай о важном, <br> храни его в облаке.</h3>
      </div>

      <picture class="main__picture">
        <img src="@/assets/images/main-img.png" alt="main-note-img">
      </picture>
    </div>
  </main>
</template>

<style>
main .container {
  display: flex;
  align-items: center;
  gap: 61px;
  justify-content: space-between;
}
.main__picture {
  flex: 0 1 897px;
}
.text__container .h3 {
  margin-top: 40px;
  color: var(--gray-color)
}


@media screen and (max-width: 1366px) {
  main .container {
    gap: 91px;
  }
}
@media screen and (max-width: 1280px) {
  main .container {
    padding-top: 40px;
    gap: 0;
    flex-direction: column;
    justify-content: flex-start;
  }
  .text__container .h1,
  .text__container .h3 {
    text-align: center;
    text-wrap: balance;
  }
  .text__container .h3 {
    margin-top: 20px;
  }
  .text__container .h3 br {
    display: none;
  }
  .main__picture {
    flex: initial;
    display: inline-block;
    padding: 0 64px;
  }
}
@media screen and (max-width: 1280px) {
  main .container {
    padding-top: 20px;
  }
  .main__picture {
    margin-top: 17px;
  }
}
</style>