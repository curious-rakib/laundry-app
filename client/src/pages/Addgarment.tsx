import Navbar from '../components/Navbar';
import man from '../images/Add-germent/man.svg';
import woman from '../images/Add-germent/woman.svg';
import kid from '../images/Add-germent/kid.svg';
import other from '../images/Add-germent/other.svg';
import logo from '../images/logo1.svg';
import { Cart, CategoryType, Service, SubCategory } from '../models/servicemodel';
import { useEffect, useState } from 'react';
import CategoryBlock from '../components/CategoryBlock';
import GarmentCard from '../components/GarmentCard';
import { getAllSubCategoriesService } from '../services/allservices';

const Addgarment = ({
  service,
  cart,
  setCart,
}: {
  service: Service | null;
  cart: Cart[];
  setCart: Function;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);

  const categories = ['Men', 'Women', 'Kids', 'Others'];
  const categoryImages = [man, woman, kid, other];

  const ChooseCategory = async (category: CategoryType) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const newArray = subCategories.filter((subCategory) => subCategory.type === selectedCategory);
    setFilteredSubCategories(newArray);
  }, [selectedCategory]);

  useEffect(() => {
    const getItems = async () => {
      const sub = await getAllSubCategoriesService();
      setSubCategories(sub);
    };

    getItems();
  }, []);

  return (
    <div className='overflow-y-auto' style={{ height: '92.4%' }}>
      <div className='w-full text-center mb-6 mt-4'>
        <img className='w-20 h-20 inline' src={logo} alt='logo' />
      </div>

      <h2 className='text-center mb-3 font-sans text-2xl font-bold'>Add your garment</h2>

      <p className='text-center mt-4 mb-3 font-sans text-base font-normal'>Category</p>

      <div className='grid grid-cols-2 justify-items-center gap-y-6 gap-x-6 pl-3 pr-3'>
        {categories.map((category, index) => (
          <CategoryBlock
            onClick={() => ChooseCategory(category)}
            category={category}
            imageSrc={categoryImages[index]}
          />
        ))}
      </div>

      {filteredSubCategories.length >= 1 && (
        <div className='flex flex-col gap-3 items-center mb-5'>
          <h3 className='mt-6 mb-2 text-center text-lg font-medium'>Type of garment</h3>

          {filteredSubCategories.map((subCategory) => {
            return (
              <GarmentCard
                key={subCategory._id}
                subCategory={subCategory}
                cart={cart}
                setCart={setCart}
                service={service!}
              />
            );
          })}
        </div>
      )}

      <Navbar cart={cart} />
    </div>
  );
};

export default Addgarment;
