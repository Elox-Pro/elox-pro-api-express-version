import { isPasswordMatched } from "../utils/encryptUtils";
import UserCredentialRepository from "../repositories/UserCredentialRepository";
import { AuthenticationMethod, TUserCredential } from "types/models";

export default class UserCredentialService {
    private userCredentialRepository: UserCredentialRepository;

    constructor(userCredentialRepository: UserCredentialRepository) {
        this.userCredentialRepository = userCredentialRepository;
    }
    async login(credential: TUserCredential): Promise<TUserCredential | null> {
        try {

            if (!credential.username) {
                throw new Error("Username is required");
            }

            if (!credential.password) {
                throw new Error("Password is required");
            }

            const savedCredential = await this.userCredentialRepository
                .findUniqueByUsername(credential.username);

            if (!savedCredential) {
                throw new Error("Login failed");
            }

            if (!savedCredential.email) {
                throw new Error("Email is required");
            }

            if (!savedCredential.emailVerified) {
                throw new Error("Email is not verified");
            }

            if (!isPasswordMatched(credential.password, savedCredential.password)) {
                throw new Error("Login failed");
            }

            if (savedCredential.authMethod === AuthenticationMethod.EMAIL.toString()) {

            }

            return null;

        } catch (error) {
            console.error("Error trying to login user: ", error);
            throw error;
        }
    }

}