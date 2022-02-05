import {
  WordCreateDto,
  WordReadDto,
  WordUpdateDto,
} from "../../typings/models/word/dto";

export interface IWordService {
  registerWord(wordCreateDto: WordCreateDto): Promise<WordReadDto>;
  getWordsByUserId(userId: string): Promise<WordReadDto[] | null>;
  getWordsForMemoryGame(
    userId: string,
    numberOfPairs: number
  ): Promise<WordReadDto[] | null>;
  updateWord(wordUpdateDto: any): Promise<WordReadDto>;
  incrementCountOfWordPlayed(wordId: string): Promise<WordReadDto>;
  refreshCountOfWordPlayed(wordId: string): Promise<WordReadDto>;
  removeWord(wordId: string): Promise<void>;
}
