import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectConnection } from '@nestjs/typeorm';
import * as elasticsearch from 'elasticsearch';
import { Product } from 'src/products/product.entity';
import { AfterRemove, Connection, Entity, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent } from 'typeorm';

@Injectable()
@EventSubscriber()
export class subcriberService implements EntitySubscriberInterface<Product> {
    private readonly esclient: elasticsearch.Client;

    constructor(
        @InjectConnection() readonly connection: Connection,
        private readonly elasticsearchService: ElasticsearchService,
    ) {
        this.esclient = new elasticsearch.Client({
            host: 'http://localhost:9200/', // replace with your cluster endpoint
        });
        this.esclient.ping({ requestTimeout: 3000 })
            .then(() => console.log('Successful connection to Elasticsearch server'))
            .catch(err => {
                throw new HttpException({
                    status: 'error',
                    message: 'Unable to reach Elasticsearch cluster'
                }, 500);
            });
        connection.subscribers.push(this)
    }

    listenTo() {
        return Product;
    }

    async afterInsert(event: InsertEvent<any>) {
        console.log('EVENT', event.metadata.tableName);
        console.log(`AFTER ENTITY INSERTED: `, event.entity);

        //insert to els
        this.elasticsearchService.create({
            index: 'product',
            id: event.entity.id,
            body: {
                name: event.entity.name,
                price: event.entity.price,
                status: event.entity.status,
            },
        });
    }

    async afterUpdate(event: InsertEvent<any>) {
        console.log('EVENT', event.metadata.tableName);
        console.log(`AFTER ENTITY UPDATED: `, event.entity);

        //update to els
        this.elasticsearchService.update({
            index: 'product',
            id: event.entity.id,
            body: {
                doc:{
                    name: event.entity.name,
                    price: event.entity.price,
                    status: event.entity.status,
                }
            },
        });
    }

    async beforeRemove(event: RemoveEvent<any>) {
        console.log('EVENT', event.metadata.tableName);
        console.log(`AFTER ENTITY DELETED: `, event.entity);
        
        //delete to els
        this.elasticsearchService.delete({
            index: 'product',
            id: event.entityId,
        });
    }


    // searches the 'product' index for matching documents
    async searchIndex(q: string) {
        const body = {
            size: 500,
            from: 0,
            query: {
                match: {
                    url: q,
                },
            },
        };
        const results = await this.esclient.search({ index: 'product', body, q })
        return {
            message:"Success",
            data :results.hits.hits
        }
    }


}