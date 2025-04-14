import { Dispatch, SetStateAction } from "react";
import axios, { AxiosInstance } from "axios";
import { AttributeProps, MedicineProps } from "./interface";

export function calculateTimeSinceCreation(newsDate: string): string {
  const now = new Date();
  const createdDate = new Date(newsDate);
  const diffInMs = now.getTime() - createdDate.getTime();

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  if (diffInDays <= 7) {
    return `${diffInDays} ngày trước`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks <= 4) {
    return `${diffInWeeks} tuần trước`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths <= 12) {
    return `${diffInMonths} tháng trước`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} năm trước`;
}

export const roundNumber = (
  value: number | undefined,
  decimalPlaces: number = 0
): number => {
  if (!value) {
    return 0;
  }
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
};

export const getCategoryKey = (mainTitle: string) => {
  switch (mainTitle) {
    case "Nước sản xuất":
      return "originCountry";
    case "Đối tượng sử dụng":
      return "targetPatiences";
    case "Chỉ định":
      return "indications";
    case "Loại da":
      return "skinTypes";
    case "Mùi vị/ Mùi hương":
      return "flavorOrScents";
    case "Thương hiệu":
      return "brand";
    default:
      return "categories";
  }
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "PROCESSING":
      return "!bg-yellow-100 !text-yellow-700";
    case "SHIPPING":
      return "!bg-blue-100 !text-blue-700";
    case "DELIVERED":
      return "!bg-green-100 !text-green-700";
    case "CANCELED":
      return "!bg-red-100 !text-red-700";
    case "RETURN":
      return "!bg-gray-200 !text-gray-700";
    default:
      return "!bg-gray-100 !text-gray-500";
  }
};

export const getStatusName = (status: string) => {
  switch (status) {
    case "PROCESSING":
      return "Đang xử lý";
    case "SHIPPING":
      return "Đang giao";
    case "DELIVERED":
      return "Đã giao";
    case "CANCELED":
      return "Đã hủy";
    case "RETURN":
      return "Trả hàng";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

// PROCESSING, SHIPPING, DELIVERED, CANCELED, RETURN

export const SetBreadCrumsCategoryHome = (
  index: number,
  titleURL: string,
  setStoreBreadCrums: Dispatch<SetStateAction<string[]>>,
  storeBreadCrums: string[]
) => {
  const tempStoreBreadCrums = storeBreadCrums.splice(index, 1);

  setStoreBreadCrums([...tempStoreBreadCrums, titleURL]);
};

export const generateSlug = (name: string): string => {
  return name
    .trim() // Remove extra spaces
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/\//g, "."); // Replace "/" with "."
};

export const reverseSlug = (name: string | undefined): string | undefined => {
  return name?.replace(/-/g, " ").replace(/\./g, "/"); // Correctly replaces "." back to "/"
};

export const preventNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/[\d]/.test(e.key) &&
    !["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)
  ) {
    e.preventDefault();
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

// const currentDate = new Date();
//     setToday(format(currentDate, "dd/MM/yyyy"));

//     const futureDate = addDays(currentDate, 3);
//     setThreeDaysLater(format(futureDate, "dd/MM/yyyy"));

export const mappingToMedicine = (data: MedicineProps | null) => {
  return {
    medicineId: data?.medicineId || 0,
    medicineName: data?.medicineName || "",
    description: data?.description || "",
    ingredients: data?.ingredients || "",
    price: data?.price || 0,
    totalQuantity: data?.totalQuantity || 0,
    packageUnit: data?.packageUnit || "",
    packageQuantity: data?.packageQuantity || 0,
    itemUnit: data?.itemUnit || "",
    itemQuantityPerPackage: data?.itemQuantityPerPackage || 0,
    discount: data?.discount || 0,
    imageURL: data?.imageURL || "",
    targetPatiences: data?.targetPatiences || [],
    indications: data?.indications || [],
    categories: data?.categories || [],
    flavorOrScents: data?.flavorOrScents || [],
    skinTypes: data?.skinTypes || [],
    brand: data?.brand || "",
    originCountry: data?.originCountry || "",
  };
};

export const mappingToOrderAddress = (data) => {
  return {
    orderId: data.orderId,
    name: data.name,
    phone: data.phone,
    province: data.province,
    district: data.district,
    ward: data.ward,
    address: data.address,
    note: data.note,
  };
};

export const mappingToAttribute = (data: AttributeProps | null) => {
  return {
    attributeId: data?.attributeId,
    attributeType: data ? data.attributeType : "CATEGORY",
    name: data ? data.name : "",
    description: data ? data.description : "",
  };
};

export const getAllCountriesFunction = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Error getting all countries", error);
    return [];
  }
};

export const getAttributeByTypeFunction = async (
  type: string,
  axiosInstance: AxiosInstance
) => {
  try {
    const response = await axiosInstance.get(
      `/attribute/${convertToAttributeType(type)}`
    );
    return response.data.result;
  } catch (error) {
    console.error("Error getting attribute for editing", error);
    return [];
  }
};

export const getAttributeByTypesFunction = async (
  axiosInstance: AxiosInstance,
  types: string[]
) => {
  try {
    const response = await axiosInstance.post("/attribute/findByTypes", {
      types,
    });
    return response.data.result;
  } catch (error) {
    console.error("Error getting all attributes", error);
    return {
      categories: [],
      indications: [],
      flavorOrScents: [],
      targetPatiences: [],
      skinTypes: [],
    };
  }
};

export function convertToAttributeType(title: string) {
  switch (title) {
    case "Target Patiences":
      return "TARGET_PATIENCE";
    case "Indications":
      return "INDICATION";
    case "Categories":
      return "CATEGORY";
    case "Flavors / Scents":
      return "FLAVOR_OR_SCENT";
    default:
      return "SKIN_TYPE";
  }
}
// targetPatience: AttributeProps[];
// indications: AttributeProps[];
// categories: AttributeProps[];
// flavorOrScents: AttributeProps[];
// skinTypes: AttributeProps[];
export function convertToProperty(title: string) {
  switch (title) {
    case "Target Patiences":
      return "targetPatiences";
    case "Indications":
      return "indications";
    case "Categories":
      return "categories";
    case "Flavors / Scents":
      return "flavorOrScents";
    default:
      return "skinTypes";
  }
}

