import { TMarketCategory, TStatus } from '../Admin/types';

export interface IgetCakeList {
  location: TSouelArea;
  category: TMainCategory;
}

export interface IgetMarketDetail {
  enrollmentId: string;
}

export interface IgetMarketList {
  cursor: string;
  category: TMarketCategory;
}

export interface IPatchMarketStatus {
  enrollmentId: string;
  status: TStatus;
}

export type TMainCategory =
  | 'ALL'
  | 'PHOTO'
  | 'LETTERING'
  | 'CHARACTER_IMAGE'
  | 'CHARACTER_MODEL'
  | 'ETC';

export type TSouelArea =
  | '강남구'
  | '강동구'
  | '강북구'
  | '강서구'
  | '관악구'
  | '광진구'
  | '구로구'
  | '금천구'
  | '노원구'
  | '도봉구'
  | '동대문구'
  | '동작구'
  | '마포구'
  | '서대문구'
  | '서초구'
  | '성동구'
  | '성북구'
  | '송파구'
  | '양천구'
  | '영등포구'
  | '용산구'
  | '은평구'
  | '종로구'
  | '중구'
  | '중량';
