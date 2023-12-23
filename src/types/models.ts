import {
    User,
    UserCredential,
    Country
} from "@prisma/client";

export enum UserRole {
    SYSTEM_ADMIN,
    COMPANY_OWNER,
    COMPANY_ADMIN,
    COMPANY_CUSTOMER
}

export enum AuthenticationMethod {
    EMAIL,
    PHONE
}

export type TUser = {
    role: UserRole | string,
    credential?: UserCredential
} & User;

export type TUserCredential = {
    authMethod?: AuthenticationMethod | string
    user?: User
} & UserCredential;

export type TCountry = {} & Country;