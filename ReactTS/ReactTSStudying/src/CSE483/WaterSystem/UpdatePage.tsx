/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreComponents } from "./StoreComponents";
import { useData } from "./DataProvider";
import axios from "axios";

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
