import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";

import type {Ref} from "vue";
import type {Component} from "vue";
import type {ShallowRef} from "vue";

import Registration from "@/components/Registration.vue";
import Signup from "@/components/Signup.vue";

export interface Note {
    id: number
    title: string
    content: string
}
export interface UserData {
    email: string
    id: number
    token: string
}
export interface CustomError {
    error: string
    message: string[]
    statusCode: number
}
interface AuthMode {
    [key: string]: Component
}
interface appStore {
    signupWindowVisibility: Ref<boolean>
    isAuth: Ref<boolean>
    authType: Ref<string>
    authMode: ShallowRef<AuthMode>
    userId: Ref<number>
    userEmail: Ref<string>
    userToken: Ref<string>
    notes: Ref<Note[]>
    userData: Ref<UserData>
    changeFormType(newType: 'registration' | 'auth'): void
}

export const useAppStore = defineStore('appStore', () => {
    const signupWindowVisibility = ref<boolean>(false)
    const isAuth = ref<boolean>(false)
    const authType = ref<string>('registration')
    const notes = ref<Note[]>([])
    const authMode = shallowRef<AuthMode>({
        registration: Registration,
        auth: Signup
    })

    const userId = ref<number>(-1)
    const userEmail =  ref<string>('')
    const userToken = ref<string>('')
    const userData = ref<UserData>({
        id: -1,
        email: '',
        token: ''
    })

    function resetUserData() {
        userId.value = -1
        userEmail.value = ''
        userToken.value = ''
    }

    const changeFormType = (newType: 'registration' | 'auth'): void => {
        authType.value = newType
    }

    return {
        signupWindowVisibility,
        isAuth,
        authType,
        authMode,
        userId,
        userEmail,
        userToken,
        notes,
        userData,
        changeFormType,
    } as appStore
})