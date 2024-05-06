import { Module } from '@nestjs/common';
import { ServiceRecordsService } from './service_records.service';
import { ServiceRecordsController } from './service_records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceRecord } from './models/service_record.model';

@Module({
  imports: [SequelizeModule.forFeature([ServiceRecord])],
  controllers: [ServiceRecordsController],
  providers: [ServiceRecordsService],
})
export class ServiceRecordsModule {}
