import { CatsRepository } from 'src/cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login.request/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findCatByEmail(email);
    //*  해당 이메일 확인
    if (!cat) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요');
    }

    //* 비밀번호 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요');
    }

    const payload = { email: email, sub: cat.id }; //* sub는 토큰 제목 의미

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
