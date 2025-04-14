import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../GlobalUtils/AuthContext";
import { useBackdrop } from "../GlobalUtils/BackdropGlobal";

const ProtectedRoute = ({
  children,
  allowRoles,
}: {
  children: React.ReactNode;
  allowRoles: string[];
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { token, user } = useAuth();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  useEffect(() => {
    const checkToken = async () => {
      try {
        showBackdrop();
        const response = await axios.post(
          "http://localhost:8080/ankhang/auth/introspect",
          {
            token,
          }
        );
        setIsAuthenticated(response.data.result.valid);
      } catch (error) {
        console.error("Error verifying token", error);
        setIsAuthenticated(false);
      } finally {
        hideBackdrop();
      }
    };

    if (token) {
      checkToken();
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  if (isAuthenticated === null) return null;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  const hasPermission = user?.roles.some((eachPermission : string) =>
    allowRoles.includes(eachPermission)
  );

  if (!hasPermission) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;
