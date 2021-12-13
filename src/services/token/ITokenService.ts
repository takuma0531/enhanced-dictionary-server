import { UserClaims } from "../..//typings/common";

export interface ITokenService {
  generateJwt(payload: any): string;
  verifyToken(token: string): UserClaims;
}
