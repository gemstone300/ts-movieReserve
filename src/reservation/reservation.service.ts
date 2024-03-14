import _ from 'lodash';
import { Repository, DataSource } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReserveShowDto } from './dto/reserve-show.dto';
import { Reservation } from './entities/reservation.entity';
import { Seat } from 'src/reservation/entities/seat.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
      @InjectRepository(Reservation)
      private readonly reserveRepository: Repository<Reservation>,
      @InjectRepository(Seat)
      private readonly seatRepository: Repository<Seat>,
       @InjectRepository(Show)
       private readonly showRepository: Repository<Show>,
       @InjectRepository(User)
       private readonly userRepository: Repository<User>,
      private readonly datasource: DataSource
    ) {}

    //싱글톤 테스트
    // async temptest(userId: number){
    //   const reservation = await this.reserveRepository.findOneBy({userId});
    //   return reservation;
    // }


    async reserve(userId, point, showId, reserveShowDto: ReserveShowDto){  
      const { title, showTime, reservationPrice, reservationQuantity } = reserveShowDto;
      const totalCost = reservationPrice * reservationQuantity;

      if(_.isNil(userId) || _.isNil(point) ){
        throw new BadRequestException(
          '티켓 예매 시, 사용자 정보가 필요합니다',
        );
      }

      if (_.isNil(title) || _.isNil(showTime) || _.isNil(reservationPrice) || _.isNil(reservationQuantity)) {
            throw new BadRequestException(
          '티켓 예매 시, title, showTime, reservationPrice,reservationQuantity 값을 포함해야 합니다.',
        );
      }

      if(point<totalCost){
        throw new ConflictException(
          '사용자의 포인트가 부족합니다.',
        );
      }

      // const count = await this.datasource
      // .getRepository(Seat)
      // .createQueryBuilder('seat')
      // .where('seat.seatAvailable = :seatAvailable', { seatAvailable: 1 })
      // .andWhere('seat.showId = :showId', { showId: showId })
      // .getCount();

      // console.log('count', count);


      // const showList = await this.seatRepository.createQueryBuilder('seat')
      //                     .select('seat.seat_available')
      //                     .orderBy('seat.seat_number','DESC')
      //                     .addSelect('COUNT(*) AS seatsAvailable')
      //                     .groupBy('seat.show_id')
      //                     .getRawMany();  
      // if((+showList[0].seatsAvailable)==0){
      //   throw new ConflictException(
      //     '해당 시간 공연은 매진되었습니다.',
      //   );
      // } 
      
      // if ((+showList[0].seatsAvailable)< reservationQuantity){
      //   throw new ConflictException(
      //     '예매수량 대비 잔여좌석이 부족합니다.',
      //   );
      // }    

      const seatRemain = await this.seatRepository.find({
        where: { showId:showId, seatAvailable:true },
    });

      const num = seatRemain.length;

      if(num==0){
        throw new ConflictException(
          '해당 시간 공연은 매진되었습니다.',
        );
      } 
      
      if (num< reservationQuantity){
        throw new ConflictException(
          '예매수량 대비 잔여좌석이 부족합니다.',
        );
      }

      const seatNumber = await this.seatRepository.find({
        where: { showId:showId, seatAvailable:true },
        take: reservationQuantity,
    });

    let reservationResult;
    console.log('seatNumber',seatNumber);

      for(let i=0 ; i<reservationQuantity;i++ ){
        this.seatRepository.update({seatId: seatNumber[i].seatId },{ seatAvailable: false});

          reservationResult = this.reserveRepository.save({
              reservationPrice: reservationPrice,
              reservationQuantity: reservationQuantity,
              userId: userId,
              showId: showId,
              seatId: seatNumber[i].seatId
        });

      }

      await this.userRepository.update({userId:userId},{point:point-totalCost });

      return {reservationResult};
    }
    
    async findReservationHistory(userId: number) {
      const reservationList = await this.reserveRepository.createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.user', 'user')
        .leftJoinAndSelect('reservation.show', 'show')
        .leftJoinAndSelect('reservation.seat', 'seat')
        .select([
          'reservation.reserveId',
          'reservation.reservationPrice',
          'reservation.reservationQuantity',
          'show.title',
          'show.showTime',
          'seat.seatNumber'
        ])
        .where('reservation.userId = :userId', { userId: userId })
        .getMany();

          
      return {
        "message": "사용자 예매 목록이 조회되었습니다.",
        "data": reservationList} ;

    }
    

}
