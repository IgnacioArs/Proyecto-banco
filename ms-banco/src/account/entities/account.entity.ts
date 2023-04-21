import { User } from '../../users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    codeCountry: string;
  
    @Column()
    codeRegion: string;
  
    @Column()
    codeCity: string;
  
    @Column()
    codeCounty: string;
  
    @Column()
    description: string;
  
    @Column()
    postalCode: string;
  
    @Column({ nullable: true })
    priority?: number;
  
    @OneToMany(() => User, (user) => user.id, { cascade: true })
    users?: User[];
}
