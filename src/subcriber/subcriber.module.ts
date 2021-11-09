import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { subcriberController } from './subcriber.controller';
import { subcriberService } from './subcriber.service'


@Module({
  imports: [
    ElasticsearchModule.register({
       node: 'http://localhost:9200',
      maxRetries: 10,
      requestTimeout: 60000,
    }),
    TypeOrmModule.forFeature([Product]),
    
  ],
  providers: [subcriberService],
  controllers: [subcriberController],
})
export class subcriberModule {} 