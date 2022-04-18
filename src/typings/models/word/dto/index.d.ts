import { BaseReadDto, BaseCreateDto, BaseUpdateDto } from "../../base/dto";
import { Word } from "../";

export interface WordReadDto extends BaseReadDto {
  detectedText: Word["detectedText"];
  detectedLanguage: Word["detectedLanguage"];
  definition: Word["definition"];
  targetText: Word["targetText"];
  targetLanguage: Word["targetLanguage"];
  count: Word["count"];
  isMemorized: Word["isMemorized"];
  dateMemorized: Word["dateMemorized"];
  user?: Word["user"];
}

export interface WordCreateDto extends BaseCreateDto {
  detectedText: Word["detectedText"];
  detectedLanguage: Word["detectedLanguage"];
  definition: Word["definition"];
  targetText: Word["targetText"];
  targetLanguage: Word["targetLanguage"];
  count?: Word["count"];
  isMemorized?: Word["isMemorized"];
  user?: Word["user"];
}

export interface WordUpdateDto extends BaseUpdateDto {
  detectedText?: Word["detectedText"];
  detectedLanguage?: Word["detectedLanguage"];
  definition?: Word["definition"];
  targetText?: Word["targetText"];
  targetLanguage?: Word["targetLanguage"];
  count?: Word["count"];
  isMemorized?: Word["isMemorized"];
  dateMemorized?: Word["dateMemorized"];
  user?: Word["user"];
}

export interface WordSearchDto {
  detectedText?: Word["detectedText"];
  detectedLanguage?: Word["detectedLanguage"];
  definition?: Word["definition"];
  targetText?: Word["targetText"];
  targetLanguage?: Word["targetLanguage"];
}
