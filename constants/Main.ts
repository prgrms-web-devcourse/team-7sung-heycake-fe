import { CakeList } from '@/types/Main';

export const TAB_TABLE: CakeList[] = [
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

export const CAKE_CATEGORY = {
  ALL: '전체',
  PHOTO: '포토',
  LETTERING: '레터링',
  CHARACTER_IMAGE: '캐릭터 - 그림',
  CHARACTER_MODEL: '캐릭터 - 입체',
  ETC: '기타',
  '': '',
};

export const CAKE_CATEGORY_COLOR = {
  ALL: 'gray',
  PHOTO: 'red',
  LETTERING: 'green',
  CHARACTER_IMAGE: 'pink',
  CHARACTER_MODEL: 'yellow',
  ETC: 'gray',
  '': '',
};

export const CAKE_SIZE = { MINI: '미니', NO_1: '1호', NO_2: '2호' };
