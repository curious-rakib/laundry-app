import React, { createContext, useState, useEffect } from "react";
import { type User } from "../../models/userModel";
import { authUserService } from "./../../services/authService";

let isAuth = false;
export type AuthcontextType = {
  me: {
    loading: boolean;
    data?: User;
  };
  updateMe: (data: User) => void;
};
export const AuthContext = createContext<AuthcontextType | null>(null);

const AuthHere = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<User>();
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const getme = () => {
    authUserService()
      .then((res) => {
        setMe(res);
        setAuthLoading(false);
      })
      .catch((err) => {
        setAuthLoading(false);
      });
  };
  const updateMe = (data: User) => setMe(data);
  useEffect(() => {
    if (!isAuth) {
      // getme();
      isAuth = true;
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ me: { loading: authLoading, data: me }, updateMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthHere;
