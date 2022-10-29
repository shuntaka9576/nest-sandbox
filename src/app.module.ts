import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
// import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book';
import { HandlerModule } from './handlers/handler.module';
import { DomainModule } from './domain/domain.module';
const username = process.env.DB_USERNAME ?? 'nest';
const password = process.env.DB_PASSWORD ?? 'nest';
const host = process.env.DB_HOST ?? '127.0.0.1';
const dbname = process.env.DB_DBNAME ?? 'nest_sample_app';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: host,
      port: 3306,
      username: username,
      password: password,
      database: dbname,
      entities: [Book],
      synchronize: true,
    }),
    HandlerModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
