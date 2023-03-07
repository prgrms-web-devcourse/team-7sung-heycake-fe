import { TMainCategory, TSouelArea } from './Api';

export interface ICakeList {
  label: string;
  category: string;
}

export interface ILocationListItem {
  name: string;
  onClose: () => void;
  setLocation: TSetLocation;
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
}

export interface ICakeItemData {
  orderId: string;
  title: string;
  region: TSouelArea;
  cakeInfo: {
    cakeCategory: TMainCategory;
    cakeSize: TCakeSize;
    breadFlavor: TBreadFlavor;
    creamFlavor: TCreamFlavor;
    requirements: string;
  };
  images: string[];
  hopePrice: string;
  orderStatus: TOrderStatus;
  visitTime: string;
}

type TCakeSize = 'MINI' | 'NO_1' | 'NO_2';
type TBreadFlavor = 'VANILLA' | 'CHOCO' | 'GEEN_TEA' | 'CARROT' | 'ETC';
type TCreamFlavor = 'WHIPPED_CREAM' | 'CREAM_CHEESE' | 'CHOCO' | 'OREO' | 'ETC';
type TOrderStatus = 'NEW' | 'RESERVED' | 'PAID';
type TSetLocation = (name: string) => void;
