import { UserDocument } from "../../../typings/models/user";
import { IRepository } from "../base/IRepository";

export interface IUserRepository extends IRepository<UserDocument> {
  getByEmail(email: string): Promise<UserDocument | null>;
}
