import { Box, Grid2 } from "@mui/material";
import RightAdver from "./RightAdver";
import "./../../../../../css/Home/advertisement.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { storeIndexPics } from "../../../../../Config/glovalVariables";

function Advertisement() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationDirection("slide-left");
      setCount((prevCount) => (prevCount + 1) % storeIndexPics.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [animationDirection, setAnimationDirection] = useState<string>("");

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
  return (
    <Grid2 container spacing={0.5} className="storeAdver">
      <Grid2 size={8}>
        <Box className={`leftAdverBox`}>
          <img
            src={`/Advertisement/${count}Pic.jpg`}
            alt="adver"
            className={`${animationDirection}`}
            onAnimationEnd={() => setAnimationDirection("no-animation")}
          ></img>
          <div className="buttonChangeSlideAdver">
            <FontAwesomeIcon
              className="iconAdver"
              icon={faChevronLeft}
              onClick={handlePrev}
            />{" "}
            {count + 1} | {storeIndexPics.length + " "}
            <FontAwesomeIcon
              className="iconAdver"
              icon={faChevronRight}
              onClick={handleNext}
            />
          </div>
        </Box>
      </Grid2>
      <Grid2 size={4}>
        <RightAdver namePic={storeIndexPics[1]}></RightAdver>
        <RightAdver namePic={storeIndexPics[2]}></RightAdver>
      </Grid2>
    </Grid2>
  );
}

export default Advertisement;
