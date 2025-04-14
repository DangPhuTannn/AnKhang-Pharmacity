/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AttributeProps } from "../../../Config/interface";
import { storeFieldsAttribute } from "../../../Config/glovalVariables";
import { ColDef, GetRowIdFunc, GridApi } from "ag-grid-enterprise";
import useAxios from "../../../Config/axiosInstance";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";
import { Edit, ScanEye, Trash2 } from "lucide-react";
import AgGridTable from "../AgGirdTable";
import DialogAttributeDetails from "./DialogAttributeDetails";
import AddActionHeader from "../AddActionHeader";
import { toast } from "react-toastify";
import { showConfirmDialog } from "../../../Config/functionTSX";
export default function AttributeManagement() {
  const [rowData, setRowData] = useState<AttributeProps[]>([]);
  const [colDefs] = useState<ColDef<AttributeProps>[]>(storeFieldsAttribute);
  const getRowId = useMemo<GetRowIdFunc<AttributeProps>>(() => {
    return (params) => params.data.attributeId.toString();
  }, []);
  const gridApiRef = useRef<GridApi | null>(null);
  const actionColumnAttribute: ColDef<any> = useMemo(() => {
    return {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <div className="flex items-center justify-center gap-2 h-full">
          <ScanEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            size={24}
            onClick={() => handleView(params.data as AttributeProps)}
          />
          <Edit
            className="cursor-pointer text-yellow-500 hover:text-yellow-700"
            size={24}
            onClick={() => handleEdit(params.data as AttributeProps)}
          />
          <Trash2
            className="cursor-pointer text-red-500 hover:text-red-700"
            size={24}
            onClick={() =>
              showConfirmDialog({
                message: <div>Are you sure you want to delete? </div>,
                accept: () => {
                  handleDeleteAttribute(params.data);
                },
              })
            }
          />
        </div>
      ),
      width: 150,
      filter: false,
      sortable: false,
      pinned: "right",
      headerComponent: () => <AddActionHeader setOpenDialog={setOpenDialog} />,
    };
  }, []);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstancse = useAxios();
  const [openDialog, setOpenDialog] = useState({
    viewDialog: false,
    editAndAddDialog: false,
  });
  const [pickAttribute, setPickAttribute] = useState<AttributeProps | null>(
    null
  );

  const handleView = useCallback((attribute: AttributeProps) => {
    setPickAttribute(attribute);
    setOpenDialog((prev) => ({ ...prev, viewDialog: true }));
  }, []);
  const handleEdit = useCallback((attribute: AttributeProps) => {
    setPickAttribute(attribute);
    setOpenDialog((prev) => ({ ...prev, editAndAddDialog: true }));
  }, []);

  const handleUpdateAttribute = useCallback(
    (updateAttribute: AttributeProps, gridApi: GridApi | null) => {
      gridApi?.applyTransaction({
        update: [updateAttribute],
      });
    },
    []
  );
  const handleAddAttribute = useCallback(
    (addAttribute: AttributeProps, gridApi: GridApi | null) => {
      gridApi?.applyTransaction({
        add: [addAttribute],
      });
    },
    []
  );

  const handleDeleteAttribute = useCallback(
    async (attribute: AttributeProps) => {
      try {
        showBackdrop();
        const response = await axiosInstancse.delete(
          `/attribute/deleteAttribute/${attribute.attributeId}`
        );
        if (response.data.code == 1000) {
          toast.success(response.data.result);
          gridApiRef.current?.applyTransaction({
            remove: [attribute],
          });
        }
      } catch (error) {
        console.error("Error deleting attribute", error);
      } finally {
        hideBackdrop();
      }
    },
    [gridApiRef]
  );
  useEffect(() => {
    async function getAllAttributes() {
      try {
        showBackdrop();
        const response = await axiosInstancse.get(
          "/attribute/getAllAttributes"
        );
        if (response.data.code == 1000) {
          setRowData(response.data.result);
        }
      } catch (error) {
        console.error("Error getting all attributes", error);
      } finally {
        hideBackdrop();
      }
    }
    getAllAttributes();
  }, []);

  return (
    <>
      <DialogAttributeDetails
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        pickAttribute={pickAttribute}
        setPickAttribute={setPickAttribute}
        handleUpdateAttribute={handleUpdateAttribute}
        gridApiRef={gridApiRef}
        handleAddAttribute={handleAddAttribute}
      />
      <AgGridTable
        actionColumnParam={actionColumnAttribute}
        colDefs={colDefs}
        getRowId={getRowId}
        gridApiRef={gridApiRef}
        rowData={rowData}
      />
    </>
  );
}
