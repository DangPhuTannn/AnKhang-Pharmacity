import { useReducer } from "react";
// import "./../ShoppingCart/shoppingCart.css";

type ProductProps = {
  id: number;
  name: string;
  price: number;
};

type ShoppingCartProps = {
  product: ProductProps;
  quantity: number;
};

type Action =
  | { type: "ADD"; payload: ProductProps }
  | { type: "REMOVE"; payload: { id: number } }
  | { type: "INCREASE"; payload: { id: number } }
  | { type: "DECREASE"; payload: { id: number } }
  | { type: "CLEAR" };

const initialState: ShoppingCartProps[] = [];

const reducer = (
  state: ShoppingCartProps[],
  action: Action
): ShoppingCartProps[] => {
  switch (action.type) {
    case "ADD": {
      const idExisted = state.findIndex(
        (eachCart) => eachCart.product.id == action.payload.id
      );
      if (idExisted != -1) {
        return state.map((eachCart) =>
          eachCart.product.id == action.payload.id
            ? { ...eachCart, quantity: eachCart.quantity + 1 }
            : eachCart
        );
      }
      return [...state, { product: action.payload, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter(
        (eachCart) => eachCart.product.id != action.payload.id
      );
    case "INCREASE":
      return state.map((eachCart) =>
        eachCart.product.id == action.payload.id
          ? { ...eachCart, quantity: eachCart.quantity + 1 }
          : eachCart
      );
    case "DECREASE": {
      const tempProduct = state.find(
        (eachCart) => eachCart.product.id == action.payload.id
      );
      if (tempProduct?.quantity == 1) {
        return state.filter(
          (eachCart) => eachCart.product.id != action.payload.id
        );
      }
      return state.map((eachCart) =>
        eachCart.product.id == action.payload.id
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

const listProducts: ProductProps[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1000,
  },
  {
    id: 2,
    name: "Phone",
    price: 500,
  },
  {
    id: 3,
    name: "Headphones",
    price: 100,
  },
];

const styles = {
  container: "border border-gray-400 px-10 py-20",
  eachShoppingCart:
    "flex gap-10 p-[10px] border border-gray-400 mt-[10px] items-center",
  button: "py-[5px] px-[10px] bg-black w-fit cursor-pointer text-white",
};
export default function ShoppingCart() {
  const [shoppingCart, dispatch] = useReducer(reducer, initialState);
  const handleAdd = (product: ProductProps) => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };
  const handleRemove = (id: number) => {
    dispatch({
      type: "REMOVE",
      payload: {
        id,
      },
    });
  };
  const handleIncrease = (id: number) => {
    dispatch({
      type: "INCREASE",
      payload: {
        id,
      },
    });
  };
  const handleDecrease = (id: number) => {
    dispatch({
      type: "DECREASE",
      payload: {
        id,
      },
    });
  };
  const handleClear = () => {
    dispatch({
      type: "CLEAR",
    });
  };

  return (
    <div className="m-[10px]">
      <div className={styles.container}>
        <div className="text-[25px] font-bold">Products </div>
        <ul>
          {listProducts.map(({ name, price, id }) => (
            <li className={styles.eachShoppingCart}>
              {`${name} - $${price}`}
              <div
                className={styles.button}
                onClick={() => handleAdd({ name, price, id })}
              >
                Add to Cart
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.container} mt-[20px]`}>
        <div className="title">Shopping Cart</div>
        <ul>
          {shoppingCart.map(({ product, quantity }) => (
            <li className={styles.eachShoppingCart}>
              {`${product.name} - $${product.price} x ${quantity}`}
              <div
                className={styles.button}
                onClick={() => handleRemove(product.id)}
              >
                Remove
              </div>
              <div
                className={styles.button}
                onClick={() => handleIncrease(product.id)}
              >
                +
              </div>
              <div
                className={styles.button}
                onClick={() => handleDecrease(product.id)}
              >
                -
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-[10px]">
          {`Total: $${
            shoppingCart.length > 0
              ? shoppingCart.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )
              : "0"
          }`}
        </div>
        <div
          className={`${styles.button} mt-[10px]`}
          onClick={() => handleClear()}
        >
          Clear Cart
        </div>
      </div>
    </div>
  );
}
