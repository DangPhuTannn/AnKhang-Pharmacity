import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import useAxios from "../../../../Config/axiosInstance";
import { scrollToTop } from "../../../../Config/function";
import {
  CartItemProps,
  CartAction,
  CartContextProps,
} from "../../../../Config/interface";
import { useAuth } from "../../../../GlobalUtils/AuthContext";
import { useBackdrop } from "../../../../GlobalUtils/BackdropGlobal";

const cartReducer = (
  state: CartItemProps[],
  action: CartAction
): CartItemProps[] => {
  switch (action.type) {
    case "SET_CART": {
      return action.payload.cartItemsList;
    }
    case "ADD_CART_ITEM": {
      const existedCartItem = state.find(
        (eachCartItem) =>
          eachCartItem.cartItemId == action.payload.cartItem.cartItemId
      );
      if (existedCartItem) {
        return state.map((eachCartItem) =>
          eachCartItem.cartItemId != existedCartItem.cartItemId
            ? eachCartItem
            : {
                ...eachCartItem,
                quantity: action.payload.cartItem.quantity,
              }
        );
      }
      return [...state, action.payload.cartItem];
    }
    case "DELETE_CART_ITEM": {
      return state.filter(
        (eachCartItem) =>
          eachCartItem.cartItemId != action.payload.cartItem.cartItemId
      );
    }
    case "UPDATE_CART_ITEM": {
      return state.map((eachCartItem) =>
        eachCartItem.cartItemId != action.payload.cartItem.cartItemId
          ? eachCartItem
          : action.payload.cartItem
      );
    }
    default:
      return state;
  }
};

const initialCart: CartItemProps[] = [];

const StoreCartContext = createContext<CartContextProps | undefined>(undefined);
export const CartContext = ({ children }: { children: React.ReactNode }) => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [isShowTempCart, setIsShowTempCart] = useState<boolean>(false);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const tempCartTimeoutRef = useRef<number | null>(null);
  useEffect(() => {
    const getMyCart = async () => {
      showBackdrop();
      try {
        const response = await axiosInstance.get(`/cart/myCart/${user?.email}`);
        if (response.data.code == 1000) {
          dispatch({
            type: "SET_CART",
            payload: {
              cartItemsList: response.data.result.cartItemsList,
            },
          });
        }
      } catch (error) {
        console.error("Can not get my cart", error);
      } finally {
        hideBackdrop();
      }
    };

    getMyCart();
  }, []);

  const addMedicineToCart = useCallback(
    async (medicineId: number | undefined, quantity: number) => {
      console.log(medicineId, "blabla");
      showBackdrop();
      try {
        const response = await axiosInstance.post("/cart/addMedicineToCart", {
          clientEmail: user?.email,
          medicineId,
          quantity,
        });
        if (response.data.code == 1000) {
          dispatch({
            type: "ADD_CART_ITEM",
            payload: {
              cartItem: response.data.result,
            },
          });
        }
      } catch (error) {
        console.error("Error adding medicine to cart", error);
      } finally {
        hideBackdrop();
        scrollToTop();
        setIsShowTempCart(true);
        if (tempCartTimeoutRef.current) {
          clearTimeout(tempCartTimeoutRef.current);
        }
        tempCartTimeoutRef.current = setTimeout(() => {
          setIsShowTempCart(false);
        }, 2000);
      }
    },
    []
  );

  const deleteCartItemToCart = useCallback(async (cartItemId: number) => {
    showBackdrop();
    try {
      const response = await axiosInstance.delete(
        "/cart/deleteCartItemFromCart",
        {
          data: {
            clientEmail: user?.email,
            cartItemId,
          },
        }
      );
      if (response.data.code == 1000) {
        dispatch({
          type: "DELETE_CART_ITEM",
          payload: {
            cartItem: response.data.result,
          },
        });
      }
    } catch (error) {
      console.error("Error deleting cart item from cart", error);
    } finally {
      hideBackdrop();
    }
  }, []);

  const changeQuantityCartItemFromCart = useCallback(
    async (cartItemId: number, quantity: number) => {
      showBackdrop();
      try {
        const response = await axiosInstance.put(
          "/cart/changeQuantityCartItemFromCart",
          {
            clientEmail: user?.email,
            cartItemId,
            quantity,
          }
        );
        if (response.data.code == 1000) {
          dispatch({
            type: "UPDATE_CART_ITEM",
            payload: {
              cartItem: response.data.result,
            },
          });
        }
      } catch (error) {
        console.error("Error changing cart item from cart", error);
      } finally {
        hideBackdrop();
      }
    },
    []
  );

  return (
    <StoreCartContext.Provider
      value={{
        cart,
        addMedicineToCart,
        deleteCartItemToCart,
        changeQuantityCartItemFromCart,
        isShowTempCart,
        clientEmail: user?.email,
      }}
    >
      {children}
    </StoreCartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(StoreCartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
