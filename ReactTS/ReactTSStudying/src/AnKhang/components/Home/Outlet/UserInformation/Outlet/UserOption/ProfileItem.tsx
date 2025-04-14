const rankStyles = {
  NONE: "bg-gray-200 text-gray-700",
  SILVER: "bg-gray-300 text-gray-800",
  GOLD: "bg-yellow-400 text-yellow-900",
  PLATINUM: "bg-blue-400 text-blue-900",
};
export default function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | React.ReactNode | keyof typeof rankStyles;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-4 text-gray-700">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-gray-600">{label}</span>
      </div>
      {label == "Rank" ? (
        <span
          className={`font-semibold py-2 px-4 ${
            rankStyles[value as keyof typeof rankStyles]
          }`}
        >
          {value}
        </span>
      ) : (
        <span className={`font-semibold`}>{value}</span>
      )}
    </div>
  );
}
