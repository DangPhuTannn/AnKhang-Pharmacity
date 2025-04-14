import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/material";
import "./../../../../css/Home/Outlet/Cart/cart.css";
import { useCart } from "./CartContext";
import CartItem from "./CartItem";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import DefaultAddressCart from "./DefaultAddressCart";
import useAxios from "../../../../Config/axiosInstance";
import {
  PickedCartItemsProps,
  AddressShippingProps,
  UserProps,
  CartItemProps,
} from "../../../../Config/interface";
import { useAuth } from "../../../../GlobalUtils/AuthContext";
import { useBackdrop } from "../../../../GlobalUtils/BackdropGlobal";
import { showConfirmDialog } from "../../../../Config/functionTSX";
const style = {
  priceDetail: "flex items-center justify-between text-[#4a4f63] text-[15px]",
};

export default function Cart() {
  const {
    cart,
    changeQuantityCartItemFromCart,
    deleteCartItemToCart,
    clientEmail,
  } = useCart();
  const [note, setNote] = useState("");
  const [storePickedCartItems, setStorePickedCartItems] = useState<
    PickedCartItemsProps[]
  >([]);
  const [defaultAddress, setDefaultAddress] =
    useState<AddressShippingProps | null>(null);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function getDefaultAddress() {
      try {
        showBackdrop();
        const response = await axiosInstance.get(
          `/myAddress/getDefaultAddress/${clientEmail}`
        );
        if (response.data.code == 1000) {
          setDefaultAddress(response.data.result);
        }
      } catch (error) {
        console.error("Error getting default address", error);
      } finally {
        hideBackdrop();
      }
    }

    getDefaultAddress();
  }, []);
  useEffect(() => {
    if (cart) {
      setStorePickedCartItems((prevStore) =>
        cart.map((eachCartItem: CartItemProps) => {
          const prevItem = prevStore.find(
            (eachPickedCartItem) =>
              eachPickedCartItem.cartItemId === eachCartItem.cartItemId
          );

          return {
            cartItemId: eachCartItem.cartItemId,
            isPicked: prevItem ? prevItem.isPicked : true,
            availableProduct: prevItem ? prevItem.availableProduct : true,
            isOverQuantity: prevItem ? prevItem.isOverQuantity : false,
          };
        })
      );
    }
  }, [cart]);

  const notAvailableProducts = useMemo(() => {
    return storePickedCartItems.filter(
      ({ availableProduct }) => !availableProduct
    ).length;
  }, [storePickedCartItems]);

  const allPicked = useMemo(() => {
    return storePickedCartItems.every(({ isPicked, availableProduct }) => {
      if (!availableProduct) {
        return true;
      }
      return isPicked;
    });
  }, [storePickedCartItems]);
  const handleToggleSelectAll = () => {
    if (allPicked) {
      const cloneStorePickedCartItems: PickedCartItemsProps[] =
        storePickedCartItems.map((eachPickedCartItem) => ({
          ...eachPickedCartItem,
          isPicked: !eachPickedCartItem.isPicked,
        }));
      setStorePickedCartItems(cloneStorePickedCartItems);
    } else {
      const cloneStorePickedCartItems: PickedCartItemsProps[] =
        storePickedCartItems.map((eachPickedCartItem) => ({
          ...eachPickedCartItem,
          isPicked: true,
        }));
      setStorePickedCartItems(cloneStorePickedCartItems);
    }
  };
  const { totalPrice, totalDiscountFromMedicine } = useMemo(() => {
    return cart
      .filter((eachCartItem: CartItemProps) =>
        storePickedCartItems.some(
          (eachPickedCartItem) =>
            eachCartItem.cartItemId === eachPickedCartItem.cartItemId &&
            eachPickedCartItem.isPicked &&
            eachPickedCartItem.availableProduct
        )
      )
      .reduce(
        (
          acc: {
            totalPrice: number;
            totalDiscountFromMedicine: number;
          },
          eachCartItem: CartItemProps
        ) => ({
          totalPrice: acc.totalPrice + eachCartItem.totalPrice,
          totalDiscountFromMedicine:
            acc.totalDiscountFromMedicine + eachCartItem.discountFromMedicine,
        }),
        { totalPrice: 0, totalDiscountFromMedicine: 0 }
      );
  }, [cart, storePickedCartItems]);
  const { discountFromRank, finalPrice } = useMemo(() => {
    const tempPrice = totalPrice - totalDiscountFromMedicine;
    const discountFromRank = tempPrice * ((user?.discount || 0) / 100);
    const finalPrice = tempPrice - discountFromRank;
    return { discountFromRank, finalPrice };
  }, [totalPrice, totalDiscountFromMedicine]);
  const handleAddOrder = useCallback(
    async (
      user: UserProps | null,
      storePickedCartItems: PickedCartItemsProps[],
      defaultAddress: AddressShippingProps | null,
      totalPrice: number,
      totalDiscountFromMedicine: number,
      finalPrice: number,
      discountFromRank: number,
      note: string
    ) => {
      const getSelectedCartItems = storePickedCartItems
        .filter(
          ({ availableProduct, isPicked }) => isPicked && availableProduct
        )
        .map(({ cartItemId }) => cartItemId);
      if (getSelectedCartItems.length == 0) {
        toast.error("Please pick available products");
        return;
      }

      try {
        showBackdrop();
        const response = await axiosInstance.post("/order/addOrder", {
          clientEmail: user?.email,
          selectedCartItemIdList: getSelectedCartItems,
          name: defaultAddress?.name,
          phone: defaultAddress?.phone,
          province: defaultAddress?.province,
          district: defaultAddress?.district,
          ward: defaultAddress?.ward,
          address: defaultAddress?.address,
          totalPrice,
          totalDiscountFromMedicine,
          discountFromRank,
          totalDiscount: discountFromRank + totalDiscountFromMedicine,
          finalPrice,
          orderDate: format(new Date(), "dd/MM/yyyy"),
          note,
        });
        if (response.data.code == 1000) {
          const unAvailableCartItems: number[] =
            response.data.result.unAvailableCartItems;
          const overQuantityCartItems: number[] =
            response.data.result.overQuantityCartItems;
          if (
            unAvailableCartItems.length == 0 &&
            overQuantityCartItems.length == 0
          ) {
            toast.success("Buy successfully");
            setStorePickedCartItems((prev) =>
              prev.map((each) => ({ ...each, isOverQuantity: false }))
            );
          } else {
            toast.error("There are some unavailable products");
            setStorePickedCartItems((prev) =>
              prev.map((eachPickedCartItem) => {
                const cartItemId = eachPickedCartItem.cartItemId;
                const isUnavailable = unAvailableCartItems.includes(cartItemId);
                const isOverQuantity =
                  overQuantityCartItems.includes(cartItemId);
                return {
                  ...eachPickedCartItem,
                  availableProduct: isUnavailable
                    ? !isUnavailable
                    : eachPickedCartItem.availableProduct,
                  isOverQuantity: isOverQuantity,
                };
              })
            );
          }
        }
      } catch (error) {
        console.error("Error adding order", error);
      } finally {
        hideBackdrop();
      }
    },
    []
  );
  return (
    <Container className="cartWrapper">
      <div className="storeButtonBackToHomeCart cursor-pointer">
        <Link to="/home" className="flex items-center">
          <ArrowBackIosIcon className="arrowBackToHomeCart" />
          <div className="titleBackToHomeCart">Tiếp tục mua sắm</div>
        </Link>
      </div>
      {cart.length > 0 ? (
        <div className="cartContainer">
          <div className="containerLeftCart">
            <div className="headerContainerLeftCart">
              <div className="flex w-12/24">
                <div
                  className={`buttonCart cursor-pointer ${
                    allPicked && "isPickedCartItemCart"
                  }`}
                  onClick={handleToggleSelectAll}
                >
                  <div className="storeCheckButtonCart">
                    <CheckIcon className="scale-70" />
                  </div>
                </div>
                <div className="ml-[8px]">{`Chọn tất cả (${
                  cart.length - notAvailableProducts
                })`}</div>
              </div>
              <div className="text-center w-5/24">Giá thành</div>
              <div className="text-center w-4/24">Số lượng</div>
              <div className="w-3/24 pl-[10px]">Đơn vị</div>
            </div>
            <ul className="bodyContainerLeftCart">
              {cart.map((eachCartItem: CartItemProps) => (
                <CartItem
                  cartItem={eachCartItem}
                  storePickedCartItems={storePickedCartItems}
                  setStorePickedCartItems={setStorePickedCartItems}
                  key={eachCartItem.cartItemId}
                  changeQuantityCartItemFromCart={
                    changeQuantityCartItemFromCart
                  }
                  deleteCartItemToCart={deleteCartItemToCart}
                />
              ))}
            </ul>

            <DefaultAddressCart
              defaultAddress={defaultAddress}
              note={note}
              setNote={setNote}
            />
          </div>
          <div className="containerRightCart">
            <div className="bg-[#4CB551] py-[7px] px-[12px] flex items-center justify-between rounded-[10px]">
              <div className="text-white text-[13px]">
                Áp dụng ưu đãi để được giảm giá
              </div>
              <div className="text-white">
                <ArrowForwardIosIcon className="scale-60" />
              </div>
            </div>
            <div className={style.priceDetail}>
              <div>Tổng tiền</div>
              <div className="text-[#020b27] font-bold">
                {totalPrice.toLocaleString("vi-VN") + "đ"}
              </div>
            </div>
            <div className={style.priceDetail}>
              <div>Giảm giá trực tiếp</div>
              <div className="text-[#f79009] font-bold">
                -{totalDiscountFromMedicine.toLocaleString("vi-VN") + "đ"}
              </div>
            </div>
            <div className={style.priceDetail}>
              <div>{`Giảm giá từ rank ( ${user?.rankClient} )`}</div>
              <div className="text-[#f79009] font-bold">
                -{discountFromRank.toLocaleString("vi-VN") + "đ"}
              </div>
            </div>
            <div className={style.priceDetail}>
              <div>Tiết kiệm được</div>
              <div className="text-[#f79009] font-bold">
                {(finalPrice - totalPrice).toLocaleString("vi-VN") + "đ"}
              </div>
            </div>
            <div className="border border-[#e4e8ed]"></div>
            <div className="flex justify-between items-end">
              <div className="text-[17px] font-bold">Thành tiền</div>
              <div className="flex gap-[5px] items-end">
                {totalPrice != finalPrice && (
                  <div className="text-[#4a4f63] line-through text-[13px]">
                    {totalPrice.toLocaleString("vi-VN") + "đ"}
                  </div>
                )}
                <div className="text-[#4CB551] text-[18px] font-bold">
                  {finalPrice.toLocaleString("vi-VN") + "đ"}
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                if (!defaultAddress?.name) {
                  return showConfirmDialog({
                    message: (
                      <div style={{ whiteSpace: "pre-line" }}>
                        Add your address before buying?
                      </div>
                    ),
                    accept: () => navigate("/home/myInfor/myAddress"),
                  });
                }
                return showConfirmDialog({
                  message: (
                    <div style={{ whiteSpace: "pre-line" }}>
                      Make sure you choose the correct medicines <br />
                      and suitable quantity !!
                    </div>
                  ),
                  accept: () =>
                    handleAddOrder(
                      user,
                      storePickedCartItems,
                      defaultAddress,
                      totalPrice,
                      totalDiscountFromMedicine,
                      finalPrice,
                      discountFromRank,
                      note
                    ),
                });
              }}
              className="bg-[#4cb551] text-white py-[12px] px-[24px] text-center rounded-3xl cursor-pointer"
            >
              Mua hàng
            </div>
            <div className="text-center text-[12px]">
              Bằng việc tiến hành đặt mua hàng, bạn đồng ý với <br />
              <span className="font-bold underline">
                Điều khoản dịch vụ
              </span> và{" "}
              <span className="font-bold underline">
                Chính sách xử lý dữ liệu cá nhân
              </span>
              <br />
              của Nhà thuốc FPT Long Châu
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[300px]  items-center text-center">
          <div className="w-[300px]">
            <div className="my-[50px]">
              <AddShoppingCartIcon className="text-[#4cb551] scale-400" />
            </div>
            <div className="flex flex-col gap-[10px] items-center">
              <div className="font-bold text-[#4a4f67] text-[18px]">
                Chưa có sản phẩm nào trong giỏ
              </div>
              <div className="text-[#657384] text-[15px]">
                Cùng khám phá hàng ngàn sản phẩm tại Nhà thuốc TanKun nhé!
              </div>
              <Link to="/home">
                <div className="bg-[#4cb551] text-white font-bold px-[24px] py-[12px] rounded-3xl w-fit">
                  Khám phá ngay
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
