import { JwtPayload } from "jsonwebtoken";
export default interface IJwtAsync<T extends JwtPayload> {
    signAsync(payload: T): Promise<string>;
    verifyAsync(token: string): Promise<T>;
}