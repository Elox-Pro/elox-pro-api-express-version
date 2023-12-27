import IJwtAsync from "helpers/IJwtAsync";
import IUserRepository from "../repositories/IUserRepository";
import ICodeGenerator from "../utils/ICodeGenerator";
import IEncryptUtils from "../utils/IEncryptUtils";
import { JwtPayload } from "jsonwebtoken";

/**
 * Type for user-specific payload data to be included in JWTs.
 * Extends the JwtPayload interface to add user properties.
 */
export type TJwtUserPayload = {
    userId: number;
} & JwtPayload;

export type TUserServiceParams<T> = {
    userRepository: IUserRepository<T>,
    encryptUtils: IEncryptUtils,
    codeGenerator: ICodeGenerator
    userRefresToken: IJwtAsync<TJwtUserPayload>,
    userAccessToken: IJwtAsync<TJwtUserPayload>
}

export type TAppUser = {
    refreshToken?: string,
    accessToken?: string,
    isWaitingForAuthCode?: boolean,
}