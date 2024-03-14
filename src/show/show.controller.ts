import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { ShowService } from './show.service';

@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  async findAllorSearch(@Query('keyword') keyword: string) {
    return await this.showService.findAllorSearch(keyword);
  }

  // @Get()
  // async findAll() {
  //   return await this.showService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createShowDto: CreateShowDto,) {
    await this.showService.create(createShowDto);
  }

}