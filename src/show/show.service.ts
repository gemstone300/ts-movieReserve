import _ from 'lodash';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import { Show } from './entities/show.entity';
import { Seat } from 'src/reservation/entities/seat.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  // async findAll(): Promise<Show[]> {
  //   return await this.showRepository.find({
  //     select: ['showId', 'title','showTime', 'location', 'category', 'detail', 'showImage', 'price' ]
  //   });
  // }

  async findOne(showId: number) {
    return await this.verifyShowById(showId);
  }


  async findAllorSearch(keyword?: string) {
    
    let searchList;
    if(keyword!==undefined){
      searchList = await this.showRepository.createQueryBuilder('shows')
      .where('shows.title like :title', { title: `%${keyword}%` })
      .select(
        ['shows.showId','shows.title','shows.showTime','shows.location'])
      .getMany();

    } else {
      searchList = await this.showRepository.find({
        select: ['showId', 'title','showTime', 'location', 'category', 'detail', 'showImage', 'price' ]
      });

    }
    
    console.log('searchList', searchList);

    return {
      "message":"공연 목록이 조회되었습니다.",
      "data":searchList
    }
  }

  async create(createPostDto: CreateShowDto){

    if (_.isNil(createPostDto.title) || _.isNil(createPostDto.showTime) || _.isNil(createPostDto.location) 
        || _.isNil(createPostDto.category) || _.isNil(createPostDto.detail) || _.isNil(createPostDto.showImage) 
          || _.isNil(createPostDto.price) || _.isNil(createPostDto.totalSeatNum) ) {
        
            throw new BadRequestException(
          '공연 등록 시, title, showTime, location,category, detail, showImage ,price, totalSeatNum 값을 포함해야 합니다.',
        );
      }

      const show = await this.showRepository.save({
        title: createPostDto.title,
        showTime : new Date(createPostDto.showTime),
        location : createPostDto.location,
        category : createPostDto.category,
        detail : createPostDto.detail,
        showImage : createPostDto.showImage,
        price : createPostDto.price,
        totalSeatNum : createPostDto.totalSeatNum
      });

    for(let i=0 ; i<createPostDto.totalSeatNum ; i++){
      await this.seatRepository.save({
        seatNumber: i+1,
        seatPrice: createPostDto.price,
        showId : show.showId,
      })
    }

    return show;
    
  }


  private async verifyShowById(showId: number) {
    const show = await this.showRepository.findOneBy({ showId });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return show;
  }
}