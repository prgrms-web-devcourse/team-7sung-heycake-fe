export interface IMypageTitle {
  isSuccess: boolean;
  title: string;
}

export interface IMypagePost {
  id: string;
  imageUrl: string;
  orderStatus: string;
  region: string;
  title: string;
  visitTime: string;
  createdAt: string;
  cakeInfo: {
    cakeCategory: string;
    cakeSize: string;
    cakeHeight: string;
    creamFlavor: string;
  };
  hopePrice: number;
}

export interface IMypageCount {
  count: number;
}
export interface IMypageCount {
  count: number;
}
