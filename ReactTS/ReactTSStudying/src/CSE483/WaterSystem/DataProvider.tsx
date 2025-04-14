/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";
import axios from "axios";

interface DataContextType {
  handleAddObject: (newObject: any, parentId: number, type: string) => void;
  handleUpdateObject: (type: string, updatedObject: any) => void;
  handleDeleteObject: (id: number, type: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const handleAddObject = async (
    newObject: any,
    parentId: number,
    type: string
  ) => {
    let request = {};
    if (type == "records") {
      request = {
        waterSystemId: parentId,
        reading: newObject.reading,
        date: newObject.date,
      };
    } else if (type == "donations") {
      request = {
        waterSystemId: parentId,
        amount: newObject.amount,
        date: newObject.date,
      };
    }
    try {
      await axios.post(`http://localhost:8080/ankhang/${type}/add`, request);
    } catch (error) {
      console.error("Error updating object", error);
    }
  };
  const handleUpdateObject = async (type: string, updatedObject: any) => {
    let request = {};
    if (type === "records") {
      request = {
        recordId: updatedObject.id,
        reading: updatedObject.reading,
        date: updatedObject.date,
      };
    } else if (type == "donations") {
      request = {
        donationId: updatedObject.id,
        amount: updatedObject.amount,
        date: updatedObject.date,
      };
    }
    try {
      await axios.put(`http://localhost:8080/ankhang/${type}/update`, request);
    } catch (error) {
      console.error("Error updating object", error);
    }
  };

  const handleDeleteObject = async (id: number, type: string) => {
    try {
      await axios.delete(`http://localhost:8080/ankhang/${type}/delete/${id}`);
    } catch (error) {
      console.error("Error updating object", error);
    }
  };

  return (
    <DataContext.Provider
      value={{ handleAddObject, handleUpdateObject, handleDeleteObject }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("blabla");
  return context;
};
