import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";
import {
  AddressOrderProps,
  OrderFilterProps,
  OrderProps,
} from "../../../../../../Config/interface";
import useAxios from "../../../../../../Config/axiosInstance";
import { useAuth } from "../../../../../../GlobalUtils/AuthContext";
import { useBackdrop } from "../../../../../../GlobalUtils/BackdropGlobal";

interface OrderContexrProps {
  setFilters: React.Dispatch<React.SetStateAction<OrderFilterProps>>;
  filters: OrderFilterProps;
  setOpenAnchor: React.Dispatch<React.SetStateAction<boolean>>;
  openAnchor: boolean;
  setPickedAddressOrder: React.Dispatch<
    React.SetStateAction<AddressOrderProps | null>
  >;
  pickedAddressOrder: AddressOrderProps | null;
  orderList: OrderProps[];
  handleDeleteOrder: (orderId: number) => Promise<void>;
  handleUpdateAddress: (addressOrderUpdate: AddressOrderProps) => Promise<void>;
}

const OrderContext = createContext<OrderContexrProps | undefined>(undefined);

export default function OrderManagement({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderList, setOrderList] = useState<OrderProps[]>([]);
  const { user } = useAuth();
  const [filters, setFilters] = useState<OrderFilterProps>({
    searchValue: "",
    clientEmail: user?.email || "",
    listStatus: [],
  });
  const [openAnchor, setOpenAnchor] = useState(false);
  const [pickedAddressOrder, setPickedAddressOrder] =
    useState<AddressOrderProps | null>(null);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstance = useAxios();

  useEffect(() => {
    async function getOrderByFilters() {
      try {
        showBackdrop();
        const response = await axiosInstance.post(
          "/order/getOrderByFilters",
          filters
        );
        if (response.data.code == 1000) {
          setOrderList(response.data.result);
        }
      } catch (error) {
        console.error("Error getting orders by filters", error);
      } finally {
        hideBackdrop();
      }
    }
    getOrderByFilters();
  }, [filters]);
  const handleDeleteOrder = useCallback(
    async (orderId: number) => {
      try {
        showBackdrop();
        const responses = await axiosInstance.delete(
          `/order/deleteOrder?clientEmail=${user?.email}&orderId=${orderId}`
        );
        if (responses.data.code == 1000) {
          toast.success("Cancel order successfully");
          setOrderList((prev) =>
            prev.map((eachOrder) =>
              eachOrder.orderId == orderId
                ? { ...responses.data.result }
                : eachOrder
            )
          );
        }
      } catch (error) {
        console.error("Error deleting order", error);
      } finally {
        hideBackdrop();
      }
    },
    [user]
  );

  const handleUpdateAddress = useCallback(
    async (addressOrderUpdate: AddressOrderProps) => {
      try {
        showBackdrop();
        const response = await axiosInstance.put(
          "/order/updateOrder/updateAddress",
          { clientEmail: user?.email, addressOrderUpdate }
        );
        if (response.data.code == 1000) {
          toast.success("Update address successfully");
          setOrderList((prev) =>
            prev.map((eachOrder) =>
              eachOrder.orderId != response.data.result.orderId
                ? eachOrder
                : response.data.result
            )
          );
        }
      } catch (error) {
        console.error("Error updating address order", error);
      } finally {
        hideBackdrop();
        setOpenAnchor(false);
      }
    },
    [user]
  );

  return (
    <OrderContext.Provider
      value={{
        setFilters,
        filters,
        openAnchor,
        orderList,
        pickedAddressOrder,
        setOpenAnchor,
        setPickedAddressOrder,
        handleDeleteOrder,
        handleUpdateAddress,
      }}
    >
      {/* <FormChangeAddressOrder
        changeAddress={pickedAddressOrder}
        open={openAnchor}
        setOpen={setOpenAnchor}
        handleUpdateAddress={handleUpdateAddress}
      /> */}
      {children}
      {/* {selectedOrder.map((eachOrder, index) => (
        <EachOrder
          order={eachOrder}
          key={index}
          handleDeleteOrder={handleDeleteOrder}
          setOpenAnchor={setOpenAnchor}
          setPickedAddressOrder={setPickedAddressOrder}
        />
      ))} */}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("hehe");
  }
  return context;
}
