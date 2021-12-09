import { Schema } from "mongoose";
import { UserDocument } from "../../../typings/models/user";
import { UserReadDto, UserCreateDto } from "../../../typings/models/user/dto";

export const userPlugin = (userSchema: Schema<UserDocument>) => {
  userSchema.static(
    "toDocument",
    function (userCreateDto: UserCreateDto): UserDocument {
      return new this(userCreateDto);
    }
  );

  userSchema.method("toReadDto", function (): UserReadDto {
    const userReadDto: UserReadDto = {
      id: this._id,
      email: this.email,
      words: this.words,
    };
    return userReadDto;
  });
};
