import { Order } from '@/types/orders';

export function convertCakeSize(size: Order['cakeInfo']['cakeSize']) {
  switch (size) {
    case 'MINI':
      return '미니';
    case 'NO_1':
      return '1호';
    case 'NO_2':
      return '2호';
    default:
      return size;
  }
}

export function convertCakeHeight(height: Order['cakeInfo']['cakeHeight']) {
  switch (height) {
    case 'ONE_LAYER':
      return '1단';
    case 'TWO_LAYER':
      return '2단';
    default:
      return height;
  }
}

export function convertBreadFlavor(flavor: Order['cakeInfo']['breadFlavor']) {
  switch (flavor) {
    case 'VANILLA':
      return '바닐라';
    case 'CHOCO':
      return '초코';
    case 'GREEN_TEA':
      return '그린티';
    case 'CARROT':
      return '당근';
    default:
      return flavor;
  }
}

export function convertCreamFlavor(flavor: Order['cakeInfo']['creamFlavor']) {
  switch (flavor) {
    case 'WHIPPED_CREAM':
      return '생크림';
    case 'CREAM_CHEESE':
      return '크림치즈';
    case 'CHOCO':
      return '초코';
    case 'OREO':
      return '오레오';
    default:
      return flavor;
  }
}

export function convertCakeCategory(
  cakeCategory: Order['cakeInfo']['cakeCategory']
): string {
  switch (cakeCategory) {
    case 'ALL':
      return '전체';
    case 'PHOTO':
      return '사진케이크';
    case 'LETTERING':
      return '레터링/글씨케이크';
    case 'CHARACTER_IMAGE':
      return '캐릭터이미지케이크';
    case 'CHARACTER_MODEL':
      return '캐릭터모델링케이크';
    case 'ETC':
      return '기타';
    default:
      return '';
  }
}
