import { Injectable } from '@nestjs/common';
import { CreateServiceRecordDto } from './dto/create-service_record.dto';
import { UpdateServiceRecordDto } from './dto/update-service_record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ServiceRecord } from './models/service_record.model';

@Injectable()
export class ServiceRecordsService {
  constructor(
    @InjectModel(ServiceRecord) private serviceRecRepo: typeof ServiceRecord,
  ) {}
  create(createServiceRecordDto: CreateServiceRecordDto) {
    return this.serviceRecRepo.create(createServiceRecordDto);
  }

  findAll() {
    return this.serviceRecRepo.findAll({ include: { all: true } });
  }
  findOne(id: number) {
    return this.serviceRecRepo.findOne({ where: { id } });
  }

  update(id: number, updateServiceRecordDto: UpdateServiceRecordDto) {
    return this.serviceRecRepo.update(updateServiceRecordDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.serviceRecRepo.destroy({ where: { id } });
  }
}
