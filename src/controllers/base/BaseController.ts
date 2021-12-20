import { Response } from "express";
import { BaseReadDto } from "../../typings/models/base/dto";
import { HttpStatusCode } from "../../enums/HttpStatusCode";
import { SuccessResponse, ErrorResponse } from "../../typings/common";

abstract class BaseController {
  protected ok(res: Response, data?: any | any[]) {
    if (!data) return res.sendStatus(HttpStatusCode.OK);

    const successResponse: SuccessResponse = data;
    return res.status(HttpStatusCode.OK).json(successResponse);
  }

  protected created<TReadDto extends BaseReadDto>(
    res: Response,
    data: TReadDto
  ) {
    const successResponse: SuccessResponse = data as any;
    return res.status(HttpStatusCode.CREATED).json(successResponse);
  }

  protected noContent(res: Response) {
    return res.sendStatus(HttpStatusCode.NO_CONTENT);
  }

  protected unauthorized(res: Response, message: string = "Unauthorized") {
    const errorResponse: ErrorResponse = {
      error: {
        code: HttpStatusCode.UNAUTHORIZED,
        message: message,
      },
    };

    return res.status(HttpStatusCode.UNAUTHORIZED).json(errorResponse);
  }

  protected notFound(res: Response, message: string = "Not Found") {
    const errorResponse: ErrorResponse = {
      error: {
        code: HttpStatusCode.NOT_FOUND,
        message: message,
      },
    };
    return res.status(HttpStatusCode.NOT_FOUND).json(errorResponse);
  }

  protected forbidden(res: Response, message: string = "Forbidden") {
    const errorResponse: ErrorResponse = {
      error: {
        code: HttpStatusCode.FORBIDDEN,
        message: message,
      },
    };

    return res.status(HttpStatusCode.FORBIDDEN).json(errorResponse);
  }

  protected internalServerError(res: Response, error: Error | string) {
    const errorResponse: ErrorResponse = {
      error: {
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: error.toString(),
      },
    };
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

export { BaseController };
