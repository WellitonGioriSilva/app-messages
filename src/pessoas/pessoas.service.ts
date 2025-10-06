import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoa = {
        nome: createPessoaDto.nome,
        senhaHash: createPessoaDto.senha,
        email: createPessoaDto.email,
      };

      const novaPessoa = this.pessoaRepository.create(pessoa);
      return this.pessoaRepository.save(novaPessoa);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists!');
      }
      throw error;
    }
  }

  findAll(paginationDto: PaginationDto = { offset: 0, limit: 10 }) {
    const { offset, limit } = paginationDto;
    const pessoas = this.pessoaRepository.find({
      take: limit,
      skip: offset,
    });
    return pessoas;
  }

  async findOne(id: number) {
    if (id <= 0 || isNaN(id)) {
      throw new BadRequestException('ID invalid!');
    }

    const pessoa = await this.pessoaRepository.findOne({
      where: { id },
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa not found!');
    }

    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    try {
      const partialUpdatePessoa = {
        nome: updatePessoaDto?.nome,
        senhaHash: updatePessoaDto?.senha,
      };

      const pessoa = await this.pessoaRepository.preload({
        id,
        ...partialUpdatePessoa,
      });

      if (!pessoa) {
        throw new Error('Pessoa not found!');
      }

      return await this.pessoaRepository.save(pessoa);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists!');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const pessoa = await this.findOne(id);

    return this.pessoaRepository.remove(pessoa);
  }
}
