import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from 'src/brands/brands.module';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),BrandsModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
