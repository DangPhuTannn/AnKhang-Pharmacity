import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { UserProps } from "../../interface/interface";

interface UserContextProps {
  user: UserProps | null;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
}

const UserContexrProvider = createContext<UserContextProps | undefined>(
  undefined
);
export default function UserContext({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  console.log("reload...", user);
  return (
    <UserContexrProvider.Provider value={{ user, setUser }}>
      {children}
    </UserContexrProvider.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContexrProvider);
  if (!context) {
    throw new Error("blabla");
  }
  return context;
}
