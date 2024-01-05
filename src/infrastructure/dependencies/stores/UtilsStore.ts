import DIContainer from "../DICointainer";
import EncryptUtils from "infrastructure/utils/EncryptUtils";

const containter: DIContainer = new DIContainer();

export default class UtilsStore {

    static getEncryptUtils(): EncryptUtils {
        return containter.resolve(EncryptUtils.name, () => new EncryptUtils());
    }
}