import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class ReserveShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요.' })
  showTime: string;

  @IsInt()
  @IsNotEmpty({ message: '티켓 가격을 입력해주세요.' })
  reservationPrice: number;

  @IsInt()
  @IsNotEmpty({ message: '예약 좌석 수량을 입력해주세요.' })
  reservationQuantity: number;

}