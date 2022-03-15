import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // 유효성 검사
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('access error');
    }
  }
}
