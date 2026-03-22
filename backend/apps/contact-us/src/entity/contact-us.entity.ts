import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('contact-us')
export class ContactUsEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    email:string;

    @Column({nullable:false})
    phone:string;

    @Column({nullable:false})
    message:string;

    @Column({default:false})
    contacted:boolean
    
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}