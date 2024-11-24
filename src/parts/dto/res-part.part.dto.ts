import { CreatePartDto } from './create-part.dto';
import { UpdatePartDto } from './update-part.dto';

export class ResPartDto {
  readonly id: number;
  readonly sectionId: number;
  readonly name: string;

  constructor({ id, sectionId, name }) {
    this.id = id;
    this.sectionId = sectionId;
    this.name = name;
  }

  static from(part: ResPartDto) {
    return new ResPartDto(part);
  }

  static fromArray(parts: ResPartDto[]) {
    return parts.map((part) => new ResPartDto(part));
  }
}
