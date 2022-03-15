import { multerOptions } from '../../common/utils/multer.options';
/* eslint-disable prettier/prettier */
import { Cat } from '../cats.schema';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { LoginRequestDto } from '../../auth/dto/login.request/login.request.dto';
import { AuthService } from '../../auth/auth.service';
/* eslint-disable no-console */
import { CatRequestDto } from '../dto/cats.request.dto';
import { Body, Req, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Post, Put } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from '../service/cats.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'Server Success!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat;
  }
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FileInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    // return 'uploadImg';
    return this.catsService.uploadImg(cat, files);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기'})
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
