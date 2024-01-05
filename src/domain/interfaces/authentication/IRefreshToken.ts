import TUserPayload from "domain/types/TUserPayload";
import IJsonWebToken from "./IJsonWebToken";
export default interface IRefreshToken extends IJsonWebToken<TUserPayload> { }