import { useNavigate } from "react-router-dom";
import { style } from "./GlobalVariables";

export default function InitialPage() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.button} onClick={() => navigate("/Screen A")}>
        Screen A
      </div>

      <div className={style.button} onClick={() => navigate("/Screen B")}>
        Screen B
      </div>
    </div>
  );
}
