import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksUseCase } from 'src/domain/useCases';
import * as resolvers from './resolvers';
import { Book } from 'src/entities/book';

const resolversList = Object.values(resolvers);

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [...resolversList, BooksUseCase],
})
export class HandlerModule {}
