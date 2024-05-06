import { PartialType } from '@nestjs/swagger';
import { CreateServiceRecordDto } from './create-service_record.dto';

export class UpdateServiceRecordDto {
  car_id?: number;
  service_id?: number;
  employee_id?: number;
  service_date?: Date;
}
