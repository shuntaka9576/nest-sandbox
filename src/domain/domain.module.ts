import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book';
import * as useCases from './useCases';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: Object.values(useCases),
})
export class DomainModule {}
