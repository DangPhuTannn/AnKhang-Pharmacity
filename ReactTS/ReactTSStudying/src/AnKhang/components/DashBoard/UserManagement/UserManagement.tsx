/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { UserProps } from "../../../Config/interface";
import { ColDef, GetRowIdFunc, GridApi, GridOptions } from "ag-grid-community";
import { storeFieldsUser } from "../../../Config/glovalVariables";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";
import { Edit, ScanEye, Trash2, RefreshCcw } from "lucide-react";
import useAxios from "../../../Config/axiosInstance";
import AgGridTable from "../AgGirdTable";
import DialogUserView from "./DialogUserView";
import DialogUserEditAndAdd from "./DialogUserEditAndAdd";
import { showConfirmDialog } from "../../../Config/functionTSX";
import { toast } from "react-toastify";

interface UserProviderProps {
  gridApiRef: MutableRefObject<GridApi<any> | null>;
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
  selectedUser: UserProps | null;
  setSelectedUser: Dispatch<SetStateAction<UserProps | null>>;
  handleUpdateUser: (
    updateUser: UserProps,
    gridApi: GridApi | null | undefined
  ) => void;
}

const UserProvider = createContext<UserProviderProps | undefined>(undefined);
export default function UserManagement() {
  const [rowData, setRowData] = useState<UserProps[]>([]);
  const [colDefs] = useState<ColDef<UserProps>[]>(storeFieldsUser);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const getRowId = useMemo<GetRowIdFunc<UserProps>>(() => {
    return (params) => params.data.email.toString();
  }, []);

  const gridApiRef = useRef<GridApi | null>(null);
  const [openDialog, setOpenDialog] = useState({
    viewDialog: false,
    editAndAddDialog: false,
  });
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const handleOpenViewDialog = useCallback((user: UserProps) => {
    setSelectedUser(user);
    setOpenDialog((prev) => ({ ...prev, viewDialog: true }));
  }, []);
  const handleOpenEditOrAddDialog = useCallback((user: UserProps) => {
    setSelectedUser(user);
    setOpenDialog((prev) => ({ ...prev, editAndAddDialog: true }));
  }, []);
  const handleUpdateUser = useCallback(
    (updateUser: UserProps, gridApi: GridApi | null | undefined) => {
      gridApi?.applyTransaction({
        update: [updateUser],
      });
    },
    []
  );

  const handleDeleteUser = useCallback(
    async (deleteUser: UserProps) => {
      try {
        showBackdrop();
        const response = await axiosInstance.delete(
          `/user/delete/${deleteUser.email}`
        );
        if (response.data.code == 1000) {
          toast.success("Delete Successfully");
          gridApiRef.current?.applyTransaction({
            update: [response.data.result],
          });
        }
      } catch (error) {
        console.error("Error deleting user", error);
      } finally {
        hideBackdrop();
      }
    },
    [gridApiRef]
  );

  const handleRestoreUser = useCallback(
    async (restoreUser: UserProps) => {
      try {
        showBackdrop();
        const response = await axiosInstance.put(
          `/user/restore/${restoreUser.email}`
        );
        if (response.data.code == 1000) {
          toast.success("Restore successfully");
          gridApiRef.current?.applyTransaction({
            update: [response.data.result],
          });
        }
      } catch (error) {
        console.error("Error restoring user", error);
      } finally {
        hideBackdrop();
      }
    },
    [gridApiRef]
  );
  const actionColumnUser: ColDef<any> = useMemo(() => {
    return {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <div className={`flex items-center justify-center gap-2 h-full`}>
          <ScanEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            size={24}
            onClick={() => handleOpenViewDialog(params.data as UserProps)}
          />
          <Edit
            className="cursor-pointer text-yellow-500 hover:text-yellow-700"
            size={24}
            onClick={() => handleOpenEditOrAddDialog(params.data as UserProps)}
          />
          {params.data.deleted ? (
            <RefreshCcw
              className="cursor-pointer text-green-500 hover:text-green-700"
              size={24}
              onClick={() =>
                showConfirmDialog({
                  message: <div>Are you sure you want to restore?</div>,
                  accept: () => {
                    handleRestoreUser(params.data as UserProps);
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
                    handleDeleteUser(params.data as UserProps);
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
        const response = await axiosInstance.get("/clients");
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
    <UserProvider.Provider
      value={{
        gridApiRef,
        handleUpdateUser,
        openDialog,
        selectedUser,
        setOpenDialog,
        setSelectedUser,
      }}
    >
      <DialogUserEditAndAdd />
      <DialogUserView />
      <AgGridTable
        actionColumnParam={actionColumnUser}
        colDefs={colDefs}
        rowData={rowData}
        gridApiRef={gridApiRef}
        getRowId={getRowId}
        gridOptions={gridOptions}
      />
    </UserProvider.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserProvider);
  if (!context) {
    throw new Error("Error using User Management Context");
  }
  return context;
}
