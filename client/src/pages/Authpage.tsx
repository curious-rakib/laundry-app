import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Logo from "../components/Logo";
import { Mybtn } from "../components/Button";

const Authpage = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("user");
  return (
    <div>
      <Logo />
      <div className=" flex flex-col items-center gap-4 mt-11 ">
        <div className=" bg-[#E3887B] w-3/4 flex justify-center p-5 rounded-lg text-white font-semibold">
          <Link to={`/auth/login?user=${userType}`} className=" ">
            <Mybtn className=" te">Sign In</Mybtn>
          </Link>
        </div>
        <p className=" bg-white  px-2 text-sm font-semibold">-----OR-----</p>

        <div className="bg-[#E3887B] w-3/4 flex justify-center rounded-lg text-white font-semibold p-5">
          <Link to={`/auth/registration?user=${userType}`} className="">
            <Mybtn className="">Sign Up</Mybtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Authpage;
