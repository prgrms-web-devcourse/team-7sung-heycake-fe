export interface ICakeList {
  label: string;
  category: string;
}

export interface ILocationListItem {
  name: string;
  onClose: () => void;
  setLocation: (name: string) => void;
}
