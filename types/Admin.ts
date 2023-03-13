export type MarketStatus = 'WAITING' | 'APPROVED' | 'DELETED';

export interface MarketListProps {
  category: MarketStatus;
}

export interface MarketItemProps extends MarketListProps {
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
