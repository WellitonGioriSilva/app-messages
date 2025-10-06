import { IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly texto: string;

  @IsPositive()
  readonly deId: number;

  @IsPositive()
  readonly paraId: number;
}
