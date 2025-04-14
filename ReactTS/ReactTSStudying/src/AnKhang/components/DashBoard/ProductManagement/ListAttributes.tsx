import { ListAttributeProps } from "../../../Config/interface";
import { FilePenLine, ListPlus } from "lucide-react";
import DialogCategoryEdit from "./EditOrAdd/DialogCategoryEdit";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useProduct } from "./ProductManagement";
import { Tooltip } from "react-tooltip";
export default function ListAttributes({
  isEditOrAdd,
  setPickedTab,
}: {
  isEditOrAdd: boolean;
  setPickedTab: Dispatch<SetStateAction<"Details" | "List Categories">>;
}) {
  const { selectedMedicine } = useProduct();
  const [listAttributes, setListAttributes] = useState<ListAttributeProps[]>([
    {
      title: "Target Patiences",
      value: selectedMedicine?.targetPatiences || [],
    },
    {
      title: "Indications",
      value: selectedMedicine?.indications || [],
    },
    {
      title: "Categories",
      value: selectedMedicine?.categories || [],
    },
    {
      title: "Flavors / Scents",
      value: selectedMedicine?.flavorOrScents || [],
    },
    {
      title: "Skin Types",
      value: selectedMedicine?.skinTypes || [],
    },
  ]);
  const [openUpdateAttributeDialog, setUpdateAttributeDialog] = useState(false);
  const [selectedListAttributes, setSelectedListAttributes] =
    useState<ListAttributeProps | null>(null);
  useEffect(() => {
    if (selectedListAttributes) {
      const getCurrentSeletedListAttribute = listAttributes.find(
        (eachListAttribute) =>
          eachListAttribute.title == selectedListAttributes.title
      );
      setSelectedListAttributes(getCurrentSeletedListAttribute || null);
    }
  }, [listAttributes]);
  return (
    <div className="flex flex-col py-6 px-6">
      <div className="grid grid-cols-5 gap-6 ">
        <Tooltip id="attribute-tooltip-description" />
        {listAttributes.map((eachList, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
          >
            <div
              className={`flex justify-${
                isEditOrAdd ? "between" : "center"
              }  gap-1 text-[#4cb551] border-b`}
            >
              <h3 className="text-lg font-bold  pb-2">{eachList.title}</h3>
              {isEditOrAdd && (
                <FilePenLine
                  className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                  onClick={() => {
                    setSelectedListAttributes(eachList);
                    setUpdateAttributeDialog(true);
                  }}
                />
              )}
            </div>

            <div className="flex flex-col gap-2 mt-2 max-h-[380px] h-[380px] storeEachListAttribute overflow-y-auto pr-2 -mr-2">
              {eachList?.value?.map((eachAttribute, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-200"
                  data-tooltip-id="attribute-tooltip-description"
                  data-tooltip-content={eachAttribute.description}
                >
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-800 font-medium">
                    {eachAttribute.name}
                  </span>
                </div>
              ))}
              {isEditOrAdd && eachList.value.length == 0 && (
                <div className="text-[#4cb551] flex flex-col h-full justify-center items-center">
                  <ListPlus
                    className="cursor-pointer"
                    size={70}
                    onClick={() => {
                      setSelectedListAttributes(eachList);
                      setUpdateAttributeDialog(true);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {openUpdateAttributeDialog && selectedListAttributes && (
          <DialogCategoryEdit
            open={openUpdateAttributeDialog}
            setOpen={setUpdateAttributeDialog}
            listAttribute={selectedListAttributes}
            setListAttributes={setListAttributes}
          />
        )}
      </div>
      <Box className="flex justify-end gap-4 mt-4">
        {isEditOrAdd ? (
          <>
            <Button
              variant="contained"
              type="submit"
              color="success"
              name={selectedMedicine ? "update" : "add"}
            >
              {selectedMedicine ? "Update" : "Add"}
            </Button>
            <Button variant="contained" type="submit" name="prevPage">
              <ArrowBackIosIcon className="scale-70" />
              Back
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className="flex justify-between items-center gap-1"
            onClick={() => setPickedTab("Details")}
          >
            <ArrowBackIosIcon className="scale-70" />
            Back
          </Button>
        )}
      </Box>
    </div>
  );
}
