import { Dialog } from "@mui/material";
import FormFillCategory from "./FormFillCategory";
import { useCategory } from "./CategoryContext";
import DataTable from "./DataTable";

export default function CategoryTable() {
  const {
    categories,
    handleDelete,
    openConfirm,
    setOpenConfirm,
    openFillFormCategory,
    setOpenFillFormCategory,
    handleEdit,
    pickedCategory,
    setPickedCategory,
  } = useCategory();

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
              onClick={() => handleDelete(pickedCategory?.id)}
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
        open={openFillFormCategory}
        onClose={() => {
          setOpenFillFormCategory(false);
          setPickedCategory(null);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <FormFillCategory
          category={pickedCategory}
          setPickedCategory={setPickedCategory}
        />
      </Dialog>
      <DataTable
        handleEdit={handleEdit}
        rows={categories}
        setOpenConfirm={setOpenConfirm}
        setPickedObject={setPickedCategory}
      />
    </>
  );
}
