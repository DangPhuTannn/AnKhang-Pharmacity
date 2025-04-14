/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OrderProps } from "../../../Config/interface";
import { ColDef, GetRowIdFunc, GridApi } from "ag-grid-enterprise";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";
import useAxios from "../../../Config/axiosInstance";
import { storeFieldsOrder } from "../../../Config/glovalVariables";
import { ScanEye, Edit } from "lucide-react";
import AgGridTable from "../AgGirdTable";
import DialogOrderViewAndEdit from "./DialogOrderViewAndEdit";
export function OrderManagementDashBoard() {
  const [rowData, setRowData] = useState<OrderProps[]>([]);
  const [colDefs] = useState<ColDef<OrderProps>[]>(storeFieldsOrder);
  const getRowId = useMemo<GetRowIdFunc<OrderProps>>(() => {
    return (params) => params.data.orderId.toString();
  }, []);
  const gridApiRef = useRef<GridApi | null>(null);
  const actionColumnOrder: ColDef<any> = useMemo(() => {
    return {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <div className="flex items-center justify-center gap-2 h-full">
          <ScanEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            size={24}
            onClick={() => handleOpenViewDialog(params.data as OrderProps)}
          />
          <Edit
            className="cursor-pointer text-yellow-500 hover:text-yellow-700"
            size={24}
            onClick={() => handleOpenEditDialog(params.data as OrderProps)}
          />
        </div>
      ),
      width: 120,
      filter: false,
      sortable: false,
      pinned: "right",
    };
  }, []);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstancse = useAxios();
  const [openDialog, setOpenDialog] = useState({
    editDialog: false,
    viewDialog: false,
  });
  const [pickOrder, setPickOrder] = useState<OrderProps | null>(null);
  const handleOpenViewDialog = useCallback((order: OrderProps) => {
    setOpenDialog((prev) => ({
      ...prev,
      viewDialog: true,
    }));
    setPickOrder(order);
  }, []);
  const handleOpenEditDialog = useCallback((order: OrderProps) => {
    setOpenDialog((prev) => ({
      ...prev,
      editDialog: true,
    }));
    setPickOrder(order);
  }, []);
  const handleUpdateOrder = useCallback(
    (updateOrder: OrderProps, gridApi: GridApi | null) => {
      gridApi?.applyTransaction({
        update: [updateOrder],
      });
    },
    [gridApiRef]
  );
  useEffect(() => {
    async function getAllOrders() {
      try {
        showBackdrop();
        const response = await axiosInstancse.get("/order/getAllOrders");
        if (response.data.code == 1000) {
          setRowData(response.data.result);
        }
      } catch (error) {
        console.error("Error getting all orders", error);
      } finally {
        hideBackdrop();
      }
    }
    getAllOrders();
  }, []);

  return (
    <>
      <DialogOrderViewAndEdit
        openDialog={openDialog}
        pickOrder={pickOrder}
        setOpenDialog={setOpenDialog}
        setPickOrder={setPickOrder}
        handleUpdateOrder={handleUpdateOrder}
        gridApiRef={gridApiRef}
      />
      <AgGridTable
        actionColumnParam={actionColumnOrder}
        colDefs={colDefs}
        rowData={rowData}
        getRowId={getRowId}
        gridApiRef={gridApiRef}
      />

    </>
  );
}
