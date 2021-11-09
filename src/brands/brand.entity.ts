import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Product} from '../products/product.entity';

@Entity()
export class Brand {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    brand_name: string;

    @Column()
    status: string;

    @ManyToOne(type => Product, Product => Product.brands)
    product: Product;
 
}