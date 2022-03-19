import { Request, Response } from "express";
import { IWordService } from "../services/word/IWordService";
import { BaseController } from "./base/BaseController";
import {
  WordReadDto,
  WordCreateDto,
  WordUpdateDto,
} from "../typings/models/word/dto";

export class WordController extends BaseController {
  constructor(private readonly _wordService: IWordService) {
    super();
  }

  // @route     POST api/v1/words/user
  // @desc      register unknown word for user
  // @access    private
  public async createWord(req: Request, res: Response) {
    try {
      const { id } = req.userClaims;
      const wordCreateDto: WordCreateDto = req.body;
      wordCreateDto.user = id;
      const wordReadDto = await this._wordService.registerWord(wordCreateDto);
      return super.created<WordReadDto>(res, wordReadDto);
    } catch (err: any) {
      console.log(err.message);
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/words/user
  // @desc      get all words registered for user
  // @access    private
  public async getWordsByUserId(req: Request, res: Response) {
    try {
      const { id } = req.userClaims;
      const wordReadDtos = await this._wordService.getWordsByUserId(id!);
      if (wordReadDtos == null) return super.notFound(res);
      return super.ok(res, wordReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     GET api/v1/words/user/memory-game?numberOfPairs=
  // @desc      get words registered for user playing memory game
  // @access    private
  public async getWordsForMemoryGame(req: Request, res: Response) {
    try {
      const { id } = req.userClaims;
      const { numberOfPairs } = req.query as any;
      const convertedNumberOfPairs = Number(numberOfPairs);
      const wordReadDtos = await this._wordService.getWordsForMemoryGame(
        id!,
        convertedNumberOfPairs
      );
      if (wordReadDtos == null) return super.notFound(res);
      return super.ok(res, wordReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/words/user
  // @desc      update a word
  // @access    private
  public async updateWord(req: Request, res: Response) {
    try {
      const wordUpdateDto: WordUpdateDto = req.body;
      const wordReadDto = await this._wordService.updateWord(wordUpdateDto);
      if (wordReadDto == null) return super.notFound(res);
      return super.ok(res, wordReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/words/user/incrementing-count-of-word-played
  // @desc      increment the count of word played in memory game
  // @access    private
  public async incrementCountOfWordPlayed(req: Request, res: Response) {
    try {
      const words: WordUpdateDto[] = req.body;
      const wordReadDtos: WordReadDto[] = [];
      words.every(async (word) => {
        const wordReadDto = await this._wordService.incrementCountOfWordPlayed(
          word.id!
        );
        wordReadDtos.push(wordReadDto);
      });
      return super.ok(res, wordReadDtos);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     PUT api/v1/words/user/refreshing-count-of-word-played?wordId=
  // @desc      refresh the count of word played in mory game
  // @access    private
  public async refreshCountOfWordPlayed(req: Request, res: Response) {
    try {
      const { wordId }: { wordId: string } = req.query as any;
      const wordReadDto = await this._wordService.refreshCountOfWordPlayed(
        wordId
      );
      if (wordReadDto == null) return super.notFound(res);
      return super.ok(res, wordReadDto);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }

  // @route     DELETE api/v1/words/user?wordId=
  // @desc      remove a word
  // @access    private
  public async deleteWord(req: Request, res: Response) {
    try {
      const { wordId }: { wordId: string } = req.query as any;
      await this._wordService.removeWord(wordId);
      return super.ok(res);
    } catch (err: any) {
      return super.internalServerError(res, err);
    }
  }
}
