/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef, GetRowIdFunc, GridApi, GridOptions } from "ag-grid-enterprise";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MedicineProps } from "../../../Config/interface";

import AgGridTable from "../AgGirdTable";
import { storeFieldsProducts } from "../../../Config/glovalVariables";
import { Edit, ScanEye, Trash2, RefreshCcw } from "lucide-react";
import AddActionHeader from "../AddActionHeader";
import DialogMedicineEditOrAddForm from "./EditOrAdd/DialogMedicineEditOrAddForm";
import { showConfirmDialog } from "../../../Config/functionTSX";
import { toast } from "react-toastify";
import useAxios from "../../../Config/axiosInstance";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";
import DialogMedicineViewForm from "./View/DialogMedicineViewForm";
interface ProductContextProps {
  openDialog: {
    viewDialog: boolean;
    editAndAddDialog: boolean;
  };
  setOpenDialog: Dispatch<
    SetStateAction<{
      viewDialog: boolean;
      editAndAddDialog: boolean;
    }>
  >;
  handleOpenViewDialog: (medicine: MedicineProps) => void;
  handleOpenEditOrAddDialog: (medicine: MedicineProps) => void;
  handleUpdateMedicineInTable: (
    updatedMedicine: MedicineProps,
    gridApi: GridApi | null
  ) => void;
  handleAddMedicineInTable: (
    addMedicine: MedicineProps,
    gridApi: GridApi | null
  ) => void;
  selectedMedicine: MedicineProps | null;
  gridApiRef: MutableRefObject<GridApi<any> | null>;
  setSelectedMedicine: Dispatch<SetStateAction<MedicineProps | null>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export default function ProductManagement() {
  const [rowData, setRowData] = useState<MedicineProps[]>([]);
  const [colDefs] = useState<ColDef<MedicineProps>[]>(storeFieldsProducts);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [openDialog, setOpenDialog] = useState({
    viewDialog: false,
    editAndAddDialog: false,
  });

  const getRowId = useMemo<GetRowIdFunc<MedicineProps>>(() => {
    return (params) => params.data.medicineId.toString();
  }, []);

  const gridApiRef = useRef<GridApi | null>(null);
  const [selectedMedicine, setSelectedMedicine] =
    useState<MedicineProps | null>(null);
  const handleOpenViewDialog = useCallback((medicine: MedicineProps) => {
    setSelectedMedicine(medicine);
    setOpenDialog((prev) => ({ ...prev, viewDialog: true }));
  }, []);

  const handleOpenEditOrAddDialog = useCallback((medicine: MedicineProps) => {
    setSelectedMedicine(medicine);
    setOpenDialog((prev) => ({ ...prev, editAndAddDialog: true }));
  }, []);

  const handleUpdateMedicineInTable = useCallback(
    (updatedMedicine: MedicineProps, gridApi: GridApi | null) => {
      gridApi?.applyTransaction({
        update: [updatedMedicine],
      });
    },
    []
  );

  const handleAddMedicineInTable = useCallback(
    (addMedicine: MedicineProps, gridApi: GridApi | null) => {
      gridApi?.applyTransaction({
        add: [addMedicine],
      });
    },
    []
  );

  const handleDeleteMedicine = useCallback(
    async (medicine: MedicineProps) => {
      try {
        showBackdrop();
        const response = await axiosInstance.delete(
          `/medicines/delete/${medicine.medicineId}`
        );
        if (response.data.code == 1000) {
          toast.success(response.data.result);
          handleUpdateMedicineInTable(
            { ...medicine, deleted: true },
            gridApiRef.current
          );
        }
      } catch (error) {
        console.error("Error deleting medicine", error);
      } finally {
        hideBackdrop();
      }
    },
    [gridApiRef]
  );

  const handleRestoreMedicine = useCallback(
    async (medicine: MedicineProps) => {
      try {
        showBackdrop();
        const response = await axiosInstance.put(
          `/medicines/restore/${medicine.medicineId}`
        );
        if (response.data.code == 1000) {
          toast.success(response.data.result);
          handleUpdateMedicineInTable(
            { ...medicine, deleted: false },
            gridApiRef.current
          );
        }
      } catch (error) {
        console.log("Error restoring medicine", error);
      } finally {
        hideBackdrop();
      }
    },
    [gridApiRef]
  );

  const actionColumnProduct: ColDef<any> = useMemo(() => {
    return {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <div className="flex items-center justify-center gap-2 h-full">
          <ScanEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            size={24}
            onClick={() => handleOpenViewDialog(params.data as MedicineProps)}
          />
          <Edit
            className="cursor-pointer text-yellow-500 hover:text-yellow-700"
            size={24}
            onClick={() =>
              handleOpenEditOrAddDialog(params.data as MedicineProps)
            }
          />
          {params.data.deleted ? (
            <RefreshCcw
              className="cursor-pointer text-green-500 hover:text-green-700"
              size={24}
              onClick={() =>
                showConfirmDialog({
                  message: <div>Are you sure you want to restore?</div>,
                  accept: () => {
                    handleRestoreMedicine(params.data as MedicineProps);
                  },
                })
              }
            />
          ) : (
            <Trash2
              className="cursor-pointer text-red-500 hover:text-red-700"
              size={24}
              onClick={() =>
                showConfirmDialog({
                  message: <div>Are you sure you want to delete?</div>,
                  accept: () => {
                    handleDeleteMedicine(params.data as MedicineProps);
                  },
                })
              }
            />
          )}
        </div>
      ),
      width: 150,
      filter: false,
      sortable: false,
      pinned: "right",
      headerComponent: () => <AddActionHeader setOpenDialog={setOpenDialog} />,
    };
  }, []);
  const gridOptions: GridOptions<any> = {
    rowClassRules: {
      deleteStatusDashBoard: (params) => params.data.deleted,
    },
  };
  const axiosInstance = useAxios();
  useEffect(() => {
    async function getAllClients() {
      try {
        showBackdrop();
        const response = await axiosInstance.get("/medicines/getAllMedicines");
        if (response.data.code == 1000) {
          setRowData(response.data.result);
        }
      } catch (error) {
        console.error("Error getting all medicines", error);
      } finally {
        hideBackdrop();
      }
    }
    getAllClients();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        handleOpenEditOrAddDialog,
        handleOpenViewDialog,
        openDialog,
        selectedMedicine,
        setOpenDialog,
        gridApiRef,
        handleAddMedicineInTable,
        setSelectedMedicine,
        handleUpdateMedicineInTable,
      }}
    >
      <DialogMedicineViewForm />
      <DialogMedicineEditOrAddForm />
      <AgGridTable
        colDefs={colDefs}
        rowData={rowData}
        actionColumnParam={actionColumnProduct}
        gridApiRef={gridApiRef}
        getRowId={getRowId}
        gridOptions={gridOptions}
      />
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Error getting useProduct");
  }
  return context;
}
