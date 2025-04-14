import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { debounce } from "lodash";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import CheckIcon from "@mui/icons-material/Check";
import { roundNumber, preventNonNumeric } from "../../../../Config/function";
import {
  CartItemProps,
  PickedCartItemsProps,
} from "../../../../Config/interface";
import { showConfirmDialog } from "../../../../Config/functionTSX";
export default function CartItem({
  cartItem,
  storePickedCartItems,
  changeQuantityCartItemFromCart,
  deleteCartItemToCart,
  setStorePickedCartItems,
}: {
  cartItem: CartItemProps;
  storePickedCartItems: PickedCartItemsProps[];
  changeQuantityCartItemFromCart: (
    cartItemId: number,
    quantity: number
  ) => Promise<void>;
  setStorePickedCartItems: Dispatch<SetStateAction<PickedCartItemsProps[]>>;
  deleteCartItemToCart: (cartItemId: number) => Promise<void>;
}) {
  const {
    imageURL,
    medicineName,
    finalPrice,
    discountFromMedicine,
    totalPrice,
    packageUnit,
    cartItemId,
    quantity,
  } = cartItem;
  const [getQuantity, setGetQuantity] = useState(quantity);
  const { isAvailable, isOverQuantity, isPicked } = useMemo(() => {
    const existed = storePickedCartItems?.find(
      (eachCartItem) => eachCartItem.cartItemId == cartItemId
    );
    return {
      isAvailable: existed?.availableProduct,
      isOverQuantity: existed?.isOverQuantity,
      isPicked: existed?.isPicked,
    };
  }, [storePickedCartItems]);
  const updateQuantity = useCallback(
    debounce((newQuantity: number) => {
      changeQuantityCartItemFromCart(cartItemId, newQuantity);
    }, 500),
    []
  );
  const handleChangeQuantity = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = Math.max(1, Math.min(999, Number(e.target.value)));
      setGetQuantity(newQuantity);
      updateQuantity(newQuantity);
    },
    []
  );

  const handleIncrease = useCallback((getQuantity: number) => {
    const newQuantity = Math.min(getQuantity + 1, 999);
    setGetQuantity(newQuantity);
    updateQuantity(newQuantity);
  }, []);

  const handleDecrease = useCallback((getQuantity: number) => {
    const newQuantity = Math.max(getQuantity - 1, 1);
    setGetQuantity(newQuantity);
    updateQuantity(newQuantity);
  }, []);

  const handleDeleteCartItem = useCallback(() => {
    return showConfirmDialog({
      message: (
        <div style={{ whiteSpace: "pre-line" }}>
          Are you sure you want to delete this cart item?
        </div>
      ),
      accept: () => deleteCartItemToCart(cartItemId),
    });
  }, [cartItem]);

  const handleTogglePickCartItem = useCallback(() => {
    setStorePickedCartItems((prev) =>
      prev.map((eachCartItem) =>
        eachCartItem.cartItemId != cartItemId
          ? eachCartItem
          : {
              ...eachCartItem,
              isPicked: !eachCartItem.isPicked,
            }
      )
    );
  }, [storePickedCartItems]);
  return (
    <li
      className="eachCartItemCart border-b-[0.8px] border-[#e5e7eb]"
      key={cartItemId}
    >
      <div
        className={`buttonCart mr-[12px] cursor-pointer ${
          isAvailable
            ? isPicked && "isPickedCartItemCart"
            : "unAvailableProduct"
        }`}
        onClick={() => isAvailable && handleTogglePickCartItem()}
      >
        <div className="storeCheckButtonCart">
          {isAvailable ? (
            <CheckIcon className="scale-70" />
          ) : (
            <ClearIcon className="scale-70" />
          )}
        </div>
      </div>
      <div className="border border-[#e5e7eb]  mr-[12px] eachCartItemImgCart">
        <img src={`/AnKhang/Medicines/${imageURL}`}></img>
      </div>
      <div className="eachCartItemNameCart">{medicineName}</div>
      <div className="eachCartItemPriceCart">
        {roundNumber(finalPrice).toLocaleString("vi-VN") + "đ"}
        {discountFromMedicine != 0 && (
          <div className="eachCartItemRealPriceCart">
            {roundNumber(totalPrice).toLocaleString("vi-VN") + "đ"}
          </div>
        )}
      </div>
      <div className="storeEachCartItemQuantityCart">
        <div className="flex flex-col gap-[10px] items-center">
          {isAvailable ? (
            <>
              <div className="flex items-center justify-center">
                <div
                  onClick={() => handleDecrease(getQuantity)}
                  className="border-[#e5e7eb] border border-r-0 px-[5px] rounded-l-[15px] cursor-pointer"
                >
                  <RemoveIcon
                    className={`scale-70 ${
                      getQuantity <= 1 && "text-[#e5e7eb]"
                    }`}
                  />
                </div>

                <input
                  className="pt-[1px] border border-[#e5e7eb] w-[40px] text-center"
                  value={getQuantity}
                  onKeyDown={preventNonNumeric}
                  onChange={(e) => handleChangeQuantity(e)}
                ></input>
                <div
                  onClick={() => handleIncrease(getQuantity)}
                  className="border-[#e5e7eb] border border-l-0 px-[5px] rounded-r-[15px] cursor-pointer"
                >
                  <AddIcon className="scale-70" />
                </div>
              </div>
              {isOverQuantity && (
                <div className="text-[13px] font-bold text-[#f79009]">
                  Hàng không đủ
                </div>
              )}
            </>
          ) : (
            <div className="text-[#d92d20] text-[14px] font-bold">
              Đã hết hàng
            </div>
          )}
        </div>
      </div>
      <div className="eachCartItemPackageCart">
        <div className="text-[14px] text-[#020b27]">{packageUnit}</div>
        <div onClick={() => handleDeleteCartItem()} className="cursor-pointer">
          <DeleteForeverIcon />
        </div>
      </div>
    </li>
  );
}
