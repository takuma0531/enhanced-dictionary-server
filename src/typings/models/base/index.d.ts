import { Document } from "mongoose";
import { BaseCreateDto, BaseReadDto } from "./dto";

export interface IHasCustomMethod<TReadDto extends BaseReadDto> {
  toReadDto: () => TReadDto;
}

export interface IHasCustomStaticMethod<
  TDocument extends Document,
  TCreateDto extends BaseCreateDto
> {
  toDocument: (createDto: TCreateDto) => TDocument;
}
