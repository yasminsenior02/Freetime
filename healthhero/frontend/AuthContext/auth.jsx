import { createContext, useState, useContext } from "react";
const AuthContext = createContext(null);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [comm, setComm] = useState(undefined);
  const authValue = { user, setUser, comm, setComm };
  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
