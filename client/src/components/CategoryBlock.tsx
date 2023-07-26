import { Service } from '../models/servicemodel';
type Category = {
  category: string;
  imageSrc: string;
  onClick?: () => void;
};

const CategoryBlock = (props: Category) => {
  return (
    <div
      className='flex flex-col items-center gap-2 border-4 border-[#E3887B] rounded-2xl w-full p-2'
      onClick={props.onClick}
    >
      <img src={props.imageSrc} alt='Man' />

      <p className='font-sans text-lg font-medium text-[#E3887B]'>{props.category}</p>
    </div>
  );
};

export default CategoryBlock;
