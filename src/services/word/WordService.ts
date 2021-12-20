// TODO: from word service
import {
  WordReadDto,
  WordCreateDto,
  WordUpdateDto,
} from "../../typings/models/word/dto";
import { IWordService } from "./IWordService";
import { IWordRepository } from "../../db/repositories/word/IWordRepository";
import { Word } from "../../db/models/word/word.model";
import { RandomNumberGenerator } from "../../utils/RandomNumberGenerator";

export class WordService implements IWordService {
  constructor(private readonly _wordRepository: IWordRepository) {}

  public async registerWord(
    wordCreateDto: WordCreateDto
  ): Promise<WordReadDto> {
    try {
      const userId = wordCreateDto.user as string;
      const wordReadDtos = await this.getWordsByUserId(userId);

      let wordObjectId: string | null = null;
      if (wordReadDtos != null) {
        for (let i = 0; i < wordReadDtos?.length; i++) {
          if (wordReadDtos[i].detectedText == wordCreateDto.detectedText)
            wordObjectId = wordReadDtos[i].id as string;
        }
      }

      let wordReadDtoToReturn;
      if (wordObjectId) {
        wordReadDtoToReturn = await this.refreshCountOfWordPlayed(wordObjectId);
      } else {
        const document = Word.toDocument(wordCreateDto);
        const word = await this._wordRepository.add(document);
        wordReadDtoToReturn = word.toReadDto();
      }

      return wordReadDtoToReturn;
    } catch (err) {
      throw err;
    }
  }

  public async getWordsByUserId(userId: string): Promise<WordReadDto[] | null> {
    try {
      const words = await this._wordRepository.getByUserId(userId);
      return words;
    } catch (err) {
      throw err;
    }
  }

  public async getWordsForMemoryGame(
    userId: string,
    numberOfPairs: number
  ): Promise<WordReadDto[] | null> {
    try {
      let filteredWordReadDtos: WordReadDto[] = [];
      const words = await this._wordRepository.getByUserId(userId);
      if (words == null) return null;

      const randomIntegerList: number[] = RandomNumberGenerator.generateNumbers(
        numberOfPairs,
        words.length
      );

      for (let i = 0; i < randomIntegerList.length; i++) {
        const filteredWord = words[randomIntegerList[i]].toReadDto();
        filteredWordReadDtos.push(filteredWord);
      }
      return filteredWordReadDtos;
    } catch (err) {
      throw err;
    }
  }

  public async updateWord(wordUpdateDto: WordUpdateDto): Promise<WordReadDto> {
    try {
      const updatedWord = await this._wordRepository.updateById(
        wordUpdateDto.id!,
        wordUpdateDto
      );
      if (updatedWord == null) throw "This update is invalid";
      const wordReadDto = updatedWord.toReadDto();
      return wordReadDto;
    } catch (err) {
      throw err;
    }
  }

  public async incrementCountOfWordPlayed(
    wordId: string
  ): Promise<WordReadDto> {
    try {
      const word = await this._wordRepository.getById(wordId);
      if (word == null) throw "This update is invalid";

      word.count++;

      if (word.count <= 7) {
        word.dateMemorized = new Date();
      }
      const updatedWord = await this._wordRepository.updateById(wordId, word);
      if (updatedWord == null) throw "something went wrong";
      const wordReadDto = updatedWord.toReadDto();
      return wordReadDto;
    } catch (err) {
      throw err;
    }
  }

  public async refreshCountOfWordPlayed(wordId: string): Promise<WordReadDto> {
    try {
      const word = await this._wordRepository.getById(wordId);
      if (word == null) throw "This update is invalid";

      word.count = 0;
      const updatedWord = await this._wordRepository.updateById(wordId, word);
      if (updatedWord == null) throw "something went wrong";
      const wordReadDto = updatedWord.toReadDto();
      return wordReadDto;
    } catch (err) {
      throw err;
    }
  }

  public async removeWord(wordId: string): Promise<void> {
    try {
      await this._wordRepository.removeById(wordId);
    } catch (err) {
      throw err;
    }
  }
}
