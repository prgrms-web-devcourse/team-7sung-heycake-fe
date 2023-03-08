import {
  BreadFlavor,
  CakeCategory,
  CakeHeight,
  CakeSize,
  CreamFlavor,
} from '@/types/orders';

export const cakeCategories: CakeCategory[] = [
  'PHOTO',
  'LETTERING',
  'CHARACTER_IMAGE',
  'CHARACTER_MODEL',
  'ETC',
];
export const cakeSizes: CakeSize[] = ['MINI', 'NO_1', 'NO_2', 'ETC'];
export const cakeHeights: CakeHeight[] = ['ONE_LAYER', 'TWO_LAYER', 'ETC'];
export const breadFlavors: BreadFlavor[] = [
  'VANILLA',
  'CHOCO',
  'GREEN_TEA',
  'CARROT',
  'ETC',
];
export const creamFlavors: CreamFlavor[] = [
  'WHIPPED_CREAM',
  'CREAM_CHEESE',
  'CHOCO',
  'OREO',
  'ETC',
];
