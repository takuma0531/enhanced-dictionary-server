import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
  UserUpdateDto,
} from "../../typings/models/user/dto";
import { CustomJwtPayload } from "../../typings/common";

export interface IUserService {
  registerUser(userCreateDto: UserCreateDto): Promise<UserReadDto>;
  loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult>;
  getById(id: string): Promise<UserReadDto>;
  updateUser(userUpdateDto: UserUpdateDto): Promise<UserReadDto>;
  removeUser(userId: string): Promise<void>;
  getAuthResult(payload: CustomJwtPayload): Promise<AuthorizedResult>;
}
