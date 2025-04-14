import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps, UserProps } from "../Config/interface";


const StoreAuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <StoreAuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </StoreAuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(StoreAuthContext);
  if (!context) {
    throw new Error("bla bla bla");
  }
  return context;
};
