import bcrypt from "bcrypt";

export class BCryptService {
  public static async encrypt(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw err;
    }
  }

  public static async compare(
    password: string,
    hash: string
  ): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, hash);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
