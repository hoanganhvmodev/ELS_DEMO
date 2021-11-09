import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubscriberService } from './subcriber.service';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@Controller('elastichsearch')
export class subcriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post('create')
  async createIndexAndInsert(@Body() documents: any[]) {
    let abc = await this.subscriberService.bulkInsert(documents);
    console.log('>>>>>>>>>>>>>>>>>>', abc);
    return abc;
  }

  @Get('search')
  async searchPokemonAbilities(@Query('q') q: string) {
    const results = await this.subscriberService.searchIndex(q);
    console.log(results);
    return results;
  }
}
