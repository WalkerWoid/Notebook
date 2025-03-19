import type {CustomError} from "@/stores/appStore.ts";

export async function useUnAuth(token: string) {
    try {
        const response = await fetch('https://dist.nd.ru/api/auth/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            console.log('Вышли')
            console.log(response.status);
        } else {
            const errorObject: CustomError = await response.json()
            console.log('Ошибка')
            console.log(errorObject.message)
        }
    } catch (error) {
        console.log('Ошибка при запросе', error)
    }
}