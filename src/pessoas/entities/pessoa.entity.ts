import { IsEmail } from 'class-validator';
import { Recado } from 'src/recados/entities/recado.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  senhaHash: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @OneToMany(() => Recado, (recado) => recado.de) // relação inversa, para ter acesso aos recados enviados por essa pessoa
  recadosEnviados: Recado[];

  @OneToMany(() => Recado, (recado) => recado.para) // relação inversa, para ter acesso aos recados recebidos por essa pessoa
  recadosRecebidos: Recado[];
}
