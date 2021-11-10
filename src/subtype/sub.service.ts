import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { subcriberService } from "src/subcriber/subcriber.service";
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";




@Injectable()
export class SubscribersService implements EntitySubscriberInterface {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly searchService: subcriberService
  ) {
    connection.subscribers.push(this)
  }

  async afterInsert(event: InsertEvent<any>) {
    return this.searchService.bulkInsert(event.entity);
  }


  async afterUpdate(event: UpdateEvent<any>) {
    let dataEls = {
      id: "bfYpBX0BRnKPYlRgpfv3",
      name: event.entity.name,
      status: event.entity.status,
      price: event.entity.price,
    }
    console.log(dataEls)
    return this.searchService.bulkUpdate(dataEls);
    }

}