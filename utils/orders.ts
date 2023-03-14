import {
  BreadFlavor,
  CakeCategory,
  CakeHeight,
  CakeSize,
  CreamFlavor,
  Order,
  OrderStatus,
} from '@/types/orders';

export function convertCakeSize(size: CakeSize) {
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

export function convertCakeHeight(height: CakeHeight) {
  switch (height) {
    case 'ONE_LAYER':
      return '1단';
    case 'TWO_LAYER':
      return '2단';
    default:
      return height;
  }
}

export function convertBreadFlavor(flavor: BreadFlavor) {
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

export function convertCreamFlavor(flavor: CreamFlavor) {
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

export function convertCakeCategory(cakeCategory: CakeCategory) {
  switch (cakeCategory) {
    case 'PHOTO':
      return '포토';
    case 'LETTERING':
      return '레터링';
    case 'CHARACTER_IMAGE':
      return '캐릭터 - 그림';
    case 'CHARACTER_MODEL':
      return '캐릭터 - 입체';
    case 'ETC':
      return '기타';
    default:
      return '';
  }
}

export const getOrderStatusText = (
  status: OrderStatus,
  offerCount: Order['offerCount']
) => {
  switch (status) {
    case 'NEW':
      return `+ ${offerCount}`;
    case 'RESERVED':
      return '선택 완료';
    case 'PAID':
      return '거래 완료';
    default:
      return '알 수 없는 상태';
  }
};
