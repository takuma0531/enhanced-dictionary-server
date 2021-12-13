import { sign, verify, SignOptions } from "jsonwebtoken";
import { ITokenService } from "./ITokenService";
import { JwtConstants } from "../../config/constants";
import { UserClaims } from "../../typings/common";

const jwtOptions: SignOptions = {
  jwtid: JwtConstants.JWT_ID,
  algorithm: JwtConstants.JWT_ALGORITHM,
  expiresIn: JwtConstants.JWT_EXPIRE_IN,
  subject: JwtConstants.JWT_SUBJECT,
  issuer: JwtConstants.JWT_ISSUER,
  audience: JwtConstants.JWT_AUDIENCE,
  encoding: JwtConstants.JWT_ENCODING,
};

class JwtTokenService implements ITokenService {
  constructor(
    private readonly _jwtSecretKey: string,
    private readonly _signOptions: SignOptions
  ) {}

  public generateJwt(payload: any): string {
    try {
      const token = sign(payload, this._jwtSecretKey, this._signOptions);
      return token;
    } catch (err) {
      throw err;
    }
  }

  public verifyToken(token: string): UserClaims {
    try {
      const decoded = verify(token, this._jwtSecretKey) as UserClaims;
      return decoded;
    } catch (err) {
      throw err;
    }
  }
}

export const jwtTokenService = new JwtTokenService(
  JwtConstants.JWT_SECRET_KEY,
  jwtOptions
);
