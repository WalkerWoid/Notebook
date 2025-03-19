import type {CustomError} from "@/stores/appStore.ts";
import type {UserData} from "@/stores/appStore.ts";

interface Token {
    accessToken: string
}


export async function useSignUp(email: string, password: string) {
    try {
        const response = await fetch('https://dist.nd.ru/api/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (response.ok) {
            const token: Token = await response.json()

            const auth = await fetch('https://dist.nd.ru/api/auth/', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token.accessToken}`}
            })

            if (auth.ok) {
                const userData: UserData = await auth.json()
                userData.token = token.accessToken
                console.log('Авторизация прошла успешно!')
                return userData
            } else {
                const errorObj: CustomError = await auth.json()
                console.log('Ошибка авторизации', errorObj.message)
                return undefined
            }
        } else {
            const errorObj: CustomError = await response.json()

            if (errorObj.statusCode === 400) {
                if (typeof  errorObj.message === 'object') {
                    return errorObj.message[0]
                } else {
                    return errorObj.message
                }

            }
            if (errorObj.statusCode === 404) {
                return errorObj.message
            }
        }
    } catch (error) {
        console.log('Ошибка при запросе', error)
    }
}