import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './models/car.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private carModel: typeof Car) {}
  create(createCarDto: CreateCarDto) {
    return this.carModel.create(createCarDto);
  }

  findAll() {
    return this.carModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.carModel.findOne({ where: { id } });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.carModel.update(updateCarDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.carModel.destroy({ where: { id } });
  }
}
