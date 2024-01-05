import { JwtPayload } from "jsonwebtoken";

/**
 * Type for user-specific payload data to be included in JWTs.
 * Extends the JwtPayload interface to add user properties.
 */
type TUserPayload = {
    userId: number;
} & JwtPayload;

export default TUserPayload;