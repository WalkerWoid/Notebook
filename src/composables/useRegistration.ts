import type {CustomError} from "@/stores/appStore.ts";
export async function useRegistration(email: string, password: string, passwordRepeat: string) {
    try {
        const response = await fetch('https://dist.nd.ru/api/reg/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                confirm_password: passwordRepeat
            })
        })


        if (response.ok) {
            console.log('Пользователь зарегистрирован', response)
            return 'success'
        } else {
            const errorObj: CustomError = await response.json()

            if (errorObj.statusCode === 400) {
                if (typeof  errorObj.message === 'object') {
                    return errorObj.message[0]
                } else {
                    return errorObj.message
                }
            }
            if (errorObj.statusCode === 409) {
                return errorObj.message
            }
        }
    } catch (error) {
        console.log('Ошибка при запросе', error)
    }
}