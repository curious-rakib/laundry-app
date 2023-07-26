import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Mybtn } from "./../components/Button";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUserService } from "./../services/authService";

type loginData = {
  fullName: string;
  phone: string;
  password: string;
  address: string;
  type: string;
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("user");
  const [data, setData] = useState<loginData>({
    fullName: "",
    phone: "",
    password: "",
    address: "",
    type: "",
  });

  useEffect(() => {
    if (userType) {
      setData({
        ...data,
        type: userType,
      });
    }
  }, [userType]);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.fullName.trim().length) {
      toast.error("Full Name is required");
      return;
    }
    if (!data.phone.trim().length) {
      toast.error("Phone Number is required");
      return;
    }
    if (!data.password.trim().length) {
      toast.error("Password is required");
      return;
    }
    if (!data.address.trim().length) {
      toast.error("Address is required");
      return;
    }
    if (!data.type.trim().length) {
      toast.error("Type is required");
      return;
    }
    registerUserService(data)
      .then((res) => {
        toast.success("Registration Success, Please login to continue");
        navigate(`/auth/login?user=${userType}`);
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="pt-12">
      <Logo description="Enjoy Your Best Experience With Us" />
      <form onSubmit={onSubmit} className="px-4 mt-6">
        <div>
          <label htmlFor="name" className="font-semibold   ">
            Full Name
          </label>
          <input
            id="name"
            name="fullName"
            type="text"
            onChange={inputHandler}
            placeholder="Your full name"
            className="mt-1 outline-none h-11 bg-white w-full px-4 border rounded-md"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="phone" className="font-semibold   ">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={inputHandler}
            placeholder="Phone"
            className="mt-1 outline-none h-11 bg-white w-full px-4 border rounded-md"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="address" className="font-semibold   ">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            onChange={inputHandler}
            placeholder="Address"
            className="mt-1 outline-none  bg-white w-full p-4 border rounded-md"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={inputHandler}
            placeholder="Password "
            className="mt-1 outline-none h-11 bg-white w-full px-4 border rounded-md"
            autoComplete="new-password"
          />
        </div>
        <Mybtn className="w-full py-2 mt-4 bg-[#E3887B] rounded-lg text-white font-semibold p-5">
          SIGN UP
        </Mybtn>
      </form>
      <Link to={`/auth/login?user=${userType}`}>
        <p className="mt-4 text-center ">{`< Return to Sign In`}</p>
      </Link>
    </div>
  );
};

export default Register;
