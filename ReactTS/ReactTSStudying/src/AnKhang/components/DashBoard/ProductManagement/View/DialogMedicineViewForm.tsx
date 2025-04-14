import { Dialog, DialogContent } from "@mui/material";
import { useCallback, useState } from "react";
import ListAttributes from "../ListAttributes";
import { useProduct } from "../ProductManagement";
import MedicineViewDetails from "./MedicineViewDetails";


export default function DialogMedicineViewForm() {
  const [pickedTab, setPickedTab] = useState<"Details" | "List Categories">(
    "Details"
  );
  const { selectedMedicine, openDialog, setOpenDialog, setSelectedMedicine } =
    useProduct();

  const handleClose = useCallback(() => {
    setOpenDialog((prev) => ({ ...prev, viewDialog: false }));
    setSelectedMedicine(null);
    setPickedTab("Details");
  }, []);
  return (
    <Dialog
      open={openDialog.viewDialog}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: "auto",
          overflow: "hidden",
          borderRadius: "12px",
        },
      }}
    >
      <DialogContent
        sx={{ padding: 0, overflowY: "auto" }}
        className="dialogScrollBar"
      >
        <div className="h-full bg-white">
          <div className="flex text-center text-[#657384] border-b-[1px] border-[#e5e7eb]">
            {["Details", "List Categories"].map((tab, index) => (
              <div
                className={`w-[50%] py-[15px] ${
                  pickedTab == tab && "bg-[#4cb551] text-white font-bold"
                }`}
                key={index}
              >
                {tab}
              </div>
            ))}
          </div>
          {pickedTab == "Details" ? (
            <MedicineViewDetails
              medicine={selectedMedicine}
              setPickedTab={setPickedTab}
            />
          ) : (
            <ListAttributes isEditOrAdd={false} setPickedTab={setPickedTab} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
