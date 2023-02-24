export interface ICakeList {
  label: string;
  content: string;
}

export interface ILocationListItem {
  name: string;
  onClose: () => void;
  setLocation: (name: string) => void;
}
