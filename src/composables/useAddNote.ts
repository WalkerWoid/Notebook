import type {CustomError} from "@/stores/appStore.ts";

export async function useAddNote(title: string, text: string, token: string) {
    try {
        const response = await fetch('https://dist.nd.ru/api/notes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: text
            })
        })

        if (response.ok) {
            console.log('Заметка создана')
            console.log(await response.json())
            console.log(response.status)
        } else {
            const errorObj: CustomError = await response.json()

            if (errorObj.statusCode === 400) {
                if (typeof  errorObj.message === 'object') {
                    return errorObj.message[0]
                } else {
                    return errorObj.message
                }
            } else if (errorObj.statusCode === 401) {
                console.log('Требуется авторизация')
            }
        }
    } catch (error) {
        console.log('Ошибка при запросе', error)
    }
}