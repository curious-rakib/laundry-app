import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AuthContext,
  AuthcontextType,
} from "./../components/auth/auth.context";

const Layout = (props: any) => {
  // console.log(Outlet);
  const navigate = useNavigate();

  const { me } = useContext(AuthContext) as AuthcontextType;

  useEffect(() => {
    if (me.data) {
      navigate("/home");
    }
  }, [me]);

  return (
    <div className="w-full h-[100vh] overflow-auto bg-white  text-black relative">
      <Outlet />
    </div>
  );
};

export default Layout;
