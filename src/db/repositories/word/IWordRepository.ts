import { IRepository } from "../base/IRepository";
import { WordDocument } from "../../../typings/models/word";

export interface IWordRepository extends IRepository<WordDocument> {
  getByUserId(userId: string): Promise<WordDocument[] | null>;
}
