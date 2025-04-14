import { Box, Dialog, DialogContent } from "@mui/material";
import { useCallback } from "react";
import FormProfile from "../../Home/Outlet/UserInformation/Outlet/UserOption/FormProfile";
import { useUserManagement } from "./UserManagement";

export default function DialogUserView() {
  const { setOpenDialog, setSelectedUser, openDialog, selectedUser } =
    useUserManagement();
  const handleClose = useCallback(() => {
    setOpenDialog((prev) => ({ ...prev, viewDialog: false }));
    setSelectedUser(null);
  }, []);
  const handleShowChange = useCallback(() => {
    setOpenDialog({ viewDialog: false, editAndAddDialog: true });
  }, []);
  return (
    <Dialog
      open={openDialog.viewDialog}
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
            <FormProfile
              user={selectedUser}
              handleShowChange={handleShowChange}
            />
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
}
