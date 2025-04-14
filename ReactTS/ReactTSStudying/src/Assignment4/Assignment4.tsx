import { useMemo, useState } from "react";

export default function Assignment4() {
  const user = useMemo(() => {
    console.log("reload...");
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
    }));
  }, []);
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  return (
    <div style={{ margin: 30 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{ padding: 5 }}
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md"
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
        ></input>
        Additional Option
      </div>
      <div style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        Search Results
      </div>
      <ul style={{ marginTop: 10 }}>
        {text.trim().length == 0
          ? user.map((eachUser, index) => <li key={index}>{eachUser.name}</li>)
          : user.map((eachUser, index) =>
              eachUser.name.includes(text) ? (
                <li key={index}>{eachUser.name}</li>
              ) : (
                ""
              )
            )}
      </ul>
    </div>
  );
}
