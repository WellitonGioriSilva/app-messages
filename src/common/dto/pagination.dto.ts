import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export default class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  limit: number;
}
