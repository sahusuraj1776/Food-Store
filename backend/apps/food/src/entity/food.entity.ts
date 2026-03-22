import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FoodCategory } from "../enum/food-category.enum";

@Entity('foods')
export class FoodEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    name:string;
    
    @Column({nullable:false})
    description:string;

    @Column({nullable:false})
    category:FoodCategory;

    @Column({nullable:false})
    image:string;

    @Column({type: 'decimal',precision: 10,scale: 2,nullable:false})
    price:number;

    @CreateDateColumn({type:'timestamp with time zone'})
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp with time zone'})
    updatedAt:Date;
}