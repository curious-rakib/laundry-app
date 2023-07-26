import logo from "./../images/logo1.svg";
type Props = {
  description?: string;
};
const Logo = (props: Props) => {
  return (
    <div className="flex justify-center flex-col mt-20">
      <img src={logo} alt="Logo" className=" m-auto" />
      {props.description ? (
        <p className="text-center mt-7 font-bold tracking-widest text-xl px-4">
          {props.description}
        </p>
      ) : (
        <div className=" text-center mt-4">
          <p className="tracking-widest font-extrabold">LONDRI</p>
          <p className="font-thin text-xs">DUST TO SHINE</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
