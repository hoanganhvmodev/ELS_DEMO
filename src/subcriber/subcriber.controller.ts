import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { subcriberService } from './subcriber.service';


@Controller('elastichsearch')
export class subcriberController {
  constructor(private readonly subcriberService: subcriberService) {}

  @Post('create')
  async createIndexAndInsert(@Body() documents: any[]) {
      let abc =  await this.subcriberService.bulkInsert(documents);
      console.log(">>>>>>>>>>>>>>>>>>",abc);
      return abc;
  }

  @Get('search')
  async searchPokemonAbilities(@Query('q') q: string) {
      const results = await this.subcriberService.searchIndex(q);
      console.log(results)
      return results;
  }

}
