import IEncryptUtils from "../../utils/IEncryptUtils";
import ICodeGenerator from "../../utils/ICodeGenerator";
import IUserRepository from "../../repositories/IUserRepository";
import IUserService from "../../services/IUserService";
import { TUser } from "../../types/prismaTypes";
import { AuthenticationMethod, CodeType, UserRole } from "../../utils/constants";
import { TJwtUserPayload, TUserServiceParams } from "../../types/appTypes";
import IJwtAsync from "../../helpers/IJwtAsync";

type TGenerateJwtokensResult = {
    accessToken: string;
    refreshToken: string;
}

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

                const tokens = await this.generateJwtTokens(savedUser);
                savedUser.accessToken = tokens.accessToken;
                savedUser.refreshToken = tokens.refreshToken;

                savedUser.isWaitingForAuthCode = false;

                return savedUser;
            }

            /**
             * If the second authentication is required create the authentication code, send the    notification to the user and return the user
             */

            // flag to indacate the user is waiting for the authentication code
            savedUser.isWaitingForAuthCode = true;

            // TODO: Update constructor 
            const code = this.codeGenerator.generate(
                CodeType.AUTHENTICATION,
                savedUser.username,
                this.AUTHENTICATION_CODE_EXPIRES_IN
            );

            if (savedUser.secondAuthMethod === AuthenticationMethod.EMAIL) {


            } else if (savedUser.secondAuthMethod === AuthenticationMethod.PHONE) {

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

    private async generateJwtTokens(user: TUser): Promise<TGenerateJwtokensResult> {

        const [accessToken, refreshToken] = await Promise.all([
            this.userAccessToken.signAsync({ userId: user.id }),
            this.userRefresToken.signAsync({ userId: user.id })
        ]);

        return { accessToken, refreshToken };
    }
}




