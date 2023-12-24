import {
    User,
    UserCredential,
    Country
} from "@prisma/client";

export type TUser = {
    credential?: UserCredential
} & User;

export type TUserCredential = {
    user?: User
} & UserCredential;

export type TCountry = {} & Country;