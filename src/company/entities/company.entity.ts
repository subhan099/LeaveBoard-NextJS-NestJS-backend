import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  // @Column()
  // image: string;

  // @Column({ type: 'bytea', nullable: true })
  // image: Buffer;

  @ManyToOne(() => User, (user) => user.company)
  user: User;
}
