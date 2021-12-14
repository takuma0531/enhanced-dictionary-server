import {
  AuthorizedResult,
  UserCreateDto,
  UserLoginRequestDto,
  UserReadDto,
  UserUpdateDto,
} from "../../typings/models/user/dto";
import { CustomJwtPayload } from "../../typings/common";
import { IUserService } from "./IUserService";
import { ITokenService } from "../token/ITokenService";
import { BCryptService } from "../crypto/BcryptService";
import { IUserRepository } from "../../db/repositories/user/IUserRepository";
import { User } from "../../db/models/user/user.model";
import { JwtConstants } from "../../config/constants";

export class UserService implements IUserService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _tokenService: ITokenService
  ) {}

  public async registerUser(
    userCreateDto: UserCreateDto
  ): Promise<UserReadDto> {
    try {
      userCreateDto.password = await BCryptService.encrypt(
        userCreateDto.password
      );
      const document = User.toDocument(userCreateDto);
      const user = await this._userRepository.add(document);

      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = this._tokenService.generateJwt(payload);
      const auth: AuthorizedResult = {
        token,
        expireIn: JwtConstants.JWT_EXPIRE_IN,
        isAuthorized: true,
      };

      const userReadDto = user.toReadDto();
      userReadDto.authResult = auth;

      return userReadDto;
    } catch (err) {
      throw err;
    }
  }

  public async loginUser(
    userLoginRequestDto: UserLoginRequestDto
  ): Promise<AuthorizedResult> {
    try {
      const authorizedResult: AuthorizedResult = {
        token: null,
        expireIn: null,
        isAuthorized: false,
      };

      const user = await this._userRepository.getByEmail(
        userLoginRequestDto.email
      );
      if (!user) return authorizedResult;

      const isPasswordMatched = await BCryptService.compare(
        userLoginRequestDto.password,
        user.password
      );
      if (!isPasswordMatched) return authorizedResult;

      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = this._tokenService.generateJwt(payload);

      authorizedResult.token = token;
      authorizedResult.expireIn = JwtConstants.JWT_EXPIRE_IN;
      authorizedResult.isAuthorized = true;

      return authorizedResult;
    } catch (err) {
      throw err;
    }
  }

  public async getById(id: string): Promise<UserReadDto> {
    try {
      const document = await this._userRepository.getById(id);
      if (!document) throw "user wasn't found";
      return document.toReadDto();
    } catch (err) {
      throw err;
    }
  }

  public async updateUser(userUpdateDto: UserUpdateDto): Promise<UserReadDto> {
    try {
      const document = await this._userRepository.updateById(
        userUpdateDto.id!,
        userUpdateDto
      );
      if (!document) throw "something went wrong";
      return document.toReadDto();
    } catch (err) {
      throw err;
    }
  }

  public async removeUser(userId: string): Promise<void> {
    try {
      await this._userRepository.removeById(userId);
    } catch (err) {
      throw err;
    }
  }

  public async getAuthResult(
    payload: CustomJwtPayload
  ): Promise<AuthorizedResult> {
    try {
      const authorizedResult: AuthorizedResult = {
        token: null,
        expireIn: null,
        isAuthorized: false,
      };
      const token = this._tokenService.generateJwt(payload);

      authorizedResult.token = token;
      authorizedResult.expireIn = JwtConstants.JWT_EXPIRE_IN;
      authorizedResult.isAuthorized = true;

      return authorizedResult;
    } catch (err) {
      throw err;
    }
  }
}
