import { UserRole } from "@/constants"

export type User = {
    name: string,
    email: string,
    password: string,
    role: UserRole,
}

export type CheckAuthProps = {
    isAuthenticated: boolean,
    user: User
}