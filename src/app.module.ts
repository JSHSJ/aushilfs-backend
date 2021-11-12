import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';

@Module({
  imports: [],
  controllers: [AppController, ListingController],
  providers: [AppService, ListingService],
})
export class AppModule {}
