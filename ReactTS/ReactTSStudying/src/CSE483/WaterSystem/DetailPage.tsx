import { useStoreComponents } from "./StoreComponents";
import { useData } from "./DataProvider";
import UpdatePage from "./UpdatePage";
import ListingPage from "./ListingPage";
import { useState } from "react";
import { DonationProps, RecordProps, WaterSystemProps } from "./Config";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
