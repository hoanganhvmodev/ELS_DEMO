import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brands/brand.entity';
import { BrandsService } from 'src/brands/brands.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';


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
        return await this.productRepository.save(data);
    }

    async getId(id:string):Promise<Product> {
        return await this.productRepository.findOne({id},{relations:['brands']});
    }
    
    async update(id:string,data):Promise<any>{
        return await this.productRepository.update(id,data);
    }

    async delete(id:string):Promise<any>{
        let brand =await this.brandsService.getBrands(id);
        //  console.log(brand)
        let br=[];
        for(let x of brand){
            br.push(this.brandsService.delete(x.id));
        }
        await Promise.all(br)
        const product = await this.productRepository.findOne({id});
         return await this.productRepository.remove(product);
    }

    
}
