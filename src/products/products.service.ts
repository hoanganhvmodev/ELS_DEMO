import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brands/brand.entity';
import { BrandsService } from 'src/brands/brands.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import {getConnection} from "typeorm";
import { ElasticsearchService } from '@nestjs/elasticsearch';


@Injectable()
export class ProductsService {
    constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly brandsService:BrandsService,
    // private readonly elasticsearchService: ElasticsearchService
    ){}

    async getAll():Promise<Product[]> {
        return await this.productRepository.find(); 
    }

    async create(data):Promise<Product> {
        return this.productRepository.save(data);
    }

    async getId(id:string):Promise<Product> {
        return this.productRepository.findOne({id},{relations:['brands']});
    }
    
    async update(id:string,data):Promise<any>{
        return this.productRepository.update(id,data);
    }

    async delete(id:string):Promise<any>{
        let brand =await this.brandsService.getBrands(id);
        console.log(brand)
        let br=[];
        for(let x of brand){
            br.push(this.brandsService.delete(x.id));
        }
        await Promise.all(br)
         return this.productRepository.delete({id});
    }

    // async createProduct(productData: any): Promise<boolean> {
    //     try {
    //       await this.elasticsearchService.create({
    //         index: 'product',
    //         id: productData.search_result_data.id,
    //         body: productData
    //       })
    //       return true 
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    
}
