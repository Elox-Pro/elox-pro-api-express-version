import TUserPayload from "domain/types/TUserPayload";
import IJsonWebToken from "./IJsonWebToken";
export default interface IAccessToken extends IJsonWebToken<TUserPayload> { }