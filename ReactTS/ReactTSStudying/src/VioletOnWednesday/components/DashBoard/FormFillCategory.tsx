import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CategoryProps } from "../../interface/interface";
import axios from "axios";
import { useCategory } from "./CategoryContext";
import { Dispatch, SetStateAction } from "react";

interface FormValues {
  name: string;
  description: string;
}

export default function FormFillCategory({
  category,
  setPickedCategory,
}: {
  category: CategoryProps | null;
  setPickedCategory: Dispatch<SetStateAction<CategoryProps | null>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { setOpenFillFormCategory, setCategories } = useCategory();
  const onSubmit: SubmitHandler<FormValues> = async (inputData) => {
    if (category) {
      const responses = await axios.put(
        `http://localhost:3001/categories/${category.id}`,
        {
          id: category.id,
          category: inputData.name,
          description: inputData.description,
          quantityFlowers: category.quantityFlowers,
        }
      );
      if (responses.status == 200) {
        setCategories((prev) =>
          prev.map((eachCategory) =>
            eachCategory.id === category.id
              ? {
                  ...eachCategory,
                  category: responses.data.category,
                  description: responses.data.description,
                }
              : eachCategory
          )
        );
        setPickedCategory(null);
        setOpenFillFormCategory(false);
      }
    } else {
      const response = await axios.post("http://localhost:3001/categories", {
        category: inputData.name,
        description: inputData.description,
        quantityFlowers: 0,
      });
      if (response.status == 201) {
        setCategories((prev) => [...prev, response.data]);
        setOpenFillFormCategory(false);
      }
    }
  };
  return (
    <div className="flex justify-center mt-[20px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] bg-white p-[16px]"
        noValidate
      >
        <div className="flex flex-col gap-[20px] ">
          <div className="text-center text-[30px] font-bold">Add Category</div>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            {...register("name", {
              required: "Name không được trống",
            })}
            defaultValue={category && category.category}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            {...register("description", {
              required: "Description không được trống",
            })}
            defaultValue={category && category.description}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
