import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>
    ){}

    async getAll():Promise<Brand[]> {
        return  this.brandRepository.find();
    }

    async getBrands(id:string):Promise<Brand[]> {
        return  this.brandRepository.find({where:{product:id}});
    }

    async create(data):Promise<Brand> {
         const brand = new  Brand();
         brand.brand_name = data.brand_name;
         brand.status = data.status;
         brand.product = data.productId;
        return this.brandRepository.save(brand);
    }

    async getId(id:string):Promise<Brand> {
        return this.brandRepository.findOne({id});
    }
    
    async update(id:string,data):Promise<any>{
        return this.brandRepository.update(id,data);
    }

    async delete(id:string):Promise<any>{
        return this.brandRepository.delete({id});
    }
}
