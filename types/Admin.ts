export type TStatus = 'WAITING' | 'APPROVED' | 'DELETED';

export interface IMarketList {
  category: TStatus;
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

export interface OnClickMarketStatus {
  onClickHandler: (arg0: TStatus) => void;
}
