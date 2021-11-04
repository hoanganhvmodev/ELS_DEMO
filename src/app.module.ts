import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nguyenanh1999zzz',
      database: 'nestjs_els',
      autoLoadEntities:true,
      // logging:'all',
      synchronize: true,
    }),
    ProductsModule,
     BrandsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
