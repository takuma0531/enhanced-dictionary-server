import { Schema, model } from "mongoose";
import { wordPlugin } from "./word.plugin";
import { WordDocument, WordModel } from "../../../typings/models/word";

const wordSchema = new Schema<WordDocument>(
  {
    detectedText: {
      type: String,
      required: true,
    },
    detectedLanguage: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    targetText: {
      type: String,
      required: true,
    },
    targetLanguage: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    isMemorized: {
      type: Boolean,
      required: true,
      default: false,
    },
    dateMemorized: {
      type: Date,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

wordPlugin(wordSchema);

export const Word = model<WordDocument, WordModel>("Word", wordSchema);
