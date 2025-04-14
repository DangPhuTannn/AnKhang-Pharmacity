import { Grid2 } from "@mui/material";

export default function EachCircleAdver({
  isChose,
  onClick,
}: {
  isChose: boolean;
  onClick: () => void;
}) {
  return (
    <Grid2
      className={"circleAdver " + (isChose ? "choseAdver" : "")}
      onClick={onClick}
    ></Grid2>
  );
}
