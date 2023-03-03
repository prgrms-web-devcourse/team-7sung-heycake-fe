export interface Order {
  orderId: number;
  memberId: number;
  title: string;
  region: string;
  orderStatus: 'NEW' | 'RESERVED' | 'PAID';
  hopePrice: number;
  images: string[];
  visitDate: string;
  cakeInfo: {
    cakeCategory:
      | 'ALL'
      | 'PHOTO'
      | 'LETTERING'
      | 'CHARACTER_IMAGE'
      | 'CHARACTER_MODEL'
      | 'ETC';
    cakeSize: 'MINI' | 'NO_1' | 'NO_2' | 'ETC';
    cakeHeight: 'ONE_LAYER' | 'TWO_LAYER' | 'ETC';
    breadFlavor: 'VANILLA' | 'CHOCO' | 'GREEN_TEA' | 'CARROT' | 'ETC';
    creamFlavor: 'WHIPPED_CREAM' | 'CREAM_CHEESE' | 'CHOCO' | 'OREO' | 'ETC';
    requirements: string;
  };
  offerCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ThreadDto {
  offerId: number;
  marketId: number;
  marketName: string;
  expectedPrice: number;
  imageUrl: string;
  content: string;
  commentCount: number;
}
