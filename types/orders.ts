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
  enrollmentId: number;
  marketName: string;
  expectedPrice: number;
  imageUrl: string;
  content: string;
  commentCount: number;
}
