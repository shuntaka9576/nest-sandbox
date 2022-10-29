import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../entities/book';

@Injectable()
export class BooksUseCase {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  finedAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOneById(id: number): Promise<Book> {
    return this.booksRepository.findOne({ where: { id: id } });
  }

  async create(data: {
    title: string;
    price: number;
    author: string;
  }): Promise<Book> {
    const book = this.booksRepository.create(data);
    const savedBook = await this.booksRepository.save({ ...book });

    return savedBook;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepository.delete(id);
    return result.affected > 0;
  }
}
