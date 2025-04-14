import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { MedicineProps } from "../../../../Config/interface";
import { listAttributesForView } from "../../../../Config/glovalVariables";
export default function MedicineViewDetails({
  medicine,
  setPickedTab,
}: {
  medicine: MedicineProps | null;
  setPickedTab: Dispatch<SetStateAction<"Details" | "List Categories">>;
}) {
  const fomartId = useMemo(() => {
    let tempId = String(medicine?.medicineId);
    while (tempId.length < 8) {
      tempId = "0" + tempId;
    }
    return tempId;
  }, [medicine]);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients">(
    "description"
  );
  return (
    <>
      <div className="flex gap-[2rem] py-6 px-6">
        <div className="flex flex-col gap-[10px] w-[30%] flex-shrink-0">
          <div className="flex justify-between">
            <div className="text-gray-500 text-sm mt-1">
              <span className="font-semibold text-[#4cb551]">Medicine ID:</span>{" "}
              {fomartId}
            </div>
          </div>

          <div className="w-full h-[300px]">
            <img
              src={`/AnKhang/Medicines/${medicine?.imageURL}`}
              className="object-contain w-full h-full"
            ></img>
          </div>
        </div>
        <div className="border-l-[1px] border-[#e5e7eb]"></div>
        <div className="w-[70%] flex flex-col gap-1">
          <div className="text-2xl font-semibold mb-[20px] text-[#4cb551]">
            {medicine?.medicineName}
          </div>
          {listAttributesForView.map((attributeGroup, index) => (
            <div
              key={index}
              className={`flex justify-between p-3 ${
                index % 2 === 0 ? "bg-[#f9f9f9] rounded-md" : "bg-white"
              }`}
            >
              {attributeGroup.map((attr, idx) => (
                <div key={idx} className="w-1/2 flex gap-2 items-center">
                  <span className="font-semibold">{attr.title}:</span>
                  <span className="text-[#444]">
                    {attr.title === "Price"
                      ? `${(
                          medicine?.[
                            attr.value as keyof MedicineProps
                          ] as number
                        )?.toLocaleString("vi-VN")}đ`
                      : attr.title === "Final Price" &&
                        medicine?.price !== undefined &&
                        medicine?.discount !== undefined
                      ? `${(
                          (medicine.price * (100 - medicine.discount)) /
                          100
                        ).toLocaleString("vi-VN")}đ`
                      : (medicine?.[
                          attr.value as keyof MedicineProps
                        ] as number)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 px-10 pb-[30px]">
        <div className="flex gap-4">
          {["description", "ingredients"].map((tab) => (
            <div
              key={tab}
              className={`py-2 px-4 rounded-lg transition-all duration-300 shadow-sm cursor-pointer ${
                activeTab === tab
                  ? "bg-[#e8f5e9] text-[#4cb551] font-bold scale-105"
                  : "text-gray-600 hover:text-[#4cb551] hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab as "description" | "ingredients")}
            >
              {tab === "description" ? "Description" : "Ingredients"}
            </div>
          ))}
        </div>

        <div className="mt-4 text-[#444] shadow-sm rounded-lg p-4 bg-white">
          {activeTab === "description"
            ? medicine?.description
            : medicine?.ingredients}
        </div>
        <Box className="flex justify-end gap-4 mt-4">
          <Button
            variant="contained"
            className="flex justify-between items-center gap-1"
            onClick={() => setPickedTab("List Categories")}
          >
            Next Page
            <ArrowForwardIosIcon className="scale-70" />
          </Button>
        </Box>
      </div>
    </>
  );
}
