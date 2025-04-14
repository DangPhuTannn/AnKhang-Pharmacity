import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../../Config/axiosInstance";
import { reverseSlug, getCategoryKey } from "../../../../Config/function";
import {
  storeContents,
  storeCategory,
  storeMedicineAttributes,
} from "../../../../Config/glovalVariables";
import {
  CategoryHomeContextProps,
  FilterBodyCategoryHomeProps,
  FilterAction,
  AttributeValueProps,
  MedicineProps,
} from "../../../../Config/interface";
import { useBackdrop } from "../../../../GlobalUtils/BackdropGlobal";

export const StoreCategoryHomeContextProps = createContext<
  CategoryHomeContextProps | undefined
>(undefined);
const initialFilterState: FilterBodyCategoryHomeProps = {
  priceRange: null,
  categories: {
    attributeType: "CATEGORY",
    attributeValues: new Set(),
  },
  targetPatiences: {
    attributeType: "TARGET_PATIENCE",
    attributeValues: new Set(),
  },
  indications: {
    attributeType: "INDICATION",
    attributeValues: new Set(),
  },
  skinTypes: {
    attributeType: "SKIN_TYPE",
    attributeValues: new Set(),
  },
  flavorOrScents: {
    attributeType: "FLAVOR_OR_SCENT",
    attributeValues: new Set(),
  },
  brand: {
    attributeType: "brand",
    attributeValues: new Set(),
  },

  originCountry: {
    attributeType: "originCountry",
    attributeValues: new Set(),
  },
  sortOrder: "desc",
};
const filterReducer = (
  state: FilterBodyCategoryHomeProps,
  action: FilterAction
): FilterBodyCategoryHomeProps => {
  switch (action.type) {
    case "ADD_FILTER": {
      if (action.category == "sortOrder") {
        return {
          ...state,
          [action.category]: action.value as "asc" | "desc",
        };
      }
      if (action.value instanceof Set) {
        return {
          ...state,
          [action.category]: {
            attributeType: state[action.category].attributeType,
            attributeValues: new Set(action.value),
          },
        };
      }
      return {
        ...state,
        [action.category]: {
          attributeType: state[action.category].attributeType,
          attributeValues: new Set([
            ...state[action.category].attributeValues,
            action.value,
          ]),
        },
      };
    }

    case "REMOVE_FILTER": {
      const newSet = new Set([
        ...(state[action.category] as AttributeValueProps).attributeValues,
      ]);
      newSet.delete(action.value as string);
      return {
        ...state,
        [action.category]: {
          attributeType: (state[action.category] as AttributeValueProps)
            .attributeType,
          attributeValues: newSet,
        },
      };
    }
    case "RESET_ONE_CATEGORY_FILTER": {
      return {
        ...state,
        [action.category]: {
          attributeType: (state[action.category] as AttributeValueProps)
            .attributeType,
          attributeValues: new Set(),
        },
      };
    }

    case "RESET_FILTER": {
      return {
        ...state,
        priceRange: null,
        targetPatiences: {
          attributeType: "TARGET_PATIENCE",
          attributeValues: new Set(),
        },
        indications: {
          attributeType: "INDICATION",
          attributeValues: new Set(),
        },
        skinTypes: {
          attributeType: "SKIN_TYPE",
          attributeValues: new Set(),
        },
        flavorOrScents: {
          attributeType: "FLAVOR_OR_SCENT",
          attributeValues: new Set(),
        },
        brand: {
          attributeType: "brand",
          attributeValues: new Set(),
        },

        originCountry: {
          attributeType: "originCountry",
          attributeValues: new Set(),
        },
      };
    }
    case "SET_PRICE_RANGE":
      return {
        ...state,
        priceRange: action.priceRange,
      };

    default:
      return state;
  }
};

export const CategoryHomeContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { mainCategoryParam, subCategoryParam, categoryParam, productName } =
    useParams();
  const [listMedicines, setListMedicines] = useState<MedicineProps[]>([]);
  const [originListMedicines, setOriginListMedicines] = useState<
    MedicineProps[]
  >([]);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [filters, dispatch] = useReducer<
    React.Reducer<FilterBodyCategoryHomeProps, FilterAction>
  >(filterReducer, initialFilterState);
  const [storeBreadCrums, setStoreBreadCrums] = useState<string[]>([]);
  const axiosInstance = useAxios();
  useEffect(() => {
    const getMainCategory = reverseSlug(mainCategoryParam);
    const getSubCategory = reverseSlug(subCategoryParam);
    const getCategory = reverseSlug(categoryParam);
    const newStoreSetCategories = new Set();
    const storeMainCategories = storeContents.find(
      ({ mainTitle }) => mainTitle == getMainCategory
    )?.relatives;

    const storeNextURL: string[] = [];
    [getMainCategory, getSubCategory, getCategory].forEach(
      (eachCategory) => eachCategory && storeNextURL.push(eachCategory)
    );
    if (!getSubCategory) {
      storeMainCategories?.forEach(({ keyWords }) =>
        keyWords.forEach((eachKeyWord) =>
          newStoreSetCategories.add(eachKeyWord)
        )
      );
    } else if (!getCategory) {
      storeMainCategories
        ?.find(({ title }) => title == getSubCategory)
        ?.keyWords.forEach((eachKeyWord) =>
          newStoreSetCategories.add(eachKeyWord)
        );
    } else {
      newStoreSetCategories.add(
        storeMainCategories
          ?.find(({ title }) => title == getSubCategory)
          ?.keyWords.find((eachKeyWord) => eachKeyWord == getCategory)
      );
    }
    const getInitialMedicines = async () => {
      try {
        const responses = await axiosInstance.post("/medicines/allAttributes", {
          priceRange: null,
          listAttributeFilters: [
            {
              attributeType: "CATEGORY",
              attributeValues: productName
                ? storeCategory
                : Array.from(newStoreSetCategories),
            },
          ],
          sortOrder: "desc",
          searchValue: productName ? productName : "",
        });
        setOriginListMedicines(responses.data.result);
      } catch (error) {
        console.error("Error fetching medicines by category:", error);
      }
    };
    getInitialMedicines();
    dispatch({
      type: "ADD_FILTER",
      category: "categories",
      value: productName ? new Set(storeCategory) : newStoreSetCategories,
    });
    setStoreBreadCrums(storeNextURL);
  }, [mainCategoryParam, subCategoryParam, categoryParam, productName]);

  useEffect(() => {
    if (filters.categories.attributeValues.size === 0) return;
    const getMedicinesByAllCategories = async () => {
      try {
        showBackdrop();
        const resultAttributes = storeMedicineAttributes
          .map((eachAttribute) => ({
            attributeType: filters[getCategoryKey(eachAttribute)].attributeType,
            attributeValues: Array.from(
              filters[getCategoryKey(eachAttribute)].attributeValues
            ),
          }))
          .filter(
            ({ attributeValues }) =>
              attributeValues && attributeValues.length > 0
          );
        const responses = await axiosInstance.post("/medicines/allAttributes", {
          priceRange: filters.priceRange,
          listAttributeFilters: resultAttributes,
          sortOrder: filters.sortOrder,
          searchValue: productName ? productName : "",
        });
        setListMedicines(responses.data.result);
      } catch (error) {
        console.error("Error fetching medicines by category:", error);
      } finally {
        hideBackdrop();
      }
    };
    getMedicinesByAllCategories();
  }, [filters]);
  return (
    <StoreCategoryHomeContextProps.Provider
      value={{
        listMedicines,
        sortOrder: filters.sortOrder,
        dispatch,
        filters: filters,
        storeBreadCrums,
        originListMedicines,
      }}
    >
      {children}
    </StoreCategoryHomeContextProps.Provider>
  );
};

export function useCategoryContext() {
  const context = useContext(StoreCategoryHomeContextProps);
  if (!context) {
    throw new Error("blabla");
  }
  return context;
}
