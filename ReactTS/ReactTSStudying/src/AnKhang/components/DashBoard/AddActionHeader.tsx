import { SquarePlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function AddActionHeader({
  setOpenDialog,
}: {
  setOpenDialog: Dispatch<
    SetStateAction<{
      viewDialog: boolean;
      editAndAddDialog: boolean;
    }>
  >;
}) {
  return (
    <div className="flex justify-between w-full items-center">
      <div>Action</div>
      <SquarePlus
        className="cursor-pointer text-[#6A0DAD] hover:text-gray-200 transition-all"
        size={30}
        onClick={() => setOpenDialog((prev) => ({ ...prev, editAndAddDialog: true }))}
      />
    </div>
  );
}
