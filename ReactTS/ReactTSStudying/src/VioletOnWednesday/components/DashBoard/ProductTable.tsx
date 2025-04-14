import { Dialog } from "@mui/material";
import { useFlower } from "./ProductContext";
import FormFillFlower from "./FormFillFlower";
import DataTable from "./DataTable";

export default function ProductTable() {
  const {
    handleDelete,
    openConfirm,
    openFillFormFlower,
    setOpenConfirm,
    setOpenFillFormFlower,
    pickedFlower,
    flowers,
    setPickedFlower,
    handleEdit,
  } = useFlower();
  return (
    <>
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="text-center p-[16px]">
          <div className="text-[25px] font-bold">Are you sure?</div>
          <div className="flex gap-[10px] justify-center mt-[10px]">
            <div
              onClick={() => handleDelete(pickedFlower?.id)}
              className="border py-[5px] px-[10px] cursor-pointer"
            >
              Yes
            </div>
            <div
              onClick={() => setOpenConfirm(false)}
              className="border py-[5px] px-[10px] cursor-pointer"
            >
              No
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openFillFormFlower}
        onClose={() => {
          setOpenFillFormFlower(false);
          setPickedFlower(null);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <FormFillFlower
          pickedFlower={pickedFlower}
          setPickedFlower={setPickedFlower}
        />
      </Dialog>

      <DataTable
        handleEdit={handleEdit}
        rows={flowers}
        setOpenConfirm={setOpenConfirm}
        setPickedObject={setPickedFlower}
      />
    </>
  );
}
