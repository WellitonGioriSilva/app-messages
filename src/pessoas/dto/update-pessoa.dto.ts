import { PartialType } from '@nestjs/swagger';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsOptional } from 'class-validator';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
  @IsOptional()
  nome: string;

  @IsOptional()
  senha: string;
}
