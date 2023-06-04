import type { UserData } from '@/interfaces';

export interface AuthContextValue {
    isChecked: boolean;
    isLoggedIn: boolean;
    user: UserData;
}
