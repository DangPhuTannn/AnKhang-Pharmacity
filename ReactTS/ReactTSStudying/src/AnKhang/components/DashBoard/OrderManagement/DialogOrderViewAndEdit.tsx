/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { OrderProps } from "../../../Config/interface";
import { getStatusName, getStatusStyle } from "../../../Config/function";
import EachOrderItem from "../../Home/Outlet/UserInformation/Outlet/Order/EachOrderItem";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { showConfirmDialog } from "../../../Config/functionTSX";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";
import useAxios from "../../../Config/axiosInstance";
import { GridApi } from "ag-grid-enterprise";
import { toast } from "react-toastify";

const ORDER_STATUSES = [
  "PROCESSING",
  "SHIPPING",
  "DELIVERED",
  "CANCELED",
  "RETURN",
];

interface FormValues {
  orderStatus: string;
}

export default function DialogOrderViewAndEdit({
  openDialog,
  setOpenDialog,
  pickOrder,
  setPickOrder,
  handleUpdateOrder,
  gridApiRef,
}: {
  openDialog: {
    editDialog: boolean;
    viewDialog: boolean;
  };
  setOpenDialog: Dispatch<
    SetStateAction<{
      editDialog: boolean;
      viewDialog: boolean;
    }>
  >;
  pickOrder: OrderProps | null;
  setPickOrder: Dispatch<SetStateAction<OrderProps | null>>;
  handleUpdateOrder: (updateOrder: OrderProps, gridApi: GridApi | null) => void;
  gridApiRef: MutableRefObject<GridApi<any> | null>;
}) {
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstance = useAxios();
  const handleClose = useCallback(() => {
    setOpenDialog({ viewDialog: false, editDialog: false });
    setPickOrder(null);
  }, []);
  const methods = useForm<FormValues>({
    defaultValues: { orderStatus: pickOrder?.orderStatus || "RETURN" },
  });

  useEffect(() => {
    if (pickOrder) {
      methods.reset({ orderStatus: pickOrder.orderStatus });
    }
  }, [pickOrder, methods]);

  const orderStatus = methods.watch("orderStatus");
  const orderStatusMenuItems = useMemo(() => {
    if (pickOrder?.orderStatus == "DELIVERED") {
      return ORDER_STATUSES.filter((eachStatus) =>
        ["RETURN", "DELIVERED"].includes(eachStatus)
      ).map((value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ));
    }
    if (pickOrder?.orderStatus == "RETURN") {
      return ORDER_STATUSES.filter((eachStatus) => eachStatus == "RETURN").map(
        (value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        )
      );
    }
    return ORDER_STATUSES.filter((eachStatus) => eachStatus != "RETURN").map(
      (value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      )
    );
  }, [pickOrder]);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (pickOrder?.orderStatus == "RETURN") {
      return showConfirmDialog({
        message: (
          <div style={{ whiteSpace: "pre-line" }}>
            Return status can not be changed!!!
          </div>
        ),
      });
    }
    async function updateOrderStatus() {
      try {
        showBackdrop();
        const response = await axiosInstance.put(
          `/order/updateOrder/updateStatus?orderId=${pickOrder?.orderId}&status=${data.orderStatus}`
        );
        if (response.data.code == 1000) {
          toast.success("Update order status successfully");
          setOpenDialog((prev) => ({
            ...prev,
            editDialog: false,
          }));
          handleUpdateOrder(response.data.result, gridApiRef.current);
        }
      } catch (error) {
        console.error("Error updating order status", error);
      } finally {
        hideBackdrop();
      }
    }

    showConfirmDialog({
      message: (
        <div style={{ whiteSpace: "pre-line" }}>
          Make sure you choose the correct status!!
        </div>
      ),
      accept: () => updateOrderStatus(),
    });
  };
  return (
    <Dialog
      open={openDialog.viewDialog || openDialog.editDialog}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: "auto",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent
        sx={{ padding: 0, overflowY: "auto" }}
        className="dialogScrollBar"
      >
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <div>
            <div className="w-full">
              <div className="bg-white shadow-md px-4 py-4">
                <div className="flex items-center text-center font-semibold text-gray-700 gap-2">
                  <div className="w-[55%]">Sản phẩm</div>
                  <div className="w-[10%]">Số lượng</div>
                  <div className="w-[15%]">Đơn vị</div>
                  <div className="w-[20%]">Tiền</div>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 mt-1">
                <div className="font-bold text-gray-800">
                  Mã đơn hàng: {pickOrder?.orderId}
                </div>

                <div className="max-h-[280px] overflow-y-auto mt-2 pr-2 eachOrderForm">
                  {pickOrder?.orderItems.map((eachOrderItem) => (
                    <EachOrderItem
                      {...eachOrderItem}
                      key={eachOrderItem.orderItemId}
                    />
                  ))}
                </div>
                <div className="flex flex-col md:flex-row py-4 gap-6">
                  <div className="w-full md:w-2/3 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      {openDialog.viewDialog ? (
                        <div
                          className={`w-fit px-4 py-2 rounded-lg text-sm font-semibold ${getStatusStyle(
                            pickOrder?.orderStatus || ""
                          )}`}
                        >
                          {getStatusName(pickOrder?.orderStatus || "")}
                        </div>
                      ) : (
                        <Controller
                          name="orderStatus"
                          control={methods.control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="Status"
                              variant="outlined"
                              className={`inputFieldForDashBoard w-fit ${getStatusStyle(
                                orderStatus
                              )}`}
                            >
                              {orderStatusMenuItems}
                            </TextField>
                          )}
                        />
                      )}
                    </div>

                    <div className="flex gap-2">
                      <div className="font-bold flex-shrink-0 text-gray-700">
                        Địa chỉ:
                      </div>
                      <div className="text-gray-600 break-words">
                        {`${pickOrder?.address}, ${pickOrder?.ward}, ${pickOrder?.district}, ${pickOrder?.province}`}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="font-bold flex-shrink-0 text-gray-700">
                        Người nhận:
                      </div>
                      <div className="text-green-600 font-bold">
                        {pickOrder?.name}
                      </div>
                      <div className="font-bold flex-shrink-0 text-gray-700">
                        Số điện thoại:
                      </div>
                      <div className="text-gray-600">{pickOrder?.phone}</div>
                    </div>

                    <div className="flex gap-2">
                      <div className="font-bold flex-shrink-0 text-gray-700">
                        Ghi chú:
                      </div>
                      <div className="text-gray-600">{pickOrder?.note}</div>
                    </div>
                    {openDialog.editDialog && (
                      <div className="w-fit">
                        <Button
                          variant="contained"
                          type="submit"
                          color="success"
                        >
                          Update
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between">
                      <div className="text-gray-600">Ngày đặt hàng</div>
                      <div className="text-gray-800 font-semibold">
                        {pickOrder?.orderDate}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-gray-600">Tiết kiệm được</div>
                      <div className="text-orange-500 font-semibold">
                        -
                        {pickOrder?.totalDiscount.toLocaleString("vi-VN") + "đ"}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-gray-600">Điểm tích lũy</div>
                      <div className="text-orange-500 font-semibold">
                        {pickOrder?.loyaltyPointsEarned}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t pt-3 mt-3">
                      <div className="text-lg font-bold text-gray-800">
                        Thành tiền
                      </div>
                      <div className="flex flex-col items-end">
                        {pickOrder?.totalDiscount !== 0 && (
                          <div className="text-gray-500 line-through text-sm">
                            {pickOrder?.totalPrice.toLocaleString("vi-VN") +
                              "đ"}
                          </div>
                        )}
                        <div className="text-green-600 text-xl font-bold">
                          {pickOrder?.finalPrice.toLocaleString("vi-VN") + "đ"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
