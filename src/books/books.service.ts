import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { NewBookInput } from './dto/newBook.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  finedAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOneById(id: number): Promise<Book> {
    // type error
    // return this.booksRepository.findOne(id);
    return this.booksRepository.findOne({ where: { id: id } });
  }

  async create(data: NewBookInput): Promise<Book> {
    const book = this.booksRepository.create(data);
    const savedBook = await this.booksRepository.save({ ...book });

    return savedBook;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepository.delete(id);
    return result.affected > 0;
  }
}
