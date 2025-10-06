import { Module } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { RecadosController } from './recados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), PessoasModule], // Adicione suas entidades aqui
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
