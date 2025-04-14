import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface ComponentContextProps {
  backToPrevComponent: () => void;
  addNewComponent: (currentComponent: ReactNode) => void;
  storeComponents: ReactNode[];
}

const ComponentContext = createContext<ComponentContextProps | undefined>(
  undefined
);

export default function StoreComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeComponents, setStoreComponents] = useState<ReactNode[]>([
    children,
  ]);

  const backToPrevComponent = () => {
    if (storeComponents.length > 1) {
      setStoreComponents((prev) => prev.slice(0, -1));
    }
  };

  const addNewComponent = (currentComponent: ReactNode) => {
    setStoreComponents((prev) => [...prev, currentComponent]);
  };

  return (
    <ComponentContext.Provider
      value={{
        backToPrevComponent,
        addNewComponent,
        storeComponents,
      }}
    >
      {storeComponents[storeComponents.length - 1]}
    </ComponentContext.Provider>
  );
}

export const useStoreComponents = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error("useStoreURLs must be used within a StoreURLs provider");
  }
  return context;
};
