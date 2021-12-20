import { WordRepository } from "../db/repositories/word/WordRepository";
import { WordService } from "../services/word/WordService";
import { WordController } from "../controllers/WordController";
import { Word } from "../db/models/word/word.model";

const wordRepository = new WordRepository(Word);
const wordService = new WordService(wordRepository);
export const wordController = new WordController(wordService);
