import { Grid2 } from "@mui/material";
import React from "react";
import { SocialFooterProps } from "../../../../Config/interface";

export default function SocialFooter({
  title,
  storeIcons,
  size,
}: SocialFooterProps) {
  return (
    <Grid2 size={3}>
      <h3 className="socialFooterTitle">{title}</h3>
      <Grid2 className="socialFooterIcons" container spacing={2}>
        {storeIcons.map((eachIcon, index) => (
          <Grid2 size={size} key={index}>
            {React.isValidElement(eachIcon) ? (
              eachIcon
            ) : (
              <img src={`/AnKhang/FooterSocial/${eachIcon}`}></img>
            )}
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}
