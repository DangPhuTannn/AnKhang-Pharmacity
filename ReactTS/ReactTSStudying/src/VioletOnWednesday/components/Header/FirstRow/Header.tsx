import FirstRowHeader from "./FirstRowHeader";
import "./../../../css/header.css";
import SecondRowHeader from "../SecondRow/SecondRowHeader";
function Header() {
  return (
    <header className="header">
      <div className="firstRowHeader">
        <FirstRowHeader></FirstRowHeader>
      </div>
      <div className="secondRowHeader">
        <SecondRowHeader></SecondRowHeader>
      </div>
    </header>
  );
}

export default Header;
