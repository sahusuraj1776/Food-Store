import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config';
import { FoodEntity } from './entity/food.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type:'postgres',
        host:'localhost',
        port:DB_PORT,
        database:DB_DATABASE,
        entities:[FoodEntity],
        username:DB_USERNAME,
        password:DB_PASSWORD,
        synchronize:true
      }),
    TypeOrmModule.forFeature([FoodEntity])
    ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
