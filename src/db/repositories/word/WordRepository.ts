import { WordDocument } from "../../../typings/models/word";
import { IWordRepository } from "./IWordRepository";
import { Repository } from "../base/Repository";

export class WordRepository
  extends Repository<WordDocument>
  implements IWordRepository {}
