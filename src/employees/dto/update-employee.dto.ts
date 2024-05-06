import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto {
  first_name?: string;
  last_name?: string;
  position?: string;
  salary?: number;
}
