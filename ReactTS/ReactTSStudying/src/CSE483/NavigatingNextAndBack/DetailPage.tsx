import { useNavigate, useParams } from "react-router-dom";
import { PageProps, storePages, style } from "./GlobalVariables";
import { usePrevPage } from "./NavigatingNextAndBack";

export default function DetailPage() {
  const { backToPrevPage, addPrevPage } = usePrevPage();
  const navigate = useNavigate();
  const { pageURL } = useParams();
  const page: PageProps | undefined = storePages.find(
    (eachPage) => eachPage.namePage == pageURL
  );
  return (
    <div className={style.container}>
      <div
        className={style.button}
        onClick={() => navigate(`/${backToPrevPage()}`)}
      >
        Back
      </div>
      <div className={style.button}>{page?.namePage}</div>
      <div
        className={style.button}
        onClick={() => {
          addPrevPage(page?.namePage);
          navigate(`/${page?.nextPage}`);
        }}
      >
        Next
      </div>
    </div>
  );
}
