import type {CustomError} from "@/stores/appStore.ts";

export async function useDeleteNote(noteId: number, token: string) {
    try {
        const response = await fetch(`https://dist.nd.ru/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            console.log('Заметка удалена')
        } else {
            const errorObj: CustomError = await response.json()

            if (errorObj.statusCode === 401) {
                console.log('Требуется авторизация')
            } else if (errorObj.statusCode === 404) {
                console.log('Заметка не найдена')
            }
        }
    } catch (error) {
        console.log('При запросе произошла ошибка', error)
    }
}