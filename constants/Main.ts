import { ICakeList } from '../types/Main';

export const TAB_TABLE: ICakeList[] = [
  {
    label: '전체',
    category: '',
  },
  {
    label: '포토',
    category: 'PHOTO',
  },
  {
    label: '레터링',
    category: 'LETTERING',
  },
  {
    label: '캐릭터 - 그림',
    category: 'CHARACTER_IMAGE',
  },
  {
    label: '캐릭터 - 입체',
    category: 'CHARACTER_MODEL',
  },
  {
    label: '기타',
    category: 'ETC',
  },
];

export const SEOUL_AREA = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중량',
];

export const CAKE_CATEGORY = {
  ALL: '전체',
  PHOTO: '포토',
  LETTERING: '레터링',
  CHARACTER_IMAGE: '캐릭터-사진',
  CHARACTER_MODEL: '캐릭터-입체',
  ETC: '기타',
  '': '',
};

export const CAKE_SIZE = { MINI: '미니', NO_1: '1호', NO_2: '2호' };
