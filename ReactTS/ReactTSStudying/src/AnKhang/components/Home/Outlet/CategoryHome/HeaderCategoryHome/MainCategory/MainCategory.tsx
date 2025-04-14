import { useParams } from "react-router-dom";

import EachMainCategory from "./EachMainCategory";
import { reverseSlug } from "../../../../../../Config/function";
import { storeContents } from "../../../../../../Config/glovalVariables";


export default function MainCategory() {
  const { mainCategoryParam } = useParams();
  const getMainCategory = reverseSlug(mainCategoryParam);
  return (
    <>
      {storeContents
        .find(({ mainTitle }) => mainTitle == getMainCategory)
        ?.relatives?.map((eachMainCategory, index) => (
          <EachMainCategory
            eachMainCategory={eachMainCategory}
            key={index}
            index={index}
            mainCategoryParam={getMainCategory!}
          />
        ))}
    </>
  );
}
