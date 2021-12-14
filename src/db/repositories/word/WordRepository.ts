import { WordDocument } from "../../../typings/models/word";
import { IWordRepository } from "./IWordRepository";
import { Repository } from "../base/Repository";

export class WordRepository
  extends Repository<WordDocument>
  implements IWordRepository
{
  public async getByUserId(userId: string): Promise<WordDocument[] | null> {
    try {
      const words = await this._model.find({ user: userId });
      return words;
    } catch (err) {
      throw err;
    }
  }
}
