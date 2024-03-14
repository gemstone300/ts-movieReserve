import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReserveShowDto} from './dto/reserve-show.dto'
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':id')
  async findReservationHistory(@Param('id') userId: number) {
    return await this.reservationService.findReservationHistory(userId);
  }

  @Post(':showId/ticket')
  async reserve(
    @UserInfo() user: User,
    @Param('showId') showId: number,
    @Body() reserveShowDto: ReserveShowDto) {
    await this.reservationService.reserve(
      user.userId,user.point,showId, reserveShowDto);
  }


}
