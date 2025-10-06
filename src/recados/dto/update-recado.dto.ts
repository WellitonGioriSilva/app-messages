import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  @IsOptional()
  readonly texto: string;

  @IsOptional()
  readonly deId: number;

  @IsOptional()
  readonly paraId: number;

  @IsBoolean()
  @IsOptional()
  readonly lido: boolean;
}
