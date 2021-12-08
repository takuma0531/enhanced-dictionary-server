import { UserClaims } from "../claims";

declare global {
  namespace Express {
    export interface Request {
      userClaims: UserClaims;
    }
  }
}
