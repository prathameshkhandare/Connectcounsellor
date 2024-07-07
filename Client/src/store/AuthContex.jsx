import { createContext, useContext, } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storeTokenLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
  };
  const removeTokenLS = () => {
    localStorage.removeItem("token");
    
  };
  return (
    <AuthContext.Provider value={{ storeTokenLS,removeTokenLS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
  
};
