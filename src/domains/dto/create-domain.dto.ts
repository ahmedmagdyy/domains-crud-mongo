import { IsInt, IsString } from 'class-validator';

export class CreateDomainDto {
  @IsString()
  readonly domainName: string;

  @IsString()
  readonly ownerName: string;

  @IsInt()
  readonly ownerId: number;
}
