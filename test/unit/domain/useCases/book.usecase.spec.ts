import { Test } from '@nestjs/testing';
import { BooksUseCase } from '../../../../src/domain/useCases/book.usecase';
import { Book } from '../../../../src/entities/book';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

const mockBookRepository = () => ({
  findOne: jest.fn(),
});

describe('BooksUseCase', () => {
  let bookUseCase: BooksUseCase;
  let booksRepository: MockType<Repository<Book>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BooksUseCase,
        {
          provide: getRepositoryToken(Book),
          useFactory: mockBookRepository,
        },
      ],
    }).compile();

    bookUseCase = module.get(BooksUseCase);
    booksRepository = module.get(getRepositoryToken(Book));
  });

  describe('finedAll', () => {
    test('返却される', () => {
      booksRepository.findOne.mockReturnValue({
        id: '1',
        title: 'test',
        price: 201,
      });

      const got = bookUseCase.findOneById(1);

      expect(booksRepository.findOne).toHaveBeenCalledTimes(1);
      expect(booksRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(got).toEqual({
        id: '1',
        title: 'test',
        price: 201,
      });
    });
  });
});
