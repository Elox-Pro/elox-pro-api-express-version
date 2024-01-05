import DIContainer from "../DICointainer";
import CreateUserUC from "application/usecases/user/CreateUserUC";
import RepositoyStore from "./RepositoryStore";
import UtilsStore from "./UtilsStore";

const container: DIContainer = new DIContainer();

export default class UserUseCaseStore {

    static getCreateUserUC(): CreateUserUC {
        return container.resolve(CreateUserUC.name, () => {
            return new CreateUserUC(
                RepositoyStore.getUserRepository(),
                UtilsStore.getEncryptUtils()
            );
        });
    }
}