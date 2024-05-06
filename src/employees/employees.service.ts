import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee) private employeRepo: typeof Employee) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeRepo.create(createEmployeeDto);
  }

  findAll() {
    return this.employeRepo.findAll();
  }

  findOne(id: number) {
    return this.employeRepo.findOne({ where: { id } });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeRepo.update(updateEmployeeDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.employeRepo.destroy({ where: { id } });
  }
}
