/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { AttributeProps } from "../../../Config/interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { mappingToAttribute } from "../../../Config/function";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";
import useAxios from "../../../Config/axiosInstance";
import { showConfirmDialog } from "../../../Config/functionTSX";
import { GridApi } from "ag-grid-enterprise";
import { toast } from "react-toastify";

const ATTRIBUTE_TYPE: string[] = [
  "CATEGORY",
  "FLAVOR_OR_SCENT",
  "SKIN_TYPE",
  "INDICATION",
  "TARGET_PATIENCE",
];

export default function DialogAttributeDetails({
  openDialog,
  setOpenDialog,
  pickAttribute,
  setPickAttribute,
  handleUpdateAttribute,
  gridApiRef,
  handleAddAttribute,
}: {
  openDialog: {
    viewDialog: boolean;
    editAndAddDialog: boolean;
  };
  setOpenDialog: Dispatch<
    SetStateAction<{
      viewDialog: boolean;
      editAndAddDialog: boolean;
    }>
  >;
  pickAttribute: AttributeProps | null;
  setPickAttribute: Dispatch<SetStateAction<AttributeProps | null>>;
  handleUpdateAttribute: (
    updateAttribute: AttributeProps,
    gridApi: GridApi | null
  ) => void;
  gridApiRef: MutableRefObject<GridApi<any> | null>;
  handleAddAttribute: (
    addAttribute: AttributeProps,
    gridApi: GridApi | null
  ) => void;
}) {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AttributeProps>({
    defaultValues: { ...pickAttribute },
  });
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstance = useAxios();
  useEffect(() => {
    reset(mappingToAttribute(pickAttribute));
  }, [pickAttribute]);

  const onSubmit: SubmitHandler<AttributeProps> = async (data, event) => {
    const submitEvent = event?.nativeEvent as SubmitEvent;
    const buttonName = submitEvent.submitter?.name;
    if (buttonName == "update") {
      try {
        showBackdrop();
        const response = await axiosInstance.put(
          "/attribute/updateAttribute",
          mappingToAttribute(data)
        );
        if (response.data.code == 1000) {
          toast.success("Update successfully");
          handleUpdateAttribute(response.data.result, gridApiRef.current);
          setOpenDialog({
            viewDialog: false,
            editAndAddDialog: false,
          });
        }
      } catch (error) {
        console.error("Error updating attribute", error);
      } finally {
        hideBackdrop();
      }
    } else if (buttonName == "add") {
      try {
        showBackdrop();
        const response = await axiosInstance.post(
          "/attribute/addAttribute",
          mappingToAttribute(data)
        );
        if (response.data.code == 1000) {
          toast.success("Add successfully");
          handleAddAttribute(response.data.result, gridApiRef.current);
          setOpenDialog({
            viewDialog: false,
            editAndAddDialog: false,
          });
        }
      } catch (error) {
        console.error("Error updating attribute", error);
      } finally {
        hideBackdrop();
      }
    }
  };

  const confirmSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    return showConfirmDialog({
      message: (
        <div style={{ whiteSpace: "pre-line" }}>
          {`Are you sure you want to ${pickAttribute ? "update" : "add"}?`}
        </div>
      ),
      accept: () => handleSubmit((data) => onSubmit(data, event))(),
    });
  };

  const handleClose = useCallback(() => {
    if (openDialog.editAndAddDialog) {
      return showConfirmDialog({
        message: (
          <div style={{ whiteSpace: "pre-line" }}>
            {`Make sure you save the changes before closing !!`}
          </div>
        ),
        accept: () => {
          setOpenDialog({
            viewDialog: false,
            editAndAddDialog: false,
          });
          setPickAttribute(null);
        },
      });
    }

    setOpenDialog({
      viewDialog: false,
      editAndAddDialog: false,
    });
    setPickAttribute(null);
  }, [openDialog]);

  return (
    <Dialog
      open={openDialog.editAndAddDialog || openDialog.viewDialog}
      onClose={() => handleClose()}
      fullWidth
      maxWidth="sm"
    >
      <Box sx={{ background: "#f9f9f9", borderRadius: "8px", padding: "24px" }}>
        <Box
          sx={{
            background: "#ffffff",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            color: "#333",
            textAlign: "center",
          }}
        >
          <DialogTitle>
            <Typography
              fontWeight="bold"
              sx={{ color: "#4cb551", fontSize: "24px" }}
            >
              Attribute Details
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form noValidate onSubmit={confirmSubmit}>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex justify-between gap-2">
                  {pickAttribute && (
                    <TextField
                      label="ID"
                      value={pickAttribute?.attributeId}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      {...register("attributeId")}
                      className={`inputFieldForDashBoard`}
                    />
                  )}
                  <Controller
                    name="attributeType"
                    control={control}
                    key={pickAttribute?.attributeType}
                    rules={{ required: "Attribute is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Attribute Type"
                        select
                        fullWidth
                        InputProps={{
                          readOnly: openDialog.viewDialog,
                        }}
                        variant="outlined"
                        className="inputFieldForDashBoard"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      >
                        {ATTRIBUTE_TYPE.map((eachType) => (
                          <MenuItem key={eachType} value={eachType}>
                            {eachType}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>
                </div>

                <TextField
                  label="Name"
                  defaultValue={pickAttribute?.name}
                  fullWidth
                  InputProps={{
                    readOnly: openDialog.viewDialog,
                  }}
                  variant="outlined"
                  className="inputFieldForDashBoard"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />

                <TextField
                  label="Description"
                  defaultValue={pickAttribute?.description}
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  className="inputFieldForDashBoard"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  InputProps={{
                    readOnly: openDialog.viewDialog,
                  }}
                  error={!!errors.description}
                  helperText={errors.description && errors.description.message}
                />
              </div>
              <Box
                textAlign="right"
                marginTop={2}
                className="flex gap-2 justify-end"
              >
                <Button
                  onClick={() => handleClose()}
                  sx={{
                    background: "#1565C0",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    "&:hover": {
                      background: "#0D47A1",
                    },
                  }}
                >
                  Close
                </Button>

                {openDialog.editAndAddDialog && (
                  <Button
                    sx={{
                      fontWeight: "bold",
                      borderRadius: "6px",
                      padding: "8px 16px",
                    }}
                    disabled={isSubmitting}
                    type="submit"
                    color="success"
                    variant="contained"
                    name={pickAttribute ? "update" : "add"}
                  >
                    {pickAttribute ? "Update" : "Add"}
                  </Button>
                )}
              </Box>
            </form>
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
}
