export interface ICakeList {
  label: string;
  category: string;
}

export interface ILocationListItem {
  name: string;
  onClose: () => void;
  setLocation: (name: string) => void;
}

export interface ICakeItem {
  category: string;
  cakeSize: string;
  image: string;
  price: string;
  status: string;
  visitTime: string;
  title: string;
}
