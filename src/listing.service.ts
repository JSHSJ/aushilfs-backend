import { Injectable } from '@nestjs/common';
import { Listing, ListingCreate, ListingStatus } from './models/listing';
import { v4 as uuidv4 } from 'uuid';

const DUMMY_LISTINGS: Listing[] = [
  {
    assetId: 'BLX01',
    createdBy: 'Joshua',
    tokenCount: 100,
    pricePerToken: 1.25,
    status: ListingStatus.OPEN,
    id: '1',
    priceTotal: 125,
    createdOn: '2021-09-12T10:06:20.710Z',
  },
  {
    assetId: 'BLX01',
    createdBy: 'Joshua',
    tokenCount: 120,
    pricePerToken: 1.2,
    status: ListingStatus.OPEN,
    id: '2',
    priceTotal: 144,
    createdOn: '2021-09-13T10:06:20.710Z',
  },
  {
    assetId: 'BLX01',
    createdBy: 'Joshua',
    tokenCount: 140,
    pricePerToken: 1.1,
    status: ListingStatus.ACCEPTED,
    id: '3',
    priceTotal: 154,
    createdOn: '2021-09-14T10:06:20.710Z',
  },
  {
    assetId: 'TEST1',
    createdBy: 'Jemand anderem',
    tokenCount: 160,
    pricePerToken: 0.9,
    status: ListingStatus.OPEN,
    id: '4',
    priceTotal: 144,
    createdOn: '2021-09-15T10:06:20.710Z',
  },
  {
    assetId: 'TEST1',
    createdBy: 'Jemand anderem',
    tokenCount: 160,
    pricePerToken: 0.9,
    status: ListingStatus.OPEN,
    id: '5',
    priceTotal: 144,
    createdOn: '2021-09-15T10:06:20.710Z',
  },
];

@Injectable()
export class ListingService {
  listings: Listing[] = DUMMY_LISTINGS;

  getListings(): Listing[] {
    return this.listings;
  }

  getListingById(id: string): Listing | undefined {
    return this.listings.find((l) => l.id === id);
  }

  createListing(listingCreate: ListingCreate): Listing {
    const newListing: Listing = {
      assetId: listingCreate.assetId,
      tokenCount: listingCreate.tokenCount,
      priceTotal: listingCreate.priceTotal,
      pricePerToken: listingCreate.priceTotal / listingCreate.tokenCount,
      createdBy: listingCreate.createdBy,
      createdOn: new Date().toISOString(),
      id: uuidv4(),
      status: ListingStatus.OPEN,
    };

    this.listings = [...this.listings, newListing];

    return newListing;
  }

  updateListing(
    listingId: string,
    update: Partial<Listing>,
  ): Listing | undefined {
    const listing = this.getListingById(listingId);
    if (!listing) {
      return undefined;
    }

    const updatedListing = {
      ...listing,
      ...update,
    };

    this.listings = this.listings.map((listing) => {
      if (listing.id === listingId) {
        return updatedListing;
      }

      return listing;
    });

    return updatedListing;
  }

  deleteListing(listingId: string): 'ok' | undefined {
    if (this.listings.findIndex((listing) => listing.id === listingId)) {
      return undefined;
    }

    this.listings = this.listings.filter((listing) => listing.id !== listingId);
    return 'ok';
  }
}
