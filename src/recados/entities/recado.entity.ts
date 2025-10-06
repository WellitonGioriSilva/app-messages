import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Relação muitos-para-um com Pessoa
  @JoinColumn({ name: 'de' }) // Define a coluna de junção
  de: Pessoa;

  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Relação muitos-para-um com Pessoa
  @JoinColumn({ name: 'para' }) // Define a coluna de junção
  para: Pessoa;

  @Column({ type: 'boolean', default: false })
  lido: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt?: Date;
}
