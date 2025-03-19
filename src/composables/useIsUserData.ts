import type {UserData} from "@/stores/appStore.ts";

export const useIsUserData = (data: UserData | string | string[] | undefined): data is UserData => {
    return typeof data === 'object' && 'id' in data && 'email' in data
}