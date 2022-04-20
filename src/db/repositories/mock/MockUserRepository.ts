import { IUserRepository } from "../user/IUserRepository";
import { UserDocument } from "../../../typings/models/user";

const userTable: UserDocument[] = [];

export class MockUserRepository implements IUserRepository {
  public async add(document: UserDocument): Promise<UserDocument> {
    userTable.push(document);
    return document;
  }

  public async getByEmail(email: string): Promise<UserDocument | null> {
    const found = userTable.find((user: UserDocument) => user.email == email);
    if (!found) return null;
    return found;
  }

  public async getById(id: string): Promise<UserDocument | null> {
    const found = userTable.find((user: UserDocument) => user._id == id);
    if (!found) return null;
    return found;
  }

  public async updateById(id: string, data: any): Promise<UserDocument | null> {
    const index = userTable.findIndex((user: UserDocument) => user._id == id);
    if (index < 0) return null;
    const { email, password, words } = data;
    const userToUpdate: UserDocument = userTable[index];
    userToUpdate.email = email;
    userToUpdate.password = password;
    userToUpdate.words = words;
    userTable[index] = userToUpdate;
    return userToUpdate;
  }

  public async removeById(id: string): Promise<void> {
    const index = userTable.findIndex((user: UserDocument) => user._id == id);
    userTable.splice(index, 1);
  }

  public async getAll(): Promise<UserDocument[]> {
    return userTable;
  }
}
