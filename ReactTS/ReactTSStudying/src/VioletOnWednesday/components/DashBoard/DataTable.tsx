/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SetStateAction } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function DataTable({
  rows,
  handleEdit,
  setPickedObject,
  setOpenConfirm,
}: {
  rows: any[];
  handleEdit: (object: any) => void;
  setPickedObject: (value: SetStateAction<any | null>) => void;
  setOpenConfirm: (value: SetStateAction<boolean>) => void;
}) {
  const paginationModel = { page: 0, pageSize: 8 };
  const columns: GridColDef[] = Object.keys(rows[0]).map((eachKey) => ({
    field: eachKey,
    headerName: eachKey.toUpperCase(),
    headerAlign: "center",
    flex: 1,
  }));

  return (
    <Paper className="dataTable">
      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
              <div>
                <IconButton
                  onClick={() => handleEdit(params.row)}
                  aria-label="edit"
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenConfirm(true);
                    setPickedObject(params.row);
                  }}
                  aria-label="delete"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ),
          },
        ]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
          borderTop: 1,
          borderTopColor: "#E0E0E0",
          borderRadius: 0,
          "& .MuiDataGrid-row.Mui-selected": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          textAlign: "center",
        }}
      />
    </Paper>
  );
}
