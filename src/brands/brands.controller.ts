import {BrandsService} from './brands.service'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
    constructor(private brandService:BrandsService){}

    @Get()
    async get(){
        const brand = await this.brandService.getAll(); 
        return {
            message:"Success",
            Brands:brand
        }
    }


    @Post()
    async create(
        @Body('brand_name') brand_name:string,
        @Body('status') status:string,
        @Body('productId') productId:string
    ){
        let brand =await this.brandService.create({brand_name, status,productId});
        return{
            message:"Create Brand Success",
            Brand:brand
        }
    }

    @Get(':id')
    async getId(
        @Param('id') id:string){
            const brnad =await this.brandService.getId(id);
            return {
                message:`Get ID: ${id} Success`,
                Brand:brnad
            }
    }

    @Put(':id')
    async update(
        @Param('id') id:string,
        @Body('brand_name') brand_name:string,
        @Body('status') status:string,
        ){
            const brand =await this.brandService.update(id,{brand_name,status});
            return {
                message:`Update Brand ID: ${id} Success`
            }
    };

    @Delete(':id')
    async delete(@Param('id') id:string,){
        const brand =await this.brandService.delete(id);
        return{
            message:`Deleted Brand ID: ${id} Success`
        }
    }
}
