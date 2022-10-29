import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksUseCase } from 'src/domain/useCases/book.usecase';
import { Book } from 'src/entities/book';
import { NewBookInput } from './dto/book.dto';

@Resolver((of) => Book)
export class BooksResolver {
  constructor(private booksUseCase: BooksUseCase) {}

  @Query(() => [Book])
  books(): Promise<Book[]> {
    return this.booksUseCase.finedAll();
  }

  @Query((returns) => Book)
  async getBook(@Args({ name: 'id', type: () => Int }) id: number) {
    const book = await this.booksUseCase.findOneById(id);
    if (!book) {
      throw new NotFoundException(id);
    }
    return book;
  }

  @Mutation((returns) => Book)
  addBook(@Args('newBook') newBook: NewBookInput): Promise<Book> {
    return this.booksUseCase.create(newBook);
  }

  @Mutation((returns) => Boolean)
  async removeBook(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.booksUseCase.remove(id);
  }
}
