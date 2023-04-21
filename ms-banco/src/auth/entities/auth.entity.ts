import { PartialType } from "@nestjs/swagger";
import {isNotEmpty} from 'class-validator'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
export class Auth {
    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column()
    name: string;
  
    @Column({unique:true})
    email: string;
  
    @Column()
    password:string;
    
}
