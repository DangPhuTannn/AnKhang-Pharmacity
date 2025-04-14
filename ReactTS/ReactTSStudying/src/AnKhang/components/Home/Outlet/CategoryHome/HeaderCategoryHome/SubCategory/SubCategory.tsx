import { useParams } from "react-router-dom";
import EachSubCategory from "./EachSubCategory";
import { reverseSlug } from "../../../../../../Config/function";
import { storeContents } from "../../../../../../Config/glovalVariables";

export default function SubCategory() {
  const { mainCategoryParam, subCategoryParam } = useParams();
  const getMainCategory = reverseSlug(mainCategoryParam);
  const getSubCategory = reverseSlug(subCategoryParam);
  return (
    <>
      {storeContents
        .find(({ mainTitle }) => mainTitle == getMainCategory)
        ?.relatives.find(({ title }) => title == getSubCategory)
        ?.keyWords?.map((keyWord, index) => (
          <EachSubCategory
            index={index}
            eachKeyWord={keyWord}
            key={index}
            subCategoryParam={getSubCategory!}
            mainCategoryParam={getMainCategory!}
          ></EachSubCategory>
        ))}
    </>
  );
}
