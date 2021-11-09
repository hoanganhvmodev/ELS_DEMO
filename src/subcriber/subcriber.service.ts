import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as elasticsearch from 'elasticsearch';

@Injectable()
export class subcriberService {
  private readonly esclient: elasticsearch.Client;

  constructor() {
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
  }

  async bulkInsert(abilities: any[]) {
      const bulk = [];
      abilities.forEach(ability => {
          bulk.push({ 
              index: {_index: 'product', _type: 'abilities'} 
          });
          bulk.push(ability);
      });
      return await this.esclient.bulk({
          body: bulk, 
          index: 'product', 
          type: 'abilities'
      })
      .then(res => ({status: 'success', data: res}))
      .catch(err => { throw new HttpException(err, 500); });
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
      const results = await this.esclient.search({index: 'product', body, q})
      return results.hits.hits
  }

  // async createProduct(productData: any): Promise<boolean> {
  //   try {
  //     await this.elasticsearchService.create({
  //       index: 'product',
  //       id: productData.search_result_data.id,
  //       body: productData
  //     })
  //     return true 
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

}