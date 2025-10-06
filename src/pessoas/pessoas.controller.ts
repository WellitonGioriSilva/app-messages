import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { ResponseDto } from 'src/common/dto/response.dto';
import PaginationDto from 'src/common/dto/pagination.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const pessoas = await this.pessoasService.findAll();

    const response: ResponseDto<Pessoa[]> = {
      statusCode: pessoas.length === 0 ? 404 : 200,
      data: pessoas,
      offset: paginationDto.offset,
      limit: paginationDto.limit,
      total: pessoas.length,
    };
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pessoa = await this.pessoasService.findOne(+id);

    const response: ResponseDto<Pessoa> = {
      statusCode: 200,
      data: pessoa,
    };

    return response;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasService.remove(+id);
  }
}
