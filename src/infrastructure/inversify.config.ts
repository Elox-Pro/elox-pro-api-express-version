import { Container } from "inversify";
// params
import AuthenticateUserParams from "domain/entities/user/AuthenticateUserParams";

// Uses cases
import IUseCase from "domain/interfaces/usecases/IUseCase";
import AuthenticateUserUC from "application/usecases/user/AuthenticateUserUC";

// Entities
import User from "domain/entities/user/User";

// Repositories
import IUserRepository from "domain/interfaces/repositories/IUserRepository";
import UserRepository from "./repositories/UserRepository";

// Types
import { TInversify } from "domain/types/TInversify";

// Utils
import IEncryptUtils from "domain/interfaces/utils/IEncryptUtils";
import EncryptUtils from "./utils/EncryptUtils";

const container = new Container();

// Uses cases
container.bind<IUseCase<AuthenticateUserParams, User>>(TInversify.IUseCase).to(AuthenticateUserUC);

// Repositories
container.bind<IUserRepository>(TInversify.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IEncryptUtils>(TInversify.IEncryptUtils).to(EncryptUtils).inSingletonScope();

export default container;