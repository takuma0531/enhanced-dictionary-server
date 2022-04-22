import { MockUserRepository } from "../../db/repositories/mock/MockUserRepository";
import { jwtTokenService } from "../token/TokenService";
import { UserService } from "./UserService";
import { UserCreateDto, UserUpdateDto } from "../../typings/models/user/dto";

const mockUserRepository = new MockUserRepository();
const userService = new UserService(mockUserRepository, jwtTokenService);

const mockItems: UserCreateDto[] = [
  {
    email: "test1@email.com",
    password: "password1",
    words: [],
  },
  {
    email: "test2@email.com",
    password: "password2",
    words: [],
  },
];

beforeEach(async () => {
  for (const item of mockItems) {
    await userService.registerUser(item);
  }
});

describe("test UserService", () => {
  test("test UserService loginUser method", async () => {
    const { email, password } = mockItems[0];
    const authorizedResult = await userService.loginUser({ email, password });

    expect(authorizedResult.isAuthorized).toBe(true);
  });

  test("test UserService getById method", async () => {
    const mockUserTable = await mockUserRepository.getAll();
    const mockUser1 = mockUserTable[0];
    const userReadDto = await userService.getById(mockUser1._id);

    expect(mockUserTable[0].email).toBe(userReadDto.email);
  });

  test("test UserService updateUser method", async () => {
    const mockUserTable = await mockUserRepository.getAll();
    const mockUser1 = mockUserTable[0];
    const userUpdateDto: UserUpdateDto = {
      id: mockUser1._id,
      email: "test1.update@email.com",
      password: "password1",
      words: [],
    };
    const userReadDto = await userService.updateUser(userUpdateDto);

    expect(userReadDto.email).toBe(userUpdateDto.email);
  });

  test("test UserService removeUser method", async () => {
    const mockUserTable = await mockUserRepository.getAll();
    const mockUser1 = mockUserTable[0];
    await userService.removeUser(mockUser1._id);
    const mockUserTablesToCheck = await mockUserRepository.getAll();
    const found = mockUserTablesToCheck.find(
      (element) => element.email == mockUser1.email
    );

    expect(found).toBe(undefined);
  });

  test("test UserService getAuthResult method", async () => {
    const mockUserTable = await mockUserRepository.getAll();
    const mockUser1 = mockUserTable[0];
    const authorizedResult = await userService.getAuthResult({
      id: mockUser1._id,
      email: mockUser1.email,
    });

    expect(authorizedResult.isAuthorized).toBe(true);
  });
});
