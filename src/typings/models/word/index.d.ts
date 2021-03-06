import { Model, Document } from "mongoose";
import { IHasCustomMethod, IHasCustomStaticMethod } from "../base";
import { UserDocument } from "../user";
import { WordReadDto, WordCreateDto, WordUpdateDto } from "./dto";

export interface Word {
  detectedText: string;
  definition: string;
  detectedLanguage: string;
  targetText: string;
  targetLanguage: string;
  count: number;
  isMemorized: boolean;
  dateMemorized: Date;
  user: string | UserDocument;
}

export interface WordDocument extends Word, Document, IHasCustomWordMethod {}

export interface WordModel
  extends Model<WordDocument>,
    IHasCustomWordStaticMethod {}

export interface IHasCustomWordMethod extends IHasCustomMethod<WordReadDto> {}

export interface IHasCustomWordStaticMethod
  extends IHasCustomStaticMethod<WordDocument, WordCreateDto> {}
