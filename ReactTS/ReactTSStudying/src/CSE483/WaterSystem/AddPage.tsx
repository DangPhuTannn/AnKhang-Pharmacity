/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useStoreComponents } from "./StoreComponents";
import { useData } from "./DataProvider";

// AddPage Component
export default function AddPage({
  object,
  parentId,
  type,
}: {
  object: any;
  parentId: number;
  type: string;
}) {
  const { backToPrevComponent } = useStoreComponents();
  const { handleAddObject } = useData();
  const [formData, setFormData] = useState({});

  return (
    <div className="flex mt-[50px] flex-col items-center">
      <div>
        {Object.keys(object).map((keyName) => {
          if (keyName !== "id") {
            return (
              <div className="flex gap-[20px]" key={keyName}>
                <div className="font-bold">{keyName}:</div>
                <input
                  type="text"
                  className="border p-[10px]"
                  onChange={(e) =>
                    setFormData({ ...formData, [keyName]: e.target.value })
                  }
                />
              </div>
            );
          }
          return <div key={keyName}></div>;
        })}
      </div>

      <div
        className="border p-[20px] mt-[20px]"
        onClick={() => {
          handleAddObject(formData, parentId, type);
          backToPrevComponent();
        }}
      >
        Add
      </div>

      <div
        className="border p-[20px] mt-[20px]"
        onClick={() => backToPrevComponent()}
      >
        Back
      </div>
    </div>
  );
}

// DataProvider Component

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

// Detail Page

export function DetailPage({
  parentId,
  itemId,
  type,
}: {
  parentId: number;
  itemId: number;
  type: string;
}) {
  const { backToPrevComponent, addNewComponent, storeComponents } =
    useStoreComponents();
  const { handleDeleteObject } = useData();
  const [object, setObject] = useState<any>(null);

  async function getObjectArray() {
    try {
      const theEndPoint =
        parentId == -1 ? `waterSystem/${itemId}` : `${type}/${itemId}`;
      const response = await axios.get(
        `http://localhost:8080/ankhang/${theEndPoint}`
      );

      setObject(response.data.result);
    } catch (error) {
      console.error("Error getting objectArray", error);
    }
  }
  if (!object) {
    getObjectArray();
  }

  async function getArrayInObject() {
    try {
      const [responseFirst, responseSecond] = await Promise.all([
        axios.get(`http://localhost:8080/ankhang/records/allrecords/${itemId}`),
        axios.get(
          `http://localhost:8080/ankhang/donations/alldonations/${itemId}`
        ),
      ]);

      setObject((prevObject: WaterSystemProps) => {
        return {
          ...(prevObject as WaterSystemProps),
          records: responseFirst.data.result as RecordProps[],
          donations: responseSecond.data.result as DonationProps[],
        };
      });
    } catch (error) {
      console.error("Error getting objectArray", error);
    }
  }
  if (parentId == -1 && !object) {
    getArrayInObject();
  }

  if (!object) {
    return <div className="flex flex-col items-center mt-10">Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center mt-10">
      {Object.entries(object).map(([key, value]) => (
        <div
          key={key}
          className="flex gap-4 cursor-pointer"
          onClick={() => {
            if (Array.isArray(value)) {
              addNewComponent(
                <ListingPage
                  parentId={object.id}
                  type={key as "records" | "donations"}
                />
              );
            }
          }}
        >
          <div className="font-bold">{key}:</div>
          <div>
            {Array.isArray(value) ? "[Click to view list]" : String(value)}
          </div>
        </div>
      ))}
      {storeComponents.length > 2 && (
        <>
          <div
            className="border p-4 mt-4"
            onClick={() =>
              addNewComponent(<UpdatePage object={object} type={type} />)
            }
          >
            Update
          </div>
          <div
            className="border p-4 mt-4"
            onClick={() => {
              handleDeleteObject(object.id, type);
              backToPrevComponent();
            }}
          >
            Delete
          </div>
        </>
      )}
      <div className="border p-4 mt-4" onClick={backToPrevComponent}>
        Back
      </div>
    </div>
  );
}

// Listing Page
export default function ListingPage({
  parentId,
  type,
}: {
  parentId: number;
  type: string;
}) {
  const { addNewComponent, backToPrevComponent, storeComponents } =
    useStoreComponents();
  const [objectArray, setObjectArray] = useState<any[]>([]);

  async function getObjectArray() {
    try {
      const theEndPoint =
        parentId == -1 ? "waterSystem" : `${type}/all${type}/${parentId}`;
      const response = await axios.get(
        `http://localhost:8080/ankhang/${theEndPoint}`
      );
      if (response.data.code == 1000) {
        setObjectArray([...response.data.result]);
      }
    } catch (error) {
      console.error("Error getting objectArray", error);
    }
  }
  if (objectArray.length == 0) {
    getObjectArray();
  }

  if (!objectArray || objectArray.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center mt-10 flex-col items-center">
      <table>
        <thead>
          <tr>
            {Object.entries(objectArray[0]).map(
              ([key, value], index) =>
                !Array.isArray(value) && (
                  <th className="w-40 text-center" key={index}>
                    {key}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {objectArray.map((item, index) => (
            <tr
              key={index}
              className="text-center border cursor-pointer"
              onClick={() =>
                addNewComponent(
                  <DetailPage
                    parentId={parentId == -1 ? -1 : parentId}
                    itemId={item.id}
                    type={type}
                  />
                )
              }
            >
              {Object.values(item).map(
                (value, i) =>
                  !Array.isArray(value) && (
                    <td key={i} className="p-2">
                      {String(value)}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {storeComponents.length > 2 && (
        <div
          className="border p-4 mt-4"
          onClick={() =>
            addNewComponent(
              <AddPage
                object={objectArray[0]}
                parentId={parentId}
                type={type}
              />
            )
          }
        >
          Add
        </div>
      )}
      {storeComponents.length > 1 && (
        <div className="border p-4 mt-4" onClick={backToPrevComponent}>
          Back
        </div>
      )}
    </div>
  );
}

// StoreComponent

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

// Update Component

export default function UpdatePage({
  object,
  type,
}: {
  object: any;
  type: string;
}) {
  const { backToPrevComponent } = useStoreComponents();
  const { handleUpdateObject } = useData();
  const [formData, setFormData] = useState(object);
  useEffect(() => {
    async function getObject() {
      try {
        const response = await axios.get(
          `http://localhost:8080/ankhang/${type}/${object.id}`
        );
        if (response.data.code == 1000) {
          setFormData(response.data.result);
        }
      } catch (error) {
        console.log("Error getting object", error);
      }
    }
    getObject();
  }, []);
  return (
    <div className="flex flex-col items-center mt-10">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex gap-4">
          <div className="font-bold">{key}:</div>
          <input
            type="text"
            disabled={key == "id"}
            className="border p-2"
            value={String(value)}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
          />
        </div>
      ))}
      <div
        className="border p-4 mt-4"
        onClick={() => {
          handleUpdateObject(type, formData);
          backToPrevComponent();
        }}
      >
        Update
      </div>
      <div className="border p-4 mt-4" onClick={backToPrevComponent}>
        Back
      </div>
    </div>
  );
}


// Config 


export interface WaterSystemProps {
  id: number;
  name: string;
  location: string;
  records: RecordProps[];
  donations: DonationProps[];
}

export interface RecordProps {
  id: number;
  reading: number;
  date: string;
}

export interface DonationProps {
  id: number;
  amount: number;
  date: string;
}