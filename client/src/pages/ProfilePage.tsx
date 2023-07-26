import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../images/logo1.svg';
import { ProfileUserService } from '../services/authService';
import { Cart } from '../models/servicemodel';
import { getUserOrdersService } from '../services/allservices';

const ProfilePage = ({ cart }: { cart: Cart[] }) => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');

  useEffect(() => {
    const getProfile = async () => {
      const profile = await ProfileUserService();

      const orders = await getUserOrdersService(profile._id);

      console.log(orders);

      setName(profile.fullName);
      setAddress(profile.address);
      setMobile(profile.phone);
    };
    getProfile();
  }, []);

  return (
    <div className='flex flex-col items-center justify-start h-full'>
      <div className='w-full text-center mb-12 mt-6'>
        <img className='w-20 h-20 inline' src={logo} alt='logo' />
      </div>

      <h2 className='text-center mb-16 font-sans text-2xl font-bold'>Profile</h2>

      <div className='w-80 p-4'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-lg'>Name:</p>
          <p className='font-normal text-base'>{name}</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='font-semibold text-lg'>Address:</p>
          <p className='font-normal text-base'>{address}</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='font-semibold text-lg'>Phone:</p>
          <p className='font-normal text-base'>{mobile}</p>
        </div>
      </div>

      <div className=' flex justify-center' style={{ justifySelf: 'flex-end' }}>
        <button
          className='btn w-64 bg-red-600 font-semibold text-white text-xl text-center border-none shadow-md'
          type='button'
        >
          Logout
        </button>
      </div>

      <Navbar cart={cart} />
    </div>
  );
};

export default ProfilePage;
