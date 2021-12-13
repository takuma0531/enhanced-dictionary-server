import { Document } from "mongoose";

export interface IRepository<TDocument extends Document> {
  add(document: TDocument): Promise<TDocument>;
  getAll(): Promise<TDocument[]>;
  getById(id: string): Promise<TDocument | null>;
  removeById(id: string): Promise<void>;
  updateById(id: string, data: any): Promise<TDocument | null>;
}
