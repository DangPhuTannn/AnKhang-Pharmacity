/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Country, MedicineProps } from "../../../../Config/interface";
import { listAttributesForEdit } from "../../../../Config/glovalVariables";
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Controller, useFormContext } from "react-hook-form";
import { useProduct } from "../ProductManagement";
import { getAllCountriesFunction } from "../../../../Config/function";

export default function MedicineEditOrAddDetails() {
  const [activeTab, setActiveTab] = useState<"description" | "ingredients">(
    "description"
  );
  const { selectedMedicine } = useProduct();
  const [storeSelectOption, setStoreSelectOption] = useState({
    itemUnit: ["viên", "gam", "ml", "miếng", "gói"],
    packageUnit: ["Vỉ", "Gói", "Chai", "Ống", "Hộp", "Tuýp"],
    originCountry: [],
  });
  useEffect(() => {
    async function getAllCountries() {
      try {
        const data = await getAllCountriesFunction();
        const formattedCountries = data.map((c: any) => ({
          name: { common: c.name.common },
          flags: { png: c.flags.png },
        }));
        setStoreSelectOption((prev) => ({
          ...prev,
          originCountry: formattedCountries,
        }));
      } catch (error) {
        console.error("Error getting all countries", error);
      }
    }
    getAllCountries();
  }, []);

  const {
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext<MedicineProps>();
  const [selectedImage, setSelectedImage] = useState(
    `/AnKhang/Medicines/${watch("imageURL")}`
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("imageURL", file.name);
      setSelectedImage(imageUrl);
    }
  };
  const getID = useMemo(() => {
    let tempID = String(selectedMedicine?.medicineId);
    while (tempID.length < 8) {
      tempID = "0" + tempID;
    }
    return tempID;
  }, [selectedMedicine]);
  return (
    <Box className="p-6 bg-gray-100">
      <Paper elevation={3} className="max-w-5xl mx-auto p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-[#4cb551] border-b pb-4">
          Edit Medicine
        </h2>
        <Box className="grid grid-cols-3 gap-6 mt-6">
          <Box className="col-span-1 bg-gray-50 p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm mb-2">
              <span className="font-semibold text-[#4cb551]">Medicine ID:</span>{" "}
              {getID}
            </div>
            <input
              type="file"
              accept="image/*"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-image" className="cursor-pointer">
              <div className="w-full h-[250px] rounded-lg flex items-center justify-center bg-white shadow-md">
                <img
                  src={selectedImage}
                  className="object-contain w-full h-full"
                  alt="Click into this box to add/edit image"
                />
              </div>
            </label>
          </Box>
          <Box className="col-span-2 flex flex-col gap-2">
            <Controller
              name="medicineName"
              control={control}
              rules={{ required: "Medicine name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Medicine Name"
                  variant="outlined"
                  multiline
                  rows={2}
                  className="inputFieldForDashBoard"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {listAttributesForEdit.map((attributeGroup, index) => (
              <div
                key={index}
                className={`gap-4 p-3 ${
                  index % 2 === 0 ? "bg-[#f9f9f9] rounded-md" : "bg-white"
                }`}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${attributeGroup.length}, minmax(0, 1fr))`,
                }}
              >
                {attributeGroup.map((attr) => {
                  if (["Package Unit", "Item Unit"].includes(attr.title)) {
                    return (
                      <Controller
                        name={attr.value as keyof MedicineProps}
                        control={control}
                        key={attr.value}
                        rules={{ required: `${attr.title} is required` }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            label={attr.title}
                            fullWidth
                            variant="outlined"
                            className="inputFieldForDashBoard"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          >
                            {storeSelectOption[
                              attr.value as keyof typeof storeSelectOption
                            ]?.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    );
                  }
                  if (attr.title == "Origin Country") {
                    return (
                      <Controller
                        name="originCountry"
                        control={control}
                        key={attr.value}
                        rules={{ required: `${attr.title} is required` }}
                        render={({ field, fieldState }) => (
                          <Autocomplete
                            {...field}
                            options={storeSelectOption.originCountry}
                            getOptionLabel={(option: Country) =>
                              option.name.common
                            }
                            className="inputFieldForDashBoard"
                            renderOption={(props, option) => (
                              <MenuItem
                                {...props}
                                key={option.name.common}
                                value={option.name.common}
                              >
                                <img
                                  src={option.flags.png}
                                  alt={option.name.common}
                                  className="!w-6 !h-4 mr-2 inline-block "
                                />
                                {option.name.common}
                              </MenuItem>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Origin Country"
                                variant="outlined"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            )}
                            value={
                              storeSelectOption.originCountry.find(
                                (country: Country) =>
                                  country.name.common === field.value
                              ) || null
                            }
                            onChange={(_, newValue) =>
                              field.onChange(newValue?.name.common || "")
                            }
                          />
                        )}
                      />
                    );
                  }
                  if (
                    [
                      "Price",
                      "Total Quantity",
                      "Discount",
                      "Package Quantity",
                      "Quantity Per Package",
                    ].includes(attr.title)
                  ) {
                    return (
                      <Controller
                        key={attr.value}
                        name={attr.value as keyof MedicineProps}
                        control={control}
                        defaultValue={
                          selectedMedicine?.[
                            attr.value as keyof MedicineProps
                          ] || ""
                        }
                        rules={{
                          required: `${attr.title} is required`,
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Only numbers are allowed",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            label={attr.title}
                            variant="outlined"
                            fullWidth
                            className="inputFieldForDashBoard"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    );
                  }

                  return (
                    <Controller
                      key={attr.value}
                      name={attr.value as keyof MedicineProps}
                      control={control}
                      defaultValue={
                        selectedMedicine?.[attr.value as keyof MedicineProps] ||
                        ""
                      }
                      rules={{
                        required: `${attr.title} is required`,
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label={attr.title}
                          variant="outlined"
                          fullWidth
                          className="inputFieldForDashBoard"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </Box>
        </Box>
        <Box className="mt-6 pb-[30px]">
          <div className="flex gap-4">
            {["description", "ingredients"].map((tab) => (
              <div
                key={tab}
                className={`py-2 px-4 rounded-lg transition-all duration-300 shadow-sm cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#e8f5e9] text-[#4cb551] font-bold scale-105"
                    : "text-gray-600 hover:text-[#4cb551] hover:bg-gray-100"
                }`}
                onClick={() =>
                  setActiveTab(tab as "description" | "ingredients")
                }
              >
                {tab === "description" ? "Description" : "Ingredients"}
              </div>
            ))}
          </div>
          <div className="mt-4 text-[#444] shadow-sm rounded-lg p-4 bg-white">
            <Controller
              name={activeTab}
              control={control}
              rules={{
                required: `${activeTab} is required`,
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  className="inputFieldForDashBoard mt-4 bg-white"
                  value={watch(activeTab) || ""}
                  error={!!fieldState.error || !!errors[activeTab]}
                  helperText={
                    fieldState.error?.message ||
                    (!!errors[activeTab] && errors[activeTab].message)
                  }
                />
              )}
            />
          </div>
        </Box>
        <Box className="flex justify-end gap-4">
          <Button
            type="submit"
            variant="contained"
            name="nextPage"
            className="flex justify-between items-center gap-1"
          >
            Next Page
            <ArrowForwardIosIcon className="scale-70" />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
