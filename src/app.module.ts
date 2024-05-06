import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { CarModelModule } from './car_model/car_model.module';
import { OrderStatusIdModule } from './order_status_id/order_status.module';
import { PaymentsModule } from './payments/payments.module';
import { EmployeesModule } from './employees/employees.module';
import { ServicesModule } from './services/services.module';
import { CarsModule } from './cars/cars.module';
import { ServiceRecordsModule } from './service_records/service_records.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [__dirname + 'dist/**/*.models{.ts,.js}'],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    AdminModule,
    CategoryModule,
    CarModelModule,
    OrderStatusIdModule,
    PaymentsModule,
    EmployeesModule,
    ServicesModule,
    CarsModule,
    ServiceRecordsModule,
    OrdersModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
