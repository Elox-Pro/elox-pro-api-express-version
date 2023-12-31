import redis from "../helpers/redisClient";
import DependencyManager from "../helpers/DependencyManager";
import IUserService from "../services/IUserService";
import IEncryptUtils from "./IEncryptUtils";
import ICodeGenerator from "./ICodeGenerator";
import UserService from "../services/impl/UserService";
import CountryService from "../services/impl/CountryService";
import CodeGenerator from "./CodeGenerator";
import EncryptUtils from "./EncryptUtils";
import { TUser } from "../types/prismaTypes";
import { UserRepository } from "../repositories/impl/UserRepository";
import IUserRepository from "../repositories/IUserRepository";
import JwtUser from "../helpers/JwtUser";
import config from "../config";
import IJwtAsync from "../helpers/IJwtAsync";
import { TJwtUserPayload } from "../types/appTypes";

/**
 * Creates an instance of the DependencyManager class.
 */
const manager = new DependencyManager();

/**
 * Returns an instance of the UserRepository.
 * @returns {IUserRepository<TUser>} an instance of the UserRepository
 */
function useUserRepository(): IUserRepository<TUser> {
    return manager.resolve(UserRepository.name, () => {
        return new UserRepository();
    });
}

function useJwtUserAccessToken(): IJwtAsync<TJwtUserPayload> {
    return manager.resolve('JwtUserAccessToken', () => {
        return new JwtUser(
            config.JWT_ISSUER,
            config.JWT_AUDIENCE,
            config.JWT_ACCESS_TOKEN_SECRET,
            config.JWT_REFRESH_TOKEN_EXPIRES_IN
        );
    });
}

function useJwtUserRefreshToken(): IJwtAsync<TJwtUserPayload> {
    return manager.resolve('JwtUserRefreshToken', () => {
        return new JwtUser(
            config.JWT_ISSUER,
            config.JWT_AUDIENCE,
            config.JWT_REFRESH_TOKEN_SECRET,
            config.JWT_REFRESH_TOKEN_EXPIRES_IN
        );
    });
}

/**
 * Returns an instance of the EncryptUtils class.
 * @returns {IEncryptUtils} an instance of the EncryptUtils class
 */
export function useEncryptUtils(): IEncryptUtils {
    return manager.resolve(EncryptUtils.name, () => {
        return new EncryptUtils();
    });
}

/**
 * Returns an instance of the CodeGenerator class.
 * @returns {ICodeGenerator} an instance of the CodeGenerator class
 */
export function userCodeGenerator(): ICodeGenerator {
    return manager.resolve(CodeGenerator.name, () => {
        return new CodeGenerator(config.APP_NAME, redis);
    });
}

/**
 * Returns an instance of the UserService class.
 * @returns {IUserService<TUser>} an instance of the UserService class
 */
export function useUserService(): IUserService<TUser> {
    return manager.resolve(UserService.name, () => {
        return new UserService({
            userRepository: useUserRepository(),
            encryptUtils: useEncryptUtils(),
            codeGenerator: userCodeGenerator(),
            userAccessToken: useJwtUserAccessToken(),
            userRefresToken: useJwtUserRefreshToken()
        });
    })
}

/**
 * Returns an instance of the CountryService class.
 * @returns {CountryService} an instance of the CountryService class
 */
export function useCountryService(): CountryService {
    return manager.resolve(CountryService.name, () => {
        return new CountryService();
    })
}