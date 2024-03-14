import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { Role } from '../types/userRole.type';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
  
  @IsString()
  @IsNotEmpty({ message: '이름를 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickName: string;

  // @IsNumber()
  // @IsNotEmpty({ message: '포인트를 입력해주세요.' })
  // point: number;

  // @IsBoolean()
  // @IsNotEmpty({ message: '어드민여부를 입력해주세요.' })
  // isAdmin: boolean;

}