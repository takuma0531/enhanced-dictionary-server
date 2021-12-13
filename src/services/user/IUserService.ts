import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
} from "../../typings/models/user/dto";
import { CustomJwtPayload } from "../../typings/common";

export interface IUserService {
  registerUser(userCreateDto: UserCreateDto): Promise<UserReadDto>;
  loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult>;
  getById(id: string): Promise<UserReadDto>;
  getAuthResult(payload: CustomJwtPayload): Promise<AuthorizedResult>;
}
