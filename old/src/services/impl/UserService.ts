import IEncryptUtils from "../../utils/IEncryptUtils";
import ICodeGenerator from "../../utils/ICodeGenerator";
import IUserRepository from "../../repositories/IUserRepository";
import IUserService from "../../services/IUserService";
import { TUser } from "../../types/prismaTypes";
import { AuthenticationMethod, CodeType, UserRole } from "../../utils/constants";
import { TJwtUserPayload, TUserServiceParams } from "../../types/appTypes";
import IJwtAsync from "../../helpers/IJwtAsync";

export default class UserService implements IUserService<TUser> {

    private readonly AUTHENTICATION_CODE_EXPIRES_IN: number = 60 * 5;
    private readonly userRepository: IUserRepository<TUser>;
    private readonly codeGenerator: ICodeGenerator;
    private readonly encryptUtils: IEncryptUtils;
    private readonly userAccessToken: IJwtAsync<TJwtUserPayload>;
    private readonly userRefresToken: IJwtAsync<TJwtUserPayload>;

    constructor(params: TUserServiceParams<TUser>) {
        this.userRepository = params.userRepository;
        this.codeGenerator = params.codeGenerator;
        this.encryptUtils = params.encryptUtils;
        this.userAccessToken = params.userAccessToken;
        this.userRefresToken = params.userRefresToken;
    }

    async createUser(user: TUser): Promise<TUser> {
        try {

            if (!user.username) {
                throw new Error("Username is required");
            }

            if (!user.password) {
                throw new Error("Password is required");
            }

            if (!user.email) {
                throw new Error("Email is required");
            }

            if (!user.authMethod) {
                throw new Error("Auth method is required");
            }

            user.password = await this.encryptUtils.hashPassword(
                user.password
            );

            if (user.role === UserRole.SYSTEM_ADMIN) {
                user.emailVerified = true;
            }

            return await this.userRepository.create(user);

        } catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    }

    async login(user: TUser): Promise<TUser> {
        try {

            if (!user.username) {
                throw new Error("Username is required");
            }

            if (!user.password) {
                throw new Error("Password is required");
            }

            const savedUser = await this.userRepository.findUniqueByUsername(
                user.username
            );

            if (!savedUser) {
                throw new Error("Login failed");
            }

            if (!savedUser.email) {
                throw new Error("Email is required");
            }

            if (!savedUser.emailVerified) {
                throw new Error("Email is not verified");
            }

            if (!this.encryptUtils.isPasswordMatched(user.password, savedUser.password)) {
                throw new Error("Login failed");
            }

            /**
             * If the second authentication is not required create the access token and refresh token and return the user
             */

            if (!savedUser.secondAuthMethod) {

                savedUser.isWaitingForAuthCode = false;
                this.setUserTokens(savedUser);

                return savedUser;
            }

            /**
             * If the second authentication is required create the authentication code, send the    notification to the user and return the user
             */

            const code = await this.generateAuthCode(savedUser);

            if (savedUser.secondAuthMethod === AuthenticationMethod.EMAIL) {
                savedUser.isWaitingForAuthCode = true;
                // sendEmailNotification
            }

            return savedUser;

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

    private async setUserTokens(user: TUser): Promise<void> {
        user.accessToken = await this.userAccessToken.signAsync({
            userId: user.id
        });
        user.refreshToken = await this.userRefresToken.signAsync({
            userId: user.id
        });
    }

    private async generateAuthCode(user: TUser): Promise<number> {
        return await this.codeGenerator.generate(
            CodeType.AUTHENTICATION,
            user.username,
            this.AUTHENTICATION_CODE_EXPIRES_IN
        );
    }

}




