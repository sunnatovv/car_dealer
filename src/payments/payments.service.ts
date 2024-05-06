import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentRepo: typeof Payment) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepo.create(createPaymentDto);
  }

  findAll() {
    return this.paymentRepo.findAll();
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({ where: { id } });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepo.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.paymentRepo.destroy({ where: { id } });
  }
}
