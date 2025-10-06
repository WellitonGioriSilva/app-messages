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
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import PaginationDto from '../common/dto/pagination.dto';
import { Recado } from './entities/recado.entity';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const recados = await this.recadosService.findAll(paginationDto);

    const response: ResponseDto<Recado[]> = {
      statusCode: recados.length === 0 ? 404 : 200,
      data: recados,
      offset: paginationDto.offset,
      limit: paginationDto.limit,
      total: recados.length,
    };
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recado = await this.recadosService.findOne(+id);

    const response: ResponseDto<Recado> = {
      statusCode: 200,
      data: recado,
    };

    return response;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(+id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadosService.remove(+id);
  }
}
