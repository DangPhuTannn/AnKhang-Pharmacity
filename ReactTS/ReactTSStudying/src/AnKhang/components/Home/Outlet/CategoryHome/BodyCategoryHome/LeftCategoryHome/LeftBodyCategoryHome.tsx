/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuIcon from "@mui/icons-material/Menu";
import EachTypeLeftCategoryHome from "./EachTypeLeftCategoryHome";
import { useEffect, useState } from "react";
import useAxios from "../../../../../../Config/axiosInstance";
import { getAttributeByTypesFunction, getAllCountriesFunction } from "../../../../../../Config/function";
import { TypeLeftCategoryHomeProps } from "../../../../../../Config/interface";
import { useBackdrop } from "../../../../../../GlobalUtils/BackdropGlobal";

const initialState: TypeLeftCategoryHomeProps[] = [
  {
    mainTitle: "Giá bán",
    haveSearchBar: false,
    typeContainer: "boxTypeLeftCategoryHome",
    listType: [
      "Tất cả",
      "Dưới 100.000đ",
      "100.000đ đến 300.000đ",
      "300.000đ đến 500.000đ",
      "Trên 500.000đ",
    ],
  },
  {
    mainTitle: "Đối tượng sử dụng",
    haveSearchBar: true,
    typeContainer: "checkboxTypeLeftCategoryHome",
    listType: [],
  },
  {
    mainTitle: "Chỉ định",
    haveSearchBar: true,
    typeContainer: "checkboxTypeLeftCategoryHome",
    listType: [],
  },
  {
    mainTitle: "Mùi vị/ Mùi hương",
    haveSearchBar: false,
    typeContainer: "checkboxTypeLeftCategoryHome",
    listType: [],
  },
  {
    mainTitle: "Loại da",
    haveSearchBar: false,
    typeContainer: "checkboxTypeLeftCategoryHome",
    listType: [],
  },
  {
    mainTitle: "Thương hiệu",
    haveSearchBar: true,
    typeContainer: "checkboxTypeLeftCategoryHome",
    listType: [
      "Tất cả",
      "Jpanwell",
      "Kingphar",
      "Thái Minh",
      "Vitamins For Life",
      "OMEXXEL",
      "Nam Dược",
      "Vitabiotics",
      "Abbott",
      "Ecogreen",
      "Á Âu",
      "Botania",
      "OCAVILL",
      "VITADAIRY",
      "Brauer",
      "KENKO",
      "Tuệ Linh",
    ],
  },
  {
    mainTitle: "Nước sản xuất",
    haveSearchBar: true,
    typeContainer: "checkboxTypeLeftCategoryHome",
    listType: [],
  },
];

export default function LeftBodyCategoryHome() {
  const [storeAllAttributes, setStoreAllAttributes] =
    useState<TypeLeftCategoryHomeProps[]>(initialState);
  const axiosInstance = useAxios();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  useEffect(() => {
    async function getAttributeByTypes() {
      try {
        showBackdrop();
        const dataAttributes = await getAttributeByTypesFunction(
          axiosInstance,
          ["INDICATION", "FLAVOR_OR_SCENT", "TARGET_PATIENCE", "SKIN_TYPE"]
        );
        const dataCountries = await getAllCountriesFunction();
        const newAttributes = [
          {
            attributeId: 0,
            name: "Tất cả",
            description: "",
            attributeType: "hehe",
          },
        ];

        const targetPatiences = [
          ...newAttributes,
          ...dataAttributes.targetPatiences,
        ].flat();
        const indications = [
          ...newAttributes,
          ...dataAttributes.indications,
        ].flat();
        const flavorOrScents = [
          ...newAttributes,
          ...dataAttributes.flavorOrScents,
        ].flat();
        const skinTypes = [
          ...newAttributes,
          ...dataAttributes.skinTypes,
        ].flat();
        const countries = [
          ...newAttributes,
          ...dataCountries.map((c: any) => c.name.common),
        ].flat();
        setStoreAllAttributes((prev) =>
          prev.map((item, index) => {
            switch (index) {
              case 1:
                return { ...item, listType: targetPatiences };
              case 2:
                return { ...item, listType: indications };
              case 3:
                return { ...item, listType: flavorOrScents };
              case 4:
                return { ...item, listType: skinTypes };
              case 6:
                return { ...item, listType: countries };
              default:
                return item;
            }
          })
        );
      } catch (error) {
        console.error("Error getting attribyte by types", error);
      } finally {
        hideBackdrop();
      }
    }
    getAttributeByTypes();
  }, []);
  return (
    <div className="leftBodyCategoryHome">
      <div className="storeStickyLeftBodyCategoryHome">
        <div className="headerLeftBodyCategoryHome">
          <MenuIcon className="menuIconLeftBodyCategoryHome" />
          Bộ lọc nâng cao
        </div>
        <div className="typeLeftBodyCategoryHome">
          {storeAllAttributes.map((eachType) => (
            <EachTypeLeftCategoryHome key={eachType.mainTitle} {...eachType} />
          ))}
        </div>
      </div>
    </div>
  );
}
