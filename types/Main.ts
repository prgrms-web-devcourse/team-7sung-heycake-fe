import { TMainCategory, TSeoulArea } from './Api';

export interface ICakeList {
  label: string;
  category: string;
}

export interface ILocationListItem {
  name: string;
  onClick: () => void;
}

export interface ILocationSelectBox {
  location: string;
  setLocation: TSetLocation;
}

export interface ICakeItem {
  category: TMainCategory;
  cakeSize: TCakeSize;
  image: string;
  price: string;
  status: TOrderStatus;
  visitTime: string;
  title: string;
  breadFlavor: TBreadFlavor;
  creamFlavor: TCreamFlavor;
  offerCount: string;
}

export interface ICakeItemData {
  orderId: string;
  title: string;
  region: TSeoulArea;
  cakeInfo: {
    cakeCategory: TMainCategory;
    cakeSize: TCakeSize;
    breadFlavor: TBreadFlavor;
    creamFlavor: TCreamFlavor;
    requirements: string;
  };
  images: string[];
  hopePrice: string;
  offerCount: string;
  orderStatus: TOrderStatus;
  visitTime: string;
}

type TCakeSize = 'MINI' | 'NO_1' | 'NO_2';
type TBreadFlavor = 'VANILLA' | 'CHOCO' | 'GREEN_TEA' | 'CARROT' | 'ETC';
type TCreamFlavor = 'WHIPPED_CREAM' | 'CREAM_CHEESE' | 'CHOCO' | 'OREO' | 'ETC';
type TOrderStatus = 'NEW' | 'RESERVED' | 'PAID';
type TSetLocation = (name: string) => void;
