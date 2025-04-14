import { createContext, useContext, useState } from "react";

interface PrevPageProps {
  backToPrevPage: () => string;
  addPrevPage: (currentPageName: string | undefined) => void;
}

const PrevPageFunctionContext = createContext<PrevPageProps | undefined>(
  undefined
);
export default function NavigatingNextAndBack({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prevPage, setPrevPage] = useState<string[]>([""]);
  const backToPrevPage = () => {
    const prevPageName = prevPage[prevPage.length - 1];
    if (prevPage.length > 1) {
      setPrevPage((prev) => prev.slice(0, -1));
    }

    return prevPageName;
  };
  const addPrevPage = (currentPageName: string | undefined) =>
    setPrevPage((prev) => [...prev, currentPageName ? currentPageName : ""]);

  return (
    <PrevPageFunctionContext.Provider value={{ backToPrevPage, addPrevPage }}>
      {children}
    </PrevPageFunctionContext.Provider>
  );
}

export const usePrevPage = () => {
  const context = useContext(PrevPageFunctionContext);
  if (!context) {
    throw new Error("bla bla bla");
  }
  return context;
};
