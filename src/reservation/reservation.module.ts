import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Seat } from './entities/seat.entity';
import { Show } from 'src/show/entities/show.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([Reservation,Seat,Show])],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [TypeOrmModule,ReservationService]
})
export class ReservationModule {}
