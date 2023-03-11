import { MainCategory, TSeoulArea } from './Api';

export interface CakeList {
  label: string;
  category: string;
}

export interface LocationListItem {
  name: string;
  onClick: () => void;
}

export interface LocationSelectBox {
  location: string;
  setLocation: SetLocation;
}

export interface CakeItem {
  category: MainCategory;
  cakeSize: CakeSize;
  image: string;
  price: string;
  status: OrderStatus;
  visitTime: string;
  title: string;
  breadFlavor: BreadFlavor;
  creamFlavor: CreamFlavor;
  offerCount: string;
}

export interface CakeItemJson {
  orderId: string;
  title: string;
  region: TSeoulArea;
  cakeInfo: {
    cakeCategory: MainCategory;
    cakeSize: CakeSize;
    breadFlavor: BreadFlavor;
    creamFlavor: CreamFlavor;
    requirements: string;
  };
  images: string[];
  hopePrice: string;
  offerCount: string;
  orderStatus: OrderStatus;
  visitTime: string;
}

type CakeSize = 'MINI' | 'NO_1' | 'NO_2';
type BreadFlavor = 'VANILLA' | 'CHOCO' | 'GREEN_TEA' | 'CARROT' | 'ETC';
type CreamFlavor = 'WHIPPED_CREAM' | 'CREAM_CHEESE' | 'CHOCO' | 'OREO' | 'ETC';
type OrderStatus = 'NEW' | 'RESERVED' | 'PAID';
type SetLocation = (name: string) => void;
