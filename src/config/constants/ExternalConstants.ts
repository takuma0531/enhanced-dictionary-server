import { initDotenv } from "..";

initDotenv();

export class ExternalConstants {
  public static readonly TRANSLATION_API_URL = process.env.TRANSLATION_API_URL;
}
