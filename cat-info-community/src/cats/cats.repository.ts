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
  existsByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    return await this.catModel.find();
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password'); // 보안상 password 제외하고 가져오는것
    return cat; 
  }
  
  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email })
    return cat;
  }

  async existByEmail(email: string): Promise<boolean> {
      const result = await this.catModel.exists({ email });
      if(result){ // 타입에러나서 result를 boolean으로 바꿈
        return true;
      } else {
        return false;
      }
    }

  async create(cat :CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
