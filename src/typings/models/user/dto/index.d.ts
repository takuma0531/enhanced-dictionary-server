import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { User } from "../";

export interface UserReadDto extends BaseReadDto {
  email: User["email"];
  words: User["words"];
  authResult?: AuthorizedResult;
}

export interface UserCreateDto extends BaseCreateDto {
  email: User["email"];
  password: User["password"];
  words?: User["words"];
}

export interface UserUpdateDto extends BaseUpdateDto {
  email?: User["email"];
  password?: User["password"];
  words?: User["words"];
}

export interface UserLoginRequestDto {
  email: User["email"];
  password: User["password"];
}

export interface AuthorizedResult {
  token?: string | null;
  expireIn?: any;
  isAuthorized: boolean;
}
