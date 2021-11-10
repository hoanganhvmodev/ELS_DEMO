import { Module } from '@nestjs/common';
import { subcriberModule } from 'src/subcriber/subcriber.module';
import { SubscribersService } from './sub.service';

@Module({
  imports: [subcriberModule],
  controllers: [],
  providers: [SubscribersService],
  exports: [SubscribersService]
})
export class SubcribersModule {}