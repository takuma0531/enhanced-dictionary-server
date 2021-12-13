import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
} from "../../typings/models/user/dto";

export interface IUserService {
  registerUser(userCreateDto: UserCreateDto): Promise<UserReadDto>;
  loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult>;
  getById(id: string): Promise<UserReadDto>;
  getAuthResult(payload: object): Promise<AuthorizedResult>; // TODO:
}
