
import { IWordRepository } from "../word/IWordRepository";
import { WordDocument } from "../../../typings/models/word";

const wordTable: WordDocument[] = [];

export class MockWordRepository implements IWordRepository {
  public async add(document: WordDocument): Promise<WordDocument> {
    wordTable.push(document);
    return document;
  }

  public async getById(id: string): Promise<WordDocument | null> {
    const found = wordTable.find((word: WordDocument) => word._id == id);
    if (!found) return null;
    return found;
  }

  public async getByUserId(userId: string): Promise<WordDocument[] | null> {
    const words = wordTable.filter((word: WordDocument) => word.user == userId);
    return words;
  }

  public async updateById(id: string, data: any): Promise<WordDocument | null> {
    const index = wordTable.findIndex((word: WordDocument) => word._id == id);
    if (index < 0) return null;
    const {
      detectedText,
      detectedLanguage,
      definition,
      targetText,
      targetLanguage,
      count,
      isMemorized,
      dateMemorized,
      user,
    } = data;
    const wordToUpdate: WordDocument = wordTable[index];
    wordToUpdate.detectedText = detectedText;
    wordToUpdate.detectedLanguage = detectedLanguage;
    wordToUpdate.definition = definition;
    wordToUpdate.targetText = targetText;
    wordToUpdate.targetLanguage = targetLanguage;
    wordToUpdate.count = count;
    wordToUpdate.isMemorized = isMemorized;
    wordToUpdate.dateMemorized = dateMemorized;
    wordToUpdate.user = user;
    wordTable[index] = wordToUpdate;
    return wordToUpdate;
  }

  public async removeById(id: string): Promise<void> {
    const index = wordTable.findIndex((word: WordDocument) => word._id == id);
    wordTable.splice(index, 1);
  }

  public async getAll(): Promise<WordDocument[]> {
    return wordTable;
  }
}
