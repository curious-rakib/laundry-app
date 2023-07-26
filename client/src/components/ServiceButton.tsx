import React from 'react';
import { Service } from '../models/servicemodel';
type Button = {
  children: React.ReactNode;
  service: Service;
  imageSrc: string;
  onClick?: () => void;
};

const ServiceButton = (props: Button) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <button onClick={props.onClick} className='btn btn-circle bg-[#E3887B] border-none h-20 w-20'>
        <img src={props.imageSrc} alt={props.service.name} />
      </button>
      <p className='font-sans text-lg font-medium text-[#E3887B]'>{props.service.name}</p>
    </div>
  );
};

export default ServiceButton;
