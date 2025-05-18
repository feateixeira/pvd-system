
import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/sonner";

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  const login = (username: string, password: string): boolean => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      toast.success(`Bem-vindo, ${user.displayName}!`);
      navigate("/pdv");
      return true;
    }
    
    toast.error("Usuário ou senha incorretos");
    return false;
  };
  
  const logout = () => {
    setCurrentUser(null);
    navigate("/");
  };
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
