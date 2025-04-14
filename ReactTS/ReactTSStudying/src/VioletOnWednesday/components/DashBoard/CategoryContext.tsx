import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CategoryProps } from "../../interface/interface";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface CategoryContextProps {
  categories: CategoryProps[];
  handleDelete: (id: string | undefined) => Promise<void>;
  setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  openConfirm: boolean;
  setCategories: Dispatch<SetStateAction<CategoryProps[]>>;
  openFillFormCategory: boolean;
  setOpenFillFormCategory: Dispatch<SetStateAction<boolean>>;
  handleEdit: (caterogy: CategoryProps) => void;
  pickedCategory: CategoryProps | null;
  setPickedCategory: Dispatch<SetStateAction<CategoryProps | null>>;
}

const CategoryProvider = createContext<CategoryContextProps | undefined>(
  undefined
);
export default function CategoryContext({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pickedCategory, setPickedCategory] = useState<CategoryProps | null>(
    null
  );

  const handleEdit = (caterogy: CategoryProps) => {
    setPickedCategory(caterogy);
    setOpenFillFormCategory(true);
  };

  const [openFillFormCategory, setOpenFillFormCategory] = useState(false);
  useEffect(() => {
    async function getStoreCategories() {
      setOpen(true);
      const response = await axios.get("http://localhost:3001/categories");
      if (response.data.length > 0) {
        setCategories(response.data);
      }
      setOpen(false);
    }
    getStoreCategories();
  }, []);
  const handleDelete = async (id: string | undefined) => {
    const responses = await axios.delete(
      `http://localhost:3001/categories/${id}`
    );
    if (responses.status == 200) {
      toast.success("Delete successfully");
      setOpenConfirm(false);
      setCategories((prev) =>
        prev.filter((eachCategory) => eachCategory.id != id)
      );
    }
  };
  return (
    <CategoryProvider.Provider
      value={{
        categories,
        handleDelete,
        openConfirm,
        setOpenConfirm,
        setCategories,
        openFillFormCategory,
        setOpenFillFormCategory,
        handleEdit,
        pickedCategory,
        setPickedCategory,
      }}
    >
      {open && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      {children}
    </CategoryProvider.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryProvider);
  if (!context) {
    throw new Error("Error");
  }
  return context;
}
