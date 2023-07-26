import { useState } from 'react';
import add from '../images/addButton.svg';
import { Cart, Service, SubCategory } from '../models/servicemodel';

const GarmentCard = ({
  subCategory,
  cart,
  setCart,
  service,
}: {
  subCategory: SubCategory;
  cart: Cart[];
  setCart: Function;
  service: Service;
}) => {
  const [count, setCount] = useState<number>(0);

  const getCount = (value: number) => {
    if (value >= 0) {
      setCount(value);
    }
  };

  const addToCart = ({
    subCategory,
    count,
    service,
  }: {
    subCategory: SubCategory;
    count: number;
    service: Service;
  }) => {
    if (count <= 0) return;
    setCart((cart: Cart[]) => [...cart, { subCategory, count, service }]);
  };

  return (
    <div className='grid grid-cols-3 items-center justify-items-center w-11/12 p-3 rounded-xl shadow-xl'>
      <div className='w-28 pt-4 pb-4 pl-5 pr-5 rounded-2xl bg-[#E3887B] font-semibold text-white text-xl text-center'>
        {subCategory.name}
      </div>
      <div className=''>
        <p className=''>Regular: ${subCategory.price}</p>
        <p className=''>Urgent: ${subCategory.price + 5}</p>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <input
          onChange={(event) => getCount(Number(event.target.value))}
          className='w-12 h-12 border-2 border-gray-600 rounded-xl outline-none text-center text-2xl font-semibold bg-white'
          type='number'
          defaultValue={count}
          min={0}
        />
        <button
          onClick={() => addToCart({ subCategory, count, service })}
          className='btn btn-circle flex justify-center items-center bg-white border-none'
        >
          <img src={add} />
        </button>
      </div>
    </div>
  );
};

export default GarmentCard;
