import { Box } from "@mui/material";

function RightAdver({ namePic }: { namePic: string }) {
  return (
    <Box className="rightAdverBox">
      <img src={`/Advertisement/${namePic}`}></img>
    </Box>
  );
}

export default RightAdver;
