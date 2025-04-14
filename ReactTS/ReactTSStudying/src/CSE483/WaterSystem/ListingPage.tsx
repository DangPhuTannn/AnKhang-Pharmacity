/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AddPage from "./AddPage";
import { DetailPage } from "./DetailPage";
import { useStoreComponents } from "./StoreComponents";
import axios from "axios";

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
