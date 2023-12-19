import {
    UserRole,
    AuthenticationMethod
} from "./enums";

type base = {
    id: number
    updatedAt: Date
    createdAt: Date
}

export type User = {
    role: UserRole | string,
    credential: UserCredential | null
} & base;

export type UserCredential = {
    email: string
    phone: string
    username: string
    password: string
    emailVerified: boolean
    phoneVerified: boolean
    authMethod: AuthenticationMethod | string
    lastLoginAt: Date
    user: User
} & base;

export type Country = {
    name: string,
    iso2: string,
    e164: number,
    ccy: string,
    lang: string
} & base;