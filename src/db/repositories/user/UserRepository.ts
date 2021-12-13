import { UserDocument } from "../../../typings/models/user";
import { Repository } from "../base/Repository";
import { IUserRepository } from "./IUserRepository";

export class UserRepository
  extends Repository<UserDocument>
  implements IUserRepository
{
  public async getByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this._model.findOne({ email }).populate("words");
      return user;
    } catch (err) {
      throw err;
    }
  }
}
