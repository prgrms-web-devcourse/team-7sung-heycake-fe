export type TStatus = 'WAITING' | 'APPROVED' | 'DELETED';
export type TMarketCategory = 'WAITING' | 'DELETED';

export interface IMarketList {
  category: TMarketCategory;
}

export interface IMarketItem extends IMarketList {
  phoneNumber: string;
  enrollmentId: string;
  imageUrl: string;
  marketName: string;
  businessNumber: string;
  status: TStatus;
  createdAt: string;
}
