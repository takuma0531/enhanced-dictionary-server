import { initDotenv } from "..";

initDotenv();

export class DbConstants {
  public static readonly DB_CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING ||
    "mongodb://localhost:27017/enhanced-dictionary";
}
