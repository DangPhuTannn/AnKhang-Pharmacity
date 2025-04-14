import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import {
  AttributeProps,
  ListAttributeProps,
  MedicineProps,
} from "../../../../Config/interface";

import { Controller, useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import { showConfirmDialog } from "../../../../Config/functionTSX";
import useAxios from "../../../../Config/axiosInstance";
import { convertToProperty, getAttributeByTypeFunction } from "../../../../Config/function";
import { useBackdrop } from "../../../../GlobalUtils/BackdropGlobal";
export default function DialogCategoryEdit({
  open,
  setOpen,
  listAttribute,
  setListAttributes,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  listAttribute: ListAttributeProps;
  setListAttributes: Dispatch<SetStateAction<ListAttributeProps[]>>;
}) {
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstance = useAxios();
  const {
    setValue,
    control,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext<MedicineProps>();
  const [allAttributeValues, setAllAttributeValues] = useState<
    AttributeProps[]
  >([]);
  const [selectedAttributes, setSelectedAttributes] = useState<
    AttributeProps[]
  >(listAttribute.value);
  const [availableSearch, setAvailableSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const handleAvailableSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const getValue = e.target.value.trim();
      setAvailableSearch(getValue);
    }, 500),
    []
  );

  const handleSelectedSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const getValue = e.target.value.trim();
      setSelectedSearch(getValue);
    }, 500),
    []
  );
  const getProp = useMemo(() => {
    return convertToProperty(listAttribute.title);
  }, [listAttribute]);
  useEffect(() => {
    async function getAttributeByType() {
      try {
        showBackdrop();
        const result = await getAttributeByTypeFunction(
          listAttribute.title,
          axiosInstance
        );
        setAllAttributeValues(result);
      } catch (error) {
        console.error("Error getting attribute for editing", error);
      } finally {
        hideBackdrop();
      }
    }

    getAttributeByType();
  }, []);

  const availableAttributes: AttributeProps[] = useMemo(
    () =>
      allAttributeValues.filter(
        (attribute) =>
          !selectedAttributes.some(
            (selected) => selected.attributeId === attribute.attributeId
          )
      ),
    [allAttributeValues, selectedAttributes]
  );

  const handleMoveRight = useCallback((attribute: AttributeProps) => {
    setSelectedAttributes((prev) => [...prev, attribute]);
  }, []);

  const handleMoveLeft = useCallback((attribute: AttributeProps) => {
    setSelectedAttributes((prev) =>
      prev.filter(
        (eachPrevAttribute) =>
          eachPrevAttribute.attributeId != attribute.attributeId
      )
    );
  }, []);

  const handleClose = useCallback(() => {
    return showConfirmDialog({
      message: (
        <div style={{ whiteSpace: "pre-line" }}>
          All the changes won't be saved, want to turn off?
        </div>
      ),
      accept: () => {
        setSelectedAttributes(listAttribute.value);
        setOpen(false);
        clearErrors(getProp);
      },
    });
  }, [listAttribute, getProp]);

  const handleSave = useCallback(
    (selectedAttributes: AttributeProps[]) => {
      if (selectedAttributes.length == 0) {
        return setError(getProp, {
          type: "manual",
          message: `${listAttribute.title} can not be empty`,
        });
      }
      return showConfirmDialog({
        message: (
          <div style={{ whiteSpace: "pre-line" }}>
            Make sure all the values are correct before saving
          </div>
        ),
        accept: () => {
          setValue(getProp, selectedAttributes);
          setListAttributes((prev) =>
            prev.map((eachListAttribute) =>
              eachListAttribute.title == listAttribute.title
                ? { ...listAttribute, value: [...selectedAttributes] }
                : eachListAttribute
            )
          );
          setOpen(false);
          clearErrors(getProp);
        },
      });
    },
    [getProp, listAttribute]
  );

  return (
    <Dialog open={open} onClose={() => handleClose()} maxWidth="md" fullWidth>
      <DialogContent>
        <div className="flex flex-col gap-2 max-h-[800px] overflow-hidden">
          <h2 className="text-2xl font-extrabold text-center mb-6 text-[#4cb551] tracking-wide rounded-lg p-4 bg-gray-50 shadow-md">
            {listAttribute.title}
          </h2>
          <div className="flex gap-6">
            <div className="w-1/2 rounded-lg p-4 bg-gray-50 shadow-md">
              <div className="flex justify-between items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Available
                </h3>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => handleAvailableSearch(e)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    🔍
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 max-h-[330px] overflow-y-auto dialogScrollBar">
                <Tooltip id="attributeAvailable-tooltip" />
                {availableAttributes
                  .filter((eachAvailable) =>
                    availableSearch.length > 0
                      ? eachAvailable.name
                          .toLocaleLowerCase()
                          .includes(availableSearch.toLocaleLowerCase())
                      : true
                  )
                  .map((attribute) => (
                    <motion.div
                      key={attribute.attributeId}
                      className="cursor-pointer p-3 rounded-md bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-sm"
                      onClick={() => handleMoveRight(attribute)}
                      data-tooltip-id="attributeAvailable-tooltip"
                      data-tooltip-content={attribute.description}
                    >
                      {attribute.name}
                    </motion.div>
                  ))}
              </div>
            </div>
            <Controller
              name={getProp}
              control={control}
              rules={{
                required: `${listAttribute.title} is required`,
              }}
              render={() => (
                <div className="w-1/2 rounded-lg p-4 bg-green-50 shadow-md">
                  <div className="flex justify-between items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold mb-2 text-green-700">
                      Selected
                    </h3>
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => handleSelectedSearch(e)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        🔍
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 max-h-[330px] overflow-y-auto dialogScrollBar">
                    <Tooltip id="attributeSelected-tooltip" />
                    {selectedAttributes
                      .filter((eachSelected) =>
                        selectedSearch.length > 0
                          ? eachSelected.name
                              .toLocaleLowerCase()
                              .includes(selectedSearch.toLocaleLowerCase())
                          : true
                      )
                      .map((attribute) => (
                        <motion.div
                          key={attribute.attributeId}
                          className="cursor-pointer p-3 rounded-md bg-green-200 hover:bg-green-300 transition duration-200 shadow-sm"
                          onClick={() => handleMoveLeft(attribute)}
                          data-tooltip-id="attributeSelected-tooltip"
                          data-tooltip-content={attribute.description}
                        >
                          {attribute.name}
                        </motion.div>
                      ))}
                  </div>
                  {!!errors[getProp] && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors[getProp] && errors[getProp].message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex justify-end mt-4 gap-4 p-2">
            <Button
              className=" cursor-pointer text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
              onClick={() => handleClose()}
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              className=" cursor-pointer text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
              color="success"
              variant="contained"
              onClick={() => handleSave(selectedAttributes)}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
