import { Document, Model } from "mongoose";
import { IRepository } from "./IRepository";

export class Repository<TDocument extends Document>
  implements IRepository<TDocument>
{
  protected readonly _model: Model<TDocument>;

  constructor(model: Model<TDocument>) {
    this._model = model;
  }

  public async add(document: TDocument): Promise<TDocument> {
    try {
      const createdDocument = await this._model.create(document);
      return createdDocument;
    } catch (err) {
      throw err;
    }
  }

  public async getAll(): Promise<TDocument[]> {
    try {
      const documents = await this._model.find();
      return documents;
    } catch (err) {
      throw err;
    }
  }

  public async getById(id: string): Promise<TDocument | null> {
    try {
      const document = await this._model.findById(id);
      return document;
    } catch (err) {
      throw err;
    }
  }

  public async removeById(id: string): Promise<void> {
    try {
      const document = await this._model.findById(id);
      await document?.remove();
    } catch (err) {
      throw err;
    }
  }

  public async updateById(id: string, data: any): Promise<TDocument | null> {
    try {
      const document = await this._model.findByIdAndUpdate(id, data);
      return document;
    } catch (err) {
      throw err;
    }
  }
}
