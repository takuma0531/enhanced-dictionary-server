import { Response, Request, NextFunction } from "express";
import { jwtTokenService } from "../services/token/TokenService";
import { ITokenService } from "../services/token/ITokenService";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { ErrorResponse } from "../typings/common/response";

class Authorization {
  private readonly _tokenService: ITokenService;

  constructor(tokenService: ITokenService) {
    this._tokenService = tokenService;
  }

  public verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.get("authorization");

      if (!token) return this.unauthorized(res);

      token = token.slice(7);
      const decoded = this._tokenService.verifyToken(token);
      req.userClaims = decoded;

      next();
      return;
    } catch (err: any) {
      return this.unauthorized(res, err.message);
    }
  }

  public unauthorized(res: Response, message: string = "Unauthorized") {
    const errorResponse: ErrorResponse = {
      error: {
        code: HttpStatusCode.UNAUTHORIZED,
        message: message,
      },
    };

    return res.status(HttpStatusCode.UNAUTHORIZED).json(errorResponse);
  }
}

export const authorization = new Authorization(jwtTokenService);
