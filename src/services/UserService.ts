import IEncryptUtils from "../utils/IEncryptUtils";
import ICodeGenerator from "../utils/ICodeGenerator";
import IUserCredentialRepository from "../repositories/IUserCredentialRepository";
import IUserRepository from "../repositories/IUserRepository";
import { TUser, TUserCredential } from "types/prismaTypes";
import { AuthenticationMethod, CodeType } from "../utils/constants";

export type TUserServiceParams = {
    userCredentialRepository: IUserCredentialRepository<TUserCredential>,
    userRepository: IUserRepository<TUser>
    encryptUtils: IEncryptUtils,
    codeGenerator: ICodeGenerator,
}

export class UserService {

    private readonly AUTHENTICATION_CODE_EXPIRES_IN: number = 60 * 5;
    private readonly userCredentialRepository: IUserCredentialRepository<TUserCredential>;
    private readonly userRepository: IUserRepository<TUser>;
    private readonly codeGenerator: ICodeGenerator;
    private readonly encryptUtils: IEncryptUtils;

    constructor(params: TUserServiceParams) {
        this.userCredentialRepository = params.userCredentialRepository;
        this.userRepository = params.userRepository;
        this.codeGenerator = params.codeGenerator;
        this.encryptUtils = params.encryptUtils;
    }

    async createUser(user: TUser): Promise<TUser> {
        try {

            const credential = user.credential;
            if (!credential) {
                throw new Error("Credential is required");
            }

            if (!credential.username) {
                throw new Error("Username is required");
            }

            if (!credential.password) {
                throw new Error("Password is required");
            }

            if (!credential.email) {
                throw new Error("Email is required");
            }

            if (!credential.authMethod) {
                throw new Error("Auth method is required");
            }

            credential.password = await this.encryptUtils.hashPassword(
                credential.password
            );

            const createdUser = await this.userRepository.create(user);

            return createdUser;

        } catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    }

    async login(user: TUser): Promise<TUser | null> {
        try {

            const credential = user.credential;

            if (!credential) {
                throw new Error("Credential is required");
            }

            if (!credential.username) {
                throw new Error("Username is required");
            }

            if (!credential.password) {
                throw new Error("Password is required");
            }

            const savedCredential = await this.userCredentialRepository.findUniqueByUsername(
                credential.username
            );

            if (!savedCredential) {
                throw new Error("Login failed");
            }

            if (!savedCredential.email) {
                throw new Error("Email is required");
            }

            if (!savedCredential.emailVerified) {
                throw new Error("Email is not verified");
            }

            if (!this.encryptUtils.isPasswordMatched(
                credential.password,
                savedCredential.password
            )) {
                throw new Error("Login failed");
            }

            if (!savedCredential.authMethod) {
                return null;
            }

            const code = this.codeGenerator.generate(
                CodeType.AUTHENTICATION,
                savedCredential.username,
                this.AUTHENTICATION_CODE_EXPIRES_IN
            );

            if (savedCredential.authMethod === AuthenticationMethod.EMAIL) {


            } else if (savedCredential.authMethod === AuthenticationMethod.PHONE) {

            }

            return null;

        } catch (error) {
            console.error("Error trying to login user: ", error);
            throw error;
        }
    }


    async getUsers(): Promise<TUser[]> {
        try {
            return this.userRepository.findMany();
        } catch (error) {
            console.error("Error getting users: ", error);
            throw error;
        }
    }
}


