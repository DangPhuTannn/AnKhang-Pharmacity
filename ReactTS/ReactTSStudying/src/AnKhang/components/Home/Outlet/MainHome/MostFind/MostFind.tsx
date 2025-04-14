import { Grid2 } from "@mui/material";
import "./../../../../../css/Home/Outlet/MainHome/formMostFind.css";
import { Link } from "react-router-dom";
function MostFind({
  typeMedicine,
}: {
  typeMedicine: { title: string; linkURL: string }[];
}) {
  return (
    <Grid2 container className="formMostFind">
      <Grid2 size={12} container>
        <Grid2 size={3} container>
          <Grid2 size={2}>
            <img src="/AnKhang/FormMedicine/daulan.png" alt="logo"></img>
          </Grid2>
          <Grid2 size={10} className="typeFormMedicine">
            <h3>Tìm kiếm nhiều nhất</h3>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} className="mostFindBody">
        {typeMedicine.map(({ title, linkURL }) => (
          <Link
            to={`/home/category${linkURL}`}
            onClick={() => window.scrollTo(0, 0)}
            key={title}
          >
            <Grid2 className="nameMostFind" key={title}>
              {title}
            </Grid2>
          </Link>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default MostFind;
