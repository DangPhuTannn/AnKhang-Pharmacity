import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { StoreCategoryHomeContextProps } from "../CategoryHomeContext";
import { useContext } from "react";
import { generateSlug } from "../../../../../Config/function";

export default function BreadcrumsCategoryHome() {
  const { storeBreadCrums = [] } =
    useContext(StoreCategoryHomeContextProps) || {};
  let storeNextURL = "/home/category";
  return (
    <div role="presentation" className="storeBreadcrumsCategoryHome">
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/home" className="eachBreadCrumsCategoryHome">
          Trang chủ
        </Link>
        {storeBreadCrums
          .slice(0, storeBreadCrums.length - 1)
          .map((eachURL, index) => {
            storeNextURL += `/${generateSlug(eachURL)}`;
            return (
              <Link
                key={index}
                href={storeNextURL}
                className="eachBreadCrumsCategoryHome"
              >
                {eachURL}
              </Link>
            );
          })}
        <Typography sx={{ color: "text.primary", fontSize: 14 }}>
          {storeBreadCrums[storeBreadCrums.length - 1]}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
