import { ReactNode } from "react";
import { useUser } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function Authorize({ children }: { children: ReactNode }) {
  const { user } = useUser();
  console.log(user?.permissions, "asd");
  const isAdmin = user?.permissions.find(
    (eachPermission) => eachPermission.toLowerCase() == "admin"
  );
  if (!isAdmin) return <Navigate to="/home" replace />;
  return children;
}
