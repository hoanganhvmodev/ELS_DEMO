import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('elastichsearch')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async createIndexAndInsert(@Body() documents: any[]) {
      return await this.appService.bulkInsert(documents);
  }

  @Get('search')
  async searchPokemonAbilities(@Query('q') q: string) {
      const results = await this.appService.searchIndex(q);
      return results;
  }

}


