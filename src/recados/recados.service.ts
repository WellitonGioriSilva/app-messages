import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { AddHeaderInterceptor } from 'src/common/interceptor/add-header.interceptor';

@Injectable()
@UseInterceptors(AddHeaderInterceptor) // Aplica o interceptor a todos os métodos do serviço
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoasService,
  ) {}

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;
    const de = await this.pessoaService.findOne(deId);
    const para = await this.pessoaService.findOne(paraId);

    const novoRecado = {
      ...createRecadoDto,
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);

    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async findAll(paginationDto: PaginationDto = { offset: 0, limit: 10 }) {
    const { offset, limit } = paginationDto;

    const recados = await this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
          email: false,
          senhaHash: false,
          createdAt: false,
          updatedAt: false,
        },
        para: {
          id: true,
          nome: true,
          email: false,
          senhaHash: false,
          createdAt: false,
          updatedAt: false,
        },
      },
    });
    return recados;
  }

  async findOne(id: number) {
    if (id <= 0 || isNaN(id)) {
      throw new BadRequestException('ID invalid!');
    }

    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (!recado) {
      throw new NotFoundException(`Recado not found`);
    }
    return recado;
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.findOne(id);

    recado.texto = updateRecadoDto.texto ?? recado.texto;
    recado.lido = updateRecadoDto.lido ?? recado.lido;

    await this.recadoRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.findOne(id);

    return this.recadoRepository.remove(recado);
  }
}
