import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarModelService } from './car_model.service';
import { CreateCarModelDto } from './dto/create-car_model.dto';
import { UpdateCarModelDto } from './dto/update-car_model.dto';

@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Post()
  create(@Body() createCarModelDto: CreateCarModelDto) {
    return this.carModelService.create(createCarModelDto);
  }

  @Get()
  findAll() {
    return this.carModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carModelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarModelDto: UpdateCarModelDto) {
    return this.carModelService.update(+id, updateCarModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carModelService.remove(+id);
  }
}
