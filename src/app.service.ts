// import { Injectable, HttpException } from '@nestjs/common';
// import * as elasticsearch from 'elasticsearch';

// @Injectable()
// export class AppService {
//   private readonly esclient: elasticsearch.Client;

//     constructor() {
//         this.esclient = new elasticsearch.Client({
//             host: 'http://localhost:9200/', // replace with your cluster endpoint
//         });
//         this.esclient.ping({ requestTimeout: 3000 })
//         .then(() => console.log('Successful connection to Elasticsearch server'))
//         .catch(err => { 
//             throw new HttpException({
//                 status: 'error',
//                 message: 'Unable to reach Elasticsearch cluster'
//              }, 500); 
//          });
//     }

//     async bulkInsert(abilities: any[]) {
//         const bulk = [];
//         abilities.forEach(ability => {
//             bulk.push({ 
//                 index: {_index: 'pokemons', _type: 'abilities'} 
//             });
//             bulk.push(ability);
//         });
//         return await this.esclient.bulk({
//             body: bulk, 
//             index: 'pokemons', 
//             type: 'abilities'
//         })
//         .then(res => ({status: 'success', data: res}))
//         .catch(err => { throw new HttpException(err, 500); });
//     }

//     // searches the 'pokemons' index for matching documents
//     async searchIndex(q: string) {
//         const body = {
//             size: 500,
//             from: 0,
//             query: {
//                 match: {
//                     url: q,
//                 },
//             },
//         };
//         const results = await this.esclient.search({index: 'product', body, q})
//         return results.hits.hits
//             //  .then(res => res.hits.hits)
    
//             // .catch(err => { throw new HttpException(err, 500); });
//     }
// }
