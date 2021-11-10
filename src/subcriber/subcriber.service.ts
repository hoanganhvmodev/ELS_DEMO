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

  async bulkInsert(abilities: any) {
      const bulk = [];
      bulk.push({ 
        index: {_index: 'product'} 
    });
    bulk.push(abilities);
      return await this.esclient.bulk({
          body: bulk, 
          index: 'product', 
      })
      .then(res => ({status: 'success', data: res}))
      .catch(err => { throw new HttpException(err, 500); });
  }

  async bulkUpdate(abilities: any) {
    const bulk = [];
    bulk.push({ 
      index: {_index: 'product'} 
  });
  bulk.push(abilities);
    return await this.esclient.bulk({
        body: bulk, 
        index: 'product', 
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


  
}