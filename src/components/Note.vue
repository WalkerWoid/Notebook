<script setup lang="ts">
import type {Note} from "@/stores/appStore.ts";

const definedProps = defineProps<{
  note: Note
}>()
const emits = defineEmits<{
  (e: 'deleteNote', noteId: number): void
}>()
</script>

<template>
  <li>
    <article class="note">
      <h4 class="h4 note__title">{{note.title}}</h4>
      <p class="note__text">{{note.content}}</p>
      <p class="note__delete" @click="$emit('deleteNote', note.id)">
        <span><img src="@/assets/images/close.svg" alt="delete-icon"></span>
        Удалить
      </p>
    </article>
  </li>
</template>

<style>
.note {
  display: flex;
  flex-direction: column;
  background-color: var(--green-light-color);
  border-radius: 18px;
  position: relative;
  box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.4);
}
.note:after {
  content: '';
  position: absolute;
  right: -20px;
  top: -5px;
  rotate: 45deg;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 30px solid var(--dark-color);

}
.note:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-left: 40px solid var(--green-color);
  border-top: 40px solid transparent;
  border-bottom-left-radius: 18px;
}
.note__title {
  padding: 20px 28px;
  border-bottom: 1px solid var(--green-color);
  word-break: break-all;
}
.note__text {
  padding: 20px 28px 28px;
}
.note__delete {
  cursor: pointer;
  padding: 20px 32px;
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}
</style>