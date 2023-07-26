import React from 'react';
type PrimaryButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Mybtn = (props: PrimaryButtonProps) => {
  return (
    <button onClick={props.onClick} className={` bg-primary  ${props.className}`}>
      {props.children}
    </button>
  );
};

const Button = (props: PrimaryButtonProps) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;
