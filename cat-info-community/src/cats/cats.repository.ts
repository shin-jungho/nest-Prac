/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { Cat } from './cats.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<boolean> {
      const result = await this.catModel.exists({ email });
      if(result){ // 타입에러나서 result를 boolean으로 바꿈
        return true;
      } else {
        return false;
      }
    }

  async create(cat :CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat)
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email })
    return cat;
  }
}
