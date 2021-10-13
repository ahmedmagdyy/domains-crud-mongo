import { IsString } from 'class-validator';

export class UpdateDomainDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly id: string;
}
