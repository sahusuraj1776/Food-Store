import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import { hash } from "bcrypt";
import { SALT_OR_ROUNDS } from "../config";

@Entity({name:'users'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column({default:Role.User})
    role:Role

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password,SALT_OR_ROUNDS);
    }
}