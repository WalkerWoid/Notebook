<script setup lang="ts">
import {ref} from "vue";
import Form from "@/components/Form.vue";
import Note from "@/components/Note.vue";

import {useAppStore} from "@/stores/appStore.ts";
import {storeToRefs} from "pinia";
import {useGetNotes} from "@/composables/useGetNotes.ts";
import {useDeleteNote} from "@/composables/useDeleteNote.ts";
import {useAddNote} from "@/composables/useAddNote.ts";

const appStore = useAppStore()
const {notes, userData} = storeToRefs(appStore)

const noteTitle = ref<string>('')
const noteText = ref<string>('')
const errorText = ref<{show: boolean, text: string}>({show: false, text: 'Поля должны быть заполнены'})

const addNoteFormVisibility = ref<boolean>(false)
const closeNoteForm = () => {
  addNoteFormVisibility.value = false
  noteTitle.value = ''
  noteText.value = ''
}
const openNoteForm = () => {
  addNoteFormVisibility.value = true
}

const addNote = () => {
  useAddNote(noteTitle.value, noteText.value, userData.value.token)
      .then(answer => {
        if (answer) {
          errorText.value.show = true
          errorText.value.text = answer
        }
        else {
          errorText.value.show = false
          closeNoteForm()
        }
        return useGetNotes(userData.value.token)
      })
      .then(notesArray => {
        if (!notesArray) return
        notes.value = notesArray
      })
}
const deleteNote = (noteId: number) => {
  useDeleteNote(noteId, userData.value.token)
      .then(() => {
        return useGetNotes(userData.value.token)
      })
      .then((notesArray) => {
        if (!notesArray) return
        notes.value = notesArray
      })
}
</script>

<template>
  <main class="notes">
    <div class="container">
      <ul class="notes__container">
        <TransitionGroup name="note">
          <Note v-for="note of notes" :note="note" :key="note.id" @delete-note="deleteNote" />
        </TransitionGroup>
      </ul>

      <Form @close-form-window="closeNoteForm" v-show="addNoteFormVisibility" class="addNote__form">
        <template #formHeader>Добавление заметки</template>
        <template #formContent>
          <label class="form__row _small">
            <span class="input__title">Название заметки</span>
            <input type="text" name="noteTitle"
                   v-model="noteTitle" autocomplete="off" placeholder="Введите название">
            <span class="count _small">{{noteTitle.length}}/64</span>
          </label>

          <label class="form__row _small">
            <span class="input__title">Текст заметки</span>

            <textarea type="text" name="noteText"
                      v-model="noteText" autocomplete="off" placeholder="Введите текст"></textarea>

            <span class="count _small">{{noteText.length}}/255</span>
          </label>

          <div class="form__bottom">
            <p class="main-btn send-btn" @click="addNote">Добавить</p>
          </div>

          <Transition name="transform" mode="out-in">
            <div class="additional _errors" v-if="errorText.show">
              <p class="_small">{{errorText.text}}</p>
            </div>
          </Transition>
        </template>
      </Form>

<!--      <Transition name="signup">-->
<!--        <div class="form__container addNote__form" v-show="addNoteFormVisibility">-->
<!--          <div class="shadow" @click="closeNoteForm"></div>-->

<!--          <div class="form__window">-->
<!--            <span @click="closeNoteForm" class="main-btn _close"><img src="@/assets/images/close.svg" alt="close-icon"></span>-->

<!--            <h2 class="h2">Добавление заметки</h2>-->

<!--            <form class="form form__note">-->
<!--              <label class="form__row _small">-->
<!--                <span class="input__title">Название заметки</span>-->
<!--                <input type="text" name="noteTitle"-->
<!--                       v-model="noteTitle" autocomplete="off" placeholder="Введите название">-->
<!--                <span class="count _small">{{noteTitle.length}}/64</span>-->
<!--              </label>-->

<!--              <label class="form__row _small">-->
<!--                <span class="input__title">Текст заметки</span>-->

<!--                <textarea type="text" name="noteText"-->
<!--                          v-model="noteText" autocomplete="off" placeholder="Введите текст"></textarea>-->

<!--                <span class="count _small">{{noteText.length}}/255</span>-->
<!--              </label>-->

<!--              <div class="form__bottom">-->
<!--                <p class="main-btn send-btn" @click="addNote">Добавить</p>-->
<!--              </div>-->

<!--              <Transition name="transform" mode="out-in">-->
<!--                <div class="additional _errors" v-if="errorText.show">-->
<!--                  <p class="_small">{{errorText.text}}</p>-->
<!--                </div>-->
<!--              </Transition>-->
<!--            </form>-->
<!--          </div>-->
<!--        </div>-->
<!--      </Transition>-->

      <picture class="add-note main-btn" @click="openNoteForm">
        <img src="@/assets/images/add.svg" alt="add-note-icon">
      </picture>
    </div>
  </main>
</template>

<style>
.notes {
  align-items: flex-start;
  padding: 40px 0;
}
.notes__container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: flex-start;
  width: 100%;
}
.addNote__form {
  z-index: 3;
}

.add-note {
  padding: 19px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
  z-index: 2;
}
.addNote__form .form__bottom {
  justify-content: flex-end;
}
.addNote__form .form__row .count {
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  text-align: right;
  color: var(--gray-color)
}

@media screen and (max-width: 1366px) {
  .notes__container {
    gap: 20px;
  }
}
@media screen and (max-width: 1280px) {
  .notes .container {
    padding-top: 0;
  }
  .notes__container {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 768px) {
  .notes__container {
    grid-template-columns: 1fr;
  }
  .add-note {
    right: 8px;
  }
}
@media screen and (max-width: 480px) {
  .notes {
    padding: 20px 0;
  }
  .addNote__form .form__window {
    padding: 24px 16px;
  }
}

.note-move,
.note-enter-active,
.note-leave-active {
  transition-duration: var(--transition);
}
.note-enter-from,
.note-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.note-enter-to,
.note-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.note-leave-active {
  position: absolute;
}
</style>