import { useState } from "react";
import NavigatingButton from "./NavigatingButton";
import "./Navigating.css"
const initialScreen = ["ScreenA", "ScreenB"];

export default function NavigatingBack() {
  const [paths, setPaths] = useState([""]);

  return (
    <div className="containerNavigating">
      {paths[paths.length - 1]}
      <div
        className="storeButtons"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {paths[paths.length - 1] == "" &&
          initialScreen.map((eachScreen, index) => (
            <NavigatingButton
              key={index}
              {...{
                nameScreen: eachScreen,
                nextPath: eachScreen,
                setPaths,
              }}
            />
          ))}
        {paths[paths.length - 1] != "" && (
          <>
            <NavigatingButton
              {...{
                nameScreen: "Back",
                nextPath: paths[paths.length - 2],
                setPaths,
              }}
            />
            {paths[paths.length - 1] != "ScreenC" && (
              <NavigatingButton
                {...{
                  nameScreen: "ScreenC",
                  nextPath: "ScreenC",
                  setPaths,
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
