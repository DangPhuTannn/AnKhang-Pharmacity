/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FlowerProps } from "../../interface/interface";
import { Dispatch, SetStateAction } from "react";
import { useFlower } from "./ProductContext";
import axios from "axios";

interface FormValues {
  title: string;
  imageLink: string;
  price: number;
  quantity: number;
  category: string;
}

export default function FormFillFlower({
  pickedFlower,
  setPickedFlower,
}: {
  pickedFlower: FlowerProps | null;
  setPickedFlower: Dispatch<SetStateAction<FlowerProps | null>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { setOpenFillFormFlower, setFlowers } = useFlower();
  const onSubmit: SubmitHandler<FormValues> = async (inputData: any) => {
    if (pickedFlower) {
      const responses = await axios.put(
        `http://localhost:3001/flowers/${pickedFlower.id}`,
        {
          id: pickedFlower.id,
          name: inputData.title,
          imageURL: inputData.imageLink[0].name,
          flowerCode: "",
          discount: 0,
          price: Number(inputData.price),
          quantity: inputData.quantity,
          category: inputData.category,
        }
      );

      setFlowers((prev) =>
        prev.map((eachFlower) =>
          eachFlower.id === pickedFlower.id
            ? {
                ...eachFlower,
                category: responses.data.category,
                name: responses.data.name,
                imageURL: responses.data.imageURL,
                price: Number(responses.data.price),
                quantity: responses.data.quantity,
              }
            : eachFlower
        )
      );
      setPickedFlower(null);
      setOpenFillFormFlower(false);
    } else {
      const response = await axios.post("http://localhost:3001/flowers", {
        category: inputData.category,
        name: inputData.title,
        imageURL: inputData.imageLink[0].name,
        price: Number(inputData.price),
        quantity: inputData.quantity,
        flowerCode: "asd",
        discount: 0,
        date: "1/1/2025",
      });
      if (response.status == 201) {
        setFlowers((prev) => [...prev, response.data]);
        setPickedFlower(null);
        setOpenFillFormFlower(false);
      }
    }
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] bg-white p-[16px]"
        noValidate
      >
        <div className="flex flex-col gap-[20px] ">
          <div className="text-center text-[30px] font-bold">Add Product</div>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            {...register("title", {
              required: "Title không được trống",
            })}
            defaultValue={pickedFlower && pickedFlower.name}
            error={!!errors.title}
            helperText={errors.title && errors.title.message}
          />
          <TextField
            id="outlined-basic"
            type="file"
            label="imageLink"
            variant="outlined"
            {...register("imageLink", {
              required: "ImageLink không được trống",
            })}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.imageLink}
            helperText={errors.imageLink && errors.imageLink.message}
          />
          <div className="flex gap-[10px]">
            <TextField
              id="outlined-basic"
              type="text"
              label="Price"
              variant="outlined"
              {...register("price", {
                required: "Price không được trống",
                pattern: {
                  value: /^\d+$/,
                  message: "Chỉ được nhập số",
                },
              })}
              defaultValue={pickedFlower && pickedFlower.price}
              className="w-[70%]"
              error={!!errors.price}
              helperText={errors.price && errors.price.message}
            />

            <TextField
              id="outlined-basic"
              type="text"
              label="Quantity"
              variant="outlined"
              {...register("quantity", {
                required: "Quantity không được trống",
                pattern: {
                  value: /^\d+$/,
                  message: "Chỉ được nhập số",
                },
              })}
              defaultValue={pickedFlower && pickedFlower.quantity}
              className="w-[29%]"
              error={!!errors.quantity}
              helperText={errors.quantity && errors.quantity.message}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            {...register("category", {
              required: "Category không được trống",
            })}
            defaultValue={pickedFlower && pickedFlower.category}
            error={!!errors.category}
            helperText={errors.category && errors.category.message}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
