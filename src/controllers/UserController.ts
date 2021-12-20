import { Request, Response } from "express";
import { IUserService } from "../services/user/IUserService";
import { BaseController } from "./base/BaseController";
import {
  UserReadDto,
  UserCreateDto,
  UserLoginRequestDto,
} from "../typings/models/user/dto";

export class UserController extends BaseController {
  constructor(private readonly _userService: IUserService) {
    super();
  }

  // @route     POST api/v1/users
  // @desc      register user
  // @access    public
  public async createUser(req: Request, res: Response) {
    try {
      const userCreateDto: UserCreateDto = req.body;
      const userReadDto = await this._userService.registerUser(userCreateDto);
      return super.created<UserReadDto>(res, userReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route   POST api/v1/users/login
  // @dec     login user
  // @access  public
  public async loginUser(req: Request, res: Response) {
    try {
      const { id } = req.userClaims;
      const userReadDto: UserReadDto = await this._userService.getById(id!);
      return super.ok(res, userReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route   GET api/v1/users
  // @desc    get user by id
  // @access  private
  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.userClaims;
      const userReadDto: UserReadDto = await this._userService.getById(id!);
      return super.ok(res, userReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route   GET api/v1/users/check-auth
  // @desc    return new token to check if current token is valid
  // @access  private
  public async returnAuthorizedResult(req: Request, res: Response) {
    try {
      const { id, email } = req.userClaims;
      const authorizedResult = await this._userService.getAuthResult({
        id: id!,
        email: email!,
      });
      return super.ok(res, authorizedResult);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
