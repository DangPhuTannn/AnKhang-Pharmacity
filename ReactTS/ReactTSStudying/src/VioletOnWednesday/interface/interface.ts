export interface FirstRowItemProps {
  icon: React.ReactNode | null;
  text: React.ReactNode;
  size: number;
}

export interface FlowerProps {
  id: string;
  name: string;
  imageURL: string;
  flowerCode: string;
  discount: number;
  price: number;
  date: string;
  quantity: number;
  category: string;
}

export interface EachContactProps {
  title: string;
  listContacts: string[];
}

export interface InforContactProps {
  title: string;
  text: string;
}

export interface MenuDashBoardProps {
  title: string;
  icon: React.ReactNode;
  listText: string[];
  notification: React.ReactNode | null;
  linkURL: string;
}

export interface EachVerificationProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

export interface NewsProps {
  name: string;
  imageURL: string;
  date: string;
}

export interface FlowerAndNewsContextProps {
  storeFlowers: FlowerProps[];
  storeNews: NewsProps[];
  setStoreFlowers: React.Dispatch<React.SetStateAction<FlowerProps[]>>;
  setStoreNews: React.Dispatch<React.SetStateAction<NewsProps[]>>;
}

export interface InputFieldFormProps {
  textField: React.ReactNode;
  title?: string;
  label?: string;
}

export interface BigNewsProps {
  title: string;
  text: string;
  imgURL: string;
  date: string;
}

export interface UserProps {
  id: string;
  username: string;
  password: string;
  permissions: string[];
}

export type CategoryProps = {
  id: string;
  category: string;
  description: string;
  quantityFlowers: number;
};

// export interface SocialFooterProps {
//   title: string;
//   storeIcons: React.ReactNode[] | string[];
//   size: number;
// }

// export interface DecorationItemsProps {
//   imageURL: string;
//   classCSS: string;
// }
