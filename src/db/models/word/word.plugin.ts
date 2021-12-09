import { Schema } from "mongoose";
import { WordDocument } from "../../../typings/models/word";
import { WordReadDto, WordCreateDto } from "../../../typings/models/word/dto";

export const wordPlugin = (wordSchema: Schema<WordDocument>) => {
  wordSchema.static(
    "toDocument",
    function (wordCreateDto: WordCreateDto): WordDocument {
      return new this(wordCreateDto);
    }
  );

  wordSchema.method("toReadDto", function (): WordReadDto {
    const wordReadDto: WordReadDto = {
      id: this._id,
      detectedText: this.detectedText,
      detectedLanguage: this.detectedLanguage,
      definition: this.definition,
      targetText: this.targetText,
      targetLanguage: this.targetLanguage,
      count: this.count,
      //   user: this.user,
    };
    return wordReadDto;
  });
};
