import { Module } from '@nestjs/common';
import { CarModelService } from './car_model.service';
import { CarModelController } from './car_model.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from './models/car_model.model';

@Module({
  imports: [SequelizeModule.forFeature([CarModel])],
  controllers: [CarModelController],
  providers: [CarModelService],
})
export class CarModelModule {}
