export interface Order {
  orderId: number;
  memberId: number;
  title: string;
  region: string;
  orderStatus: 'NEW' | 'RESERVED' | 'PAID';
  hopePrice: number;
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
    breadFlavor: 'VANILLA' | 'CHOCO' | 'GEEN_TEA' | 'CARROT' | 'ETC';
    creamFlavor: 'WHIPPED_CREAM' | 'CREAM_CHEESE' | 'CHOCO' | 'OREO' | 'ETC';
    requirements: string;
  };
  offerCount: number;
  createdAt: string;
  updatedAt: string;
}
