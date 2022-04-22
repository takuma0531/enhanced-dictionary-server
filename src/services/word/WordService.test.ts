import { MockWordRepository } from "../../db/repositories/mock";
import { WordService } from "./WordService";
import { WordCreateDto, WordUpdateDto } from "../../typings/models/word/dto";


const mockWordRepository = new MockWordRepository();
const wordService = new WordService(mockWordRepository);

const mockUserIds = ["user1_objectId", "user2_objectId"];

const mockItems: WordCreateDto[] = [
  {
    detectedText: "word1",
    detectedLanguage: "en",
    definition: "def of word1",
    targetText: "translatedWord1",
    targetLanguage: "ja",
    count: 0,
    isMemorized: false,
    user: mockUserIds[0],
  },
  {
    detectedText: "word2",
    detectedLanguage: "en",
    definition: "def of word2",
    targetText: "translatedWord2",
    targetLanguage: "ja",
    count: 0,
    isMemorized: false,
    user: mockUserIds[0],
  },
  {
    detectedText: "word3",
    detectedLanguage: "en",
    definition: "def of word3",
    targetText: "translatedWord3",
    targetLanguage: "ja",
    count: 0,
    isMemorized: true,
    user: mockUserIds[0],
  },
  {
    detectedText: "word4",
    detectedLanguage: "en",
    definition: "def of word4",
    targetText: "translatedWord4",
    targetLanguage: "ja",
    count: 0,
    isMemorized: false,
    user: mockUserIds[1],
  },
];

beforeEach(async () => {
  for (const item of mockItems) {
    await wordService.registerWord(item);
  }
});

describe("test WordService", () => {
  test("test WordService getWordsByUserId method", async () => {
    const mockWordTable = await mockWordRepository.getAll();
    console.log(mockWordTable);
    const words = await wordService.getWordsByUserId(mockUserIds[0]);

    expect(words!.length).toBe(3);
  });

  test("test WordService getWordsForMemoryGame method", async () => {
    const words = await wordService.getWordsForMemoryGame(mockUserIds[0], 2);

    expect(words!.length).toBe(2);
  });

  test("test WordService updateWord method", async () => {
    const mockWordTable = await mockWordRepository.getAll();
    const mockWord1 = mockWordTable[0];

    const wordUpdateDto: WordUpdateDto = {
      id: mockWord1._id,
      detectedText: "word1_updated",
      detectedLanguage: "en",
      definition: "def of word1_updated",
      targetText: "translatedWord1_updated",
      targetLanguage: "ja",
      count: 0,
      isMemorized: false,
      user: mockUserIds[0],
    };
    const word = await wordService.updateWord(wordUpdateDto);

    expect(word.detectedText).toBe(wordUpdateDto.detectedText);
  });

  test("test WordService incrementCountOfWordPlayed method", async () => {
    const mockWordTable = await mockWordRepository.getAll();
    const mockWord1 = mockWordTable[0];

    const word = await wordService.incrementCountOfWordPlayed(mockWord1.id);

    expect(word.count).toBe(1);
  });

  test("test WordService refreshCountOfWordPlayed method", async () => {
    const mockWordTable = await mockWordRepository.getAll();
    const mockWord1 = mockWordTable[0];
    const word = await wordService.refreshCountOfWordPlayed(mockWord1.id);

    expect(word.count).toBe(0);
  });

  test("test WordService removeWord method", async () => {
    const mockWordTable = await mockWordRepository.getAll();
    const mockWord1 = mockWordTable[0];
    await wordService.removeWord(mockWord1.id);
    const mockWordTablesToCheck = await mockWordRepository.getAll();
    const found = mockWordTablesToCheck.find(
      (element) => element.detectedText == mockWord1.detectedText
    );

    expect(found).toBe(undefined);
  });
});
