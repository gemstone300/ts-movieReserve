import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async register(@Body() signupDto: SignupDto) {
    return await this.userService.signup(signupDto.email, signupDto.password, signupDto.name, signupDto.nickName ); //signupDto.point, signupDto.isAdmin
  }

  @Post('signin')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.signin(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  getUser(@UserInfo() user: User) {
    return { nickName: user.nickName, point: user.point };
  }

}