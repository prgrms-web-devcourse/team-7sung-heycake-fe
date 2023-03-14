export interface Order {
  orderId: number;
  memberId: number;
  title: string;
  region: string;
  orderStatus: OrderStatus;
  hopePrice: number;
  images: string[];
  visitDate: string;
  cakeInfo: {
    cakeCategory: CakeCategory;
    cakeSize: CakeSize;
    cakeHeight: CakeHeight;
    breadFlavor: BreadFlavor;
    creamFlavor: CreamFlavor;
    requirements: string;
  };
  offerCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CakeForm {
  title: string;
  cakeCategory: CakeCategory;
  cakeSize: CakeSize;
  cakeHeight: CakeHeight;
  breadFlavor: BreadFlavor;
  creamFlavor: CreamFlavor;
}

export interface MypagePost {
  id: string;
  imageUrl: string;
  orderStatus: OrderStatus;
  region: string;
  title: string;
  visitTime: string;
  createdAt: string;
  cakeInfo: MypagePostInfo;
  hopePrice: number;
  offerCount: number;
}

export interface MypagePostInfo {
  cakeCategory: CakeCategory;
  cakeSize: CakeSize;
  cakeHeight: CakeHeight;
  creamFlavor: CreamFlavor;
}

export interface MypageCount {
  count: number;
}

export type OrderStatus = 'NEW' | 'RESERVED' | 'PAID';

export type CakeCategory =
  | 'PHOTO'
  | 'LETTERING'
  | 'CHARACTER_IMAGE'
  | 'CHARACTER_MODEL'
  | 'ETC';

export type CakeSize = 'MINI' | 'NO_1' | 'NO_2' | 'ETC';
export type CakeHeight = 'ONE_LAYER' | 'TWO_LAYER' | 'ETC';
export type BreadFlavor = 'VANILLA' | 'CHOCO' | 'GREEN_TEA' | 'CARROT' | 'ETC';
export type CreamFlavor =
  | 'WHIPPED_CREAM'
  | 'CREAM_CHEESE'
  | 'CHOCO'
  | 'OREO'
  | 'ETC';

export interface ThreadDto {
  offerId: number;
  marketId: number;
  marketName: string;
  expectedPrice: number;
  imageUrl: string;
  content: string;
  commentCount: number;
  enrollmentId: number;
  createdDate: string;
  isPaid: boolean;
}
