/* eslint-disable prettier/prettier */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    
    return next.handle().pipe(map((data) => ({ // 프론트한테 데이터 형식 유지하면서 보내는거 
      success: true,
      data,
    })),
    );
  }
}