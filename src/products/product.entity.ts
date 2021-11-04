import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Brand } from 'src/brands/brand.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    price: number;

    @OneToMany(() => Brand,Brand => Brand.product)
    brands: Brand[];
}