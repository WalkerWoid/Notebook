import type {CustomError} from "@/stores/appStore.ts";

export async function useGetNotes(token: string) {
    try {
        const response = await fetch('https://dist.nd.ru/api/notes/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.ok) {
            console.log(response.status)
            return await response.json()
        } else {
            const errorObject: CustomError = await response.json()

            if (errorObject.statusCode === 401) {
                console.log('Требуется авторизация')
            }
        }
    } catch (error) {
        console.log('Ошибка при запросе', error)
    }
}