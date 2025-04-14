export default function EachInputField({
  classInputField,
  storeInputs,
}: {
  classInputField: string;
  storeInputs: React.ReactNode[];
}) {
  return (
    <div className={classInputField}>
      {storeInputs.map((eachInput) => eachInput)}
    </div>
  );
}
