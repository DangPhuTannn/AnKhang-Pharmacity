import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FlowerProps } from "../../interface/interface";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface ProductContextProps {
  flowers: FlowerProps[];
  pickedFlower: FlowerProps | null;
  setPickedFlower: Dispatch<SetStateAction<FlowerProps | null>>;
  handleEdit: (flower: FlowerProps) => void;
  handleDelete: (id: string | undefined) => Promise<void>;
  setOpenConfirm: Dispatch<SetStateAction<boolean>>;
  openConfirm: boolean;
  setFlowers: Dispatch<SetStateAction<FlowerProps[]>>;
  openFillFormFlower: boolean;
  setOpenFillFormFlower: Dispatch<SetStateAction<boolean>>;
}

const ProductProvider = createContext<ProductContextProps | undefined>(
  undefined
);
export default function ProductContext({ children }: { children: ReactNode }) {
  const [flowers, setFlowers] = useState<FlowerProps[]>([]);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openFillFormFlower, setOpenFillFormFlower] = useState(false);
  const [pickedFlower, setPickedFlower] = useState<FlowerProps | null>(null);
  const handleEdit = (flower: FlowerProps) => {
    setPickedFlower(flower);
    setOpenFillFormFlower(true);
  };
  useEffect(() => {
    async function getStoreProducts() {
      setOpen(true);
      const response = await axios.get("http://localhost:3001/flowers");
      if (response.data.length > 0) {
        setFlowers(response.data);
      }
      setOpen(false);
    }
    getStoreProducts();
  }, []);
  const handleDelete = async (id: string | undefined) => {
    const responses = await axios.delete(`http://localhost:3001/flowers/${id}`);
    if (responses.status == 200) {
      toast.success("Delete successfully");
      setOpenConfirm(false);
      setFlowers((prev) => prev.filter((eachFlower) => eachFlower.id != id));
    }
  };
  return (
    <ProductProvider.Provider
      value={{
        flowers,
        handleDelete,
        openConfirm,
        setOpenConfirm,
        setFlowers,
        openFillFormFlower,
        setOpenFillFormFlower,
        handleEdit,
        pickedFlower,
        setPickedFlower,
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
    </ProductProvider.Provider>
  );
}

export function useFlower() {
  const context = useContext(ProductProvider);
  if (!context) {
    throw new Error("Error asd");
  }
  return context;
}
