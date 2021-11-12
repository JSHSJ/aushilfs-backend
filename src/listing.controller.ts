import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { Listing, ListingCreate } from './models/listing';
import { NotFoundException } from '@nestjs/common';

@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  getListings(): Listing[] {
    return this.listingService.getListings();
  }

  @Get(':id')
  getListingById(@Param('id') id: string): Listing {
    const listing = this.listingService.getListingById(id);
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  @Post()
  createListing(@Body() listingCreate: ListingCreate) {
    return this.listingService.createListing(listingCreate);
  }

  @Patch(':id')
  updateListing(
    @Param('id') id: string,
    @Body() listingUpdate: Partial<Listing>,
  ) {
    const listing = this.listingService.updateListing(id, listingUpdate);

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  @Delete(':id')
  deleteListing(@Param('id') id: string) {
    const res = this.listingService.deleteListing(id);

    if (!res) {
      throw new NotFoundException('Listing not found');
    }
  }
}
