import { Box, Dialog, DialogContent } from "@mui/material";
import FormChangeUserInfor from "../../Home/Outlet/UserInformation/Outlet/UserOption/FormChangeUserInfor";
import { useCallback } from "react";
import { showConfirmDialog } from "../../../Config/functionTSX";
import { useUserManagement } from "./UserManagement";

export default function DialogUserEditAndAdd() {
  const {
    setOpenDialog,
    setSelectedUser,
    selectedUser,
    openDialog,
    handleUpdateUser,
    gridApiRef,
  } = useUserManagement();
  const handleClose = useCallback(() => {
    showConfirmDialog({
      message: (
        <div style={{ whiteSpace: "pre-line" }}>
          {`Make you sure ${selectedUser ? "update" : "add"} before turn off?`}
        </div>
      ),
      accept: () => {
        setOpenDialog((prev) => ({ ...prev, editAndAddDialog: false }));
        setSelectedUser(null);
      },
    });
  }, [selectedUser]);

  return (
    <Dialog
      open={openDialog.editAndAddDialog}
      onClose={() => handleClose()}
      fullWidth
      maxWidth="sm"

    >
      <Box sx={{ background: "#f9f9f9", borderRadius: "8px" }}>
        <Box
          sx={{
            background: "#ffffff",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            color: "#333",
            textAlign: "center",
          }}
        >
          <DialogContent>
            <FormChangeUserInfor
              isAdminAction={true}
              user={selectedUser}
              handleClose={handleClose}
              handleUpdateUser={handleUpdateUser}
              gridApiRef={gridApiRef}
            />
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
}
