import IEncryptUtils from "../utils/IEncryptUtils";
import ICodeGenerator from "../utils/ICodeGenerator";
import IUserCredentialRepository from "../repositories/IUserCredentialRepository";
import IUserRepository from "../repositories/IUserRepository";
import { TUser, TUserCredential } from "types/prismaTypes";
import { AuthenticationMethod, CodeType } from "../utils/constants";

export type TUserCredentialServiceParams = {
    encryptUtils: IEncryptUtils,
    codeGenerator: ICodeGenerator,
    userCredentialRepository: IUserCredentialRepository<TUserCredential>,
    userRepository: IUserRepository<TUser>
}

export class UserCredentialService {

    private readonly AUTHENTICATION_CODE_EXPIRES_IN: number = 60 * 5;

    private readonly userCredentialRepository: IUserCredentialRepository<TUserCredential>;
    private readonly userRepository: IUserRepository<TUser>;
    private readonly codeGenerator: ICodeGenerator;
    private readonly encryptUtils: IEncryptUtils;

    constructor(params: TUserCredentialServiceParams) {
        this.userCredentialRepository = params.userCredentialRepository;
        this.userRepository = params.userRepository;
        this.codeGenerator = params.codeGenerator;
        this.encryptUtils = params.encryptUtils;
    }


}