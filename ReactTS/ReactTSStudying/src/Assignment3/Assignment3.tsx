import { useEffect, useRef, useState } from "react";

export default function Assignment3() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <div style={{ margin: 30 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{ padding: 5 }}
          ref={searchRef}
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md"
          onChange={(e) => setText(e.target.value)}
        />
        <div
          className="submit"
          style={{ backgroundColor: "#bbb", padding: 5, cursor: "pointer" }}
          onClick={() => setResult(text)}
        >
          Submit
        </div>
      </div>
      <div style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        Search Results
      </div>
      <div style={{ marginTop: 10 }}>{result}</div>
    </div>
  );
}
