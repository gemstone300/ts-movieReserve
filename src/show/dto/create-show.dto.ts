import { IsNotEmpty, IsString, IsDate, IsEnum,  IsInt } from 'class-validator';
import { Category } from '../types/showCategory.type';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요.' })
  showTime: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  location: string;

  @IsEnum(Category)
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: Category;

  @IsString()
  @IsNotEmpty({ message: '공연 내용을 입력해주세요.' })
  detail: string;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  showImage: string;

  @IsInt()
  @IsNotEmpty({ message: '티켓 가격을 입력해주세요.' })
  price: number;

  @IsInt()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  totalSeatNum: number;

}