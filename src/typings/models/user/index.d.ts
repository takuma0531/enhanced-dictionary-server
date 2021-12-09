import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { UserReadDto, UserCreateDto, UserUpdateDto } from "./dto";
import { WordDocument } from "../word";

export interface User {
  email: string;
  password: string;
  words: WordDocument[];
}

export interface UserDocument extends User, Document, IHasCustomUserMethod {}

export interface UserModel
  extends Model<UserDocument>,
    IHasCustomUserStaticMethod {}

export interface IHasCustomUserMethod extends IHasCustomMethod<UserReadDto> {}

export interface IHasCustomUserStaticMethod
  extends IHasCustomStaticMethod<UserDocument, UserCreateDto> {}
