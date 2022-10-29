import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksUseCase } from 'src/domain/useCases/book.usecase';
import { Book } from 'src/entities/book';
import { BooksResolver } from './resolvers/books.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksResolver, BooksUseCase],
})
export class HandlerModule {}
