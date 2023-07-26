import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import one from "./../images/commonLanding1.svg";
import two from "./../images/comonlanding2.svg";

const Landing = () => {
  return (
    <div>
      <Logo description="" />
      <div className=" flex justify-around mt-8">
        <div>
          <Link to={"/auth?user=customer"}>
            <img src={one} alt="" />
          </Link>
        </div>
        <div>
          <Link to={"/auth?user=owner"}>
            <img src={two} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
