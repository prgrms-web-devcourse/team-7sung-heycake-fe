export type TStatus = 'WAITING' | 'APPROVED' | 'DELETED';
export type TCategory = '' | 'DELETED';

export interface IMarketList {
  category: TCategory;
}

export interface IMarketItem extends IMarketList {
  enrollmentId: string;
  imageUrl: string;
  marketName: string;
  businessNumber: string;
  status: TStatus;
}
