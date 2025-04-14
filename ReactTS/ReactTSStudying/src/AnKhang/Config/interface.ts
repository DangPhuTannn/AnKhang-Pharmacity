import { Dispatch, SetStateAction } from "react";

export interface HealthNewsProps {
  title: string;
  createdAt: string;
  imageURL: string;
}
export interface ButtonMedicineProps {
  storeButton: string;
  children: React.ReactNode;
  onClick: () => void;
}
export interface MedicineProps {
  medicineId: number;
  medicineName: string;
  description: string;
  ingredients: string;
  price: number;
  deleted: boolean;
  totalQuantity: number;
  packageUnit: string;
  packageQuantity: number;
  itemUnit: string;
  itemQuantityPerPackage: number;
  discount: number;
  imageURL: string;
  targetPatiences: AttributeProps[];
  indications: AttributeProps[];
  categories: AttributeProps[];
  flavorOrScents: AttributeProps[];
  skinTypes: AttributeProps[];
  brand: string;
  originCountry: string;
}

export interface CategoryProps {
  title: string;
  keyWords: string[];
}

export interface FormMedicineProps {
  typeForm: string;
  typeMedicine: CategoryProps[];
  defaultCategory: string[];
}

export interface ContentProps {
  mainTitle: string;
  relatives: CategoryProps[];
}

export interface ItemHeaderProps {
  icon: React.ReactNode;
  text: string;
  isCenter: boolean;
}

export interface EachVerificationProps {
  image: React.ReactNode;
  title: string;
  text: string;
}

export interface TextContactProps {
  text: string;
  phoneNum: string | null;
}

export interface ContactProps {
  title: string;
  storeText: TextContactProps[];
  sizeContact: number;
}

export interface ClientSignUpProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  doB: string | undefined;
}

export interface DecorationItemsProps {
  imageURL: string;
  classCSS: string;
}

export interface SocialFooterProps {
  title: string;
  storeIcons: React.ReactNode[] | string[];
  size: number;
}

export interface TypeLeftCategoryHomeProps {
  mainTitle: string;
  haveSearchBar: boolean;
  typeContainer: string;
  listType: AttributeProps[] | string[];
}

export interface DiffTypeCategoryHomeProps {
  paramTitle: string;
  storeDiffList: TypeLeftCategoryHomeProps[];
}

export interface AttributeProps {
  attributeId: number;
  name: string;
  description: string;
  attributeType: string;
}

export interface AttributeValueProps {
  attributeType:
    | "CATEGORY"
    | "TARGET_PATIENCE"
    | "INDICATION"
    | "FLAVOR_OR_SCENT"
    | "SKIN_TYPE"
    | "brand"
    | "originCountry";
  attributeValues: Set<string>;
}

export interface FilterBodyCategoryHomeProps {
  priceRange: { min: number; max: number } | null;
  categories: AttributeValueProps;
  targetPatiences: AttributeValueProps;
  indications: AttributeValueProps;
  skinTypes: AttributeValueProps;
  flavorOrScents: AttributeValueProps;
  brand: AttributeValueProps;
  originCountry: AttributeValueProps;
  sortOrder: "asc" | "desc";
}

export type FilterCategory = Exclude<
  keyof FilterBodyCategoryHomeProps,
  "priceRange"
>;

export type FilterAction =
  | {
      type: "ADD_FILTER";
      category: FilterCategory;
      value: string | Set<string> | unknown;
    }
  | {
      type: "REMOVE_FILTER";
      category: FilterCategory;
      value: string | Set<string> | unknown;
    }
  | { type: "RESET_ONE_CATEGORY_FILTER"; category: FilterCategory }
  | {
      type: "RESET_FILTER";
    }
  | {
      type: "SET_PRICE_RANGE";
      priceRange: { min: number; max: number } | null;
    };

export interface CategoryHomeContextProps {
  listMedicines: MedicineProps[];
  sortOrder: string;
  dispatch: Dispatch<FilterAction>;
  filters: FilterBodyCategoryHomeProps;
  storeBreadCrums: string[];
  originListMedicines: MedicineProps[];
}

export interface EachInputTypeLeftProps {
  index: number;
  storeTypeLeft: Set<string>;
  eachType: string | AttributeProps;
  mainTitle: string;
  typeContainer: string;
}

export interface CartItemProps {
  cartItemId: number;
  quantity: number;
  availableProduct: boolean;
  totalPrice: number;
  imageURL: string;
  medicineName: string;
  packageUnit: string;
  discountFromMedicine: number;
  finalPrice: number;
}

export type CartAction =
  | {
      type: "SET_CART";
      payload: { cartItemsList: CartItemProps[] };
    }
  | {
      type: "ADD_CART_ITEM";
      payload: { cartItem: CartItemProps };
    }
  | {
      type: "UPDATE_CART_ITEM";
      payload: {
        cartItem: CartItemProps;
      };
    }
  | {
      type: "DELETE_CART_ITEM";
      payload: {
        cartItem: CartItemProps;
      };
    };

export interface CartContextProps {
  cart: CartItemProps[];
  addMedicineToCart: (medicineId: number | undefined, quantity: number) => Promise<void>;
  deleteCartItemToCart: (cartItemId: number) => Promise<void>;
  changeQuantityCartItemFromCart: (
    cartItemId: number,
    quantity: number
  ) => Promise<void>;
  isShowTempCart: boolean;
  clientEmail: string | undefined;
}

export interface BackdropContextProps {
  showBackdrop: () => void;
  hideBackdrop: () => void;
}

export interface PickedCartItemsProps {
  cartItemId: number;
  isPicked: boolean;
  availableProduct: boolean;
  isOverQuantity: boolean;
}

export interface UserProps {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  roles: string[];
  gender: boolean;
  doB: string;
  deleted: boolean;
  rankClient?: string;
  discount?: number;
  loyaltyPoint?: number;
  specialization?: string; // for doctor
}

export interface AuthContextProps {
  user: UserProps | null;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
}

export interface ProvinceProps {
  code: string;
  name: string;
  nameWithType: string;
}

export interface DistrictProps {
  code: string;
  name: string;
  nameWithType: string;
  parentCode: string;
}

export interface WardsProps {
  code: string;
  name: string;
  nameWithType: string;
  parentCode: string;
}

export interface AddressShippingProps {
  addressShippingId: number;
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  defaultAddress: boolean;
}

export interface AddressValuesProps {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  isDefault: boolean;
}

export interface OrderItemProps {
  orderItemId: number;
  imageURL: string;
  medicineName: string;
  quantity: number;
  packageUnit: string;
  totalPrice: number;
  discountFromMedicine: number;
  finalPrice: number;
}

export interface OrderProps {
  orderId: number;
  orderStatus: string;
  orderDate: string;
  totalPrice: number;
  totalDiscount: number;
  finalPrice: number;
  loyaltyPointsEarned: number;
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  orderItems: OrderItemProps[];
  note: string;
}

export interface AddressOrderProps {
  orderId: number;
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  note: string;
}

export interface AddressOrderValues {
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  note: string;
}

export interface ListAttributeProps {
  title: string;
  value: AttributeProps[];
}

export interface Country {
  name: { common: string };
  flags: { png: string };
}

export interface OrderFilterProps {
  searchValue: string;
  clientEmail: string;
  listStatus: string[];
}
