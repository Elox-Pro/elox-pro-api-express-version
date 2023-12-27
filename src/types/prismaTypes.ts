import {
    User,
    Country
} from "@prisma/client";
import { TAppUser } from "./appTypes";

export type TUser = {} & User & TAppUser;
export type TCountry = {} & Country;