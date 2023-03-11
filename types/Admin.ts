export type MarketStatus = 'WAITING' | 'APPROVED' | 'DELETED';

export interface MarketList {
  category: MarketStatus;
}

export interface IMarketItem extends MarketList {
  phoneNumber: string;
  enrollmentId: string;
  imageUrl: string;
  marketName: string;
  businessNumber: string;
  status: MarketStatus;
  createdAt: string;
}

export interface OnClickMarketStatus {
  onClickHandler: (arg0: MarketStatus) => void;
}
