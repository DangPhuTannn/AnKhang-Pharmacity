import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCart } from "./User/CartContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

type FormValues = {
  recipientName: string;
  phoneNumber: number;
  address: string;
  note: string;
};
export default function ShippingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { cart, dispatch } = useCart();
  // tên, đơn giá và quantity
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (cart.length < 1) {
      toast.error("Go to cart to buy product");
      return;
    }
    const storeListFlowers = cart.map(({ flower, quantity }) => ({
      name: flower.name,
      price: flower.price,
      quantity,
    }));

    async function postOrder() {
      try {
        const response = await axios.post("http://localhost:3001/orders", {
          storeListFlowers: storeListFlowers,
          recipientName: data.recipientName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          note: data.note,
        });
        if (response.status == 201) {
          toast.success("Đặt hàng thành công");
          dispatch({
            type: "CLEAR",
          });
        }
      } catch (error) {
        console.error("Error posting order", error);
      }
    }
    postOrder();
  };
  return (
    <div className="flex justify-center mt-[50px]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] bg-white p-[16px]"
        noValidate
      >
        <div className="flex flex-col gap-[20px] ">
          <div className="text-center text-[30px] font-bold">Form Order</div>
          <TextField
            id="outlined-basic"
            label="Recipient Name"
            variant="outlined"
            {...register("recipientName", {
              required: "recipientName không được trống",
            })}
            error={!!errors.recipientName}
            helperText={errors.recipientName && errors.recipientName.message}
          />
          <TextField
            id="outlined-basic"
            type="text"
            label="Phone Number"
            variant="outlined"
            {...register("phoneNumber", {
              required: "phoneNumber không được trống",
              pattern: {
                value: /^\d+$/,
                message: "Chỉ được nhập số",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber.message}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            {...register("address", {
              required: "Address không được trống",
            })}
            error={!!errors.address}
            helperText={errors.address && errors.address.message}
          />{" "}
          <TextField
            id="outlined-basic"
            label="Note"
            variant="outlined"
            {...register("note", {
              required: "Note không được trống",
            })}
            error={!!errors.note}
            helperText={errors.note && errors.note.message}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
