import { InputFieldFormProps } from "../../interface/interface";

export default function InputFieldForm(eachInputField: InputFieldFormProps) {
  const { textField, title, label } = eachInputField;
  return (
    <>
      <label className="labelInputField" htmlFor={label}>
        {title}
      </label>
      <div className="storeInputFieldForm">{textField}</div>
    </>
  );
}
