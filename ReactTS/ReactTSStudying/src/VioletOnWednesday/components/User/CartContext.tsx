import { createContext, Dispatch, ReactNode, useContext } from "react";
import { useReducer } from "react";
import { FlowerProps } from "../../interface/interface";
type CartProps = {
  flower: FlowerProps;
  quantity: number;
};

interface CartContextProps {
  cart: CartProps[];
  dispatch: Dispatch<Action>;
}

type Action =
  | { type: "ADD"; payload: FlowerProps }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "INCREASE"; payload: { id: string } }
  | { type: "DECREASE"; payload: { id: string } }
  | { type: "CLEAR" };

const initialState: CartProps[] = [];

const CartContexrProvider = createContext<CartContextProps | undefined>(
  undefined
);

const reducer = (state: CartProps[], action: Action): CartProps[] => {
  switch (action.type) {
    case "ADD": {
      const idExisted = state.findIndex(
        (eachCart) => eachCart.flower.id == action.payload.id
      );
      if (idExisted != -1) {
        return state.map((eachCart) =>
          eachCart.flower.id == action.payload.id
            ? { ...eachCart, quantity: eachCart.quantity + 1 }
            : eachCart
        );
      }
      return [...state, { flower: action.payload, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter(
        (eachCart) => eachCart.flower.id != action.payload.id
      );
    case "INCREASE":
      return state.map((eachCart) =>
        eachCart.flower.id == action.payload.id
          ? { ...eachCart, quantity: eachCart.quantity + 1 }
          : eachCart
      );
    case "DECREASE": {
      const tempProduct = state.find(
        (eachCart) => eachCart.flower.id == action.payload.id
      );
      if (tempProduct?.quantity == 1) {
        return state.filter(
          (eachCart) => eachCart.flower.id != action.payload.id
        );
      }
      return state.map((eachCart) =>
        eachCart.flower.id == action.payload.id
          ? { ...eachCart, quantity: eachCart.quantity - 1 }
          : eachCart
      );
    }
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};
export default function CartContext({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContexrProvider.Provider value={{ cart, dispatch }}>
      {children}
    </CartContexrProvider.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContexrProvider);
  if (!context) {
    throw new Error("blabla");
  }
  return context;
}
