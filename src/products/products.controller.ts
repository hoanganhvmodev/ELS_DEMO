import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // @Get()
  // async get() {
  //   const allProduct = await this.productService.getAll();
  //   return {
  //     message: 'Success',
  //     results: allProduct.length,
  //     Product: allProduct,
  //   };
  // }

  @Get()
  async create(
    @Body('name') name: string,
    @Body('status') status: string,
    @Body('price') price: number,
  ) {
    const product = await this.productService.create({
      name: 'test 555',
      status: 'status 5',
      price: 555,
    });
    return {
      message: 'Create Product Success',
      Product: product,
    };
  }

  @Get(':id')
  async getId(@Param('id') id: string) {
    const product = await this.productService.getId(id);
    return {
      message: `Get ID: ${id} Success `,
      Product: product,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('status') status: string,
    @Body('price') price: number,
  ) {
    const product = await this.productService.update(id, {
      name,
      status,
      price,
    });
    return {
      message: `Updated Product ID: ${id} Success`,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product = await this.productService.delete(id);
    return {
      message: `Deleted Product ID: ${id} Success`,
    };
  }
}
