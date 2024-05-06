import { Injectable } from '@nestjs/common';
import { CreateCarModelDto } from './dto/create-car_model.dto';
import { UpdateCarModelDto } from './dto/update-car_model.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CarModel } from './models/car_model.model';

@Injectable()
export class CarModelService {
  constructor(@InjectModel(CarModel) private carModelRepo: typeof CarModel) {}
  create(createCarModelDto: CreateCarModelDto) {
    return this.carModelRepo.create(createCarModelDto);
  }

  findAll() {
    return this.carModelRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.carModelRepo.findOne({ where: { id } });
  }

  update(id: number, updateCarModelDto: UpdateCarModelDto) {
    return this.carModelRepo.update(updateCarModelDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.carModelRepo.destroy({ where: { id } });
  }
}
