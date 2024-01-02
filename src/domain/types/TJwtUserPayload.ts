import { JwtPayload } from "jsonwebtoken";

/**
 * Type for user-specific payload data to be included in JWTs.
 * Extends the JwtPayload interface to add user properties.
 */
type TJwtUserPayload = {
    userId: number;
} & JwtPayload;

export default TJwtUserPayload;