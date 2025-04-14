import { Dispatch, SetStateAction } from "react";

const buttonStyle = {
  margin: "10px",
  padding: "10px",
  backgroundColor: "blue",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

type NavigatingButtonProps = {
  nameScreen: string;
  nextPath: string;
  setPaths: Dispatch<SetStateAction<string[]>>;
};

export default function NavigatingButton({
  nameScreen,
  nextPath,
  setPaths,
}: NavigatingButtonProps) {
  return (
    <div
      style={buttonStyle}
      onClick={() => setPaths((prevPaths) => [...prevPaths, nextPath])}
    >
      {nameScreen}
    </div>
  );
}
