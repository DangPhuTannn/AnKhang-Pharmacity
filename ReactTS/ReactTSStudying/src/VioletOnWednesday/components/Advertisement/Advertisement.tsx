import { Box, Grid2 } from "@mui/material";

import "./../../css/advertisement.css";
import { useEffect, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RightAdver from "./RightAdver";
import EachCircleAdver from "./EachCircleAdver";
function Advertisement() {
  const [count, setCount] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationDirection("slide-left");
      setCount((prevCount) => (prevCount + 1) % storeIndexPics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [animationDirection]);
  const storeIndexPics = [
    "Banner_large.png",
    "Banner_s1.png",
    "Banner_s2.png",
    "ads-1.png",
  ];

  const handleNext = () => {
    setAnimationDirection("slide-left");
    setCount((prevCount) => (prevCount + 1) % storeIndexPics.length);
  };

  const handlePrev = () => {
    setAnimationDirection("slide-right");
    setCount(
      (prevCount) =>
        (prevCount - 1 + storeIndexPics.length) % storeIndexPics.length
    );
  };

  const handlePickCircle = (index: number): void => {
    setCount(index);
  };
  return (
    <Grid2 container spacing={0.5} className="storeAdver">
      <Grid2 size={8}>
        <Box
          className={`leftAdverBox ${animationDirection}`}
          onAnimationEnd={() => setAnimationDirection("no-animation")}
        >
          <img
            src={`/Lab1/Image/Advertisement/Images/${storeIndexPics[count]}`}
            alt="adver"
          ></img>
        </Box>
        <div className="buttonChangeSlideAdverLeft">
          <NavigateBeforeIcon
            className="iconAdver"
            onClick={handlePrev}
          ></NavigateBeforeIcon>
        </div>
        <div className="buttonChangeSlideAdverRight">
          <NavigateNextIcon
            className="iconAdver"
            onClick={handleNext}
          ></NavigateNextIcon>
        </div>
        <Grid2 className="storeImageSize" container size={12} spacing={1}>
          {storeIndexPics.map((eachPic, index) => (
            <EachCircleAdver
              isChose={index == count}
              key={index}
              onClick={() => handlePickCircle(index)}
            ></EachCircleAdver>
          ))}
        </Grid2>
      </Grid2>
      <Grid2 size={4}>
        <RightAdver namePic={storeIndexPics[1]}></RightAdver>
        <RightAdver namePic={storeIndexPics[2]}></RightAdver>
      </Grid2>
    </Grid2>
  );
}

export default Advertisement;
