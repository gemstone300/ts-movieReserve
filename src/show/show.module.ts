import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [ReservationModule,TypeOrmModule.forFeature([Show])],
  providers: [ShowService],
  controllers: [ShowController],
  exports: [TypeOrmModule]
})
export class ShowModule {}