import React, { useCallback, useEffect, useState } from "react";
import { MedicineProps } from "../../../../Config/interface";
import { Dialog, DialogContent } from "@mui/material";
import ListAttributes from "../ListAttributes";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useProduct } from "../ProductManagement";

import { showConfirmDialog } from "../../../../Config/functionTSX";
import axios from "axios";
import { toast } from "react-toastify";
import useAxios from "../../../../Config/axiosInstance";
import { mappingToMedicine } from "../../../../Config/function";
import { useBackdrop } from "../../../../GlobalUtils/BackdropGlobal";
import MedicineEditOrAddDetails from "./MedicineEditOrAddDetails";
export default function DialogMedicineEditOrAddForm() {
  const {
    selectedMedicine,
    openDialog,
    setOpenDialog,
    setSelectedMedicine,
    handleUpdateMedicineInTable,
    gridApiRef,
    handleAddMedicineInTable,
  } = useProduct();
  const axiosInstance = useAxios();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [pickedTab, setPickedTab] = useState<"Details" | "List Categories">(
    "Details"
  );
  const methods = useForm<MedicineProps>({
    defaultValues: { ...selectedMedicine },
  });
  useEffect(() => {
    methods.reset(mappingToMedicine(selectedMedicine || null));
  }, [selectedMedicine, methods]);

  const handleClose = useCallback(() => {
    return showConfirmDialog({
      message: (
        <div style={{ whiteSpace: "pre-line" }}>
          {`Make sure you ${
            selectedMedicine ? "update" : "add"
          } before turn off !!`}
        </div>
      ),
      accept: () => {
        setOpenDialog((prev) => ({ ...prev, editAndAddDialog: false }));
        setSelectedMedicine(null);
        setPickedTab("Details");
      },
    });
  }, [selectedMedicine]);

  const confirmSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = await methods.trigger();

    if (!isValid) {
      return showConfirmDialog({
        message: (
          <div style={{ whiteSpace: "pre-line" }}>
            Please fill/correct all the required fields !!
          </div>
        ),
        reject: () => {
          setOpenDialog((prev) => ({ ...prev, editAndAddDialog: false }));
        },
      });
    }

    const submitEvent = event?.nativeEvent as SubmitEvent;

    const buttonName = submitEvent.submitter?.name;
    if (!buttonName) {
      console.error("No button detected.");
      return;
    }

    const values = methods.getValues();

    if (buttonName == "nextPage") {
      if (!values.description.trim()) {
        methods.setError("description", {
          type: "manual",
          message: "Description is required.",
        });
        return toast.error("Description are required");
      }

      if (!values.ingredients.trim()) {
        methods.setError("ingredients", {
          type: "manual",
          message: "Ingredients are required.",
        });
        return toast.error("Ingredients are required");
      }
      if (!values.imageURL.trim()) {
        return toast.error("Image is required");
      }

      return showConfirmDialog({
        message: (
          <div style={{ whiteSpace: "pre-line" }}>
            Make sure that you check all the values <br /> before going to the
            List Categories page!!
          </div>
        ),
        accept: () => setPickedTab("List Categories"),
      });
    }

    if (buttonName == "prevPage") {
      return showConfirmDialog({
        message: (
          <div style={{ whiteSpace: "pre-line" }}>
            {` Click ${
              selectedMedicine ? "update" : "add"
            } before going to the details page or all the
            changes won't be saved!!`}
          </div>
        ),
        accept: () => setPickedTab("Details"),
      });
    }

    if (buttonName == "update" || buttonName == "add") {
      const getAllValues = methods.getValues();

      const hasEmptyArray = [
        "categories",
        "targetPatiences",
        "flavorOrScents",
        "indications",
        "skinTypes",
      ].some((eachProp) => {
        const value = getAllValues[eachProp as keyof MedicineProps];
        return Array.isArray(value) && value.length === 0;
      });

      if (hasEmptyArray) {
        return showConfirmDialog({
          message: (
            <div style={{ whiteSpace: "pre-line" }}>
              {`Please fill all the list attributes before adding !!`}
            </div>
          ),
          reject: () =>
            setOpenDialog((prev) => ({ ...prev, editAndAddDialog: false })),
        });
      }

      return showConfirmDialog({
        message: (
          <div style={{ whiteSpace: "pre-line" }}>
            {`Are you sure you want to ${selectedMedicine ? "update" : "add"}?`}
          </div>
        ),
        accept: () => methods.handleSubmit((data) => onSubmit(data, event))(),
      });
    }
  };

  const onSubmit: SubmitHandler<MedicineProps> = async (data, event) => {
    const submitEvent = event?.nativeEvent as SubmitEvent;

    const buttonName = submitEvent.submitter?.name;
    if (buttonName == "update") {
      try {
        showBackdrop();
        const response = await axiosInstance.put(
          `/medicines/update/${data.medicineId}`,
          mappingToMedicine(data)
        );
        if (response.data.code == 1000) {
          toast.success("Update medicine successfully");
          setOpenDialog((prev) => ({ ...prev, editAndAddDialog: false }));
          handleUpdateMedicineInTable(response.data.result, gridApiRef.current);
          setPickedTab("Details");
        }
      } catch (error) {
        console.error("Error updating medicine", error);
      } finally {
        hideBackdrop();
      }
      return;
    }

    if (buttonName == "add") {
      try {
        showBackdrop();
        const response = await axiosInstance.post(
          "/medicines/createMedicine",
          mappingToMedicine(data)
        );
        if (response.data.code == 1000) {
          toast.success("Add medicine successfully");
          setOpenDialog((prev) => ({ ...prev, editAndAddDialog: false }));
          handleAddMedicineInTable(response.data.result, gridApiRef.current);
          setPickedTab("Details");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.code == 1002) {
          showConfirmDialog({
            message: (
              <div style={{ whiteSpace: "pre-line" }}>
                Medicine's name already exist !!
                <br />
                Try to use other names or update instead of adding
              </div>
            ),
            reject: () =>
              setOpenDialog((prev) => ({ ...prev, editAndAddDialog: false })),
          });
        } else {
          console.error("Error adding medicine", error);
        }
      } finally {
        hideBackdrop();
      }
    }
  };

  return (
    <Dialog
      open={openDialog.editAndAddDialog}
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
        <FormProvider {...methods}>
          <form noValidate onSubmit={confirmSubmit}>
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
                <MedicineEditOrAddDetails />
              ) : (
                <ListAttributes
                  isEditOrAdd={true}
                  setPickedTab={setPickedTab}
                />
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
