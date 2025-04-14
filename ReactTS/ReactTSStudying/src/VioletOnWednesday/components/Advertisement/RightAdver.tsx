import { Box } from "@mui/material";

function RightAdver({ namePic }: { namePic: string }) {
  return (
    <Box className="rightAdverBox">
      <img src={`/Lab1/Image/Advertisement/Images/${namePic}`}></img>
    </Box>
  );
}

export default RightAdver;
