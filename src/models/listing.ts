export type Listing = {
  id: string;
  assetId: string;
  tokenCount: number;
  pricePerToken: number;
  priceTotal: number;
  createdBy: string; // TODO: Might become USER
  createdOn: string; // ISO DATE STRING
  status: ListingStatus;
  acceptedBy?: string; // TODO: Might become User
};

export type ListingCreate = {
  assetId: string;
  tokenCount: number;
  priceTotal: number;
  createdBy: string;
};

export const enum ListingStatus {
  OPEN = 'Offen',
  ACCEPTED = 'Angenommen',
  CLOSED = 'Abgeschlossen',
  DELETED = 'Gelöscht',
}
